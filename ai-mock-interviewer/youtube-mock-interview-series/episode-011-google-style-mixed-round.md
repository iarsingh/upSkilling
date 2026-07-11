# Episode 11: Google-Style Mixed Round

YouTube title: DevOps Mock Interview Practice | Episode 11: Google-Style Mixed Round

Estimated duration: 16-21 min

Source round: Mock Interview 11 - Google-Style Mixed Round (source set 11)

Focus: broad senior GCP DevOps/SRE screening with scenario depth

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Google-Style Mixed Round.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- AI: Artificial Intelligence
- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- CLI: Command Line Interface
- CPU: Central Processing Unit
- GCP: Google Cloud Platform
- GKE: Google Kubernetes Engine
- GPU: Graphics Processing Unit
- IaC: Infrastructure as Code
- IAM: Identity and Access Management
- MLOps: Machine Learning Operations
- PDB: Pod Disruption Budget
- RBAC: Role-Based Access Control
- REST: Representational State Transfer
- SDK: Software Development Kit
- SLO: Service Level Objective
- SRE: Site Reliability Engineering

---

## Question 1

Interviewer:
PDB design: How would you use PodDisruptionBudgets during node upgrades, cluster autoscaling, and planned maintenance?

Pause the video and answer this question aloud.

Senior Associate answer:
Set a PodDisruptionBudget for every workload specifying the minimum number of replicas that must remain available during voluntary disruptions, so node upgrades, cluster autoscaler scale-downs, and planned maintenance all respect that minimum rather than potentially draining too many replicas of the same service simultaneously. Size the PDB based on the service's actual availability requirement (e.g. minAvailable of 50% or more for critical services), and test that upgrades genuinely respect it by watching pod counts during a real maintenance window.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: PDB design: How would you use PodDisruptionBudgets during node upgrades, cluster autoscaling, and planned maintenance?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 2

Interviewer:
Stateful Kubernetes workloads: When would you avoid running stateful workloads on GKE, and if you must run them, how would you design storage, backup, upgrades, and recovery?

Pause the video and answer this question aloud.

Senior Associate answer:
Avoid running genuinely critical, high-throughput stateful systems (primary production databases) on Kubernetes when a managed service (Cloud SQL, AlloyDB) meets the need with far less operational burden. If you must run stateful workloads on GKE (caches, message brokers, smaller databases), use StatefulSets with PersistentVolumeClaims backed by regional persistent disks for durability, implement application-aware backup (not just disk snapshots) with tested restore procedures, and plan node/cluster upgrades carefully since stateful pods can't simply be rescheduled anywhere without storage locality considerations.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Stateful Kubernetes workloads: When would you avoid running stateful workloads on GKE, and if you must run them, how would you design storage, backup, upgrades, and recovery?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 3

Interviewer:
On-call maturity: How would you improve an on-call rotation that has too many alerts, poor runbooks, and slow escalation?

Pause the video and answer this question aloud.

Senior Associate answer:
Start by cutting alert volume aggressively based on which alerts actually led to action historically, rebuild remaining alerts around SLO burn rate with clear ownership, and write runbooks from real past incidents rather than generic templates. Fix slow escalation by defining clear escalation timeouts and paths (who gets paged next if the primary doesn't acknowledge within N minutes) and rehearsing the escalation path so it's not being discovered for the first time during a real incident.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: On-call maturity: How would you improve an on-call rotation that has too many alerts, poor runbooks, and slow escalation?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
GPU cost control: GPU workloads are underutilized and expensive. How would you improve scheduling, quotas, sharing, and monitoring?

Pause the video and answer this question aloud.

Senior Associate answer:
Monitor actual GPU utilization (not just allocation) to find workloads reserving GPUs they don't fully use, and consider GPU sharing/time-slicing or MIG (Multi-Instance GPU) partitioning so multiple smaller workloads can share a single physical GPU instead of each requiring a dedicated one. Set per-team GPU quotas to prevent overprovisioning, use spot/preemptible GPU nodes for fault-tolerant workloads to cut cost significantly, and build utilization dashboards visible to teams so cost accountability drives more efficient usage over time.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: GPU cost control: GPU workloads are underutilized and expensive. How would you improve scheduling, quotas, sharing, and monitoring?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 5

Interviewer:
RBAC: How would you design Kubernetes RBAC for platform, application, security, and CI/CD teams in a shared GKE environment?

Pause the video and answer this question aloud.

Senior Associate answer:
Scope RBAC by both namespace and role: platform team gets cluster-admin-level access for cluster-wide resources, application teams get namespace-scoped edit access limited to their own namespaces, security teams get read-only cluster-wide access plus write access to security-relevant resources (NetworkPolicies, PodSecurityPolicies) for review purposes, and CI/CD service accounts get narrowly scoped, namespace-limited deploy permissions rather than broad access. Use groups (via GCP IAM or an external identity provider) rather than individual bindings so access changes with team membership automatically.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: RBAC: How would you design Kubernetes RBAC for platform, application, security, and CI/CD teams in a shared GKE environment?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 6

Interviewer:
Inference optimization: How would you improve model latency and throughput using batching, autoscaling, model format optimization, GPU use, or caching?

Pause the video and answer this question aloud.

Senior Associate answer:
Batch multiple inference requests together where latency tolerance allows, since GPUs achieve much better throughput per request when processing batches rather than one at a time, and use a serving framework (vLLM, TensorFlow Serving, Triton) that implements this automatically. Optimize the model format (quantization, ONNX/TensorRT conversion) to reduce compute per inference, autoscale based on queue depth or GPU utilization rather than just CPU, and cache responses for repeated or common queries where the use case tolerates it.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: Inference optimization: How would you improve model latency and throughput using batching, autoscaling, model format optimization, GPU use, or caching?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 7

Interviewer:
Blue-green deployment: When would you choose blue-green over canary, and what GCP/GKE components would you use?

Pause the video and answer this question aloud.

Senior Associate answer:
Choose blue-green when you need an instant, all-or-nothing cutover with the simplest possible rollback (just switch traffic back), which suits changes where partial-traffic canary testing isn't practical or where the risk profile favors full validation on a complete parallel environment before any real traffic hits it. Implement it on GKE with two full deployments (blue and green) behind a Service or load balancer, switching the selector/backend to cut traffic over, or use Cloud Deploy's built-in blue-green rollout strategy for a managed version of the same pattern.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Blue-green deployment: When would you choose blue-green over canary, and what GCP/GKE components would you use?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 8

Interviewer:
SDK automation: Compare using Terraform, gcloud, REST APIs, and Python SDKs for platform automation. When would you choose each?

Pause the video and answer this question aloud.

Senior Associate answer:
Terraform is the right default for declarative, idempotent infrastructure provisioning that needs state tracking and drift detection. gcloud CLI is best for quick one-off operational tasks and scripting simple sequences. REST APIs give the most control and are the right choice when building a custom platform/automation layer that needs fine-grained handling of responses and errors. Python SDKs sit between gcloud and raw REST - use them when building more substantial automation tools that need programmatic logic (conditionals, loops, integration with other systems) beyond what a shell script comfortably handles.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: SDK automation: Compare using Terraform, gcloud, REST APIs, and Python SDKs for platform automation. When would you choose each?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Closing

That completes Episode 11: Google-Style Mixed Round.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
