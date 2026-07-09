#!/usr/bin/env node
const { chromium } = require("playwright");
const { profile } = require("./lib/config");
const { genericFormPass } = require("./lib/genericFormPass");

function parseArgs(argv) {
  const args = {
    endpoint: "http://127.0.0.1:9222",
    urlMatch: null,
    steps: 1,
    submit: false
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--endpoint") args.endpoint = argv[++i];
    else if (arg === "--url-match") args.urlMatch = argv[++i];
    else if (arg === "--steps") args.steps = Number(argv[++i]);
    else if (arg === "--submit") args.submit = true;
  }

  return args;
}

function printHelp() {
  console.log(`
Attach runner for an already-open Chrome session

1. Open Chrome with remote debugging:
   /Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --remote-debugging-port=9222 --user-data-dir=/tmp/job-apply-chrome

2. Log in to the job portal manually and open an application page.

3. Run:
   node src/attachRunner.js
   node src/attachRunner.js --url-match linkedin.com --steps 3

Options:
  --endpoint   Chrome DevTools endpoint              (default: http://127.0.0.1:9222)
  --url-match  choose an open tab whose URL contains this text
  --steps      form wizard steps to fill/advance      (default: 1)
  --submit     allow final submit click               (default: review mode, no final submit)
`);
}

async function pickPage(browser, urlMatch) {
  const pages = browser.contexts().flatMap((context) => context.pages())
    .filter((page) => !page.url().startsWith("devtools://"));

  if (pages.length === 0) {
    throw new Error("No open tabs found in the debug Chrome session.");
  }

  if (urlMatch) {
    const matched = pages.find((page) => page.url().includes(urlMatch));
    if (!matched) {
      throw new Error(`No open tab URL matched "${urlMatch}". Open tabs:\n${pages.map((page) => `- ${page.url()}`).join("\n")}`);
    }
    return matched;
  }

  return pages[pages.length - 1];
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const browser = await chromium.connectOverCDP(args.endpoint);

  const page = await pickPage(browser, args.urlMatch);
  console.log(`Using tab: ${page.url()}`);
  console.log(args.submit ? "Mode: SUBMIT" : "Mode: REVIEW (will not click final submit)");

  const bodyText = await page.locator("body").innerText({ timeout: 5000 }).catch(() => "");
  const outcome = await genericFormPass(page, profile, bodyText.slice(0, 1200), {
    maxSteps: args.steps,
    dryRun: !args.submit
  });

  if (outcome === "dry_run") {
    console.log("Filled available fields and stopped before final submit.");
  } else if (outcome === true) {
    console.log("Submitted the form.");
  } else {
    console.log("Filled what could be matched. Some fields may need manual review.");
  }
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  printHelp();
} else {
  main().then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });
}
