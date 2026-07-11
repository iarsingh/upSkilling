# Episode 158: Hands-On SQL Query Coding Round

YouTube title: Data Science Mock Interview Practice | Episode 158: Hands-On SQL Query Coding Round

Estimated duration: 22-28 min

Source round: Python Full Stack to GenAI, ML, and Data Scientist Career Path

Focus: SQL filtering, joins, aggregation, CTEs, subqueries, window functions, gaps and islands, funnels, cohorts, retention, sessions, deduplication, query optimization, and production analytics

## Opening

Hi everyone, welcome back to the Data Science Mock Interview Practice series.

In today's episode, we are practicing Hands-On SQL Query Coding Round. Questions increase from foundation level to principal-level judgment.

Pause after each question and answer aloud. Clarify definitions and assumptions, show your method, discuss risks and limitations, and finish with how the result would support a decision.

---

## Question 1

Experience level: 0-1 year | Foundation

Interviewer:
Given `employees(id, name, department_id, salary)`, return the second-highest distinct salary in each department, including ties.

Pause the video and answer this question aloud.

Senior Associate answer guide:
State table grain and assumptions before querying. Produce correct SQL, handle nulls, duplicates and ties, explain each logical step, validate with small examples, state performance risks, and propose indexes, partitioning, or incremental computation where appropriate. For this 0-1 year | Foundation question, the answer should demonstrate fundamental correctness and clear reasoning. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: definition -> simple example -> basic validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Given `employees(id, name, department_id, salary)`, return the second-highest distinct salary in each department, including ties.

What interviewer checks:
They are checking fundamental correctness and clear reasoning, plus whether you connect technical analysis to a defensible business decision.

---

## Question 2

Experience level: 0-1 year | Foundation

Interviewer:
Given `customers` and `orders`, return every customer with order count, lifetime spend, latest order date, and zero values for customers without orders.

Pause the video and answer this question aloud.

Senior Associate answer guide:
State table grain and assumptions before querying. Produce correct SQL, handle nulls, duplicates and ties, explain each logical step, validate with small examples, state performance risks, and propose indexes, partitioning, or incremental computation where appropriate. For this 0-1 year | Foundation question, the answer should demonstrate fundamental correctness and clear reasoning. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: definition -> simple example -> basic validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Given `customers` and `orders`, return every customer with order count, lifetime spend, latest order date, and zero values for customers without orders.

What interviewer checks:
They are checking fundamental correctness and clear reasoning, plus whether you connect technical analysis to a defensible business decision.

---

## Question 3

Experience level: 1-3 years | Junior

Interviewer:
Given daily product sales, calculate daily revenue, a seven-day rolling average, previous-day change, and month-to-date cumulative revenue.

Pause the video and answer this question aloud.

Senior Associate answer guide:
State table grain and assumptions before querying. Produce correct SQL, handle nulls, duplicates and ties, explain each logical step, validate with small examples, state performance risks, and propose indexes, partitioning, or incremental computation where appropriate. For this 1-3 years | Junior question, the answer should demonstrate independent analysis and careful implementation. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: requirements -> method -> edge cases -> validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Given daily product sales, calculate daily revenue, a seven-day rolling average, previous-day change, and month-to-date cumulative revenue.

What interviewer checks:
They are checking independent analysis and careful implementation, plus whether you connect technical analysis to a defensible business decision.

---

## Question 4

Experience level: 1-3 years | Junior

Interviewer:
Given an events table, sessionize user activity using a 30-minute inactivity gap and return session start, end, duration, and event count.

Pause the video and answer this question aloud.

Senior Associate answer guide:
State table grain and assumptions before querying. Produce correct SQL, handle nulls, duplicates and ties, explain each logical step, validate with small examples, state performance risks, and propose indexes, partitioning, or incremental computation where appropriate. For this 1-3 years | Junior question, the answer should demonstrate independent analysis and careful implementation. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: requirements -> method -> edge cases -> validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Given an events table, sessionize user activity using a 30-minute inactivity gap and return session start, end, duration, and event count.

What interviewer checks:
They are checking independent analysis and careful implementation, plus whether you connect technical analysis to a defensible business decision.

---

## Question 5

Experience level: 3-5 years | Mid-Level

Interviewer:
Given signup, activation, checkout, and purchase events, calculate a correctly ordered conversion funnel within seven days of signup.

Pause the video and answer this question aloud.

Senior Associate answer guide:
State table grain and assumptions before querying. Produce correct SQL, handle nulls, duplicates and ties, explain each logical step, validate with small examples, state performance risks, and propose indexes, partitioning, or incremental computation where appropriate. For this 3-5 years | Mid-Level question, the answer should demonstrate project ownership, tradeoffs, and production awareness. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business goal -> design -> tradeoffs -> metrics.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Given signup, activation, checkout, and purchase events, calculate a correctly ordered conversion funnel within seven days of signup.

What interviewer checks:
They are checking project ownership, tradeoffs, and production awareness, plus whether you connect technical analysis to a defensible business decision.

---

## Question 6

Experience level: 3-5 years | Mid-Level

Interviewer:
Build monthly acquisition cohorts and calculate month-zero through month-six retention, handling late events and users with multiple devices.

Pause the video and answer this question aloud.

Senior Associate answer guide:
State table grain and assumptions before querying. Produce correct SQL, handle nulls, duplicates and ties, explain each logical step, validate with small examples, state performance risks, and propose indexes, partitioning, or incremental computation where appropriate. For this 3-5 years | Mid-Level question, the answer should demonstrate project ownership, tradeoffs, and production awareness. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business goal -> design -> tradeoffs -> metrics.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Build monthly acquisition cohorts and calculate month-zero through month-six retention, handling late events and users with multiple devices.

What interviewer checks:
They are checking project ownership, tradeoffs, and production awareness, plus whether you connect technical analysis to a defensible business decision.

---

## Question 7

Experience level: 5-7 years | Senior

Interviewer:
Given status-history rows, return each entity's current status and time spent in every previous status while handling duplicate timestamps.

Pause the video and answer this question aloud.

Senior Associate answer guide:
State table grain and assumptions before querying. Produce correct SQL, handle nulls, duplicates and ties, explain each logical step, validate with small examples, state performance risks, and propose indexes, partitioning, or incremental computation where appropriate. For this 5-7 years | Senior question, the answer should demonstrate leadership under ambiguity, scale, and cross-functional delivery. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: ambiguous goal -> system approach -> risks -> measurable decision.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Given status-history rows, return each entity's current status and time spent in every previous status while handling duplicate timestamps.

What interviewer checks:
They are checking leadership under ambiguity, scale, and cross-functional delivery, plus whether you connect technical analysis to a defensible business decision.

---

## Question 8

Experience level: 5-7 years | Senior

Interviewer:
Solve a gaps-and-islands problem to find each user's longest consecutive daily activity streak and explain alternative window-function approaches.

Pause the video and answer this question aloud.

Senior Associate answer guide:
State table grain and assumptions before querying. Produce correct SQL, handle nulls, duplicates and ties, explain each logical step, validate with small examples, state performance risks, and propose indexes, partitioning, or incremental computation where appropriate. For this 5-7 years | Senior question, the answer should demonstrate leadership under ambiguity, scale, and cross-functional delivery. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: ambiguous goal -> system approach -> risks -> measurable decision.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Solve a gaps-and-islands problem to find each user's longest consecutive daily activity streak and explain alternative window-function approaches.

What interviewer checks:
They are checking leadership under ambiguity, scale, and cross-functional delivery, plus whether you connect technical analysis to a defensible business decision.

---

## Question 9

Experience level: 7-10 years | Staff / Lead

Interviewer:
Deduplicate a billion-row event table while keeping the latest valid record per business key. Design incremental SQL, partition pruning, audit output, and safe deletion.

Pause the video and answer this question aloud.

Senior Associate answer guide:
State table grain and assumptions before querying. Produce correct SQL, handle nulls, duplicates and ties, explain each logical step, validate with small examples, state performance risks, and propose indexes, partitioning, or incremental computation where appropriate. For this 7-10 years | Staff / Lead question, the answer should demonstrate cross-team influence and organization-level decision quality. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: organizational problem -> standards or platform -> adoption -> governance.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Deduplicate a billion-row event table while keeping the latest valid record per business key. Design incremental SQL, partition pruning, audit output, and safe deletion.

What interviewer checks:
They are checking cross-team influence and organization-level decision quality, plus whether you connect technical analysis to a defensible business decision.

---

## Question 10

Experience level: 10+ years | Principal / Architect

Interviewer:
A complex analytical query joins ten large tables and exceeds its SLA. Diagnose grain inflation, cardinality estimates, join order, filters, indexes, partitions, materialized views, pre-aggregation, and correctness after optimization.

Pause the video and answer this question aloud.

Senior Associate answer guide:
State table grain and assumptions before querying. Produce correct SQL, handle nulls, duplicates and ties, explain each logical step, validate with small examples, state performance risks, and propose indexes, partitioning, or incremental computation where appropriate. For this 10+ years | Principal / Architect question, the answer should demonstrate enterprise direction, executive communication, and durable business impact. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business strategy -> decision framework -> quantified uncertainty -> durable ownership.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: A complex analytical query joins ten large tables and exceeds its SLA. Diagnose grain inflation, cardinality estimates, join order, filters, indexes, partitions, materialized views, pre-aggregation, and correctness after optimization.

What interviewer checks:
They are checking enterprise direction, executive communication, and durable business impact, plus whether you connect technical analysis to a defensible business decision.

---

## Closing

That completes Episode 158: Hands-On SQL Query Coding Round.

Repeat the questions without reading the guides. For each answer, state the decision, assumptions, method, tradeoffs, validation evidence, limitations, and next action.
