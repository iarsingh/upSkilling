# Episode 4: CI/CD and GitOps

YouTube title: DevOps Mock Interview Practice | Episode 4: CI/CD and GitOps

Estimated duration: 16-21 min

Source round: Mock Interview 4 - CI/CD and GitOps (source set 4)

Focus: ArgoCD, Helm, rollback, progressive delivery, secure pipelines

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing CI/CD and GitOps.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- AI: Artificial Intelligence
- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- GCP: Google Cloud Platform
- GKE: Google Kubernetes Engine
- IaC: Infrastructure as Code
- IP: Internet Protocol
- ML: Machine Learning

---

## Question 1

Interviewer:
ArgoCD drift: A team says ArgoCD shows drift between Git and the cluster. How would you investigate and safely reconcile it?

Pause the video and answer this question aloud.

Senior Associate answer:
Check the ArgoCD diff view to see exactly what's different between the Git-declared state and the live cluster state, and determine whether the drift came from a manual kubectl change, a mutating webhook/controller modifying the resource after ArgoCD applied it, or a genuine intended change that wasn't committed to Git yet. If it's an unauthorized manual change, sync to reconcile back to Git state; if it's a legitimate change, commit it to Git first so Git remains the source of truth, rather than just clicking sync and losing the change.

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: ArgoCD drift: A team says ArgoCD shows drift between Git and the cluster. How would you investigate and safely reconcile it?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 2

Interviewer:
Terraform monorepo vs multi-repo: How would you decide repository structure for Terraform modules, environments, and app teams?

Pause the video and answer this question aloud.

Senior Associate answer:
Use a monorepo for shared modules where you want atomic changes and easy discoverability across the platform team, but keep environment/team-specific configurations in separate repos or clearly separated directories with independent state, so one team's apply can't accidentally affect another's infrastructure. The key factor is blast radius and ownership boundaries - structure repos so a given team's changes are isolated to what they actually own, regardless of whether that's technically one repo or many.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Terraform monorepo vs multi-repo: How would you decide repository structure for Terraform modules, environments, and app teams?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 3

Interviewer:
Secrets rotation: How would you rotate secrets or keys for production services without downtime?

Pause the video and answer this question aloud.

Senior Associate answer:
Use a rotation pattern that supports both old and new credentials being valid simultaneously for a transition window - create the new secret version, deploy it to consumers, verify they've picked it up (check logs/metrics for successful auth with the new version), then revoke the old version only after confirming the cutover succeeded. Never revoke the old secret before verifying the new one works, and automate this pattern (Secret Manager versioning plus a rollout/verify/revoke pipeline) so rotation is routine rather than a risky manual event.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: Secrets rotation: How would you rotate secrets or keys for production services without downtime?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 4

Interviewer:
Prometheus scale: Prometheus is overloaded with high cardinality metrics. How would you debug and fix it?

Pause the video and answer this question aloud.

Senior Associate answer:
Identify the highest-cardinality metrics using `topk` queries against Prometheus's own `prometheus_tsdb_*` metrics or a cardinality analysis tool, and look for label values that shouldn't be labels at all (like user IDs or full URLs, which explode series count). Fix it by removing or aggregating high-cardinality labels at the source, using recording rules to pre-aggregate frequently-queried expensive metrics, and considering a remote-write/Thanos/Cortex setup to shard load if a single Prometheus instance genuinely can't handle the required scale.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: Prometheus scale: Prometheus is overloaded with high cardinality metrics. How would you debug and fix it?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 5

Interviewer:
Capacity planning: How would you design capacity planning for GKE node pools supporting both web services and batch or ML workloads?

Pause the video and answer this question aloud.

Senior Associate answer:
Separate node pools by workload type - web services on pools tuned for steady, predictable request-driven scaling, and batch/ML on pools that can use spot/preemptible instances and scale aggressively down to zero when idle, since their utilization patterns and cost sensitivity differ significantly. Forecast capacity from historical peak usage plus growth trends per pool independently, and ensure batch/ML workloads can't starve web services of node capacity by using separate quotas or priority classes.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Capacity planning: How would you design capacity planning for GKE node pools supporting both web services and batch or ML workloads?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 6

Interviewer:
Pipeline orchestration: Compare Airflow, Dagster, Kubeflow, and Vertex AI Pipelines for ML/platform use cases. How would you choose?

Pause the video and answer this question aloud.

Senior Associate answer:
Airflow is the general-purpose, widely-adopted choice for orchestrating any scheduled workflow (not ML-specific) with a huge ecosystem of integrations; Dagster offers a more modern, asset-based approach with better local development and testing ergonomics. Kubeflow Pipelines is Kubernetes-native and well-suited when your ML infrastructure is already Kubernetes-centric; Vertex AI Pipelines is the fully-managed GCP option with tight integration into Vertex AI's model registry and monitoring, trading some flexibility for lower operational overhead - choose based on how much of your stack is already GCP-managed versus needing portability.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Pipeline orchestration: Compare Airflow, Dagster, Kubeflow, and Vertex AI Pipelines for ML/platform use cases. How would you choose?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
Cloud Build: How would you design Cloud Build pipelines for Docker builds, vulnerability scanning, provenance, tests, and deployment promotion?

Pause the video and answer this question aloud.

Senior Associate answer:
Structure the pipeline as sequential steps: run tests first (fail fast before spending time on a build), build the Docker image with BuildKit for caching efficiency, scan it for vulnerabilities and block on critical findings, generate build provenance/attestation and sign the image, then push to Artifact Registry. Use separate Cloud Build triggers per environment so promotion to staging/production is an explicit, reviewable step (updating a deployment manifest reference) rather than the same pipeline auto-deploying everywhere.

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: Cloud Build: How would you design Cloud Build pipelines for Docker builds, vulnerability scanning, provenance, tests, and deployment promotion?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 8

Interviewer:
Organization policy: Which GCP org policies would you enforce for a secure baseline, and how would you handle exceptions?

Pause the video and answer this question aloud.

Senior Associate answer:
Enforce policies like disabling service account key creation (favor Workload Identity), restricting public IP assignment on VMs, requiring OS Login, restricting resource locations for compliance, and enabling Public Access Prevention on storage by default. Handle exceptions through a lightweight, documented request process with an expiry/review date rather than a permanent blanket override, so exceptions stay visible and don't quietly become the new normal.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Organization policy: Which GCP org policies would you enforce for a secure baseline, and how would you handle exceptions?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Closing

That completes Episode 4: CI/CD and GitOps.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
