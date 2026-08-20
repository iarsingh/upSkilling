const fs = require("fs");
const path = require("path");

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: node scripts/import-actual-interview-handbook-part2.js <part2-text-file>");
  process.exit(1);
}

const outputPath = path.join(__dirname, "answer-bank", "actual-interview-handbook-part2.json");
const text = fs.readFileSync(inputPath, "utf8");
const entries = [];
let category = "CI/CD";

for (const rawLine of text.split(/\r?\n/)) {
  const line = rawLine.trim();
  const questionMatch = line.match(/^(\d+)\.\s+(.+)$/);
  if (questionMatch) {
    const number = Number(questionMatch[1]);
    if (number < 211 || number > 700) continue;
    let question = questionMatch[2].trim();
    // The source uses the identical wording for two different tool-specific operations.
    if (question === "How do you perform a dry run?") {
      question = `How do you perform a dry run with ${category === "Helm" ? "Helm" : "Ansible"}?`;
    }
    entries.push({
      source: "Actual Interview Handbook - Part 2",
      section: category,
      category,
      questionType: /troubleshoot|debug|fails?|failure|stuck|pending|offline|latency|rollback/i.test(question)
        ? "Troubleshooting"
        : /difference| vs |prefer/i.test(question) ? "Comparison" : "Conceptual",
      question,
      originalNumber: number,
    });
    continue;
  }
  if (line && !line.startsWith("Part 2:") && !line.startsWith("This section contains")) category = line;
}

if (entries.length !== 490) throw new Error(`Expected 490 questions, found ${entries.length}`);
fs.writeFileSync(outputPath, `${JSON.stringify(entries, null, 2)}\n`);
console.log(`Wrote ${entries.length} questions to ${outputPath}`);
