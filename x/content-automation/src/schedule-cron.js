const { spawnSync } = require("child_process");
const path = require("path");
const { root } = require("./config");

const result = spawnSync(process.execPath, [path.join(root, "src/index.js"), "--publish-next"], {
  cwd: root,
  stdio: "inherit"
});

process.exitCode = result.status || 0;
