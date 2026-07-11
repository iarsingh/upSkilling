# Episode 52: LLM and Machine Learning Round - Part 1

YouTube title: DevOps Mock Interview Practice | Episode 52: LLM and Machine Learning Round - Part 1

Estimated duration: 16-21 min

Source round: Mock Interview 50 - LLM and Machine Learning Round (source set 50)

Focus: LLM production architecture, prompt lifecycle, LLM evaluation, fine-tuning vs RAG, model fundamentals, supervised and unsupervised learning, feature engineering, model evaluation, overfitting, drift, deployment, monitoring, and rollback

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing LLM and Machine Learning Round - Part 1.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- AI: Artificial Intelligence
- API: Application Programming Interface
- GPU: Graphics Processing Unit
- LLM: Large Language Model
- PII: Personally Identifiable Information
- RAG: Retrieval-Augmented Generation

---

## Question 1

Interviewer:
Mock 50 focus - LLM production architecture: How would you design a production LLM-backed service with model routing, caching, rate limits, observability, safety, and cost controls?

Pause the video and answer this question aloud.

Senior Associate answer:
Design it as a normal production service plus LLM-specific controls. Put an API gateway in front for auth, quotas, request validation, and tenant identification. Route requests by use case to the right model: cheap/fast model for simple tasks, stronger model for complex tasks, fallback model for provider failures, and self-hosted model where privacy or cost requires it. Add caching for repeated deterministic prompts, token budgets per team, prompt/template versioning, safety filters, and guardrails around tool calls. Observability should capture trace ID, model version, prompt template version, token count, latency by stage, retrieval metadata, error type, and cost without logging sensitive raw prompts.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: Mock 50 focus - LLM production architecture: How would you design a production LLM-backed service with model routing, caching, rate limits, observability, safety, and cost controls?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 2

Interviewer:
Mock 50 focus - LLM gateway: How would you build an internal gateway that handles auth, per-team token budgets, prompt templates, model fallback, audit logs, and provider abstraction?

Pause the video and answer this question aloud.

Senior Associate answer:
Build a proxy service between applications and model providers. It authenticates callers, maps them to teams/projects, enforces rate limits and token budgets, injects approved prompt templates, and routes to configured models. It should abstract providers such as Vertex AI, OpenAI, Anthropic, or self-hosted vLLM so applications do not hardcode provider logic. Add retries, timeouts, circuit breakers, fallback rules, audit logs, cost attribution, and dashboards. For safety, restrict which teams can use which models, prevent logging secrets, and require approval for high-risk tools or external data sharing.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: Mock 50 focus - LLM gateway: How would you build an internal gateway that handles auth, per-team token budgets, prompt templates, model fallback, audit logs, and provider abstraction?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 3

Interviewer:
Mock 50 focus - prompt lifecycle: How would you version, test, review, deploy, and roll back prompt changes like application code?

Pause the video and answer this question aloud.

Senior Associate answer:
Store prompts in Git with owners, version numbers, changelogs, and environment-specific configuration. Every prompt change should run against a regression dataset with expected behavior, groundedness checks, safety checks, latency/cost checks, and human review for high-risk flows. Deploy prompts gradually using feature flags or config rollout, track prompt version in every trace/log, and keep old prompt versions available for rollback. The key interview point is that prompt changes can break production like code changes, so they need review, tests, rollout, observability, and rollback.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Mock 50 focus - prompt lifecycle: How would you version, test, review, deploy, and roll back prompt changes like application code?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
Mock 50 focus - LLM evaluation: How would you design automated and human evaluation for answer quality, groundedness, toxicity, latency, and regression testing?

Pause the video and answer this question aloud.

Senior Associate answer:
Use layered evaluation. Automated tests should include fixed golden questions, expected source references, rubric-based LLM-as-judge scoring, toxicity/safety checks, hallucination or groundedness checks, latency, token cost, and exact-match tests where applicable. Human evaluation should review samples for correctness, tone, safety, and business usefulness, especially for ambiguous or regulated use cases. Track scores over time and block deployment when a prompt/model change regresses beyond thresholds. Keep evaluation data versioned so results are comparable across releases.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: Mock 50 focus - LLM evaluation: How would you design automated and human evaluation for answer quality, groundedness, toxicity, latency, and regression testing?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 5

Interviewer:
Mock 50 focus - prompt injection and data leakage: How would you protect an LLM application from malicious input, unsafe tool calls, PII leakage, and retrieved-document injection?

Pause the video and answer this question aloud.

Senior Associate answer:
Treat user input and retrieved documents as untrusted data, never as instructions. Use strong system prompts, clear delimiters, content filtering, tool allowlists, schema validation, and permission checks outside the model. Do not give the model broad credentials; tools should use least privilege and require confirmation for destructive actions. Redact PII/secrets before prompts and logs, restrict which documents can be retrieved by user/team authorization, and monitor for injection patterns. The strongest control is not a clever prompt; it is limiting what the model can access or do if the prompt is bypassed.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: Mock 50 focus - prompt injection and data leakage: How would you protect an LLM application from malicious input, unsafe tool calls, PII leakage, and retrieved-document injection?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 6

Interviewer:
Mock 50 focus - self-hosted vs managed LLMs: How would you choose between Vertex AI/Gemini, OpenAI API, and self-hosted vLLM or Ollama on Kubernetes?

Pause the video and answer this question aloud.

Senior Associate answer:
Use managed APIs such as Vertex AI/Gemini or OpenAI when you want fast adoption, strong model quality, low platform operations, and managed scaling. Use self-hosted vLLM/TGI/Ollama on Kubernetes when data residency, cost at scale, latency control, custom models, or offline/private operation matter enough to justify GPU operations. Compare model quality, token cost, p95 latency, throughput, privacy, compliance, operational burden, GPU availability, autoscaling, and fallback options. Many production platforms use both: managed APIs for high-quality general tasks and self-hosted models for private, high-volume, or cost-sensitive workloads.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: Mock 50 focus - self-hosted vs managed LLMs: How would you choose between Vertex AI/Gemini, OpenAI API, and self-hosted vLLM or Ollama on Kubernetes?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 7

Interviewer:
Mock 50 focus - fine-tuning vs RAG: When would you fine-tune an LLM instead of using RAG or prompt engineering, and what operational risks would you manage?

Pause the video and answer this question aloud.

Senior Associate answer:
Use prompt engineering for behavior or formatting changes when the base model already knows the task. Use RAG when answers need current, private, or auditable knowledge from documents. Use fine-tuning when you need the model to learn a repeatable style, domain-specific classification, extraction format, or task behavior from many examples. Fine-tuning adds risks: dataset quality, bias, overfitting, model versioning, evaluation, rollback, cost, and retraining. It is not a good way to inject frequently changing factual knowledge; RAG is usually better for that.

Senior answer structure:
Use this structure: use case -> architecture -> evaluation/safety -> observability -> cost and governance.

Scenario-based practice:
Scenario practice: Imagine this GenAI feature is going live for internal users. Explain how you would evaluate quality, prevent unsafe output, monitor cost, and handle rollback for: Mock 50 focus - fine-tuning vs RAG: When would you fine-tune an LLM instead of using RAG or prompt engineering, and what operational risks would you manage?

What interviewer checks:
They are checking whether you can connect AI systems to real platform concerns: serving, monitoring, data, cost, and governance.

---

## Question 8

Interviewer:
Mock 50 focus - machine learning fundamentals: Explain supervised learning, unsupervised learning, and reinforcement learning with practical examples.

Pause the video and answer this question aloud.

Senior Associate answer:
Supervised learning trains on labeled examples, such as predicting churn from customer records or classifying incidents as high or low priority. Unsupervised learning finds patterns without labels, such as clustering customers, detecting anomalies, or reducing dimensionality. Reinforcement learning trains an agent to take actions and receive rewards or penalties, such as game playing, robotics, or policy optimization. In interviews, connect the learning type to the data available: labels imply supervised, hidden structure implies unsupervised, and sequential decisions with rewards imply reinforcement learning.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Mock 50 focus - machine learning fundamentals: Explain supervised learning, unsupervised learning, and reinforcement learning with practical examples.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 52: LLM and Machine Learning Round - Part 1.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
