import { escapeHtml, lines } from "./utils.js";

export function resumeTextBlob(resume) {
  return [
    resume.title,
    resume.summary,
    resume.skills,
    resume.experience,
    resume.projects,
    resume.education,
    ...resume.customSections.map((section) => `${section.title}\n${section.content}`)
  ].join("\n");
}

export function extractKeywords(text) {
  const known = [
    "GCP", "AWS", "Azure", "Kubernetes", "GKE", "EKS", "AKS", "Docker", "Terraform", "Ansible",
    "Jenkins", "GitHub Actions", "GitLab CI", "Cloud Build", "Argo CD", "GitOps", "Kubeflow",
    "MLflow", "Vertex AI", "BigQuery", "Pub/Sub", "Feature Store", "Model Registry", "MLOps",
    "LLMOps", "AIOps", "Prometheus", "Grafana", "ELK", "OpenTelemetry", "Vault", "Kafka",
    "Python", "Bash", "Go", "CI/CD", "SLO", "RBAC", "IAM"
  ];
  return known.filter((keyword) => new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(text));
}

export function metricScore(text) {
  return (text.match(/\b\d+(?:\.\d+)?%|\b\d+x|\b\d+\+|\bunder \d+ hours|\b\d+ hours/gi) || []).length;
}

export function resumeContext(state, targetRole) {
  return JSON.stringify(
    {
      targetRole: targetRole || state.resume.title,
      profile: {
        name: state.resume.name,
        title: state.resume.title,
        summary: state.resume.summary,
        skills: state.resume.skills
      },
      experience: state.resume.experience,
      projects: state.resume.projects,
      education: state.resume.education,
      customSections: state.resume.customSections
    },
    null,
    2
  );
}

export async function callOllama(state, prompt) {
  if (!state.ollama.enabled) return "";
  const response = await fetch(`${state.ollama.endpoint}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: state.ollama.model,
      prompt,
      stream: false,
      options: { temperature: 0.25 }
    })
  });
  if (!response.ok) throw new Error(`Ollama returned ${response.status}`);
  const data = await response.json();
  return (data.response || "").trim();
}

export function parseJsonArray(text) {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const match = cleaned.match(/\[[\s\S]*\]/);
  if (!match) return [];
  try {
    return JSON.parse(match[0]);
  } catch {
    return [];
  }
}

export function localPolishSummary(state, targetRole) {
  const role = targetRole || state.resume.title || "MLOps Engineer";
  const keywords = extractKeywords(resumeTextBlob(state.resume)).slice(0, 8);
  const metrics = metricScore(resumeTextBlob(state.resume));
  const cloudScope = ["GCP", "AWS", "Azure"].filter((cloud) => keywords.includes(cloud)).join(", ") || "cloud platforms";
  const keywordPhrase = keywords.length ? keywords.join(", ") : "Kubernetes, Terraform, CI/CD, observability, and MLOps";
  state.resume.summary = `${role} with 6.7+ years of experience building production-grade ML and DevOps platforms across ${cloudScope}. Strong hands-on background in ${keywordPhrase}, with measurable impact across deployment speed, reliability, observability, and release governance${metrics ? ` backed by ${metrics}+ quantified outcomes` : ""}.`;
}

export function localAddKeywords(state) {
  const keywords = extractKeywords(resumeTextBlob(state.resume));
  state.resume.skills = Array.from(new Set([...lines(state.resume.skills.replaceAll(",", "\n")), ...keywords])).join(", ");
  return keywords;
}

export function localSuggestSections(state) {
  const text = resumeTextBlob(state.resume);
  const suggestions = [];
  if (/open source|github|portfolio/i.test(text)) suggestions.push(["Open Source", "Add GitHub portfolio links, reusable modules, and engineering blueprints."]);
  if (/certification|certified|google|azure|aws/i.test(text)) suggestions.push(["Certifications", "Group cloud and DevOps certifications with dates and issuing bodies."]);
  if (/award|recogn/i.test(text)) suggestions.push(["Awards", "List recognitions, delivery awards, or client appreciation notes."]);
  if (/publication|blog|article/i.test(text)) suggestions.push(["Publications", "Add blogs, technical writeups, talks, or learning-in-public posts."]);
  if (/mentor|training|lead/i.test(text)) suggestions.push(["Leadership", "Highlight mentoring, platform ownership, release governance, and stakeholder collaboration."]);
  const existing = new Set(state.resume.customSections.map((section) => section.title.toLowerCase()));
  suggestions.forEach(([title, content]) => {
    if (!existing.has(title.toLowerCase())) state.resume.customSections.push({ id: crypto.randomUUID(), title, content });
  });
  return suggestions.map(([title]) => title);
}

export function localResumeScore(state) {
  const text = resumeTextBlob(state.resume);
  const checks = [
    ["Contact info", Boolean(state.resume.email && state.resume.phone)],
    ["Quantified outcomes", metricScore(text) >= 4],
    ["Cloud keywords", extractKeywords(text).filter((item) => ["GCP", "AWS", "Azure"].includes(item)).length >= 2],
    ["MLOps keywords", /MLOps|MLflow|Kubeflow|Vertex AI|Model Registry/i.test(text)],
    ["Observability", /Prometheus|Grafana|ELK|OpenTelemetry|SLO|MTTR/i.test(text)],
    ["Projects", state.resume.projects.length > 80],
    ["Custom portfolio sections", state.resume.customSections.length >= 1]
  ];
  const passed = checks.filter(([, ok]) => ok).length;
  return {
    score: Math.round((passed / checks.length) * 100),
    checks
  };
}

export function htmlList(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}
