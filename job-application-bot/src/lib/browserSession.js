const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");
const { browserDataDir } = require("./config");

// Each site gets its own persistent Chromium profile directory, so cookies/
// localStorage (i.e. your login session) survive across runs. The very
// first run for a site should be launched headed so you can log in by hand
// (including any 2FA/OTP prompt); every run after that can reuse the saved
// session, headless or headed.
async function openSite(siteName, { headless = false } = {}) {
  const userDataDir = path.join(browserDataDir, siteName);
  fs.mkdirSync(userDataDir, { recursive: true });

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless,
    channel: "chrome", // drive the system-installed Google Chrome instead of downloading Playwright's bundled Chromium
    viewport: { width: 1400, height: 950 },
    args: ["--disable-blink-features=AutomationControlled"]
  });

  const page = context.pages()[0] || (await context.newPage());
  return { context, page };
}

async function ensureLoggedIn(page, { checkUrl, loggedInSelector, loginPromptMessage }) {
  await page.goto(checkUrl, { waitUntil: "domcontentloaded", timeout: 20000 }).catch((error) => {
    console.log(`Login page navigation warning: ${error.message}`);
  });
  try {
    await page.waitForSelector(loggedInSelector, { timeout: 8000 });
    return true;
  } catch {
    console.log(`\n${loginPromptMessage}`);
    console.log("Waiting up to 5 minutes for you to finish logging in in the opened browser window...");
    await page.waitForSelector(loggedInSelector, { timeout: 5 * 60 * 1000 });
    console.log("Login detected. Session saved for future runs.\n");
    return true;
  }
}

module.exports = { openSite, ensureLoggedIn };
