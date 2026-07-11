# Episode 9: MLOps and AI Infrastructure

YouTube title: DevOps Mock Interview Practice | Episode 9: MLOps and AI Infrastructure

Estimated duration: 16-21 min

Source round: Mock Interview 9 - MLOps and AI Infrastructure (source set 9)

Focus: Vertex AI, model serving, GPUs, MLflow, Kubeflow, model monitoring

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing MLOps and AI Infrastructure.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- AI: Artificial Intelligence
- API: Application Programming Interface
- GCP: Google Cloud Platform
- GKE: Google Kubernetes Engine
- IAM: Identity and Access Management
- ML: Machine Learning
- MLOps: Machine Learning Operations
- RBAC: Role-Based Access Control
- TLS: Transport Layer Security

---

## Question 1

Interviewer:
MLOps fundamentals: Explain the end-to-end ML lifecycle and where DevOps responsibilities become different from traditional application delivery.

Pause the video and answer this question aloud.

Senior Associate answer:
The ML lifecycle spans data collection and validation, feature engineering, model training and evaluation, deployment, and ongoing monitoring for drift - with a feedback loop back to retraining that traditional application delivery doesn't have. DevOps responsibilities differ because 'correctness' isn't just whether the code runs, but whether the model's predictions remain accurate over time as real-world data shifts, which requires monitoring data and prediction distributions in addition to standard application health metrics, and versioning data and models alongside code.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: MLOps fundamentals: Explain the end-to-end ML lifecycle and where DevOps responsibilities become different from traditional application delivery.

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 2

Interviewer:
GKE multi-tenancy: How would you design namespace isolation, quotas, RBAC, network policies, admission controls, and observability for many teams in one cluster?

Pause the video and answer this question aloud.

Senior Associate answer:
Give each team a dedicated namespace with ResourceQuotas and LimitRanges sized to their needs, RBAC RoleBindings scoped strictly to that namespace, and default-deny NetworkPolicies with explicit allow rules for legitimate cross-namespace traffic. Enforce baseline security standards (non-root, resource limits required) via admission controls like Gatekeeper or Kyverno applied cluster-wide so no team can opt out, and provide per-namespace observability dashboards so teams can self-serve visibility into their own workloads without needing cluster-admin access.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: GKE multi-tenancy: How would you design namespace isolation, quotas, RBAC, network policies, admission controls, and observability for many teams in one cluster?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 3

Interviewer:
Trace sampling: How would you choose tracing sampling rates and make traces useful for debugging high-volume services?

Pause the video and answer this question aloud.

Senior Associate answer:
Use a lower sampling rate for high-volume, healthy traffic to control cost and storage, but always sample 100% of traces that contain errors or exceed a latency threshold (tail-based sampling), since those are exactly the traces you need for debugging and a random low-rate sample would likely miss them. Ensure sampled traces include enough context (all relevant spans across services, not just the entry point) to actually be useful for root-causing an issue, not just confirming a request happened.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: Trace sampling: How would you choose tracing sampling rates and make traces useful for debugging high-volume services?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 4

Interviewer:
IAM troubleshooting: A workload gets permission denied only in production. How would you debug IAM policy, service accounts, Workload Identity, org policy, and audit logs?

Pause the video and answer this question aloud.

Senior Associate answer:
Compare the exact service account and IAM bindings between the working environment and production first, since a permission-denied-only-in-production issue is usually an environment-specific difference, not a code bug. Check Workload Identity bindings are correctly mapped for the production namespace/service account, verify no org policy constraint is more restrictive in the production project/folder, and check Cloud Audit Logs for the specific denied call to see exactly which permission was missing rather than guessing.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: IAM troubleshooting: A workload gets permission denied only in production. How would you debug IAM policy, service accounts, Workload Identity, org policy, and audit logs?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 5

Interviewer:
Platform API: If you expose self-service infrastructure through an API, what validations, approvals, and audit trails would you build?

Pause the video and answer this question aloud.

Senior Associate answer:
Validate every request against schema and policy checks (quota limits, naming conventions, allowed resource types) before provisioning, and require an approval step for anything above a defined risk threshold while allowing routine, well-understood requests to auto-approve. Log every request, decision, and outcome with who made it and when, so the audit trail can answer 'who created this resource and under what approval' months later without needing to reconstruct it from memory.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Platform API: If you expose self-service infrastructure through an API, what validations, approvals, and audit trails would you build?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
Log correlation: How would you design correlation IDs and structured logging across microservices and async Pub/Sub workflows?

Pause the video and answer this question aloud.

Senior Associate answer:
Generate a correlation/trace ID at the entry point of a request and propagate it through every synchronous call via a standard header, and explicitly carry it through asynchronous hops by embedding it in Pub/Sub message attributes, since it won't propagate automatically across a queue. Use structured (JSON) logging everywhere with the correlation ID as a consistent field name, so a single query across all services' logs reconstructs the full request/event flow even when it spans both synchronous and asynchronous legs.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Log correlation: How would you design correlation IDs and structured logging across microservices and async Pub/Sub workflows?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
Model monitoring: How would you monitor model serving for latency, error rate, drift, data quality, and business impact?

Pause the video and answer this question aloud.

Senior Associate answer:
Monitor serving infrastructure metrics (latency, error rate, throughput) the same way you would any production service, and layer in ML-specific monitoring - input data quality checks (schema validation, missing/out-of-range values), prediction distribution drift against the training baseline, and where possible, business outcome metrics tied to model decisions (conversion, revenue impact) since a model can be technically healthy while quietly hurting the business. Alert on each category with different urgency and routing, since a latency spike and a slow drift trend require very different responses.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: Model monitoring: How would you monitor model serving for latency, error rate, drift, data quality, and business impact?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 8

Interviewer:
Kubernetes certificate issue: A cluster has certificate or webhook TLS failures. How would you debug certificate chain, rotation, admission webhooks, and API server errors?

Pause the video and answer this question aloud.

Senior Associate answer:
Check the API server logs for the specific TLS error first (expired certificate, untrusted CA, hostname mismatch all produce different messages), and verify certificate expiry dates for the API server, kubelet, and any admission webhook certificates, since GKE typically rotates these automatically but a self-managed or third-party webhook certificate can expire silently. If an admission webhook is failing TLS verification, check its certificate is signed by a CA the API server trusts and that the webhook's CA bundle configuration in the cluster is current.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Kubernetes certificate issue: A cluster has certificate or webhook TLS failures. How would you debug certificate chain, rotation, admission webhooks, and API server errors?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Closing

That completes Episode 9: MLOps and AI Infrastructure.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
