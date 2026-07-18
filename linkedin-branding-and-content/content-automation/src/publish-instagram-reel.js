const fs = require("fs");
const path = require("path");
const { publishReel, verifyAccount } = require("./instagram");
const { root, instagramReelBaseUrl } = require("./config");

const manifestPath = path.join(root, "reel-generator", "manifest.json");
const outputDir = path.join(root, "reel-generator", "output");
const statePath = path.join(root, "instagram-publish-state.json");

function loadJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadReels() {
  const manifest = loadJson(manifestPath, []);
  const seen = new Set();
  return manifest
    .filter((entry) => entry.status === "ok" && entry.outPath)
    .map((entry) => ({ ...entry, filename: path.basename(entry.outPath) }))
    .filter((entry) => {
      if (seen.has(entry.filename)) return false;
      seen.add(entry.filename);
      return fs.existsSync(path.join(outputDir, entry.filename));
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

function publicVideoUrl(filename) {
  return `${instagramReelBaseUrl.replace(/\/$/, "")}/${encodeURIComponent(filename)}`;
}

function hashtagsFor(entry) {
  const series = String(entry.series || "").toLowerCase();
  if (series.includes("kubernetes")) return "#Kubernetes #DevOps #CloudNative #PlatformEngineering";
  if (series.includes("mlops")) return "#MLOps #MachineLearning #AIEngineering #DevOps";
  if (series.includes("python")) return "#Python #Automation #DevOps #SoftwareEngineering";
  if (series.includes("data science")) return "#DataScience #MachineLearning #AI #MLOps";
  return "#DevOps #CloudComputing #SRE #Engineering";
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
  if (reels.length === 0) throw new Error(`No generated MP4 reels found in ${outputDir}`);
  const state = loadState();
  const reel = selectReel(reels, state, args.filename);
  if (!reel) {
    console.log(`All ${reels.length} reels have already been published.`);
    return;
  }

  const videoUrl = publicVideoUrl(reel.filename);
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
  console.log(`Published Instagram Reel ${reel.filename}: ${result.mediaId}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
