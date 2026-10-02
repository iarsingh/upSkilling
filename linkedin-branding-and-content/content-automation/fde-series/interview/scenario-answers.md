# Scenario answers

Spoken answers for the Harborline story. Say them in your own words after you can hit the same beats. Harborline is a simulated engagement on sample data. Say that if they ask, then talk about the decision.

Numbers you should be able to recompute:

| Shipment | Score | Why |
| --- | --- | --- |
| SHP-1042 Northwind reefer | 76 high | 8h past a 6h SLA (+26), open P1 (+30), temp event (+20) |
| SHP-0988 Harbor Medical | 74 high | 12h past SLA (+34), exception (+25), open P2 (+15). Medical SOP wins over reefer |
| SHP-1201 weather hold | 41 medium | lateness (+26) and open P2 (+15) |
| SHP-0770 delivered | 0 low | delivered status and a closed ticket add nothing |

Customer-reported baseline: 25 to 40 minutes. Shadow-week target: under 2 minutes to a cited answer, and the night lead agrees on at least 9 of 10 bands. You do not claim fewer missed deliveries.

## Q1. The workflow

I would leave with the job, the constraint, and a metric.

The person in pain is the night dispatcher, not the VP. I would ask them to walk one late reefer from the moment the checkpoint goes quiet. On Harborline that walk was the TMS export, then the ticket queue, then a printed SOP, and the lead timed it at 25 to 40 minutes. The decision at the end was short. The searching was the work.

I would ask IT, in the same hour, what data is allowed to leave the building. If they cannot answer, that is the open question, and I would not pick an architecture in the room.

I would not leave with a model choice. "ChatGPT for the TMS" is a request for a familiar interface. I redirect by asking which question the night desk asks most often. For Harborline it was one question: why is this shipment late, and what do we do next?

I am still unclear if I cannot name the user, the file they actually have, or the sentence security will enforce.

## Q2. The deleted design

I wanted a ranked search over the SOP binder, and then a hosted model once the retrieval looked good.

The night lead killed the ranker. He said he could not explain at 2am why one playbook won. IT killed the hosted model: shipment data stays in their environment. The dispatch lead had the authority on the workflow. IT had the authority on egress. Either one was enough to drop the design.

What I wrote down is the policy order in the solution doc. Medical in the customer name or the question selects the medical SOP. A reefer whose last event mentions temperature selects the cold-chain SOP. Everything else is the checkpoint SOP. The eval file locks those choices. A later engineer who wants a ranker has to beat that file, not delete it.

## Q3. No external model

I build a service that reads their files from disk and applies a written policy. It returns the score, the reason for every point, the SOP they already use, and the first three steps, with citations.

I do not build a local model in week one. A local model is still a system the night lead cannot recompute, and it spends the two weeks on serving instead of on the workflow. I would consider it only after the policy agrees with the lead.

I prove egress with the design first: no model client in the process. Then I ask their IT owner to confirm, in their VPC, that the container makes no outbound call during a lookup. The audit log is not that proof. A quiet log can still hide a request.

## Q4. The ROI question

I say I cannot honestly give a missed-delivery number from a timing observation.

What I can say is the night lead's own baseline, 25 to 40 minutes, and the pilot test: 20 real lookups, under 2 minutes to a cited answer, and the lead agrees with the band on at least 9 of 10. If that holds, week two is the night desk only, reefer and medical loads. Missed deliveries are the reason the VP cares. They are not the number this shadow week can prove.

If they call that evasive, I add the decision the pilot protects: the desk stops guessing which SOP to open. I still do not invent a percentage.

After the shadow week I will own time-to-cited-answer and agreement with the lead. I will not own missed deliveries until they give me a before-and-after window that is long enough to mean something.

## Q5. The operator disagrees

Four overturns out of ten means I stop expanding. The stop condition I already wrote is more than one overturn in ten.

I change the policy, not the prose around it. I sit with the lead on those four shipments, change a point value only when he can say why, and add each shipment to the eval file. I do not lower the threshold until the dashboard looks green. A lower threshold hides the disagreement.

I refuse to change the product into a free-text chatbot so the lead can "correct" it in prose. The correction has to become a rule the next shift can recompute.

The rollout stays in shadow until a fresh set of ten is at least 9 for 9. Eval green is necessary and not sufficient. The lead is the second gate.

## Q6. Two stakeholders

Tonight the night lead can have the scorer as a read-only lookup on the sample of loads he is already allowed to see, run by me beside him, not as a shared login. That does not put medical shipments on the grocery desk, and it does not create an account IT has not approved.

SSO and the medical-desk rule land before a second person has credentials. The sponsor who breaks the tie is the VP of operations, because both constraints are real and the VP owns the outcome. I would say that in writing the same day, not negotiate it on the floor at midnight.

I would not give the whole desk access tonight to be helpful. One medical shipment on the wrong screen is the incident that ends the pilot.

## Q7. The export is wrong

Before the meeting I stop treating the demo file as their file. I map their columns onto the ones the scorer needs, and I mark `hours_since_checkpoint` as derived, not source. If the event timestamp is there, I can compute the hours and show the formula. I do not hide that the sample column was a convenience.

`held` is not low risk. I have not agreed what it means. In the meeting I show one row, say the status is unknown, and ask the lead whether `held` behaves like `exception` or like a normal dwell. Until he answers, those rows are excluded from the score and listed as unscored. Guessing a band for a new status is worse than showing a gap.

## Q8. The audit log

The answer can still be useful. The log does not become a second copy of the question.

Harborline's audit event stores time, shipment id, band, score, and citation count. It does not store the question text or the ticket summary. A question can carry a patient detail that the shipment id does not. The ticket summary can describe a medical load. The shipment id joins back to the TMS, which is already their system of record.

The log is readable by the IT owner and the dispatch lead, not by every dispatcher. If security wants the full prompt for debugging, I offer a replay of the shipment id against the current policy in their environment, plus the citations. I do not start storing raw questions "just for a week."

## Q9. Writeback

The moment the score lands in the TMS, rollback is no longer "stop the container." A wrong band is now a field the next shift will act on, and I would need a migration to undo it.

Week one is shadow. The binder is still the path. Writeback is reasonable after the lead agrees on at least 9 of 10, the eval file contains the rows that used to be wrong, and IT has named who is allowed to overwrite a TMS field. Even then I would write a recommendation the human accepts, not a silent update.

What I need to see first is a week of lookups where the disagreements became rules, not a request to save clicks.

## Q10. Scope cut

I ship the cited answer for one question on the night desk. I postpone the driver app and the ticket rewrite.

I say it as a sequence, not a no. The board demo can show the night-desk answer on a real late load, which is the pain the lead timed. A driver app in ten days would be a second product with a second user, and it would not make the 2am lookup faster. The ticket rewrite writes into a system of record before we trust the score.

Postponed work goes into the readout as out of scope for this engagement, with the condition that would reopen it. "Later" with no condition is how the promise rots.

If the VP says the board expects the mobile app, I ask which user story the board actually saw. If it was "the desk knows what to do," the copilot covers it. If it was a driver tapping a phone, I tell them that story does not fit two weeks and ask which date they want to move.

## Q11. They still use the binder

The pilot is not a success yet. Speed without a change in behavior means they do not trust the steps, or the steps are not the ones on the paper they are graded against.

I would watch one lookup. If they open the binder to check the same three steps, the product is a second copy and I need the lead to mark the on-screen steps as the source. If they open it because a step is missing, I add that step and extend the eval so the answer has to contain it.

Week two I would measure how often the binder stays closed, and how often the lead still overturns the band. Time-to-answer can stay as a guardrail. It is no longer the goal.

## Q12. Rollout and rollback

Week zero is five historical shipments with the lead. A disagreement changes a point value and adds a row to the eval file.

Week one is shadow. Dispatchers still use the binder. We time 20 lookups. Target is under 2 minutes, and the lead agrees on at least 9 of 10.

Week two is one desk, reefer and medical only. Dry vans stay on the old path.

I stop expanding if an answer has no SOP citation, the eval file fails, the lead overturns more than 1 in 10, or the service calls out of the VPC.

Rollback is stopping the container. That is only true because the service has not written to the TMS. A healthy container with wrong bands is still a rollback of the desk rollout. Health is not agreement.

I can leave when their IT owner can add a shipment to the eval file and run it without me, and a named person owns the nightly file drop.
