# Episode 25: Python and Go Platform Programming Round

YouTube title: DevOps Mock Interview Practice | Episode 25: Python and Go Platform Programming Round

Estimated duration: 16-21 min

Source round: Mock Interview 25 - Python and Go Platform Programming Round (source set 25)

Focus: Python automation, Go programming, cloud APIs, Kubernetes clients, CLIs, controllers, testing, and production readiness

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Python and Go Platform Programming Round.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- API: Application Programming Interface
- CI: Continuous Integration
- CPU: Central Processing Unit
- GCP: Google Cloud Platform
- IAM: Identity and Access Management

---

## Question 1

Interviewer:
Python automation: How would you design a Python script that audits GCP IAM bindings, flags risky roles, and exports a remediation report?

Pause the video and answer this question aloud.

Senior Associate answer:
List all IAM policy bindings across projects using the Cloud Resource Manager and IAM APIs, flag bindings using overly broad predefined roles (Owner, Editor) or bindings granted directly to individuals rather than groups, and cross-reference with IAM Recommender data to identify unused permissions. Export findings to a structured report (CSV or a ticketing system) with severity scoring and a specific recommended remediation per finding, and run it on a schedule so drift toward over-permissioning is caught continuously rather than only during periodic manual reviews.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Python automation: How would you design a Python script that audits GCP IAM bindings, flags risky roles, and exports a remediation report?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
Python testing: How would you unit test a GCP or Kubernetes automation script without touching real production resources?

Pause the video and answer this question aloud.

Senior Associate answer:
Mock the client library calls (unittest.mock or a fake client) so unit tests exercise your decision logic - parsing, filtering, error handling - without making real API calls, and use a genuine but isolated sandbox project for integration tests that do need to hit a live API. Default the script to dry-run mode in any test or CI context, and add an explicit environment guard that refuses to run destructive operations unless the target project matches an allowed non-production pattern, as a safety net against accidental production runs.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Python testing: How would you unit test a GCP or Kubernetes automation script without touching real production resources?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
Python concurrency: When would you use threads, asyncio, multiprocessing, or a worker pool for cloud resource inventory?

Pause the video and answer this question aloud.

Senior Associate answer:
For cloud resource inventory, which is I/O-bound (waiting on API responses), use asyncio with an async client or a ThreadPoolExecutor - both work well since Python releases the GIL during I/O wait, so threads aren't limited by the GIL for this workload. Reserve multiprocessing for genuinely CPU-bound work like heavy post-processing or parsing of the collected data, since spinning up processes for I/O-bound API calls adds unnecessary overhead without a corresponding benefit.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Python concurrency: When would you use threads, asyncio, multiprocessing, or a worker pool for cloud resource inventory?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
Python FastAPI: How would you design a small FastAPI service that exposes self-service infrastructure requests with validation, approval, and audit logs?

Pause the video and answer this question aloud.

Senior Associate answer:
Define request schemas with Pydantic that validate resource type, size, and required labels at the API boundary, route requests above a risk threshold through an approval dependency (checking an external approval system or requiring a specific role) before provisioning proceeds, and log every request with requester identity, decision, and outcome to a structured audit table. Keep the actual provisioning logic (Terraform execution or direct API calls) behind a queue or background task so the API itself stays responsive and the provisioning step can be retried independently if it fails.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Python FastAPI: How would you design a small FastAPI service that exposes self-service infrastructure requests with validation, approval, and audit logs?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 5

Interviewer:
Go fundamentals: What are the main differences between Go and Python for cloud/platform automation, and when would you choose each?

Pause the video and answer this question aloud.

Senior Associate answer:
Go compiles to a single static binary with fast startup and lower memory overhead, making it the better choice for long-running services, Kubernetes controllers, and CLIs distributed widely to other engineers where deployment simplicity matters. Python has a larger ecosystem for quick scripting, data manipulation, and faster iteration where startup time and binary distribution aren't concerns - choose Go when building infrastructure that other tooling depends on for reliability and performance, and Python for automation scripts and one-off tooling where development speed matters more.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Go fundamentals: What are the main differences between Go and Python for cloud/platform automation, and when would you choose each?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
Go concurrency: Explain goroutines, channels, context cancellation, and wait groups using a platform automation example.

Pause the video and answer this question aloud.

Senior Associate answer:
For a tool auditing thousands of GCP resources concurrently, you'd launch a goroutine per resource (or per worker in a bounded pool) that fetches and processes resource data, using channels to send results back to a collector goroutine safely without shared-memory races. A context with a timeout propagates a cancellation signal to all in-flight goroutines if the overall operation needs to abort early, and a sync.WaitGroup tracks when all worker goroutines have finished so the main function knows it's safe to close channels and read final results.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Go concurrency: Explain goroutines, channels, context cancellation, and wait groups using a platform automation example.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
Go Kubernetes: When would you use client-go or controller-runtime, and how would you design a simple Kubernetes controller?

Pause the video and answer this question aloud.

Senior Associate answer:
Use raw client-go directly for simple, imperative scripts that just need to list/create/update Kubernetes objects without a reconciliation loop; use controller-runtime (built on top of client-go) when building an actual operator/controller that needs to continuously reconcile desired state, since it provides the informer/cache, reconcile loop scaffolding, and leader election out of the box. A simple controller design defines a Reconcile function that reads the current state of a resource, compares it to desired state, and takes the minimal action needed to converge them, requeueing on error rather than treating every failure as fatal.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Go Kubernetes: When would you use client-go or controller-runtime, and how would you design a simple Kubernetes controller?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
Go production readiness: What code review checklist would you use before deploying a Go automation service or controller to production?

Pause the video and answer this question aloud.

Senior Associate answer:
Check that errors are handled explicitly and wrapped with context (not silently ignored), goroutines have clear lifecycle management (no leaks, proper context cancellation), resource requests/limits are set appropriately for the deployment, and structured logging/metrics are in place for observability. Verify tests cover error paths and edge cases (not just the happy path), dependencies are pinned via go.sum, and graceful shutdown handling exists so in-flight work isn't abruptly dropped during a rolling update.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Go production readiness: What code review checklist would you use before deploying a Go automation service or controller to production?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 25: Python and Go Platform Programming Round.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
