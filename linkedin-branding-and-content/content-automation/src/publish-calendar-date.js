const fs = require("fs");
const path = require("path");
const { publishPost } = require("./linkedin");
const { root } = require("./config");
const { loadState, markPublished } = require("./calendar");

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

function weekdayForLocalDate(dateString, timezone = "Asia/Kolkata") {
  const noonUtc = new Date(`${dateString}T12:00:00.000Z`);
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short"
  }).format(noonUtc);

  return {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 0
  }[weekday];
}

function slotForWeeklyRotation(dateString, timezone = "Asia/Kolkata") {
  const weekday = weekdayForLocalDate(dateString, timezone);
  const slotsByWeekday = {
    1: "14:30", // Monday: Kubernetes / GKE
    2: "09:30", // Tuesday: MLOps
    3: "19:30", // Wednesday: Python automation
    4: "14:30", // Thursday: Kubernetes / platform engineering
    5: "09:30", // Friday: MLOps / interview-ready systems thinking
    6: "19:30" // Saturday: Python automation / portfolio update
  };

  return slotsByWeekday[weekday] || "";
}

async function main() {
  const rawArgs = process.argv.slice(2);
  const args = new Set(rawArgs);
  const positional = rawArgs.filter((arg) => !arg.startsWith("--"));
  const dryRun = args.has("--dry-run") || String(process.env.DRY_RUN || "").toLowerCase() === "true";
  const dateArg = positional[0] || process.env.PUBLISH_DATE || dateInTimezone(process.env.TIMEZONE);
  const configuredSlot = positional[1] || process.env.PUBLISH_SLOT || "";
  const slotArg = configuredSlot || (
    process.env.PUBLISH_MODE === "weekly-rotation"
      ? slotForWeeklyRotation(dateArg, process.env.TIMEZONE)
      : ""
  );
  const calendar = loadCalendar();
  const state = loadState();
  const publishedIds = new Set(state.published.map((entry) => entry.id));
  const items = calendar.items
    .filter((entry) => entry.date === dateArg && !publishedIds.has(entry.id))
    .filter((entry) => !slotArg || entry.slot === slotArg)
    .sort((a, b) => (a.slot || "").localeCompare(b.slot || "") || a.id.localeCompare(b.id));

  if (items.length === 0) {
    const slotMessage = slotArg ? ` at slot ${slotArg}` : "";
    console.log(`No scheduled LinkedIn item for ${dateArg}${slotMessage}. Nothing to publish.`);
    return;
  }

  for (const item of items) {
    if (dryRun) {
      console.log(`[dry-run] Would publish ${item.id} for ${dateArg}${item.slot ? ` at ${item.slot}` : ""}: ${item.topic}`);
      continue;
    }
    const linkedInId = await publishPost(item.text);
    markPublished(item, linkedInId);
    console.log(`Published ${item.id} for ${dateArg}: ${linkedInId}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
