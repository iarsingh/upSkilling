import { escapeHtml, lines } from "./utils.js";
import { extractKeywords, localResumeScore, resumeTextBlob } from "./ai-assist.js";

function answerQuestion(state, question) {
  const q = question.toLowerCase();
  const resume = state.resume;

  if (/name|candidate|who/.test(q)) return `Candidate name: ${resume.name || "Not found yet."}`;
  if (/email|mail/.test(q)) return `Email: ${resume.email || "Not found yet."}`;
  if (/phone|mobile|contact/.test(q)) return `Phone: ${resume.phone || "Not found yet."}`;
  if (/location|city|where/.test(q)) return `Location: ${resume.location || "Not found yet."}`;
  if (/linkedin/.test(q)) return `LinkedIn: ${resume.linkedin || "Not found yet."}`;
  if (/github/.test(q)) return `GitHub: ${resume.github || "Not found yet."}`;
  if (/title|role|designation/.test(q)) return `Target/current role: ${resume.title || "Not found yet."}`;
  if (/summary|profile|about/.test(q)) return resume.summary || "Summary is not available yet.";
  if (/skill|tech|stack|keyword/.test(q)) {
    const keywords = extractKeywords(resumeTextBlob(resume));
    return keywords.length ? `Detected skills/keywords: ${keywords.join(", ")}` : resume.skills || "No skills found yet.";
  }
  if (/experience|company|work/.test(q)) return lines(resume.experience).slice(0, 8).join("\n") || "Experience is not available yet.";
  if (/project/.test(q)) return lines(resume.projects).slice(0, 8).join("\n") || "Projects are not available yet.";
  if (/education|degree|certification|certificate/.test(q)) return resume.education || "Education/certification details are not available yet.";
  if (/missing|improve|score|ats/.test(q)) {
    const result = localResumeScore(state);
    const misses = result.checks.filter(([, ok]) => !ok).map(([label]) => label);
    return `Resume score: ${result.score}/100\n${misses.length ? `Improve: ${misses.join(", ")}` : "Looks strong across the current checks."}`;
  }
  if (/section|custom/.test(q)) {
    return resume.customSections.length
      ? `Custom sections: ${resume.customSections.map((section) => section.title).join(", ")}`
      : "No custom sections yet. Add Awards, Open Source, Publications, or Leadership.";
  }

  return "I can answer basics from the parsed resume. Try: name, email, skills, experience, projects, education, GitHub, LinkedIn, score, or missing details.";
}

export function createChatbot({ state, renderPreview }) {
  const messages = document.querySelector("#chatMessages");
  const input = document.querySelector("#chatInput");
  const form = document.querySelector("#chatForm");
  const quickButtons = document.querySelectorAll("[data-chat-question]");

  function addMessage(sender, text) {
    const node = document.createElement("div");
    node.className = `chat-message ${sender}`;
    node.innerHTML = `<strong>${sender === "bot" ? "Builder Bot" : "You"}</strong><p>${escapeHtml(text).replace(/\n/g, "<br>")}</p>`;
    messages.appendChild(node);
    messages.scrollTop = messages.scrollHeight;
  }

  function ask(question) {
    const clean = question.trim();
    if (!clean) return;
    addMessage("user", clean);
    addMessage("bot", answerQuestion(state, clean));
    input.value = "";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    ask(input.value);
  });

  quickButtons.forEach((button) => {
    button.addEventListener("click", () => ask(button.dataset.chatQuestion));
  });

  addMessage("bot", "Upload or paste a resume, then ask me for basic details like skills, email, projects, experience, or missing ATS items.");

  return { ask };
}
