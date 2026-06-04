const fs = require("fs");
const path = require("path");
const { pickTopic } = require("./topics");
const { generatePost, renderLinkedInText } = require("./generator");
const { createImage } = require("./image");
const { publishPost } = require("./linkedin");
const { postsDir, assetsDir, logsDir } = require("./config");
const { prepareCalendar, nextDueItem, markPublished, calendarPath } = require("./calendar");

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function ensureDirs() {
  for (const dir of [postsDir, assetsDir, logsDir]) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeDraft(topic, post, text, image, source) {
  const slug = `${todayStamp()}-${slugify(topic.topic)}`;
  const filePath = path.join(postsDir, `${slug}.md`);
  const content = [
    "---",
    `date: ${todayStamp()}`,
    `series: ${topic.pillar}`,
    `topic: ${topic.topic}`,
    `source: ${source}`,
    `image: ${path.relative(postsDir, image.pngPath)}`,
    "---",
    "",
    text
  ].join("\n");
  fs.writeFileSync(filePath, content, "utf8");
  return filePath;
}

async function main() {
  ensureDirs();
  const args = new Set(process.argv.slice(2));
  const shouldPublish = args.has("--publish");
  const shouldPublishNext = args.has("--publish-next");
  const shouldPrepare100 = args.has("--prepare-100");

  if (shouldPrepare100) {
    const items = prepareCalendar(100, new Date());
    console.log(`Prepared ${items.length} scheduled LinkedIn posts.`);
    console.log(`Calendar: ${calendarPath}`);
    console.log(`First: ${items[0].date} - ${items[0].topic}`);
    console.log(`Last: ${items[items.length - 1].date} - ${items[items.length - 1].topic}`);
    return;
  }

  if (shouldPublishNext) {
    const item = nextDueItem();
    if (!item) {
      console.log("No scheduled content remaining.");
      return;
    }
    const linkedInId = await publishPost(item.text, path.join(path.resolve(__dirname, ".."), item.imagePath));
    markPublished(item, linkedInId);
    console.log(`Published ${item.id}: ${linkedInId}`);
    return;
  }

  const topic = pickTopic();
  const slug = `${todayStamp()}-${slugify(topic.topic)}`;
  const { post, source } = await generatePost(topic);
  const text = renderLinkedInText(post);
  const image = createImage(post, slug);
  const draftPath = writeDraft(topic, post, text, image, source);

  console.log(`Generated from: ${source}`);
  console.log(`Draft: ${draftPath}`);
  console.log(`Image: ${image.pngPath}`);

  if (shouldPublish) {
    const linkedInId = await publishPost(text, image.pngPath);
    console.log(`Published to LinkedIn: ${linkedInId}`);
  } else {
    console.log("Draft mode only. Run with --publish after LinkedIn credentials are configured.");
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
