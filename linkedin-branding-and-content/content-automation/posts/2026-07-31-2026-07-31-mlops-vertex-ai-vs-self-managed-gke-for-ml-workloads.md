---
date: 2026-07-31
slot: 09:30
day: 42
series: MLOps Series
topic: Vertex AI vs self-managed GKE for ML workloads
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
image: ../assets/2026-07-31-2026-07-31-mlops-vertex-ai-vs-self-managed-gke-for-ml-workloads.png
status: scheduled
---

🧠 GKE node pool upgrades should be boring by design.

Day 42/60 of my MLOps Series.

Writing this from the lens of a 7-year DevOps / Platform / MLOps engineer:
the tool is rarely the hard part. The hard part is designing the system so teams can operate it safely after the first release.

Architect view:
A safe upgrade strategy combines surge capacity, PDBs, workload spread, observability, and rollback thinking.

My production checklist:
1. Upgrade non-critical pools first.
2. Check PDBs, replicas, and topology spread before draining nodes.
3. Use surge upgrades where capacity allows.
4. Watch workload errors, restarts, scheduling, and latency.
5. Document the rollback path and maintenance window.

Tradeoff I would call out:
The upgrade is not the hard part. Keeping workloads available during it is.

Principle I keep coming back to:
Treat every model release as a software release plus a data contract.

This is the difference between "it works" and "it is ready for production ownership."

What would you add to make this safer in a real ML platform?

#MLOps #MachineLearning #MLPlatform #DevOps #AIInfrastructure