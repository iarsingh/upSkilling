const { execFileSync } = require("child_process");
const { buildCronLine } = require("./schedule-cron");

const START = "# linkedin-content-automation:start";
const END = "# linkedin-content-automation:end";

function currentCrontab() {
  try {
    return execFileSync("crontab", ["-l"], { encoding: "utf8" });
  } catch {
    return "";
  }
}

function install() {
  const existing = currentCrontab();
  const withoutOld = existing
    .replace(new RegExp(`${START}[\\s\\S]*?${END}\\n?`, "m"), "")
    .trim();
  const block = `${START}\n${buildCronLine()}\n${END}`;
  const next = [withoutOld, block].filter(Boolean).join("\n\n") + "\n";
  execFileSync("crontab", ["-"], { input: next, encoding: "utf8" });
  console.log("Installed daily LinkedIn automation cron trigger:");
  console.log(buildCronLine());
}

install();
