---
date: 2027-03-18
slot: 08:00
series: FDE Interview Series
topic: The analyst can recompute 1500 on a calculator
status: scheduled
publish: true
image: ../../assets/2027-02-16-fde-ledger-recompute-doodle.png
---

Brightpath's analyst should not need the repo to explain the total.

evt-1 matches 1500 cents and is counted. The same event id again is ignored. A later event id for the same payment is ignored. pay-4 is 8000 versus 7900, so it is not in the total. pay-7 has no settlement, so it is not in the total. The total is 1500.

She can do that with the two files and a calculator. If the tool's total needs a hidden state to make sense, I have not finished the rule.

What total should your user be able to reach without opening the code?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep
