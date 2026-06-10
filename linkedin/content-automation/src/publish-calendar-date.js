const fs = require("fs");
const path = require("path");
const { publishPost } = require("./linkedin");
const { root } = require("./config");

const calendarPath = path.join(root, "content-calendar.json");

function dateInTimezone(timezone = "Asia/Kolkata") {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function loadCalendar() {
  if (!fs.existsSync(calendarPath)) {
    throw new Error(`Missing calendar: ${calendarPath}`);
  }
  return JSON.parse(fs.readFileSync(calendarPath, "utf8"));
}

async function main() {
  const dateArg = process.argv[2] || process.env.PUBLISH_DATE || dateInTimezone(process.env.TIMEZONE);
  const calendar = loadCalendar();
  const item = calendar.items.find((entry) => entry.date === dateArg);

  if (!item) {
    console.log(`No scheduled LinkedIn item for ${dateArg}. Nothing to publish.`);
    return;
  }

  const imagePath = item.imagePath ? path.join(root, item.imagePath) : "";
  const image = imagePath && fs.existsSync(imagePath) ? imagePath : "";
  const linkedInId = await publishPost(item.text, image);
  console.log(`Published ${item.id} for ${dateArg}: ${linkedInId}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
