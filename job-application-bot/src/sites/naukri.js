// Naukri.com "Quick Apply" automation. Naukri is generally more tolerant of
// automation than LinkedIn but still rate-limits aggressive activity - keep
// the human-ish delays below rather than removing them.

const { ensureLoggedIn } = require("../lib/browserSession");
const { scoreJob } = require("../lib/ollama");
const { fillField } = require("../lib/formFiller");
const applicationLog = require("../lib/applicationLog");

const SITE = "naukri";

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function login(page) {
  await ensureLoggedIn(page, {
    checkUrl: "https://www.naukri.com/mnjuser/homepage",
    loggedInSelector: "a.nI-gNb-drawer__icon, div.nI-gNb-icon-img",
    loginPromptMessage: "Please log in to Naukri in the opened browser window."
  });
}

function buildSearchUrl({ keywords, location }) {
  const slug = keywords.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const loc = (location || "india").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `https://www.naukri.com/${slug}-jobs-in-${loc}`;
}

async function collectJobCards(page, limit) {
  const urls = [];
  let lastCount = -1;
  while (urls.length < limit && urls.length !== lastCount) {
    lastCount = urls.length;
    const links = await page.locator("a.title").all();
    for (const link of links) {
      const href = await link.getAttribute("href").catch(() => null);
      if (href && !urls.includes(href)) urls.push(href);
      if (urls.length >= limit) break;
    }
    await page.mouse.wheel(0, 1400);
    await sleep(1200);
  }
  return urls.slice(0, limit);
}

async function handleChatbotOrForm(page, profile, jobContext) {
  // Naukri's Quick Apply sometimes opens a chatbot-style Q&A instead of a form.
  const chatInput = page.locator("div.chatbot_InputContainer input, div.chatbot_InputContainer textarea").first();
  for (let turn = 0; turn < 15; turn++) {
    if (!(await chatInput.count().catch(() => 0))) break;
    const questionEl = page.locator("div.botMsg, div.chatbot_ListItem").last();
    const question = (await questionEl.textContent().catch(() => "")) || "";
    if (!question) break;

    try {
      await fillField({ locator: chatInput, label: question, inputType: "text", profile, jobContext });
    } catch {
      break;
    }
    const sendBtn = page.locator("div.send button, button.sendMsg").first();
    if (await sendBtn.count().catch(() => 0)) {
      await sendBtn.click();
    } else {
      await chatInput.press("Enter");
    }
    await sleep(1200);
  }
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
    const company = await page.locator("a.title, div.jd-header-comp-name").first().textContent().catch(() => "Unknown company");
    const description = await page.locator("div.job-desc, section.job-desc").first().textContent().catch(() => "");

    const jobText = `${title}\n${company}\n${description}`;
    const score = await scoreJob(jobText, profile);
    if (score.decision !== "apply") {
      console.log(`[naukri] Skipping "${(title || "").trim()}" (${score.reason || "low match"})`);
      continue;
    }

    const applyBtn = page.getByRole("button", { name: /apply/i }).first();
    if (!(await applyBtn.count().catch(() => 0))) {
      console.log(`[naukri] No apply button for "${(title || "").trim()}" - skipping.`);
      continue;
    }

    // Naukri's Quick Apply chat flow submits each answer as it's typed - there
    // is no single final "Submit" click to intercept. So in dry-run mode we
    // stop before engaging Apply at all, rather than risk a partial real
    // submission.
    if (dryRun) {
      applicationLog.record({
        site: SITE, jobKey, title: (title || "").trim(), company: (company || "").trim(),
        url: jobUrl, status: "dry_run", matchedKeywords: score.matched_keywords || [], score: score.score
      });
      applied++;
      console.log(`[naukri] [dry-run] Would apply: "${(title || "").trim()}" @ ${(company || "").trim()}`);
      await sleep(1500 + Math.random() * 1500);
      continue;
    }

    await applyBtn.click();
    await sleep(2000);

    await handleChatbotOrForm(page, profile, jobText.slice(0, 800));

    const success = await page.locator("text=/application(\\s+has\\s+been)?\\s+sent|applied successfully/i").first().count().catch(() => 0);

    applicationLog.record({
      site: SITE,
      jobKey,
      title: (title || "").trim(),
      company: (company || "").trim(),
      url: jobUrl,
      status: success ? "submitted" : "incomplete_needs_review",
      matchedKeywords: score.matched_keywords || [],
      score: score.score
    });

    if (success) {
      applied++;
      console.log(`[naukri] Applied: "${(title || "").trim()}" @ ${(company || "").trim()}`);
    } else {
      console.log(`[naukri] Could not confirm submission for "${(title || "").trim()}" - logged for manual review.`);
    }

    await sleep(2000 + Math.random() * 2000);
  }

  return applied;
}

module.exports = { SITE, run, login };
