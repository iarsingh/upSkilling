# Episode 129: Feature Engineering, Leakage, and Error Analysis

YouTube title: Data Science Mock Interview Practice | Episode 129: Feature Engineering, Leakage, and Error Analysis

Estimated duration: 22-28 min

Source round: Python Full Stack to GenAI, ML, and Data Scientist Career Path

Focus: preprocessing, encoding, scaling, temporal features, leakage, feature stores, skew, error slices, fairness, lineage, and feature governance

## Opening

Hi everyone, welcome back to the Data Science Mock Interview Practice series.

In today's episode, we are practicing Feature Engineering, Leakage, and Error Analysis. Questions increase from foundation level to principal-level judgment.

Pause after each question and answer aloud. Clarify definitions and assumptions, show your method, discuss risks and limitations, and finish with how the result would support a decision.

---

## Question 1

Experience level: 0-1 year | Foundation

Interviewer:
How would you encode categorical variables and scale numerical variables, and which models require scaling?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Connect every feature to prediction time, apply transformations reproducibly, prevent leakage, test training-serving consistency, analyze failure slices, and document ownership and lineage. For this 0-1 year | Foundation question, the answer should demonstrate fundamental correctness and clear reasoning. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: definition -> simple example -> basic validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: How would you encode categorical variables and scale numerical variables, and which models require scaling?

What interviewer checks:
They are checking fundamental correctness and clear reasoning, plus whether you connect technical analysis to a defensible business decision.

---

## Question 2

Experience level: 0-1 year | Foundation

Interviewer:
How would you handle missing values while preserving information that missingness itself may carry?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Connect every feature to prediction time, apply transformations reproducibly, prevent leakage, test training-serving consistency, analyze failure slices, and document ownership and lineage. For this 0-1 year | Foundation question, the answer should demonstrate fundamental correctness and clear reasoning. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: definition -> simple example -> basic validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: How would you handle missing values while preserving information that missingness itself may carry?

What interviewer checks:
They are checking fundamental correctness and clear reasoning, plus whether you connect technical analysis to a defensible business decision.

---

## Question 3

Experience level: 1-3 years | Junior

Interviewer:
Create time, aggregation, interaction, and text features for a churn model without using future information.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Connect every feature to prediction time, apply transformations reproducibly, prevent leakage, test training-serving consistency, analyze failure slices, and document ownership and lineage. For this 1-3 years | Junior question, the answer should demonstrate independent analysis and careful implementation. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: requirements -> method -> edge cases -> validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Create time, aggregation, interaction, and text features for a churn model without using future information.

What interviewer checks:
They are checking independent analysis and careful implementation, plus whether you connect technical analysis to a defensible business decision.

---

## Question 4

Experience level: 1-3 years | Junior

Interviewer:
Explain target leakage, train-test contamination, proxy leakage, and temporal leakage with examples.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Connect every feature to prediction time, apply transformations reproducibly, prevent leakage, test training-serving consistency, analyze failure slices, and document ownership and lineage. For this 1-3 years | Junior question, the answer should demonstrate independent analysis and careful implementation. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: requirements -> method -> edge cases -> validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Explain target leakage, train-test contamination, proxy leakage, and temporal leakage with examples.

What interviewer checks:
They are checking independent analysis and careful implementation, plus whether you connect technical analysis to a defensible business decision.

---

## Question 5

Experience level: 3-5 years | Mid-Level

Interviewer:
How would you build preprocessing so identical transformations run during training and inference?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Connect every feature to prediction time, apply transformations reproducibly, prevent leakage, test training-serving consistency, analyze failure slices, and document ownership and lineage. For this 3-5 years | Mid-Level question, the answer should demonstrate project ownership, tradeoffs, and production awareness. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business goal -> design -> tradeoffs -> metrics.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: How would you build preprocessing so identical transformations run during training and inference?

What interviewer checks:
They are checking project ownership, tradeoffs, and production awareness, plus whether you connect technical analysis to a defensible business decision.

---

## Question 6

Experience level: 3-5 years | Mid-Level

Interviewer:
A model performs poorly for new customers and one geographic region. How would you conduct slice-based error analysis?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Connect every feature to prediction time, apply transformations reproducibly, prevent leakage, test training-serving consistency, analyze failure slices, and document ownership and lineage. For this 3-5 years | Mid-Level question, the answer should demonstrate project ownership, tradeoffs, and production awareness. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business goal -> design -> tradeoffs -> metrics.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: A model performs poorly for new customers and one geographic region. How would you conduct slice-based error analysis?

What interviewer checks:
They are checking project ownership, tradeoffs, and production awareness, plus whether you connect technical analysis to a defensible business decision.

---

## Question 7

Experience level: 5-7 years | Senior

Interviewer:
Design point-in-time-correct feature generation for batch training and low-latency online serving.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Connect every feature to prediction time, apply transformations reproducibly, prevent leakage, test training-serving consistency, analyze failure slices, and document ownership and lineage. For this 5-7 years | Senior question, the answer should demonstrate leadership under ambiguity, scale, and cross-functional delivery. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: ambiguous goal -> system approach -> risks -> measurable decision.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Design point-in-time-correct feature generation for batch training and low-latency online serving.

What interviewer checks:
They are checking leadership under ambiguity, scale, and cross-functional delivery, plus whether you connect technical analysis to a defensible business decision.

---

## Question 8

Experience level: 5-7 years | Senior

Interviewer:
How would you validate feature freshness, null rates, distributions, lineage, ownership, and training-serving skew in production?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Connect every feature to prediction time, apply transformations reproducibly, prevent leakage, test training-serving consistency, analyze failure slices, and document ownership and lineage. For this 5-7 years | Senior question, the answer should demonstrate leadership under ambiguity, scale, and cross-functional delivery. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: ambiguous goal -> system approach -> risks -> measurable decision.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: How would you validate feature freshness, null rates, distributions, lineage, ownership, and training-serving skew in production?

What interviewer checks:
They are checking leadership under ambiguity, scale, and cross-functional delivery, plus whether you connect technical analysis to a defensible business decision.

---

## Question 9

Experience level: 7-10 years | Staff / Lead

Interviewer:
Several teams define the same customer features differently. Design a feature-management strategy without creating a central bottleneck.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Connect every feature to prediction time, apply transformations reproducibly, prevent leakage, test training-serving consistency, analyze failure slices, and document ownership and lineage. For this 7-10 years | Staff / Lead question, the answer should demonstrate cross-team influence and organization-level decision quality. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: organizational problem -> standards or platform -> adoption -> governance.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Several teams define the same customer features differently. Design a feature-management strategy without creating a central bottleneck.

What interviewer checks:
They are checking cross-team influence and organization-level decision quality, plus whether you connect technical analysis to a defensible business decision.

---

## Question 10

Experience level: 10+ years | Principal / Architect

Interviewer:
Create an enterprise policy for feature privacy, sensitive attributes, fairness analysis, retention, deletion, reuse, and auditability.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Connect every feature to prediction time, apply transformations reproducibly, prevent leakage, test training-serving consistency, analyze failure slices, and document ownership and lineage. For this 10+ years | Principal / Architect question, the answer should demonstrate enterprise direction, executive communication, and durable business impact. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business strategy -> decision framework -> quantified uncertainty -> durable ownership.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Create an enterprise policy for feature privacy, sensitive attributes, fairness analysis, retention, deletion, reuse, and auditability.

What interviewer checks:
They are checking enterprise direction, executive communication, and durable business impact, plus whether you connect technical analysis to a defensible business decision.

---

## Closing

That completes Episode 129: Feature Engineering, Leakage, and Error Analysis.

Repeat the questions without reading the guides. For each answer, state the decision, assumptions, method, tradeoffs, validation evidence, limitations, and next action.
