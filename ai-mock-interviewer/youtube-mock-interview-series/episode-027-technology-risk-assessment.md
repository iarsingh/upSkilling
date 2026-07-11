# Episode 27: Technology Risk Assessment

YouTube title: DevOps Mock Interview Practice | Episode 27: Technology Risk Assessment

Estimated duration: 20-25 min

Source round: Mock Interview 27 - Technology Risk Assessment (source set 27)

Focus: cloud application risk assessment, identification techniques, scoring, FMEA, scenario analysis, and treatment options

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Technology Risk Assessment.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- DR: Disaster Recovery
- IAM: Identity and Access Management

---

## Question 1

Interviewer:
Walk me through a risk assessment for deploying a new cloud application.

Pause the video and answer this question aloud.

Senior Associate answer:
I review the business purpose, data classification, architecture, identity model, network exposure, dependencies, CI/CD flow, logging, backup, DR, and operational ownership. I identify risks such as public exposure, weak IAM, secrets leakage, missing monitoring, and rollback gaps. Then I score the risks, define controls, agree release gates, and ensure evidence exists before production.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Walk me through a risk assessment for deploying a new cloud application.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
How do you identify technology risks?

Pause the video and answer this question aloud.

Senior Associate answer:
I identify risks through architecture reviews, threat modeling, control testing, vulnerability scans, cloud posture tools, audit findings, incident reviews, access reviews, change reviews, and interviews with engineering teams. I also look for patterns such as manual changes, unclear ownership, missing logs, weak approval workflows, and excessive privileges.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How do you identify technology risks?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
What techniques do you use for risk identification?

Pause the video and answer this question aloud.

Senior Associate answer:
I use architecture review, STRIDE threat modeling, control gap analysis, FMEA, scenario analysis, audit walkthroughs, cloud security posture review, incident trend analysis, and dependency mapping. For cloud platforms, I also inspect IAM, network paths, encryption, logging, CI/CD controls, Terraform state, and data flows.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What techniques do you use for risk identification?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
What is qualitative vs quantitative risk analysis?

Pause the video and answer this question aloud.

Senior Associate answer:
Qualitative analysis uses categories such as low, medium, high, and critical based on expert judgment. Quantitative analysis estimates risk in financial or numeric terms, such as expected loss, outage cost, or probability. In most technology risk work I use qualitative scoring first, then quantitative analysis for high-impact decisions.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is qualitative vs quantitative risk analysis?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 5

Interviewer:
Explain likelihood and impact scoring.

Pause the video and answer this question aloud.

Senior Associate answer:
Likelihood measures how probable a risk event is, while impact measures the business damage if it happens. Impact can include financial loss, downtime, data exposure, regulatory impact, customer harm, and reputational damage. A risk with high impact and high likelihood should receive urgent remediation or executive attention.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Explain likelihood and impact scoring.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
How do you calculate risk severity?

Pause the video and answer this question aloud.

Senior Associate answer:
A common method is likelihood multiplied by impact, using a defined scoring scale. I also adjust severity based on control maturity, exploitability, exposure, asset criticality, and data sensitivity. For example, an overprivileged service account in production with customer data access is more severe than the same issue in a test project.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How do you calculate risk severity?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
What is FMEA?

Pause the video and answer this question aloud.

Senior Associate answer:
FMEA stands for Failure Mode and Effects Analysis. It identifies how a process or system can fail, the effect of each failure, the cause, existing controls, and the priority for action. In cloud risk, I might use FMEA to assess deployment failure modes such as bad configuration, secret leakage, failed rollback, or capacity exhaustion.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is FMEA?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
What is scenario analysis?

Pause the video and answer this question aloud.

Senior Associate answer:
Scenario analysis evaluates realistic risk events and their consequences. For example, "What happens if a public bucket exposes customer data?" or "What if Terraform state is modified incorrectly?" It helps teams think beyond control checklists and understand business impact, response steps, recovery plans, and control gaps.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is scenario analysis?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 9

Interviewer:
Explain risk acceptance, avoidance, mitigation, and transfer.

Pause the video and answer this question aloud.

Senior Associate answer:
Risk acceptance means leadership knowingly accepts residual risk. Avoidance means stopping the risky activity. Mitigation means reducing likelihood or impact through controls. Transfer means shifting some risk through insurance, contracts, or vendors. For critical technology risks, mitigation is usually preferred unless there is a documented business reason for acceptance.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Explain risk acceptance, avoidance, mitigation, and transfer.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 10

Interviewer:
Give an example of a risk you mitigated.

Pause the video and answer this question aloud.

Senior Associate answer:
A strong example would be overprivileged cloud service accounts. I would identify risky permissions through IAM analysis and audit logs, map actual usage, replace broad roles with least-privilege custom roles, remove unused keys, enforce Workload Identity, add monitoring for privilege changes, and track the remediation as a measurable reduction in access risk.


-----------

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Give an example of a risk you mitigated.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 27: Technology Risk Assessment.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
