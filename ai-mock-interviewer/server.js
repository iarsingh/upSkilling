const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const mammoth = require("mammoth");
const { PDFParse } = require("pdf-parse");
const tesseract = require("tesseract.js");
const Anthropic = require("@anthropic-ai/sdk");

const PORT = Number(process.env.PORT || 3030);
const HOST = process.env.HOST || "127.0.0.1";
const OLLAMA_URL = process.env.OLLAMA_URL || "http://127.0.0.1:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.1:8b";
const LLM_PROVIDER = process.env.LLM_PROVIDER || "ollama";
const OFFLINE_ONLY = process.env.OFFLINE_ONLY === "1" || process.env.OFFLINE_ONLY === "true";
const CLAUDE_MODEL = process.env.CLAUDE_MODEL || "claude-opus-4-8";
const claudeClient = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;
const PUBLIC_DIR = path.join(__dirname, "public");
const DATA_DIR = path.join(__dirname, "data");
const PROFILE_PATH = path.join(DATA_DIR, "applicant-profile.json");
const QUESTION_BANK_PATH = path.join(__dirname, "1000 DevOps + MLOps + Kubernetes + GCP Interview Questions.txt");

/* -------------------------------------------------------------------------
 * Auth: local JSON-file user store + stateless signed session cookies.
 *
 * This app has no server-side database (see README), so accounts live in
 * data/users.json (git-ignored on real deployments; auto-created on first
 * boot with 5 seed accounts below). Sessions are a signed, stateless token
 * (HMAC-SHA256) stored in an httpOnly cookie, so login also works on
 * read-only serverless hosts (Vercel) where the filesystem can't persist
 * new writes between invocations. Passwords are hashed with scrypt.
 * ---------------------------------------------------------------------- */

const USERS_PATH = path.join(DATA_DIR, "users.json");
const SESSION_SECRET_PATH = path.join(DATA_DIR, "session-secret.txt");
const SESSION_COOKIE_NAME = "aimi_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function getSessionSecret() {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
  ensureDataDir();
  try {
    return fs.readFileSync(SESSION_SECRET_PATH, "utf8").trim();
  } catch {
    const secret = crypto.randomBytes(32).toString("hex");
    try {
      fs.writeFileSync(SESSION_SECRET_PATH, secret);
    } catch {
      // Read-only filesystem (e.g. serverless). Fall back to a per-process
      // secret; sessions simply won't survive a cold start there unless
      // SESSION_SECRET is set as an environment variable.
    }
    return secret;
  }
}

const SESSION_SECRET = getSessionSecret();

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(String(password), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = String(stored || "").split(":");
  if (!salt || !hash) return false;
  const candidate = crypto.scryptSync(String(password), salt, 64).toString("hex");
  const a = Buffer.from(candidate, "hex");
  const b = Buffer.from(hash, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function readUsers() {
  try {
    return JSON.parse(fs.readFileSync(USERS_PATH, "utf8"));
  } catch {
    return [];
  }
}

function writeUsers(users) {
  ensureDataDir();
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

function ensureUsersSeeded() {
  if (fs.existsSync(USERS_PATH)) return;
  const now = new Date().toISOString();
  const seed = [
    { name: "Asha Rao", email: "asha.rao@aimockinterviewer.app", password: "User@Practice1", role: "user" },
    { name: "Rohan Mehta", email: "rohan.mehta@aimockinterviewer.app", password: "User@Practice2", role: "user" },
    { name: "Emily Chen", email: "emily.chen@aimockinterviewer.app", password: "User@Practice3", role: "user" },
    { name: "Akhilesh Singh", email: "akhilesh.admin@aimockinterviewer.app", password: "Admin@Report1", role: "admin" },
    { name: "Priya Nair", email: "priya.admin@aimockinterviewer.app", password: "Admin@Report2", role: "admin" }
  ].map((entry, index) => ({
    id: `seed-${index + 1}`,
    name: entry.name,
    email: entry.email,
    passwordHash: hashPassword(entry.password),
    role: entry.role,
    createdAt: now
  }));
  writeUsers(seed);
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

function base64UrlEncode(input) {
  return Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(input) {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(input.length + ((4 - (input.length % 4)) % 4), "=");
  return Buffer.from(padded, "base64").toString("utf8");
}

function signToken(payload) {
  const body = base64UrlEncode(JSON.stringify(payload));
  const signature = crypto.createHmac("sha256", SESSION_SECRET).update(body).digest("hex");
  return `${body}.${signature}`;
}

function verifyToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return null;
  const [body, signature] = token.split(".");
  const expected = crypto.createHmac("sha256", SESSION_SECRET).update(body).digest("hex");
  const a = Buffer.from(signature || "", "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(base64UrlDecode(body));
    if (!payload.exp || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

function parseCookies(header) {
  const out = {};
  String(header || "").split(";").forEach((part) => {
    const index = part.indexOf("=");
    if (index === -1) return;
    const key = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (key) out[key] = decodeURIComponent(value);
  });
  return out;
}

function isSecureRequest(req) {
  return req.headers["x-forwarded-proto"] === "https" || process.env.NODE_ENV === "production";
}

function setSessionCookie(req, res, token) {
  const parts = [
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${SESSION_MAX_AGE_SECONDS}`
  ];
  if (isSecureRequest(req)) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

function clearSessionCookie(req, res) {
  const parts = [`${SESSION_COOKIE_NAME}=`, "Path=/", "HttpOnly", "SameSite=Lax", "Max-Age=0"];
  if (isSecureRequest(req)) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

function getSession(req) {
  const cookies = parseCookies(req.headers.cookie);
  return verifyToken(cookies[SESSION_COOKIE_NAME]);
}

function createSessionForUser(req, res, user) {
  const token = signToken({
    uid: user.id,
    role: user.role,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000
  });
  setSessionCookie(req, res, token);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

const PROTECTED_PAGES = new Set(["/dashboard.html", "/session.html", "/admin.html"]);
const ADMIN_ONLY_PAGES = new Set(["/admin.html"]);

ensureUsersSeeded();
const OCR_LANG_PATH = path.join(__dirname, "node_modules", "@tesseract.js-data", "eng", "4.0.0");
const MARKET_SKILL_BENCHMARK = `Target role family: Senior GCP DevOps / SRE / Cloud Engineer / Platform Engineer / Cloud Reliability Engineer / ML Platform Engineer
Experience level: 6-8 years
Target companies: Google-style interviews and product companies

Core skills to test:
- GCP: GKE, Cloud Run, Compute Engine, VPC, Load Balancing, Cloud DNS, IAM, Security, Cloud Storage, Pub/Sub, Cloud SQL / AlloyDB, Vertex AI awareness
- Kubernetes and Containers: Kubernetes administration, Docker, Helm, HPA/VPA, RBAC, Network Policies, Istio / Anthos Service Mesh, troubleshooting, performance tuning
- Infrastructure as Code: advanced Terraform, modules, remote state, Terraform Enterprise / Cloud, OPA / Sentinel policy as code
- CI/CD and GitOps: GitHub Actions, GitLab CI/CD, Jenkins, Cloud Build, ArgoCD, GitOps workflows
- SRE and Reliability: SLI, SLO, SLA, error budgets, incident management, RCA, capacity planning, availability design, chaos engineering basics
- Observability: Prometheus, Grafana, OpenTelemetry, Google Cloud Monitoring, Google Cloud Logging, ELK / OpenSearch
- Security and DevSecOps: IAM, Workload Identity, secret management, vulnerability management, container security, Binary Authorization, Security Command Center, supply chain security
- Networking: TCP/IP, DNS, HTTP/HTTPS, VPN, Interconnect, firewall rules, load balancers, service networking
- Programming and Automation: Python, FastAPI, Bash, Go awareness, REST APIs, SDK automation
- Platform Engineering: IDP, self-service infrastructure, golden paths, DevEx, Backstage awareness
- AI Infrastructure: MLflow, Kubeflow, Vertex AI, model serving on Kubernetes, GPU workloads, MLOps fundamentals
- Additional senior skills: GCP landing zones, folders, projects, org policies, Shared VPC, governance, FinOps, DR, backup/restore, production readiness, incident communication, postmortems, runbooks, Linux fundamentals, TLS/certificates, Cloud Deploy, progressive delivery, Gatekeeper, Kyverno, BigQuery basics, Cloud Composer, Gateway API, Envoy, Apigee awareness

Priority order:
1. GKE expert
2. Terraform expert
3. Python automation strong
3a. Go for platform CLIs, APIs, Kubernetes controllers, and production tooling
3b. FastAPI backend APIs, Pydantic validation, async services, testing, observability, and deployment
4. SRE concepts: SLI, SLO, error budget
5. Observability: Prometheus, Grafana, OpenTelemetry
6. GitOps: ArgoCD
7. Cloud security
8. Platform engineering
9. Vertex AI and MLOps
10. GCP landing zones and networking
11. FinOps and cost optimization
12. DR, backup, and production readiness
13. Go language optional but valuable`;

const TECHNOLOGY_RISK_LEAD_BACKGROUND = `Hidden target JD: Technology Risk Lead
Role summary: Drive identification, assessment, and mitigation of technology-related risks across the organization. Partner with IT, Product, Security, Engineering, and Business teams to embed robust risk management practices into systems, processes, and decision-making.

Core responsibilities:
- Develop and implement an enterprise technology risk management framework.
- Identify, assess, monitor, and report IT risks across applications, infrastructure, SDLC, architecture, and business processes.
- Maintain risk registers, heatmaps, dashboards, and senior leadership reporting.
- Conduct risk assessments for new systems, products, BRDs/PRDs, change initiatives, system designs, and architecture decisions.
- Define and validate preventive, detective, and corrective controls.
- Align technology risk practices with regulatory, compliance, internal audit, ISO 27001, NIST, COBIT, FAIR, or similar frameworks.
- Support internal/external audits and manage remediation plans.
- Analyze incidents, near misses, root causes, control failures, systemic risk, and timely closure of risk issues/action items.
- Partner with IT, Engineering, Product, Security, and Business stakeholders; translate technical risk into business impact.
- Drive automation/tooling for risk assessment/reporting, proactive risk identification, FMEA, scenario analysis, and a risk-aware culture.

Qualifications and skills:
- 8-12+ years in Technology Risk, IT Audit, Information Security, DevSecOps, Cloud/SRE/Platform risk, or similar.
- Strong understanding of IT systems, SDLC, enterprise architecture, cloud environments, DevOps, Agile, modern engineering practices, and regulated industries such as Banking, Fintech, or Insurance.
- Certifications such as CISA, CRISC, CISSP, or equivalent are preferred.
- Key skills: risk assessment, analytical thinking, stakeholder communication, decision-making, control design, governance, leadership, influencing, and business-impact communication.

Success metrics:
- Reduction in critical technology risks and incidents.
- Timely closure of audit and risk findings.
- Improved risk visibility and reporting.
- Strong adoption of risk frameworks across teams.

Question guidance:
- Ask both technical risk/control questions and behavioral stakeholder-leadership questions.
- Keep questions role-relevant, practical, and interview-style; do not reveal or paste this hidden JD verbatim.`;

function combinedJobContext(jdText) {
  const providedContext = trimContext(jdText);
  return `${TECHNOLOGY_RISK_LEAD_BACKGROUND}

Candidate-provided market skills or job description context:
${providedContext || "No additional JD provided."}`;
}

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
  });
  res.end(JSON.stringify(payload));
}

function readProfile() {
  return JSON.parse(fs.readFileSync(PROFILE_PATH, "utf8"));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 8_000_000) {
        reject(new Error("Request body is too large."));
        req.destroy();
      }
    });
    req.on("end", () => resolve(data ? JSON.parse(data) : {}));
    req.on("error", reject);
  });
}

function cleanExtractedText(value) {
  return String(value || "").replace(/\s+\n/g, "\n").replace(/[ \t]+/g, " ").trim();
}

async function extractPdfText(data) {
  const parser = new PDFParse({ data });
  try {
    const result = await parser.getText();
    return cleanExtractedText(result.text);
  } finally {
    await parser.destroy();
  }
}

async function extractWordText(data) {
  const result = await mammoth.extractRawText({ buffer: data });
  return cleanExtractedText(result.value);
}

async function extractImageText(data) {
  const result = await tesseract.recognize(data, "eng", { langPath: OCR_LANG_PATH });
  return cleanExtractedText(result.data.text);
}

async function extractUploadedJdText(input) {
  const data = Buffer.from(String(input.data || ""), "base64");
  if (!data.length) {
    throw new Error("The uploaded file was empty.");
  }
  if (data.length > 5_000_000) {
    throw new Error("File is too large. Please upload a file under 5 MB.");
  }

  const filename = String(input.filename || "").toLowerCase();
  const mimeType = String(input.mimeType || "").toLowerCase();
  let text = "";

  if (mimeType.includes("pdf") || filename.endsWith(".pdf")) {
    text = await extractPdfText(data);
  } else if (
    mimeType.includes("wordprocessingml") ||
    filename.endsWith(".docx")
  ) {
    text = await extractWordText(data);
  } else if (mimeType.startsWith("text/") || filename.endsWith(".txt") || filename.endsWith(".md")) {
    text = cleanExtractedText(data.toString("utf8"));
  } else if (mimeType.startsWith("image/") || /\.(png|jpe?g|webp|tiff?|bmp)$/i.test(filename)) {
    text = await extractImageText(data);
  } else {
    throw new Error("Unsupported file type. Upload PDF, DOCX, TXT, MD, PNG, JPG, WEBP, TIFF, or BMP.");
  }

  if (text.length < 80) {
    throw new Error("Could not extract enough readable text. Try a clearer file or paste the JD manually.");
  }
  return text;
}

function trimContext(value, maxLength = 5000) {
  const text = String(value || "").trim();
  return text.length > maxLength ? `${text.slice(0, maxLength)}\n...[trimmed]` : text;
}

function htmlToText(html) {
  return String(html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
}

function extractJsonArray(text) {
  const raw = String(text || "").trim();
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) return [];
    try {
      return JSON.parse(match[0]);
    } catch {
      return [];
    }
  }
}

let cachedQuestionBank = null;

function readQuestionBank() {
  if (cachedQuestionBank) return cachedQuestionBank;

  const text = fs.readFileSync(QUESTION_BANK_PATH, "utf8");
  const questions = [];
  let currentSection = "General";
  let lastQuestionNumber = 0;
  const questionStem = /^(what|why|how|when|where|which|who|explain|describe|difference|design|scenario|tell|a pod|pods)\b/i;

  for (const line of text.split(/\r?\n/)) {
    const sectionMatch = line.match(/^Section\s+\d+:\s+(.+)$/);
    if (sectionMatch) {
      currentSection = sectionMatch[1].trim();
      continue;
    }

    const questionMatch = line.match(/^\s*(\d+)\.\s+(.+)$/);
    if (!questionMatch) continue;
    const number = Number(questionMatch[1]);
    if (number <= lastQuestionNumber) continue;
    if (!questionStem.test(questionMatch[2].trim())) continue;

    questions.push({
      number,
      question: questionMatch[2].trim(),
      section: currentSection
    });
    lastQuestionNumber = number;
  }

  cachedQuestionBank = questions;
  return questions;
}

async function importJobDescription(url) {
  if (OFFLINE_ONLY) {
    throw new Error("Offline mode is enabled. Paste the JD text manually or upload a local JD file.");
  }

  const parsed = new URL(url);
  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only http/https job URLs are supported.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  let response;
  try {
    response = await fetch(parsed.toString(), {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 JD Collector for local mock interview preparation",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.5"
      }
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`Could not import JD: ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";
  const raw = await response.text();
  const text = contentType.includes("html") ? htmlToText(raw) : raw.replace(/\s+/g, " ").trim();

  if (text.length < 300) {
    throw new Error("The page did not expose enough readable job text. Paste the JD manually.");
  }

  return trimContext(text, 10000);
}

async function askOllama(prompt, options = {}, timeoutMs = 45000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  let response;
  try {
    response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt,
        stream: false,
        options: {
          temperature: 0.35,
          num_ctx: 4096,
          ...options
        }
      })
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`Ollama returned ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  return String(data.response || "").trim();
}

async function askClaude(prompt, options = {}) {
  if (!claudeClient) {
    throw new Error("ANTHROPIC_API_KEY is not set. Add it to your environment to use LLM_PROVIDER=claude.");
  }
  const response = await claudeClient.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: options.maxTokens || 2000,
    messages: [{ role: "user", content: prompt }]
  });
  const textBlock = response.content.find((block) => block.type === "text");
  return String(textBlock?.text || "").trim();
}

async function askLLM(prompt, ollamaOptions = {}, timeoutMs = 45000) {
  if (OFFLINE_ONLY && LLM_PROVIDER === "claude") {
    throw new Error("Offline mode is enabled. Claude API calls are disabled.");
  }
  if (LLM_PROVIDER === "claude") {
    return askClaude(prompt, { maxTokens: ollamaOptions.num_predict });
  }
  return askOllama(prompt, ollamaOptions, timeoutMs);
}

function fallbackQuestion(input) {
  const historyText = Array.isArray(input.history) ? input.history.join("\n") : "";
  const used = new Set(
    [...historyText.matchAll(/Question\s+\d+:\s*(.+?)(?:\n|$)/g)]
      .map((match) => match[1].trim().toLowerCase())
  );
  const bank = readQuestionBank().map((item) => item.question);
  const fallbackBank = bank.length ? bank : [
    "GKE troubleshooting: A production service has intermittent 5xx errors. Walk me through your investigation from load balancer to pod metrics.",
    "Terraform safety: How would you design modules, remote state, approvals, and drift detection for a senior GCP platform role?",
    "SRE: Define SLIs, SLOs, error budget policy, alerting, and incident response for a user-facing API.",
    "Cloud security: How would you secure GKE workloads, IAM permissions, secrets, image supply chain, and ingress traffic?",
    "Platform engineering: What self-service golden paths would you build, and what guardrails would you enforce?"
  ];
  const next = fallbackBank.find((question) => !used.has(question.trim().toLowerCase()));
  return next || fallbackBank[Math.floor(Math.random() * fallbackBank.length)];
}

function fallbackQuestionFeedback(input) {
  const answer = String(input.answer || "");
  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  const hasSignals = /metric|log|trace|slo|rollback|runbook|rca|alert|dashboard|kubectl|terraform|iam|risk|impact/i.test(answer);
  const score = wordCount >= 90 && hasSignals ? 7 : wordCount >= 45 ? 6 : 4;
  return `## Score
${score}/10. Offline feedback is using a local template because no LLM response was available.

## What Went Well
- You captured an answer for the current question.
- ${hasSignals ? "You included useful production signals or operating details." : "You have a starting point to refine into a structured answer."}
- The transcript is saved for final review.

## Gaps
- Add exact signals, commands, dashboards, and rollback criteria.
- Tie the answer to business impact and reliability risk.
- Close with prevention: tests, guardrails, runbooks, ownership, and measurable improvement.

## Job Fit Coaching
- Connect the answer to your GCP, GKE, Terraform, SRE, security, and platform engineering experience.
- Use one concrete project example and include scale, incident impact, or measurable result.

## Stronger Answer
I would first confirm customer impact using SLO dashboards, error rate, latency, and recent-change history. Then I would isolate whether the issue is deployment, capacity, dependency, network, IAM, or configuration related. I would check logs, metrics, traces, events, and audit data, mitigate with rollback or traffic shift if impact is high, and communicate status clearly. After recovery, I would write an RCA and add preventive actions such as better alerts, tests, policy guardrails, runbooks, and ownership.`;
}

function fallbackFinalFeedback(input) {
  const transcript = String(input.transcript || "");
  const answers = [...transcript.matchAll(/Answer \d+:/g)].length || 1;
  const lower = transcript.toLowerCase();
  const mentioned = [
    ["GKE/Kubernetes", /gke|kubernetes|pod|node|cluster|hpa|rbac/.test(lower)],
    ["Terraform", /terraform|state|module|workspace|sentinel|opa/.test(lower)],
    ["SRE", /slo|sli|sla|error budget|incident|rca|latency|availability/.test(lower)],
    ["Observability", /prometheus|grafana|trace|logging|monitoring|otel|opentelemetry/.test(lower)],
    ["Security", /iam|workload identity|secret|armor|waf|security|vulnerability/.test(lower)],
    ["Automation", /python|fastapi|go|golang|bash|api|automation|script/.test(lower)],
    ["GCP Governance", /landing zone|shared vpc|org polic|folder|governance|guardrail/.test(lower)],
    ["FinOps", /finops|cost|billing|budget|rightsizing|committed use|optimization/.test(lower)],
    ["DR/Backup", /disaster recovery|backup|restore|rto|rpo|failover/.test(lower)],
    ["Incident Leadership", /stakeholder|postmortem|runbook|on-call|communication|incident commander/.test(lower)],
    ["Linux/Networking Fundamentals", /linux|tls|certificate|tcpdump|systemd|kernel|dns|http/.test(lower)]
  ];
  const hits = mentioned.filter((item) => item[1]).map((item) => item[0]);
  const misses = mentioned.filter((item) => !item[1]).map((item) => item[0]);
  const score = Math.min(8, Math.max(4, 4 + hits.length));
  const hireSignal = score >= 7 ? "Lean Hire" : "Lean No Hire";
  const summary = {
    score: score * 10,
    hiringReadiness: hireSignal,
    hiringReadinessPercent: score >= 8 ? 80 : score >= 7 ? 62 : score >= 5 ? 42 : 25,
    topSkills: hits.slice(0, 4),
    needsImprovement: misses.slice(0, 4)
  };

  return `\`\`\`json
${JSON.stringify(summary)}
\`\`\`

## What You Told
${transcript || "No answer transcript was captured."}

## Overall Score
${score}/10. You covered ${hits.length} important signal area${hits.length === 1 ? "" : "s"} across ${answers} answer${answers === 1 ? "" : "s"}, but need more structured depth for senior product-company interviews.

## Score Breakdown
- Technical depth: ${hits.length >= 5 ? "Good" : "Needs more depth"}.
- Production troubleshooting: ${/incident|latency|rollback|logs|metrics|slo|debug|troubleshoot/.test(lower) ? "Partial to good" : "Needs stronger signals, commands, and decision points"}.
- Senior ownership: ${/stakeholder|communication|rca|postmortem|prevention|runbook|owner/.test(lower) ? "Partial" : "Needs clearer ownership, prevention, and business impact"}.
- Market coverage: ${hits.length ? hits.join(", ") : "too limited in this transcript"}.

## Hire Signal
${score >= 7 ? "Lean Hire" : "Lean No Hire"} for now. The direction is relevant, but the answer needs stronger architecture tradeoffs, exact signals, and production ownership details.

## Strengths
- Covered: ${hits.length ? hits.join(", ") : "basic troubleshooting direction"}.
- Your profile is aligned to Senior GCP DevOps/SRE roles through GKE, Terraform, platform, and security experience.
- You are using the right operational mindset by thinking about metrics, logs, deployments, and rollback.

## Gaps
- Add exact senior-level details: commands, metrics, dashboards, SLO impact, rollback criteria, and prevention.
- Missing or weak areas in this transcript: ${misses.length ? misses.join(", ") : "deeper tradeoff discussion"}.
- Use more structured examples from Capgemini, Tech Mahindra, or TCS with measurable impact.

## Where To Improve
- Start every answer with context, risk, and business impact before jumping into tools.
- Add concrete evidence: metrics, logs, traces, kubectl or Terraform commands, dashboards, audit logs, and rollback signals.
- Explain tradeoffs and decisions: why rollback vs scale, why Cloud Run vs GKE, why preventive vs detective control, why simple vs highly available design.
- Close with prevention: tests, guardrails, SLO alerts, runbooks, ownership, automation, and measurable improvement.
- Practice weak areas next: ${misses.slice(0, 5).join(", ") || "senior architecture tradeoffs and measurable outcomes"}.

## Market Skill Gaps
- Compare every answer to the priority market skills: GKE, Terraform, Python automation, SRE, observability, GitOps, cloud security, platform engineering, Vertex AI/MLOps, landing zones, networking, FinOps, DR, and production readiness.
- Add missing senior signals such as tradeoffs, scale, SLO impact, risk, automation, ownership, and measurable outcomes.

## Better Sample Answers
For each question, use this pattern: state the production context, quantify user/business impact, list exact signals or commands, explain the fix, explain rollback, and close with prevention and measurable improvement.

Example senior answer style: "I would first confirm impact using SLO dashboards and error-budget burn, then isolate whether the problem is deployment, dependency, capacity, network, or configuration. For GKE I would check events, pod status, rollout history, HPA metrics, node pressure, logs, traces, and recent changes. I would mitigate with rollback, scaling, traffic shift, or config revert, then create an RCA with permanent actions such as better alerts, policy guardrails, tests, runbooks, and ownership."

## Best Answer Pattern
Use: context -> risk/impact -> investigation steps -> tools/signals -> decision/tradeoff -> fix -> prevention -> metric improvement.

## 7 Day Improvement Plan
Day 1: Practice one GKE incident answer using kubectl events, logs, metrics, and rollout history.
Day 2: Explain Terraform remote state, modules, workspace design, and policy as code.
Day 3: Build Python scripts for GCP IAM and resource audit scenarios.
Day 4: Practice SLI/SLO/error budget answers with numbers.
Day 5: Explain Prometheus, Grafana, OpenTelemetry, Cloud Logging, and tracing together.
Day 6: Practice GCP security answers: IAM, Workload Identity, Cloud Armor, secrets, Binary Authorization.
Day 7: Do a full mock focused on platform engineering, FinOps, DR, and incident leadership.

## Next Mock Interview Focus
GKE production troubleshooting plus SRE metrics.`;
}

function moodInstruction(mood) {
  const presets = {
    friendly: "Adopt a warm, encouraging interviewer tone - supportive phrasing, patient follow-ups, like a mentor who wants the candidate to succeed.",
    strict: "Adopt a demanding, high-bar interviewer tone typical of a rigorous FAANG-style loop - press for specifics, do not soften critique, expect precise technical depth.",
    neutral: "Adopt a professional, neutral, straightforward interviewer tone."
  };
  return presets[mood] || presets.neutral;
}

function feedbackPrompt(input) {
  const role = input.role || "DevOps / MLOps Engineer";
  const level = input.level || "mid-senior";
  const interviewNumber = input.interviewNumber || 1;
  const cvText = trimContext(input.cvText);
  const jdText = combinedJobContext(input.jdText);
  const question = input.question || "No question provided.";
  const answer = input.answer || "";

  return `You are a senior technical interviewer and interview coach.

${moodInstruction(input.mood)}

Interview round: Interview ${interviewNumber}
Candidate target role: ${role}
Seniority: ${level}
Candidate CV/profile context:
${cvText || "No CV context provided."}

Target job description and hidden role context:
${jdText}

Interview question:
${question}

Candidate answer transcript:
${answer}

Give direct, practical feedback. Return markdown with exactly these sections:

## Score
Give a score out of 10 and one sentence explaining it.

## What Went Well
3 concise bullets.

## Gaps
3 concise bullets focused on missing depth, unclear reasoning, missing examples, or weak coverage of the priority skills.

## Job Fit Coaching
2 concise bullets explaining how the candidate should connect the answer to the CV and JD.

## Stronger Answer
Rewrite the answer in a confident interview style. Keep it under 180 words.

## Follow Up Question
Ask one realistic follow-up question.

## Practice Tip
Give one specific practice task for the candidate.`;
}

function finalFeedbackPrompt(input) {
  const role = input.role || "DevOps / MLOps Engineer";
  const level = input.level || "mid-senior";
  const interviewNumber = input.interviewNumber || 1;
  const cvText = trimContext(input.cvText);
  const jdText = combinedJobContext(input.jdText);
  const transcript = trimContext(input.transcript, 8000);

  return `You are a senior technical interviewer and hiring-bar coach.

${moodInstruction(input.mood)}

Interview round: Interview ${interviewNumber}
Candidate target role: ${role}
Seniority: ${level}
Candidate CV/profile context:
${cvText || "No CV context provided."}

Market skill benchmark. This is the required market skill set and must be treated separately from any JD:
${MARKET_SKILL_BENCHMARK}

Target job description and hidden role context:
${jdText}

Full interview transcript:
${transcript}

Give final interview feedback as if the mock interview is complete. Be direct and practical.
Important rules:
- Include what the candidate actually told for every answered question.
- Give a stronger sample answer for every answered question.
- Evaluate against the market skill benchmark first.
- Use the Technology Risk Lead context as a required targeting signal alongside the market skill benchmark.
- Separate technical risk/control feedback from behavioral stakeholder-leadership feedback where relevant.
- Do not invent experience the candidate did not mention; phrase sample answers as "A stronger answer could be..."

Start your response with exactly one fenced code block containing ONLY valid JSON (no comments, no trailing commas, no extra text inside the fence) in this exact shape:

\`\`\`json
{"score": <integer 0-100 overall hiring-readiness score>, "hiringReadiness": "<one of: Strong Hire, Hire, Lean Hire, Lean No Hire, No Hire>", "hiringReadinessPercent": <integer 0-100>, "topSkills": ["<skill>", "<skill>", "<skill>"], "needsImprovement": ["<skill>", "<skill>", "<skill>"]}
\`\`\`

Then, after that fence, continue with the full markdown report using exactly these sections:

## What You Told
For each answered question, show:
- Question N: the question
- Your answer: concise summary of what the candidate said, preserving important wording/points

## Overall Score
Score out of 10 and one hiring-bar sentence.

## Score Breakdown
Give scores out of 10 for technical depth, troubleshooting structure, senior ownership, communication, and JD/market fit. Add one short reason for each score.

## Hire Signal
Say whether the candidate currently looks Strong Hire, Hire, Lean Hire, Lean No Hire, or No Hire for the target role, and why.

## Strengths
3 concise bullets tied to the market skill benchmark.

## Gaps
3 concise bullets. Mention missing GCP, GKE, Terraform, SRE, observability, security, platform engineering, MLOps, networking, FinOps, DR, or senior ownership depth.

## Where To Improve
Give 5 specific improvement bullets. Each bullet must say exactly what to improve and how to practice it. Include weak topics from the transcript and missing senior signals such as metrics, commands, tradeoffs, rollback, prevention, ownership, and business impact.

## Market Skill Coverage
Make a compact checklist with Covered / Partial / Missing for:
GKE, Terraform, Python automation, SRE, observability, GitOps, cloud security, platform engineering, Vertex AI/MLOps, landing zones/networking, FinOps, DR/production readiness.

## Better Sample Answers
For each answered question, write a stronger senior-level answer. Keep each sample answer under 140 words. Include concrete signals, tools, tradeoffs, and prevention where relevant.

## What To Keep From Your Answer
List the candidate's useful points that should be kept and reused.

## Best Answer Pattern
Give one repeatable answer structure.

## 7 Day Improvement Plan
Give 7 short daily practice tasks.

## Next Mock Interview Focus
Recommend the next interview round focus area.`;
}

function profileFieldValue(profile, label, pageText = "") {
  const text = String(label || "").toLowerCase();
  const page = String(pageText || "").toLowerCase();
  if (/first/.test(text) && /name/.test(text)) return profile.firstName;
  if (/middle/.test(text) && /name/.test(text)) return profile.middleName;
  if (/last|surname|family/.test(text) && /name/.test(text)) return profile.lastName;
  if (/full.*name|candidate.*name|applicant.*name|legal.*name/.test(text)) return profile.fullName;
  if (/e-?mail|email/.test(text)) return profile.email;
  if (/phone|mobile|contact number|telephone/.test(text)) return profile.phone;
  if (/linkedin/.test(text)) return profile.linkedin;
  if (/github|git hub/.test(text)) return profile.github;
  if (/portfolio|website|personal site/.test(text)) return profile.portfolio || profile.github;
  if (/city/.test(text)) return profile.city;
  if (/country/.test(text)) return profile.country;
  if (/location|current address|address/.test(text)) return profile.location;
  if (/experience|years/.test(text)) return profile.yearsExperience;
  if (/notice/.test(text)) return profile.noticePeriod;
  if (/expected.*ctc|salary expectation|expected salary/.test(text)) return profile.expectedCtc;
  if (/current.*ctc|current salary/.test(text)) return profile.currentCtc;
  if (/summary|profile|about|cover letter|why.*you|tell us|message/.test(text)) return profile.summary;
  if (/skill|technology|tools/.test(text)) return profile.skills.join(", ");
  if (/education|degree|university|college/.test(text)) return profile.education;
  if (/authorization|work permit|eligible/.test(text)) return profile.workAuthorization;
  if (/remote|relocat|preferred location/.test(text)) return page.includes("remote") ? profile.remotePreference : profile.preferredLocations;
  return "";
}

function fallbackAutofillSuggestions(input, profile) {
  return (Array.isArray(input.fields) ? input.fields : [])
    .map((field) => ({
      index: field.index,
      value: profileFieldValue(profile, field.label, input.pageText)
    }))
    .filter((item) => item.value);
}

function autofillPrompt(input, profile) {
  const fields = JSON.stringify((input.fields || []).slice(0, 80), null, 2);
  const pageText = trimContext(input.pageText, 4000);

  return `You are a careful job application autofill assistant.

Use this candidate profile:
${JSON.stringify(profile, null, 2)}

Current job page:
URL: ${input.url || ""}
Title: ${input.title || ""}
Visible page text:
${pageText}

Visible form fields:
${fields}

Return only a JSON array. Each item must be:
{"index": number, "value": "text to fill"}

Rules:
- Fill only fields you can infer confidently.
- Do not invent salary, notice period, visa, demographic, disability, gender, race, or sponsorship answers unless the profile explicitly contains it.
- Do not include file upload fields.
- Use concise answers for short fields.
- For long text or cover-letter-style fields, tailor the answer to Senior GCP DevOps/SRE/Platform roles using the candidate profile.
- Never submit the form.`;
}

function coverLetterPrompt(input, profile) {
  return `Write a concise job application cover letter for this candidate.

Candidate profile:
${JSON.stringify(profile, null, 2)}

Job page:
URL: ${input.url || ""}
Title: ${input.title || ""}
Visible page text:
${trimContext(input.pageText, 5000)}

Requirements:
- 180 to 230 words.
- First person.
- Target Senior GCP DevOps / SRE / Platform / Cloud Reliability roles.
- Mention GCP, GKE, Terraform, Kubernetes, CI/CD, observability, security, and platform engineering where relevant.
- Do not invent company-specific facts.
- End with a confident but polite closing.`;
}

function questionPrompt(input) {
  const role = input.role || "DevOps / MLOps Engineer";
  const level = input.level || "mid-senior";
  const topic = input.topic || "Kubernetes, GCP, MLOps, CI/CD, Terraform, SRE";
  const interviewNumber = input.interviewNumber || 1;
  const cvText = trimContext(input.cvText);
  const jdText = combinedJobContext(input.jdText);
  const historyEntries = Array.isArray(input.history) ? input.history.slice(-6) : [];
  const history = historyEntries.join("\n");
  const lastEntry = historyEntries[historyEntries.length - 1] || "";
  const lastAnswerMatch = lastEntry.match(/Answer:\s*([\s\S]+)/);
  const lastAnswer = lastAnswerMatch ? lastAnswerMatch[1].trim() : "";

  return `You are running a mock technical interview.

${moodInstruction(input.mood)}

Interview round: Interview ${interviewNumber}
Target role: ${role}
Seniority: ${level}
Focus areas: ${topic}
Candidate CV/profile context:
${cvText || "No CV context provided."}

Target job description and hidden role context:
${jdText}

Recent interview history:
${history || "None yet."}

${lastAnswer
    ? `The candidate's most recent answer was:\n${lastAnswer}\n\nAct like a real interviewer reacting to that specific answer: reference a concrete detail, tool, number, or claim the candidate just made, and ask ONE adaptive follow-up question that digs deeper into it or pressure-tests it - do not jump to an unrelated rotation topic yet. Only move to the next rotation topic below if this specific answer was already thin, fully covered in a prior follow-up, or you are deliberately starting a new section of the interview.`
    : "There is no prior answer yet, so ask an opening or topic-starting question from the rotation below."}

Priority skill rotation:
1. GKE expert operations and troubleshooting
2. Terraform expert modules, state, Terraform Enterprise, policy as code
3. Python automation for cloud/platform work
3a. Go programming for platform CLIs, APIs, Kubernetes controllers/operators, concurrency, and production tooling
3b. FastAPI backend service design, Pydantic validation, async APIs, testing, observability, and deployment
4. SRE concepts: SLI, SLO, error budgets, incidents, RCA
5. Observability: Prometheus, Grafana, OpenTelemetry, Cloud Monitoring, logs
6. GitOps and CI/CD: ArgoCD, Cloud Build, Jenkins, GitHub Actions
7. GCP security: IAM, Workload Identity, Cloud Armor, secrets, supply chain
8. Platform engineering: self-service, golden paths, DevEx, IDP
9. Vertex AI, MLOps, model serving on Kubernetes, GPU workloads
10. Networking fundamentals for GCP and Kubernetes
11. GCP landing zones, org policy, Shared VPC, governance, and guardrails
12. FinOps, cost optimization, budget controls, and cost-aware architecture
13. DR, backup/restore, RTO/RPO, failover, and production readiness
14. Incident leadership, stakeholder communication, runbooks, and postmortems
15. Linux, TLS, DNS, HTTP, and systems performance fundamentals
16. Technology risk framework design, risk registers, heatmaps, dashboards, and reporting
17. Control design and validation: preventive, detective, corrective controls
18. Governance, audit, compliance, ISO 27001, NIST, COBIT, FAIR, and remediation planning
19. BRD/PRD, architecture, SDLC, cloud, DevOps, and change risk assessment
20. Behavioral leadership: stakeholder influence, executive communication, risk culture, and decision-making

Ask exactly one interview question. Make it realistic, scenario-based, suitable for spoken practice, and strongly aligned to the JD while testing the candidate's CV claims. Rotate through the priority skills instead of repeating the same topic. Mix technical technology-risk questions with behavioral stakeholder-leadership questions over the interview. For Google/product-company style, prefer system design, tradeoff, debugging, incident, control, governance, and production ownership questions. Do not include the answer.`;
}

function hintPrompt(input) {
  const role = input.role || "DevOps / MLOps Engineer";
  const level = input.level || "mid-senior";
  const question = input.question || "";
  const partialAnswer = trimContext(input.answer);

  return `You are a supportive technical interview coach giving a brief hint mid-interview.

Target role: ${role}
Seniority: ${level}
Current interview question:
${question}

Candidate's partial answer so far:
${partialAnswer || "No answer given yet."}

Give ONE short hint (2-3 sentences max) that nudges the candidate toward a strong answer structure or a key concept they may be missing. Do NOT give away the full answer or a complete solution. Be encouraging and specific to this question, not generic advice.`;
}

function fallbackHint(input) {
  const question = String(input.question || "").toLowerCase();
  const hints = [
    { match: /kubernetes|k8s|\bpod\b|deployment|helm|gke/, hint: "Think in layers: workload spec (requests/limits/probes), scheduling, and the failure mode you'd see in `kubectl describe` or events before jumping to logs." },
    { match: /terraform|opentofu|\biac\b/, hint: "Structure your answer around state, modules, and blast radius: how do you isolate environments, review plans safely, and prevent drift?" },
    { match: /mlops|model|ml pipeline|vertex|mlflow/, hint: "Frame it as a release pipeline: data/feature version, model registry approval, deployment strategy, and rollback - not just training." },
    { match: /\bsre\b|\bslo\b|\bsli\b|error budget|incident/, hint: "Anchor your answer in a concrete metric and threshold, then walk through detection, alerting, and the decision it triggers." },
    { match: /security|\biam\b|secrets|devsecops/, hint: "Lead with least privilege and defense in depth: who has access, how is it scoped, and what detects misuse." },
    { match: /python|script|automation|\bgo\b/, hint: "Describe the shape of the function first (inputs/outputs/edge cases), then how you'd test and productionize it." }
  ];
  const matched = hints.find((item) => item.match.test(question));
  return matched
    ? matched.hint
    : "Start by restating the problem in your own words, then walk through your approach step by step before naming the tools you'd use.";
}

function cleanGeneratedQuestion(text) {
  const raw = String(text || "").trim();
  if (!raw) return "";

  const questionSection = raw.match(/\*\*Question:?\*\*\s*([\s\S]+)/i);
  const candidate = (questionSection ? questionSection[1] : raw)
    .replace(/\r/g, "")
    .replace(/\n\s*(This question|The question|This tests|It also assesses)[\s\S]*$/i, "")
    .replace(/^Here(?:'s| is)[\s\S]*?\n\s*/i, "")
    .replace(/^\*\*Question:?\*\*:?\s*/i, "")
    .replace(/^["'`“]+|["'`”]+$/g, "")
    .replace(/^[-*]\s+/, "")
    .trim();

  if (candidate) return candidate.replace(/\s+/g, " ").trim();

  const quoted = candidate.match(/["“]([\s\S]+?\?)[”"]/);
  if (quoted) return quoted[1].replace(/\s+/g, " ").trim();

  const questionLine = candidate
    .split(/\r?\n/)
    .map((line) => line.replace(/^#+\s*/, "").replace(/^\*\*|\*\*$/g, "").trim())
    .find((line) => /\?$/.test(line) && !/^here('| i)s|^question$/i.test(line));

  return questionLine || candidate;
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const requested = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = path.normalize(path.join(PUBLIC_DIR, requested));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream"
    });
    res.end(req.method === "HEAD" ? undefined : data);
  });
}

async function handleRequest(req, res) {
  try {
    if (req.method === "OPTIONS") {
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "POST" && req.url === "/api/auth/signup") {
      const input = await readBody(req);
      const name = String(input.name || "").trim();
      const email = String(input.email || "").trim().toLowerCase();
      const password = String(input.password || "");
      if (!name || !isValidEmail(email) || password.length < 8) {
        sendJson(res, 400, { error: "Enter your name, a valid email, and a password of at least 8 characters." });
        return;
      }
      const users = readUsers();
      if (users.some((user) => user.email.toLowerCase() === email)) {
        sendJson(res, 409, { error: "An account with this email already exists. Try signing in instead." });
        return;
      }
      const user = {
        id: crypto.randomUUID(),
        name,
        email,
        passwordHash: hashPassword(password),
        role: "user",
        createdAt: new Date().toISOString()
      };
      users.push(user);
      try {
        writeUsers(users);
      } catch {
        sendJson(res, 500, { error: "Could not save your account. If this is running on read-only hosting, sign up locally instead." });
        return;
      }
      createSessionForUser(req, res, user);
      sendJson(res, 200, { user: publicUser(user) });
      return;
    }

    if (req.method === "POST" && req.url === "/api/auth/login") {
      const input = await readBody(req);
      const email = String(input.email || "").trim().toLowerCase();
      const password = String(input.password || "");
      const users = readUsers();
      const user = users.find((entry) => entry.email.toLowerCase() === email);
      if (!user || !verifyPassword(password, user.passwordHash)) {
        sendJson(res, 401, { error: "Incorrect email or password." });
        return;
      }
      createSessionForUser(req, res, user);
      sendJson(res, 200, { user: publicUser(user) });
      return;
    }

    if (req.method === "POST" && req.url === "/api/auth/logout") {
      clearSessionCookie(req, res);
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "GET" && req.url === "/api/auth/me") {
      const session = getSession(req);
      if (!session) {
        sendJson(res, 401, { user: null });
        return;
      }
      const user = readUsers().find((entry) => entry.id === session.uid);
      if (!user) {
        clearSessionCookie(req, res);
        sendJson(res, 401, { user: null });
        return;
      }
      sendJson(res, 200, { user: publicUser(user) });
      return;
    }

    if (req.method === "GET" && req.url === "/api/health") {
      if (OFFLINE_ONLY) {
        sendJson(res, 200, {
          ok: true,
          provider: "offline",
          model: "built-in question bank",
          ollamaUrl: OLLAMA_URL,
          claudeConfigured: false,
          offlineOnly: true
        });
        return;
      }
      if (LLM_PROVIDER === "claude") {
        sendJson(res, 200, {
          ok: Boolean(claudeClient),
          provider: "claude",
          model: CLAUDE_MODEL,
          claudeConfigured: Boolean(claudeClient)
        });
        return;
      }
      const response = await fetch(`${OLLAMA_URL}/api/tags`);
      sendJson(res, 200, {
        ok: response.ok,
        provider: "ollama",
        model: OLLAMA_MODEL,
        ollamaUrl: OLLAMA_URL,
        claudeConfigured: Boolean(claudeClient)
      });
      return;
    }

    if (req.method === "GET" && req.url === "/api/autofill-profile") {
      sendJson(res, 200, { profile: readProfile() });
      return;
    }

    if (req.method === "GET" && req.url === "/api/question-bank") {
      sendJson(res, 200, { questions: readQuestionBank() });
      return;
    }

    if (req.method === "POST" && req.url === "/api/autofill-suggestions") {
      const input = await readBody(req);
      const profile = readProfile();
      try {
        const response = await askLLM(autofillPrompt(input, profile), {
          temperature: 0.1,
          num_predict: 900
        }, 18000);
        const suggestions = extractJsonArray(response)
          .filter((item) => Number.isInteger(item.index) && typeof item.value === "string" && item.value.trim())
          .slice(0, 80);
        sendJson(res, 200, {
          suggestions: suggestions.length ? suggestions : fallbackAutofillSuggestions(input, profile),
          fallback: !suggestions.length
        });
      } catch {
        sendJson(res, 200, {
          suggestions: fallbackAutofillSuggestions(input, profile),
          fallback: true
        });
      }
      return;
    }

    if (req.method === "POST" && req.url === "/api/cover-letter") {
      const input = await readBody(req);
      const profile = readProfile();
      try {
        sendJson(res, 200, {
          coverLetter: await askLLM(coverLetterPrompt(input, profile), {
            temperature: 0.25,
            num_predict: 450
          }, 20000)
        });
      } catch {
        sendJson(res, 200, {
          coverLetter: `Dear Hiring Team,\n\nI am interested in this opportunity because it aligns strongly with my background as a Senior DevOps and Platform Engineer with 6.9+ years of experience across GCP, Kubernetes, Terraform, CI/CD, cloud security, observability, and reliability engineering. I have designed secure GCP platform foundations, built reusable Terraform modules, managed production GKE clusters, improved monitoring with Prometheus, Grafana, ELK, and Google Cloud Operations, and supported highly available cloud-native platforms across enterprise environments.\n\nMy recent work includes GCP landing zones, Shared VPC, IAM governance, Cloud Armor, Terraform Enterprise, Git-based delivery workflows, and Kubernetes operations. I also bring hands-on exposure to MLOps and AI infrastructure, including MLflow, FastAPI model serving, Vertex AI, and Kubernetes-based ML deployment workflows.\n\nI would welcome the chance to contribute to your engineering team by improving platform reliability, delivery speed, security posture, and developer experience.\n\nBest regards,\nAkhilesh Ranjan Singh`,
          fallback: true
        });
      }
      return;
    }

    if (req.method === "POST" && req.url === "/api/feedback") {
      const input = await readBody(req);
      if (!String(input.answer || "").trim()) {
        sendJson(res, 400, { error: "Please record or type an answer first." });
        return;
      }
      if (OFFLINE_ONLY) {
        sendJson(res, 200, {
          feedback: fallbackQuestionFeedback(input),
          fallback: true
        });
        return;
      }
      try {
        sendJson(res, 200, { feedback: await askLLM(feedbackPrompt(input)) });
      } catch {
        sendJson(res, 200, {
          feedback: fallbackQuestionFeedback(input),
          fallback: true
        });
      }
      return;
    }

    if (req.method === "POST" && req.url === "/api/final-feedback") {
      const input = await readBody(req);
      if (!String(input.transcript || "").trim()) {
        sendJson(res, 400, { error: "No interview answers captured yet." });
        return;
      }
      if (OFFLINE_ONLY) {
        sendJson(res, 200, {
          feedback: fallbackFinalFeedback(input),
          fallback: true
        });
        return;
      }
      try {
        sendJson(res, 200, {
          feedback: await askLLM(finalFeedbackPrompt(input), {
            num_predict: 1800,
            temperature: 0.2
          }, 45000)
        });
      } catch (error) {
        sendJson(res, 200, {
          feedback: fallbackFinalFeedback(input),
          fallback: true
        });
      }
      return;
    }

    if (req.method === "POST" && req.url === "/api/question") {
      const input = await readBody(req);
      if (OFFLINE_ONLY) {
        sendJson(res, 200, {
          question: fallbackQuestion(input),
          fallback: true
        });
        return;
      }
      try {
        const question = cleanGeneratedQuestion(await askLLM(questionPrompt(input)));
        sendJson(res, 200, { question });
      } catch {
        sendJson(res, 200, {
          question: fallbackQuestion(input),
          fallback: true
        });
      }
      return;
    }

    if (req.method === "POST" && req.url === "/api/hint") {
      const input = await readBody(req);
      if (!String(input.question || "").trim()) {
        sendJson(res, 400, { error: "No active question to hint on." });
        return;
      }
      if (OFFLINE_ONLY) {
        sendJson(res, 200, { hint: fallbackHint(input), fallback: true });
        return;
      }
      try {
        const hint = await askLLM(hintPrompt(input), { temperature: 0.4, num_predict: 180 }, 15000);
        sendJson(res, 200, { hint: String(hint).trim() });
      } catch {
        sendJson(res, 200, { hint: fallbackHint(input), fallback: true });
      }
      return;
    }

    if (req.method === "POST" && req.url === "/api/import-jd-url") {
      const input = await readBody(req);
      if (!String(input.url || "").trim()) {
        sendJson(res, 400, { error: "Please provide a job URL." });
        return;
      }
      if (OFFLINE_ONLY) {
        sendJson(res, 400, {
          error: "URL import is disabled in offline-only deployment. Paste the JD text or upload a local file instead."
        });
        return;
      }
      sendJson(res, 200, { text: await importJobDescription(input.url) });
      return;
    }

    if (req.method === "POST" && (req.url === "/api/import-jd-file" || req.url === "/api/import-jd-pdf")) {
      const input = await readBody(req);
      if (!String(input.data || "").trim()) {
        sendJson(res, 400, { error: "Please upload a JD file." });
        return;
      }
      sendJson(res, 200, { text: await extractUploadedJdText(input) });
      return;
    }

    if (req.method === "POST" && req.url === "/api/import-cv-file") {
      const input = await readBody(req);
      if (!String(input.data || "").trim()) {
        sendJson(res, 400, { error: "Please upload a CV file." });
        return;
      }
      sendJson(res, 200, { text: await extractUploadedJdText(input) });
      return;
    }

    if (req.method === "GET" || req.method === "HEAD") {
      const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
      const normalized = pathname === "/" ? "/index.html" : pathname;
      if (PROTECTED_PAGES.has(normalized)) {
        const session = getSession(req);
        if (!session) {
          res.writeHead(302, { Location: `/signin.html?next=${encodeURIComponent(pathname)}` });
          res.end();
          return;
        }
        if (ADMIN_ONLY_PAGES.has(normalized) && session.role !== "admin") {
          res.writeHead(302, { Location: "/session.html?denied=1" });
          res.end();
          return;
        }
      }
      serveStatic(req, res);
      return;
    }

    sendJson(res, 405, { error: "Method not allowed." });
  } catch (error) {
    sendJson(res, 500, {
      error: error.message.includes("fetch failed")
        ? "Could not reach Ollama. Start it with `ollama serve` and try again."
        : error.message
    });
  }
}

const server = http.createServer(handleRequest);

if (require.main === module) {
  server.listen(PORT, HOST, () => {
    console.log(`AI Mock Interviewer running at http://${HOST}:${PORT}`);
    if (OFFLINE_ONLY) {
      console.log("Offline mode enabled. Using the built-in question bank and feedback templates.");
    } else if (LLM_PROVIDER === "claude") {
      console.log(`Using Claude model ${CLAUDE_MODEL}`);
    } else {
      console.log(`Using Ollama model ${OLLAMA_MODEL} at ${OLLAMA_URL}`);
    }
  });
}

module.exports = handleRequest;
