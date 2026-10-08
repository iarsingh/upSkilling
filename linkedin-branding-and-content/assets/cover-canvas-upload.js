(async () => {
  const W = 1584, H = 396, S = 2;
  const c = document.createElement("canvas");
  c.width = W * S;
  c.height = H * S;
  const ctx = c.getContext("2d");
  const text = "#f4f8fc", muted = "#a8b8c6", accent = "#2dd4bf";

  const mul = (a) => () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const rnd = mul(42);

  ctx.fillStyle = "#060a10";
  ctx.fillRect(0, 0, c.width, c.height);

  const glow = (color, x, y, r, a) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.save();
    ctx.globalAlpha = a;
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };
  glow("rgb(45,212,191)", 180 * S, 40 * S, 420 * S, 0.16);
  glow("rgb(56,189,248)", 1280 * S, 20 * S, 520 * S, 0.20);
  glow("rgb(99,102,241)", 1420 * S, 260 * S, 380 * S, 0.22);

  const pts = [];
  for (let i = 0; i < 72; i++) {
    const a = rnd() * Math.PI * 2;
    const r = Math.pow(rnd(), 0.55);
    pts.push([
      (1180 + Math.cos(a) * r * 390) * S,
      (198 + Math.sin(a) * r * 210) * S,
    ]);
  }
  const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  ctx.lineWidth = 1.2 * S;
  for (let i = 0; i < pts.length; i++) {
    const near = pts
      .map((p, j) => [dist(pts[i], p), j])
      .filter((x) => x[1] !== i)
      .sort((a, b) => a[0] - b[0])
      .slice(0, 4);
    for (const [d, j] of near) {
      if (d > 170 * S) continue;
      ctx.strokeStyle = `rgba(45,212,191,${0.08 + 0.18 * (1 - d / (170 * S))})`;
      ctx.beginPath();
      ctx.moveTo(pts[i][0], pts[i][1]);
      ctx.lineTo(pts[j][0], pts[j][1]);
      ctx.stroke();
    }
    if (near.length >= 2 && near[0][0] < 130 * S && near[1][0] < 130 * S) {
      ctx.fillStyle = "rgba(45,212,191,0.045)";
      ctx.beginPath();
      ctx.moveTo(pts[i][0], pts[i][1]);
      ctx.lineTo(pts[near[0][1]][0], pts[near[0][1]][1]);
      ctx.lineTo(pts[near[1][1]][0], pts[near[1][1]][1]);
      ctx.closePath();
      ctx.fill();
    }
  }
  for (const [x, y] of pts) {
    const r = (1.6 + rnd() * 2.4) * S;
    glow("rgb(125,240,220)", x, y, r * 6, 0.35);
    ctx.fillStyle = "rgba(165,255,238,0.95)";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const scrim = ctx.createLinearGradient(0, 0, 980 * S, 0);
  scrim.addColorStop(0, "rgba(6,10,16,0.92)");
  scrim.addColorStop(0.38, "rgba(6,10,16,0.86)");
  scrim.addColorStop(0.72, "rgba(6,10,16,0.28)");
  scrim.addColorStop(1, "rgba(6,10,16,0)");
  ctx.fillStyle = scrim;
  ctx.fillRect(0, 0, 980 * S, c.height);

  ctx.fillStyle = "rgba(45,212,191,0.86)";
  ctx.fillRect(0, 0, c.width, 3 * S);

  const rr = (x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };
  ctx.fillStyle = "rgba(8,18,22,0.8)";
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2 * S;
  rr(36 * S, 26 * S, 50 * S, 50 * S, 14 * S);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = accent;
  ctx.font = `700 ${16 * S}px Avenir Next, Helvetica Neue, sans-serif`;
  ctx.textBaseline = "middle";
  ctx.fillText("AR", 47 * S, 52 * S);

  const x0 = 418 * S;
  ctx.textBaseline = "top";
  ctx.font = `500 ${13 * S}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  ctx.fillStyle = accent;
  ctx.fillText("PLATFORM   ·   DEVSECOPS   ·   FDE", x0, 58 * S);

  ctx.shadowColor = "rgba(45,212,191,0.35)";
  ctx.shadowBlur = 18 * S;
  ctx.fillStyle = text;
  ctx.font = `800 ${46 * S}px Avenir Next, Helvetica Neue, sans-serif`;
  ctx.fillText("Platform & DevSecOps Engineer", x0, 86 * S);
  ctx.shadowBlur = 0;

  ctx.fillStyle = muted;
  ctx.font = `500 ${20 * S}px Avenir Next, Helvetica Neue, sans-serif`;
  ctx.fillText("Kubernetes   ·   Terraform   ·   GitOps   ·   MLOps", x0, 152 * S);
  ctx.fillStyle = accent;
  ctx.fillRect(x0, 196 * S, 56 * S, 4 * S);

  const chips = ["GCP", "Kubernetes", "Terraform", "GitOps", "Python"];
  ctx.font = `600 ${15 * S}px Avenir Next, Helvetica Neue, sans-serif`;
  let cx = x0, cy = 222 * S, padX = 18 * S, chipH = 34 * S;
  for (const label of chips) {
    const tw = ctx.measureText(label).width, w = tw + padX * 2;
    ctx.fillStyle = "rgba(8,28,30,0.9)";
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2 * S;
    rr(cx, cy, w, chipH, 17 * S);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = accent;
    ctx.textBaseline = "middle";
    ctx.fillText(label, cx + padX, cy + chipH / 2);
    ctx.textBaseline = "top";
    cx += w + 10 * S;
  }

  const caption = "GitOps   ·   GKE   ·   Terraform   ·   Observe";
  ctx.font = `500 ${13 * S}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  ctx.fillStyle = "rgba(168,184,198,0.82)";
  const capW = ctx.measureText(caption).width;
  ctx.fillText(caption, c.width - 48 * S - capW, H * S - 42 * S);

  const out = document.createElement("canvas");
  out.width = W;
  out.height = H;
  const octx = out.getContext("2d");
  octx.imageSmoothingQuality = "high";
  octx.drawImage(c, 0, 0, W, H);
  const blob = await new Promise((r) => out.toBlob(r, "image/png"));
  const file = new File([blob], "linkedin-cover-1584x396-upload.png", { type: "image/png" });
  window.__coverFile = file;
  return { ok: true, size: file.size, w: W, h: H };
})()
