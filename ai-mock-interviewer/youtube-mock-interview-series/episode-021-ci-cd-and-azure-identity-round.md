# Episode 21: CI/CD and Azure Identity Round

YouTube title: DevOps Mock Interview Practice | Episode 21: CI/CD and Azure Identity Round

Estimated duration: 18-23 min

Source round: Mock Interview 21 - CI/CD and Azure Identity Round (source set 21)

Focus: CI/CD pipelines, deployment strategies, rollback, Azure IAM, Entra ID, and identity management

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing CI/CD and Azure Identity Round.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- GCP: Google Cloud Platform
- GKE: Google Kubernetes Engine
- IAM: Identity and Access Management
- ML: Machine Learning
- MLOps: Machine Learning Operations
- RBAC: Role-Based Access Control
- SSO: Single Sign-On

---

## Question 1

Interviewer:
CI/CD pipeline: Explain your CI/CD pipeline from code commit to production.

Pause the video and answer this question aloud.

Senior Associate answer:
A typical pipeline triggers on commit, runs linting/unit tests, builds an immutable artifact tagged with the commit SHA, scans it for vulnerabilities, and deploys it to a dev/staging environment automatically for further testing. Promotion to production happens by deploying that same artifact behind an approval gate, using progressive delivery (canary or rolling update) with automated rollback if monitoring detects a regression, closing the loop from commit to safely-verified production deployment.

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: CI/CD pipeline: Explain your CI/CD pipeline from code commit to production.

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 2

Interviewer:
CI/CD tools: Which CI/CD tools have you used, and where did each fit?

Pause the video and answer this question aloud.

Senior Associate answer:
Jenkins fits complex, highly customized pipelines with legacy integrations where a plugin exists for nearly everything; GitHub Actions fits teams already on GitHub wanting tight repo integration and simpler YAML-based workflows; GitLab CI fits similarly for GitLab-hosted repos; Cloud Build fits GCP-native pipelines with tight IAM and Artifact Registry integration. The right tool often follows where the code already lives and what the team's existing operational familiarity is, more than any single tool being objectively superior.

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: CI/CD tools: Which CI/CD tools have you used, and where did each fit?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 3

Interviewer:
Application deployment: How do you deploy applications to Kubernetes, GKE, Cloud Run, or VMs?

Pause the video and answer this question aloud.

Senior Associate answer:
For Kubernetes/GKE, deploy via a GitOps tool (ArgoCD) or `kubectl apply`/Helm applying versioned manifests; for Cloud Run, deploy a new revision via `gcloud run deploy` or Cloud Deploy with traffic splitting for gradual rollout; for VMs, use a managed instance group with a new instance template (rolling update) rather than mutating running VMs in place. In all cases, the goal is an immutable, versioned artifact promoted through environments with a clear rollback path, not manual per-server changes.

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: Application deployment: How do you deploy applications to Kubernetes, GKE, Cloud Run, or VMs?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 4

Interviewer:
Blue-green deployment: Explain blue-green deployment.

Pause the video and answer this question aloud.

Senior Associate answer:
Blue-green deployment is a release strategy where two identical production environments are maintained:


* Blue environment → current live production version
* Green environment → new version to be deployed


The new application or ML model version is deployed to the green environment while the blue environment continues serving live traffic.


Once testing and validation are successful, traffic is switched from blue to green with minimal downtime.


If any issue occurs after deployment, traffic can quickly be redirected back to the blue environment, making rollback fast and safe.


In MLOps and DevOps, blue-green deployment is commonly used to:


* Minimize downtime during releases
* Reduce deployment risk
* Enable fast rollback
* Validate new models or application versions safely


It is usually implemented using:


* Kubernetes services and ingress
* Load balancers
* CI/CD pipelines
* Cloud traffic management tools


Compared to canary deployment, blue-green deployment switches traffic completely between environments, while canary deployment gradually shifts traffic in phases.

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: Blue-green deployment: Explain blue-green deployment.

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 5

Interviewer:
Canary deployment: Explain canary deployment.

Pause the video and answer this question aloud.

Senior Associate answer:
Canary deployment routes a small percentage of production traffic to a new version while the majority continues to the stable version, allowing you to observe the new version's real-world behavior (error rate, latency, business metrics) on limited exposure before gradually increasing its traffic share or rolling back quickly if problems appear - it limits blast radius compared to deploying to 100% of traffic immediately.

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: Canary deployment: Explain canary deployment.

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 6

Interviewer:
Deployment rollback: How do you roll back deployments?

Pause the video and answer this question aloud.

Senior Associate answer:
The fastest and safest rollback is redeploying the previous known-good artifact/revision rather than trying to 'fix forward' under pressure - for Kubernetes, `kubectl rollout undo`; for Cloud Run, shifting traffic back to the previous revision; for a GitOps-managed deployment, reverting the Git commit and letting the tool reconcile. Having this be a fast, well-rehearsed, one-command operation (not a manual multi-step process) is what actually makes rollback usable during a real incident.

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: Deployment rollback: How do you roll back deployments?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 7

Interviewer:
Azure IAM equivalent: What is the Azure equivalent of IAM?

Pause the video and answer this question aloud.

Senior Associate answer:
Azure's equivalent of GCP IAM is Azure Role-Based Access Control (RBAC), which assigns roles (built-in or custom) to security principals (users, groups, service principals, managed identities) scoped at the management group, subscription, resource group, or individual resource level, conceptually similar to GCP IAM's hierarchy-based role bindings.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Azure IAM equivalent: What is the Azure equivalent of IAM?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
Microsoft Entra ID: Explain Microsoft Entra ID and how it is used.

Pause the video and answer this question aloud.

Senior Associate answer:
Microsoft Entra ID (formerly Azure Active Directory) is Microsoft's cloud-based identity and access management service, providing the user/group directory and authentication (including SSO and MFA) that Azure RBAC and many third-party applications rely on - it's the identity backbone equivalent to Cloud Identity in the GCP world, plus significantly more enterprise identity federation and conditional access capability.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Microsoft Entra ID: Explain Microsoft Entra ID and how it is used.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 9

Interviewer:
Azure identity management: How do you manage users, groups, roles, and identities in Azure?

Pause the video and answer this question aloud.

Senior Associate answer:
Users and groups are managed in Microsoft Entra ID (often synced from on-premises Active Directory via Entra Connect), and access is granted through Azure RBAC role assignments scoped appropriately in the resource hierarchy. Managed identities are used for Azure resources needing to authenticate to other Azure services without storing credentials, analogous to GCP's Workload Identity, and conditional access policies add context-aware controls (location, device compliance) on top of basic role assignment.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Azure identity management: How do you manage users, groups, roles, and identities in Azure?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 21: CI/CD and Azure Identity Round.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
