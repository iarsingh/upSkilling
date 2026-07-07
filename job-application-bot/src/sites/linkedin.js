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

function normalizeJobUrl(href) {
  if (!href) return null;
  const absolute = href.startsWith("http") ? href : `https://www.linkedin.com${href}`;
  const url = new URL(absolute);
  const viewMatch = url.pathname.match(/\/jobs\/view\/(\d+)/);
  const currentJobId = url.searchParams.get("currentJobId");
  const jobId = viewMatch?.[1] || currentJobId;
  if (!jobId) return null;
  return `https://www.linkedin.com/jobs/view/${jobId}/`;
}

async function collectJobCards(page, limit) {
  const cards = [];
  const seen = new Set();
  let lastCount = -1;
  while (cards.length < limit && cards.length !== lastCount) {
    lastCount = cards.length;
    const links = await page.locator('a[href*="/jobs/view/"], a[href*="currentJobId="]').all();
    for (const link of links) {
      const href = await link.getAttribute("href").catch(() => null);
      const normalized = normalizeJobUrl(href);
      if (normalized && !seen.has(normalized)) {
        seen.add(normalized);
        const card = link.locator("xpath=ancestor::li[1]").first();
        const title = ((await link.textContent().catch(() => "")) || "").trim();
        const company = ((await card.locator("[class*='company-name'], [class*='subtitle']").first().textContent().catch(() => "")) || "").trim();
        cards.push({ url: normalized, title, company });
      }
      if (cards.length >= limit) break;
    }
    await page.mouse.wheel(0, 1200);
    await sleep(1200);
  }
  return cards.slice(0, limit);
}

// Fills every visible text/select/radio-group field within `surface` (a modal
// locator, or `main` for the full-page apply flow - see handleFullPageApply).
// Shared by both surfaces so the field-matching logic (and its accuracy) is
// identical regardless of which UI LinkedIn happens to render this job in.
async function fillVisibleFields(surface, profile, jobContext) {
  const textInputs = await surface.locator("input[type='text'], input[type='tel'], input[type='email'], input[type='number'], textarea").all();
  for (const input of textInputs) {
    const existing = await input.inputValue().catch(() => "");
    if (existing) continue;
    const label = await resolveLabel(surface, input);
    const inputType = (await input.evaluate((el) => el.tagName.toLowerCase())) === "textarea" ? "textarea" : "text";
    try {
      await fillField({ locator: input, label, inputType, profile, jobContext });
    } catch {
      // Leave unfillable fields for manual follow-up rather than blocking the run.
    }
  }

  const selects = await surface.locator("select").all();
  for (const select of selects) {
    const label = await resolveLabel(surface, select);
    try {
      await fillField({ locator: select, label, inputType: "select", profile, jobContext });
    } catch {
      /* skip */
    }
  }

  // Radio-button groups ("Are you willing to relocate?" Yes/No, sponsorship,
  // work authorization, etc.) are the most common reason a step gets stuck:
  // LinkedIn won't advance past a required group with nothing selected.
  // fillField() already had a radio/checkbox branch (formFiller.js:62-67) but
  // no caller ever grouped and invoked it. This loop does the mechanical part
  // (find each group, read its question text and option labels, skip groups
  // that already have a selection); the actual "which option answers this
  // question" decision is in pickRadioOption() below.
  const radioGroups = await surface.locator("fieldset:has(input[type='radio'])").all();
  for (const group of radioGroups) {
    const alreadyChecked = await group.locator("input[type='radio']:checked").count().catch(() => 0);
    if (alreadyChecked) continue;

    const groupLabel = await firstGroupText(group);
    const options = await group.locator("input[type='radio']").all();
    const optionLabels = await Promise.all(options.map((opt) => resolveLabel(group, opt)));

    const chosenIndex = pickRadioOption({ groupLabel, optionLabels, profile });
    if (chosenIndex != null && options[chosenIndex]) {
      await options[chosenIndex].check().catch(() => {});
    }
  }

  // Resume selection step: pick the resume matching the job's scored category if offered.
  const resumeOption = surface.locator("div[class*='jobs-document-upload'] input[type='radio']").first();
  if (await resumeOption.count().catch(() => 0)) {
    await resumeOption.check().catch(() => {});
  }
}

async function handleEasyApplyModal(page, profile, jobContext, dryRun = false) {
  // The modal is a wizard: repeatedly fill the visible step, then click Next
  // / Review / Submit until a step no longer advances.
  for (let step = 0; step < 12; step++) {
    const modal = page.locator("dialog[open], div.jobs-easy-apply-modal, div[role='dialog']").first();
    await fillVisibleFields(modal, profile, jobContext);

    const submitBtn = modal.getByRole("button", { name: /submit application/i }).first();
    if (await submitBtn.count().catch(() => 0)) {
      if (dryRun) {
        console.log("  [dry-run] Easy Apply form filled, would click Submit application here");
        return "dry_run";
      }
      await submitBtn.click();
      await sleep(1500);
      return true;
    }

    const reviewBtn = modal.getByRole("button", { name: /review/i }).first();
    const nextBtn = modal.getByRole("button", { name: /^next$/i }).first();
    const hasReview = await reviewBtn.count().catch(() => 0);
    const hasNext = await nextBtn.count().catch(() => 0);
    const advance = hasReview ? reviewBtn : nextBtn;
    if (!hasReview && !hasNext) return false; // stuck - unknown step layout

    await advance.click();
    await sleep(1000);
  }
  return false;
}

// LinkedIn increasingly routes Easy Apply to a full separate page (URL gains
// an /apply/ segment) instead of opening the modal in place - seen both for
// third-party ATS integrations (e.g. applicantTrackingSystemName=Ceipal) and
// LinkedIn's own newer multi-page flow (applicantTrackingSystemName=LinkedIn).
// Same wizard shape (fill step, click Next/Review/Submit) as the modal, just
// scoped to the page's <main> instead of a dialog, and with more steps
// allowed since these flows ran 4-6 pages in the postings actually seen.
async function handleFullPageApply(page, profile, jobContext, dryRun = false) {
  for (let step = 0; step < 15; step++) {
    // Some /apply/ postings still render inside an overlay dialog on top of
    // the page (native <dialog>, not necessarily role="dialog") rather than
    // truly full-page content. Scoping to that dialog when present avoids
    // colliding with unrelated buttons elsewhere on the page (a photo
    // carousel's own "Next" arrow caused exactly this collision - scoping to
    // `main` alone wasn't narrow enough).
    const dialog = page.locator("dialog[open], div[role='dialog']").first();
    const surface = (await dialog.count().catch(() => 0)) ? dialog : page.locator("main").first();
    await fillVisibleFields(surface, profile, jobContext);

    const submitBtn = surface.getByRole("button", { name: /submit application/i }).first();
    if (await submitBtn.count().catch(() => 0)) {
      if (dryRun) {
        console.log("  [dry-run] Full-page apply form filled, would click Submit application here");
        return "dry_run";
      }
      await submitBtn.click();
      await sleep(2000);
      return true;
    }

    const reviewBtn = surface.getByRole("button", { name: /review/i }).first();
    const nextBtn = surface.getByRole("button", { name: /^next$/i }).first();
    const continueBtn = surface.getByRole("button", { name: /continue/i }).first();
    const hasReview = await reviewBtn.count().catch(() => 0);
    const hasNext = await nextBtn.count().catch(() => 0);
    const hasContinue = await continueBtn.count().catch(() => 0);
    const advance = hasReview ? reviewBtn : hasNext ? nextBtn : continueBtn;
    if (!hasReview && !hasNext && !hasContinue) return false; // stuck - unknown step layout

    await advance.click();
    await sleep(1200);
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

// A radio-button fieldset's question is usually its <legend>; LinkedIn
// sometimes puts it in an aria-label on the fieldset itself instead.
async function firstGroupText(group) {
  const legend = group.locator("legend").first();
  if (await legend.count().catch(() => 0)) {
    const text = (await legend.textContent().catch(() => "")) || "";
    if (text.trim()) return text.trim();
  }
  const aria = await group.getAttribute("aria-label").catch(() => null);
  return (aria || "").trim();
}

// TODO(you): given a radio group's question text and its option labels,
// decide which option index answers it - or return null to leave it
// unanswered rather than guess (an unanswered required group just means this
// job stays "incomplete_needs_review", which is the safe failure mode; a
// *wrong* answer submitted to a real company is worse than that).
//
// `directAnswer(groupLabel, profile)` (imported above) gives you the same
// lookup used for text fields - e.g. for "Are you willing to relocate?" it
// returns "Yes" from profile.standardAnswers. Your job here is matching that
// expected answer string against `optionLabels` (LinkedIn's actual button
// text varies: "Yes"/"No", "Yes, I am willing", numeric ranges for experience
// questions, etc.) - exact match, substring, or something smarter is your
// call. Numeric-range options (e.g. "5-7 years" vs profile.yearsExperience)
// are a case worth deciding deliberately rather than leaving to substring luck.
//
// Params: { groupLabel: string, optionLabels: string[], profile: object }
// Returns: number (index into optionLabels) | null
function pickRadioOption({ groupLabel, optionLabels, profile }) {
  const expected = directAnswer(groupLabel, profile);
  if (!expected) return null; // no confident answer for this question - leave unanswered

  const normalize = (value) => String(value || "").toLowerCase().trim();
  const expectedNorm = normalize(expected);
  const optionsNorm = optionLabels.map(normalize);

  // Numeric experience-range questions ("0-1 years", "5-7 years", "7+ years"):
  // directAnswer returns a plain number (profile.yearsExperience) for these,
  // so route them by range containment instead of string matching.
  if (/experience/.test(groupLabel.toLowerCase()) && /^\d+(\.\d+)?$/.test(expectedNorm)) {
    const years = parseFloat(expectedNorm);
    let bestIndex = null;
    optionsNorm.forEach((opt, i) => {
      const range = opt.match(/(\d+)\s*-\s*(\d+)/);
      const plus = opt.match(/(\d+)\s*\+/);
      if (range && years >= Number(range[1]) && years <= Number(range[2])) bestIndex = i;
      else if (plus && years >= Number(plus[1])) bestIndex = i;
      else if (opt === String(Math.round(years))) bestIndex = i;
    });
    return bestIndex;
  }

  // Yes/No questions (relocate, sponsorship, remote/hybrid/onsite, work
  // authorization all resolve to "Yes"/"No" via directAnswer's regex table).
  // Word-boundary match so "No" never matches inside a "Yes, ..." option and
  // vice versa; exact match tried first since it's unambiguous.
  if (/^(yes|no)$/.test(expectedNorm)) {
    const exact = optionsNorm.findIndex((opt) => opt === expectedNorm);
    if (exact !== -1) return exact;
    const wordBoundary = optionsNorm.findIndex((opt) => new RegExp(`\\b${expectedNorm}\\b`).test(opt));
    return wordBoundary !== -1 ? wordBoundary : null;
  }

  // General free-text expected answer (e.g. CTC/notice period occasionally
  // phrased as a radio choice rather than a text field): exact match, then
  // substring either direction.
  const exact = optionsNorm.findIndex((opt) => opt === expectedNorm);
  if (exact !== -1) return exact;
  const substring = optionsNorm.findIndex((opt) => opt.includes(expectedNorm) || expectedNorm.includes(opt));
  return substring !== -1 ? substring : null;
}

async function firstText(page, selectors, fallback = "") {
  for (const selector of selectors) {
    const text = await page.locator(selector).first().textContent({ timeout: 2500 }).catch(() => "");
    if (text && text.trim()) return text.trim();
  }
  return fallback;
}

async function run({ page, profile, keywords, location, limit, dryRun = false }) {
  await login(page);
  const searchUrl = buildSearchUrl({ keywords, location });
  await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 20000 });
  await sleep(2000);

  const jobCards = await collectJobCards(page, limit * 2); // over-collect; some will be skipped/scored out
  console.log(`[linkedin] Search URL: ${searchUrl}`);
  console.log(`[linkedin] Found ${jobCards.length} job link${jobCards.length === 1 ? "" : "s"} to inspect.`);
  if (jobCards.length === 0) {
    console.log("[linkedin] No job links were collected. LinkedIn may have changed the page layout, blocked the search, or returned no Easy Apply results for these filters.");
  }
  let applied = 0;

  for (const jobCard of jobCards) {
    const jobUrl = jobCard.url;
    if (applied >= limit) break;
    const jobKey = `${SITE}:${jobUrl}`;
    if (applicationLog.hasApplied(jobKey)) continue;

    console.log(`[linkedin] Inspecting ${jobUrl}`);
    await page.goto(jobUrl, { waitUntil: "domcontentloaded", timeout: 20000 }).catch((error) => {
      console.log(`[linkedin] Page load warning for ${jobUrl}: ${error.message}`);
    });
    await sleep(1500);

    const title = await firstText(page, [
      "h1",
      ".job-details-jobs-unified-top-card__job-title",
      ".jobs-unified-top-card__job-title",
      "[data-test-job-title]"
    ], jobCard.title || "Unknown title");
    const company = await firstText(page, [
      "a.job-details-jobs-unified-top-card__company-name",
      "span.jobs-unified-top-card__company-name",
      ".job-details-jobs-unified-top-card__company-name",
      "[data-test-job-company-name]"
    ], jobCard.company || "Unknown company");
    const description = await firstText(page, [
      "div.jobs-description__content",
      "div#job-details",
      ".jobs-box__html-content"
    ], "");

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

    // LinkedIn either opens the modal in place (URL unchanged) or navigates
    // to a full-page /apply/ flow (own multi-page UI, or a third-party ATS
    // like Ceipal) - route to the matching handler rather than assuming.
    const isFullPageApply = /\/apply\//.test(page.url());
    const outcome = isFullPageApply
      ? await handleFullPageApply(page, profile, jobText.slice(0, 800), dryRun)
      : await handleEasyApplyModal(page, profile, jobText.slice(0, 800), dryRun);
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
