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

function placeholderAnswer(answer) {
  return /a strong answer should|use a truthful star answer|for this scenario, first confirm user impact|the practical answer is to state what changes|in an interview,? (?:i would|also) mention|so the answer sounds production-ready instead of theoretical|tailor (?:the|your) (?:response|answer)|answer (?:this|the question) (?:by|with)|you should (?:say|state|mention|explain|describe)|use the prompt details as acceptance criteria|start with the expected configuration, command, workflow|the direct answer is to define|i would explain the main mechanism/i.test(String(answer || ""));
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
      entries.push({ source: "Fixed Mock Interview Sets", section, category: item.category, question: item.question, answer: item.answer });
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

function loadActualInterviewQuestions() {
  const dir = path.join(__dirname, "answer-bank");
  const generatedAnswersPath = path.join(dir, "actual-interview-generated-answers.json");
  const generatedAnswers = fs.existsSync(generatedAnswersPath)
    ? JSON.parse(fs.readFileSync(generatedAnswersPath, "utf8"))
    : {};
  const files = fs.readdirSync(dir)
    .filter((file) => /^actual-interview-handbook-part\d+\.json$/.test(file) || file === "actual-interview-new-questions.json")
    .sort();
  const roundFiles = [
    ["actual-interview-landing-zone-gke-coding-round-2026-08-20.txt", "Actual Interview - Landing Zone, GKE and Coding Round - 2026-08-20"],
    ["actual-interview-kubernetes-elk-dynatrace-round-2026-08-20.txt", "Actual Interview - Kubernetes, ELK and Dynatrace Round - 2026-08-20"],
  ];
  const roundEntries = roundFiles.flatMap(([fileName, source]) => {
    let category = "General";
    const entries = [];
    const text = fs.readFileSync(path.join(ROOT, "data", fileName), "utf8");
    for (const rawLine of text.split(/\r?\n/)) {
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
  });
  return [...files.flatMap((file) => JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"))), ...roundEntries]
    .map((entry) => ({
      ...entry,
      source: entry.source || "Actual Interview Questions",
      answer: entry.answer || generatedAnswers[normalizeQuestion(entry.question)],
    }));
}

function loadReviewedGeneratedAnswers() {
  if (process.env.IGNORE_REVIEWED_ANSWERS === "1") return new Map();
  const reviewed = new Map();
  const finalPath = path.join(__dirname, "answer-bank", "final-qa-dataset.json");
  if (fs.existsSync(finalPath)) {
    const currentFinal = JSON.parse(fs.readFileSync(finalPath, "utf8"));
    for (const entry of currentFinal) {
      const key = normalizeQuestion(entry.question);
      if (key && entry.answer && !placeholderAnswer(entry.answer)) reviewed.set(key, entry.answer);
    }
  }
  const p = path.join(__dirname, "answer-bank", "bulk-generated-cache.json");
  if (!fs.existsSync(p)) return reviewed;
  const values = JSON.parse(fs.readFileSync(p, "utf8"));
  for (const [question, answer] of Object.entries(values)) {
    const key = normalizeQuestion(question);
    if (key && answer && !placeholderAnswer(answer) && !reviewed.has(key)) reviewed.set(key, answer);
  }
  return reviewed;
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

function loadDataScienceScenarioQuestions() {
  const p = path.join(__dirname, "answer-bank", "90-data-science-scenario-beginner-to-expert.json");
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function loadAiAgentEngineerScenarioQuestions() {
  const p = path.join(__dirname, "answer-bank", "91-ai-agent-engineer-scenario-beginner-to-expert.json");
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function loadHandWrittenAnswers() {
  const dir = path.join(__dirname, "answer-bank");
  const merged = new Map();
  const curatedFile = "93-curated-revision-answers.json";
  const curatedPath = path.join(dir, curatedFile);
  if (fs.existsSync(curatedPath)) {
    const curated = JSON.parse(fs.readFileSync(curatedPath, "utf8"));
    for (const [question, answer] of Object.entries(curated)) {
      const key = normalizeQuestion(question);
      if (key) merged.set(key, answer);
    }
  }
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".json") || ["needs-answer.json", "final-qa-dataset.json", "bulk-generated-cache.json", "90-data-science-scenario-beginner-to-expert.json", "91-ai-agent-engineer-scenario-beginner-to-expert.json", curatedFile].includes(file) || file.startsWith("actual-interview-")) continue;
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
  const lower = `${category} ${question}`.toLowerCase();
  const isTroubleshooting = /\b(troubleshoot|debug|investigate|fail|failing|error|pending|crash|down|slow|latency|timeout|exhaust|recover|restore|deleted|corrupt)\b/.test(lower);
  const isDifference = /\b(difference|compare|versus| vs |choose|prefer)\b/.test(lower);
  const isBehavioral = /\b(tell me about|handle disagreement|stakeholder|leadership|team member|management|communication|mentor|ownership|salary|notice period|relocate)\b/.test(lower);
  const subject = String(question || "")
    .replace(/^(what is|what are|explain|describe|define|how do you|how would you|why|when|where|which)\s+/i, "")
    .replace(/\?$/, "")
    .trim();

  // Practical architecture round imported in August 2026. These targeted
  // answers keep short follow-up questions useful when read independently.
  if (/tools and technologies.*currently working/.test(lower)) return "I would answer with the tools I use regularly and connect each one to real ownership: GCP services such as GKE, Compute Engine, IAM, VPC, Cloud Load Balancing, Cloud Logging and Monitoring; Terraform for infrastructure; Jenkins or Bitbucket Pipelines for CI/CD; Git, Docker, Kubernetes, Helm, Python, and shell scripting for delivery and automation. I would distinguish hands-on production use from limited exposure and mention the scale, environment, and one recent outcome so the interviewer can see depth rather than just a tool list.";
  if (/recently delivered.*end-to-end solution/.test(lower)) return "Yes. I would choose one recent solution that I can defend in detail—for example, provisioning and deploying an application platform on GCP through Terraform and CI/CD. I would summarize the business requirement, architecture, security and networking controls, automated build and deployment path, observability, validation, and production handover. I would also state the measurable result, such as reduced provisioning time or improved deployment reliability, while keeping the claim truthful and ready for technical follow-up questions.";
  if (/explain that end-to-end solution.*contribution/.test(lower)) return "I would structure the answer as requirement, design, implementation, release, and operations. For example, I clarified application and compliance needs, designed the GCP project and network integration, built versioned Terraform modules and isolated environment roots, implemented CI/CD with reviewed plans and approvals, configured IAM, secrets, logging, monitoring, and alerts, and supported testing and production rollout. I would clearly separate my personal contribution from the team's work, explain one difficult decision or incident, and close with validation, documentation, handover, and a measurable result.";
  if (/legacy environment|legacy gcp/.test(lower)) return "A legacy environment is an older estate that still supports business workloads but no longer follows the current platform standards. In GCP this may mean manually created projects and resources, inconsistent naming and labels, broad service-account keys or IAM roles, default networks, unmanaged VMs, outdated GKE versions, weak state ownership, console-driven changes, limited CI/CD, missing organization policies, and fragmented logging or monitoring. 'Legacy' does not simply mean old; it means the architecture or operating model creates maintainability, security, reliability, or upgrade constraints. I would first inventory dependencies and risks, then modernize incrementally with guardrails, IaC, testing, migration waves, and rollback plans.";
  if (/google cloud services.*organization level/.test(lower)) return "At organization level I commonly work with Resource Manager resources such as organizations, folders, and projects; Cloud Identity and IAM; Organization Policy; Shared VPC; Cloud DNS; Cloud Logging and Monitoring; Security Command Center; Cloud KMS; Secret Manager; billing, budgets, and quotas; and GKE for managed workloads. I would name only services I have genuinely operated, then explain my ownership—for example, enforcing folder-level policies, provisioning projects through a project factory, managing shared networking, and centralizing audit logs—rather than presenting a memorized product list.";
  if (/why is gke different.*on-premises kubernetes/.test(lower)) return "Kubernetes concepts remain the same, but GKE makes Google responsible for much of the control-plane availability, upgrades, patching, integration, and optional node management. It integrates natively with VPC networking, IAM and Workload Identity, load balancing, Cloud Logging/Monitoring, release channels, autoscaling, and managed security features. On premises, the platform team normally owns control-plane design, etcd backup, hardware capacity, networking, storage, upgrades, and failure recovery. GKE reduces that operational burden, although we still own workload security, policies, capacity choices, application reliability, and cost.";
  if (/autoscaling work in gke|cluster autoscaler work/.test(lower)) return "GKE has separate scaling layers. HPA changes Pod replica counts from CPU, memory, custom, or external metrics; VPA recommends or adjusts Pod requests; Cluster Autoscaler changes the number of nodes in an enabled node pool. When Pods remain unschedulable because their requests cannot fit, Cluster Autoscaler simulates scheduling and adds nodes within configured limits. It later removes underutilized nodes only when Pods can be moved safely. Correct resource requests are essential—autoscaling decisions are not based simply on a node's observed CPU percentage.";
  if (/increase the cpu.*node.*enough capacity/.test(lower)) return "If a Pod's CPU request is increased beyond the free allocatable CPU on existing nodes, the scheduler leaves the new or restarted Pod Pending with a `FailedScheduling` event; Kubernetes does not enlarge the VM in place. If Cluster Autoscaler is enabled and a permitted node pool has a machine shape that can fit the Pod, it adds a node. If no available node-pool shape can satisfy the request, or maximum size, quota, IP space, or regional capacity blocks growth, the Pod stays Pending and we must change the request or node-pool design.";
  if (/automatically increase the number of nodes|create new nodes.*without a node pool/.test(lower)) return "Enable GKE Cluster Autoscaler on the relevant node pool and set appropriate minimum and maximum node counts. Nodes in GKE belong to node pools; you do not create an unmanaged standalone node outside one. If the existing pools cannot fit a workload, Node Auto-Provisioning—implemented through GKE's broader autoscaling capabilities—can create and manage a suitable new node pool within configured resource limits. Cluster Autoscaler scales nodes inside existing pools; Node Auto-Provisioning can create new pools. In Autopilot, Google manages node provisioning automatically.";
  if (/tool or mechanism to create infrastructure|where do you run the terraform commands|where is your ci\/cd\/jenkins platform hosted/.test(lower)) return "I provision cloud infrastructure through Terraform executed by CI/CD, not from an engineer's laptop for normal production changes. Jenkins may run in a central platform project on GKE or VMs, while each job executes `terraform init`, validation, plan, and apply inside an ephemeral agent container with a pinned Terraform image. The agent checks out the live-infrastructure repository, assumes a least-privilege environment identity through workload federation or a service account, reads secrets from the CI credential store, and reaches the GCS backend and Google APIs over approved network paths. Local commands are limited to development and read-only troubleshooting.";
  if (/state file in gcs|remote backend|without terraform state locking|state locking.*problems/.test(lower)) return "A GCS backend gives the team a durable, centralized state instead of tying it to one laptop or CI workspace. It supports IAM-controlled access, encryption, object versioning and recovery, audit logs, and collaboration. State contains resource identifiers and can contain sensitive values, so the bucket has least-privilege access, retention/versioning, and no public access. Locking serializes state-changing operations: without it, concurrent plans or applies can read stale state and overwrite one another, causing lost updates, duplicate resources, drift, or corruption. Locking complements—but does not replace—one controlled apply pipeline per state.";
  if (/six environments|root directory of your terraform repository|reusable terraform modules and infrastructure\/environment|modules and live infrastructure.*same repository or separate/.test(lower)) return "For six environments I use a live-infrastructure repository with a thin root per environment or per environment/component, for example `environments/dev/network`, `environments/qa/network`, and `environments/prod/network`. Each root contains `backend.tf`, `providers.tf`, `versions.tf`, `main.tf`, `variables.tf`, `outputs.tf`, and environment values, and has its own GCS state prefix or preferably its own controlled backend boundary. Reusable modules live in a separate repository or private registry, are tested and released with immutable semantic-version tags, and live roots pin a version. This separates module development from environment rollout, prevents an unreviewed module edit from changing every environment, and supports staged promotion and stronger production approvals. A monorepo can work for a small team, but ownership, access, and lifecycle must genuinely match.";
  if (/day-to-day activities|receive an infrastructure requirement|design, structure, manage, and deploy/.test(lower)) return "I start by clarifying scope, non-functional requirements, ownership, budget, security, networking, and acceptance criteria. I produce a small design, review it with application, platform, security, and network owners, implement reusable Terraform, and raise a pull request. CI runs formatting, validation, security checks, and a reviewed plan; approved changes are promoted by environment. After apply, I validate health, monitoring, access, cost labels, documentation, and rollback readiness, then hand over the runbook.";
  if (/load balancer.*structure|existing repository or create a new repository|plan the deployment of that infrastructure/.test(lower)) return "I keep the root configuration thin: provider/backend configuration, environment inputs, and a call to a versioned load-balancer module. The module owns forwarding rules, proxies, certificates, URL maps, backend services, health checks, firewall requirements, outputs, and validations. I use the existing product repository when lifecycle and ownership match; otherwise I create a separate repository. Deployment proceeds through reviewed plans from lower environments to production with approvals, health checks, and a tested rollback.";
  if (/shared terraform module|store your shared terraform modules|consume a shared terraform module/.test(lower)) return "A shared module exposes a documented input/output contract and creates a reusable resource pattern without owning environment-specific values. I store modules in a dedicated private Git repository or private module registry, tag immutable semantic versions, and consume them with a pinned `source` and `ref`, for example a Git SSH URL ending in `?ref=v2.3.1`. CI authenticates before `terraform init`; upgrades are explicit pull requests with plan and compatibility testing.";
  if (/multiple environments|different values for dev|separate terraform state files|separate pipelines for each environment|single pipeline.*environment|folder has changed|only the qa folder|shared terraform module changes|which environments need to run/.test(lower)) return "Each environment has its own root module or configuration folder, variable file, backend key, and isolated state; production must never share state with Dev or QA. One parameterized pipeline can map the changed path or an explicit deployment parameter to an environment, calculate changes with `git diff`, and run only that root. A shared-module change triggers the module's own tests plus plans in every known consumer; dependency metadata or a consumer manifest is safer than guessing from folder changes. Production still requires approval and a pinned module release.";
  if (/project\/product creation|create a new gcp project|repository bootstrap.*actual gcp project|dedicated gcp project|dedicated project|new gcp project creation|process initiates creation/.test(lower)) return "A repository bootstrap creates code and pipeline scaffolding; the project factory actually calls the Resource Manager API to create the GCP project under the approved folder, attach billing, enable APIs, configure networking, IAM, labels, logging, budgets, and organization policies. A catalog/service request normally initiates it with owner, cost center, data classification, environments, connectivity, and approvals. A dedicated project gives an application an IAM, quota, billing, policy, and blast-radius boundary. Provisioning should be an auditable service-request workflow, with a governed change for production-impacting follow-on resources.";
  if (/identity.*automated gcp project|permissions.*create a gcp project|minimum permission.*create a project|role provides project creation|associate.*billing account|project-creation service account exist/.test(lower)) return "Automation uses a centrally hosted service account or workload identity in a bootstrap/platform project, not an identity inside the project that does not yet exist. `resourcemanager.projects.create` is the core create permission and is included in `roles/resourcemanager.projectCreator`, granted at the target organization or folder. Attaching billing additionally needs `billing.resourceAssociations.create`, commonly via `roles/billing.user`, on the billing account. The identity also needs only the separate folder, API, IAM, networking, and policy permissions required by the factory.";
  if (/event-driven|pub\/sub, eventarc/.test(lower)) return "A producer emits an event rather than calling the consumer synchronously. For example, a Cloud Storage object-finalized event is routed by Eventarc to Cloud Run; the service validates the event, performs idempotent processing, stores results, and publishes a completion message to Pub/Sub. I configure least-privilege service accounts, dead-letter handling, bounded retries, correlation IDs, structured logs, metrics, and alerts. Pub/Sub is preferable when buffering, fan-out, replay, or decoupled subscriptions are required.";
  if (/cloud function|function infrastructure|python\/node\.js|application artifact\/version|terraform deploy every application/.test(lower)) return "The platform team should own reusable infrastructure guardrails while the application team owns runtime code and releases. Terraform creates the function's service account, IAM, trigger, networking, secrets access, bucket/repository, and function resource; the app pipeline tests and packages source, uploads an immutable object or image, and deploys that exact version. The repositories may be separate when ownership and release cadence differ. Terraform receives an artifact URI plus generation/digest for initial provisioning or infrastructure changes, but normal code releases should not require a Terraform apply.";
  if (/organization polic|custom constraint|\bcel\b|yaml, hcl, and cel|policy-as-code|security engineer.*policy/.test(lower)) return "Security or governance defines the control, scope, exceptions, and test cases; the platform team implements it as policy as code. One example is a policy restricting resource locations to approved regions to satisfy residency requirements. A custom constraint can be declared in YAML or JSON, while Terraform expresses the same resources in HCL; its resource-matching condition is written in CEL, the Common Expression Language. CI validates and tests the constraint, produces a plan, deploys first in dry-run or a test folder where supported, then promotes with approvals, audit logs, and a rollback or exception process.";
  if (/application logs|logs stored|logs from gke|generate alerts based on logs|only gcp|cloud logging|cloud monitoring|types of alerts|metric-threshold|metric-absence|log-based alert|log-based metric|uptime-check|burn-rate/.test(lower)) return "Applications write structured logs to stdout/stderr; GKE's logging agents collect them into Cloud Logging, where log buckets, views, exclusions, retention, and sinks control storage and routing. Cloud Monitoring consumes metrics and manages dashboards, SLOs, alert policies, and notification channels. Threshold alerts evaluate a metric value, absence alerts detect missing telemetry, log-match alerts fire on individual matching entries, and log-based metrics turn matches into a time series for aggregation and thresholds. Uptime checks test reachability; multi-window burn-rate alerts detect unsustainable SLO error-budget consumption.";
  if (/query\/report is running for too long|long-running quer|log search\/filter|log-based metric from those logs|alerting policy from that metric|threshold and duration|email notification|customized email/.test(lower)) return "First make the database or reporting service emit structured fields such as query ID, report name, status, start time, and duration, taking care not to log SQL text or sensitive parameters. Build and test a Cloud Logging filter, create a counter or distribution log-based metric, then alert in Cloud Monitoring when duration or count crosses the agreed threshold for the required retest window. Attach an email notification channel. For a customized message, route the matching log through a sink or Pub/Sub to Cloud Run/Functions, enrich it, deduplicate it, and send a templated email through an approved mail service.";
  if (/application deployment pipeline|stages\/steps|pipeline stages execute scripts|shell\/python\/powershell|terraform infrastructure pipeline|after an application deployment|post-deployment validation/.test(lower)) return "A typical application flow is checkout, dependency and secret scanning, unit tests, build, artifact signing/publishing, deployment to a lower environment, integration tests, approval, production rollout, smoke tests, and rollback verification. Scripts run inside explicit jobs for validation, packaging, migrations, deployment, and health checks and must use strict error handling, timeouts, and clear exit codes. Terraform CI runs fmt, validate, lint/security checks, init, and plan; CD applies the saved reviewed plan. Post-deployment checks cover health, version, logs, metrics, synthetic tests, and critical business transactions.";
  if (/notify users when a pipeline|email notifications from jenkins|email extension plugin|\bemailext\b|smtp configuration/.test(lower)) return "Jenkins can send outcome-specific mail with the Email Extension plugin's `emailext` Pipeline step. The controller's global configuration defines the approved SMTP host, port, TLS mode, credentials, and default sender; credentials stay in Jenkins Credentials, not the Jenkinsfile. A `post { success { ... } failure { ... } }` block selects recipients and includes build URL, job, branch, commit, status, and a short log summary. I also use chat or incident integrations for urgent failures and suppress duplicate noise.";
  if (/jenkins.*bitbucket|two different tools|standardize everything|additional cost|operational overhead|consolidating|from scratch.*two tools/.test(lower)) return "Using two tools is defensible only when existing capabilities, ownership, network reach, or migration risk outweigh the duplicated cost. Jenkins may already provide on-prem connectivity and mature shared libraries, while Bitbucket Pipelines gives repository-native infrastructure workflows. The overhead includes two runner fleets, credentials, plugins, templates, audit models, patching processes, observability stacks, and skill sets. I would measure total cost, reliability, lead time, control coverage, and migration effort with a pilot. From scratch I would normally choose one platform unless a documented isolation or connectivity requirement justified two.";
  if (/jenkins agents|agent.*gke|communicate with an on-prem|network path.*jenkins|vpn or interconnect|gke activate|vpn configured inside gke|vpc know the route|cloud router|\bbgp\b|source ip.*pod|return traffic.*jenkins pod/.test(lower)) return "Jenkins uses ephemeral agent pods created from Kubernetes pod templates in GKE. The pod sends traffic through the cluster's VPC-native data plane; VPC routes send on-prem prefixes to HA VPN or Cloud Interconnect. Cloud Router exchanges those prefixes dynamically with the on-prem router using BGP—VPN is not configured or activated inside GKE. On-prem may see the Pod IP when that range is routed, or a node/NAT address when IP masquerading or SNAT applies. The return route must advertise the observed source range back through the hybrid link, with firewalls allowing both directions.";
  if (/bitbucket pipeline templates|bitbucket use yaml|bitbucket-pipelines\.yml|reusable bitbucket|reusable steps|store your bitbucket pipeline|child repositories consume|connect to the shared bitbucket|version shared pipeline/.test(lower)) return "Bitbucket Pipelines is defined in `bitbucket-pipelines.yml`. Within a repository, YAML anchors and aliases can reuse steps. Cross-repository reuse depends on the Bitbucket edition/features in use; where shared pipeline configurations are supported, a child imports an exported pipeline from an authorized shared repository and pins a tag or commit. Otherwise a versioned template generator or centrally maintained pipe is safer than copying YAML manually. Access is granted explicitly, changes are tested, semantic versions are immutable, and consumers upgrade by pull request.";
  if (/private.*terraform module|terraform init.*private|authentication.*module repository|ssh or https|ssh private key\/access token|pipeline.*authentication|credential passed directly|secured bitbucket variables|before terraform init|gcp service account.*bitbucket|git repository authentication and gcp authentication|shell, powershell, or python|doesn.t have permission.*module/.test(lower)) return "`terraform init` asks Git to download the private module, so repository authentication must be configured before init. Prefer a read-only deploy key over SSH or a scoped app password/access token over HTTPS; store it as a masked secured CI variable or credential, materialize it only for the job, configure `known_hosts` or a credential helper, and never place the secret directly in YAML or a module URL. Git credentials authorize Bitbucket, while workload identity or a GCP service account authorizes Google APIs. Shell, PowerShell, or Python can perform setup. Missing access makes init fail before planning.";
  if (/certificate-expiry|certificate expiration|retrieve.*expiry|certificate validity|openssl|notbefore|notafter|expires within|certificate-monitoring script triggered|last day of every month|certificate manager|event-driven\/native|month-end|monthly certificate|monitoring frequency|30, 15, 7, and 1|custom openssl/.test(lower)) return "The script discovers configured endpoints or certificate files and reads the certificate itself; expiry is not manually supplied. `openssl s_client -connect host:443 -servername host </dev/null 2>/dev/null | openssl x509 -noout -dates` returns `notBefore` and `notAfter`, and `openssl x509 -checkend 2592000` tests 30 days. Monthly execution is unsafe because a certificate can expire just after the run; check daily and alert at 30, 15, 7, and 1 days. Prefer Certificate Manager metrics/events and managed renewal. Use custom OpenSSL checks for external, legacy, file-based, or end-to-end certificates that native inventory cannot observe.";
  const prefix = isDifference
    ? `${subject || "These options"} should be compared by purpose, scope, operational impact, rollback behavior, and production risk.`
    : isTroubleshooting
      ? "For this scenario, first confirm user impact, recent changes, and the failing layer; then isolate the issue with evidence before changing production."
      : isBehavioral
        ? "Use a truthful STAR answer: describe the situation, your ownership, the action you took, and the measurable result without inventing facts."
        : `${subject || question} is handled by understanding the production mechanism, the configuration involved, and the operational risk it controls.`;

  let example = "For validation, I would check logs, metrics, configuration, access permissions, and the post-change health signal before calling the issue closed.";
  if (/terraform|iac|state|module|provider|tfvars/.test(lower)) example = "Example commands: `terraform fmt`, `terraform validate`, `terraform plan`, then apply only after reviewing drift, state, provider versions, variables, and backend locking.";
  else if (/kubernetes|gke|eks|pod|deployment|service|ingress|helm|istio/.test(lower)) example = "Example checks: `kubectl describe`, `kubectl get events`, `kubectl logs`, readiness probes, Service selectors, Ingress or Gateway routing, NetworkPolicy, DNS, and node capacity.";
  else if (/jenkins|github actions|gitlab|bitbucket|pipeline|ci\/cd|argo|gitops/.test(lower)) example = "In CI/CD I would verify the trigger, checked-out commit, credentials, runner or agent, artifact version, environment approval, deployment logs, health checks, and rollback path.";
  else if (/gcp|cloud armor|load balanc|iam|vpc|firewall|nat|dns|private service connect|psc/.test(lower)) example = "In GCP I would validate IAM, project and region scope, VPC routing, firewall rules, health checks, Cloud Logging, audit logs, quotas, and the exact resource policy.";
  else if (/prometheus|grafana|monitor|logging|tracing|observability|slo|sli|alert/.test(lower)) example = "For observability, I would define the user-impact metric, use labels carefully, check percentiles and error rates, connect alerts to runbooks, and avoid noisy or high-cardinality signals.";
  else if (/mlops|vertex|mlflow|kubeflow|model|llm|rag|vector/.test(lower)) example = "For MLOps, I would version code, data, parameters, artifacts, and model registry entries, then monitor latency, errors, drift, quality, cost, and rollback readiness.";
  else if (/git|branch|merge|rebase|reset|revert|cherry-pick/.test(lower)) example = "For Git, I would state whether the command rewrites history, affects shared branches, or creates a new commit, then verify with `git status`, `git log --oneline`, and `git reflog` if recovery is needed.";
  else if (/python|bash|shell|script|api/.test(lower)) example = "For scripting or APIs, I would use input validation, clear exit codes, retries with backoff, timeouts, structured logs, idempotency, and tests for failure cases.";

  if (/apply a stash/i.test(question)) return "Use `git stash apply` to reapply the latest stash while keeping the stash entry, or `git stash apply stash@{n}` for a specific one. First run `git stash list`, confirm the target, then apply it from a clean working tree if possible. Resolve conflicts like a normal merge, run tests, and use `git status` to verify the result. Use `git stash pop` only when you want Git to remove the stash after a successful apply.";
  if (/terraform drift/i.test(question)) return "Terraform drift means the real infrastructure no longer matches the Terraform state and code, usually because someone changed a resource manually, an external controller modified it, or a provider default changed. I detect it with `terraform plan` in a read-only review pipeline and by checking cloud audit logs for manual updates. To fix it, either update the code to match the intended change or revert the cloud resource back to code. The risk is blindly applying and accidentally deleting or replacing production resources.";

  return `${prefix} In ${category}, the practical answer is to state what changes, who or what is affected, and how it is verified. ${example} In an interview, also mention the key failure mode, the security or reliability trade-off, and the rollback or recovery step so the answer sounds production-ready instead of theoretical.`;
}

// Build the answer lookup, with curated revisions taking precedence over older banks.
const largeBank = parseLargeBank();
const techQa = parseTechQa();
const handWritten = loadHandWrittenAnswers();

const answerByQuestion = new Map();
for (const e of [...largeBank, ...techQa]) {
  const key = normalizeQuestion(e.question);
  if (key && e.answer && !answerByQuestion.has(key)) answerByQuestion.set(key, e.answer);
}
for (const [key, answer] of handWritten) {
  answerByQuestion.set(key, answer);
}

// Source priority: mock sets first (curated rounds), then the app question banks
// (the primary practice pool), then large bank / tech-risk txt as supplementary depth.
const mockSets = loadMockSets();
const appBanks = loadAppBanks();
const codingBank = loadCodingAnswerBank();
const importedConversationQuestions = loadImportedConversationQuestions();
const actualInterviewQuestions = loadActualInterviewQuestions();
const gcpPrivateConnectivityQuestions = loadGcpPrivateConnectivityQuestions();
const gcpNetworkEngineerAdvancedQuestions = loadGcpNetworkEngineerAdvancedQuestions();
const linuxComposerGkeInterviewQuestions = loadLinuxComposerGkeInterviewQuestions();
const dataScienceScenarioQuestions = loadDataScienceScenarioQuestions();
const aiAgentEngineerScenarioQuestions = loadAiAgentEngineerScenarioQuestions();
const reviewedGeneratedAnswers = loadReviewedGeneratedAnswers();

const allSources = [...mockSets, ...codingBank, ...appBanks, ...dataScienceScenarioQuestions, ...aiAgentEngineerScenarioQuestions, ...actualInterviewQuestions, ...importedConversationQuestions, ...gcpPrivateConnectivityQuestions, ...gcpNetworkEngineerAdvancedQuestions, ...linuxComposerGkeInterviewQuestions, ...techQa, ...largeBank];

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
  const directAnswer = placeholderAnswer(e.answer) ? "" : e.answer;
  const bankAnswer = placeholderAnswer(answerByQuestion.get(key)) ? "" : answerByQuestion.get(key);
  const reviewedAnswer = placeholderAnswer(reviewedGeneratedAnswers.get(key)) ? "" : reviewedGeneratedAnswers.get(key);
  const answer = directAnswer || bankAnswer || reviewedAnswer || generatedAnswer(e);
  if (!answerByQuestion.has(key) && !e.answer) generatedAnswers++;
  finalEntries.push({
    source: e.source,
    section: e.section,
    category: e.category || e.section || classifyTopic(e),
    topic: e.topic || classifyTopic(e),
    difficulty: e.difficulty || null,
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
