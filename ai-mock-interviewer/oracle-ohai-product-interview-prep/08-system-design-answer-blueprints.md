# Product System Design Answer Blueprints

These map to `03-product-system-design.md`. Start by confirming scale, latency, consistency, availability, retention, security, and cost expectations.

## 1. Nation-scale healthcare event ingestion

Use regional authenticated ingestion endpoints behind WAF/API gateway. Validate tenant, schema, size, and idempotency key before writing to Kafka. Partition primarily by tenant plus stable entity key, with a strategy for large tenants. A stream layer validates/enriches/deduplicates, writes immutable raw objects and curated analytical storage, and publishes downstream domain events. Use schema registry compatibility, retry/DLQ, replay from raw/Kafka, per-tenant encryption/access, PHI-minimized telemetry, audit, lag/freshness SLOs, and tested regional failover. Estimate peak events/second, payload bandwidth, partition throughput, storage/day, and consumer capacity.

## 2. AI clinical workflow assistant

Ingest only approved versioned sources; classify, chunk, attach tenant/ACL metadata, embed, and build hybrid index. At query time authenticate, derive authorization filters outside the model, retrieve/rerank, and generate from bounded context with citations. Treat retrieved text as untrusted, separate instructions from content, scan outputs, and allow only typed least-privilege tools with human approval for mutations. Log evidence and policy decisions without PHI, evaluate retrieval and groundedness, canary versions, and fall back to search or “insufficient evidence.”

## 3. Revenue-cycle AI agent

Use a durable workflow engine holding explicit state rather than an unconstrained loop. The model proposes a typed action; deterministic authorization/policy validates tenant, tool, arguments, and risk. Read-only low-risk calls may proceed; monetary/data mutations require approval and idempotency. Every call has deadline, retry class, audit, and compensating workflow. Evaluate recommendation quality offline and shadow-mode first, then roll out to narrow tenants with kill switch.

## 4. Internal developer platform

Expose a service catalog and API/portal that accepts a validated service contract. An asynchronous orchestrator creates repository and pipeline, submits version-pinned Terraform/GitOps changes, waits for policy/approval, and records status. Platform identities are short lived and scoped; golden paths supply secure defaults, ownership, SLOs, dashboards, and runbooks. Use idempotency, compensating cleanup, drift detection, module compatibility tests, exception expiry, adoption/DORA metrics, and clear team boundaries.

## 5. Multi-tenant Kubernetes/OpenShift

Separate clusters by environment, region, regulation, and blast radius; use namespaces/projects for teams inside a boundary. Federated identity maps groups to RBAC; workloads use short-lived identity. Apply quotas, priority, default-deny networking, SCC/pod security, admission policy, signed images, isolated node pools where required, and tenant-scoped telemetry. Upgrade with canary pools and surge; back up data/declarative state; provide chargeback and break glass.

## 6. Kafka platform

Offer governed topic creation with naming, ownership, schemas, quotas, retention, partitions, and replication. Producers use keys, `acks=all`, idempotence where appropriate; consumers use groups, bounded processing, idempotent effects, retry topics, DLQ, and replay tooling. Secure with TLS and narrow ACLs; monitor ISR, offline partitions, disk, request latency, producer errors, lag, skew, and rebalance loops. Multi-region strategy must explicitly state consistency and failover semantics.

## 7. Observability platform

Applications emit OpenTelemetry to local/cluster collectors; gateways batch, redact, sample, enrich, and route to metric/log/trace backends. Enforce tenant identity, quotas, cardinality and retention tiers. Correlate trace IDs, deployment versions, service ownership, and SLOs. Use recording rules and multi-window burn alerts, tail sampling for errors/latency, resilient collector queues, platform self-observability, and cost/showback dashboards.

## 8. Global deployment/configuration

Separate control plane from regional data-plane agents. Store versioned desired state and signed artifact digests; agents pull with scoped identity, verify signature/schema, and report observed state. Progress dev → canary → waves using health/business gates and automatic pause/rollback. Retain last-known-good config, tolerate control-plane loss, audit approvals, detect drift, and support regional freeze/break glass.

## 9. Terraform automation service

Receive a typed idempotent request; select an approved pinned module; create isolated workspace/state; run plan with short-lived identity; store redacted signed plan; evaluate policy; collect approval; apply under lock; record outputs/status. Use queue/workers, cancellation, retries only before unsafe boundaries, reconciliation after uncertain apply, scheduled drift plans, state versioning, provider canaries, and immutable audit.

## 10. Incident intelligence assistant

Ingest normalized alerts, deployments, topology, runbooks, and telemetry references. Build an incident workspace with service graph and timeline; retrieval is permission-filtered and responses cite evidence. The assistant summarizes hypotheses, never presents speculation as fact, and requires human choice before any action. Redact secrets, evaluate historical incidents, capture responder feedback, measure time-to-context/mitigation, and provide deterministic fallback search.

## 11. Distributed scheduler

API writes job definition and next-run state durably. Partition scheduler ownership using leases; enqueue due executions with unique run IDs. Workers claim leases, heartbeat, execute idempotently, and record outcome; expired leases permit retry. Support priorities/fairness, bounded retries/DLQ, cancellation, cron/timezone semantics, history, quotas, and regional recovery without double execution claims.

## 12. Feature flags

Control plane manages authenticated, audited flag changes and compiles rules. Globally replicated data plane/SDK cache evaluates locally for very low latency. Stream invalidations with polling fallback, version configs, define fail-safe defaults, hash stable subject IDs for percentage rollout, protect attributes, and provide immediate rollback and evaluation metrics.

## 13. Secrets rotation

Applications authenticate by workload identity to a secrets service and receive short-lived values. For unavoidable static secrets, publish a new version, allow old+new during transition, roll consumers, verify adoption, revoke old, and audit. Cache briefly in memory, encrypt transport/storage, avoid logs/files, handle manager outage with bounded stale policy, and test emergency revocation.

## 14. Backup/DR platform

Discover resources and apply policy by criticality. Coordinate application-consistent snapshots where necessary; encrypt and replicate immutable backups; maintain searchable catalog and retention/legal holds. Automatically restore into isolated environments, run data/application validation, record evidence, and conduct regional game days measuring RPO/RTO and failback.

## 15. Rate limiting

Use token bucket for burst-tolerant APIs or sliding window for stricter rolling limits. Key by authenticated tenant/API/plan; enforce atomically in Redis or a purpose-built store, with local token allocation to reduce global latency. Define fail-open/closed per endpoint risk, return standard limit/retry headers, protect hot keys, version configuration, monitor rejects/store latency, and define multi-region quota consistency.
