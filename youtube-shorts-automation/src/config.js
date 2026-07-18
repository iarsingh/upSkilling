const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const envPath = path.join(root, ".env");

if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

module.exports = {
  root,
  envPath,
  youtubeClientId: process.env.YOUTUBE_CLIENT_ID || "",
  youtubeClientSecret: process.env.YOUTUBE_CLIENT_SECRET || "",
  youtubeRedirectUri: process.env.YOUTUBE_REDIRECT_URI || "http://localhost:3000/youtube/callback",
  youtubeRefreshToken: process.env.YOUTUBE_REFRESH_TOKEN || "",
  youtubePrivacyStatus: process.env.YOUTUBE_PRIVACY_STATUS || "private"
};
