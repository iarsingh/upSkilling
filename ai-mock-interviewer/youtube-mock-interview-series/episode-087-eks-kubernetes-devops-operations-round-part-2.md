# Episode 87: EKS Kubernetes DevOps Operations Round - Part 2

YouTube title: DevOps Mock Interview Practice | Episode 87: EKS Kubernetes DevOps Operations Round - Part 2

Estimated duration: 24-29 min

Source round: Mock Interview 65 - EKS Kubernetes DevOps Operations Round (source set 65)

Focus: General experience, AWS/Azure/GCP/on-prem, EKS, root cause troubleshooting, Docker, Kubernetes Services and networking, Ingress, NGINX, Gateway API, namespaces, etcd, HPA, storage, backups, Jenkins, Argo CD, ELK/OpenTelemetry, Linux, GCP, Prometheus/Grafana, Helm, and Sentinel deployment

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing EKS Kubernetes DevOps Operations Round - Part 2.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- API: Application Programming Interface
- EKS: Elastic Kubernetes Service
- ELK: Elasticsearch, Logstash, and Kibana
- GCP: Google Cloud Platform
- GKE: Google Kubernetes Engine
- HPA: Horizontal Pod Autoscaler
- IP: Internet Protocol

---

## Question 1

Interviewer:
What is the default NodePort range?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Services angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What is the default NodePort range?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What is the default NodePort range?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 2

Interviewer:
If NodePort gives only a port, how do you access the application? What IP do you use?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Services angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: If NodePort gives only a port, how do you access the application? What IP do you use?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: If NodePort gives only a port, how do you access the application? What IP do you use?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 3

Interviewer:
If there are 10-20 worker nodes, which node IP will you choose?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Services angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: If there are 10-20 worker nodes, which node IP will you choose?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: If there are 10-20 worker nodes, which node IP will you choose?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 4

Interviewer:
If the Load Balancer is down, how will you troubleshoot the application using NodePort?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Services angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: If the Load Balancer is down, how will you troubleshoot the application using NodePort?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: If the Load Balancer is down, how will you troubleshoot the application using NodePort?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 5

Interviewer:
How do you expose a service outside the Kubernetes cluster?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Networking angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How do you expose a service outside the Kubernetes cluster?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How do you expose a service outside the Kubernetes cluster?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 6

Interviewer:
Which Ingress Controller are you using?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Ingress angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Which Ingress Controller are you using?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Which Ingress Controller are you using?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 7

Interviewer:
How do you install or setup the NGINX Ingress Controller in GKE?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Ingress angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How do you install or setup the NGINX Ingress Controller in GKE?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How do you install or setup the NGINX Ingress Controller in GKE?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 8

Interviewer:
You already have a GKE cluster. How will you configure an Ingress Controller?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Ingress angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: You already have a GKE cluster. How will you configure an Ingress Controller?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: You already have a GKE cluster. How will you configure an Ingress Controller?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 9

Interviewer:
Why do we use an Ingress Controller?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Ingress angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Why do we use an Ingress Controller?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Why do we use an Ingress Controller?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 10

Interviewer:
If NGINX Ingress is deprecated, what will you use in the future?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Ingress angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: If NGINX Ingress is deprecated, what will you use in the future?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: If NGINX Ingress is deprecated, what will you use in the future?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 11

Interviewer:
How will you expose applications after moving away from NGINX Ingress?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Ingress angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How will you expose applications after moving away from NGINX Ingress?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How will you expose applications after moving away from NGINX Ingress?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 12

Interviewer:
How do you expose an application using a Kubernetes Service?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Services angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How do you expose an application using a Kubernetes Service?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How do you expose an application using a Kubernetes Service?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Closing

That completes Episode 87: EKS Kubernetes DevOps Operations Round - Part 2.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
