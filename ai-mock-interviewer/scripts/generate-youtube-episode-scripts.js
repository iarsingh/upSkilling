const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SETS_PATH = path.join(ROOT, "public", "mock-interview-sets.json");
const DATASET_PATH = path.join(ROOT, "scripts", "answer-bank", "final-qa-dataset.json");
const OUT_DIR = path.join(ROOT, "youtube-mock-interview-series");
const INDEX_PATH = path.join(OUT_DIR, "README.md");
const MAX_QUESTIONS_PER_VIDEO = 12;
const MINUTES_PER_QUESTION = 2;
const ABBREVIATIONS = {
  AI: "Artificial Intelligence",
  API: "Application Programming Interface",
  BGP: "Border Gateway Protocol",
  CDN: "Content Delivery Network",
  CI: "Continuous Integration",
  "CI/CD": "Continuous Integration and Continuous Delivery/Deployment",
  CLI: "Command Line Interface",
  CNI: "Container Network Interface",
  CPU: "Central Processing Unit",
  CSP: "Content Security Policy",
  DB: "Database",
  DLP: "Data Loss Prevention",
  DNS: "Domain Name System",
  DR: "Disaster Recovery",
  EDM: "Enterprise Data Management",
  EKS: "Elastic Kubernetes Service",
  ELK: "Elasticsearch, Logstash, and Kibana",
  GCP: "Google Cloud Platform",
  GDPR: "General Data Protection Regulation",
  GenAI: "Generative Artificial Intelligence",
  GKE: "Google Kubernetes Engine",
  GPU: "Graphics Processing Unit",
  gRPC: "Google Remote Procedure Call",
  HA: "High Availability",
  HPA: "Horizontal Pod Autoscaler",
  HTTP: "Hypertext Transfer Protocol",
  HTTPS: "Hypertext Transfer Protocol Secure",
  IaC: "Infrastructure as Code",
  IAM: "Identity and Access Management",
  IDP: "Internal Developer Platform",
  IP: "Internet Protocol",
  JWT: "JSON Web Token",
  LB: "Load Balancer",
  LLM: "Large Language Model",
  LLMOps: "Large Language Model Operations",
  ML: "Machine Learning",
  MLOps: "Machine Learning Operations",
  mTLS: "Mutual Transport Layer Security",
  NAT: "Network Address Translation",
  OIDC: "OpenID Connect",
  OOM: "Out of Memory",
  OPA: "Open Policy Agent",
  PCI: "Payment Card Industry",
  "PCI DSS": "Payment Card Industry Data Security Standard",
  PDB: "Pod Disruption Budget",
  PII: "Personally Identifiable Information",
  PR: "Pull Request",
  RAG: "Retrieval-Augmented Generation",
  RBAC: "Role-Based Access Control",
  RCA: "Root Cause Analysis",
  REST: "Representational State Transfer",
  RTO: "Recovery Time Objective",
  RPO: "Recovery Point Objective",
  SDK: "Software Development Kit",
  SLA: "Service Level Agreement",
  SLI: "Service Level Indicator",
  SLO: "Service Level Objective",
  SOC: "System and Organization Controls",
  SRE: "Site Reliability Engineering",
  SSO: "Single Sign-On",
  SSL: "Secure Sockets Layer",
  TLS: "Transport Layer Security",
  TTL: "Time To Live",
  UI: "User Interface",
  VM: "Virtual Machine",
  VNet: "Virtual Network",
  VPC: "Virtual Private Cloud",
  VPN: "Virtual Private Network",
  WAF: "Web Application Firewall"
};

function normalizeQuestion(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/^[a-z0-9/ &+-]+:\s+/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function episodeNumber(set) {
  const match = set.id.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

function chunkQuestions(questions) {
  if (questions.length <= 14) return [questions];

  const partCount = Math.ceil(questions.length / MAX_QUESTIONS_PER_VIDEO);
  const baseSize = Math.floor(questions.length / partCount);
  let remainder = questions.length % partCount;
  const chunks = [];
  let cursor = 0;

  for (let i = 0; i < partCount; i += 1) {
    const size = baseSize + (remainder > 0 ? 1 : 0);
    chunks.push(questions.slice(cursor, cursor + size));
    cursor += size;
    remainder -= 1;
  }

  return chunks;
}

function durationLabel(questionCount) {
  const low = Math.max(10, questionCount * MINUTES_PER_QUESTION);
  const high = low + 5;
  return `${low}-${high} min`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function abbreviationRegex(term) {
  return new RegExp(`(^|[^A-Za-z0-9])${escapeRegExp(term)}([^A-Za-z0-9]|$)`);
}

function abbreviationsForEpisode(episode, answerByQuestion) {
  const textParts = [
    episode.title,
    episode.sourceTitle,
    episode.focus,
    ...episode.questions.flatMap((item) => [
      item.category,
      item.question,
      sampleAnswer(item.question, answerByQuestion)
    ])
  ];
  const text = textParts.join("\n");

  return Object.entries(ABBREVIATIONS)
    .filter(([term]) => abbreviationRegex(term).test(text))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([term, fullForm]) => ({ term, fullForm }));
}

function sampleAnswer(question, answerByQuestion) {
  const answer = answerByQuestion.get(normalizeQuestion(question));
  if (answer) return answer;
  return [
    "At a Senior Associate level, I would start with the direct concept, then connect it to a real production workflow.",
    "I would explain the implementation approach, the validation step, and the operational tradeoffs around security, reliability, rollback, observability, and cost.",
    `For this question, I would also include a practical example instead of giving only a definition: ${question}`
  ].join(" ");
}

function seniorAnswerFrame(category) {
  const c = String(category || "").toLowerCase();
  if (c.includes("security") || c.includes("iam") || c.includes("secret")) {
    return "Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.";
  }
  if (c.includes("kubernetes") || c.includes("gke") || c.includes("eks") || c.includes("helm")) {
    return "Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.";
  }
  if (c.includes("terraform") || c.includes("iac")) {
    return "Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.";
  }
  if (c.includes("observability") || c.includes("monitor") || c.includes("logging") || c.includes("trace")) {
    return "Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.";
  }
  if (c.includes("ci") || c.includes("cd") || c.includes("gitops") || c.includes("jenkins")) {
    return "Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.";
  }
  if (c.includes("network") || c.includes("vpc") || c.includes("dns") || c.includes("load")) {
    return "Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.";
  }
  if (c.includes("api") || c.includes("fastapi")) {
    return "Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.";
  }
  if (c.includes("ml") || c.includes("ai") || c.includes("llm") || c.includes("genai")) {
    return "Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.";
  }
  return "Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.";
}

function scenarioPrompt(item) {
  const category = String(item.category || "").toLowerCase();
  const question = item.question;
  if (category.includes("security") || category.includes("iam") || category.includes("secret")) {
    return `Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: ${question}`;
  }
  if (category.includes("kubernetes") || category.includes("gke") || category.includes("eks") || category.includes("helm")) {
    return `Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: ${question}`;
  }
  if (category.includes("terraform") || category.includes("iac")) {
    return `Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: ${question}`;
  }
  if (category.includes("observability") || category.includes("monitor") || category.includes("logging") || category.includes("trace")) {
    return `Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: ${question}`;
  }
  if (category.includes("ci") || category.includes("cd") || category.includes("gitops") || category.includes("jenkins")) {
    return `Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: ${question}`;
  }
  if (category.includes("network") || category.includes("vpc") || category.includes("dns") || category.includes("load")) {
    return `Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: ${question}`;
  }
  if (category.includes("api") || category.includes("fastapi")) {
    return `Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: ${question}`;
  }
  if (category.includes("ml") || category.includes("ai") || category.includes("llm") || category.includes("genai")) {
    return `Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: ${question}`;
  }
  return `Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: ${question}`;
}

function interviewerCheck(category) {
  const c = String(category || "").toLowerCase();
  if (c.includes("security") || c.includes("iam") || c.includes("secret")) {
    return "They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.";
  }
  if (c.includes("kubernetes") || c.includes("gke") || c.includes("eks") || c.includes("helm")) {
    return "They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.";
  }
  if (c.includes("terraform") || c.includes("iac")) {
    return "They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.";
  }
  if (c.includes("observability") || c.includes("monitor") || c.includes("logging") || c.includes("trace")) {
    return "They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.";
  }
  if (c.includes("ci") || c.includes("cd") || c.includes("gitops") || c.includes("jenkins")) {
    return "They are checking whether you can explain the full release path from commit to production with quality gates.";
  }
  if (c.includes("network") || c.includes("vpc") || c.includes("dns") || c.includes("load")) {
    return "They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.";
  }
  if (c.includes("ml") || c.includes("ai") || c.includes("llm")) {
    return "They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.";
  }
  if (c.includes("behavior") || c.includes("leadership")) {
    return "They are checking communication, ownership, judgment, and whether your examples sound real.";
  }
  return "They are checking whether your answer is structured, practical, and connected to real production work.";
}

function renderEpisode(episode, answerByQuestion) {
  const title = `Episode ${episode.number}: ${episode.title}`;
  const abbreviations = abbreviationsForEpisode(episode, answerByQuestion);
  const lines = [
    `# ${title}`,
    "",
    `YouTube title: DevOps Mock Interview Practice | ${title}`,
    "",
    `Estimated duration: ${durationLabel(episode.questions.length)}`,
    "",
    `Source round: ${episode.sourceTitle}`,
    "",
    `Focus: ${episode.focus}`,
    "",
    "## Opening",
    "",
    "Hi everyone, welcome back to the DevOps Mock Interview Practice series.",
    "",
    `In today's episode, we are practicing ${episode.title}.`,
    "I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.",
    "",
    "Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.",
    "",
    "For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.",
    ""
  ];

  if (abbreviations.length) {
    lines.push(
      "## Abbreviations / Full Forms",
      "",
      ...abbreviations.map(({ term, fullForm }) => `- ${term}: ${fullForm}`),
      ""
    );
  }

  episode.questions.forEach((item, index) => {
    lines.push(
      "---",
      "",
      `## Question ${index + 1}`,
      "",
      "Interviewer:",
      item.question,
      "",
      "Pause the video and answer this question aloud.",
      "",
      "Senior Associate answer:",
      sampleAnswer(item.question, answerByQuestion),
      "",
      "Senior answer structure:",
      seniorAnswerFrame(item.category),
      "",
      "Scenario-based practice:",
      scenarioPrompt(item),
      "",
      "What interviewer checks:",
      interviewerCheck(item.category),
      ""
    );
  });

  lines.push(
    "---",
    "",
    "## Closing",
    "",
    `That completes ${title}.`,
    "",
    "Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:",
    "",
    "1. Give the direct answer.",
    "2. Add a real production or client scenario.",
    "3. Explain tools, services, commands, or architecture decisions.",
    "4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.",
    "5. End with how you validated success or communicated ownership.",
    "",
    "In the next episode, continue with another mock interview round and keep practicing aloud."
  );

  return lines.join("\n") + "\n";
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const sets = JSON.parse(fs.readFileSync(SETS_PATH, "utf8"));
const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, "utf8"));
const answerByQuestion = new Map();
for (const entry of dataset) {
  const key = normalizeQuestion(entry.question);
  if (key && entry.answer && !answerByQuestion.has(key)) {
    answerByQuestion.set(key, entry.answer);
  }
}

const indexLines = [
  "# YouTube Mock Interview Series",
  "",
  "Use these scripts to record a mock-interview YouTube series. Each episode includes interviewer questions, Senior Associate answers, scenario-based practice prompts, and what the interviewer is checking.",
  "",
  "Video length strategy: each generated episode is kept around 20-30 minutes where possible. Large mock rounds are split into Part 1, Part 2, and so on, with a target of 8-12 questions per video.",
  "",
  "Suggested channel playlist name: DevOps Mock Interview Practice",
  "",
  "## Episodes",
  ""
];

let generatedEpisodeNumber = 1;
for (const set of sets) {
  const sourceNumber = episodeNumber(set);
  const shortTitle = set.title.replace(/^Mock Interview \d+\s*-\s*/, "");
  const chunks = chunkQuestions(set.questions);

  chunks.forEach((questions, chunkIndex) => {
    const episodeNumberLabel = String(generatedEpisodeNumber).padStart(3, "0");
    const partLabel = chunks.length > 1 ? ` - Part ${chunkIndex + 1}` : "";
    const title = `${shortTitle}${partLabel}`;
    const fileName = `episode-${episodeNumberLabel}-${slugify(title)}.md`;
    const episode = {
      number: generatedEpisodeNumber,
      title,
      sourceTitle: `${set.title} (source set ${sourceNumber})`,
      focus: set.focus,
      questions
    };

    fs.writeFileSync(path.join(OUT_DIR, fileName), renderEpisode(episode, answerByQuestion));
    indexLines.push(
      `- [Episode ${generatedEpisodeNumber}: ${title} (${questions.length} questions, ${durationLabel(questions.length)})](./${fileName})`
    );
    generatedEpisodeNumber += 1;
  });
}

fs.writeFileSync(INDEX_PATH, indexLines.join("\n") + "\n");

console.log(`Generated ${generatedEpisodeNumber - 1} episode scripts in ${path.relative(ROOT, OUT_DIR)}`);
