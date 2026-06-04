const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const { execFileSync } = require("child_process");
const { assetsDir } = require("./config");

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapText(text, maxChars) {
  const words = String(text).split(/\s+/);
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
  return lines.slice(0, 4);
}

function createSvg(post, slug) {
  const title = wrapText(post.imageTitle, 28);
  const subtitle = wrapText(post.imageSubtitle, 42);
  const svgPath = path.join(assetsDir, `${slug}.svg`);
  const titleLines = title.map((line, index) => {
    return `<text x="82" y="${196 + index * 66}" class="title">${escapeXml(line)}</text>`;
  }).join("\n");
  const subtitleStart = 196 + title.length * 66 + 44;
  const subtitleLines = subtitle.map((line, index) => {
    return `<text x="86" y="${subtitleStart + index * 36}" class="subtitle">${escapeXml(line)}</text>`;
  }).join("\n");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#07111f"/>
      <stop offset="48%" stop-color="#0f5132"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#020617" flood-opacity="0.35"/>
    </filter>
    <style>
      .eyebrow { font: 700 24px Arial, sans-serif; fill: #bbf7d0; letter-spacing: 3px; }
      .title { font: 800 58px Arial, sans-serif; fill: #f8fafc; }
      .subtitle { font: 500 28px Arial, sans-serif; fill: #e2e8f0; }
      .footer { font: 700 24px Arial, sans-serif; fill: #fef3c7; }
    </style>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <circle cx="1050" cy="90" r="170" fill="#ffffff" opacity="0.09"/>
  <circle cx="110" cy="630" r="210" fill="#ffffff" opacity="0.08"/>
  <rect x="56" y="56" width="1088" height="563" rx="34" fill="#020617" opacity="0.42" filter="url(#shadow)"/>
  <rect x="82" y="88" width="180" height="8" rx="4" fill="#22c55e"/>
  <text x="82" y="144" class="eyebrow">DAILY ENGINEERING NOTE</text>
  ${titleLines}
  ${subtitleLines}
  <text x="82" y="574" class="footer">Akhilesh Ranjan Singh | ML Platform &amp; DevOps</text>
</svg>`;

  fs.writeFileSync(svgPath, svg, "utf8");
  return svgPath;
}

function convertSvgToPng(svgPath) {
  const pngPath = svgPath.replace(/\.svg$/, ".png");
  try {
    execFileSync("sips", ["-s", "format", "png", svgPath, "--out", pngPath], { stdio: "ignore" });
    return pngPath;
  } catch {
    return "";
  }
}

function crc32(buffer) {
  let crc = ~0;
  for (let i = 0; i < buffer.length; i += 1) {
    crc ^= buffer[i];
    for (let j = 0; j < 8; j += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return ~crc >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  const crc = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function seededNumber(seed) {
  let value = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    value ^= seed.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

function createNativePng(post, slug) {
  const width = 1200;
  const height = 675;
  const raw = Buffer.alloc((width * 4 + 1) * height);
  const seed = seededNumber(`${slug}-${post.imageTitle}-${post.imageSubtitle}`);
  const palette = [
    [7, 17, 31],
    [15, 81, 50],
    [245, 158, 11],
    [34, 197, 94],
    [226, 232, 240]
  ];

  for (let y = 0; y < height; y += 1) {
    const row = y * (width * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < width; x += 1) {
      const t = (x / width + y / height) / 2;
      const wave = Math.sin((x + seed % 300) / 85) * 18 + Math.cos((y + seed % 200) / 60) * 14;
      const r = Math.round(palette[0][0] * (1 - t) + palette[2][0] * t + wave);
      const g = Math.round(palette[0][1] * (1 - t) + palette[1][1] * t + wave / 2);
      const b = Math.round(palette[0][2] * (1 - t) + palette[1][2] * t);
      const idx = row + 1 + x * 4;
      raw[idx] = Math.max(0, Math.min(255, r));
      raw[idx + 1] = Math.max(0, Math.min(255, g));
      raw[idx + 2] = Math.max(0, Math.min(255, b));
      raw[idx + 3] = 255;
    }
  }

  function rect(x0, y0, w, h, color, alpha = 1) {
    for (let y = y0; y < Math.min(height, y0 + h); y += 1) {
      for (let x = x0; x < Math.min(width, x0 + w); x += 1) {
        const idx = y * (width * 4 + 1) + 1 + x * 4;
        raw[idx] = Math.round(raw[idx] * (1 - alpha) + color[0] * alpha);
        raw[idx + 1] = Math.round(raw[idx + 1] * (1 - alpha) + color[1] * alpha);
        raw[idx + 2] = Math.round(raw[idx + 2] * (1 - alpha) + color[2] * alpha);
      }
    }
  }

  rect(56, 56, 1088, 563, [2, 6, 23], 0.42);
  rect(82, 88, 180, 8, palette[3], 0.95);
  rect(82, 520, 420, 14, [254, 243, 199], 0.85);
  rect(82, 552, 650, 8, palette[4], 0.38);

  for (let i = 0; i < 18; i += 1) {
    const x = 760 + ((seed >> (i % 16)) % 310);
    const y = 110 + ((seed >> ((i + 5) % 16)) % 390);
    const size = 28 + ((seed + i * 31) % 82);
    const color = i % 3 === 0 ? palette[3] : i % 3 === 1 ? palette[2] : palette[4];
    rect(x, y, size, size, color, 0.18 + (i % 4) * 0.05);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", zlib.deflateSync(raw)),
    pngChunk("IEND", Buffer.alloc(0))
  ]);

  const pngPath = path.join(assetsDir, `${slug}.png`);
  fs.writeFileSync(pngPath, png);
  return pngPath;
}

function createImage(post, slug) {
  fs.mkdirSync(assetsDir, { recursive: true });
  const svgPath = createSvg(post, slug);
  const pngPath = convertSvgToPng(svgPath);
  return { svgPath, pngPath: pngPath || createNativePng(post, slug) };
}

module.exports = { createImage };
