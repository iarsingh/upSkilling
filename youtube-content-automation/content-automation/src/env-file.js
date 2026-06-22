const fs = require("fs");
const path = require("path");
const { root } = require("./config");

const envPath = path.join(root, ".env");

function updateEnv(values) {
  const existing = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
  let next = existing;

  for (const [key, value] of Object.entries(values)) {
    if (value === undefined || value === null || value === "") continue;
    const line = `${key}=${String(value).replace(/\n/g, "\\n")}`;
    const pattern = new RegExp(`^${key}=.*$`, "m");
    next = pattern.test(next) ? next.replace(pattern, line) : `${next.trimEnd()}\n${line}\n`;
  }

  fs.writeFileSync(envPath, next, "utf8");
}

module.exports = { updateEnv };
