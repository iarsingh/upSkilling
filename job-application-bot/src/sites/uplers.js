// Uplers automation.
//
// EXPERIMENTAL: unlike linkedin.js/naukri.js/indeed.js/genericAts.js, these
// selectors are not verified against Uplers' live DOM (it's a smaller,
// less-documented platform). This adapter logs in and uses the
// site-agnostic genericFormPass for job applications - it will work for
// plain HTML forms but may need real selector fixes for Uplers-specific
// widgets. Run with --dry-run and watch the first few applications closely
// before trusting it at volume.

const { ensureLoggedIn } = require("../lib/browserSession");
const { scoreJob } = require("../lib/ollama");
const { genericFormPass } = require("../lib/genericFormPass");
const applicationLog = require("../lib/applicationLog");

const SITE = "uplers";

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function login(page) {
  await ensureLoggedIn(page, {
    checkUrl: "https://talent.uplers.com/",
    loggedInSelector: "a[href*='logout'], a[href*='dashboard'], button[aria-label*='profile']",
    loginPromptMessage: "Please log in to Uplers in the opened browser window."
  });
}

function buildSearchUrl({ keywords }) {
  const params = new URLSearchParams({ search: keywords });
  return `https://talent.uplers.com/jobs?${params.toString()}`;
}

async function collectJobCards(page, limit) {
  const urls = [];
  let lastCount = -1;
  while (urls.length < limit && urls.length !== lastCount) {
    lastCount = urls.length;
    const links = await page.locator("a[href*='/jobs/']").all();
    for (const link of links) {
      const href = await link.getAttribute("href").catch(() => null);
      if (href) {
        const full = href.startsWith("http") ? href : `https://talent.uplers.com${href}`;
        if (!urls.includes(full)) urls.push(full);
      }
      if (urls.length >= limit) break;
    }
    await page.mouse.wheel(0, 1400);
    await sleep(1200);
  }
  return urls.slice(0, limit);
}

async function run({ page, profile, keywords, location, limit, dryRun = false }) {
  await login(page);
  await page.goto(buildSearchUrl({ keywords, location }), { waitUntil: "domcontentloaded" }).catch(() => {});
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
    const description = await page.locator("body").innerText().catch(() => "");
    const jobText = `${title}\n${description}`.slice(0, 6000);

    const score = await scoreJob(jobText, profile);
    if (score.decision !== "apply") {
      console.log(`[uplers] Skipping "${(title || "").trim()}" (${score.reason || "low match"})`);
      continue;
    }

    const applyBtn = page.getByRole("button", { name: /apply/i }).first();
    if (await applyBtn.count().catch(() => 0)) {
      await applyBtn.click().catch(() => {});
      await sleep(1500);
    }

    const outcome = await genericFormPass(page, profile, jobText.slice(0, 800), { dryRun });
    const status = outcome === "dry_run" ? "dry_run" : outcome ? "submitted" : "incomplete_needs_review";

    applicationLog.record({
      site: SITE,
      jobKey,
      title: (title || "").trim(),
      url: jobUrl,
      status,
      matchedKeywords: score.matched_keywords || [],
      score: score.score
    });

    if (outcome === true) {
      applied++;
      console.log(`[uplers] Applied: "${(title || "").trim()}"`);
    } else if (outcome === "dry_run") {
      applied++;
      console.log(`[uplers] [dry-run] Would apply: "${(title || "").trim()}"`);
    } else {
      console.log(`[uplers] Could not confirm submission for "${(title || "").trim()}" - logged for manual review.`);
    }

    await sleep(2000 + Math.random() * 1500);
  }

  return applied;
}

module.exports = { SITE, run, login };
