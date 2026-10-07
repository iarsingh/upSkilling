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

PLATFORM AI TRANSFORMATION PLAYBOOK | #04

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

#SRE #AgenticAI #GitOps #PlatformEngineering #MLOps
