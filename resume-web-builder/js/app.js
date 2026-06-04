import { state, sampleText } from "./state.js";
import { parseResume, extractFile } from "./parser.js";
import { exportHtml, renderPreview } from "./preview.js";
import {
  callOllama,
  htmlList,
  localAddKeywords,
  localPolishSummary,
  localResumeScore,
  localSuggestSections,
  parseJsonArray,
  resumeContext
} from "./ai-assist.js";
import { createChatbot } from "./chatbot.js";
import { escapeHtml } from "./utils.js";

const els = {
  file: document.querySelector("#resumeFile"),
  dropzone: document.querySelector("#dropzone"),
  status: document.querySelector("#statusCard"),
  aiOutput: document.querySelector("#aiOutput"),
  targetRole: document.querySelector("#targetRoleInput"),
  ollamaEnabled: document.querySelector("#ollamaEnabled"),
  ollamaEndpoint: document.querySelector("#ollamaEndpointInput"),
  ollamaModel: document.querySelector("#ollamaModelInput"),
  preview: document.querySelector("#resumePreview"),
  raw: document.querySelector("#rawText"),
  dynamicSections: document.querySelector("#dynamicSections"),
  addSection: document.querySelector("#addSectionBtn"),
  template: document.querySelector("#templateSelect"),
  accent: document.querySelector("#accentColor"),
  background: document.querySelector("#backgroundSelect"),
  density: document.querySelector("#densitySelect"),
  fields: {
    name: document.querySelector("#nameInput"),
    title: document.querySelector("#titleInput"),
    email: document.querySelector("#emailInput"),
    phone: document.querySelector("#phoneInput"),
    location: document.querySelector("#locationInput"),
    linkedin: document.querySelector("#linkedinInput"),
    github: document.querySelector("#githubInput"),
    summary: document.querySelector("#summaryInput"),
    skills: document.querySelector("#skillsInput"),
    experience: document.querySelector("#experienceInput"),
    projects: document.querySelector("#projectsInput"),
    education: document.querySelector("#educationInput")
  }
};

function setStatus(message, type = "info") {
  els.status.textContent = message;
  els.status.dataset.type = type;
}

function syncOllamaSettings() {
  state.ollama.enabled = els.ollamaEnabled.checked;
  state.ollama.endpoint = els.ollamaEndpoint.value.trim().replace(/\/$/, "") || "http://localhost:11434";
  state.ollama.model = els.ollamaModel.value.trim() || "llama3.1:8b";
}

function syncDynamicSectionsFromEditor() {
  state.resume.customSections = Array.from(els.dynamicSections.querySelectorAll(".dynamic-card")).map((card) => ({
    id: card.dataset.sectionId,
    title: card.querySelector(".dynamic-title").value.trim(),
    content: card.querySelector(".dynamic-content").value.trim()
  }));
}

function renderDynamicEditor() {
  els.dynamicSections.innerHTML = state.resume.customSections
    .map(
      (section) => `
        <article class="dynamic-card" data-section-id="${section.id}">
          <div class="dynamic-card-head">
            <label>
              Section title
              <input class="dynamic-title" type="text" value="${escapeHtml(section.title)}">
            </label>
            <div class="dynamic-actions">
              <button class="mini-button move-section-up" type="button">Up</button>
              <button class="mini-button move-section-down" type="button">Down</button>
              <button class="danger-button remove-section" type="button">Remove</button>
            </div>
          </div>
          <label>
            Section content
            <textarea class="dynamic-content">${escapeHtml(section.content)}</textarea>
          </label>
        </article>
      `
    )
    .join("");
}

function syncInputs() {
  Object.entries(els.fields).forEach(([key, input]) => {
    input.value = state.resume[key] || "";
  });
  els.raw.value = state.raw;
  els.template.value = state.template;
  els.accent.value = state.accent;
  els.background.value = state.background;
  els.density.value = state.density;
  els.ollamaEnabled.checked = state.ollama.enabled;
  els.ollamaEndpoint.value = state.ollama.endpoint;
  els.ollamaModel.value = state.ollama.model;
  renderDynamicEditor();
}

function updateFromInputs() {
  Object.entries(els.fields).forEach(([key, input]) => {
    state.resume[key] = input.value.trim();
  });
  state.template = els.template.value;
  state.accent = els.accent.value;
  state.background = els.background.value;
  state.density = els.density.value;
  state.raw = els.raw.value;
  syncOllamaSettings();
  syncDynamicSectionsFromEditor();
  renderPreview(state, els.preview);
}

async function handleFile(file) {
  if (!file) return;
  try {
    setStatus(`Reading ${file.name}...`);
    const text = await extractFile(file);
    state.raw = text;
    state.resume = parseResume(text, state.resume);
    syncInputs();
    renderPreview(state, els.preview);
    setStatus(`Generated web resume from ${file.name}. You can customize it now.`, "success");
  } catch (error) {
    setStatus(`Could not parse file: ${error.message}`, "error");
  }
}

async function polishSummary() {
  syncOllamaSettings();
  const targetRole = els.targetRole.value.trim();
  if (!state.ollama.enabled) {
    localPolishSummary(state, targetRole);
    syncInputs();
    renderPreview(state, els.preview);
    els.aiOutput.innerHTML = `<strong>Summary polished.</strong><br>Optimized for: ${escapeHtml(targetRole || state.resume.title)}.`;
    return;
  }
  try {
    els.aiOutput.innerHTML = `<strong>Ollama working...</strong><br>Polishing summary with ${escapeHtml(state.ollama.model)}.`;
    const result = await callOllama(state, `You are a senior resume writer for cloud, DevOps, and MLOps engineers.
Rewrite the professional summary as one concise paragraph, maximum 75 words.
Keep it truthful, metric-driven, ATS-friendly, and specific to the target role.
Do not use markdown. Do not invent employers or certifications.

Resume data:
${resumeContext(state, targetRole)}`);
    if (!result) throw new Error("Empty Ollama response");
    state.resume.summary = result.replace(/^["']|["']$/g, "");
    syncInputs();
    renderPreview(state, els.preview);
    els.aiOutput.innerHTML = `<strong>Ollama summary applied.</strong><br>Model: ${escapeHtml(state.ollama.model)}.`;
  } catch (error) {
    localPolishSummary(state, targetRole);
    syncInputs();
    renderPreview(state, els.preview);
    els.aiOutput.innerHTML = `<strong>Ollama fallback used.</strong><br>${escapeHtml(error.message)}.`;
  }
}

async function addKeywords() {
  syncOllamaSettings();
  if (!state.ollama.enabled) {
    const keywords = localAddKeywords(state);
    syncInputs();
    renderPreview(state, els.preview);
    els.aiOutput.innerHTML = `<strong>Keywords extracted.</strong>${htmlList(keywords)}`;
    return;
  }
  try {
    els.aiOutput.innerHTML = `<strong>Ollama working...</strong><br>Extracting ATS keywords.`;
    const result = await callOllama(state, `Extract 18 to 28 ATS keywords from this resume for cloud DevOps and MLOps roles.
Return only a JSON array of strings. No markdown.

Resume data:
${resumeContext(state, els.targetRole.value.trim())}`);
    const keywords = parseJsonArray(result).filter((item) => typeof item === "string");
    if (!keywords.length) throw new Error("Could not parse keyword JSON");
    state.resume.skills = Array.from(new Set([...state.resume.skills.split(",").map((item) => item.trim()), ...keywords])).join(", ");
    syncInputs();
    renderPreview(state, els.preview);
    els.aiOutput.innerHTML = `<strong>Ollama keywords applied.</strong>${htmlList(keywords)}`;
  } catch (error) {
    const keywords = localAddKeywords(state);
    syncInputs();
    renderPreview(state, els.preview);
    els.aiOutput.innerHTML = `<strong>Ollama fallback used.</strong><br>${escapeHtml(error.message)}.${htmlList(keywords)}`;
  }
}

async function suggestSections() {
  syncOllamaSettings();
  if (!state.ollama.enabled) {
    const suggestions = localSuggestSections(state);
    syncInputs();
    renderPreview(state, els.preview);
    els.aiOutput.innerHTML = suggestions.length ? `<strong>Suggested sections added.</strong>${htmlList(suggestions)}` : "<strong>No new section suggestions.</strong>";
    return;
  }
  try {
    els.aiOutput.innerHTML = `<strong>Ollama working...</strong><br>Suggesting portfolio sections.`;
    const result = await callOllama(state, `Suggest 3 to 5 extra web-resume sections for this candidate.
Return only a JSON array of objects with "title" and "content" fields.
No markdown.

Resume data:
${resumeContext(state, els.targetRole.value.trim())}`);
    const suggestions = parseJsonArray(result).filter((item) => item && item.title && item.content);
    if (!suggestions.length) throw new Error("Could not parse section JSON");
    const existing = new Set(state.resume.customSections.map((section) => section.title.toLowerCase()));
    suggestions.forEach((section) => {
      if (!existing.has(section.title.toLowerCase())) {
        state.resume.customSections.push({
          id: crypto.randomUUID(),
          title: section.title,
          content: Array.isArray(section.content) ? section.content.join("\n") : String(section.content)
        });
      }
    });
    syncInputs();
    renderPreview(state, els.preview);
    els.aiOutput.innerHTML = `<strong>Ollama sections added.</strong>${htmlList(suggestions.map((section) => section.title))}`;
  } catch (error) {
    const suggestions = localSuggestSections(state);
    syncInputs();
    renderPreview(state, els.preview);
    els.aiOutput.innerHTML = `<strong>Ollama fallback used.</strong><br>${escapeHtml(error.message)}.${htmlList(suggestions)}`;
  }
}

async function scoreResume() {
  const result = localResumeScore(state);
  els.aiOutput.innerHTML = `<strong>Resume score: ${result.score}/100</strong><ul>${result.checks
    .map(([label, ok]) => `<li>${ok ? "Pass" : "Improve"}: ${escapeHtml(label)}</li>`)
    .join("")}</ul>`;
}

function bindTabs() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));
      tab.classList.add("active");
      document.querySelector(`#${tab.dataset.tab}Panel`).classList.add("active");
    });
  });
}

function bindEvents() {
  bindTabs();
  els.file.addEventListener("change", (event) => handleFile(event.target.files[0]));
  els.dropzone.addEventListener("dragover", (event) => {
    event.preventDefault();
    els.dropzone.classList.add("is-dragging");
  });
  els.dropzone.addEventListener("dragleave", () => els.dropzone.classList.remove("is-dragging"));
  els.dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    els.dropzone.classList.remove("is-dragging");
    handleFile(event.dataTransfer.files[0]);
  });

  document.querySelector("#sampleBtn").addEventListener("click", () => {
    state.raw = sampleText;
    state.resume = parseResume(sampleText, state.resume);
    syncInputs();
    renderPreview(state, els.preview);
    setStatus("Sample resume generated. Customize and export it.");
  });
  document.querySelector("#downloadBtn").addEventListener("click", () => exportHtml(state, els.preview));
  document.querySelector("#parseRawBtn").addEventListener("click", () => {
    state.raw = els.raw.value;
    state.resume = parseResume(state.raw, state.resume);
    syncInputs();
    renderPreview(state, els.preview);
    setStatus("Generated web resume from pasted text.");
  });

  document.querySelector("#aiPolishBtn").addEventListener("click", polishSummary);
  document.querySelector("#aiKeywordsBtn").addEventListener("click", addKeywords);
  document.querySelector("#aiSectionsBtn").addEventListener("click", suggestSections);
  document.querySelector("#aiScoreBtn").addEventListener("click", scoreResume);

  els.addSection.addEventListener("click", () => {
    syncDynamicSectionsFromEditor();
    state.resume.customSections.push({
      id: crypto.randomUUID(),
      title: "New Section",
      content: "Add bullet points or short paragraphs here."
    });
    renderDynamicEditor();
    renderPreview(state, els.preview);
  });

  els.dynamicSections.addEventListener("click", (event) => {
    const card = event.target.closest(".dynamic-card");
    if (!card) return;
    if (event.target.classList.contains("move-section-up") || event.target.classList.contains("move-section-down")) {
      syncDynamicSectionsFromEditor();
      const index = state.resume.customSections.findIndex((section) => section.id === card.dataset.sectionId);
      const delta = event.target.classList.contains("move-section-up") ? -1 : 1;
      const nextIndex = index + delta;
      if (index >= 0 && nextIndex >= 0 && nextIndex < state.resume.customSections.length) {
        const [section] = state.resume.customSections.splice(index, 1);
        state.resume.customSections.splice(nextIndex, 0, section);
        renderDynamicEditor();
        renderPreview(state, els.preview);
      }
      return;
    }
    if (!event.target.classList.contains("remove-section")) return;
    state.resume.customSections = state.resume.customSections.filter((section) => section.id !== card.dataset.sectionId);
    renderDynamicEditor();
    renderPreview(state, els.preview);
  });

  els.dynamicSections.addEventListener("input", () => {
    syncDynamicSectionsFromEditor();
    renderPreview(state, els.preview);
  });
  Object.values(els.fields).forEach((input) => input.addEventListener("input", updateFromInputs));
  [els.template, els.accent, els.background, els.density, els.raw].forEach((input) => input.addEventListener("input", updateFromInputs));
  [els.ollamaEnabled, els.ollamaEndpoint, els.ollamaModel].forEach((input) => input.addEventListener("input", syncOllamaSettings));
}

syncInputs();
syncOllamaSettings();
renderPreview(state, els.preview);
bindEvents();
createChatbot({ state, renderPreview: () => renderPreview(state, els.preview) });
