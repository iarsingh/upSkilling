---
date: 2026-12-28
slot: 08:00
series: FDE Interview Series
topic: Posting the match ends the pilot's undo
status: scheduled
publish: true
image: ../../assets/2026-11-20-fde-ledger-writeback-doodle.png
---

![Posting the match ends the pilot's undo](../../assets/2026-11-20-fde-ledger-writeback-doodle.png)

Brightpath asked the matcher to mark settlements as reconciled so the close would be faster. That request moves the tool from a list into the ledger.

Today, deleting the output file undoes the run. evt-1 matched, pay-4 did not, and the ledger does not know. After a post, a wrong match is an entry someone has to reverse, and a replay is no longer harmless.

I will post only after a week of identical totals on replay, an empty set of disputed exceptions, and a named poster who is not the tool. Speed of close is not worth a silent journal entry.

What "save a step" request turns your output into their books?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep
