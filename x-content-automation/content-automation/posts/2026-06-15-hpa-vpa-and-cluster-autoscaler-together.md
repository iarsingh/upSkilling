---
date: 2026-06-15
series: Kubernetes
topic: HPA, VPA, and Cluster Autoscaler together
angle: governance pattern
platform: x
---

## Post 1

Thread: HPA, VPA, and Cluster Autoscaler together for platform engineers. A short production view with the answer, architecture flow, and checklist. #Kubernetes #DevOps #CloudNative

## Post 2

Answer: Start from workload behavior, set requests from steady usage, set limits from failure boundaries, and validate with latency during scale events.

## Post 3

Architecture flow: Service -> Deployment -> requests/limits -> HPA -> PDB -> alerts -> rollback runbook

## Post 4

Production checklist: Check p95 latency, restart rate, throttling, pending pods, PDB coverage, and rollback path before calling a rollout production-ready.

## Post 5

My rule: if it cannot be reviewed, monitored, and rolled back, it is not production-ready yet. What would you add? #Kubernetes #DevOps #CloudNative
