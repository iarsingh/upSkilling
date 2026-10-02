module.exports = {
  "clinic-workflow": {
    topic: "The nurse asked which notes she may open",
    text: `The morning nurse did not ask for a summary model. She asked which overnight notes she is allowed to open.

NT-12 was at the top of the file and had no consent. The old habit was to read it anyway. The first version does the opposite: consent is not yes, so the body is not copied into the decision.

No urgency guess. No chart write. A blocked row she can check before 7am.

What would you hide until someone with authority has said yes?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-workflow": {
    topic: "The analyst was hunting ghost payments",
    text: `Brightpath's analyst was not asking for AI. She was hunting payments that appeared twice, and payments that were ten dollars off.

evt-1 is 1500 cents and matches once. The same event id comes back and is ignored. pay-4 is 8000 against a 7900 settlement, so it stays an exception. The matched total does not move.

I left that meeting with a classification, not a model. Matched, duplicate, pending, or amount exception.

Which row in your customer's file is the one they would use to test you?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-workflow": {
    topic: "The depot lead still opens three sheets",
    text: `A Helios tech calls with a fault code. The depot lead opens the asset list, the signed parts sheet, and the bin count. That phone call is the product.

E42 on AST-7 is a bearing in bin B-14, because that bin has 2 and the other bin has 0. E99 is not on the signed list, so the answer has no part number.

I did not leave with a vendor catalog. I left with the question the night shift already asks: which bin, or escalate.

What is the lookup your user already does by hand that a tool should not widen?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-workflow": {
    topic: "Customer count was the wrong sort",
    text: `Cedar Grid's storm desk sorted outages by how many customers were dark. That sort buried a smaller feeder with a life-safety account.

OUT-1 affects 40 customers and scores 112. OUT-2 affects 400 and scores 43. The 100 points for life safety are why. The screen suggests a crew count. It does not assign one, and it does not text anyone.

The question I wrote down was not "where is the AI." It was "which feeder should the next crew hear about first."

What sort is your customer using that optimizes the wrong thing?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-workflow": {
    topic: "One person could accept a bank change",
    text: `Northline's analyst was not blocked by missing software. She was blocked by a shared inbox where the person who typed a bank change could also accept it.

V-2 has a W-9 and insurance that is still valid. The bank details changed, so the decision is manual review. There is no approve button. V-5 is a sanctions flag, and the tool will not wave it through.

The job to be done is a decision a second person can see. Not a chatbot over vendor packets.

Where does your customer's process let the same person enter a change and release it?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "clinic-constraint": {
    topic: "The summary model died in the first meeting",
    text: `I wanted a model that summarized every overnight note for Northshore. Their privacy officer killed it in one sentence: note text does not leave the clinic, and a missing consent means the body is not copied.

What shipped is a route. Blocked, urgent callback, or the morning queue. NT-11 cites the chest-tightness sentence because consent was yes. NT-12 does not repeat the sore throat.

The design I liked is in the discovery note as rejected, so the next person does not revive it.

Which customer sentence have you written down so it cannot be relitigated later?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-constraint": {
    topic: "They had already been burned by a helpful script",
    text: `Brightpath had a script that wrote the webhook amount over the settlement when the cents disagreed. It was helpful once and wrong the next week.

The controller's rule is now the design: this tool does not post to the ledger. pay-4 stays an amount exception at 8000 versus 7900. Nobody in the code path picks a winner.

I had wanted the overwrite because it made the morning file look clean. Clean was the bug.

What helpful automation have you refused because the customer had already paid for it once?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-constraint": {
    topic: "An empty bin is not an order",
    text: `When Helios bin C-1 is empty, the obvious product is a purchase order. The depot lead said no. Ordering is a buyer workflow. The night network is also not allowed to call a vendor.

E17 on AST-3 is a real fault and a real filter. Quantity is zero, so the answer is stockout, with the empty bin cited. The screen says not to cut a purchase order from it.

The constraint deleted the feature I would have demoed first.

What feature would you cut if the customer's network cannot call the vendor you had in mind?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-constraint": {
    topic: "No texts, no crew assignment",
    text: `Cedar Grid's communications lead and the dispatcher said the same thing in different words. Do not text customers. Do not assign a crew.

I had a design that paged the affected accounts and posted a crew. Both pieces are gone. OUT-1 still ranks first because of the life-safety flag. The card says "suggest 2 crews" and "this does not dispatch them."

A suggestion the human accepts is the whole product. The rest was me wanting a control system.

What did you delete after two stakeholders used the word "do not"?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-constraint": {
    topic: "Legal removed the approve action",
    text: `Northline's legal team did not ask for a better approve button. They asked that the software not contain one.

The decisions are blocked for sanctions, blocked for an incomplete packet, manual review when the bank details changed, or ready for a human. V-1 can be complete and still say ready_for_human. The renderer throws if the word approved appears.

I had wanted one-click accept for clean packets. That click was the thing they would not own.

If your product has a verb the customer's legal team banned, what did you rename it to, and what did you actually remove?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "clinic-roi": {
    topic: "Do not promise fewer adverse events",
    text: `A clinic sponsor will ask whether the overnight router prevents bad outcomes. I cannot get there from a file of notes.

What Northshore can prove in a shadow week is narrower. Every note without consent stays blocked. The nurse lead agrees with the route on at least 9 of 10. NT-12 is the example: no consent, body not copied.

Fewer adverse events are why they care. They are not the number on this readout.

Which business outcome do you keep off the slide until the window is long enough to mean it?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-roi": {
    topic: "Do not claim recovered cash",
    text: `Brightpath's controller will ask how much cash the matcher recovered. A sample where evt-1 matches 1500 cents does not answer that.

The number I will sign is operational. Run the same file twice and the matched total stays 1500. pay-4's hundred-cent gap is still in the exception queue at the end of the day.

Recovered revenue is a later measurement, on their ledger, over a period they choose. It is not a property of this drop.

What metric sounds like success and is actually a different project?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-roi": {
    topic: "Do not claim less downtime",
    text: `Helios will ask if the parts lookup shortens truck downtime. Twenty correct bins do not prove that.

The shadow-week claim is the one the depot lead can check. The recommended bin is the one they would have pulled, and the tool created zero purchase orders. AST-7 / E42 landing on B-14 is a hit. E99 returning no SKU is also a hit.

Downtime is the reason the VP listens. It is not the pilot metric.

What would you measure instead of the outcome your buyer actually wants?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-roi": {
    topic: "Do not claim shorter outages",
    text: `Cedar Grid's VP will ask for fewer outage minutes. Ranking OUT-1 above OUT-2 does not produce that number.

What I will report is whether the storm lead agrees with the order on 9 of 10 open outages, and whether the tool's host sent zero customer messages. Restored outages such as OUT-3 stay off the list.

Restoration time needs a season of storms. A pilot week can only show that the life-safety feeder stopped waiting behind a larger commercial one.

Which number are you willing to own on Friday, and which one needs a quarter?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-roi": {
    topic: "Do not claim fraud found",
    text: `Northline's CFO will ask how much fraud the packet check caught. A sanctions flag that was already on the row is not a discovery.

The metric is behavioral. Every bank-change packet, including V-2, is manual review or blocked. None are accepted by the tool. V-6 is missing a W-9 and a bank change, so incomplete wins and the bank review does not even start.

Fraud found is a claim for an investigation. This pilot is a claim about who is allowed to say yes.

What outcome do people want the tool to "find" that the input file already contained?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "clinic-overturn": {
    topic: "Four routes the nurse would not defend",
    text: `Northshore's eval file was green. The nurse lead then rejected 4 routes out of 10. One of them had called a refill urgent because the word "blood" appeared in "blood pressure medication."

That is a stop. I do not lower the word list until the chart looks calm. I sit on the four notes, delete the bad trigger, and add NT-13 to the eval file as a morning-queue case.

Green means the code matches yesterday's rule. It does not mean the nurse will stake her name on it.

When the expert overturns you, do you edit the threshold or edit the rule they can explain?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-overturn": {
    topic: "The analyst rejected a match the file called clean",
    text: `Brightpath's tests passed. The analyst still pulled two "matched" rows out of the pile because the settlement status was posted and the payment had already been reversed in a column I had not mapped.

I did not relax the matcher to agree with her. I stopped calling those rows matched, added the status she uses, and put both payment ids in the eval file. A second run has to keep them as exceptions.

Agreement with the person who signs the close is the second gate. The unit test is the first.

What column did your sample never contain that the operator uses every morning?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-overturn": {
    topic: "The lead would not pull the part the sheet named",
    text: `Helios's fault sheet said E42 is BRG-19. The depot lead looked at AST-7 and said the last two trucks with that fault needed the housing kit, not the bearing alone.

The eval file was green against the sheet he had signed last quarter. The sheet was stale. I did not override him in the tool. I marked the fault unscored until he updated the signed list, then I locked the new part in the eval file.

A signed source that the expert will not follow is not a source anymore.

Do you ship the document, or do you ship what the expert will actually do?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-overturn": {
    topic: "The storm lead reversed two rankings",
    text: `Cedar Grid's scorer put a feeder first because one account was flagged life-safety. The storm lead reversed it. That account had moved three months ago. The flag had not.

I took the feeder off the protected list for this drop, said so on the card, and added the outage id to the eval file as a case that must not get the 100 points. I did not "tune" the weight until he nodded.

The data he trusts beat the flag I trusted.

When the operator contradicts the source system, which one do you change first?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-overturn": {
    topic: "Ready for a human was read as approved",
    text: `Northline's analyst treated ready_for_human as approval and started the ERP setup. The eval file still passed, because the decision string was correct.

The failure was the word, not the rule. I changed the label to "packet complete, not accepted" and added V-1 as an eval case that must not contain an acceptance verb. The bank-change path for V-2 was already manual review. This bug was the clean packet.

A correct status that a person will misread is the wrong status.

What label in your UI is technically accurate and operationally dangerous?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "clinic-stakeholders": {
    topic: "Privacy wanted a hold. The desk wanted 7am.",
    text: `Northshore's privacy officer wanted no second system until consent rules were reviewed. The nurse lead had 40 notes and a 7am start.

The sequence I wrote down: I sit with her for one file, read-only, and blocked notes do not show a body. Nobody else gets a login. Urgent callback for NT-11 still requires consent yes. NT-12 stays a blocked id.

The sponsor signed that sentence the same afternoon. I did not expand it at 6:30am because the queue felt urgent.

What can you give the person on shift tonight without creating an account?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-stakeholders": {
    topic: "Finance wanted a post. Ops wanted a list.",
    text: `Brightpath finance wanted the matcher to post adjustments before the close. Ops wanted a list they could still argue with.

I kept the list. evt-1 can match. pay-4 cannot be settled by the tool. The close still happens in their ledger, by a person, after the exception queue is empty or explicitly waived. That waiver is not a button I own.

Both sides were protecting a real failure. Only the controller could decide, and the decision is in the readout: no posts in this engagement.

Who is allowed to choose when two teams are each preventing a different incident?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-stakeholders": {
    topic: "Buyers wanted orders. The night lead wanted bins.",
    text: `Helios buyers wanted the lookup to open a purchase request when quantity hit zero. The night lead wanted the bin number before the driver left the yard.

Night gets the bin, the stockout, or an escalate. Buyers keep the purchase request in their system, started by a person in the morning. AST-3 / E17 is the example I used: real part, zero quantity, no order created.

I asked the operations director to pick, in writing, the same day. The night lead does not get to invent a buyer workflow at midnight.

Which user is in front of you, and which user is a second project?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-stakeholders": {
    topic: "Comms and dispatch blocked different buttons",
    text: `During a Cedar Grid storm, dispatch wanted a crew assignment on the card. Communications wanted an SMS to every account on the feeder. Each group thought the other was the delay.

I removed both buttons. The card ranks OUT-1 first and says the suggestion is not a dispatch and not a message. The storm lead still uses the radio. Communications still uses their approved template, outside this tool.

The VP confirmed that split before the next weather window. I was not going to discover the policy by sending the first text.

Which two teams are each trying to put their action inside your screen?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-stakeholders": {
    topic: "Finance wanted speed. Legal wanted a second person.",
    text: `Northline finance was measured on how fast a vendor could be paid. Legal was measured on whether a bank change had a second set of eyes.

V-2 is the case that makes the trade visible. The packet is otherwise complete. The decision is still manual review. V-5 never reaches that argument, because a sanctions flag stops first.

The CFO and the general counsel had to say which failure they would rather explain. They picked the slower vendor over the single-person bank change. I wrote that down before building the happy path.

When two scorecards conflict, which failure is the company willing to own?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "clinic-export": {
    topic: "Their note file had a column I had treated as text",
    text: `Northshore's real extract did not look like my sample. Consent was "Y", "yes", and blank. Blank was not the same as no, and the nurse lead had not agreed what Y meant.

I stopped the demo, showed three rows, and left the blank and the Y unscored. Only an explicit yes copied a sentence into the route. NT-12 stayed blocked. I did not map Y to yes in the hallway to save the meeting.

A derived mapping belongs on the slide. A silent mapping belongs in the incident review.

What value in the real file have you never shown the person who owns the meaning?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-export": {
    topic: "The settlement file used a different payment key",
    text: `Brightpath's webhook had payment_id. The settlement file had processor_reference, which matched only after a prefix was stripped. My sample had hidden that.

I put the prefix rule on the readout and showed one row where the strip was wrong. That row stayed unmatched. evt-1 still matched 1500 cents because its key was clean. I did not "fix" the ugly key so the demo hit rate would look better.

If the join is a transformation, the transformation is part of the product.

Where does your demo file spare you from the customer's actual key?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-export": {
    topic: "The fault code came with a revision letter",
    text: `Helios sent E42 and E42A in the same night's calls. My signed sheet only had E42. Treating A as a typo would have issued BRG-19 for a fault the lead had not approved.

E42 on AST-7 still points at bin B-14. E42A stays escalate, with no SKU, until the lead adds it to the sheet. The tech hears "not on the signed list" instead of a confident wrong part.

Unknown is a result I can defend at the parts window. A guessed suffix is not.

What suffix or status have you been tempted to ignore so the match rate stays high?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-export": {
    topic: "Life safety was a code, not a yes",
    text: `Cedar Grid's account file did not say yes/no. It said a priority code, and three codes meant life safety. One of those codes had been retired. My sample had already translated them.

I showed the storm lead the code list and asked which ones still count. Until he answered, those accounts did not add the 100 points. OUT-1 stayed high because its code was one he confirmed. A feeder with only the retired code stayed on customer count alone.

The translation table is a decision. It does not belong inside a helper function with no name on it.

Who has to initial the mapping before you score production rows?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-export": {
    topic: "Insurance dates arrived as Excel serials",
    text: `Northline's packet dump stored insurance expiry as an Excel serial. Rendered badly, V-4's expired policy looked like it ended in 2027. The analyst would have called it complete.

I showed the raw value, the converted date, and the as-of date of 2 October 2026. V-4 stayed blocked. I did not ship a converter that "looked right" on the two rows I had checked by hand.

A date parse is a control, not a convenience. The eval file now includes the serial that used to look valid.

What conversion in your pipeline can make an expired fact look current?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "clinic-audit": {
    topic: "The question box is not a second chart",
    text: `A Northshore dispatcher pasted a patient's detail into the question so the route would "have context." The route can still be computed from the note id. The log cannot keep that sentence.

The audit row is note id, route, and citation count. NT-12's blocked decision does not include the sore throat. An urgent note cites the one sentence that tripped the rule, because the nurse has to see why the phone should ring, and that sentence was already in a consented note.

Security asked for the raw question for a week. I offered a replay of the note id inside the clinic. The column was not added.

What would you rather make hard to debug than easy to leak?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-audit": {
    topic: "Keep the exception, not the provider payload",
    text: `Brightpath's first log stored the whole webhook because debugging was easier. The payload had a customer name the settlement file did not need.

The log now stores event id, payment id, status, and the matched total. evt-1 is matched, 1500 cents. pay-4 is an amount exception. The raw body stays in the provider's system, which already has its own retention.

If an analyst needs to see why a row failed, they open that payment id in the tool and rerun the rule. They do not grep a copy of every payload.

What did you log because it made the second bug easier, and the audit harder?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-audit": {
    topic: "Do not log a part you refused to recommend",
    text: `Helios's first audit trail stored the SKU the model "would have" suggested for unknown faults, for later analysis. That is how a guessed part leaks into a screenshot.

E99 on AST-8 stores asset id, fault code, and status escalate. The SKU field is empty. E42 stores bin B-14 because that recommendation was real and the tech may need to explain the pull.

A shadow recommendation in a log is still a recommendation. I deleted the column before the night shift used the screen.

Where does your log know something the user is not allowed to see?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-audit": {
    topic: "The rank log has no phone numbers",
    text: `Cedar Grid's outage card never had street addresses, on purpose. The first audit export still joined to the account table and picked up phone numbers, because the join was convenient.

I cut the export back to outage id, feeder, score, and suggested crew count. OUT-1 can be reconstructed from the outage system they already run. The life-safety flag is a reason code, not a customer list.

The person who asked for the join wanted to "see who was affected." That is a different product, and it is the one communications already owns.

What join would quietly widen the data your screen was designed not to hold?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-audit": {
    topic: "The tool never sees the account number",
    text: `Northline's vendor master has the bank account. This review tool receives only that it changed. V-2 is manual review because the flag is yes, not because someone pasted digits into a note.

The audit row is vendor id and decision. If an investigator needs the account, they go to the master, under the access they already have. I will not make a second copy so the packet review is "self-contained."

Self-contained was the risk. The packet can be reviewed without becoming a new store of payment details.

What fact can you replace with a yes/no so the tool stops being a second system of record?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "clinic-writeback": {
    topic: "A route in the chart is no longer a shadow",
    text: `The Northshore lead asked to write the route onto the note in the chart so the day shift would see it. Reasonable, and it ends easy rollback.

While the tool is read-only, stopping it leaves the chart untouched and the nurse still has the file. The moment NT-11's "urgent callback" is a chart field, a wrong route is something the next nurse will act on, and undoing it is an amendment.

Writeback waits until she agrees on 9 of 10 routes, and a named person is allowed to change that field. Until then the decision lives beside the chart, not in it.

What write would turn your rollback into a data repair?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-writeback": {
    topic: "Posting the match ends the pilot's undo",
    text: `Brightpath asked the matcher to mark settlements as reconciled so the close would be faster. That request moves the tool from a list into the ledger.

Today, deleting the output file undoes the run. evt-1 matched, pay-4 did not, and the ledger does not know. After a post, a wrong match is an entry someone has to reverse, and a replay is no longer harmless.

I will post only after a week of identical totals on replay, an empty set of disputed exceptions, and a named poster who is not the tool. Speed of close is not worth a silent journal entry.

What "save a step" request turns your output into their books?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-writeback": {
    topic: "Do not decrement the bin from the lookup",
    text: `Helios asked the lookup to decrement bin B-14 when it recommended BRG-19, so the count would stay true. That makes a wrong recommendation a wrong inventory movement.

The tech still pulls the part. The lead still adjusts stock in the system they already trust. The lookup staying wrong is annoying. The lookup writing stock is an outage at the parts window.

Decrement waits until the lead agrees the bin was right on 9 of 10 pulls, and a named owner accepts the adjustment. Until then the screen is a sign, not a transaction.

Which convenience would let a bad recommendation move physical goods?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-writeback": {
    topic: "A suggested crew is not an assignment",
    text: `Cedar Grid dispatch asked the ranker to create the crew assignment so the storm lead would stop retyping OUT-1. Retyping is the control.

If the tool writes the assignment, a bad rank becomes a truck roll, and closing the screen does not call the truck back. The card can say "suggest 2 crews" only while a person still has to key it.

I will talk about writeback after a storm where the lead agrees with the order and still wants the keystrokes gone. Not during the storm where the flag data was just proven stale.

What retyping is actually your safety interlock?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-writeback": {
    topic: "Ready for a human must not create the vendor",
    text: `Northline asked the review tool to create the ERP vendor when the packet was ready_for_human, to skip a screen. That screen is the acceptance.

V-1 being complete is not V-1 being payable. Creating the master record is the write I will not automate in this engagement. Manual review for V-2 would be meaningless if a clean packet inserted itself.

The ERP insert waits on a person who is not the tool, with the decision visible beside them. Rollback stays "stop the process" only until that insert exists.

Which downstream create have you been asked to treat as a convenience?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  }
};
