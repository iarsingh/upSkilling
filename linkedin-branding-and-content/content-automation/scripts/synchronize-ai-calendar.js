const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const calendarPath = path.join(root, "content-calendar.json");
const startDate = process.argv[2] || "2026-08-03";
const calendar = JSON.parse(fs.readFileSync(calendarPath, "utf8"));

function addDays(dateString, days) {
  const date = new Date(`${dateString}T12:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function slotForDate(dateString) {
  const weekday = new Date(`${dateString}T12:00:00.000Z`).getUTCDay();
  return {
    0: "11:30",
    1: "14:30",
    2: "09:30",
    3: "19:30",
    4: "14:30",
    5: "09:30",
    6: "19:30"
  }[weekday];
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function imageForItem(item) {
  const assetsDirectory = path.join(root, "assets");
  const draftStem = path.basename(item.draftPath, path.extname(item.draftPath));
  const doodleName = `${draftStem}-doodle.png`;
  if (fs.existsSync(path.join(assetsDirectory, doodleName))) {
    return `assets/${doodleName}`;
  }

  const topicSlug = slugify(item.baseTopic || item.topic);
  const candidates = fs.readdirSync(assetsDirectory)
    .filter((filename) => filename.endsWith(".png") && filename.includes(topicSlug))
    .sort();
  if (candidates.length === 0) {
    throw new Error(`Missing image for topic: ${item.topic}`);
  }
  return `assets/${candidates.at(-1)}`;
}

const past = calendar.items.filter((item) => item.date < startDate);
const upcoming = calendar.items
  .filter((item) => item.date >= startDate)
  .sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));

upcoming.forEach((item, index) => {
  const date = addDays(startDate, index);
  const slot = slotForDate(date);
  item.id = `${date}-mlops`;
  item.date = date;
  item.slot = slot;
  item.imagePath = imageForItem(item);

  if (!item.draftPath) return;
  const draftPath = path.join(root, item.draftPath);
  if (!fs.existsSync(draftPath)) {
    throw new Error(`Missing draft: ${item.draftPath}`);
  }
  let draft = fs.readFileSync(draftPath, "utf8");
  draft = draft.replace(/^date:\s*.*$/m, `date: ${date}`);
  draft = draft.replace(/^slot:\s*.*$/m, `slot: ${slot}`);
  fs.writeFileSync(draftPath, draft);
});

calendar.items = [...past, ...upcoming];
calendar.days = calendar.items.length;
calendar.schedule = "daily-ai-ml-focus";
calendar.syncedFrom = startDate;
calendar.syncedAt = new Date().toISOString();
fs.writeFileSync(calendarPath, `${JSON.stringify(calendar, null, 2)}\n`);

console.log(`Scheduled ${upcoming.length} AI/ML posts daily from ${startDate} through ${upcoming.at(-1)?.date}.`);
