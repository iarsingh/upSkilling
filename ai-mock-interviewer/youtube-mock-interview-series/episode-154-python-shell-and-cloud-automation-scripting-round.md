# Episode 154: Python, Shell, and Cloud Automation Scripting Round

YouTube title: Data Science Mock Interview Practice | Episode 154: Python, Shell, and Cloud Automation Scripting Round

Estimated duration: 22-28 min

Source round: Python Full Stack to GenAI, ML, and Data Scientist Career Path

Focus: Python scripting, shell safety, files, APIs, subprocesses, concurrency, retries, scheduling, cloud and Kubernetes automation, idempotency, testing, observability, security, and automation platforms

## Opening

Hi everyone, welcome back to the Data Science Mock Interview Practice series.

In today's episode, we are practicing Python, Shell, and Cloud Automation Scripting Round. Questions increase from foundation level to principal-level judgment.

Pause after each question and answer aloud. Clarify definitions and assumptions, show your method, discuss risks and limitations, and finish with how the result would support a decision.

---

## Question 1

Experience level: 0-1 year | Foundation

Interviewer:
Write a Python script that scans a directory recursively, groups files by extension, reports size and count, handles permission errors, and supports JSON or CSV output.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify the operational goal and blast radius, design an idempotent and restartable workflow, validate inputs, handle partial failure and retries, protect credentials, support dry runs, emit structured logs and metrics, test safely, and define rollback and ownership. For this 0-1 year | Foundation question, the answer should demonstrate fundamental correctness and clear reasoning. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: definition -> simple example -> basic validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Write a Python script that scans a directory recursively, groups files by extension, reports size and count, handles permission errors, and supports JSON or CSV output.

What interviewer checks:
They are checking fundamental correctness and clear reasoning, plus whether you connect technical analysis to a defensible business decision.

---

## Question 2

Experience level: 0-1 year | Foundation

Interviewer:
Write a safe shell script that validates required arguments and environment variables, uses strict error handling, traps cleanup, quotes variables correctly, and returns meaningful exit codes.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify the operational goal and blast radius, design an idempotent and restartable workflow, validate inputs, handle partial failure and retries, protect credentials, support dry runs, emit structured logs and metrics, test safely, and define rollback and ownership. For this 0-1 year | Foundation question, the answer should demonstrate fundamental correctness and clear reasoning. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: definition -> simple example -> basic validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Write a safe shell script that validates required arguments and environment variables, uses strict error handling, traps cleanup, quotes variables correctly, and returns meaningful exit codes.

What interviewer checks:
They are checking fundamental correctness and clear reasoning, plus whether you connect technical analysis to a defensible business decision.

---

## Question 3

Experience level: 1-3 years | Junior

Interviewer:
Build a Python script that calls a paginated REST API, authenticates securely, handles timeouts and rate limits, retries transient failures with backoff, and writes resumable output.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify the operational goal and blast radius, design an idempotent and restartable workflow, validate inputs, handle partial failure and retries, protect credentials, support dry runs, emit structured logs and metrics, test safely, and define rollback and ownership. For this 1-3 years | Junior question, the answer should demonstrate independent analysis and careful implementation. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: requirements -> method -> edge cases -> validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Build a Python script that calls a paginated REST API, authenticates securely, handles timeouts and rate limits, retries transient failures with backoff, and writes resumable output.

What interviewer checks:
They are checking independent analysis and careful implementation, plus whether you connect technical analysis to a defensible business decision.

---

## Question 4

Experience level: 1-3 years | Junior

Interviewer:
Run an external command from Python using `subprocess` without shell-injection risk. Capture output, enforce a timeout, stream logs, and distinguish command failure from script failure.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify the operational goal and blast radius, design an idempotent and restartable workflow, validate inputs, handle partial failure and retries, protect credentials, support dry runs, emit structured logs and metrics, test safely, and define rollback and ownership. For this 1-3 years | Junior question, the answer should demonstrate independent analysis and careful implementation. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: requirements -> method -> edge cases -> validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Run an external command from Python using `subprocess` without shell-injection risk. Capture output, enforce a timeout, stream logs, and distinguish command failure from script failure.

What interviewer checks:
They are checking independent analysis and careful implementation, plus whether you connect technical analysis to a defensible business decision.

---

## Question 5

Experience level: 3-5 years | Mid-Level

Interviewer:
Process 100,000 independent files or API records faster. Choose sequential execution, threads, processes, or async I/O and design bounded concurrency, backpressure, progress, and failure collection.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify the operational goal and blast radius, design an idempotent and restartable workflow, validate inputs, handle partial failure and retries, protect credentials, support dry runs, emit structured logs and metrics, test safely, and define rollback and ownership. For this 3-5 years | Mid-Level question, the answer should demonstrate project ownership, tradeoffs, and production awareness. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business goal -> design -> tradeoffs -> metrics.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Process 100,000 independent files or API records faster. Choose sequential execution, threads, processes, or async I/O and design bounded concurrency, backpressure, progress, and failure collection.

What interviewer checks:
They are checking project ownership, tradeoffs, and production awareness, plus whether you connect technical analysis to a defensible business decision.

---

## Question 6

Experience level: 3-5 years | Mid-Level

Interviewer:
Automate configuration updates across hundreds of repositories. Include discovery, branching, file changes, validation, commits, pull requests, rate limits, retries, dry runs, and rollback.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify the operational goal and blast radius, design an idempotent and restartable workflow, validate inputs, handle partial failure and retries, protect credentials, support dry runs, emit structured logs and metrics, test safely, and define rollback and ownership. For this 3-5 years | Mid-Level question, the answer should demonstrate project ownership, tradeoffs, and production awareness. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business goal -> design -> tradeoffs -> metrics.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Automate configuration updates across hundreds of repositories. Include discovery, branching, file changes, validation, commits, pull requests, rate limits, retries, dry runs, and rollback.

What interviewer checks:
They are checking project ownership, tradeoffs, and production awareness, plus whether you connect technical analysis to a defensible business decision.

---

## Question 7

Experience level: 5-7 years | Senior

Interviewer:
Design a Kubernetes automation tool that finds unhealthy workloads, collects diagnostic evidence, and proposes or applies remediation with namespace controls, RBAC, approvals, audit logs, and safeguards.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify the operational goal and blast radius, design an idempotent and restartable workflow, validate inputs, handle partial failure and retries, protect credentials, support dry runs, emit structured logs and metrics, test safely, and define rollback and ownership. For this 5-7 years | Senior question, the answer should demonstrate leadership under ambiguity, scale, and cross-functional delivery. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: ambiguous goal -> system approach -> risks -> measurable decision.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Design a Kubernetes automation tool that finds unhealthy workloads, collects diagnostic evidence, and proposes or applies remediation with namespace controls, RBAC, approvals, audit logs, and safeguards.

What interviewer checks:
They are checking leadership under ambiguity, scale, and cross-functional delivery, plus whether you connect technical analysis to a defensible business decision.

---

## Question 8

Experience level: 5-7 years | Senior

Interviewer:
A nightly automation job partially updates cloud resources and then crashes. Redesign it using desired state, idempotency, checkpoints, reconciliation, leases, compensating actions, and recovery tests.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify the operational goal and blast radius, design an idempotent and restartable workflow, validate inputs, handle partial failure and retries, protect credentials, support dry runs, emit structured logs and metrics, test safely, and define rollback and ownership. For this 5-7 years | Senior question, the answer should demonstrate leadership under ambiguity, scale, and cross-functional delivery. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: ambiguous goal -> system approach -> risks -> measurable decision.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: A nightly automation job partially updates cloud resources and then crashes. Redesign it using desired state, idempotency, checkpoints, reconciliation, leases, compensating actions, and recovery tests.

What interviewer checks:
They are checking leadership under ambiguity, scale, and cross-functional delivery, plus whether you connect technical analysis to a defensible business decision.

---

## Question 9

Experience level: 7-10 years | Staff / Lead

Interviewer:
Create engineering standards for production scripts covering packaging, configuration, secrets, typed inputs, testing, linting, logging, metrics, alerting, scheduling, ownership, and deprecation.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify the operational goal and blast radius, design an idempotent and restartable workflow, validate inputs, handle partial failure and retries, protect credentials, support dry runs, emit structured logs and metrics, test safely, and define rollback and ownership. For this 7-10 years | Staff / Lead question, the answer should demonstrate cross-team influence and organization-level decision quality. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: organizational problem -> standards or platform -> adoption -> governance.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Create engineering standards for production scripts covering packaging, configuration, secrets, typed inputs, testing, linting, logging, metrics, alerting, scheduling, ownership, and deprecation.

What interviewer checks:
They are checking cross-team influence and organization-level decision quality, plus whether you connect technical analysis to a defensible business decision.

---

## Question 10

Experience level: 10+ years | Principal / Architect

Interviewer:
Design an enterprise automation platform deciding when to use scripts, CI/CD workflows, configuration management, infrastructure as code, serverless jobs, workflow engines, or AI agents. Address governance, self-service, reliability, cost, and migration.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify the operational goal and blast radius, design an idempotent and restartable workflow, validate inputs, handle partial failure and retries, protect credentials, support dry runs, emit structured logs and metrics, test safely, and define rollback and ownership. For this 10+ years | Principal / Architect question, the answer should demonstrate enterprise direction, executive communication, and durable business impact. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business strategy -> decision framework -> quantified uncertainty -> durable ownership.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Design an enterprise automation platform deciding when to use scripts, CI/CD workflows, configuration management, infrastructure as code, serverless jobs, workflow engines, or AI agents. Address governance, self-service, reliability, cost, and migration.

What interviewer checks:
They are checking enterprise direction, executive communication, and durable business impact, plus whether you connect technical analysis to a defensible business decision.

---

## Closing

That completes Episode 154: Python, Shell, and Cloud Automation Scripting Round.

Repeat the questions without reading the guides. For each answer, state the decision, assumptions, method, tradeoffs, validation evidence, limitations, and next action.
