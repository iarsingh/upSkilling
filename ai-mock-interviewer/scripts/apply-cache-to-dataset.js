#!/usr/bin/env node
/**
 * apply-cache-to-dataset.js
 *
 * One-shot script: reads whatever answers are currently in bulk-generated-cache.json
 * and applies them to final-qa-dataset.json + public/qa-dataset.json.
 * Safe to run multiple times — idempotent, only replaces placeholder answers.
 * Run this at any time while bulk-fill-placeholder-answers.js is still running
 * to commit progress made so far.
 *
 * Usage:  node scripts/apply-cache-to-dataset.js
 */

const fs   = require("fs");
const path = require("path");

const ROOT        = path.join(__dirname, "..");
const FINAL_PATH  = path.join(__dirname, "answer-bank", "final-qa-dataset.json");
const PUBLIC_PATH = path.join(ROOT, "public", "qa-dataset.json");
const CACHE_PATH  = path.join(__dirname, "answer-bank", "bulk-generated-cache.json");

const PLACEHOLDER_PATTERNS = [
  /a strong answer should/i,
  /use a truthful star answer/i,
  /for this scenario,? first confirm user impact/i,
  /the practical answer is to state what changes/i,
  /in an interview,? (i would|also) mention/i,
  /so the answer sounds production-ready instead of theoretical/i,
  /tailor (the|your) (response|answer)/i,
  /answer (this|the question) (by|with)/i,
  /you should (say|state|mention|explain|describe)/i,
  /tailor the response directly to/i,
  /use the prompt details as acceptance criteria/i,
  /start with the expected configuration, command, workflow/i,
  /the direct answer is to define/i,
  /i would explain the main mechanism/i,
];

function isPlaceholder(answer) {
  const v = String(answer || "").trim();
  if (!v || v.length < 80) return true;
  return PLACEHOLDER_PATTERNS.some(p => p.test(v));
}

function cacheKey(question) {
  return String(question || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

if (!fs.existsSync(CACHE_PATH)) {
  console.error("Cache not found:", CACHE_PATH);
  process.exit(1);
}

const cache  = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
const dataset = JSON.parse(fs.readFileSync(FINAL_PATH, "utf8"));

console.log(`Cache size: ${Object.keys(cache).length}`);
console.log(`Dataset size: ${dataset.length}`);

let updated = 0;
let alreadyGood = 0;
let stillMissing = 0;

for (let i = 0; i < dataset.length; i++) {
  const entry = dataset[i];
  if (!isPlaceholder(entry.answer)) { alreadyGood++; continue; }
  const key = cacheKey(entry.question);
  const replacement = cache[key];
  if (replacement && !isPlaceholder(replacement)) {
    dataset[i] = { ...entry, answer: replacement };
    updated++;
  } else {
    stillMissing++;
  }
}

console.log(`Updated:      ${updated}`);
console.log(`Already good: ${alreadyGood}`);
console.log(`Still missing: ${stillMissing}`);

fs.writeFileSync(FINAL_PATH, JSON.stringify(dataset, null, 2) + "\n");
console.log("Wrote:", FINAL_PATH);

if (fs.existsSync(PUBLIC_PATH)) {
  fs.writeFileSync(PUBLIC_PATH, JSON.stringify(dataset, null, 2) + "\n");
  console.log("Wrote:", PUBLIC_PATH);
}
