const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");

function loadDomains() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, "public", "interview-prep-data.js"), "utf8"), context);
  return context.window.INTERVIEW_PREP_DOMAINS;
}

function loadCurriculum() {
  return require(path.join(root, "public", "interview-prep-data.js"));
}

test("interview prep curriculum has unique topics across organized domains", () => {
  const domains = loadDomains();
  const topics = domains.flatMap((domain) => domain.topics);
  const normalized = topics.map((topic) => topic.toLowerCase());

  assert.equal(domains.length, 20);
  assert.ok(topics.length >= 220);
  assert.equal(new Set(normalized).size, topics.length);
});

test("interview prep includes representative skills from every major area", () => {
  const topics = new Set(loadDomains().flatMap((domain) => domain.topics));
  const required = [
    "Python", "SQL", "Data Structures and Algorithms (DSA)", "Statistics", "Pandas",
    "PyTorch", "Transformers", "OpenCV", "OpenAI API", "GPT-5",
    "Responses API", "Function Calling", "Structured Outputs", "Retrieval-Augmented Generation (RAG)", "Model Context Protocol (MCP)", "MLflow",
    "NVIDIA Triton Inference Server", "Kubernetes", "AWS", "GCP", "Azure",
    "Terraform", "Apache Kafka", "PostgreSQL", "OpenTelemetry", "System Design",
    "LLM Evaluation", "Shadow Deployment", "NVIDIA GPUs", "Multi-GPU Inference", "Stakeholder Management"
  ];

  assert.deepEqual(required.filter((topic) => !topics.has(topic)), []);
});

test("neural-network foundations are covered explicitly", () => {
  const topics = new Set(loadDomains().flatMap((domain) => domain.topics));
  const required = [
    "Neural Networks", "Artificial Neuron", "Perceptron", "Multilayer Perceptron (MLP)",
    "Forward Propagation", "Backpropagation", "Computational Graphs", "Activation Functions",
    "Loss Functions", "Gradient Descent", "Neural Network Optimizers", "Weight Initialization",
    "Batch Normalization", "Layer Normalization", "Dropout", "Neural Network Regularization",
    "Gradient Checking", "Vanishing and Exploding Gradients", "Neural Network Training Loops"
  ];
  assert.deepEqual(required.filter((topic) => !topics.has(topic)), []);
});

test("all primary pages link to interview prep and question bank accepts search links", () => {
  for (const filename of ["index.html", "dashboard.html", "session.html", "question-bank.html"]) {
    const html = fs.readFileSync(path.join(root, "public", filename), "utf8");
    assert.match(html, /href="\/interview-prep\.html"/);
  }
  const questionBankScript = fs.readFileSync(path.join(root, "public", "question-bank.js"), "utf8");
  assert.match(questionBankScript, /URLSearchParams\(window\.location\.search\)/);
  assert.match(questionBankScript, /applyFilter\(initialSearch\)/);
  assert.match(questionBankScript, /groupByCategory/);
  assert.match(questionBankScript, /data-category/);
  assert.match(fs.readFileSync(path.join(root, "public", "question-bank.html"), "utf8"), /Questions by category/);
});

test("web role map and Word document generator share the curriculum source", () => {
  const curriculum = loadCurriculum();
  const html = fs.readFileSync(path.join(root, "public", "interview-prep.html"), "utf8");
  const browserScript = fs.readFileSync(path.join(root, "public", "interview-prep.js"), "utf8");
  const documentBuilder = fs.readFileSync(path.join(root, "scripts", "build-interview-prep-document.py"), "utf8");
  const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

  assert.equal(curriculum.roleMatrix.length, 13);
  assert.match(html, /id="prepRoleMatrix"/);
  assert.match(browserScript, /INTERVIEW_PREP_ROLE_MATRIX/);
  assert.match(documentBuilder, /public.*interview-prep-data\.js/);
  assert.match(packageJson.scripts["sync:interview-prep"], /build-interview-prep-document\.py/);
});

test("Data Science path is separate and synchronized with the main curriculum", () => {
  const curriculum = loadCurriculum();
  const domainNames = new Set(curriculum.domains.map((domain) => domain.name));
  const pathDomainNames = curriculum.dataSciencePath.stages.flatMap((stage) => stage.domains);
  const page = fs.readFileSync(path.join(root, "public", "data-science-path.html"), "utf8");
  const script = fs.readFileSync(path.join(root, "public", "data-science-path.js"), "utf8");

  assert.equal(curriculum.dataSciencePath.stages.length, 5);
  assert.deepEqual(pathDomainNames.filter((name) => !domainNames.has(name)), []);
  assert.equal(new Set(pathDomainNames).size, pathDomainNames.length);
  assert.match(page, /Data Science Interview Path/);
  assert.match(script, /DATA_SCIENCE_PATH/);
});

test("Data Science scenario bank covers every path topic from beginner to expert", () => {
  const curriculum = loadCurriculum();
  const domainMap = new Map(curriculum.domains.map((domain) => [domain.name, domain]));
  const topics = new Set(curriculum.dataSciencePath.stages.flatMap((stage) => stage.domains).flatMap((name) => domainMap.get(name).topics));
  const bankPath = path.join(root, "scripts", "answer-bank", "90-data-science-scenario-beginner-to-expert.json");
  const bank = JSON.parse(fs.readFileSync(bankPath, "utf8"));
  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  assert.equal(bank.length, topics.size * levels.length);
  for (const topic of topics) {
    assert.deepEqual(bank.filter((entry) => entry.topic === topic).map((entry) => entry.difficulty), levels);
  }
  assert.ok(bank.every((entry) => entry.questionType === "Scenario" && entry.answer.length > 200));
});

test("AI Agent Engineer path and scenario bank cover the supplied job profile", () => {
  const curriculum = loadCurriculum();
  const topics = new Set(curriculum.aiAgentEngineerPath.stages.flatMap((stage) => stage.topics));
  const required = ["Python", "Strands Agents", "AWS AgentCore", "Model Context Protocol (MCP)", "Retrieval-Augmented Generation (RAG)", "SharePoint Integration", "SAP Integration", "Agent Guardrails", "Human-in-the-Loop (HITL)", "Docker", "GitHub Actions"];
  const bank = JSON.parse(fs.readFileSync(path.join(root, "scripts", "answer-bank", "91-ai-agent-engineer-scenario-beginner-to-expert.json"), "utf8"));

  assert.deepEqual(required.filter((topic) => !topics.has(topic)), []);
  assert.equal(bank.length, topics.size * 4);
  assert.ok(bank.every((entry) => entry.questionType === "Scenario" && entry.answer.length > 250));
  assert.match(fs.readFileSync(path.join(root, "public", "ai-agent-engineer-path.html"), "utf8"), /AI Agent Engineer Path/);
});
