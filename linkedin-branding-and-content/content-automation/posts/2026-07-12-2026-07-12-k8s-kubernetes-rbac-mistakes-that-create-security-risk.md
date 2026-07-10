---
date: 2026-07-12
slot: 14:30
day: 23
series: Kubernetes Series
topic: Kubernetes RBAC mistakes that create security risk
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
image: ../assets/2026-07-12-2026-07-12-k8s-kubernetes-rbac-mistakes-that-create-security-risk.png
status: scheduled
---

☸️ Secrets management is an operating model, not only a Kubernetes object.

Day 23/60 of my Kubernetes Series.

Writing this from the lens of a 7-year DevOps / Platform / MLOps engineer:
the tool is rarely the hard part. The hard part is designing the system so teams can operate it safely after the first release.

Architect view:
The goal is controlled access, rotation, auditability, and fewer long-lived credentials in developer workflows.

My production checklist:
1. Keep secrets out of Git and container images.
2. Use external secret managers where possible.
3. Limit access with RBAC and workload identity.
4. Rotate credentials and test rotation behavior.
5. Audit who can read, update, and mount sensitive values.

Tradeoff I would call out:
A secret that cannot be rotated safely is already a production risk.

Principle I keep coming back to:
Design the operating model before scaling the cluster.

This is the difference between "it works" and "it is ready for production ownership."

How would you design this in a production Kubernetes platform?

#Kubernetes #DevOps #PlatformEngineering #CloudNative #SRE