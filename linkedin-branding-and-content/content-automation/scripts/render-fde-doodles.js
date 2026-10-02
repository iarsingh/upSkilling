#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { createImage } = require("../src/image");
const { root } = require("../src/config");

const seriesDir = path.join(root, "fde-series");
const calendarPath = path.join(seriesDir, "fde-content-calendar.json");
const calendar = JSON.parse(fs.readFileSync(calendarPath, "utf8"));

const accent = "#0f766e";
const pale = "#ccfbf1";
const footer = "Akhilesh Ranjan Singh  ·  Forward Deployed";

const diagrams = {
  Q1: { label: "FDE DISCOVERY", nodes: ["Night desk", "One walk", "Name files", "One question", "A metric", "No model"], detail: "Leave with the user, the file, and the question. Not a model name.", icon: "bulb" },
  Q2: { label: "DROP THE DESIGN", nodes: ["Wanted ranker", "Lead says no", "Write rule", "Medical first", "Lock eval", "Do not revive"], detail: "A constraint has to delete a design, or it was not a constraint.", icon: "gear" },
  Q3: { label: "NO MODEL API", nodes: ["Ban egress", "Read disk", "Show points", "Cite the SOP", "No client", "IT watches"], detail: "A local model is still not something the night lead can recompute.", icon: "cloud" },
  Q4: { label: "OWN A SMALL NUMBER", nodes: ["VP asks", "Do not invent", "25-40 min", "20 lookups", "9 of 10", "Refuse ROI"], detail: "Missed deliveries explain why they care. This week cannot prove them.", icon: "rocket" },
  Q5: { label: "EVAL IS NOT TRUST", nodes: ["Eval green", "4 overturns", "Stop desk", "Change rule", "Add the row", "Do not lower"], detail: "Green means the code matches the policy, not that the lead agrees.", icon: "brain" },
  Q6: { label: "SEQUENCE THE WEEK", nodes: ["IT wants SSO", "Desk wants now", "One lookup", "No new login", "VP decides", "Write it"], detail: "Helpful access at midnight is how the wrong desk sees a medical load.", icon: "cloud" },
  Q7: { label: "THEIR FILE WINS", nodes: ["Missing col", "Show formula", "Status held", "Unscored", "Ask the lead", "Do not guess"], detail: "A named gap is the work. A confident wrong band is the failure.", icon: "log" },
  Q8: { label: "LOG THE DECISION", nodes: ["Raw question", "Do not store", "Shipment id", "Band + score", "Replay in VPC", "No new column"], detail: "Keep the decision. Refuse a second copy of the question text.", icon: "log" },
  Q9: { label: "READ ONLY FIRST", nodes: ["TMS write", "Rollback dies", "Stay shadow", "9 of 10", "Named owner", "Then accept"], detail: "Writeback is reasonable after trust. It is not a week-one shortcut.", icon: "rocket" },
  Q12: { label: "HEALTH IS NOT DONE", nodes: ["Shadow week", "One desk", "Stop rules", "No writeback", "Turn it off", "They own eval"], detail: "A green health check with wrong bands is still a rollback.", icon: "gear" }
};

for (const item of calendar.items) {
  const diagram = diagrams[item.drill];
  if (!diagram) throw new Error(`No diagram for ${item.drill}`);
  const stem = path.basename(item.draftPath, path.extname(item.draftPath));
  const image = createImage({
    pillar: "FDE Interview Series",
    topic: item.topic,
    footer,
    caption: "Say it in this order ↓",
    diagram: { ...diagram, accent, pale }
  }, `${stem}-doodle`);
  item.imagePath = path.relative(root, image.pngPath);
  item.svgPath = path.relative(root, image.svgPath);

  const draftPath = path.join(seriesDir, item.draftPath);
  const markdown = fs.readFileSync(draftPath, "utf8");
  const imageLine = `image: ../../${item.imagePath}`;
  const next = markdown.includes("\nimage:")
    ? markdown.replace(/\nimage:.*\n/, `\n${imageLine}\n`)
    : markdown.replace("\nstatus:", `\n${imageLine}\nstatus:`);
  fs.writeFileSync(draftPath, next);
  console.log(`${item.drill} ${item.imagePath}`);
}

fs.writeFileSync(calendarPath, `${JSON.stringify(calendar, null, 2)}\n`);
console.log(`Updated ${calendar.items.length} FDE images`);
