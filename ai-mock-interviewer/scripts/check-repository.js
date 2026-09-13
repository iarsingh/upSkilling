#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { canonicalQuestionKey } = require("./question-key");

function privatePath(file) {
  const name = file.replaceAll("\\", "/");
  return /(^|\/)\.env(?:\..+)?$/.test(name) && !name.endsWith(".env.example")
    || /(^|\/)(?:node_modules|\.venv|venv|__pycache__)(?:\/|$)/.test(name)
    || /^data\/(?:applicant-profile|users|contacts)\.json$/.test(name)
    || /^data\/session-secret\.txt$/.test(name)
    || /\.(?:sqlite|db)(?:-shm|-wal)?$/.test(name)
    || /(?:^|\/)(?:\.youtube-token|youtube-client-secret)\.json$/.test(name);
}

function validateDatasets(canonical, served, sets) {
  const failures = [];
  if (!Array.isArray(canonical) || !canonical.length) return ["Canonical bank must be a nonempty array."];
  if (JSON.stringify(canonical) !== JSON.stringify(served)) failures.push("Source and public question banks differ.");
  const seen = new Set();
  for (const [i, entry] of canonical.entries()) {
    const key = canonicalQuestionKey(entry?.question);
    if (!key || typeof entry?.answer !== "string" || !entry.answer.trim()) failures.push(`Missing question or answer at bank entry ${i + 1}.`);
    if (seen.has(key)) failures.push(`Duplicate canonical question at bank entry ${i + 1}.`);
    seen.add(key);
  }
  if (!Array.isArray(sets)) return [...failures, "Mock sets must be an array."];
  const setIds = new Set();
  for (const set of sets) {
    if (!set.id || setIds.has(set.id)) failures.push("Missing or duplicate mock-set ID.");
    setIds.add(set.id);
    if (!Array.isArray(set.questions)) { failures.push(`Invalid questions in mock set ${set.id}.`); continue; }
    for (const entry of set.questions) {
      if (!seen.has(canonicalQuestionKey(entry.question))) failures.push(`Mock question absent from canonical bank in ${set.id}.`);
    }
  }
  return failures;
}

function main() {
  const root = path.resolve(__dirname, "..");
  const failures = [];
  for (const file of ["LICENSE", "README.md", "CONTRIBUTING.md", "SECURITY.md", "CODE_OF_CONDUCT.md", ".env.example", ".nvmrc", "requirements-docs.txt", ".github/workflows/ci.yml"]) {
    if (!fs.existsSync(path.join(root, file))) failures.push(`Missing release file: ${file}`);
  }
  let tracked;
  try { tracked = execFileSync("git", ["ls-files", "-z"], { cwd: root, encoding: "utf8" }).split("\0").filter(Boolean); }
  catch { throw new Error("Run repository checks in a Git checkout; Git must be installed."); }
  const patterns = [
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
    /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,})\b/,
    /\bAKIA[A-Z0-9]{16}\b/,
    /\bsk-(?:proj-|ant-)?[A-Za-z0-9_-]{35,}\b/
  ];
  for (const file of tracked) {
    if (privatePath(file)) failures.push(`Private/local file is tracked: ${file}`);
    const full = path.join(root, file);
    if (!fs.existsSync(full) || !fs.statSync(full).isFile()) continue;
    const bytes = fs.readFileSync(full);
    if (bytes.includes(0)) continue;
    if (patterns.some(pattern => pattern.test(bytes.toString("utf8")))) failures.push(`Possible credential in tracked file: ${file} (value suppressed)`);
  }
  const read = file => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
  failures.push(...validateDatasets(read("scripts/answer-bank/final-qa-dataset.json"), read("public/qa-dataset.json"), read("public/mock-interview-sets.json")));
  if (failures.length) { failures.forEach(f => console.error(`FAIL: ${f}`)); process.exitCode = 1; }
  else console.log("Repository checks passed: release files, tracked-file hygiene and question-bank coverage. History and content rights require separate review.");
}
if (require.main === module) {
  try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = { privatePath, validateDatasets };
