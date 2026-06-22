const fs = require("fs");
const path = require("path");
const { postsDir, logsDir } = require("./config");
const { pickTopic, slugify } = require("./topics");
const { generateThread, renderMarkdown } = require("./generator");
const { publishThread } = require("./x");
const { prepareCalendar, nextDueItem, itemForDate, markPublished, calendarPath } = require("./calendar");
const { zonedToday } = require("./dates");

function ensureDirs() {
  for (const dir of [postsDir, logsDir]) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeDraft(topic, thread) {
  const slug = `${topic.date}-${slugify(topic.topic)}`;
  const filePath = path.join(postsDir, `${slug}.md`);
  fs.writeFileSync(filePath, renderMarkdown(topic, thread), "utf8");
  return filePath;
}

async function publishItem(item) {
  const tweetIds = await publishThread(item.thread);
  markPublished(item, tweetIds);
  console.log(`Published ${item.id} to X: ${tweetIds.join(", ")}`);
}

async function main() {
  ensureDirs();
  const args = process.argv.slice(2);
  const flags = new Set(args);

  if (flags.has("--prepare-30")) {
    const items = prepareCalendar(30, zonedToday());
    console.log(`Prepared ${items.length} X thread drafts.`);
    console.log(`Calendar: ${calendarPath}`);
    console.log(`First: ${items[0].date} - ${items[0].topic}`);
    console.log(`Last: ${items[items.length - 1].date} - ${items[items.length - 1].topic}`);
    return;
  }

  if (flags.has("--publish-next")) {
    const item = nextDueItem();
    if (!item) {
      console.log("No scheduled X content is due.");
      return;
    }
    await publishItem(item);
    return;
  }

  if (flags.has("--publish-date")) {
    const date = args[args.indexOf("--publish-date") + 1];
    if (!date) throw new Error("Usage: npm run publish:date -- YYYY-MM-DD");
    const item = itemForDate(date);
    if (!item) {
      console.log(`No unpublished X content found for ${date}.`);
      return;
    }
    await publishItem(item);
    return;
  }

  const topic = pickTopic(zonedToday());
  const thread = generateThread(topic);
  const draftPath = writeDraft(topic, thread);
  console.log(`Draft: ${draftPath}`);
  console.log(`Posts in thread: ${thread.length}`);

  if (flags.has("--publish")) {
    const tweetIds = await publishThread(thread);
    console.log(`Published to X: ${tweetIds.join(", ")}`);
  } else {
    console.log("Draft mode only. Run with --publish after X credentials are configured.");
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
