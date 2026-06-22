"use strict";

const STORAGE_KEY = "cloudops-copilot-online-v3";
const LANES = ["Validation", "Product", "GTM", "Operations"];

const sampleIncidents = [
  {
    type: "Kubernetes",
    title: "CrashLoop after release",
    text: "GKE production namespace: checkout-api pods in CrashLoopBackOff after deployment v42. 5xx error rate increased from 0.2% to 18%. Logs show timeout connecting to redis-cache."
  },
  {
    type: "GCP",
    title: "Load balancer 5xx spike",
    text: "GCP external HTTPS load balancer started returning 5xx for payment-api. Backend health is unhealthy in one region. Recent NEG and firewall changes were applied."
  },
  {
    type: "Terraform",
    title: "Apply permission failure",
    text: "terraform apply failed while updating IAM and GKE node pool. Error: permission denied and provider version changed after state lock was released."
  },
  {
    type: "MLOps Inference",
    title: "Model latency and drift",
    text: "Model endpoint p95 latency jumped to 2400ms. Prediction drift alert fired. Incoming payload has schema mismatch and missing feature customer_tenure_days."
  }
];

const readinessItems = [
  {
    id: "landing",
    group: "Presence",
    title: "Landing page hosted",
    detail: "A public URL explains the problem, target customer, and demo offer."
  },
  {
    id: "sampleIncident",
    group: "Demo",
    title: "Sample incident loaded",
    detail: "One Kubernetes or GCP alert is ready to paste without exposing real secrets."
  },
  {
    id: "demo",
    group: "Demo",
    title: "5-minute demo script rehearsed",
    detail: "You can explain the alert, generated runbook, customer update, and follow-up ask."
  },
  {
    id: "pilot",
    group: "Pilot",
    title: "Pilot ask prepared",
    detail: "You can ask for a 30-day pilot with success criteria and anonymized examples."
  },
  {
    id: "security",
    group: "Trust",
    title: "Security notes ready",
    detail: "You can explain anonymization, browser storage, no secret retention, and future tenant isolation."
  },
  {
    id: "followup",
    group: "Follow-up",
    title: "Follow-up template ready",
    detail: "You have a short message to send after a demo with recap, ask, and next step."
  }
];

const demoAssets = {
  script: "Demo flow: 1. Paste anonymized Kubernetes/GCP alert. 2. Generate analysis. 3. Walk through likely causes, commands, runbook, customer update, and postmortem draft. 4. Ask what matched their real workflow. 5. Ask for one more anonymized incident example.",
  pilot: "Pilot ask: Would a 30-day pilot be useful if we use 5-10 anonymized incidents from your team and measure whether the tool reduces triage time, improves runbook quality, and helps junior on-call engineers escalate with better context?",
  security: "Security note: For the MVP, avoid pasting secrets, tokens, customer PII, or proprietary payloads. Use anonymized incidents. The browser workspace stores notes locally. A paid pilot should add authentication, encrypted storage, tenant isolation, and audit logs."
};

const commands = {
  Kubernetes: [
    "kubectl get pods -n <namespace> -o wide",
    "kubectl describe pod <pod> -n <namespace>",
    "kubectl logs <pod> -n <namespace> --previous",
    "kubectl get events -n <namespace> --sort-by=.lastTimestamp"
  ],
  GCP: [
    "gcloud logging read '<filter>' --limit=50",
    "gcloud monitoring policies list",
    "gcloud compute backend-services get-health <service>",
    "gcloud container clusters describe <cluster> --region <region>"
  ],
  Terraform: ["terraform init", "terraform validate", "terraform plan", "terraform state list"],
  "CI/CD": [
    "Open the failed stage log and identify the first real error",
    "Compare changed environment variables, secrets, and permissions",
    "Validate image digest, manifest, and deployment target"
  ],
  "MLOps Inference": [
    "Check model server readiness and health endpoints",
    "Compare latency and error rate by model version",
    "Inspect request payload schema drift"
  ]
};

const seedState = {
  checks: { landing: false, sampleIncident: true, demo: false, pilot: true, security: false, followup: false },
  leads: [
    {
      id: id(),
      name: "Aarav",
      company: "GKE SaaS Team",
      stage: "Interview",
      pain: "Runbooks are stale and junior on-call engineers escalate too late."
    },
    {
      id: id(),
      name: "Meera",
      company: "FinOps AI",
      stage: "Demo",
      pain: "Alerts lack deployment and ownership context."
    },
    {
      id: id(),
      name: "Rohan",
      company: "B2B Payments Platform",
      stage: "Pilot",
      pain: "Only two senior engineers can debug GKE incidents confidently."
    },
    {
      id: id(),
      name: "Priya",
      company: "ML Inference Startup",
      stage: "Interview",
      pain: "Model latency alerts do not explain whether the issue is model, feature, or infrastructure related."
    }
  ],
  tasks: [
    { id: id(), title: "Interview 5 Kubernetes platform engineers", lane: "Validation", done: false },
    { id: id(), title: "Record 4-minute incident demo", lane: "Product", done: false },
    { id: id(), title: "Post demo offer on LinkedIn", lane: "GTM", done: false },
    { id: id(), title: "Write privacy and data handling notes", lane: "Operations", done: false },
    { id: id(), title: "Collect 10 anonymized incident examples", lane: "Validation", done: false },
    { id: id(), title: "Add Slack and PagerDuty integration notes", lane: "Product", done: false },
    { id: id(), title: "Prepare pilot pricing objection answers", lane: "GTM", done: false },
    { id: id(), title: "Draft terms for not storing sensitive logs", lane: "Operations", done: false }
  ],
  incidents: [],
  interviewNotes: [
    {
      id: id(),
      person: "GKE SaaS Team",
      question: "Where does incident context usually get lost?",
      answer: "Context gets split between Slack, Grafana, Cloud Logging, and deployment notes. The on-call engineer spends too much time reconstructing the timeline.",
      signal: "Strong Pain",
      strength: "High",
      createdAt: "2026-06-20T00:00:00.000Z"
    }
  ]
};

let state = loadState();

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function id() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  try {
    return hydrateState(JSON.parse(localStorage.getItem(STORAGE_KEY)) || clone(seedState));
  } catch {
    return hydrateState(clone(seedState));
  }
}

function hydrateState(saved) {
  const next = { ...clone(seedState), ...(saved || {}) };
  next.checks = { ...seedState.checks, ...(saved?.checks || {}) };
  next.leads = hasItems(saved?.leads) ? saved.leads : clone(seedState.leads);
  next.tasks = hasItems(saved?.tasks) ? saved.tasks : clone(seedState.tasks);
  next.incidents = Array.isArray(saved?.incidents) ? saved.incidents : [];
  next.interviewNotes = hasItems(saved?.interviewNotes) ? saved.interviewNotes : clone(seedState.interviewNotes);
  return next;
}

function hasItems(value) {
  return Array.isArray(value) && value.length > 0;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  renderMetrics();
  renderPipeline();
  renderReadiness();
  renderLeads();
  renderTasks();
  renderInterviewNotes();
  renderSampleIncidents();
}

function renderMetrics() {
  const byStage = countBy(state.leads, "stage");
  const metrics = [
    ["Interviews", byStage.Interview || 0, "Target: 20 validation calls"],
    ["Demos", byStage.Demo || 0, "Target: 5 product demos"],
    ["Pilots", (byStage.Pilot || 0) + (byStage.Paid || 0), "Target: 2 pilot asks"],
    ["Open Tasks", state.tasks.filter((task) => !task.done).length, "Keep founder motion visible"]
  ];

  $("#metricsGrid").innerHTML = metrics.map(([label, value, note]) => `
    <article class="metric">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${note}</small>
    </article>
  `).join("");
}

function renderPipeline() {
  $("#pipelineSignal").textContent = state.leads.length >= 5 ? "Learning loop active" : "Need more conversations";
  $("#pipelineList").innerHTML = state.leads.slice(0, 6).map((lead) => `
    <article class="pipeline-card">
      <div>
        <h3>${escapeHtml(lead.company)}</h3>
        <p>${escapeHtml(lead.pain)}</p>
      </div>
      <span class="stage">${escapeHtml(lead.stage)}</span>
    </article>
  `).join("") || `<p class="muted">Add your first validation lead.</p>`;
}

function renderSampleIncidents() {
  const target = $("#sampleIncidents");
  if (!target) return;

  target.innerHTML = sampleIncidents.map((sample) => `
    <button class="sample-card" type="button" data-sample="${escapeHtml(sample.title)}">
      <strong>${escapeHtml(sample.title)}</strong>
      <span>${escapeHtml(sample.type)}</span>
    </button>
  `).join("");
}

function renderReadiness() {
  const completed = readinessItems.filter((item) => state.checks[item.id]).length;
  const percent = Math.round((completed / readinessItems.length) * 100);
  const next = readinessItems.find((item) => !state.checks[item.id]);

  $("#readinessPercent").textContent = `${percent}%`;
  $("#readinessBar").style.width = `${percent}%`;
  $("#readinessStatus").textContent = percent >= 80 ? "Demo ready" : percent >= 50 ? "Almost ready" : "Needs work";
  $("#readinessNext").innerHTML = next
    ? `<strong>Next:</strong> ${escapeHtml(next.title)}<p>${escapeHtml(next.detail)}</p>`
    : `<strong>Ready:</strong> You have enough material to run a pilot conversation.<p>Use the incident demo, then ask for anonymized examples and success criteria.</p>`;

  $("#readinessList").innerHTML = readinessItems.map((item) => `
    <label class="readiness-item">
      <input type="checkbox" data-check="${escapeHtml(item.id)}" ${state.checks[item.id] ? "checked" : ""} />
      <span>
        <strong>${escapeHtml(item.title)}</strong>
        <small>${escapeHtml(item.group)} - ${escapeHtml(item.detail)}</small>
      </span>
    </label>
  `).join("");
}

function renderLeads() {
  $("#leadCount").textContent = `${state.leads.length} tracked`;
  $("#leadRows").innerHTML = state.leads.map((lead) => `
    <tr>
      <td>${escapeHtml(lead.name)}</td>
      <td>${escapeHtml(lead.company)}</td>
      <td><span class="stage">${escapeHtml(lead.stage)}</span></td>
      <td>${escapeHtml(lead.pain)}</td>
      <td><button class="row-action" title="Remove lead" aria-label="Remove lead" data-delete-lead="${lead.id}">x</button></td>
    </tr>
  `).join("");
}

function renderTasks() {
  $("#taskCount").textContent = `${state.tasks.filter((task) => !task.done).length} open`;
  $("#taskBoard").innerHTML = LANES.map((lane) => `
    <section class="lane">
      <h3>${lane}</h3>
      ${state.tasks.filter((task) => task.lane === lane).map((task) => `
        <article class="task-card">
          <label>
            <input type="checkbox" data-task="${task.id}" ${task.done ? "checked" : ""} />
            <span>${escapeHtml(task.title)}</span>
          </label>
        </article>
      `).join("")}
    </section>
  `).join("");
}

function renderInterviewNotes() {
  const notes = state.interviewNotes || [];
  const count = $("#interviewNoteCount");
  const target = $("#interviewNotes");
  if (!count || !target) return;

  count.textContent = `${notes.length} saved`;
  target.innerHTML = notes.map((note) => `
    <article class="note-card">
      <div class="note-head">
        <strong>${escapeHtml(note.person || "Unknown")}</strong>
        <span class="stage">${escapeHtml(note.signal)} / ${escapeHtml(note.strength)}</span>
      </div>
      <p class="note-question">${escapeHtml(note.question)}</p>
      <p>${escapeHtml(note.answer)}</p>
      <button class="row-action" title="Remove note" aria-label="Remove note" data-delete-note="${note.id}">x</button>
    </article>
  `).join("") || `<p class="muted">Click a question, capture the answer, and save the signal.</p>`;
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + 1;
    return acc;
  }, {});
}

async function analyzeWithApi(type, text) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, text })
  });

  if (!response.ok) throw new Error(`API failed with ${response.status}`);
  return response.json();
}

function analyzeLocally(type, text) {
  const lower = text.toLowerCase();
  const causes = [];

  if (lower.includes("crashloopbackoff") || lower.includes("oomkilled")) {
    causes.push("Pod restart pattern detected. Check memory limits, startup dependencies, and recent image changes.");
  }
  if (lower.includes("imagepullbackoff") || lower.includes("unauthorized")) {
    causes.push("Image pull or registry authorization issue detected. Validate Artifact Registry permissions and image tags.");
  }
  if (lower.includes("timeout") || lower.includes("latency")) {
    causes.push("Latency or timeout symptom detected. Compare traffic, dependency latency, and autoscaling behavior.");
  }
  if (lower.includes("terraform") || lower.includes("plan") || lower.includes("apply")) {
    causes.push("Infrastructure change signal detected. Review Terraform state, provider drift, and IAM permissions.");
  }
  if (lower.includes("5xx") || lower.includes("error rate")) {
    causes.push("Service reliability signal detected. Prioritize recent deployments, dependency failures, and saturation.");
  }

  return {
    source: "local",
    type,
    confidence: causes.length ? "medium" : "low",
    severity: causes.length > 1 || lower.includes("5xx") ? "sev2" : "needs triage",
    summary: `${type} incident requires triage across recent change, saturation, dependency failure, and configuration drift.`,
    owner: "Service or platform owner",
    dashboardFocus: "Logs, metrics, deployment history, health checks, and dependency dashboards",
    causes: causes.length ? causes : [
      "Recent deployment or configuration change",
      "Resource saturation or autoscaling lag",
      "Missing permission, secret, network route, or dependency access"
    ],
    commands: commands[type] || commands.Kubernetes,
    investigation: [
      "Find the first timestamp where healthy behavior changed.",
      "Compare failing and healthy workloads or environments.",
      "Check recent deployments, config changes, and infrastructure changes."
    ],
    evidenceToCollect: [
      "Alert payload and exact timestamp",
      "Recent deployment and configuration changes",
      "Before-and-after dashboard values",
      "Commands executed and mitigation result"
    ],
    customerUpdate: "We are investigating a reliability issue and checking recent changes, service health, and dependencies. We will share the next update after confirming impact and mitigation path.",
    runbook: [
      "Assign an incident owner",
      "Confirm affected service, users, and start time",
      "Open logs, metrics, deployment history, and dependency dashboards",
      "Run investigation commands and save outputs",
      "Apply the smallest reversible mitigation",
      "Verify recovery and create follow-up actions"
    ],
    remediation: [
      "Confirm blast radius and affected users.",
      "Apply the smallest reversible mitigation first.",
      "Capture before-and-after evidence.",
      "Convert final steps into a reusable runbook."
    ],
    prevention: [
      "Add owner, service, environment, deploy version, and dashboard links to alerts.",
      "Add release gates for probes, limits, rollback readiness, and dependency checks.",
      "Review runbooks after serious incidents."
    ],
    postmortemDraft: {
      impact: "Impact pending confirmation.",
      trigger: "Alert or operator report triggered investigation.",
      timeline: ["T0: Alert received", "T1: Triage started", "T2: Mitigation applied"],
      followUps: ["Add observability context", "Update runbook", "Track repeated alert pattern"]
    }
  };
}

function renderAnalysis(result) {
  return `
    <div class="analysis-meta">
      <span class="status-chip">${escapeHtml(result.source || "local")}</span>
      <span class="status-chip">confidence: ${escapeHtml(result.confidence || "low")}</span>
      <span class="status-chip">severity: ${escapeHtml(result.severity || "needs triage")}</span>
    </div>
    <h3>Incident Summary</h3>
    <p>${escapeHtml(result.summary)}</p>
    <h3>Owner And Dashboard Focus</h3>
    <p><strong>Owner:</strong> ${escapeHtml(result.owner || "Service owner")}</p>
    <p><strong>Dashboard:</strong> ${escapeHtml(result.dashboardFocus || "Logs, metrics, deployment, and dependency dashboards")}</p>
    <h3>Likely Causes</h3>
    <ul>${list(result.causes)}</ul>
    <h3>Investigation Steps</h3>
    <ol>${list(result.investigation)}</ol>
    <h3>Commands To Run</h3>
    <pre>${escapeHtml((result.commands || []).join("\n"))}</pre>
    <h3>Evidence To Collect</h3>
    <ul>${list(result.evidenceToCollect)}</ul>
    <h3>Runbook Draft</h3>
    <ol>${list(result.runbook)}</ol>
    <h3>Customer Update</h3>
    <p>${escapeHtml(result.customerUpdate || "Investigation is in progress. Next update pending impact and mitigation confirmation.")}</p>
    <h3>Remediation Steps</h3>
    <ol>${list(result.remediation)}</ol>
    <h3>Prevention Checklist</h3>
    <ul>${list(result.prevention)}</ul>
    <h3>Postmortem Draft</h3>
    <p><strong>Impact:</strong> ${escapeHtml(result.postmortemDraft?.impact || "Pending")}</p>
    <p><strong>Trigger:</strong> ${escapeHtml(result.postmortemDraft?.trigger || "Pending")}</p>
  `;
}

function list(items = []) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bindEvents() {
  $$(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".nav-item").forEach((item) => item.classList.remove("active"));
      $$(".view").forEach((view) => view.classList.remove("active"));
      button.classList.add("active");
      $(`#${button.dataset.view}`).classList.add("active");
    });
  });

  $("#leadForm").addEventListener("submit", (event) => {
    event.preventDefault();
    state.leads.unshift({
      id: id(),
      name: $("#leadName").value.trim(),
      company: $("#leadCompany").value.trim(),
      stage: $("#leadStage").value,
      pain: $("#leadPain").value.trim()
    });
    event.target.reset();
    saveState();
    render();
  });

  $("#leadRows").addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-lead]");
    if (!button) return;
    state.leads = state.leads.filter((lead) => lead.id !== button.dataset.deleteLead);
    saveState();
    render();
  });

  $("#taskForm").addEventListener("submit", (event) => {
    event.preventDefault();
    state.tasks.unshift({ id: id(), title: $("#taskTitle").value.trim(), lane: $("#taskLane").value, done: false });
    event.target.reset();
    saveState();
    render();
  });

  $("#taskBoard").addEventListener("change", (event) => {
    const input = event.target.closest("[data-task]");
    if (!input) return;
    const task = state.tasks.find((item) => item.id === input.dataset.task);
    if (task) task.done = input.checked;
    saveState();
    render();
  });

  $("#readinessList").addEventListener("change", (event) => {
    const input = event.target.closest("[data-check]");
    if (!input) return;
    state.checks[input.dataset.check] = input.checked;
    saveState();
    renderReadiness();
  });

  $$(".asset-button").forEach((button) => {
    button.addEventListener("click", async () => {
      const text = demoAssets[button.dataset.demoAsset] || "";
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
      button.textContent = "Copied";
      setTimeout(() => {
        button.textContent = button.dataset.demoAsset === "script"
          ? "Copy 5-min script"
          : button.dataset.demoAsset === "pilot"
            ? "Copy pilot ask"
            : "Copy security note";
      }, 1200);
    });
  });

  $("#questionBank").addEventListener("click", (event) => {
    const button = event.target.closest("[data-question]");
    if (!button) return;
    $$(".question-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    $("#selectedQuestion").value = button.dataset.question;
    $("#interviewAnswer").focus();
  });

  $("#interviewForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const question = $("#selectedQuestion").value.trim();
    const answer = $("#interviewAnswer").value.trim();
    if (!question || question.startsWith("Click any question") || !answer) return;

    state.interviewNotes = state.interviewNotes || [];
    state.interviewNotes.unshift({
      id: id(),
      person: $("#interviewPerson").value.trim() || "Unknown",
      question,
      answer,
      signal: $("#interviewSignal").value,
      strength: $("#interviewStrength").value,
      createdAt: new Date().toISOString()
    });

    $("#interviewAnswer").value = "";
    $("#interviewPerson").value = "";
    saveState();
    renderInterviewNotes();
  });

  $("#interviewNotes").addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-note]");
    if (!button) return;
    state.interviewNotes = (state.interviewNotes || []).filter((note) => note.id !== button.dataset.deleteNote);
    saveState();
    renderInterviewNotes();
  });

  $("#incidentForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const type = $("#incidentType").value;
    const text = $("#incidentText").value.trim() || "No incident context provided.";
    $("#analysisOutput").innerHTML = `<p>Analyzing incident context...</p>`;

    let result;
    try {
      result = await analyzeWithApi(type, text);
    } catch {
      result = analyzeLocally(type, text);
    }

    state.incidents.unshift({ id: id(), type, text, result, createdAt: new Date().toISOString() });
    saveState();
    $("#analysisOutput").innerHTML = renderAnalysis(result);
  });

  $("#sampleIncidents").addEventListener("click", (event) => {
    const button = event.target.closest("[data-sample]");
    if (!button) return;
    const sample = sampleIncidents.find((item) => item.title === button.dataset.sample);
    if (!sample) return;
    $("#incidentType").value = sample.type;
    $("#incidentText").value = sample.text;
  });

  $("#exportData").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cloudops-copilot-workspace.json";
    link.click();
    URL.revokeObjectURL(url);
  });

  $("#resetDemo").addEventListener("click", () => {
    state = clone(seedState);
    saveState();
    render();
    $("#analysisOutput").innerHTML = renderAnalysis(analyzeLocally("Kubernetes", "CrashLoopBackOff after deployment with increased 5xx error rate"));
  });
}

bindEvents();
render();
$("#analysisOutput").innerHTML = renderAnalysis(analyzeLocally("Kubernetes", "CrashLoopBackOff after deployment with increased 5xx error rate"));
