const fs = require("fs");
const path = require("path");

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: node scripts/import-actual-interview-handbook-part6.js <part6-text-file>");
  process.exit(1);
}

const outputPath = path.join(__dirname, "answer-bank", "actual-interview-handbook-part6.json");
const text = fs.readFileSync(inputPath, "utf8");
const entries = [];
let category = "AWS, Automation and Platform Operations";
const contextualWording = new Map([
  [2553, "What is a subnet in AWS?"],
  [2567, "What is VPC peering in AWS?"],
  [2568, "Is AWS VPC peering transitive?"],
  [2601, "What is an AWS Application Load Balancer?"],
  [2602, "What is an AWS Network Load Balancer?"],
  [2608, "What is host-based routing in an AWS ALB?"],
  [2661, "What is Cluster Autoscaler in EKS?"],
  [2801, "How do you define a function in Bash?"],
  [2877, "How do you define a function in PowerShell?"],
]);

for (const rawLine of text.split(/\r?\n/)) {
  const line = rawLine.trim();
  const questionMatch = line.match(/^(\d+)\.\s+(.+)$/);
  if (questionMatch) {
    const number = Number(questionMatch[1]);
    if (number < 2521 || number > 3220) continue;
    const question = contextualWording.get(number) || questionMatch[2].trim();
    entries.push({
      source: "Actual Interview Handbook - Part 6",
      section: category,
      category,
      questionType: /troubleshoot|diagnose|investigate|fails?|failure|cannot|unavailable|missing|exhaust|slow|lag|expired|blocks?|wrong/i.test(question)
        ? "Troubleshooting"
        : /difference|different|compare|instead|versus/i.test(question) ? "Comparison" : /how do you handle|how do you respond|how do you convince|how do you present/i.test(question) ? "Behavioral" : "Conceptual",
      question,
      originalQuestion: contextualWording.has(number) ? questionMatch[2].trim() : undefined,
      originalNumber: number,
    });
    continue;
  }
  if (
    line
    && !line.startsWith("Part 6:")
    && !line.startsWith("This section continues")
    && !line.startsWith("Part 6 contains")
  ) category = line;
}

if (entries.length !== 700) throw new Error(`Expected 700 questions, found ${entries.length}`);
fs.writeFileSync(outputPath, `${JSON.stringify(entries, null, 2)}\n`);
console.log(`Wrote ${entries.length} questions to ${outputPath}`);
