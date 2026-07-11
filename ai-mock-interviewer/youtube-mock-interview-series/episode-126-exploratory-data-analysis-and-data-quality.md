# Episode 126: Exploratory Data Analysis and Data Quality

YouTube title: Data Science Mock Interview Practice | Episode 126: Exploratory Data Analysis and Data Quality

Estimated duration: 22-28 min

Source round: Python Full Stack to GenAI, ML, and Data Scientist Career Path

Focus: data profiling, missingness, outliers, distributions, relationships, leakage, validation, data contracts, observability, and organization-wide quality

## Opening

Hi everyone, welcome back to the Data Science Mock Interview Practice series.

In today's episode, we are practicing Exploratory Data Analysis and Data Quality. Questions increase from foundation level to principal-level judgment.

Pause after each question and answer aloud. Clarify definitions and assumptions, show your method, discuss risks and limitations, and finish with how the result would support a decision.

---

## Question 1

Experience level: 0-1 year | Foundation

Interviewer:
What are the goals of exploratory data analysis, and which checks would you run first on an unfamiliar dataset?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Begin with dataset grain and provenance, profile quality and distributions, form testable hypotheses, avoid destructive cleaning, document decisions, and validate with domain owners. For this 0-1 year | Foundation question, the answer should demonstrate fundamental correctness and clear reasoning. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: definition -> simple example -> basic validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: What are the goals of exploratory data analysis, and which checks would you run first on an unfamiliar dataset?

What interviewer checks:
They are checking fundamental correctness and clear reasoning, plus whether you connect technical analysis to a defensible business decision.

---

## Question 2

Experience level: 0-1 year | Foundation

Interviewer:
How would you identify and handle missing values, duplicates, invalid categories, impossible dates, and inconsistent units?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Begin with dataset grain and provenance, profile quality and distributions, form testable hypotheses, avoid destructive cleaning, document decisions, and validate with domain owners. For this 0-1 year | Foundation question, the answer should demonstrate fundamental correctness and clear reasoning. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: definition -> simple example -> basic validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: How would you identify and handle missing values, duplicates, invalid categories, impossible dates, and inconsistent units?

What interviewer checks:
They are checking fundamental correctness and clear reasoning, plus whether you connect technical analysis to a defensible business decision.

---

## Question 3

Experience level: 1-3 years | Junior

Interviewer:
How do histograms, box plots, scatter plots, correlation matrices, and grouped summaries reveal different patterns?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Begin with dataset grain and provenance, profile quality and distributions, form testable hypotheses, avoid destructive cleaning, document decisions, and validate with domain owners. For this 1-3 years | Junior question, the answer should demonstrate independent analysis and careful implementation. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: requirements -> method -> edge cases -> validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: How do histograms, box plots, scatter plots, correlation matrices, and grouped summaries reveal different patterns?

What interviewer checks:
They are checking independent analysis and careful implementation, plus whether you connect technical analysis to a defensible business decision.

---

## Question 4

Experience level: 1-3 years | Junior

Interviewer:
Compare missing completely at random, missing at random, and missing not at random. Why does the distinction matter?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Begin with dataset grain and provenance, profile quality and distributions, form testable hypotheses, avoid destructive cleaning, document decisions, and validate with domain owners. For this 1-3 years | Junior question, the answer should demonstrate independent analysis and careful implementation. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: requirements -> method -> edge cases -> validation.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Compare missing completely at random, missing at random, and missing not at random. Why does the distinction matter?

What interviewer checks:
They are checking independent analysis and careful implementation, plus whether you connect technical analysis to a defensible business decision.

---

## Question 5

Experience level: 3-5 years | Mid-Level

Interviewer:
How would you investigate outliers without automatically deleting rare but important business events?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Begin with dataset grain and provenance, profile quality and distributions, form testable hypotheses, avoid destructive cleaning, document decisions, and validate with domain owners. For this 3-5 years | Mid-Level question, the answer should demonstrate project ownership, tradeoffs, and production awareness. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business goal -> design -> tradeoffs -> metrics.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: How would you investigate outliers without automatically deleting rare but important business events?

What interviewer checks:
They are checking project ownership, tradeoffs, and production awareness, plus whether you connect technical analysis to a defensible business decision.

---

## Question 6

Experience level: 3-5 years | Mid-Level

Interviewer:
A feature has high correlation with the target. How would you determine whether it represents real signal, leakage, duplication, or a timestamp artifact?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Begin with dataset grain and provenance, profile quality and distributions, form testable hypotheses, avoid destructive cleaning, document decisions, and validate with domain owners. For this 3-5 years | Mid-Level question, the answer should demonstrate project ownership, tradeoffs, and production awareness. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business goal -> design -> tradeoffs -> metrics.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: A feature has high correlation with the target. How would you determine whether it represents real signal, leakage, duplication, or a timestamp artifact?

What interviewer checks:
They are checking project ownership, tradeoffs, and production awareness, plus whether you connect technical analysis to a defensible business decision.

---

## Question 7

Experience level: 5-7 years | Senior

Interviewer:
Design reusable data-validation checks for schema, freshness, volume, uniqueness, ranges, referential integrity, and distribution change.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Begin with dataset grain and provenance, profile quality and distributions, form testable hypotheses, avoid destructive cleaning, document decisions, and validate with domain owners. For this 5-7 years | Senior question, the answer should demonstrate leadership under ambiguity, scale, and cross-functional delivery. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: ambiguous goal -> system approach -> risks -> measurable decision.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Design reusable data-validation checks for schema, freshness, volume, uniqueness, ranges, referential integrity, and distribution change.

What interviewer checks:
They are checking leadership under ambiguity, scale, and cross-functional delivery, plus whether you connect technical analysis to a defensible business decision.

---

## Question 8

Experience level: 5-7 years | Senior

Interviewer:
A source-system migration changes category values and event timing. How would you detect, quantify, communicate, and safely adapt to the break?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Begin with dataset grain and provenance, profile quality and distributions, form testable hypotheses, avoid destructive cleaning, document decisions, and validate with domain owners. For this 5-7 years | Senior question, the answer should demonstrate leadership under ambiguity, scale, and cross-functional delivery. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: ambiguous goal -> system approach -> risks -> measurable decision.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: A source-system migration changes category values and event timing. How would you detect, quantify, communicate, and safely adapt to the break?

What interviewer checks:
They are checking leadership under ambiguity, scale, and cross-functional delivery, plus whether you connect technical analysis to a defensible business decision.

---

## Question 9

Experience level: 7-10 years | Staff / Lead

Interviewer:
Design data contracts and ownership boundaries between application, platform, analytics, and data-science teams.

Pause the video and answer this question aloud.

Senior Associate answer guide:
Begin with dataset grain and provenance, profile quality and distributions, form testable hypotheses, avoid destructive cleaning, document decisions, and validate with domain owners. For this 7-10 years | Staff / Lead question, the answer should demonstrate cross-team influence and organization-level decision quality. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: organizational problem -> standards or platform -> adoption -> governance.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: Design data contracts and ownership boundaries between application, platform, analytics, and data-science teams.

What interviewer checks:
They are checking cross-team influence and organization-level decision quality, plus whether you connect technical analysis to a defensible business decision.

---

## Question 10

Experience level: 10+ years | Principal / Architect

Interviewer:
How would you create an enterprise data-quality operating model with severity levels, SLOs, incident response, prevention, and executive reporting?

Pause the video and answer this question aloud.

Senior Associate answer guide:
Begin with dataset grain and provenance, profile quality and distributions, form testable hypotheses, avoid destructive cleaning, document decisions, and validate with domain owners. For this 10+ years | Principal / Architect question, the answer should demonstrate enterprise direction, executive communication, and durable business impact. Include a concrete example, the most important assumption or failure risk, and the evidence you would use to validate the conclusion.

Senior answer structure:
Use this structure: business strategy -> decision framework -> quantified uncertainty -> durable ownership.

Scenario-based practice:
Apply the question to a realistic product or business situation. Explain the context, data, method, tradeoff, validation, recommendation, and ownership for: How would you create an enterprise data-quality operating model with severity levels, SLOs, incident response, prevention, and executive reporting?

What interviewer checks:
They are checking enterprise direction, executive communication, and durable business impact, plus whether you connect technical analysis to a defensible business decision.

---

## Closing

That completes Episode 126: Exploratory Data Analysis and Data Quality.

Repeat the questions without reading the guides. For each answer, state the decision, assumptions, method, tradeoffs, validation evidence, limitations, and next action.
