const fs = require("fs");
const path = require("path");
const { postsDir, assetsDir, root, linkedinProfileUrl } = require("./config");
const { buildTopicCalendar } = require("./topics");
const { createImage } = require("./image");
const { renderLinkedInText } = require("./generator");

const calendarPath = path.join(root, "content-calendar.json");
const statePath = path.join(root, "publish-state.json");

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

function ensureDirs() {
  fs.mkdirSync(postsDir, { recursive: true });
  fs.mkdirSync(assetsDir, { recursive: true });
}

function postFromCalendarItem(item) {
  const topic = item.baseTopic || item.topic;
  const angle = item.angle || "practical checklist";
  const hookMap = {
    "practical checklist": `A practical checklist for ${topic}`,
    "common production mistake": `A common mistake with ${topic}`,
    "beginner-friendly explanation": `${topic}, explained simply`,
    "architecture decision guide": `How to think about ${topic} as an architecture decision`,
    "debugging workflow": `A debugging workflow for ${topic}`,
    "security and governance angle": `The security and governance side of ${topic}`,
    "cost and reliability tradeoff": `The cost and reliability tradeoff behind ${topic}`,
    "interview-ready summary": `Interview-ready notes on ${topic}`,
    "real-world platform pattern": `A real-world platform pattern for ${topic}`,
    "monitoring and operations view": `The operations view of ${topic}`
  };

  const patterns = {
    Kubernetes: {
      answer: `Treat Kubernetes as the operating layer for reliability, not just a place to run containers. The goal is to make workload behavior explicit through resources, rollout rules, probes, autoscaling, and ownership boundaries.`,
      flow: [
        "Developer commits app and Kubernetes manifests",
        "CI builds image, scans it, and pushes to registry",
        "GitOps or CD applies Helm/Kustomize changes to the cluster",
        "Scheduler places pods based on requests, limits, taints, and affinities",
        "Probes, autoscaling, logs, metrics, and alerts close the operations loop"
      ],
      secondBullet: "Validate requests, limits, probes, rollout strategy, autoscaling rules, and failure behavior together."
    },
    MLOps: {
      answer: `Production MLOps is a release system for models, data, and features. A good platform connects training, registry approval, deployment, monitoring, rollback, and retraining into one governed workflow.`,
      flow: [
        "Raw data lands in the offline store with quality checks",
        "Feature pipeline writes reusable features to offline and online stores",
        "Training pipeline logs metrics, artifacts, lineage, and model version",
        "Model registry enforces approval before staging or production",
        "Serving, monitoring, drift checks, and rollback policies protect production"
      ],
      secondBullet: "Track dataset version, feature version, code version, model metrics, approver, and deployment target together."
    },
    "Data Science": {
      answer: `A model is only useful when the data, metric, and business decision are aligned. Strong data science work makes assumptions visible before training and keeps validation close to real-world usage.`,
      flow: [
        "Define the business decision and cost of wrong predictions",
        "Profile data quality, leakage, missingness, and sampling bias",
        "Split data using a strategy that matches production usage",
        "Evaluate with technical metrics and business-facing tradeoffs",
        "Package explanations, limitations, and monitoring signals for deployment"
      ],
      secondBullet: "Check leakage, drift, missing values, metric choice, and business impact before trusting the model."
    },
    "IT Engineering": {
      answer: `Reliable engineering comes from repeatable operating systems: clear ownership, automated delivery, observable services, and documented recovery paths. The best platforms reduce surprises during change.`,
      flow: [
        "Plan the change with ownership, risk, and rollback defined",
        "Automate provisioning, deployment, validation, and audit trails",
        "Expose user-facing health through metrics, logs, traces, and alerts",
        "Practice incident response with runbooks and post-incident learning",
        "Feed reliability and cost signals back into platform improvements"
      ],
      secondBullet: "Define ownership, rollback path, alert signal, and audit trail before scaling the process."
    }
  };

  const patternKey = Object.keys(patterns).find((key) => item.pillar.includes(key)) || "IT Engineering";
  const pattern = patterns[patternKey];

  const bullets = [
    `Define the production problem before choosing the tool or pattern.`,
    pattern.secondBullet,
    `Measure the result with one reliability metric and one delivery metric.`,
    `Keep implementation repeatable through automation, documentation, and review.`,
    `Make the failure mode visible before it becomes an incident.`
  ];

  return {
    hook: hookMap[angle] || `${topic}: a practical engineering note`,
    body: `Day ${item.day}/100 of my ${item.pillar}. This note is for ${item.audience} who want simple, production-minded ways to improve engineering systems.`,
    answer: pattern.answer,
    flow: pattern.flow,
    bullets,
    cta: "What would you add from your production experience?",
    hashtags: item.hashtags,
    imageTitle: `${item.pillar} | Day ${item.day}`,
    imageSubtitle: topic
  };
}

function writeDraft(item, post, text, image) {
  const slug = `${item.date}-${item.id}-${slugify(item.baseTopic || item.topic)}`;
  const filePath = path.join(postsDir, `${slug}.md`);
  const content = [
    "---",
    `date: ${item.date}`,
    `day: ${item.day}`,
    `series: ${item.pillar}`,
    `topic: ${item.topic}`,
    `linkedinProfile: ${linkedinProfileUrl}`,
    `image: ${path.relative(postsDir, image.pngPath)}`,
    "status: scheduled",
    "---",
    "",
    text
  ].join("\n");
  fs.writeFileSync(filePath, content, "utf8");
  return filePath;
}

function prepareCalendar(days = 100, startDate = new Date()) {
  ensureDirs();
  const items = buildTopicCalendar(days, startDate).map((item) => {
    const post = postFromCalendarItem(item);
    const text = renderLinkedInText(post);
    const slug = `${item.date}-${item.id}-${slugify(item.baseTopic || item.topic)}`;
    const image = createImage(post, slug);
    const draftPath = writeDraft(item, post, text, image);
    return {
      ...item,
      linkedinProfile: linkedinProfileUrl,
      status: "scheduled",
      draftPath: path.relative(root, draftPath),
      imagePath: path.relative(root, image.pngPath),
      text
    };
  });

  fs.writeFileSync(calendarPath, JSON.stringify({ createdAt: new Date().toISOString(), days, items }, null, 2), "utf8");
  if (!fs.existsSync(statePath)) {
    fs.writeFileSync(statePath, JSON.stringify({ published: [] }, null, 2), "utf8");
  }
  return items;
}

function loadCalendar() {
  if (!fs.existsSync(calendarPath)) {
    return { createdAt: "", days: 0, items: [] };
  }
  return JSON.parse(fs.readFileSync(calendarPath, "utf8"));
}

function loadState() {
  if (!fs.existsSync(statePath)) return { published: [] };
  return JSON.parse(fs.readFileSync(statePath, "utf8"));
}

function saveState(state) {
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2), "utf8");
}

function nextDueItem(date = new Date()) {
  const today = date.toISOString().slice(0, 10);
  const calendar = loadCalendar();
  const state = loadState();
  const publishedIds = new Set(state.published.map((item) => item.id));
  return calendar.items.find((item) => item.date <= today && !publishedIds.has(item.id))
    || calendar.items.find((item) => !publishedIds.has(item.id));
}

function markPublished(item, linkedInId) {
  const state = loadState();
  state.published.push({
    id: item.id,
    date: item.date,
    publishedAt: new Date().toISOString(),
    linkedInId
  });
  saveState(state);
}

module.exports = {
  calendarPath,
  statePath,
  prepareCalendar,
  postFromCalendarItem,
  writeDraft,
  loadCalendar,
  loadState,
  nextDueItem,
  markPublished
};
