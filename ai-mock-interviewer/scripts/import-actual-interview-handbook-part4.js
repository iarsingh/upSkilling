const fs = require("fs");
const path = require("path");

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: node scripts/import-actual-interview-handbook-part4.js <part4-text-file>");
  process.exit(1);
}

const outputPath = path.join(__dirname, "answer-bank", "actual-interview-handbook-part4.json");
const text = fs.readFileSync(inputPath, "utf8");
const entries = [];
let category = "SRE and Observability";

for (const rawLine of text.split(/\r?\n/)) {
  const line = rawLine.trim();
  const questionMatch = line.match(/^(\d+)\.\s+(.+)$/);
  if (questionMatch) {
    const number = Number(questionMatch[1]);
    if (number < 1181 || number > 1870) continue;
    const question = questionMatch[2].trim();
    entries.push({
      source: "Actual Interview Handbook - Part 4",
      section: category,
      category,
      questionType: /troubleshoot|investigate|incident|outage|fails?|failure|unavailable|unhealthy|latency|exhaust|pressure|rollback/i.test(question)
        ? "Troubleshooting"
        : /difference|different|compare/i.test(question) ? "Comparison" : /describe a time|have you|give an example/i.test(question) ? "Behavioral" : "Conceptual",
      question,
      originalNumber: number,
    });
    continue;
  }
  if (
    line
    && !line.startsWith("Part 4:")
    && !line.startsWith("These questions are")
    && !line.startsWith("Part 4 contains")
  ) category = line;
}

if (entries.length !== 690) throw new Error(`Expected 690 questions, found ${entries.length}`);
fs.writeFileSync(outputPath, `${JSON.stringify(entries, null, 2)}\n`);
console.log(`Wrote ${entries.length} questions to ${outputPath}`);
