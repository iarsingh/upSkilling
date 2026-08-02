const fs = require("fs");
const path = require("path");
const { postsDir } = require("../src/config");

const directory = path.join(postsDir, "ai-engineer-revision");
const files = fs.existsSync(directory)
  ? fs.readdirSync(directory).filter((name) => name.endsWith(".md"))
  : [];

function removeQuestions(line) {
  if (!line.includes("?")) return line;
  return line
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => !sentence.includes("?"))
    .join(" ")
    .trim();
}

for (const filename of files) {
  const filePath = path.join(directory, filename);
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  const normalized = [];

  for (const original of lines) {
    const trimmed = original.trim();
    if (/^(Answer|Question|Scenario|Core principle|Interview question):$/i.test(trimmed)) continue;
    if (/^Architecture flow:$/i.test(trimmed)) {
      normalized.push("A practical implementation path:");
      continue;
    }
    if (/^Production checklist:$/i.test(trimmed)) {
      normalized.push("What matters in production:");
      continue;
    }
    if (/comment|join the discussion|share your experience/i.test(trimmed)) {
      normalized.push("Save this revision note and apply the pattern in a small production-style implementation.");
      continue;
    }
    normalized.push(removeQuestions(original));
  }

  const compact = normalized.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
  fs.writeFileSync(filePath, compact, "utf8");
}

console.log(`Normalized ${files.length} AI revision drafts.`);
