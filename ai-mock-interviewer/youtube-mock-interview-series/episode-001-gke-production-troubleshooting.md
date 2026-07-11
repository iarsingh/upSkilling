# Episode 1: GKE Production Troubleshooting

YouTube title: DevOps Mock Interview Practice | Episode 1: GKE Production Troubleshooting

Estimated duration: 21-27 min

Source round: Mock Interview 1 - GKE Production Troubleshooting (source set 1)

Focus: GKE, Kubernetes operations, DNS, autoscaling, incident response, system design, ML systems

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing GKE Production Troubleshooting.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- API: Application Programming Interface
- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- CLI: Command Line Interface
- DNS: Domain Name System
- GCP: Google Cloud Platform
- GKE: Google Kubernetes Engine
- IAM: Identity and Access Management
- IP: Internet Protocol
- LB: Load Balancer
- ML: Machine Learning
- SLO: Service Level Objective
- SRE: Site Reliability Engineering

---

## Question 1

Interviewer:
Configuration drift: How would you detect and prevent configuration drift across applications, clusters, and cloud infrastructure?

Pause the video and answer this question aloud.

Senior Associate answer:
Detect drift by running scheduled `terraform plan` jobs against live infrastructure and diffing actual Kubernetes cluster state against the GitOps-declared state (ArgoCD/Config Sync surface this automatically), alerting when a diff appears rather than discovering it during an incident. Prevent drift by making the deployment pipeline the only path to production - restrict console/manual access for routine changes, enforce it through IAM, and treat any manual emergency change as something that must be reconciled back into source control immediately afterward.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Configuration drift: How would you detect and prevent configuration drift across applications, clusters, and cloud infrastructure?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 2

Interviewer:
SRE fundamentals: Design an SLO for a customer-facing API running on GKE. What SLIs would you choose, how would you calculate error budget, and how would it affect releases?

Pause the video and answer this question aloud.

Senior Associate answer:
Choose SLIs that reflect real user experience: request success rate (non-5xx responses) and latency (e.g. p95 under a threshold), measured from as close to the user as possible (load balancer metrics, not just app-internal). Set the SLO target (e.g. 99.9% success) based on business impact of failures, calculate the error budget as the allowed failure volume over the measurement window, and use the remaining budget to gate release velocity - healthy budget means ship freely, depleted budget means slow down and prioritize reliability work.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: SRE fundamentals: Design an SLO for a customer-facing API running on GKE. What SLIs would you choose, how would you calculate error budget, and how would it affect releases?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
Cloud Monitoring: How would you design alerting policies in Google Cloud Monitoring to reduce alert fatigue and focus on user impact?

Pause the video and answer this question aloud.

Senior Associate answer:
Alert on symptoms that directly indicate user impact (elevated error rate, latency breach, SLO burn rate) rather than every underlying cause, and use multi-window burn-rate alerting so fast, severe budget consumption pages immediately while slow, minor consumption creates a lower-urgency ticket instead of paging. Route every alert to a specific owner with a runbook link, and periodically prune alerts that fire without leading to action, since those are the ones training people to ignore pages.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: Cloud Monitoring: How would you design alerting policies in Google Cloud Monitoring to reduce alert fatigue and focus on user impact?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 4

Interviewer:
Ingress controller: How would you debug an ingress path returning 404 or 502, from DNS to load balancer to ingress controller to service endpoints?

Pause the video and answer this question aloud.

Senior Associate answer:
Work through the chain in order: confirm DNS resolves to the expected load balancer IP, check the load balancer's backend health status (unhealthy backends often produce 502s), verify the Ingress resource's host/path rules match the request exactly (404s are frequently a path-matching mismatch), and confirm the Service selector actually matches running, ready pod labels. A 502 specifically often means the LB reached the ingress controller but the ingress controller couldn't reach a healthy backend pod, so checking pod readiness is usually the fastest way to narrow it down.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: Ingress controller: How would you debug an ingress path returning 404 or 502, from DNS to load balancer to ingress controller to service endpoints?

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 5

Interviewer:
Kubernetes Secrets: How would you compare Kubernetes Secrets, Secret Manager, External Secrets Operator, Sealed Secrets, and CSI drivers?

Pause the video and answer this question aloud.

Senior Associate answer:
Native Kubernetes Secrets are only base64-encoded (not encrypted at rest by default) and live in etcd, so they're the weakest option alone. Secret Manager is the source of truth for the actual secret value with proper encryption, access control, and rotation; External Secrets Operator syncs Secret Manager values into Kubernetes Secrets automatically so apps can still consume them natively; Sealed Secrets lets you safely commit encrypted secrets to Git (decrypted only by the in-cluster controller); and the Secret Manager CSI driver mounts secrets directly as files without ever creating a Kubernetes Secret object, avoiding etcd exposure entirely - generally the most secure pattern for GKE.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: Kubernetes Secrets: How would you compare Kubernetes Secrets, Secret Manager, External Secrets Operator, Sealed Secrets, and CSI drivers?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 6

Interviewer:
Pipeline caching: When can ML pipeline caching help, and when can it hide stale data or bad assumptions?

Pause the video and answer this question aloud.

Senior Associate answer:
Caching helps when a pipeline step's inputs genuinely haven't changed - re-running an expensive feature computation on identical upstream data wastes time and money. It becomes dangerous when the cache key doesn't actually capture everything that affects the output - for example caching on code version alone while the underlying data silently changed - which can serve a stale result that looks like a successful run. The fix is making cache keys include every meaningful input (code, data version, config) and treating cache hits as something to occasionally spot-check, not blindly trust.

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: Pipeline caching: When can ML pipeline caching help, and when can it hide stale data or bad assumptions?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 7

Interviewer:
Go services: If asked to build a Kubernetes controller or CLI in Go, how would you approach the design even if Go is not your primary language?

Pause the video and answer this question aloud.

Senior Associate answer:
Lean on established patterns rather than inventing your own: use controller-runtime/kubebuilder for a controller (it handles the reconcile loop, informers, and leader election scaffolding) and Cobra for a CLI (standard flag/subcommand handling). Focus design effort on the actual business logic - what the reconcile loop needs to converge toward, what the CLI's core commands do - and rely on Go's straightforward syntax and the framework's conventions to fill in the rest, treating it as learning a new tool rather than a fundamentally different way of thinking about the problem.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Go services: If asked to build a Kubernetes controller or CLI in Go, how would you approach the design even if Go is not your primary language?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 8

Interviewer:
Reliability review: What would you check before certifying a service as production-ready on GCP/GKE?

Pause the video and answer this question aloud.

Senior Associate answer:
Check that SLOs are defined with corresponding alerts, the service has health checks (readiness/liveness) correctly configured, resource requests/limits are set appropriately, there's a tested rollback path and runbook for common failure modes, security basics are in place (least-privilege IAM, no hardcoded secrets, Workload Identity), and on-call ownership is assigned. A production-readiness checklist should be concrete and verifiable, not a vague 'looks good to me' sign-off.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Reliability review: What would you check before certifying a service as production-ready on GCP/GKE?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 9

Interviewer:
System design: Design a highly available, globally accessible inference API on GCP that can handle unpredictable traffic while meeting strict latency and reliability targets.

Pause the video and answer this question aloud.

Senior Associate answer:
Start with clear requirements: expected request rate, payload size, latency SLO, availability target, model size, consistency needs, and regional data constraints. Put a global external Application Load Balancer in front of regional GKE clusters, deploy stateless inference services across at least two regions, and use autoscaling based on request concurrency, latency, and accelerator utilization rather than CPU alone. Keep model artifacts versioned in Cloud Storage or a model registry, load them through a controlled deployment process, and use a cache only where requests are safe to reuse. Protect the service with authentication, rate limiting, quotas, and timeouts; add queues for asynchronous workloads and load shedding for overload. Use canary releases, regional health checks, SLO burn-rate alerts, and tested failover so a bad model or regional outage can be contained and rolled back without taking down the entire service.

Senior answer structure:
Use this structure: requirements -> high-level architecture -> data and traffic flow -> scaling and resilience -> security -> observability -> tradeoffs.

Scenario-based practice:
Scenario practice: Traffic suddenly increases tenfold while one region becomes unhealthy. Explain how requests are routed, how the service scales, which workloads are rejected or queued, how you prevent cascading failure, and how you validate recovery.

What interviewer checks:
They are checking whether you clarify requirements, decompose the architecture, identify bottlenecks, make explicit tradeoffs, and design for failure rather than only the happy path.

---

## Question 10

Interviewer:
ML system design: Design an end-to-end production ML platform for training, deploying, monitoring, and retraining a customer-churn model.

Pause the video and answer this question aloud.

Senior Associate answer:
Define the prediction target, business action, success metric, and acceptable prediction latency first. Build versioned batch or streaming ingestion with data-quality checks, create reusable features while preventing training-serving skew, and track every experiment with its code, data snapshot, parameters, metrics, and model artifact. A pipeline should validate schema, train the model, compare it with the approved baseline, run bias and performance checks, register the model, and require promotion gates before deployment. Serve it through a versioned endpoint on GKE or Vertex AI using shadow or canary traffic, with an immediate rollback path. Monitor service health as well as feature drift, prediction drift, data quality, and delayed ground-truth performance. Retraining should be triggered by a reviewed schedule or measurable degradation, not drift alone, because drift does not always mean the model is worse. Keep human approval for high-impact changes and maintain lineage so every prediction and release is auditable.

Senior answer structure:
Use this structure: business objective -> data and features -> training pipeline -> evaluation and registry -> serving -> monitoring -> retraining and governance.

Scenario-based practice:
Scenario practice: Offline accuracy improved, but churn predictions became worse after deployment. Explain how you would investigate data leakage, training-serving skew, feature freshness, drift, threshold selection, and delayed labels, then decide whether to roll back or retrain.

What interviewer checks:
They are checking whether you understand the full ML lifecycle, distinguish model quality from service reliability, prevent leakage and skew, and connect technical metrics to business outcomes.

---

## Closing

That completes Episode 1: GKE Production Troubleshooting.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
