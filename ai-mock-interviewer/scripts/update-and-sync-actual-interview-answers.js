const { execSync } = require("child_process");
const path = require("path");

const root = path.join(__dirname, "..");
const args = process.argv.slice(2);
const noSync = args.includes("--no-sync");

const updateArgs = args.filter((arg) => arg !== "--no-sync");
const updateCmd = [
  "node",
  "scripts/ollama-update-actual-interview-answers.js",
  "--apply",
  ...updateArgs.filter((arg) => arg !== "--apply"),
].join(" ");
const syncCmd = "node scripts/sync-ollama-answers-to-question-bank.js";

function run(cmd) {
  console.log(`\n=== Running: ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd: root });
}

try {
  run(updateCmd);
  if (!noSync) {
    run(syncCmd);
  } else {
    console.log("Skipping sync step because --no-sync was provided.");
  }
  console.log("\n✅ Update and sync completed successfully.");
} catch (error) {
  console.error("\n❌ Update and sync failed.");
  process.exit(1);
}
