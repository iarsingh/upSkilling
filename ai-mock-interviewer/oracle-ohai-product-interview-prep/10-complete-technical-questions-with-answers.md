# Complete Technical Questions with Answers

Each question is immediately followed by its model answer. Adapt experience-based answers to your truthful personal examples.

## Resume and project deep dive

### Question 1

Give me a two-minute introduction tailored to this AI Platform Engineer role.

**Answer:**

**Introduction:** “I am a DevOps and platform engineer with nearly seven years across GCP, AWS, and Azure. My strongest areas are Kubernetes, Terraform, CI/CD, observability, security, and Python automation. At Capgemini I work on GCP landing zones, reusable Terraform modules, GKE operations, cost controls, and emerging ML/LLM platforms. This role fits because it combines production platform engineering with distributed data and responsible AI.”

### Question 2

Which platform that you built had the largest scale, and what did you personally own?

**Answer:**

**Largest platform:** State users/teams, clusters/projects, request volume, availability target, your decisions, and measurable outcome. Separate “I owned” from “the team owned.”

### Question 3

Draw the GCP landing-zone architecture you designed and explain the project hierarchy, Shared VPC, IAM, and policy controls.

**Answer:**

**Landing zone:** Organization/folders contain environment or business-unit projects; a host project owns Shared VPC; service projects consume subnets; groups and workload identities receive least privilege; org policies, centralized logs, billing labels, and Terraform policy provide guardrails.

### Question 4

You state that reusable Terraform modules reduced provisioning effort by 70%. What baseline and measurement produced that number?

**Answer:**

**70% claim:** Compare median manual/request-to-ready time before and after automation across similar requests. Explain sample size, whether review time was included, and that the number is an internal operational measure—not an absolute engineering productivity claim.

### Question 5

How did teams consume your Terraform modules, and how did you version and support them?

**Answer:**

**Module consumption:** Version modules with semantic tags, publish examples and contracts, pin versions, run validation/integration tests, publish changelogs, deprecate gradually, and assign an owner and support channel.

### Question 6

Describe the most difficult production GKE incident you personally diagnosed.

**Answer:**

**GKE incident:** Use symptom → blast radius → mitigation → evidence → root cause → permanent fix. Include exact signals and commands, such as rollout status, events, previous logs, endpoints, throttling, scheduling, and load-balancer health.

### Question 7

What exact work produced the stated 20% GCP cost reduction?

**Answer:**

**20% cost reduction:** Break savings into rightsizing, idle-resource cleanup, storage lifecycle, committed use where appropriate, logging retention, and scheduling. Compare normalized monthly spend before and after while accounting for traffic growth.

### Question 8

Explain how you maintained 99.9% availability and how the SLI was calculated.

**Answer:**

**99.9% availability:** Define a request-based or time-based SLI at the user boundary, exclude only agreed cases, calculate good/valid events, and report monthly compliance. 99.9% permits roughly 43.8 minutes of unavailability in a 30-day month.

### Question 9

Describe your OpenTelemetry implementation from application instrumentation to dashboards and alerts.

**Answer:**

**OpenTelemetry:** Instrument services or auto-instrument; propagate W3C trace context; deploy collectors for batching, filtering, redaction, sampling, and export; correlate trace IDs in logs; build service dashboards and SLO alerts.

### Question 10

Explain your MLflow and FastAPI platform work, including architecture, deployment, security, and operations.

**Answer:**

**MLflow/FastAPI:** Describe tracking server, durable metadata database, object artifact storage, authentication, TLS ingress, Kubernetes deployment, backups, monitoring, model promotion, serving API, canary rollout, and rollback.

### Question 11

What did you automate in the GitHub-to-Bitbucket migration, and how was the 30% productivity improvement measured?

**Answer:**

**Repository migration:** Explain inventory, dependency mapping, history/branch/tag migration, pipeline and permission translation, rehearsals, freeze/cutover, validation, rollback, and adoption measurement.

### Question 12

Describe a backup or disaster-recovery event involving Veeam or Kasten K10.

**Answer:**

**DR event:** State RPO/RTO, protected objects/data, backup consistency, encryption, restore environment, validation checks, cutover, evidence, and lessons from a drill or real event.

### Question 13

Compare your responsibilities at TCS, Tech Mahindra, and Capgemini.

**Answer:**

**Career progression:** TCS built production operations and incident foundations; Tech Mahindra expanded multi-cloud CI/CD, Kubernetes, backup, and platform responsibility; Capgemini adds architecture, governance, self-service, cost, security, and AI platform work.

### Question 14

Which project best demonstrates production-quality Python rather than operational scripting?

**Answer:**

**Production Python:** Choose a real tool and explain package structure, APIs, tests, typing, logging, retries, idempotency, release process, and consumers. If most work was scripting, say so honestly.

### Question 15

Tell me about a technical claim on your CV that an interviewer is likely to challenge.

**Answer:**

**Challenged claim:** Select one metric or broad technology claim, define its scope precisely, and explain what you did not own. Precision builds credibility.

## Python and software engineering

### Question 16

How do you structure a production Python automation repository?

**Answer:**

Use `src/`, tests, typed domain modules, adapters for external APIs, configuration, CLI/API entrypoints, structured logging, dependency lock, CI checks, and packaging. Keep business logic separate from I/O.

### Question 17

Explain iterators, generators, decorators, context managers, and dataclasses with platform examples.

**Answer:**

Iterators pull one item at a time; generators create lazy iterators; decorators wrap cross-cutting behavior; context managers guarantee setup/cleanup; dataclasses model typed records. Give a cloud inventory or lock example for each.

### Question 18

Compare threads, processes, and asyncio. When is each appropriate?

**Answer:**

Threads suit blocking I/O libraries; asyncio suits large numbers of cooperative I/O tasks; processes suit CPU-bound work. Bound concurrency and preserve cancellation, timeouts, and error reporting.

### Question 19

How does Python's GIL affect CPU-bound and I/O-bound programs?

**Answer:**

In standard CPython, the GIL normally permits one thread to execute Python bytecode at a time. Threads still help I/O because the GIL is released while waiting; processes bypass it for CPU work at IPC/memory cost.

### Question 20

How would you design a reliable client for a rate-limited REST API?

**Answer:**

Set connect/read timeouts, paginate, classify retryable errors, use capped exponential backoff with jitter, respect `Retry-After`, limit concurrency, make calls idempotent, expose metrics, and fail permanently on auth or validation errors.

### Question 21

Explain idempotency and show how you would implement it in an automation service.

**Answer:**

An idempotent operation produces the same intended state when repeated. Use a client idempotency key, durable request/result record, unique constraint, transactional state change, and replay of the stored response.

### Question 22

How do you handle configuration, secrets, structured logging, metrics, and tracing?

**Answer:**

Load non-secret config from validated environment/files; retrieve secrets using workload identity; emit structured logs with correlation IDs; expose RED metrics and traces; redact sensitive values.

### Question 23

How would you test cloud automation without changing real infrastructure?

**Answer:**

Inject client interfaces, use fakes or mocks for unit tests, recorded/local emulators for integration tests, isolated test projects for end-to-end tests, and assert that dry-run makes no mutation.

### Question 24

Compare unit, integration, contract, end-to-end, and chaos tests.

**Answer:**

Unit tests isolate logic; integration tests verify real component contracts; contract tests protect consumer/provider schemas; end-to-end tests validate a journey; chaos tests validate behavior under controlled failures.

### Question 25

How do type hints, linting, dependency locking, and security scanning improve a Python service?

**Answer:**

Types catch interface errors, linting standardizes correctness, lockfiles make builds repeatable, and SCA/scanning finds known risk. Enforce them in CI but retain reviewed exceptions.

### Question 26

How would you profile a slow Python data-processing pipeline?

**Answer:**

Measure first with wall-clock metrics, `cProfile`/sampling, and I/O timings. Optimize the actual bottleneck through batching, caching, better algorithms, bounded concurrency, or processes for CPU work.

### Question 27

Design a Python CLI supporting dry-run, retries, concurrency, and resumability.

**Answer:**

Separate plan from apply; support `--dry-run`, environment allowlists, confirmation for destructive actions, resume checkpoints, idempotency keys, bounded workers, per-item results, and nonzero exit codes.

### Question 28

Explain exception design: when should code retry, fail fast, skip, or compensate?

**Answer:**

Retry transient failures only; fail fast on invalid/auth input; skip only when partial success is an explicit contract; compensate when a distributed workflow cannot be atomic. Preserve the original error and context.

### Question 29

How would you safely process a file larger than available memory?

**Answer:**

Stream chunks/lines, keep bounded state, batch outputs, checkpoint progress, apply backpressure, and use external sorting or partitioned aggregation when global ordering is required.

### Question 30

What code-review findings would block a Python automation change from production?

**Answer:**

Block unbounded retries/concurrency, missing timeouts, secret leakage, unsafe deletion, non-idempotent reruns, swallowed errors, no tests, weak validation, mutable global state, or unclear ownership.

## Linux and Shell scripting

### Question 31

Explain process, thread, file descriptor, signal, and exit-code fundamentals.

**Answer:**

A process owns an address space and resources; threads share process memory; file descriptors reference open I/O; signals deliver asynchronous notifications; exit codes communicate outcome to the parent.

### Question 32

A Linux host has high load but low CPU utilization. What could cause it?

**Answer:**

High load includes runnable and uninterruptible tasks. Low CPU can indicate blocked disk/NFS I/O, lock contention, or stuck kernel operations. Inspect `uptime`, `vmstat`, `iostat`, `pidstat`, process states, and storage latency.

### Question 33

How do you diagnose memory pressure, swapping, and OOM kills?

**Answer:**

Check `free`, `vmstat`, PSI, cgroup metrics, `dmesg`, and process RSS. Distinguish page cache from pressure, find leaks or undersized limits, and fix requests/limits or application memory behavior before adding capacity.

### Question 34

Explain `set -euo pipefail` and its limitations.

**Answer:**

`-e` exits on many unhandled failures, `-u` rejects unset variables, and `pipefail` propagates pipeline failures. `-e` has conditional/subshell exceptions, so explicitly check important commands.

### Question 35

How do quoting, word splitting, globbing, and command substitution create Shell bugs?

**Answer:**

Unquoted expansions undergo splitting and globbing. Quote variables, use arrays, prefer `$(...)`, delimit options with `--`, and never build commands by concatenating untrusted strings.

### Question 36

How would you make a Shell script idempotent and safe to rerun?

**Answer:**

Detect desired state before mutation, use atomic writes, unique constraints/locks, safe retries, checkpoints, and explicit dry-run. Repeating the script should converge rather than duplicate.

### Question 37

When should a Shell script be rewritten in Python or Go?

**Answer:**

Move to Python/Go when parsing structured data, testing complex logic, concurrency, APIs, portability, or maintainability dominates simple command orchestration.

### Question 38

How do you handle temporary files, locks, traps, and cleanup safely?

**Answer:**

Create temp files with `mktemp`, restrict permissions, register `trap` cleanup, use `flock` or atomic directory creation, validate ownership before removing, and handle SIGINT/SIGTERM.

### Question 39

A scheduled script works manually but fails in cron. How do you debug it?

**Answer:**

Cron has a small environment and different working directory/PATH. Use absolute paths, capture stdout/stderr, check user/permissions, timezone, shell, credentials, and environment initialization.

### Question 40

How would you test Shell scripts in CI?

**Answer:**

Run ShellCheck and formatting; use Bats or a test harness; mock commands through PATH; test exit codes/output, failures, signals, empty input, and dry-run in disposable containers.

## Kubernetes, GKE, and OpenShift

### Question 41

Explain the Kubernetes request path from `kubectl apply` to a running container.

**Answer:**

Client authenticates to API server; admission defaults/validates; desired state is stored in etcd; controllers create subordinate objects; scheduler binds a Pod to a node; kubelet asks the runtime to pull/start containers and reports status.

### Question 42

How do the API server, etcd, scheduler, controllers, kubelet, and container runtime interact?

**Answer:**

API server is the validated state gateway; etcd is consistent state storage; scheduler chooses nodes; controllers reconcile desired state; kubelet reconciles Pods on its node; runtime manages containers.

### Question 43

Compare Deployment, StatefulSet, DaemonSet, Job, and CronJob.

**Answer:**

Deployment manages replaceable stateless replicas; StatefulSet adds stable identity/ordered storage; DaemonSet runs per eligible node; Job completes finite work; CronJob schedules Jobs.

### Question 44

Explain requests, limits, QoS classes, throttling, eviction, and OOMKilled.

**Answer:**

Requests drive scheduling and CPU utilization; limits cap resources; CPU is throttled; memory breach can OOM kill; QoS and usage influence eviction. Set values from observed working-set and load tests.

### Question 45

A Pod is Pending even though the cluster has free aggregate capacity. Diagnose it.

**Answer:**

Inspect events, requests versus allocatable, affinity/anti-affinity, topology spread, taints, quotas, PVC zone, host ports, priority/preemption, and autoscaler logs. Aggregate free capacity may be fragmented.

### Question 46

A Pod is in CrashLoopBackOff. Give your exact command-by-command workflow.

**Answer:**

`get/describe` Pod, inspect events, current and `--previous` logs, exit reason/code, command/config/secrets, probes, resource limits, dependencies, node condition, and recent rollout; reproduce safely and roll back if impact is active.

### Question 47

Explain readiness, liveness, startup probes, and graceful termination.

**Answer:**

Startup protects slow initialization; readiness controls endpoints; liveness restarts a stuck container. On shutdown fail readiness, drain endpoints, handle SIGTERM, finish work within grace period, then exit.

### Question 48

Why do rolling deployments sometimes produce 502 or 503 responses?

**Answer:**

Causes include readiness too early, endpoint propagation, abrupt SIGTERM, short grace period, insufficient surge, unhealthy new version, connection draining, or PDB/capacity constraints.

### Question 49

Compare HPA, VPA, Cluster Autoscaler, and event-driven scaling.

**Answer:**

HPA changes replicas from metrics; VPA changes requests; Cluster Autoscaler changes nodes for unschedulable Pods; KEDA scales from event sources. Avoid conflicting HPA/VPA control of the same CPU/memory signal.

### Question 50

Explain ClusterIP, headless Service, NodePort, LoadBalancer, Ingress, and Gateway API.

**Answer:**

ClusterIP is internal virtual service; headless exposes endpoints directly; NodePort opens every node; LoadBalancer provisions external/internal LB; Ingress provides HTTP routing; Gateway API separates infrastructure and route ownership with richer types.

### Question 51

How do CoreDNS, kube-proxy or eBPF, CNI, routes, and NetworkPolicy deliver traffic?

**Answer:**

CoreDNS resolves names; CNI configures Pod networking; kube-proxy or eBPF implements Service routing; cloud routes/encapsulation cross nodes; NetworkPolicy permits selected flows.

### Question 52

Pod traffic fails only across nodes. How do you isolate the fault?

**Answer:**

Compare same-node/cross-node paths; inspect CNI agents, routes/tunnels, MTU, node firewalls, NetworkPolicy, conntrack, packet counters, and packet captures at Pod/node boundaries.

### Question 53

Design default-deny network policies for a multi-tenant platform.

**Answer:**

Apply namespace default deny ingress/egress, explicitly allow DNS and required service identities/namespaces/CIDRs, test positive and negative paths, validate policies in CI, and monitor drops.

### Question 54

Design least-privilege RBAC and explain common privilege-escalation paths.

**Answer:**

Bind groups to narrow Roles, avoid wildcards and `cluster-admin`, isolate CI identities, audit `create pods`, `bind/escalate/impersonate`, Secrets, webhooks, and exec permissions because these can escalate indirectly.

### Question 55

How do projected service-account tokens and workload identity improve security?

**Answer:**

Projected tokens are audience-bound, short-lived, and rotated. Disable automount where unnecessary and exchange workload identity for cloud access instead of storing long-lived keys.

### Question 56

Compare ConfigMaps, Kubernetes Secrets, Vault, and cloud secret managers.

**Answer:**

ConfigMaps are non-secret configuration; Kubernetes Secrets are only base64 API objects unless protected; Vault/cloud managers add centralized policy, rotation, audit, and dynamic secrets. Prefer workload identity and short-lived retrieval.

### Question 57

Explain PV, PVC, StorageClass, CSI, topology, snapshots, and restore.

**Answer:**

PVC requests storage; StorageClass selects dynamic provisioning; PV represents provisioned volume; CSI implements lifecycle; topology constrains zones. Snapshot is not sufficient until restore is regularly tested.

### Question 58

How would you safely upgrade a production cluster and its node pools?

**Answer:**

Check compatibility/deprecations, upgrade control plane first, use a canary node pool, ensure surge capacity/PDBs/probes, drain gradually, observe SLOs, and retain rollback or workload-migration options.

### Question 59

A PDB blocks node maintenance. What do you do?

**Answer:**

Identify which budget and replica/readiness state blocks eviction. Restore healthy replicas/capacity first; coordinate a temporary, reviewed relaxation only when availability risk is understood.

### Question 60

How would you recover a stateful quorum application after a zone failure?

**Answer:**

Protect data consistency before availability: confirm quorum and fencing, restore/attach replicated storage according to database procedure, preserve ordinal identity, validate data, and only then resume writes.

### Question 61

When do you choose one shared cluster, multiple clusters, or virtual clusters?

**Answer:**

One cluster improves utilization but increases blast radius; multiple clusters isolate region/tenant/lifecycle at operational cost; virtual clusters add control-plane isolation over shared nodes. Decide from compliance, blast radius, scale, and team ownership.

### Question 62

How would you control noisy neighbors in a shared cluster?

**Answer:**

Use quotas, LimitRanges, requests/limits, priority classes, fair API queuing, network policy, dedicated node pools/taints for sensitive workloads, cardinality controls, and per-tenant usage reporting.

### Question 63

How do admission controllers, Gatekeeper, Kyverno, and image policies work?

**Answer:**

Built-in/custom admission validates or mutates requests; Gatekeeper uses OPA constraints; Kyverno uses Kubernetes-native policies. Start audit-only, test, provide clear remediation and controlled exceptions, then enforce.

### Question 64

An admission webhook outage blocks deployments. Restore and redesign it.

**Answer:**

Mitigate through a controlled break-glass path or failure policy based on risk. Redesign with multiple replicas, PDB, independent dependencies, short timeout, certificate monitoring, narrow match rules, and documented recovery.

### Question 65

Compare Kubernetes and OpenShift, including Routes, SCCs, Operators, and platform opinionation.

**Answer:**

OpenShift is Kubernetes with integrated platform opinions: Projects, Routes, Operators/OLM, stricter Security Context Constraints, integrated registry/build and administration. Core workload concepts transfer, but security and operational workflows differ.

### Question 66

What would you need to learn before operating OpenShift in production?

**Answer:**

Learn OpenShift networking, SCCs, Routes, Operators/OLM, cluster version upgrades, MachineConfig, registry, monitoring, identity, and vendor-supported lifecycle in a lab before production ownership.

### Question 67

How would you use ephemeral containers for production debugging?

**Answer:**

An ephemeral container enters a running Pod's namespaces for diagnostics when the image lacks tools. Restrict RBAC, use approved images, audit access, and avoid changing production state.

### Question 68

Design cluster backup, rebuild, and GitOps disaster recovery.

**Answer:**

Keep declarative cluster/workload state in Git, externalize encrypted secrets, back up stateful data and required control-plane objects, document bootstrap ordering, rebuild in a clean environment, and measure restore RTO/RPO.

## Terraform and infrastructure automation

### Question 69

Design a reusable Terraform module interface for a Kubernetes platform.

**Answer:**

Expose business-safe inputs, return stable outputs, validate invariants, hide provider complexity, avoid embedded environment assumptions, provide secure defaults/examples/tests, and version breaking changes.

### Question 70

How do you manage state, locking, encryption, access, backup, and recovery?

**Answer:**

Store remote encrypted state with versioning, least-privilege workspace identities, locking, audit, restricted outputs, backup/restore procedure, and separation by blast radius.

### Question 71

A Terraform apply fails halfway. How do you recover safely?

**Answer:**

Stop concurrent changes, preserve logs/state backup, inspect real resources and state, refresh/plan, import or remove only verified objects, fix configuration, review the new plan, and resume—never blindly edit state.

### Question 72

Explain `count`, `for_each`, dynamic blocks, locals, and comprehensions.

**Answer:**

`count` is index-based; `for_each` gives stable keys; dynamic blocks generate nested blocks; locals name expressions; comprehensions transform collections. Prefer stable domain keys.

### Question 73

How do you manage dev, test, staging, and production without copy-paste?

**Answer:**

Use common versioned modules plus thin environment composition and per-environment state/variables. Promote module versions deliberately; do not duplicate whole stacks.

### Question 74

How do you prevent secrets from entering state and pipeline logs?

**Answer:**

Do not pass secret values where avoidable; create references and retrieve at runtime. Protect state, mark sensitive outputs, suppress CI artifacts, use short-lived identities, and rotate any exposed value.

### Question 75

How do you test Terraform modules and validate plans?

**Answer:**

Run format/validate, lint/security/policy checks, module unit tests, plan assertions, and integration tests in disposable projects; test upgrades and destructive changes.

### Question 76

Design policy-as-code controls without blocking legitimate delivery.

**Answer:**

Enforce high-confidence security invariants, start new rules in advisory mode, show exact remediation, version/test policies, provide time-bound audited exceptions, and measure false positives.

### Question 77

How do you detect and reconcile console drift?

**Answer:**

Run scheduled read-only plans, alert owners, determine legitimate versus unauthorized drift, encode approved changes or revert them, and restrict console mutation to reduce recurrence.

### Question 78

How do you import existing resources into Terraform safely?

**Answer:**

Inventory dependencies, write matching configuration, back up state, import in a nonproduction rehearsal, compare no-op plan, then repeat with locking and peer review.

### Question 79

How do you upgrade Terraform and provider versions across many workspaces?

**Answer:**

Pin versions, read upgrade guides, test representative modules, update lockfiles, canary low-risk workspaces, inspect plans, roll out in waves, and maintain rollback-compatible state backups.

### Question 80

Compare Terraform Enterprise workspaces, a monorepo, and multi-repo ownership.

**Answer:**

Workspaces isolate state/execution; monorepos simplify coordinated visibility but can expand coupling; multi-repo improves ownership/isolation but complicates discovery. Align repositories and state with ownership and blast radius.

## Cloud and distributed systems

### Question 81

Compare AWS, Azure, GCP, and OCI concepts for identity, networking, compute, storage, and monitoring.

**Answer:**

Map concepts, not names: IAM principals/policies; VPC/VCN networks; VM/container/serverless compute; object/block/database storage; native monitoring. Call out semantics and limits that require verification.

### Question 82

Given your GCP background, how would you become productive in OCI quickly?

**Answer:**

Start with OCI identity compartments/policies, VCN networking, OKE, compute/storage, logging/monitoring, Terraform provider, and security. Build a small platform and map operational patterns from GCP while learning OCI-specific failure modes.

### Question 83

Explain availability, durability, consistency, latency, throughput, and scalability.

**Answer:**

Availability is successful access over time; durability is retained data; consistency is agreement/visibility; latency is time per operation; throughput is work per time; scalability is maintaining goals as load grows.

### Question 84

Explain CAP theorem without claiming that a system simply chooses two forever.

**Answer:**

During a network partition, a distributed operation chooses consistency or availability for that operation. Systems make different choices by operation and can offer tunable/session guarantees.

### Question 85

Compare synchronous APIs, asynchronous messaging, queues, streams, and batch processing.

**Answer:**

Sync APIs simplify immediate response but couple latency; queues decouple work; streams retain ordered logs for multiple consumers/replay; batch maximizes throughput for noninteractive work.

### Question 86

How do timeouts, retries, jitter, circuit breakers, bulkheads, and backpressure interact?

**Answer:**

Deadlines bound waiting; retries need budgets/backoff/jitter; circuit breakers stop repeated calls; bulkheads isolate capacity; backpressure slows producers. Misconfigured retries can amplify failure.

### Question 87

How do you design idempotent consumers and handle duplicate events?

**Answer:**

Use stable event IDs/business keys, durable dedupe or naturally idempotent upserts, atomic state plus offset/outbox patterns, and tolerate replay rather than assuming single delivery.

### Question 88

Compare at-most-once, at-least-once, and exactly-once claims.

**Answer:**

At-most-once may lose but avoids retry; at-least-once retries and can duplicate; exactly-once is scoped to a defined boundary and still requires idempotency for external side effects.

### Question 89

How do you choose partition keys and prevent hot partitions?

**Answer:**

Choose a key matching ordering and distribution needs, measure skew, salt/split hot keys where ordering permits, isolate exceptional tenants, and provision/scale partitions carefully.

### Question 90

Explain leader election, quorum, replication, and split-brain risk.

**Answer:**

Leader serializes writes; quorum prevents minority progress; replication tolerates failure; fencing/term numbers prevent stale leaders. Bad quorum or network handling risks split brain.

### Question 91

How do you safely evolve an API or event schema?

**Answer:**

Use backward/forward-compatible optional fields, schema registry/contracts, versioning where necessary, tolerant readers, dual read/write migration, telemetry, and gradual deprecation.

### Question 92

Design multi-region failover and explain RTO, RPO, and data consistency.

**Answer:**

Define business RTO/RPO, select active-active/passive, replicate data with known consistency, route health-based traffic, keep regional dependencies independent, rehearse failover/failback, and validate data.

### Question 93

How do you prevent retry storms and cascading failures?

**Answer:**

Apply retry budgets, jitter, circuit breakers, load shedding, bounded queues, concurrency limits, bulkheads, and degraded responses; alert on saturation before total failure.

### Question 94

What makes a service stateless, and where does its state actually go?

**Answer:**

Stateless means any instance can handle a request without unique local durable state. State still exists in databases, caches, queues, object stores, or client tokens and must be designed.

### Question 95

How would you capacity-plan a nation-scale healthcare workload?

**Answer:**

Estimate tenants, event rate, payload, peak factor, retention, consumer work, and growth; benchmark bottlenecks; retain headroom; autoscale within quotas; plan regional capacity and cost.

## Kafka and event-driven systems

### Question 96

Explain brokers, topics, partitions, replicas, leaders, producers, and consumer groups.

**Answer:**

Brokers store topic partitions; each partition has leader/replicas; producer selects partition; within a consumer group one consumer owns a partition at a time.

### Question 97

How does Kafka preserve ordering, and where is ordering not guaranteed?

**Answer:**

Kafka orders records only within a partition. The same key normally preserves partition order, but retries/configuration and downstream concurrency must also preserve it.

### Question 98

How do offsets, commits, rebalancing, and consumer lag work?

**Answer:**

Consumers track offsets; commits record progress; membership changes rebalance ownership; lag is end offset minus committed/processed offset. Commit only at the defined processing boundary.

### Question 99

A consumer group is falling behind. Diagnose and remediate it.

**Answer:**

Check input surge, partition skew, rebalance loops, fetch/batch settings, processing/downstream latency, errors/retries, GC, network/disk, and consumer count versus partitions. Scale only after finding the bottleneck.

### Question 100

How do you choose partition count and replication factor?

**Answer:**

Partitions determine parallelism and overhead; replicas determine fault tolerance and cost. Size for peak throughput, consumer parallelism, broker limits, failure recovery, and future growth.

### Question 101

How would you implement retry topics, dead-letter topics, and poison-message handling?

**Answer:**

Classify transient versus permanent errors, retry with bounded delayed topics, preserve metadata/attempts, send poison records to DLQ, alert ownership, and provide corrected replay tooling.

### Question 102

Explain producer acknowledgements, idempotent producers, and transactions.

**Answer:**

`acks=all` plus adequate in-sync replicas protects writes; idempotent producer prevents retry duplicates per session/partition; transactions atomically write Kafka records and offsets within Kafka scope.

### Question 103

How do you secure Kafka using TLS, authentication, authorization, and secret rotation?

**Answer:**

Encrypt with TLS, authenticate using supported short-lived mechanisms, authorize topic/group operations narrowly, isolate networks, rotate secrets/certs, audit changes, and protect admin APIs.

### Question 104

What metrics and alerts are essential for Kafka?

**Answer:**

Monitor broker availability, under-replicated/offline partitions, ISR changes, request latency/errors, disk/network, controller health, producer error/throttle, consumer lag and rebalance frequency.

### Question 105

Compare Kafka with Pub/Sub and explain transferable experience honestly.

**Answer:**

Both provide durable asynchronous pub/sub patterns. Kafka exposes partitions, offsets, retention/replay, and broker operations more directly; Pub/Sub abstracts infrastructure and scales differently. Bridge concepts but acknowledge operational gaps.

## CI/CD, GitOps, and supply-chain security

### Question 106

Design a pipeline from pull request through production and rollback.

**Answer:**

PR checks build/test/scan once, sign immutable artifact, deploy to test, run integration/security checks, promote the same digest through approvals and canary, verify SLO/business metrics, and roll back automatically.

### Question 107

How do you promote an immutable artifact rather than rebuilding per environment?

**Answer:**

Build once and identify by digest. Promotion changes trusted metadata or deployment references, preventing environment-specific rebuild drift.

### Question 108

Compare Jenkins, GitHub Actions, GitLab CI, Cloud Build, and Harness.

**Answer:**

Compare hosting model, ecosystem, governance, scalability, identity, maintenance, and developer experience. Choose based on organizational constraints, not tool fashion.

### Question 109

How do you secure CI/CD identities using short-lived credentials?

**Answer:**

Use workload federation/OIDC with audience/subject restrictions, per-environment roles, short expiry, protected environments, and no long-lived cloud keys in repository secrets.

### Question 110

Explain branch protection, code owners, approvals, and separation of duties.

**Answer:**

Protected branches require tests/reviews; CODEOWNERS routes expertise; environments enforce production approval; separate build/deploy authority and retain auditable emergency procedure.

### Question 111

Design canary delivery with automated rollback based on technical and business metrics.

**Answer:**

Shift a small cohort, compare latency/error/saturation plus business KPI, use minimum sample/time, stop on guardrail breach, expand progressively, and keep fast rollback.

### Question 112

What happens when a manual `kubectl` change conflicts with Argo CD?

**Answer:**

Argo detects drift and may self-heal to Git. Investigate ownership and diff, preserve urgent mitigation in Git as soon as possible, avoid endless controller conflicts, and audit break glass.

### Question 113

How do you manage Helm values without configuration drift?

**Answer:**

Maintain a base chart with small environment overlays, schemas and defaults; keep secrets external; pin versions; render/test manifests in CI; avoid untracked runtime edits.

### Question 114

Explain SBOMs, signing, provenance, vulnerability scanning, and admission enforcement.

**Answer:**

SBOM lists components; signing proves artifact identity; provenance records build origin; scanning finds known issues; admission verifies trusted signature/provenance/policy before execution.

### Question 115

A registry becomes unavailable halfway through deployment. Stabilize the system.

**Answer:**

Pause rollout, preserve healthy replicas, prevent evicting cached old images, use immutable digests, restore registry/network, or roll back only where the old image exists; validate consistency before resuming.

## Observability, SRE, and production support

### Question 116

Define SLI, SLO, SLA, error budget, and burn rate.

**Answer:**

SLI is measured behavior; SLO is target; SLA is external commitment; error budget is tolerated unreliability; burn rate is consumption speed relative to budget.

### Question 117

Design SLIs for a healthcare data-ingestion service.

**Answer:**

Use accepted-event availability, end-to-end processing success, and freshness latency percentiles by priority/tenant. Measure at durable completion, define exclusions, and alert on multi-window budget burn.

### Question 118

Explain RED, USE, and the four golden signals.

**Answer:**

RED: rate/errors/duration for services. USE: utilization/saturation/errors for resources. Golden signals: latency, traffic, errors, saturation.

### Question 119

How do metrics, logs, traces, profiles, and events complement each other?

**Answer:**

Metrics reveal trends, logs explain discrete events, traces follow a request, profiles locate code cost, and events show changes. Correlation IDs and consistent metadata connect them.

### Question 120

Design OpenTelemetry context propagation across asynchronous services.

**Answer:**

Inject trace context into message headers, create producer/consumer spans with links where processing is asynchronous, preserve baggage sparingly, and standardize instrumentation through collectors.

### Question 121

How would you prevent high-cardinality metric failure?

**Answer:**

Restrict unbounded labels such as user/request IDs, aggregate, drop/relabel at collectors, set tenant quotas, use exemplars for trace linkage, and monitor active series.

### Question 122

How do you choose trace-sampling strategies?

**Answer:**

Keep errors/rare/high-latency traces, use head sampling for cost and tail sampling for outcome-based retention, propagate decisions, and validate statistical usefulness.

### Question 123

An API's p95 latency rises from 200 ms to 2 seconds. Investigate it.

**Answer:**

Check deployment/config/traffic changes; segment latency by endpoint/version/tenant; trace service/database calls; inspect saturation, throttling, queues, GC, cache, network, and dependency latency; mitigate/rollback based on evidence.

### Question 124

A Kubernetes service has intermittent 5xx only during traffic spikes. Investigate it.

**Answer:**

Inspect LB/backend health, ingress/gateway metrics, endpoints/readiness, Pod errors/throttling/GC, HPA metric lag, pending Pods/node capacity, downstream pools, retry amplification, and load-test reproduction.

### Question 125

Kafka lag rises while CPU is low. What do you inspect?

**Answer:**

Check partition skew, blocked downstream calls, batch/poll settings, rebalance/error loops, GC, thread pools, rate limiting, and partition ownership. Low CPU often means waiting rather than spare capacity.

### Question 126

How do you design actionable alerts with owners and runbooks?

**Answer:**

Alert on user impact or imminent exhaustion using SLO burn/saturation; require owner, severity, actionable threshold, runbook, deduplication, routing, and regular review.

### Question 127

Describe incident-command roles and communication during a major outage.

**Answer:**

Incident commander coordinates; technical leads investigate; communications lead updates stakeholders; scribe maintains timeline. Stabilize first, communicate cadence, preserve evidence, and separate mitigation from root-cause work.

### Question 128

What makes a blameless RCA technically useful rather than ceremonial?

**Answer:**

A strong RCA has evidence-backed timeline, impact, contributing technical/organizational causes, why defenses failed, and prioritized actions with owners/dates/verification—not individual blame.

### Question 129

How do you reduce operational toil systematically?

**Answer:**

Measure repetitive manual work, interruptions, and error rate; rank by volume/pain/risk; remove root causes or automate safely; track hours and incidents avoided.

### Question 130

Design a game day for regional failure.

**Answer:**

Define hypothesis, blast-radius guardrails, rollback, observers, and success metrics; inject one regional dependency failure; verify routing, capacity, data, alerts, communications, and failback; record gaps.

## Security and healthcare considerations

### Question 131

Apply least privilege across cloud IAM, Kubernetes RBAC, pipelines, and applications.

**Answer:**

Use human groups and workload identities, minimal scoped roles, separate environments, just-in-time elevation, deny risky defaults, periodic access review, and audit across every layer.

### Question 132

How do you protect secrets in code, images, CI, state, logs, and runtime memory?

**Answer:**

Never commit or bake secrets; use workload identity and secret manager; protect state/logging; mount or fetch short-lived values; restrict access; rotate automatically; redact diagnostics.

### Question 133

Explain encryption in transit, at rest, and application-level encryption.

**Answer:**

TLS/mTLS protects transit; provider/disk/database encryption protects storage; application/field encryption limits infrastructure exposure for selected fields. Manage keys separately with rotation and audit.

### Question 134

How would you isolate tenants and sensitive healthcare data?

**Answer:**

Enforce tenant context at identity, API, query, cache, messaging, storage, and observability layers; apply row/schema/project boundaries; test cross-tenant denial continuously.

### Question 135

What audit evidence should a healthcare platform retain?

**Answer:**

Retain identity/access changes, data access, administrative operations, deployments, policy decisions, agent/tool calls, and break glass with integrity, timestamps, retention, restricted access, and investigation usability.

### Question 136

How do you minimize sensitive data in logs, traces, prompts, and test environments?

**Answer:**

Collect only necessary data, tokenize/redact early, block sensitive labels/prompts, restrict debug logging, synthesize test data, apply retention/access controls, and scan outputs.

### Question 137

Design safe break-glass access with approval and audit trails.

**Answer:**

Require strong identity, documented reason, approval when feasible, narrow time-bound access, full audit/session capture, immediate alert, post-use review, and automatic revocation.

### Question 138

How do threat modeling and secure design reviews fit into delivery?

**Answer:**

Identify assets, actors, trust boundaries, abuse cases, and mitigations during design; convert controls into testable requirements and verify before release and after architectural change.

### Question 139

How do you prioritize vulnerabilities using exploitability and business context?

**Answer:**

Combine severity with exploitability, exposure, asset/data criticality, compensating controls, and active exploitation. Set SLA, owner, mitigation, exception expiry, and validation.

### Question 140

How would you respond to suspected credential compromise?

**Answer:**

Revoke/disable, rotate affected credentials, preserve evidence, determine scope through audit, contain sessions/workloads, communicate, remediate root cause, and monitor for persistence.

## AI, LLM, RAG, agents, and MCP

### Question 141

Explain tokens, context windows, embeddings, temperature, and hallucinations.

**Answer:**

Tokens are model units; context window bounds prompt/history; embeddings encode semantic similarity; temperature influences sampling variability; hallucination is plausible unsupported output.

### Question 142

Design an enterprise RAG pipeline from ingestion through grounded response.

**Answer:**

Ingest authorized sources, parse/chunk/tag/version, embed/index, retrieve with tenant/ACL filters and hybrid ranking, rerank, construct grounded prompt, answer with citations, evaluate, monitor, and support deletion/reindex.

### Question 143

How do chunk size, overlap, metadata, and hybrid retrieval affect quality?

**Answer:**

Chunking trades context completeness against retrieval precision; overlap preserves boundaries at storage/token cost; metadata enables filters; hybrid retrieval combines exact terms with semantics.

### Question 144

How do you evaluate retrieval separately from generation?

**Answer:**

Evaluate retrieval with labeled relevant documents using recall@k/MRR/precision; evaluate generation for groundedness, correctness, citation, safety, and task success while holding retrieval results constant.

### Question 145

Compare RAG, fine-tuning, prompt engineering, and tool use.

**Answer:**

Prompting changes instructions; RAG supplies changing knowledge; fine-tuning changes model behavior/style; tools perform external actions or fetch live structured data. Combine only when evaluation shows need.

### Question 146

Design an AI agent that automates platform operations without unsafe autonomy.

**Answer:**

Use an orchestrator with typed allowlisted tools, least-privilege identity, tenant scope, bounded iterations/budget, deterministic policy checks, approval for mutations, idempotency, sandboxing, audit, and kill switch.

### Question 147

What are prompt injection, indirect injection, data leakage, and excessive agency?

**Answer:**

Direct/indirect injection tries to override instructions through user/retrieved content; leakage exposes protected data; excessive agency grants unsafe action scope. Treat all content as data, not authority.

### Question 148

How do allowlists, human approval, sandboxing, and least privilege constrain tools?

**Answer:**

Restrict tool catalog and arguments, enforce authorization outside the model, require approval for consequential actions, isolate runtime/network/filesystem, rate-limit, and log every decision/action.

### Question 149

Explain MCP servers, clients, tools, resources, authentication, and trust boundaries.

**Answer:**

MCP standardizes how clients discover/invoke server tools and access resources. Authenticate both sides, authorize each operation, validate schemas, distrust tool output, constrain transport/network, and audit trust boundaries.

### Question 150

How would you observably operate an LLM service: quality, latency, errors, tokens, and cost?

**Answer:**

Measure task success and evaluated quality, retrieval metrics, hallucination/safety, latency by stage, provider errors, token usage/cost, cache hit, tool success, and user feedback by version.

### Question 151

Design fallback behavior for model-provider failure or quota exhaustion.

**Answer:**

Set deadlines/retries carefully, route to approved alternate model or deterministic workflow, cache safe responses, queue asynchronous work, degrade features transparently, and protect downstream capacity.

### Question 152

How do you version and test prompts, retrieval configuration, and evaluation datasets?

**Answer:**

Store prompts/config as code, version datasets and expected behavior, run offline regression and adversarial tests, canary online, compare quality/latency/cost, and retain rollback.

### Question 153

When would you self-host a model on Kubernetes instead of using a managed API?

**Answer:**

Self-host for data control, special model/hardware, predictable high utilization, or customization when the team can operate GPUs, batching, autoscaling, upgrades, security, and model monitoring. Managed APIs reduce operational burden.

### Question 154

How would you prevent patient or customer data from leaking through an LLM workflow?

**Answer:**

Minimize/tokenize data, enforce purpose and tenant authorization, use approved endpoints and retention terms, encrypt, redact logs, filter retrieval, prevent training use where required, audit access, and support deletion.

### Question 155

Where could AI-assisted automation improve platform operations without replacing deterministic controls?

**Answer:**

Good uses include incident summarization, runbook retrieval, change-risk explanation, ticket enrichment, and code suggestions. Keep provisioning, authorization, deletion, and policy decisions deterministic and human-controlled.
