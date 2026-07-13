# Product-Company System Design Rounds

Use this sequence: clarify requirements → estimate scale → define APIs/events → data model → high-level design → critical path → reliability → security/privacy → observability → cost → trade-offs → rollout.

## 1. Nation-scale healthcare event ingestion

Design a platform ingesting clinical and revenue-cycle events from thousands of hospitals with low latency.

Cover multi-tenant identity, API gateway, Kafka partitioning, schema registry, validation, deduplication, stream processing, object storage, analytics, replay, DLQ, regional failure, audit, encryption, PHI minimization, SLOs, and capacity estimates.

Follow-ups: a hospital sends a duplicate day of data; one tenant creates a hot partition; consumers lag for two hours; a schema change is incompatible; a region fails.

## 2. AI clinical workflow assistant

Design a secure assistant that retrieves approved clinical and operational content and invokes narrowly scoped tools.

Cover document ingestion, classification, chunking, embeddings, hybrid retrieval, authorization-aware filtering, citations, model gateway, prompt-injection defenses, human approval, audit, evaluation, fallbacks, latency, token cost, and sensitive-data boundaries.

Follow-ups: retrieved content is outdated; a document contains malicious instructions; the model provider is unavailable; a user requests another tenant's record.

## 3. Revenue-cycle AI agent platform

Design agents that recommend, but do not silently execute, revenue-cycle workflow actions.

Cover orchestration, tool registry or MCP, identity propagation, policy engine, approval workflow, idempotency, compensating action, durable state, timeout, audit, simulation, evaluation, and gradual rollout.

Follow-ups: a tool call succeeds but the agent times out; an approval arrives twice; a prompt attempts to bypass policy; the agent's recommendation quality degrades.

## 4. Internal developer platform

Design self-service creation of a production service with repository, pipeline, Terraform, Kubernetes namespace, secrets, observability, and ownership metadata.

Cover golden paths, service catalog, templates, platform API, asynchronous workflows, policy, quotas, approvals, GitOps, drift, rollback, tenancy, audit, adoption metrics, and break-glass operations.

Follow-ups: teams bypass the platform; provisioning partially succeeds; a module release breaks consumers; Git and cluster state disagree.

## 5. Multi-tenant Kubernetes/OpenShift platform

Design a shared platform for hundreds of application teams.

Cover cluster boundaries, namespaces/projects, RBAC, workload identity, quotas, priority, network isolation, admission policy, supply chain, node pools, autoscaling, upgrades, observability, chargeback, and disaster recovery.

Follow-ups: noisy neighbor; admission outage; node shortage; certificate expiry; stateful workload zone failure.

## 6. Reliable Kafka processing platform

Design an event platform supporting high throughput, tenant isolation, replay, and ordered processing.

Cover topics, keys, partitions, replication, producer guarantees, consumer groups, schema evolution, retry/DLQ, backpressure, reprocessing, security, monitoring, quotas, and cost.

Follow-ups: uneven partitions; rising lag with low CPU; poison message; broker loss; duplicate side effect.

## 7. Observability platform

Design metrics, logs, traces, profiles, dashboards, alerting, and SLO management for thousands of services.

Cover OpenTelemetry collectors, multi-tenancy, cardinality, sampling, retention, correlation, access control, PII redaction, recording rules, alert routing, cost, reliability, and platform self-monitoring.

Follow-ups: cardinality explosion; collector outage; logging bill doubles; missing trace context across Kafka; alert storm.

## 8. Global deployment and configuration service

Design safe configuration and software rollout across regions and Kubernetes clusters.

Cover desired state, immutable artifacts, staged rollout, canaries, health gates, approvals, signature verification, configuration schema, drift, rollback, audit, and regional autonomy.

Follow-ups: canary metrics pass but business metrics fall; registry outage; incompatible config; partial regional rollout.

## 9. Terraform automation service

Design an enterprise service that receives infrastructure requests, generates plans, applies after policy and approval, and tracks lifecycle.

Cover module registry, workspace isolation, state, locks, identity, plan storage, policy, approvals, asynchronous execution, idempotency, drift detection, failure recovery, audit, and secret protection.

Follow-ups: apply fails halfway; lock holder crashes; manually created resource; provider upgrade; malicious module.

## 10. Incident intelligence assistant

Design an assistant that correlates alerts, logs, traces, deployments, topology, and runbooks to help responders.

Cover event ingestion, service graph, retrieval, summarization, evidence links, permissions, feedback, hallucination control, human ownership, audit, and safe action boundaries.

Follow-ups: telemetry is incomplete; suggested remediation is dangerous; incident data contains secrets; two incidents overlap.

## 11. Distributed job scheduler

Design a scheduler for millions of recurring and one-off platform automation jobs.

Cover APIs, durable queue, timing wheel or polling, partitioning, leasing, worker heartbeat, retries, idempotency, priorities, cancellation, fairness, history, and regional failover.

## 12. Feature-flag service

Design a low-latency, highly available feature-flag platform with targeting and audit.

Cover control and data planes, SDK caching, streaming updates, consistency, evaluation rules, rollback, tenancy, stale behavior, privacy, and experimentation metrics.

## 13. Secrets distribution and rotation

Design secure delivery and zero-downtime rotation of application secrets across cloud and Kubernetes environments.

Cover identity, encryption, short-lived credentials, caching, revocation, dual-secret rollout, audit, failure modes, and break glass.

## 14. Backup and disaster-recovery platform

Design policy-driven backup, verification, retention, restore testing, and regional recovery for Kubernetes and cloud data services.

Cover discovery, consistency, snapshots, encryption, immutability, catalog, RPO/RTO, restore orchestration, evidence, cost tiers, and game days.

## 15. Product API rate-limiting service

Design distributed rate limiting for multiple tenants and API plans.

Cover token bucket versus sliding window, keys, Redis or local-plus-global design, atomicity, fail-open/closed behavior, headers, configuration propagation, hot keys, multi-region behavior, and observability.
