#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const local = path.join(root, ".venv", process.platform === "win32" ? "Scripts/python.exe" : "bin/python");
const executable = process.env.PYTHON || (fs.existsSync(local) ? local : process.platform === "win32" ? "python" : "python3");
const args = process.argv.slice(2);
if (!args.length) {
  console.error("Usage: node scripts/run-python.js SCRIPT [ARGS...]");
  process.exit(2);
}
const result = spawnSync(executable, args, { cwd: root, stdio: "inherit", env: { ...process.env, PYTHONDONTWRITEBYTECODE: "1" } });
if (result.error) {
  console.error("Python could not start. Create .venv, install requirements-docs.txt, or set PYTHON to the Python executable path.");
  process.exit(1);
}
process.exit(result.status ?? 1);
