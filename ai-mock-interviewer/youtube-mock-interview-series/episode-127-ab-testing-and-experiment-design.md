# Episode 127: A/B Testing and Experiment Design

YouTube title: Data Science Mock Interview Practice | Episode 127: A/B Testing and Experiment Design

Estimated duration: 22-28 min

Source round: Python Full Stack to GenAI, ML, and Data Scientist Career Path

Focus: hypotheses, randomization, metrics, power, experiment analysis, variance reduction, interference, sequential decisions, experimentation platforms, and governance

## Opening

Hi everyone, welcome back to the Data Science Mock Interview Practice series.

In today's episode, we are practicing A/B Testing and Experiment Design. Questions increase from foundation level to principal-level judgment.

Pause after each question and answer aloud. Clarify definitions and assumptions, show your method, discuss risks and limitations, and finish with how the result would support a decision.

---

## Question 1

Experience level: 0-1 year | Foundation

Interviewer:
What is an A/B test, and why is random assignment important for causal interpretation?

Pause the video and answer this question aloud.

Senior Associate answer guide:
State the causal question, unit of randomization, metrics, assumptions, sample-size logic, analysis plan, guardrails, decision rule, and limitations before interpreting results. For this 0-1 year | Foundation question, the answer should demonstrate fundamental correctness and clear reasoning. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: definition -> simple example -> basic validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: What is an A/B test, and why is random assignment important for causal interpretation?

What interviewer checks:
They are checking fundamental correctness and clear reasoning, plus whether you connect technical analysis to a defensible business decision.

---

## Question 2

Experience level: 0-1 year | Foundation

Interviewer:
Define primary, secondary, diagnostic, and guardrail metrics for a checkout experiment.

Pause the video and answer this question aloud.

Senior Associate answer guide:
State the causal question, unit of randomization, metrics, assumptions, sample-size logic, analysis plan, guardrails, decision rule, and limitations before interpreting results. For this 0-1 year | Foundation question, the answer should demonstrate fundamental correctness and clear reasoning. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: definition -> simple example -> basic validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Define primary, secondary, diagnostic, and guardrail metrics for a checkout experiment.

What interviewer checks:
They are checking fundamental correctness and clear reasoning, plus whether you connect technical analysis to a defensible business decision.

---

## Question 3

Experience level: 1-3 years | Junior

Interviewer:
How would you estimate sample size using baseline rate, minimum detectable effect, significance level, power, and expected traffic?

Pause the video and answer this question aloud.

Senior Associate answer guide:
State the causal question, unit of randomization, metrics, assumptions, sample-size logic, analysis plan, guardrails, decision rule, and limitations before interpreting results. For this 1-3 years | Junior question, the answer should demonstrate independent analysis and careful implementation. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: requirements -> method -> edge cases -> validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: How would you estimate sample size using baseline rate, minimum detectable effect, significance level, power, and expected traffic?

What interviewer checks:
They are checking independent analysis and careful implementation, plus whether you connect technical analysis to a defensible business decision.

---

## Question 4

Experience level: 1-3 years | Junior

Interviewer:
Why should you avoid repeatedly checking results and stopping when p is below 0.05? What approaches support valid sequential decisions?

Pause the video and answer this question aloud.

Senior Associate answer guide:
State the causal question, unit of randomization, metrics, assumptions, sample-size logic, analysis plan, guardrails, decision rule, and limitations before interpreting results. For this 1-3 years | Junior question, the answer should demonstrate independent analysis and careful implementation. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: requirements -> method -> edge cases -> validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Why should you avoid repeatedly checking results and stopping when p is below 0.05? What approaches support valid sequential decisions?

What interviewer checks:
They are checking independent analysis and careful implementation, plus whether you connect technical analysis to a defensible business decision.

---

## Question 5

Experience level: 3-5 years | Mid-Level

Interviewer:
An experiment improves conversion but increases refunds and page latency. How would you make the launch decision?

Pause the video and answer this question aloud.

Senior Associate answer guide:
State the causal question, unit of randomization, metrics, assumptions, sample-size logic, analysis plan, guardrails, decision rule, and limitations before interpreting results. For this 3-5 years | Mid-Level question, the answer should demonstrate project ownership, tradeoffs, and production awareness. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business goal -> design -> tradeoffs -> metrics.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: An experiment improves conversion but increases refunds and page latency. How would you make the launch decision?

What interviewer checks:
They are checking project ownership, tradeoffs, and production awareness, plus whether you connect technical analysis to a defensible business decision.

---

## Question 6

Experience level: 3-5 years | Mid-Level

Interviewer:
How would you investigate sample-ratio mismatch, instrumentation bugs, novelty effects, and assignment contamination?

Pause the video and answer this question aloud.

Senior Associate answer guide:
State the causal question, unit of randomization, metrics, assumptions, sample-size logic, analysis plan, guardrails, decision rule, and limitations before interpreting results. For this 3-5 years | Mid-Level question, the answer should demonstrate project ownership, tradeoffs, and production awareness. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business goal -> design -> tradeoffs -> metrics.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: How would you investigate sample-ratio mismatch, instrumentation bugs, novelty effects, and assignment contamination?

What interviewer checks:
They are checking project ownership, tradeoffs, and production awareness, plus whether you connect technical analysis to a defensible business decision.

---

## Question 7

Experience level: 5-7 years | Senior

Interviewer:
Compare user-level, session-level, geographic, switchback, and cluster randomization. When does interference change the design?

Pause the video and answer this question aloud.

Senior Associate answer guide:
State the causal question, unit of randomization, metrics, assumptions, sample-size logic, analysis plan, guardrails, decision rule, and limitations before interpreting results. For this 5-7 years | Senior question, the answer should demonstrate leadership under ambiguity, scale, and cross-functional delivery. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: ambiguous goal -> system approach -> risks -> measurable decision.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Compare user-level, session-level, geographic, switchback, and cluster randomization. When does interference change the design?

What interviewer checks:
They are checking leadership under ambiguity, scale, and cross-functional delivery, plus whether you connect technical analysis to a defensible business decision.

---

## Question 8

Experience level: 5-7 years | Senior

Interviewer:
How would you use covariate adjustment, CUPED, stratification, or triggered analysis to improve sensitivity without biasing results?

Pause the video and answer this question aloud.

Senior Associate answer guide:
State the causal question, unit of randomization, metrics, assumptions, sample-size logic, analysis plan, guardrails, decision rule, and limitations before interpreting results. For this 5-7 years | Senior question, the answer should demonstrate leadership under ambiguity, scale, and cross-functional delivery. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: ambiguous goal -> system approach -> risks -> measurable decision.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: How would you use covariate adjustment, CUPED, stratification, or triggered analysis to improve sensitivity without biasing results?

What interviewer checks:
They are checking leadership under ambiguity, scale, and cross-functional delivery, plus whether you connect technical analysis to a defensible business decision.

---

## Question 9

Experience level: 7-10 years | Staff / Lead

Interviewer:
Design a self-service experimentation platform covering assignment, exposure logging, metric computation, power checks, analysis, and decision records.

Pause the video and answer this question aloud.

Senior Associate answer guide:
State the causal question, unit of randomization, metrics, assumptions, sample-size logic, analysis plan, guardrails, decision rule, and limitations before interpreting results. For this 7-10 years | Staff / Lead question, the answer should demonstrate cross-team influence and organization-level decision quality. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: organizational problem -> standards or platform -> adoption -> governance.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Design a self-service experimentation platform covering assignment, exposure logging, metric computation, power checks, analysis, and decision records.

What interviewer checks:
They are checking cross-team influence and organization-level decision quality, plus whether you connect technical analysis to a defensible business decision.

---

## Question 10

Experience level: 10+ years | Principal / Architect

Interviewer:
Create an experimentation governance model that balances speed with ethics, privacy, multiple-testing control, reproducibility, and long-term customer impact.

Pause the video and answer this question aloud.

Senior Associate answer guide:
State the causal question, unit of randomization, metrics, assumptions, sample-size logic, analysis plan, guardrails, decision rule, and limitations before interpreting results. For this 10+ years | Principal / Architect question, the answer should demonstrate enterprise direction, executive communication, and durable business impact. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business strategy -> decision framework -> quantified uncertainty -> durable ownership.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Create an experimentation governance model that balances speed with ethics, privacy, multiple-testing control, reproducibility, and long-term customer impact.

What interviewer checks:
They are checking enterprise direction, executive communication, and durable business impact, plus whether you connect technical analysis to a defensible business decision.

---

## Closing

That completes Episode 127: A/B Testing and Experiment Design.

Repeat the questions without reading the guides. For each answer, state the decision, assumptions, method, tradeoffs, validation evidence, limitations, and next action.
