# Episode 73: Resilinc GCP Production Incident Round - Part 2

YouTube title: DevOps Mock Interview Practice | Episode 73: Resilinc GCP Production Incident Round - Part 2

Estimated duration: 18-23 min

Source round: Mock Interview 61 - Resilinc GCP Production Incident Round (source set 61)

Focus: Resilinc-style DevOps/GCP production support, GCP incidents, observability, GKE troubleshooting, Terraform, IAM, VPC security, RCA, and follow-up areas like Kafka, PostgreSQL, CI/CD, Grafana, Linux, and scalable cloud infrastructure

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Resilinc GCP Production Incident Round - Part 2.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- CPU: Central Processing Unit
- GCP: Google Cloud Platform
- GKE: Google Kubernetes Engine
- HA: High Availability
- IAM: Identity and Access Management
- RCA: Root Cause Analysis
- VPC: Virtual Private Cloud

---

## Question 1

Interviewer:
How would you troubleshoot Kafka producer, broker, consumer lag, and consumer group issues?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kafka Troubleshooting angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How would you troubleshoot Kafka producer, broker, consumer lag, and consumer group issues?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How would you troubleshoot Kafka producer, broker, consumer lag, and consumer group issues?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
How would you design and troubleshoot PostgreSQL high availability and backup/restore?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the PostgreSQL HA/Backup angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How would you design and troubleshoot PostgreSQL high availability and backup/restore?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How would you design and troubleshoot PostgreSQL high availability and backup/restore?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
How would you troubleshoot GitHub Actions or CI/CD pipeline failures in production delivery?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the CI/CD angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How would you troubleshoot GitHub Actions or CI/CD pipeline failures in production delivery?

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: How would you troubleshoot GitHub Actions or CI/CD pipeline failures in production delivery?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 4

Interviewer:
What Grafana and Prometheus dashboards would you build for production support?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Observability angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What Grafana and Prometheus dashboards would you build for production support?

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: What Grafana and Prometheus dashboards would you build for production support?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 5

Interviewer:
How do you manage Terraform state, modules, locking, drift, and safe production changes?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Terraform angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How do you manage Terraform state, modules, locking, drift, and safe production changes?

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: How do you manage Terraform state, modules, locking, drift, and safe production changes?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 6

Interviewer:
Explain how you have used GKE, IAM, VPC, Cloud SQL, and Load Balancer in production.

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the GCP Services angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Explain how you have used GKE, IAM, VPC, Cloud SQL, and Load Balancer in production.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Explain how you have used GKE, IAM, VPC, Cloud SQL, and Load Balancer in production.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
How do you troubleshoot Linux CPU, memory, disk, network, and process issues during an incident?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Linux Troubleshooting angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How do you troubleshoot Linux CPU, memory, disk, network, and process issues during an incident?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How do you troubleshoot Linux CPU, memory, disk, network, and process issues during an incident?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
How do you handle production incidents and write an RCA?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Incident Handling angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How do you handle production incidents and write an RCA?

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: How do you handle production incidents and write an RCA?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 9

Interviewer:
Design scalable cloud infrastructure for a production application on GCP.

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the System Design angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Design scalable cloud infrastructure for a production application on GCP.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Design scalable cloud infrastructure for a production application on GCP.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 73: Resilinc GCP Production Incident Round - Part 2.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
