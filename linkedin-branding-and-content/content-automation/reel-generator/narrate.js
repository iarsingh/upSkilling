const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const { parsePost } = require("./parser");
const { renderPost } = require("./render");

const VOICE = "Samantha";
const OUT_DIR = path.join(__dirname, "output", "narrated");
// Extra seconds of animation held after the narration's last word, so the
// outro/closing-question beat doesn't get cut immediately on the final line.
const TAIL_BUFFER = 1.2;

// Reads the on-screen text back in the same order it appears: title, hook,
// each flow step announced by number (matching the numbered badges in the
// video), then the closing question. Commas/periods are tuned for `say`'s
// pacing so it doesn't rush straight through a section boundary. Hashtags
// are skipped — they're a visual tag, not something worth hearing aloud.
function buildNarrationScript(post) {
  const parts = [`${post.baseTopic}.`, `${post.hook}`, "Here's the flow."];
  post.steps.forEach((step, i) => {
    parts.push(`Step ${i + 1}: ${step}.`);
  });
  if (post.closingQuestion) parts.push(post.closingQuestion);
  return parts.join(" ");
}

function ffprobeDuration(file) {
  const out = execFileSync("ffprobe", [
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    file,
  ]).toString().trim();
  return parseFloat(out);
}

function synthesizeSpeech(text, tmpDir) {
  const aiffPath = path.join(tmpDir, "narration.aiff");
  execFileSync("say", ["-v", VOICE, "-o", aiffPath, text]);
  const m4aPath = path.join(tmpDir, "narration.m4a");
  execFileSync("ffmpeg", ["-y", "-i", aiffPath, "-c:a", "aac", "-b:a", "128k", m4aPath], { stdio: "pipe" });
  return m4aPath;
}

// Simple mux — video and audio should already be near-equal length because
// the video was rendered with targetDuration = audio length + buffer. Any
// tiny rounding gap left over just plays as a beat of silence, not a stall.
function muxNarratedVideo(videoPath, audioPath, outPath) {
  execFileSync("ffmpeg", [
    "-y", "-i", videoPath, "-i", audioPath,
    "-map", "0:v:0", "-map", "1:a:0",
    "-c:v", "copy",
    "-c:a", "aac", "-b:a", "128k",
    "-movflags", "+faststart",
    outPath,
  ], { stdio: "pipe" });
}

// Audio-first pipeline: synthesize the voiceover, then re-render the video
// with its animation timeline stretched to match that exact duration (see
// computeTimeline's targetDuration option), so nothing has to freeze or get
// cut to reconcile two independently-timed tracks.
async function narratePost(mdFile, browser) {
  const post = parsePost(mdFile);
  const script = buildNarrationScript(post);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "narrate-"));
  const audioPath = synthesizeSpeech(script, tmpDir);
  const audioDur = ffprobeDuration(audioPath);

  const { outPath: silentPath, duration: videoDur } = await renderPost(mdFile, OUT_DIR, browser, {
    targetDuration: audioDur + TAIL_BUFFER,
    suffix: "-narrated-silent",
  });

  const outPath = path.join(OUT_DIR, `${post.slug}-narrated.mp4`);
  muxNarratedVideo(silentPath, audioPath, outPath);

  fs.rmSync(tmpDir, { recursive: true, force: true });
  fs.rmSync(silentPath, { force: true });

  return { post, script, outPath, videoDur, audioDur };
}

module.exports = { buildNarrationScript, narratePost, OUT_DIR };

if (require.main === module) {
  const target = process.argv[2];
  if (!target) {
    console.error("Usage: node narrate.js <path-to-post.md>");
    process.exit(1);
  }
  narratePost(target).then((result) => {
    console.log(`Script: "${result.script}"`);
    console.log(`Audio: ${result.audioDur.toFixed(1)}s -> video stretched to: ${result.videoDur.toFixed(1)}s`);
    console.log(`Output: ${result.outPath}`);
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
