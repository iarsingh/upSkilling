const fs = require("fs");
const path = require("path");
const { assetsDir } = require("./config");
const { contentDiagram } = require("./content-diagrams");

const esc = (v) => String(v || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function wrapText(text, max = 30) {
  const words = String(text || "Engineering made visual").trim().split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if (line && `${line} ${word}`.length > max) { lines.push(line); line = word; }
    else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines;
}

function fitText(text, width, maxSize, maxLines, minSize = 22) {
  for (let size = maxSize; size >= minSize; size -= 2) {
    const lines = wrapText(text, Math.floor(width / (size * 0.58)));
    if (lines.length <= maxLines && lines.every(line => line.length * size * 0.58 <= width)) return { lines, size };
  }
  throw new Error(`Text is too long for this image layout: ${text}`);
}

function diagramFor(post) {
  if (post.diagram) return post.diagram;
  const specific = contentDiagram(post);
  if (specific) return specific;
  const source = `${post.pillar || ""} ${post.topic || ""} ${post.imageTitle || ""}`.toLowerCase();
  if (/\bfde\b|forward deployed|customer engagement/.test(source)) return { label: "FDE ENGAGEMENT", nodes: ["Discover", "Constraint", "Policy", "Eval gate", "Shadow", "Handoff"], detail: "Name the user · obey the constraint · measure a number you can defend", accent: "#0f766e", pale: "#ccfbf1", icon: "bulb" };
  if (/model registry|model approval|model promotion|mlflow registry/.test(source)) return { label: "CONTROLLED MODEL RELEASES", nodes: ["Register candidate", "Run evaluation", "Review evidence", "Approve version", "Promote safely", "Monitor + rollback"], detail: "Promote an approved version with evaluation evidence and a tested rollback.", accent: "#15803d", pale: "#dcfce7", icon: "brain" };
  if (/autoscal|\bhpa\b|\bvpa\b/.test(source)) return { label: "KUBERNETES AUTOSCALING", nodes: ["Workload metrics", "VPA requests", "HPA replicas", "Pending pods", "Node autoscaler", "SLO + cost"], detail: "HPA scales replicas · VPA sizes requests · Cluster Autoscaler adjusts nodes", accent: "#0369a1", pale: "#e0f2fe", icon: "cloud" };
  if (/python.*(file|folder)|(file|folder).*automation/.test(source)) return { label: "SAFE FILE AUTOMATION", nodes: ["Select paths", "Dry-run plan", "Validate scope", "Apply safely", "Record changes", "Verify outcome"], detail: "Check paths and permissions. Review a dry run before changing files.", accent: "#b45309", pale: "#fef3c7", icon: "gear" };
  if (/\brag\b|retrieval|embedding|vector search/.test(source)) return { label: "RETRIEVAL TO EVIDENCE", nodes: ["Prepare sources", "Chunk + embed", "Retrieve passages", "Rank evidence", "Answer + cite", "Evaluate quality"], detail: "Trace the answer back to its source. Evaluate retrieval and answers separately.", accent: "#6d28d9", pale: "#ede9fe", icon: "brain" };
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

function createSvg(post, slug, outputDir = assetsDir) {
  const d = diagramFor(post);
  if (!Array.isArray(d.nodes) || d.nodes.length < 1 || d.nodes.length > 6) throw new Error("Diagram needs one to six steps");
  const title = fitText(post.topic || post.imageSubtitle || post.imageTitle, 1056, 64, 3, 30);
  const architecture = d.layout === "architecture";
  const takeaway = fitText(d.detail, 958, 26, 3, 20);
  const caption = fitText(architecture ? "Architecture · components and relationships" : "Process flow · actions and checkpoints", 960, 28, 1);
  const svgPath = path.join(outputDir, `${slug}.svg`);
  const positions = architecture
    ? [[64, 490], [432, 490], [800, 490], [64, 742], [432, 742], [800, 742]]
    : [[64, 490], [432, 490], [800, 490], [800, 742], [432, 742], [64, 742]];
  const cards = d.nodes.map((node, i) => {
    const [x, y] = positions[i];
    const label = fitText(node, 264, 28, 3, 20);
    const textY = y + 92;
    return `<g><rect x="${x}" y="${y + 6}" width="336" height="170" rx="22" fill="#132333" opacity=".055"/>
      <rect x="${x}" y="${y}" width="336" height="170" rx="22" fill="${i === 0 || i === d.nodes.length - 1 ? d.pale : '#ffffff'}" stroke="${d.accent}" stroke-opacity=".20" stroke-width="2"/>
      <rect x="${x + 24}" y="${y + 22}" width="${architecture ? 176 : 42}" height="32" rx="10" fill="${d.accent}"/>
      <text x="${x + (architecture ? 112 : 45)}" y="${y + 45}" text-anchor="middle" class="number" style="font-size:${architecture ? 12 : 18}px">${architecture ? (i < 3 ? 'PRIMARY PATH' : 'SUPPORT / CONTROL') : String(i + 1).padStart(2, '0')}</text>
      ${label.lines.map((line, n) => `<text x="${x + 24}" y="${textY + n * (label.size + 5)}" font-size="${label.size}" class="cardText">${esc(line)}</text>`).join('')}
    </g>`;
  }).join('');
  const connectors = architecture ? (d.edges || [[0,1],[1,2],[3,0],[4,1],[5,2]]).map(([from,to,label]) => {
    const [x,y]=positions[from], [nx,ny]=positions[to];
    let line;
    let lx,ly;
    if(y===ny){line=nx>x?`M${x+336} ${y+85}H${nx-4}`:`M${x} ${y+85}H${nx+340}`;lx=(x+nx+336)/2;ly=y+64;}
    else if(x===nx){line=ny>y?`M${x+168} ${y+170}V${ny-5}`:`M${x+168} ${y}V${ny+175}`;lx=x+190;ly=710;}
    else {const sy=ny>y?y+170:y,ey=ny>y?ny-5:ny+175;line=`M${x+112} ${sy}V701H${nx+112}V${ey}`;lx=(x+nx)/2+168;ly=692;}
    return `<path d="${line}" stroke="${d.accent}" stroke-width="3" fill="none" marker-end="url(#arrow)"/>${label?`<text x="${lx}" y="${ly}" font-size="14" text-anchor="middle" font-weight="600" fill="${d.accent}">${esc(label)}</text>`:''}`;
  }).join('') : d.nodes.slice(0, -1).map((_, i) => {
    const [x, y] = positions[i];
    const [nx, ny] = positions[i + 1];
    const line = ny === y
      ? (nx > x ? `M${x + 343} ${y + 85}h18` : `M${x - 7} ${y + 85}h-18`)
      : `M${x + 168} ${y + 179}v63`;
    return `<path d="${line}" stroke="${d.accent}" stroke-width="3" fill="none" marker-end="url(#arrow)"/>`;
  }).join('');
  const titleLines = title.lines.map((line, i) => `<text x="64" y="${174 + i * (title.size + 12)}" font-size="${title.size}" class="title">${esc(line)}</text>`).join('');
  const footer = post.footer || "Akhilesh Ranjan Singh · Engineering in practice";
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200" role="img" aria-labelledby="image-title image-description">
<title id="image-title">${esc(post.topic || post.imageSubtitle || post.imageTitle)}</title>
<desc id="image-description">${esc(d.nodes.join(' → ') + '. ' + d.detail)}</desc>
<defs>
 <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3 0 6" fill="none" stroke="${d.accent}" stroke-width="1.6"/></marker>
 <style>text{font-family:"Avenir Next","Arial",sans-serif}.title{font-weight:800;fill:#142638;letter-spacing:-1.3px}.cardText{font-weight:700;fill:#142638}.number{font-size:18px;font-weight:800;fill:#fff}.ink{fill:none;stroke:#142638;stroke-width:7;stroke-linecap:round;stroke-linejoin:round}.thin{stroke-width:5}</style>
</defs>
<rect width="1200" height="1200" fill="#f7f8f5"/>
<rect x="32" y="32" width="1136" height="1136" rx="32" fill="#fcfdfb" stroke="#e3e8e2" stroke-width="2"/>
<rect x="64" y="60" width="8" height="30" rx="4" fill="${d.accent}"/>
<text x="88" y="83" font-size="19" font-weight="800" letter-spacing="2" fill="${d.accent}">${esc(d.label)}</text>
<g transform="translate(654 -30) scale(.45)">${icon(d.icon, d.accent)}</g>
${titleLines}
<path d="M64 412h78" stroke="${d.accent}" stroke-width="6" stroke-linecap="round"/>
<text x="164" y="420" font-size="${caption.size}" fill="#536575" font-weight="500">${esc(caption.lines[0])}</text>
${connectors}${cards}
<rect x="64" y="946" width="1072" height="126" rx="24" fill="${d.pale}"/>
<text x="88" y="978" font-size="15" letter-spacing="2" font-weight="800" fill="${d.accent}">${d.evidence ? 'EXAMPLE FROM THE POST' : 'THE TAKEAWAY'}</text>
${takeaway.lines.map((line, i) => `<text x="88" y="${1008 + i * (takeaway.size + 5)}" font-size="${takeaway.size}" font-weight="600" fill="#142638">${esc(line)}</text>`).join('')}
<path d="M64 1104h1072" stroke="#dfe6df" stroke-width="2"/>
<text x="64" y="1140" font-size="19" font-weight="600" fill="#536575">${esc(footer)}</text>
<text x="1136" y="1140" font-size="16" font-weight="700" fill="${d.accent}" text-anchor="end">KEEP FOR YOUR NEXT PROJECT</text>
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

function createImage(post, slug, outputDir = assetsDir) {
  fs.mkdirSync(outputDir, { recursive: true });
  const svgPath = createSvg(post, slug, outputDir);
  return { svgPath, pngPath: convertSvgToPng(svgPath) };
}

module.exports = { createImage, createSvg, diagramFor };
