---
date: 2027-04-27
slot: 08:00
series: Multi-Cloud FDE Stack
issue: 04
topic: "Secrets: one pattern, three vaults."
format: carousel
document: ../output/2027-04-27-cloud-04-secrets-across-clouds.pdf
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
status: scheduled
---

Secrets: one pattern, three vaults.
Secrets Manager, Secret Manager and Key Vault.

Every customer has a vault. The mistakes are the same everywhere: keys in env files, secrets read once at startup, and rotation nobody has tested. Here is the pattern I use on all three clouds.

Swipe the carousel 👉
1. The three vaults
2. Into the pod, no keys
3. Rotation without downtime
4. Secret hygiene
5. Secrets review

The takeaway: A secret you have never rotated is a secret you cannot rotate.

When did you last rotate a production database password?

Or just reply 1, 2 or 3: which is hardest to get your team to do?
1️⃣ Use workload identity to reach the vault
2️⃣ Re-read secrets, do not cache forever
3️⃣ Rehearse rotation before go-live

🔖 Save this for your next cloud architecture review. ♻️ Repost if it would help someone on your team.

Next in Multi-Cloud FDE Stack, Thu 6 May: SQS, Pub/Sub, Service Bus. Follow so it lands in your feed.

Multi-Cloud FDE Stack · #04 of 8

#AWS #GCP #Azure #ForwardDeployedEngineer #CloudArchitecture
