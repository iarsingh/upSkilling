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
  videosDir: path.join(ROOT, "videos"),
  ollamaHost: process.env.OLLAMA_HOST || "http://127.0.0.1:11434",
  ollamaModel: process.env.OLLAMA_MODEL || "llama3.1:8b",
  ollamaTimeoutMs: Number(process.env.OLLAMA_TIMEOUT_MS || 90000),
  youtubeClientId: process.env.YOUTUBE_CLIENT_ID || "",
  youtubeClientSecret: process.env.YOUTUBE_CLIENT_SECRET || "",
  youtubeRedirectUri: process.env.YOUTUBE_REDIRECT_URI || "http://localhost:3000/youtube/callback",
  youtubeAccessToken: process.env.YOUTUBE_ACCESS_TOKEN || "",
  youtubeRefreshToken: process.env.YOUTUBE_REFRESH_TOKEN || "",
  youtubePrivacyStatus: process.env.YOUTUBE_PRIVACY_STATUS || "private",
  youtubeDefaultTopic: process.env.YOUTUBE_DEFAULT_TOPIC || "MLOps project explained with local Ollama, Kubernetes, observability, and CI/CD",
  timezone: process.env.TIMEZONE || "Asia/Kolkata"
};
