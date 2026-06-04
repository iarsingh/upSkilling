import { escapeHtml, renderList } from "./utils.js";

export function renderCustomSections(customSections = []) {
  return customSections
    .map(
      (section) => `
        <section class="resume-section">
          <h3>${escapeHtml(section.title || "Custom Section")}</h3>
          ${renderList(section.content || "")}
        </section>
      `
    )
    .join("");
}

export function renderPreview(state, previewEl) {
  const resume = state.resume;
  previewEl.style.setProperty("--preview-accent", state.accent);
  previewEl.className = `resume-preview template-${state.template} bg-${state.background} density-${state.density}`;
  previewEl.innerHTML = `
    <div class="resume-inner">
      <header class="resume-hero">
        <div>
          <h2 class="resume-name">${escapeHtml(resume.name)}</h2>
          <p class="resume-title">${escapeHtml(resume.title)}</p>
        </div>
        <div class="resume-contact">
          <span>${escapeHtml(resume.email)}</span>
          <span>${escapeHtml(resume.phone)}</span>
          <span>${escapeHtml(resume.location)}</span>
          <span>${escapeHtml(resume.linkedin)}</span>
          <span>${escapeHtml(resume.github)}</span>
        </div>
      </header>
      <section class="resume-section">
        <h3>Summary</h3>
        <p>${escapeHtml(resume.summary)}</p>
      </section>
      <section class="resume-section">
        <h3>Skills</h3>
        <p>${escapeHtml(resume.skills)}</p>
      </section>
      <section class="resume-section">
        <h3>Experience</h3>
        ${renderList(resume.experience)}
      </section>
      <section class="resume-section">
        <h3>Projects</h3>
        ${renderList(resume.projects)}
      </section>
      <section class="resume-section">
        <h3>Education & Certifications</h3>
        ${renderList(resume.education)}
      </section>
      ${renderCustomSections(resume.customSections)}
    </div>
  `;
}

export function exportHtml(state, previewEl) {
  const styles = Array.from(document.styleSheets)
    .map((sheet) => {
      try {
        return Array.from(sheet.cssRules).map((rule) => rule.cssText).join("\n");
      } catch {
        return "";
      }
    })
    .join("\n");

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(state.resume.name)} | Web Resume</title>
  <style>${styles}</style>
</head>
<body>
  <main style="width:min(980px,calc(100% - 28px));margin:28px auto;">
    ${previewEl.outerHTML}
  </main>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${state.resume.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "web-resume"}.html`;
  link.click();
  URL.revokeObjectURL(link.href);
}
