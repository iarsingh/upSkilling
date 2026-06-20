const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const calendarPath = path.join(root, "content-calendar.json");
const postsDir = path.join(root, "posts");
const statePath = path.join(root, "publish-state.json");
const linkedinProfile = "https://www.linkedin.com/in/iamarsingh/";

const days = Number(process.argv[2] || process.env.DAYS || 60);
const startDate = process.argv[3] || process.env.START_DATE || todayInTimezone();

const streams = [
  {
    key: "mlops",
    slot: "09:30",
    pillar: "MLOps Series",
    audience: "MLOps, ML platform, DevOps, and cloud engineers",
    hashtags: ["#MLOps", "#MachineLearning", "#MLPlatform", "#DevOps"],
    topics: [
      "Model registry approvals and controlled production releases",
      "Canary deployment strategy for machine learning models",
      "Feature store governance for production ML",
      "MLflow and Kubeflow pipeline design for reproducibility",
      "Model monitoring signals every ML platform should track",
      "Automated retraining triggers using drift and performance metrics",
      "Data drift vs concept drift explained clearly",
      "Building audit-ready ML lineage on cloud platforms",
      "Batch inference vs real-time inference tradeoffs",
      "Rollback strategy for bad model releases",
      "Model serving on Kubernetes with FastAPI",
      "Vertex AI vs self-managed GKE for ML workloads",
      "Inference latency troubleshooting workflow",
      "Feature pipeline quality checks before training",
      "Production checklist for ML model deployment",
    ],
  },
  {
    key: "k8s",
    slot: "14:30",
    pillar: "Kubernetes Series",
    audience: "DevOps, platform, SRE, and cloud-native engineers",
    hashtags: ["#Kubernetes", "#DevOps", "#PlatformEngineering", "#CloudNative"],
    topics: [
      "Kubernetes requests and limits explained with production examples",
      "How HPA, VPA, and Cluster Autoscaler work together",
      "Pod disruption budgets for reliable deployments",
      "Debugging CrashLoopBackOff step by step",
      "Readiness probes vs liveness probes in real workloads",
      "Secrets management patterns for Kubernetes platforms",
      "Designing namespaces for multi-team platforms",
      "Kubernetes RBAC mistakes that create security risk",
      "Ingress troubleshooting for production applications",
      "ImagePullBackOff debugging checklist",
      "NetworkPolicy design for safer workloads",
      "Helm values structure for repeatable deployments",
      "GKE node pool upgrade strategy",
      "Kubernetes service discovery explained practically",
      "Production checklist before deploying to Kubernetes",
    ],
  },
  {
    key: "python",
    slot: "19:30",
    pillar: "Python Automation Series",
    audience: "DevOps, Cloud, SRE, MLOps, and backend learners",
    hashtags: ["#Python", "#DevOps", "#MLOps", "#CloudComputing", "#Automation"],
    topics: [
      "Python automation for real engineering work",
      "Build a log analyzer with Python",
      "Python file and folder automation",
      "Python cloud cost reporting",
      "Python Kubernetes health checks",
      "Python CI/CD validation scripts",
      "Python API health monitoring",
      "Python Excel and CSV automation",
      "Python SRE incident summaries",
      "Python MLOps data drift checks",
      "Python security checks for config files",
      "Python helpers inside GitHub Actions",
      "Python infrastructure inventory reports",
      "Python CLI tools for DevOps engineers",
      "Python learning roadmap for DevOps and MLOps",
    ],
  },
];

function todayInTimezone(timezone = "Asia/Kolkata") {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function addDays(dateString, offset) {
  const date = new Date(`${dateString}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

function renderPost(stream, topic, streamDay) {
  const intro = {
    mlops:
      "Production MLOps is not only training a model. It is the release system around model, data, features, monitoring, rollback, and ownership.",
    k8s:
      "Kubernetes becomes powerful when we treat it as a reliability platform, not just a place to run containers.",
    python:
      "Python becomes career-changing when you use it to remove manual engineering work, not only to solve syntax exercises.",
  }[stream.key];

  const checklist = {
    mlops: [
      "Track model version, data version, feature version, and code version together.",
      "Define approval, deployment, monitoring, and rollback before production.",
      "Monitor latency, errors, throughput, prediction distribution, and drift.",
      "Keep experiments, artifacts, and production releases auditable.",
      "Document the failure mode before it becomes an incident.",
    ],
    k8s: [
      "Validate requests, limits, probes, rollout strategy, and autoscaling together.",
      "Check events, logs, endpoints, DNS, and resource pressure during incidents.",
      "Use namespaces, RBAC, NetworkPolicy, and secrets deliberately.",
      "Design rollback before every risky deployment.",
      "Make dashboards and alerts match user-facing reliability.",
    ],
    python: [
      "Start with one repeated manual task.",
      "Read input safely from files, APIs, CLI flags, or environment variables.",
      "Add timeout, retry, logging, and clear error messages.",
      "Print a useful report before automating destructive actions.",
      "Run the script in CI or cron only after testing edge cases.",
    ],
  }[stream.key];

  const cta = {
    mlops: "What MLOps failure mode have you seen most often in real projects?",
    k8s: "Which Kubernetes issue has taken the most time for you to debug?",
    python: "Which manual DevOps task would you automate first with Python?",
  }[stream.key];

  return `${topic}

Day ${streamDay}/${days} of my ${stream.pillar}.

${intro}

Practical checklist:
${checklist.map((item, index) => `${index + 1}. ${item}`).join("\n")}

My learning note:
Small platform improvements compound when they are automated, observable, and easy for teams to repeat.

${cta}

${stream.hashtags.join(" ")}`;
}

function writeDraft(item) {
  const slug = `${item.date}-${item.id}-${slugify(item.topic)}`;
  const filePath = path.join(postsDir, `${slug}.md`);
  const content = [
    "---",
    `date: ${item.date}`,
    `slot: ${item.slot}`,
    `day: ${item.day}`,
    `series: ${item.pillar}`,
    `topic: ${item.topic}`,
    `linkedinProfile: ${linkedinProfile}`,
    "status: scheduled",
    "---",
    "",
    item.text,
  ].join("\n");
  fs.writeFileSync(filePath, content, "utf8");
  return filePath;
}

fs.mkdirSync(postsDir, { recursive: true });

const items = [];
for (let index = 0; index < days; index += 1) {
  const date = addDays(startDate, index);
  for (const stream of streams) {
    const topic = stream.topics[index % stream.topics.length];
    const item = {
      id: `${date}-${stream.key}`,
      day: index + 1,
      date,
      slot: stream.slot,
      pillar: stream.pillar,
      audience: stream.audience,
      topic,
      baseTopic: topic,
      angle: "daily practical note",
      hashtags: stream.hashtags,
      linkedinProfile,
      status: "scheduled",
      text: renderPost(stream, topic, index + 1),
    };
    item.draftPath = path.relative(root, writeDraft(item));
    items.push(item);
  }
}

fs.writeFileSync(
  calendarPath,
  JSON.stringify(
    {
      createdAt: new Date().toISOString(),
      schedule: "three-posts-per-day",
      days,
      startDate,
      items,
    },
    null,
    2,
  ),
  "utf8",
);

if (!fs.existsSync(statePath)) {
  fs.writeFileSync(statePath, JSON.stringify({ published: [] }, null, 2), "utf8");
}

console.log(`Scheduled ${items.length} posts across ${days} days starting ${startDate}`);
