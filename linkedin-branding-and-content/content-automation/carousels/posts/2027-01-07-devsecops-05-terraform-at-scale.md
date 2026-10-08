---
date: 2027-01-07
slot: 08:00
series: DevSecOps & Platform
issue: 05
topic: "Terraform at scale."
format: carousel
document: ../output/2027-01-07-devsecops-05-terraform-at-scale.pdf
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
status: scheduled
---

Terraform at scale.
Terraform is safe when apply is boring and only the pipeline does it.

Terraform rarely fails because of HCL. It fails because of shared state, laptop applies and plans nobody read. These are the guardrails I put in first.

Swipe the carousel 👉
1. State
2. PR pipeline
3. Policy on the plan
4. Habits
5. Landing zone basics

The takeaway: Remote state, plan in the PR, apply only from the pipeline.

Does anyone still run terraform apply from a laptop in your team?

Or just reply 1, 2 or 3: which is hardest to get your team to do?
1️⃣ Split state by blast radius
2️⃣ Policy-check the plan JSON
3️⃣ Detect drift nightly

🔖 Save this for your next pipeline review. ♻️ Repost if it would help someone on your team.

Next in DevSecOps & Platform, Tue 2 Feb: SLIs, SLOs and error budgets. Follow so it lands in your feed.

DevSecOps & Platform · #05 of 8

#DevSecOps #PlatformEngineering #GitOps #Terraform #SRE
