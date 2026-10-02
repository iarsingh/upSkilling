---
date: 2026-12-24
slot: 08:00
series: FDE Interview Series
topic: The settlement file used a different payment key
status: scheduled
publish: true
image: ../../assets/2026-11-10-fde-ledger-export-doodle.png
---

Brightpath's webhook had payment_id. The settlement file had processor_reference, which matched only after a prefix was stripped. My sample had hidden that.

I put the prefix rule on the readout and showed one row where the strip was wrong. That row stayed unmatched. evt-1 still matched 1500 cents because its key was clean. I did not "fix" the ugly key so the demo hit rate would look better.

If the join is a transformation, the transformation is part of the product.

Where does your demo file spare you from the customer's actual key?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep
