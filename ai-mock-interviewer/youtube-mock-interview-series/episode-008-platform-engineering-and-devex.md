# Episode 8: Platform Engineering and DevEx

YouTube title: DevOps Mock Interview Practice | Episode 8: Platform Engineering and DevEx

Estimated duration: 16-21 min

Source round: Mock Interview 8 - Platform Engineering and DevEx (source set 8)

Focus: IDP, self-service, golden paths, Backstage, guardrails, developer experience

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Platform Engineering and DevEx.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- AI: Artificial Intelligence
- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- DNS: Domain Name System
- GCP: Google Cloud Platform
- IaC: Infrastructure as Code
- IDP: Internal Developer Platform
- ML: Machine Learning
- OPA: Open Policy Agent
- PR: Pull Request
- SRE: Site Reliability Engineering
- TTL: Time To Live

---

## Question 1

Interviewer:
GitOps: How would you implement GitOps with ArgoCD for Kubernetes workloads across dev, staging, and production while keeping rollbacks and approvals safe?

Pause the video and answer this question aloud.

Senior Associate answer:
Structure a Git repo (or App-of-Apps pattern) with one ArgoCD Application per environment pointing to environment-specific overlays (Kustomize or Helm values), so promotion from dev to production is a Git merge/PR rather than a separate deployment mechanism. Require PR approval for changes to production overlays, use ArgoCD's automated sync only for lower environments while keeping production sync manual or gated behind an approval, and rely on Git history for rollback - reverting a commit and letting ArgoCD reconcile is inherently safe and auditable.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: GitOps: How would you implement GitOps with ArgoCD for Kubernetes workloads across dev, staging, and production while keeping rollbacks and approvals safe?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
Policy as code: How would you use Sentinel, OPA, or policy validation to stop risky GCP changes before apply while keeping developer experience smooth?

Pause the video and answer this question aloud.

Senior Associate answer:
Run policy checks against the Terraform plan JSON in CI before apply, evaluating rules like 'no public ingress on sensitive ports' or 'all resources must have required labels', and fail the pipeline with a clear, specific error message pointing to exactly what needs to change. Keep the developer experience smooth by starting new policies in warn/audit mode before enforcing, and providing a fast, well-documented exception process for legitimate edge cases so policy doesn't become a blocker teams route around.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Policy as code: How would you use Sentinel, OPA, or policy validation to stop risky GCP changes before apply while keeping developer experience smooth?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 3

Interviewer:
DNS migration: How would you migrate DNS zones with minimal risk, and how would you plan TTLs, validation, rollback, and monitoring?

Pause the video and answer this question aloud.

Senior Associate answer:
Lower the TTL on records well before the migration window (so any rollback or correction propagates quickly), validate the new DNS provider's records match exactly using a diff against the old zone, and cut over gradually if possible (partial traffic shift) rather than all at once. Monitor resolution success and application error rates closely during and after cutover, and keep the old DNS provider/zone configuration intact and ready as an instant rollback option until the new setup has proven stable.

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: DNS migration: How would you migrate DNS zones with minimal risk, and how would you plan TTLs, validation, rollback, and monitoring?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 4

Interviewer:
Container runtime security: What runtime security controls would you consider for Kubernetes workloads beyond image scanning?

Pause the video and answer this question aloud.

Senior Associate answer:
Beyond scanning images before deployment, add runtime controls like seccomp/AppArmor profiles to restrict syscalls, a read-only root filesystem where possible, dropped Linux capabilities (not just non-root), and network policies limiting lateral movement if a container is compromised. Consider runtime threat detection (Falco or a similar tool) that alerts on anomalous in-container behavior - unexpected process execution, file access outside expected paths - since image scanning only catches known vulnerabilities at build time, not runtime exploitation.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: Container runtime security: What runtime security controls would you consider for Kubernetes workloads beyond image scanning?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 5

Interviewer:
Incident postmortem quality: What makes a postmortem high quality, and how do you ensure action items actually get completed?

Pause the video and answer this question aloud.

Senior Associate answer:
A high-quality postmortem is blameless, includes an accurate timeline, digs into systemic root cause rather than stopping at the immediate trigger, and honestly assesses what went well and what didn't in the response itself, not just the technical failure. To ensure action items complete, assign a specific owner and due date to each one, track them in the same system as regular engineering work (not a separate forgotten document), and review overdue postmortem action items in a recurring forum with visibility to leadership.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Incident postmortem quality: What makes a postmortem high quality, and how do you ensure action items actually get completed?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
ML monitoring tools: How would you combine Vertex AI Model Monitoring, Prometheus, Grafana, MLflow, and Evidently-style checks in one production monitoring design?

Pause the video and answer this question aloud.

Senior Associate answer:
Use Vertex AI Model Monitoring for GCP-native prediction drift and skew detection tied directly to deployed endpoints, Prometheus/Grafana for infrastructure and serving-layer metrics (latency, throughput, resource utilization), MLflow for tracking experiment lineage and linking a production model back to its training run, and Evidently-style checks for deeper statistical drift/data-quality analysis that you can run on a schedule against production data. Unify alerting so any of these systems can trigger the same incident response path rather than living in separate silos nobody checks consistently.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: ML monitoring tools: How would you combine Vertex AI Model Monitoring, Prometheus, Grafana, MLflow, and Evidently-style checks in one production monitoring design?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 7

Interviewer:
Platform roadmap: What would your first 90 days look like as a senior platform engineer joining a product company?

Pause the video and answer this question aloud.

Senior Associate answer:
The first 30 days focus on listening and mapping - understanding current pain points, talking to teams the platform serves, and auditing existing infrastructure and processes without changing anything yet. Days 30-60 involve picking one or two high-impact, achievable improvements (often something already identified as painful) to build credibility and trust through a visible early win, and days 60-90 shift toward a longer-term roadmap informed by what was learned, presented with clear priorities and tradeoffs to stakeholders.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Platform roadmap: What would your first 90 days look like as a senior platform engineer joining a product company?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
Drift detection: How would you detect and reconcile drift between Terraform state, real GCP resources, and manual console changes?

Pause the video and answer this question aloud.

Senior Associate answer:
Run scheduled `terraform plan` jobs in CI against every workspace and alert when a non-empty diff appears, since that indicates drift between state and reality. Investigate whether the drift came from an unauthorized manual console change (reconcile by applying Terraform to restore the intended state, or importing the change if it was legitimate) versus a genuine out-of-band necessity, and restrict console write access for resources managed by Terraform to reduce how often this happens in the first place.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Drift detection: How would you detect and reconcile drift between Terraform state, real GCP resources, and manual console changes?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Closing

That completes Episode 8: Platform Engineering and DevEx.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
