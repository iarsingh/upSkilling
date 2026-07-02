const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const MOCK_SETS_PATH = path.join(ROOT, "public", "mock-interview-sets.json");
const LARGE_BANK_PATH = path.join(ROOT, "1000 DevOps + MLOps + Kubernetes + GCP Interview Questions.txt");
const TECH_QA_PATH = path.join(ROOT, "technology-risk-interview-questions-and-answers.txt");
const QUESTIONS_OUT = path.join(ROOT, "all-tech-and-mock-interview-questions.txt");
const QA_OUT = path.join(ROOT, "all-tech-and-mock-interview-questions-with-answers.txt");

function normalizeQuestion(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/^[a-z0-9/ &+-]+:\s+/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function parseLargeBank() {
  const text = fs.readFileSync(LARGE_BANK_PATH, "utf8");
  const lines = text.split(/\r?\n/);
  const entries = [];
  let section = "General";
  let current = null;
  const questionStem = /^(what|why|how|when|where|which|who|explain|describe|difference|design|scenario|tell|a pod|pods)\b/i;

  function flush() {
    if (!current) return;
    current.answer = current.answerLines.join("\n").trim();
    delete current.answerLines;
    if (current.answer) entries.push(current);
    current = null;
  }

  for (const line of lines) {
    const sectionMatch = line.match(/^Section\s+\d+:\s+(.+)$/);
    if (sectionMatch) {
      flush();
      section = sectionMatch[1].trim();
      continue;
    }

    const questionMatch = line.match(/^\s*(\d+)\.\s+(.+)$/);
    if (questionMatch && questionStem.test(questionMatch[2].trim())) {
      flush();
      current = {
        source: "Large Technical Bank",
        section,
        number: Number(questionMatch[1]),
        question: questionMatch[2].trim(),
        answerLines: []
      };
      continue;
    }

    if (current) current.answerLines.push(line);
  }

  flush();
  return entries;
}

function parseTechQa() {
  if (!fs.existsSync(TECH_QA_PATH)) return [];
  const text = fs.readFileSync(TECH_QA_PATH, "utf8");
  const lines = text.split(/\r?\n/);
  const entries = [];
  let section = "Technology Risk";
  let current = null;

  function flush() {
    if (!current) return;
    current.answer = current.answerLines.join("\n").trim().replace(/^Answer:\s*/i, "");
    delete current.answerLines;
    if (current.answer) entries.push(current);
    current = null;
  }

  for (const line of lines) {
    if (/^[A-Za-z].+$/.test(line) && !/^Answer:/.test(line) && !/^\d+\./.test(line)) {
      section = line.trim();
      continue;
    }

    const questionMatch = line.match(/^\s*(\d+)\.\s+(.+)$/);
    if (questionMatch) {
      flush();
      current = {
        source: "Technology Risk Q&A",
        section,
        number: Number(questionMatch[1]),
        question: questionMatch[2].trim(),
        answerLines: []
      };
      continue;
    }

    if (current) current.answerLines.push(line);
  }

  flush();
  return entries;
}

function parseMockSets() {
  const sets = JSON.parse(fs.readFileSync(MOCK_SETS_PATH, "utf8"));
  const entries = [];

  for (const set of sets) {
    set.questions.forEach((item, index) => {
      entries.push({
        source: "Fixed Mock Interview Sets",
        section: set.title,
        focus: set.focus,
        setId: set.id,
        number: index + 1,
        category: item.category,
        question: item.question
      });
    });
  }

  return entries;
}

function generatedAnswer(entry) {
  const category = entry.category || entry.section || "Technical";
  const question = entry.question;
  return [
    `A strong answer should directly address the ${category} angle of the question.`,
    "Start with the goal or principle, then explain the practical implementation steps.",
    "For a senior interview answer, include risk, tradeoffs, ownership, observability, rollback or recovery, and how you would validate success.",
    `Use a concrete example from GCP, Kubernetes, Terraform, CI/CD, SRE, security, networking, or platform engineering depending on the question: ${question}`
  ].join(" ");
}

function addUnique(entries, sourceEntries, answerByQuestion) {
  const seen = new Set(entries.map((entry) => normalizeQuestion(entry.question)));
  for (const entry of sourceEntries) {
    const key = normalizeQuestion(entry.question);
    if (!key || seen.has(key)) continue;
    const knownAnswer = answerByQuestion.get(key);
    entries.push({
      ...entry,
      answer: entry.answer || knownAnswer || generatedAnswer(entry)
    });
    seen.add(key);
  }
}

const largeBank = parseLargeBank();
const techQa = parseTechQa();
const mockSets = parseMockSets();

const answerByQuestion = new Map();
for (const entry of [...largeBank, ...techQa]) {
  const key = normalizeQuestion(entry.question);
  if (key && entry.answer && !answerByQuestion.has(key)) {
    answerByQuestion.set(key, entry.answer);
  }
}

const allEntries = [];
addUnique(allEntries, mockSets, answerByQuestion);
addUnique(allEntries, techQa, answerByQuestion);
addUnique(allEntries, largeBank, answerByQuestion);

const questionsLines = [
  "All Tech and Mock Interview Questions",
  "=====================================",
  "",
  `Total unique questions: ${allEntries.length}`,
  "Sources: fixed mock interview sets, Technology Risk Q&A, and the 1000+ DevOps/MLOps/Kubernetes/GCP bank.",
  ""
];

let currentSection = "";
allEntries.forEach((entry, index) => {
  if (entry.section !== currentSection) {
    currentSection = entry.section;
    questionsLines.push("");
    questionsLines.push(currentSection);
    questionsLines.push("-".repeat(currentSection.length));
  }
  const category = entry.category ? ` [${entry.category}]` : "";
  questionsLines.push(`${index + 1}.${category} ${entry.question}`);
});

const qaLines = [
  "All Tech and Mock Interview Questions With Answers",
  "==================================================",
  "",
  `Total unique questions: ${allEntries.length}`,
  "Sources: fixed mock interview sets, Technology Risk Q&A, and the 1000+ DevOps/MLOps/Kubernetes/GCP bank.",
  "Note: fixed mock-set questions without a stored answer include concise answer guidance.",
  ""
];

currentSection = "";
allEntries.forEach((entry, index) => {
  if (entry.section !== currentSection) {
    currentSection = entry.section;
    qaLines.push("");
    qaLines.push(currentSection);
    qaLines.push("-".repeat(currentSection.length));
  }
  const category = entry.category ? ` [${entry.category}]` : "";
  qaLines.push(`${index + 1}.${category} ${entry.question}`);
  qaLines.push(`Answer: ${entry.answer.trim()}`);
  qaLines.push("");
});

fs.writeFileSync(QUESTIONS_OUT, questionsLines.join("\n").replace(/\n{4,}/g, "\n\n\n") + "\n");
fs.writeFileSync(QA_OUT, qaLines.join("\n").replace(/\n{4,}/g, "\n\n\n") + "\n");

console.log(`mock set questions: ${mockSets.length}`);
console.log(`technology risk Q&A questions: ${techQa.length}`);
console.log(`large bank Q&A questions: ${largeBank.length}`);
console.log(`total unique exported questions: ${allEntries.length}`);
console.log(path.relative(process.cwd(), QUESTIONS_OUT));
console.log(path.relative(process.cwd(), QA_OUT));
