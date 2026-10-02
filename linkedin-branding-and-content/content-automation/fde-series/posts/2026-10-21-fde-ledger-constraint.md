---
date: 2026-11-06
slot: 08:00
series: FDE Interview Series
topic: Brightpath: the sentence that kills a design
status: scheduled
publish: true
image: ../../assets/2026-10-21-fde-ledger-constraint-doodle.png
---

I wanted a script that wrote the webhook amount over the settlement. Brightpath deleted that design with one constraint: the tool must not post to the ledger, and a mismatch is never marked settled.

What shipped instead is smaller: one classification per event: matched, duplicate, pending, or amount exception.

If the architecture survived every sentence in the room, the discovery was not finished.

Which sentence from Brightpath would force you to drop a script that wrote the webhook amount over the settlement?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep
