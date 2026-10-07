#!/usr/bin/env node
// Renders every planned carousel to output/<stem>.html, .pdf (7 pages, 1080x1350) and -cover.png.
// Usage: node build.js [--only=<slug|date|id>] [--no-pdf] [--no-png]

const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const { buildPlan } = require("./plan");

const OUT = path.join(__dirname, "output");
const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const AUTHOR = "Akhilesh Ranjan Singh";
const ROLE = "Senior DevSecOps Engineer";
const HANDLE = "github.com/iarsingh";
const INITIALS = "AR";
const PAGES = 7;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function highlight(code, lang) {
  return code
    .split("\n")
    .map((line) => {
      const safe = esc(line);
      if (lang === "json") return safe;
      const m = safe.match(/(^|\s)(#.*)$/);
      return m ? `${safe.slice(0, m.index + m[1].length)}<span class="cmt">${m[2]}</span>` : safe;
    })
    .join("\n");
}

const sizeFor = (text, steps) => steps.find(([max]) => text.length <= max)?.[1] ?? steps[steps.length - 1][1];

function h2(title) {
  const size = sizeFor(title, [[28, 60], [40, 54], [999, 48]]);
  return `<h2 style="font-size:${size}px">${esc(title)}</h2>`;
}

function contentSlide(s) {
  switch (s.type) {
    case "quote":
      return `<div class="eyebrow">${esc(s.label)}</div><div class="quote">${esc(s.text)}</div><p class="lead">${esc(s.sub)}</p>`;
    case "list": {
      const dense = s.items.length > 4 ? " dense" : "";
      return `${h2(s.title)}<ol class="list${dense}">${s.items.map((i, n) => `<li><span class="num">${String(n + 1).padStart(2, "0")}</span><div><div class="h">${esc(i.h)}</div><div class="p">${esc(i.p)}</div></div></li>`).join("")}</ol>`;
    }
    case "flow": {
      const dense = s.steps.length > 6 ? " dense" : "";
      return `${h2(s.title)}<div class="flow${dense}">${s.steps.map((x, i) => `<div class="step"><span class="idx">${i + 1}</span><span>${esc(x)}</span></div>`).join('<div class="arrow"></div>')}</div>${s.note ? `<p class="note">${esc(s.note)}</p>` : ""}`;
    }
    case "compare":
      return `${h2(s.title)}<div class="cols">${[s.left, s.right].map((c, k) => `<div class="col${k ? " hi" : ""}"><div class="col-label">${esc(c.label)}</div><ul>${c.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`).join("")}</div>`;
    case "dodont":
      return `${h2(s.title)}<div class="cols"><div class="col do"><div class="col-label">Do</div><ul>${s.do.map((i) => `<li><span class="mark">\u2713</span>${esc(i)}</li>`).join("")}</ul></div><div class="col dont"><div class="col-label">Avoid</div><ul>${s.dont.map((i) => `<li><span class="mark">\u2715</span>${esc(i)}</li>`).join("")}</ul></div></div>`;
    case "table": {
      const dense = s.rows.length > 5 ? " dense" : "";
      return `${h2(s.title)}<table class="${dense}"><thead><tr>${s.headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${s.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
    }
    case "grid":
      return `${h2(s.title)}<div class="grid">${s.items.map((i, n) => `<div class="cell"><span class="cell-n">${String(n + 1).padStart(2, "0")}</span>${esc(i)}</div>`).join("")}</div>`;
    case "checklist": {
      const dense = s.items.length > 8 ? " dense" : "";
      return `${h2(s.title)}<ul class="check${dense}">${s.items.map((i) => `<li><span class="box">\u2713</span>${esc(i)}</li>`).join("")}</ul>`;
    }
    case "code": {
      const lines = s.code.split("\n");
      const longest = Math.max(...lines.map((l) => l.length));
      const byWidth = Math.floor(840 / (longest * 0.61));
      const byHeight = lines.length > 16 ? 21 : lines.length > 12 ? 23 : 26;
      const size = Math.max(17, Math.min(byWidth, byHeight));
      return `${h2(s.title)}<div class="code"><div class="code-bar"><span></span><span></span><span></span><b>${esc(s.lang)}</b></div><pre style="font-size:${size}px">${highlight(s.code, s.lang)}</pre></div>${s.note ? `<p class="note">${esc(s.note)}</p>` : ""}`;
    }
    case "stats": {
      const longest = Math.max(...s.items.map((i) => String(i.value).length));
      const size = longest <= 4 ? 80 : longest <= 6 ? 62 : 52;
      return `${h2(s.title)}<div class="stats">${s.items.map((i) => `<div class="stat"><div class="stat-v" style="font-size:${size}px">${esc(i.value)}</div><div class="stat-l">${esc(i.label)}</div></div>`).join("")}</div>${s.note ? `<p class="note">${esc(s.note)}</p>` : ""}`;
    }
    default:
      throw new Error(`unknown slide type ${s.type}`);
  }
}

function dots(page) {
  return `<div class="dots">${Array.from({ length: PAGES }, (_, i) => `<span class="${i + 1 === page ? "on" : i + 1 < page ? "done" : ""}"></span>`).join("")}</div>`;
}

function header(c, page) {
  return `<header><div class="chip">${esc(c.series.short)}<b>#${c.issue}</b></div>${dots(page)}</header>`;
}

function footer(page) {
  return `<footer><div class="who"><span class="avatar sm">${INITIALS}</span><div><div class="name">${AUTHOR}</div><div class="role">${HANDLE}</div></div></div><div class="page">${page}<span>/${PAGES}</span></div></footer>`;
}

function cover(c) {
  const size = sizeFor(c.title, [[30, 96], [46, 84], [64, 74], [999, 64]]);
  return `<section class="slide cover">
  <div class="big-n">${c.issue}</div>
  ${header(c, 1)}
  <div class="cover-body">
    <div class="eyebrow">${esc(c.series.label)} \u00b7 Issue ${c.issue} of ${String(c.total).padStart(2, "0")}</div>
    <h1 style="font-size:${size}px">${esc(c.title)}</h1>
    <p class="lead">${esc(c.sub)}</p>
  </div>
  <div class="cover-foot">
    <div class="who"><span class="avatar">${INITIALS}</span><div><div class="name">${AUTHOR}</div><div class="role">${ROLE} \u00b7 ${HANDLE}</div></div></div>
    <div class="swipe">Swipe <span class="chev">\u2192</span></div>
  </div>
</section>`;
}

function closing(c) {
  const size = sizeFor(c.takeaway, [[40, 64], [70, 56], [999, 48]]);
  return `<section class="slide">
  ${header(c, PAGES)}
  <div class="eyebrow">Key takeaway</div>
  <h2 class="takeaway" style="font-size:${size}px">${esc(c.takeaway)}</h2>
  <ul class="points">${c.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
  <div class="ask"><div class="ask-label">Your turn</div>${esc(c.question)}</div>
  <div class="next"><div><div class="next-label">Follow ${AUTHOR}</div><div class="next-text">${esc(c.nextLabel)}</div></div><div class="actions">Save \u00b7 Repost</div></div>
  ${footer(PAGES)}
</section>`;
}

function render(c) {
  if (c.slides.length !== PAGES - 2) throw new Error(`${c.id} has ${c.slides.length} content slides, expected ${PAGES - 2}`);
  const body = [
    cover(c),
    ...c.slides.map((s, i) => `<section class="slide">${header(c, i + 2)}<main>${contentSlide(s)}</main>${footer(i + 2)}</section>`),
    closing(c),
  ].join("\n");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(c.series.label)} #${c.issue} \u2014 ${esc(c.title)}</title><style>${css(c.series.accent)}</style></head><body>
${body}
<script>
const s = new URLSearchParams(location.search).get("s");
if (s) document.querySelectorAll(".slide").forEach((el, i) => { if (i + 1 !== Number(s)) el.style.display = "none"; });
</script>
</body></html>`;
}

function css(accent) {
  return `
@page { size: 1080px 1350px; margin: 0; }
:root { --accent: ${accent}; --bg: #0b0f14; --panel: #131a22; --panel2: #18212b; --line: #243040; --text: #f3f6f9; --muted: #a9b6c4; --dim: #6f7f90; --bad: #ff8a80; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: var(--bg); }
body { font-family: -apple-system, "SF Pro Display", "Segoe UI", Inter, Helvetica, Arial, sans-serif; color: var(--text); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.slide { width: 1080px; height: 1350px; padding: 72px 84px 0; position: relative; overflow: hidden; page-break-after: always; display: flex; flex-direction: column; background: var(--bg); }
.slide:last-child { page-break-after: auto; }
.slide::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 12px; background: var(--accent); }
header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 48px; position: relative; z-index: 1; }
main { flex: 1; display: flex; flex-direction: column; justify-content: center; padding-bottom: 170px; }
.chip { font-size: 20px; letter-spacing: 2.5px; font-weight: 650; color: var(--muted); border: 2px solid var(--line); border-radius: 999px; padding: 12px 22px; display: flex; gap: 14px; }
.chip b { color: var(--accent); }
.dots { display: flex; gap: 10px; }
.dots span { width: 14px; height: 14px; border-radius: 50%; background: var(--line); }
.dots span.done { background: var(--dim); }
.dots span.on { background: var(--accent); width: 40px; border-radius: 8px; }
.eyebrow { font-size: 22px; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); font-weight: 700; margin-bottom: 26px; }
h1 { line-height: 1.04; font-weight: 800; letter-spacing: -2.5px; }
h2 { line-height: 1.1; font-weight: 780; letter-spacing: -1.2px; margin-bottom: 48px; }
.lead { font-size: 36px; line-height: 1.4; color: var(--muted); margin-top: 40px; max-width: 880px; }

.cover .big-n { position: absolute; right: -24px; bottom: 150px; font-size: 460px; font-weight: 900; line-height: 1; color: transparent; -webkit-text-stroke: 4px var(--accent); opacity: 0.22; letter-spacing: -20px; }
.cover-body { margin-top: 170px; position: relative; z-index: 1; }
.cover-foot { position: absolute; left: 84px; right: 84px; bottom: 80px; display: flex; justify-content: space-between; align-items: center; border-top: 2px solid var(--line); padding-top: 40px; }
.avatar { width: 76px; height: 76px; border-radius: 50%; background: var(--accent); color: #0b0f14; font-weight: 800; font-size: 28px; display: inline-flex; align-items: center; justify-content: center; flex: none; letter-spacing: 1px; }
.avatar.sm { width: 52px; height: 52px; font-size: 19px; }
.who { display: flex; align-items: center; gap: 20px; }
.name { font-size: 26px; font-weight: 700; }
.role { font-size: 20px; color: var(--dim); margin-top: 4px; }
.swipe { font-size: 26px; font-weight: 700; color: #0b0f14; background: var(--accent); border-radius: 999px; padding: 18px 30px; display: flex; gap: 12px; align-items: center; }

footer { position: absolute; left: 84px; right: 84px; bottom: 56px; display: flex; justify-content: space-between; align-items: center; border-top: 2px solid var(--line); padding-top: 26px; }
.page { font-size: 34px; font-weight: 800; }
.page span { color: var(--dim); font-weight: 600; font-size: 24px; }

.quote { font-size: 74px; line-height: 1.12; font-weight: 800; letter-spacing: -1.5px; padding-left: 44px; border-left: 12px solid var(--accent); }

.list { list-style: none; display: flex; flex-direction: column; gap: 26px; }
.list li { display: flex; gap: 30px; align-items: flex-start; background: var(--panel); border: 2px solid var(--line); border-radius: 18px; padding: 32px 36px; }
.list .num { font-size: 30px; font-weight: 800; color: var(--accent); min-width: 48px; padding-top: 4px; }
.list .h { font-size: 37px; font-weight: 740; margin-bottom: 10px; line-height: 1.2; }
.list .p { font-size: 28px; line-height: 1.4; color: var(--muted); }
.list.dense { gap: 18px; }
.list.dense li { padding: 22px 30px; }
.list.dense .h { font-size: 32px; }
.list.dense .p { font-size: 25px; }

.flow { display: flex; flex-direction: column; }
.step { font-size: 34px; font-weight: 680; background: var(--panel); border: 2px solid var(--line); border-radius: 16px; padding: 20px 28px; display: flex; align-items: center; gap: 24px; }
.step .idx { width: 48px; height: 48px; border-radius: 50%; border: 3px solid var(--accent); color: var(--accent); font-size: 22px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; flex: none; }
.step:last-child { border-color: var(--accent); }
.arrow { width: 3px; height: 30px; background: var(--accent); margin-left: 51px; opacity: 0.7; }
.flow.dense .step { font-size: 29px; padding: 13px 24px; }
.flow.dense .step .idx { width: 40px; height: 40px; font-size: 19px; }
.flow.dense .arrow { height: 18px; margin-left: 47px; }
.note { font-size: 28px; line-height: 1.45; color: var(--muted); margin-top: 38px; padding-left: 24px; border-left: 4px solid var(--line); }

.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; }
.col { background: var(--panel); border: 2px solid var(--line); border-radius: 18px; padding: 36px 32px; }
.col.hi, .col.do { border-color: var(--accent); }
.col-label { font-size: 22px; letter-spacing: 3px; text-transform: uppercase; font-weight: 750; color: var(--dim); margin-bottom: 30px; }
.col.hi .col-label, .col.do .col-label { color: var(--accent); }
.col.dont .col-label { color: var(--bad); }
.col ul { list-style: none; display: flex; flex-direction: column; gap: 26px; }
.col li { font-size: 30px; line-height: 1.3; padding-left: 30px; position: relative; }
.col.hi li::before, .col:not(.do):not(.dont) li::before { content: ""; position: absolute; left: 0; top: 14px; width: 12px; height: 12px; border-radius: 3px; background: var(--dim); }
.col.hi li::before { background: var(--accent); }
.col.do li, .col.dont li { padding-left: 46px; }
.mark { position: absolute; left: 0; top: 0; font-weight: 800; }
.col.do .mark { color: var(--accent); }
.col.dont .mark { color: var(--bad); }

table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 29px; background: var(--panel); border: 2px solid var(--line); border-radius: 18px; overflow: hidden; }
th { text-align: left; color: var(--accent); font-size: 20px; letter-spacing: 2.5px; text-transform: uppercase; padding: 26px 26px 20px; background: var(--panel2); }
td { padding: 26px; border-top: 2px solid var(--line); line-height: 1.3; color: var(--muted); }
td:first-child { color: var(--text); font-weight: 680; }
table.dense td { padding: 20px 24px; font-size: 26px; }

.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.cell { background: var(--panel); border: 2px solid var(--line); border-radius: 16px; padding: 30px 28px; font-size: 30px; font-weight: 650; line-height: 1.25; display: flex; flex-direction: column; gap: 14px; }
.cell-n { font-size: 20px; color: var(--accent); font-weight: 800; letter-spacing: 2px; }

.check { list-style: none; display: flex; flex-direction: column; gap: 22px; }
.check li { font-size: 33px; display: flex; align-items: center; gap: 24px; padding-bottom: 22px; border-bottom: 2px solid var(--line); }
.check li:last-child { border-bottom: 0; }
.box { width: 44px; height: 44px; border-radius: 10px; border: 3px solid var(--accent); color: var(--accent); font-size: 26px; font-weight: 900; display: inline-flex; align-items: center; justify-content: center; flex: none; }
.check.dense { gap: 14px; }
.check.dense li { font-size: 29px; padding-bottom: 14px; }

.code { background: #070a0e; border: 2px solid var(--line); border-radius: 18px; overflow: hidden; }
.code-bar { display: flex; align-items: center; gap: 10px; padding: 18px 24px; background: var(--panel); border-bottom: 2px solid var(--line); }
.code-bar span { width: 14px; height: 14px; border-radius: 50%; background: var(--line); }
.code-bar b { margin-left: auto; font-size: 18px; letter-spacing: 2px; text-transform: uppercase; color: var(--dim); font-weight: 700; }
pre { font-family: "SF Mono", Menlo, Consolas, monospace; line-height: 1.5; color: #dce6f0; padding: 28px 30px; white-space: pre-wrap; word-break: break-word; }
pre .cmt { color: var(--accent); opacity: 0.85; }

.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.stat { background: var(--panel); border: 2px solid var(--line); border-radius: 18px; padding: 64px 26px; text-align: center; }
.stat-v { white-space: nowrap; font-weight: 850; color: var(--accent); letter-spacing: -2px; }
.stat-l { font-size: 25px; color: var(--muted); margin-top: 14px; line-height: 1.3; }

.takeaway { margin-bottom: 40px; }
.points { list-style: none; display: flex; flex-direction: column; gap: 20px; margin-bottom: 44px; }
.points li { font-size: 31px; line-height: 1.35; color: var(--muted); padding-left: 52px; position: relative; }
.points li::before { content: "\\2192"; position: absolute; left: 0; color: var(--accent); font-weight: 800; }
.ask { font-size: 34px; line-height: 1.35; font-weight: 680; background: var(--panel); border: 2px solid var(--accent); border-radius: 18px; padding: 32px 36px; }
.ask-label { font-size: 20px; letter-spacing: 3px; text-transform: uppercase; color: var(--accent); font-weight: 750; margin-bottom: 12px; }
.next { margin-top: 26px; display: flex; justify-content: space-between; align-items: center; gap: 24px; background: var(--accent); color: #0b0f14; border-radius: 18px; padding: 26px 34px; }
.next-label { font-size: 20px; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 800; opacity: 0.75; }
.next-text { font-size: 27px; font-weight: 750; margin-top: 6px; line-height: 1.3; }
.actions { font-size: 22px; font-weight: 800; white-space: nowrap; }
`;
}

function run(args) {
  return new Promise((resolve, reject) => execFile(CHROME, args, { timeout: 120000 }, (err) => (err ? reject(err) : resolve())));
}

async function pool(tasks, size) {
  const queue = [...tasks];
  await Promise.all(Array.from({ length: size }, async () => {
    while (queue.length) await queue.shift()();
  }));
}

function contactSheet(plan) {
  const cards = plan.map((c) => `<a href="${c.fileStem}.pdf"><img src="${c.fileStem}-cover.png" loading="lazy"><div><b>${c.date}</b> \u00b7 ${esc(c.series.label)} #${c.issue}</div><div>${esc(c.title)}</div></a>`).join("");
  return `<!doctype html><meta charset="utf-8"><title>Carousel calendar</title><style>body{font-family:-apple-system,sans-serif;background:#0b0f14;color:#dce6f0;padding:32px}h1{font-size:24px}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px}a{color:inherit;text-decoration:none;font-size:13px;line-height:1.4}img{width:100%;border-radius:8px;border:1px solid #243040;display:block;margin-bottom:8px}b{color:#fff}</style><h1>${plan.length} carousels \u00b7 ${plan[0].date} \u2192 ${plan[plan.length - 1].date}</h1><main>${cards}</main>`;
}

async function main() {
  const args = process.argv.slice(2);
  const only = args.find((a) => a.startsWith("--only="))?.split("=")[1];
  const plan = buildPlan();
  const selected = only ? plan.filter((c) => [c.slug, c.date, c.id].includes(only)) : plan;
  if (!selected.length) throw new Error(`nothing matches --only=${only}`);

  fs.mkdirSync(OUT, { recursive: true });
  const tasks = [];
  for (const c of selected) {
    const html = path.join(OUT, `${c.fileStem}.html`);
    fs.writeFileSync(html, render(c));
    const url = `file://${html}`;
    if (!args.includes("--no-pdf")) {
      tasks.push(() => run(["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${path.join(OUT, `${c.fileStem}.pdf`)}`, url]));
    }
    if (!args.includes("--no-png")) {
      tasks.push(() => run(["--headless=new", "--disable-gpu", "--hide-scrollbars", "--window-size=1080,1350", `--screenshot=${path.join(OUT, `${c.fileStem}-cover.png`)}`, `${url}?s=1`]));
    }
  }
  await pool(tasks, 4);
  if (!only) fs.writeFileSync(path.join(OUT, "index.html"), contactSheet(plan));
  console.log(`rendered ${selected.length} carousel(s) to ${path.relative(process.cwd(), OUT) || OUT}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
