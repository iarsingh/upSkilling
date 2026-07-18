const fs = require("fs");

// Warm-paper explainer style: cream background is constant across every
// series, only the accent (eyebrow, card borders, arrows) changes.
const SERIES_THEME = {
  "Kubernetes Series": { accent: "#3E5C8A", tag: "KUBERNETES" },
  "MLOps Series": { accent: "#8B4F82", tag: "MLOPS" },
  "Python Automation Series": { accent: "#B9791E", tag: "PYTHON" },
  "Data Science Series": { accent: "#2F7A63", tag: "DATA SCIENCE" },
  "DevOps & Cloud Fundamentals Series": { accent: "#B54B27", tag: "FUNDAMENTALS" },
  "IT Engineering Series": { accent: "#3F7C87", tag: "IT ENGINEERING" },
};
const DEFAULT_THEME = { accent: "#6B5D3F", tag: "DEVOPS" };

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { data: {}, body: raw };
  const data = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (m) data[m[1]] = m[2].trim();
  }
  return { data, body: raw.slice(match[0].length) };
}

// The first numbered list (1. 2. 3. ...) in the body is treated as the
// post's "flow" — every post in this archive builds around one, just under
// different headings (Architecture flow / Practical breakdown / Interview lens).
function extractNumberedList(body) {
  const lines = body.split("\n");
  const steps = [];
  let capturing = false;
  for (const line of lines) {
    const m = line.match(/^\s*(\d+)[.)]\s+(.*)$/);
    if (m) {
      capturing = true;
      steps.push(m[2].trim());
    } else if (capturing && line.trim() === "") {
      break;
    }
  }
  return steps;
}

function extractHook(body) {
  const paragraphs = body
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
  for (const p of paragraphs) {
    if (/^(day|week)\s+\d+/i.test(p)) continue;
    if (/^topic:/i.test(p)) continue;
    if (/^#/.test(p)) continue;
    return p.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\s]+/u, "").trim();
  }
  return "";
}

function extractClosingQuestion(body) {
  const lines = body
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].startsWith("#")) continue;
    if (lines[i].endsWith("?")) return lines[i];
  }
  return "";
}

function extractHashtags(body) {
  const line = body
    .split("\n")
    .reverse()
    .find((l) => l.trim().startsWith("#"));
  return line ? line.trim().split(/\s+/).filter((t) => t.startsWith("#")) : [];
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function parsePost(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, body } = parseFrontmatter(raw);
  const series = data.series || "";
  const theme = SERIES_THEME[series] || DEFAULT_THEME;
  const topic = data.topic || (body.split("\n").find(Boolean) || "").trim();
  const baseTopic = topic.replace(/ - [A-Za-z].*$/, "").trim();

  return {
    file: filePath,
    slug: slugify(topic || baseTopic),
    series,
    day: data.day || "",
    theme,
    topic,
    baseTopic,
    hook: extractHook(body),
    steps: extractNumberedList(body).slice(0, 6),
    closingQuestion: extractClosingQuestion(body),
    hashtags: extractHashtags(body).slice(0, 5),
  };
}

module.exports = { parsePost, slugify, SERIES_THEME, DEFAULT_THEME };
