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

  const bullets = [
    `Define the production problem before choosing the tool or pattern.`,
    `Write down the ownership boundary, rollback path, and failure signal.`,
    `Measure the result with one reliability metric and one delivery metric.`,
    `Keep the implementation repeatable through automation and documentation.`
  ];

  if (item.pillar.includes("Kubernetes")) {
    bullets[1] = "Validate the behavior with requests, limits, probes, rollout strategy, and autoscaling rules.";
  } else if (item.pillar.includes("MLOps")) {
    bullets[1] = "Track dataset version, code version, model metrics, approver, and deployment target together.";
  } else if (item.pillar.includes("Data Science")) {
    bullets[1] = "Check leakage, drift, missing values, metric choice, and business impact before trusting the model.";
  }

  return {
    hook: hookMap[angle] || `${topic}: a practical engineering note`,
    body: `Day ${item.day}/100 of my ${item.pillar}. This note is for ${item.audience} who want simple, production-minded ways to improve engineering systems.`,
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
  loadCalendar,
  nextDueItem,
  markPublished
};
