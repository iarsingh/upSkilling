const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const calendarPath = path.join(root, "content-calendar.json");
const archiveRoot = path.join(root, "archive");
const archiveCalendarPath = path.join(archiveRoot, "content-calendar-entries.json");
const cutoffDate = process.argv[2] || "2026-08-03";

const archivedPillars = new Set([
  "Kubernetes Series",
  "Python Automation Series",
  "DevOps & Cloud Fundamentals Series",
  "IT Engineering Series"
]);

function readJson(filePath, fallback) {
  return fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : fallback;
}

function moveIfPresent(source, destination) {
  if (!fs.existsSync(source)) return false;
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  if (fs.existsSync(destination)) {
    throw new Error(`Archive destination already exists: ${destination}`);
  }
  fs.renameSync(source, destination);
  return true;
}

const calendar = readJson(calendarPath, { items: [] });
const archivedCalendar = readJson(archiveCalendarPath, {
  archivedAt: new Date().toISOString(),
  cutoffDate,
  reason: "DevOps/cloud/platform content archived to focus the active schedule on AI, LLM, ML, MLOps, and Data Science.",
  items: []
});

const toArchive = calendar.items.filter(
  (item) => item.date >= cutoffDate && archivedPillars.has(item.pillar)
);
const archivedIds = new Set(archivedCalendar.items.map((item) => item.id));
let movedFiles = 0;

for (const item of toArchive) {
  if (!archivedIds.has(item.id)) archivedCalendar.items.push(item);

  if (!item.draftPath) continue;
  const draftSource = path.join(root, item.draftPath);
  const draftDestination = path.join(archiveRoot, item.draftPath);
  if (moveIfPresent(draftSource, draftDestination)) movedFiles += 1;

  const stem = path.basename(item.draftPath, path.extname(item.draftPath));
  const assetDirectory = path.join(root, "assets");
  if (!fs.existsSync(assetDirectory)) continue;
  for (const filename of fs.readdirSync(assetDirectory)) {
    if (filename === `${stem}.png` || filename === `${stem}.svg` || filename.startsWith(`${stem}-doodle.`)) {
      if (moveIfPresent(
        path.join(assetDirectory, filename),
        path.join(archiveRoot, "assets", filename)
      )) movedFiles += 1;
    }
  }
}

// Older generators created drafts that are not referenced by the current
// calendar. Archive those by front matter as well so posts/ and assets/ only
// contain the active editorial focus.
const postsDirectory = path.join(root, "posts");
if (fs.existsSync(postsDirectory)) {
  for (const filename of fs.readdirSync(postsDirectory)) {
    if (!filename.endsWith(".md")) continue;
    const source = path.join(postsDirectory, filename);
    const contents = fs.readFileSync(source, "utf8");
    const date = contents.match(/^date:\s*(.+)$/m)?.[1]?.trim();
    const series = contents.match(/^series:\s*(.+)$/m)?.[1]?.trim();
    if (!date || date < cutoffDate || !archivedPillars.has(series)) continue;

    if (moveIfPresent(source, path.join(archiveRoot, "posts", filename))) movedFiles += 1;
    const stem = path.basename(filename, ".md");
    const assetDirectory = path.join(root, "assets");
    if (!fs.existsSync(assetDirectory)) continue;
    for (const assetName of fs.readdirSync(assetDirectory)) {
      if (assetName === `${stem}.png` || assetName === `${stem}.svg` || assetName.startsWith(`${stem}-doodle.`)) {
        if (moveIfPresent(
          path.join(assetDirectory, assetName),
          path.join(archiveRoot, "assets", assetName)
        )) movedFiles += 1;
      }
    }
  }
}

calendar.items = calendar.items.filter((item) => !toArchive.includes(item));
calendar.days = calendar.items.length;
archivedCalendar.items.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));

fs.mkdirSync(archiveRoot, { recursive: true });
fs.writeFileSync(calendarPath, `${JSON.stringify(calendar, null, 2)}\n`);
fs.writeFileSync(archiveCalendarPath, `${JSON.stringify(archivedCalendar, null, 2)}\n`);

console.log(`Archived ${toArchive.length} calendar entries and moved ${movedFiles} files.`);
console.log(`Active calendar now contains ${calendar.items.length} AI/ML-focused entries.`);
