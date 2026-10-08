---
date: 2027-02-16
slot: 08:00
series: Kubernetes in Production
issue: 07
topic: "Secrets management patterns."
format: carousel
document: ../output/2027-02-16-k8s-07-secrets-management-patterns.pdf
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
status: scheduled
---

Secrets management patterns.
The vault is the source of truth. The cluster only borrows.

A Kubernetes Secret is base64, not encryption. Here are the patterns I compare when a platform needs real secret management — and the mistakes that leak credentials anyway.

Swipe the carousel 👉
1. Start here
2. Options compared
3. A pattern I like
4. Leaks that still happen
5. Rotation readiness

The takeaway: Keep secrets in the vault, identities in the cluster.

How long would it take you to rotate every production secret today?

Or just reply 1, 2 or 3: which is hardest to get your team to do?
1️⃣ Base64 is not protection
2️⃣ Workload identity over static keys
3️⃣ Plan rotation before you need it

🔖 Save this for your next cluster review. ♻️ Repost if it would help someone on your team.

Next in Kubernetes in Production, Thu 11 Mar: Helm, cluster upgrades and the production checklist. Follow so it lands in your feed.

Kubernetes in Production · #07 of 8

#Kubernetes #PlatformEngineering #DevOps #CloudNative #SRE
