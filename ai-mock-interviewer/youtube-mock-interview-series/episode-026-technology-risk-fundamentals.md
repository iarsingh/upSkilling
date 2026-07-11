# Episode 26: Technology Risk Fundamentals

YouTube title: DevOps Mock Interview Practice | Episode 26: Technology Risk Fundamentals

Estimated duration: 20-25 min

Source round: Mock Interview 26 - Technology Risk Fundamentals (source set 26)

Focus: technology risk basics, risk assessment lifecycle, risk appetite, registers, heat maps, and prioritization

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Technology Risk Fundamentals.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- API: Application Programming Interface
- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- GCP: Google Cloud Platform
- IAM: Identity and Access Management
- TLS: Transport Layer Security
- WAF: Web Application Firewall

---

## Question 1

Interviewer:
What is Technology Risk?

Pause the video and answer this question aloud.

Senior Associate answer:
Technology risk is the possibility that failures, weaknesses, or misuse of technology can disrupt business operations, expose data, create compliance issues, or damage trust. It includes risks from applications, infrastructure, cloud, security, data, vendors, SDLC, and operations. In practice, I manage it by identifying risks early, assessing likelihood and impact, defining controls, tracking remediation, and reporting residual risk to leadership.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is Technology Risk?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
What are the different types of technology risks?

Pause the video and answer this question aloud.

Senior Associate answer:
Key types include cybersecurity risk, operational resilience risk, availability risk, data privacy risk, compliance risk, cloud misconfiguration risk, third-party risk, change/release risk, SDLC risk, infrastructure risk, and incident response risk. For a GCP platform, examples include overprivileged IAM, public buckets, insecure Terraform state, weak CI/CD controls, unpatched VMs, and missing monitoring.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What are the different types of technology risks?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 3

Interviewer:
How do you perform a technology risk assessment?

Pause the video and answer this question aloud.

Senior Associate answer:
I start by understanding the asset, business process, data sensitivity, architecture, dependencies, and threat landscape. Then I identify risks, score likelihood and impact, assess existing controls, calculate residual risk, agree on treatment options, assign owners and due dates, and track remediation through a risk register. I also validate evidence instead of relying only on verbal confirmation.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How do you perform a technology risk assessment?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 4

Interviewer:
What is inherent risk vs residual risk?

Pause the video and answer this question aloud.

Senior Associate answer:
Inherent risk is the level of risk before controls are applied. Residual risk is the risk that remains after controls are implemented. For example, exposing a customer API to the internet has inherent risk. After controls like WAF, IAM, TLS, rate limiting, logging, vulnerability scanning, and incident runbooks, the remaining exposure is residual risk.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is inherent risk vs residual risk?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 5

Interviewer:
What is risk appetite and risk tolerance?

Pause the video and answer this question aloud.

Senior Associate answer:
Risk appetite is the amount and type of risk an organization is willing to accept to meet business goals. Risk tolerance is the measurable threshold around that appetite. For example, a company may accept low operational risk for internal tools but have near-zero tolerance for public exposure of customer data or production systems without logging.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is risk appetite and risk tolerance?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 6

Interviewer:
How do you prioritize risks?

Pause the video and answer this question aloud.

Senior Associate answer:
I prioritize by business impact, likelihood, exploitability, regulatory impact, customer impact, control weakness, and time sensitivity. Critical risks affecting customer data, production availability, privileged access, or regulatory obligations come first. I also consider whether the issue is isolated or systemic across multiple teams or environments.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How do you prioritize risks?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 7

Interviewer:
Explain the risk management lifecycle.

Pause the video and answer this question aloud.

Senior Associate answer:
The lifecycle is identify, assess, treat, monitor, and report. First identify risks through reviews, audits, incidents, threat modeling, and monitoring. Then assess likelihood and impact, choose a treatment such as mitigate or accept, implement controls, monitor effectiveness, and report status, trends, exceptions, and residual risk to stakeholders.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Explain the risk management lifecycle.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
What is a risk register?

Pause the video and answer this question aloud.

Senior Associate answer:
A risk register is a structured record of identified risks and their lifecycle status. It helps track ownership, severity, treatment plans, due dates, evidence, residual risk, exceptions, and management decisions. It is important because it creates accountability and gives leadership visibility into the organization's risk posture.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is a risk register?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 9

Interviewer:
What information should a risk register contain?

Pause the video and answer this question aloud.

Senior Associate answer:
It should contain risk ID, title, description, asset or process, owner, business impact, likelihood, impact, inherent rating, existing controls, residual rating, treatment plan, due date, status, evidence, dependencies, risk acceptance details, and escalation notes. For cloud risks, I would also include project, environment, service, data classification, and control mapping.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What information should a risk register contain?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 10

Interviewer:
How do you create a risk heat map?

Pause the video and answer this question aloud.

Senior Associate answer:
I define likelihood and impact scales, score each risk consistently, and plot them on a matrix such as low, medium, high, and critical. The heat map should show which risks need immediate action versus monitoring. I use it for leadership communication, but I always support it with details because heat maps can oversimplify complex risk.


---------------

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: How do you create a risk heat map?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Closing

That completes Episode 26: Technology Risk Fundamentals.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
