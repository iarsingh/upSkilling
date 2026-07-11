# Episode 64: Scenario-Based System Design for Full Stack Python and GenAI Round - Part 2

YouTube title: DevOps Mock Interview Practice | Episode 64: Scenario-Based System Design for Full Stack Python and GenAI Round - Part 2

Estimated duration: 16-21 min

Source round: Mock Interview 56 - Scenario-Based System Design for Full Stack Python and GenAI Round (source set 56)

Focus: Scenario-based system design for Python backend, frontend integration, databases, queues, caching, DevOps, scaling, reliability, incidents, GenAI, RAG, security, cost, and production tradeoffs

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Scenario-Based System Design for Full Stack Python and GenAI Round - Part 2.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- AI: Artificial Intelligence
- API: Application Programming Interface
- CDN: Content Delivery Network
- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- CPU: Central Processing Unit
- DB: Database
- GenAI: Generative Artificial Intelligence
- LLM: Large Language Model
- PII: Personally Identifiable Information
- RAG: Retrieval-Augmented Generation
- UI: User Interface

---

## Question 1

Interviewer:
Scenario: The frontend feels slow even though backend latency looks healthy. How would you investigate and improve end-user performance?

Pause the video and answer this question aloud.

Senior Associate answer:
Measure real user metrics: LCP, INP, CLS, JS bundle size, API waterfall, browser errors, CDN/cache behavior, and client rendering time. Backend latency may be fine while frontend is blocked by large bundles, sequential API calls, slow hydration, inefficient rendering, or poor caching. Improve with code splitting, CDN caching, image optimization, fewer round trips, optimistic UI where safe, pagination/virtualization, and frontend monitoring.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Scenario: The frontend feels slow even though backend latency looks healthy. How would you investigate and improve end-user performance?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
Scenario: A GenAI chat feature gives outdated or irrelevant answers from your knowledge base. How would you debug and redesign the RAG pipeline?

Pause the video and answer this question aloud.

Senior Associate answer:
Break the pipeline into ingestion, chunking, embedding, indexing, retrieval, reranking, prompt construction, and generation. Check whether source documents are fresh, chunks are too large/small, embeddings match the query domain, metadata filters are correct, and top-k results are relevant. Add retrieval evaluation sets, citations, recency metadata, document reindexing, hybrid search if needed, reranking, and feedback loops for bad answers.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: Scenario: A GenAI chat feature gives outdated or irrelevant answers from your knowledge base. How would you debug and redesign the RAG pipeline?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 3

Interviewer:
Scenario: A user tries prompt injection to make your AI assistant reveal internal documents. How would you prevent and monitor this?

Pause the video and answer this question aloud.

Senior Associate answer:
Treat all user input and retrieved text as untrusted. Enforce authorization before retrieval, isolate tenants, keep system instructions separate, filter retrieved documents by permission, and never put secrets or hidden policies in retrievable content. Add prompt-injection classifiers or rules, tool allowlists, output checks, refusal behavior, and audit logs. Monitor blocked attempts, unusual retrieval patterns, sensitive-document access, and user reports.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: Scenario: A user tries prompt injection to make your AI assistant reveal internal documents. How would you prevent and monitor this?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 4

Interviewer:
Scenario: Your LLM API cost increases 5x after adding a new AI feature. How would you investigate and optimize cost without hurting quality?

Pause the video and answer this question aloud.

Senior Associate answer:
Break cost down by feature, tenant, model, prompt version, token input/output, retrieval size, retries, and cache hit rate. Find whether prompt length, context size, traffic, model choice, or repeated queries caused the spike. Optimize with shorter prompts, smaller models for simple tasks, response length limits, semantic caching, better retrieval top-k, batching where possible, rate limits, and quality evaluations before changing models.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: Scenario: Your LLM API cost increases 5x after adding a new AI feature. How would you investigate and optimize cost without hurting quality?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 5

Interviewer:
Scenario: A third-party payment or email API is unreliable. How would you design retries, fallbacks, idempotency, and user experience?

Pause the video and answer this question aloud.

Senior Associate answer:
Set strict timeouts and retry transient failures with exponential backoff and jitter. Use idempotency keys so repeated requests do not double charge or duplicate messages. Put operations on a durable queue when user-facing latency should not wait for the provider. Add provider-specific circuit breakers, dead-letter queues, status tracking, reconciliation jobs, and user messages that are honest: pending, retrying, failed, or completed.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Scenario: A third-party payment or email API is unreliable. How would you design retries, fallbacks, idempotency, and user experience?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
Scenario: A background worker pipeline falls behind and queue depth keeps growing. How would you debug and redesign it?

Pause the video and answer this question aloud.

Senior Associate answer:
Check arrival rate versus processing rate, worker errors, retry storms, poison messages, dependency latency, CPU/memory, DB locks, and queue visibility timeout. Short term, scale workers, pause noisy producers, and isolate poison messages. Long term, partition queues by priority, add backpressure/rate limits, improve task idempotency, batch safe operations, tune concurrency, autoscale on queue age, and add dead-letter handling.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Scenario: A background worker pipeline falls behind and queue depth keeps growing. How would you debug and redesign it?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
Scenario: You need to migrate a monolithic Django app to services without stopping product delivery. What migration plan would you propose?

Pause the video and answer this question aloud.

Senior Associate answer:
Start with a modular monolith cleanup: clear boundaries, domain ownership, tests, and observability. Choose one low-risk bounded context, expose APIs/events, and use the strangler pattern to route that capability to a new service while the monolith still runs. Keep shared database changes careful, prefer backward-compatible contracts, migrate data incrementally, and use feature flags. Avoid splitting everything at once; measure reliability and team velocity after each extraction.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Scenario: You need to migrate a monolithic Django app to services without stopping product delivery. What migration plan would you propose?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
Scenario: You are asked to review a proposed full-stack AI application before launch. What risks, tradeoffs, and readiness checks would you cover?

Pause the video and answer this question aloud.

Senior Associate answer:
Review functional requirements, data flow, auth, tenant isolation, threat model, PII handling, model/provider choice, RAG quality, prompt injection risk, cost controls, latency SLOs, fallback behavior, observability, evals, CI/CD, rollback, database migrations, capacity, and incident runbooks. Ask what can fail, who is impacted, how it is detected, how it is mitigated, and what evidence proves the system is ready for production.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Scenario: You are asked to review a proposed full-stack AI application before launch. What risks, tradeoffs, and readiness checks would you cover?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 64: Scenario-Based System Design for Full Stack Python and GenAI Round - Part 2.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
