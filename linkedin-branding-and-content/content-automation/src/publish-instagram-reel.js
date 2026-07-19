const fs = require("fs");
const path = require("path");
const { publishReel, verifyAccount } = require("./instagram");
const { root, instagramReelBaseUrl } = require("./config");

const manifestPath = path.join(root, "reel-generator", "manifest.json");
const outputDir = path.join(root, "reel-generator", "output");
// The numbered queue (NNN-...mp4) holds the narrated reels that actually get
// posted; the manifest fallback below is a safety net for the older silent
// renders, which live in a separate subfolder now that output/ is split.
const queueDir = path.join(outputDir, "narrated");
const silentDir = path.join(outputDir, "without-narration");
const statePath = path.join(root, "instagram-publish-state.json");

function loadJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadReels() {
  const numberedQueue = fs.readdirSync(queueDir)
    .filter((filename) => /^\d{3}-.*\.mp4$/i.test(filename))
    .sort()
    .map((filename) => ({
      filename,
      dir: "narrated",
      topic: filename
        .replace(/^\d{3}-/, "")
        .replace(/-narrated\.mp4$/i, "")
        .replace(/\.mp4$/i, "")
        .replace(/-/g, " ")
    }));
  if (numberedQueue.length > 0) return numberedQueue;

  const manifest = loadJson(manifestPath, []);
  const seen = new Set();
  return manifest
    .filter((entry) => entry.status === "ok" && entry.outPath)
    .map((entry) => ({ ...entry, filename: path.basename(entry.outPath), dir: "without-narration" }))
    .filter((entry) => {
      if (seen.has(entry.filename)) return false;
      seen.add(entry.filename);
      return fs.existsSync(path.join(silentDir, entry.filename));
    });
}

function loadState() {
  const state = loadJson(statePath, { published: [] });
  if (!Array.isArray(state.published)) state.published = [];
  return state;
}

function saveState(state) {
  const temporaryPath = `${statePath}.tmp`;
  fs.writeFileSync(temporaryPath, `${JSON.stringify(state, null, 2)}\n`);
  fs.renameSync(temporaryPath, statePath);
}

function publicVideoUrl(reel) {
  return `${instagramReelBaseUrl.replace(/\/$/, "")}/${reel.dir}/${encodeURIComponent(reel.filename)}`;
}

// Keyword -> hashtag groups, checked against series (when present, e.g. the
// manifest fallback) and the topic text (always present, including for the
// numbered-queue reels, which never carry a `series`). Multiple groups can
// match a single topic; results are merged so reach isn't limited to one bucket.
const HASHTAG_RULES = [
  [/kubernetes|k8s/, "#Kubernetes #DevOps #CloudNative #PlatformEngineering"],
  [/mlops|machine learning|\bml\b/, "#MLOps #MachineLearning #AIEngineering #DevOps"],
  [/\bpython\b/, "#Python #Automation #DevOps #SoftwareEngineering"],
  [/data science|dataset/, "#DataScience #MachineLearning #AI #MLOps"],
  [/terraform|infrastructure as code|\biac\b/, "#Terraform #IaC #DevOps #CloudEngineering"],
  [/\bgcp\b|google cloud/, "#GCP #GoogleCloud #CloudComputing #DevOps"],
  [/\baws\b/, "#AWS #CloudComputing #DevOps"],
  [/\bazure\b/, "#Azure #CloudComputing #DevOps"],
  [/security|secrets|\biam\b|rbac/, "#CloudSecurity #DevSecOps #Security"],
  [/ci\/cd|cicd|pipeline/, "#CICD #DevOps #SoftwareEngineering"],
  [/observability|monitoring|incident|sre\b/, "#Observability #SRE #DevOps"],
  [/finops|cost/, "#FinOps #CloudCost #DevOps"],
  [/aiops/, "#AIOps #DevOps #Automation"]
];

function hashtagsFor(entry) {
  const text = `${entry.series || ""} ${entry.topic || entry.filename || ""}`.toLowerCase();
  const tags = new Set();
  for (const [pattern, group] of HASHTAG_RULES) {
    if (pattern.test(text)) group.split(" ").forEach((tag) => tags.add(tag));
  }
  if (tags.size === 0) return "#DevOps #CloudComputing #SRE #Engineering";
  return [...tags].slice(0, 10).join(" ");
}

function captionFor(entry) {
  const topic = String(entry.topic || entry.filename.replace(/\.mp4$/i, "").replace(/-/g, " ")).trim();
  return `${topic}\n\nA quick visual breakdown for engineers building reliable systems. Save it for your next implementation or interview review.\n\nWhat would you add from your production experience?\n\n${hashtagsFor(entry)}`;
}

function selectReel(reels, state, requestedFilename) {
  const published = new Set(state.published.map((entry) => entry.filename));
  if (requestedFilename) {
    const match = reels.find((entry) => entry.filename === path.basename(requestedFilename));
    if (!match) throw new Error(`Reel not found in manifest/output: ${requestedFilename}`);
    if (published.has(match.filename)) throw new Error(`Reel was already published: ${match.filename}`);
    return match;
  }
  return reels.find((entry) => !published.has(entry.filename));
}

function parseArgs(argv) {
  const args = { dryRun: false, verify: false, filename: "", shareToFeed: true };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--dry-run") args.dryRun = true;
    else if (arg === "--verify") args.verify = true;
    else if (arg === "--no-share-to-feed") args.shareToFeed = false;
    else if (arg === "--filename") args.filename = argv[index += 1] || "";
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.verify) {
    const account = await verifyAccount();
    console.log(`Instagram API connected for @${account.username || "account"}.`);
    return;
  }

  const reels = loadReels();
  if (reels.length === 0) throw new Error(`No generated MP4 reels found in ${queueDir}`);
  const state = loadState();
  const reel = selectReel(reels, state, args.filename);
  if (!reel) {
    console.log(`All ${reels.length} reels have already been published.`);
    return;
  }

  const videoUrl = publicVideoUrl(reel);
  const caption = captionFor(reel);
  if (args.dryRun || String(process.env.DRY_RUN || "").toLowerCase() === "true") {
    console.log(`[dry-run] Reel: ${reel.filename}`);
    console.log(`[dry-run] Topic: ${reel.topic}`);
    console.log(`[dry-run] Video URL: ${videoUrl}`);
    console.log(`[dry-run] Already published: ${state.published.length}/${reels.length}`);
    return;
  }

  const result = await publishReel({ videoUrl, caption, shareToFeed: args.shareToFeed });
  state.published.push({
    filename: reel.filename,
    topic: reel.topic,
    publishedAt: new Date().toISOString(),
    containerId: result.containerId,
    mediaId: result.mediaId
  });
  saveState(state);
  fs.unlinkSync(path.join(outputDir, reel.dir, reel.filename));
  console.log(`Published Instagram Reel ${reel.filename}: ${result.mediaId}`);
  console.log(`Removed published Reel from queue: ${reel.filename}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
