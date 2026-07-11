# Episode 22: Monitoring and Scenario Round

YouTube title: DevOps Mock Interview Practice | Episode 22: Monitoring and Scenario Round

Estimated duration: 16-21 min

Source round: Mock Interview 22 - Monitoring and Scenario Round (source set 22)

Focus: monitoring tools, alerts, production troubleshooting, resource usage, failed deployments, app access, migration, HA, security, and DR

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Monitoring and Scenario Round.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- CPU: Central Processing Unit
- DNS: Domain Name System
- DR: Disaster Recovery
- ELK: Elasticsearch, Logstash, and Kibana
- GCP: Google Cloud Platform
- HA: High Availability
- RPO: Recovery Point Objective
- RTO: Recovery Time Objective
- SLO: Service Level Objective
- SRE: Site Reliability Engineering
- VPN: Virtual Private Network

---

## Question 1

Interviewer:
Monitoring tools: Which monitoring tools have you used in production?

Pause the video and answer this question aloud.

Senior Associate answer:
A typical production stack combines Prometheus and Grafana for metrics and dashboards, Cloud Logging/ELK for centralized logs, OpenTelemetry-based distributed tracing, and Cloud Monitoring for GCP-native infrastructure metrics and alerting - the specific combination depends on the environment, but the underlying principle is always correlating metrics, logs, and traces so an incident can be diagnosed from a single, connected view rather than jumping between disconnected tools.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: Monitoring tools: Which monitoring tools have you used in production?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 2

Interviewer:
Alert creation: How do you create useful alerts without creating noise?

Pause the video and answer this question aloud.

Senior Associate answer:
Alert on symptoms that directly indicate user impact (error rate, latency breach, SLO burn) rather than every underlying cause, require every alert to have a clear owner and actionable runbook, and use burn-rate or trend-based thresholds rather than static values that trigger on normal variance. Periodically review which alerts fire without leading to action and remove or fix them, since that's the leading cause of alert fatigue.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: Alert creation: How do you create useful alerts without creating noise?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 3

Interviewer:
Production troubleshooting: How do you troubleshoot production issues end to end?

Pause the video and answer this question aloud.

Senior Associate answer:
Start by confirming and scoping actual user impact before diving into root cause, then work through the request path systematically (load balancer, application, dependencies, infrastructure) using metrics, logs, and traces to narrow down where the failure originates rather than guessing. Mitigate impact first (rollback, scale, failover) if a fix isn't immediately obvious, and only pursue deep root-cause analysis once user impact is under control, closing with a postmortem that turns the finding into prevention.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Production troubleshooting: How do you troubleshoot production issues end to end?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
High CPU or memory: How do you investigate high CPU or memory usage?

Pause the video and answer this question aloud.

Senior Associate answer:
Check whether the spike correlates with a recent deployment, traffic increase, or a specific scheduled job, and use profiling tools (py-spy, pprof, or APM tooling) to identify which code path is actually consuming the resource rather than guessing. For memory specifically, distinguish a genuine leak (steadily growing, never released) from expected high but stable usage (a large cache), since the fix differs completely between the two.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: High CPU or memory: How do you investigate high CPU or memory usage?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 5

Interviewer:
Failed production deployment: A production deployment failed. What steps would you take?

Pause the video and answer this question aloud.

Senior Associate answer:
First assess actual user impact and roll back immediately if there's any risk of ongoing harm, rather than debugging live while users are affected. Once stable, review deployment logs and the specific failure point to understand root cause, verify whether the rollback itself was clean (no partial state left behind), and only attempt to redeploy the fix after confirming the actual cause and adding whatever test or gate would have caught it beforehand.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Failed production deployment: A production deployment failed. What steps would you take?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
Application inaccessible after deployment: Users cannot access the application after deployment. How would you debug it?

Pause the video and answer this question aloud.

Senior Associate answer:
Check the deployment status first (did pods/instances actually become healthy, or are they crashing/pending), then work outward through the request path - service endpoints, load balancer backend health, DNS - to find where connectivity breaks. A very common cause is a health check or readiness probe misconfiguration that prevents new pods from ever being marked ready, which silently keeps them out of the Service's endpoint list even though they appear to be running.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Application inaccessible after deployment: Users cannot access the application after deployment. How would you debug it?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
On-prem to GCP migration: How would you migrate an application from on-premises to GCP?

Pause the video and answer this question aloud.

Senior Associate answer:
Establish hybrid connectivity first (VPN or Interconnect), replicate data continuously rather than a one-time dump so the GCP environment stays current, and build out CI/CD, observability, and security in GCP before cutover so the new environment is production-ready from day one. Cut over gradually (a subset of traffic or a maintenance window) with the on-premises environment kept available as a rollback option until the GCP side has proven stable under real production load.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: On-prem to GCP migration: How would you migrate an application from on-premises to GCP?

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 8

Interviewer:
Disaster recovery: How would you implement disaster recovery?

Pause the video and answer this question aloud.

Senior Associate answer:
Define RTO/RPO targets from actual business impact analysis, implement backup or replication matching those targets (nightly backups for a lenient RPO, continuous replication for a near-zero one), and design failover procedures - ideally automated - for the compute and networking layers. Test the entire procedure with real drills regularly, since a plan that's only ever been reviewed on paper is not a validated disaster recovery capability.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Disaster recovery: How would you implement disaster recovery?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 22: Monitoring and Scenario Round.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
