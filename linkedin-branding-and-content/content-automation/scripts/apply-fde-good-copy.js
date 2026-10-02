#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { createImage } = require("../src/image");
const { root } = require("../src/config");
const copyA = require("./fde-good-copy-a");
const copyB = require("./fde-good-copy-b");
const copyC = require("./fde-good-copy-c");

const copy = { ...copyA, ...copyB, ...copyC };
const accent = "#0f766e";
const pale = "#ccfbf1";
const footer = "Akhilesh Ranjan Singh  ·  Forward Deployed";
const caption = "Say it in this order ↓";
const keyPattern = /-fde-(harborline|clinic|ledger|parts|outage|vendor)-([a-z]+)\.md$/;

const diagrams = {
  workflow: ["Name user", "One case", "Real file", "One ask", "No model", "Write it"],
  constraint: ["Wanted it", "They refused", "Cut feature", "Write rule", "Lock eval", "Leave it"],
  roi: ["They ask", "Too big", "Small number", "Name judge", "Say no", "One page"],
  overturn: ["Eval green", "Expert no", "Stop desk", "Fix rule", "Add row", "Replay"],
  stakeholders: ["Two risks", "No average", "One decider", "Write today", "Small tonight", "Hold rest"],
  export: ["Real file", "Show raw", "Name formula", "Leave blank", "Ask owner", "Then score"],
  audit: ["No raw text", "Keep the id", "Keep result", "Replay here", "Cut the join", "No second copy"],
  writeback: ["They ask", "Undo dies", "Stay read only", "Agree first", "Named writer", "Then maybe"],
  shadow: ["Old path on", "Sit beside", "Count misses", "Fix daily", "Then one desk", "Not the floor"],
  stop: ["Write stop", "Before demo", "One fatal output", "Pull tool", "Add test", "Then return"],
  rollback: ["Read only", "Turn it off", "Old path", "No cleanup", "Do it once", "Say it"],
  handoff: ["Their example", "They add row", "You watch once", "You leave", "Named owner", "No meeting"],
  scope: ["Three asks", "One job", "Name the rest", "Name condition", "Write readout", "Do not nod"],
  oldpath: ["Timer hit", "Watch one", "See why", "Change metric", "Keep check", "Call it honest"],
  unknown: ["New value", "Do not map", "Show blank", "Ask owner", "Add later", "No guess"],
  replay: ["Run twice", "Same total", "No second act", "Easy dup", "Hard dup", "Stop if moves"],
  access: ["One person", "Read only", "No shared link", "Split views", "Second id waits", "Name who"],
  egress: ["No client", "Read disk", "They watch", "One lookup", "Name them", "Then trust"],
  readout: ["Their words", "One row", "The refusal", "The ask", "One page", "No roadmap"],
  demo: ["Ugly row first", "Show the gap", "Refuse click", "Then happy path", "No live config", "Policy holds"],
  tiebreak: ["Both right", "Not a tie", "Name decider", "Write same day", "Do not average", "Hold build"],
  metric: ["Baseline", "Target", "Judge", "Refusal", "Before code", "Sign it"],
  recompute: ["Show points", "On paper", "Same answer", "Screen loses", "No hidden state", "They teach"],
  incident: ["Stop desk", "Old path", "Find cause", "Add eval", "Replay", "Then restore"],
  leftover: ["Eval file", "The example", "The prohibition", "Named owner", "No roster", "One breath"]
};

function hashtagsOf(text) {
  return text.split("\n").filter(Boolean).at(-1).split(/\s+/).filter((tag) => tag.startsWith("#"));
}

function rewriteMarkdown(filePath, date, topic, text) {
  const markdown = `---
date: ${date}
slot: 08:00
series: FDE Interview Series
topic: ${topic}
status: scheduled
publish: true
image: ../../assets/${path.basename(filePath, ".md")}-doodle.png
---

${text}
`;
  fs.writeFileSync(filePath, markdown);
}

const calendarPath = path.join(root, "content-calendar.json");
const calendar = JSON.parse(fs.readFileSync(calendarPath, "utf8"));
const fdeItems = calendar.items.filter((item) => item.pillar === "FDE Interview Series");
let rewritten = 0;

for (const item of fdeItems) {
  const match = item.draftPath.match(keyPattern);
  if (!match) continue;
  const key = `${match[1]}-${match[2]}`;
  const next = copy[key];
  if (!next) throw new Error(`Missing copy for ${key}`);
  item.topic = next.topic;
  item.baseTopic = next.topic;
  item.text = next.text.trim();
  item.hashtags = hashtagsOf(item.text);
  item.footer = footer;
  item.caption = caption;
  item.diagram = {
    label: "FDE SCENARIO",
    nodes: diagrams[match[2]],
    detail: next.topic,
    accent,
    pale,
    icon: "bulb"
  };
  const fullPath = path.join(root, item.draftPath);
  rewriteMarkdown(fullPath, item.date, next.topic, item.text);
  createImage({
    pillar: "FDE Interview Series",
    topic: next.topic,
    footer,
    caption,
    diagram: item.diagram
  }, path.basename(item.draftPath, ".md") + "-doodle");
  rewritten += 1;
  if (rewritten % 20 === 0) console.log(`Rewrote ${rewritten}`);
}

const handOrder = [
  "2026-10-05-fde-start-from-the-workflow.md",
  "2026-10-06-fde-constraint-deletes-the-design.md",
  "2026-10-07-fde-security-bans-the-model.md",
  "2026-10-08-fde-do-not-invent-the-roi.md",
  "2026-10-09-fde-operator-overturns-the-score.md",
  "2026-10-12-fde-two-stakeholders-one-week.md",
  "2026-10-13-fde-export-missing-a-column.md",
  "2026-10-14-fde-audit-log-refuses-to-store.md",
  "2026-10-15-fde-do-not-write-back.md",
  "2026-10-16-fde-rollout-and-rollback.md"
];
const byFile = new Map(fdeItems.map((item) => [path.basename(item.draftPath), item]));
const hand = handOrder.map((name) => {
  const item = byFile.get(name);
  if (!item) throw new Error(`Missing handwritten ${name}`);
  return item;
});
const themeNames = Object.keys(diagrams);
const buckets = new Map(themeNames.map((theme) => [theme, []]));
for (const item of fdeItems) {
  if (hand.includes(item)) continue;
  const theme = item.draftPath.match(keyPattern)[2];
  buckets.get(theme).push(item);
}
const robin = [];
let pending = true;
while (pending) {
  pending = false;
  for (const theme of themeNames) {
    const bucket = buckets.get(theme);
    if (bucket.length) {
      robin.push(bucket.shift());
      pending = true;
    }
  }
}
const ordered = [...hand, ...robin];
if (ordered.length !== 150) throw new Error(`Ordered ${ordered.length}`);
const slots = fdeItems.map((item) => item.date).sort();
ordered.forEach((item, index) => {
  item.date = slots[index];
  item.id = `${slots[index]}-fde`;
  item.day = index + 1;
  const fullPath = path.join(root, item.draftPath);
  const markdown = fs.readFileSync(fullPath, "utf8").replace(/^date: .+$/m, `date: ${item.date}`);
  fs.writeFileSync(fullPath, markdown);
});

const seen = new Set();
for (const item of calendar.items) {
  if (seen.has(item.date)) throw new Error(`Duplicate date ${item.date}`);
  seen.add(item.date);
}
fs.writeFileSync(calendarPath, `${JSON.stringify(calendar, null, 2)}\n`);

const scheduled = ordered;
fs.writeFileSync(path.join(root, "fde-series", "fde-content-calendar.json"), `${JSON.stringify({
  series: "FDE Interview Series",
  status: "scheduled",
  wiredToDailyPublisher: true,
  cadence: "alternate-days",
  count: scheduled.length,
  startDate: scheduled[0].date,
  endDate: scheduled[scheduled.length - 1].date,
  note: "150 posts on alternate days. The first 10 are the original scenarios. The other 140 are separate cases, rotated so the same lesson does not run back to back.",
  items: scheduled.map((item) => ({
    date: item.date,
    day: item.day,
    topic: item.topic,
    draftPath: item.draftPath,
    imagePath: item.imagePath
  }))
}, null, 2)}\n`);

console.log(`Rewrote ${rewritten} posts. First five:`);
scheduled.slice(0, 8).forEach((item) => console.log(`${item.date} ${item.topic}`));
console.log("...");
scheduled.slice(10, 16).forEach((item) => console.log(`${item.date} ${item.topic}`));
