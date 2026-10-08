---
date: 2026-11-24
slot: 08:00
series: Kubernetes in Production
issue: 03
topic: "Probes, PDBs and safe rollouts."
format: carousel
document: ../output/2026-11-24-k8s-03-probes-pdbs-and-safe-rollouts.pdf
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
status: scheduled
---

Probes, PDBs and safe rollouts.
Readiness protects users. Liveness protects the process.

A liveness probe that checks the database can restart your whole fleet during a five-second DB blip. Probes are simple to write and easy to get dangerously wrong.

Swipe the carousel 👉
1. Three probes, three questions
2. Probe design
3. A safe default
4. Pod termination
5. Rollout settings that matter

The takeaway: Never let a dependency outage restart your fleet.

Have you ever seen a liveness probe cause the outage it was meant to prevent?

Or just reply 1, 2 or 3: which is hardest to get your team to do?
1️⃣ Readiness for traffic, liveness for deadlock
2️⃣ preStop sleep + grace period
3️⃣ PDB on every service

🔖 Save this for your next cluster review. ♻️ Repost if it would help someone on your team.

Next in Kubernetes in Production, Thu 17 Dec: Debugging CrashLoopBackOff and ImagePullBackOff. Follow so it lands in your feed.

Kubernetes in Production · #03 of 8

#Kubernetes #PlatformEngineering #DevOps #CloudNative #SRE
