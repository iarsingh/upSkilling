#!/usr/bin/env node
// Regenerates captions for upcoming carousel entries without touching anything already posted.
// Usage: node recaption.js            (dry run)
//        node recaption.js --apply
//        node recaption.js --after 2026-10-08

const fs = require("fs");
const path = require("path");
const { buildPlan } = require("./plan");
const { postText } = require("./caption");
const { draftMarkdown } = require("./schedule");

const ROOT = path.resolve(__dirname, "..");
const CALENDAR = path.join(ROOT, "content-calendar.json");
const STATE = path.join(ROOT, "publish-state.json");
const LIMIT = 3000;

function arg(name) {
  const i = process.argv.indexOf(name);
  return i === -1 ? null : process.argv[i + 1];
}

function main() {
  const apply = process.argv.includes("--apply");
  const after = arg("--after") || new Date().toISOString().slice(0, 10);
  const plan = new Map(buildPlan().map((c) => [c.id, c]));
  const calendar = JSON.parse(fs.readFileSync(CALENDAR, "utf8"));
  const published = new Set(JSON.parse(fs.readFileSync(STATE, "utf8")).published.map((p) => p.id));

  const targets = calendar.items.filter((item) =>
    item.contentFormat === "carousel" && item.date > after && !published.has(item.id) && plan.has(item.id));
  const lengths = [];
  for (const item of targets) {
    item.text = postText(plan.get(item.id));
    lengths.push(item.text.length);
    if (item.text.length > LIMIT) throw new Error(`${item.id} caption is ${item.text.length} chars (limit ${LIMIT})`);
  }

  console.log(`recaption ${targets.length} carousel entries dated after ${after} (${targets[0]?.date} \u2192 ${targets[targets.length - 1]?.date})`);
  console.log(`caption length: min ${Math.min(...lengths)}, max ${Math.max(...lengths)} of ${LIMIT}`);
  if (!apply) {
    console.log("dry run \u2014 pass --apply to write");
    return;
  }
  for (const item of targets) fs.writeFileSync(path.join(ROOT, item.draftPath), draftMarkdown(item));
  fs.writeFileSync(CALENDAR, JSON.stringify(calendar, null, 2));
  console.log("applied");
}

main();
