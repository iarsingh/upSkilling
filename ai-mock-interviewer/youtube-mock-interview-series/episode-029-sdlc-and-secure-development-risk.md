# Episode 29: SDLC and Secure Development Risk

YouTube title: DevOps Mock Interview Practice | Episode 29: SDLC and Secure Development Risk

Estimated duration: 20-25 min

Source round: Mock Interview 29 - SDLC and Secure Development Risk (source set 29)

Focus: risk in SDLC, BRD/PRD review, architecture review, Secure SDLC, threat modeling, STRIDE, and DevSecOps

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing SDLC and Secure Development Risk.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- IaC: Infrastructure as Code
- IAM: Identity and Access Management

---

## Question 1

Interviewer:
How do you integrate risk into SDLC?

Pause the video and answer this question aloud.

Senior Associate answer:
I integrate risk at each phase: requirements, design, development, testing, release, and operations. During requirements, I review data and regulatory impact. During design, I review architecture and threats. During build, I use secure coding, scanning, and peer review. Before release, I check controls, evidence, rollback, monitoring, and ownership.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How do you integrate risk into SDLC?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
What risks should be reviewed during BRD/PRD?

Pause the video and answer this question aloud.

Senior Associate answer:
I review data sensitivity, business criticality, customer impact, regulatory needs, authentication, authorization, integrations, third-party dependencies, availability requirements, logging, retention, and operational support. Early review prevents expensive rework after design or implementation.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What risks should be reviewed during BRD/PRD?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
How do you review architecture from a risk perspective?

Pause the video and answer this question aloud.

Senior Associate answer:
I review identity, data flows, trust boundaries, network exposure, encryption, logging, resilience, dependencies, secrets, deployment process, and operational ownership. I ask what can fail, what can be abused, how it will be detected, how it will be recovered, and who owns each control.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How do you review architecture from a risk perspective?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
What security controls should exist before production deployment?

Pause the video and answer this question aloud.

Senior Associate answer:
Required controls include strong IAM, secrets management, encryption, vulnerability scanning, secure CI/CD, approval gates, logging, monitoring, alerting, backup and restore, rollback plan, network restrictions, data protection, and incident runbooks. For regulated systems, evidence and control sign-off should be captured before release.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What security controls should exist before production deployment?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 5

Interviewer:
Explain Secure SDLC.

Pause the video and answer this question aloud.

Senior Associate answer:
Secure SDLC embeds security and risk controls throughout software delivery instead of checking at the end. It includes secure requirements, threat modeling, secure coding, code review, SAST, dependency scanning, container scanning, secrets detection, DAST where relevant, release approvals, and post-production monitoring.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Explain Secure SDLC.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
What are threat modeling techniques?

Pause the video and answer this question aloud.

Senior Associate answer:
Common techniques include STRIDE, attack trees, data flow diagrams, abuse cases, and kill chain analysis. I use threat modeling to identify how a system can be attacked or misused, especially across trust boundaries like internet entry points, APIs, service accounts, and data stores.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What are threat modeling techniques?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
What is STRIDE?

Pause the video and answer this question aloud.

Senior Associate answer:
STRIDE is a threat modeling framework: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, and Elevation of privilege. It helps systematically identify threats and map them to controls such as authentication, integrity checks, logging, encryption, rate limiting, and least privilege.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is STRIDE?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
What is attack surface?

Pause the video and answer this question aloud.

Senior Associate answer:
Attack surface is the total set of entry points or weaknesses an attacker could use. Examples include public endpoints, APIs, service accounts, open ports, CI/CD secrets, admin consoles, and third-party integrations. Reducing attack surface means removing unnecessary exposure and hardening what remains.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is attack surface?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 9

Interviewer:
What is shift-left security?

Pause the video and answer this question aloud.

Senior Associate answer:
Shift-left security means finding and fixing security issues earlier in the development lifecycle. Examples include secure design reviews, SAST, dependency scanning, IaC scanning, secrets scanning, and policy checks in CI. It reduces late-stage surprises and makes secure delivery faster.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is shift-left security?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 10

Interviewer:
How do DevSecOps practices reduce risk?

Pause the video and answer this question aloud.

Senior Associate answer:
DevSecOps reduces risk by automating security checks, making controls repeatable, and giving developers fast feedback. Examples include pipeline scanning, signed images, SBOMs, policy-as-code, automated tests, secure templates, and continuous monitoring. It turns security from a manual gate into an integrated engineering practice.


-------------------------

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How do DevSecOps practices reduce risk?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 29: SDLC and Secure Development Risk.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
