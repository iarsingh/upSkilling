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

  const waitForLogin = (timeout) => Promise.race([
    page.waitForSelector(loggedInSelector, { timeout }),
    new Promise((_, reject) => {
      page.once("close", () => reject(new Error("Browser window was closed before login completed.")));
    })
  ]);

  try {
    if (page.isClosed()) throw new Error("Browser window is already closed.");
    await waitForLogin(8000);
    return true;
  } catch {
    console.log(`\n${loginPromptMessage}`);
    console.log("Waiting up to 5 minutes for you to finish logging in in the opened browser window...");
    if (page.isClosed()) {
      throw new Error("Browser window was closed before login completed. Re-run with --login-only and keep the window open until login is detected.");
    }
    await waitForLogin(5 * 60 * 1000).catch((error) => {
      if (/closed|Target page|browser has been closed/i.test(error.message)) {
        throw new Error("Browser window was closed before login completed. Re-run with --login-only and keep the window open until login is detected.");
      }
      throw error;
    });
    console.log("Login detected. Session saved for future runs.\n");
    return true;
  }
}

module.exports = { openSite, ensureLoggedIn };
