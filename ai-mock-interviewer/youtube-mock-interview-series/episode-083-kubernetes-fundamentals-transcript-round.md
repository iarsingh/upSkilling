# Episode 83: Kubernetes Fundamentals Transcript Round

YouTube title: DevOps Mock Interview Practice | Episode 83: Kubernetes Fundamentals Transcript Round

Estimated duration: 28-33 min

Source round: Mock Interview 63 - Kubernetes Fundamentals Transcript Round (source set 63)

Focus: Kubernetes DNS/FQDN, CoreDNS, API server, etcd, RBAC, kubelet, probes, pod health, restart flow, service discovery, and control plane versus worker-node responsibilities

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Kubernetes Fundamentals Transcript Round.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- API: Application Programming Interface
- DNS: Domain Name System
- IP: Internet Protocol
- RBAC: Role-Based Access Control

---

## Question 1

Interviewer:
How does Kubernetes FQDN resolve to an IP address? Explain service.namespace.svc.cluster.local and how DNS resolves the service name.

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes DNS angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How does Kubernetes FQDN resolve to an IP address? Explain service.namespace.svc.cluster.local and how DNS resolves the service name.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How does Kubernetes FQDN resolve to an IP address? Explain service.namespace.svc.cluster.local and how DNS resolves the service name.

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 2

Interviewer:
What is the role of CoreDNS in Kubernetes? How does CoreDNS resolve service names, and does it communicate with the API server?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the CoreDNS angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What is the role of CoreDNS in Kubernetes? How does CoreDNS resolve service names, and does it communicate with the API server?

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: What is the role of CoreDNS in Kubernetes? How does CoreDNS resolve service names, and does it communicate with the API server?

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 3

Interviewer:
Is CoreDNS a bridge between etcd and the Kubernetes API server? If not, what is its actual role?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the CoreDNS/API Server angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Is CoreDNS a bridge between etcd and the Kubernetes API server? If not, what is its actual role?

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: Is CoreDNS a bridge between etcd and the Kubernetes API server? If not, what is its actual role?

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 4

Interviewer:
What is RBAC in Kubernetes? Why do we use RBAC? Explain Role, ClusterRole, RoleBinding, and ClusterRoleBinding.

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes RBAC angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What is RBAC in Kubernetes? Why do we use RBAC? Explain Role, ClusterRole, RoleBinding, and ClusterRoleBinding.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What is RBAC in Kubernetes? Why do we use RBAC? Explain Role, ClusterRole, RoleBinding, and ClusterRoleBinding.

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 5

Interviewer:
Suppose an application goes down in a Kubernetes cluster. How does the master or control plane know that the application is down? How does the signal reach the control plane?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Health angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Suppose an application goes down in a Kubernetes cluster. How does the master or control plane know that the application is down? How does the signal reach the control plane?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Suppose an application goes down in a Kubernetes cluster. How does the master or control plane know that the application is down? How does the signal reach the control plane?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 6

Interviewer:
Which component detects that a pod or application has become unhealthy, and what is the role of kubelet?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubelet angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Which component detects that a pod or application has become unhealthy, and what is the role of kubelet?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Which component detects that a pod or application has become unhealthy, and what is the role of kubelet?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
Is kubelet a worker node component or a master/control plane component?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubelet angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Is kubelet a worker node component or a master/control plane component?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Is kubelet a worker node component or a master/control plane component?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
How does kubelet communicate with the control plane, and what is the role of the API server?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubelet/API Server angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How does kubelet communicate with the control plane, and what is the role of the API server?

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: How does kubelet communicate with the control plane, and what is the role of the API server?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 9

Interviewer:
Explain the Liveness Probe. When is it used, and what happens if it fails?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Liveness Probe angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Explain the Liveness Probe. When is it used, and what happens if it fails?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Explain the Liveness Probe. When is it used, and what happens if it fails?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 10

Interviewer:
Explain the Readiness Probe. How is it different from the Liveness Probe?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Readiness Probe angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Explain the Readiness Probe. How is it different from the Liveness Probe?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Explain the Readiness Probe. How is it different from the Liveness Probe?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 11

Interviewer:
If an application gets stuck or becomes unhealthy, does Kubernetes execute a kubectl command to restart it? If not, how is the restart triggered?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Container Restart angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: If an application gets stuck or becomes unhealthy, does Kubernetes execute a kubectl command to restart it? If not, how is the restart triggered?

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: If an application gets stuck or becomes unhealthy, does Kubernetes execute a kubectl command to restart it? If not, how is the restart triggered?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 12

Interviewer:
How does kubelet restart a failed container? Does kubelet communicate directly with the container runtime?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Container Runtime angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How does kubelet restart a failed container? Does kubelet communicate directly with the container runtime?

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: How does kubelet restart a failed container? Does kubelet communicate directly with the container runtime?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 13

Interviewer:
What is the complete flow when an application crashes: Application to Kubelet to API Server to etcd to Controller Manager to new Pod or restart?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes Failure Flow angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What is the complete flow when an application crashes: Application to Kubelet to API Server to etcd to Controller Manager to new Pod or restart?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What is the complete flow when an application crashes: Application to Kubelet to API Server to etcd to Controller Manager to new Pod or restart?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 14

Interviewer:
What do you mean by content correlation in the context of Kubernetes or observability?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Content Correlation angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What do you mean by content correlation in the context of Kubernetes or observability?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What do you mean by content correlation in the context of Kubernetes or observability?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 83: Kubernetes Fundamentals Transcript Round.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
