#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");
const { ROOT, profile } = require("./lib/config");
const { askOllama } = require("./lib/ollama");

const CATEGORY_LABELS = {
  introductionAndBackground: "Introduction & Background",
  aiMlopsLlm: "AI / MLOps / LLM",
  kubernetesNetworkingDns: "Kubernetes / Networking / DNS",
  automationPythonInfrastructure: "Automation / Python / Infrastructure"
};

function parseArgs(argv) {
  const args = {
    category: "all",
    limit: null,
    list: false,
    feedback: true
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--category") args.category = argv[++i];
    else if (arg === "--limit") args.limit = Number(argv[++i]);
    else if (arg === "--list") args.list = true;
    else if (arg === "--no-feedback") args.feedback = false;
    else if (arg === "--help" || arg === "-h") args.help = true;
  }

  return args;
}

function printHelp() {
  console.log(`
Mock interview

Usage:
  npm run mock-interview
  npm run mock-interview -- --category aiMlopsLlm --limit 5
  node src/mockInterview.js --list

Options:
  --category     all | ${Object.keys(CATEGORY_LABELS).join(" | ")}   (default: all)
  --limit        number of questions to ask
  --list         show available categories and question counts
  --no-feedback  ask questions without Ollama feedback
`);
}

function getQuestions(category) {
  const bank = profile.interviewQuestions || {};
  const entries = category === "all"
    ? Object.entries(bank)
    : [[category, bank[category]]];

  return entries.flatMap(([key, questions]) => {
    if (!Array.isArray(questions)) return [];
    return questions.map((question) => ({
      category: key,
      categoryLabel: CATEGORY_LABELS[key] || key,
      question
    }));
  });
}

async function buildFeedback({ question, answer }) {
  const prompt = [
    "You are coaching a DevOps, Platform Engineering, and MLOps candidate for a technical interview.",
    "Give concise, practical feedback on the candidate's answer.",
    "Return exactly three short bullet points: what worked, what to improve, and a stronger phrasing cue.",
    "Do not invent candidate experience beyond the profile.",
    "",
    `Candidate summary: ${profile.summary}`,
    `Key skills: ${profile.preferredKeywords.join(", ")}`,
    "",
    `Interview question: ${question}`,
    `Candidate answer: ${answer}`
  ].join("\n");

  return askOllama(prompt, { temperature: 0.4, numPredict: 260 });
}

function saveTranscript(transcript) {
  const dataDir = path.join(ROOT, "data");
  fs.mkdirSync(dataDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = path.join(dataDir, `mock-interview-${timestamp}.json`);
  fs.writeFileSync(filePath, JSON.stringify(transcript, null, 2));
  return filePath;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const categories = profile.interviewQuestions || {};

  if (args.help) {
    printHelp();
    return;
  }

  if (args.list) {
    for (const [key, questions] of Object.entries(categories)) {
      console.log(`${key}: ${CATEGORY_LABELS[key] || key} (${questions.length} questions)`);
    }
    return;
  }

  if (args.category !== "all" && !categories[args.category]) {
    console.error(`Unknown category "${args.category}". Run with --list to see valid categories.`);
    process.exitCode = 1;
    return;
  }

  const questions = getQuestions(args.category).slice(0, args.limit || undefined);
  if (questions.length === 0) {
    console.error("No mock interview questions found in config/profile.json.");
    process.exitCode = 1;
    return;
  }

  const rl = readline.createInterface({ input, output });
  const transcript = {
    candidate: profile.fullName,
    startedAt: new Date().toISOString(),
    category: args.category,
    feedbackEnabled: args.feedback,
    responses: []
  };

  console.log(`\nMock interview for ${profile.fullName}`);
  console.log(`Questions: ${questions.length}`);
  console.log("Press Enter after each answer. Type /skip to skip or /quit to stop.\n");

  try {
    for (let i = 0; i < questions.length; i++) {
      const item = questions[i];
      console.log(`[${i + 1}/${questions.length}] ${item.categoryLabel}`);
      const answer = await rl.question(`${item.question}\n> `);

      if (answer.trim() === "/quit") break;
      if (answer.trim() === "/skip") {
        transcript.responses.push({ ...item, answer: "", skipped: true });
        console.log("");
        continue;
      }

      const response = { ...item, answer, skipped: false };

      if (args.feedback && answer.trim()) {
        try {
          response.feedback = await buildFeedback({ question: item.question, answer });
          console.log(`\n${response.feedback}\n`);
        } catch (error) {
          response.feedbackError = error.message;
          console.log("\nFeedback unavailable. Continuing with the next question.\n");
        }
      } else {
        console.log("");
      }

      transcript.responses.push(response);
    }
  } finally {
    rl.close();
  }

  transcript.finishedAt = new Date().toISOString();
  const filePath = saveTranscript(transcript);
  console.log(`Transcript saved: ${path.relative(ROOT, filePath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
