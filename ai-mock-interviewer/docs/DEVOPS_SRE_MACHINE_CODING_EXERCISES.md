# DevOps and SRE Machine-Coding Exercises

This question bank focuses on state machines, reconciliation loops, resource
constraints, reliability, failure handling, and maintainable implementation.
The exercises intentionally leave some details ambiguous. During an interview,
state reasonable assumptions before designing or coding the solution.

For every exercise, try to identify:

1. Inputs and expected outputs
2. Current state and desired state
3. Safety invariants
4. Valid actions and their preconditions
5. Success, failure, and blocked conditions
6. Important edge cases
7. Tests needed to verify the solution

---

## 1. DevOps Machine-Coding Interview Questions

### Exercise 1.1: Deployment Configuration Validator

Implement a validator for an application deployment configuration. A
configuration contains replica count, container image, CPU and memory requests,
health-check settings, environment variables, and deployment strategy.

Requirements:

- Report every validation error, not only the first one.
- Reject missing images, invalid resource values, duplicate environment
  variables, and invalid health-check intervals.
- Support different validation rules for development and production.
- Produce errors that identify the invalid field and explain the problem.

### Exercise 1.2: CI/CD Pipeline Executor

Implement an engine that executes a pipeline consisting of dependent stages,
such as build, test, security scan, deploy, and verify.

Requirements:

- A stage may run only after all its dependencies succeed.
- Independent stages may run concurrently.
- The engine must enforce a configurable concurrency limit.
- A failed stage should prevent dependent stages from running.
- Detect cyclic or missing dependencies before execution begins.
- Return the status and execution order of every stage.

### Exercise 1.3: Environment Promotion Manager

Build a system that promotes an artifact through development, staging, and
production.

Requirements:

- The same immutable artifact must be used in every environment.
- Staging and production require successful verification checks.
- Production additionally requires an approval.
- Duplicate promotion requests must not deploy the artifact twice.
- Record an audit history for every promotion attempt.

---

## 2. SRE Coding Simulation Problems

### Exercise 2.1: Service Availability Simulator

Simulate a service containing multiple instances distributed across zones.
Instances can become healthy or unhealthy over time.

Requirements:

- Calculate service availability after every event.
- The service is available only when its healthy capacity meets a configured
  minimum.
- A zone failure should affect every instance in that zone.
- Produce a timeline of availability changes and outage periods.
- Reject events that refer to unknown instances or zones.

### Exercise 2.2: Error-Budget Tracker

Implement a tracker for a service with a defined service-level objective (SLO).
The tracker receives total-request and failed-request measurements.

Requirements:

- Calculate the allowed error budget for a rolling time window.
- Report consumed and remaining error budget.
- Generate warning and exhausted-budget states at configurable thresholds.
- Measurements may arrive late or out of chronological order.
- Duplicate measurements must not be counted twice.

### Exercise 2.3: Incident Escalation Simulator

Design an incident engine that sends notifications according to an escalation
policy.

Requirements:

- Notify the primary responder when an incident is created.
- Escalate if the incident is not acknowledged within the configured timeout.
- Stop escalation after acknowledgement or resolution.
- Repeated timer events must not produce duplicate notifications.
- Preserve a chronological incident and notification history.

---

## 3. Kubernetes Controller Coding Exercises

### Exercise 3.1: Replica Reconciliation Controller

Implement a Kubernetes-style controller that repeatedly compares the desired
replica count with the currently running replicas.

Requirements:

- Create instances when the current count is below the desired count.
- Delete instances when the current count is above the desired count.
- Perform at most one external action during each reconciliation.
- Reconciliation must be safe to repeat.
- Handle terminating, pending, ready, and failed instances correctly.
- Return a requeue decision when more work remains.

### Exercise 3.2: Finalizer-Based Resource Cleanup

Implement a controller for an application resource that owns external load
balancers and DNS records.

Requirements:

- Add a finalizer before creating external resources.
- When deletion is requested, remove owned resources before removing the
  finalizer.
- Cleanup must be idempotent.
- Temporary provider errors should result in a retry.
- The resource must not remain stuck forever after a permanent error.

### Exercise 3.3: Dependency-Aware Application Controller

Create a controller for an application that depends on a database, secret, and
network policy.

Requirements:

- Do not mark the application ready until every dependency is ready.
- Create missing dependencies in a deterministic order.
- Propagate useful dependency failures into application status.
- Avoid unnecessary updates when the desired objects already exist.
- Detect configuration changes that require reconciliation.

---

## 4. Rolling Deployment Coding Exercises

### Exercise 4.1: Rolling Update Simulator

An application currently runs multiple healthy instances of version `v1`. Move
the deployment to `v2` without violating resource or availability constraints.

Assume inputs for desired replicas, minimum available capacity, total resource
capacity, per-version resource usage, and current instance states.

Requirements:

- Never consume more resources than the configured limit.
- Maintain at least the minimum healthy capacity throughout the rollout.
- Count a new instance as available only after it becomes healthy.
- Return one or more valid next actions for each state.
- Complete when the desired number of healthy `v2` instances exists and all
  `v1` instances have been removed.
- Report a clear blocked state if no safe action can make progress.

### Exercise 4.2: Canary Deployment Simulator

Roll out a new version to a small percentage of instances before continuing
with the full deployment.

Requirements:

- Start with a configurable canary size.
- Observe a configured number of health and error-rate samples.
- Continue only when all success criteria pass.
- Roll back the canary when a failure threshold is exceeded.
- Handle missing, duplicate, and late metric samples.

### Exercise 4.3: Zone-Aware Rolling Update

Perform a rolling update across three availability zones.

Requirements:

- Maintain a minimum number of healthy instances globally and per zone.
- Do not update every instance in one zone at the same time.
- Respect global resource capacity.
- Continue safely after an individual replacement fails.
- Produce a deterministic action plan for the same input state.

---

## 5. Resource Allocation Coding Problems

### Exercise 5.1: Cluster Workload Allocator

Assign incoming workloads to cluster nodes. Each node has finite CPU and memory,
and each workload requests both resources.

Requirements:

- Never exceed a node's capacity.
- Support a deterministic first-fit or best-fit strategy.
- Reject or queue workloads that cannot currently be placed.
- Release resources when a workload completes.
- Prevent duplicate workload IDs from consuming resources twice.

### Exercise 5.2: Priority-Based Resource Allocator

Extend the cluster allocator with workload priorities.

Requirements:

- Higher-priority workloads should be scheduled first.
- A high-priority workload may preempt lower-priority workloads.
- Never preempt a protected workload.
- Minimize the number of workloads disrupted during preemption.
- Return an explanation of every placement or rejection decision.

### Exercise 5.3: Multi-Tenant Quota Manager

Implement resource allocation for multiple teams sharing a cluster.

Requirements:

- Each team has CPU, memory, and workload-count quotas.
- Cluster capacity and team quotas must both be respected.
- Resource release should immediately update quota availability.
- Quota updates must not corrupt existing allocations.
- Provide usage and remaining-quota reports per team.

---

## 6. Job Scheduler Machine-Coding Problems

### Exercise 6.1: Limited-Worker Job Scheduler

Schedule jobs on a fixed number of workers. Jobs have an ID, arrival time,
duration, and status.

Requirements:

- Never run more jobs than available workers.
- Queue jobs when all workers are busy.
- Start queued jobs when workers become available.
- Reject duplicate job IDs.
- Produce an execution timeline and final job statuses.

### Exercise 6.2: Dependency-Aware Job Scheduler

Schedule jobs that form a directed dependency graph.

Requirements:

- Run a job only after all its dependencies succeed.
- Run independent jobs concurrently within the worker limit.
- Detect dependency cycles before starting.
- Mark dependent jobs as blocked when a prerequisite fails.
- Finish when every job has reached a terminal state.

### Exercise 6.3: Fair Multi-Tenant Scheduler

Multiple teams submit jobs to a shared worker pool.

Requirements:

- Prevent one team from permanently starving other teams.
- Respect job priorities within each team's queue.
- Support configurable per-team concurrency limits.
- Handle job cancellation while queued or running.
- Explain the fairness strategy and its trade-offs.

---

## 7. Rate Limiter Implementation Exercises

### Exercise 7.1: Token-Bucket Rate Limiter

Implement a token-bucket rate limiter for API clients.

Requirements:

- Each client has a configured bucket capacity and refill rate.
- A request is accepted only if sufficient tokens are available.
- Refill tokens according to elapsed time.
- The bucket must never contain more than its maximum capacity.
- Return whether the request is allowed and when a rejected request may retry.

### Exercise 7.2: Sliding-Window Rate Limiter

Limit each client to a maximum number of requests in a rolling time window.

Requirements:

- Expire request timestamps outside the active window.
- Keep different clients isolated.
- Define behavior for requests arriving at the window boundary.
- Handle timestamps that are not strictly increasing.
- Discuss memory usage for clients producing large traffic volumes.

### Exercise 7.3: Hierarchical Rate Limiter

Apply limits at user, organization, and global levels.

Requirements:

- A request must pass all applicable limits.
- Rejected requests must not incorrectly consume capacity.
- Return which limit caused a rejection.
- Configuration changes should take effect safely.
- The design should support many inactive users without unbounded memory use.

---

## 8. Health-Check and Retry State Machines

### Exercise 8.1: Service Health Monitor

Track the health of services from a stream of check results.

Requirements:

- Mark a service unhealthy after a configured number of consecutive failures.
- Mark it healthy after a configured number of consecutive successes.
- Avoid changing state after a single transient result.
- Reject or safely handle stale check results.
- Emit an event only when the service state actually changes.

### Exercise 8.2: Exponential-Backoff Retry Engine

Implement a retry policy for failed operations.

Requirements:

- Retry only errors classified as retryable.
- Increase delay exponentially up to a maximum delay.
- Add configurable jitter to prevent synchronized retries.
- Stop after a maximum number of attempts or total elapsed time.
- Return a final failure containing the complete attempt history.

### Exercise 8.3: Dependency Health Aggregator

Calculate an application's health from the health of several dependencies.
Some dependencies are critical and others are optional.

Requirements:

- A critical dependency failure makes the application unhealthy.
- Optional dependency failures make it degraded.
- Stale dependency status must not be treated as healthy.
- Emit transitions among healthy, degraded, unhealthy, and unknown.
- Avoid duplicate transition notifications.

---

## 9. Circuit-Breaker Coding Exercises

### Exercise 9.1: Basic Circuit Breaker

Implement a circuit breaker with `CLOSED`, `OPEN`, and `HALF_OPEN` states.

Requirements:

- Open the circuit after a configured failure threshold.
- Reject calls while open.
- Move to half-open after a recovery timeout.
- Allow only a limited number of trial calls in half-open state.
- Close after successful trials or reopen after a failed trial.

### Exercise 9.2: Rolling-Window Circuit Breaker

Build a circuit breaker that uses the failure rate in a rolling request window.

Requirements:

- Do not evaluate the failure rate before a minimum sample count is reached.
- Open when the failure rate crosses the configured threshold.
- Expire old results from the window.
- Classify timeouts, cancellations, and application errors explicitly.
- Expose state, metrics, and the reason for the last transition.

### Exercise 9.3: Per-Dependency Circuit Breaker Registry

Manage separate circuit breakers for many downstream services.

Requirements:

- A failure in one dependency must not affect another dependency.
- Create circuit breakers lazily from a default configuration.
- Permit per-dependency configuration overrides.
- Remove long-unused circuit breakers without losing active state.
- Produce a summary of all currently open circuits.

---

## 10. Deployment Rollback Algorithm Exercises

### Exercise 10.1: Automatic Rollback Controller

Monitor a deployment after rollout and restore the previous version when health
criteria fail.

Requirements:

- Store enough previous-state information to perform a rollback.
- Trigger rollback after a configurable number of failed observations.
- Do not react to duplicate or stale observations.
- Maintain minimum availability during rollback.
- Return a terminal failed state if rollback itself cannot progress safely.

### Exercise 10.2: Multi-Step Deployment Transaction

A deployment updates an application, database migration, configuration, and
traffic routing. Design compensation actions for partial failure.

Requirements:

- Record every successfully completed step.
- On failure, run compensation actions in a safe order.
- Some database migrations may be irreversible.
- Retrying rollback must not repeat completed compensation incorrectly.
- Report manual-intervention requirements clearly.

### Exercise 10.3: Progressive Traffic Rollback

Traffic has been shifted from `v1` to `v2` in increments. Implement a rollback
that safely returns traffic to `v1`.

Requirements:

- Confirm that `v1` has enough healthy capacity before shifting traffic back.
- Move traffic in configurable increments.
- Verify health after every increment.
- Stop if neither version can safely serve the required traffic.
- Preserve an audit log of traffic weights, health results, and decisions.

---

## Suggested Practice Order

### Beginner

1. Deployment Configuration Validator
2. Limited-Worker Job Scheduler
3. Service Health Monitor
4. Token-Bucket Rate Limiter
5. Cluster Workload Allocator

### Intermediate

1. Rolling Update Simulator
2. Exponential-Backoff Retry Engine
3. Replica Reconciliation Controller
4. Basic Circuit Breaker
5. Dependency-Aware Job Scheduler

### Advanced

1. Zone-Aware Rolling Update
2. Fair Multi-Tenant Scheduler
3. Rolling-Window Circuit Breaker
4. Multi-Step Deployment Transaction
5. Automatic Rollback Controller

## Self-Review Checklist

Before looking for a reference solution, verify that your design answers:

- Can every action be safely repeated?
- Can the algorithm become stuck or loop forever?
- Is there a clear completion condition?
- Is there a clear blocked or failure condition?
- Are resource and availability constraints checked before each action?
- Are time, retries, stale events, and duplicate events handled?
- Is state separate from decision-making logic?
- Can the important decisions be tested deterministically?
- Are error messages useful to an operator?
- Can you explain why every state transition is safe?
