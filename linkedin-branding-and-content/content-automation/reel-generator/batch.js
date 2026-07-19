const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
const { parsePost } = require("./parser");
const { renderPost } = require("./render");

const CONTENT_POSTS_DIR = path.join(__dirname, "..", "posts");
const GKE_POSTS_DIR = path.join(__dirname, "..", "..", "gke-terraform-content", "posts");
const OUT_DIR = path.join(__dirname, "output", "without-narration");
const MANIFEST_PATH = path.join(__dirname, "manifest.json");
const CONCURRENCY = 4;

// Same-topic reposts on different dates are byte-identical (verified before
// running this) — keep one file per exact `topic:` string so we render every
// distinct piece of copy once, not the same video eight times.
function dedupeByTopic(dir) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  const byTopic = new Map();
  for (const f of files) {
    const full = path.join(dir, f);
    const post = parsePost(full);
    const key = post.topic || post.baseTopic;
    const existing = byTopic.get(key);
    if (!existing || f < existing.file) byTopic.set(key, { file: f, full });
  }
  return [...byTopic.values()].map((v) => v.full);
}

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
  console.log(`Rendering ${allFiles.length} videos (${contentFiles.length} content-automation + ${gkeFiles.length} gke-terraform), concurrency=${CONCURRENCY}`);

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
      const outPath = path.join(OUT_DIR, `${preview.slug}.mp4`);
      if (fs.existsSync(outPath)) {
        done++;
        manifest.push({ file: label, status: "skipped-existing", outPath });
        return;
      }
      const r = await renderPost(file, OUT_DIR, browser);
      done++;
      manifest.push({
        file: label,
        status: "ok",
        topic: r.post.topic,
        series: r.post.series,
        outPath: r.outPath,
        duration: r.duration,
      });
      console.log(`[${done + failed}/${allFiles.length}] OK  ${r.post.slug}.mp4`);
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

module.exports = { dedupeByTopic, CONTENT_POSTS_DIR, GKE_POSTS_DIR };

if (require.main === module) {
  main().catch((err) => {
    console.error("Batch failed:", err);
    process.exit(1);
  });
}
