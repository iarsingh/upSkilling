# Episode 49: Today AI/Python/Cloud/SRE Recap - Part 2

YouTube title: DevOps Mock Interview Practice | Episode 49: Today AI/Python/Cloud/SRE Recap - Part 2

Estimated duration: 16-21 min

Source round: Mock Interview 48 - Today AI/Python/Cloud/SRE Recap (source set 48)

Focus: AI engineering libraries, Python equality and multiprocessing, AWS to GCP migration, Terraform IAM recovery, multi-environment architecture, Kubernetes policy guardrails, observability, tracing, burn-rate alerts, and outage mitigation decisions

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Today AI/Python/Cloud/SRE Recap - Part 2.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- AI: Artificial Intelligence
- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- GCP: Google Cloud Platform
- IAM: Identity and Access Management
- ML: Machine Learning
- OPA: Open Policy Agent
- RCA: Root Cause Analysis
- SLO: Service Level Objective
- SRE: Site Reliability Engineering

---

## Question 1

Interviewer:
Today interview 2026-07-06 - Partial Terraform apply logs: During a production incident caused by a partially successful Terraform apply, what logs would you check first?

Pause the video and answer this question aloud.

Senior Associate answer:
Check the CI/CD job logs first to see the exact Terraform command, workspace, variables, plan file, provider versions, and resource address where apply failed. Then check Terraform state and plan output to identify which resources changed successfully and which did not. In parallel, inspect Cloud Audit Logs for IAM, network, database, or compute changes, Kubernetes events if cluster resources were affected, and application/cloud logs for user impact. The goal is to build a timeline: what Terraform attempted, what the cloud accepted, what Kubernetes observed, and when symptoms started.

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: Today interview 2026-07-06 - Partial Terraform apply logs: During a production incident caused by a partially successful Terraform apply, what logs would you check first?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 2

Interviewer:
Today interview 2026-07-06 - Early incident detection: How would you design monitoring to detect customer-impacting incidents early?

Pause the video and answer this question aloud.

Senior Associate answer:
Start from user journeys and define SLIs such as availability, latency, error rate, freshness, and successful transactions. Alert on symptoms users feel: high 5xx rate, p95/p99 latency, failed payments, queue age, failed login, stale dashboards, or error-budget burn. Add service-level dashboards, synthetic checks, black-box probes, and dependency telemetry. Cause-based alerts still help debugging, but paging should be tied to actionable user impact, clear ownership, and runbooks.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: Today interview 2026-07-06 - Early incident detection: How would you design monitoring to detect customer-impacting incidents early?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 3

Interviewer:
Today interview 2026-07-06 - Burn-rate alerts: What are burn-rate alerts and why are they useful?

Pause the video and answer this question aloud.

Senior Associate answer:
Burn-rate alerts measure how quickly a service is consuming its allowed error budget for an SLO. Instead of alerting on a raw error spike, they ask whether the current error rate will exhaust the budget too quickly. Multi-window multi-burn-rate alerting catches both fast outages, such as a severe 5-minute spike, and slow burns, such as elevated errors over several hours. This reduces noise and aligns alert severity with reliability impact.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Today interview 2026-07-06 - Burn-rate alerts: What are burn-rate alerts and why are they useful?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
Today interview 2026-07-06 - Log correlation: How do you correlate logs across Kubernetes microservices?

Pause the video and answer this question aloud.

Senior Associate answer:
Use a correlation ID or trace ID generated at the edge and propagate it through every downstream call using headers such as traceparent or x-request-id. Each service writes structured JSON logs containing trace_id, span_id, request_id, service name, version, namespace, pod, user or tenant when safe, and error details. For async systems like Pub/Sub or Kafka, copy the trace context into message attributes. Then the logging backend can filter all logs for one request across services and connect them to distributed traces.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: Today interview 2026-07-06 - Log correlation: How do you correlate logs across Kubernetes microservices?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 5

Interviewer:
Today interview 2026-07-06 - OpenTelemetry basics: Explain OpenTelemetry.

Pause the video and answer this question aloud.

Senior Associate answer:
OpenTelemetry is an open standard and toolkit for collecting metrics, logs, and traces. It helps instrument applications in a vendor-neutral way.

Detailed interview explanation:
Opentelemetry is part of production observability and monitoring. Observability helps teams understand what is happening inside complex systems using metrics, logs, traces, events, profiles, and alerts. The goal is not just collecting data; the goal is detecting user impact quickly and reducing time to diagnose and recover.

Production example:
For a Kubernetes microservice, a good observability setup collects request rate, error rate, latency, saturation, pod health, node health, logs with correlation IDs, and distributed traces across dependencies. Alerts are usually tied to SLOs or error-budget burn instead of every low-level metric spike.

Best practices to mention:
- Define SLIs and SLOs for important user journeys.
- Use structured logs and propagate trace IDs or correlation IDs.
- Alert on actionable user impact, not noisy symptoms.
- Control cost with sampling, retention policies, and cardinality limits.
- Attach runbooks, dashboards, and ownership to important alerts.

Common interview follow-ups:
Expect questions about alert fatigue, p95 vs p99 latency, high-cardinality metrics, log retention, trace sampling, RCA, MTTA, MTTR, and how observability changes for Kubernetes or ML systems.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: Today interview 2026-07-06 - OpenTelemetry basics: Explain OpenTelemetry.

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 6

Interviewer:
Today interview 2026-07-06 - Outage decision-making: During an outage with incomplete information, how do you decide whether to roll back, roll forward, use a feature flag, or shift traffic?

Pause the video and answer this question aloud.

Senior Associate answer:
Optimize for fastest safe mitigation, not proving root cause first. Roll back when the issue clearly started after a release and rollback is low risk. Roll forward when the fix is already known, tested, and safer than reverting, such as a small config patch. Use a feature flag when a specific feature path is causing impact and can be disabled without redeploying. Shift traffic when impact is region, cluster, version, or dependency specific and a healthy target exists. Communicate assumptions, set a timebox, watch customer-impact metrics, and keep a fallback if the chosen mitigation fails.

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: Today interview 2026-07-06 - Outage decision-making: During an outage with incomplete information, how do you decide whether to roll back, roll forward, use a feature flag, or shift traffic?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 7

Interviewer:
Today interview 2026-07-06 - Similar scenario Terraform plan review: What checks would you add before Terraform apply to prevent accidental IAM or networking breakage?

Pause the video and answer this question aloud.

Senior Associate answer:
Require saved plan review in CI, highlighting IAM removals, firewall exposure, subnet/routing changes, deletions, and replacements. Add policy-as-code with OPA/Sentinel to block public ingress, broad admin roles, service account key creation, removal of critical IAM bindings, missing labels, or unapproved production deletes. Use least-privilege Terraform service accounts, separate states, manual approvals for prod, drift detection, and tests for modules. For high-risk resources, add change windows and break-glass rollback steps.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Today interview 2026-07-06 - Similar scenario Terraform plan review: What checks would you add before Terraform apply to prevent accidental IAM or networking breakage?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
Today interview 2026-07-06 - Similar scenario progressive mitigation: A bad release affects only 10 percent of users. How would you decide between rollback, canary pause, feature disablement, and traffic shifting?

Pause the video and answer this question aloud.

Senior Associate answer:
First freeze rollout and stop increasing exposure. If the issue maps to a feature flag, disable the feature because that is usually fastest and least disruptive. If the canary version is bad, roll it back or shift traffic back to the stable version. If only one region/cluster is affected, shift traffic to healthy capacity if available. Roll forward only if the fix is small, already tested, and faster than rollback. Validate recovery on user-impact metrics, not only pod health.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Today interview 2026-07-06 - Similar scenario progressive mitigation: A bad release affects only 10 percent of users. How would you decide between rollback, canary pause, feature disablement, and traffic shifting?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 49: Today AI/Python/Cloud/SRE Recap - Part 2.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
