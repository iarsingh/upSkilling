---
date: 2027-03-09
slot: 08:00
series: Platform AI Transformation Playbook
issue: 06
topic: "What I would not put in production."
format: carousel
document: ../output/2027-03-09-ai-06-what-i-would-not-put-in-production.pdf
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
status: scheduled
---

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

Or just reply 1, 2 or 3: which is hardest to get your team to do?
1️⃣ Grant only the autonomy you could defend on a bridge call
2️⃣ Start read-only, earn Propose, rarely Act
3️⃣ Label labs as labs

🔖 Save this for your next AI architecture review. ♻️ Repost if it would help someone on your team.

That closes Platform AI Transformation Playbook. Follow for the next series.

Platform AI Transformation Playbook · #06 of 6

#AgenticAI #PlatformEngineering #DevSecOps #AIArchitecture #MLOps
