# Episode 125: SQL Analytics, Cohorts, Funnels, and Retention

YouTube title: Data Science Mock Interview Practice | Episode 125: SQL Analytics, Cohorts, Funnels, and Retention

Estimated duration: 22-28 min

Source round: Python Full Stack to GenAI, ML, and Data Scientist Career Path

Focus: SQL fundamentals, joins, aggregation, windows, funnels, cohorts, retention, query performance, data modelling, metric governance, and analytics architecture

## Opening

Hi everyone, welcome back to the Data Science Mock Interview Practice series.

In today's episode, we are practicing SQL Analytics, Cohorts, Funnels, and Retention. Questions increase from foundation level to principal-level judgment.

Pause after each question and answer aloud. Clarify definitions and assumptions, show your method, discuss risks and limitations, and finish with how the result would support a decision.

---

## Question 1

Experience level: 0-1 year | Foundation

Interviewer:
Given users and orders tables, write SQL to calculate daily orders, revenue, and average order value.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify table grain and business definitions, write or describe correct SQL, handle duplicates and nulls, validate totals, discuss performance, and explain the business interpretation. For this 0-1 year | Foundation question, the answer should demonstrate fundamental correctness and clear reasoning. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: definition -> simple example -> basic validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Given users and orders tables, write SQL to calculate daily orders, revenue, and average order value.

What interviewer checks:
They are checking fundamental correctness and clear reasoning, plus whether you connect technical analysis to a defensible business decision.

---

## Question 2

Experience level: 0-1 year | Foundation

Interviewer:
Explain INNER, LEFT, RIGHT, and FULL joins. How can a many-to-many join accidentally inflate a metric?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify table grain and business definitions, write or describe correct SQL, handle duplicates and nulls, validate totals, discuss performance, and explain the business interpretation. For this 0-1 year | Foundation question, the answer should demonstrate fundamental correctness and clear reasoning. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: definition -> simple example -> basic validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Explain INNER, LEFT, RIGHT, and FULL joins. How can a many-to-many join accidentally inflate a metric?

What interviewer checks:
They are checking fundamental correctness and clear reasoning, plus whether you connect technical analysis to a defensible business decision.

---

## Question 3

Experience level: 1-3 years | Junior

Interviewer:
Use window functions to rank the top three products by revenue within each month.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify table grain and business definitions, write or describe correct SQL, handle duplicates and nulls, validate totals, discuss performance, and explain the business interpretation. For this 1-3 years | Junior question, the answer should demonstrate independent analysis and careful implementation. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: requirements -> method -> edge cases -> validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Use window functions to rank the top three products by revenue within each month.

What interviewer checks:
They are checking independent analysis and careful implementation, plus whether you connect technical analysis to a defensible business decision.

---

## Question 4

Experience level: 1-3 years | Junior

Interviewer:
Write a query to calculate a seven-day rolling average of daily active users and compare it with the previous week.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify table grain and business definitions, write or describe correct SQL, handle duplicates and nulls, validate totals, discuss performance, and explain the business interpretation. For this 1-3 years | Junior question, the answer should demonstrate independent analysis and careful implementation. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: requirements -> method -> edge cases -> validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Write a query to calculate a seven-day rolling average of daily active users and compare it with the previous week.

What interviewer checks:
They are checking independent analysis and careful implementation, plus whether you connect technical analysis to a defensible business decision.

---

## Question 5

Experience level: 3-5 years | Mid-Level

Interviewer:
Design SQL for a signup-to-purchase funnel and explain how you would define ordering, time windows, and repeated events.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify table grain and business definitions, write or describe correct SQL, handle duplicates and nulls, validate totals, discuss performance, and explain the business interpretation. For this 3-5 years | Mid-Level question, the answer should demonstrate project ownership, tradeoffs, and production awareness. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business goal -> design -> tradeoffs -> metrics.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Design SQL for a signup-to-purchase funnel and explain how you would define ordering, time windows, and repeated events.

What interviewer checks:
They are checking project ownership, tradeoffs, and production awareness, plus whether you connect technical analysis to a defensible business decision.

---

## Question 6

Experience level: 3-5 years | Mid-Level

Interviewer:
Build monthly acquisition cohorts and calculate month-zero through month-six retention.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify table grain and business definitions, write or describe correct SQL, handle duplicates and nulls, validate totals, discuss performance, and explain the business interpretation. For this 3-5 years | Mid-Level question, the answer should demonstrate project ownership, tradeoffs, and production awareness. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business goal -> design -> tradeoffs -> metrics.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Build monthly acquisition cohorts and calculate month-zero through month-six retention.

What interviewer checks:
They are checking project ownership, tradeoffs, and production awareness, plus whether you connect technical analysis to a defensible business decision.

---

## Question 7

Experience level: 5-7 years | Senior

Interviewer:
A dashboard total differs from finance by 12%. How would you investigate grain, joins, time zones, refunds, late data, and metric definitions?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify table grain and business definitions, write or describe correct SQL, handle duplicates and nulls, validate totals, discuss performance, and explain the business interpretation. For this 5-7 years | Senior question, the answer should demonstrate leadership under ambiguity, scale, and cross-functional delivery. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: ambiguous goal -> system approach -> risks -> measurable decision.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: A dashboard total differs from finance by 12%. How would you investigate grain, joins, time zones, refunds, late data, and metric definitions?

What interviewer checks:
They are checking leadership under ambiguity, scale, and cross-functional delivery, plus whether you connect technical analysis to a defensible business decision.

---

## Question 8

Experience level: 5-7 years | Senior

Interviewer:
A cohort query over billions of events is too slow. Explain partitioning, clustering, pre-aggregation, incremental models, and query-plan validation.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify table grain and business definitions, write or describe correct SQL, handle duplicates and nulls, validate totals, discuss performance, and explain the business interpretation. For this 5-7 years | Senior question, the answer should demonstrate leadership under ambiguity, scale, and cross-functional delivery. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: ambiguous goal -> system approach -> risks -> measurable decision.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: A cohort query over billions of events is too slow. Explain partitioning, clustering, pre-aggregation, incremental models, and query-plan validation.

What interviewer checks:
They are checking leadership under ambiguity, scale, and cross-functional delivery, plus whether you connect technical analysis to a defensible business decision.

---

## Question 9

Experience level: 7-10 years | Staff / Lead

Interviewer:
How would you establish governed metric definitions so product, finance, and marketing stop reporting different active-user and revenue numbers?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify table grain and business definitions, write or describe correct SQL, handle duplicates and nulls, validate totals, discuss performance, and explain the business interpretation. For this 7-10 years | Staff / Lead question, the answer should demonstrate cross-team influence and organization-level decision quality. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: organizational problem -> standards or platform -> adoption -> governance.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: How would you establish governed metric definitions so product, finance, and marketing stop reporting different active-user and revenue numbers?

What interviewer checks:
They are checking cross-team influence and organization-level decision quality, plus whether you connect technical analysis to a defensible business decision.

---

## Question 10

Experience level: 10+ years | Principal / Architect

Interviewer:
Design an enterprise analytics architecture that supports self-service SQL while protecting privacy, controlling cost, maintaining lineage, and preserving trustworthy metrics.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Clarify table grain and business definitions, write or describe correct SQL, handle duplicates and nulls, validate totals, discuss performance, and explain the business interpretation. For this 10+ years | Principal / Architect question, the answer should demonstrate enterprise direction, executive communication, and durable business impact. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business strategy -> decision framework -> quantified uncertainty -> durable ownership.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Design an enterprise analytics architecture that supports self-service SQL while protecting privacy, controlling cost, maintaining lineage, and preserving trustworthy metrics.

What interviewer checks:
They are checking enterprise direction, executive communication, and durable business impact, plus whether you connect technical analysis to a defensible business decision.

---

## Closing

That completes Episode 125: SQL Analytics, Cohorts, Funnels, and Retention.

Repeat the questions without reading the guides. For each answer, state the decision, assumptions, method, tradeoffs, validation evidence, limitations, and next action.
