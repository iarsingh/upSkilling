# Episode 36: Audit and Compliance Scenarios

YouTube title: DevOps Mock Interview Practice | Episode 36: Audit and Compliance Scenarios

Estimated duration: 20-25 min

Source round: Mock Interview 36 - Audit and Compliance Scenarios (source set 36)

Focus: shared access, Terraform state secrets, Jenkins credentials, public dashboards, GCP Owner access, patching gaps, logging, vulnerabilities, encryption, and public buckets

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Audit and Compliance Scenarios.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CI: Continuous Integration
- GCP: Google Cloud Platform
- IaC: Infrastructure as Code
- IAM: Identity and Access Management
- RBAC: Role-Based Access Control
- SSO: Single Sign-On

---

## Question 1

Interviewer:
An auditor finds that production access is shared among developers. What do you do?

Pause the video and answer this question aloud.

Senior Associate answer:
I would treat it as a serious access control issue. First identify where shared access exists, remove or disable shared accounts where possible, assign named accounts, enforce MFA/SSO, implement RBAC and just-in-time access, review logs for misuse, document remediation, and provide evidence to audit. I would also prevent recurrence through policy and periodic access reviews.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: An auditor finds that production access is shared among developers. What do you do?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
Terraform state contains database passwords. How would you fix this?

Pause the video and answer this question aloud.

Senior Associate answer:
I would rotate the exposed passwords, move secrets to Secret Manager or Vault, restrict and audit state access, ensure remote state encryption and locking, remove secrets from Terraform variables and outputs, and update modules to reference secret resources safely. I would also check commit history, CI logs, and backups for further exposure.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Terraform state contains database passwords. How would you fix this?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
Jenkins stores credentials in plain text. What actions would you take?

Pause the video and answer this question aloud.

Senior Associate answer:
I would rotate the credentials immediately, move them into Jenkins credentials store or an external secret manager, restrict access, review logs for exposure, update pipelines to avoid printing secrets, patch Jenkins and plugins, and add audits for credential usage. I would also review whether Jenkins has excessive production permissions.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Jenkins stores credentials in plain text. What actions would you take?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
Kubernetes dashboard is publicly accessible. What risks exist?

Pause the video and answer this question aloud.

Senior Associate answer:
The risks include unauthorized cluster access, workload manipulation, secret exposure, privilege escalation, data exfiltration, and production disruption. I would restrict network access, require strong authentication, review RBAC, inspect audit logs, rotate exposed secrets if needed, and consider whether the dashboard should be disabled entirely.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Kubernetes dashboard is publicly accessible. What risks exist?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 5

Interviewer:
A developer requests Owner access in GCP. Would you approve it?

Pause the video and answer this question aloud.

Senior Associate answer:
Generally no, not without a strong business justification, time limit, and approval. I would ask what task requires Owner, provide least-privilege alternatives, use groups or custom roles, consider just-in-time access, and log the approval. Broad Owner access creates high risk because it can change IAM, billing, resources, and security controls.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: A developer requests Owner access in GCP. Would you approve it?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
Your audit finds that 50 VMs have no patching process. What is your response?

Pause the video and answer this question aloud.

Senior Associate answer:
I would assess criticality, exposure, and vulnerability status of the VMs, assign owners, define patch SLAs, prioritize internet-facing and critical systems, implement automated patching or maintenance windows, track exceptions, and report progress. I would also determine why the patching control failed and fix the process gap.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Your audit finds that 50 VMs have no patching process. What is your response?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
Cloud logging has been disabled. Why is this a risk?

Pause the video and answer this question aloud.

Senior Associate answer:
Disabled logging reduces detection, investigation, compliance evidence, and incident response capability. Without logs, teams may not know who changed what, when an incident started, or whether data was accessed. I would re-enable logging, restrict who can disable it, alert on logging changes, and review the gap period.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Cloud logging has been disabled. Why is this a risk?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
A critical vulnerability is found in production. What steps would you follow?

Pause the video and answer this question aloud.

Senior Associate answer:
I would validate the vulnerability, assess exposure and exploitability, identify affected assets, prioritize mitigation, apply patch or workaround, increase monitoring, communicate risk and timeline, test the fix, and document evidence. If actively exploited, I would involve incident response and preserve forensic data.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: A critical vulnerability is found in production. What steps would you follow?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 9

Interviewer:
An application stores customer data without encryption. What are the risks?

Pause the video and answer this question aloud.

Senior Associate answer:
Risks include data exposure, regulatory non-compliance, customer harm, contractual breach, and reputational damage. I would identify data type and storage locations, enable encryption at rest and in transit, review key management, restrict access, assess exposure history, and ensure encryption is part of design standards.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: An application stores customer data without encryption. What are the risks?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 10

Interviewer:
Public storage buckets are discovered. How would you respond?

Pause the video and answer this question aloud.

Senior Associate answer:
I would identify exposed buckets, data sensitivity, access logs, and business justification. If unauthorized, I would remove public access, rotate any exposed secrets, notify stakeholders, assess whether incident procedures apply, and add preventive controls like public access prevention, org policies, IaC checks, and alerts.


--------------------

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Public storage buckets are discovered. How would you respond?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 36: Audit and Compliance Scenarios.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
