# Episode 44: Resume Deep-Dive: GCP, Terraform, Kubernetes Platform Round

YouTube title: DevOps Mock Interview Practice | Episode 44: Resume Deep-Dive: GCP, Terraform, Kubernetes Platform Round

Estimated duration: 16-21 min

Source round: Mock Interview 44 - Resume Deep-Dive: GCP, Terraform, Kubernetes Platform Round (source set 44)

Focus: GCP landing zones, Terraform Enterprise modules, GKE administration, self-service infrastructure, Cloud Armor security, cost optimization, and 7-years-experience senior platform ownership, with a touch of MLOps

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Resume Deep-Dive: GCP, Terraform, Kubernetes Platform Round.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- GCP: Google Cloud Platform
- GKE: Google Kubernetes Engine
- GPU: Graphics Processing Unit
- IAM: Identity and Access Management
- MLOps: Machine Learning Operations
- RBAC: Role-Based Access Control
- VPC: Virtual Private Cloud
- WAF: Web Application Firewall

---

## Question 1

Interviewer:
Walk me through the GCP landing zone you designed, including project hierarchy, Shared VPC, IAM governance, and policy-as-code. What tradeoffs did you make?

Pause the video and answer this question aloud.

Senior Associate answer:
The landing zone used a folder hierarchy separating production and non-production environments, with a Shared VPC host project centralizing networking so application teams got isolated projects without owning network configuration themselves, and org policies enforced consistent guardrails (no public IPs by default, mandatory OS Login) inherited automatically by every new project. The main tradeoff was centralization versus team autonomy - centralizing networking and policy meant faster, more consistent onboarding but required a responsive platform team to handle exception requests quickly, or teams would feel blocked.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Walk me through the GCP landing zone you designed, including project hierarchy, Shared VPC, IAM governance, and policy-as-code. What tradeoffs did you make?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
You built reusable Terraform Enterprise modules for networking, IAM, GKE, monitoring, logging, load balancing, and security that cut provisioning effort by 70 percent. Walk me through how you designed and versioned those modules.

Pause the video and answer this question aloud.

Senior Associate answer:
Modules were designed around a minimal, opinionated interface - sensible secure defaults baked in, with only genuinely necessary parameters exposed as required inputs - so consuming teams didn't need deep GCP expertise to use them correctly. Each module was versioned semantically in the private registry, with breaking changes only introduced in major version bumps and clear migration notes, so teams could upgrade deliberately on their own schedule rather than being forced onto every change immediately, which is what made the 70% provisioning time reduction sustainable rather than a one-time win.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: You built reusable Terraform Enterprise modules for networking, IAM, GKE, monitoring, logging, load balancing, and security that cut provisioning effort by 70 percent. Walk me through how you designed and versioned those modules.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
You manage production GKE clusters including node pools, upgrades, autoscaling, and RBAC. Walk me through your process for a zero-downtime cluster upgrade.

Pause the video and answer this question aloud.

Senior Associate answer:
The process starts with upgrading the control plane (minimal disruption for regional clusters), then performing a surge upgrade on node pools where new nodes are created and workloads migrated before old nodes are drained, respecting PodDisruptionBudgets throughout so minimum replica availability is maintained. Every upgrade is tested against a staging cluster first with the same workload configuration, scheduled during a low-traffic window, and monitored closely with dashboards open so any regression is caught and can be paused or rolled back immediately.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: You manage production GKE clusters including node pools, upgrades, autoscaling, and RBAC. Walk me through your process for a zero-downtime cluster upgrade.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
You integrated Terraform Enterprise with Git-based CI/CD, Harness, Jira, and ServiceNow for self-service delivery. How did approvals and change management work end to end?

Pause the video and answer this question aloud.

Senior Associate answer:
A team's infrastructure request started as a pull request against a Terraform configuration repo, triggering a Terraform Enterprise plan automatically posted for review; approved plans applied through Harness pipelines with the actual apply gated behind a ServiceNow change request for anything touching production, linking the technical change to the formal change management process. Jira tracked the originating request end to end, so there was a single traceable thread from business request through technical review, formal approval, and final infrastructure change.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: You integrated Terraform Enterprise with Git-based CI/CD, Harness, Jira, and ServiceNow for self-service delivery. How did approvals and change management work end to end?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 5

Interviewer:
You designed Cloud Armor WAF policies with Adaptive Protection, rate limiting, and threat intelligence, plus IONIX and Stream Security for attack surface monitoring. Walk me through how these tools work together to stop an attack.

Pause the video and answer this question aloud.

Senior Associate answer:
Cloud Armor sits at the edge, blocking known attack patterns (OWASP rules) and using Adaptive Protection's machine learning to detect and mitigate anomalous traffic patterns like a novel DDoS pattern in real time, backed by threat intelligence feeds identifying known-bad source IPs. IONIX and Stream Security provide continuous external attack surface monitoring, identifying exposed assets or misconfigurations before an attacker finds them - together this creates layered coverage where attack surface monitoring reduces what's exposed to attack in the first place, and Cloud Armor defends what remains exposed at the point of attack.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: You designed Cloud Armor WAF policies with Adaptive Protection, rate limiting, and threat intelligence, plus IONIX and Stream Security for attack surface monitoring. Walk me through how these tools work together to stop an attack.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
You reduced GCP cost by 20 percent through governance, resource right-sizing, and capacity planning. Walk me through the specific levers you pulled and how you measured the savings.

Pause the video and answer this question aloud.

Senior Associate answer:
The main levers were rightsizing over-provisioned Compute Engine and GKE resources based on actual utilization data from Cloud Monitoring, purchasing committed use discounts for the stable baseline workload identified through historical usage analysis, and enforcing cost-allocation labels so waste (idle resources, forgotten test projects) became visible and attributable to specific teams for cleanup. Savings were measured by tracking month-over-month billing export data segmented by the specific optimization applied, isolating the impact of each lever rather than just observing an aggregate total-spend decrease.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: You reduced GCP cost by 20 percent through governance, resource right-sizing, and capacity planning. Walk me through the specific levers you pulled and how you measured the savings.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
You provisioned GPU-enabled GKE clusters with NVIDIA L4/A100 nodes. How did you handle node pool sizing, taints/tolerations, and spot/preemptible GPUs for cost control?

Pause the video and answer this question aloud.

Senior Associate answer:
Sized GPU node pools based on actual workload GPU-memory and compute requirements rather than over-provisioning by default, since GPU capacity is expensive and often scarce, and tainted the pools so only GPU-requesting workloads scheduled there, with matching tolerations on those specific deployments. Used spot/preemptible GPU instances for fault-tolerant training and batch inference workloads to cut cost significantly, reserving on-demand GPU capacity only for latency-sensitive real-time inference that couldn't tolerate preemption.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: You provisioned GPU-enabled GKE clusters with NVIDIA L4/A100 nodes. How did you handle node pool sizing, taints/tolerations, and spot/preemptible GPUs for cost control?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
At 7 years of experience, how would you demonstrate technical leadership across multiple teams during a platform migration, not just individual execution?

Pause the video and answer this question aloud.

Senior Associate answer:
Technical leadership at that level shows up as setting the migration strategy and phasing so risk is managed deliberately, not just executing tasks - defining the pattern other engineers follow, unblocking teams that hit shared dependencies, and communicating tradeoffs and progress to stakeholders so the migration stays aligned with business priorities. It also means mentoring less experienced engineers through the migration so the knowledge and capability spread beyond just the lead, rather than the migration's success depending entirely on one person's individual effort.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: At 7 years of experience, how would you demonstrate technical leadership across multiple teams during a platform migration, not just individual execution?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 44: Resume Deep-Dive: GCP, Terraform, Kubernetes Platform Round.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
