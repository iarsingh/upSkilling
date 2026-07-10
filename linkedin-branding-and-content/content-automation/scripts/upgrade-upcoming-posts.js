const fs = require("fs");
const path = require("path");
const { root } = require("../src/config");
const { createImage } = require("../src/image");

const calendarPath = path.join(root, "content-calendar.json");
const startDate = process.argv[2] || process.env.START_DATE || "2026-07-11";

const streamConfig = {
  "MLOps Series": {
    icon: "🧠",
    role: "ML platform architect",
    audience: "MLOps, ML platform, DevOps, and cloud engineers",
    promise: "Production ML succeeds when model quality, platform reliability, and business risk are designed together.",
    principle: "Treat every model release as a software release plus a data contract.",
    hashtags: ["#MLOps", "#MLPlatform", "#MachineLearning", "#DevOps", "#AIInfrastructure"],
    cta: "What would you add to make this safer in a real ML platform?",
    sections: [
      "model and data versioning",
      "release gates and approvals",
      "serving reliability",
      "drift and performance monitoring",
      "rollback and ownership"
    ]
  },
  "Kubernetes Series": {
    icon: "☸️",
    role: "platform architect",
    audience: "DevOps, platform, SRE, and cloud-native engineers",
    promise: "Kubernetes works best when it is treated as a reliability platform, not a YAML deployment target.",
    principle: "Design the operating model before scaling the cluster.",
    hashtags: ["#Kubernetes", "#PlatformEngineering", "#DevOps", "#SRE", "#CloudNative"],
    cta: "How would you design this in a production Kubernetes platform?",
    sections: [
      "workload ownership",
      "traffic and service boundaries",
      "security and policy",
      "observability and alerting",
      "rollback and incident response"
    ]
  },
  "Python Automation Series": {
    icon: "🐍",
    role: "automation-focused SDE",
    audience: "DevOps, Cloud, SRE, MLOps, and backend engineers",
    promise: "Python is strongest when it removes manual operational work and leaves a clear audit trail.",
    principle: "Build scripts like internal products: safe defaults, clear logs, and predictable failure behavior.",
    hashtags: ["#Python", "#Automation", "#DevOps", "#SRE", "#CloudComputing"],
    cta: "Which part of this would you automate first in your team?",
    sections: [
      "input validation",
      "timeouts and retries",
      "clear reporting",
      "CI or scheduled execution",
      "safe failure handling"
    ]
  }
};

const topicPlaybooks = [
  {
    match: /drift|concept/i,
    hook: "Drift is not just a data science metric. It is an early warning system for product behavior.",
    architectView: "I separate input drift, feature drift, prediction drift, and business KPI movement before deciding whether to retrain.",
    checks: [
      "Compare live feature distributions against the training baseline.",
      "Track prediction distribution changes by segment, geography, and customer type.",
      "Link drift alerts to model version, dataset version, and feature pipeline version.",
      "Avoid automatic retraining until the business impact and data quality are understood.",
      "Keep a rollback path if the new model improves offline metrics but hurts production behavior."
    ],
    risk: "The expensive mistake is retraining on bad data and calling it continuous improvement.",
    imageSubtitle: "Separate data movement from business behavior"
  },
  {
    match: /registry|approval|controlled production/i,
    hook: "A model registry should be a control plane, not a storage folder for artifacts.",
    architectView: "For production ML, I want the registry to connect metrics, lineage, approvals, deployment targets, and rollback decisions.",
    checks: [
      "Require model card, dataset snapshot, metrics, owner, and approval metadata.",
      "Separate experiment tracking from production promotion.",
      "Block promotion if evaluation, security, or compliance checks are missing.",
      "Record which model version is deployed to each environment.",
      "Make rollback a first-class workflow, not a manual search through old runs."
    ],
    risk: "If nobody can explain why a model reached production, the platform is not audit-ready.",
    imageSubtitle: "Govern model promotion like a release system"
  },
  {
    match: /canary/i,
    hook: "Canary releases for ML need more than traffic splitting.",
    architectView: "A model can have healthy infrastructure metrics and still make worse decisions, so canary analysis must include product and prediction signals.",
    checks: [
      "Start with shadow traffic when user impact is high.",
      "Compare latency, error rate, prediction distribution, and business KPI.",
      "Define automatic stop conditions before the rollout begins.",
      "Keep old and new model versions observable side by side.",
      "Promote gradually only when technical and business signals agree."
    ],
    risk: "The risky part is not deploying the model. It is trusting the wrong success metric.",
    imageSubtitle: "Compare model behavior before full exposure"
  },
  {
    match: /feature store|feature pipeline/i,
    hook: "Feature platforms fail quietly when ownership is unclear.",
    architectView: "I treat features as reusable production APIs with contracts, freshness targets, lineage, and monitoring.",
    checks: [
      "Define feature owner, freshness SLA, schema, and allowed consumers.",
      "Validate offline and online feature parity.",
      "Track lineage from raw data to model prediction.",
      "Monitor null rate, distribution shift, and late-arriving data.",
      "Version features when meaning changes, not only when code changes."
    ],
    risk: "The most painful bugs happen when a feature keeps the same name but changes its meaning.",
    imageSubtitle: "Design feature ownership and lineage early"
  },
  {
    match: /mlflow|kubeflow|pipeline/i,
    hook: "Reproducibility is not a notebook feature. It is a platform property.",
    architectView: "A reliable ML pipeline should make inputs, parameters, code, artifacts, metrics, and approvals traceable without hero debugging.",
    checks: [
      "Log dataset version, code commit, image version, parameters, and metrics.",
      "Separate reusable pipeline components from experiment-specific logic.",
      "Make failed stages restartable without rerunning everything.",
      "Promote artifacts through registry and approval workflows.",
      "Store enough context to reproduce a result months later."
    ],
    risk: "If a model cannot be reproduced, it cannot be responsibly operated.",
    imageSubtitle: "Make every ML result explainable later"
  },
  {
    match: /monitoring|latency|serving|inference/i,
    hook: "Model serving reliability is an end-to-end latency problem.",
    architectView: "I break inference into gateway, queue, preprocessing, feature lookup, model runtime, post-processing, and dependency calls.",
    checks: [
      "Track p50, p95, p99 latency by model version.",
      "Separate queue time from model execution time.",
      "Monitor feature store, vector database, and external API latency.",
      "Keep resource requests, autoscaling, and concurrency aligned.",
      "Trace one slow request before changing infrastructure blindly."
    ],
    risk: "The model often gets blamed when the bottleneck is actually dependency latency or cold starts.",
    imageSubtitle: "Trace the full inference path"
  },
  {
    match: /rollback/i,
    hook: "A model rollback is not the same as an application rollback.",
    architectView: "A bad ML release may involve model weights, features, data, thresholds, prompts, config, or serving logic.",
    checks: [
      "Version model, dataset, feature pipeline, container image, and config together.",
      "Keep the last known-good model deployable.",
      "Define rollback triggers before rollout.",
      "Monitor technical metrics and business outcome metrics.",
      "Document what changed so the next release is safer."
    ],
    risk: "Fast rollback is useful. Controlled recovery is better.",
    imageSubtitle: "Design recovery before release"
  },
  {
    match: /batch inference|real-time/i,
    hook: "Batch and real-time inference are architecture choices, not maturity levels.",
    architectView: "I choose between them using latency needs, cost profile, data freshness, failure tolerance, and operational complexity.",
    checks: [
      "Use batch when decisions can wait and throughput matters.",
      "Use real-time when user experience depends on immediate prediction.",
      "Define freshness requirements before choosing infra.",
      "Model retry, backfill, and partial failure behavior.",
      "Measure cost per prediction, not only cluster cost."
    ],
    risk: "Real-time systems look impressive until the business only needed hourly scoring.",
    imageSubtitle: "Choose serving mode from product constraints"
  },
  {
    match: /lineage|audit/i,
    hook: "Audit-ready ML is built during delivery, not after a compliance request.",
    architectView: "Lineage should connect data, features, training, approval, deployment, monitoring, and rollback in one explainable chain.",
    checks: [
      "Capture dataset snapshot and feature versions.",
      "Record code commit, image digest, parameters, and metrics.",
      "Store approver, approval reason, and deployment target.",
      "Link production predictions to model version.",
      "Make lineage queryable for incidents and audits."
    ],
    risk: "If lineage lives in scattered screenshots, it will fail exactly when you need it.",
    imageSubtitle: "Connect data, model, release, and outcome"
  },
  {
    match: /requests|limits|resource/i,
    hook: "Kubernetes requests and limits are architecture decisions disguised as YAML fields.",
    architectView: "They influence scheduling, autoscaling, reliability, cost, and noisy-neighbor behavior.",
    checks: [
      "Set requests from measured baseline usage, not guesses.",
      "Use limits carefully for memory and even more carefully for CPU.",
      "Align HPA targets with realistic request values.",
      "Watch throttling, OOMKills, pending pods, and node pressure.",
      "Review settings after traffic or workload behavior changes."
    ],
    risk: "Bad requests do not just waste money. They make autoscaling lie.",
    imageSubtitle: "Scheduling, scaling, reliability, and cost"
  },
  {
    match: /hpa|vpa|autoscaler/i,
    hook: "Autoscaling is not one feature. It is a chain of feedback loops.",
    architectView: "HPA, VPA, and Cluster Autoscaler must agree with workload behavior, resource requests, and node capacity.",
    checks: [
      "Use HPA for replica count based on workload demand.",
      "Use VPA recommendations carefully for right-sizing.",
      "Use Cluster Autoscaler for node capacity gaps.",
      "Avoid conflicting controls without clear ownership.",
      "Test scale-up, scale-down, and failure behavior before production traffic."
    ],
    risk: "Autoscaling without good requests becomes expensive randomness.",
    imageSubtitle: "Coordinate workload and cluster feedback loops"
  },
  {
    match: /pdb|disruption/i,
    hook: "PodDisruptionBudgets are small YAML with large reliability impact.",
    architectView: "They protect availability during voluntary disruptions like upgrades, drains, and maintenance.",
    checks: [
      "Define how many replicas must stay available.",
      "Match PDB settings with replica count and rollout strategy.",
      "Do not use PDBs to hide poor capacity planning.",
      "Test node drain behavior before upgrades.",
      "Document the operational expectation for each critical service."
    ],
    risk: "A strict PDB with too few replicas can block maintenance and still not improve reliability.",
    imageSubtitle: "Protect availability during planned disruption"
  },
  {
    match: /crashloop|imagepull|debug/i,
    hook: "Good Kubernetes debugging follows evidence, not random kubectl commands.",
    architectView: "I move from symptom to scheduling, image, config, dependency, resource, and application signals.",
    checks: [
      "Read events before changing manifests.",
      "Check image tag, registry auth, and pull secrets.",
      "Inspect env vars, secrets, config maps, and mounted volumes.",
      "Review probes, command args, ports, and startup dependencies.",
      "Correlate logs with recent deploys and resource pressure."
    ],
    risk: "The fastest fix is often found in events, not in the application logs.",
    imageSubtitle: "Debug from events to runtime behavior"
  },
  {
    match: /readiness|liveness|probe/i,
    hook: "Readiness and liveness probes answer different operational questions.",
    architectView: "Readiness controls traffic. Liveness controls restart. Mixing them creates avoidable incidents.",
    checks: [
      "Use readiness to decide if the pod should receive traffic.",
      "Use liveness to recover from a stuck process.",
      "Give slow apps enough startup time.",
      "Avoid probes that depend on fragile downstream services.",
      "Tune thresholds using real startup and failure behavior."
    ],
    risk: "Aggressive liveness probes can turn a slow dependency into a restart storm.",
    imageSubtitle: "Traffic routing and restart behavior"
  },
  {
    match: /secret|config|security/i,
    hook: "Secrets management is an operating model, not only a Kubernetes object.",
    architectView: "The goal is controlled access, rotation, auditability, and fewer long-lived credentials in developer workflows.",
    checks: [
      "Keep secrets out of Git and container images.",
      "Use external secret managers where possible.",
      "Limit access with RBAC and workload identity.",
      "Rotate credentials and test rotation behavior.",
      "Audit who can read, update, and mount sensitive values."
    ],
    risk: "A secret that cannot be rotated safely is already a production risk.",
    imageSubtitle: "Design access, rotation, and auditability"
  },
  {
    match: /namespace|multi-team/i,
    hook: "Namespaces are not folders. They are ownership and policy boundaries.",
    architectView: "For multi-team platforms, namespaces should express responsibility, quota, access, network policy, and operational expectations.",
    checks: [
      "Define namespace ownership and escalation path.",
      "Apply resource quotas and limit ranges.",
      "Use RBAC groups instead of individual exceptions.",
      "Add NetworkPolicy for traffic boundaries.",
      "Standardize labels for cost, environment, team, and service."
    ],
    risk: "Without ownership, namespaces become shared junk drawers with production labels.",
    imageSubtitle: "Turn namespaces into platform boundaries"
  },
  {
    match: /rbac/i,
    hook: "RBAC risk usually grows through convenience.",
    architectView: "A platform should make the safe path easy: least privilege, group-based access, audit trails, and short-lived elevation.",
    checks: [
      "Prefer Roles over ClusterRoles when scope allows.",
      "Bind groups, not individuals.",
      "Review wildcard verbs and resources.",
      "Separate human access from workload identity.",
      "Audit permissions regularly with real usage patterns."
    ],
    risk: "The dangerous permission is often the one nobody remembers granting.",
    imageSubtitle: "Least privilege needs operational hygiene"
  },
  {
    match: /ingress/i,
    hook: "Ingress troubleshooting is a traffic-path exercise.",
    architectView: "I debug from DNS to load balancer, ingress controller, ingress rule, service endpoints, and pod readiness.",
    checks: [
      "Confirm DNS resolves to the expected load balancer.",
      "Check controller health, events, and IngressClass.",
      "Verify host, path, TLS secret, and annotations.",
      "Confirm Service selectors produce healthy endpoints.",
      "Trace one request before changing multiple layers."
    ],
    risk: "Changing annotations randomly is slower than proving where traffic stops.",
    imageSubtitle: "Trace DNS to controller to service to pod"
  },
  {
    match: /networkpolicy/i,
    hook: "NetworkPolicy is where platform security becomes concrete.",
    architectView: "A good policy design starts with application communication maps, not a blanket deny that breaks production.",
    checks: [
      "Start with namespace boundaries and known service flows.",
      "Allow DNS and required platform dependencies explicitly.",
      "Separate ingress and egress intent.",
      "Test policies in staging with real traffic.",
      "Document exceptions with owner and expiry."
    ],
    risk: "A policy nobody understands becomes either too open or too fragile.",
    imageSubtitle: "Make service communication explicit"
  },
  {
    match: /helm/i,
    hook: "Helm values are a contract between app teams and platform teams.",
    architectView: "The best charts separate app-owned configuration from platform-owned reliability, security, and runtime controls.",
    checks: [
      "Keep base values stable and environment overlays small.",
      "Document which values teams can change safely.",
      "Keep secrets out of values files.",
      "Validate rendered manifests before merge.",
      "Version chart changes that affect runtime behavior."
    ],
    risk: "A giant values file is not flexibility. It is hidden operational coupling.",
    imageSubtitle: "Design clean app and platform boundaries"
  },
  {
    match: /gke|node pool/i,
    hook: "GKE node pool upgrades should be boring by design.",
    architectView: "A safe upgrade strategy combines surge capacity, PDBs, workload spread, observability, and rollback thinking.",
    checks: [
      "Upgrade non-critical pools first.",
      "Check PDBs, replicas, and topology spread before draining nodes.",
      "Use surge upgrades where capacity allows.",
      "Watch workload errors, restarts, scheduling, and latency.",
      "Document the rollback path and maintenance window."
    ],
    risk: "The upgrade is not the hard part. Keeping workloads available during it is.",
    imageSubtitle: "Make cluster maintenance predictable"
  },
  {
    match: /service discovery/i,
    hook: "Kubernetes service discovery is simple until labels, ports, and readiness disagree.",
    architectView: "I verify service routing by checking selectors, endpoints, DNS, ports, and pod readiness together.",
    checks: [
      "Confirm the Service selector matches pod labels.",
      "Check EndpointSlice for ready addresses.",
      "Validate service port, targetPort, and containerPort.",
      "Use DNS names consistently across namespaces.",
      "Debug from client pod to service to endpoint."
    ],
    risk: "A Service with no endpoints is usually a label or readiness story.",
    imageSubtitle: "Selectors, endpoints, DNS, and ports"
  },
  {
    match: /production checklist/i,
    hook: "A production checklist is not bureaucracy. It is incident prevention.",
    architectView: "Before production, I want reliability, security, observability, rollback, and ownership to be explicit.",
    checks: [
      "Requests, limits, probes, PDB, and autoscaling are defined.",
      "Logs, metrics, traces, and alerts map to user impact.",
      "Ingress, DNS, TLS, and NetworkPolicy are tested.",
      "Rollback and escalation paths are documented.",
      "Runbook exists before the first incident."
    ],
    risk: "If production readiness depends on memory, the system is not ready.",
    imageSubtitle: "Make reliability visible before launch"
  },
  {
    match: /log analyzer|incident|health|inventory|report|csv|excel|cli|github actions|ci\/cd|file|folder|cost|automation|roadmap/i,
    hook: "Python automation becomes senior-level when it reduces operational risk, not just manual effort.",
    architectView: "I design scripts with the same discipline as services: inputs, outputs, failure modes, logging, tests, and ownership.",
    checks: [
      "Define the manual decision the script should improve.",
      "Validate inputs before touching external systems.",
      "Use timeouts, retries, and clear exception messages.",
      "Produce a report that humans can act on.",
      "Run in CI or a scheduler only after dry-run behavior is safe."
    ],
    risk: "The risky script is the one that works silently until it changes the wrong thing.",
    imageSubtitle: "Build scripts like internal engineering products"
  }
];

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

function playbookFor(topic) {
  return topicPlaybooks.find((playbook) => playbook.match.test(topic)) || {
    hook: `${topic} is easier to operate when architecture decisions are explicit.`,
    architectView: "I look for ownership, failure modes, rollout safety, observability, cost, and security before calling a design production-ready.",
    checks: [
      "Define the production problem and owner.",
      "Document the operating boundary and failure mode.",
      "Add observability before scaling usage.",
      "Automate the repeatable path and review the risky path.",
      "Create a rollback plan before the first incident."
    ],
    risk: "The hidden cost is usually operational ambiguity.",
    imageSubtitle: "Make production decisions explicit"
  };
}

function renderPost(item) {
  const stream = streamConfig[item.pillar] || streamConfig["Python Automation Series"];
  const playbook = playbookFor(item.topic);
  const hashtags = [...new Set([...(item.hashtags || []), ...stream.hashtags])].slice(0, 5);

  return `${stream.icon} ${playbook.hook}

Day ${item.day}/60 of my ${item.pillar}.

Writing this from the lens of a 7-year DevOps / Platform / MLOps engineer:
the tool is rarely the hard part. The hard part is designing the system so teams can operate it safely after the first release.

Architect view:
${playbook.architectView}

My production checklist:
${playbook.checks.map((check, index) => `${index + 1}. ${check}`).join("\n")}

Tradeoff I would call out:
${playbook.risk}

Principle I keep coming back to:
${stream.principle}

This is the difference between "it works" and "it is ready for production ownership."

${stream.cta}

${hashtags.join(" ")}`;
}

function markdownFor(item) {
  const imageLine = item.imagePath ? [`image: ${path.relative(path.join(root, "posts"), path.join(root, item.imagePath))}`] : [];
  return [
    "---",
    `date: ${item.date}`,
    `slot: ${item.slot}`,
    `day: ${item.day}`,
    `series: ${item.pillar}`,
    `topic: ${item.topic}`,
    `linkedinProfile: ${item.linkedinProfile}`,
    ...imageLine,
    "status: scheduled",
    "---",
    "",
    item.text
  ].join("\n");
}

const calendar = JSON.parse(fs.readFileSync(calendarPath, "utf8"));
let upgraded = 0;

for (const item of calendar.items) {
  if (item.date < startDate || item.status !== "scheduled") continue;

  const stream = streamConfig[item.pillar] || streamConfig["Python Automation Series"];
  const playbook = playbookFor(item.topic);
  const slug = item.draftPath
    ? path.basename(item.draftPath, ".md")
    : `${item.date}-${item.id}-${slugify(item.topic)}`;
  const image = createImage({
    imageTitle: `${item.pillar} | Day ${item.day}`,
    imageSubtitle: playbook.imageSubtitle || item.topic
  }, slug);

  item.audience = stream.audience;
  item.hashtags = [...new Set([...(item.hashtags || []), ...stream.hashtags])].slice(0, 5);
  item.text = renderPost(item);
  item.imagePath = path.relative(root, image.pngPath);

  const draftPath = path.join(root, item.draftPath || path.join("posts", `${slug}.md`));
  item.draftPath = path.relative(root, draftPath);
  fs.writeFileSync(draftPath, markdownFor(item), "utf8");
  upgraded += 1;
}

fs.writeFileSync(calendarPath, `${JSON.stringify(calendar, null, 2)}\n`, "utf8");
console.log(`Upgraded ${upgraded} scheduled LinkedIn posts from ${startDate}.`);
