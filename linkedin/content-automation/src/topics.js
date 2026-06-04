const pillars = [
  {
    name: "Kubernetes Series",
    audience: "DevOps and platform engineers",
    topics: [
      "Kubernetes requests and limits explained with production examples",
      "How HPA, VPA, and Cluster Autoscaler work together",
      "Pod disruption budgets for reliable deployments",
      "Kubernetes RBAC mistakes that create security risk",
      "Debugging CrashLoopBackOff step by step",
      "Designing namespaces for multi-team platforms",
      "Readiness probes vs liveness probes in real workloads"
    ],
    hashtags: ["#Kubernetes", "#DevOps", "#PlatformEngineering", "#CloudNative"]
  },
  {
    name: "MLOps Series",
    audience: "ML engineers and cloud engineers",
    topics: [
      "Model registry approvals and controlled production releases",
      "Canary deployment strategy for machine learning models",
      "Feature store governance for production ML",
      "MLflow and Kubeflow pipeline design for reproducibility",
      "Model monitoring signals every ML platform should track",
      "Automated retraining triggers using drift and performance metrics",
      "Building audit-ready ML lineage on cloud platforms"
    ],
    hashtags: ["#MLOps", "#MachineLearning", "#VertexAI", "#MLPlatform"]
  },
  {
    name: "Data Science Series",
    audience: "data scientists and ML practitioners",
    topics: [
      "Why data leakage silently breaks ML models",
      "Train validation test split patterns for real-world data",
      "Feature engineering habits that improve model quality",
      "Evaluating classification models beyond accuracy",
      "Handling class imbalance in production datasets",
      "Data drift vs concept drift explained clearly",
      "How to communicate model results to business teams"
    ],
    hashtags: ["#DataScience", "#MachineLearning", "#AI", "#Analytics"]
  },
  {
    name: "IT Engineering Series",
    audience: "cloud, DevOps, and SRE professionals",
    topics: [
      "SLI, SLO, and SLA explained for engineering teams",
      "Infrastructure as Code review checklist for Terraform",
      "CI/CD pipeline design for safer releases",
      "Observability signals that reduce incident response time",
      "Secrets management patterns for Kubernetes platforms",
      "Cloud cost optimization habits for engineering teams",
      "GitOps workflow design for production infrastructure"
    ],
    hashtags: ["#CloudComputing", "#SRE", "#CICD", "#InfrastructureAsCode"]
  }
];

const angles = [
  "practical checklist",
  "common production mistake",
  "beginner-friendly explanation",
  "architecture decision guide",
  "debugging workflow",
  "security and governance angle",
  "cost and reliability tradeoff",
  "interview-ready summary",
  "real-world platform pattern",
  "monitoring and operations view"
];

function dayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

function addDays(date, offset) {
  const next = new Date(date);
  next.setDate(next.getDate() + offset);
  return next;
}

function pickTopic(date = new Date()) {
  const day = dayOfYear(date);
  const pillar = pillars[day % pillars.length];
  const topic = pillar.topics[Math.floor(day / pillars.length) % pillar.topics.length];
  return {
    pillar: pillar.name,
    audience: pillar.audience,
    topic,
    hashtags: pillar.hashtags
  };
}

function buildTopicCalendar(days = 100, startDate = new Date()) {
  return Array.from({ length: days }, (_, index) => {
    const date = addDays(startDate, index);
    const pillar = pillars[index % pillars.length];
    const baseTopic = pillar.topics[Math.floor(index / pillars.length) % pillar.topics.length];
    const angle = angles[index % angles.length];
    return {
      id: `day-${String(index + 1).padStart(3, "0")}`,
      day: index + 1,
      date: date.toISOString().slice(0, 10),
      pillar: pillar.name,
      audience: pillar.audience,
      topic: `${baseTopic} - ${angle}`,
      baseTopic,
      angle,
      hashtags: pillar.hashtags
    };
  });
}

module.exports = { pillars, pickTopic, buildTopicCalendar };
