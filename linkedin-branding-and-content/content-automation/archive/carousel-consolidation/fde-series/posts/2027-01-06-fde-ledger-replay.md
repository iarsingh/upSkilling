---
date: 2027-03-04
slot: 08:00
series: FDE Interview Series
topic: 1500 cents must not become 3000
status: scheduled
publish: true
image: ../../assets/2027-01-06-fde-ledger-replay-doodle.png
---

![1500 cents must not become 3000](../../assets/2027-01-06-fde-ledger-replay-doodle.png)

Brightpath replays webhooks. evt-1 arrived twice with the same event id, and evt-2 arrived later with a new id for the same payment. The matched total is 1500 cents, not 3000 and not 4500.

pay-4 is still an amount exception after the replay. Nothing new matched because we tried again. I run the file twice in front of the analyst and point at the total. If it moves, we do not talk about features.

The interesting test is the new event id, not the duplicate one. Duplicate ids are the easy case. Same payment, new id, is how you double-count.

Which retry in your system creates a second business event?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep
