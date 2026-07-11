# Episode 77: Complete DevOps GCP Kubernetes Screening Bank - Part 4

YouTube title: DevOps Mock Interview Practice | Episode 77: Complete DevOps GCP Kubernetes Screening Bank - Part 4

Estimated duration: 22-27 min

Source round: Mock Interview 62 - Complete DevOps GCP Kubernetes Screening Bank (source set 62)

Focus: Full consolidated screening list from shared interviews: background, GCP, Kubernetes, Docker, CI/CD, Terraform, monitoring, Git, Linux, databases, Kafka, production scenarios, behavioral, and MLOps/AI

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Complete DevOps GCP Kubernetes Screening Bank - Part 4.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- AI: Artificial Intelligence
- API: Application Programming Interface
- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- CNI: Container Network Interface
- DB: Database
- GCP: Google Cloud Platform
- IP: Internet Protocol
- MLOps: Machine Learning Operations
- REST: Representational State Transfer

---

## Question 1

Interviewer:
Explain Network Policies.

Pause the video and answer this question aloud.

Senior Associate answer:
Network Policies in Kubernetes are rules that control how Pods communicate with each other and with external endpoints at the IP and port level.
They act like a firewall for Pods inside a cluster.
________________


Core idea
A Network Policy defines which traffic is allowed or blocked between Pods.
By default:
         * All Pods can communicate with all other Pods (open network)
With Network Policies:
         * You explicitly allow only specific traffic
________________


Why Network Policies are used
They help to:
         * Improve cluster security
         * Isolate applications (multi-tenant environments)
         * Restrict database access
         * Control east-west traffic (service-to-service)
         * Reduce attack surface inside cluster
________________


How it works
Network Policies are enforced by a CNI plugin (Container Network Interface) that supports them, such as:
         * Calico
         * Cilium
         * Weave Net
________________


Important concept
👉 Network Policies are opt-in
         * If no policy exists → all traffic is allowed
         * Once a policy selects a Pod → default-deny behavior applies (for that Pod)
________________


Types of traffic rules
1. Ingress (incoming traffic)
Controls who can send traffic to the Pod.
2. Egress (outgoing traffic)
Controls where the Pod can send traffic.
________________


Example Network Policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-app-to-db
spec:
  podSelector:
    matchLabels:
      role: db


  policyTypes:
  - Ingress


  ingress:
  - from:
    - podSelector:
        matchLabels:
          role: app
    ports:
    - protocol: TCP
      port: 5432
________________


What this means
         * Only Pods with label role=app
         * Can access Pods with role=db
         * Only on port 5432 (PostgreSQL)
Everything else is blocked.
________________


Key components
1. podSelector
Selects which Pods the policy applies to
________________


2. ingress rules
Defines allowed incoming traffic
________________


3. egress rules
Defines allowed outgoing traffic
________________


4. namespaceSelector (optional)
Controls traffic between namespaces
________________


5. ports
Restricts allowed ports and protocols
________________


Default behavior
Scenario
	Behavior
	No NetworkPolicy
	All traffic allowed
	Policy exists for Pod
	Only allowed traffic passes
	________________


Simple analogy
Think of Pods like rooms in a building:
         * No policy → all doors open
         * Network Policy → security guard decides who can enter or leave each room
________________


Use cases
         * Database isolation (only backend can access DB)
         * Microservice segmentation
         * Blocking external access to internal services
         * Securing multi-tenant clusters
________________


Important limitation
Network Policies only work if:
         * Your CNI supports them (e.g., Calico, Cilium)
         * Otherwise they are ignored
________________


Best practices
         * Start with default-deny policies
         * Explicitly allow required traffic
         * Use labels consistently
         * Combine ingress + egress rules for full control
________________


Interview-ready definition
A Network Policy in Kubernetes is a security resource that defines rules for controlling ingress and egress traffic at the Pod level, acting as a firewall within the cluster and enforcing communication restrictions based on labels, namespaces, ports, and protocols using a compatible CNI plugin.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Explain Network Policies.

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 2

Interviewer:
How do you troubleshoot CrashLoopBackOff?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How do you troubleshoot CrashLoopBackOff?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How do you troubleshoot CrashLoopBackOff?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 3

Interviewer:
How do you debug a pending pod?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How do you debug a pending pod?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How do you debug a pending pod?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 4

Interviewer:
What commands do you use for troubleshooting?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Kubernetes angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What commands do you use for troubleshooting?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What commands do you use for troubleshooting?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 5

Interviewer:
Explain Helm.

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Helm angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Explain Helm.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Explain Helm.

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 6

Interviewer:
How have you organized Helm charts?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Helm angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How have you organized Helm charts?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How have you organized Helm charts?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 7

Interviewer:
How do you deploy applications using Helm?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Helm angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: How do you deploy applications using Helm?

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How do you deploy applications using Helm?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 8

Interviewer:
Explain Docker architecture.

Pause the video and answer this question aloud.

Senior Associate answer:
Docker Architecture
Docker follows a client-server architecture consisting of the Docker Client, Docker Daemon, Docker Host, and Docker Registry.
Components
1. Docker Client
The Docker Client is the interface through which users interact with Docker.
Examples:
docker build
docker run
docker pull
docker push
The client sends requests to the Docker Daemon using REST APIs.
________________


2. Docker Daemon (dockerd)
The Docker Daemon is the core Docker service that:
               * Builds images
               * Creates and manages containers
               * Manages networks
               * Manages volumes
               * Communicates with registries
It runs in the background and listens for Docker API requests.
________________


3. Docker Host
The machine where Docker is installed.
It contains:
               * Docker Daemon
               * Images
               * Containers
               * Networks
               * Volumes
A host can run multiple containers simultaneously.
________________


4. Docker Registry
A registry stores Docker images.
Examples:
               * Docker Hub
               * Amazon Web Services ECR
               * Google Cloud Artifact Registry
               * Microsoft ACR
Images are:
               * Pulled from registries
               * Pushed to registries
________________


Docker Architecture Flow
Developer
    │
docker run/build/pull
    │
    ▼
Docker Client
    │
REST API
    ▼
Docker Daemon (dockerd)
    │
 ┌──┴──────────────┐
 │                 │
 ▼                 ▼
Images         Containers
 │
 ▼
Docker Registry
Container Runtime Layer
Modern Docker uses:
               * containerd → Container lifecycle management
               * runc → Creates and runs containers according to OCI standards
Flow:
Docker Client
      │
      ▼
Docker Daemon
      │
      ▼
containerd
      │
      ▼
runc
      │
      ▼
Container
________________


Example:
docker run nginx
               1. User executes:
docker run nginx
               2. Docker Client sends request to Docker Daemon.
               3. Daemon checks if the image exists locally.
               4. If not found, it pulls the image from the registry.
               5. Docker creates a container from the image.
               6. Container starts and runs the Nginx process.
________________


Interview Answer (7+ Years Experience)
Docker uses a client-server architecture. The Docker Client communicates with the Docker Daemon through REST APIs. The Docker Daemon is responsible for building images, creating containers, managing networks and volumes, and interacting with registries such as Docker Hub. Under the hood, Docker uses containerd and runc to create and manage containers. When a user executes commands like docker run, the client sends the request to the daemon, which pulls the required image from a registry if necessary and then creates and starts the container on the Docker host.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Explain Docker architecture.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 9

Interviewer:
What is the difference between Docker and Kubernetes?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Docker angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What is the difference between Docker and Kubernetes?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is the difference between Docker and Kubernetes?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 10

Interviewer:
Explain Dockerfile.

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Docker angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: Explain Dockerfile.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Explain Dockerfile.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 11

Interviewer:
What are Docker volumes?

Pause the video and answer this question aloud.

Senior Associate answer:
A strong answer should directly address the Docker angle of the question. Start with the expected configuration, command, workflow, or troubleshooting principle. For hands-on assessment questions, state the exact file or command shape first, then explain the key fields, validation step, and common mistakes to avoid. Use the prompt details as acceptance criteria: What are Docker volumes?

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What are Docker volumes?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 77: Complete DevOps GCP Kubernetes Screening Bank - Part 4.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
