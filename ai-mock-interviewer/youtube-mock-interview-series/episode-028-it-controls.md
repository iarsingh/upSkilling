# Episode 28: IT Controls

YouTube title: DevOps Mock Interview Practice | Episode 28: IT Controls

Estimated duration: 20-25 min

Source round: Mock Interview 28 - IT Controls (source set 28)

Focus: preventive, detective, corrective, compensating controls, least privilege, RBAC, segregation of duties, and control monitoring

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing IT Controls.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- CPU: Central Processing Unit
- DNS: Domain Name System
- IAM: Identity and Access Management
- RBAC: Role-Based Access Control
- SLA: Service Level Agreement
- TLS: Transport Layer Security
- VPN: Virtual Private Network

---

## Question 1

Interviewer:
What are preventive controls?

Pause the video and answer this question aloud.

Senior Associate answer:
Preventive controls stop a risk event before it occurs. Examples include least-privilege IAM, policy-as-code checks, required approvals, network restrictions, encryption requirements, branch protection, and admission policies. In cloud environments, preventive controls are valuable because they reduce dependency on manual review.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What are preventive controls?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
What are detective controls?

Pause the video and answer this question aloud.

Senior Associate answer:
Detective controls identify when something risky has happened. Examples include audit logs, SIEM alerts, Cloud Logging, vulnerability scans, drift detection, access review reports, and anomaly detection. They do not prevent the issue directly, but they reduce detection time and support investigation.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What are detective controls?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
What are corrective controls?

Pause the video and answer this question aloud.

Senior Associate answer:
Corrective controls restore the environment or reduce damage after a risk event. Examples include incident response, automated rollback, patching, secret rotation, access revocation, backup restoration, and post-incident remediation. Good corrective controls reduce recovery time and prevent recurrence.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What are corrective controls?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
Give examples of each control type in cloud infrastructure.

Pause the video and answer this question aloud.

Senior Associate answer:
Preventive controls stop an issue before it happens - org policies blocking public IPs, IAM least-privilege bindings, required CI/CD approvals. Detective controls identify issues after the fact - Security Command Center findings, audit logging, anomaly detection alerts. Corrective controls fix an identified issue - automated remediation scripts, incident response runbooks, patch deployment. A mature cloud security posture layers all three together for each major risk area rather than relying on preventive controls alone.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Give examples of each control type in cloud infrastructure.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 5

Interviewer:
How do you validate control effectiveness?

Pause the video and answer this question aloud.

Senior Associate answer:
I validate effectiveness by checking evidence, testing the control, reviewing logs, sampling transactions, and confirming that failures are detected and remediated. For example, for deployment approval, I would inspect pipeline configuration, recent deployment records, approval evidence, exception handling, and whether unauthorized deployments are blocked.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How do you validate control effectiveness?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
What is segregation of duties?

Pause the video and answer this question aloud.

Senior Associate answer:
Segregation of duties means no single person should control an end-to-end sensitive process without oversight. For example, the same developer should not be able to write code, approve it, deploy to production, and change production access without review. In CI/CD, this can be enforced through branch protection, approvals, and limited production permissions.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is segregation of duties?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
What is least privilege?

Pause the video and answer this question aloud.

Senior Associate answer:
Least privilege means granting only the permissions needed to perform a task and nothing more. It reduces blast radius if an account or workload is compromised.

Detailed interview explanation:
Least Privilege should be explained from a production troubleshooting and security perspective. These questions test whether you understand operating-system fundamentals, networking behavior, access control, and how to debug safely under pressure.

Production example:
If a service is slow or down, you may check service state with systemctl, logs with journalctl, processes with top or htop, memory with free and vmstat, disk with df and iostat, sockets with ss, DNS with dig, connectivity with curl or nc, and packets with tcpdump. For security topics, connect the answer to least privilege, hardening, encryption, segmentation, patching, and audit logs.

Best practices to mention:
- Start with impact, recent changes, logs, metrics, and resource saturation.
- Validate DNS, routes, firewall rules, TLS certificates, and dependency health for network issues.
- Use least privilege, patching, MFA, secrets management, and logging for security.
- Automate repetitive operational tasks with scripts and runbooks.
- Avoid risky production commands unless you understand blast radius and rollback.

Common interview follow-ups:
Interviewers may ask how to debug high CPU, memory leaks, disk full, inode exhaustion, DNS failures, packet loss, TLS issues, SSH access problems, or suspicious activity. Strong answers are step-by-step and evidence-driven.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is least privilege?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
Explain RBAC.

Pause the video and answer this question aloud.

Senior Associate answer:
RBAC stands for Role-Based Access Control. It assigns permissions through roles mapped to users, groups, or service accounts. In Kubernetes, RBAC uses Roles, ClusterRoles, RoleBindings, and ClusterRoleBindings. Good RBAC design separates admin, developer, CI/CD, read-only, and security responsibilities.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Explain RBAC.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 9

Interviewer:
What are compensating controls?

Pause the video and answer this question aloud.

Senior Associate answer:
Compensating controls are alternative controls used when the preferred control is not feasible. For example, if a legacy system cannot support MFA, compensating controls could include VPN restriction, privileged access monitoring, short-lived credentials, strong logging, and frequent access reviews. They should be documented and time-bound.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What are compensating controls?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 10

Interviewer:
How do you monitor control failures?

Pause the video and answer this question aloud.

Senior Associate answer:
I monitor control failures through alerts, dashboards, exception reports, audit logs, periodic control testing, and ticket workflows. Examples include failed backup jobs, disabled logging, policy violations, expired certificates, unpatched systems, or overdue access reviews. Control failures should have owners, severity, SLA, and escalation paths.


---------------------------

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How do you monitor control failures?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 28: IT Controls.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
