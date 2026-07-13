# Behavioral Questions with Answer Guidance

Behavioral answers must come from your real experience. The questions are followed by the STAR framework, CV story mapping, and safe answer templates.

Prepare two truthful STAR stories for each value. Include your exact contribution, alternatives considered, disagreement, measurable result, and lesson. Never reveal confidential customer or employer information.

## Put customers first

1. Tell me about a time you prioritized customer impact over an easier technical choice.
2. Describe a case where the customer's requested solution was not the right solution.
3. How did you handle an incident while keeping stakeholders informed?

## Act now, iterate

4. Tell me about a gap you fixed without waiting for formal assignment.
5. Describe a minimal first solution that you deliberately improved over time.
6. When did acting quickly create risk, and how did you control it?

## Nail the basics

7. Tell me about a flashy proposal you simplified to focus on fundamentals.
8. Describe how you improved documentation, testing, monitoring, or ownership before scaling.
9. What basic control have you seen teams repeatedly underestimate?

## Expect and embrace change

10. Describe a major priority or architecture change and how you adapted.
11. Tell me about a tool or process you had to unlearn.
12. How did you keep delivery moving when requirements were incomplete?

## Innovate together

13. Tell me about a solution improved by a colleague's different perspective.
14. Describe cross-functional work with development, security, networking, and operations.
15. How have you enabled a less-experienced engineer to succeed?

## Take risks, remain calm

16. Describe a calculated technical risk you took and how you measured it.
17. Tell me about the highest-pressure outage you handled.
18. Describe a failure caused by your decision and what changed afterward.

## Own without ego

19. Tell me about a problem outside your formal responsibility that you owned.
20. Describe a time you were wrong and changed your approach.
21. Tell me about difficult feedback you received and applied.

## Earn trust, give trust

22. How did you rebuild trust after a missed commitment or production failure?
23. Tell me about delegating a critical task rather than controlling it yourself.
24. Describe how you communicated bad news early and transparently.

## Take pride in your work

25. Which project best represents your engineering standards and why?
26. Tell me about technical debt you refused to normalize.
27. Describe an improvement that continued producing value after you moved on.

## Challenge ideas, champion execution

28. Tell me about challenging a popular technical proposal with evidence.
29. Describe a decision you disagreed with but executed successfully after commitment.
30. How did you turn an ambiguous idea into an implemented, measurable outcome?

## General behavioral follow-ups

31. What exactly did you personally do?
32. What alternatives did you consider?
33. What was the hardest trade-off?
34. Who disagreed, and how did you respond?
35. What data informed the decision?
36. What was the measurable result?
37. What failed or surprised you?
38. What would you do differently now?
39. How did you prevent recurrence?
40. How does this experience transfer to Oracle Health?

## Suggested CV story inventory

Build truthful STAR stories around these resume anchors:

- Terraform module standardization and the claimed 70% provisioning improvement
- GCP cost optimization and the claimed 20% reduction
- A production GKE incident, upgrade, or scaling problem
- GitHub-to-Bitbucket migration and the claimed 30% productivity improvement
- OpenTelemetry or Cloud Armor implementation
- Backup and recovery using Kasten K10 or Veeam
- CI/CD improvement producing the claimed 40% deployment-effort reduction
- Multi-cloud platform work and collaboration with cloud-provider engineering teams
- A security or governance control that initially met resistance
- An error, failed change, or incorrect technical assumption and the resulting learning

---

Do not memorize invented stories. Complete the fields below with truthful details from your experience. The strongest likely anchors from your CV are Terraform modules, GCP cost optimization, GKE operations, CI/CD automation, repository migration, observability/security, and backup/DR.

## Reusable STAR template

> **Situation (15%):** At [company/project], [system/team] faced [specific problem] affecting [customer/business/SLO].
>
> **Task (10%):** I was responsible for [your scope], with success defined as [metric/deadline/risk].
>
> **Action (55%):** I first [measured/investigated]. I considered [options] and chose [decision] because [trade-off]. I personally [implementation steps]. I collaborated with [roles] and controlled risk through [test/canary/rollback/communication].
>
> **Result (15%):** The outcome was [verified metric]. We also [lasting improvement].
>
> **Reflection (5%):** I learned [lesson]. Today I would [improvement].

## Suggested truthful story mapping

1. **Put customers first:** Use a production incident or reliability improvement. Name the affected user journey, how you prioritized mitigation, and how you communicated.
2. **Act now, iterate:** Use an automation/golden-path gap. Explain the small first release, feedback, and later hardening.
3. **Nail the basics:** Use probes, monitoring, backup verification, IAM cleanup, tagging, or pipeline tests completed before a more advanced platform change.
4. **Expect and embrace change:** Use the GitHub-to-Bitbucket migration, a provider/tool change, or a major priority shift.
5. **Innovate together:** Use cross-functional work with cloud-provider, security, networking, application, or data teams.
6. **Take risks, remain calm:** Use a controlled GKE upgrade/migration or a high-severity incident. Show data-driven risk assessment and calm mitigation.
7. **Own without ego:** Use an incident outside your original component or a time another engineer's approach proved better.
8. **Earn trust, give trust:** Use transparent escalation of a failed change or delegation of an important migration workstream.
9. **Take pride in your work:** Use reusable Terraform modules, observability standards, or a durable automation framework.
10. **Challenge ideas, champion execution:** Use a security, cost, or architecture proposal you challenged with evidence, then explain how you committed after the decision.

## Example framework: Terraform module standardization

Do not repeat the bracketed text until verified.

“Provisioning was inconsistent across [number] teams/projects and typically required [baseline]. I was responsible for standardizing [specific resources] without removing necessary team flexibility. I inventoried repeated patterns and failure cases, defined a small stable module contract, added secure defaults and validation, tested it in [environment], and onboarded teams in waves. I used version pinning and changelogs so adoption did not create uncontrolled blast radius. This reduced [measured lead time/manual effort] by [verified amount] and reduced [errors/tickets if measured]. I learned that module adoption depends as much on documentation and support ownership as on Terraform code.”

## Example framework: production incident

“At [company], [customer-facing effect] began at [time/signal]. I owned [technical/incident role]. I first confirmed blast radius and paused [risky rollout/change], then compared [load balancer, service endpoint, Pod, node, dependency] signals. Evidence showed [root cause—not guess]. We mitigated by [reversible action] and validated recovery using [SLI]. Afterward I led/contributed to an RCA and implemented [probe/capacity/test/alert/runbook/process change]. Impact was [verified duration/requests], and recurrence was [measured outcome]. I would now improve [specific detection or rollout control].”

## Example framework: admitting a mistake

“I recommended [decision] based on [initial evidence], but [new evidence/result] showed my assumption was wrong. I stated that clearly, stopped defending the original approach, and brought the team the updated data and recovery options. We chose [better approach], and I owned [migration/fix]. I then added [test/review/measurement] so the same assumption would be challenged earlier. The lesson was [specific], not simply ‘communicate more.’”

## Checklist before using any story

- Can I explain what I personally did versus the team?
- Can I substantiate every number?
- Can I describe commands, architecture, or decision evidence when challenged?
- Have I removed confidential names and data?
- Did I include disagreement, alternative, or trade-off?
- Did I state customer/business impact?
- Did I explain a lasting prevention or learning?
- Does the story clearly align to one OHAI value?
