# Episode 89: EKS Kubernetes DevOps Operations Round - Part 4

YouTube title: DevOps Mock Interview Practice | Episode 89: EKS Kubernetes DevOps Operations Round - Part 4

Estimated duration: 24-29 min

Source round: Mock Interview 65 - EKS Kubernetes DevOps Operations Round (source set 65)

Focus: General experience, AWS/Azure/GCP/on-prem, EKS, root cause troubleshooting, Docker, Kubernetes Services and networking, Ingress, NGINX, Gateway API, namespaces, etcd, HPA, storage, backups, Jenkins, Argo CD, ELK/OpenTelemetry, Linux, GCP, Prometheus/Grafana, Helm, and Sentinel deployment

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing EKS Kubernetes DevOps Operations Round - Part 4.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- API: Application Programming Interface
- EKS: Elastic Kubernetes Service
- ELK: Elasticsearch, Logstash, and Kibana
- GCP: Google Cloud Platform
- HPA: Horizontal Pod Autoscaler

---

## Question 1

Interviewer:
How do you take a backup of Jenkins?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Jenkins angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How do you take a backup of Jenkins?

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: How do you take a backup of Jenkins?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 2

Interviewer:
Have you used Argo CD or Harness?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the GitOps/Argo CD angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Have you used Argo CD or Harness?

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: Have you used Argo CD or Harness?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 3

Interviewer:
How does Argo CD work?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the GitOps/Argo CD angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How does Argo CD work?

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: How does Argo CD work?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 4

Interviewer:
If someone changes a Kubernetes resource using kubectl but does not update Git, what happens?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the GitOps/Argo CD angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: If someone changes a Kubernetes resource using kubectl but does not update Git, what happens?

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: If someone changes a Kubernetes resource using kubectl but does not update Git, what happens?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 5

Interviewer:
Explain the ELK Stack along with OpenTelemetry.

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Monitoring/ELK/OpenTelemetry angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Explain the ELK Stack along with OpenTelemetry.

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: Explain the ELK Stack along with OpenTelemetry.

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 6

Interviewer:
What is the complete log flow from the application to Kibana?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Monitoring/ELK/OpenTelemetry angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What is the complete log flow from the application to Kibana?

Senior answer structure:
Use this structure: user-impact signal -> metrics/logs/traces -> alerting rule -> dashboard/runbook -> noise reduction.

Scenario-based practice:
Scenario practice: Imagine customers are impacted but the root cause is unclear. Explain which metrics, logs, traces, dashboards, and alerts you would use for: What is the complete log flow from the application to Kibana?

What interviewer checks:
They are checking whether you can detect user impact, debug with signals, and reduce noisy alerts.

---

## Question 7

Interviewer:
What is the role of the OpenTelemetry Collector?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the OpenTelemetry angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What is the role of the OpenTelemetry Collector?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is the role of the OpenTelemetry Collector?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
What is the role of the APM Server?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Elastic/APM angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What is the role of the APM Server?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is the role of the APM Server?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 9

Interviewer:
How do you delete old logs from Elasticsearch?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Elasticsearch angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How do you delete old logs from Elasticsearch?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How do you delete old logs from Elasticsearch?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 10

Interviewer:
If ILM is not working and Elasticsearch storage is full, how will you clean up the logs?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Elasticsearch angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: If ILM is not working and Elasticsearch storage is full, how will you clean up the logs?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: If ILM is not working and Elasticsearch storage is full, how will you clean up the logs?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 11

Interviewer:
If Kibana is not working, how will you troubleshoot it?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kibana angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: If Kibana is not working, how will you troubleshoot it?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: If Kibana is not working, how will you troubleshoot it?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 12

Interviewer:
If a Linux server has very high load, how will you reduce it?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Linux angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: If a Linux server has very high load, how will you reduce it?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: If a Linux server has very high load, how will you reduce it?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 89: EKS Kubernetes DevOps Operations Round - Part 4.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
