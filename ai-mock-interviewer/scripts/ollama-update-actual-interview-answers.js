const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const actualPath = path.join(root, "actual-interview-questions-and-answers.md");
const backupPath = path.join(root, "actual-interview-questions-and-answers.md.bak");
const outputPath = path.join(__dirname, "answer-bank", "actual-interview-ollama-updated-answers.json");
const model = process.env.OLLAMA_MODEL || "llama3.1:8b";
const endpoint = process.env.OLLAMA_URL || "http://127.0.0.1:11434/api/generate";
const batchSize = Math.max(1, Number(process.env.ANSWER_BATCH_SIZE || 1));
const concurrency = Math.max(1, Number(process.env.ANSWER_CONCURRENCY || 2));
const forceUpdate = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");
const apply = process.argv.includes("--apply");
const sampleArg = process.argv.find((arg) => arg.startsWith("--sample="));
const sampleLimit = sampleArg ? Number(sampleArg.split("=")[1]) : 0;

function normalize(text) {
  return String(text || "").trim();
}

function isWeakAnswer(answer) {
  const value = String(answer || "").trim();
  if (!value) return true;
  if (value.length < 120) return true;
  const placeholder = /a strong answer should|use a truthful star answer|in an interview|the practical answer|answer the following|you should|keep the answer|never say|don'?t say|placeholder/i;
  return placeholder.test(value);
}

function normalizeForKey(text) {
  return String(text || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function parseEntries(text) {
  const entries = [];
  const regex = /^###\s*\d+\.\s*(.+?)\r?\n\r?\n\*\*Type:\*\*.*?\r?\n\r?\n\*\*Answer:\*\*\r?\n\r?\n([\s\S]*?)(?=^###\s*\d+\.|\Z)/gim;
  let match;

  while ((match = regex.exec(text)) !== null) {
    entries.push({
      question: match[1].trim(),
      answer: match[2].trim(),
      start: match.index,
      fullMatch: match[0],
    });
  }

  return entries;
}

function buildPrompt(question, existingAnswer) {
  const answerBlock = existingAnswer ? `Existing answer:\n${existingAnswer}` : "Existing answer: (none)";
  return `You are an expert senior DevOps/GCP interview coach. Review the interview question below and improve the existing answer if it is weak. If no answer exists or the existing answer is missing details, rewrite it into a complete, polished, production-ready answer.

Question: ${question}

${answerBlock}

Requirements:
- Answer directly as the candidate, not as a coach or advisor.
- Keep the answer concise and clear, preferably 70-120 words.
- Include a concrete command, configuration detail, metric, validation step, or relevant production trade-off when appropriate.
- Do not use meta phrases such as "a strong answer should", "in an interview", "you should", "this question", "to answer this", or "as a candidate".
- If the question asks about your experience or project, use explicit placeholders like [PROJECT], [SERVICE], [TOOL], [TIMELINE], or [METRIC] for any unknown fact.
- Do not invent specific company names, team names, customer names, or project names.
- Return only the improved answer text with no extra commentary or analysis.`;
}

function isInvalidGeneratedAnswer(answer) {
  const normalized = String(answer || "").trim();
  if (!normalized) return true;
  if (normalized.length < 90) return true;
  if (/\b(a strong answer should|use a truthful star answer|in an interview|the practical answer|answer the following|you should|you will|you can|this question|to answer this|as a candidate|placeholder)\b/i.test(normalized)) return true;
  if (/\b(i would|i would also|i would first|i usually|as a candidate|in production|for example|for instance)\b/i.test(normalized) && /\b(question|issue|problem|scenario)\b/i.test(normalized)) return true;
  if (/\bI am an expert|I am a senior|I am experienced\b/i.test(normalized)) return true;
  return false;
}

async function generateAnswer(question, currentAnswer) {
  const prompt = buildPrompt(question, currentAnswer);
  const requestBody = {
    model,
    prompt,
    stream: false,
    options: {
      temperature: 0.1,
      num_ctx: 16384,
      num_predict: 800,
    },
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`Ollama request failed with status ${response.status}`);
  }

  const payload = await response.json();
  const raw = String(payload.response || payload.choices?.[0]?.message?.content || "").trim();
  const cleaned = raw.replace(/^```(?:json|text)?\s*/, "").replace(/```$/, "").trim();
  if (!cleaned) throw new Error("Empty answer from Ollama");
  if (isInvalidGeneratedAnswer(cleaned)) {
    throw new Error(`Generated answer did not meet quality checks: ${cleaned.slice(0, 160).replace(/\n/g, ' ')}...`);
  }
  return cleaned;
}

function applyUpdates(originalText, entries, updatedAnswers) {
  let output = originalText;
  const sortedEntries = entries.slice().sort((a, b) => b.start - a.start);

  for (const entry of sortedEntries) {
    const key = normalizeForKey(entry.question);
    if (!updatedAnswers[key]) continue;
    const oldBlock = entry.fullMatch;
    const newBlock = oldBlock.replace(/(\*\*Answer:\*\*\r?\n\r?\n)[\s\S]*$/m, `$1${updatedAnswers[key].trim()}\n`);
    output = output.slice(0, entry.start) + newBlock + output.slice(entry.start + oldBlock.length);
  }

  return output;
}

async function run() {
  if (!fs.existsSync(actualPath)) {
    console.error(`File not found: ${actualPath}`);
    process.exit(1);
  }

  const originalText = fs.readFileSync(actualPath, "utf8");
  const entries = parseEntries(originalText);
  if (!entries.length) {
    console.error("No question entries were parsed.");
    process.exit(1);
  }

  const toUpdate = entries.filter((entry) => forceUpdate || isWeakAnswer(entry.answer));
  const selected = sampleLimit > 0 ? toUpdate.slice(0, sampleLimit) : toUpdate;

  console.log(`Parsed ${entries.length} questions.`);
  console.log(`Selected ${selected.length} questions for answer generation${forceUpdate ? " (force update)" : ""}${sampleLimit ? `, sample=${sampleLimit}` : ""}.`);
  if (!apply) console.log("Dry run mode: the file will not be written unless --apply is provided.");

  const existingSaved = fs.existsSync(outputPath) ? JSON.parse(fs.readFileSync(outputPath, "utf8")) : {};
  const updatedAnswers = { ...existingSaved };

  const queue = selected.map((entry) => async () => {
    const key = normalizeForKey(entry.question);
    if (updatedAnswers[key] && !forceUpdate) {
      console.log(`Skipping already-saved question: ${entry.question}`);
      return;
    }
    console.log(`Generating answer for: ${entry.question}`);
    const answer = await generateAnswer(entry.question, entry.answer);
    updatedAnswers[key] = answer;
    fs.writeFileSync(outputPath, JSON.stringify(updatedAnswers, null, 2) + "\n");
    console.log(`Saved answer for: ${entry.question}`);
  });

  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, () => Promise.resolve());
  let index = 0;

  await Promise.all(workers.map(async () => {
    while (index < queue.length) {
      const job = queue[index++];
      try {
        await job();
      } catch (error) {
        console.error(`Error generating answer: ${error.message}`);
      }
    }
  }));

  if (apply) {
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(actualPath, backupPath);
      console.log(`Created backup: ${backupPath}`);
    }
    const newText = applyUpdates(originalText, entries, updatedAnswers);
    fs.writeFileSync(actualPath, newText, "utf8");
    console.log(`Updated file written to ${actualPath}`);
  }

  console.log(`Finished. Generated/updated answers saved to ${outputPath}`);
}

run().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
