const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

function loadEnv() {
  const envPath = path.join(root, ".env");
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

function updateEnv(values) {
  const envPath = path.join(root, ".env");
  const existing = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8").split(/\r?\n/) : [];
  const next = new Map();

  for (const line of existing) {
    const eq = line.indexOf("=");
    if (!line.trim() || line.trim().startsWith("#") || eq === -1) continue;
    next.set(line.slice(0, eq), line.slice(eq + 1));
  }

  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined && value !== null) next.set(key, String(value));
  }

  const output = Array.from(next.entries()).map(([key, value]) => `${key}=${value}`).join("\n");
  fs.writeFileSync(envPath, `${output}\n`, "utf8");
}

loadEnv();

module.exports = {
  root,
  postsDir: path.join(root, "posts"),
  logsDir: path.join(root, "logs"),
  calendarPath: path.join(root, "content-calendar.json"),
  statePath: path.join(root, "publish-state.json"),
  oauthStatePath: path.join(root, "oauth-state.json"),
  xClientId: process.env.X_CLIENT_ID || "",
  xClientSecret: process.env.X_CLIENT_SECRET || "",
  xRedirectUri: process.env.X_REDIRECT_URI || "http://127.0.0.1:3001/callback",
  xScopes: process.env.X_SCOPES || "tweet.read tweet.write users.read offline.access",
  xAccessToken: process.env.X_ACCESS_TOKEN || "",
  xRefreshToken: process.env.X_REFRESH_TOKEN || "",
  postTime: process.env.POST_TIME || "09:30",
  timezone: process.env.TIMEZONE || "Asia/Kolkata",
  updateEnv
};
