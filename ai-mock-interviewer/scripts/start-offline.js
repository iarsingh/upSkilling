// Set before server.js loads dotenv so offline mode also works on Windows.
process.env.OFFLINE_ONLY = "1";
const { spawn } = require("node:child_process");
const path = require("node:path");
const child = spawn(process.execPath, [path.join(__dirname, "..", "server.js")], {
  stdio: "inherit",
  env: process.env
});
child.on("error", (error) => {
  console.error(`Could not start AI Mock Interviewer: ${error.message}`);
  process.exitCode = 1;
});
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("exit", (code, signal) => {
  process.exitCode = code ?? (signal === "SIGINT" ? 130 : 1);
});
