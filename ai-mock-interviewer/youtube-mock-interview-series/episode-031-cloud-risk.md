# Episode 31: Cloud Risk

YouTube title: DevOps Mock Interview Practice | Episode 31: Cloud Risk

Estimated duration: 20-25 min

Source round: Mock Interview 31 - Cloud Risk (source set 31)

Focus: cloud shared responsibility, GCP security, IAM, Kubernetes, Terraform, secrets, and misconfiguration risk

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Cloud Risk.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- API: Application Programming Interface
- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- CLI: Command Line Interface
- GCP: Google Cloud Platform
- IaC: Infrastructure as Code
- IAM: Identity and Access Management
- OIDC: OpenID Connect
- RBAC: Role-Based Access Control
- VPC: Virtual Private Cloud

---

## Question 1

Interviewer:
What are cloud security risks?

Pause the video and answer this question aloud.

Senior Associate answer:
Cloud security risks include misconfigured storage, overprivileged IAM, exposed services, insecure networks, weak logging, leaked secrets, vulnerable images, unencrypted data, poor key management, and unclear shared responsibility. Many cloud incidents come from configuration and identity mistakes, so governance and automation are critical.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What are cloud security risks?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
Explain the Shared Responsibility Model.

Pause the video and answer this question aloud.

Senior Associate answer:
The Shared Responsibility Model divides security obligations between the cloud provider and the customer: the provider secures the underlying infrastructure (physical data centers, hypervisor, network fabric, and for managed services, the service itself), while the customer is responsible for securing what they configure and deploy on top of it (IAM, network configuration, data, application code, and OS-level security for unmanaged compute). The exact split shifts depending on the service model - IaaS puts more on the customer, SaaS puts more on the provider - so understanding where the line falls for each specific service you use is essential.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Explain the Shared Responsibility Model.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
What are the risks of public cloud?

Pause the video and answer this question aloud.

Senior Associate answer:
Key risks include misconfiguration (the leading cause of cloud breaches - public buckets, overly permissive IAM, exposed databases), vendor lock-in making migration difficult, shared-tenancy concerns for highly regulated workloads, loss of direct physical control over infrastructure, and the expanded attack surface from the sheer number of managed services and APIs available, each with its own security model to understand and configure correctly.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What are the risks of public cloud?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
How do you secure GCP projects?

Pause the video and answer this question aloud.

Senior Associate answer:
I secure GCP projects with folder/project structure, least-privilege IAM, groups instead of direct user grants, org policies, restricted public IPs, VPC design, logging, Security Command Center, Cloud Asset Inventory, Secret Manager, KMS, budget alerts, labels, and CI/CD/IaC guardrails. I also enforce periodic access reviews.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How do you secure GCP projects?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 5

Interviewer:
What are IAM best practices?

Pause the video and answer this question aloud.

Senior Associate answer:
Grant least privilege using predefined or custom roles scoped narrowly rather than broad basic roles, assign permissions to groups rather than individual users so access follows role changes automatically, prefer Workload Identity/short-lived credentials over long-lived service account keys, enable audit logging on all IAM changes, and review access periodically (using tools like IAM Recommender) to catch permission creep before it becomes a real exposure.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What are IAM best practices?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
What risks exist in Kubernetes clusters?

Pause the video and answer this question aloud.

Senior Associate answer:
Common risks include overly permissive RBAC bindings, privileged or root containers expanding the blast radius of a compromise, missing NetworkPolicies allowing unrestricted lateral movement between pods, unpatched nodes or container images with known vulnerabilities, exposed Kubernetes API servers or dashboards without proper authentication, and secrets stored insecurely (plain Kubernetes Secrets without encryption or an external secret manager).

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What risks exist in Kubernetes clusters?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
What are the risks of Terraform automation?

Pause the video and answer this question aloud.

Senior Associate answer:
Risks include a compromised or overly-permissioned CI/CD credential being able to apply destructive changes across the entire managed estate, state file exposure leaking secrets stored in plaintext within state, drift between state and reality causing an apply to make unintended changes, and a bad module or unreviewed plan being applied to production without adequate review, since Terraform's power to change infrastructure at scale cuts both ways.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What are the risks of Terraform automation?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
How do you secure Terraform state files?

Pause the video and answer this question aloud.

Senior Associate answer:
Store state in a remote backend with encryption at rest and access restricted via IAM to only the CI/CD identities and individuals who genuinely need it, enable state locking to prevent concurrent corruption, and mark sensitive outputs/variables so they're at least redacted from CLI display even though they still exist in the state file itself. Avoid committing local state files to version control entirely, and audit access to the state backend the same way you would any sensitive credential store.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How do you secure Terraform state files?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 9

Interviewer:
How do you approach secrets management?

Pause the video and answer this question aloud.

Senior Associate answer:
Use a centralized secret manager (Secret Manager, Vault) as the single source of truth rather than scattering secrets across environment variables, config files, and CI variables, and grant access via short-lived, identity-based authentication (Workload Identity, OIDC) rather than static keys wherever possible. Rotate secrets regularly, never commit them to version control, mask them from logs and CI output, and audit access to detect unusual retrieval patterns that might indicate compromise.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How do you approach secrets management?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 10

Interviewer:
What are common cloud misconfiguration risks?

Pause the video and answer this question aloud.

Senior Associate answer:
Common misconfigurations include publicly accessible storage buckets or databases, overly permissive firewall rules (0.0.0.0/0 on sensitive ports), IAM roles granted more broadly than needed, missing encryption on data at rest or in transit, disabled or unmonitored audit logging, and default credentials or settings left unchanged after resource creation - most of these are preventable with policy-as-code guardrails enforced automatically rather than relying on manual review to catch every instance.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What are common cloud misconfiguration risks?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 31: Cloud Risk.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
