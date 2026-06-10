const fs = require("fs");
const path = require("path");
const { calendarPath, postsDir, statePath } = require("./config");
const { buildTopicCalendar } = require("./topics");
const { generateThread, renderMarkdown } = require("./generator");
const { ymd, zonedToday } = require("./dates");

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function prepareCalendar(days = 30, startDate = new Date()) {
  fs.mkdirSync(postsDir, { recursive: true });
  const items = buildTopicCalendar(days, startDate).map((item) => {
    const thread = generateThread(item);
    const filePath = path.join(postsDir, `${item.slug}.md`);
    fs.writeFileSync(filePath, renderMarkdown(item, thread), "utf8");
    return {
      ...item,
      thread,
      postPath: path.relative(path.dirname(calendarPath), filePath),
      status: "pending"
    };
  });
  writeJson(calendarPath, items);
  return items;
}

function readCalendar() {
  return readJson(calendarPath, []);
}

function readState() {
  return readJson(statePath, { published: [] });
}

function writeState(state) {
  writeJson(statePath, state);
}

function nextDueItem() {
  const today = ymd(zonedToday());
  const state = readState();
  const publishedIds = new Set(state.published.map((item) => item.id));
  return readCalendar().find((item) => item.date <= today && !publishedIds.has(item.id));
}

function itemForDate(date) {
  const state = readState();
  const publishedIds = new Set(state.published.map((item) => item.id));
  return readCalendar().find((item) => item.date === date && !publishedIds.has(item.id));
}

function markPublished(item, tweetIds) {
  const state = readState();
  state.published.push({
    id: item.id,
    date: item.date,
    topic: item.topic,
    tweetIds,
    publishedAt: new Date().toISOString()
  });
  writeState(state);
}

module.exports = {
  calendarPath,
  prepareCalendar,
  readCalendar,
  nextDueItem,
  itemForDate,
  markPublished
};
