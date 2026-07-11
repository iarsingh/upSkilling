# Episode 5: Cloud Security and DevSecOps

YouTube title: DevOps Mock Interview Practice | Episode 5: Cloud Security and DevSecOps

Estimated duration: 16-21 min

Source round: Mock Interview 5 - Cloud Security and DevSecOps (source set 5)

Focus: IAM, Workload Identity, secrets, supply chain, policy, vulnerability management

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Cloud Security and DevSecOps.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- BGP: Border Gateway Protocol
- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- CPU: Central Processing Unit
- DNS: Domain Name System
- GCP: Google Cloud Platform
- GKE: Google Kubernetes Engine
- HPA: Horizontal Pod Autoscaler
- HTTPS: Hypertext Transfer Protocol Secure
- IaC: Infrastructure as Code
- IAM: Identity and Access Management
- IDP: Internal Developer Platform
- OPA: Open Policy Agent
- SLO: Service Level Objective
- VPN: Virtual Private Network
- WAF: Web Application Firewall

---

## Question 1

Interviewer:
Supply chain security: How would you implement image scanning, provenance, Binary Authorization, SBOMs, and deployment policies for containers?

Pause the video and answer this question aloud.

Senior Associate answer:
Scan every image for vulnerabilities at build time and continuously in the registry, generate an SBOM (software bill of materials) as part of the build so you know exactly what's in each image, and produce signed build provenance attesting to the source commit and build system. Configure Binary Authorization to reject any image at deploy time that isn't signed by your trusted CI pipeline with valid attestations, closing the gap where someone could otherwise push and run an unverified image directly.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: Supply chain security: How would you implement image scanning, provenance, Binary Authorization, SBOMs, and deployment policies for containers?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 2

Interviewer:
Container startup: A container works locally but fails in Kubernetes. How would you debug entrypoint, env vars, filesystem, permissions, and security context?

Pause the video and answer this question aloud.

Senior Associate answer:
Check `kubectl describe pod` and `kubectl logs` first for the exact failure reason, then verify all environment variables/ConfigMaps/Secrets referenced in the pod spec are actually present (a common gap versus local `docker run` where you might pass a local .env file). Check whether the pod's securityContext (runAsNonRoot, read-only root filesystem) is causing a permission failure the local run didn't have, and confirm the entrypoint command doesn't assume an interactive TTY or a working directory that doesn't exist in the Kubernetes-provided filesystem.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Container startup: A container works locally but fails in Kubernetes. How would you debug entrypoint, env vars, filesystem, permissions, and security context?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 3

Interviewer:
Terraform Enterprise: Explain how you would implement Terraform Enterprise workspaces, remote state, policy as code, approvals, and module versioning for a large GCP platform.

Pause the video and answer this question aloud.

Senior Associate answer:
Structure workspaces per environment/team with clear naming conventions, use Terraform Enterprise's built-in remote state management with access controls per workspace, and enforce Sentinel policies (or OPA) that validate plans against organizational guardrails before allowing apply. Require approval workflows on production workspaces so a plan must be reviewed before apply executes, and publish shared modules to the private registry with semantic versioning so teams consume tested, versioned infrastructure code rather than copy-pasting Terraform.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Terraform Enterprise: Explain how you would implement Terraform Enterprise workspaces, remote state, policy as code, approvals, and module versioning for a large GCP platform.

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 4

Interviewer:
Hybrid connectivity: A service is slow over VPN or Interconnect. How would you troubleshoot latency, MTU, routes, BGP, firewall rules, and DNS?

Pause the video and answer this question aloud.

Senior Associate answer:
Measure baseline latency and packet loss over the connection first to establish whether it's a genuine network problem or an application-level issue, then check for MTU-related fragmentation (large packets failing while small ones succeed is a classic sign) and verify BGP routes are advertising and being learned correctly if using dynamic routing. Confirm firewall rules aren't introducing extra hops or being hit inefficiently, and check DNS resolution time separately from data-plane latency, since a slow DNS lookup can masquerade as general connection slowness.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: Hybrid connectivity: A service is slow over VPN or Interconnect. How would you troubleshoot latency, MTU, routes, BGP, firewall rules, and DNS?

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 5

Interviewer:
Backstage and IDP: How would you design a Backstage-style golden path for creating a new service on GCP with CI/CD, Terraform, monitoring, and security?

Pause the video and answer this question aloud.

Senior Associate answer:
Build a software template that scaffolds a new service repository with a working CI/CD pipeline, pre-configured Terraform module calls for the standard infrastructure (GKE deployment, monitoring dashboards, IAM), and baseline security controls already wired in, so a developer running the template gets a production-ready starting point in minutes. Register the resulting service automatically in the catalog with ownership metadata, and keep the template itself versioned so it can improve over time without breaking services already scaffolded from an earlier version.

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: Backstage and IDP: How would you design a Backstage-style golden path for creating a new service on GCP with CI/CD, Terraform, monitoring, and security?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 6

Interviewer:
Observability platform: How would you design observability for a platform team so developers get useful golden signals without creating noisy alerts?

Pause the video and answer this question aloud.

Senior Associate answer:
Provide a standard, auto-instrumented golden-signals dashboard (latency, traffic, errors, saturation) for every service by default via the golden path template, so developers get useful observability without manually setting it up. Keep alerting centered on SLO burn rate and clear user-impact thresholds rather than raw infrastructure metrics, and give teams self-service ability to add custom alerts for their own signals without needing the platform team to gatekeep every alerting rule.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: Observability platform: How would you design observability for a platform team so developers get useful golden signals without creating noisy alerts?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 7

Interviewer:
Cloud Armor: Design a Cloud Armor and load balancing strategy for an internet-facing service. How would you handle WAF rules, rate limits, exceptions, and observability?

Pause the video and answer this question aloud.

Senior Associate answer:
Front the service with a global external HTTPS load balancer and Cloud Armor configured with the managed WAF rule set (OWASP-style protections) plus rate limiting to blunt volumetric abuse, starting new rules in preview/dry-run mode to catch false positives before enforcing. Handle exceptions narrowly and with documented justification and review dates, and monitor Cloud Armor logs and metrics (blocked request counts, rule hit rates) so you can tune rules based on real traffic patterns rather than guessing.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: Cloud Armor: Design a Cloud Armor and load balancing strategy for an internet-facing service. How would you handle WAF rules, rate limits, exceptions, and observability?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 8

Interviewer:
Autoscaling tradeoffs: Explain HPA, VPA, and cluster autoscaler. When can they conflict, and how would you tune them for a production workload?

Pause the video and answer this question aloud.

Senior Associate answer:
HPA scales the number of pod replicas based on metrics (CPU, custom metrics), VPA adjusts individual pod resource requests/limits, and cluster autoscaler adds/removes nodes based on unschedulable pods or underutilized nodes - they operate at different layers but can conflict if HPA and VPA are both actively resizing/rescaling the same workload simultaneously, causing thrashing. Generally use HPA for stateless services that scale well horizontally, avoid running HPA and VPA on CPU/memory simultaneously for the same workload (use VPA in recommendation-only mode instead), and ensure cluster autoscaler's node pool limits are generous enough not to bottleneck HPA's scaling decisions.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Autoscaling tradeoffs: Explain HPA, VPA, and cluster autoscaler. When can they conflict, and how would you tune them for a production workload?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Closing

That completes Episode 5: Cloud Security and DevSecOps.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
