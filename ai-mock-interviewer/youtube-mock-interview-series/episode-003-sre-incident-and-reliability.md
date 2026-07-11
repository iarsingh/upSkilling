# Episode 3: SRE Incident and Reliability

YouTube title: DevOps Mock Interview Practice | Episode 3: SRE Incident and Reliability

Estimated duration: 16-21 min

Source round: Mock Interview 3 - SRE Incident and Reliability (source set 3)

Focus: SLI/SLO, error budget, incident command, RCA, capacity, DR

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing SRE Incident and Reliability.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- DR: Disaster Recovery
- GCP: Google Cloud Platform
- IAM: Identity and Access Management
- RCA: Root Cause Analysis
- SLA: Service Level Agreement
- SLI: Service Level Indicator
- SLO: Service Level Objective
- SRE: Site Reliability Engineering
- TLS: Transport Layer Security
- VM: Virtual Machine

---

## Question 1

Interviewer:
Alert fatigue: You inherit 500 alerts and noisy on-call. How would you rationalize alerts using SLOs and ownership?

Pause the video and answer this question aloud.

Senior Associate answer:
Start by measuring which alerts actually fire and how often they lead to real action versus being acknowledged and ignored - this data alone usually reveals which 80% of alerts to cut or tune first. Rebuild the remaining alert set around SLO burn rate and clear user-impact signals rather than low-level infrastructure metrics, assign every surviving alert an explicit owning team, and require a runbook link on each one; anything that can't meet that bar gets deleted or demoted to a non-paging dashboard signal.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Alert fatigue: You inherit 500 alerts and noisy on-call. How would you rationalize alerts using SLOs and ownership?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
Observability maturity: How would you assess whether an organization has mature observability or just many dashboards?

Pause the video and answer this question aloud.

Senior Associate answer:
Mature observability means teams can answer 'why is this happening' quickly during an incident using correlated logs, metrics, and traces, not just look at pretty dashboards that were built once and never revisited. Assess it by checking: are SLOs defined and tied to alerts, can engineers trace a request end-to-end across services, is there a consistent structured logging/correlation ID standard, and - the real test - how quickly did the last few incidents actually get root-caused using the existing tooling versus relying on ad-hoc debugging.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: Observability maturity: How would you assess whether an organization has mature observability or just many dashboards?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 3

Interviewer:
TLS rotation: How would you rotate TLS certificates for production ingress without downtime?

Pause the video and answer this question aloud.

Senior Associate answer:
Use a certificate manager (Google-managed certificates, or cert-manager in Kubernetes) that automates renewal well before expiry rather than manual rotation, and ensure the load balancer/ingress supports hot certificate reload so serving traffic isn't interrupted during the swap. Monitor certificate expiry proactively with alerts at multiple thresholds (30/14/3 days) as a safety net in case automated renewal fails, and always validate the new certificate is actually being served correctly (not just issued) before considering the rotation complete.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: TLS rotation: How would you rotate TLS certificates for production ingress without downtime?

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 4

Interviewer:
Artifact Registry: How would you design Artifact Registry repositories, IAM, cleanup policies, scanning, and promotion between environments?

Pause the video and answer this question aloud.

Senior Associate answer:
Structure repositories by purpose/environment (e.g. separate dev and production repositories) with IAM scoped so only CI/CD service accounts can write, and cleanup policies that automatically remove old, untagged, or unpromoted images past a retention window to control storage cost. Enable automatic vulnerability scanning on push, and promote images between environments by copying the exact digest (not rebuilding) so what was scanned and tested in dev is bit-for-bit what reaches production.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Artifact Registry: How would you design Artifact Registry repositories, IAM, cleanup policies, scanning, and promotion between environments?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 5

Interviewer:
Immutable infrastructure: What does immutable infrastructure mean in cloud platforms, and when is mutable infrastructure still acceptable?

Pause the video and answer this question aloud.

Senior Associate answer:
Immutable infrastructure means you never modify a running instance/container in place - instead you build a new image/artifact with the change and replace the old one entirely, which eliminates configuration drift and makes rollback trivial (redeploy the previous artifact). Mutable infrastructure is still acceptable for things that are genuinely stateful and expensive to recreate, like a long-lived database VM where in-place patching is more practical than a full rebuild-and-migrate cycle, though even there, automation and consistent configuration management reduce the risk mutability introduces.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Immutable infrastructure: What does immutable infrastructure mean in cloud platforms, and when is mutable infrastructure still acceptable?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
CI/CD design: Design a safe promotion workflow from commit to production using GitHub Actions, Cloud Build, Jenkins, artifact promotion, approvals, and rollback.

Pause the video and answer this question aloud.

Senior Associate answer:
Trigger CI on commit to build, test, and produce one immutable artifact tagged with the git SHA, scan it for vulnerabilities, and promote that exact artifact through dev -> staging -> production by updating deployment references rather than rebuilding. Gate production promotion behind a required approval (a human reviewer or automated staging metric check), and keep the previous production artifact reference readily available so rollback is a fast, low-risk redeploy rather than a new build under pressure.

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: CI/CD design: Design a safe promotion workflow from commit to production using GitHub Actions, Cloud Build, Jenkins, artifact promotion, approvals, and rollback.

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 7

Interviewer:
SLO burn rate: Explain multi-window multi-burn-rate alerting and how you would tune alerts for fast and slow burns.

Pause the video and answer this question aloud.

Senior Associate answer:
Multi-window multi-burn-rate alerting pages on a combination of a short window (catches fast, severe budget consumption quickly) and a longer window (confirms the burn is sustained, not a brief blip) evaluated together, which reduces both false positives from transient spikes and false negatives from slow-but-real degradation. Tune fast-burn alerts to page immediately at a high burn rate over a short window (e.g. consuming a day's budget in an hour), and slow-burn alerts to create a lower-urgency ticket for sustained moderate consumption over a longer window (e.g. a few days), since the appropriate urgency differs.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: SLO burn rate: Explain multi-window multi-burn-rate alerting and how you would tune alerts for fast and slow burns.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
Cloud Composer/Dataflow: A scheduled data pipeline misses its SLA and downstream dashboards are stale. How would you debug Composer, Dataflow, BigQuery, retries, backfills, and alerting?

Pause the video and answer this question aloud.

Senior Associate answer:
Check the Composer/Airflow DAG run history first to see exactly where the pipeline stalled or failed, then check the underlying Dataflow job's worker autoscaling and any stuck/slow stages if the DAG delegated to Dataflow. Verify whether a transient upstream failure triggered retries that pushed the run past the SLA window, check if a backfill is needed to catch downstream tables up, and once resolved, add alerting on the DAG's SLA directly (Airflow supports SLA misses as a first-class alert) rather than only discovering staleness from downstream dashboard complaints.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: Cloud Composer/Dataflow: A scheduled data pipeline misses its SLA and downstream dashboards are stale. How would you debug Composer, Dataflow, BigQuery, retries, backfills, and alerting?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Closing

That completes Episode 3: SRE Incident and Reliability.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
