---
date: 2026-12-26
slot: 08:00
series: FDE Interview Series
topic: Keep the exception, not the provider payload
status: scheduled
publish: true
image: ../../assets/2026-11-15-fde-ledger-audit-doodle.png
---

Brightpath's first log stored the whole webhook because debugging was easier. The payload had a customer name the settlement file did not need.

The log now stores event id, payment id, status, and the matched total. evt-1 is matched, 1500 cents. pay-4 is an amount exception. The raw body stays in the provider's system, which already has its own retention.

If an analyst needs to see why a row failed, they open that payment id in the tool and rerun the rule. They do not grep a copy of every payload.

What did you log because it made the second bug easier, and the audit harder?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep
