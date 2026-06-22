function compact(value, max = 270) {
  const text = String(value).replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 3).replace(/\s+\S*$/, "")}...`;
}

function hashtags(tags) {
  return tags.map((tag) => (tag.startsWith("#") ? tag : `#${tag}`)).join(" ");
}

const patterns = {
  Kubernetes: {
    answer: "Start from workload behavior, set requests from steady usage, set limits from failure boundaries, and validate with latency during scale events.",
    flow: "Service -> Deployment -> requests/limits -> HPA -> PDB -> alerts -> rollback runbook",
    checklist: "Check p95 latency, restart rate, throttling, pending pods, PDB coverage, and rollback path before calling a rollout production-ready."
  },
  MLOps: {
    answer: "Treat every model like a controlled release: version data, code, metrics, approvals, artifact, deployment target, and rollback decision together.",
    flow: "Data -> training pipeline -> MLflow run -> registry approval -> canary deploy -> monitoring -> rollback or promote",
    checklist: "Track lineage, owner, metric threshold, canary window, drift signal, refresh trigger, and model retirement rule."
  },
  Infrastructure: {
    answer: "Good infrastructure practice is repeatability plus reviewability. Plans, policies, approvals, state, and drift checks should be visible before apply.",
    flow: "PR -> terraform fmt/validate -> plan -> policy check -> approval -> apply -> drift monitor -> GitOps sync",
    checklist: "Review blast radius, state backend, IAM scope, module version, secrets handling, tags, cost estimate, and rollback notes."
  },
  "Data Science": {
    answer: "Strong model work starts before training: define the business cost, validate data quality, prevent leakage, and choose metrics that match decisions.",
    flow: "Question -> data contract -> split strategy -> baseline -> experiment -> validation -> monitoring",
    checklist: "Check leakage, skew, missing values, imbalance, metric fit, explainability, deployment input contract, and feedback loop."
  }
};

function generateThread(topic) {
  const pattern = patterns[topic.pillar] || patterns.Infrastructure;
  const tagText = hashtags(topic.hashtags);
  const hook = compact(`Thread: ${topic.topic} for ${topic.audience}. A short production view with the answer, architecture flow, and checklist. ${tagText}`);
  const answer = compact(`Answer: ${pattern.answer}`);
  const flow = compact(`Architecture flow: ${pattern.flow}`);
  const checklist = compact(`Production checklist: ${pattern.checklist}`);
  const close = compact(`My rule: if it cannot be reviewed, monitored, and rolled back, it is not production-ready yet. What would you add? ${tagText}`);

  return [hook, answer, flow, checklist, close];
}

function renderMarkdown(topic, thread) {
  return [
    "---",
    `date: ${topic.date}`,
    `series: ${topic.pillar}`,
    `topic: ${topic.topic}`,
    `angle: ${topic.angle}`,
    "platform: x",
    "---",
    "",
    ...thread.map((part, index) => [`## Post ${index + 1}`, "", part, ""].join("\n"))
  ].join("\n").trim() + "\n";
}

module.exports = { generateThread, renderMarkdown, compact };
