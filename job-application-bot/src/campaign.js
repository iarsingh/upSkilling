#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { ROOT, profile, maxApplicationsPerRun } = require("./lib/config");
const { openSite } = require("./lib/browserSession");

const sites = {
  linkedin: require("./sites/linkedin"),
  naukri: require("./sites/naukri"),
  indeed: require("./sites/indeed"),
  "generic-ats": require("./sites/genericAts"),
  uplers: require("./sites/uplers"),
  cutshort: require("./sites/cutshort")
};

const campaignPath = path.join(ROOT, "config", "campaigns.json");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseArgs(argv) {
  const args = {
    campaign: "default",
    submit: false,
    review: false,
    headless: null,
    only: null,
    limit: null,
    loginOnly: false
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--campaign") args.campaign = argv[++i];
    else if (arg === "--submit") args.submit = true;
    else if (arg === "--review" || arg === "--dry-run") args.review = true;
    else if (arg === "--headless") args.headless = true;
    else if (arg === "--headed") args.headless = false;
    else if (arg === "--only") args.only = argv[++i].split(",").map((site) => site.trim()).filter(Boolean);
    else if (arg === "--limit") args.limit = Number(argv[++i]);
    else if (arg === "--login-only") args.loginOnly = true;
  }

  return args;
}

function printHelp() {
  console.log(`
job-application-bot campaign runner

Usage:
  node src/campaign.js
  node src/campaign.js --only linkedin,naukri --limit 3
  node src/campaign.js --submit --only naukri --limit 5
  node src/campaign.js --campaign default --headless
  node src/campaign.js --login-only --only linkedin,naukri,indeed

Options:
  --campaign   campaign name from config/campaigns.json        (default: default)
  --only       comma-separated sites to run                     (example: linkedin,naukri,indeed)
  --limit      override per-site limit for this run
  --review     prepare/fill applications but stop before submit (default unless campaign mode is submit)
  --submit     allow supported adapters to click final Submit
  --headless   run browser headlessly
  --headed     force visible browser
  --login-only open each selected portal for manual login, then save sessions
`);
}

function loadCampaign(name) {
  if (!fs.existsSync(campaignPath)) {
    throw new Error(`Missing campaign config: ${campaignPath}`);
  }

  const campaigns = JSON.parse(fs.readFileSync(campaignPath, "utf8"));
  const campaign = campaigns[name];
  if (!campaign) {
    throw new Error(`Unknown campaign "${name}". Available campaigns: ${Object.keys(campaigns).join(", ")}`);
  }

  return campaign;
}

function resolveMode(campaign, args) {
  if (args.submit) return "submit";
  if (args.review) return "review";
  return campaign.mode === "submit" ? "submit" : "review";
}

function enabledTargets(campaign, args) {
  return campaign.sites
    .filter((target) => target.enabled !== false)
    .filter((target) => !args.only || args.only.includes(target.site))
    .map((target) => ({
      keywords: "DevOps Engineer Kubernetes GCP",
      location: "India",
      limit: maxApplicationsPerRun,
      ...target,
      limit: args.limit || target.limit || maxApplicationsPerRun
    }));
}

async function runTarget(target, options) {
  const adapter = sites[target.site];
  if (!adapter) {
    throw new Error(`Unsupported site "${target.site}". Valid sites: ${Object.keys(sites).join(", ")}`);
  }

  if (target.site === "generic-ats" && (!target.urls || target.urls.length === 0)) {
    throw new Error("generic-ats target requires a non-empty urls array in config/campaigns.json");
  }

  const { context, page } = await openSite(target.site, { headless: options.headless });
  try {
    if (options.loginOnly) {
      if (!adapter.login) {
        console.log(`${target.site} does not require login.`);
        return 0;
      }
      await adapter.login(page);
      console.log(`Login confirmed for ${target.site}.`);
      return 0;
    }

    if (target.site === "generic-ats") {
      return adapter.run({
        page,
        profile,
        jobUrls: target.urls,
        limit: target.limit,
        dryRun: options.dryRun
      });
    }

    return adapter.run({
      page,
      profile,
      keywords: target.keywords,
      location: target.location,
      limit: target.limit,
      dryRun: options.dryRun
    });
  } finally {
    await context.close().catch(() => {});
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const campaign = loadCampaign(args.campaign);
  const mode = resolveMode(campaign, args);
  const dryRun = mode !== "submit";
  const headless = args.headless ?? Boolean(campaign.headless);
  const delayMs = Number(campaign.perSiteDelaySeconds || 0) * 1000;
  const targets = enabledTargets(campaign, args);

  if (targets.length === 0) {
    throw new Error(args.only ? `No enabled targets matched --only ${args.only.join(",")}` : "No enabled targets in campaign.");
  }

  console.log(`Campaign: ${args.campaign}`);
  console.log(`Mode: ${args.loginOnly ? "LOGIN ONLY" : dryRun ? "REVIEW (no final submit)" : "SUBMIT (real applications may be submitted)"}`);
  console.log(`Sites: ${targets.map((target) => target.site).join(", ")}\n`);

  const results = [];
  for (const target of targets) {
    console.log(`=== ${target.site}: "${target.keywords || `${target.urls.length} direct URLs`}" (${target.location || "direct"}) limit ${target.limit} ===`);

    try {
      const count = await runTarget(target, { dryRun, headless, loginOnly: args.loginOnly });
      results.push({ site: target.site, status: "ok", count });
      console.log(`Finished ${target.site}: ${args.loginOnly ? "login checked" : `${count} ${dryRun ? "prepared" : "submitted"}`}.\n`);
    } catch (error) {
      results.push({ site: target.site, status: "failed", error: error.message });
      console.error(`Failed ${target.site}: ${error.message}\n`);
    }

    if (delayMs > 0) await sleep(delayMs);
  }

  console.log("Campaign summary:");
  for (const result of results) {
    if (result.status === "ok") {
      console.log(`- ${result.site}: ${args.loginOnly ? "login checked" : `${result.count} ${dryRun ? "prepared" : "submitted"}`}`);
    } else {
      console.log(`- ${result.site}: failed (${result.error})`);
    }
  }
  console.log("\nApplication log: data/applied-jobs.json");
}

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  printHelp();
} else {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
