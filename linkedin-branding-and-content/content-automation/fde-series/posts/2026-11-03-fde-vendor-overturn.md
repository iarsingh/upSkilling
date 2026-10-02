---
date: 2027-05-19
slot: 08:00
series: FDE Interview Series
topic: Ready for a human was read as approved
status: scheduled
publish: true
image: ../../assets/2026-11-03-fde-vendor-overturn-doodle.png
---

Northline's analyst treated ready_for_human as approval and started the ERP setup. The eval file still passed, because the decision string was correct.

The failure was the word, not the rule. I changed the label to "packet complete, not accepted" and added V-1 as an eval case that must not contain an acceptance verb. The bank-change path for V-2 was already manual review. This bug was the clean packet.

A correct status that a person will misread is the wrong status.

What label in your UI is technically accurate and operationally dangerous?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep
