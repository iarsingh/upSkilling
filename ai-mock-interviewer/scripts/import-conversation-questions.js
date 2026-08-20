const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const ACTUAL_MODE = process.argv.includes("--actual");
const APPEND_MODE = process.argv.includes("--append");
const OUT_PATH = path.join(
  __dirname,
  "answer-bank",
  ACTUAL_MODE ? "actual-interview-new-questions.json" : "imported-conversation-questions.json"
);

function normalizeQuestion(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/^[a-z0-9/ &+-]+:\s+/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function canonicalQuestionKey(value) {
  const normalized = normalizeQuestion(value)
    .replace(/\bworked on\b/g, "worked with")
    .replace(/\brequest user\b/g, "user request")
    .replace(/\s+/g, " ")
    .trim();
  const isShort = normalized.split(" ").length <= 14;
  const isDefinitionOrComparison = /^(what (is|are)|explain|describe|define|difference between|what is the difference between)\b/.test(normalized);
  if (!isShort || !isDefinitionOrComparison) {
    return normalized
      .replace(/^(can you|could you|please)\s+/, "")
      .replace(/\b(a|an|the)\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  return normalized
    .replace(/^(what (is|are)|explain|describe|define|what is the difference between|difference between)\s+/, "")
    .split(" ")
    .filter((token) => !["a", "an", "the", "in", "on"].includes(token))
    .sort()
    .join(" ");
}

function classifyQuestionType(question) {
  const text = String(question || "").toLowerCase();
  if (/\b(troubleshoot|debug|investigate|fails?|failure|pending|crashloop|exhaust|corrupt|deleted|recover|restore)\b/.test(text)) return "Troubleshooting";
  if (/^(tell me|have you|are you|do you use|what activities|what was your|in your environment|which tool do you use)/.test(text)) return "Experience";
  if (/\b(difference|compare|versus| vs |choose|prefer|instead of)\b/.test(text)) return "Comparison";
  if (/^(how would you design|design |explain the complete|what is the complete request flow|how does traffic flow)/.test(text)) return "Design / Architecture";
  if (/^(suppose|if |when |a customer|you scale|what happens)/.test(text)) return "Scenario";
  if (/^(how do you|how would you|how does|what should|what inputs|where do you|which .* required)/.test(text)) return "Implementation / Workflow";
  return "Conceptual";
}

function parseFile(filePath) {
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  const entries = [];
  let section = "General";

  for (let index = 0; index < lines.length; index++) {
    const rawLine = lines[index];
    const line = rawLine.trim();
    const match = line.match(/^\d+\.\s+(.+)$/);
    if (match) {
      const question = match[1].trim() === "What is the relationship between:"
        ? "What is the relationship between a Kubernetes Deployment, ReplicaSet, and Pods?"
        : match[1].trim();
      if (!question.endsWith("?") && !question.endsWith(":") && !/^(tell|explain|describe|design|write|correct|give)\b/i.test(question)) continue;
      entries.push({
        source: ACTUAL_MODE ? "Actual Interview Questions - August 2026 Rounds" : "Imported Conversation Questions",
        section,
        category: section,
        questionType: classifyQuestionType(question),
        question
      });
      continue;
    }
    const separatedHeading = !String(lines[index - 1] || "").trim()
      && !String(lines[index + 1] || "").trim();
    if (
      separatedHeading
      && line
      && !/^Here are all the interview questions/i.test(line)
      && !/^These were the main technical areas/i.test(line)
      && !/^Important rapid-fire questions/i.test(line)
      && !line.includes("→")
      && !line.includes(": ")
    ) {
      section = line;
    }
  }
  return entries;
}

const inputPaths = process.argv.slice(2).filter((arg) => !["--actual", "--append"].includes(arg));
if (!inputPaths.length) {
  console.error("Usage: node scripts/import-conversation-questions.js [--actual] <pasted-text.txt> [...]");
  process.exit(1);
}

const unique = new Map();
for (const inputPath of inputPaths) {
  for (const entry of parseFile(inputPath)) {
    const key = normalizeQuestion(entry.question);
    if (key && !unique.has(key)) unique.set(key, entry);
  }
}

let entries = [...unique.values()];
let existingOutputKeys = new Set();
if (APPEND_MODE && fs.existsSync(OUT_PATH)) {
  const existingOutput = JSON.parse(fs.readFileSync(OUT_PATH, "utf8"));
  existingOutputKeys = new Set(existingOutput.map((entry) => normalizeQuestion(entry.question)).filter(Boolean));
  for (const entry of existingOutput) unique.set(normalizeQuestion(entry.question), entry);
  for (const entry of entries) unique.set(normalizeQuestion(entry.question), entry);
  entries = [...unique.values()];
}
if (ACTUAL_MODE) {
  const finalPath = path.join(__dirname, "answer-bank", "final-qa-dataset.json");
  const existing = fs.existsSync(finalPath) ? JSON.parse(fs.readFileSync(finalPath, "utf8")) : [];
  const comparisonEntries = APPEND_MODE
    ? existing.filter((entry) => entry.source !== "Imported Conversation Questions")
    : existing;
  const existingExact = new Set(comparisonEntries.map((entry) => normalizeQuestion(entry.question)).filter(Boolean));
  const existingCanonical = new Set(comparisonEntries.map((entry) => canonicalQuestionKey(entry.question)).filter(Boolean));
  entries = entries.filter((entry) => {
    const exact = normalizeQuestion(entry.question);
    const canonical = canonicalQuestionKey(entry.question);
    return exact && (existingOutputKeys.has(exact) || (!existingExact.has(exact) && !existingCanonical.has(canonical)));
  });
}
fs.writeFileSync(OUT_PATH, `${JSON.stringify(entries, null, 2)}\n`);
console.log(`Wrote ${entries.length} unique ${ACTUAL_MODE ? "new actual-interview" : "imported"} questions to ${path.relative(ROOT, OUT_PATH)}`);
