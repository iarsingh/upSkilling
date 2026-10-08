---
date: 2026-11-05
slot: 08:00
series: Kubernetes in Production
issue: 02
topic: "HPA, VPA and Cluster Autoscaler."
format: carousel
document: ../output/2026-11-05-k8s-02-autoscaling-hpa-vpa-cluster-autoscaler.pdf
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
status: scheduled
---

HPA, VPA and Cluster Autoscaler.
Autoscaling is three controllers. Tune them together.

Teams turn on HPA and assume they are autoscaled. Then a spike arrives, pods go Pending, and nobody sized the node pool. Here is how the three controllers fit together.

Swipe the carousel 👉
1. What happens in a spike
2. Who does what
3. Where they fight
4. HPA with sane behaviour
5. Before you trust autoscaling

The takeaway: Pods, requests and nodes scale as one system.

What broke the first time your cluster autoscaled under real load?

Or just reply 1, 2 or 3: which is hardest to get your team to do?
1️⃣ HPA needs requests
2️⃣ Do not let HPA and VPA fight over CPU
3️⃣ Load-test the scale-up time

🔖 Save this for your next cluster review. ♻️ Repost if it would help someone on your team.

Next in Kubernetes in Production, Tue 24 Nov: Probes, PDBs and safe rollouts. Follow so it lands in your feed.

Kubernetes in Production · #02 of 8

#Kubernetes #PlatformEngineering #DevOps #CloudNative #SRE
