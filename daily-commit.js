const fs = require("fs");
const { execSync } = require("child_process");

const file = "daily-log.md";
const timestamp = new Date().toISOString();

fs.appendFileSync(
  file,
  `- Daily update: ${timestamp}\n`
);

try {
  execSync(`git add ${file}`, { stdio: "inherit" });
  execSync(`git commit -m "Daily update ${timestamp}"`, {
    stdio: "inherit",
  });
  execSync(`git push origin main`, { stdio: "inherit" });

  console.log("Commit pushed successfully.");
} catch (err) {
  console.error("Git operation failed:", err.message);
}