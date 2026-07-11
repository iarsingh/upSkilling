# Episode 48: Today AI/Python/Cloud/SRE Recap - Part 1

YouTube title: DevOps Mock Interview Practice | Episode 48: Today AI/Python/Cloud/SRE Recap - Part 1

Estimated duration: 16-21 min

Source round: Mock Interview 48 - Today AI/Python/Cloud/SRE Recap (source set 48)

Focus: AI engineering libraries, Python equality and multiprocessing, AWS to GCP migration, Terraform IAM recovery, multi-environment architecture, Kubernetes policy guardrails, observability, tracing, burn-rate alerts, and outage mitigation decisions

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Today AI/Python/Cloud/SRE Recap - Part 1.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- AI: Artificial Intelligence
- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- CPU: Central Processing Unit
- DNS: Domain Name System
- DR: Disaster Recovery
- EKS: Elastic Kubernetes Service
- GCP: Google Cloud Platform
- GenAI: Generative Artificial Intelligence
- GKE: Google Kubernetes Engine
- HA: High Availability
- IaC: Infrastructure as Code
- IAM: Identity and Access Management
- RAG: Retrieval-Augmented Generation
- RPO: Recovery Point Objective
- RTO: Recovery Time Objective
- SRE: Site Reliability Engineering
- VPC: Virtual Private Cloud

---

## Question 1

Interviewer:
Today interview 2026-07-06 - AI engineering libraries: What Python libraries are most useful for AI Engineering nowadays?

Pause the video and answer this question aloud.

Senior Associate answer:
Group the answer by lifecycle. For model and data work: NumPy, pandas, scikit-learn, PyTorch, TensorFlow, Hugging Face Transformers, sentence-transformers, and XGBoost/LightGBM are common. For GenAI and RAG: LangChain, LlamaIndex, OpenAI/Anthropic/Vertex AI SDKs, FAISS/Chroma/Milvus/Pinecone clients, and evaluation tools like Ragas or DeepEval. For production AI engineering: FastAPI, Pydantic, MLflow, Airflow/Prefect, Kubernetes clients, OpenTelemetry, Prometheus clients, pytest, and cloud SDKs matter because the job is not only model building; it is packaging, serving, monitoring, evaluating, and operating AI systems safely.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: Today interview 2026-07-06 - AI engineering libraries: What Python libraries are most useful for AI Engineering nowadays?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 2

Interviewer:
Today interview 2026-07-06 - Python multiprocessing: Explain multiprocessing in Python. When should you use multiprocessing instead of multithreading?

Pause the video and answer this question aloud.

Senior Associate answer:
Multiprocessing runs work in separate OS processes, each with its own Python interpreter and memory space. It is useful for CPU-bound work because separate processes can run on multiple CPU cores and avoid the Global Interpreter Lock limiting Python bytecode execution. Use multithreading mostly for I/O-bound tasks such as network calls, file reads, or waiting on APIs. Use multiprocessing for CPU-heavy parsing, image processing, feature computation, encryption, compression, or batch transformations. The tradeoff is higher overhead: data must be serialized between processes, process startup is heavier than threads, and shared state needs queues, pipes, shared memory, or external storage.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Today interview 2026-07-06 - Python multiprocessing: Explain multiprocessing in Python. When should you use multiprocessing instead of multithreading?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
Today interview 2026-07-06 - Python identity: Explain the difference between == and is in Python, using list examples.

Pause the video and answer this question aloud.

Senior Associate answer:
== compares values; is compares object identity. With a = [1, 2], b = [1, 2], and c = a: a == b is True because both lists contain the same values; a is b is False because they are two different list objects; a is c is True because c points to the same list object as a. In interviews, mention that is should normally be used for identity checks such as x is None, not for normal value comparison.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Today interview 2026-07-06 - Python identity: Explain the difference between == and is in Python, using list examples.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
Today interview 2026-07-06 - AWS to GCP migration: Suppose a client has an application running on AWS. How would you migrate it to GCP across discovery, network, IAM, database, storage, CI/CD, validation, cutover, and rollback?

Pause the video and answer this question aloud.

Senior Associate answer:
Start with discovery: inventory services, dependencies, traffic, data size, RTO/RPO, compliance, and current IaC. Map AWS constructs to GCP equivalents: VPC/subnets/security groups to VPC/firewall rules, IAM roles to service accounts/IAM bindings, S3 to Cloud Storage, RDS to Cloud SQL/AlloyDB, EKS/ECS to GKE/Cloud Run, CloudWatch to Cloud Operations. Build landing zone, networking, IAM, logging, and CI/CD first. Migrate data with replication where possible, run parallel validation, deploy the app in GCP using immutable artifacts, test functional, performance, security, and DR paths, then cut over gradually through DNS, load balancer, or traffic splitting. Keep rollback ready by leaving AWS healthy until GCP has passed agreed success criteria.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Today interview 2026-07-06 - AWS to GCP migration: Suppose a client has an application running on AWS. How would you migrate it to GCP across discovery, network, IAM, database, storage, CI/CD, validation, cutover, and rollback?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 5

Interviewer:
Today interview 2026-07-06 - Terraform IAM recovery: A Terraform change accidentally removed production Service Account permissions. How would you debug and recover?

Pause the video and answer this question aloud.

Senior Associate answer:
Treat it as an incident first: stop further applies, identify impacted service accounts and customer impact, and restore the minimum required permissions quickly from a known-good plan, previous state, audit logs, or a break-glass runbook. Check CI/CD logs, Terraform plan/apply output, state history, Git diff, provider change, and Cloud Audit Logs for SetIamPolicy or binding changes. If workloads are down, temporarily re-grant least-privilege roles manually or through an emergency Terraform patch, then validate services recover. After mitigation, fix the root cause: avoid authoritative IAM resources where additive bindings are safer, add policy-as-code checks, require plan review for IAM diffs, isolate state blast radius, and add tests that detect removal of critical bindings.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: Today interview 2026-07-06 - Terraform IAM recovery: A Terraform change accidentally removed production Service Account permissions. How would you debug and recover?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 6

Interviewer:
Today interview 2026-07-06 - Multi-environment architecture: Design a multi-environment architecture for Dev, QA, and Prod.

Pause the video and answer this question aloud.

Senior Associate answer:
Use separate projects/accounts per environment, with clear folder hierarchy, separate IAM, separate Terraform state, separate service accounts, and environment-specific network boundaries. Dev can be lower-cost and more permissive for experimentation, QA/staging should mirror prod topology closely enough for reliable testing, and prod should have stronger approvals, HA, backup, monitoring, and access controls. Reuse the same Terraform modules and deployment templates across environments, changing only inputs such as sizing, replicas, CIDRs, retention, and approval gates.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Today interview 2026-07-06 - Multi-environment architecture: Design a multi-environment architecture for Dev, QA, and Prod.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
Today interview 2026-07-06 - Terraform state isolation: How would you isolate infrastructure and Terraform state across environments?

Pause the video and answer this question aloud.

Senior Associate answer:
Use separate state files/backends per environment, separate backend paths or workspaces with strict naming, separate credentials/service accounts, and ideally separate GCP projects or folders. Keep shared modules versioned separately from live environment code. Limit each state file's blast radius by domain: network, IAM, GKE, databases, and app layer should not all be in one huge state if ownership and risk differ. Enable state locking, versioning, audit logs, and least-privilege access to the backend.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Today interview 2026-07-06 - Terraform state isolation: How would you isolate infrastructure and Terraform state across environments?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 8

Interviewer:
Today interview 2026-07-06 - NetworkPolicy and admission control: How do you pair Kubernetes Network Policies with Admission Controllers?

Pause the video and answer this question aloud.

Senior Associate answer:
Network Policies enforce runtime traffic rules: which Pods can talk to which Pods or external destinations. Admission controllers enforce what is allowed to enter the cluster in the first place. Together, they create defense in depth: use Gatekeeper/Kyverno/Pod Security Admission to require labels, deny privileged Pods, require namespace ownership, and require default-deny plus approved allow policies; then use NetworkPolicies to enforce the actual east-west traffic boundaries. Admission prevents unsafe workloads or missing controls from being deployed, while NetworkPolicy limits blast radius if something is deployed or compromised.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: Today interview 2026-07-06 - NetworkPolicy and admission control: How do you pair Kubernetes Network Policies with Admission Controllers?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Closing

That completes Episode 48: Today AI/Python/Cloud/SRE Recap - Part 1.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
