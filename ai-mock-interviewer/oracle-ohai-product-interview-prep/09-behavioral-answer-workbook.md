# Behavioral Answer Workbook

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
