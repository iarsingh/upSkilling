const path = require("path");
const { root, timezone } = require("./config");

const dailyPublishSchedule = [
  { publishTime: "09:00", days: "1-5" },
  { publishTime: "10:30", days: "6" },
  { publishTime: "11:30", days: "0" }
];

function toCronTime(value, days) {
  const [hour, minute] = value.split(":").map((part) => Number(part));
  if (!Number.isInteger(hour) || !Number.isInteger(minute)) {
    throw new Error("POST_TIME must use HH:mm format, for example 09:30");
  }
  return `${minute} ${hour} * * ${days}`;
}

function buildCronLine() {
  return buildCronLines().join("\n");
}

function buildCronLines() {
  const nodePath = process.execPath;
  const scriptPath = path.join(root, "src", "publish-calendar-date.js");
  const logPath = path.join(root, "logs", "daily-linkedin.log");
  return dailyPublishSchedule.map(({ publishTime, days }) => {
    return `${toCronTime(publishTime, days)} PUBLISH_MODE=weekly-rotation TZ=${timezone} ${nodePath} ${scriptPath} >> ${logPath} 2>&1`;
  });
}

if (require.main === module) {
  console.log("Add these lines using crontab -e:");
  console.log("");
  console.log(buildCronLine());
  console.log("");
  console.log("This publishes one scheduled LinkedIn post at 09:00 Monday-Friday, 10:30 Saturday, and 11:30 Sunday.");
}

module.exports = { buildCronLine, buildCronLines };
