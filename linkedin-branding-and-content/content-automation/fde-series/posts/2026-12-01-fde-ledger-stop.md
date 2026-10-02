---
date: 2027-01-01
slot: 08:00
series: FDE Interview Series
topic: Stop if the second run changes the total
status: scheduled
publish: true
image: ../../assets/2026-12-01-fde-ledger-stop-doodle.png
---

![Stop if the second run changes the total](../../assets/2026-12-01-fde-ledger-stop-doodle.png)

Brightpath's stop condition was written before the demo. If the matched total changes when the same file runs twice, the desk does not get the tool.

evt-1 replayed is the test. 1500 cents, then 1500 cents again. A new event id for the same payment must not add another 1500. pay-4 must still be an amount exception, not a match that appeared because we retried.

I would rather cancel a demo than explain a total that moved while nobody posted a new payment.

What number, if it changes on a retry, means you turn the tool off?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep
