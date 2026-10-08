---
date: 2026-10-13
slot: 08:00
series: Kubernetes in Production
issue: 01
topic: "Requests, limits and QoS."
format: carousel
document: ../output/2026-10-13-k8s-01-requests-limits-and-qos.pdf
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
status: scheduled
---

Requests, limits and QoS.
Requests are for the scheduler. Limits are for protection.

Most Kubernetes cost and stability problems I see start with copy-pasted resource values. Here is what requests and limits actually do, and how I size a new service.

Swipe the carousel 👉
1. What each setting does
2. QoS classes
3. Sizing habits
4. Check before you guess
5. How I size a new service

The takeaway: Size from data, then keep watching.

Do you set CPU limits on latency-sensitive services, or only requests?

Or just reply 1, 2 or 3: which is hardest to get your team to do?
1️⃣ Requests drive scheduling and HPA math
2️⃣ Memory limits kill, CPU limits throttle
3️⃣ Know your QoS class

🔖 Save this for your next cluster review. ♻️ Repost if it would help someone on your team.

Next in Kubernetes in Production, Thu 5 Nov: HPA, VPA and Cluster Autoscaler. Follow so it lands in your feed.

Kubernetes in Production · #01 of 8

#Kubernetes #PlatformEngineering #DevOps #CloudNative #SRE
