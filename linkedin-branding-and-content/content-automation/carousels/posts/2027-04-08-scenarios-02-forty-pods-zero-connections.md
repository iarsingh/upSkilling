---
date: 2027-04-08
slot: 08:00
series: FDE Scenario Drills
issue: 02
topic: "Forty pods, zero database connections."
format: carousel
document: ../output/2027-04-08-scenarios-02-forty-pods-zero-connections.pdf
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
status: scheduled
---

Forty pods, zero database connections.
Scenario: autoscaling turned a traffic spike into an outage.

Month-end traffic arrives, the HPA scales the API from 4 to 40 pods, and every request starts failing with connection errors from managed PostgreSQL. The database is healthy. What happened, and how do you stop it happening again?

Swipe the carousel 👉
1. How it unfolded
2. Stabilise
3. Add a pooler
4. The lesson
5. Prevent it

The takeaway: Every pod you add is also a set of database connections.

What is the dependency your autoscaler forgets about?

Or just reply 1, 2 or 3: which is hardest to get your team to do?
1️⃣ Cap autoscaling to what dependencies can take
2️⃣ Put a pooler in front of Postgres
3️⃣ Load test the real peak

🔖 Save this for your next incident review. ♻️ Repost if it would help someone on your team.

Next in FDE Scenario Drills, Tue 20 Apr: The pod that could not reach the LLM. Follow so it lands in your feed.

FDE Scenario Drills · #02 of 8

#ForwardDeployedEngineer #SRE #IncidentResponse #AIEngineering #InterviewPrep
