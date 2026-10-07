---
date: 2027-01-17
slot: 08:00
series: FDE Interview Series
topic: The matcher does not call the processor
status: scheduled
publish: true
image: ../../assets/2027-01-17-fde-ledger-egress-doodle.png
---

![The matcher does not call the processor](../../assets/2027-01-17-fde-ledger-egress-doodle.png)

Brightpath's webhook file is already an export. I do not need to call the processor to "enrich" a payment, and the enrichment was going to include a customer name we had agreed not to copy.

evt-1 matches from the two files on disk. pay-4's exception is computed from those cents. The process has no HTTP client. Their security owner can see that in the image and on one run with the egress log open.

Enrichment is how a local tool becomes a third copy of the processor's data.

What outbound call is only there to make the record feel complete?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep
