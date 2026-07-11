# Episode 88: EKS Kubernetes DevOps Operations Round - Part 3

YouTube title: DevOps Mock Interview Practice | Episode 88: EKS Kubernetes DevOps Operations Round - Part 3

Estimated duration: 24-29 min

Source round: Mock Interview 65 - EKS Kubernetes DevOps Operations Round (source set 65)

Focus: General experience, AWS/Azure/GCP/on-prem, EKS, root cause troubleshooting, Docker, Kubernetes Services and networking, Ingress, NGINX, Gateway API, namespaces, etcd, HPA, storage, backups, Jenkins, Argo CD, ELK/OpenTelemetry, Linux, GCP, Prometheus/Grafana, Helm, and Sentinel deployment

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing EKS Kubernetes DevOps Operations Round - Part 3.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- API: Application Programming Interface
- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- EKS: Elastic Kubernetes Service
- ELK: Elasticsearch, Logstash, and Kibana
- GCP: Google Cloud Platform
- HPA: Horizontal Pod Autoscaler

---

## Question 1

Interviewer:
Why do we use Namespaces?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Namespaces angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Why do we use Namespaces?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Why do we use Namespaces?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 2

Interviewer:
What is the role of etcd?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Control Plane angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What is the role of etcd?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What is the role of etcd?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 3

Interviewer:
Can you take a backup of etcd?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Control Plane angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Can you take a backup of etcd?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Can you take a backup of etcd?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 4

Interviewer:
How does the kube-apiserver communicate with etcd?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Control Plane angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How does the kube-apiserver communicate with etcd?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How does the kube-apiserver communicate with etcd?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 5

Interviewer:
What is a DaemonSet?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Workloads angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What is a DaemonSet?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What is a DaemonSet?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 6

Interviewer:
How does the Horizontal Pod Autoscaler (HPA) work?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Autoscaling angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How does the Horizontal Pod Autoscaler (HPA) work?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How does the Horizontal Pod Autoscaler (HPA) work?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 7

Interviewer:
Does HPA scale based on resource requests or resource limits?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Autoscaling angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Does HPA scale based on resource requests or resource limits?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Does HPA scale based on resource requests or resource limits?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 8

Interviewer:
Explain StorageClass, Persistent Volume (PV), and Persistent Volume Claim (PVC).

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Storage angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Explain StorageClass, Persistent Volume (PV), and Persistent Volume Claim (PVC).

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Explain StorageClass, Persistent Volume (PV), and Persistent Volume Claim (PVC).

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 9

Interviewer:
What is the difference between static provisioning and dynamic provisioning?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Storage angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What is the difference between static provisioning and dynamic provisioning?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What is the difference between static provisioning and dynamic provisioning?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 10

Interviewer:
How do you take a backup of your Kubernetes cluster?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Backup angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How do you take a backup of your Kubernetes cluster?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How do you take a backup of your Kubernetes cluster?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 11

Interviewer:
What is the difference between volume and volumeMount?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Storage angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What is the difference between volume and volumeMount?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What is the difference between volume and volumeMount?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 12

Interviewer:
What kind of Jenkins pipelines have you created?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the CI/CD angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What kind of Jenkins pipelines have you created?

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: What kind of Jenkins pipelines have you created?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Closing

That completes Episode 88: EKS Kubernetes DevOps Operations Round - Part 3.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
