const fs = require("fs");
const path = require("path");
const { root } = require("../src/config");

function load(relativePath) {
  const value = JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
  return value.items || value;
}

function clean(value) {
  return String(value || "").replace(/^\[[^\]]+\]\s*/, "").replace(/\|/g, "\\|");
}

function table(items, kind) {
  return [
    "| # | Date | Time | Level/Series | Content | Status |",
    "|---:|:---|:---|:---|:---|:---|",
    ...items.map((item, index) => {
      const levelOrSeries = item.level || item.pillar || item.series || "—";
      const status = kind === "active"
        ? "Active schedule"
        : kind === "revision"
          ? "Private draft — do not publish"
          : "Archived — do not publish";
      return `| ${item.sequence || index + 1} | ${item.date || "—"} | ${item.slot || "—"} | ${clean(levelOrSeries)} | ${clean(item.topic || item.baseTopic)} | ${status} |`;
    }),
    ""
  ];
}

const active = load("content-calendar.json").slice().sort((a, b) => a.date.localeCompare(b.date));
const revisionCalendar = JSON.parse(fs.readFileSync(path.join(root, "ai-engineer-revision-calendar.json"), "utf8"));
const revision = revisionCalendar.items;
const archived = load("archive/content-calendar-entries.json").slice().sort((a, b) => a.date.localeCompare(b.date));
const outputPath = path.join(root, "ALL-CONTENT-INDEX.md");

const lines = [
  "# LinkedIn Content Master Index",
  "",
  "This index separates the active publishing calendar from private revision drafts and archived material.",
  "",
  "## Summary",
  "",
  `- Active scheduled entries: ${active.length}`,
  `- Private AI revision drafts: ${revision.length}`,
  `- Archived entries: ${archived.length}`,
  `- Total indexed entries: ${active.length + revision.length + archived.length}`,
  "",
  "## Active Publishing Calendar",
  "",
  ...table(active, "active"),
  "## AI Engineer Revision Series",
  "",
  "> Publishing is disabled for this entire section.",
  "",
  ...table(revision, "revision"),
  "## Archived Content",
  "",
  "> Archived entries are retained for reference and must not publish.",
  "",
  ...table(archived, "archive")
];

fs.writeFileSync(outputPath, lines.join("\n"), "utf8");
console.log(`Master index: ${outputPath}`);
console.log(`Indexed: ${active.length + revision.length + archived.length}`);
