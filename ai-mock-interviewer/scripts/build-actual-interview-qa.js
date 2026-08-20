const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const importedPath = path.join(__dirname, "answer-bank", "imported-conversation-questions.json");
const answerBankDirectory = path.join(__dirname, "answer-bank");
const answerBankPath = path.join(__dirname, "answer-bank", "final-qa-dataset.json");
const generatedAnswersPath = path.join(__dirname, "answer-bank", "actual-interview-generated-answers.json");
const curatedAnswersPath = path.join(__dirname, "answer-bank", "93-curated-revision-answers.json");
const outputPath = path.join(root, "actual-interview-questions-and-answers.md");
const landingZoneRoundPath = path.join(root, "data", "actual-interview-landing-zone-gke-coding-round-2026-08-20.txt");
const kubernetesElkDynatraceRoundPath = path.join(root, "data", "actual-interview-kubernetes-elk-dynatrace-round-2026-08-20.txt");

function parseNumberedInterviewRound(filePath, source) {
  let category = "General";
  const entries = [];
  for (const rawLine of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    const match = line.match(/^\d+\.\s+(.+)$/);
    if (!match) {
      category = line;
      continue;
    }
    const question = match[1];
    const questionType = /difference| vs |choose/i.test(question)
      ? "Comparison"
      : /how (?:do|does|would|can)|given |solve |create |find |troubleshoot|recover|mitigate/i.test(question)
        ? "Implementation / Workflow"
        : "Conceptual";
    entries.push({ source, section: category, category, questionType, question });
  }
  return entries;
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/^[a-z0-9/ &+-]+:\s+/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeForDeduplication(value) {
  const normalized = normalize(value)
    .replace(/\bworked on\b/g, "worked with")
    .replace(/\brequest user\b/g, "user request")
    .replace(/\s+/g, " ")
    .trim();
  const isShort = normalized.split(" ").length <= 14;
  const isDefinitionOrComparison = /^(what (is|are)|explain|describe|define|difference between|what is the difference between)\b/.test(normalized);
  if (!isShort || !isDefinitionOrComparison) {
    return normalized
      .replace(/^(can you|could you|please)\s+/, "")
      .replace(/\b(a|an|the)\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  return normalized
    .replace(/^(what (is|are)|explain|describe|define|what is the difference between|difference between)\s+/, "")
    .split(" ")
    .filter((token) => !["a", "an", "the", "in", "on"].includes(token))
    .sort()
    .join(" ");
}

const supplementalAnswers = new Map([
  [normalize("How do you identify whether a request/user is legitimate?"),
    "I validate legitimacy through layered controls rather than trusting one signal. First, authenticate the caller using a strong identity mechanism such as OIDC, OAuth 2.0, a signed service token, or mTLS. Then authorize the authenticated identity against the requested resource using least-privilege RBAC or ABAC. At the edge, validate token issuer, audience, signature, expiry, nonce, and scopes; enforce TLS, schema and input validation, rate limits, and replay protection. I also evaluate context such as source network, device posture, unusual request rate, and behavior, while avoiding IP address as proof of identity. Every decision is logged with a correlation ID, and suspicious patterns trigger step-up authentication, blocking, or investigation."],
  [normalize("Which GCP networking components have you worked on?"),
    "A strong experience-based answer should name only services you have genuinely used and connect each one to a real outcome. For example: I have worked with VPCs, custom subnets, firewall policies, routes, Cloud NAT, Cloud DNS, Private Google Access, Shared VPC, VPC Peering, Cloud VPN, Cloud Interconnect, internal and external load balancers, Private Service Connect, and GKE networking. I used them to build private application environments, centralize network administration, expose services safely, connect hybrid networks, and troubleshoot DNS, routing, firewall, NAT, and load-balancing issues. I would then explain one production design or incident in depth, including the traffic path, controls, observability, and trade-offs."],
  [normalize("What is Ingress?"),
    "Kubernetes Ingress is an API object that declares HTTP and HTTPS routing from outside a cluster to Services inside it, usually by host name and URL path. An Ingress resource is only configuration; an Ingress controller such as NGINX Ingress or a cloud load-balancer controller watches it and implements the routes. It commonly provides virtual hosting, path-based routing, TLS termination, and integration with certificates or external load balancers. For non-HTTP protocols or newer, more expressive routing needs, I would consider a Service of type LoadBalancer or the Kubernetes Gateway API."],
  [normalize("How do you configure a GCP service account in Jenkins?"),
    "Prefer keyless federation: create a least-privilege GCP service account, configure Workload Identity Federation to trust Jenkins' external identity, and let the pipeline obtain short-lived credentials before running gcloud or Terraform. Restrict which repository, job, branch, or Jenkins identity may impersonate the service account, and grant only the required IAM roles. If federation is not available, store the service-account JSON key in Jenkins Credentials as a secret file, bind it only inside the required stage, run gcloud auth activate-service-account with that temporary file, mask logs, and rotate the key regularly. Never place the key in source control, the Jenkinsfile, a container image, or a long-lived workspace."],
]);

function answerGuidance(entry) {
  const question = String(entry.question || "").trim();
  const category = String(entry.category || entry.section || "Technical").trim();
  const lower = `${category} ${question}`.toLowerCase();
  const isTroubleshooting = /\b(troubleshoot|debug|investigate|fail|failing|error|pending|crash|down|slow|latency|timeout|exhaust|recover|restore|deleted|corrupt)\b/.test(lower);
  const isDifference = /\b(difference|compare|versus| vs |choose|prefer)\b/.test(lower);
  const isBehavioral = /\b(tell me about|handle disagreement|stakeholder|leadership|team member|management|communication|mentor|ownership|salary|notice period|relocate)\b/.test(lower);
  const subject = question
    .replace(/^(what is|what are|explain|describe|define|how do you|how would you|why|when|where|which)\s+/i, "")
    .replace(/\?$/, "")
    .trim();
  const prefix = isDifference
    ? `${subject || "These options"} should be compared by purpose, scope, operational impact, rollback behavior, and production risk.`
    : isTroubleshooting
      ? `For this scenario, first confirm user impact, recent changes, and the failing layer; then isolate the issue with evidence before changing production.`
      : isBehavioral
        ? `Use a truthful STAR answer: describe the situation, your ownership, the action you took, and the measurable result without inventing facts.`
        : `${subject || question} is handled by understanding the production mechanism, the configuration involved, and the operational risk it controls.`;

  let example = "For validation, I would check logs, metrics, configuration, access permissions, and the post-change health signal before calling the issue closed.";
  if (/terraform|iac|state|module|provider|tfvars/.test(lower)) example = "Example commands: `terraform fmt`, `terraform validate`, `terraform plan`, then apply only after reviewing drift, state, provider versions, variables, and backend locking.";
  else if (/kubernetes|gke|eks|pod|deployment|service|ingress|helm|istio/.test(lower)) example = "Example checks: `kubectl describe`, `kubectl get events`, `kubectl logs`, readiness probes, Service selectors, Ingress or Gateway routing, NetworkPolicy, DNS, and node capacity.";
  else if (/jenkins|github actions|gitlab|bitbucket|pipeline|ci\/cd|argo|gitops/.test(lower)) example = "In CI/CD I would verify the trigger, checked-out commit, credentials, runner or agent, artifact version, environment approval, deployment logs, health checks, and rollback path.";
  else if (/gcp|cloud armor|load balanc|iam|vpc|firewall|nat|dns|private service connect|psc/.test(lower)) example = "In GCP I would validate IAM, project and region scope, VPC routing, firewall rules, health checks, Cloud Logging, audit logs, quotas, and the exact resource policy.";
  else if (/prometheus|grafana|monitor|logging|tracing|observability|slo|sli|alert/.test(lower)) example = "For observability, I would define the user-impact metric, use labels carefully, check percentiles and error rates, connect alerts to runbooks, and avoid noisy or high-cardinality signals.";
  else if (/mlops|vertex|mlflow|kubeflow|model|llm|rag|vector/.test(lower)) example = "For MLOps, I would version code, data, parameters, artifacts, and model registry entries, then monitor latency, errors, drift, quality, cost, and rollback readiness.";
  else if (/git|branch|merge|rebase|reset|revert|cherry-pick/.test(lower)) example = "For Git, I would state whether the command rewrites history, affects shared branches, or creates a new commit, then verify with `git status`, `git log --oneline`, and `git reflog` if recovery is needed.";
  else if (/python|bash|shell|script|api/.test(lower)) example = "For scripting or APIs, I would use input validation, clear exit codes, retries with backoff, timeouts, structured logs, idempotency, and tests for failure cases.";

  if (/apply a stash/i.test(question)) return "Use `git stash apply` to reapply the latest stash while keeping the stash entry, or `git stash apply stash@{n}` for a specific one. First run `git stash list`, confirm the target, then apply it from a clean working tree if possible. Resolve conflicts like a normal merge, run tests, and use `git status` to verify the result. Use `git stash pop` only when you want Git to remove the stash after a successful apply.";
  if (/terraform drift/i.test(question)) return "Terraform drift means the real infrastructure no longer matches the Terraform state and code, usually because someone changed a resource manually, an external controller modified it, or a provider default changed. I detect it with `terraform plan` in a read-only review pipeline and by checking cloud audit logs for manual updates. To fix it, either update the code to match the intended change or revert the cloud resource back to code. The risk is blindly applying and accidentally deleting or replacing production resources.";

  return `${prefix} In ${category}, the practical answer is to state what changes, who or what is affected, and how it is verified. ${example} In an interview, I would also mention the key failure mode, the security or reliability trade-off, and the rollback or recovery step so the answer sounds production-ready instead of theoretical.`;

  const categoryGuidance = {
    Linux: "Define the Linux concept, name the commands you would use, interpret their output, and finish with the production-safe remediation and verification steps.",
    Docker: "Explain the container concept from image build through runtime, include the relevant Docker commands or Dockerfile fields, and cover security, debugging, and production trade-offs.",
    Kubernetes: "Define the Kubernetes resource or control-plane behavior, explain how it interacts with related objects, and include the kubectl checks, failure modes, and production considerations.",
    GKE: "Explain the GKE-specific behavior, how it integrates with Google Cloud networking and IAM, and include configuration, observability, security, scaling, and operational trade-offs.",
    GCP: "Define the Google Cloud service, place it in a production architecture, and cover IAM, networking, availability, observability, cost, and the main design trade-offs.",
    Terraform: "Explain the Terraform behavior in the init-plan-apply lifecycle, show the relevant HCL or command, and cover remote state, locking, security, validation, and safe rollback or recovery.",
  };
  let guidance = categoryGuidance[entry.category];
  if (!guidance && /Jenkins/i.test(entry.category)) guidance = "Explain the Jenkins feature in a declarative pipeline, including controller/agent behavior, credentials, security, scaling, troubleshooting, and a practical Jenkinsfile example.";
  if (!guidance && /GitHub Actions/i.test(entry.category)) guidance = "Explain the GitHub Actions feature using workflow YAML, including events, jobs, permissions, OIDC, environments, artifacts, concurrency, and troubleshooting.";
  if (!guidance && /GitLab/i.test(entry.category)) guidance = "Explain the GitLab CI feature using .gitlab-ci.yml, including runners, rules, needs, variables, artifacts, environments, security, and troubleshooting.";
  if (!guidance && /Bitbucket/i.test(entry.category)) guidance = "Explain the Bitbucket Pipelines feature using bitbucket-pipelines.yml, including steps, variables, artifacts, caches, deployments, authentication, and troubleshooting.";
  if (!guidance && /Argo|GitOps/i.test(entry.category)) guidance = "Explain the GitOps or Argo CD behavior from desired state through reconciliation, including sync, health, drift, RBAC, secrets, promotion, rollback, and multi-cluster operations.";
  if (!guidance && /Helm/i.test(entry.category)) guidance = "Explain the Helm feature with the relevant chart structure or command, including values, templating, validation, release lifecycle, failure handling, and rollback.";
  if (!guidance && /Ansible/i.test(entry.category)) guidance = "Explain the Ansible feature with a playbook or command example, including inventory, variables, idempotency, privilege, secrets, validation, and failure recovery.";
  if (!guidance && /Pipeline Security/i.test(entry.category)) guidance = "Answer using least privilege, short-lived identity, protected environments, isolated runners, secret masking, signed artifacts, SBOM and provenance, audit logs, and enforced policy gates.";
  if (!guidance && /Testing|Quality/i.test(entry.category)) guidance = "Define the test or quality control, place it at the correct pipeline stage, explain pass/fail thresholds, report retention, optimization, and whether it should block promotion.";
  if (!guidance && /Deployment|Rollback/i.test(entry.category)) guidance = "Explain the deployment strategy, traffic movement, health signals, database compatibility, automated abort conditions, rollback steps, and post-deployment verification.";
  if (!guidance && /CI\/CD|Scenario/i.test(entry.category)) guidance = "Describe the pipeline or incident flow end to end, including trigger, immutable artifact, tests, security gates, environment promotion, observability, concurrency, rollback, and audit evidence.";
  if (!guidance && /IAM|Identity|SSO/i.test(entry.category)) guidance = "Explain the identity and access flow using groups, least-privilege roles, policy inheritance, short-lived credentials, conditions, audit logs, and a safe troubleshooting or temporary-access procedure.";
  if (!guidance && /Organization Policies|Governance/i.test(entry.category)) guidance = "Explain the organization-policy constraint, where it is applied and inherited, how folders or tags scope it, and how to test, roll out, monitor, exempt, and manage it through Terraform safely.";
  if (!guidance && /Security Command Center/i.test(entry.category)) guidance = "Explain the Security Command Center capability, finding source and scope, then cover prioritization, export, ownership, investigation, automated remediation, accepted risk, and SLA tracking.";
  if (!guidance && /VPC|Routes|Firewall|NAT|Router|VPN|Hybrid|DNS/i.test(entry.category)) guidance = "Explain the GCP packet or name-resolution path end to end, including scope, routes, firewall policy, DNS, private access, NAT or hybrid components, observability, failure isolation, security, and high availability.";
  if (!guidance && /Load Balanc|Routing/i.test(entry.category)) guidance = "Explain the GCP load-balancing request path from DNS and frontend through proxy, URL map, backend service or NEG, health checks and application, including TLS, routing, draining, failure modes, and observability.";
  if (!guidance && /Cloud Armor|WAF|Rate Limiting|Bot/i.test(entry.category)) guidance = "Explain the Cloud Armor policy evaluation, match expression, priority and action, then cover preview rollout, logging, false-positive handling, rate-limit keys, bot controls, monitoring, and Terraform implementation.";
  if (!guidance && /Secrets|Data Protection/i.test(entry.category)) guidance = "Explain identity-based secret access or encryption flow, versioning and rotation, least privilege, workload integration, auditability, data-exfiltration controls, failure behavior, and recovery.";
  if (!guidance && /SRE Fundamentals|SLI|SLO|SLA|Reliability Metrics/i.test(entry.category)) guidance = "Define the reliability concept in user-impact terms, include the formula or target where applicable, explain error-budget or business implications, and show how the measure drives an operational decision.";
  if (!guidance && /Monitoring Fundamentals|Golden Signals|Metrics$/i.test(entry.category)) guidance = "Define the telemetry or monitoring concept, explain when and why it is used, provide a representative metric or query, and cover labels, cardinality, aggregation, retention, and actionable interpretation.";
  if (!guidance && /Prometheus/i.test(entry.category)) guidance = "Explain the Prometheus component or PromQL operation, include scrape, label and query behavior, and cover alerting, cardinality, retention, scaling, availability, and Kubernetes discovery.";
  if (!guidance && /Grafana/i.test(entry.category)) guidance = "Explain the Grafana feature from data source and query through panel, variable, alert or dashboard, including provisioning as code, access control, performance, and operational usefulness.";
  if (!guidance && /Cloud Monitoring|Cloud Logging/i.test(entry.category)) guidance = "Explain the Google Cloud Operations feature, monitored resource and telemetry flow, then cover metrics or log queries, alerts, multi-project scope, export, retention, IAM, and cost.";
  if (!guidance && /Logging|ELK/i.test(entry.category)) guidance = "Explain the centralized logging flow from structured application output through collection, parsing, indexing, search and retention, including correlation IDs, sensitive-data controls, scaling, and cost.";
  if (!guidance && /Tracing|OpenTelemetry/i.test(entry.category)) guidance = "Explain trace and context propagation across the request path, including spans, instrumentation, collector or backend, sampling, correlation with metrics and logs, broken-trace diagnosis, and cost.";
  if (!guidance && /Dynatrace|APM/i.test(entry.category)) guidance = "Explain the APM or Dynatrace component, its instrumentation and topology discovery, how it detects anomalies and identifies root cause, and how you would deploy, scope, alert, integrate, and troubleshoot it.";
  if (!guidance && /^Alerting$/i.test(entry.category)) guidance = "Define an actionable symptom-based alert with severity, threshold or burn rate, evaluation window, ownership, routing, runbook, deduplication, maintenance handling, and validation.";
  if (!guidance && /Incident Management|RCA|Postmortem/i.test(entry.category)) guidance = "Describe the incident or RCA process from detection and command through containment, communication, recovery and blameless review, including timeline evidence, contributing factors, owned corrective actions, and verification.";
  if (!guidance && /On-Call|Runbooks/i.test(entry.category)) guidance = "Explain the operational process, escalation and ownership model, the exact diagnostic or remediation steps, safety checks, automation boundaries, handover, testing, and continuous improvement.";
  if (!guidance && /Capacity|Performance/i.test(entry.category)) guidance = "Define the performance or capacity measure, establish a baseline and workload model, analyze saturation and bottlenecks, test safely, preserve headroom, and validate the improvement with percentiles and throughput.";
  if (!guidance && /High Availability|Resilience|Disaster Recovery|Backup/i.test(entry.category)) guidance = "Explain the resilience or recovery mechanism, failure model, redundancy and state handling, RTO/RPO where relevant, failover and failback, backup integrity, testing, observability, and cost trade-offs.";
  if (!guidance && /Kubernetes Production Troubleshooting/i.test(entry.category)) guidance = "Start with kubectl describe, events, logs and current versus desired state, then isolate scheduling, probes, resources, storage, networking, DNS or node health, remediate safely, and verify service recovery.";
  if (!guidance && /GCP Production Troubleshooting/i.test(entry.category)) guidance = "Use GCP metrics, logs, audit history and connectivity or IAM diagnostics to isolate the failing layer, verify quotas and recent changes, mitigate user impact, remediate safely, and add prevention.";
  if (!guidance && /Deployment and Release Incidents/i.test(entry.category)) guidance = "Describe immediate impact assessment, release correlation, health and business signals, rollback versus roll-forward criteria, database compatibility, evidence preservation, verification, and recurrence prevention.";
  if (!guidance && /Behavioural SRE/i.test(entry.category)) guidance = "Answer with a truthful STAR example: quantify the production context and impact, clarify your ownership and decisions, explain communication and technical actions, and finish with measurable recovery and prevention outcomes.";
  if (!guidance && /Advanced Reliability Architecture/i.test(entry.category)) guidance = "Design the reliability capability at organizational scale, covering standards, ownership, tenancy, telemetry, SLOs, automation, failure isolation, governance, cost, rollout, and measurable outcomes.";
  if (!guidance && /MLOps Fundamentals|Model Training|Model Validation/i.test(entry.category)) guidance = "Explain the ML lifecycle concept from versioned data and code through reproducible training, validation criteria, lineage, registry and promotion, including automation, governance, failure handling, and measurable model quality.";
  if (!guidance && /Model Deployment|Model Release/i.test(entry.category)) guidance = "Explain the model-serving architecture and release flow, including packaging, artifact identity, compute choice, traffic strategy, health and quality signals, approval, compatibility, rollback, security, and zero downtime.";
  if (!guidance && /^Model Monitoring$/i.test(entry.category)) guidance = "Separate operational endpoint health from statistical model quality, define the drift or performance metric and baseline, handle delayed labels, set actionable thresholds, investigate slices, and connect alerts to retraining or rollback.";
  if (!guidance && /MLflow/i.test(entry.category)) guidance = "Explain the MLflow tracking, artifact or registry workflow, including backend and artifact stores, run metadata, versioning, aliases or stages, authentication, high availability, CI/CD promotion, rollback, and lineage.";
  if (!guidance && /Kubeflow/i.test(entry.category)) guidance = "Explain the Kubeflow component and Kubernetes execution flow, including component contracts, parameters and artifacts, caching, scheduling, identity, secrets, GPUs, multi-tenancy, observability, retries, and upgrades.";
  if (!guidance && /Vertex AI/i.test(entry.category)) guidance = "Explain the Vertex AI managed resource and workflow, including training or pipeline execution, model registry and endpoint deployment, traffic and autoscaling, service identity, VPC access, monitoring, Terraform automation, and troubleshooting.";
  if (!guidance && /LLM and AI Infrastructure/i.test(entry.category)) guidance = "Explain the LLM inference architecture from model weights and GPU scheduling through batching, KV cache, parallelism, autoscaling and API serving, including latency and throughput metrics, security, reliability, and cost.";
  if (!guidance && /LangFuse|LLM Observability|Vector Databases/i.test(entry.category)) guidance = "Explain the LLM trace, evaluation or vector-retrieval flow, including prompt and embedding versions, quality and latency metrics, user feedback, lineage, privacy, scaling, deletion, backup, and cost.";
  if (!guidance && /^Data Pipelines$/i.test(entry.category)) guidance = "Explain the data flow from ingestion through validation, transformation and delivery, including schema evolution, idempotency, lineage, retries, late or poison data, quality metrics, testing, packaging, deployment, and observability.";
  if (!guidance && /Cloud and Platform Architecture|System Design/i.test(entry.category)) guidance = "Clarify requirements and scale, then design components and end-to-end flows covering networking, identity, data, availability, scaling, observability, delivery, security, failure recovery, cost, and explicit trade-offs.";
  if (!guidance && /^Platform Engineering$/i.test(entry.category)) guidance = "Explain the internal platform capability as a secure self-service product, including golden paths, APIs and templates, governance, tenancy, upgrades, developer experience, adoption, reliability, feedback, and roadmap metrics.";
  if (!guidance && /FinOps|Cost Optimization/i.test(entry.category)) guidance = "Describe how to measure and allocate the cost, identify waste, apply rightsizing or pricing and lifecycle controls, automate guardrails, preserve reliability, forecast impact, and report verified savings to owners.";
  if (!guidance && /Security and DevSecOps/i.test(entry.category)) guidance = "Explain the threat and control across code, dependencies, build, artifact and runtime, including scanning, short-lived identity, signing and provenance, admission policy, least privilege, remediation SLAs, exceptions, and audit evidence.";
  if (!guidance && /Project-Based/i.test(entry.category)) guidance = "Answer from your real project: state the business problem, your exact ownership, architecture and decision rationale, implementation and security, the hardest issue and trade-off, and quantified reliability, speed or cost outcomes.";
  if (!guidance && /^Troubleshooting Scenarios$/i.test(entry.category)) guidance = "Start with impact, timing and recent changes; use model, application, infrastructure and data telemetry to isolate the layer; mitigate safely, correct the cause, verify quality and service recovery, and add prevention.";
  if (!guidance && /Behavioural and Communication|Leadership and Ownership/i.test(entry.category)) guidance = "Use a truthful STAR example with quantified context, your personal ownership and judgment, specific technical and communication actions, the measurable result, and what you improved afterward.";
  if (!guidance && /Company and Role Fit/i.test(entry.category)) guidance = "Connect an honest understanding of the role and company to specific evidence from your experience, acknowledge any gap directly, explain your learning plan, and keep the answer focused on mutual long-term fit.";
  if (!guidance && /HR and Recruiter/i.test(entry.category)) guidance = "Answer factually and concisely using your current verified details; keep dates and compensation internally consistent, state constraints early, avoid inventing commitments, and redirect briefly to role fit where useful.";
  if (!guidance && /Questions You Can Ask/i.test(entry.category)) guidance = "Ask this as a concise, open question, listen for concrete examples and measurable expectations, and use the response to assess ownership, engineering maturity, reliability culture, growth, and role fit.";
  if (!guidance && /AWS Fundamentals|AWS Networking|EC2|Storage and Load Balancing/i.test(entry.category)) guidance = "Explain the AWS resource, its regional or zonal scope and request or permission flow, then cover IAM, networking, availability, security, observability, scaling, cost, and the key service trade-offs.";
  if (!guidance && /EKS Fundamentals|EKS Add-ons|EKS Security/i.test(entry.category)) guidance = "Explain the EKS control-plane, node, add-on or workload flow, including IAM and Kubernetes RBAC, VPC CNI, storage or load balancing, security, scaling, observability, upgrades, and troubleshooting.";
  if (!guidance && /Git Fundamentals|Advanced Git|Git Branching/i.test(entry.category)) guidance = "Define the Git object or operation, show the safe command sequence, explain effects on local and remote history, collaboration and CI implications, recovery options, and when the technique should be avoided.";
  if (!guidance && /Bash|Shell Scripting|Linux Text Processing/i.test(entry.category)) guidance = "Explain the shell construct with a safe Bash example, including quoting, exit status, error handling, idempotency, input validation, logging, concurrency, cleanup, and secure secret handling.";
  if (!guidance && /Python Automation/i.test(entry.category)) guidance = "Explain the Python approach with a small maintainable structure, including libraries, typed inputs, exceptions, retries and timeouts, authentication, logging, testing and mocking, packaging, and safe automation behavior.";
  if (!guidance && /PowerShell/i.test(entry.category)) guidance = "Explain the PowerShell feature using object-oriented pipeline semantics and a concise example, including parameters, errors, remoting, credentials, reusable modules, logging, testing, and CI/CD integration.";
  if (!guidance && /Relational Database|PostgreSQL|Cloud SQL/i.test(entry.category)) guidance = "Define the database concept and transaction or query behavior, then cover schema and indexing, connection management, performance evidence, replication, backup and recovery, high availability, security, and cloud operations.";
  if (!guidance && /NoSQL|Caching/i.test(entry.category)) guidance = "Explain the data model or caching pattern, consistency and key design, replication or sharding, expiration and eviction, invalidation, failure handling, observability, backup, scaling, and when to use it.";
  if (!guidance && /Kafka|Pub\/Sub|Messaging/i.test(entry.category)) guidance = "Explain the asynchronous message flow from producer through broker, partition or subscription to consumer, including ordering, acknowledgement, delivery semantics, idempotency, retries, dead letters, scaling, lag, and observability.";
  if (!guidance && /API Engineering/i.test(entry.category)) guidance = "Define the HTTP or API concept, show request, response and status behavior, then cover authentication and authorization, validation, idempotency, versioning, rate limits, retries, observability, and backward compatibility.";
  if (!guidance && /Service Mesh|Istio/i.test(entry.category)) guidance = "Explain the Istio control-plane and Envoy data-plane behavior, including traffic policy, mTLS and authorization, retries and timeouts, canary routing, telemetry, failure diagnosis, operational cost, and when not to use a mesh.";
  if (!guidance && /Vault/i.test(entry.category)) guidance = "Explain the Vault authentication, policy and secret lifecycle, including dynamic credentials, leases, renewal and revocation, Kubernetes integration, sealing and auto-unseal, HA storage, auditability, and recovery.";
  if (!guidance && /OPA|Gatekeeper|Policy as Code/i.test(entry.category)) guidance = "Explain the admission or policy evaluation flow, provide the constraint or Rego intent, and cover audit versus enforcement, CI testing, exceptions, versioning, bypass prevention, observability, and safe rollout.";
  if (!guidance && /Advanced Production Scenarios/i.test(entry.category)) guidance = "Identify impact and recent change, gather the platform-specific evidence, isolate the failing identity, network, compute, data or policy layer, mitigate safely, correct the cause, verify recovery, and prevent recurrence.";
  if (!guidance && /Managerial and Situational/i.test(entry.category)) guidance = "Give a structured, truthful response that clarifies risk and stakeholders, uses evidence and explicit trade-offs, assigns ownership, communicates decisions, protects production, and produces a measurable follow-up action.";
  return `${guidance || "Define the concept, explain how it works in production, and include implementation, validation, failure modes, and trade-offs."} Tailor the response directly to: ${entry.question}`;
}

const handbookEntries = fs.readdirSync(answerBankDirectory)
  .filter((name) => /^actual-interview-handbook-part\d+\.json$/.test(name))
  .sort()
  .flatMap((name) => JSON.parse(fs.readFileSync(path.join(answerBankDirectory, name), "utf8")));
const sourceEntries = [
  ...JSON.parse(fs.readFileSync(importedPath, "utf8")),
  ...handbookEntries,
  ...JSON.parse(fs.readFileSync(path.join(answerBankDirectory, "actual-interview-new-questions.json"), "utf8")),
  ...parseNumberedInterviewRound(landingZoneRoundPath, "Actual Interview - Landing Zone, GKE and Coding Round - 2026-08-20"),
  ...parseNumberedInterviewRound(kubernetesElkDynatraceRoundPath, "Actual Interview - Kubernetes, ELK and Dynatrace Round - 2026-08-20"),
];
const placeholderAnswer = (answer) => /a strong answer should|use a truthful star answer|for this scenario, first confirm user impact|the practical answer is to state what changes|in an interview,? (?:i would|also) mention|so the answer sounds production-ready instead of theoretical|tailor (?:the|your) (?:response|answer)|answer (?:this|the question) (?:by|with)|you should (?:say|state|mention|explain|describe)|use the prompt details as acceptance criteria|start with the expected configuration, command, workflow|the direct answer is to define|i would explain the main mechanism/i.test(String(answer || ""));
const answerBank = JSON.parse(fs.readFileSync(answerBankPath, "utf8"));
const answersByQuestion = new Map(
  answerBank
    .filter((entry) => !placeholderAnswer(entry.answer))
    .map((entry) => [normalize(entry.question), entry.answer]),
);
const generatedAnswers = fs.existsSync(generatedAnswersPath)
  ? JSON.parse(fs.readFileSync(generatedAnswersPath, "utf8"))
  : {};
const curatedAnswers = fs.existsSync(curatedAnswersPath)
  ? JSON.parse(fs.readFileSync(curatedAnswersPath, "utf8"))
  : {};
const curatedAnswersByQuestion = new Map(Object.entries(curatedAnswers).map(([question, answer]) => [normalize(question), answer]));
const categories = new Map();
const uniqueQuestions = new Map();

for (const entry of sourceEntries) {
  const key = normalizeForDeduplication(entry.question);
  if (key && !uniqueQuestions.has(key)) uniqueQuestions.set(key, entry);
}
const imported = [...uniqueQuestions.values()];

for (const entry of imported) {
  const category = entry.category || entry.section || "General";
  const answer = curatedAnswersByQuestion.get(normalize(entry.question))
    || supplementalAnswers.get(normalize(entry.question))
    || generatedAnswers[normalize(entry.question)]
    || answersByQuestion.get(normalize(entry.question))
    || answerGuidance(entry);
  if (!categories.has(category)) categories.set(category, []);
  categories.get(category).push({ ...entry, answer });
}

const lines = [
  "# Actually Asked Interview Questions and Answers",
  "",
  `This collection contains ${imported.length} unique interview questions shared through prior conversations. Questions are grouped by category and retain their original wording.`,
  "",
  `Categories: ${categories.size}`,
  "",
  "---",
  "",
];

for (const category of [...categories.keys()].sort((a, b) => a.localeCompare(b))) {
  const questions = categories.get(category);
  lines.push(`## ${category}`, "", `${questions.length} question${questions.length === 1 ? "" : "s"}`, "");
  questions.forEach((entry, index) => {
    lines.push(
      `### ${index + 1}. ${entry.question}`,
      "",
      `**Type:** ${entry.questionType || "Interview question"}`,
      "",
      "**Answer:**",
      "",
      entry.answer.trim(),
      "",
    );
  });
  lines.push("---", "");
}

fs.writeFileSync(outputPath, `${lines.join("\n").trim()}\n`);
console.log(`Wrote ${imported.length} questions across ${categories.size} categories to ${path.relative(root, outputPath)}`);
