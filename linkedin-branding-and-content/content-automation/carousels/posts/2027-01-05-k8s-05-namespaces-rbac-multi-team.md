---
date: 2027-01-05
slot: 08:00
series: Kubernetes in Production
issue: 05
topic: "Namespaces and RBAC for multi-team clusters."
format: carousel
document: ../output/2027-01-05-k8s-05-namespaces-rbac-multi-team.pdf
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
status: scheduled
---

Namespaces and RBAC for multi-team clusters.
A namespace is a boundary only if RBAC, quotas and policy agree.

Giving every team a namespace feels like tenancy. Without RBAC, quotas and network policy it is just a label. These are the controls I check first on a shared cluster.

Swipe the carousel 👉
1. Namespace design
2. RBAC mistakes
3. Who gets what
4. Audit in two commands
5. Shared cluster baseline

The takeaway: Tenancy is quotas, RBAC and network policy together.

Who has cluster-admin in your cluster right now — and do you know why?

Or just reply 1, 2 or 3: which is hardest to get your team to do?
1️⃣ Namespace per team and env
2️⃣ Least-privilege, group-based RBAC
3️⃣ Audit bindings regularly

🔖 Save this for your next cluster review. ♻️ Repost if it would help someone on your team.

Next in Kubernetes in Production, Thu 28 Jan: Services, Ingress and NetworkPolicy. Follow so it lands in your feed.

Kubernetes in Production · #05 of 8

#Kubernetes #PlatformEngineering #DevOps #CloudNative #SRE
