# Episode 141: Database, SQL, NoSQL, and Distributed Data Round

YouTube title: Data Science Mock Interview Practice | Episode 141: Database, SQL, NoSQL, and Distributed Data Round

Estimated duration: 22-28 min

Source round: Python Full Stack to GenAI, ML, and Data Scientist Career Path

Focus: SQL, relational modelling, normalization, indexes, query plans, transactions, isolation, locking, NoSQL, replication, partitioning, sharding, migrations, multi-tenancy, reliability, and enterprise data architecture

## Opening

Hi everyone, welcome back to the Data Science Mock Interview Practice series.

In today's episode, we are practicing Database, SQL, NoSQL, and Distributed Data Round. Questions increase from foundation level to principal-level judgment.

Pause after each question and answer aloud. Clarify definitions and assumptions, show your method, discuss risks and limitations, and finish with how the result would support a decision.

---

## Question 1

Experience level: 0-1 year | Foundation

Interviewer:
Explain primary keys, foreign keys, unique constraints, nullability, normalization, and denormalization. Design basic users, products, orders, and order-items tables.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify workload, data shape, access patterns, consistency, scale, availability, retention, and compliance. Define the schema and queries, explain indexes and transaction boundaries, identify concurrency and failure risks, compare alternatives, and validate with plans, tests, metrics, backups, and recovery exercises. For this 0-1 year | Foundation question, the answer should demonstrate fundamental correctness and clear reasoning. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: definition -> simple example -> basic validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Explain primary keys, foreign keys, unique constraints, nullability, normalization, and denormalization. Design basic users, products, orders, and order-items tables.

What interviewer checks:
They are checking fundamental correctness and clear reasoning, plus whether you connect technical analysis to a defensible business decision.

---

## Question 2

Experience level: 0-1 year | Foundation

Interviewer:
Write SQL to return each customer's latest order, lifetime spend, and order count, including customers with no orders. Explain joins, grouping, and window-function alternatives.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify workload, data shape, access patterns, consistency, scale, availability, retention, and compliance. Define the schema and queries, explain indexes and transaction boundaries, identify concurrency and failure risks, compare alternatives, and validate with plans, tests, metrics, backups, and recovery exercises. For this 0-1 year | Foundation question, the answer should demonstrate fundamental correctness and clear reasoning. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: definition -> simple example -> basic validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Write SQL to return each customer's latest order, lifetime spend, and order count, including customers with no orders. Explain joins, grouping, and window-function alternatives.

What interviewer checks:
They are checking fundamental correctness and clear reasoning, plus whether you connect technical analysis to a defensible business decision.

---

## Question 3

Experience level: 1-3 years | Junior

Interviewer:
How do B-tree indexes work, when does a composite index help, and why can too many indexes make a write-heavy application slower?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify workload, data shape, access patterns, consistency, scale, availability, retention, and compliance. Define the schema and queries, explain indexes and transaction boundaries, identify concurrency and failure risks, compare alternatives, and validate with plans, tests, metrics, backups, and recovery exercises. For this 1-3 years | Junior question, the answer should demonstrate independent analysis and careful implementation. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: requirements -> method -> edge cases -> validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: How do B-tree indexes work, when does a composite index help, and why can too many indexes make a write-heavy application slower?

What interviewer checks:
They are checking independent analysis and careful implementation, plus whether you connect technical analysis to a defensible business decision.

---

## Question 4

Experience level: 1-3 years | Junior

Interviewer:
An API query became slow after a table reached 100 million rows. Walk through query plans, cardinality, indexes, statistics, pagination, N+1 queries, caching, and load-test validation.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify workload, data shape, access patterns, consistency, scale, availability, retention, and compliance. Define the schema and queries, explain indexes and transaction boundaries, identify concurrency and failure risks, compare alternatives, and validate with plans, tests, metrics, backups, and recovery exercises. For this 1-3 years | Junior question, the answer should demonstrate independent analysis and careful implementation. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: requirements -> method -> edge cases -> validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: An API query became slow after a table reached 100 million rows. Walk through query plans, cardinality, indexes, statistics, pagination, N+1 queries, caching, and load-test validation.

What interviewer checks:
They are checking independent analysis and careful implementation, plus whether you connect technical analysis to a defensible business decision.

---

## Question 5

Experience level: 3-5 years | Mid-Level

Interviewer:
Explain ACID transactions and common isolation levels. Demonstrate dirty reads, non-repeatable reads, phantom reads, lost updates, and write skew with practical examples.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify workload, data shape, access patterns, consistency, scale, availability, retention, and compliance. Define the schema and queries, explain indexes and transaction boundaries, identify concurrency and failure risks, compare alternatives, and validate with plans, tests, metrics, backups, and recovery exercises. For this 3-5 years | Mid-Level question, the answer should demonstrate project ownership, tradeoffs, and production awareness. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business goal -> design -> tradeoffs -> metrics.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Explain ACID transactions and common isolation levels. Demonstrate dirty reads, non-repeatable reads, phantom reads, lost updates, and write skew with practical examples.

What interviewer checks:
They are checking project ownership, tradeoffs, and production awareness, plus whether you connect technical analysis to a defensible business decision.

---

## Question 6

Experience level: 3-5 years | Mid-Level

Interviewer:
Design safe inventory reservation under concurrent checkout requests. Compare pessimistic locking, optimistic concurrency, atomic updates, idempotency, and reconciliation.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify workload, data shape, access patterns, consistency, scale, availability, retention, and compliance. Define the schema and queries, explain indexes and transaction boundaries, identify concurrency and failure risks, compare alternatives, and validate with plans, tests, metrics, backups, and recovery exercises. For this 3-5 years | Mid-Level question, the answer should demonstrate project ownership, tradeoffs, and production awareness. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business goal -> design -> tradeoffs -> metrics.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Design safe inventory reservation under concurrent checkout requests. Compare pessimistic locking, optimistic concurrency, atomic updates, idempotency, and reconciliation.

What interviewer checks:
They are checking project ownership, tradeoffs, and production awareness, plus whether you connect technical analysis to a defensible business decision.

---

## Question 7

Experience level: 5-7 years | Senior

Interviewer:
Choose between PostgreSQL, a document database, key-value store, wide-column database, graph database, and search engine for several application workloads. Explain access patterns and tradeoffs rather than choosing by popularity.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify workload, data shape, access patterns, consistency, scale, availability, retention, and compliance. Define the schema and queries, explain indexes and transaction boundaries, identify concurrency and failure risks, compare alternatives, and validate with plans, tests, metrics, backups, and recovery exercises. For this 5-7 years | Senior question, the answer should demonstrate leadership under ambiguity, scale, and cross-functional delivery. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: ambiguous goal -> system approach -> risks -> measurable decision.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Choose between PostgreSQL, a document database, key-value store, wide-column database, graph database, and search engine for several application workloads. Explain access patterns and tradeoffs rather than choosing by popularity.

What interviewer checks:
They are checking leadership under ambiguity, scale, and cross-functional delivery, plus whether you connect technical analysis to a defensible business decision.

---

## Question 8

Experience level: 5-7 years | Senior

Interviewer:
Design a highly available database layer with replicas, failover, backups, point-in-time recovery, connection pooling, read routing, monitoring, and tested disaster recovery. Explain replication lag and consistency risks.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify workload, data shape, access patterns, consistency, scale, availability, retention, and compliance. Define the schema and queries, explain indexes and transaction boundaries, identify concurrency and failure risks, compare alternatives, and validate with plans, tests, metrics, backups, and recovery exercises. For this 5-7 years | Senior question, the answer should demonstrate leadership under ambiguity, scale, and cross-functional delivery. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: ambiguous goal -> system approach -> risks -> measurable decision.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Design a highly available database layer with replicas, failover, backups, point-in-time recovery, connection pooling, read routing, monitoring, and tested disaster recovery. Explain replication lag and consistency risks.

What interviewer checks:
They are checking leadership under ambiguity, scale, and cross-functional delivery, plus whether you connect technical analysis to a defensible business decision.

---

## Question 9

Experience level: 7-10 years | Staff / Lead

Interviewer:
A growing multi-tenant system needs partitioning or sharding and a zero-downtime schema migration. Define shard keys, hot-key handling, rebalancing, dual writes, backfill, compatibility, validation, and rollback.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify workload, data shape, access patterns, consistency, scale, availability, retention, and compliance. Define the schema and queries, explain indexes and transaction boundaries, identify concurrency and failure risks, compare alternatives, and validate with plans, tests, metrics, backups, and recovery exercises. For this 7-10 years | Staff / Lead question, the answer should demonstrate cross-team influence and organization-level decision quality. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: organizational problem -> standards or platform -> adoption -> governance.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: A growing multi-tenant system needs partitioning or sharding and a zero-downtime schema migration. Define shard keys, hot-key handling, rebalancing, dual writes, backfill, compatibility, validation, and rollback.

What interviewer checks:
They are checking cross-team influence and organization-level decision quality, plus whether you connect technical analysis to a defensible business decision.

---

## Question 10

Experience level: 10+ years | Principal / Architect

Interviewer:
Define an enterprise data architecture across transactional databases, event streams, caches, search, analytics, and ML platforms. Address ownership, contracts, consistency, privacy, residency, lifecycle, resilience, cost, and an evolutionary migration strategy.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify workload, data shape, access patterns, consistency, scale, availability, retention, and compliance. Define the schema and queries, explain indexes and transaction boundaries, identify concurrency and failure risks, compare alternatives, and validate with plans, tests, metrics, backups, and recovery exercises. For this 10+ years | Principal / Architect question, the answer should demonstrate enterprise direction, executive communication, and durable business impact. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business strategy -> decision framework -> quantified uncertainty -> durable ownership.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Define an enterprise data architecture across transactional databases, event streams, caches, search, analytics, and ML platforms. Address ownership, contracts, consistency, privacy, residency, lifecycle, resilience, cost, and an evolutionary migration strategy.

What interviewer checks:
They are checking enterprise direction, executive communication, and durable business impact, plus whether you connect technical analysis to a defensible business decision.

---

## Closing

That completes Episode 141: Database, SQL, NoSQL, and Distributed Data Round.

Repeat the questions without reading the guides. For each answer, state the decision, assumptions, method, tradeoffs, validation evidence, limitations, and next action.
