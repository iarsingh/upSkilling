const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const sourcePath = path.join(__dirname, "answer-bank", "actual-interview-new-questions.json");
const mockSetsPath = path.join(root, "public", "mock-interview-sets.json");
const generatedAnswersPath = path.join(__dirname, "answer-bank", "actual-interview-generated-answers.json");
const finalDatasetPath = path.join(__dirname, "answer-bank", "final-qa-dataset.json");
const reservedId = "actual-interview-latest";

function normalize(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function parseNumberedRound(fileName) {
  let category = "Actual Interview";
  const entries = [];
  const text = fs.readFileSync(path.join(root, "data", fileName), "utf8");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    const match = line.match(/^\d+\.\s+(.+)$/);
    if (!match) {
      category = line;
      continue;
    }
    entries.push({ category, section: category, question: match[1] });
  }
  return entries;
}

const source = [
  ...JSON.parse(fs.readFileSync(sourcePath, "utf8")),
  ...parseNumberedRound("actual-interview-landing-zone-gke-coding-round-2026-08-20.txt"),
  ...parseNumberedRound("actual-interview-kubernetes-elk-dynatrace-round-2026-08-20.txt"),
];
const generatedAnswers = fs.existsSync(generatedAnswersPath)
  ? JSON.parse(fs.readFileSync(generatedAnswersPath, "utf8"))
  : {};
const reviewedAnswers = fs.existsSync(finalDatasetPath)
  ? new Map(JSON.parse(fs.readFileSync(finalDatasetPath, "utf8")).map((entry) => [normalize(entry.question), entry.answer]))
  : new Map();
const unique = new Map();
for (const entry of source) {
  const key = normalize(entry.question);
  if (key && !unique.has(key)) unique.set(key, entry);
}

const sets = JSON.parse(fs.readFileSync(mockSetsPath, "utf8")).filter((set) => set.id !== reservedId);
if (unique.size) {
  sets.unshift({
    id: reservedId,
    title: "Actually Asked Interview Questions - Latest Additions",
    focus: "New interview questions captured from real interview messages",
    questions: [...unique.values()].map((entry) => ({
      category: entry.category || entry.section || "Actual Interview",
      question: entry.question,
      answer: entry.answer || generatedAnswers[normalize(entry.question)] || reviewedAnswers.get(normalize(entry.question)),
    })),
  });
}
fs.writeFileSync(mockSetsPath, `${JSON.stringify(sets, null, 2)}\n`);
console.log(`Synced ${unique.size} latest actual-interview questions into mock-interview-sets.json`);
