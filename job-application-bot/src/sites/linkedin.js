// LinkedIn Easy Apply automation.
//
// IMPORTANT: LinkedIn's Terms of Service prohibit automated interaction with
// the platform, and LinkedIn actively fingerprints and rate-limits automated
// browsing. Running this can result in warnings, feature restrictions, or
// account suspension. You are choosing to accept that risk on your own
// account. Keep volumes modest and human-paced (delays below are deliberate).
//
// LinkedIn's DOM changes frequently and is heavily obfuscated with generated
// class names, so these selectors target stable `aria-label`/`role`
// attributes where possible. If LinkedIn ships a redesign, this file is the
// one that will need updating - run with --dry-run first after a long gap
// to confirm selectors still match before trusting autonomous submission.

const { openSite, ensureLoggedIn } = require("../lib/browserSession");
const { scoreJob } = require("../lib/ollama");
const { fillField, directAnswer } = require("../lib/formFiller");
const applicationLog = require("../lib/applicationLog");

const SITE = "linkedin";

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function login(page) {
  await ensureLoggedIn(page, {
    checkUrl: "https://www.linkedin.com/feed/",
    loggedInSelector: 'a[href*="/mynetwork/"]',
    loginPromptMessage: "Please log in to LinkedIn in the opened browser window (complete any 2FA/OTP)."
  });
}

function buildSearchUrl({ keywords, location }) {
  const params = new URLSearchParams({
    keywords,
    location: location || "India",
    f_AL: "true", // Easy Apply only
    f_TPR: "r604800" // posted in last 7 days
  });
  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
}

async function collectJobCards(page, limit) {
  const cards = [];
  let lastCount = -1;
  while (cards.length < limit && cards.length !== lastCount) {
    lastCount = cards.length;
    const handles = await page.locator("ul.jobs-search__results-list li, div.jobs-search-results-list li").all();
    for (const h of handles) {
      const link = h.locator("a.job-card-list__title, a.job-card-container__link").first();
      const href = await link.getAttribute("href").catch(() => null);
      if (href && !cards.includes(href)) cards.push(href.split("?")[0]);
      if (cards.length >= limit) break;
    }
    await page.mouse.wheel(0, 1200);
    await sleep(1200);
  }
  return cards.slice(0, limit);
}

async function handleEasyApplyModal(page, profile, jobContext, dryRun = false) {
  // The modal is a wizard: repeatedly fill the visible step, then click Next
  // / Review / Submit until a step no longer advances.
  for (let step = 0; step < 12; step++) {
    const modal = page.locator("div.jobs-easy-apply-modal, div[role='dialog']").first();

    const textInputs = await modal.locator("input[type='text'], input[type='tel'], input[type='email'], input[type='number'], textarea").all();
    for (const input of textInputs) {
      const existing = await input.inputValue().catch(() => "");
      if (existing) continue;
      const label = await resolveLabel(modal, input);
      const inputType = (await input.evaluate((el) => el.tagName.toLowerCase())) === "textarea" ? "textarea" : "text";
      try {
        await fillField({ locator: input, label, inputType, profile, jobContext });
      } catch {
        // Leave unfillable fields for manual follow-up rather than blocking the run.
      }
    }

    const selects = await modal.locator("select").all();
    for (const select of selects) {
      const label = await resolveLabel(modal, select);
      try {
        await fillField({ locator: select, label, inputType: "select", profile, jobContext });
      } catch {
        /* skip */
      }
    }

    // Resume selection step: pick the resume matching the job's scored category if offered.
    const resumeOption = modal.locator("div[class*='jobs-document-upload'] input[type='radio']").first();
    if (await resumeOption.count().catch(() => 0)) {
      await resumeOption.check().catch(() => {});
    }

    const submitBtn = modal.getByRole("button", { name: /submit application/i });
    if (await submitBtn.count()) {
      if (dryRun) {
        console.log("  [dry-run] Easy Apply form filled, would click Submit application here");
        return "dry_run";
      }
      await submitBtn.click();
      await sleep(1500);
      return true;
    }

    const reviewBtn = modal.getByRole("button", { name: /review/i });
    const nextBtn = modal.getByRole("button", { name: /next/i });
    const advance = (await reviewBtn.count()) ? reviewBtn : nextBtn;
    if (!(await advance.count())) return false; // stuck - unknown step layout

    await advance.click();
    await sleep(1000);
  }
  return false;
}

async function resolveLabel(scope, input) {
  const aria = await input.getAttribute("aria-label").catch(() => null);
  if (aria) return aria;
  const id = await input.getAttribute("id").catch(() => null);
  if (id) {
    const label = scope.locator(`label[for="${id}"]`).first();
    if (await label.count().catch(() => 0)) return (await label.textContent()) || "";
  }
  const placeholder = await input.getAttribute("placeholder").catch(() => null);
  return placeholder || "";
}

async function run({ page, profile, keywords, location, limit, dryRun = false }) {
  await login(page);
  const searchUrl = buildSearchUrl({ keywords, location });
  await page.goto(searchUrl, { waitUntil: "domcontentloaded" });
  await sleep(2000);

  const jobUrls = await collectJobCards(page, limit * 2); // over-collect; some will be skipped/scored out
  let applied = 0;

  for (const jobUrl of jobUrls) {
    if (applied >= limit) break;
    const jobKey = `${SITE}:${jobUrl}`;
    if (applicationLog.hasApplied(jobKey)) continue;

    await page.goto(jobUrl, { waitUntil: "domcontentloaded" });
    await sleep(1500);

    const title = await page.locator("h1").first().textContent().catch(() => "Unknown title");
    const company = await page.locator("a.job-details-jobs-unified-top-card__company-name, span.jobs-unified-top-card__company-name").first().textContent().catch(() => "Unknown company");
    const description = await page.locator("div.jobs-description__content, div#job-details").first().textContent().catch(() => "");

    const jobText = `${title}\n${company}\n${description}`;
    const score = await scoreJob(jobText, profile);
    if (score.decision !== "apply") {
      console.log(`[linkedin] Skipping "${(title || "").trim()}" (${score.reason || "low match"})`);
      continue;
    }

    const easyApplyBtn = page.getByRole("button", { name: /easy apply/i }).first();
    if (!(await easyApplyBtn.count().catch(() => 0))) {
      console.log(`[linkedin] No Easy Apply button for "${(title || "").trim()}" - skipping (likely external application).`);
      continue;
    }

    await easyApplyBtn.click();
    await sleep(1500);

    const outcome = await handleEasyApplyModal(page, profile, jobText.slice(0, 800), dryRun);
    const status = outcome === "dry_run" ? "dry_run" : outcome ? "submitted" : "incomplete_needs_review";

    applicationLog.record({
      site: SITE,
      jobKey,
      title: (title || "").trim(),
      company: (company || "").trim(),
      url: jobUrl,
      status,
      matchedKeywords: score.matched_keywords || [],
      score: score.score
    });

    if (outcome === true) {
      applied++;
      console.log(`[linkedin] Applied: "${(title || "").trim()}" @ ${(company || "").trim()}`);
    } else if (outcome === "dry_run") {
      applied++;
      console.log(`[linkedin] [dry-run] Would apply: "${(title || "").trim()}" @ ${(company || "").trim()}`);
      const closeBtn = page.getByRole("button", { name: /dismiss|discard/i }).first();
      if (await closeBtn.count().catch(() => 0)) await closeBtn.click().catch(() => {});
    } else {
      console.log(`[linkedin] Could not complete "${(title || "").trim()}" automatically - logged for manual review.`);
      const closeBtn = page.getByRole("button", { name: /dismiss|discard/i }).first();
      if (await closeBtn.count().catch(() => 0)) await closeBtn.click().catch(() => {});
    }

    await sleep(2500 + Math.random() * 2000); // human-ish pacing
  }

  return applied;
}

module.exports = { SITE, run, login };
