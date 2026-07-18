const fs = require("fs");
const { envPath } = require("./config");

function updateEnv(values) {
  let contents = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
  for (const [key, value] of Object.entries(values)) {
    if (!value) continue;
    const line = `${key}=${String(value).replace(/\r?\n/g, "")}`;
    const pattern = new RegExp(`^${key}=.*$`, "m");
    contents = pattern.test(contents)
      ? contents.replace(pattern, line)
      : `${contents.trimEnd()}\n${line}\n`;
  }
  fs.writeFileSync(envPath, contents, { mode: 0o600 });
}

module.exports = { updateEnv };
