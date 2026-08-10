const fs = require("fs");
const path = require("path");
const { assetsDir } = require("./config");

function escapeXml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapText(text, maxChars, maxLines = 3) {
  const words = String(text || "Engineering architecture").trim().split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, maxLines);
}

function diagramFor(post) {
  const source = `${post.pillar || ""} ${post.topic || ""} ${post.imageTitle || ""} ${post.imageSubtitle || ""}`.toLowerCase();
  if (/feature|training|model|mlops|drift|inference|registry|mlflow|kubeflow/.test(source)) {
    return {
      label: "MLOPS ARCHITECTURE",
      nodes: ["Data Sources", "Quality Gates", "Feature Store", "Training", "Registry", "Serving"],
      accent: "#22c55e"
    };
  }
  if (/kubernetes|k8s|gke|pod|cluster|helm|gitops|container/.test(source)) {
    return {
      label: "PLATFORM ARCHITECTURE",
      nodes: ["Developer", "CI Pipeline", "Registry", "GitOps", "Kubernetes", "Observe"],
      accent: "#38bdf8"
    };
  }
  if (/python|automation|script|api|etl/.test(source)) {
    return {
      label: "AUTOMATION WORKFLOW",
      nodes: ["Input", "Validate", "Process", "Retry", "Report", "Audit Log"],
      accent: "#facc15"
    };
  }
  if (/terraform|cloud|devops|infra|network|security|sre/.test(source)) {
    return {
      label: "CLOUD DELIVERY FLOW",
      nodes: ["Plan", "Review", "Provision", "Deploy", "Monitor", "Recover"],
      accent: "#a78bfa"
    };
  }
  return {
    label: "ENGINEERING SYSTEM",
    nodes: ["Define", "Design", "Build", "Validate", "Release", "Improve"],
    accent: "#fb923c"
  };
}

function createSvg(post, slug) {
  const topic = post.topic || post.imageSubtitle || post.imageTitle || "Engineering architecture";
  const title = wrapText(topic, 36, 3);
  const diagram = diagramFor(post);
  const svgPath = path.join(assetsDir, `${slug}.svg`);
  const titleLines = title.map((line, index) =>
    `<text x="64" y="${145 + index * 49}" class="title">${escapeXml(line)}</text>`
  ).join("\n");
  const boxes = diagram.nodes.map((node, index) => {
    const column = index % 3;
    const row = Math.floor(index / 3);
    const x = 600 + column * 184;
    const y = 150 + row * 210;
    const nextX = x + 184;
    const arrow = column < 2
      ? `<path d="M ${x + 148} ${y + 58} L ${nextX - 20} ${y + 58}" class="arrow" marker-end="url(#arrow)"/>`
      : "";
    return `${arrow}
      <rect x="${x}" y="${y}" width="148" height="116" rx="20" class="node"/>
      <circle cx="${x + 28}" cy="${y + 29}" r="10" fill="${diagram.accent}"/>
      <text x="${x + 74}" y="${y + 72}" class="nodeText" text-anchor="middle">${escapeXml(node)}</text>`;
  }).join("\n");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#07111f"/><stop offset="100%" stop-color="#172554"/>
    </linearGradient>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8"/>
    </marker>
    <style>
      .kicker{font-family:Arial,sans-serif;font-size:18px;font-weight:700;fill:${diagram.accent};letter-spacing:2px}
      .title{font-family:Arial,sans-serif;font-size:39px;font-weight:800;fill:#f8fafc}
      .note{font-family:Arial,sans-serif;font-size:23px;font-weight:500;fill:#cbd5e1}
      .node{fill:#111c33;stroke:${diagram.accent};stroke-width:2}
      .nodeText{font-family:Arial,sans-serif;font-size:17px;font-weight:700;fill:#f8fafc}
      .arrow{fill:none;stroke:#94a3b8;stroke-width:3}
      .footer{font-family:Arial,sans-serif;font-size:19px;font-weight:600;fill:#94a3b8}
    </style>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <path d="M35 48 Q60 24 88 48" fill="none" stroke="${diagram.accent}" stroke-width="6" stroke-linecap="round"/>
  <text x="64" y="94" class="kicker">${escapeXml(diagram.label)}</text>
  ${titleLines}
  <text x="64" y="335" class="note">A production-minded visual guide</text>
  <path d="M64 375 C150 345,225 405,320 370 S480 350,530 385" fill="none" stroke="${diagram.accent}" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 13"/>
  <text x="64" y="465" class="note">Design → validate → observe → recover</text>
  ${boxes}
  <path d="M 1118 266 C 1160 285,1160 325,1118 360" class="arrow" marker-end="url(#arrow)"/>
  <line x1="64" y1="606" x2="1136" y2="606" stroke="#334155"/>
  <text x="64" y="642" class="footer">Akhilesh Ranjan Singh · ML Platform &amp; DevOps</text>
</svg>`;
  fs.writeFileSync(svgPath, svg, "utf8");
  return svgPath;
}

function convertSvgToPng(svgPath) {
  let Resvg;
  try {
    ({ Resvg } = require("@resvg/resvg-js"));
  } catch {
    throw new Error("Missing @resvg/resvg-js. Run npm install before generating LinkedIn images.");
  }
  const pngPath = svgPath.replace(/\.svg$/, ".png");
  const renderer = new Resvg(fs.readFileSync(svgPath), {
    fitTo: { mode: "width", value: 1200 },
    font: { loadSystemFonts: true, defaultFontFamily: "Arial" }
  });
  fs.writeFileSync(pngPath, renderer.render().asPng());
  return pngPath;
}

function createImage(post, slug) {
  fs.mkdirSync(assetsDir, { recursive: true });
  const svgPath = createSvg(post, slug);
  return { svgPath, pngPath: convertSvgToPng(svgPath) };
}

module.exports = { createImage, createSvg, diagramFor };
