const path = require("path");
const { root, postTime, timezone } = require("./config");

function toCronTime(value) {
  const [hour, minute] = value.split(":").map((part) => Number(part));
  if (!Number.isInteger(hour) || !Number.isInteger(minute)) {
    throw new Error("POST_TIME must use HH:mm format, for example 09:30");
  }
  return `${minute} ${hour} * * *`;
}

function buildCronLine() {
  const nodePath = process.execPath;
  const scriptPath = path.join(root, "src", "index.js");
  const logPath = path.join(root, "logs", "daily-linkedin.log");
  return `${toCronTime(postTime)} TZ=${timezone} ${nodePath} ${scriptPath} --publish-next >> ${logPath} 2>&1`;
}

if (require.main === module) {
  console.log("Add this line using crontab -e:");
  console.log("");
  console.log(buildCronLine());
  console.log("");
  console.log("This publishes the next item from content-calendar.json.");
}

module.exports = { buildCronLine };
