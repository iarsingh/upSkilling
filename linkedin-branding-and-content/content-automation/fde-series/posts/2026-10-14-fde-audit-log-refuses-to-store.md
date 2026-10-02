---
date: 2026-10-14
slot: 08:00
series: FDE Interview Series
topic: What the audit log refuses to store
drill: Q8
image: ../../assets/2026-10-14-fde-audit-log-refuses-to-store-doodle.png
status: scheduled
publish: true
---

A dispatcher pastes a customer name and a medical detail into the question. The answer can still be useful. The log should not become a second copy of that sentence.

The event I would keep is small: time, shipment id, band, score, citation count. The shipment id already joins to their system of record. The question text does not need to.

A security reviewer who wants the full prompt for debugging gets a replay of that shipment id against the current policy, inside their environment. They do not get a new column called raw_question "just for this week."

What field have you removed from a log because it was convenient and dangerous?

#ForwardDeployedEngineer #Security #Privacy #SRE #InterviewPrep
