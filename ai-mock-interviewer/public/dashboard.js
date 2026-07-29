const DASHBOARD_STORAGE_KEY = "aiMockInterviewerState";
const dashboardProfiles = {
  devops: { label: "DevOps Engineer", role: "Senior DevOps Engineer", technology: "kubernetes", focus: "Kubernetes, Docker, Terraform, CI/CD and GitOps, Linux, cloud networking, security, observability, SRE, incident response" },
  frontend: { label: "Frontend Developer", role: "Senior Frontend Developer", technology: "frontend", focus: "HTML, CSS, JavaScript, TypeScript, React, state management, accessibility, responsive design, testing, web performance" },
  backend: { label: "Backend Developer", role: "Senior Backend Developer", technology: "backend", focus: "Python, FastAPI, Go, REST and GraphQL APIs, SQL and NoSQL databases, caching, messaging, security, distributed systems, system design" },
  mlops: { label: "MLOps Engineer", role: "Senior MLOps Engineer", technology: "mlops", focus: "Python, MLflow, Kubeflow, Vertex AI, training pipelines, feature stores, model registry, model serving, drift monitoring, Kubernetes, CI/CD for ML" },
  "system-design": { label: "System Design", role: "Software Engineer - System Design Round", technology: "scenario", focus: "requirements clarification, capacity estimation, API design, data modeling, caching, queues, load balancing, horizontal scaling, consistency, reliability, security, observability, and architecture trade-offs" },
  dsa: { label: "Data Structures & Algorithms", role: "Software Engineer - DSA Round", technology: "coding", focus: "arrays, strings, hash maps, linked lists, stacks, queues, trees, graphs, recursion, sorting, searching, greedy algorithms, dynamic programming, and time and space complexity" },
  cumulative: { label: "Cumulative Random Interview", role: "Cross-functional Software Engineering Interview", technology: "all", focus: "DevOps, frontend, backend, MLOps, cloud, system design, data structures and algorithms, security, behavioral questions, and production scenarios", questionOrder: "random", practiceDay: "all", mockSet: "random-bank" },
  "python-dev": { label: "Python Developer", role: "Senior Python Developer", technology: "all", focus: "GIL, generators, decorators, context managers, garbage collection, type hints, asyncio, metaclasses, common pitfalls", mockSet: "set-99" },
  "go-dev": { label: "Go Developer", role: "Senior Go Developer", technology: "all", focus: "Goroutines and channels, select, error handling philosophy, interfaces, race detection, context.Context, pprof, table-driven tests", mockSet: "set-100" },
  "javascript-dev": { label: "JavaScript Developer", role: "Senior JavaScript Developer", technology: "all", focus: "Closures, event loop, prototypal inheritance, this binding, Promises/async-await, hoisting, ==/===, debounce/throttle, memory leaks, CommonJS vs ESM", mockSet: "set-101" },
  "bash-scripting": { label: "Shell and Bash Scripting", role: "DevOps Engineer - Shell Scripting Round", technology: "all", focus: "set -euo pipefail, quoting pitfalls, trap for cleanup, process substitution, heredocs, arrays, parameter expansion, cron robustness, debugging, xargs, sed/awk", mockSet: "set-102" },
  "gcp-network-engineer": { label: "GCP Network Engineer", role: "Senior GCP Network Engineer", technology: "all", focus: "GCP VPC and Shared VPC, IP planning, routes, Cloud Router, Cloud NAT, Cloud DNS, Private Google Access, Private Service Connect, Network Connectivity Center, HA VPN, Interconnect, BGP, load balancing, Cloud Armor, VPC Service Controls, troubleshooting, Terraform and CI/CD", mockSet: "set-111" },
  rag: { label: "RAG (Retrieval-Augmented Generation)", role: "AI Engineer - RAG Round", technology: "all", focus: "Hybrid search, multi-hop retrieval, chunking strategy, groundedness evaluation, access control, production RAG monitoring", mockSet: "set-94" },
  llm: { label: "LLM Engineering Fundamentals", role: "AI Engineer - LLM Engineering Round", technology: "all", focus: "Transformer internals, tokenization, sampling parameters, function calling, structured output, model selection, embeddings", mockSet: "set-95" },
  llmops: { label: "LLMOps Production Operations", role: "MLOps/LLMOps Engineer", technology: "all", focus: "Prompt versioning, cost tracking, regression testing for non-deterministic output, prompt caching, observability tooling, PII handling", mockSet: "set-96" },
  "agentic-ai": { label: "Agentic AI Architecture", role: "AI Engineer - Agentic AI Round", technology: "all", focus: "ReAct vs Plan-and-Execute, agent memory design, OWASP LLM Top 10 for agents, multi-agent communication, agentic RAG", mockSet: "set-97" },
  genai: { label: "Generative AI Beyond Text", role: "AI Engineer - Generative AI Round", technology: "all", focus: "Diffusion models, enterprise GenAI use cases, ethics/bias/copyright, content moderation, synthetic data, watermarking", mockSet: "set-98" }
};

const roleCards = document.querySelectorAll("[data-dashboard-role]");
const selectedTrack = document.querySelector("#selectedTrack");
const launchTitle = document.querySelector("#launchTitle");
const launchDescription = document.querySelector("#launchDescription");
const startButton = document.querySelector("#startTrackInterview");
const customTopicInput = document.querySelector("#customTopicInput");
const useCustomTopicButton = document.querySelector("#useCustomTopic");
const customTopicError = document.querySelector("#customTopicError");
const topicMultiSelect = document.querySelector("#topicMultiSelect");
const topicMultiSelectTrigger = document.querySelector("#topicMultiSelectTrigger");
const topicOptions = document.querySelector("#topicOptions");
const topicMultiSelectLabel = document.querySelector("#topicMultiSelectLabel");
const topicCheckboxes = [...document.querySelectorAll(".topic-options input[type='checkbox']")];
const topicSearchInput = document.querySelector("#topicSearchInput");
const topicSearchStatus = document.querySelector("#topicSearchStatus");
const topicOptionGroups = [...document.querySelectorAll(".topic-option-group")];
const topicSelectedCount = document.querySelector("#topicSelectedCount");
const clearTopicSelection = document.querySelector("#clearTopicSelection");
const confirmTopicSelection = document.querySelector("#confirmTopicSelection");
const questionTypeCoverage = document.querySelector("#questionTypeCoverage");

function classifyQuestionType(question) {
  const text = String(question || "").toLowerCase();
  if (/\b(troubleshoot|debug|investigate|fails?|failure|pending|crashloop|exhaust|corrupt|deleted|recover|restore)\b/.test(text)) return "Troubleshooting";
  if (/^(tell me|have you|are you|do you use|what activities|what was your|in your environment|which tool do you use)/.test(text)) return "Experience";
  if (/\b(difference|compare|versus| vs |choose|prefer|instead of)\b/.test(text)) return "Comparison";
  if (/^(how would you design|design |explain the complete|what is the complete request flow|how does traffic flow)/.test(text)) return "Design / Architecture";
  if (/^(suppose|if |when |a customer|you scale|what happens)/.test(text)) return "Scenario";
  if (/^(how do you|how would you|how does|what should|what inputs|where do you|which .* required)/.test(text)) return "Implementation / Workflow";
  return "Conceptual";
}

function setTopicPickerOpen(open) {
  topicOptions.hidden = !open;
  topicMultiSelect.classList.toggle("is-open", open);
  topicMultiSelectTrigger.setAttribute("aria-expanded", String(open));
  if (open) {
    filterTopicOptions();
    requestAnimationFrame(() => topicSearchInput.focus());
  }
}

const skillLogoNames = {
  kubernetes: "K8", docker: "D", gcp: "G", linux: "Lx", terraform: "Tf", "ci/cd": "CI", gitops: "Git", ansible: "An",
  sre: "SR", observability: "Ob", security: "Sc", html: "H5", css: "C3", javascript: "JS", typescript: "TS", react: "R",
  "state management": "St", components: "Co", testing: "T", accessibility: "A11", performance: "Pf", python: "Py", go: "Go",
  fastapi: "FA", sql: "SQL", nosql: "No", redis: "Rd", queues: "Q", "rest apis": "API", "system design": "SD", mlflow: "ML",
  "model registry": "MR", "feature stores": "FS", "vertex ai": "VA", kubeflow: "KF", "model serving": "MS", drift: "Dr", "ml ci/cd": "MC",
  requirements: "Rq", apis: "API", "data modeling": "DB", caching: "Ca", scaling: "Sc", reliability: "Re", "trade-offs": "Tr",
  arrays: "[]", strings: "S", "hash maps": "#", trees: "Tr", graphs: "Gr", recursion: "Rc", "dynamic programming": "DP", complexity: "O(n)"
};

const skillQuestionPatterns = {
  kubernetes: /\b(kubernetes|k8s|gke|pod|helm|kubectl)\b/i, docker: /\b(docker|container|dockerfile)\b/i, gcp: /\b(gcp|google cloud|cloud run|compute engine)\b/i,
  linux: /\b(linux|systemd|kernel|bash|filesystem)\b/i, terraform: /\b(terraform|infrastructure as code|\biac\b)\b/i, "ci/cd": /\b(ci\/cd|cicd|continuous integration|pipeline|jenkins|github actions)\b/i,
  gitops: /\b(gitops|argocd|argo cd)\b/i, ansible: /\b(ansible|playbook)\b/i, sre: /\b(sre|sli|slo|error budget|reliability)\b/i, observability: /\b(observability|monitoring|prometheus|grafana|tracing)\b/i,
  security: /\b(security|iam|rbac|vulnerability|devsecops)\b/i, html: /\b(html|semantic markup)\b/i, css: /\b(css|responsive design|flexbox|grid layout)\b/i, javascript: /\b(javascript|\bjs\b|event loop|dom)\b/i,
  typescript: /\b(typescript|type system)\b/i, react: /\b(react|jsx|hooks)\b/i, "state management": /\b(state management|redux|context api)\b/i, components: /\b(component|component design)\b/i,
  testing: /\b(testing|unit test|integration test|pytest|jest)\b/i, accessibility: /\b(accessibility|a11y|aria|wcag)\b/i, performance: /\b(performance|latency|optimization|bottleneck)\b/i,
  python: /\b(python|pytest|pydantic)\b/i, go: /\b(golang|go programming|goroutine|channel)\b/i, fastapi: /\b(fastapi|uvicorn|asgi)\b/i, sql: /\b(sql|postgres|mysql|relational database)\b/i,
  nosql: /\b(nosql|mongodb|document database)\b/i, redis: /\b(redis|in-memory cache)\b/i, queues: /\b(queue|pub\/sub|kafka|rabbitmq|messaging)\b/i, "rest apis": /\b(rest api|restful|http api)\b/i,
  "system design": /\b(system design|design a|architecture|scalable system)\b/i, mlflow: /\b(mlflow|experiment tracking)\b/i, "model registry": /\b(model registry|model version)\b/i,
  "feature stores": /\b(feature store|feature engineering)\b/i, "vertex ai": /\b(vertex ai|vertex pipeline)\b/i, kubeflow: /\b(kubeflow|kserve)\b/i, "model serving": /\b(model serving|model deployment|inference)\b/i,
  drift: /\b(data drift|model drift|concept drift)\b/i, "ml ci/cd": /\b(ml ci\/cd|ml pipeline|training pipeline)\b/i, requirements: /\b(requirements|functional requirement|non-functional)\b/i,
  apis: /\b(api|endpoint|rest|graphql)\b/i, "data modeling": /\b(data model|schema|database design)\b/i, caching: /\b(cache|caching|cdn)\b/i, scaling: /\b(scale|scaling|autoscal)\b/i,
  reliability: /\b(reliability|availability|fault toler|resilien)\b/i, "trade-offs": /\b(trade-?off|consistency|cap theorem)\b/i, arrays: /\b(array|list)\b/i, strings: /\b(string|substring)\b/i,
  "hash maps": /\b(hash map|hashmap|dictionary)\b/i, trees: /\b(tree|binary search tree|bst)\b/i, graphs: /\b(graph|bfs|dfs)\b/i, recursion: /\b(recursion|recursive|backtracking)\b/i,
  "dynamic programming": /\b(dynamic programming|memoization|tabulation)\b/i, complexity: /\b(time complexity|space complexity|big o|o\([^)]+\))\b/i
};

function collectQuestionText(value, output) {
  if (Array.isArray(value)) return value.forEach((item) => collectQuestionText(item, output));
  if (!value || typeof value !== "object") return;
  if (typeof value.question === "string") output.add(value.question.trim());
  Object.values(value).forEach((item) => collectQuestionText(item, output));
}

async function loadQuestionCoverage() {
  const sources = ["/api/question-bank", "/mock-interview-sets.json", "/50-day-plan.json"];
  const questions = new Set();
  const questionTypes = new Map();
  await Promise.all(sources.map(async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) return;
      const payload = await response.json();
      collectQuestionText(payload, questions);
      if (url === "/api/question-bank") {
        for (const item of payload.questions || []) {
          const type = item.questionType || classifyQuestionType(item.question);
          questionTypes.set(type, (questionTypes.get(type) || 0) + 1);
        }
      }
    } catch (_) {}
  }));

  let availableSkills = 0;
  document.querySelectorAll(".role-skill-group span, .core-round-skills span").forEach((skill) => {
    const nameNode = Array.from(skill.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
    const name = (nameNode?.textContent || skill.textContent).trim();
    const pattern = skillQuestionPatterns[name.toLowerCase()];
    const count = pattern ? Array.from(questions).filter((question) => pattern.test(question)).length : 0;
    const status = document.createElement("em");
    status.className = count ? "skill-availability available" : "skill-availability unavailable";
    status.textContent = count ? `${count} Q` : "No Q";
    status.setAttribute("aria-label", count ? `${count} questions available` : "No matching questions available");
    skill.classList.toggle("has-questions", count > 0);
    skill.classList.toggle("no-questions", count === 0);
    skill.title = count ? `${count} matching questions available` : "No matching questions currently available";
    skill.append(status);
    if (count) availableSkills += 1;
  });
  const totalSkills = document.querySelectorAll(".role-skill-group span, .core-round-skills span").length;
  const summary = document.querySelector("#coverageSummary");
  if (summary) summary.textContent = `${questions.size} questions checked · ${availableSkills}/${totalSkills} skills covered`;
  if (questionTypeCoverage) {
    questionTypeCoverage.innerHTML = [...questionTypes.entries()]
      .sort((left, right) => right[1] - left[1])
      .map(([type, count]) => `<span class="question-type-card"><strong>${count}</strong><small>${type}</small></span>`)
      .join("");
  }
}

function decorateSkillLogos() {
  document.querySelectorAll(".role-skill-group span, .core-round-skills span").forEach((skill) => {
    const name = skill.textContent.trim();
    const key = name.toLowerCase();
    const logo = document.createElement("i");
    logo.className = "skill-logo";
    logo.dataset.logo = key.replace(/[^a-z0-9]+/g, "-");
    logo.setAttribute("aria-hidden", "true");
    logo.textContent = skillLogoNames[key] || name.slice(0, 2).toUpperCase();
    skill.prepend(logo);
  });
}

function selectDashboardRole(key, persist = true) {
  const profile = dashboardProfiles[key];
  if (!profile) return;
  roleCards.forEach((card) => {
    const active = card.dataset.dashboardRole === key;
    card.classList.toggle("active", active);
    card.setAttribute("aria-pressed", String(active));
  });
  if (specializedRoundSelect) {
    specializedRoundSelect.value = specializedRoundSelect.querySelector(`option[value="${key}"]`) ? key : "";
  }
  selectedTrack.textContent = profile.label;
  launchTitle.textContent = `${profile.label} interview is ready`;
  launchDescription.textContent = `The question pool will focus on ${profile.focus}.`;
  startButton.classList.remove("disabled");
  startButton.removeAttribute("aria-disabled");
  if (persist) {
    const state = JSON.parse(localStorage.getItem(DASHBOARD_STORAGE_KEY) || "{}");
    localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify({
      ...state,
      role: profile.role,
      topic: profile.focus,
      technology: profile.technology,
      careerProfile: key,
      questionOrder: profile.questionOrder || "random",
      practiceDay: profile.practiceDay || "all",
      mockSet: profile.mockSet || "all",
      interviewNumber: 1,
      interviews: [],
      questionBankIndex: 0,
      usedQuestionKeys: []
    }));
  }
}

function selectCustomTopic() {
  const selectedTopics = topicCheckboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
  const customTopic = customTopicInput.value.trim().replace(/\s+/g, " ");
  if (customTopic) selectedTopics.push(customTopic);
  const topics = [...new Set(selectedTopics)];
  const topic = topics.join(", ");
  if (!topics.length) {
    customTopicError.textContent = "Select at least one topic or enter a custom topic.";
    customTopicError.hidden = false;
    customTopicInput.focus();
    return;
  }

  customTopicError.hidden = true;
  roleCards.forEach((card) => {
    card.classList.remove("active");
    card.setAttribute("aria-pressed", "false");
  });
  specializedRoundSelect.value = "";
  selectedTrack.textContent = topic;
  launchTitle.textContent = `${topic} interview is ready`;
  launchDescription.textContent = `Questions will focus specifically on ${topic}.`;
  startButton.classList.remove("disabled");
  startButton.removeAttribute("aria-disabled");

  const state = JSON.parse(localStorage.getItem(DASHBOARD_STORAGE_KEY) || "{}");
  localStorage.setItem(DASHBOARD_STORAGE_KEY, JSON.stringify({
    ...state,
    role: `${topic} interview`,
    topic,
    selectedTopics: topics,
    technology: "all",
    careerProfile: "custom-topic",
    questionOrder: "random",
    practiceDay: "all",
    mockSet: "all",
    interviewNumber: 1,
    interviews: [],
    questionBankIndex: 0,
    usedQuestionKeys: []
  }));
}

function updateTopicMultiSelectLabel() {
  const selected = topicCheckboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
  topicMultiSelectLabel.textContent = selected.length
    ? `${selected.length} selected: ${selected.join(", ")}`
    : "Select topics…";
  topicSelectedCount.textContent = `${selected.length} selected`;
  // Keep OK usable after "Clear selection" so the user can close the picker
  // without being forced to select a replacement topic.
  confirmTopicSelection.disabled = false;
}

function filterTopicOptions() {
  const query = topicSearchInput.value.trim().toLowerCase();
  let visibleTopics = 0;
  topicOptionGroups.forEach((group) => {
    let groupMatches = 0;
    group.querySelectorAll("label").forEach((label) => {
      const input = label.querySelector("input");
      const matches = !query || label.textContent.toLowerCase().includes(query)
        || input?.value.toLowerCase().includes(query);
      label.hidden = !matches;
      if (matches) groupMatches += 1;
    });
    group.hidden = groupMatches === 0;
    visibleTopics += groupMatches;
  });
  topicSearchStatus.textContent = query
    ? visibleTopics
      ? `${visibleTopics} topic${visibleTopics === 1 ? "" : "s"} found`
      : "No matching topics found"
    : `${topicCheckboxes.length} topics available`;
}

roleCards.forEach((card) => card.addEventListener("click", () => selectDashboardRole(card.dataset.dashboardRole)));

const specializedRoundSelect = document.querySelector("#specializedRoundSelect");
specializedRoundSelect?.addEventListener("change", () => {
  if (specializedRoundSelect.value) selectDashboardRole(specializedRoundSelect.value);
});
useCustomTopicButton?.addEventListener("click", selectCustomTopic);
customTopicInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    selectCustomTopic();
  }
});
customTopicInput?.addEventListener("input", () => {
  customTopicError.hidden = true;
});
topicCheckboxes.forEach((checkbox) => checkbox.addEventListener("change", () => {
  customTopicError.hidden = true;
  updateTopicMultiSelectLabel();
}));
topicSearchInput?.addEventListener("input", filterTopicOptions);
topicSearchInput?.addEventListener("keydown", (event) => {
  event.stopPropagation();
  if (event.key === "Escape") {
    event.preventDefault();
    setTopicPickerOpen(false);
    topicMultiSelectTrigger.focus();
  }
});
clearTopicSelection?.addEventListener("click", () => {
  topicCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  updateTopicMultiSelectLabel();
  customTopicError.hidden = true;
  topicSearchInput.focus();
});
confirmTopicSelection?.addEventListener("click", () => {
  const hasSelectedTopic = topicCheckboxes.some((checkbox) => checkbox.checked);
  const hasCustomTopic = Boolean(customTopicInput.value.trim());
  if (!hasSelectedTopic && !hasCustomTopic) {
    customTopicError.hidden = true;
    setTopicPickerOpen(false);
    topicMultiSelectTrigger.focus();
    return;
  }
  selectCustomTopic();
  if (customTopicError.hidden) setTopicPickerOpen(false);
});
topicMultiSelectTrigger?.addEventListener("click", () => {
  setTopicPickerOpen(topicOptions.hidden);
});
updateTopicMultiSelectLabel();
decorateSkillLogos();
loadQuestionCoverage();
startButton.addEventListener("click", async (event) => {
  event.preventDefault();
  if (startButton.getAttribute("aria-disabled") === "true") return;
  const originalText = startButton.textContent;
  startButton.textContent = "Creating interview…";
  startButton.setAttribute("aria-disabled", "true");
  try {
    const state = JSON.parse(localStorage.getItem(DASHBOARD_STORAGE_KEY) || "{}");
    const topics = Array.isArray(state.selectedTopics) && state.selectedTopics.length
      ? state.selectedTopics
      : [state.topic || state.technology || "General technical interview"];
    const response = await fetch("/api/v1/interviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: topics.length > 1 ? "MULTI_TOPIC" : "CUSTOM_TOPIC",
        role: state.role || "Technical interview",
        topics,
        difficulty: "SENIOR",
        durationMinutes: 45,
        questionLimit: 15
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || data.error || "Could not create interview.");
    window.location.assign(`/session.html?id=${encodeURIComponent(data.interviewId)}`);
  } catch (error) {
    customTopicError.textContent = `${error.message} Opening the local session instead.`;
    customTopicError.hidden = false;
    window.setTimeout(() => window.location.assign("/session.html"), 900);
  } finally {
    startButton.textContent = originalText;
    startButton.removeAttribute("aria-disabled");
  }
});

try {
  const saved = JSON.parse(localStorage.getItem(DASHBOARD_STORAGE_KEY) || "{}");
  if (dashboardProfiles[saved.careerProfile]) {
    selectDashboardRole(saved.careerProfile, false);
  } else if (saved.careerProfile === "custom-topic" && saved.topic) {
    const savedTopics = Array.isArray(saved.selectedTopics) ? saved.selectedTopics : [saved.topic];
    topicCheckboxes.forEach((checkbox) => {
      checkbox.checked = savedTopics.includes(checkbox.value);
    });
    customTopicInput.value = savedTopics.filter((topic) => !topicCheckboxes.some((checkbox) => checkbox.value === topic)).join(", ");
    updateTopicMultiSelectLabel();
    selectCustomTopic();
  }
} catch (_) {}
