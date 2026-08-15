const fs = require("fs");
const path = require("path");
const { assetsDir } = require("./config");

const esc = (v) => String(v || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function wrapText(text, max = 28, limit = 3) {
  const lines = [];
  let line = "";
  for (const word of String(text || "Engineering made visual").trim().split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (line && next.length > max) { lines.push(line); line = word; } else line = next;
  }
  if (line) lines.push(line);
  return lines.slice(0, limit);
}

function diagramFor(post) {
  const source = `${post.pillar || ""} ${post.topic || ""} ${post.imageTitle || ""}`.toLowerCase();
  if (/log analyzer|log analys/.test(source)) return { label: "PYTHON LOG ANALYZER", nodes: ["Read stream", "Parse lines", "Normalize", "Detect patterns", "Aggregate", "JSON report"], detail: "Handle malformed lines · bound memory · emit metrics · preserve raw evidence", accent: "#d97706", pale: "#fef3c7", icon: "log" };
  if (/model|mlops|training|drift|inference|feature/.test(source)) return { label: "MLOPS, SIMPLIFIED", nodes: ["Validate data", "Feature set", "Train run", "Eval gate", "Registry", "Drift alert"], detail: "Version data + code + model · enforce acceptance gates · monitor skew", accent: "#16a34a", pale: "#dcfce7", icon: "brain" };
  if (/kubernetes|k8s|gke|pod|cluster|helm|gitops|container/.test(source)) return { label: "PLATFORM, UNPACKED", nodes: ["Commit SHA", "CI tests", "OCI image", "GitOps sync", "K8s rollout", "SLO signals"], detail: "Immutable artifact · readiness probes · policy gates · safe rollback", accent: "#0284c7", pale: "#e0f2fe", icon: "cloud" };
  if (/python|automation|script|api|etl/.test(source)) return { label: "PRODUCTION PYTHON FLOW", nodes: ["Typed input", "Validate", "Transform", "Retry + jitter", "Metrics", "Audit log"], detail: "Timeouts · idempotency · structured logs · non-zero failure exit", accent: "#d97706", pale: "#fef3c7", icon: "gear" };
  if (/terraform/.test(source)) return { label: "TERRAFORM DELIVERY", nodes: ["Format", "Validate", "Plan", "Review", "Apply", "Drift scan"], detail: "Remote state · locking · least privilege · reviewed plan artifact", accent: "#7c3aed", pale: "#ede9fe", icon: "rocket" };
  if (/cloud|devops|infra|network|security|sre/.test(source)) return { label: "CLOUD, DRAWN CLEARLY", nodes: ["Design", "Threat model", "Provision", "Deploy", "SLIs/SLOs", "Recover"], detail: "Least privilege · encrypted traffic · observable changes · tested rollback", accent: "#7c3aed", pale: "#ede9fe", icon: "rocket" };
  return { label: "ONE IDEA. MADE VISUAL.", nodes: ["Define", "Design", "Build", "Validate", "Release", "Improve"], detail: "Make assumptions explicit · verify the outcome · keep rollback safe", accent: "#e11d48", pale: "#ffe4e6", icon: "bulb" };
}

function icon(kind, color) {
  if (kind === "log") return `<g transform="rotate(1 940 215)">
    <rect x="842" y="119" width="207" height="184" rx="15" fill="#fff" stroke="${color}" stroke-width="7"/>
    <path d="M842 157h207" stroke="${color}" stroke-width="7"/>
    <circle cx="864" cy="138" r="5" fill="#ef4444"/><circle cx="882" cy="138" r="5" fill="#f59e0b"/><circle cx="900" cy="138" r="5" fill="#22c55e"/>
    <text x="860" y="188" font-family="monospace" font-size="14" font-weight="700" fill="#16a34a">INFO</text><path d="M910 183h106" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
    <text x="860" y="224" font-family="monospace" font-size="14" font-weight="700" fill="#dc2626">ERROR</text><path d="M921 219h88" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
    <text x="860" y="260" font-family="monospace" font-size="14" font-weight="700" fill="#d97706">WARN</text><path d="M910 255h101" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
    <path d="M1023 278l22 22m-3-18 13 13" class="ink thin"/>
  </g>`;
  if (kind === "gear") return `<circle cx="938" cy="208" r="68" fill="${color}" opacity=".12"/><circle cx="938" cy="208" r="49" fill="none" stroke="${color}" stroke-width="10" stroke-dasharray="18 9"/><circle cx="938" cy="208" r="18" fill="none" stroke="${color}" stroke-width="8"/><path d="M938 132v-19m0 190v-19m-76-76h-19m190 0h-19m-130-54-14-14m135 135-14-14m0-107 14-14m-135 135 14-14" class="ink thin"/>`;
  if (kind === "cloud") return `<path d="M866 250c-29-5-36-45-9-59 10-6 21-7 31-3 8-43 69-49 87-11 35-6 55 32 38 60-8 12-20 18-37 18H866z" fill="${color}" opacity=".14" stroke="${color}" stroke-width="8"/><path d="M900 275l-15 28m54-28-3 32m44-32 13 26" class="ink thin"/>`;
  if (kind === "rocket") return `<path d="M889 254c7-58 37-99 88-116 8 53-9 99-58 130z" fill="${color}" opacity=".17" stroke="${color}" stroke-width="7"/><circle cx="947" cy="176" r="14" fill="#fff" stroke="${color}" stroke-width="6"/><path d="M893 235l-34 10 25-32m45 51-9 35 32-28m-53 5c-16 8-25 22-29 39 20-3 35-13 44-29" class="ink"/>`;
  if (kind === "brain") return `<path d="M950 133c-22-22-60-9-62 21-35-3-50 39-26 60-22 29 10 68 42 53 11 33 58 27 61-8 34-3 43-48 14-66 13-34-18-68-48-51" fill="${color}" opacity=".12" stroke="${color}" stroke-width="8"/><path d="M925 145v128m-35-92q30 3 35 33m38-33q-32 5-38 34m-31 34q20-12 31 2m39-3q-24-10-39 4" class="ink thin"/>`;
  return `<path d="M938 128c-44 0-77 36-77 78 0 28 15 47 34 64 8 7 12 17 12 27h62c0-11 5-21 13-29 18-17 32-35 32-62 0-44-34-78-76-78z" fill="${color}" opacity=".14" stroke="${color}" stroke-width="7"/><path d="M907 316h62m-55 18h48M938 94V69m-102 42-18-18m222 18 18-18" class="ink thin"/>`;
}

function createSvg(post, slug) {
  const title = wrapText(post.topic || post.imageSubtitle || post.imageTitle);
  const d = diagramFor(post);
  const svgPath = path.join(assetsDir, `${slug}.svg`);
  const titleSvg = title.map((line, i) => `<text x="72" y="${151 + i * 58}" class="title" transform="rotate(${i % 2 ? .35 : -.3} 72 ${151 + i * 58})">${esc(line)}</text>`).join("\n");
  const cards = d.nodes.map((node, i) => {
    const x = 70 + i * 178, y = 450 + (i % 2 ? 9 : -7), rotate = [-1.2, .8, -.5, 1.1, -.8, .6][i];
    const arrow = i < 5 ? `<path d="M${x + 132} ${y + 49}q19 ${i % 2 ? -12 : 12} 38 1" class="scribble" marker-end="url(#arrow)"/>` : "";
    return `<g transform="rotate(${rotate} ${x + 63} ${y + 47})"><rect x="${x}" y="${y}" width="126" height="94" rx="10" fill="${i % 2 ? "#fff" : d.pale}" class="card"/><text x="${x + 17}" y="${y + 27}" class="step">0${i + 1}</text><text x="${x + 63}" y="${y + 64}" class="cardText" text-anchor="middle">${esc(node)}</text></g>${arrow}`;
  }).join("\n");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
<defs>
 <filter id="paper"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" seed="8"/><feBlend in="SourceGraphic" mode="multiply"/></filter>
 <filter id="wobble"><feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="2" seed="4" result="warp"/><feDisplacementMap in="SourceGraphic" in2="warp" scale="3"/></filter>
 <marker id="arrow" markerWidth="12" markerHeight="12" refX="9" refY="4" orient="auto"><path d="M1 1L10 4 1 8" fill="none" stroke="#172033" stroke-width="2" stroke-linecap="round"/></marker>
 <style>.ink{fill:none;stroke:#172033;stroke-width:7;stroke-linecap:round;stroke-linejoin:round}.thin{stroke-width:5}.eyebrow{font-family:"Comic Sans MS","Chalkboard SE",sans-serif;font-size:20px;font-weight:700;fill:${d.accent};letter-spacing:1.8px}.title{font-family:"Arial Rounded MT Bold","Trebuchet MS",Arial,sans-serif;font-size:48px;font-weight:900;fill:#172033}.note{font-family:"Comic Sans MS","Chalkboard SE",Arial,sans-serif;font-size:24px;font-weight:700;fill:#334155}.detail{font-family:"Comic Sans MS","Chalkboard SE",Arial,sans-serif;font-size:17px;font-weight:700;fill:#334155}.card{stroke:#172033;stroke-width:4;filter:url(#wobble)}.step{font-family:"Comic Sans MS",Arial,sans-serif;font-size:15px;font-weight:700;fill:${d.accent}}.cardText{font-family:"Arial Rounded MT Bold","Trebuchet MS",Arial,sans-serif;font-size:16px;font-weight:800;fill:#172033}.scribble{fill:none;stroke:#172033;stroke-width:3;stroke-linecap:round;stroke-dasharray:6 6}.footer{font-family:"Comic Sans MS","Chalkboard SE",Arial,sans-serif;font-size:18px;font-weight:700;fill:#475569}</style>
</defs>
<rect width="1200" height="675" fill="#fffdf6"/><g opacity=".03" filter="url(#paper)"><rect width="1200" height="675" fill="#64748b"/></g><circle cx="1100" cy="72" r="86" fill="${d.pale}"/>
<path d="M53 75q30-30 64 0m-42-25 24 39" fill="none" stroke="${d.accent}" stroke-width="6" stroke-linecap="round"/><text x="72" y="104" class="eyebrow">${esc(d.label)}</text>${titleSvg}
<path d="M72 ${177 + title.length * 58}q190 16 398 0" fill="none" stroke="${d.accent}" stroke-width="9" stroke-linecap="round" opacity=".65"/><g filter="url(#wobble)">${icon(d.icon, d.accent)}</g>
<path d="M1054 137q24-17 43-1m-18 22q31-4 43 17M820 314q-28 18-43 48" class="scribble"/><text x="72" y="402" class="note">The production path, without the buzzwords ↓</text>
${cards}<rect x="70" y="566" width="1020" height="39" rx="19" fill="${d.pale}"/><text x="580" y="592" class="detail" text-anchor="middle">${esc(d.detail)}</text><path d="M55 626q215-13 430 0t430-2" fill="none" stroke="${d.accent}" stroke-width="3" opacity=".55"/><text x="72" y="654" class="footer">Akhilesh Ranjan Singh  ·  ML Platform + DevOps</text><text x="1110" y="647" class="note" text-anchor="end">save this ↗</text>
</svg>`;
  fs.writeFileSync(svgPath, svg, "utf8");
  return svgPath;
}

function convertSvgToPng(svgPath) {
  let Resvg;
  try { ({ Resvg } = require("@resvg/resvg-js")); } catch { throw new Error("Missing @resvg/resvg-js. Run npm install before generating LinkedIn images."); }
  const pngPath = svgPath.replace(/\.svg$/, ".png");
  const renderer = new Resvg(fs.readFileSync(svgPath), { fitTo: { mode: "width", value: 1200 }, font: { loadSystemFonts: true, defaultFontFamily: "Arial" } });
  fs.writeFileSync(pngPath, renderer.render().asPng());
  return pngPath;
}

function createImage(post, slug) {
  fs.mkdirSync(assetsDir, { recursive: true });
  const svgPath = createSvg(post, slug);
  return { svgPath, pngPath: convertSvgToPng(svgPath) };
}

module.exports = { createImage, createSvg, diagramFor };
