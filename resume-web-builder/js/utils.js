export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function lines(value = "") {
  return String(value)
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function titleCase(value) {
  return String(value)
    .toLowerCase()
    .replace(/\b[a-z]/g, (char) => char.toUpperCase())
    .replace(/\bMlops\b/g, "MLOps")
    .replace(/\bLlmoPs\b/g, "LLMOps")
    .replace(/\bAi\b/g, "AI");
}

export function sectionText(text, startLabels, endLabels) {
  const upper = text.toUpperCase();
  const starts = startLabels.map((label) => upper.indexOf(label)).filter((index) => index >= 0);
  if (!starts.length) return "";
  const start = Math.min(...starts);
  const afterStartLine = text.indexOf("\n", start);
  const contentStart = afterStartLine >= 0 ? afterStartLine + 1 : start;
  const endCandidates = endLabels
    .map((label) => upper.indexOf(label, contentStart))
    .filter((index) => index > contentStart);
  const end = endCandidates.length ? Math.min(...endCandidates) : text.length;
  return text.slice(contentStart, end).trim();
}

export function renderList(value) {
  const items = lines(value);
  if (!items.length) return "<p>No content added yet.</p>";
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}
