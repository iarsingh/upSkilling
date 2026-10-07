---
date: 2027-02-23
slot: 08:00
series: MLOps in Production
issue: 07
topic: "Batch vs real-time serving."
format: carousel
document: ../output/2027-02-23-mlops-07-batch-vs-realtime-serving.pdf
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
status: scheduled
---

MLOPS IN PRODUCTION | #07

Batch vs real-time serving.

Real-time serving is more expensive, harder to operate and often unnecessary. Here is how I choose, and what I check when a FastAPI model service on Kubernetes gets slow.

Inside the carousel:
→ Batch or real-time?
→ Real-time path
→ Load once, report readiness
→ When latency climbs
→ Serving baseline

Batch by default. Real-time when the request needs the answer.

Which of your real-time models could have been a batch job?

#MLOps #MachineLearning #Kubernetes #AIEngineering #DataScience
