---
date: 2026-12-16
slot: 08:00
series: FDE Interview Series
topic: They had already been burned by a helpful script
status: scheduled
publish: true
image: ../../assets/2026-10-21-fde-ledger-constraint-doodle.png
---

Brightpath had a script that wrote the webhook amount over the settlement when the cents disagreed. It was helpful once and wrong the next week.

The controller's rule is now the design: this tool does not post to the ledger. pay-4 stays an amount exception at 8000 versus 7900. Nobody in the code path picks a winner.

I had wanted the overwrite because it made the morning file look clean. Clean was the bug.

What helpful automation have you refused because the customer had already paid for it once?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep
