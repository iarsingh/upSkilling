# Coding and Scripting Exercises

For every problem, explain assumptions, implement cleanly, state time and space complexity, and test normal, boundary, and invalid inputs. Do not use AI or online assistance during the real interview unless explicitly permitted.

## Python algorithms

1. **Two sum:** Return indices of two values that equal a target. Tests: `[2,7,11,15], 9 -> [0,1]`; `[3,3], 6 -> [0,1]`; no pair -> `[]`. Target O(n).
2. **Minimum swaps:** Return swaps needed to sort a permutation. Tests: `[4,3,1,2] -> 3`; `[1,2,3] -> 0`; `[2,1] -> 1`.
3. **Merge intervals:** Merge overlapping `[start,end]` intervals. Tests: `[[1,3],[2,6],[8,10],[15,18]] -> [[1,6],[8,10],[15,18]]`; `[] -> []`.
4. **Largest histogram rectangle:** Tests: `[2,1,5,6,2,3] -> 10`; `[5] -> 5`; `[] -> 0`. Target O(n).
5. **Running median:** Tests: `[12,4,5,3,8,7] -> [12,8,5,4.5,5,6]`; `[-1,-2] -> [-1,-1.5]`.
6. **LRU cache:** Implement `get` and `put` in O(1). Test capacity 2 with operations `put(1,1), put(2,2), get(1), put(3,3), get(2)` -> `1,-1`.
7. **Number of islands:** Tests: grid `[['1','1','0'],['0','1','0'],['1','0','1']] -> 3`; empty grid -> 0.
8. **Dependency order:** Topologically sort services or report a cycle. Tests: `api->db` requires `db` before `api`; `a->b,b->a` -> cycle.
9. **Shortest reach:** BFS with edge weight 6. Test: `n=4, edges=(1,2),(1,3), start=1 -> [6,6,-1]`.
10. **Non-adjacent maximum sum:** Tests: `[3,7,4,6,5] -> 13`; `[-2,-3,-1] -> -1`; `[] -> 0`.

## Production Python

11. **Paginated API client:** Fetch all pages with timeout, retryable status handling, exponential backoff with jitter, and a maximum retry count. Tests must mock 200, 429 then success, permanent 401, timeout, and repeated 503.
12. **Bounded worker pool:** Process resources concurrently, preserve input-to-result mapping, collect per-item errors, and cap concurrency. Test success, partial failure, empty input, and more tasks than workers.
13. **Sliding-window rate limiter:** Allow `k` requests per user in any 60-second window. Test `k=2` at times `0,10,20,60,71`; define the exact boundary.
14. **Idempotent event consumer:** Deduplicate event IDs, perform a database update, and acknowledge only after durable success. Test duplicate delivery, database failure, crash before acknowledgement, and poison event.
15. **Log sessionization:** Group unsorted user events into sessions when consecutive events are at most 30 minutes apart. Test exact 30-minute boundary, multiple users, duplicate timestamps, and empty input.
16. **Large-file parser:** Stream a multi-GB access log and return top five 5xx endpoints without loading the whole file. Test malformed lines, empty file, ties, and mixed status codes.
17. **Configuration diff:** Recursively compare desired and actual nested JSON, ignoring approved paths. Test added, removed, changed, nested, ignored, and type-changed values.
18. **TTL cache:** Implement thread-safe `get`, `put`, expiry, and maximum capacity. Test concurrent access, expired entries, eviction, overwrite, and a monotonic clock mock.
19. **Circuit breaker:** Implement closed, open, and half-open states. Test threshold crossing, blocked calls, timeout transition, successful recovery, and failed probe.
20. **Health aggregation API:** Combine dependency health checks concurrently under a total deadline and return healthy, degraded, or unhealthy. Test slow, failed, and partially available dependencies.

## Shell scripting

21. Write a Bash disk-usage check that emits JSON and exits non-zero above a threshold. Test 89%, 90%, 91%, invalid threshold, and `df` failure.
22. Write a log-rotation script with retention, compression, dry-run, locking, and safe filenames. Test spaces, no matches, permission failure, and concurrent invocation.
23. Write a Kubernetes rollout monitor with timeout and rollback. Mock success, timeout, command failure, and interrupted execution.
24. Write a script that calls an HTTP endpoint with timeout, retries, jitter, and machine-readable output. Test 200, 429, 401, timeout, and 503 exhaustion.
25. Write a process supervisor check that prevents duplicate instances using a lock. Test stale lock, live process, missing permissions, SIGTERM, and cleanup.
26. Write a safe backup script that validates free space, creates a checksum, uploads, verifies, and deletes local data only after success.
27. Parse a CSV without corrupting quoted commas; explain why naive `cut -d,` is unsafe and when Python is preferable.
28. Find files older than N days without breaking on spaces, newlines, or leading hyphens. Provide a dry-run before deletion.
29. Compare two directories by checksums and emit added, removed, and changed files. Test symlinks and unreadable files.
30. Build a Shell CI check that validates required environment variables without printing secret values.

## Kubernetes and platform coding

31. Write Python using the Kubernetes client to list CrashLoopBackOff, ImagePullBackOff, Pending, and high-restart Pods across namespaces. Mock pagination, missing statuses, and API errors.
32. Create a Deployment with requests, limits, startup/readiness/liveness probes, graceful termination, topology spread, and a PDB. Explain every field.
33. Write default-deny NetworkPolicies that allow frontend-to-API, API-to-DNS, and API-to-database only. Describe validation tests.
34. Implement a controller reconciliation function that is idempotent, maintains status conditions, and uses a finalizer. Test create, no-op, drift, deletion, and external API failure.
35. Parse Kubernetes events and summarize top unschedulable reasons. Test duplicated events and changing counts.
36. Write a Prometheus alert for high 5xx burn rate using short and long windows. Provide unit-test input series.
37. Write a Terraform module interface for a node pool with validation for machine type, min/max nodes, labels, taints, and upgrade strategy.
38. Given Terraform plan JSON, reject public SSH, missing owner labels, unencrypted storage, and privileged Kubernetes workloads.

## Data and AI coding

39. Consume Kafka records in batches with idempotency, offset safety, retry classification, and a DLQ. Test duplicate, poison, transient failure, and rebalance.
40. Implement a bounded asynchronous document-embedding pipeline that preserves document IDs and handles provider rate limits.
41. Calculate precision@k, recall@k, mean reciprocal rank, and answer-groundedness inputs for a small RAG evaluation set.
42. Implement semantic plus keyword result fusion using reciprocal rank fusion. Test empty lists, duplicates, and different ranks.
43. Redact emails, phone numbers, and configured identifiers from logs before sending text to an LLM. Test overlapping and partially masked values.
44. Validate an agent tool request against an allowlist, JSON schema, tenant scope, and approval requirement. Test injection-like arguments and unauthorized resources.
45. Build a FastAPI endpoint for asynchronous platform requests with validation, idempotency keys, authentication dependency, and `202 Accepted` status tracking.
