---
date: 2026-10-15
series: Platform AI Transformation Playbook
issue: 06
status: draft
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
---

PLATFORM AI TRANSFORMATION PLAYBOOK | #06

What I would not put in production.

I would not ship an agent that:

- Uses my personal cloud credentials
- Can apply Terraform or kubectl without GitOps
- Has no trace of which tool it called
- Has no written blast radius
- Treats RAG snippets as facts without citations
- Pages on-call without a human confirm on first incidents
- Is trained or fine-tuned on data we cannot keep in-region

I would ship, as a lab then a carefully owned service:

- Read-only assistants on docs we already publish
- PR drafters on repos with required reviews
- Runbook copilots that never execute the runbook themselves

Public evidence stays on github.com/iarsingh and iarsingh.github.io. Those are labs and case studies, not live customer agents.

The playbook is one sentence: treat agents like production software, then give them only the autonomy you could defend on a bridge call.

If you are building this, what is the first production action you would still refuse?

#PlatformEngineering #ResponsibleAI #DevSecOps #ForwardDeployedEngineer #AgenticAI
