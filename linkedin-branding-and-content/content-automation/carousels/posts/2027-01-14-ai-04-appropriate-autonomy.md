---
date: 2027-01-14
slot: 08:00
series: Platform AI Transformation Playbook
issue: 04
topic: "Appropriate autonomy."
format: carousel
document: ../output/2027-01-14-ai-04-appropriate-autonomy.pdf
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
status: scheduled
---

Appropriate autonomy.

I bucket agent actions the same way I bucket production changes:

Read — search, summarize, explain a log. Default allow with tracing.

Propose — open a PR, draft a ticket, suggest a helm values change. Default allow, human merge.

Act in a sandbox — restart a lab pod, post to a staging webhook. Allow with evals and a kill switch.

Act in production — page, scale, spend, change IAM, touch customer data. Default deny until the blast radius is written down.

Autonomy is a privilege you grant per action class, not a personality trait of the model.

The failure mode I care about is a confidently wrong write that other systems treat as fact.

If you cannot name the rollback, the agent stays in Propose.

Where is the line in your shop between Propose and Act?

Or just reply 1, 2 or 3: which is hardest to get your team to do?
1️⃣ Classes: Read, Propose, Sandbox, Production
2️⃣ Promote on evidence, demote automatically
3️⃣ Every version change resets trust

🔖 Save this for your next AI architecture review. ♻️ Repost if it would help someone on your team.

Next in Platform AI Transformation Playbook, Tue 9 Feb: GitOps, evals and human gates. Follow so it lands in your feed.

Platform AI Transformation Playbook · #04 of 6

#AgenticAI #PlatformEngineering #DevSecOps #AIArchitecture #MLOps
