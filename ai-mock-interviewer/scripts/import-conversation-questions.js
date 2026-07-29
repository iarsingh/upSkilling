const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT_PATH = path.join(__dirname, "answer-bank", "imported-conversation-questions.json");

function normalizeQuestion(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/^[a-z0-9/ &+-]+:\s+/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
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

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const match = line.match(/^\d+\.\s+(.+)$/);
    if (match) {
      const question = match[1].trim();
      if (!question.endsWith("?") && !/^(tell|explain|describe|design)\b/i.test(question)) continue;
      entries.push({
        source: "Imported Conversation Questions",
        section,
        category: section,
        questionType: classifyQuestionType(question),
        question
      });
      continue;
    }
    if (
      line
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

const inputPaths = process.argv.slice(2);
if (!inputPaths.length) {
  console.error("Usage: node scripts/import-conversation-questions.js <pasted-text.txt> [...]");
  process.exit(1);
}

const unique = new Map();
for (const inputPath of inputPaths) {
  for (const entry of parseFile(inputPath)) {
    const key = normalizeQuestion(entry.question);
    if (key && !unique.has(key)) unique.set(key, entry);
  }
}

const entries = [...unique.values()];
fs.writeFileSync(OUT_PATH, `${JSON.stringify(entries, null, 2)}\n`);
console.log(`Wrote ${entries.length} unique imported questions to ${path.relative(ROOT, OUT_PATH)}`);
