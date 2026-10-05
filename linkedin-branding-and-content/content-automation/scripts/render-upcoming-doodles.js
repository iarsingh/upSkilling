#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { createImage } = require("../src/image");
const { root } = require("../src/config");
const { diagrams } = require("../src/fde-diagrams");
const { contentDiagram } = require("../src/content-diagrams");

const calendarPath = path.join(root, "content-calendar.json");
const calendar = JSON.parse(fs.readFileSync(calendarPath, "utf8"));
const startDate = process.argv.find((arg) => arg.startsWith("--from="))?.split("=")[1]
  || new Intl.DateTimeFormat("en-CA", {
    timeZone: process.env.TIMEZONE || "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());

const statePath = path.join(root, "publish-state.json");
const published = fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath, "utf8")).published || [] : [];
const publishedIds = new Set(published.map((entry) => entry.id));
const fdeCalendar = JSON.parse(fs.readFileSync(path.join(root, "fde-series", "fde-content-calendar.json"), "utf8"));
const originalDrills = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q12"];
const fdeDiagrams = new Map(fdeCalendar.items.map((item) => [
  path.basename(item.draftPath, path.extname(item.draftPath)),
  diagrams[item.drill || originalDrills[item.day - 1]]
]));
const pillarFilter = process.argv.find((arg) => arg.startsWith("--pillar="))?.slice("--pillar=".length);
const items = calendar.items.filter((item) => item.date >= startDate && !["archived", "published"].includes(item.status) && !publishedIds.has(item.id) && (!pillarFilter || item.pillar === pillarFilter));
let rendered = 0;

for (const item of items) {
  const stem = item.draftPath
    ? path.basename(item.draftPath, path.extname(item.draftPath))
    : item.id;
  const scenario = fdeDiagrams.get(stem);
  const diagram = scenario
    ? { ...scenario, layout: "flow", accent: "#0f766e", pale: "#ccfbf1" }
    : contentDiagram(item) || item.diagram;
  createImage({
    ...item,
    pillar: item.pillar,
    topic: item.baseTopic || item.topic,
    imageTitle: item.pillar,
    imageSubtitle: item.topic,
    ...(diagram ? { diagram } : {})
  }, `${stem}-doodle`);
  rendered++;
  if (rendered % 25 === 0 || rendered === items.length) {
    console.log(`Rendered ${rendered}/${items.length}`);
  }
}

console.log(`Done: ${rendered} doodles generated for active posts from ${startDate}.`);
