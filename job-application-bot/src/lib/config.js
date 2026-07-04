const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const ROOT = path.join(__dirname, "..", "..");

const profile = JSON.parse(
  fs.readFileSync(path.join(ROOT, "config", "profile.json"), "utf8")
);

module.exports = {
  ROOT,
  profile,
  ollamaHost: process.env.OLLAMA_HOST || "http://127.0.0.1:11434",
  ollamaModel: process.env.OLLAMA_MODEL || "llama3.1:8b",
  maxApplicationsPerRun: Number(process.env.MAX_APPLICATIONS_PER_RUN || 25),
  browserDataDir: path.join(ROOT, "browser-data"),
  applicationLogPath: path.join(ROOT, "data", "applied-jobs.json"),
  runLogDir: path.join(ROOT, "data", "run-logs")
};
