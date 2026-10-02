# How to practice

FDE interviews are scenario rounds. The interviewer is listening for whether you shrink a messy customer problem, obey a constraint, and say what you will not claim.

## Six beats

Say them in this order. Ninety seconds is enough.

1. **Who hurts, and when.** Name the person and the hour. "Night dispatch, 2am, a late reefer."
2. **Constraint in their words.** One sentence that deletes a design. "IT will not send shipment data to an outside model."
3. **What you wanted, and why you dropped it.** Show judgment. A hosted model, a ranker, a TMS replacement.
4. **What they kept.** Policy, eval file, audit log, or exception queue. Something they can run after you leave.
5. **How they roll back without you.** If rollback needs a migration, you started too wide.
6. **The metric you agreed, and the one you refused.** Time-to-cited-answer is fair. Fewer missed deliveries in week 1 is not.

## Rules while you speak

- Use one customer story. Harborline is the story until the clinic and ledger engagements exist.
- Quote a number you can recompute. SHP-1042 is score 76: 8 hours past a 6-hour SLA (+26), open P1 (+30), temperature event (+20).
- Say "sample" and "simulated" if they ask whether Harborline is a paying customer. Then go straight back to the decision.
- When they interrupt, answer the interrupt. Do not restart the six beats from the top.

## A weak answer sounds like this

"I would build a RAG chatbot on their tickets and deploy it on Kubernetes."

That skips the user, the constraint, the metric, and the rollback. Kubernetes can be beat 4 if they ask how it lands in the VPC. It is not the opening.

## Session shape

- 25 minutes: four questions from the drill, spoken, no notes.
- 10 minutes: read only the answers you stumbled on.
- 5 minutes: write the sentence you will use next time.

Stop when you can do questions 1, 3, 4, and 12 without looking.
