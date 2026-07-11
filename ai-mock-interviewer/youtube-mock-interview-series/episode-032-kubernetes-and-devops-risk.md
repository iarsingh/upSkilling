# Episode 32: Kubernetes and DevOps Risk

YouTube title: DevOps Mock Interview Practice | Episode 32: Kubernetes and DevOps Risk

Estimated duration: 20-25 min

Source round: Mock Interview 32 - Kubernetes and DevOps Risk (source set 32)

Focus: CI/CD risks, Jenkins, GitHub Actions, supply chain security, SBOM, image signing, runtime security, Helm, RBAC, and privileged containers

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Kubernetes and DevOps Risk.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- API: Application Programming Interface
- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- RBAC: Role-Based Access Control
- SSO: Single Sign-On

---

## Question 1

Interviewer:
What are the risks of CI/CD pipelines?

Pause the video and answer this question aloud.

Senior Associate answer:
Risks include overly broad credentials granted to the pipeline (a compromised pipeline can deploy or exfiltrate data anywhere those credentials reach), unreviewed third-party actions/plugins that could be malicious or compromised, secrets leaking through build logs or artifacts, insufficient separation between environments allowing a change to unintentionally affect production, and a lack of approval gates letting a single compromised or careless commit reach production without review.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What are the risks of CI/CD pipelines?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 2

Interviewer:
How do you secure Jenkins?

Pause the video and answer this question aloud.

Senior Associate answer:
I secure Jenkins by enabling SSO/MFA, RBAC, credential store controls, plugin hygiene, isolated agents, network restrictions, audit logs, backup, CSRF protection, limited admin access, pipeline code review, secret masking, and regular patching. Jenkins should not have broad production credentials unless tightly controlled.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How do you secure Jenkins?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 3

Interviewer:
What are the risks of GitHub Actions?

Pause the video and answer this question aloud.

Senior Associate answer:
Key risks include using mutable action tags (@v1) that can be silently changed upstream to inject malicious code (mitigated by pinning to a commit SHA), overly broad `GITHUB_TOKEN` or secret permissions granted to workflows, third-party actions from unverified publishers with supply-chain risk, and workflows triggered by pull requests from forks potentially executing untrusted code with access to repository secrets if not carefully scoped with the right trigger and permission settings.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What are the risks of GitHub Actions?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 4

Interviewer:
What is supply chain security?

Pause the video and answer this question aloud.

Senior Associate answer:
Supply chain security protects the integrity of code, dependencies, build systems, artifacts, and deployment paths. It covers dependency scanning, SBOMs, provenance, signed commits or images, trusted builders, artifact promotion, and policies that prevent unverified artifacts from reaching production.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What is supply chain security?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 5

Interviewer:
What is an SBOM?

Pause the video and answer this question aloud.

Senior Associate answer:
An SBOM, or Software Bill of Materials, is an inventory of software components, dependencies, versions, and sometimes licenses. It helps teams understand exposure when a vulnerability is discovered and supports compliance, vulnerability management, and supply chain transparency.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What is an SBOM?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 6

Interviewer:
Explain image signing.

Pause the video and answer this question aloud.

Senior Associate answer:
What is Image Signing?
Image Signing is the process of digitally signing a container image (Docker image) to verify:

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Explain image signing.

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 7

Interviewer:
What is runtime security?

Pause the video and answer this question aloud.

Senior Associate answer:
Runtime security monitors and controls workloads while they are running. It includes detecting suspicious processes, privilege escalation, unexpected network connections, file changes, and container escapes. In Kubernetes, runtime security complements image scanning because some attacks only appear after deployment.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What is runtime security?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 8

Interviewer:
What are the risks of Helm charts?

Pause the video and answer this question aloud.

Senior Associate answer:
Risks include pulling charts from untrusted or unverified public repositories that could contain malicious templates, overly permissive default values (like disabled security contexts) that get deployed without review if teams don't inspect rendered manifests, secrets accidentally baked into values files committed to version control, and chart dependency chains that are hard to audit fully, potentially pulling in unreviewed sub-charts with their own risky defaults.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What are the risks of Helm charts?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 9

Interviewer:
What are Kubernetes RBAC risks?

Pause the video and answer this question aloud.

Senior Associate answer:
Risks include overly broad ClusterRoleBindings granting cluster-wide access when namespace-scoped access would suffice, use of the wildcard `*` in rules granting unintended permissions as the API evolves, service accounts with more permissions than their workload actually needs (violating least privilege), and stale bindings left over from decommissioned services or departed team members that nobody remembers to clean up, silently expanding the attack surface over time.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What are Kubernetes RBAC risks?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 10

Interviewer:
What are the risks of privileged containers?

Pause the video and answer this question aloud.

Senior Associate answer:
A privileged container has essentially unrestricted access to the host - it can access host devices, modify kernel parameters, and in many cases break out to gain control of the underlying node, meaning a single compromised privileged container can compromise the entire node and potentially the cluster. This is why security baselines (Pod Security Standards, admission controllers) block privileged containers by default, only allowing exceptions for genuinely justified cases like specific infrastructure-level agents with clear compensating controls.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What are the risks of privileged containers?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Closing

That completes Episode 32: Kubernetes and DevOps Risk.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
