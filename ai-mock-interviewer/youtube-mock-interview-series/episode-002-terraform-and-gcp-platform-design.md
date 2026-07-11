# Episode 2: Terraform and GCP Platform Design

YouTube title: DevOps Mock Interview Practice | Episode 2: Terraform and GCP Platform Design

Estimated duration: 16-21 min

Source round: Mock Interview 2 - Terraform and GCP Platform Design (source set 2)

Focus: Terraform modules, state, landing zones, governance, IAM, policy as code

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Terraform and GCP Platform Design.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CPU: Central Processing Unit
- GCP: Google Cloud Platform
- GKE: Google Kubernetes Engine
- IaC: Infrastructure as Code
- IAM: Identity and Access Management
- SLA: Service Level Agreement
- SRE: Site Reliability Engineering
- TLS: Transport Layer Security
- VM: Virtual Machine
- VPC: Virtual Private Cloud

---

## Question 1

Interviewer:
Terraform expert: How would you design reusable Terraform modules for GCP networking, IAM, GKE, Cloud Run, observability, and security so teams can consume them safely?

Pause the video and answer this question aloud.

Senior Associate answer:
Design modules around a well-defined, minimal interface (clear required inputs, sane defaults for optional ones) that encodes your organization's best practices internally, so consuming teams don't need to know the low-level GCP resource details to use them correctly. Version modules semantically so teams can pin to a known-stable version and upgrade deliberately, keep security-sensitive defaults (like private-by-default networking) baked in rather than opt-in, and provide example usage and validation rules so misconfiguration fails fast at plan time rather than after apply.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Terraform expert: How would you design reusable Terraform modules for GCP networking, IAM, GKE, Cloud Run, observability, and security so teams can consume them safely?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 2

Interviewer:
Compute Engine operations: A Linux VM behind a load balancer has high CPU, many TIME_WAIT connections, and intermittent TLS errors. How would you debug it?

Pause the video and answer this question aloud.

Senior Associate answer:
High CPU plus many TIME_WAIT connections suggests the VM is opening far more short-lived connections than it can cleanly close - check whether the application or a misbehaving client is not reusing connections (missing keep-alive) and consider tuning `net.ipv4.tcp_tw_reuse` if genuinely needed. Intermittent TLS errors alongside this pattern often point to the VM running out of ephemeral ports or file descriptors under load; check `ss -s` for connection state counts and file descriptor limits, and correlate CPU spikes with TLS handshake volume to confirm the causal chain before changing kernel parameters.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Compute Engine operations: A Linux VM behind a load balancer has high CPU, many TIME_WAIT connections, and intermittent TLS errors. How would you debug it?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
IAM recommender: How would you use IAM Recommender and audit logs to reduce over-permissioned service accounts safely?

Pause the video and answer this question aloud.

Senior Associate answer:
Use IAM Recommender's suggestions (based on actual permission usage over the lookback window) as a starting point, but cross-reference with audit logs to confirm a permission genuinely wasn't used before removing it, since Recommender can miss infrequent-but-legitimate uses (quarterly jobs, disaster recovery paths). Apply reductions in a lower-risk environment first, monitor for breakage after applying in production, and prefer removing to a slightly broader-than-minimal role initially rather than the absolute narrowest, iterating down further once confident.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: IAM recommender: How would you use IAM Recommender and audit logs to reduce over-permissioned service accounts safely?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 4

Interviewer:
Developer experience: How would you measure whether your platform improves developer experience and delivery speed?

Pause the video and answer this question aloud.

Senior Associate answer:
Measure concrete, comparable metrics: time from code commit to production deployment, time to provision a new service from scratch, percentage of infrastructure needs met via self-service versus tickets, and developer satisfaction via periodic surveys correlated with actual usage data. Track these over time and by team so you can see whether platform investments are actually moving the numbers, rather than relying on anecdotal feedback alone.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Developer experience: How would you measure whether your platform improves developer experience and delivery speed?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 5

Interviewer:
Capacity incident: A regional capacity shortage affects node pool scaling. How would you mitigate and redesign for resilience?

Pause the video and answer this question aloud.

Senior Associate answer:
Immediate mitigation means shifting load to a region/zone with available capacity if the architecture supports it, or requesting a capacity increase/using a different machine type that has availability. For redesign, reserve capacity ahead of need for critical workloads (committed use or reservations), design workloads to tolerate running across multiple zones/regions so a single-region shortage doesn't block scaling entirely, and build alerting on capacity trends so a shortage is anticipated before it becomes an incident.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Capacity incident: A regional capacity shortage affects node pool scaling. How would you mitigate and redesign for resilience?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
VPC Service Controls: When would you use VPC Service Controls, what problems does it solve, and what operational pain can it introduce?

Pause the video and answer this question aloud.

Senior Associate answer:
Use VPC Service Controls when you need to prevent data exfiltration from managed GCP services (like someone copying data from an internal BigQuery dataset to a personal GCP project) by creating a security perimeter around resources regardless of IAM permissions. It solves a real gap that IAM alone doesn't cover, but it introduces operational pain when legitimate cross-perimeter access (a partner integration, a new internal service outside the perimeter) breaks unexpectedly and requires explicit bridge rules or access levels to fix, which can be a slow, easy-to-misconfigure process if not planned for upfront.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: VPC Service Controls: When would you use VPC Service Controls, what problems does it solve, and what operational pain can it introduce?

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 7

Interviewer:
GKE multi-cluster: When would you use multiple GKE clusters versus one shared cluster, and how would you handle traffic, identity, policy, and operations?

Pause the video and answer this question aloud.

Senior Associate answer:
Use multiple clusters for strong isolation requirements (regulatory separation, blast-radius limiting between critical and non-critical workloads, or true multi-region active-active), and a shared cluster with strong namespace isolation when the isolation needs are softer and the operational overhead of managing many clusters outweighs the benefit. Multi-cluster requires a strategy for cross-cluster traffic (multi-cluster service mesh or a global load balancer), consistent identity (a shared Workload Identity/IAM approach), and centrally-enforced policy (Config Sync/Anthos Config Management) so clusters don't drift into inconsistent configurations.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: GKE multi-cluster: When would you use multiple GKE clusters versus one shared cluster, and how would you handle traffic, identity, policy, and operations?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 8

Interviewer:
BigQuery/data reliability: How would you approach BigQuery or data pipeline reliability when platform teams own infrastructure but data teams own pipelines?

Pause the video and answer this question aloud.

Senior Associate answer:
Define a clear ownership boundary: the platform team owns the underlying infrastructure reliability (BigQuery slots/reservations, network, IAM, monitoring infrastructure), while data teams own pipeline correctness and SLAs for their specific datasets, with a shared on-call escalation path when it's unclear which side an issue belongs to. Provide data teams with self-service observability (query performance dashboards, pipeline SLA tracking) so they can own their reliability without needing platform team involvement for every issue, and establish a joint review process for changes that cross the boundary (like a reservation resize affecting multiple pipelines).

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: BigQuery/data reliability: How would you approach BigQuery or data pipeline reliability when platform teams own infrastructure but data teams own pipelines?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 2: Terraform and GCP Platform Design.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
