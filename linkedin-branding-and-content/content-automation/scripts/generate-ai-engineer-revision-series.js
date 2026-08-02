const fs = require("fs");
const path = require("path");
const { aiEngineerInterviewTopics } = require("../src/ai-engineer-interview-topics");
const { generatePost, renderLinkedInText } = require("../src/generator");
const { createImage } = require("../src/image");
const { root, postsDir, assetsDir, linkedinProfileUrl } = require("../src/config");

const series = "AI Engineer Revision Series";
const outputDir = path.join(postsDir, "ai-engineer-revision");
const manifestPath = path.join(root, "ai-engineer-revision-manifest.json");
const schedulePath = path.join(root, "ai-engineer-revision-calendar.json");

function valueAfter(flag, fallback) {
  const index = process.argv.indexOf(flag);
  return index === -1 ? fallback : Number(process.argv[index + 1]);
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

function loadManifest() {
  if (!fs.existsSync(manifestPath)) return { series, total: aiEngineerInterviewTopics.length, items: [] };
  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}

function saveManifest(manifest) {
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

function markdownFor(item, text) {
  return [
    "---",
    `sequence: ${item.sequence}`,
    ...(item.date ? [`date: ${item.date}`] : []),
    `series: ${series}`,
    `level: ${item.level}`,
    `topic: ${item.topic}`,
    `linkedinProfile: ${linkedinProfileUrl}`,
    `image: ${item.imagePath}`,
    "status: draft",
    "---",
    "",
    text,
    ""
  ].join("\n");
}

async function generateWithRetries(topic, attempts = 3) {
  let lastResult;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    lastResult = await generatePost(topic);
    if (lastResult.source === "ollama") return lastResult;
    console.warn(`Generation attempt ${attempt}/${attempts} rejected: ${lastResult.source}`);
  }
  return lastResult;
}

async function main() {
  const offset = Math.max(0, valueAfter("--offset", 0));
  const limit = Math.max(1, valueAfter("--limit", aiEngineerInterviewTopics.length));
  const skipIndex = process.argv.indexOf("--skip");
  const skipped = new Set(skipIndex === -1 ? [] : process.argv[skipIndex + 1].split(",").map(Number));
  const selected = aiEngineerInterviewTopics.slice(offset, offset + limit);
  const manifest = loadManifest();
  const schedule = fs.existsSync(schedulePath)
    ? JSON.parse(fs.readFileSync(schedulePath, "utf8"))
    : { items: [] };
  const scheduledDates = new Map(schedule.items.map((item) => [item.sequence, item.date]));
  const completed = new Map(manifest.items.map((item) => [item.sequence, item]));

  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(assetsDir, { recursive: true });

  for (let index = 0; index < selected.length; index += 1) {
    const sequence = offset + index + 1;
    const fullTopic = selected[index];
    if (skipped.has(sequence)) {
      console.log(`[${sequence}/${aiEngineerInterviewTopics.length}] preserved`);
      continue;
    }
    if (completed.has(sequence) && !process.argv.includes("--force")) {
      console.log(`[${sequence}/${aiEngineerInterviewTopics.length}] already generated`);
      continue;
    }

    const level = fullTopic.match(/^\[([^\]]+)\]/)?.[1] || "Intermediate";
    const topic = {
      pillar: series,
      audience: "AI engineering candidates revising for practical production interviews",
      topic: fullTopic,
      hashtags: ["#AIEngineering", "#MachineLearning", "#MLOps", "#TechInterviews"]
    };
    console.log(`[${sequence}/${aiEngineerInterviewTopics.length}] ${fullTopic}`);
    const { post, source } = await generateWithRetries(topic);
    if (source !== "ollama") {
      throw new Error(`Stopped at item ${sequence}: ${source}`);
    }

    const slug = `ai-revision-${String(sequence).padStart(3, "0")}-${slugify(fullTopic)}`;
    post.imageTitle = `${level} AI Interview Revision`;
    post.imageSubtitle = fullTopic.replace(/^\[[^\]]+\]\s*/, "");
    const image = createImage(post, slug);
    if (!image.pngPath || !fs.existsSync(image.pngPath)) {
      throw new Error(`PNG rendering failed for item ${sequence}`);
    }

    const relativeImage = path.relative(outputDir, image.pngPath);
    const draftPath = path.join(outputDir, `${slug}.md`);
    const text = renderLinkedInText(post);
    if (text.includes("[object Object]")) {
      throw new Error(`Invalid structured list content for item ${sequence}`);
    }
    if (/\b(Answer|Question|Scenario|Core principle|Interview question):/i.test(text)) {
      throw new Error(`Question-and-answer labels found in item ${sequence}`);
    }
    if (text.includes("?")) {
      throw new Error(`Question-style sentence found in item ${sequence}`);
    }
    if (text.length < 1200 || text.length > 3000) {
      throw new Error(`LinkedIn text for item ${sequence} is ${text.length} characters; expected 1200-3000`);
    }
    const date = scheduledDates.get(sequence) || "";
    fs.writeFileSync(draftPath, markdownFor({ sequence, date, level, topic: fullTopic, imagePath: relativeImage }, text), "utf8");

    const item = {
      sequence,
      date,
      level,
      topic: fullTopic,
      postPath: path.relative(root, draftPath),
      imagePath: path.relative(root, image.pngPath),
      source,
      status: "draft"
    };
    completed.set(sequence, item);
    manifest.items = [...completed.values()].sort((a, b) => a.sequence - b.sequence);
    manifest.generated = manifest.items.length;
    manifest.updatedAt = new Date().toISOString();
    saveManifest(manifest);
  }

  console.log(`Generated ${manifest.items.length}/${aiEngineerInterviewTopics.length} revision posts.`);
  console.log(`Manifest: ${manifestPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
