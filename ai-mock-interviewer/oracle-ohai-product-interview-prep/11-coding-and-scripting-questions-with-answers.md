# Coding and Scripting Questions with Answers

Each question is immediately followed by its model answer. Adapt experience-based answers to your truthful personal examples.

## Python algorithms

### Question 1

**Two sum:** Return indices of two values that equal a target. Tests: `[2,7,11,15], 9 -> [0,1]`; `[3,3], 6 -> [0,1]`; no pair -> `[]`. Target O(n).

**Answer:**

**Two sum:** Scan once with `seen[value] = index`; before inserting `x`, look for `target-x`. Return the two indices or `[]`. Time O(n), space O(n).

### Question 2

**Minimum swaps:** Return swaps needed to sort a permutation. Tests: `[4,3,1,2] -> 3`; `[1,2,3] -> 0`; `[2,1] -> 1`.

**Answer:**

**Minimum swaps:** Build `value -> current index`. For every index whose value is wrong, swap it with the current location of the required value and update both index entries. O(n) time, O(n) space; cycle decomposition gives `cycle_length-1` swaps.

### Question 3

**Merge intervals:** Merge overlapping `[start,end]` intervals. Tests: `[[1,3],[2,6],[8,10],[15,18]] -> [[1,6],[8,10],[15,18]]`; `[] -> []`.

**Answer:**

**Merge intervals:** Sort by start, append a new interval when `start > last_end`, otherwise extend `last_end=max(last_end,end)`. O(n log n), O(n) output.

### Question 4

**Largest histogram rectangle:** Tests: `[2,1,5,6,2,3] -> 10`; `[5] -> 5`; `[] -> 0`. Target O(n).

**Answer:**

**Largest rectangle:** Maintain increasing `(start,height)` stack. When a shorter bar arrives, pop taller bars and compute `height*(current_index-start)`; flush with a zero sentinel. O(n) time, O(n) space.

### Question 5

**Running median:** Tests: `[12,4,5,3,8,7] -> [12,8,5,4.5,5,6]`; `[-1,-2] -> [-1,-1.5]`.

**Answer:**

**Running median:** Max-heap for lower half (negated values), min-heap for upper. Keep size difference at most one and every lower value ≤ every upper value. Median is heap top or average. O(log n) per insert.

### Question 6

**LRU cache:** Implement `get` and `put` in O(1). Test capacity 2 with operations `put(1,1), put(2,2), get(1), put(3,3), get(2)` -> `1,-1`.

**Answer:**

**LRU cache:** Combine dict `key -> node` with doubly linked list ordered least-to-most recent. Move hits/updates to tail and evict head at capacity. O(1) operations.

### Question 7

**Number of islands:** Tests: grid `[['1','1','0'],['0','1','0'],['1','0','1']] -> 3`; empty grid -> 0.

**Answer:**

**Islands:** Scan cells; on unseen land, increment count and BFS/DFS marking its four-direction component. O(rows×cols) time and worst-case space.

### Question 8

**Dependency order:** Topologically sort services or report a cycle. Tests: `api->db` requires `db` before `api`; `a->b,b->a` -> cycle.

**Answer:**

**Dependency order:** Build edges from dependency to dependent and indegrees; Kahn BFS begins with indegree zero. If output count is below service count, report a cycle. O(V+E).

### Question 9

**Shortest reach:** BFS with edge weight 6. Test: `n=4, edges=(1,2),(1,3), start=1 -> [6,6,-1]`.

**Answer:**

**Shortest reach:** Build adjacency list and BFS from start. First visit distance is parent distance + 6; leave unreachable as -1. O(V+E).

### Question 10

**Non-adjacent maximum sum:** Tests: `[3,7,4,6,5] -> 13`; `[-2,-3,-1] -> -1`; `[] -> 0`.

**Answer:**

**Non-adjacent maximum:** Track `take` and `skip`, or `best[i]=max(best[i-1], best[i-2]+x)`. For the specified all-negative contract, initialize from the first value rather than zero. O(n) time, O(1) space.

## Production Python

### Question 11

**Paginated API client:** Fetch all pages with timeout, retryable status handling, exponential backoff with jitter, and a maximum retry count. Tests must mock 200, 429 then success, permanent 401, timeout, and repeated 503.

**Answer:**

**Paginated client:** Loop over page token; use per-attempt connect/read timeout; retry only 408/429/5xx and transport errors with capped exponential jitter; respect `Retry-After`; immediately raise 4xx auth/validation errors; deduplicate page IDs if API replay is possible. Tests inject a fake transport and clock.

### Question 12

**Bounded worker pool:** Process resources concurrently, preserve input-to-result mapping, collect per-item errors, and cap concurrency. Test success, partial failure, empty input, and more tasks than workers.

**Answer:**

**Worker pool:** Use `ThreadPoolExecutor(max_workers=n)` for blocking APIs; map futures to input index/resource; catch each `future.result()` error; return ordered successes plus structured failures. Never let one exception silently cancel the report.

### Question 13

**Sliding-window rate limiter:** Allow `k` requests per user in any 60-second window. Test `k=2` at times `0,10,20,60,71`; define the exact boundary.

**Answer:**

**Rate limiter:** Maintain a deque per user. Before a request at `t`, pop timestamps `<= t-60` for a half-open `(t-60,t]` window; reject if length is already `k`, otherwise append. O(1) amortized per chronological request.

### Question 14

**Idempotent event consumer:** Deduplicate event IDs, perform a database update, and acknowledge only after durable success. Test duplicate delivery, database failure, crash before acknowledgement, and poison event.

**Answer:**

**Idempotent consumer:** Begin transaction, insert event ID into a table with unique constraint, apply business update only if insert succeeds, commit, then acknowledge/commit offset. Duplicate becomes no-op; transient failures retry; permanent poison messages go to DLQ after bounded attempts.

### Question 15

**Log sessionization:** Group unsorted user events into sessions when consecutive events are at most 30 minutes apart. Test exact 30-minute boundary, multiple users, duplicate timestamps, and empty input.

**Answer:**

**Sessionization:** Group by user, sort each group by timestamp, start a new session when `current-previous > 30 minutes`; finally sort session summaries by start time. O(n log n) overall.

### Question 16

**Large-file parser:** Stream a multi-GB access log and return top five 5xx endpoints without loading the whole file. Test malformed lines, empty file, ties, and mixed status codes.

**Answer:**

**Large log:** Iterate file line by line, validate fields, increment `Counter[endpoint]` only for 5xx, then use `heapq.nlargest(5, counts.items(), key=...)`. Memory is O(unique endpoints), not O(lines).

### Question 17

**Configuration diff:** Recursively compare desired and actual nested JSON, ignoring approved paths. Test added, removed, changed, nested, ignored, and type-changed values.

**Answer:**

**Config diff:** Recursive walk over union of keys, carrying a tuple path. Check ignored paths first; distinguish missing with a sentinel; recurse only when both values are dicts; emit add/remove/change/type-change records. O(total keys).

### Question 18

**TTL cache:** Implement thread-safe `get`, `put`, expiry, and maximum capacity. Test concurrent access, expired entries, eviction, overwrite, and a monotonic clock mock.

**Answer:**

**TTL cache:** Lock a dict plus LRU list/ordered dict; store `(value, expires_at)` from `time.monotonic`; lazily delete expired entries on access and evict least recent when over capacity. Inject clock for deterministic tests.

### Question 19

**Circuit breaker:** Implement closed, open, and half-open states. Test threshold crossing, blocked calls, timeout transition, successful recovery, and failed probe.

**Answer:**

**Circuit breaker:** Under a lock, CLOSED counts consecutive eligible failures; threshold sets OPEN with timestamp; after reset timeout one caller enters HALF_OPEN; success closes/resets, failure reopens. Exclude client validation errors from service-failure count.

### Question 20

**Health aggregation API:** Combine dependency health checks concurrently under a total deadline and return healthy, degraded, or unhealthy. Test slow, failed, and partially available dependencies.

**Answer:**

**Health aggregation:** Start checks concurrently with individual and overall deadlines; record duration/status without throwing away other results; critical failure => unhealthy, noncritical failure => degraded, all success => healthy. Cancel unfinished work after total deadline.

## Shell scripting

### Question 21

Write a Bash disk-usage check that emits JSON and exits non-zero above a threshold. Test 89%, 90%, 91%, invalid threshold, and `df` failure.

**Answer:**

Use `set -uo pipefail`, validate numeric threshold 0-100, capture `df -P`, parse explicitly, print JSON with `printf`, and exit 0/1/2 for healthy/threshold/error. Test by putting a fake `df` earlier in PATH.

### Question 22

Write a log-rotation script with retention, compression, dry-run, locking, and safe filenames. Test spaces, no matches, permission failure, and concurrent invocation.

**Answer:**

Acquire `flock`, enumerate null-delimited files, compare modification time, compress to a temporary name, atomically rename, and delete only after verified compression. Dry-run prints quoted planned actions.

### Question 23

Write a Kubernetes rollout monitor with timeout and rollback. Mock success, timeout, command failure, and interrupted execution.

**Answer:**

Run `kubectl rollout status --timeout=...`; on failure capture describe/events, execute a policy-approved `rollout undo`, monitor rollback, and return nonzero. A trap handles interruption and preserves diagnostics.

### Question 24

Write a script that calls an HTTP endpoint with timeout, retries, jitter, and machine-readable output. Test 200, 429, 401, timeout, and 503 exhaustion.

**Answer:**

Validate URL; call `curl --connect-timeout --max-time`; capture body/status separately; retry 429/5xx/transport errors with capped jitter; do not retry 401/403; emit JSON and a meaningful exit code.

### Question 25

Write a process supervisor check that prevents duplicate instances using a lock. Test stale lock, live process, missing permissions, SIGTERM, and cleanup.

**Answer:**

Prefer `flock` on an open descriptor rather than PID-file checking. Register cleanup trap; if using PID files, verify PID and process identity to avoid PID reuse.

### Question 26

Write a safe backup script that validates free space, creates a checksum, uploads, verifies, and deletes local data only after success.

**Answer:**

Check source readability and destination capacity; create archive with restrictive permissions; checksum; upload to temporary remote object; verify remote checksum/size; promote atomically; delete local temporary data only after verification.

### Question 27

Parse a CSV without corrupting quoted commas; explain why naive `cut -d,` is unsafe and when Python is preferable.

**Answer:**

CSV has quoting/escaping semantics that Shell field splitting does not implement. Use Python `csv` or a dedicated parser; naive `cut` corrupts quoted commas and multiline fields.

### Question 28

Find files older than N days without breaking on spaces, newlines, or leading hyphens. Provide a dry-run before deletion.

**Answer:**

Use `find root -type f -mtime +N -print0`, consume with null delimiters and `--` before paths. Default to print-only; require explicit apply flag and constrain root before deletion.

### Question 29

Compare two directories by checksums and emit added, removed, and changed files. Test symlinks and unreadable files.

**Answer:**

Generate relative-path plus checksum manifests using null-safe traversal; compare maps for added/removed/hash-changed; define whether symlinks are followed and report unreadable files instead of ignoring them.

### Question 30

Build a Shell CI check that validates required environment variables without printing secret values.

**Answer:**

Loop over required variable names via indirect expansion, report only missing names, never values; disable xtrace around secrets and ensure CI masking. Exit nonzero if any are absent.

## Kubernetes and platform coding

### Question 31

Write Python using the Kubernetes client to list CrashLoopBackOff, ImagePullBackOff, Pending, and high-restart Pods across namespaces. Mock pagination, missing statuses, and API errors.

**Answer:**

Page through all namespaces, safely inspect `container_statuses` and waiting reasons, check `PodScheduled=False`, aggregate structured findings, catch only expected API exceptions, and expose partial-result status rather than hiding failure.

### Question 32

Create a Deployment with requests, limits, startup/readiness/liveness probes, graceful termination, topology spread, and a PDB. Explain every field.

**Answer:**

Use Deployment rolling update with `maxUnavailable: 0`, bounded `maxSurge`, realistic requests/limits, startup then readiness/liveness probes, `preStop`, termination grace, topology spread, and PDB `minAvailable` consistent with replica count.

### Question 33

Write default-deny NetworkPolicies that allow frontend-to-API, API-to-DNS, and API-to-database only. Describe validation tests.

**Answer:**

Start with default-deny ingress/egress. API ingress selects frontend namespace+Pod labels; API egress allows kube-dns UDP/TCP 53 and database selector/port. Test permitted and denied traffic from disposable Pods.

### Question 34

Implement a controller reconciliation function that is idempotent, maintains status conditions, and uses a finalizer. Test create, no-op, drift, deletion, and external API failure.

**Answer:**

Fetch desired resource; create/update only when semantic diff exists; set observed generation and conditions; add finalizer before external creation; during deletion clean external resource then remove finalizer; requeue transient errors with backoff.

### Question 35

Parse Kubernetes events and summarize top unschedulable reasons. Test duplicated events and changing counts.

**Answer:**

Kubernetes Event count may aggregate repeats. Key by reason/message/object and use latest count rather than summing repeated snapshots. Focus on `FailedScheduling`, retain first/last timestamp, and report unknown safely.

### Question 36

Write a Prometheus alert for high 5xx burn rate using short and long windows. Provide unit-test input series.

**Answer:**

Use error and total request recording rates, compute error ratio and compare to SLO error budget with fast and slow multi-window thresholds. Unit test normal, fast-burn, slow-burn, missing traffic, and reset series using `promtool`.

### Question 37

Write a Terraform module interface for a node pool with validation for machine type, min/max nodes, labels, taints, and upgrade strategy.

**Answer:**

Define typed object input, validate `min <= max`, allowed machine families, nonempty label keys, unique taint keys/effects, and safe surge/unavailable values. Use stable `for_each` keys and expose node-pool ID/status outputs.

### Question 38

Given Terraform plan JSON, reject public SSH, missing owner labels, unencrypted storage, and privileged Kubernetes workloads.

**Answer:**

Parse `resource_changes[].change.after`; normalize unknown/null values; apply explicit rules; return resource address, rule, severity, and remediation; unit test safe/unsafe and unknown plan values. Policy must fail closed only for high-confidence rules.

## Data and AI coding

### Question 39

Consume Kafka records in batches with idempotency, offset safety, retry classification, and a DLQ. Test duplicate, poison, transient failure, and rebalance.

**Answer:**

Poll a bounded batch; deserialize/validate; process each partition in order; use database event-ID uniqueness or transactional outbox; commit offsets only through the last contiguous success; retry transient failures; DLQ permanent poison records with metadata.

### Question 40

Implement a bounded asynchronous document-embedding pipeline that preserves document IDs and handles provider rate limits.

**Answer:**

Use bounded `asyncio.Queue`, fixed workers, batch embeddings, semaphore/rate limiter, retry 429/5xx with jitter, preserve `(document_id, chunk_id)`, checkpoint completed IDs, and return per-item failures. Backpressure prevents unbounded memory.

### Question 41

Calculate precision@k, recall@k, mean reciprocal rank, and answer-groundedness inputs for a small RAG evaluation set.

**Answer:**

`precision@k = relevant_retrieved/k`; `recall@k = relevant_retrieved/total_relevant`; reciprocal rank is `1/rank_of_first_relevant` or zero; MRR averages it. Groundedness requires sentence/claim-level support labels against retrieved context.

### Question 42

Implement semantic plus keyword result fusion using reciprocal rank fusion. Test empty lists, duplicates, and different ranks.

**Answer:**

For each ranked list add `1/(constant+rank)` to a score keyed by document ID, merge metadata, then sort descending with deterministic tie-break. RRF does not require comparable raw retrieval scores.

### Question 43

Redact emails, phone numbers, and configured identifiers from logs before sending text to an LLM. Test overlapping and partially masked values.

**Answer:**

Compile reviewed patterns, replace matches with typed stable placeholders, process longest/specific identifiers first, and log only counts. Regex alone is imperfect; combine allowlisted structured fields and DLP tooling for production.

### Question 44

Validate an agent tool request against an allowlist, JSON schema, tenant scope, and approval requirement. Test injection-like arguments and unauthorized resources.

**Answer:**

Resolve tool from an allowlist, validate JSON Schema, bind tenant from authenticated context rather than model arguments, authorize resource scope, reject extra fields, calculate risk, require approval token for mutation, and emit immutable audit.

### Question 45

Build a FastAPI endpoint for asynchronous platform requests with validation, idempotency keys, authentication dependency, and `202 Accepted` status tracking.

**Answer:**

Authenticate through dependency; validate Pydantic request; require idempotency key; transactionally create request record with unique tenant/key; enqueue work via outbox; return `202` with status URL; repeated key returns original request; workers update durable state.
