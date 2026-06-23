const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 3030);
const HOST = process.env.HOST || "127.0.0.1";
const OLLAMA_URL = process.env.OLLAMA_URL || "http://127.0.0.1:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.1:8b";
const PUBLIC_DIR = path.join(__dirname, "public");
const DATA_DIR = path.join(__dirname, "data");
const PROFILE_PATH = path.join(DATA_DIR, "applicant-profile.json");
const QUESTION_BANK_PATH = path.join(__dirname, "1000 DevOps + MLOps + Kubernetes + GCP Interview Questions.txt");
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
- Programming and Automation: Python, Bash, Go awareness, REST APIs, SDK automation
- Platform Engineering: IDP, self-service infrastructure, golden paths, DevEx, Backstage awareness
- AI Infrastructure: MLflow, Kubeflow, Vertex AI, model serving on Kubernetes, GPU workloads, MLOps fundamentals
- Additional senior skills: GCP landing zones, folders, projects, org policies, Shared VPC, governance, FinOps, DR, backup/restore, production readiness, incident communication, postmortems, runbooks, Linux fundamentals, TLS/certificates, Cloud Deploy, progressive delivery, Gatekeeper, Kyverno, BigQuery basics, Cloud Composer, Gateway API, Envoy, Apigee awareness

Priority order:
1. GKE expert
2. Terraform expert
3. Python automation strong
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
      if (data.length > 1_000_000) {
        reject(new Error("Request body is too large."));
        req.destroy();
      }
    });
    req.on("end", () => resolve(data ? JSON.parse(data) : {}));
    req.on("error", reject);
  });
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

function readQuestionBank() {
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

  return questions;
}

async function importJobDescription(url) {
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
    ["Automation", /python|bash|api|automation|script/.test(lower)],
    ["GCP Governance", /landing zone|shared vpc|org polic|folder|governance|guardrail/.test(lower)],
    ["FinOps", /finops|cost|billing|budget|rightsizing|committed use|optimization/.test(lower)],
    ["DR/Backup", /disaster recovery|backup|restore|rto|rpo|failover/.test(lower)],
    ["Incident Leadership", /stakeholder|postmortem|runbook|on-call|communication|incident commander/.test(lower)],
    ["Linux/Networking Fundamentals", /linux|tls|certificate|tcpdump|systemd|kernel|dns|http/.test(lower)]
  ];
  const hits = mentioned.filter((item) => item[1]).map((item) => item[0]);
  const misses = mentioned.filter((item) => !item[1]).map((item) => item[0]);
  const score = Math.min(8, Math.max(4, 4 + hits.length));

  return `## What You Told
${transcript || "No answer transcript was captured."}

## Better Sample Answers
For each question, use this pattern: state the production context, quantify user/business impact, list exact signals or commands, explain the fix, explain rollback, and close with prevention and measurable improvement.

Example senior answer style: "I would first confirm impact using SLO dashboards and error-budget burn, then isolate whether the problem is deployment, dependency, capacity, network, or configuration. For GKE I would check events, pod status, rollout history, HPA metrics, node pressure, logs, traces, and recent changes. I would mitigate with rollback, scaling, traffic shift, or config revert, then create an RCA with permanent actions such as better alerts, policy guardrails, tests, runbooks, and ownership."

## Market Skill Benchmark
Feedback is measured against Senior GCP DevOps / SRE / Cloud / Platform / ML Platform roles for 6-8 years, not only against one JD.

## Overall Score
${score}/10. You covered ${hits.length} important signal area${hits.length === 1 ? "" : "s"} across ${answers} answer${answers === 1 ? "" : "s"}, but need more structured depth for senior product-company interviews.

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

## Market Skill Gaps
- Compare every answer to the priority market skills: GKE, Terraform, Python automation, SRE, observability, GitOps, cloud security, platform engineering, Vertex AI/MLOps, landing zones, networking, FinOps, DR, and production readiness.
- Add missing senior signals such as tradeoffs, scale, SLO impact, risk, automation, ownership, and measurable outcomes.

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

function feedbackPrompt(input) {
  const role = input.role || "DevOps / MLOps Engineer";
  const level = input.level || "mid-senior";
  const interviewNumber = input.interviewNumber || 1;
  const cvText = trimContext(input.cvText);
  const jdText = trimContext(input.jdText);
  const question = input.question || "No question provided.";
  const answer = input.answer || "";

  return `You are a senior technical interviewer and interview coach.

Interview round: Interview ${interviewNumber}
Candidate target role: ${role}
Seniority: ${level}
Candidate CV/profile context:
${cvText || "No CV context provided."}

Target job description:
${jdText || "No JD provided yet. Use the target role and focus areas."}

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
  const jdText = trimContext(input.jdText);
  const transcript = trimContext(input.transcript, 8000);

  return `You are a senior technical interviewer and hiring-bar coach.

Interview round: Interview ${interviewNumber}
Candidate target role: ${role}
Seniority: ${level}
Candidate CV/profile context:
${cvText || "No CV context provided."}

Market skill benchmark. This is the required market skill set and must be treated separately from any JD:
${MARKET_SKILL_BENCHMARK}

Candidate-provided market skills or job description context:
${jdText || "No JD provided yet. Use the target role and focus areas."}

Full interview transcript:
${transcript}

Give final interview feedback as if the mock interview is complete. Be direct and practical.
Important rules:
- Include what the candidate actually told for every answered question.
- Give a stronger sample answer for every answered question.
- Evaluate against the market skill benchmark first.
- Use the JD/context only as optional extra targeting, not as the full hiring bar.
- Do not invent experience the candidate did not mention; phrase sample answers as "A stronger answer could be..."

Return markdown with exactly these sections:

## What You Told
For each answered question, show:
- Question N: the question
- Your answer: concise summary of what the candidate said, preserving important wording/points

## Overall Score
Score out of 10 and one hiring-bar sentence.

## Hire Signal
Say whether the candidate currently looks Strong Hire, Hire, Lean Hire, Lean No Hire, or No Hire for the target role, and why.

## Strengths
3 concise bullets tied to the market skill benchmark.

## Gaps
3 concise bullets. Mention missing GCP, GKE, Terraform, SRE, observability, security, platform engineering, MLOps, networking, FinOps, DR, or senior ownership depth.

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
  const jdText = trimContext(input.jdText);
  const history = Array.isArray(input.history) ? input.history.slice(-6).join("\n") : "";

  return `You are running a mock technical interview.

Interview round: Interview ${interviewNumber}
Target role: ${role}
Seniority: ${level}
Focus areas: ${topic}
Candidate CV/profile context:
${cvText || "No CV context provided."}

Target job description:
${jdText || "No JD provided yet. Ask a strong role-relevant question."}

Recent interview history:
${history || "None yet."}

Priority skill rotation:
1. GKE expert operations and troubleshooting
2. Terraform expert modules, state, Terraform Enterprise, policy as code
3. Python automation for cloud/platform work
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

Ask exactly one interview question. Make it realistic, scenario-based, suitable for spoken practice, and strongly aligned to the JD while testing the candidate's CV claims. Rotate through the priority skills instead of repeating the same topic. For Google/product-company style, prefer system design, tradeoff, debugging, incident, and production ownership questions. Do not include the answer.`;
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
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "OPTIONS") {
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === "GET" && req.url === "/api/health") {
      const response = await fetch(`${OLLAMA_URL}/api/tags`);
      sendJson(res, 200, {
        ok: response.ok,
        model: OLLAMA_MODEL,
        ollamaUrl: OLLAMA_URL
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
        const response = await askOllama(autofillPrompt(input, profile), {
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
          coverLetter: await askOllama(coverLetterPrompt(input, profile), {
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
      sendJson(res, 200, { feedback: await askOllama(feedbackPrompt(input)) });
      return;
    }

    if (req.method === "POST" && req.url === "/api/final-feedback") {
      const input = await readBody(req);
      if (!String(input.transcript || "").trim()) {
        sendJson(res, 400, { error: "No interview answers captured yet." });
        return;
      }
      try {
        sendJson(res, 200, {
          feedback: await askOllama(finalFeedbackPrompt(input), {
            num_predict: 350,
            temperature: 0.2
          }, 20000)
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
      const question = cleanGeneratedQuestion(await askOllama(questionPrompt(input)));
      sendJson(res, 200, { question });
      return;
    }

    if (req.method === "POST" && req.url === "/api/import-jd-url") {
      const input = await readBody(req);
      if (!String(input.url || "").trim()) {
        sendJson(res, 400, { error: "Please provide a job URL." });
        return;
      }
      sendJson(res, 200, { text: await importJobDescription(input.url) });
      return;
    }

    if (req.method === "GET") {
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
});

server.listen(PORT, HOST, () => {
  console.log(`AI Mock Interviewer running at http://${HOST}:${PORT}`);
  console.log(`Using Ollama model ${OLLAMA_MODEL} at ${OLLAMA_URL}`);
});
