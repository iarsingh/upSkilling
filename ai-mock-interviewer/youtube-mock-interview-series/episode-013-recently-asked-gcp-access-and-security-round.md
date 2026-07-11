# Episode 13: Recently Asked GCP Access and Security Round

YouTube title: DevOps Mock Interview Practice | Episode 13: Recently Asked GCP Access and Security Round

Estimated duration: 16-21 min

Source round: Mock Interview 13 - Recently Asked GCP Access and Security Round (source set 13)

Focus: Compute Engine SSH, GKE identity, service account keys, signed images, hybrid networking, security, and logging

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Recently Asked GCP Access and Security Round.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- API: Application Programming Interface
- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- GCP: Google Cloud Platform
- GKE: Google Kubernetes Engine
- IAM: Identity and Access Management
- IP: Internet Protocol
- UI: User Interface
- VM: Virtual Machine
- VPC: Virtual Private Cloud
- VPN: Virtual Private Network

---

## Question 1

Interviewer:
Compute Engine SSH troubleshooting: You are not able to SSH into a Compute Engine instance. What could be the reasons, and how would you troubleshoot it?

Pause the video and answer this question aloud.

Senior Associate answer:
Common causes are a missing or misconfigured firewall rule allowing SSH (port 22) from your source IP, the instance lacking a public IP (or you not using IAP tunneling for private instances), an SSH key mismatch (metadata key not propagated or wrong key used), or the instance itself being unhealthy (boot disk full, OS-level SSH daemon not running). Troubleshoot by checking firewall rules and the instance's serial console output for boot/SSH daemon errors, verifying the SSH key in project/instance metadata matches what you're using, and confirming network connectivity (VPC routes, Private Google Access if using IAP) is correctly configured.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Compute Engine SSH troubleshooting: You are not able to SSH into a Compute Engine instance. What could be the reasons, and how would you troubleshoot it?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
Compute Engine SSH access: What do we get when we SSH into a Compute Engine instance?

Pause the video and answer this question aloud.

Senior Associate answer:
You get a standard Linux (or Windows via RDP) shell session on the VM with the permissions of the OS-level user account associated with your SSH key or IAM-based OS Login identity, giving you the same kind of access you'd have on any Linux server - the ability to run commands, inspect processes, view logs, and manage the instance's local filesystem and configuration.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Compute Engine SSH access: What do we get when we SSH into a Compute Engine instance?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
GKE Workload Identity: You have workloads running on GKE. How would you give only one pod access to Cloud Storage?

Pause the video and answer this question aloud.

Senior Associate answer:
Create a dedicated Kubernetes ServiceAccount used only by that specific pod's deployment, bind it via Workload Identity to a GCP service account granted only the specific Cloud Storage IAM role needed (e.g. objectViewer on a specific bucket, not project-wide Storage access), and ensure no other pods reference that Kubernetes ServiceAccount. This way only the intended pod inherits the GCP permissions, while other pods in the cluster using the default or their own service accounts have no access to that bucket.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: GKE Workload Identity: You have workloads running on GKE. How would you give only one pod access to Cloud Storage?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 4

Interviewer:
Service account key security: You know about service account JSON keys. Even if someone has the JSON key, how can you prevent them from creating or accessing resources?

Pause the video and answer this question aloud.

Senior Associate answer:
The most effective prevention is not having long-lived JSON keys at all - use Workload Identity or Workload Identity Federation so there's no static key to steal in the first place. If keys must exist, minimize the blast radius by granting the service account only narrowly-scoped, least-privilege IAM roles, set key expiration and rotate regularly, use VPC Service Controls to restrict what the key can access even with valid credentials, and monitor audit logs for anomalous usage patterns (unusual location, unusual API calls) that would indicate a stolen key being used.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: Service account key security: You know about service account JSON keys. Even if someone has the JSON key, how can you prevent them from creating or accessing resources?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 5

Interviewer:
GKE image verification: In GKE, anyone can deploy a Docker image. How would you ensure that only verified and signed images are deployed?

Pause the video and answer this question aloud.

Senior Associate answer:
Enable Binary Authorization on the cluster with a policy requiring every image to carry a valid attestation from your trusted CI/CD pipeline before it's allowed to run, so even someone with cluster deploy permissions can't run an arbitrary unverified image - the admission controller blocks it. Sign images with cosign as part of the CI build process, and configure the Binary Authorization policy to check that signature/attestation chain automatically at deploy time.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: GKE image verification: In GKE, anyone can deploy a Docker image. How would you ensure that only verified and signed images are deployed?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 6

Interviewer:
Hybrid connectivity: How do you connect an on-premises network to a GCP network?

Pause the video and answer this question aloud.

Senior Associate answer:
The main options are Cloud VPN (IPsec tunnels over the public internet, simplest to set up but with internet-dependent latency/bandwidth), Dedicated Interconnect (a direct physical connection to Google's network for high bandwidth and low latency), and Partner Interconnect (connecting through a supported service provider when a direct physical connection isn't practical). Choose based on required bandwidth, latency sensitivity, and budget - VPN for lower-traffic or quick setup, Interconnect for production-grade, high-bandwidth hybrid connectivity.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: Hybrid connectivity: How do you connect an on-premises network to a GCP network?

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 7

Interviewer:
GCP security baseline: What additional security measures would you implement for the GCP environment?

Pause the video and answer this question aloud.

Senior Associate answer:
Beyond basic IAM hygiene, implement org policies restricting public IPs and enforcing OS Login, enable VPC Service Controls for sensitive data perimeters, turn on Security Command Center for continuous posture monitoring, enforce Binary Authorization for container deployments, and ensure audit logging is enabled and retained for all projects. Layer in Cloud Armor for internet-facing services and regular access reviews using IAM Recommender to catch permission creep before it becomes a real exposure.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: GCP security baseline: What additional security measures would you implement for the GCP environment?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 8

Interviewer:
Cloud Logging analysis: You have logs in Cloud Logging. How would you analyze them?

Pause the video and answer this question aloud.

Senior Associate answer:
Use Cloud Logging's query language (Logging Query Language) to filter by severity, resource type, and specific fields, and build log-based metrics for patterns you want to track over time (error rate by service, specific exception types). For deeper analysis, export logs to BigQuery and run SQL queries for aggregation and trend analysis that the Logging UI doesn't support well, or route them to a sink feeding a dedicated analysis tool if the team needs more advanced search/visualization than Cloud Logging natively provides.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: Cloud Logging analysis: You have logs in Cloud Logging. How would you analyze them?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Closing

That completes Episode 13: Recently Asked GCP Access and Security Round.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
