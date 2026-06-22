const pillars = [
  {
    name: "Kubernetes",
    audience: "platform engineers",
    hashtags: ["#Kubernetes", "#DevOps", "#CloudNative"],
    topics: [
      "Kubernetes requests and limits for production workloads",
      "HPA, VPA, and Cluster Autoscaler together",
      "Pod disruption budgets for reliable releases",
      "RBAC mistakes that create production risk",
      "CrashLoopBackOff debugging workflow",
      "Namespaces for multi-team platforms",
      "Readiness vs liveness probes"
    ]
  },
  {
    name: "MLOps",
    audience: "ML platform engineers",
    hashtags: ["#MLOps", "#MachineLearning", "#AI"],
    topics: [
      "Model registry approvals for production ML",
      "Canary deployment for machine learning models",
      "Feature store governance",
      "MLflow and Kubeflow reproducibility",
      "Model monitoring signals",
      "Automated retraining triggers",
      "Audit-ready ML lineage"
    ]
  },
  {
    name: "Infrastructure",
    audience: "cloud engineers",
    hashtags: ["#Terraform", "#SRE", "#PlatformEngineering"],
    topics: [
      "Terraform review checklist",
      "GitOps workflow design",
      "Secrets management in Kubernetes",
      "Cloud cost optimization habits",
      "CI/CD release safety",
      "Observability signals for incidents",
      "SLO design for engineering teams"
    ]
  },
  {
    name: "Data Science",
    audience: "data and ML practitioners",
    hashtags: ["#DataScience", "#MachineLearning", "#Analytics"],
    topics: [
      "Data leakage in production ML",
      "Train validation test split patterns",
      "Feature engineering habits",
      "Classification metrics beyond accuracy",
      "Class imbalance in production datasets",
      "Data drift vs concept drift",
      "Communicating model results"
    ]
  }
];

const angles = [
  "practical answer",
  "architecture flow",
  "production checklist",
  "debugging workflow",
  "governance pattern",
  "reliability tradeoff",
  "interview-ready summary"
];

const { ymd } = require("./dates");

function addDays(date, offset) {
  const next = new Date(date);
  next.setDate(next.getDate() + offset);
  return next;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}

function pickTopic(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const day = Math.floor((date - start) / 86400000);
  const pillar = pillars[day % pillars.length];
  const topic = pillar.topics[Math.floor(day / pillars.length) % pillar.topics.length];
  return {
    date: ymd(date),
    pillar: pillar.name,
    audience: pillar.audience,
    topic,
    angle: angles[day % angles.length],
    hashtags: pillar.hashtags
  };
}

function buildTopicCalendar(days = 30, startDate = new Date()) {
  return Array.from({ length: days }, (_, index) => {
    const date = addDays(startDate, index);
    const pillar = pillars[index % pillars.length];
    const baseTopic = pillar.topics[Math.floor(index / pillars.length) % pillar.topics.length];
    return {
      id: `day-${String(index + 1).padStart(3, "0")}`,
      day: index + 1,
      date: ymd(date),
      pillar: pillar.name,
      audience: pillar.audience,
      topic: baseTopic,
      angle: angles[index % angles.length],
      hashtags: pillar.hashtags,
      slug: `${ymd(date)}-${slugify(baseTopic)}`
    };
  });
}

module.exports = { pillars, pickTopic, buildTopicCalendar, slugify };
