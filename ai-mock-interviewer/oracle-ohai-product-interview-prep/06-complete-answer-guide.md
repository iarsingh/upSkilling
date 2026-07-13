# Complete Technical Answer Guide

These answers map to `01-complete-question-bank.md`. Treat them as speaking frameworks, not scripts. Replace bracketed details with truthful examples and never claim experience you do not have.

## Resume and project deep dive

1. **Introduction:** “I am a DevOps and platform engineer with nearly seven years across GCP, AWS, and Azure. My strongest areas are Kubernetes, Terraform, CI/CD, observability, security, and Python automation. At Capgemini I work on GCP landing zones, reusable Terraform modules, GKE operations, cost controls, and emerging ML/LLM platforms. This role fits because it combines production platform engineering with distributed data and responsible AI.”
2. **Largest platform:** State users/teams, clusters/projects, request volume, availability target, your decisions, and measurable outcome. Separate “I owned” from “the team owned.”
3. **Landing zone:** Organization/folders contain environment or business-unit projects; a host project owns Shared VPC; service projects consume subnets; groups and workload identities receive least privilege; org policies, centralized logs, billing labels, and Terraform policy provide guardrails.
4. **70% claim:** Compare median manual/request-to-ready time before and after automation across similar requests. Explain sample size, whether review time was included, and that the number is an internal operational measure—not an absolute engineering productivity claim.
5. **Module consumption:** Version modules with semantic tags, publish examples and contracts, pin versions, run validation/integration tests, publish changelogs, deprecate gradually, and assign an owner and support channel.
6. **GKE incident:** Use symptom → blast radius → mitigation → evidence → root cause → permanent fix. Include exact signals and commands, such as rollout status, events, previous logs, endpoints, throttling, scheduling, and load-balancer health.
7. **20% cost reduction:** Break savings into rightsizing, idle-resource cleanup, storage lifecycle, committed use where appropriate, logging retention, and scheduling. Compare normalized monthly spend before and after while accounting for traffic growth.
8. **99.9% availability:** Define a request-based or time-based SLI at the user boundary, exclude only agreed cases, calculate good/valid events, and report monthly compliance. 99.9% permits roughly 43.8 minutes of unavailability in a 30-day month.
9. **OpenTelemetry:** Instrument services or auto-instrument; propagate W3C trace context; deploy collectors for batching, filtering, redaction, sampling, and export; correlate trace IDs in logs; build service dashboards and SLO alerts.
10. **MLflow/FastAPI:** Describe tracking server, durable metadata database, object artifact storage, authentication, TLS ingress, Kubernetes deployment, backups, monitoring, model promotion, serving API, canary rollout, and rollback.
11. **Repository migration:** Explain inventory, dependency mapping, history/branch/tag migration, pipeline and permission translation, rehearsals, freeze/cutover, validation, rollback, and adoption measurement.
12. **DR event:** State RPO/RTO, protected objects/data, backup consistency, encryption, restore environment, validation checks, cutover, evidence, and lessons from a drill or real event.
13. **Career progression:** TCS built production operations and incident foundations; Tech Mahindra expanded multi-cloud CI/CD, Kubernetes, backup, and platform responsibility; Capgemini adds architecture, governance, self-service, cost, security, and AI platform work.
14. **Production Python:** Choose a real tool and explain package structure, APIs, tests, typing, logging, retries, idempotency, release process, and consumers. If most work was scripting, say so honestly.
15. **Challenged claim:** Select one metric or broad technology claim, define its scope precisely, and explain what you did not own. Precision builds credibility.

## Python and software engineering

16. Use `src/`, tests, typed domain modules, adapters for external APIs, configuration, CLI/API entrypoints, structured logging, dependency lock, CI checks, and packaging. Keep business logic separate from I/O.
17. Iterators pull one item at a time; generators create lazy iterators; decorators wrap cross-cutting behavior; context managers guarantee setup/cleanup; dataclasses model typed records. Give a cloud inventory or lock example for each.
18. Threads suit blocking I/O libraries; asyncio suits large numbers of cooperative I/O tasks; processes suit CPU-bound work. Bound concurrency and preserve cancellation, timeouts, and error reporting.
19. In standard CPython, the GIL normally permits one thread to execute Python bytecode at a time. Threads still help I/O because the GIL is released while waiting; processes bypass it for CPU work at IPC/memory cost.
20. Set connect/read timeouts, paginate, classify retryable errors, use capped exponential backoff with jitter, respect `Retry-After`, limit concurrency, make calls idempotent, expose metrics, and fail permanently on auth or validation errors.
21. An idempotent operation produces the same intended state when repeated. Use a client idempotency key, durable request/result record, unique constraint, transactional state change, and replay of the stored response.
22. Load non-secret config from validated environment/files; retrieve secrets using workload identity; emit structured logs with correlation IDs; expose RED metrics and traces; redact sensitive values.
23. Inject client interfaces, use fakes or mocks for unit tests, recorded/local emulators for integration tests, isolated test projects for end-to-end tests, and assert that dry-run makes no mutation.
24. Unit tests isolate logic; integration tests verify real component contracts; contract tests protect consumer/provider schemas; end-to-end tests validate a journey; chaos tests validate behavior under controlled failures.
25. Types catch interface errors, linting standardizes correctness, lockfiles make builds repeatable, and SCA/scanning finds known risk. Enforce them in CI but retain reviewed exceptions.
26. Measure first with wall-clock metrics, `cProfile`/sampling, and I/O timings. Optimize the actual bottleneck through batching, caching, better algorithms, bounded concurrency, or processes for CPU work.
27. Separate plan from apply; support `--dry-run`, environment allowlists, confirmation for destructive actions, resume checkpoints, idempotency keys, bounded workers, per-item results, and nonzero exit codes.
28. Retry transient failures only; fail fast on invalid/auth input; skip only when partial success is an explicit contract; compensate when a distributed workflow cannot be atomic. Preserve the original error and context.
29. Stream chunks/lines, keep bounded state, batch outputs, checkpoint progress, apply backpressure, and use external sorting or partitioned aggregation when global ordering is required.
30. Block unbounded retries/concurrency, missing timeouts, secret leakage, unsafe deletion, non-idempotent reruns, swallowed errors, no tests, weak validation, mutable global state, or unclear ownership.

## Linux and Shell scripting

31. A process owns an address space and resources; threads share process memory; file descriptors reference open I/O; signals deliver asynchronous notifications; exit codes communicate outcome to the parent.
32. High load includes runnable and uninterruptible tasks. Low CPU can indicate blocked disk/NFS I/O, lock contention, or stuck kernel operations. Inspect `uptime`, `vmstat`, `iostat`, `pidstat`, process states, and storage latency.
33. Check `free`, `vmstat`, PSI, cgroup metrics, `dmesg`, and process RSS. Distinguish page cache from pressure, find leaks or undersized limits, and fix requests/limits or application memory behavior before adding capacity.
34. `-e` exits on many unhandled failures, `-u` rejects unset variables, and `pipefail` propagates pipeline failures. `-e` has conditional/subshell exceptions, so explicitly check important commands.
35. Unquoted expansions undergo splitting and globbing. Quote variables, use arrays, prefer `$(...)`, delimit options with `--`, and never build commands by concatenating untrusted strings.
36. Detect desired state before mutation, use atomic writes, unique constraints/locks, safe retries, checkpoints, and explicit dry-run. Repeating the script should converge rather than duplicate.
37. Move to Python/Go when parsing structured data, testing complex logic, concurrency, APIs, portability, or maintainability dominates simple command orchestration.
38. Create temp files with `mktemp`, restrict permissions, register `trap` cleanup, use `flock` or atomic directory creation, validate ownership before removing, and handle SIGINT/SIGTERM.
39. Cron has a small environment and different working directory/PATH. Use absolute paths, capture stdout/stderr, check user/permissions, timezone, shell, credentials, and environment initialization.
40. Run ShellCheck and formatting; use Bats or a test harness; mock commands through PATH; test exit codes/output, failures, signals, empty input, and dry-run in disposable containers.

## Kubernetes, GKE, and OpenShift

41. Client authenticates to API server; admission defaults/validates; desired state is stored in etcd; controllers create subordinate objects; scheduler binds a Pod to a node; kubelet asks the runtime to pull/start containers and reports status.
42. API server is the validated state gateway; etcd is consistent state storage; scheduler chooses nodes; controllers reconcile desired state; kubelet reconciles Pods on its node; runtime manages containers.
43. Deployment manages replaceable stateless replicas; StatefulSet adds stable identity/ordered storage; DaemonSet runs per eligible node; Job completes finite work; CronJob schedules Jobs.
44. Requests drive scheduling and CPU utilization; limits cap resources; CPU is throttled; memory breach can OOM kill; QoS and usage influence eviction. Set values from observed working-set and load tests.
45. Inspect events, requests versus allocatable, affinity/anti-affinity, topology spread, taints, quotas, PVC zone, host ports, priority/preemption, and autoscaler logs. Aggregate free capacity may be fragmented.
46. `get/describe` Pod, inspect events, current and `--previous` logs, exit reason/code, command/config/secrets, probes, resource limits, dependencies, node condition, and recent rollout; reproduce safely and roll back if impact is active.
47. Startup protects slow initialization; readiness controls endpoints; liveness restarts a stuck container. On shutdown fail readiness, drain endpoints, handle SIGTERM, finish work within grace period, then exit.
48. Causes include readiness too early, endpoint propagation, abrupt SIGTERM, short grace period, insufficient surge, unhealthy new version, connection draining, or PDB/capacity constraints.
49. HPA changes replicas from metrics; VPA changes requests; Cluster Autoscaler changes nodes for unschedulable Pods; KEDA scales from event sources. Avoid conflicting HPA/VPA control of the same CPU/memory signal.
50. ClusterIP is internal virtual service; headless exposes endpoints directly; NodePort opens every node; LoadBalancer provisions external/internal LB; Ingress provides HTTP routing; Gateway API separates infrastructure and route ownership with richer types.
51. CoreDNS resolves names; CNI configures Pod networking; kube-proxy or eBPF implements Service routing; cloud routes/encapsulation cross nodes; NetworkPolicy permits selected flows.
52. Compare same-node/cross-node paths; inspect CNI agents, routes/tunnels, MTU, node firewalls, NetworkPolicy, conntrack, packet counters, and packet captures at Pod/node boundaries.
53. Apply namespace default deny ingress/egress, explicitly allow DNS and required service identities/namespaces/CIDRs, test positive and negative paths, validate policies in CI, and monitor drops.
54. Bind groups to narrow Roles, avoid wildcards and `cluster-admin`, isolate CI identities, audit `create pods`, `bind/escalate/impersonate`, Secrets, webhooks, and exec permissions because these can escalate indirectly.
55. Projected tokens are audience-bound, short-lived, and rotated. Disable automount where unnecessary and exchange workload identity for cloud access instead of storing long-lived keys.
56. ConfigMaps are non-secret configuration; Kubernetes Secrets are only base64 API objects unless protected; Vault/cloud managers add centralized policy, rotation, audit, and dynamic secrets. Prefer workload identity and short-lived retrieval.
57. PVC requests storage; StorageClass selects dynamic provisioning; PV represents provisioned volume; CSI implements lifecycle; topology constrains zones. Snapshot is not sufficient until restore is regularly tested.
58. Check compatibility/deprecations, upgrade control plane first, use a canary node pool, ensure surge capacity/PDBs/probes, drain gradually, observe SLOs, and retain rollback or workload-migration options.
59. Identify which budget and replica/readiness state blocks eviction. Restore healthy replicas/capacity first; coordinate a temporary, reviewed relaxation only when availability risk is understood.
60. Protect data consistency before availability: confirm quorum and fencing, restore/attach replicated storage according to database procedure, preserve ordinal identity, validate data, and only then resume writes.
61. One cluster improves utilization but increases blast radius; multiple clusters isolate region/tenant/lifecycle at operational cost; virtual clusters add control-plane isolation over shared nodes. Decide from compliance, blast radius, scale, and team ownership.
62. Use quotas, LimitRanges, requests/limits, priority classes, fair API queuing, network policy, dedicated node pools/taints for sensitive workloads, cardinality controls, and per-tenant usage reporting.
63. Built-in/custom admission validates or mutates requests; Gatekeeper uses OPA constraints; Kyverno uses Kubernetes-native policies. Start audit-only, test, provide clear remediation and controlled exceptions, then enforce.
64. Mitigate through a controlled break-glass path or failure policy based on risk. Redesign with multiple replicas, PDB, independent dependencies, short timeout, certificate monitoring, narrow match rules, and documented recovery.
65. OpenShift is Kubernetes with integrated platform opinions: Projects, Routes, Operators/OLM, stricter Security Context Constraints, integrated registry/build and administration. Core workload concepts transfer, but security and operational workflows differ.
66. Learn OpenShift networking, SCCs, Routes, Operators/OLM, cluster version upgrades, MachineConfig, registry, monitoring, identity, and vendor-supported lifecycle in a lab before production ownership.
67. An ephemeral container enters a running Pod's namespaces for diagnostics when the image lacks tools. Restrict RBAC, use approved images, audit access, and avoid changing production state.
68. Keep declarative cluster/workload state in Git, externalize encrypted secrets, back up stateful data and required control-plane objects, document bootstrap ordering, rebuild in a clean environment, and measure restore RTO/RPO.

## Terraform and infrastructure automation

69. Expose business-safe inputs, return stable outputs, validate invariants, hide provider complexity, avoid embedded environment assumptions, provide secure defaults/examples/tests, and version breaking changes.
70. Store remote encrypted state with versioning, least-privilege workspace identities, locking, audit, restricted outputs, backup/restore procedure, and separation by blast radius.
71. Stop concurrent changes, preserve logs/state backup, inspect real resources and state, refresh/plan, import or remove only verified objects, fix configuration, review the new plan, and resume—never blindly edit state.
72. `count` is index-based; `for_each` gives stable keys; dynamic blocks generate nested blocks; locals name expressions; comprehensions transform collections. Prefer stable domain keys.
73. Use common versioned modules plus thin environment composition and per-environment state/variables. Promote module versions deliberately; do not duplicate whole stacks.
74. Do not pass secret values where avoidable; create references and retrieve at runtime. Protect state, mark sensitive outputs, suppress CI artifacts, use short-lived identities, and rotate any exposed value.
75. Run format/validate, lint/security/policy checks, module unit tests, plan assertions, and integration tests in disposable projects; test upgrades and destructive changes.
76. Enforce high-confidence security invariants, start new rules in advisory mode, show exact remediation, version/test policies, provide time-bound audited exceptions, and measure false positives.
77. Run scheduled read-only plans, alert owners, determine legitimate versus unauthorized drift, encode approved changes or revert them, and restrict console mutation to reduce recurrence.
78. Inventory dependencies, write matching configuration, back up state, import in a nonproduction rehearsal, compare no-op plan, then repeat with locking and peer review.
79. Pin versions, read upgrade guides, test representative modules, update lockfiles, canary low-risk workspaces, inspect plans, roll out in waves, and maintain rollback-compatible state backups.
80. Workspaces isolate state/execution; monorepos simplify coordinated visibility but can expand coupling; multi-repo improves ownership/isolation but complicates discovery. Align repositories and state with ownership and blast radius.

## Cloud, distributed systems, and Kafka

81. Map concepts, not names: IAM principals/policies; VPC/VCN networks; VM/container/serverless compute; object/block/database storage; native monitoring. Call out semantics and limits that require verification.
82. Start with OCI identity compartments/policies, VCN networking, OKE, compute/storage, logging/monitoring, Terraform provider, and security. Build a small platform and map operational patterns from GCP while learning OCI-specific failure modes.
83. Availability is successful access over time; durability is retained data; consistency is agreement/visibility; latency is time per operation; throughput is work per time; scalability is maintaining goals as load grows.
84. During a network partition, a distributed operation chooses consistency or availability for that operation. Systems make different choices by operation and can offer tunable/session guarantees.
85. Sync APIs simplify immediate response but couple latency; queues decouple work; streams retain ordered logs for multiple consumers/replay; batch maximizes throughput for noninteractive work.
86. Deadlines bound waiting; retries need budgets/backoff/jitter; circuit breakers stop repeated calls; bulkheads isolate capacity; backpressure slows producers. Misconfigured retries can amplify failure.
87. Use stable event IDs/business keys, durable dedupe or naturally idempotent upserts, atomic state plus offset/outbox patterns, and tolerate replay rather than assuming single delivery.
88. At-most-once may lose but avoids retry; at-least-once retries and can duplicate; exactly-once is scoped to a defined boundary and still requires idempotency for external side effects.
89. Choose a key matching ordering and distribution needs, measure skew, salt/split hot keys where ordering permits, isolate exceptional tenants, and provision/scale partitions carefully.
90. Leader serializes writes; quorum prevents minority progress; replication tolerates failure; fencing/term numbers prevent stale leaders. Bad quorum or network handling risks split brain.
91. Use backward/forward-compatible optional fields, schema registry/contracts, versioning where necessary, tolerant readers, dual read/write migration, telemetry, and gradual deprecation.
92. Define business RTO/RPO, select active-active/passive, replicate data with known consistency, route health-based traffic, keep regional dependencies independent, rehearse failover/failback, and validate data.
93. Apply retry budgets, jitter, circuit breakers, load shedding, bounded queues, concurrency limits, bulkheads, and degraded responses; alert on saturation before total failure.
94. Stateless means any instance can handle a request without unique local durable state. State still exists in databases, caches, queues, object stores, or client tokens and must be designed.
95. Estimate tenants, event rate, payload, peak factor, retention, consumer work, and growth; benchmark bottlenecks; retain headroom; autoscale within quotas; plan regional capacity and cost.
96. Brokers store topic partitions; each partition has leader/replicas; producer selects partition; within a consumer group one consumer owns a partition at a time.
97. Kafka orders records only within a partition. The same key normally preserves partition order, but retries/configuration and downstream concurrency must also preserve it.
98. Consumers track offsets; commits record progress; membership changes rebalance ownership; lag is end offset minus committed/processed offset. Commit only at the defined processing boundary.
99. Check input surge, partition skew, rebalance loops, fetch/batch settings, processing/downstream latency, errors/retries, GC, network/disk, and consumer count versus partitions. Scale only after finding the bottleneck.
100. Partitions determine parallelism and overhead; replicas determine fault tolerance and cost. Size for peak throughput, consumer parallelism, broker limits, failure recovery, and future growth.
101. Classify transient versus permanent errors, retry with bounded delayed topics, preserve metadata/attempts, send poison records to DLQ, alert ownership, and provide corrected replay tooling.
102. `acks=all` plus adequate in-sync replicas protects writes; idempotent producer prevents retry duplicates per session/partition; transactions atomically write Kafka records and offsets within Kafka scope.
103. Encrypt with TLS, authenticate using supported short-lived mechanisms, authorize topic/group operations narrowly, isolate networks, rotate secrets/certs, audit changes, and protect admin APIs.
104. Monitor broker availability, under-replicated/offline partitions, ISR changes, request latency/errors, disk/network, controller health, producer error/throttle, consumer lag and rebalance frequency.
105. Both provide durable asynchronous pub/sub patterns. Kafka exposes partitions, offsets, retention/replay, and broker operations more directly; Pub/Sub abstracts infrastructure and scales differently. Bridge concepts but acknowledge operational gaps.

## CI/CD, observability, security, and AI

106. PR checks build/test/scan once, sign immutable artifact, deploy to test, run integration/security checks, promote the same digest through approvals and canary, verify SLO/business metrics, and roll back automatically.
107. Build once and identify by digest. Promotion changes trusted metadata or deployment references, preventing environment-specific rebuild drift.
108. Compare hosting model, ecosystem, governance, scalability, identity, maintenance, and developer experience. Choose based on organizational constraints, not tool fashion.
109. Use workload federation/OIDC with audience/subject restrictions, per-environment roles, short expiry, protected environments, and no long-lived cloud keys in repository secrets.
110. Protected branches require tests/reviews; CODEOWNERS routes expertise; environments enforce production approval; separate build/deploy authority and retain auditable emergency procedure.
111. Shift a small cohort, compare latency/error/saturation plus business KPI, use minimum sample/time, stop on guardrail breach, expand progressively, and keep fast rollback.
112. Argo detects drift and may self-heal to Git. Investigate ownership and diff, preserve urgent mitigation in Git as soon as possible, avoid endless controller conflicts, and audit break glass.
113. Maintain a base chart with small environment overlays, schemas and defaults; keep secrets external; pin versions; render/test manifests in CI; avoid untracked runtime edits.
114. SBOM lists components; signing proves artifact identity; provenance records build origin; scanning finds known issues; admission verifies trusted signature/provenance/policy before execution.
115. Pause rollout, preserve healthy replicas, prevent evicting cached old images, use immutable digests, restore registry/network, or roll back only where the old image exists; validate consistency before resuming.
116. SLI is measured behavior; SLO is target; SLA is external commitment; error budget is tolerated unreliability; burn rate is consumption speed relative to budget.
117. Use accepted-event availability, end-to-end processing success, and freshness latency percentiles by priority/tenant. Measure at durable completion, define exclusions, and alert on multi-window budget burn.
118. RED: rate/errors/duration for services. USE: utilization/saturation/errors for resources. Golden signals: latency, traffic, errors, saturation.
119. Metrics reveal trends, logs explain discrete events, traces follow a request, profiles locate code cost, and events show changes. Correlation IDs and consistent metadata connect them.
120. Inject trace context into message headers, create producer/consumer spans with links where processing is asynchronous, preserve baggage sparingly, and standardize instrumentation through collectors.
121. Restrict unbounded labels such as user/request IDs, aggregate, drop/relabel at collectors, set tenant quotas, use exemplars for trace linkage, and monitor active series.
122. Keep errors/rare/high-latency traces, use head sampling for cost and tail sampling for outcome-based retention, propagate decisions, and validate statistical usefulness.
123. Check deployment/config/traffic changes; segment latency by endpoint/version/tenant; trace service/database calls; inspect saturation, throttling, queues, GC, cache, network, and dependency latency; mitigate/rollback based on evidence.
124. Inspect LB/backend health, ingress/gateway metrics, endpoints/readiness, Pod errors/throttling/GC, HPA metric lag, pending Pods/node capacity, downstream pools, retry amplification, and load-test reproduction.
125. Check partition skew, blocked downstream calls, batch/poll settings, rebalance/error loops, GC, thread pools, rate limiting, and partition ownership. Low CPU often means waiting rather than spare capacity.
126. Alert on user impact or imminent exhaustion using SLO burn/saturation; require owner, severity, actionable threshold, runbook, deduplication, routing, and regular review.
127. Incident commander coordinates; technical leads investigate; communications lead updates stakeholders; scribe maintains timeline. Stabilize first, communicate cadence, preserve evidence, and separate mitigation from root-cause work.
128. A strong RCA has evidence-backed timeline, impact, contributing technical/organizational causes, why defenses failed, and prioritized actions with owners/dates/verification—not individual blame.
129. Measure repetitive manual work, interruptions, and error rate; rank by volume/pain/risk; remove root causes or automate safely; track hours and incidents avoided.
130. Define hypothesis, blast-radius guardrails, rollback, observers, and success metrics; inject one regional dependency failure; verify routing, capacity, data, alerts, communications, and failback; record gaps.
131. Use human groups and workload identities, minimal scoped roles, separate environments, just-in-time elevation, deny risky defaults, periodic access review, and audit across every layer.
132. Never commit or bake secrets; use workload identity and secret manager; protect state/logging; mount or fetch short-lived values; restrict access; rotate automatically; redact diagnostics.
133. TLS/mTLS protects transit; provider/disk/database encryption protects storage; application/field encryption limits infrastructure exposure for selected fields. Manage keys separately with rotation and audit.
134. Enforce tenant context at identity, API, query, cache, messaging, storage, and observability layers; apply row/schema/project boundaries; test cross-tenant denial continuously.
135. Retain identity/access changes, data access, administrative operations, deployments, policy decisions, agent/tool calls, and break glass with integrity, timestamps, retention, restricted access, and investigation usability.
136. Collect only necessary data, tokenize/redact early, block sensitive labels/prompts, restrict debug logging, synthesize test data, apply retention/access controls, and scan outputs.
137. Require strong identity, documented reason, approval when feasible, narrow time-bound access, full audit/session capture, immediate alert, post-use review, and automatic revocation.
138. Identify assets, actors, trust boundaries, abuse cases, and mitigations during design; convert controls into testable requirements and verify before release and after architectural change.
139. Combine severity with exploitability, exposure, asset/data criticality, compensating controls, and active exploitation. Set SLA, owner, mitigation, exception expiry, and validation.
140. Revoke/disable, rotate affected credentials, preserve evidence, determine scope through audit, contain sessions/workloads, communicate, remediate root cause, and monitor for persistence.
141. Tokens are model units; context window bounds prompt/history; embeddings encode semantic similarity; temperature influences sampling variability; hallucination is plausible unsupported output.
142. Ingest authorized sources, parse/chunk/tag/version, embed/index, retrieve with tenant/ACL filters and hybrid ranking, rerank, construct grounded prompt, answer with citations, evaluate, monitor, and support deletion/reindex.
143. Chunking trades context completeness against retrieval precision; overlap preserves boundaries at storage/token cost; metadata enables filters; hybrid retrieval combines exact terms with semantics.
144. Evaluate retrieval with labeled relevant documents using recall@k/MRR/precision; evaluate generation for groundedness, correctness, citation, safety, and task success while holding retrieval results constant.
145. Prompting changes instructions; RAG supplies changing knowledge; fine-tuning changes model behavior/style; tools perform external actions or fetch live structured data. Combine only when evaluation shows need.
146. Use an orchestrator with typed allowlisted tools, least-privilege identity, tenant scope, bounded iterations/budget, deterministic policy checks, approval for mutations, idempotency, sandboxing, audit, and kill switch.
147. Direct/indirect injection tries to override instructions through user/retrieved content; leakage exposes protected data; excessive agency grants unsafe action scope. Treat all content as data, not authority.
148. Restrict tool catalog and arguments, enforce authorization outside the model, require approval for consequential actions, isolate runtime/network/filesystem, rate-limit, and log every decision/action.
149. MCP standardizes how clients discover/invoke server tools and access resources. Authenticate both sides, authorize each operation, validate schemas, distrust tool output, constrain transport/network, and audit trust boundaries.
150. Measure task success and evaluated quality, retrieval metrics, hallucination/safety, latency by stage, provider errors, token usage/cost, cache hit, tool success, and user feedback by version.
151. Set deadlines/retries carefully, route to approved alternate model or deterministic workflow, cache safe responses, queue asynchronous work, degrade features transparently, and protect downstream capacity.
152. Store prompts/config as code, version datasets and expected behavior, run offline regression and adversarial tests, canary online, compare quality/latency/cost, and retain rollback.
153. Self-host for data control, special model/hardware, predictable high utilization, or customization when the team can operate GPUs, batching, autoscaling, upgrades, security, and model monitoring. Managed APIs reduce operational burden.
154. Minimize/tokenize data, enforce purpose and tenant authorization, use approved endpoints and retention terms, encrypt, redact logs, filter retrieval, prevent training use where required, audit access, and support deletion.
155. Good uses include incident summarization, runbook retrieval, change-risk explanation, ticket enrichment, and code suggestions. Keep provisioning, authorization, deletion, and policy decisions deterministic and human-controlled.
