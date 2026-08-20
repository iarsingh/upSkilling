const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const targets = [
  path.join(__dirname, "answer-bank", "final-qa-dataset.json"),
  path.join(root, "public", "qa-dataset.json"),
];
const placeholderPatterns = [
  /a strong answer should/i,
  /use a truthful star answer/i,
  /for this scenario, first confirm user impact/i,
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

let failed = false;
for (const target of targets) {
  const entries = JSON.parse(fs.readFileSync(target, "utf8"));
  const placeholders = entries.filter((entry) => placeholderPatterns.some((pattern) => pattern.test(entry.answer || "")));
  console.log(`${path.relative(root, target)}: ${placeholders.length} placeholder-style answers out of ${entries.length}`);
  for (const entry of placeholders.slice(0, 10)) {
    console.log(`  - ${entry.question}`);
  }
  if (placeholders.length) failed = true;
}

if (failed) process.exitCode = 1;
