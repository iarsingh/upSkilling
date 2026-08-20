const fs = require("fs");
const path = require("path");

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: node scripts/import-actual-interview-handbook-part3.js <part3-text-file>");
  process.exit(1);
}

const outputPath = path.join(__dirname, "answer-bank", "actual-interview-handbook-part3.json");
const text = fs.readFileSync(inputPath, "utf8");
const entries = [];
let category = "GCP Networking and Security";

for (const rawLine of text.split(/\r?\n/)) {
  const line = rawLine.trim();
  const questionMatch = line.match(/^(\d+)\.\s+(.+)$/);
  if (questionMatch) {
    const number = Number(questionMatch[1]);
    if (number < 701 || number > 1180) continue;
    const question = questionMatch[2].trim();
    entries.push({
      source: "Actual Interview Handbook - Part 3",
      section: category,
      category,
      questionType: /troubleshoot|investigate|denied|fails?|failure|blocked|cannot|unhealthy|dropped|exposed|mismatch/i.test(question)
        ? "Troubleshooting"
        : /difference|safer|preferred|compare/i.test(question) ? "Comparison" : "Conceptual",
      question,
      originalNumber: number,
    });
    continue;
  }
  if (
    line
    && !line.startsWith("Part 3:")
    && !line.startsWith("The wording below")
    && !line.startsWith("Part 3 contains")
  ) category = line;
}

if (entries.length !== 480) throw new Error(`Expected 480 questions, found ${entries.length}`);
fs.writeFileSync(outputPath, `${JSON.stringify(entries, null, 2)}\n`);
console.log(`Wrote ${entries.length} questions to ${outputPath}`);
