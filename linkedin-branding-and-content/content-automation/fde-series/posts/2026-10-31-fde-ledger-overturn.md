---
date: 2026-12-20
slot: 08:00
series: FDE Interview Series
topic: The analyst rejected a match the file called clean
status: scheduled
publish: true
image: ../../assets/2026-10-31-fde-ledger-overturn-doodle.png
---

Brightpath's tests passed. The analyst still pulled two "matched" rows out of the pile because the settlement status was posted and the payment had already been reversed in a column I had not mapped.

I did not relax the matcher to agree with her. I stopped calling those rows matched, added the status she uses, and put both payment ids in the eval file. A second run has to keep them as exceptions.

Agreement with the person who signs the close is the second gate. The unit test is the first.

What column did your sample never contain that the operator uses every morning?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep
