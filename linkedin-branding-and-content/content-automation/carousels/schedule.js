#!/usr/bin/env node
// Replaces every upcoming, unpublished calendar entry with the carousel plan.
// Replaced entries and drafts are moved to archive/carousel-consolidation/, never deleted.
// Usage: node schedule.js            (dry run)
//        node schedule.js --apply

const fs = require("fs");
const path = require("path");
const { buildPlan, SLOT } = require("./plan");

const ROOT = path.resolve(__dirname, "..");
const CALENDAR = path.join(ROOT, "content-calendar.json");
const STATE = path.join(ROOT, "publish-state.json");
const ARCHIVE = path.join(ROOT, "archive", "carousel-consolidation");
const POSTS_OUT = path.join(__dirname, "posts");
const PROFILE = "https://www.linkedin.com/in/iamarsingh/";

// Hand-written FDE posts stay where they are; they are only removed from the schedule.
const HANDWRITTEN_FDE = new Set([
  "2026-10-05-fde-start-from-the-workflow.md",
  "2026-10-06-fde-constraint-deletes-the-design.md",
  "2026-10-07-fde-security-bans-the-model.md",
  "2026-10-08-fde-do-not-invent-the-roi.md",
  "2026-10-09-fde-operator-overturns-the-score.md",
  "2026-10-12-fde-two-stakeholders-one-week.md",
  "2026-10-13-fde-export-missing-a-column.md",
  "2026-10-14-fde-audit-log-refuses-to-store.md",
  "2026-10-15-fde-do-not-write-back.md",
  "2026-10-16-fde-rollout-and-rollback.md",
]);

const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");

function stripFrontmatter(md) {
  return md.replace(/^---\n[\s\S]*?\n---\n+/, "").trim();
}

function slideTitle(s) {
  return s.type === "quote" ? s.label : s.title;
}

function postText(c) {
  if (c.postFile) return stripFrontmatter(fs.readFileSync(path.join(__dirname, "content", c.postFile), "utf8"));
  return [
    `${c.series.label.toUpperCase()} | #${c.issue}`,
    c.title,
    c.hook,
    ["Inside the carousel:", ...c.slides.map((s) => `\u2192 ${slideTitle(s)}`)].join("\n"),
    c.takeaway,
    c.question,
    c.series.hashtags.join(" "),
  ].join("\n\n");
}

function calendarItem(c, text) {
  const pdf = path.join(__dirname, "output", `${c.fileStem}.pdf`);
  const cover = path.join(__dirname, "output", `${c.fileStem}-cover.png`);
  return {
    id: c.id,
    date: c.date,
    slot: SLOT,
    pillar: c.series.label,
    topic: c.title,
    baseTopic: c.title,
    contentFormat: "carousel",
    issue: c.issue,
    hashtags: c.series.hashtags,
    linkedinProfile: PROFILE,
    status: "scheduled",
    text,
    draftPath: rel(path.join(POSTS_OUT, `${c.fileStem}.md`)),
    imagePath: rel(cover),
    documentPath: rel(pdf),
    documentTitle: `${c.series.label} #${c.issue}: ${c.title.replace(/\.$/, "")}`,
  };
}

function draftMarkdown(item) {
  return `---
date: ${item.date}
slot: ${item.slot}
series: ${item.pillar}
issue: ${item.issue}
topic: ${JSON.stringify(item.topic)}
format: carousel
document: ../${item.documentPath.replace(/^carousels\//, "")}
linkedinProfile: ${PROFILE}
status: scheduled
---

${item.text}
`;
}

function main() {
  const apply = process.argv.includes("--apply");
  const plan = buildPlan();
  const cutoff = plan[0].date;
  const missing = plan.filter((c) => !fs.existsSync(path.join(__dirname, "output", `${c.fileStem}.pdf`)));
  if (missing.length) throw new Error(`Render first (node build.js). Missing PDFs: ${missing.map((c) => c.fileStem).join(", ")}`);

  const calendar = JSON.parse(fs.readFileSync(CALENDAR, "utf8"));
  const published = new Set(JSON.parse(fs.readFileSync(STATE, "utf8")).published.map((p) => p.id));
  const isReplaced = (item) => item.date >= cutoff && !published.has(item.id);

  const kept = calendar.items.filter((item) => !isReplaced(item));
  const removed = calendar.items.filter((item) => isReplaced(item) && item.contentFormat !== "carousel");
  const items = plan.map((c) => calendarItem(c, postText(c)));

  const keptDrafts = new Set(kept.map((i) => i.draftPath).filter(Boolean));
  const moves = [];
  for (const file of fs.readdirSync(path.join(ROOT, "posts"))) {
    const draft = `posts/${file}`;
    if (file.endsWith(".md") && file.slice(0, 10) >= cutoff && !keptDrafts.has(draft)) moves.push(draft);
  }
  for (const file of fs.readdirSync(path.join(ROOT, "fde-series", "posts"))) {
    const draft = `fde-series/posts/${file}`;
    if (file.endsWith(".md") && !HANDWRITTEN_FDE.has(file) && !keptDrafts.has(draft)) {
      const entry = calendar.items.find((i) => i.draftPath === draft);
      if (!entry || isReplaced(entry)) moves.push(draft);
    }
  }

  console.log(`cutoff ${cutoff}: keep ${kept.length} entries, archive ${removed.length}, add ${items.length} carousels (${items[0].date} \u2192 ${items[items.length - 1].date})`);
  console.log(`move ${moves.length} drafts to ${rel(ARCHIVE)}/; hand-written FDE posts left in place: ${HANDWRITTEN_FDE.size}`);
  if (!apply) {
    console.log("dry run \u2014 pass --apply to write");
    return;
  }

  fs.mkdirSync(POSTS_OUT, { recursive: true });
  for (const item of items) fs.writeFileSync(path.join(ROOT, item.draftPath), draftMarkdown(item));

  fs.mkdirSync(ARCHIVE, { recursive: true });
  const archiveFile = path.join(ARCHIVE, "content-calendar-entries.json");
  const previous = fs.existsSync(archiveFile) ? JSON.parse(fs.readFileSync(archiveFile, "utf8")).items : [];
  const archivedIds = new Set(previous.map((i) => i.id));
  fs.writeFileSync(archiveFile, JSON.stringify({
    archivedAt: new Date().toISOString(),
    cutoffDate: cutoff,
    reason: "Replaced by 48 seven-page carousels, two per week.",
    items: [...previous, ...removed.filter((i) => !archivedIds.has(i.id))],
  }, null, 2));

  for (const draft of moves) {
    const target = path.join(ARCHIVE, draft);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.renameSync(path.join(ROOT, draft), target);
  }

  calendar.items = [...kept, ...items].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  calendar.schedule = "carousel: Tuesday and Thursday 08:00 Asia/Kolkata";
  fs.writeFileSync(CALENDAR, JSON.stringify(calendar, null, 2));
  console.log("applied");
}

main();
