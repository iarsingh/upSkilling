const { generateWithOllama } = require("./ollama");

// TODO(you): Fill in one real scenario-based question per pillar below.
// These are used whenever Ollama is unavailable and the fallback post kicks in,
// so they matter most when you're offline or the local model times out.
//
// Why this is worth writing yourself rather than letting a template generate it:
// a scenario pulled from something you actually debugged or decided on the job
// reads as authentic and doubles as interview-prep material (per your career-switch
// content angle in gke-terraform-content/career-switch-plan). A generic "what would
// you do if pods crash?" doesn't carry that signal - a specific one
// ("prod HPA thrashed between 2 and 8 replicas every time a downstream API got slow -
// what's your first move?") does.
//
// Shape: 2-3 sentences describing a concrete situation, ending in a question.
const scenarioByPillar = {
  "Kubernetes Series": "", // TODO: e.g. an incident you diagnosed involving requests/limits, autoscaling, or probes
  "MLOps Series": "", // TODO: e.g. a model rollout or drift situation you had to make a call on
  "Data Science Series": "", // TODO: e.g. a data quality or leakage issue you caught (or missed) in review
  "IT Engineering Series": "" // TODO: e.g. an SLO breach, IaC review finding, or on-call decision
};

function fallbackScenario(topic) {
  return scenarioByPillar[topic.pillar] ||
    `You're the on-call engineer and ${topic.topic.toLowerCase()} just became a live production issue. What's your first move?`;
}

function fallbackPost(topic) {
  const bulletsByPillar = {
    "Kubernetes Series": [
      "Start with the workload behavior, then tune Kubernetes around that behavior.",
      "Set requests based on steady-state usage and limits based on failure boundaries.",
      "Watch p95 and p99 latency during scaling events, not only CPU graphs.",
      "Document the production assumption behind every autoscaling rule."
    ],
    "MLOps Series": [
      "Treat model promotion like software release governance.",
      "Track dataset version, code version, metrics, approver, and deployment target together.",
      "Use canary rollout before sending all traffic to a new model.",
      "Connect monitoring signals to rollback and retraining decisions."
    ],
    "Data Science Series": [
      "Good model quality starts before training begins.",
      "Validate assumptions about data freshness, leakage, skew, and missing values.",
      "Choose metrics that match business cost, not only leaderboard performance.",
      "Keep explanations simple enough for non-ML stakeholders to challenge."
    ],
    "IT Engineering Series": [
      "Reliable platforms are built from repeatable operating habits.",
      "Automate the boring paths first: deploy, rollback, backup, alert, and audit.",
      "Measure the user-facing signal before optimizing internal dashboards.",
      "Keep runbooks close to the system they operate."
    ]
  };

  return {
    hook: `${topic.topic}: a practical production note`,
    body: `In real engineering teams, this topic matters because small design choices become operational patterns over time. A clean setup helps teams ship faster, debug faster, and reduce avoidable incidents.`,
    scenario: fallbackScenario(topic),
    bullets: bulletsByPillar[topic.pillar] || bulletsByPillar["IT Engineering Series"],
    cta: "What is one production lesson you learned around this?",
    hashtags: topic.hashtags,
    imageTitle: topic.pillar,
    imageSubtitle: topic.topic
  };
}

function normalizePost(raw, topic) {
  return {
    hook: String(raw.hook || topic.topic).trim(),
    body: String(raw.body || "").trim(),
    answer: String(raw.answer || "").trim(),
    scenario: String(raw.scenario || "").trim(),
    flow: Array.isArray(raw.flow) ? raw.flow.slice(0, 6).map(String) : [],
    bullets: Array.isArray(raw.bullets) ? raw.bullets.slice(0, 5).map(String) : [],
    cta: String(raw.cta || "What would you add from your experience?").trim(),
    hashtags: Array.isArray(raw.hashtags) && raw.hashtags.length ? raw.hashtags : topic.hashtags,
    imageTitle: String(raw.imageTitle || topic.pillar).trim(),
    imageSubtitle: String(raw.imageSubtitle || topic.topic).trim()
  };
}

async function generatePost(topic) {
  try {
    const raw = await generateWithOllama(topic);
    return { post: normalizePost(raw, topic), source: "ollama" };
  } catch (error) {
    return {
      post: normalizePost(fallbackPost(topic), topic),
      source: `fallback (${error.message})`
    };
  }
}

function renderLinkedInText(post) {
  const bullets = post.bullets.map((item) => `- ${item}`).join("\n");
  const flow = post.flow.map((item, index) => `${index + 1}. ${item}`).join("\n");
  const hashtags = post.hashtags.map((tag) => tag.startsWith("#") ? tag : `#${tag}`).join(" ");
  const sections = [
    post.hook,
    post.body,
    post.answer ? `Answer:\n${post.answer}` : "",
    flow ? `Architecture flow:\n${flow}` : "",
    bullets ? `Production checklist:\n${bullets}` : "",
    post.scenario ? `Scenario:\n${post.scenario}` : "",
    post.cta,
    hashtags
  ].filter(Boolean);
  return sections.join("\n\n").trim();
}

module.exports = { generatePost, renderLinkedInText };
