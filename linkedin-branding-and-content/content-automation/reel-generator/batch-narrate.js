const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const { parsePost } = require("./parser");
const { narratePost, OUT_DIR } = require("./narrate");
const { dedupeByTopic, CONTENT_POSTS_DIR, GKE_POSTS_DIR } = require("./batch");

const MANIFEST_PATH = path.join(__dirname, "narrate-manifest.json");
// Lower than batch.js's render-only concurrency: each job also shells out to
// `say` and does a second ffmpeg mux pass, so fewer parallel Chromium
// contexts are needed to keep the machine busy.
const CONCURRENCY = 3;

async function pool(items, limit, worker) {
  const results = [];
  let i = 0;
  async function next() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await worker(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: limit }, next));
  return results;
}

async function main() {
  const contentFiles = dedupeByTopic(CONTENT_POSTS_DIR);
  const gkeFiles = fs
    .readdirSync(GKE_POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(GKE_POSTS_DIR, f));

  const allFiles = [...contentFiles, ...gkeFiles];
  console.log(`Narrating ${allFiles.length} videos (${contentFiles.length} content-automation + ${gkeFiles.length} gke-terraform), concurrency=${CONCURRENCY}`);

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const manifest = [];
  let done = 0;
  let failed = 0;
  const startedAt = Date.now();

  await pool(allFiles, CONCURRENCY, async (file) => {
    const label = path.basename(file);
    try {
      const preview = parsePost(file);
      const outPath = path.join(OUT_DIR, `${preview.slug}-narrated.mp4`);
      if (fs.existsSync(outPath)) {
        done++;
        manifest.push({ file: label, status: "skipped-existing", outPath });
        return;
      }
      const r = await narratePost(file, browser);
      done++;
      manifest.push({
        file: label,
        status: "ok",
        topic: r.post.topic,
        series: r.post.series,
        outPath: r.outPath,
        videoDur: r.videoDur,
        audioDur: r.audioDur,
      });
      console.log(`[${done + failed}/${allFiles.length}] OK  ${r.post.slug}-narrated.mp4`);
    } catch (err) {
      failed++;
      manifest.push({ file: label, status: "error", error: String(err && err.message || err) });
      console.error(`[${done + failed}/${allFiles.length}] FAIL ${label}: ${err && err.message}`);
    }
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  });

  await browser.close();
  const mins = ((Date.now() - startedAt) / 60000).toFixed(1);
  console.log(`\nDone in ${mins} min. ${done} rendered/skipped, ${failed} failed.`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
}

main().catch((err) => {
  console.error("Batch failed:", err);
  process.exit(1);
});
