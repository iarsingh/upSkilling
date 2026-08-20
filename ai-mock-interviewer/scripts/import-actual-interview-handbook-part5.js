const fs = require("fs");
const path = require("path");

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: node scripts/import-actual-interview-handbook-part5.js <part5-text-file>");
  process.exit(1);
}

const outputPath = path.join(__dirname, "answer-bank", "actual-interview-handbook-part5.json");
const text = fs.readFileSync(inputPath, "utf8");
const entries = [];
let category = "MLOps and AI Infrastructure";

for (const rawLine of text.split(/\r?\n/)) {
  const line = rawLine.trim();
  const questionMatch = line.match(/^(\d+)\.\s+(.+)$/);
  if (questionMatch) {
    const number = Number(questionMatch[1]);
    if (number < 1871 || number > 2520) continue;
    const question = questionMatch[2].trim();
    entries.push({
      source: "Actual Interview Handbook - Part 5",
      section: category,
      category,
      questionType: /troubleshoot|investigate|fails?|failure|incorrect|wrong|latency|oom|pending|drift|unauthorized|timeout/i.test(question)
        ? "Troubleshooting"
        : /difference|different|compare|versus|select between|choose between/i.test(question) ? "Comparison" : /describe a time|tell me|have you|why do you|what motivates|comfortable|willing/i.test(question) ? "Behavioral" : /design /i.test(question) ? "Design / Architecture" : "Conceptual",
      question,
      originalNumber: number,
    });
    continue;
  }
  if (
    line
    && !line.startsWith("Part 5:")
    && !line.startsWith("These questions are")
    && !line.startsWith("Part 5 contains")
  ) category = line;
}

if (entries.length !== 650) throw new Error(`Expected 650 questions, found ${entries.length}`);
fs.writeFileSync(outputPath, `${JSON.stringify(entries, null, 2)}\n`);
console.log(`Wrote ${entries.length} questions to ${outputPath}`);
