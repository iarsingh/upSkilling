const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const base = JSON.parse(fs.readFileSync(path.join(root, "public", "30-day-plan.json"), "utf8"));
const answerBankFiles = [
  "83-gcp-architecture-networking-gke-cicd-terraform.json",
  "84-gcp-network-engineer-jd.json",
  "85-coverage-gap-topics.json",
  "86-topic-selector-coverage.json"
];
const banks = answerBankFiles.map((file) =>
  Object.keys(JSON.parse(fs.readFileSync(path.join(__dirname, "answer-bank", file), "utf8")))
);

const topicSections = [
  "Cloud Platforms & GCP Services",
  "GCP Networking",
  "Kubernetes & Containerization",
  "Infrastructure as Code (IaC)",
  "CI/CD & GitOps",
  "MLOps & AI Platforms",
  "DevSecOps & Cloud Security",
  "Monitoring, Logging & Observability",
  "Programming & Scripting",
  "Databases & Data Services",
  "Messaging & Streaming",
  "Source Control & Artifact Management",
  "Backup & Disaster Recovery",
  "ITSM & Enterprise Tools",
  "Platform Engineering & SRE",
  "Hybrid & Multi-Cloud",
  "Application & API Technologies"
];

function classifyQuestion(question, originalCategory = "") {
  const text = `${originalCategory} ${question}`.toLowerCase();
  const matches = (pattern) => pattern.test(text);

  if (matches(/\b(vpc|subnet|cidr|cloud router|bgp|vpn|interconnect|cloud nat|dns|private service|network|load balanc|firewall|route|ncc)\b/)) return "GCP Networking";
  if (matches(/\b(kubernetes|gke|container|docker|helm|pod|deployment|statefulset|daemonset|ingress|gateway|hpa|vpa|cluster autoscaler|node pool|taint|toleration|persistent volume)\b/)) return "Kubernetes & Containerization";
  if (matches(/\b(terraform|infrastructure as code|\biac\b|ansible|remote state|state lock|provider management|drift)\b/)) return "Infrastructure as Code (IaC)";
  if (matches(/\b(ci\/cd|cicd|jenkins|pipeline|gitops|argo cd|github actions|gitlab ci|bitbucket pipeline|blue-green|canary|build automation|deployment automation)\b/)) return "CI/CD & GitOps";
  if (matches(/\b(mlops|vertex ai|kubeflow|mlflow|model serving|model deployment|model monitoring|data drift|vllm|agentic ai|\brag\b|llm)\b/)) return "MLOps & AI Platforms";
  if (matches(/\b(devsecops|security|iam|service account|organization polic|cloud armor|vpc service controls|zero trust|waf|owasp|ssl|tls|prisma cloud|wiz|ionix|sast|dast|secret manager|oauth|oidc|jwt)\b/)) return "DevSecOps & Cloud Security";
  if (matches(/\b(monitoring|logging|observability|prometheus|grafana|dynatrace|elk|elasticsearch|logstash|kibana|jaeger|opentelemetry|sli|slo|telemetry|alert)\b/)) return "Monitoring, Logging & Observability";
  if (matches(/\b(python|bash|shell script|\bgo\b|javascript|coding|script|automation code)\b/)) return "Programming & Scripting";
  if (matches(/\b(cloud sql|alloydb|bigquery|postgresql|mysql|mongodb|redis|database|datastore|data service)\b/)) return "Databases & Data Services";
  if (matches(/\b(pub\/sub|kafka|rabbitmq|messag|streaming|event-driven|queue)\b/)) return "Messaging & Streaming";
  if (matches(/\b(git|github|gitlab|bitbucket|artifact registry|jfrog|source control|artifact management)\b/)) return "Source Control & Artifact Management";
  if (matches(/\b(backup|disaster recovery|\bdr\b|restore|veeam|kasten|rpo|rto|business continuity)\b/)) return "Backup & Disaster Recovery";
  if (matches(/\b(servicenow|jira|itsm|change management|problem management)\b/)) return "ITSM & Enterprise Tools";
  if (matches(/\b(platform engineering|\bsre\b|production support|on-call|incident|root cause|capacity planning|cost optimization|rightsizing|developer experience|reliability)\b/)) return "Platform Engineering & SRE";
  if (matches(/\b(hybrid|multi-cloud|multicloud|\baws\b|\bazure\b|on-prem|multi-region)\b/)) return "Hybrid & Multi-Cloud";
  if (matches(/\b(fastapi|spring boot|node\.js|react|rest api|microservice|application|api technolog)\b/)) return "Application & API Technologies";
  return "Cloud Platforms & GCP Services";
}

function markdownAnchor(value) {
  return value
    .toLowerCase()
    .replace(/[&/]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const pool = [];
for (let index = 0; banks.some((bank) => bank[index]); index += 1) {
  banks.forEach((bank) => {
    if (bank[index]) pool.push(bank[index]);
  });
}

const themes = [
  "Senior GCP architecture and ownership",
  "GCP networking and hybrid connectivity",
  "GKE reliability and platform operations",
  "Terraform governance and recovery",
  "CI/CD, GitOps and DevSecOps",
  "SRE incidents, SLOs and observability",
  "Platform engineering and developer experience",
  "MLOps and AI platform production",
  "Security, IAM and zero trust",
  "Databases, messaging and APIs",
  "Multi-region resilience and disaster recovery",
  "Cost, capacity and performance",
  "Staff-level system design trade-offs",
  "Cross-team technical leadership",
  "Production troubleshooting under pressure",
  "Architecture review and risk decisions",
  "Behavioral ownership and stakeholder influence",
  "Full senior mock interview I",
  "Full senior mock interview II",
  "Final 25 LPA readiness assessment"
];

for (let day = 31; day <= 50; day += 1) {
  const start = (day - 31) * 6;
  base.push({
    day,
    title: `Day ${day}: ${themes[day - 31]}`,
    questions: pool.slice(start, start + 6).map((question) => ({
      category: classifyQuestion(question),
      question
    }))
  });
}

fs.writeFileSync(path.join(root, "public", "50-day-plan.json"), `${JSON.stringify(base, null, 2)}\n`);

let markdown = [
  "# 50-Day Senior Interview Preparation Plan",
  "",
  "Actual experience: **7 years**. Interview calibration: **10–15-year scope and depth** without misrepresenting tenure. Compensation target: **₹25 LPA**.",
  "",
  "## Document Index",
  "",
  "### Topic Index",
  "",
  ...topicSections.map((topic, index) => `${index + 1}. [${topic}](#${markdownAnchor(topic)})`),
  "",
  "### Day Index",
  "",
  ...base.map((day) => `${day.day}. [${day.title}](#${markdownAnchor(day.title)})`),
  "",
  "## Topic-Wise Question Bank",
  ""
].join("\n");

const questionsByTopic = new Map(topicSections.map((topic) => [topic, new Map()]));
for (const day of base) {
  for (const item of day.questions) {
    const topic = classifyQuestion(item.question, item.category);
    if (!questionsByTopic.get(topic).has(item.question)) {
      questionsByTopic.get(topic).set(item.question, day.day);
    }
  }
}

topicSections.forEach((topic, topicIndex) => {
  const questions = [...questionsByTopic.get(topic).entries()];
  markdown += `<a id="${markdownAnchor(topic)}"></a>\n`;
  markdown += `### ${topicIndex + 1}. ${topic} (${questions.length})\n\n`;
  questions.forEach(([question, day], index) => {
    markdown += `${index + 1}. ${question} _(Day ${day})_\n`;
  });
  markdown += "\n";
});

markdown += "## 50-Day Schedule\n\n";
for (const day of base) {
  markdown += `<a id="${markdownAnchor(day.title)}"></a>\n`;
  markdown += `### ${day.title}\n\n`;
  day.questions.forEach((item, index) => {
    markdown += `${index + 1}. **${item.category}** — ${item.question}\n`;
  });
  markdown += "\n";
}
fs.writeFileSync(path.join(root, "50-day-interview-plan.md"), markdown);

console.log(JSON.stringify({
  days: base.length,
  lastDay: base.at(-1).day,
  addedQuestions: base.slice(30).reduce((count, day) => count + day.questions.length, 0)
}, null, 2));
