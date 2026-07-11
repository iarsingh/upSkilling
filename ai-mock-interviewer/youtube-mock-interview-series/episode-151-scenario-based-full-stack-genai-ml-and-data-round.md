# Episode 151: Scenario-Based Full-Stack, GenAI, ML, and Data Round

YouTube title: Data Science Mock Interview Practice | Episode 151: Scenario-Based Full-Stack, GenAI, ML, and Data Round

Estimated duration: 22-28 min

Source round: Python Full Stack to GenAI, ML, and Data Scientist Career Path

Focus: production incidents, debugging, APIs, databases, distributed systems, RAG, agents, model quality, MLOps, experimentation, security, stakeholder decisions, and senior ownership

## Opening

Hi everyone, welcome back to the Data Science Mock Interview Practice series.

In today's episode, we are practicing Scenario-Based Full-Stack, GenAI, ML, and Data Round. Questions increase from foundation level to principal-level judgment.

Pause after each question and answer aloud. Clarify definitions and assumptions, show your method, discuss risks and limitations, and finish with how the result would support a decision.

---

## Question 1

Experience level: 0-1 year | Foundation

Interviewer:
After a frontend release, users can log in but their next API request returns `401`. Browser requests show different cookie behaviour across environments. How would you isolate and fix the issue?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Treat the prompt as a live incident or ambiguous client problem. Clarify impact and scope, establish a timeline, prioritize evidence, form and test hypotheses, mitigate safely, communicate status, validate recovery, identify root cause, and define preventive actions with owners. For this 0-1 year | Foundation question, the answer should demonstrate fundamental correctness and clear reasoning. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: definition -> simple example -> basic validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: After a frontend release, users can log in but their next API request returns `401`. Browser requests show different cookie behaviour across environments. How would you isolate and fix the issue?

What interviewer checks:
They are checking fundamental correctness and clear reasoning, plus whether you connect technical analysis to a defensible business decision.

---

## Question 2

Experience level: 0-1 year | Foundation

Interviewer:
A FastAPI checkout endpoint occasionally creates two orders and charges a customer twice when the client retries after a timeout. Contain the incident and design the permanent fix.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Treat the prompt as a live incident or ambiguous client problem. Clarify impact and scope, establish a timeline, prioritize evidence, form and test hypotheses, mitigate safely, communicate status, validate recovery, identify root cause, and define preventive actions with owners. For this 0-1 year | Foundation question, the answer should demonstrate fundamental correctness and clear reasoning. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: definition -> simple example -> basic validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: A FastAPI checkout endpoint occasionally creates two orders and charges a customer twice when the client retries after a timeout. Contain the incident and design the permanent fix.

What interviewer checks:
They are checking fundamental correctness and clear reasoning, plus whether you connect technical analysis to a defensible business decision.

---

## Question 3

Experience level: 1-3 years | Junior

Interviewer:
Database CPU reaches 95% after a release, API latency rises, and replicas fall behind. Explain your first 30 minutes, diagnostic evidence, mitigation, rollback decision, and follow-up.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Treat the prompt as a live incident or ambiguous client problem. Clarify impact and scope, establish a timeline, prioritize evidence, form and test hypotheses, mitigate safely, communicate status, validate recovery, identify root cause, and define preventive actions with owners. For this 1-3 years | Junior question, the answer should demonstrate independent analysis and careful implementation. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: requirements -> method -> edge cases -> validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Database CPU reaches 95% after a release, API latency rises, and replicas fall behind. Explain your first 30 minutes, diagnostic evidence, mitigation, rollback decision, and follow-up.

What interviewer checks:
They are checking independent analysis and careful implementation, plus whether you connect technical analysis to a defensible business decision.

---

## Question 4

Experience level: 1-3 years | Junior

Interviewer:
A service works normally at low traffic but collapses during a flash sale even though CPU autoscaling is enabled. Investigate connection pools, queues, locks, downstream limits, cache behaviour, and load shedding.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Treat the prompt as a live incident or ambiguous client problem. Clarify impact and scope, establish a timeline, prioritize evidence, form and test hypotheses, mitigate safely, communicate status, validate recovery, identify root cause, and define preventive actions with owners. For this 1-3 years | Junior question, the answer should demonstrate independent analysis and careful implementation. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: requirements -> method -> edge cases -> validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: A service works normally at low traffic but collapses during a flash sale even though CPU autoscaling is enabled. Investigate connection pools, queues, locks, downstream limits, cache behaviour, and load shedding.

What interviewer checks:
They are checking independent analysis and careful implementation, plus whether you connect technical analysis to a defensible business decision.

---

## Question 5

Experience level: 3-5 years | Mid-Level

Interviewer:
A RAG assistant cites the correct policy document but gives the opposite answer. Diagnose ingestion, chunking, retrieval, reranking, conflicting versions, prompt construction, model behaviour, and evaluation gaps.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Treat the prompt as a live incident or ambiguous client problem. Clarify impact and scope, establish a timeline, prioritize evidence, form and test hypotheses, mitigate safely, communicate status, validate recovery, identify root cause, and define preventive actions with owners. For this 3-5 years | Mid-Level question, the answer should demonstrate project ownership, tradeoffs, and production awareness. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business goal -> design -> tradeoffs -> metrics.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: A RAG assistant cites the correct policy document but gives the opposite answer. Diagnose ingestion, chunking, retrieval, reranking, conflicting versions, prompt construction, model behaviour, and evaluation gaps.

What interviewer checks:
They are checking project ownership, tradeoffs, and production awareness, plus whether you connect technical analysis to a defensible business decision.

---

## Question 6

Experience level: 3-5 years | Mid-Level

Interviewer:
An AI agent creates valid support refunds but starts refunding requests that should require manager approval after a prompt update. Stop the harm and redesign permissions, policies, evaluation, and release controls.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Treat the prompt as a live incident or ambiguous client problem. Clarify impact and scope, establish a timeline, prioritize evidence, form and test hypotheses, mitigate safely, communicate status, validate recovery, identify root cause, and define preventive actions with owners. For this 3-5 years | Mid-Level question, the answer should demonstrate project ownership, tradeoffs, and production awareness. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business goal -> design -> tradeoffs -> metrics.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: An AI agent creates valid support refunds but starts refunding requests that should require manager approval after a prompt update. Stop the harm and redesign permissions, policies, evaluation, and release controls.

What interviewer checks:
They are checking project ownership, tradeoffs, and production awareness, plus whether you connect technical analysis to a defensible business decision.

---

## Question 7

Experience level: 5-7 years | Senior

Interviewer:
A churn model improves offline ROC-AUC but the retention campaign loses money. Investigate calibration, thresholding, treatment effect, offer cost, channel capacity, leakage, drift, and feedback loops.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Treat the prompt as a live incident or ambiguous client problem. Clarify impact and scope, establish a timeline, prioritize evidence, form and test hypotheses, mitigate safely, communicate status, validate recovery, identify root cause, and define preventive actions with owners. For this 5-7 years | Senior question, the answer should demonstrate leadership under ambiguity, scale, and cross-functional delivery. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: ambiguous goal -> system approach -> risks -> measurable decision.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: A churn model improves offline ROC-AUC but the retention campaign loses money. Investigate calibration, thresholding, treatment effect, offer cost, channel capacity, leakage, drift, and feedback loops.

What interviewer checks:
They are checking leadership under ambiguity, scale, and cross-functional delivery, plus whether you connect technical analysis to a defensible business decision.

---

## Question 8

Experience level: 5-7 years | Senior

Interviewer:
A Kubeflow or Vertex AI training pipeline intermittently fails after two expensive hours, while cached steps sometimes reuse stale features. Design the debugging, checkpointing, cache-key, retry, and cost-control strategy.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Treat the prompt as a live incident or ambiguous client problem. Clarify impact and scope, establish a timeline, prioritize evidence, form and test hypotheses, mitigate safely, communicate status, validate recovery, identify root cause, and define preventive actions with owners. For this 5-7 years | Senior question, the answer should demonstrate leadership under ambiguity, scale, and cross-functional delivery. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: ambiguous goal -> system approach -> risks -> measurable decision.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: A Kubeflow or Vertex AI training pipeline intermittently fails after two expensive hours, while cached steps sometimes reuse stale features. Design the debugging, checkpointing, cache-key, retry, and cost-control strategy.

What interviewer checks:
They are checking leadership under ambiguity, scale, and cross-functional delivery, plus whether you connect technical analysis to a defensible business decision.

---

## Question 9

Experience level: 7-10 years | Staff / Lead

Interviewer:
An A/B test reports a significant conversion increase, but finance sees no revenue improvement and mobile retention declines. Validate assignment, instrumentation, metrics, segments, novelty, multiple testing, and the launch decision.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Treat the prompt as a live incident or ambiguous client problem. Clarify impact and scope, establish a timeline, prioritize evidence, form and test hypotheses, mitigate safely, communicate status, validate recovery, identify root cause, and define preventive actions with owners. For this 7-10 years | Staff / Lead question, the answer should demonstrate cross-team influence and organization-level decision quality. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: organizational problem -> standards or platform -> adoption -> governance.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: An A/B test reports a significant conversion increase, but finance sees no revenue improvement and mobile retention declines. Validate assignment, instrumentation, metrics, segments, novelty, multiple testing, and the launch decision.

What interviewer checks:
They are checking cross-team influence and organization-level decision quality, plus whether you connect technical analysis to a defensible business decision.

---

## Question 10

Experience level: 10+ years | Principal / Architect

Interviewer:
A global AI platform suffers a regional outage while a model-provider change causes quality regression and a security team reports possible cross-tenant data exposure. Lead the technical and executive response, recovery, investigation, disclosure decisions, and long-term architecture changes.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Treat the prompt as a live incident or ambiguous client problem. Clarify impact and scope, establish a timeline, prioritize evidence, form and test hypotheses, mitigate safely, communicate status, validate recovery, identify root cause, and define preventive actions with owners. For this 10+ years | Principal / Architect question, the answer should demonstrate enterprise direction, executive communication, and durable business impact. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business strategy -> decision framework -> quantified uncertainty -> durable ownership.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: A global AI platform suffers a regional outage while a model-provider change causes quality regression and a security team reports possible cross-tenant data exposure. Lead the technical and executive response, recovery, investigation, disclosure decisions, and long-term architecture changes.

What interviewer checks:
They are checking enterprise direction, executive communication, and durable business impact, plus whether you connect technical analysis to a defensible business decision.

---

## Closing

That completes Episode 151: Scenario-Based Full-Stack, GenAI, ML, and Data Round.

Repeat the questions without reading the guides. For each answer, state the decision, assumptions, method, tradeoffs, validation evidence, limitations, and next action.
