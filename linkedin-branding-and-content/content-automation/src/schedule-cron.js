const path = require("path");
const { root, timezone } = require("./config");

const dailyPublishSchedule = [
  { publishTime: "06:00", calendarSlot: "09:30" },
  { publishTime: "09:00", calendarSlot: "14:30" },
  { publishTime: "00:00", calendarSlot: "19:30" }
];

function toCronTime(value) {
  const [hour, minute] = value.split(":").map((part) => Number(part));
  if (!Number.isInteger(hour) || !Number.isInteger(minute)) {
    throw new Error("POST_TIME must use HH:mm format, for example 09:30");
  }
  return `${minute} ${hour} * * *`;
}

function buildCronLine() {
  return buildCronLines().join("\n");
}

function buildCronLines() {
  const nodePath = process.execPath;
  const scriptPath = path.join(root, "src", "publish-calendar-date.js");
  const logPath = path.join(root, "logs", "daily-linkedin.log");
  return dailyPublishSchedule.map(({ publishTime, calendarSlot }) => {
    return `${toCronTime(publishTime)} PUBLISH_SLOT=${calendarSlot} TZ=${timezone} ${nodePath} ${scriptPath} >> ${logPath} 2>&1`;
  });
}

if (require.main === module) {
  console.log("Add these lines using crontab -e:");
  console.log("");
  console.log(buildCronLine());
  console.log("");
  console.log("This publishes one scheduled LinkedIn stream at 06:00, 09:00, and 00:00 IST.");
}

module.exports = { buildCronLine, buildCronLines };
