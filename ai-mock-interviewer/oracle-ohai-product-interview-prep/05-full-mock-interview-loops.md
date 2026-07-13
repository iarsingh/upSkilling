# Full Mock Interview Loops

## Loop 1 — Hiring manager and resume depth (50 minutes)

1. Two-minute introduction.
2. Why Oracle Health, and why this role?
3. Deep dive: reusable Terraform platform modules.
4. Deep dive: production GKE ownership and one incident.
5. Deep dive: Python automation design and testing.
6. Gap question: OCI, OpenShift, Kafka, or healthcare experience.
7. OHAI value: Own without ego.
8. Candidate questions.

Score 1-5 on role relevance, technical depth, personal ownership, quantified evidence, honesty, and communication.

## Loop 2 — Coding and scripting (60 minutes)

1. Implement a paginated API client with retries and tests.
2. Implement dependency ordering with cycle detection.
3. Write or review a safe Shell health-check script.
4. Explain complexity, failure modes, observability, and productionization.

Passing signals: clarifies behavior, chooses suitable data structures, writes readable code, tests edge cases, avoids unbounded retries, and communicates while solving.

## Loop 3 — Kubernetes and production debugging (60 minutes)

Scenario: after a deployment, p95 latency rises, intermittent 503s appear, HPA oscillates, and new Pods sometimes remain Pending.

Ask the candidate to investigate load balancer, Gateway/Ingress, Service endpoints, readiness and shutdown, application metrics, resource requests, throttling, scheduling constraints, autoscaling metrics, nodes, recent changes, rollback criteria, and prevention.

Then ask OpenShift differences, multi-tenancy controls, upgrade safety, and stateful recovery.

## Loop 4 — Product system design (60 minutes)

Design the nation-scale healthcare event-ingestion platform from `03-product-system-design.md`.

Required checkpoints: functional requirements, scale estimates, API/event contract, partitioning, deduplication, data stores, failure handling, replay, multi-tenancy, security/privacy, SLOs, observability, regional recovery, cost, and rollout.

## Loop 5 — AI platform design (60 minutes)

Design the secure AI clinical workflow assistant.

Required checkpoints: grounded retrieval, access-aware filtering, evaluation, prompt-injection defense, tool safety, human approval, sensitive-data controls, audit, model fallback, quality monitoring, and cost.

## Loop 6 — SRE and incident leadership (50 minutes)

1. Define an SLO for healthcare event freshness.
2. Diagnose Kafka lag with low consumer CPU.
3. Respond to a regional outage.
4. Write the RCA outline.
5. Prioritize follow-up work using error budget and risk.
6. Explain stakeholder communication cadence.

## Loop 7 — OHAI values (50 minutes)

Ask one question each for Put customers first, Act now iterate, Take risks remain calm, Own without ego, Earn trust give trust, and Challenge ideas champion execution. Apply the follow-ups from `04-behavioral-and-ohai-values.md` until personal ownership and evidence are clear.

## Final scoring rubric

Score each dimension from 1 to 5:

- Coding correctness and test discipline
- Python/Shell production quality
- Kubernetes/OpenShift depth
- Terraform and cloud automation
- Distributed systems and Kafka reasoning
- Observability and incident response
- Product system-design structure
- AI/RAG/agent safety and evaluation
- Security and sensitive-data judgment
- OHAI values and collaboration
- Communication, ownership, and honesty

Interpretation:

- 5: independently leads ambiguous, high-scale production work and teaches trade-offs
- 4: strong hands-on depth with minor gaps and clear ownership
- 3: workable knowledge but inconsistent depth or production evidence
- 2: mostly conceptual, requires substantial guidance
- 1: incorrect, unsafe, or unable to explain personal contribution

## Questions to ask the interviewers

1. What are the highest-impact platform or AI reliability problems this team expects the new hire to solve in the first six months?
2. How are responsibilities divided between application, data, AI, SRE, and platform teams?
3. What scale, latency, availability, and data-governance requirements shape the architecture?
4. How mature are the Kubernetes/OpenShift, Terraform, observability, and developer-platform capabilities today?
5. How does the team evaluate RAG or agent quality and control tool-use risk?
6. Which OHAI value most influences day-to-day engineering decisions on this team?
7. What distinguishes engineers who perform exceptionally well in this role?
