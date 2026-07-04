// Handles direct applications on the three most common third-party ATS
// platforms that company career pages embed: Greenhouse, Lever, and Workday.
// These are not login-gated the way LinkedIn/Naukri are - each application
// is a one-off public form, so there's no persistent session to manage here.

const { scoreJob } = require("../lib/ollama");
const { fillField } = require("../lib/formFiller");
const { genericFormPass } = require("../lib/genericFormPass");
const applicationLog = require("../lib/applicationLog");

const SITE = "generic-ats";

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function detect(url) {
  return /boards\.greenhouse\.io|job-boards\.greenhouse\.io|jobs\.lever\.co|myworkdayjobs\.com/.test(url);
}

function platformOf(url) {
  if (/greenhouse\.io/.test(url)) return "greenhouse";
  if (/lever\.co/.test(url)) return "lever";
  if (/myworkdayjobs\.com/.test(url)) return "workday";
  return "unknown";
}

async function fillGreenhouse(page, profile, jobContext, { dryRun = false } = {}) {
  await page.locator("#first_name").fill(profile.firstName).catch(() => {});
  await page.locator("#last_name").fill(profile.lastName).catch(() => {});
  await page.locator("#email").fill(profile.email).catch(() => {});
  await page.locator("#phone").fill(profile.phone).catch(() => {});

  const resumeInput = page.locator("input[type='file']").first();
  if (await resumeInput.count().catch(() => 0)) {
    await resumeInput.setInputFiles(profile.resumes.platform_engineer).catch(() => {});
    await sleep(2000); // let resume-parse autofill run before we fill remaining fields
  }

  const textInputs = await page.locator("input[type='text']:not([id]), textarea").all();
  for (const input of textInputs) {
    const existing = await input.inputValue().catch(() => "");
    if (existing) continue;
    const label = await nearestLabelText(page, input);
    try {
      await fillField({ locator: input, label, inputType: "text", profile, jobContext });
    } catch {
      /* skip */
    }
  }

  const submitBtn = page.getByRole("button", { name: /submit application/i }).first();
  if (await submitBtn.count().catch(() => 0)) {
    if (dryRun) {
      console.log("  [dry-run] Greenhouse form filled, would click Submit here");
      return "dry_run";
    }
    await submitBtn.click();
    await sleep(1500);
    return true;
  }
  return false;
}

async function fillLever(page, profile, jobContext, { dryRun = false } = {}) {
  await page.locator("input[name='name']").fill(profile.fullName).catch(() => {});
  await page.locator("input[name='email']").fill(profile.email).catch(() => {});
  await page.locator("input[name='phone']").fill(profile.phone).catch(() => {});
  await page.locator("input[name='org']").fill("").catch(() => {});

  const resumeInput = page.locator("input[name='resume']").first();
  if (await resumeInput.count().catch(() => 0)) {
    await resumeInput.setInputFiles(profile.resumes.platform_engineer).catch(() => {});
  }

  const additionalFields = await page.locator("div.application-question").all();
  for (const field of additionalFields) {
    const label = (await field.locator("div.application-label").textContent().catch(() => "")) || "";
    const input = field.locator("input[type='text'], textarea").first();
    if (!(await input.count().catch(() => 0))) continue;
    try {
      await fillField({ locator: input, label, inputType: "text", profile, jobContext });
    } catch {
      /* skip */
    }
  }

  const submitBtn = page.getByRole("button", { name: /submit application/i }).first();
  if (await submitBtn.count().catch(() => 0)) {
    if (dryRun) {
      console.log("  [dry-run] Lever form filled, would click Submit here");
      return "dry_run";
    }
    await submitBtn.click();
    await sleep(1500);
    return true;
  }
  return false;
}

async function fillWorkday(page, profile, jobContext, { dryRun = false } = {}) {
  // Workday's "Apply Manually" flow is a long, multi-page wizard that varies
  // per tenant, so we use the generic site-agnostic fill-and-advance pass.
  return genericFormPass(page, profile, jobContext, { maxSteps: 15, dryRun });
}

async function nearestLabelText(page, locator) {
  const aria = await locator.getAttribute("aria-label").catch(() => null);
  if (aria) return aria;
  const id = await locator.getAttribute("id").catch(() => null);
  if (id) {
    const label = page.locator(`label[for="${id}"]`).first();
    if (await label.count().catch(() => 0)) return (await label.textContent()) || "";
  }
  return (await locator.getAttribute("placeholder").catch(() => "")) || "";
}

async function applyOnPage({ page, profile, jobContext, dryRun = false }) {
  const platform = platformOf(page.url());
  if (platform === "greenhouse") return fillGreenhouse(page, profile, jobContext, { dryRun });
  if (platform === "lever") return fillLever(page, profile, jobContext, { dryRun });
  if (platform === "workday") return fillWorkday(page, profile, jobContext, { dryRun });
  return false;
}

// Standalone entry point: given a direct list of job posting URLs (e.g.
// curated from a company's careers page), score and apply to each.
async function run({ page, profile, jobUrls, limit, dryRun = false }) {
  let applied = 0;
  for (const jobUrl of jobUrls) {
    if (applied >= limit) break;
    const jobKey = `${SITE}:${jobUrl}`;
    if (applicationLog.hasApplied(jobKey)) continue;

    await page.goto(jobUrl, { waitUntil: "domcontentloaded" });
    await sleep(1500);

    const title = await page.locator("h1, h2").first().textContent().catch(() => "Unknown title");
    const description = await page.locator("body").innerText().catch(() => "");
    const jobText = `${title}\n${description}`.slice(0, 6000);

    const score = await scoreJob(jobText, profile);
    if (score.decision !== "apply") {
      console.log(`[generic-ats] Skipping "${(title || "").trim()}" (${score.reason || "low match"})`);
      continue;
    }

    const outcome = await applyOnPage({ page, profile, jobContext: jobText.slice(0, 800), dryRun });
    const status = outcome === "dry_run" ? "dry_run" : outcome ? "submitted" : "incomplete_needs_review";

    applicationLog.record({
      site: SITE,
      jobKey,
      title: (title || "").trim(),
      url: jobUrl,
      platform: platformOf(jobUrl),
      status,
      matchedKeywords: score.matched_keywords || [],
      score: score.score
    });

    if (outcome === true) {
      applied++;
      console.log(`[generic-ats] Applied: "${(title || "").trim()}"`);
    } else if (outcome === "dry_run") {
      applied++;
      console.log(`[generic-ats] [dry-run] Would apply: "${(title || "").trim()}"`);
    }

    await sleep(2000 + Math.random() * 1500);
  }
  return applied;
}

module.exports = { SITE, detect, platformOf, applyOnPage, run };
