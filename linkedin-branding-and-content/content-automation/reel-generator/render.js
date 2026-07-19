const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const { chromium } = require("playwright");
const { parsePost } = require("./parser");
const { buildHTML } = require("./template");

const WIDTH = 1080;
const HEIGHT = 1920;

// Pass a shared `browser` when rendering many posts in a batch — launching a
// fresh Chromium per video is the slow part, so batch.js keeps one instance
// alive across the whole run and only opens/closes contexts per video.
async function renderPost(filePath, outDir, browser, opts = {}) {
  const post = parsePost(filePath);
  const { html, total } = buildHTML(post, opts);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "reel-"));
  const htmlPath = path.join(tmpDir, "index.html");
  fs.writeFileSync(htmlPath, html);

  const ownBrowser = !browser;
  const activeBrowser = browser || (await chromium.launch());
  const context = await activeBrowser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    recordVideo: { dir: tmpDir, size: { width: WIDTH, height: HEIGHT } },
  });
  const page = await context.newPage();
  await page.goto("file://" + htmlPath);
  await page.waitForTimeout(total * 1000);
  await page.close();
  const videoPath = await page.video().path();
  await context.close();
  if (ownBrowser) await activeBrowser.close();

  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${post.slug}${opts.suffix || ""}.mp4`);
  execFileSync("ffmpeg", [
    "-y",
    "-i", videoPath,
    "-vf", `scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=decrease,pad=${WIDTH}:${HEIGHT}:(ow-iw)/2:(oh-ih)/2`,
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "-r", "30",
    outPath,
  ], { stdio: "pipe" });

  fs.rmSync(tmpDir, { recursive: true, force: true });
  return { post, outPath, duration: total };
}

module.exports = { renderPost };
