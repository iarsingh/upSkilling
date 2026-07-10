---
date: 2026-07-18
slot: 14:30
day: 29
series: Kubernetes Series
topic: Kubernetes service discovery explained practically
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
image: ../assets/2026-07-18-2026-07-18-k8s-kubernetes-service-discovery-explained-practically.png
status: scheduled
---

☸️ Kubernetes service discovery is simple until labels, ports, and readiness disagree.

Day 29/60 of my Kubernetes Series.

Writing this from the lens of a 7-year DevOps / Platform / MLOps engineer:
the tool is rarely the hard part. The hard part is designing the system so teams can operate it safely after the first release.

Architect view:
I verify service routing by checking selectors, endpoints, DNS, ports, and pod readiness together.

My production checklist:
1. Confirm the Service selector matches pod labels.
2. Check EndpointSlice for ready addresses.
3. Validate service port, targetPort, and containerPort.
4. Use DNS names consistently across namespaces.
5. Debug from client pod to service to endpoint.

Tradeoff I would call out:
A Service with no endpoints is usually a label or readiness story.

Principle I keep coming back to:
Design the operating model before scaling the cluster.

This is the difference between "it works" and "it is ready for production ownership."

How would you design this in a production Kubernetes platform?

#Kubernetes #DevOps #PlatformEngineering #CloudNative #SRE