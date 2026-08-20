#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env"), quiet: true });

const root = path.join(__dirname, "..");
const failures = [];
const warnings = [];

function requireFile(relativePath) {
  const target = path.join(root, relativePath);
  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) failures.push(`Missing required file: ${relativePath}`);
}

for (const relativePath of [
  "LICENSE",
  "CONTRIBUTING.md",
  "CODE_OF_CONDUCT.md",
  "SECURITY.md",
  "data/applicant-profile.example.json",
  "public/index.html",
  "public/qa-dataset.json",
  "public/mock-interview-sets.json",
  "scripts/answer-bank/final-qa-dataset.json",
  "server.js",
  "vercel.json"
]) requireFile(relativePath);

for (const privatePath of [
  "data/applicant-profile.json",
  ".env",
  "data/users.json",
  "data/contacts.json",
  "data/session-secret.txt"
]) {
  if (process.env.CI && fs.existsSync(path.join(root, privatePath))) {
    failures.push(`Private local file must not be present in a release checkout: ${privatePath}`);
  }
}

const publicCredentialPatterns = [
  /User@Practice\d/i,
  /Admin@Report\d/i,
  /\+91-8002392976/
];
for (const relativePath of ["README.md", "server.js", "public/app.js", "public/signin.html", "chrome-extension/content.js"]) {
  const content = fs.readFileSync(path.join(root, relativePath), "utf8");
  if (publicCredentialPatterns.some((pattern) => pattern.test(content))) {
    failures.push(`Public credential or personal-data pattern found in ${relativePath}.`);
  }
}

const secret = String(process.env.SESSION_SECRET || "");
if (secret.length < 32 || secret === "replace-with-a-long-random-secret") {
  failures.push("SESSION_SECRET must be a unique random value of at least 32 characters.");
}
if (!process.env.DATABASE_URL && process.env.ALLOW_FILE_STORAGE_IN_PRODUCTION !== "true") {
  failures.push("DATABASE_URL is required for durable production accounts.");
}
if (process.env.ALLOW_FILE_STORAGE_IN_PRODUCTION === "true") {
  warnings.push("File storage is enabled in production; accounts and contact messages may be ephemeral.");
}
if (process.env.OFFLINE_ONLY !== "1" && process.env.OFFLINE_ONLY !== "true") {
  const provider = process.env.LLM_PROVIDER || "ollama";
  if (provider === "openai" && !process.env.OPENAI_API_KEY) failures.push("OPENAI_API_KEY is required for LLM_PROVIDER=openai.");
  if (provider === "claude" && !process.env.ANTHROPIC_API_KEY) failures.push("ANTHROPIC_API_KEY is required for LLM_PROVIDER=claude.");
  if (provider === "ollama") warnings.push("Ollama is selected; verify the production runtime can reach OLLAMA_URL.");
}

try {
  const canonical = JSON.parse(fs.readFileSync(path.join(root, "scripts/answer-bank/final-qa-dataset.json"), "utf8"));
  const publicData = JSON.parse(fs.readFileSync(path.join(root, "public/qa-dataset.json"), "utf8"));
  if (!Array.isArray(canonical) || canonical.length === 0) failures.push("Canonical question bank is empty or invalid.");
  if (JSON.stringify(canonical) !== JSON.stringify(publicData)) failures.push("Canonical and public question-bank datasets are out of sync.");
} catch (error) {
  failures.push(`Question-bank validation failed: ${error.message}`);
}

for (const warning of warnings) console.warn(`WARN: ${warning}`);
if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exit(1);
}
console.log("Production readiness checks passed.");
