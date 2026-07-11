# Episode 68: Python Automation and Scripting Round - Part 1

YouTube title: DevOps Mock Interview Practice | Episode 68: Python Automation and Scripting Round - Part 1

Estimated duration: 16-21 min

Source round: Mock Interview 59 - Python Automation and Scripting Round (source set 59)

Focus: Python automation for DevOps and cloud engineering, file processing, APIs, CLIs, subprocess, concurrency, retries, logging, reporting, cloud SDKs, Kubernetes automation, Terraform automation, testing, packaging, and production-grade scripts

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Python Automation and Scripting Round - Part 1.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- API: Application Programming Interface
- CI: Continuous Integration
- CLI: Command Line Interface
- CPU: Central Processing Unit
- GCP: Google Cloud Platform
- IAM: Identity and Access Management
- RBAC: Role-Based Access Control
- REST: Representational State Transfer
- SDK: Software Development Kit

---

## Question 1

Interviewer:
How would you design a Python automation script so it is safe, testable, reusable, and production-ready?

Pause the video and answer this question aloud.

Senior Associate answer:
Separate core logic from CLI parsing, use functions/classes with clear inputs and outputs, add dry-run mode for risky operations, structured logging, config files/env vars, retries/timeouts, and clear exit codes. Make it idempotent where possible, write unit tests with mocks, and avoid hardcoded credentials or paths. Production automation should be boring, observable, and safe to rerun.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How would you design a Python automation script so it is safe, testable, reusable, and production-ready?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
How would you write a Python script to scan a directory, find large or old files, and generate a cleanup report?

Pause the video and answer this question aloud.

Senior Associate answer:
Use pathlib or os.scandir to walk files, collect size, modified time, owner/path if needed, and filter by thresholds. Write a CSV/JSON report with recommended actions. Add dry-run by default, exclude patterns, symlink handling, permission-error handling, and logging. Only delete files with explicit confirmation or a separate approved cleanup mode.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How would you write a Python script to scan a directory, find large or old files, and generate a cleanup report?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
How would you call a paginated REST API in Python, handle retries, and export the results to CSV?

Pause the video and answer this question aloud.

Senior Associate answer:
Use requests or httpx with timeout settings, loop through next-page tokens or page numbers, and retry transient 429/5xx failures with exponential backoff and jitter. Validate response shape, collect or stream records, and write CSV with the csv module. Store API tokens securely, log progress, and handle partial failures gracefully.

Senior answer structure:
Use this structure: API contract -> validation/auth -> business logic/data layer -> error handling -> testing and observability.

Scenario-based practice:
Scenario practice: Imagine this API is serving real users and starts failing under load. Explain how you would validate the contract, debug logs/traces, protect data, and scale it for: How would you call a paginated REST API in Python, handle retries, and export the results to CSV?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
How would you automate a GCP resource inventory report using Python SDKs?

Pause the video and answer this question aloud.

Senior Associate answer:
Use Google Cloud client libraries or Cloud Asset Inventory to list projects and resources, collect metadata such as labels, region, owner, machine type, IAM bindings, and cost tags, then export CSV/JSON or write to BigQuery. Use service account least privilege, pagination, retries, and per-project error handling. Schedule it with Cloud Scheduler/Cloud Run or a CI job.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How would you automate a GCP resource inventory report using Python SDKs?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 5

Interviewer:
How would you use Python to list Kubernetes pods across namespaces and report CrashLoopBackOff or Pending pods?

Pause the video and answer this question aloud.

Senior Associate answer:
Use the official Kubernetes Python client, load kubeconfig or in-cluster config, list pods for all namespaces, and inspect pod.status.phase plus container_statuses waiting reasons. Report namespace, pod, container, reason, restart count, node, age, and recent events if possible. Add RBAC least privilege, timeouts, and output as table/CSV/JSON.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How would you use Python to list Kubernetes pods across namespaces and report CrashLoopBackOff or Pending pods?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 6

Interviewer:
How would you automate Terraform plan validation and summarize risky changes using Python?

Pause the video and answer this question aloud.

Senior Associate answer:
Run terraform plan with JSON output, parse the plan using json rather than text scraping, and summarize creates, updates, deletes, IAM changes, public network exposure, database changes, and replacements. Fail CI or require approval for risky patterns. Keep the script read-only, deterministic, and covered by tests using sample plan JSON files.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: How would you automate Terraform plan validation and summarize risky changes using Python?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 7

Interviewer:
When would you use subprocess in Python, and how do you run shell commands safely?

Pause the video and answer this question aloud.

Senior Associate answer:
Use subprocess when a mature CLI already exists and there is no better SDK/API. Prefer subprocess.run with a list of arguments, shell=False, timeouts, check=True when appropriate, and captured output. Never concatenate untrusted input into shell commands. Log commands safely without secrets, handle return codes, and parse structured output like JSON when the CLI supports it.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: When would you use subprocess in Python, and how do you run shell commands safely?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
How would you speed up a Python automation job that checks hundreds of endpoints or servers?

Pause the video and answer this question aloud.

Senior Associate answer:
For I/O-bound checks, use asyncio with aiohttp/httpx async client or ThreadPoolExecutor with timeouts and bounded concurrency. Avoid unlimited parallelism because it can overload targets or hit rate limits. Add retries with backoff, per-host result collection, progress logging, and summary output. For CPU-bound work, use multiprocessing or move heavy computation elsewhere.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How would you speed up a Python automation job that checks hundreds of endpoints or servers?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 68: Python Automation and Scripting Round - Part 1.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
