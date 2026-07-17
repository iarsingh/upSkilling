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
  techDashboard: document.querySelector("#techDashboard"),
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
let currentProgressHistory = [];

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

const macroCategories = [
  {
    key: "devops",
    label: "DevOps",
    color: "#28b8c7",
    keywords: /kubernetes|\bk8s\b|\bgke\b|docker|terraform|opentofu|jenkins|ci\/cd|\bcicd\b|gitops|argocd|ansible|\blinux\b|networking|\bvpc\b|\bdns\b|load balanc|observability|prometheus|grafana|\bslo\b|\bsli\b|\biam\b|devsecops|\bhelm\b|finops|disaster recovery|incident|\bsre\b|reliability|route53|raid|security group/i
  },
  {
    key: "mlops",
    label: "MLOps",
    color: "#9b8cff",
    keywords: /mlops|mlflow|vertex ai|model registry|model versioning|feature store|\bgpu\b|\btpu\b|drift|llmops|genai|\bllm\b|kubeflow|inference|ml pipeline|machine learning|model serving/i
  },
  {
    key: "frontend",
    label: "Frontend",
    color: "#e6ae48",
    keywords: /\breact\b|angular|\bvue\b|frontend|front-end|\bcss\b|\bhtml\b|javascript|typescript|\bdom\b|webpack|redux|responsive design|\bui\/ux\b/i
  },
  {
    key: "backend",
    label: "Backend",
    color: "#f06f5f",
    keywords: /fastapi|\bapi\b|rest api|graphql|microservice|backend|back-end|database|\bsql\b|postgres|mongodb|\bredis\b|authentication|authorization|django|\bflask\b|\bspring\b|node\.js|\bexpress\b/i
  }
];

function classifyMacroCategory(text) {
  const lower = (text || "").toLowerCase();
  for (const category of macroCategories) {
    if (category.keywords.test(lower)) return category.key;
  }
  return null;
}

function renderTechDashboard(interviews) {
  const container = els.techDashboard;
  if (!container) return;

  const allAnswers = interviews.flatMap((interview) => Array.isArray(interview.answers) ? interview.answers : []);
  const counts = Object.fromEntries(macroCategories.map((c) => [c.key, 0]));
  let classified = 0;

  for (const answer of allAnswers) {
    const key = classifyMacroCategory(`${answer.question || ""} ${answer.answer || ""}`);
    if (key) {
      counts[key] += 1;
      classified += 1;
    }
  }

  if (!allAnswers.length) {
    container.innerHTML = `<p class="admin-empty">Answer some questions to see your technology breakdown.</p>`;
    return;
  }

  const total = Math.max(1, classified);
  const tiles = macroCategories.map((category) => {
    const count = counts[category.key];
    const pct = Math.round((count / total) * 100);
    return `
      <div class="tech-tile" style="--tile-color: ${category.color}">
        <span>${count}</span>
        <small>${escapeHtml(category.label)}</small>
        <span class="tech-pct">${classified ? `${pct}%` : "0%"}</span>
      </div>
    `;
  }).join("");

  const segments = macroCategories.map((category) => {
    const count = counts[category.key];
    const pct = Math.max(count ? 2 : 0, Math.round((count / total) * 100));
    return `<div class="tech-proportion-segment" style="--tile-color: ${category.color}; width: ${pct}%" title="${escapeHtml(category.label)}: ${count}"></div>`;
  }).join("");

  const legend = macroCategories.map((category) => `
    <span class="tech-legend-item"><span class="tech-legend-dot" style="--tile-color: ${category.color}"></span>${escapeHtml(category.label)}</span>
  `).join("");

  const unclassified = allAnswers.length - classified;

  container.innerHTML = `
    <div class="tech-tiles">${tiles}</div>
    <div class="tech-proportion">${segments}</div>
    <div class="tech-legend">${legend}</div>
    ${unclassified ? `<p class="admin-empty">${unclassified} answered question${unclassified === 1 ? "" : "s"} did not match a category.</p>` : ""}
  `;
}

function renderTopicChart(topics) {
  if (!topics.length) {
    els.topicBreakdown.innerHTML = `<p class="admin-empty">Completed interview topic summary will appear here.</p>`;
    return;
  }
  const max = Math.max(...topics.map(([, count]) => count), 1);
  els.topicBreakdown.innerHTML = topics.map(([label, count]) => `
    <div class="bar-row" title="${escapeHtml(label)}: ${count} question${count === 1 ? "" : "s"} answered">
      <span class="bar-label">${escapeHtml(label)}</span>
      <div class="bar-track"><div class="bar-fill" data-target="${Math.max(4, Math.round((count / max) * 100))}" style="width: 0"></div></div>
      <span class="bar-value">${count}</span>
    </div>
  `).join("");
  requestAnimationFrame(() => {
    els.topicBreakdown.querySelectorAll(".bar-fill").forEach((bar) => {
      bar.style.width = `${bar.dataset.target}%`;
    });
  });
}

function renderProgressChart(progressHistory) {
  const container = document.querySelector("#progressChart");
  if (!container) return;

  const sorted = progressHistory
    .filter((record) => record.completedAt)
    .map((record) => ({
      date: new Date(record.completedAt),
      count: Number(record.questionCount || 0),
      practice: record.practice || "Interview"
    }))
    .sort((a, b) => a.date - b.date);

  if (sorted.length < 2) {
    container.innerHTML = `<p class="admin-empty">Complete at least two interviews to see a progress trend over time.</p>`;
    return;
  }

  let cumulative = 0;
  const points = sorted.map((entry) => {
    cumulative += entry.count;
    return { ...entry, total: cumulative };
  });

  const width = 640;
  const height = 220;
  const padding = { top: 16, right: 20, bottom: 26, left: 8 };
  const minTime = points[0].date.getTime();
  const maxTime = points[points.length - 1].date.getTime();
  const maxValue = points[points.length - 1].total;

  const xScale = (time) => {
    if (maxTime === minTime) return padding.left;
    return padding.left + ((time - minTime) / (maxTime - minTime)) * (width - padding.left - padding.right);
  };
  const yScale = (value) => {
    if (maxValue === 0) return height - padding.bottom;
    return height - padding.bottom - (value / maxValue) * (height - padding.top - padding.bottom);
  };

  const coords = points.map((point) => [xScale(point.date.getTime()), yScale(point.total)]);
  const linePoints = coords.map(([x, y]) => `${x},${y}`).join(" ");
  const areaPoints = `${coords[0][0]},${height - padding.bottom} ${linePoints} ${coords[coords.length - 1][0]},${height - padding.bottom}`;
  const approxLineLength = coords.reduce((sum, [x, y], index) => {
    if (index === 0) return 0;
    const [px, py] = coords[index - 1];
    return sum + Math.hypot(x - px, y - py);
  }, 0);

  const dots = points.map((point, index) => {
    const [x, y] = coords[index];
    const label = `${point.date.toLocaleDateString(undefined, { month: "short", day: "numeric" })} · ${point.total} total answered`;
    return `<circle class="progress-dot" cx="${x}" cy="${y}" r="4" data-label="${escapeHtml(label)}"></circle>`;
  }).join("");

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" class="progress-svg" role="img" aria-label="Cumulative questions answered over time">
      <line class="progress-gridline" x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}"></line>
      <polyline points="${areaPoints}" class="progress-area"></polyline>
      <polyline points="${linePoints}" class="progress-line" style="--line-length: ${approxLineLength}"></polyline>
      ${dots}
      <text class="progress-axis-label" x="${padding.left}" y="${height - 6}">${escapeHtml(points[0].date.toLocaleDateString())}</text>
      <text class="progress-axis-label" x="${width - padding.right}" y="${height - 6}" text-anchor="end">${escapeHtml(points[points.length - 1].date.toLocaleDateString())}</text>
      <text class="progress-axis-label" x="${padding.left}" y="${padding.top}">${maxValue} total answered</text>
    </svg>
    <div class="progress-tooltip" id="progressTooltip" hidden></div>
  `;

  const tooltip = container.querySelector("#progressTooltip");
  container.querySelectorAll(".progress-dot").forEach((dot) => {
    dot.addEventListener("mouseenter", () => {
      tooltip.textContent = dot.dataset.label;
      tooltip.hidden = false;
      tooltip.style.left = `${(Number(dot.getAttribute("cx")) / width) * 100}%`;
      tooltip.style.top = `${(Number(dot.getAttribute("cy")) / height) * 100}%`;
    });
    dot.addEventListener("mouseleave", () => {
      tooltip.hidden = true;
    });
  });
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
    const hasAnswers = Array.isArray(record.answers) && record.answers.length > 0;
    return `
      <details class="admin-item">
        <summary>
          <span>${escapeHtml(date)}</span>
          <strong>${escapeHtml(record.practice || `Interview ${record.interviewNumber || ""}`)}</strong>
          <small>${Number(record.questionCount || 0)} answered</small>
        </summary>
        ${hasAnswers ? `<div class="admin-replay-row"><button class="ghost small" type="button" data-replay="${escapeHtml(record.id)}">&#9654; Replay interview</button></div>` : ""}
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
  currentProgressHistory = progressHistory;
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

  renderTopicChart(summarizeTopics(progressHistory));
  renderTechDashboard(interviews);
  renderProgressChart(progressHistory);

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

els.refreshReport.addEventListener("click", () => {
  els.refreshReport.classList.add("is-busy");
  els.refreshReport.disabled = true;
  renderReport();
  setTimeout(() => {
    els.refreshReport.classList.remove("is-busy");
    els.refreshReport.disabled = false;
  }, 260);
});
window.addEventListener("storage", renderReport);

loadSources().then(renderReport);

const replayEls = {
  backdrop: document.querySelector("#replayBackdrop"),
  title: document.querySelector("#replayTitle"),
  counter: document.querySelector("#replayCounter"),
  question: document.querySelector("#replayQuestion"),
  answer: document.querySelector("#replayAnswer"),
  progress: document.querySelector("#replayProgress"),
  prev: document.querySelector("#replayPrev"),
  next: document.querySelector("#replayNext"),
  speak: document.querySelector("#replaySpeak"),
  close: document.querySelector("#replayClose")
};

let replayAnswers = [];
let replayIndex = 0;

function renderReplayStep() {
  const item = replayAnswers[replayIndex];
  if (!item) return;
  replayEls.counter.textContent = `Question ${replayIndex + 1}`;
  replayEls.question.textContent = item.question || "Untitled question";
  replayEls.answer.textContent = item.answer || "No answer text saved.";
  replayEls.progress.textContent = `${replayIndex + 1} / ${replayAnswers.length}`;
  replayEls.prev.disabled = replayIndex <= 0;
  replayEls.next.disabled = replayIndex >= replayAnswers.length - 1;
}

function openReplay(record) {
  replayAnswers = Array.isArray(record.answers) ? record.answers : [];
  if (!replayAnswers.length || !replayEls.backdrop) return;
  replayIndex = 0;
  replayEls.title.textContent = record.practice || `Interview ${record.interviewNumber || ""}`;
  renderReplayStep();
  replayEls.backdrop.classList.add("open");
}

function closeReplay() {
  if (!replayEls.backdrop) return;
  replayEls.backdrop.classList.remove("open");
  window.speechSynthesis?.cancel();
}

if (replayEls.backdrop) {
  els.reportHistory.addEventListener("click", (event) => {
    const button = event.target.closest("[data-replay]");
    if (!button) return;
    const record = currentProgressHistory.find((item) => item.id === button.dataset.replay);
    if (record) openReplay(record);
  });

  replayEls.close.addEventListener("click", closeReplay);
  replayEls.backdrop.addEventListener("click", (event) => {
    if (event.target === replayEls.backdrop) closeReplay();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && replayEls.backdrop.classList.contains("open")) closeReplay();
  });

  replayEls.prev.addEventListener("click", () => {
    if (replayIndex > 0) {
      replayIndex -= 1;
      renderReplayStep();
    }
  });
  replayEls.next.addEventListener("click", () => {
    if (replayIndex < replayAnswers.length - 1) {
      replayIndex += 1;
      renderReplayStep();
    }
  });
  replayEls.speak.addEventListener("click", () => {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) return;
    const item = replayAnswers[replayIndex];
    if (!item) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(item.question || ""));
  });
}
