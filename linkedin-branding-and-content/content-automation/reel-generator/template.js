function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function hexToRgb(hex) {
  const m = hex.replace("#", "").match(/.{2}/g);
  return m.map((h) => parseInt(h, 16)).join(",");
}

// Timing is computed here (not in client JS) so the exact video duration is
// known up front for the Playwright wait + ffmpeg trim.
function computeTimeline(post) {
  const STEP_GAP = 1.35;
  const t = { title: 0.3, hook: 1.05, flowLabel: 1.9 };
  t.steps = post.steps.map((_, i) => 2.3 + i * STEP_GAP);
  const afterSteps = t.steps.length
    ? t.steps[t.steps.length - 1] + STEP_GAP
    : t.flowLabel + 0.8;
  t.closing = afterSteps + 0.3;
  t.outro = t.closing + 1.6;
  const total = t.outro + 3.4; // hold outro on screen before cut
  return { t, total };
}

function buildHTML(post) {
  const { t, total } = computeTimeline(post);
  const { accent, tag } = post.theme;
  const accentRgb = hexToRgb(accent);

  // Title reveals word by word instead of as one block. The stagger is
  // compressed for long titles so it always resolves before the hook
  // line starts fading in at t.hook.
  const titleWords = esc(post.baseTopic).split(" ");
  const wordGap = Math.min(0.055, 0.55 / Math.max(titleWords.length, 1));
  const titleHtml = titleWords
    .map((w, i) => `<span class="word" style="animation-delay:${(t.title + i * wordGap).toFixed(3)}s">${w}</span>`)
    .join(" ");

  const stepsHtml = post.steps
    .map((step, i) => {
      const delay = t.steps[i];
      const isLast = i === post.steps.length - 1;
      return `
        <div class="step" style="animation-delay:${delay}s">
          <div class="step-num" style="animation-delay:${(delay + 0.08).toFixed(3)}s">${i + 1}</div>
          <div class="step-card"><div class="step-text">${esc(step)}</div></div>
        </div>
        ${!isLast ? `<div class="connector" style="animation-delay:${delay + 0.2}s">
          <span class="connector-line"></span>
          <span class="connector-pulse" style="animation-delay:${(delay + 0.75).toFixed(3)}s"></span>
          <span class="arrow-head">&#9660;</span>
        </div>` : ""}`;
    })
    .join("\n");

  const hashtagsHtml = post.hashtags
    .map(
      (h, i) =>
        `<span class="tag" style="animation-delay:${(t.outro + 0.1 + i * 0.08).toFixed(3)}s">${esc(h)}</span>`
    )
    .join("");

  return {
    total,
    html: `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --paper: #F3ECDA;
    --paper-raised: #FBF6E9;
    --ink: #241C10;
    --ink-dim: #6B5D3F;
    --accent: ${accent};
    --accent-rgb: ${accentRgb};
  }
  html, body {
    width: 1080px; height: 1920px; overflow: hidden;
    background-color: var(--paper);
    font-family: -apple-system, "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
    color: var(--ink);
  }
  .bg {
    position: absolute; inset: -60px; z-index: 0;
    background-image:
      radial-gradient(ellipse 820px 620px at 50% 10%, rgba(255,253,246,0.95), rgba(255,253,246,0) 65%),
      repeating-linear-gradient(0deg, rgba(36,28,16,0.05) 0 1px, transparent 1px 46px),
      repeating-linear-gradient(90deg, rgba(36,28,16,0.05) 0 1px, transparent 1px 46px);
    animation: gridDrift 26s linear infinite;
  }

  .progress-track {
    position: absolute; top: 0; left: 0; right: 0; height: 8px; z-index: 3;
    background: rgba(var(--accent-rgb), 0.14);
  }
  .progress-fill {
    height: 100%; width: 0%; background: var(--accent);
    animation: fillBar ${total}s linear forwards;
  }

  .stage { position: relative; z-index: 1; width: 1080px; height: 1920px; padding: 100px 76px 150px; display: flex; flex-direction: column; }

  .badge {
    display: inline-flex; align-self: flex-start; gap: 10px; align-items: center;
    padding: 13px 26px; border-radius: 999px; background: var(--paper-raised);
    border: 1.5px solid rgba(var(--accent-rgb), 0.55);
    color: var(--accent); font-weight: 700; font-size: 27px; letter-spacing: 1.5px;
    box-shadow: 0 6px 16px rgba(36,28,16,0.06);
    opacity: 0; animation: fadeUp 0.6s ease forwards, badgePulse 2.4s ease-in-out 0.6s infinite;
    animation-delay: 0s;
  }

  .title {
    margin-top: 42px; font-size: 70px; line-height: 1.14; font-weight: 800; letter-spacing: -0.01em;
    color: var(--ink); max-height: 320px; overflow: hidden;
  }
  .title .word {
    display: inline-block; opacity: 0; transform: translateY(26px) rotate(1.5deg);
    animation: wordIn 0.5s cubic-bezier(.2,.9,.25,1.2) forwards;
  }
  .hook {
    margin-top: 30px; font-size: 36px; line-height: 1.42; font-weight: 500; color: var(--ink-dim);
    opacity: 0; animation: fadeUp 0.7s ease forwards; animation-delay: ${t.hook}s;
  }

  .flow-label {
    margin-top: 58px; font-size: 27px; font-weight: 700; letter-spacing: 3px; color: var(--accent);
    opacity: 0; animation: fadeUp 0.6s ease forwards; animation-delay: ${t.flowLabel}s;
  }
  .flow { margin-top: 24px; display: flex; flex-direction: column; flex: 1; }

  .step {
    display: flex; align-items: stretch; gap: 22px;
    opacity: 0; transform: translateY(30px) scale(0.94);
    animation: stepIn 0.6s cubic-bezier(.34,1.42,.4,1) forwards;
  }
  .step-num {
    flex: none; width: 56px; height: 56px; border-radius: 14px;
    background: var(--accent); color: var(--paper-raised);
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
    font-size: 26px; font-weight: 700; display: flex; align-items: center; justify-content: center;
    margin-top: 6px;
    opacity: 0; transform: scale(0.3) rotate(-25deg);
    animation: chipPop 0.5s cubic-bezier(.34,1.56,.64,1) forwards;
  }
  .step-card {
    flex: 1; padding: 26px 30px; border-radius: 20px;
    background: var(--paper-raised); border: 2px solid rgba(var(--accent-rgb), 0.45);
    box-shadow: 0 10px 22px rgba(36,28,16,0.06);
  }
  .step-text { font-size: 33px; line-height: 1.36; font-weight: 700; color: var(--ink); }

  .connector {
    position: relative; width: 56px; display: flex; align-items: center; justify-content: center; height: 34px;
    opacity: 0; animation: fadeUp 0.4s ease forwards;
  }
  .connector-line {
    position: absolute; top: 0; bottom: 8px; width: 3px; background: rgba(var(--accent-rgb), 0.35);
  }
  .connector-pulse {
    position: absolute; top: 0; width: 10px; height: 10px; border-radius: 50%;
    background: var(--accent); opacity: 0;
    animation: flowPulse 1.1s ease-in-out infinite;
  }
  .arrow-head { color: rgba(var(--accent-rgb), 0.7); font-size: 26px; }

  .closing {
    margin-top: auto; padding-top: 40px; text-align: center;
  }
  .closing-headline {
    display: inline-block; position: relative;
    font-size: 44px; font-weight: 800; line-height: 1.25; color: var(--ink);
    opacity: 0; animation: fadeUp 0.7s ease forwards; animation-delay: ${t.closing}s;
  }
  .closing-headline::after {
    content: ""; position: absolute; left: 50%; bottom: -14px; height: 4px; width: 0%;
    background: var(--accent); border-radius: 4px; transform: translateX(-50%);
    animation: drawLine 0.6s ease forwards; animation-delay: ${(t.closing + 0.5).toFixed(3)}s;
  }
  .outro {
    margin-top: 30px; display: flex; flex-direction: column; align-items: center; gap: 16px;
  }
  .tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
  .tag {
    font-size: 24px; font-weight: 600; color: var(--ink-dim);
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
    opacity: 0; transform: translateY(10px) scale(0.9);
    animation: chipPop 0.4s ease forwards;
  }

  .handle-strip {
    position: absolute; left: 0; right: 0; bottom: 0; height: 110px; z-index: 2;
    background: linear-gradient(0deg, rgba(243,236,218,0.98) 60%, rgba(243,236,218,0));
    display: flex; align-items: center; justify-content: center; gap: 14px;
  }
  .handle-dot {
    width: 12px; height: 12px; border-radius: 50%; background: var(--accent);
    animation: breathe 1.8s ease-in-out infinite;
  }
  .handle-text { display: flex; flex-direction: column; gap: 4px; }
  .handle { font-size: 30px; font-weight: 800; color: var(--accent); }
  .handle-sub { font-size: 24px; font-weight: 500; color: var(--ink-dim); }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes wordIn { from { opacity: 0; transform: translateY(26px) rotate(1.5deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
  @keyframes stepIn { 0% { opacity: 0; transform: translateY(30px) scale(0.94); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes chipPop { 0% { opacity: 0; transform: scale(0.3) rotate(-25deg); } 70% { transform: scale(1.12) rotate(4deg); } 100% { opacity: 1; transform: scale(1) rotate(0deg); } }
  @keyframes flowPulse { 0% { opacity: 0; transform: translateY(-2px); } 30% { opacity: 1; } 100% { opacity: 0; transform: translateY(28px); } }
  @keyframes drawLine { to { width: 90px; } }
  @keyframes fillBar { from { width: 0%; } to { width: 100%; } }
  @keyframes gridDrift { from { transform: translate(0, 0); } to { transform: translate(-46px, -46px); } }
  @keyframes badgePulse { 0%, 100% { box-shadow: 0 6px 16px rgba(36,28,16,0.06); } 50% { box-shadow: 0 6px 22px rgba(var(--accent-rgb), 0.25); } }
  @keyframes breathe { 0%, 100% { opacity: 0.5; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1.15); } }
</style>
</head>
<body>
  <div class="bg"></div>
  <div class="progress-track"><div class="progress-fill"></div></div>
  <div class="stage">
    <div class="badge">${esc(tag)} · THE FLOW</div>
    <div class="title">${titleHtml}</div>
    <div class="hook">${esc(post.hook)}</div>
    <div class="flow-label">STEP BY STEP</div>
    <div class="flow">${stepsHtml}</div>
    <div class="closing">
      <div class="closing-headline">${esc(post.closingQuestion)}</div>
      <div class="outro">
        <div class="tags">${hashtagsHtml}</div>
      </div>
    </div>
  </div>
  <div class="handle-strip">
    <span class="handle-dot"></span>
    <div class="handle-text">
      <div class="handle">@iarsingh</div>
      <div class="handle-sub">follow for more production-engineering breakdowns</div>
    </div>
  </div>
</body>
</html>`,
  };
}

module.exports = { buildHTML, computeTimeline };
