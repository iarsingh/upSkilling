# Episode 6: Observability and Performance

YouTube title: DevOps Mock Interview Practice | Episode 6: Observability and Performance

Estimated duration: 16-21 min

Source round: Mock Interview 6 - Observability and Performance (source set 6)

Focus: Prometheus, Grafana, OpenTelemetry, logging, latency, high cardinality

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Observability and Performance.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- CPU: Central Processing Unit
- DNS: Domain Name System
- GCP: Google Cloud Platform
- GKE: Google Kubernetes Engine
- ML: Machine Learning
- SRE: Site Reliability Engineering
- VPC: Virtual Private Cloud
- VPN: Virtual Private Network

---

## Question 1

Interviewer:
Firewall governance: How would you design firewall rule ownership, logging, review, and cleanup across many GCP projects?

Pause the video and answer this question aloud.

Senior Associate answer:
Require every firewall rule to be created via Terraform (not console) with a mandatory owner tag/description and enable firewall rule logging so usage is visible, not assumed. Run periodic reviews (quarterly) using logging data to identify unused rules and flag overly broad rules (0.0.0.0/0 source) for justification, and centralize rule management for shared/Shared VPC networks so ownership and review responsibility is clear rather than scattered across every team with console access.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: Firewall governance: How would you design firewall rule ownership, logging, review, and cleanup across many GCP projects?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 2

Interviewer:
ML feature store: What reliability and governance concerns would you consider for an ML feature store?

Pause the video and answer this question aloud.

Senior Associate answer:
Reliability concerns include feature freshness (is the feature actually up to date when served), training/serving parity (identical computation logic for both paths), and availability of the online serving path under load, since a feature store outage can silently degrade every model that depends on it. Governance concerns include feature ownership and documentation (so teams don't duplicate or misuse features), access control for sensitive underlying data, and versioning so a feature definition change doesn't silently break models trained against the old definition.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: ML feature store: What reliability and governance concerns would you consider for an ML feature store?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
CrashLoopBackOff: A pod is stuck in CrashLoopBackOff in production. Give me your exact Kubernetes troubleshooting workflow and the commands or signals you would check.

Pause the video and answer this question aloud.

Senior Associate answer:
Start with `kubectl describe pod` to see recent events and the last termination reason/exit code, then `kubectl logs <pod> --previous` to see the crashed container's actual output before it died. Check the exit code specifically (137 usually means OOMKilled, 1 or other application-specific codes point to an app-level crash), verify resource limits aren't too low if OOMKilled, check readiness/liveness probe configuration if the crash is probe-induced, and confirm any mounted ConfigMap/Secret dependencies are correctly present.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: CrashLoopBackOff: A pod is stuck in CrashLoopBackOff in production. Give me your exact Kubernetes troubleshooting workflow and the commands or signals you would check.

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 4

Interviewer:
Migration: How would you migrate an on-prem application to GCP with minimal downtime? Cover networking, data, CI/CD, observability, security, and rollback.

Pause the video and answer this question aloud.

Senior Associate answer:
Set up hybrid connectivity (VPN or Interconnect) first so on-prem and GCP can communicate during migration, replicate data continuously (database replication, not a one-time dump) so the GCP side stays current, and build CI/CD, observability, and security controls in GCP before cutover so the new environment is production-ready on day one, not retrofitted after. Cut over with a brief maintenance window or a gradual traffic shift via DNS/load balancer weighting, and keep the on-prem environment running as a rollback option until the GCP environment has proven stable under real traffic.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: Migration: How would you migrate an on-prem application to GCP with minimal downtime? Cover networking, data, CI/CD, observability, security, and rollback.

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 5

Interviewer:
Cloud Storage lifecycle: How would you design lifecycle, retention, versioning, object holds, CMEK, and audit logging for compliance-sensitive storage?

Pause the video and answer this question aloud.

Senior Associate answer:
Configure lifecycle rules to automatically transition objects to cheaper storage classes or delete them based on age, matched to your actual retention requirements, and use bucket retention policies with object lock for data that must not be deletable before a compliance-mandated period even by an administrator. Enable object versioning where accidental overwrite/deletion recovery matters, use CMEK for encryption key control over sensitive data, and enable data access audit logging so every read of compliance-sensitive objects is recorded for audit purposes.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Cloud Storage lifecycle: How would you design lifecycle, retention, versioning, object holds, CMEK, and audit logging for compliance-sensitive storage?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
OpenTofu: If a company asks about Terraform versus OpenTofu, how would you explain the tradeoffs for enterprise platform teams?

Pause the video and answer this question aloud.

Senior Associate answer:
Terraform (HashiCorp) offers the most mature enterprise ecosystem, official provider support, and Terraform Enterprise/Cloud's managed features, but comes with licensing changes that affect commercial redistribution and some vendor lock-in concerns. OpenTofu is a genuinely open-source fork maintained by the Linux Foundation with growing community momentum and full compatibility with existing Terraform configurations, appealing to teams concerned about licensing terms or wanting more community influence over the roadmap - the practical tradeoff for most teams is ecosystem maturity and vendor support versus licensing freedom and community governance.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: OpenTofu: If a company asks about Terraform versus OpenTofu, how would you explain the tradeoffs for enterprise platform teams?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
Observability: An alert says p95 latency increased from 200ms to 2s after a deployment. How would you investigate using Prometheus, Grafana, Cloud Logging, logs, and traces?

Pause the video and answer this question aloud.

Senior Associate answer:
First confirm the timing correlation between the deployment and the latency spike precisely, then check distributed traces for the affected requests to see which specific span (application code, a downstream call, database query) accounts for the added time. Cross-reference with Prometheus/Grafana dashboards for resource saturation (CPU throttling, memory pressure, connection pool exhaustion) that might explain a code-level regression, and check Cloud Logging for new error patterns or slow-query logs that appeared coincident with the deployment.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: Observability: An alert says p95 latency increased from 200ms to 2s after a deployment. How would you investigate using Prometheus, Grafana, Cloud Logging, logs, and traces?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 8

Interviewer:
Kubernetes probes: How would you design readiness, liveness, and startup probes for a slow-starting service to avoid cascading failures?

Pause the video and answer this question aloud.

Senior Associate answer:
Use a startup probe with a generous failure threshold to give the slow-starting service enough time to initialize before liveness/readiness probes even begin evaluating it, preventing Kubernetes from killing a container that's simply still starting up. Configure the readiness probe to genuinely reflect whether the service can handle traffic (checking real dependencies, not just 'process is running'), and keep the liveness probe conservative (only failing on true deadlock/hang conditions) since an overly aggressive liveness probe causes unnecessary restarts that can cascade into a crash loop under load.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Kubernetes probes: How would you design readiness, liveness, and startup probes for a slow-starting service to avoid cascading failures?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 6: Observability and Performance.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
