const fs = require("fs");
const path = require("path");
const { aiEngineerInterviewTopics } = require("../src/ai-engineer-interview-topics");
const { root } = require("../src/config");

const startDate = process.argv[2] || "2027-09-10";
const manifestPath = path.join(root, "ai-engineer-revision-manifest.json");
const calendarPath = path.join(root, "ai-engineer-revision-calendar.json");
const indexPath = path.join(root, "AI-ENGINEER-REVISION-INDEX.md");

function dateForSequence(sequence) {
  const date = new Date(`${startDate}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + sequence - 1);
  return date.toISOString().slice(0, 10);
}

const manifest = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
  : { items: [] };
const generated = new Map(manifest.items.map((item) => [item.sequence, item]));

const items = aiEngineerInterviewTopics.map((topic, index) => {
  const sequence = index + 1;
  const existing = generated.get(sequence);
  const date = dateForSequence(sequence);
  if (existing?.postPath && fs.existsSync(path.join(root, existing.postPath))) {
    const postPath = path.join(root, existing.postPath);
    const content = fs.readFileSync(postPath, "utf8");
    const dated = /^date:/m.test(content)
      ? content.replace(/^date:.*$/m, `date: ${date}`)
      : content.replace(`sequence: ${sequence}\n`, `sequence: ${sequence}\ndate: ${date}\n`);
    fs.writeFileSync(postPath, dated, "utf8");
  }
  return {
    sequence,
    date,
    level: topic.match(/^\[([^\]]+)\]/)?.[1] || "Intermediate",
    topic,
    status: "draft",
    publish: false,
    postPath: existing?.postPath || "",
    imagePath: existing?.imagePath || ""
  };
});

fs.writeFileSync(calendarPath, `${JSON.stringify({
  series: "AI Engineer Revision Series",
  purpose: "date-ordered private revision drafts",
  publishingEnabled: false,
  cadence: "daily ordering only",
  startDate,
  endDate: items.at(-1).date,
  total: items.length,
  items
}, null, 2)}\n`, "utf8");

const indexLines = [
  "# AI Engineer Revision Series Index",
  "",
  "> Private draft plan only. Publishing is disabled. Dates indicate revision order and do not trigger LinkedIn posting.",
  "",
  `- Start: ${startDate}`,
  `- End: ${items.at(-1).date}`,
  `- Total: ${items.length} drafts`,
  `- Order: Beginner → Intermediate → Advanced → Expert`,
  "",
  "| # | Date | Level | Content | Status |",
  "|---:|:---|:---|:---|:---|",
  ...items.map((item) => {
    const cleanTopic = item.topic.replace(/^\[[^\]]+\]\s*/, "").replace(/\|/g, "\\|");
    return `| ${item.sequence} | ${item.date} | ${item.level} | ${cleanTopic} | Draft — do not publish |`;
  }),
  ""
];
fs.writeFileSync(indexPath, indexLines.join("\n"), "utf8");

console.log(`Scheduled ${items.length} posts from ${startDate} through ${items.at(-1).date}.`);
console.log(`Calendar: ${calendarPath}`);
console.log(`Index: ${indexPath}`);
