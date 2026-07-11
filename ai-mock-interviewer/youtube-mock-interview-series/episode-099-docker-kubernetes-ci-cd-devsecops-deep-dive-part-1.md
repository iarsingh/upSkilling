# Episode 99: Docker Kubernetes CI/CD DevSecOps Deep Dive - Part 1

YouTube title: DevOps Mock Interview Practice | Episode 99: Docker Kubernetes CI/CD DevSecOps Deep Dive - Part 1

Estimated duration: 22-27 min

Source round: Mock Interview 71 - Docker Kubernetes CI/CD DevSecOps Deep Dive (source set 71)

Focus: Dockerfile fundamentals, Kubernetes services and manifests, EKS deployment pipeline, ConfigMaps, Secrets, networking, service auth, Azure App Service, APIs, observability, scalability, and MLOps

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Docker Kubernetes CI/CD DevSecOps Deep Dive - Part 1.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- EKS: Elastic Kubernetes Service
- MLOps: Machine Learning Operations

---

## Question 1

Interviewer:
What is the purpose of EXPOSE in a Dockerfile?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Docker angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What is the purpose of EXPOSE in a Dockerfile?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is the purpose of EXPOSE in a Dockerfile?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
What is the difference between CMD and ENTRYPOINT?

Pause the video and answer this question aloud.

Senior Associate answer:
ENTRYPOINT defines the fixed executable that always runs when the container starts, while CMD provides default arguments to that entrypoint (or the default command if no ENTRYPOINT is set) that can be overridden at `docker run` time - combining both lets you build an image with a fixed main command but configurable default arguments.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is the difference between CMD and ENTRYPOINT?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
What is RUN used for in a Dockerfile?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Docker angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What is RUN used for in a Dockerfile?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is RUN used for in a Dockerfile?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
How do you expose a FastAPI application on port 8000 inside a Docker container?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Docker/FastAPI angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How do you expose a FastAPI application on port 8000 inside a Docker container?

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: How do you expose a FastAPI application on port 8000 inside a Docker container?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 5

Interviewer:
How does the application code become available inside the Docker container?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Docker angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How does the application code become available inside the Docker container?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How does the application code become available inside the Docker container?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
What command starts the application inside the container?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Docker angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What command starts the application inside the container?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What command starts the application inside the container?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
How do you publish a Docker container port to the host?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Docker/Networking angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How do you publish a Docker container port to the host?

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: How do you publish a Docker container port to the host?

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 8

Interviewer:
What is the purpose of docker run -p?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Docker/Networking angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What is the purpose of docker run -p?

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: What is the purpose of docker run -p?

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 9

Interviewer:
What are the different types of Kubernetes Services?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes/Services angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What are the different types of Kubernetes Services?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What are the different types of Kubernetes Services?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 10

Interviewer:
How do you expose an application externally?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes/Services angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How do you expose an application externally?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How do you expose an application externally?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 11

Interviewer:
What is the equivalent of Docker port mapping in Kubernetes?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes/Networking angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What is the equivalent of Docker port mapping in Kubernetes?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What is the equivalent of Docker port mapping in Kubernetes?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Closing

That completes Episode 99: Docker Kubernetes CI/CD DevSecOps Deep Dive - Part 1.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
