const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { root } = require("../src/config");

const calendarPath = path.join(root, "content-calendar.json");
const archiveRoot = path.join(root, "archive");
const archiveCalendarPath = path.join(archiveRoot, "content-calendar-entries.json");

function signature(text) {
  return crypto.createHash("sha256").update(
    String(text || "").replace(/Day \d+\/\d+/gi, "Day N/N").replace(/\s+/g, " ").trim()
  ).digest("hex");
}

function move(sourceRelative, destinationRelative = sourceRelative) {
  if (!sourceRelative) return false;
  const source = path.join(root, sourceRelative);
  const destination = path.join(archiveRoot, destinationRelative);
  if (!fs.existsSync(source)) return false;
  if (fs.existsSync(destination)) throw new Error(`Archive destination exists: ${destination}`);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.renameSync(source, destination);
  return true;
}

const calendar = JSON.parse(fs.readFileSync(calendarPath, "utf8"));
const archive = JSON.parse(fs.readFileSync(archiveCalendarPath, "utf8"));
const ordered = calendar.items.slice().sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
const seen = new Set();
const keep = [];
const duplicates = [];

for (const item of ordered) {
  const key = signature(item.text);
  if (seen.has(key)) duplicates.push({ ...item, archivedReason: "Duplicate active post body" });
  else {
    seen.add(key);
    keep.push(item);
  }
}

const archivedIds = new Set(archive.items.map((item) => item.id));
let movedFiles = 0;
for (const item of duplicates) {
  if (!archivedIds.has(item.id)) archive.items.push(item);
  if (move(item.draftPath)) movedFiles += 1;
  if (move(item.imagePath)) movedFiles += 1;
  if (item.imagePath?.endsWith(".png")) {
    const svgPath = item.imagePath.replace(/\.png$/, ".svg");
    if (move(svgPath)) movedFiles += 1;
  }
}

calendar.items = keep;
calendar.days = keep.length;
archive.items.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
archive.deduplicatedAt = new Date().toISOString();

fs.writeFileSync(calendarPath, `${JSON.stringify(calendar, null, 2)}\n`);
fs.writeFileSync(archiveCalendarPath, `${JSON.stringify(archive, null, 2)}\n`);

console.log(`Kept ${keep.length} unique active posts.`);
console.log(`Archived ${duplicates.length} duplicate entries and moved ${movedFiles} files.`);
