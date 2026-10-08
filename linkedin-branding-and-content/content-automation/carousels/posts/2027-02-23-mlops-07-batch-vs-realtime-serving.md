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

Batch vs real-time serving.
Choose batch unless the decision happens inside the request.

Real-time serving is more expensive, harder to operate and often unnecessary. Here is how I choose, and what I check when a FastAPI model service on Kubernetes gets slow.

Swipe the carousel 👉
1. Batch or real-time?
2. Real-time path
3. Load once, report readiness
4. When latency climbs
5. Serving baseline

The takeaway: Batch by default. Real-time when the request needs the answer.

Which of your real-time models could have been a batch job?

Or just reply 1, 2 or 3: which is hardest to get your team to do?
1️⃣ Compare latency, cost and failure modes
2️⃣ Load the model once, gate readiness
3️⃣ Throttling and cold starts cause most latency

🔖 Save this for your next model launch review. ♻️ Repost if it would help someone on your team.

Next in MLOps in Production, Thu 18 Mar: Vertex AI vs self-managed GKE. Follow so it lands in your feed.

MLOps in Production · #07 of 8

#MLOps #MachineLearning #Kubernetes #AIEngineering #DataScience
