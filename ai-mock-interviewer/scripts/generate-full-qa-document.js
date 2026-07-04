const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

function normalizeQuestion(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/^[a-z0-9/ &+-]+:\s+/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function parseLargeBank() {
  const text = fs.readFileSync(path.join(ROOT, "1000 DevOps + MLOps + Kubernetes + GCP Interview Questions.txt"), "utf8");
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
    const sm = line.match(/^Section\s+\d+:\s+(.+)$/);
    if (sm) { flush(); section = sm[1].trim(); continue; }
    const qm = line.match(/^\s*(\d+)\.\s+(.+)$/);
    if (qm && questionStem.test(qm[2].trim())) {
      flush();
      current = { source: "Large Technical Bank", section, question: qm[2].trim(), answerLines: [] };
      continue;
    }
    if (current) current.answerLines.push(line);
  }
  flush();
  return entries;
}

function parseTechQa() {
  const p = path.join(ROOT, "technology-risk-interview-questions-and-answers.txt");
  if (!fs.existsSync(p)) return [];
  const text = fs.readFileSync(p, "utf8");
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
    if (/^[A-Za-z].+$/.test(line) && !/^Answer:/.test(line) && !/^\d+\./.test(line)) { section = line.trim(); continue; }
    const qm = line.match(/^\s*(\d+)\.\s+(.+)$/);
    if (qm) { flush(); current = { source: "Technology Risk Q&A", section, question: qm[2].trim(), answerLines: [] }; continue; }
    if (current) current.answerLines.push(line);
  }
  flush();
  return entries;
}

function extractArray(src, name) {
  const re = new RegExp("const " + name + " = (\\[[\\s\\S]*?\\n\\]);");
  const m = src.match(re);
  return new Function("return " + m[1])();
}

function loadAppBanks() {
  const src = fs.readFileSync(path.join(ROOT, "public", "app.js"), "utf8");
  const banks = {
    "GCP / DevOps / SRE Question Bank": "questionBank",
    "Scripting & Automation": "scriptingQuestionBank",
    "Docker": "dockerQuestionBank",
    "Python": "pythonQuestionBank",
    "FastAPI": "fastApiQuestionBank",
    "Coding Exercises": "codingQuestionBank",
    "Debug This Script": "debugQuestionBank",
    "Go": "goQuestionBank",
    "LLMOps / GenAI Production": "llmOpsQuestionBank",
    "Ansible": "ansibleQuestionBank",
    "Technology Risk - Technical": "techRiskTechnicalQuestionBank",
    "Technology Risk - Behavioral": "techRiskBehavioralQuestionBank",
    "HR / Behavioral Basics": "hrBehavioralQuestionBank",
    "Basic / One-Liner Concepts": "basicConceptQuestionBank"
  };
  const entries = [];
  for (const [section, varName] of Object.entries(banks)) {
    for (const question of extractArray(src, varName)) {
      entries.push({ source: "App Question Bank", section, question });
    }
  }
  return entries;
}

function loadMockSets() {
  const sets = JSON.parse(fs.readFileSync(path.join(ROOT, "public", "mock-interview-sets.json"), "utf8"));
  const entries = [];
  for (const set of sets) {
    for (const item of set.questions) {
      entries.push({ source: "Fixed Mock Interview Sets", section: set.title, category: item.category, question: item.question });
    }
  }
  return entries;
}

function loadHandWrittenAnswers() {
  const dir = path.join(__dirname, "answer-bank");
  const merged = new Map();
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".json") || file === "needs-answer.json") continue;
    const obj = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
    for (const [question, answer] of Object.entries(obj)) {
      const key = normalizeQuestion(question);
      if (key && !merged.has(key)) merged.set(key, answer);
    }
  }
  return merged;
}

// Build the answer lookup: large bank + tech risk QA (real, sourced answers) first,
// then hand-written answers for everything else.
const largeBank = parseLargeBank();
const techQa = parseTechQa();
const handWritten = loadHandWrittenAnswers();

const answerByQuestion = new Map();
for (const e of [...largeBank, ...techQa]) {
  const key = normalizeQuestion(e.question);
  if (key && e.answer && !answerByQuestion.has(key)) answerByQuestion.set(key, e.answer);
}
for (const [key, answer] of handWritten) {
  if (!answerByQuestion.has(key)) answerByQuestion.set(key, answer);
}

// Source priority: mock sets first (curated rounds), then the app question banks
// (the primary practice pool), then large bank / tech-risk txt as supplementary depth.
const mockSets = loadMockSets();
const appBanks = loadAppBanks();

const allSources = [...mockSets, ...appBanks, ...techQa, ...largeBank];

const seen = new Set();
const finalEntries = [];
let missingAnswers = 0;
for (const e of allSources) {
  const key = normalizeQuestion(e.question);
  if (!key || seen.has(key)) continue;
  seen.add(key);
  const answer = e.answer || answerByQuestion.get(key);
  if (!answer) { missingAnswers++; continue; }
  finalEntries.push({
    source: e.source,
    section: e.section,
    category: e.category || null,
    question: e.question,
    answer
  });
}

console.log(`Total unique questions with answers: ${finalEntries.length}`);
console.log(`Skipped (no answer found): ${missingAnswers}`);

const outPath = path.join(__dirname, "answer-bank", "final-qa-dataset.json");
fs.writeFileSync(outPath, JSON.stringify(finalEntries, null, 2));
console.log("Wrote", path.relative(ROOT, outPath));
