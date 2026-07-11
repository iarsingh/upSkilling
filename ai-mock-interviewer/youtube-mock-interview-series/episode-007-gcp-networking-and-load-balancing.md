# Episode 7: GCP Networking and Load Balancing

YouTube title: DevOps Mock Interview Practice | Episode 7: GCP Networking and Load Balancing

Estimated duration: 16-21 min

Source round: Mock Interview 7 - GCP Networking and Load Balancing (source set 7)

Focus: VPC, DNS, load balancers, firewall, interconnect, service networking

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing GCP Networking and Load Balancing.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CPU: Central Processing Unit
- DNS: Domain Name System
- GCP: Google Cloud Platform
- GKE: Google Kubernetes Engine
- GPU: Graphics Processing Unit
- HA: High Availability
- HPA: Horizontal Pod Autoscaler
- IAM: Identity and Access Management
- RBAC: Role-Based Access Control
- SRE: Site Reliability Engineering
- TTL: Time To Live
- VPC: Virtual Private Cloud

---

## Question 1

Interviewer:
GKE troubleshooting: A critical service on GKE has intermittent 5xx errors during traffic spikes. Walk me through your debugging approach from load balancer to pod-level metrics.

Pause the video and answer this question aloud.

Senior Associate answer:
Check load balancer backend health and latency metrics first to see if the errors originate there (unhealthy backends during a spike, often from insufficient replicas) versus at the application layer. Check HPA scaling behavior - if pods aren't scaling fast enough to absorb the spike, requests queue and time out - and check pod-level CPU/memory saturation and any connection pool limits (database, downstream services) that could be the actual bottleneck once traffic exceeds current capacity.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: GKE troubleshooting: A critical service on GKE has intermittent 5xx errors during traffic spikes. Walk me through your debugging approach from load balancer to pod-level metrics.

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 2

Interviewer:
Cloud Run security: How would you expose an internal Cloud Run service securely using IAM, ingress settings, VPC connector, load balancer, and service-to-service auth?

Pause the video and answer this question aloud.

Senior Associate answer:
Set Cloud Run ingress to 'internal' or 'internal and load balancing' so it's not reachable from the public internet directly, and require IAM authentication (not allUsers) so only explicitly authorized service accounts can invoke it. Use a Serverless VPC Access connector if the service needs to reach VPC-internal resources, and for service-to-service calls, use signed ID tokens from the calling service's identity so the receiving Cloud Run service can verify the caller's identity rather than trusting network position alone.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Cloud Run security: How would you expose an internal Cloud Run service securely using IAM, ingress settings, VPC connector, load balancer, and service-to-service auth?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
Pub/Sub incident: A downstream service outage caused Pub/Sub backlog. How would you recover safely without overloading dependencies or losing messages?

Pause the video and answer this question aloud.

Senior Associate answer:
Let messages accumulate in the subscription (Pub/Sub retains unacked messages up to the configured retention period) rather than dropping them, and once the downstream dependency recovers, ramp consumer concurrency up gradually rather than processing the entire backlog at max speed immediately, which could overwhelm the just-recovered dependency again. Monitor the downstream service's health metrics during backlog drain and throttle consumption if it shows signs of stress, and verify no messages were lost by checking the subscription's message count trends before and after.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Pub/Sub incident: A downstream service outage caused Pub/Sub backlog. How would you recover safely without overloading dependencies or losing messages?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
GKE expert: You are asked to design a production GKE platform for multiple product teams. How would you structure clusters, node pools, namespaces, IAM, networking, and deployment ownership?

Pause the video and answer this question aloud.

Senior Associate answer:
Use a shared cluster per environment (or region) with namespace-per-team isolation enforced by ResourceQuotas, NetworkPolicies, and RBAC scoped to each team's namespace, rather than a cluster per team unless strong isolation genuinely requires it. Structure node pools by workload characteristics (general-purpose, GPU, spot-tolerant batch) shared across teams for efficiency, centralize networking via Shared VPC, and give each team ownership of their namespace's deployments through GitOps while the platform team owns cluster-level configuration and upgrades.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: GKE expert: You are asked to design a production GKE platform for multiple product teams. How would you structure clusters, node pools, namespaces, IAM, networking, and deployment ownership?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 5

Interviewer:
Commitment planning: How would you decide whether to buy committed use discounts or reservations for GKE/Compute workloads?

Pause the video and answer this question aloud.

Senior Associate answer:
Analyze historical usage trends to identify the stable, predictable baseline load (a good candidate for committed use discounts) versus the variable, spiky portion (better served on-demand or with spot instances), and commit only to the baseline you're confident will persist for the commitment term, since over-committing locks in cost without the usage to justify it. Review commitment utilization regularly and adjust future purchases based on actual growth versus forecast, treating it as an ongoing FinOps practice rather than a one-time decision.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Commitment planning: How would you decide whether to buy committed use discounts or reservations for GKE/Compute workloads?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 6

Interviewer:
OpenTelemetry: How would you roll out OpenTelemetry across services and connect traces, metrics, logs, dashboards, and alerts?

Pause the video and answer this question aloud.

Senior Associate answer:
Roll out incrementally starting with the highest-traffic or most operationally important services first, using auto-instrumentation where available to minimize per-service code changes, and standardize on consistent resource attributes (service name, version, environment) so telemetry correlates correctly across services. Route all signals through an OpenTelemetry Collector to a unified backend so traces, metrics, and logs can be correlated by trace ID, and build dashboards/alerts on top of that unified data rather than maintaining separate, disconnected tooling per signal type.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: OpenTelemetry: How would you roll out OpenTelemetry across services and connect traces, metrics, logs, dashboards, and alerts?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 7

Interviewer:
Cloud DNS: A production service intermittently resolves to an old endpoint. How would you debug DNS TTLs, Cloud DNS records, caches, split-horizon DNS, and client behavior?

Pause the video and answer this question aloud.

Senior Associate answer:
Check the actual TTL configured on the DNS record first - a long TTL means clients and resolvers legitimately cache the old value for that duration after a change, which is often the real cause rather than a DNS bug. Verify the Cloud DNS record itself is correct and fully propagated, check for split-horizon DNS misconfiguration if internal and external resolution differ unexpectedly, and check client-side DNS caching behavior (some client libraries or OS-level resolvers cache more aggressively than the TTL suggests) as a separate layer to rule out.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: Cloud DNS: A production service intermittently resolves to an old endpoint. How would you debug DNS TTLs, Cloud DNS records, caches, split-horizon DNS, and client behavior?

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 8

Interviewer:
AlloyDB design: When would you choose AlloyDB over Cloud SQL, and what operational considerations would you discuss for HA, backups, scaling, and cost?

Pause the video and answer this question aloud.

Senior Associate answer:
Choose AlloyDB when you need significantly higher performance for PostgreSQL-compatible workloads (AlloyDB's columnar engine accelerates analytical queries substantially) or need better read scalability with its read pool architecture; choose Cloud SQL for simpler, lower-cost workloads where AlloyDB's added capability isn't needed. Operationally, both support automated backups and HA configurations, but AlloyDB's architecture (separating compute and storage) changes how you think about scaling reads independently of writes, and its cost profile is generally higher, so the decision should be justified by an actual performance or scale requirement, not used as a default upgrade.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: AlloyDB design: When would you choose AlloyDB over Cloud SQL, and what operational considerations would you discuss for HA, backups, scaling, and cost?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 7: GCP Networking and Load Balancing.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
