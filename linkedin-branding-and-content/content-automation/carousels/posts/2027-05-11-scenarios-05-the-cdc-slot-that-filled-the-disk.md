---
date: 2027-05-11
slot: 08:00
series: FDE Scenario Drills
issue: 05
topic: "The CDC slot that filled the disk."
format: carousel
document: ../output/2027-05-11-scenarios-05-the-cdc-slot-that-filled-the-disk.pdf
linkedinProfile: https://www.linkedin.com/in/iamarsingh/
status: scheduled
---

The CDC slot that filled the disk.
Scenario: the source database ran out of storage on a Sunday.

You set up change data capture from the customer's PostgreSQL into the analytics pipeline. Two weeks later their production database runs out of disk. The cause is your replication slot. What happened, and how do you make CDC safe?

Swipe the carousel 👉
1. How it happened
2. Recover
3. Make CDC safe
4. The lesson
5. What interviewers listen for

The takeaway: Monitor the source database, not just your pipeline.

Have you ever had a pipeline harm the system it reads from?

Or just reply 1, 2 or 3: which is hardest to get your team to do?
1️⃣ Alert on replication slot lag
2️⃣ Make the apply step idempotent
3️⃣ Agree the recovery runbook upfront

🔖 Save this for your next incident review. ♻️ Repost if it would help someone on your team.

Next in FDE Scenario Drills, Thu 20 May: Built on GKE. Customer runs EKS. Follow so it lands in your feed.

FDE Scenario Drills · #05 of 8

#ForwardDeployedEngineer #SRE #IncidentResponse #AIEngineering #InterviewPrep
