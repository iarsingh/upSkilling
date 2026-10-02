module.exports = {
  "harborline-shadow": {
    topic: "The binder stays open during shadow week",
    text: `Harborline's night desk does not switch to the scorer because a demo was fast. For the first week the printed SOP stays the path.

We time real lookups against the lead's own baseline, 25 to 40 minutes. The target is under 2 minutes to a cited answer, and he agrees on at least 9 of 10 bands. SHP-1042 is one of the rows, score 76, and he still has to say whether he would have opened the cold-chain SOP.

The floor does not change shifts because I am standing there at 2am.

What old path do you leave in place so a bad answer cannot become the only answer?

#ForwardDeployedEngineer #Logistics #SRE #MLOps #InterviewPrep`
  },
  "clinic-shadow": {
    topic: "She still reads every note in week one",
    text: `Northshore's shadow week is not "the tool routes, the nurse trusts." She still reads every overnight note. The tool sits beside the file.

We count two things. Blocked notes, including NT-12, never show a body. Her route agrees with the tool on at least 9 of 10 consented notes. A disagreement becomes a rule change the next morning, not a silent miss.

The 7am queue is still hers. The tool has not earned the right to be first.

What will you force the operator to keep doing until you have a week of agreement?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-shadow": {
    topic: "The close still happens without the matcher",
    text: `Brightpath's morning close does not depend on the matcher in week one. The analyst still builds her list. The tool's list is a second copy she compares.

Success is boring. Replay evt-1 and the matched total stays 1500 cents. pay-4 is on her exception list and on ours. If our list is missing a row she flagged, the tool does not get to post, and it does not get to replace her sheet.

A parallel run that can be ignored is how you find the rows your sample never had.

What would you run beside the old close before you let it become the close?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-shadow": {
    topic: "The tech still calls before pulling a part",
    text: `Helios does not send techs to a bin on the tool's word during the first week. The tech still calls the depot lead. The screen is on the lead's desk, and he says the bin out loud.

We score whether he would have said B-14 for AST-7 / E42, and whether any call ended with a purchase order the tool created. The second one has to stay zero. E99 has to stay "I don't have a part for that."

When the lead stops repeating the screen and starts correcting it, the shadow is doing its job.

Who still has to say the answer out loud before you let the screen say it alone?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-shadow": {
    topic: "The radio stays the system of action",
    text: `Cedar Grid's shadow week runs during an ordinary night, not the first storm. The ranker is on a side monitor. Crews still move because someone speaks on the radio.

We compare the tool's order to the order the storm lead would have called. OUT-1 before OUT-2 is the case we already believe. The interesting rows are the ones he swaps. Those swaps become eval cases before a storm depends on the screen.

A calm night is when you can afford to be wrong. A storm is not.

When would you refuse to turn a new ranking on, even if the weather is the reason they bought it?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-shadow": {
    topic: "The inbox stays the queue for a week",
    text: `Northline does not close the shared inbox on day one. Packets still arrive there. The tool's decision is stapled beside the analyst's own note.

For a week I want every V-2 style bank change to show up as manual review in both places, and every sanctions row to show up blocked with no override. If she accepts one that the tool blocked, we stop and read the packet before anyone talks about automation.

The inbox is ugly. It is also the path that already has a person on it.

What existing queue will you refuse to turn off until the new decision matches it?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "ledger-stop": {
    topic: "Stop if the second run changes the total",
    text: `Brightpath's stop condition was written before the demo. If the matched total changes when the same file runs twice, the desk does not get the tool.

evt-1 replayed is the test. 1500 cents, then 1500 cents again. A new event id for the same payment must not add another 1500. pay-4 must still be an amount exception, not a match that appeared because we retried.

I would rather cancel a demo than explain a total that moved while nobody posted a new payment.

What number, if it changes on a retry, means you turn the tool off?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-stop": {
    topic: "Stop if an unknown fault grows a part number",
    text: `Helios's stop condition fits on a card. If any SKU appears for a fault that is not on the signed list, the lookup comes off the night desk.

E99 is the canary. The answer is escalate, and the part field is empty. E42 may name BRG-19 and bin B-14. The moment a "helpful" fallback fills E99 with a popular part, the stop fires. I do not wait to see if the part happens to be right.

A wrong part on a truck is worse than a tech who has to call.

What output, if it appears even once, should kill the rollout?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-stop": {
    topic: "Stop if the tool can reach a customer",
    text: `Cedar Grid's stop condition is not about rank quality. It is about a path that should not exist.

If the process can message a customer, or write a crew assignment, the screen comes down. OUT-1 can rank first. The host should show no outbound message during that lookup. I want their network owner to watch one request before a storm, not after.

A bad rank is a rollback of the desk. A text is a different incident, and it does not get a retry.

What capability would you treat as fatal even when the feature is working as designed?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-stop": {
    topic: "Stop if anyone can wave a sanctions flag through",
    text: `Northline's stop condition is an override button I was asked for twice.

V-5 is sanctions yes. The decision is blocked, and there is no comment field that turns it into manual review. If a build adds that comment field, the pilot stops. The same stop fires if the word approved shows up on V-1.

I wrote this down before the demo so "just this once" has somewhere to fail.

Which override have you been asked for that should end the pilot instead of becoming a setting?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "harborline-rollback": {
    topic: "Harborline rollback is closing one container",
    text: `Harborline can undo the pilot by stopping the container. The night lead goes back to the TMS export, the ticket queue, and the printed SOP. SHP-1042's score disappears with the process. The TMS never had it.

That only works because week one does not write the band back. I say the rollback out loud in discovery, before anyone applauds the demo. If the sentence needs a migration, the scope is already too big for a shadow week.

Can the person on shift undo you without a ticket to another team?

#ForwardDeployedEngineer #Logistics #SRE #MLOps #InterviewPrep`
  },
  "clinic-rollback": {
    topic: "Stopping the router leaves the chart alone",
    text: `Northshore's rollback is stopping the process. The nurse still has the overnight file. The chart does not contain routes we have to amend, because we never wrote them.

NT-12's blocked decision dies with the process. It was never a clinical note. If I had written "urgent" onto a chart for NT-11, rollback would be a correction another nurse might miss.

I test the rollback by stopping it during shadow week, on purpose, while she is in the room.

When did you last prove the undo, instead of describing it?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-rollback": {
    topic: "Delete the output. The books do not change.",
    text: `Brightpath's undo is deleting the output file. The ledger does not change, because the matcher never posted. evt-1's match and pay-4's exception exist only in that file.

I want the analyst to delete it once during the parallel week and confirm her close still runs. A rollback you have not performed is a sentence in a doc.

The day we post into the ledger, this sentence becomes false, and the pilot needs a new one before that day.

What undo have you described and never watched someone do?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-rollback": {
    topic: "The bin count survives a wrong lookup",
    text: `Helios can turn the lookup off and lose nothing but the screen. Bin B-14 still shows quantity 2, because recommending BRG-19 did not decrement it. No purchase order exists to cancel.

The tech who already walked to the bin is the residual risk. That is why shadow week still has the lead say the bin out loud before the walk. The rollback does not call a tech back from the yard.

If your undo cannot reach a person who already moved, your rollout has to keep a human in front of the movement.

What physical action can your software no longer undo?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-rollback": {
    topic: "Close the screen. The radio is still running.",
    text: `Cedar Grid's rollback is closing the ranker. Crews are still assigned by the dispatcher. Customers are still messaged, if at all, by the communications team. OUT-1 does not have a truck I have to recall, because I never dispatched one.

I want that tested on a quiet night. Close it mid-shift and confirm the radio traffic does not change. If the room cannot work without the screen, it is no longer a shadow.

A rollback that requires the storm to pause is not a rollback.

What does your customer's old channel still do after you switch your tool off?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-rollback": {
    topic: "No vendor master row to delete",
    text: `Northline's rollback is stopping the review process. The ERP vendor master is unchanged, so there is no vendor to inactivate and no bank account to revert.

V-2 never became payable. V-1 never became a master record. The inbox is still the queue. I want the analyst to stop the tool on a Thursday and finish Friday's packets the old way without calling me.

The moment a ready packet creates a master row, rollback is an ERP change, and this engagement is over its scope.

What record, if you never create it, keeps rollback boring?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "harborline-handoff": {
    topic: "They add the next shipment without you",
    text: `Harborline is done when their IT owner can add a shipment to the eval file and run it. Not when I have explained the score for SHP-1042 one more time.

SHP-1042 stays in the file as the taught example: 76 points, cold-chain SOP, citations. The next argument with the night lead becomes a new row, owned by them. If that row requires me to edit Python, the handoff failed.

I leave the run command, the score table, and a name on the nightly file drop. I do not leave a standing meeting.

What can the customer change in your eval set without opening an IDE?

#ForwardDeployedEngineer #Logistics #SRE #MLOps #InterviewPrep`
  },
  "clinic-handoff": {
    topic: "The nurse adds the next note id herself",
    text: `Northshore's handoff is the nurse lead adding a note id to the eval file when a route was wrong. NT-12 is already there as blocked, body not shown. The next fight, a refill that got marked urgent, should be her row.

She does not need the HTTP layer. She needs the file, the command, and a place to write the expected route. I sit with her once while she adds it. The second time I am not on the call.

If the only person who can teach the tool a new note is me, I have not left.

Who on the customer side will add the next failing example?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-handoff": {
    topic: "The analyst adds the next payment id",
    text: `Brightpath is handed off when the analyst can put a payment id in the eval file and see it fail the way she expects. evt-1 is the taught match, 1500 cents, counted once. pay-4 is the taught exception.

The next close will have a new ugly row. That row is hers to add. I do not stay as the person who "just updates the rule" every morning. A rule change still needs the controller. A new example does not need me.

The output file format is the product she keeps. The repo is not.

What example will your user add the week after you are gone?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-handoff": {
    topic: "The lead adds the next fault code",
    text: `Helios is done when the depot lead can add a fault code to the signed list and to the eval file without me. E42 stays the example that resolves to bin B-14. E99 stays the example that must not grow a SKU.

A new code from a night call is his to append, with the part he is willing to sign. The tool does not learn parts from what techs pulled. That would launder an unsigned choice into the next recommendation.

I want him to add one code while I watch, and one code the next week while I do not.

What source of truth is the customer allowed to edit without your review?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-handoff": {
    topic: "The storm lead adds the next outage he reversed",
    text: `Cedar Grid's handoff artifact is the eval file of rankings the lead reversed. OUT-1 before OUT-2 is the starting case. The next reversal, a stale life-safety flag, becomes his row.

He can add an outage id and the order he believes. He should not need me to redeploy to do it. Their network owner already watched one lookup for egress. That person owns the host after I leave. I do not own the next storm.

If the eval file is only something I edit, it is my notebook, not their control.

Which reversed decision will they be able to pin without you?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-handoff": {
    topic: "The analyst adds the next vendor id",
    text: `Northline is done when the analyst can add a vendor id and the decision she expects. V-2 is the taught bank change: manual review, not acceptance. V-5 is the taught sanctions block.

A new packet shape, a missing insurance date, is hers to append. Changing the order of the rules still needs legal. Adding an example does not. I watch her add one, then I stop joining the packet review.

The inbox can stay. The eval file has to be theirs.

What decision are you still the only person who can encode?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "harborline-scope": {
    topic: "The driver app is a different engagement",
    text: `Harborline's VP had three wishes: the night-desk answer, a driver phone app, and a rewrite of the TMS. Ten days cover one of them.

The desk gets a cited score for one question, why this shipment is late and what to do next. SHP-1042 is the demo. The driver app has a second user and does not make 2am faster. The TMS rewrite writes into the system of record before we trust the band.

Postponed work goes in the readout with a condition. The driver app reopens when the night lead has agreed on 9 of 10 and asks for a second user. "Later" with no condition is how I would have lied.

What second product is hiding inside the sentence "while you're here"?

#ForwardDeployedEngineer #Logistics #SRE #MLOps #InterviewPrep`
  },
  "clinic-scope": {
    topic: "Triage is not a diagnosis product",
    text: `Northshore asked for overnight routing, a patient message, and a suggested medication note. I will do the routing.

The nurse gets blocked, urgent callback, or morning queue. NT-11 can cite a consented sentence. Nobody gets a dose, a diagnosis, or a text to the patient. Those are other clinicians' jobs and other risk reviews.

The condition to reopen a patient message is a separate privacy review and a named sender. It is not "phase two" spoken out loud in the hallway.

What request sounds like the same project and is actually a regulated one?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-scope": {
    topic: "Refunds are not part of the match",
    text: `Brightpath asked the matcher to also issue refunds when the webhook was higher than the settlement. That is a money movement. The match is a list.

I will classify. evt-1 matches once. pay-4 stays an exception at a 100-cent gap. A person decides whether anyone is owed anything. The tool does not originate a credit.

The refund work reopens only if the controller names an owner, a limit, and a ledger entry that is not this process. Until then it is out of scope in the readout, not a backlog item I nod at.

What "also" in the kickoff would move money?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-scope": {
    topic: "Warranty claims are not the bin lookup",
    text: `Helios wanted the fault lookup, a warranty claim form, and a reorder point model in the same visit. The night shift needs the bin.

AST-7 / E42 returns B-14 or it escalates. Warranty is a daytime process with photos and an OEM. Reorder points need a history this screen does not have. I wrote both down as out of scope, reopened only when the depot lead asks after the lookup has matched his pulls.

I did not leave them as "we'll get to it" on a whiteboard. That phrase is where scope goes to become a promise.

What adjacent form are you being asked to absorb because you are already in the building?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-scope": {
    topic: "Estimated restoration time is a different claim",
    text: `Cedar Grid asked for a ranker and an ETA text to every customer. The ranker is the pilot. The ETA is a promise I cannot back.

OUT-1 can be first in the list. The card does not predict when the lights return, and it does not send that prediction. An ETA needs crew locations, travel, and a communications approval this engagement does not have.

It reopens only with the communications owner in the room and a statement of what happens when the ETA is wrong. Not as a field I add because the mockup had a blank.

What customer-facing sentence are you not ready to be wrong about?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-scope": {
    topic: "Payment release is not packet review",
    text: `Northline asked the packet tool to also release the first payment once a vendor was ready. Review and payment are different authorities.

The tool can block V-5, send V-2 to manual review, and leave V-1 ready for a human. It cannot move cash. The first payment stays in the ERP, started by someone whose job is payments, after they accept the packet.

I put payment release in the readout as out of scope, reopened only under the payables owner. I did not leave it as an integration task for "later in the sprint."

Where does your project quietly pick up the authority to pay?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "harborline-oldpath": {
    topic: "They hit the timer and still opened the binder",
    text: `Harborline's shadow week beat the clock. Cited answers came back in under two minutes. The night desk still opened the printed SOP afterward.

I watched one lookup on SHP-1042. They were checking that the three cold-chain steps on the screen matched the paper they are graded against. The tool was a second copy, not a source. Speed was the wrong victory.

Week two I measure how often the binder stays closed, and how often the lead still overturns the band. The timer stays as a guardrail. It is no longer the goal.

If they still open the old document, what are they looking for that you did not give them?

#ForwardDeployedEngineer #Logistics #SRE #MLOps #InterviewPrep`
  },
  "clinic-oldpath": {
    topic: "The nurse still opened the note after the route",
    text: `Northshore's routes were fast. The nurse still opened every consented note, including the ones the tool had already cited.

On NT-11 she was checking that the chest-tightness sentence on the screen was the whole story, not a trimmed one. The citation was one sentence. Her judgment needed the paragraph. I had optimized for a card. She was still doing clinical reading, which we had said was out of scope, and the card could not replace it.

The honest metric became how often a blocked note stayed unopened. Consented notes staying open was success, not failure.

What behavior did you call resistance that was actually the job?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-oldpath": {
    topic: "She still rebuilt the spreadsheet",
    text: `Brightpath's matcher was faster than the paste. The analyst still rebuilt her spreadsheet for three mornings.

She did not distrust evt-1. She distrusted the absence of a row she always looks for, a fee line the webhook file does not carry. The tool was right and incomplete. Completeness was her spreadsheet's job, and I had called the spreadsheet waste.

I added an explicit "not in this file" section so the gap is visible. She stopped rebuilding the rows we do cover. She still builds the fee sheet. That sheet is not a failure of the pilot.

What sheet will survive because it knows something your file does not?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-oldpath": {
    topic: "The lead still walked to the bin to look",
    text: `Helios's lookup named B-14. The depot lead still walked over and looked before telling the tech to pull BRG-19.

The count on the screen was last night's file. He had issued one bearing at lunch and not booked it. The tool was not wrong about the file. The file was not the shelf. Watching him walk was the requirement I had missed: the screen has to show the file time, so he knows how stale the quantity is.

After the timestamp was on the card, he walked when the file was old and trusted it when the file was from the last hour. Both were correct.

What physical check are you calling adoption failure?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-oldpath": {
    topic: "They still built the storm list on paper",
    text: `Cedar Grid's ranker was up. The storm lead still wrote the first three feeders on a pad.

He was not ignoring OUT-1. He was translating the screen into the order he speaks on the radio, which is three items, not a sorted table of twenty. I had given him a list. His job was a sentence.

The card now has a "say this" line for the top feeder only. The pad got shorter. It did not disappear, because the radio does not accept a CSV.

What output format matches the way they speak, not the way you store?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-oldpath": {
    topic: "She still printed the packet",
    text: `Northline's decisions were on screen. The analyst still printed every packet and wrote the decision in the margin.

The print had the insurance certificate. The tool had only the expiry date. She was checking that the PDF matched the date, which the tool cannot see. V-4 being blocked on a date was not enough when the PDF might say something else.

I stopped calling the print a workaround. The decision now says "date only, certificate not reviewed." She still prints. The margin note is an honest second check, and the screen admits it is not that check.

What document are you pretending a column can replace?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  }
};
