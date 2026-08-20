const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const answerBankDirectory = path.join(__dirname, "answer-bank");
const outputPath = path.join(answerBankDirectory, "actual-interview-generated-answers.json");
const model = process.env.OLLAMA_MODEL || "llama3.1:8b";
const endpoint = process.env.OLLAMA_URL || "http://127.0.0.1:11434/api/generate";
const batchSize = Math.max(1, Number(process.env.ANSWER_BATCH_SIZE || 6));
const concurrency = Math.max(1, Number(process.env.ANSWER_CONCURRENCY || 2));

function parseNumberedInterviewRound(fileName, source) {
  const filePath = path.join(root, "data", fileName);
  let category = "General";
  const entries = [];
  for (const rawLine of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    const match = line.match(/^\d+\.\s+(.+)$/);
    if (!match) {
      category = line;
      continue;
    }
    entries.push({ source, section: category, category, question: match[1] });
  }
  return entries;
}

function normalize(value) {
  return String(value || "").toLowerCase().replace(/^[a-z0-9/ &+-]+:\s+/, "").replace(/[^a-z0-9]+/g, " ").trim();
}

function dedupKey(value) {
  return normalize(value).replace(/^what are\b/, "what is").replace(/^what does\b/, "what is");
}

function requiresPersonalFacts(entry) {
  return /\b(do you use|have you|did you|you worked|you used|you implemented|you managed|you led|you handled|current role|current project|last project|day.to.day|notice period|salary|compensation|relocat|achievement|experience)\b/i
    .test(`${entry.category || ""} ${entry.question || ""}`);
}

function validateAnswer(entry, answer) {
  const value = String(answer || "").trim();
  if (value.length < 80) throw new Error(`Answer is too short for: ${entry.question}`);
  if (placeholderAnswer(value)) throw new Error(`Answer contains coaching or placeholder prose: ${entry.question}`);
  return value;
}

const original = JSON.parse(fs.readFileSync(path.join(answerBankDirectory, "imported-conversation-questions.json"), "utf8"));
const handbook = fs.readdirSync(answerBankDirectory)
  .filter((name) => /^actual-interview-handbook-part\d+\.json$/.test(name))
  .sort()
  .flatMap((name) => JSON.parse(fs.readFileSync(path.join(answerBankDirectory, name), "utf8")));
const sharedRounds = [
  ...parseNumberedInterviewRound(
    "actual-interview-landing-zone-gke-coding-round-2026-08-20.txt",
    "Actual Interview - Landing Zone, GKE and Coding Round - 2026-08-20",
  ),
  ...parseNumberedInterviewRound(
    "actual-interview-kubernetes-elk-dynatrace-round-2026-08-20.txt",
    "Actual Interview - Kubernetes, ELK and Dynatrace Round - 2026-08-20",
  ),
];
const existingBank = JSON.parse(fs.readFileSync(path.join(answerBankDirectory, "final-qa-dataset.json"), "utf8"));
const placeholderAnswer = (answer) => /a strong answer should|use a truthful star answer|for this scenario, first confirm user impact|the practical answer is to state what changes|in an interview,? (?:i would|also) mention|so the answer sounds production-ready instead of theoretical|tailor (?:the|your) (?:response|answer)|answer (?:this|the question) (?:by|with)|you should (?:say|state|mention|explain|describe)|use the prompt details as acceptance criteria/i.test(String(answer || ""));
const existingKeys = new Set(existingBank.filter((entry) => !placeholderAnswer(entry.answer)).map((entry) => normalize(entry.question)));
const supplementalKeys = new Set([
  "How do you identify whether a request/user is legitimate?",
  "Which GCP networking components have you worked on?",
  "What is Ingress?",
  "How do you configure a GCP service account in Jenkins?",
].map(normalize));
const unique = new Map();
for (const entry of [...original, ...handbook, ...sharedRounds]) {
  const key = dedupKey(entry.question);
  if (key && !unique.has(key)) unique.set(key, entry);
}

let generated = fs.existsSync(outputPath) ? JSON.parse(fs.readFileSync(outputPath, "utf8")) : {};
const pending = [...unique.values()].filter((entry) => {
  const key = normalize(entry.question);
  return !existingKeys.has(key) && !supplementalKeys.has(key) && !generated[key];
});
const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
const recentOnly = process.argv.includes("--recent-shared");
const eligible = recentOnly
  ? pending.filter((entry) => String(entry.source).includes("2026-08-20"))
  : pending;
const selected = limitArg ? eligible.slice(0, Number(limitArg.split("=")[1])) : eligible;
const batches = [];
for (let index = 0; index < selected.length; index += batchSize) batches.push(selected.slice(index, index + batchSize));

function extractJson(text) {
  const cleaned = String(text).replace(/^```json\s*/i, "").replace(/\s*```$/, "").trim();
  return JSON.parse(cleaned);
}

async function generateBatch(batch) {
  const questions = batch.map((entry, index) => ({ id: index + 1, category: entry.category, question: entry.question }));
  const prompt = `You are writing a senior-level technical interview handbook. Answer every supplied question directly and accurately.

Requirements for each answer:
- 60-100 words, concise, interview-ready and self-contained.
- Start with the direct answer, not advice about how to answer.
- Output only the substantive answer. Never discuss interview technique, what the candidate should say, or how to structure the response.
- Include a concrete command, configuration fragment, formula, metric, or realistic example when relevant.
- Include production failure modes, security/reliability concerns, and an important trade-off when relevant.
- Never claim that you personally used, built, led, managed, supported, or achieved something. You do not know the candidate's history.
- If a question asks about the candidate's project, role, experience, employer, salary, availability, or behavior, give a direct first-person answer with conspicuous square-bracket placeholders for every unknown fact. Example: "I supported [APPLICATION TYPE] on [PLATFORM]..." Never invent a company, project, tool, metric, or outcome.
- For factual technical questions, do not use personal-experience language. State the technical facts directly.
- Do not repeat the question and do not say "a strong answer should".
- Return only valid JSON shaped as {"answers":[{"id":1,"answer":"..."}]}.

Questions:
${JSON.stringify(questions)}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ model, prompt, stream: false, format: "json", options: { temperature: 0.1, num_ctx: 16384, num_predict: 1400 } }),
  });
  if (!response.ok) throw new Error(`Ollama returned HTTP ${response.status}`);
  const payload = await response.json();
  const parsed = extractJson(payload.response);
  if (!Array.isArray(parsed.answers) || parsed.answers.length !== batch.length) throw new Error("Model returned an incomplete answer batch");
  const validated = [];
  for (const item of parsed.answers) {
    const entry = batch[Number(item.id) - 1];
    if (!entry) throw new Error("Model returned an invalid answer id");
    validated.push([normalize(entry.question), validateAnswer(entry, item.answer)]);
  }
  for (const [key, answer] of validated) generated[key] = answer;
  fs.writeFileSync(outputPath, `${JSON.stringify(generated, null, 2)}\n`);
}

async function worker(queue, progress) {
  while (queue.length) {
    const batch = queue.shift();
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await generateBatch(batch);
        progress.completed += batch.length;
        console.log(`Generated ${progress.completed}/${selected.length}; saved ${Object.keys(generated).length} total`);
        lastError = null;
        break;
      } catch (error) {
        lastError = error;
        console.error(`Batch attempt ${attempt} failed: ${error.message}`);
      }
    }
    if (lastError) {
      if (batch.length > 1) {
        const midpoint = Math.ceil(batch.length / 2);
        queue.unshift(batch.slice(midpoint), batch.slice(0, midpoint));
        console.error(`Split failed batch of ${batch.length} into smaller retry batches.`);
      } else {
        const failedPath = path.join(answerBankDirectory, "actual-interview-answer-failures.json");
        const failures = fs.existsSync(failedPath) ? JSON.parse(fs.readFileSync(failedPath, "utf8")) : [];
        failures.push({ ...batch[0], error: lastError.message, failedAt: new Date().toISOString() });
        fs.writeFileSync(failedPath, `${JSON.stringify(failures, null, 2)}\n`);
        console.error(`Recorded failed question and continued: ${batch[0].question}`);
      }
    }
  }
}

async function main() {
  console.log(`Pending ${pending.length}; generating ${selected.length} with ${model}; batch ${batchSize}; concurrency ${concurrency}`);
  const queue = [...batches];
  const progress = { completed: 0 };
  await Promise.all(Array.from({ length: Math.min(concurrency, queue.length || 1) }, () => worker(queue, progress)));
  console.log(`Complete. Saved ${Object.keys(generated).length} generated answers to ${path.relative(root, outputPath)}`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
