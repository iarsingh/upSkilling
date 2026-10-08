---
date: 2027-01-28
slot: 08:00
series: Kubernetes in Production
issue: 06
topic: "Services, Ingress and NetworkPolicy."
format: carousel
document: ../output/2027-01-28-k8s-06-services-ingress-networkpolicy.pdf
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
status: scheduled
---

Services, Ingress and NetworkPolicy.
Most ingress bugs are a label or a port mismatch.

When a request does not reach a pod, it has failed at one of six hops. Walking them in order is faster than guessing — and usually ends at a selector or targetPort typo.

Swipe the carousel 👉
1. Service discovery basics
2. The request path
3. Ingress troubleshooting
4. Default deny, then allow
5. NetworkPolicy gotchas

The takeaway: Walk the hops in order. Check labels and ports first.

Which hop has cost you the most debugging time?

Or just reply 1, 2 or 3: which is hardest to get your team to do?
1️⃣ Six hops from DNS to pod
2️⃣ Selectors and targetPorts break most often
3️⃣ Default-deny, then allow

🔖 Save this for your next cluster review. ♻️ Repost if it would help someone on your team.

Next in Kubernetes in Production, Tue 16 Feb: Secrets management patterns. Follow so it lands in your feed.

Kubernetes in Production · #06 of 8

#Kubernetes #PlatformEngineering #DevOps #CloudNative #SRE
