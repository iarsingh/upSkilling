const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function loadEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

module.exports = {
  root: ROOT,
  postsDir: path.join(ROOT, "posts"),
  assetsDir: path.join(ROOT, "assets"),
  logsDir: path.join(ROOT, "logs"),
  ollamaHost: process.env.OLLAMA_HOST || "http://127.0.0.1:11434",
  ollamaModel: process.env.OLLAMA_MODEL || "llama3.1:8b",
  ollamaTimeoutMs: Number(process.env.OLLAMA_TIMEOUT_MS || 90000),
  linkedinAccessToken: process.env.LINKEDIN_ACCESS_TOKEN || "",
  linkedinProfileUrl: process.env.LINKEDIN_PROFILE_URL || "https://www.linkedin.com/in/iamarsingh/",
  linkedinAuthorUrn: process.env.LINKEDIN_AUTHOR_URN || "",
  postTime: process.env.POST_TIME || "09:30",
  timezone: process.env.TIMEZONE || "Asia/Kolkata"
};
