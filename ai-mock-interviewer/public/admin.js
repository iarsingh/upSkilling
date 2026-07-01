const STORAGE_KEY = "aiMockInterviewerState";

const els = {
  refreshReport: document.querySelector("#refreshReport"),
  currentInterviewTitle: document.querySelector("#currentInterviewTitle"),
  answeredCount: document.querySelector("#answeredCount"),
  remainingCount: document.querySelector("#remainingCount"),
  totalCount: document.querySelector("#totalCount"),
  completionRate: document.querySelector("#completionRate"),
  adminProgress: document.querySelector("#adminProgress"),
  practiceLabel: document.querySelector("#practiceLabel"),
  roleLabel: document.querySelector("#roleLabel"),
  generatedCount: document.querySelector("#generatedCount"),
  allAnsweredCount: document.querySelector("#allAnsweredCount"),
  interviewCount: document.querySelector("#interviewCount"),
  reportCount: document.querySelector("#reportCount"),
  topicBreakdown: document.querySelector("#topicBreakdown"),
  answeredQuestions: document.querySelector("#answeredQuestions"),
  reportHistory: document.querySelector("#reportHistory")
};

const technologyLabels = {
  all: "All technologies",
  kubernetes: "Kubernetes / GKE",
  docker: "Docker / Containers",
  gcp: "Google Cloud Platform",
  terraform: "Terraform / IaC",
  python: "Python automation",
  fastapi: "FastAPI backend",
  go: "Go programming",
  scripting: "Scripting & automation",
  coding: "Coding exercises",
  sre: "SRE / reliability",
  mlops: "MLOps / Vertex AI",
  cicd: "CI/CD / GitOps",
  observability: "Observability",
  security: "Cloud / DevSecOps security",
  networking: "Cloud networking",
  linux: "Linux / systems",
  platform: "Platform engineering",
  "tech-risk-technical": "Technology risk - technical",
  "tech-risk-behavioral": "Technology risk - behavioural",
  scenario: "Scenario-based questions"
};

const localBankCounts = {
  all: 378,
  python: 12,
  fastapi: 12,
  go: 12,
  scripting: 20,
  docker: 20,
  coding: 20,
  "tech-risk-technical": 12,
  "tech-risk-behavioral": 12
};

let mockInterviewSets = [];
let practicePlan = [];
let largeQuestionBankCount = 0;

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function currentInterview(state) {
  const interviews = Array.isArray(state.interviews) ? state.interviews : [];
  const number = Math.max(1, Number(state.interviewNumber || 1));
  return interviews[number - 1] || { number, answers: [], questionHistory: [] };
}

function countCurrentPool(state) {
  const mockSet = state.mockSet || "all";
  const practiceDay = state.practiceDay || "all";
  const technology = state.technology || "all";

  if (mockSet && mockSet !== "all" && mockSet !== "random-bank" && mockSet !== "custom-jd" && !mockSet.startsWith("day-")) {
    const set = mockInterviewSets.find((item) => item.id === mockSet);
    if (set) return { total: set.questions?.length || 0, label: set.title };
  }

  if (mockSet?.startsWith("day-") || practiceDay !== "all") {
    const dayNumber = mockSet?.startsWith("day-") ? mockSet.replace("day-", "") : practiceDay;
    const day = practicePlan.find((item) => String(item.day) === String(dayNumber));
    if (day) return { total: day.questions?.length || 0, label: `Day ${dayNumber} practice` };
  }

  if (mockSet === "custom-jd") return { total: 10, label: "Custom JD mock interview" };
  if (mockSet === "random-bank") {
    return {
      total: largeQuestionBankCount + localBankCounts.all,
      label: "Random full bank mock interview"
    };
  }

  if (technology !== "all" && localBankCounts[technology]) {
    return {
      total: localBankCounts[technology],
      label: technologyLabels[technology] || technology
    };
  }

  return {
    total: largeQuestionBankCount + localBankCounts.all,
    label: technologyLabels[technology] || "All questions"
  };
}

function practiceLabel(state) {
  const pool = countCurrentPool(state);
  const technology = technologyLabels[state.technology || "all"] || "All technologies";
  return state.technology && state.technology !== "all" && !pool.label.includes(technology)
    ? `${pool.label} - ${technology}`
    : pool.label;
}

function summarizeTopics(records) {
  const counts = {};
  for (const record of records) {
    const label = record.practice || "Unlabeled practice";
    counts[label] = (counts[label] || 0) + Number(record.questionCount || 0);
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
}

function renderAnsweredQuestions(session) {
  const answers = Array.isArray(session.answers) ? session.answers : [];
  if (!answers.length) {
    els.answeredQuestions.innerHTML = `<p class="admin-empty">No answers saved in the current interview yet.</p>`;
    return;
  }

  els.answeredQuestions.innerHTML = answers.map((item, index) => `
    <details class="admin-item">
      <summary>
        <span>Question ${index + 1}</span>
        <strong>${escapeHtml(item.question || "Untitled question")}</strong>
      </summary>
      <p>${escapeHtml(item.answer || "No answer text saved.")}</p>
    </details>
  `).join("");
}

function renderReportHistory(records) {
  if (!records.length) {
    els.reportHistory.innerHTML = `<p class="admin-empty">No final feedback reports yet. End an interview to create one.</p>`;
    return;
  }

  els.reportHistory.innerHTML = records.map((record) => {
    const date = record.completedAt
      ? new Date(record.completedAt).toLocaleString()
      : "Unknown date";
    return `
      <details class="admin-item">
        <summary>
          <span>${escapeHtml(date)}</span>
          <strong>${escapeHtml(record.practice || `Interview ${record.interviewNumber || ""}`)}</strong>
          <small>${Number(record.questionCount || 0)} answered</small>
        </summary>
        <div class="admin-report-text">${record.feedbackHtml || escapeHtml(record.feedbackText || "No report text saved.")}</div>
      </details>
    `;
  }).join("");
}

function renderReport() {
  const state = loadState();
  const session = currentInterview(state);
  const interviews = Array.isArray(state.interviews) ? state.interviews : [];
  const progressHistory = Array.isArray(state.progressHistory) ? state.progressHistory : [];
  const answers = Array.isArray(session.answers) ? session.answers : [];
  const generated = Array.isArray(session.questionHistory) ? session.questionHistory.length : 0;
  const pool = countCurrentPool(state);
  const answered = answers.length;
  const total = Math.max(pool.total, answered);
  const remaining = Math.max(0, total - answered);
  const completion = total ? Math.round((answered / total) * 100) : 0;
  const allAnswered = interviews.reduce((sum, item) => sum + (Array.isArray(item.answers) ? item.answers.length : 0), 0);

  els.currentInterviewTitle.textContent = `Interview ${Number(state.interviewNumber || 1)}`;
  els.answeredCount.textContent = answered;
  els.remainingCount.textContent = remaining;
  els.totalCount.textContent = total || "0";
  els.completionRate.textContent = `${completion}%`;
  els.adminProgress.style.width = `${Math.min(100, completion)}%`;
  els.practiceLabel.textContent = practiceLabel(state);
  els.roleLabel.textContent = `${state.role || "Not set"} (${state.level || "level not set"})`;
  els.generatedCount.textContent = generated;
  els.allAnsweredCount.textContent = allAnswered;
  els.interviewCount.textContent = interviews.length || 0;
  els.reportCount.textContent = progressHistory.length;

  const topics = summarizeTopics(progressHistory);
  els.topicBreakdown.innerHTML = topics.length
    ? topics.map(([label, count]) => `<div><span>${escapeHtml(label)}</span><strong>${count}</strong></div>`).join("")
    : `<p class="admin-empty">Completed interview topic summary will appear here.</p>`;

  renderAnsweredQuestions(session);
  renderReportHistory(progressHistory);
}

async function loadSources() {
  try {
    const response = await fetch("/mock-interview-sets.json");
    mockInterviewSets = await response.json();
  } catch {
    mockInterviewSets = [];
  }

  try {
    const response = await fetch("/30-day-plan.json");
    practicePlan = await response.json();
  } catch {
    practicePlan = [];
  }

  try {
    const response = await fetch("/api/question-bank");
    const data = await response.json();
    largeQuestionBankCount = Array.isArray(data.questions) ? data.questions.length : 0;
  } catch {
    largeQuestionBankCount = 0;
  }
}

els.refreshReport.addEventListener("click", renderReport);
window.addEventListener("storage", renderReport);

loadSources().then(renderReport);
