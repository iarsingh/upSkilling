---
date: 2026-12-22
slot: 08:00
series: DevSecOps & Platform
issue: 04
topic: "Helm vs Kustomize."
format: carousel
document: ../output/2026-12-22-devsecops-04-helm-vs-kustomize.pdf
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
status: scheduled
---

Helm vs Kustomize.
Pick by who owns the YAML, not by which tool is trendier.

Helm and Kustomize solve different problems. Most platforms end up using both. Here is how I decide which one owns a given set of manifests.

Swipe the carousel 👉
1. Different jobs
2. Which one when
3. A small overlay
4. Keep it reviewable
5. Render before you merge

The takeaway: Helm for packages, Kustomize for overlays, CI renders both.

Which do you use for your own services?

Or just reply 1, 2 or 3: which is hardest to get your team to do?
1️⃣ Third-party: Helm
2️⃣ Own services: Kustomize
3️⃣ Always review rendered output

🔖 Save this for your next pipeline review. ♻️ Repost if it would help someone on your team.

Next in DevSecOps & Platform, Thu 7 Jan: Terraform at scale. Follow so it lands in your feed.

DevSecOps & Platform · #04 of 8

#DevSecOps #PlatformEngineering #GitOps #Terraform #SRE
