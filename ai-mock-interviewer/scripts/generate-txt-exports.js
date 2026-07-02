const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const entries = JSON.parse(fs.readFileSync(path.join(__dirname, "answer-bank", "final-qa-dataset.json"), "utf8"));

const QUESTIONS_OUT = path.join(ROOT, "all-tech-and-mock-interview-questions.txt");
const QA_OUT = path.join(ROOT, "all-tech-and-mock-interview-questions-with-answers.txt");

const questionsLines = [
  "All Tech and Mock Interview Questions",
  "=====================================",
  "",
  `Total unique questions: ${entries.length}`,
  "Sources: fixed mock interview sets, the full app question bank (GCP/DevOps/SRE, Kubernetes, Docker, Terraform, " +
    "Python, Go, FastAPI, Ansible, Scripting, Coding Exercises, Debug-This-Script, LLMOps, MLOps, Technology Risk, " +
    "HR/Behavioral), Technology Risk Q&A, and the 1000+ DevOps/MLOps/Kubernetes/GCP bank.",
  ""
];

const qaLines = [
  "All Tech and Mock Interview Questions With Answers",
  "==================================================",
  "",
  `Total unique questions: ${entries.length}`,
  "Sources: fixed mock interview sets, the full app question bank (GCP/DevOps/SRE, Kubernetes, Docker, Terraform, " +
    "Python, Go, FastAPI, Ansible, Scripting, Coding Exercises, Debug-This-Script, LLMOps, MLOps, Technology Risk, " +
    "HR/Behavioral), Technology Risk Q&A, and the 1000+ DevOps/MLOps/Kubernetes/GCP bank.",
  "Every question below has a real, specific answer - no generic placeholders.",
  ""
];

let currentSection = "";
entries.forEach((entry, index) => {
  if (entry.section !== currentSection) {
    currentSection = entry.section;
    questionsLines.push("", currentSection, "-".repeat(currentSection.length));
    qaLines.push("", currentSection, "-".repeat(currentSection.length));
  }
  const category = entry.category ? ` [${entry.category}]` : "";
  questionsLines.push(`${index + 1}.${category} ${entry.question}`);
  qaLines.push(`${index + 1}.${category} ${entry.question}`);
  qaLines.push(`Answer: ${entry.answer.trim()}`);
  qaLines.push("");
});

fs.writeFileSync(QUESTIONS_OUT, questionsLines.join("\n").replace(/\n{4,}/g, "\n\n\n") + "\n");
fs.writeFileSync(QA_OUT, qaLines.join("\n").replace(/\n{4,}/g, "\n\n\n") + "\n");

console.log(`Wrote ${entries.length} questions to:`);
console.log(" ", path.relative(ROOT, QUESTIONS_OUT));
console.log(" ", path.relative(ROOT, QA_OUT));
