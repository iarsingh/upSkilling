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

// Collapse harmless interview-prompt variations without merging detailed
// scenarios. For short definition/comparison prompts, token order is not
// meaningful ("GKE Standard and Autopilot" vs "Autopilot and Standard").
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

const TOPIC_RULES = [
  ["Kubernetes", ["kubernetes", "k8s", "gke", "eks", "helm", "ingress", "kubelet", "etcd", "coredns", "rbac"]],
  ["Docker & Containers", ["docker", "container", "containerd"]],
  ["Terraform / IaC", ["terraform", "iac", "infrastructure as code"]],
  ["GCP / Cloud", ["gcp", "cloud", "azure", "aws", "landing zone", "iam"]],
  ["Networking", ["network", "dns", "load balanc", "mtls", "hybrid networking"]],
  ["Observability", ["observability", "monitoring", "logging", "tracing", "datadog", "prometheus", "grafana", "opentelemetry", "elastic", "kibana"]],
  ["CI/CD & GitOps", ["ci/cd", "gitops", "jenkins", "argo"]],
  ["Security & Risk", ["security", "risk", "compliance", "audit", "governance", "sentinel", "devsecops"]],
  ["SRE & Incident Response", ["sre", "reliability", "incident", "outage", "troubleshoot"]],
  ["Ansible & Automation", ["ansible", "automation"]],
  ["Python", ["python"]],
  ["FastAPI / APIs", ["fastapi", "api"]],
  ["Linux", ["linux"]],
  ["DSA / Coding", ["dsa", "coding", "leetcode", "algorithm"]],
  ["System Design", ["system design", "architecture"]],
  ["MLOps / LLMOps / GenAI", ["mlops", "llmops", "genai", "llm ", "rag", "kubeflow", "mlflow", "machine learning", "prompt engineering"]],
  ["Databases", ["database", "postgres", "sql", "kafka"]],
  ["Behavioral / HR", ["behav", "hr", "leadership", "stakeholder", "experience"]]
];

function classifyTopic(entry) {
  const text = [entry.category, entry.section, entry.question].filter(Boolean).join(" ").toLowerCase();
  for (const [topic, keywords] of TOPIC_RULES) {
    if (keywords.some((keyword) => text.includes(keyword))) return topic;
  }
  return "General";
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

// Sets that read better grouped by topic (Part 2) than as another numbered
// practice round (Part 1) - map their title to the topic section name to file under.
const SECTION_TOPIC_OVERRIDES = {
  "Mock Interview 81 - Docker and Docker Compose Build Design": "Docker & Docker Compose (Build Design)",
  "Mock Interview 82 - Production DevOps Scenario Round (CI/CD, Kubernetes, Terraform, MLOps)": "Production DevOps Scenario Round (CI/CD, Kubernetes, Terraform, MLOps)",
  "Mock Interview 83 - Production Reliability and Observability Behavioral Round": "Behavioral - Reliability & Observability",
  "Mock Interview 84 - Fugmo Lead GCP DevOps Engineer Screening": "Behavioral - Screening Rounds",
  "Mock Interview 85 - GenAI and LLM Engineering Round": "GenAI & LLM Engineering",
  "Mock Interview 86 - Advanced GCP Networking Round": "GCP Networking - Advanced Concepts",
  "Mock Interview 87 - GCP Networking Scenario Round": "GCP Networking - Troubleshooting Scenarios",
  "Mock Interview 88 - Cloud Migration Strategy Round": "Cloud Migration Strategy"
};

function loadMockSets() {
  const sets = JSON.parse(fs.readFileSync(path.join(ROOT, "public", "mock-interview-sets.json"), "utf8"));
  const entries = [];
  for (const set of sets) {
    const section = SECTION_TOPIC_OVERRIDES[set.title] || set.title;
    for (const item of set.questions) {
      entries.push({ source: "Fixed Mock Interview Sets", section, category: item.category, question: item.question });
    }
  }
  return entries;
}

function loadCodingAnswerBank() {
  const p = path.join(__dirname, "answer-bank", "08-coding.json");
  const obj = JSON.parse(fs.readFileSync(p, "utf8"));
  const entries = [];
  for (const [question, answer] of Object.entries(obj)) {
    entries.push({ source: "Coding Answer Bank", section: "Coding Exercises", category: null, question, answer });
  }
  return entries;
}

function loadImportedConversationQuestions() {
  const p = path.join(__dirname, "answer-bank", "imported-conversation-questions.json");
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function loadGcpPrivateConnectivityQuestions() {
  const p = path.join(__dirname, "answer-bank", "87-gcp-psc-psa-policy-routing-questions.json");
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function loadGcpNetworkEngineerAdvancedQuestions() {
  const p = path.join(__dirname, "answer-bank", "88-gcp-network-engineer-jd-advanced.json");
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function loadLinuxComposerGkeInterviewQuestions() {
  const p = path.join(__dirname, "answer-bank", "89-linux-composer-gke-interview-round.json");
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, "utf8"));
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

function generatedAnswer(entry) {
  const category = entry.category || entry.section || "Technical";
  const question = entry.question;
  return [
    `A strong answer should directly address the ${category} angle of the question.`,
    "Start with the expected configuration, command, workflow, or troubleshooting principle.",
    "For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid.",
    `Use the prompt details as acceptance criteria: ${question}`
  ].join(" ");
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
const codingBank = loadCodingAnswerBank();
const importedConversationQuestions = loadImportedConversationQuestions();
const gcpPrivateConnectivityQuestions = loadGcpPrivateConnectivityQuestions();
const gcpNetworkEngineerAdvancedQuestions = loadGcpNetworkEngineerAdvancedQuestions();
const linuxComposerGkeInterviewQuestions = loadLinuxComposerGkeInterviewQuestions();

const allSources = [...mockSets, ...codingBank, ...appBanks, ...importedConversationQuestions, ...gcpPrivateConnectivityQuestions, ...gcpNetworkEngineerAdvancedQuestions, ...linuxComposerGkeInterviewQuestions, ...techQa, ...largeBank];

const seen = new Set();
const seenCanonical = new Set();
const finalEntries = [];
let generatedAnswers = 0;
let duplicatesRemoved = 0;
for (const e of allSources) {
  const key = normalizeQuestion(e.question);
  const canonicalKey = canonicalQuestionKey(e.question);
  if (!key || seen.has(key) || seenCanonical.has(canonicalKey)) {
    duplicatesRemoved++;
    continue;
  }
  seen.add(key);
  seenCanonical.add(canonicalKey);
  const answer = e.answer || answerByQuestion.get(key) || generatedAnswer(e);
  if (!answerByQuestion.has(key) && !e.answer) generatedAnswers++;
  finalEntries.push({
    source: e.source,
    section: e.section,
    category: e.category || null,
    topic: classifyTopic(e),
    questionType: e.questionType || classifyQuestionType(e.question),
    question: e.question,
    answer
  });
}

console.log(`Total unique questions with answers: ${finalEntries.length}`);
console.log(`Duplicate source questions removed: ${duplicatesRemoved}`);
console.log(`Generated answer guidance: ${generatedAnswers}`);

const outPath = path.join(__dirname, "answer-bank", "final-qa-dataset.json");
fs.writeFileSync(outPath, JSON.stringify(finalEntries, null, 2));
console.log("Wrote", path.relative(ROOT, outPath));

// Slim copy served to the browser: powers the in-app question bank reader
// and the "questions covered" stat. Excludes nothing sensitive - same data,
// just placed where the client can fetch it directly.
const publicPath = path.join(ROOT, "public", "qa-dataset.json");
fs.writeFileSync(publicPath, JSON.stringify(finalEntries));
console.log("Wrote", path.relative(ROOT, publicPath));
