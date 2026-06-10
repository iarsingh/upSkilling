const { execSync } = require("child_process");
const path = require("path");
const { root, postTime } = require("./config");

const [hour, minute] = postTime.split(":");
const nodePath = process.execPath;
const command = `${minute || "30"} ${hour || "9"} * * * cd ${root} && ${nodePath} ${path.join(root, "src/schedule-cron.js")} >> ${path.join(root, "logs/cron.log")} 2>&1`;

const current = execSync("crontab -l 2>/dev/null || true", { encoding: "utf8" });
if (current.includes("x/content-automation/src/schedule-cron.js")) {
  console.log("X content cron is already installed.");
  process.exit(0);
}

execSync("crontab -", {
  input: `${current.trim()}\n${command}\n`,
  stdio: ["pipe", "inherit", "inherit"]
});

console.log(`Installed local cron for X posting at ${postTime}.`);
console.log(command);
