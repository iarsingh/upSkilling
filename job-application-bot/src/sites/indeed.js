// Indeed automation. Indeed has two apply paths: its own native "Indeed
// Apply" multi-step form (handled here), or an external redirect straight to
// the employer's ATS (Greenhouse/Lever/Workday etc. - handed off to
// genericAts.js when detected).

const { ensureLoggedIn } = require("../lib/browserSession");
const { scoreJob } = require("../lib/ollama");
const { fillField } = require("../lib/formFiller");
const applicationLog = require("../lib/applicationLog");
const genericAts = require("./genericAts");

const SITE = "indeed";

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function login(page) {
  await ensureLoggedIn(page, {
    checkUrl: "https://www.indeed.com/",
    loggedInSelector: "a[href*='/account/'], button[aria-label*='Account']",
    loginPromptMessage: "Please log in to Indeed in the opened browser window."
  });
}

function buildSearchUrl({ keywords, location }) {
  const params = new URLSearchParams({ q: keywords, l: location || "India", fromage: "7" });
  return `https://www.indeed.com/jobs?${params.toString()}`;
}

async function collectJobCards(page, limit) {
  const urls = [];
  let lastCount = -1;
  while (urls.length < limit && urls.length !== lastCount) {
    lastCount = urls.length;
    const links = await page.locator("a.jcs-JobTitle, h2.jobTitle a").all();
    for (const link of links) {
      const href = await link.getAttribute("href").catch(() => null);
      if (href) {
        const full = href.startsWith("http") ? href : `https://www.indeed.com${href}`;
        if (!urls.includes(full)) urls.push(full);
      }
      if (urls.length >= limit) break;
    }
    const nextBtn = page.locator("a[data-testid='pagination-page-next']").first();
    if (!(await nextBtn.count().catch(() => 0))) break;
    await nextBtn.click().catch(() => {});
    await sleep(1500);
  }
  return urls.slice(0, limit);
}

async function handleIndeedApplyForm(page, profile, jobContext, dryRun = false) {
  for (let step = 0; step < 12; step++) {
    const inputs = await page.locator("input[type='text'], input[type='tel'], input[type='email'], input[type='number'], textarea").all();
    for (const input of inputs) {
      const existing = await input.inputValue().catch(() => "");
      if (existing) continue;
      const label = (await input.getAttribute("aria-label").catch(() => "")) || (await input.getAttribute("placeholder").catch(() => "")) || "";
      try {
        await fillField({ locator: input, label, inputType: "text", profile, jobContext });
      } catch {
        /* skip unfillable field */
      }
    }

    const continueBtn = page.getByRole("button", { name: /continue|next/i }).first();
    const submitBtn = page.getByRole("button", { name: /submit( your)? application/i }).first();

    if (await submitBtn.count().catch(() => 0)) {
      if (dryRun) {
        console.log("  [dry-run] Indeed apply form filled, would click Submit here");
        return "dry_run";
      }
      await submitBtn.click();
      await sleep(1500);
      return true;
    }
    if (await continueBtn.count().catch(() => 0)) {
      await continueBtn.click();
      await sleep(1200);
      continue;
    }
    return false;
  }
  return false;
}

async function run({ page, profile, keywords, location, limit, dryRun = false }) {
  await login(page);
  await page.goto(buildSearchUrl({ keywords, location }), { waitUntil: "domcontentloaded" });
  await sleep(2000);

  const jobUrls = await collectJobCards(page, limit * 2);
  let applied = 0;

  for (const jobUrl of jobUrls) {
    if (applied >= limit) break;
    const jobKey = `${SITE}:${jobUrl}`;
    if (applicationLog.hasApplied(jobKey)) continue;

    await page.goto(jobUrl, { waitUntil: "domcontentloaded" });
    await sleep(1500);

    const title = await page.locator("h1").first().textContent().catch(() => "Unknown title");
    const company = await page.locator("[data-testid='inlineHeader-companyName']").first().textContent().catch(() => "Unknown company");
    const description = await page.locator("#jobDescriptionText").first().textContent().catch(() => "");
    const jobText = `${title}\n${company}\n${description}`;

    const score = await scoreJob(jobText, profile);
    if (score.decision !== "apply") {
      console.log(`[indeed] Skipping "${(title || "").trim()}" (${score.reason || "low match"})`);
      continue;
    }

    const applyBtn = page.getByRole("button", { name: /apply now/i }).first();
    if (!(await applyBtn.count().catch(() => 0))) {
      console.log(`[indeed] No apply button for "${(title || "").trim()}" - skipping.`);
      continue;
    }

    const [popup] = await Promise.all([
      page.waitForEvent("popup", { timeout: 5000 }).catch(() => null),
      applyBtn.click()
    ]);
    const applyPage = popup || page;
    await sleep(1500);

    const externalUrl = applyPage.url();
    let outcome = false;

    if (genericAts.detect(externalUrl)) {
      outcome = await genericAts.applyOnPage({ page: applyPage, profile, jobContext: jobText.slice(0, 800), dryRun });
    } else if (externalUrl.includes("indeed.com")) {
      outcome = await handleIndeedApplyForm(applyPage, profile, jobText.slice(0, 800), dryRun);
    } else {
      console.log(`[indeed] "${(title || "").trim()}" redirects to an unsupported external site (${externalUrl}) - logged for manual application.`);
    }

    const status = outcome === "dry_run" ? "dry_run" : outcome ? "submitted" : "incomplete_needs_review";

    applicationLog.record({
      site: SITE,
      jobKey,
      title: (title || "").trim(),
      company: (company || "").trim(),
      url: jobUrl,
      externalUrl,
      status,
      matchedKeywords: score.matched_keywords || [],
      score: score.score
    });

    if (outcome === true) {
      applied++;
      console.log(`[indeed] Applied: "${(title || "").trim()}" @ ${(company || "").trim()}`);
    } else if (outcome === "dry_run") {
      applied++;
      console.log(`[indeed] [dry-run] Would apply: "${(title || "").trim()}" @ ${(company || "").trim()}`);
    }

    if (popup) await popup.close().catch(() => {});
    await sleep(2000 + Math.random() * 2000);
  }

  return applied;
}

module.exports = { SITE, run, login };
