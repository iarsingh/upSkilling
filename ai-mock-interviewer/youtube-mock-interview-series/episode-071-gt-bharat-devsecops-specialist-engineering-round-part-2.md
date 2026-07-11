# Episode 71: GT Bharat DevSecOps Specialist Engineering Round - Part 2

YouTube title: DevOps Mock Interview Practice | Episode 71: GT Bharat DevSecOps Specialist Engineering Round - Part 2

Estimated duration: 16-21 min

Source round: Mock Interview 60 - GT Bharat DevSecOps Specialist Engineering Round (source set 60)

Focus: GT Bharat DevSecOps Engineer JD, GCP and GKE operations, Linux/Windows administration, incident and change management, CI/CD with GitHub/JIRA/Jenkins/Ansible, Terraform, Vault, Docker/Kubernetes, SQL, Splunk/AppDynamics/xMatters, regulated enterprise operations, automation mindset, and on-call readiness

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing GT Bharat DevSecOps Specialist Engineering Round - Part 2.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- DNS: Domain Name System
- GCP: Google Cloud Platform
- GKE: Google Kubernetes Engine
- IAM: Identity and Access Management

---

## Question 1

Interviewer:
How have you used Terraform and Ansible together, and where would you draw the boundary between provisioning and configuration management?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Infrastructure as Code angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How have you used Terraform and Ansible together, and where would you draw the boundary between provisioning and configuration management?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How have you used Terraform and Ansible together, and where would you draw the boundary between provisioning and configuration management?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
How would you implement secrets management with HashiCorp Vault or cloud secret managers for applications running in Kubernetes?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Secrets Management angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How would you implement secrets management with HashiCorp Vault or cloud secret managers for applications running in Kubernetes?

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: How would you implement secrets management with HashiCorp Vault or cloud secret managers for applications running in Kubernetes?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 3

Interviewer:
Compare Deployment, StatefulSet, and DaemonSet. When would you use each in an enterprise platform?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Containers/Kubernetes angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Compare Deployment, StatefulSet, and DaemonSet. When would you use each in an enterprise platform?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Compare Deployment, StatefulSet, and DaemonSet. When would you use each in an enterprise platform?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 4

Interviewer:
How would you use Splunk, AppDynamics, and xMatters to monitor services, reduce alert noise, and proactively prevent outages?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Observability angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How would you use Splunk, AppDynamics, and xMatters to monitor services, reduce alert noise, and proactively prevent outages?

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: How would you use Splunk, AppDynamics, and xMatters to monitor services, reduce alert noise, and proactively prevent outages?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 5

Interviewer:
What SQL or database troubleshooting experience do you have with PostgreSQL or MSSQL, especially for connectivity, slow queries, or locks?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the SQL/Database Operations angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What SQL or database troubleshooting experience do you have with PostgreSQL or MSSQL, especially for connectivity, slow queries, or locks?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What SQL or database troubleshooting experience do you have with PostgreSQL or MSSQL, especially for connectivity, slow queries, or locks?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
A service in GKE cannot connect to a database or third-party endpoint. How would you troubleshoot DNS, routes, firewalls, security groups, and application configuration?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Networking angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: A service in GKE cannot connect to a database or third-party endpoint. How would you troubleshoot DNS, routes, firewalls, security groups, and application configuration?

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: A service in GKE cannot connect to a database or third-party endpoint. How would you troubleshoot DNS, routes, firewalls, security groups, and application configuration?

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 7

Interviewer:
What security controls would you add across CI/CD, containers, Kubernetes, cloud IAM, secrets, logging, and audit trails?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the DevSecOps/Security angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What security controls would you add across CI/CD, containers, Kubernetes, cloud IAM, secrets, logging, and audit trails?

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: What security controls would you add across CI/CD, containers, Kubernetes, cloud IAM, secrets, logging, and audit trails?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 8

Interviewer:
Tell me about a time you automated a manual operations task or improved a workflow. What was the impact, and how did you share the learning with the team?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Behavioral/Automation angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Tell me about a time you automated a manual operations task or improved a workflow. What was the impact, and how did you share the learning with the team?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Tell me about a time you automated a manual operations task or improved a workflow. What was the impact, and how did you share the learning with the team?

What interviewer checks:
They are checking communication, ownership, judgment, and whether your examples sound real.

---

## Closing

That completes Episode 71: GT Bharat DevSecOps Specialist Engineering Round - Part 2.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
