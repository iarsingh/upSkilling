const fs = require("fs");
const path = require("path");

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: node scripts/import-actual-interview-handbook.js <handbook-text-file>");
  process.exit(1);
}

const outputPath = path.join(__dirname, "answer-bank", "actual-interview-handbook-part1.json");
const text = fs.readFileSync(inputPath, "utf8");
const entries = [];
let category = "General";

for (const rawLine of text.split(/\r?\n/)) {
  const line = rawLine.trim();
  const categoryMatch = line.match(/^\d+\.\s+(.+?)\s+\(\d+ Questions\)$/i);
  if (categoryMatch) {
    category = categoryMatch[1].trim();
    continue;
  }
  const questionMatch = line.match(/^(\d+)\.\s+(.+)$/);
  if (!questionMatch) continue;
  const number = Number(questionMatch[1]);
  if (number < 1 || number > 210) continue;
  entries.push({
    source: "Actual Interview Handbook - Part 1",
    section: category,
    category,
    questionType: /troubleshoot|debug/i.test(questionMatch[2]) ? "Troubleshooting" : "Conceptual",
    question: questionMatch[2].trim(),
  });
}

if (entries.length !== 210) throw new Error(`Expected 210 questions, found ${entries.length}`);
fs.writeFileSync(outputPath, `${JSON.stringify(entries, null, 2)}\n`);
console.log(`Wrote ${entries.length} questions to ${outputPath}`);
