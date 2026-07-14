const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const calendarPath = path.join(root, "content-calendar.json");
const postsDir = path.join(root, "posts");
const statePath = path.join(root, "publish-state.json");
const linkedinProfile = "https://www.linkedin.com/in/iamarsingh/";

const days = Number(process.argv[2] || process.env.DAYS || 365);
const startDate = process.argv[3] || process.env.START_DATE || todayInTimezone();

const streams = [
  {
    key: "mlops",
    slot: "09:30",
    pillar: "MLOps Series",
    audience: "MLOps, ML platform, DevOps, and cloud engineers",
    hashtags: ["#MLOps", "#MachineLearning", "#MLPlatform", "#DevOps"],
    topics: [
      "Model registry approvals and controlled production releases",
      "Canary deployment strategy for machine learning models",
      "Feature store governance for production ML",
      "MLflow and Kubeflow pipeline design for reproducibility",
      "Model monitoring signals every ML platform should track",
      "Automated retraining triggers using drift and performance metrics",
      "Data drift vs concept drift explained clearly",
      "Building audit-ready ML lineage on cloud platforms",
      "Batch inference vs real-time inference tradeoffs",
      "Rollback strategy for bad model releases",
      "Model serving on Kubernetes with FastAPI",
      "Vertex AI vs self-managed GKE for ML workloads",
      "Inference latency troubleshooting workflow",
      "Feature pipeline quality checks before training",
      "Production checklist for ML model deployment",
    ],
  },
  {
    key: "k8s",
    slot: "14:30",
    pillar: "Kubernetes Series",
    audience: "DevOps, platform, SRE, and cloud-native engineers",
    hashtags: ["#Kubernetes", "#DevOps", "#PlatformEngineering", "#CloudNative"],
    topics: [
      "Kubernetes requests and limits explained with production examples",
      "How HPA, VPA, and Cluster Autoscaler work together",
      "Pod disruption budgets for reliable deployments",
      "Debugging CrashLoopBackOff step by step",
      "Readiness probes vs liveness probes in real workloads",
      "Secrets management patterns for Kubernetes platforms",
      "Designing namespaces for multi-team platforms",
      "Kubernetes RBAC mistakes that create security risk",
      "Ingress troubleshooting for production applications",
      "ImagePullBackOff debugging checklist",
      "NetworkPolicy design for safer workloads",
      "Helm values structure for repeatable deployments",
      "GKE node pool upgrade strategy",
      "Kubernetes service discovery explained practically",
      "Production checklist before deploying to Kubernetes",
    ],
  },
  {
    key: "python",
    slot: "19:30",
    pillar: "Python Automation Series",
    audience: "DevOps, Cloud, SRE, MLOps, and backend learners",
    hashtags: ["#Python", "#DevOps", "#MLOps", "#CloudComputing", "#Automation"],
    topics: [
      "Python automation for real engineering work",
      "Build a log analyzer with Python",
      "Python file and folder automation",
      "Python cloud cost reporting",
      "Python Kubernetes health checks",
      "Python CI/CD validation scripts",
      "Python API health monitoring",
      "Python Excel and CSV automation",
      "Python SRE incident summaries",
      "Python MLOps data drift checks",
      "Python security checks for config files",
      "Python helpers inside GitHub Actions",
      "Python infrastructure inventory reports",
      "Python CLI tools for DevOps engineers",
      "Python learning roadmap for DevOps and MLOps",
    ],
  },
  {
    key: "fundamentals",
    slot: "11:30",
    pillar: "DevOps & Cloud Fundamentals Series",
    audience: "DevOps, platform, cloud, and SRE engineers",
    hashtags: ["#DevOps", "#CloudComputing", "#PlatformEngineering", "#SRE"],
    // Three post ideas per taxonomy area. This stream runs on Sundays, so the
    // 105-topic fundamentals bank provides roughly two years of weekly posts
    // before repeating.
    topics: [
      { topic: "Kubernetes multi-tenancy patterns for shared clusters", hashtags: ["#Kubernetes", "#DevOps", "#PlatformEngineering", "#CloudNative"] },
      { topic: "Terraform state management and locking for multi-team environments", hashtags: ["#Terraform", "#OpenTofu", "#IaC", "#DevOps"] },
      { topic: "Linux performance troubleshooting with strace, perf, and /proc", hashtags: ["#Linux", "#SRE", "#DevOps", "#SystemsEngineering"] },
      { topic: "TCP/IP fundamentals every cloud engineer should know cold", hashtags: ["#Networking", "#CloudComputing", "#DevOps", "#SRE"] },
      { topic: "How containers actually isolate processes: namespaces and cgroups explained", hashtags: ["#Docker", "#Containers", "#DevOps", "#CloudNative"] },
      { topic: "Designing a CI/CD pipeline that fails fast and rolls back safely", hashtags: ["#CICD", "#DevOps", "#Automation", "#SoftwareEngineering"] },
      { topic: "Trunk-based development vs Git Flow for fast-moving teams", hashtags: ["#Git", "#DevOps", "#SoftwareEngineering", "#Collaboration"] },
      { topic: "Choosing between GCP, AWS, and Azure for a new platform: a practical framework", hashtags: ["#CloudComputing", "#GCP", "#AWS", "#Azure"] },
      { topic: "The three pillars of observability: logs, metrics, and traces in practice", hashtags: ["#Observability", "#SRE", "#DevOps", "#Monitoring"] },
      { topic: "Designing a rate limiter for a high-traffic API", hashtags: ["#SystemDesign", "#SoftwareEngineering", "#Scalability", "#BackendEngineering"] },
      { topic: "Writing Python automation scripts that are safe to run in production", hashtags: ["#Python", "#DevOps", "#Automation", "#MLOps"] },
      { topic: "Ansible idempotency patterns for configuration management at scale", hashtags: ["#Ansible", "#DevOps", "#ConfigurationManagement", "#Automation"] },
      { topic: "Shifting security left: embedding scans into the CI/CD pipeline", hashtags: ["#DevSecOps", "#Security", "#CICD", "#DevOps"] },
      { topic: "Building an internal developer platform teams actually want to use", hashtags: ["#PlatformEngineering", "#DevOps", "#DeveloperExperience", "#CloudNative"] },
      { topic: "GPU scheduling and cost tradeoffs for LLM inference workloads", hashtags: ["#MLOps", "#AIInfrastructure", "#MachineLearning", "#LLM"] },
      { topic: "Error budgets: how to use them to balance velocity and reliability", hashtags: ["#SRE", "#Reliability", "#DevOps", "#Observability"] },
      { topic: "Argo CD sync strategies for multi-cluster GitOps at scale", hashtags: ["#GitOps", "#ArgoCD", "#Kubernetes", "#DevOps"] },
      { topic: "Helm vs Kustomize: choosing the right templating approach for your team", hashtags: ["#Helm", "#Kustomize", "#Kubernetes", "#DevOps"] },
      { topic: "Designing a secure multi-account landing zone from day one", hashtags: ["#CloudArchitecture", "#LandingZone", "#CloudSecurity", "#DevOps"] },
      { topic: "Least privilege IAM policies that don't break on-call engineers", hashtags: ["#IAM", "#CloudSecurity", "#DevSecOps", "#CloudComputing"] },
      { topic: "Choosing between PostgreSQL, MongoDB, and Redis for a new service", hashtags: ["#Databases", "#PostgreSQL", "#Redis", "#BackendEngineering"] },
      { topic: "Kafka partitioning strategy for ordered, scalable event processing", hashtags: ["#Kafka", "#EventDriven", "#DistributedSystems", "#DataEngineering"] },
      { topic: "API versioning strategies that don't break your consumers", hashtags: ["#Microservices", "#APIManagement", "#BackendEngineering", "#SoftwareArchitecture"] },
      { topic: "Istio traffic management for canary releases and fault injection", hashtags: ["#ServiceMesh", "#Istio", "#Kubernetes", "#CloudNative"] },
      { topic: "Rotating secrets automatically with Vault and dynamic credentials", hashtags: ["#SecretsManagement", "#Vault", "#CloudSecurity", "#DevSecOps"] },
      { topic: "Enforcing infrastructure guardrails with OPA and Conftest before merge", hashtags: ["#PolicyAsCode", "#OPA", "#IaC", "#DevSecOps"] },
      { topic: "A practical FinOps framework for cutting cloud waste without breaking reliability", hashtags: ["#FinOps", "#CloudCost", "#CloudComputing", "#DevOps"] },
      { topic: "Designing an RTO/RPO strategy that survives a real region outage", hashtags: ["#DisasterRecovery", "#HighAvailability", "#SRE", "#CloudArchitecture"] },
      { topic: "Writing a blameless RCA that actually prevents the next incident", hashtags: ["#IncidentManagement", "#SRE", "#RCA", "#DevOps"] },
      { topic: "Capacity planning for traffic spikes without over-provisioning", hashtags: ["#PerformanceEngineering", "#CapacityPlanning", "#SRE", "#CloudComputing"] },
      { topic: "Securing your container registry and artifact supply chain", hashtags: ["#ArtifactManagement", "#DevOps", "#ContainerRegistry", "#SoftwareSupplyChain"] },
      { topic: "Signing and verifying container images with Cosign and SLSA provenance", hashtags: ["#SupplyChainSecurity", "#SBOM", "#DevSecOps", "#SLSA"] },
      { topic: "Why Go is a practical second language for DevOps and platform engineers", hashtags: ["#GoLang", "#DevOps", "#PlatformEngineering", "#SoftwareEngineering"] },
      { topic: "Bash scripting habits that prevent silent production failures", hashtags: ["#Bash", "#ShellScripting", "#DevOps", "#Linux"] },
      { topic: "CAP theorem in practice: the tradeoffs behind every distributed system", hashtags: ["#DistributedSystems", "#SystemDesign", "#SoftwareEngineering", "#BackendEngineering"] },

      // Expansion set 2: a second practical angle for every taxonomy area.
      { topic: "Kubernetes scheduler decisions: requests, affinity, taints, and topology spread", hashtags: ["#Kubernetes", "#DevOps", "#PlatformEngineering", "#CloudNative"] },
      { topic: "Designing reusable Terraform and OpenTofu modules without creating a monolith", hashtags: ["#Terraform", "#OpenTofu", "#IaC", "#DevOps"] },
      { topic: "Linux memory troubleshooting: page cache, swap, OOM killer, and memory pressure", hashtags: ["#Linux", "#SRE", "#DevOps", "#SystemsEngineering"] },
      { topic: "Debugging DNS, routing, firewalls, and MTU across hybrid cloud networks", hashtags: ["#Networking", "#CloudComputing", "#DevOps", "#SRE"] },
      { topic: "Container image layers, copy-on-write filesystems, and build cache behavior", hashtags: ["#Docker", "#Containers", "#DevOps", "#CloudNative"] },
      { topic: "Progressive delivery with canary analysis, quality gates, and automated rollback", hashtags: ["#CICD", "#DevOps", "#Automation", "#SoftwareEngineering"] },
      { topic: "Rebase, merge, squash, and cherry-pick: choosing the safest Git workflow", hashtags: ["#Git", "#DevOps", "#SoftwareEngineering", "#Collaboration"] },
      { topic: "Mapping compute, storage, networking, and managed services across GCP, AWS, and Azure", hashtags: ["#CloudComputing", "#GCP", "#AWS", "#Azure"] },
      { topic: "Designing actionable alerts with SLOs, burn rates, and clear ownership", hashtags: ["#Observability", "#SRE", "#DevOps", "#Monitoring"] },
      { topic: "Designing a URL shortener: APIs, data model, caching, and scaling tradeoffs", hashtags: ["#SystemDesign", "#SoftwareEngineering", "#Scalability", "#BackendEngineering"] },
      { topic: "Production Python automation: retries, timeouts, logging, testing, and idempotency", hashtags: ["#Python", "#DevOps", "#Automation", "#MLOps"] },
      { topic: "Building reusable Ansible roles with inventories, handlers, templates, and Vault", hashtags: ["#Ansible", "#DevOps", "#ConfigurationManagement", "#Automation"] },
      { topic: "Threat modeling a CI/CD pipeline from commit to production", hashtags: ["#DevSecOps", "#Security", "#CICD", "#DevOps"] },
      { topic: "Golden paths and self-service templates for an internal developer platform", hashtags: ["#PlatformEngineering", "#DevOps", "#DeveloperExperience", "#CloudNative"] },
      { topic: "Designing a production model-serving platform with Kubernetes, GPUs, and autoscaling", hashtags: ["#MLOps", "#AIInfrastructure", "#MachineLearning", "#Kubernetes"] },
      { topic: "SLIs, SLOs, error budgets, and release decisions explained with one service", hashtags: ["#SRE", "#Reliability", "#DevOps", "#Observability"] },
      { topic: "Argo CD application sets and multi-cluster GitOps promotion patterns", hashtags: ["#GitOps", "#ArgoCD", "#Kubernetes", "#DevOps"] },
      { topic: "Structuring Helm charts and Kustomize overlays across dev, staging, and production", hashtags: ["#Helm", "#Kustomize", "#Kubernetes", "#DevOps"] },
      { topic: "Hub-and-spoke cloud networking for enterprise landing zones", hashtags: ["#CloudArchitecture", "#LandingZone", "#CloudSecurity", "#Networking"] },
      { topic: "Workload identity and short-lived credentials across cloud and Kubernetes", hashtags: ["#IAM", "#CloudSecurity", "#DevSecOps", "#Kubernetes"] },
      { topic: "Database indexing and query-plan basics for PostgreSQL, MySQL, and MongoDB", hashtags: ["#Databases", "#PostgreSQL", "#MySQL", "#MongoDB"] },
      { topic: "Kafka consumer groups, partitions, offsets, and delivery guarantees", hashtags: ["#Kafka", "#EventDriven", "#DistributedSystems", "#DataEngineering"] },
      { topic: "API gateway patterns for authentication, rate limiting, routing, and observability", hashtags: ["#Microservices", "#APIManagement", "#BackendEngineering", "#SoftwareArchitecture"] },
      { topic: "When a service mesh helps and when it adds unnecessary operational complexity", hashtags: ["#ServiceMesh", "#Istio", "#Envoy", "#Kubernetes"] },
      { topic: "Secret rotation without downtime using Vault, cloud secret stores, and dual credentials", hashtags: ["#SecretsManagement", "#Vault", "#CloudSecurity", "#DevSecOps"] },
      { topic: "Testing Terraform with validation, Checkov, Conftest, and ephemeral environments", hashtags: ["#PolicyAsCode", "#Terraform", "#Checkov", "#DevSecOps"] },
      { topic: "Building cloud cost allocation with labels, budgets, unit economics, and ownership", hashtags: ["#FinOps", "#CloudCost", "#CloudComputing", "#DevOps"] },
      { topic: "Backup is not recovery: designing and testing restore procedures", hashtags: ["#DisasterRecovery", "#HighAvailability", "#Backup", "#SRE"] },
      { topic: "Running a Sev-1 incident: roles, timeline, communication, and mitigation", hashtags: ["#IncidentManagement", "#SRE", "#RCA", "#DevOps"] },
      { topic: "Finding latency bottlenecks with load tests, profiling, tracing, and saturation metrics", hashtags: ["#PerformanceEngineering", "#CapacityPlanning", "#SRE", "#Observability"] },
      { topic: "Repository strategy and retention policies for JFrog, Nexus, and container registries", hashtags: ["#ArtifactManagement", "#JFrog", "#Nexus", "#ContainerRegistry"] },
      { topic: "Creating and enforcing SBOM policies across the software delivery lifecycle", hashtags: ["#SupplyChainSecurity", "#SBOM", "#DevSecOps", "#SLSA"] },
      { topic: "Go interfaces, error handling, and concurrency patterns for platform tools", hashtags: ["#GoLang", "#DevOps", "#PlatformEngineering", "#SoftwareEngineering"] },
      { topic: "Writing safe Bash scripts with strict mode, traps, validation, and cleanup", hashtags: ["#Bash", "#ShellScripting", "#DevOps", "#Linux"] },
      { topic: "Consistency models, quorum reads, and replication tradeoffs in distributed databases", hashtags: ["#DistributedSystems", "#SystemDesign", "#Databases", "#BackendEngineering"] },

      // Expansion set 3: a troubleshooting or architecture angle for every area.
      { topic: "Kubernetes production troubleshooting from ingress to service to pod to dependency", hashtags: ["#Kubernetes", "#DevOps", "#SRE", "#CloudNative"] },
      { topic: "Recovering Terraform state safely after drift, corruption, or backend loss", hashtags: ["#Terraform", "#OpenTofu", "#IaC", "#DevOps"] },
      { topic: "Linux CPU and I/O troubleshooting with top, vmstat, iostat, pidstat, and perf", hashtags: ["#Linux", "#SRE", "#DevOps", "#SystemsEngineering"] },
      { topic: "How a request travels through DNS, load balancers, proxies, services, and firewalls", hashtags: ["#Networking", "#CloudComputing", "#DevOps", "#SRE"] },
      { topic: "Container runtime security with namespaces, capabilities, seccomp, and rootless mode", hashtags: ["#Docker", "#Containers", "#DevSecOps", "#CloudNative"] },
      { topic: "Designing CI/CD for microservices with artifact promotion and environment approvals", hashtags: ["#CICD", "#DevOps", "#Automation", "#Microservices"] },
      { topic: "Recovering from Git mistakes with reflog, revert, reset, and branch protection", hashtags: ["#Git", "#DevOps", "#SoftwareEngineering", "#Collaboration"] },
      { topic: "Designing a multi-cloud platform without hiding provider-specific strengths", hashtags: ["#CloudComputing", "#GCP", "#AWS", "#Azure"] },
      { topic: "Correlating logs, metrics, traces, profiles, and deployment events during incidents", hashtags: ["#Observability", "#OpenTelemetry", "#SRE", "#Monitoring"] },
      { topic: "Designing an event-driven notification platform for reliability and scale", hashtags: ["#SystemDesign", "#EventDriven", "#Scalability", "#BackendEngineering"] },
      { topic: "Building a Python CLI for cloud inventory, validation, and reporting", hashtags: ["#Python", "#DevOps", "#Automation", "#CloudComputing"] },
      { topic: "Troubleshooting Ansible idempotency, variable precedence, and unreachable hosts", hashtags: ["#Ansible", "#DevOps", "#ConfigurationManagement", "#Automation"] },
      { topic: "Designing vulnerability management from source dependencies to runtime workloads", hashtags: ["#DevSecOps", "#Security", "#VulnerabilityManagement", "#DevOps"] },
      { topic: "Measuring platform engineering success with adoption, lead time, reliability, and DevEx", hashtags: ["#PlatformEngineering", "#DevOps", "#DeveloperExperience", "#Metrics"] },
      { topic: "Operating GPU workloads: scheduling, sharing, observability, and cost controls", hashtags: ["#MLOps", "#AIInfrastructure", "#GPU", "#Kubernetes"] },
      { topic: "Reducing operational toil with automation, runbooks, and reliability reviews", hashtags: ["#SRE", "#Reliability", "#DevOps", "#Automation"] },
      { topic: "Safe GitOps rollbacks, drift reconciliation, and break-glass changes", hashtags: ["#GitOps", "#ArgoCD", "#Flux", "#Kubernetes"] },
      { topic: "Debugging Helm rendering, values precedence, hooks, and failed releases", hashtags: ["#Helm", "#Kustomize", "#Kubernetes", "#DevOps"] },
      { topic: "Landing-zone guardrails for identity, networking, logging, encryption, and policy", hashtags: ["#CloudArchitecture", "#LandingZone", "#CloudSecurity", "#Governance"] },
      { topic: "Debugging cloud permission denied errors across IAM, org policy, and workload identity", hashtags: ["#IAM", "#CloudSecurity", "#DevSecOps", "#CloudComputing"] },
      { topic: "Choosing replication, sharding, caching, and connection pooling for production databases", hashtags: ["#Databases", "#PostgreSQL", "#Redis", "#Scalability"] },
      { topic: "Handling poison messages, retries, dead-letter queues, and backpressure", hashtags: ["#Kafka", "#RabbitMQ", "#PubSub", "#EventDriven"] },
      { topic: "Resilient microservice communication with timeouts, retries, circuit breakers, and idempotency", hashtags: ["#Microservices", "#APIManagement", "#Reliability", "#SoftwareArchitecture"] },
      { topic: "Debugging Istio traffic routing, mTLS, sidecars, and Envoy configuration", hashtags: ["#ServiceMesh", "#Istio", "#Envoy", "#Kubernetes"] },
      { topic: "Designing secrets access with least privilege, audit logs, envelope encryption, and KMS", hashtags: ["#SecretsManagement", "#KMS", "#CloudSecurity", "#DevSecOps"] },
      { topic: "Writing OPA policies that block risk without slowing engineering teams", hashtags: ["#PolicyAsCode", "#OPA", "#Conftest", "#DevSecOps"] },
      { topic: "Optimizing Kubernetes and cloud spend without sacrificing reliability", hashtags: ["#FinOps", "#CloudCost", "#Kubernetes", "#SRE"] },
      { topic: "Multi-region failover patterns and the real tradeoffs behind RTO and RPO", hashtags: ["#DisasterRecovery", "#HighAvailability", "#SRE", "#CloudArchitecture"] },
      { topic: "Turning an RCA into owned actions that prevent repeat incidents", hashtags: ["#IncidentManagement", "#RCA", "#SRE", "#Reliability"] },
      { topic: "Capacity planning with traffic forecasts, concurrency limits, queues, and autoscaling", hashtags: ["#PerformanceEngineering", "#CapacityPlanning", "#SRE", "#Scalability"] },
      { topic: "Securing artifact promotion from development repositories to production repositories", hashtags: ["#ArtifactManagement", "#JFrog", "#Nexus", "#DevSecOps"] },
      { topic: "Achieving SLSA provenance with signed builds, trusted runners, and Cosign verification", hashtags: ["#SupplyChainSecurity", "#Cosign", "#SLSA", "#DevSecOps"] },
      { topic: "Building a concurrent Go health checker with goroutines, channels, and context", hashtags: ["#GoLang", "#DevOps", "#PlatformEngineering", "#Programming"] },
      { topic: "Debugging shell scripts with shellcheck, tracing, exit codes, and portable commands", hashtags: ["#Bash", "#ShellScripting", "#DevOps", "#Linux"] },
      { topic: "Leader election, consensus, split brain, and failure detection explained practically", hashtags: ["#DistributedSystems", "#SystemDesign", "#Reliability", "#BackendEngineering"] },
    ],
  },
];

function todayInTimezone(timezone = "Asia/Kolkata") {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function addDays(dateString, offset) {
  const date = new Date(`${dateString}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

function renderPost(stream, topic, streamDay, hashtags, streamTotal) {
  const dayLabel = stream.key === "fundamentals"
    ? `Week ${streamDay} of my ${stream.pillar}.`
    : `Day ${streamDay}/${streamTotal} of my ${stream.pillar}.`;

  const streamContext = {
    mlops: {
      system: "the model, data, feature, deployment, and monitoring lifecycle",
      signals: "model quality, drift, latency, throughput, errors, and cost",
      control: "versioning, approval gates, canary rollout, lineage, and rollback",
    },
    k8s: {
      system: "workload configuration, scheduling, networking, storage, and cluster capacity",
      signals: "events, pod status, logs, metrics, endpoints, DNS, and node pressure",
      control: "requests and limits, probes, policies, progressive delivery, and rollback",
    },
    python: {
      system: "inputs, business logic, external dependencies, outputs, and execution environment",
      signals: "exit codes, structured logs, latency, retries, failed records, and run status",
      control: "validation, timeouts, idempotency, tests, dry runs, and safe error handling",
    },
    fundamentals: {
      system: "requirements, dependencies, failure modes, ownership, and operational boundaries",
      signals: "availability, latency, errors, saturation, security events, and change history",
      control: "least privilege, automation, validation, observability, rollback, and recovery",
    },
  }[stream.key];

  const formats = [
    {
      label: "Practical breakdown",
      hook: `Most teams learn ${topic} as a definition. Production exposes the missing tradeoffs.`,
      points: [
        `Map the topic across ${streamContext.system}.`,
        `Define the expected behavior before choosing a tool or configuration.`,
        `Measure ${streamContext.signals} so assumptions can be verified.`,
        `Document the tradeoff, owner, and recovery path before production use.`,
      ],
      prompt: `What is the most important production tradeoff you would explain first for ${topic}?`,
    },
    {
      label: "Troubleshooting lens",
      hook: `When ${topic} fails, random changes make recovery slower. Start with evidence.`,
      points: [
        `Confirm impact and identify what changed most recently.`,
        `Trace the path through ${streamContext.system}.`,
        `Use ${streamContext.signals} to isolate the first failing boundary.`,
        `Mitigate safely, validate recovery, and capture the missing alert or runbook step.`,
      ],
      prompt: `If ${topic} failed in production, which signal would you check first—and why?`,
    },
    {
      label: "Architecture review",
      hook: `${topic}: the real design question is which failure the system can tolerate.`,
      points: [
        `Start with scale, availability, security, recovery, and ownership requirements.`,
        `Separate components by responsibility and blast radius.`,
        `Build in ${streamContext.control}.`,
        `Test degraded behavior instead of validating only the happy path.`,
      ],
      prompt: `Which architecture decision around ${topic} creates the largest operational risk?`,
    },
    {
      label: "Interview lens",
      hook: `A definition-only answer about ${topic} will not demonstrate senior-level judgment.`,
      points: [
        `Explain the concept in one clear sentence.`,
        `Give a real use case and the reason it fits.`,
        `Discuss one alternative, one tradeoff, and one failure mode.`,
        `Finish with how you would validate, monitor, and recover it in production.`,
      ],
      prompt: `How would you explain ${topic} in two minutes without sounding theoretical?`,
    },
    {
      label: "Hands-on lab",
      hook: `Want to understand ${topic}? Build it small, break it deliberately, and observe the failure.`,
      points: [
        `Create the smallest reproducible environment with one clear success condition.`,
        `Add ${streamContext.control}.`,
        `Inject one realistic failure and observe ${streamContext.signals}.`,
        `Write a short runbook covering diagnosis, mitigation, validation, and cleanup.`,
      ],
      prompt: `What small hands-on lab would you build to practice ${topic}?`,
    },
  ];

  const format = formats[(streamDay - 1) % formats.length];
  const body = format.points.map((item, index) => `${index + 1}. ${item}`).join("\n");

  return `${format.hook}

Topic: ${topic}

${format.label}:
${body}

Production takeaway:
Good engineering makes the expected behavior observable, the risky change reversible, and the recovery path testable.

${format.prompt}

${dayLabel}

${hashtags.join(" ")}`;
}

function validateReachReadyPost(item) {
  const text = String(item.text || "").trim();
  const lines = text.split("\n");
  const hashtags = text.match(/#[A-Za-z0-9_]+/g) || [];
  const errors = [];

  if (text.length < 600) errors.push(`too short (${text.length} characters)`);
  if (text.length > 3000) errors.push(`exceeds LinkedIn's 3,000-character limit (${text.length})`);
  if (!lines[0] || lines[0].length > 220) errors.push("first-line hook is missing or too long");
  if (hashtags.length < 3 || hashtags.length > 5) errors.push(`expected 3-5 hashtags, found ${hashtags.length}`);
  if (!text.split("\n\n").some((block) => block.trim().endsWith("?"))) errors.push("missing conversation prompt");
  if (/https?:\/\//i.test(text)) errors.push("contains an external URL in the post body");
  if (!text.includes("Production takeaway:")) errors.push("missing practical takeaway");

  if (errors.length) {
    throw new Error(`Reach-readiness validation failed for ${item.id}: ${errors.join("; ")}`);
  }
}

function writeDraft(item) {
  const slug = `${item.id}-${slugify(item.topic)}`;
  const filePath = path.join(postsDir, `${slug}.md`);
  const content = [
    "---",
    `date: ${item.date}`,
    `slot: ${item.slot}`,
    `day: ${item.day}`,
    `series: ${item.pillar}`,
    `topic: ${item.topic}`,
    `linkedinProfile: ${linkedinProfile}`,
    "status: scheduled",
    "---",
    "",
    item.text,
  ].join("\n");
  fs.writeFileSync(filePath, content, "utf8");
  return filePath;
}

fs.mkdirSync(postsDir, { recursive: true });

const streamsByKey = Object.fromEntries(streams.map((stream) => [stream.key, stream]));

// One stream posts per calendar day, picked by weekday - this must match
// slotForWeeklyRotation() in src/publish-calendar-date.js so generation and
// publishing agree on which single item is due each day.
const weekdayStream = {
  0: "fundamentals", // Sunday
  1: "k8s", // Monday
  2: "mlops", // Tuesday
  3: "python", // Wednesday
  4: "k8s", // Thursday
  5: "mlops", // Friday
  6: "python", // Saturday
};

const daySequence = Array.from({ length: days }, (_, index) => {
  const date = addDays(startDate, index);
  const weekday = new Date(`${date}T00:00:00Z`).getUTCDay();
  return { date, key: weekdayStream[weekday] };
});

const streamTotals = {};
for (const { key } of daySequence) {
  streamTotals[key] = (streamTotals[key] || 0) + 1;
}

const streamRunningCount = {};
const items = [];
for (const { date, key } of daySequence) {
  const stream = streamsByKey[key];
  streamRunningCount[key] = (streamRunningCount[key] || 0) + 1;
  const streamDay = streamRunningCount[key];
  const entry = stream.topics[(streamDay - 1) % stream.topics.length];
  const topic = typeof entry === "string" ? entry : entry.topic;
  const hashtags = typeof entry === "string" ? stream.hashtags : entry.hashtags;
  const item = {
    id: `${date}-${stream.key}`,
    day: streamDay,
    date,
    slot: stream.slot,
    pillar: stream.pillar,
    audience: stream.audience,
    topic,
    baseTopic: topic,
    angle: "daily practical note",
    contentFormat: ["practical-breakdown", "troubleshooting", "architecture-review", "interview-lens", "hands-on-lab"][(streamDay - 1) % 5],
    hashtags,
    linkedinProfile,
    status: "scheduled",
    text: renderPost(stream, topic, streamDay, hashtags, streamTotals[key]),
  };
  validateReachReadyPost(item);
  item.draftPath = path.relative(root, writeDraft(item));
  items.push(item);
}

fs.writeFileSync(
  calendarPath,
  JSON.stringify(
    {
      createdAt: new Date().toISOString(),
      schedule: "one-post-per-day",
      days,
      startDate,
      items,
    },
    null,
    2,
  ),
  "utf8",
);

if (!fs.existsSync(statePath)) {
  fs.writeFileSync(statePath, JSON.stringify({ published: [] }, null, 2), "utf8");
}

console.log(`Scheduled ${items.length} posts across ${days} days starting ${startDate}`);
