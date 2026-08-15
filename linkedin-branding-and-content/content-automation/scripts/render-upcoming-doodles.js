#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { createImage } = require("../src/image");
const { root } = require("../src/config");

const calendarPath = path.join(root, "content-calendar.json");
const calendar = JSON.parse(fs.readFileSync(calendarPath, "utf8"));
const startDate = process.argv.find((arg) => arg.startsWith("--from="))?.split("=")[1]
  || new Intl.DateTimeFormat("en-CA", {
    timeZone: process.env.TIMEZONE || "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());

const items = calendar.items.filter((item) => item.date >= startDate && item.status !== "archived");
let rendered = 0;

for (const item of items) {
  const stem = item.draftPath
    ? path.basename(item.draftPath, path.extname(item.draftPath))
    : item.id;
  createImage({
    pillar: item.pillar,
    topic: item.baseTopic || item.topic,
    imageTitle: item.pillar,
    imageSubtitle: item.topic
  }, `${stem}-doodle`);
  rendered++;
  if (rendered % 25 === 0 || rendered === items.length) {
    console.log(`Rendered ${rendered}/${items.length}`);
  }
}

console.log(`Done: ${rendered} doodles generated for active posts from ${startDate}.`);
