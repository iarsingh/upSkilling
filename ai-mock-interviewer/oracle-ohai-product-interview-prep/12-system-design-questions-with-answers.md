# Product System Design Questions with Answers

Use each answer as an interview blueprint: clarify requirements, estimate scale, present the architecture, and defend trade-offs.

## 1. Nation-scale healthcare event ingestion

**Question:**

Design a platform ingesting clinical and revenue-cycle events from thousands of hospitals with low latency.

Cover multi-tenant identity, API gateway, Kafka partitioning, schema registry, validation, deduplication, stream processing, object storage, analytics, replay, DLQ, regional failure, audit, encryption, PHI minimization, SLOs, and capacity estimates.

Follow-ups: a hospital sends a duplicate day of data; one tenant creates a hot partition; consumers lag for two hours; a schema change is incompatible; a region fails.

**Model answer:**

Use regional authenticated ingestion endpoints behind WAF/API gateway. Validate tenant, schema, size, and idempotency key before writing to Kafka. Partition primarily by tenant plus stable entity key, with a strategy for large tenants. A stream layer validates/enriches/deduplicates, writes immutable raw objects and curated analytical storage, and publishes downstream domain events. Use schema registry compatibility, retry/DLQ, replay from raw/Kafka, per-tenant encryption/access, PHI-minimized telemetry, audit, lag/freshness SLOs, and tested regional failover. Estimate peak events/second, payload bandwidth, partition throughput, storage/day, and consumer capacity.

## 2. AI clinical workflow assistant

**Question:**

Design a secure assistant that retrieves approved clinical and operational content and invokes narrowly scoped tools.

Cover document ingestion, classification, chunking, embeddings, hybrid retrieval, authorization-aware filtering, citations, model gateway, prompt-injection defenses, human approval, audit, evaluation, fallbacks, latency, token cost, and sensitive-data boundaries.

Follow-ups: retrieved content is outdated; a document contains malicious instructions; the model provider is unavailable; a user requests another tenant's record.

**Model answer:**

Ingest only approved versioned sources; classify, chunk, attach tenant/ACL metadata, embed, and build hybrid index. At query time authenticate, derive authorization filters outside the model, retrieve/rerank, and generate from bounded context with citations. Treat retrieved text as untrusted, separate instructions from content, scan outputs, and allow only typed least-privilege tools with human approval for mutations. Log evidence and policy decisions without PHI, evaluate retrieval and groundedness, canary versions, and fall back to search or “insufficient evidence.”

## 3. Revenue-cycle AI agent platform

**Question:**

Design agents that recommend, but do not silently execute, revenue-cycle workflow actions.

Cover orchestration, tool registry or MCP, identity propagation, policy engine, approval workflow, idempotency, compensating action, durable state, timeout, audit, simulation, evaluation, and gradual rollout.

Follow-ups: a tool call succeeds but the agent times out; an approval arrives twice; a prompt attempts to bypass policy; the agent's recommendation quality degrades.

**Model answer:**

Use a durable workflow engine holding explicit state rather than an unconstrained loop. The model proposes a typed action; deterministic authorization/policy validates tenant, tool, arguments, and risk. Read-only low-risk calls may proceed; monetary/data mutations require approval and idempotency. Every call has deadline, retry class, audit, and compensating workflow. Evaluate recommendation quality offline and shadow-mode first, then roll out to narrow tenants with kill switch.

## 4. Internal developer platform

**Question:**

Design self-service creation of a production service with repository, pipeline, Terraform, Kubernetes namespace, secrets, observability, and ownership metadata.

Cover golden paths, service catalog, templates, platform API, asynchronous workflows, policy, quotas, approvals, GitOps, drift, rollback, tenancy, audit, adoption metrics, and break-glass operations.

Follow-ups: teams bypass the platform; provisioning partially succeeds; a module release breaks consumers; Git and cluster state disagree.

**Model answer:**

Expose a service catalog and API/portal that accepts a validated service contract. An asynchronous orchestrator creates repository and pipeline, submits version-pinned Terraform/GitOps changes, waits for policy/approval, and records status. Platform identities are short lived and scoped; golden paths supply secure defaults, ownership, SLOs, dashboards, and runbooks. Use idempotency, compensating cleanup, drift detection, module compatibility tests, exception expiry, adoption/DORA metrics, and clear team boundaries.

## 5. Multi-tenant Kubernetes/OpenShift platform

**Question:**

Design a shared platform for hundreds of application teams.

Cover cluster boundaries, namespaces/projects, RBAC, workload identity, quotas, priority, network isolation, admission policy, supply chain, node pools, autoscaling, upgrades, observability, chargeback, and disaster recovery.

Follow-ups: noisy neighbor; admission outage; node shortage; certificate expiry; stateful workload zone failure.

**Model answer:**

Separate clusters by environment, region, regulation, and blast radius; use namespaces/projects for teams inside a boundary. Federated identity maps groups to RBAC; workloads use short-lived identity. Apply quotas, priority, default-deny networking, SCC/pod security, admission policy, signed images, isolated node pools where required, and tenant-scoped telemetry. Upgrade with canary pools and surge; back up data/declarative state; provide chargeback and break glass.

## 6. Reliable Kafka processing platform

**Question:**

Design an event platform supporting high throughput, tenant isolation, replay, and ordered processing.

Cover topics, keys, partitions, replication, producer guarantees, consumer groups, schema evolution, retry/DLQ, backpressure, reprocessing, security, monitoring, quotas, and cost.

Follow-ups: uneven partitions; rising lag with low CPU; poison message; broker loss; duplicate side effect.

**Model answer:**

Offer governed topic creation with naming, ownership, schemas, quotas, retention, partitions, and replication. Producers use keys, `acks=all`, idempotence where appropriate; consumers use groups, bounded processing, idempotent effects, retry topics, DLQ, and replay tooling. Secure with TLS and narrow ACLs; monitor ISR, offline partitions, disk, request latency, producer errors, lag, skew, and rebalance loops. Multi-region strategy must explicitly state consistency and failover semantics.

## 7. Observability platform

**Question:**

Design metrics, logs, traces, profiles, dashboards, alerting, and SLO management for thousands of services.

Cover OpenTelemetry collectors, multi-tenancy, cardinality, sampling, retention, correlation, access control, PII redaction, recording rules, alert routing, cost, reliability, and platform self-monitoring.

Follow-ups: cardinality explosion; collector outage; logging bill doubles; missing trace context across Kafka; alert storm.

**Model answer:**

Applications emit OpenTelemetry to local/cluster collectors; gateways batch, redact, sample, enrich, and route to metric/log/trace backends. Enforce tenant identity, quotas, cardinality and retention tiers. Correlate trace IDs, deployment versions, service ownership, and SLOs. Use recording rules and multi-window burn alerts, tail sampling for errors/latency, resilient collector queues, platform self-observability, and cost/showback dashboards.

## 8. Global deployment and configuration service

**Question:**

Design safe configuration and software rollout across regions and Kubernetes clusters.

Cover desired state, immutable artifacts, staged rollout, canaries, health gates, approvals, signature verification, configuration schema, drift, rollback, audit, and regional autonomy.

Follow-ups: canary metrics pass but business metrics fall; registry outage; incompatible config; partial regional rollout.

**Model answer:**

Separate control plane from regional data-plane agents. Store versioned desired state and signed artifact digests; agents pull with scoped identity, verify signature/schema, and report observed state. Progress dev → canary → waves using health/business gates and automatic pause/rollback. Retain last-known-good config, tolerate control-plane loss, audit approvals, detect drift, and support regional freeze/break glass.

## 9. Terraform automation service

**Question:**

Design an enterprise service that receives infrastructure requests, generates plans, applies after policy and approval, and tracks lifecycle.

Cover module registry, workspace isolation, state, locks, identity, plan storage, policy, approvals, asynchronous execution, idempotency, drift detection, failure recovery, audit, and secret protection.

Follow-ups: apply fails halfway; lock holder crashes; manually created resource; provider upgrade; malicious module.

**Model answer:**

Receive a typed idempotent request; select an approved pinned module; create isolated workspace/state; run plan with short-lived identity; store redacted signed plan; evaluate policy; collect approval; apply under lock; record outputs/status. Use queue/workers, cancellation, retries only before unsafe boundaries, reconciliation after uncertain apply, scheduled drift plans, state versioning, provider canaries, and immutable audit.

## 10. Incident intelligence assistant

**Question:**

Design an assistant that correlates alerts, logs, traces, deployments, topology, and runbooks to help responders.

Cover event ingestion, service graph, retrieval, summarization, evidence links, permissions, feedback, hallucination control, human ownership, audit, and safe action boundaries.

Follow-ups: telemetry is incomplete; suggested remediation is dangerous; incident data contains secrets; two incidents overlap.

**Model answer:**

Ingest normalized alerts, deployments, topology, runbooks, and telemetry references. Build an incident workspace with service graph and timeline; retrieval is permission-filtered and responses cite evidence. The assistant summarizes hypotheses, never presents speculation as fact, and requires human choice before any action. Redact secrets, evaluate historical incidents, capture responder feedback, measure time-to-context/mitigation, and provide deterministic fallback search.

## 11. Distributed job scheduler

**Question:**

Design a scheduler for millions of recurring and one-off platform automation jobs.

Cover APIs, durable queue, timing wheel or polling, partitioning, leasing, worker heartbeat, retries, idempotency, priorities, cancellation, fairness, history, and regional failover.

**Model answer:**

API writes job definition and next-run state durably. Partition scheduler ownership using leases; enqueue due executions with unique run IDs. Workers claim leases, heartbeat, execute idempotently, and record outcome; expired leases permit retry. Support priorities/fairness, bounded retries/DLQ, cancellation, cron/timezone semantics, history, quotas, and regional recovery without double execution claims.

## 12. Feature-flag service

**Question:**

Design a low-latency, highly available feature-flag platform with targeting and audit.

Cover control and data planes, SDK caching, streaming updates, consistency, evaluation rules, rollback, tenancy, stale behavior, privacy, and experimentation metrics.

**Model answer:**

Control plane manages authenticated, audited flag changes and compiles rules. Globally replicated data plane/SDK cache evaluates locally for very low latency. Stream invalidations with polling fallback, version configs, define fail-safe defaults, hash stable subject IDs for percentage rollout, protect attributes, and provide immediate rollback and evaluation metrics.

## 13. Secrets distribution and rotation

**Question:**

Design secure delivery and zero-downtime rotation of application secrets across cloud and Kubernetes environments.

Cover identity, encryption, short-lived credentials, caching, revocation, dual-secret rollout, audit, failure modes, and break glass.

**Model answer:**

Applications authenticate by workload identity to a secrets service and receive short-lived values. For unavoidable static secrets, publish a new version, allow old+new during transition, roll consumers, verify adoption, revoke old, and audit. Cache briefly in memory, encrypt transport/storage, avoid logs/files, handle manager outage with bounded stale policy, and test emergency revocation.

## 14. Backup and disaster-recovery platform

**Question:**

Design policy-driven backup, verification, retention, restore testing, and regional recovery for Kubernetes and cloud data services.

Cover discovery, consistency, snapshots, encryption, immutability, catalog, RPO/RTO, restore orchestration, evidence, cost tiers, and game days.

**Model answer:**

Discover resources and apply policy by criticality. Coordinate application-consistent snapshots where necessary; encrypt and replicate immutable backups; maintain searchable catalog and retention/legal holds. Automatically restore into isolated environments, run data/application validation, record evidence, and conduct regional game days measuring RPO/RTO and failback.

## 15. Product API rate-limiting service

**Question:**

Design distributed rate limiting for multiple tenants and API plans.

Cover token bucket versus sliding window, keys, Redis or local-plus-global design, atomicity, fail-open/closed behavior, headers, configuration propagation, hot keys, multi-region behavior, and observability.

**Model answer:**

Use token bucket for burst-tolerant APIs or sliding window for stricter rolling limits. Key by authenticated tenant/API/plan; enforce atomically in Redis or a purpose-built store, with local token allocation to reduce global latency. Define fail-open/closed per endpoint risk, return standard limit/retry headers, protect hot keys, version configuration, monitor rejects/store latency, and define multi-region quota consistency.
