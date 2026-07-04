#!/usr/bin/env node
const { profile, maxApplicationsPerRun } = require("./lib/config");
const { openSite } = require("./lib/browserSession");

const sites = {
  linkedin: require("./sites/linkedin"),
  naukri: require("./sites/naukri"),
  indeed: require("./sites/indeed"),
  "generic-ats": require("./sites/genericAts"),
  uplers: require("./sites/uplers"),
  cutshort: require("./sites/cutshort")
};

function parseArgs(argv) {
  const args = { site: "linkedin", keywords: "DevOps Engineer Kubernetes GCP", location: "India", limit: maxApplicationsPerRun, dryRun: false, headless: false, loginOnly: false, urls: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--site") args.site = argv[++i];
    else if (a === "--keywords") args.keywords = argv[++i];
    else if (a === "--location") args.location = argv[++i];
    else if (a === "--limit") args.limit = Number(argv[++i]);
    else if (a === "--dry-run") args.dryRun = true;
    else if (a === "--headless") args.headless = true;
    else if (a === "--login-only") args.loginOnly = true;
    else if (a === "--urls") args.urls = argv[++i].split(",").map((u) => u.trim());
  }
  return args;
}

function printHelp() {
  console.log(`
job-application-bot

Usage:
  node src/cli.js --site linkedin --keywords "DevOps Kubernetes GCP" --location "India" --limit 20
  node src/cli.js --site generic-ats --urls "https://boards.greenhouse.io/acme/jobs/123,https://jobs.lever.co/acme/456"
  node src/cli.js --site naukri --login-only
  node src/cli.js --site linkedin --dry-run   # fill forms but never click the final Submit

Options:
  --site        linkedin | naukri | indeed | generic-ats | uplers | cutshort   (default: linkedin)
  --keywords    search keywords                                                (default: "DevOps Engineer Kubernetes GCP")
  --location    search location                                                (default: "India")
  --limit       max applications to submit this run                           (default: from .env MAX_APPLICATIONS_PER_RUN, else 25)
  --dry-run     fill out every form but stop before the final submit click
  --headless    run without a visible browser window (only after you've logged in once)
  --login-only  just open the site and wait for you to log in, then exit
  --urls        comma-separated job URLs (generic-ats site only)
`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!sites[args.site]) {
    console.error(`Unknown site "${args.site}". Valid sites: ${Object.keys(sites).join(", ")}`);
    printHelp();
    process.exitCode = 1;
    return;
  }

  const adapter = sites[args.site];
  const { context, page } = await openSite(args.site, { headless: args.headless });

  try {
    if (args.loginOnly) {
      if (!adapter.login) {
        console.log(`${args.site} does not require login (it's a public per-posting form).`);
        return;
      }
      await adapter.login(page);
      console.log("Login confirmed and session saved. You can now run headless.");
      return;
    }

    if (args.dryRun) {
      console.log("Running in DRY-RUN mode: forms will be filled but no application will actually be submitted.\n");
    }

    let applied;
    if (args.site === "generic-ats") {
      if (!args.urls || args.urls.length === 0) {
        console.error("generic-ats requires --urls \"<comma-separated job posting URLs>\"");
        process.exitCode = 1;
        return;
      }
      applied = await adapter.run({ page, profile, jobUrls: args.urls, limit: args.limit, dryRun: args.dryRun });
    } else {
      applied = await adapter.run({
        page,
        profile,
        keywords: args.keywords,
        location: args.location,
        limit: args.limit,
        dryRun: args.dryRun
      });
    }

    console.log(`\nDone. ${applied} application${applied === 1 ? "" : "s"} ${args.dryRun ? "would be submitted" : "submitted"} this run.`);
    console.log(`Full log: data/applied-jobs.json`);
  } finally {
    await context.close();
  }
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  printHelp();
} else {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
