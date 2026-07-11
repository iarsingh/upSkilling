# Episode 107: Kubernetes Terraform Observability and MLOps - Part 3

YouTube title: DevOps Mock Interview Practice | Episode 107: Kubernetes Terraform Observability and MLOps - Part 3

Estimated duration: 18-23 min

Source round: Mock Interview 72 - Kubernetes Terraform Observability and MLOps (source set 72)

Focus: Kubernetes CNI, service mesh, workloads, probes, ingress, autoscaling, cloud networking, observability, Terraform, Ansible, compliance, MLOps and AI infrastructure

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Kubernetes Terraform Observability and MLOps - Part 3.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- AI: Artificial Intelligence
- CNI: Container Network Interface
- CPU: Central Processing Unit
- DNS: Domain Name System
- ELK: Elasticsearch, Logstash, and Kibana
- MLOps: Machine Learning Operations
- mTLS: Mutual Transport Layer Security
- TLS: Transport Layer Security

---

## Question 1

Interviewer:
What is mTLS?

Pause the video and answer this question aloud.

Senior Associate answer:
mTLS, or mutual TLS, requires both client and server to present certificates. It provides encrypted communication plus strong service or user identity validation.

Detailed interview explanation:
Mtls should be explained from a production troubleshooting and security perspective. These questions test whether you understand operating-system fundamentals, networking behavior, access control, and how to debug safely under pressure.

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
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: What is mTLS?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 2

Interviewer:
How much experience do you have with Prometheus?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Observability/Prometheus angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How much experience do you have with Prometheus?

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: How much experience do you have with Prometheus?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 3

Interviewer:
How much experience do you have with Grafana?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Observability/Grafana angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How much experience do you have with Grafana?

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: How much experience do you have with Grafana?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 4

Interviewer:
How much experience do you have with OpenTelemetry?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Observability/OpenTelemetry angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How much experience do you have with OpenTelemetry?

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: How much experience do you have with OpenTelemetry?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 5

Interviewer:
Have you worked with Jaeger?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Observability/Tracing angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Have you worked with Jaeger?

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: Have you worked with Jaeger?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 6

Interviewer:
Have you integrated ELK?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Observability/Logging angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Have you integrated ELK?

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: Have you integrated ELK?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 7

Interviewer:
What is Terraform State?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Terraform/State angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What is Terraform State?

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: What is Terraform State?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 8

Interviewer:
Why is Terraform State a security risk?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Terraform/Security angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Why is Terraform State a security risk?

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: Why is Terraform State a security risk?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 9

Interviewer:
How do you manage state locking in a team environment?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Terraform/State angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How do you manage state locking in a team environment?

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: How do you manage state locking in a team environment?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Closing

That completes Episode 107: Kubernetes Terraform Observability and MLOps - Part 3.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
