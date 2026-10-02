const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

test("GitHub Pages homepage tells visitors how to run the local app", () => {
  const page = fs.readFileSync(path.join(root, "docs/index.html"), "utf8");
  assert.equal(fs.existsSync(path.join(root, "docs/.nojekyll")), true);
  assert.match(page, /AI Mock Interviewer/);
  assert.match(page, /npm run start:offline/);
  assert.match(page, /127\.0\.0\.1:3030/);
  assert.match(page, /Practice material/);
  assert.match(page, /https:\/\/github\.com\/iarsingh\/ai-mock-interviewer/);
  assert.doesNotMatch(page, /local LLM/);
});

test("app landing page does not claim offline mode requires a local model", () => {
  const page = fs.readFileSync(path.join(root, "public/index.html"), "utf8");
  assert.match(page, /template feedback work offline/);
  assert.match(page, /Practice material/);
  assert.doesNotMatch(page, /powered by a local LLM/);
  assert.doesNotMatch(page, /local Ollama model/);
});
