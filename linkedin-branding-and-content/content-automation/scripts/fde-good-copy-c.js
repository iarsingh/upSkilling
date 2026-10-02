module.exports = {
  "clinic-stop": {
    topic: "Stop if a blocked note shows its body",
    text: `Northshore's stop condition is one leak. If NT-12's sore-throat sentence appears anywhere in a blocked decision, the router comes off the nurse's desk.

I do not "hotfix and continue" that morning. She goes back to the file. We find where the body was copied, add a test that fails if it happens again, and only then turn it back on. A wrong route on a consented note is a rule change. A body on a blocked note is a stop.

I wrote this before the demo so a useful sentence could not talk us out of it.

What single output would make you pull the tool the same day?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "harborline-unknown": {
    topic: "A new TMS status stays unscored",
    text: `Harborline's nightly file grew a status I had never seen: held. The demo was the next morning. Treating held as a normal dwell would have scored those trucks too low. Treating it as an exception would have paged the desk for a yard delay.

I left the rows on the screen with no band. SHP-1042 still scored 76, because its status was one the lead had already explained. Held waited until he said which SOP it belongs to, and then it became an eval row.

A missing band is an answer I can defend. A guessed band is how you lose the second meeting.

What new value will you refuse to score until the owner names it?

#ForwardDeployedEngineer #Logistics #SRE #MLOps #InterviewPrep`
  },
  "clinic-unknown": {
    topic: "A new consent value is not a yes",
    text: `Northshore sent a note with consent "verbal." My rule knew yes and everything else. Verbal is not everything else. A nurse might have obtained it. I had not.

The note stayed unscored, id visible, body hidden. NT-12 with an explicit no stayed blocked. I asked the privacy officer what verbal requires before any sentence can be copied. Until that answer, verbal does not become yes inside a helper.

The demo was worse. It was also the first time they saw I would not invent policy.

Which almost-yes in your data have you been mapping in silence?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-unknown": {
    topic: "A new currency does not convert itself",
    text: `Brightpath dropped a EUR webhook into a file that had only been USD. I can multiply by a rate. I do not know whose rate, or whose books would be wrong if I did.

The EUR event stayed pending, with the currency shown. evt-1 still matched 1500 USD cents once. I did not convert EUR so the matched total would include it. The analyst has a treasury rate. The tool does not.

An unscored currency is a question for her. An invented rate is a journal entry I am not allowed to make.

What unit conversion are you one multiply away from doing without an owner?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-unknown": {
    topic: "A fault from another model does not borrow a part",
    text: `A Helios tech reported E42 on an HX-90. The signed sheet maps E42 to a bearing only for the HX-200. The HX-90 has a different E42 in somebody's memory, not on the sheet.

AST-3 stayed escalate. No SKU. AST-7, which is an HX-200, still got bin B-14. I did not reuse the part because the code matched. The model is part of the key. A code without the model is a different fault.

The lead can add the HX-90 line when he is willing to sign it. The night shift cannot add it by pulling whatever was on the last truck.

When do you refuse to reuse a code that looks familiar?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-unknown": {
    topic: "An unknown cause code does not pick a crew size",
    text: `Cedar Grid sent an open outage with a cause code the ranker had never seen. Customer count and life safety were still there. I could have scored it. The storm lead uses that code to decide whether the crew needs a special truck.

I left the crew suggestion blank and kept the feeder on the list as unscored for crew size. OUT-1, with a known code, still said suggest 2. The unknown row showed the code and the words "lead has not classified this."

A blank suggestion is something he can fill on the radio. A wrong truck type is a second trip.

What field, if unknown, should blank the recommendation instead of the whole row?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-unknown": {
    topic: "A new document type does not count as a W-9",
    text: `Northline added a row whose tax form was "W-8" and asked if we could treat it as the W-9 check. I cannot. The rule is a W-9 present, not "some tax form."

The vendor stayed blocked_incomplete, with the form name visible. V-3, missing a W-9 entirely, stayed blocked for the same reason. I did not add W-8 as a synonym during the review meeting. Counsel can add it. The tool will not infer it.

A synonym is a policy change. It does not belong in a parser.

What near-match are you about to accept because the field is almost the one you coded?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "harborline-replay": {
    topic: "The same shipment file must score 76 twice",
    text: `Before Harborline's night lead trusts the scorer, I run the drop twice. SHP-1042 is 76 the first time and 76 the second time. The cold-chain SOP does not change. No second audit event appears for the same file.

If the second run drifts, the desk does not get the tool. A score that depends on clock skew or on a hidden counter is not a score he can recompute at 2am.

I would rather show him two identical printouts than a live demo that only runs once.

What must be identical on a replay before you call the result stable?

#ForwardDeployedEngineer #Logistics #SRE #MLOps #InterviewPrep`
  },
  "clinic-replay": {
    topic: "Reading the note file twice does not double the queue",
    text: `Northshore's overnight job was restarted and processed the file again. NT-11 must still be one urgent callback, not two phone calls. NT-12 must still be one blocked row.

The route is a function of the note, not of how many times the job woke up. A second run replaces the decision. It does not append. I tested that before she used it at 7am, because a double callback is how a pilot becomes noise.

Idempotent here means one note, one route, however many retries the scheduler needs.

What user-visible action would fire twice if your job retried?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-replay": {
    topic: "1500 cents must not become 3000",
    text: `Brightpath replays webhooks. evt-1 arrived twice with the same event id, and evt-2 arrived later with a new id for the same payment. The matched total is 1500 cents, not 3000 and not 4500.

pay-4 is still an amount exception after the replay. Nothing new matched because we tried again. I run the file twice in front of the analyst and point at the total. If it moves, we do not talk about features.

The interesting test is the new event id, not the duplicate one. Duplicate ids are the easy case. Same payment, new id, is how you double-count.

Which retry in your system creates a second business event?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-replay": {
    topic: "Refreshing the lookup must not order twice",
    text: `A Helios tech hit refresh because the page looked stuck. If refresh cut a purchase order, he would have ordered the bearing twice. Refresh does not order. The first version cannot order at all.

AST-7 / E42 still says bin B-14, quantity 2, both times. The quantity does not drop on refresh, because we do not decrement. E99 still has no SKU. I made him refresh it while I watched, so the fear had a demo.

The dangerous click is the one a person hits when they are unsure. That click has to be safe.

What does your user do when the screen hesitates, and what would that do twice?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-replay": {
    topic: "Reloading the storm list must not page anyone",
    text: `Cedar Grid's ranker reloads every few minutes as outages update. OUT-1 staying first is fine. A reload that sent a customer message would be a pager storm.

There is no message path, so reload is safe. I still sat with their network owner and reloaded OUT-1 ten times, watching for an outbound call. The rank changed only when the input changed. The host stayed quiet.

A poll is a retry you did not mean to write. It still counts.

What loop in your design runs often enough to multiply a side effect?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-replay": {
    topic: "Resubmitting a packet must not accept it",
    text: `Northline's analyst hit submit twice because the first click spun. V-2 was manual review both times. It did not become ready, and it did not create two review tasks that a tired approver could split.

V-5 stayed blocked on both submits. There is no path where the second click is the override. I want that to be true even if the service times out and the browser retries.

The double click is the test. A state machine that treats the second submit as "they insisted" is an approval you did not design on purpose.

What does a retry mean in your workflow, if the user only meant to check?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "harborline-access": {
    topic: "The second dispatcher does not get a login tonight",
    text: `Harborline's night lead wanted the whole desk on the scorer because a grocery load was late. IT wanted SSO, and medical shipments only on the medical desk, before any shared login.

Tonight is one read-only lookup beside him, on loads he already handles. SHP-1042 is a reefer, not a medical row. Harbor Medical's shipment does not go on the grocery screen to be helpful. The VP wrote that down the same day.

A second login is a feature. It is also how the wrong desk sees a medical load.

Who is allowed to look before the access rule exists?

#ForwardDeployedEngineer #Logistics #SRE #MLOps #InterviewPrep`
  },
  "clinic-access": {
    topic: "The urgent list is not for the front desk",
    text: `Northshore's front desk asked to see the urgent callback list so they could "help the phones." The list cites clinical sentences from consented notes. That is not a lobby screen.

The nurse lead sees routes. A blocked id such as NT-12 can be counted without its body. Nobody else gets a login in week one. SSO comes before a second role, and the second role is still not the front desk unless privacy names it.

Helpful visibility is how a note walks out of the clinic.

Who asked to see the queue, and what are they actually allowed to know?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-access": {
    topic: "The exception queue is not a company-wide link",
    text: `Brightpath's matcher output had payment ids and amounts. Someone pasted the link in a finance channel so "everyone can help clear exceptions."

evt-1's 1500 cents is not a secret on the scale of a bank password. It is still more than the channel needed. The analyst and the controller can open the file. A shared link is not an access model. I pulled it back and put the file where their close folder already lives.

Wide access feels like teamwork. It is also how a payment list becomes a forward.

Who did you add because they offered to help, not because they own the close?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-access": {
    topic: "Techs see the bin. They do not edit the signed list.",
    text: `A Helios tech asked for edit rights so he could add the part he actually pulled when the sheet was wrong. That edit is how an unsigned part becomes tomorrow's recommendation.

He can see B-14 for AST-7 / E42. He cannot change the fault sheet. The depot lead can. E99 stays empty until the lead signs a part. I would rather he call than silently teach the tool.

The person who feels the friction is not always the person who should remove it.

Who wants write access because the approval feels slow?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-access": {
    topic: "Life-safety detail stays off the general screen",
    text: `Cedar Grid's general storm screen shows feeder F-12 and a score. It does not show which account is the life-safety account. The storm lead's view can say the flag exists. A shared TV in the room cannot name the customer.

OUT-1 still ranks first. The reason on the shared screen is "life-safety feeder," not a name or a phone. I split the views before the first storm used a projector.

Ranking needs the flag. The room does not need the person.

What does the score need to know that the audience must not see?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-access": {
    topic: "The requester cannot be the only reviewer",
    text: `Northline's fastest path was to let the person who entered the bank change also mark V-2 reviewed, when nobody else was online. That is the path legal banned.

The tool does not have a solo complete button. Manual review is a state that waits for a second id, and the second id cannot be the first. Sanctions rows never reach that wait. V-5 is blocked before anyone is asked to be flexible after hours.

After hours is when the control gets waived. The control has to be boringly unavailable.

Which after-hours exception would put the same person on both sides of the decision?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "clinic-egress": {
    topic: "Prove the note did not leave the clinic",
    text: `Northshore will not send note text to a model API. A small model on a laptop in the office was my workaround. The nurse still could not recompute it, and it spent the week on serving instead of on consent.

The router reads the CSV from disk. There is no model client. Their IT owner watched one lookup of NT-12 and confirmed the host made no outbound call. A quiet application log would not have been enough. A quiet log can hide a request.

I want the proof in their network, once, before 7am depends on it.

Who will watch the wire, and which request will you make them watch?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-egress": {
    topic: "The matcher does not call the processor",
    text: `Brightpath's webhook file is already an export. I do not need to call the processor to "enrich" a payment, and the enrichment was going to include a customer name we had agreed not to copy.

evt-1 matches from the two files on disk. pay-4's exception is computed from those cents. The process has no HTTP client. Their security owner can see that in the image and on one run with the egress log open.

Enrichment is how a local tool becomes a third copy of the processor's data.

What outbound call is only there to make the record feel complete?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-egress": {
    topic: "The depot does not call a parts marketplace",
    text: `Helios's night network cannot call a vendor. My first design asked a catalog API for a substitute when B-14 was empty. That call is the thing they will not approve, and a substitute is a part the lead has not signed.

E42 returns the signed SKU and the local bin, or a stockout. E99 returns nothing. I removed the client and had their admin confirm a lookup of AST-7 opened no outside connection. The empty bin stays a stockout a buyer can see in the morning, on their own process.

A substitute from the internet is not a signed part that happened to be online.

What fallback would require a network your customer has already refused?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-egress": {
    topic: "Watch one outage lookup leave nothing",
    text: `Cedar Grid's fear was not the ranking math. It was a library that phones home, or a map tile call that leaks feeder locations.

The ranker reads the outage file and the life-safety flag from disk. OUT-1 can be first without a tile. I sat with their network owner and loaded that outage once. No unexpected destination. The check is part of the rollout, not a sentence in the security doc.

If I cannot name the person who watched, I do not call egress "done."

Which single request will you perform while someone from their network team watches?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-egress": {
    topic: "Do not send the vendor name to a sanctions API",
    text: `Northline's sanctions flag is already on the packet. I do not need to call an external screening API with the vendor's legal name to "be sure." That call is a new disclosure, and it is not this engagement.

V-5 is blocked because their flag is yes. The tool does not re-screen, and it does not have an API key. If they want a fresh screen, that is a different owner and a different contract. I will not bury it in the packet check because the SDK was easy.

A flag you already have is not a reason to export the identity behind it.

What check would you outsource that the customer has already performed?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "harborline-readout": {
    topic: "The Harborline note a VP can forward",
    text: `Harborline's readout is one page to the VP of operations, not a model card.

Their night lead timed 25 to 40 minutes. SHP-1042 scores 76 because the checkpoint is 8 hours past a 6-hour SLA, a P1 is open, and the last event is a temperature alarm. The desk gets the cold-chain steps and the citations. We are not claiming fewer missed deliveries. Week two is one desk, reefer and medical only, if he agrees on 9 of 10.

The ask at the bottom is a named owner for the file drop. Not a platform roadmap.

What sentence in your readout can the sponsor forward without you in the room?

#ForwardDeployedEngineer #Logistics #SRE #MLOps #InterviewPrep`
  },
  "clinic-readout": {
    topic: "Tell the clinic manager what you will not claim",
    text: `Northshore's readout goes to the clinic manager. It says the nurse lead still reads consented notes. It says NT-12 is blocked and the body is not in the tool. It says NT-11 cites one sentence and asks for a callback. It says we are not claiming fewer adverse events.

The ask is a yes on what "verbal" consent means, and a name for who may see urgent routes. The ask is not a budget for a model.

If the manager forwards it, the privacy officer should not be surprised by a sentence. I write it as if she will.

Who, besides your user, will read the note, and what must they not misunderstand?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-readout": {
    topic: "Show the controller one total and one exception",
    text: `Brightpath's readout to the controller has two numbers she can check. Matched total 1500 cents, from evt-1, counted once. One amount exception, pay-4, 8000 against 7900, not resolved.

It says the tool does not post. It says a replay did not change the total. It does not say we recovered cash. The ask is whether processor_reference, after the prefix strip, is the key she will stand behind.

A readout that needs my narration is a demo. This one is a note.

What two numbers would your buyer recompute before they trust the rest of the page?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-readout": {
    topic: "Tell the depot director which bin and which blank",
    text: `Helios's readout is for the person who owns the night shift, not for a parts-marketplace pitch.

AST-7, fault E42, bin B-14, quantity 2. AST-3, fault E17, stockout, no purchase order. AST-8, fault E99, no part, because it is not on the signed list. We are not claiming less downtime. The ask is a name on the signed sheet and a time of day the bin file is fresh.

Three rows. One refusal. One ask. If I need a fourth section, I have started selling.

What three rows would you put in front of the operator's boss?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-readout": {
    topic: "Explain why 40 customers beat 400",
    text: `Cedar Grid's readout leads with the sort the VP might challenge. OUT-2 affects 400 customers. OUT-1 affects 40 and ranks first, score 112 against 43, because a life-safety account is on that feeder. The customer-count term caps at 40, so it cannot outrank the flag.

The note says we did not text anyone and did not dispatch. OUT-3 was restored and was not on the list. We are not claiming shorter outages. The ask is which priority codes still mean life safety.

A VP who disagrees with the sort should disagree from the page, not from my voiceover.

Can your scoring rule survive a skeptical reader who only has the page?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-readout": {
    topic: "Show finance the packet you refused to accept",
    text: `Northline's readout is for the CFO and for counsel, so it cannot say "approved" by accident.

V-2 is complete except the bank details changed, so a second person still has to review it. V-5 is a sanctions flag and cannot be overridden. V-4's insurance expired on 1 January 2025, measured on 2 October 2026. V-1 is ready for a human and is still not accepted. We are not claiming fraud found.

The ask is the name of the second reviewer, and a confirmation that this tool will not see the account number.

What decision do you want both finance and legal to read the same way?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "harborline-demo": {
    topic: "Show Harborline the held status, not a perfect truck",
    text: `I can demo SHP-1042 cleanly. Score 76, cold-chain steps, citations. That demo teaches Harborline that my sample works.

The demo I owe them uses a row whose status is held. No band. The column I had called hours-since-checkpoint is a formula, and the formula is on the slide. The lead decides what held means in the room. I do not fill it so the screen looks finished.

A perfect truck is theater. An unscored row is the start of the real engagement.

Which row in the demo makes you look less prepared and more trustworthy?

#ForwardDeployedEngineer #Logistics #SRE #MLOps #InterviewPrep`
  },
  "clinic-demo": {
    topic: "Demo the note you refuse to show",
    text: `Northshore's impressive demo is NT-11, a consented urgent sentence, cited cleanly. The demo that matters is NT-12. Consent is not yes. The body is absent. I read the decision out loud so they can hear that the sore throat is not in it.

If the room asks me to "just show it this once," that is the test of the pilot, and the answer is no. The demo is the policy. A hidden override for the sake of the meeting is the override they will ask for at 7am.

What will you refuse to click during the demo?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-demo": {
    topic: "Demo the hundred cents you will not fix",
    text: `Brightpath's happy path is evt-1 matching 1500 cents. I still start the demo on pay-4. The webhook says 8000. The settlement says 7900. The status is amount exception. I do not press anything that picks a side.

Then I replay evt-1 and show the total staying 1500. The duplicate is the second scene, not the first. People remember the row you refused to clean up.

If the only row in your demo is the one that matches, you have demoed a join, not a control.

Which mismatch deserves the first five minutes?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-demo": {
    topic: "Demo the fault with no part number",
    text: `Helios will enjoy seeing AST-7 resolve to bin B-14. I open E99 first. No SKU. Escalate. Then the stockout, E17, zero quantity, no purchase order. B-14 is the third screen, so they have already seen what the tool will not do.

The lead tried to add a part for E99 during the demo. I wrote it on paper for the signed sheet. I did not type it into the tool while people watched. A demo that learns from the audience is a demo that skips the signature.

What will you stop the room from configuring live?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-demo": {
    topic: "Demo the smaller outage that ranks first",
    text: `Cedar Grid's audience expects the 400-customer feeder to be first. I show OUT-2, then OUT-1 above it, and I show the arithmetic. Forty customers cannot beat a life-safety flag because the customer term caps at 40. OUT-1 is 112. OUT-2 is 43.

I also show that the card has no send button. Someone in the room will ask for one. The demo answer is that communications already has a channel, and this screen will not grow a second one.

The surprising sort is the product. The missing button is the constraint.

What result will look wrong to the room and be right for the policy?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-demo": {
    topic: "Demo the clean packet you still will not accept",
    text: `Northline's audience wants to see a vendor go through. I show V-1 first: W-9 present, insurance valid, no bank change, and the decision is still ready for a human. I say the word accepted is not on the screen, and I do not add it for the demo.

Then V-2, same packet with a bank change, manual review. Then V-5, sanctions, blocked, no override button to hover over. The order matters. If I start with the block, they think the tool only knows how to say no. The point is that yes is not mine to give.

What "yes" will you leave visibly out of reach?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "harborline-tiebreak": {
    topic: "The VP picks when IT and the desk both say no",
    text: `Harborline's night lead wanted the scorer on every desk tonight. IT wanted no login until medical shipments were walled off. Both were preventing a real failure.

I did not split the difference into a shared password. I wrote both constraints and asked the VP of operations to choose the sequence. He did, the same day: one lookup beside the lead, no second login, medical rows stay off the grocery desk. SHP-1042 can be shown. The medical shipment cannot.

A tie left open at 2am gets resolved by whoever is loudest. That is not a decision.

Who has to put their name on the sequence before you build either side's version?

#ForwardDeployedEngineer #Logistics #SRE #MLOps #InterviewPrep`
  },
  "clinic-tiebreak": {
    topic: "The medical director chooses the morning trade",
    text: `Northshore's nurse wanted every chest-pain word to page her. Privacy wanted no sentence stored unless consent was explicit. A compromise that paged her and kept the sentence would have made both rules false.

The medical director chose. Consented notes can cite the triggering sentence. Everything else stays an id. NT-11 cites. NT-12 does not. I did not average the two policies into a "store it briefly."

Briefly is how a sentence becomes a record. Someone with clinical and organizational authority had to say no to briefly.

Who can choose when safety and privacy both sound like the careful option?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-tiebreak": {
    topic: "The controller chooses which cent is unresolved",
    text: `Brightpath ops wanted pay-4 forced to the settlement amount so the file would clear. Finance wanted it forced to the webhook so the customer had paid what the processor saw. Those are different companies' losses.

The controller chose neither. The row stays an exception. evt-1 can match because the cents agree. A 100-cent gap is not a rounding policy I get to invent. She wrote "no force" in the readout.

I was the wrong person to pick a winner, and so was the louder analyst.

When both corrections are plausible, who is allowed to refuse both?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-tiebreak": {
    topic: "The maintenance director signs the part, not the tech",
    text: `A Helios tech and the depot lead disagreed on E42. The tech had been installing a kit. The signed sheet said a bearing. The night shift wanted a ruling before the driver left.

The maintenance director kept the sheet. Bin B-14 stands. The kit does not enter the tool because a driver is waiting. If the sheet is wrong, he changes the sheet in the morning and the eval file with it. I do not change it from the yard.

Urgency is not signature authority.

Who is allowed to overrule the signed source, and when are they not in the room?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-tiebreak": {
    topic: "The duty officer owns the life-safety list",
    text: `Cedar Grid planning said a feeder was life safety. The storm lead said the account had moved. Dispatch wanted a crew either way. Three stories, one rank.

The duty officer is the name on the flag list for that night. She confirmed the account was stale, so OUT-1 did not get the 100 points until the list was fixed. I did not keep the points "to be safe." Safe, here, meant sending a crew on a lie.

Being safe and being conservative pointed at different feeders. Someone on shift had to pick.

Whose list wins when the storm lead and the database disagree?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-tiebreak": {
    topic: "Counsel wins on sanctions. Finance does not get a vote.",
    text: `Northline finance asked to onboard V-5 anyway because the contract was already signed. Counsel said the sanctions flag is not a negotiation. I had both of them in the note, and I did not build a path where finance can be right.

V-5 stays blocked. There is no second approver for that state. V-2, the bank change, is where finance and counsel already agreed a second person is required. I do not let the harder case borrow the easier case's workflow.

Some ties are not ties. Naming that is the decision.

Where are you facilitating a debate the policy has already closed?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "harborline-metric": {
    topic: "Agree the Harborline number before the scorer",
    text: `I did not write Harborline's point table until the metric was on paper.

Baseline, from the night lead's own timing: 25 to 40 minutes. Target: under 2 minutes to a cited answer, and he agrees on at least 9 of 10 bands. Judge: him, not the eval file alone. Refusal: fewer missed deliveries. SHP-1042 is a teaching row, not the proof.

A demo that answers questions is not that metric. I can hit a demo and miss every line of it.

What did you agree to count before you chose the implementation?

#ForwardDeployedEngineer #Logistics #SRE #MLOps #InterviewPrep`
  },
  "clinic-metric": {
    topic: "Count blocked bodies, not summaries produced",
    text: `Northshore's first proposed metric was notes summarized per hour. That metric rewards copying text. Their constraint forbids copying text without consent.

The metric we wrote down: every note without consent, NT-12 included, stays blocked and body-free. The nurse lead agrees with the route on at least 9 of 10 consented notes. She is the judge. Fewer adverse events are refused.

I would rather report a small ugly fraction than a large flattering count of summaries.

Which metric gets better when you violate the constraint?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-metric": {
    topic: "Count a stable total, not rows touched",
    text: `Brightpath almost measured rows processed. A replay would have doubled the success.

The metric is the matched total on a repeated file: 1500 cents, still 1500, with pay-4 still an exception. The analyst is the judge of whether an exception she knows is missing. Recovered cash is refused. The controller signed that before I tightened the matcher.

A counter that increases when you retry is not a result. It is a bug with a dashboard.

What count in your pilot goes up when nothing new happened?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-metric": {
    topic: "Count signed pulls, and count orders created",
    text: `Helios can look successful by recommending a part every time. E99 would then stop being an escalate and start being a guess.

Two numbers go in the weekly note. Recommended bins the depot lead would have pulled, with AST-7 / B-14 as the example. Purchase orders the tool created, which must stay zero. He is the judge. Less downtime is refused until a later window.

The zero matters as much as the hits. A tool that always names a part will win the first number and fail the second.

What second number keeps the first one honest?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-metric": {
    topic: "Count agreement and messages, not minutes saved",
    text: `Cedar Grid's tempting chart is outage minutes. The pilot cannot see that yet.

We count whether the storm lead agrees with the order on 9 of 10 open outages, and whether customer messages sent by the tool stay at zero. OUT-1 ahead of OUT-2 is one case, not the metric. He is the judge. Shorter outages are refused on the page.

Minutes saved would have let me claim a win from a quiet week of weather. Agreement does not.

What metric is flattering in a quiet week and empty in a real one?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-metric": {
    topic: "Count bank changes that were not self-approved",
    text: `Northline's fast metric would have been vendors onboarded. That number goes up if V-2 is accepted by the person who edited the bank details.

The metric we kept: every bank-change row is manual review or blocked, and none are accepted by the tool. V-5 never enters the numerator as a success. The analyst and counsel are the judges. Fraud found is refused.

Onboarded vendors is their ERP's metric, after a human accepts. It is not this tool's score.

What growth metric gets better if a control is skipped?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "harborline-recompute": {
    topic: "The night lead can add Harborline's score by hand",
    text: `Harborline's night lead will be asked why SHP-1042 was high. He should not need me on the phone.

Eight hours past a 6-hour SLA is 26 points. The open P1 is 30. The temperature event is 20. The total is 76, so the band is high, and the SOP is cold-chain because it is a reefer with a temp event. Medical would have beaten that, and this shipment is not medical.

If he cannot do that arithmetic, the points are a costume. I do not ship a score he cannot rebuild on a pad.

Which number in your system can the user rebuild without the system?

#ForwardDeployedEngineer #Logistics #SRE #MLOps #InterviewPrep`
  },
  "clinic-recompute": {
    topic: "The nurse can explain the route without the code",
    text: `Northshore's nurse should be able to explain NT-11 and NT-12 from the rule, not from trust in the service.

Consent is not yes, so NT-12 is blocked and the body stays out. NT-11 has consent, and the sentence contains chest, so the route is urgent callback and the citation is that sentence. A refill with consent and no urgent word stays on the morning queue. Nothing in those steps is a diagnosis.

I ask her to do one note on paper before I show the screen. If the paper and the screen disagree, the screen loses.

Can your user reach the same answer on paper?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-recompute": {
    topic: "The analyst can recompute 1500 on a calculator",
    text: `Brightpath's analyst should not need the repo to explain the total.

evt-1 matches 1500 cents and is counted. The same event id again is ignored. A later event id for the same payment is ignored. pay-4 is 8000 versus 7900, so it is not in the total. pay-7 has no settlement, so it is not in the total. The total is 1500.

She can do that with the two files and a calculator. If the tool's total needs a hidden state to make sense, I have not finished the rule.

What total should your user be able to reach without opening the code?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-recompute": {
    topic: "The lead can point at the bin without the screen",
    text: `Helios's depot lead should get the same bin I do, from the three sheets.

AST-7 is an HX-200. E42 on that model is BRG-19 on the signed sheet. B-14 has 2. B-02 has 0. The bin is B-14. E99 is not on the sheet, so there is no bin. E17's filter has no quantity, so there is no pull and no order.

If he needs the screen to remember which sheet wins, the screen is hiding the rule. I want the rule boring enough to say at the parts window.

Can you narrate the choice from the source documents alone?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-recompute": {
    topic: "The storm lead can redo the 112 on a notepad",
    text: `Cedar Grid's storm lead should be able to challenge OUT-1's score without trusting the sort.

Life safety on the feeder is 100. Forty customers contribute 4, because the term is customers divided by 10, capped at 40. Eighty minutes contribute 8. The total is 112, so the card suggests 2 crews. OUT-2 has no flag, 400 customers capped at 40, and 3 points for time, so 43.

The cap is the part people argue with. It is also why 400 customers cannot bury a life-safety feeder. If he cannot see the cap, the rank looks arbitrary.

Which cap or weight in your score will someone challenge first?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-recompute": {
    topic: "The analyst can apply Northline's order of rules",
    text: `Northline's analyst should reach the same decision I do, in the same order, on paper.

Sanctions yes, as on V-5, stops everything. Then a missing W-9 or an insurance date before 2 October 2026, as on V-3 and V-4, blocks the packet. Only then does a bank change, V-2, become manual review. V-1 survives all three and is still only ready for a human. V-6 fails the W-9 check before its bank change is discussed.

The order is the product. A different order would review a bank change on a packet that should never have been opened.

Can your user say which check runs first, and why?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "harborline-incident": {
    topic: "A wrong Harborline band sends the desk back to paper",
    text: `SHP-1042 came back medium during a Harborline shadow night. The lead had it as high. We did not tweak the threshold on the floor.

The desk went back to the binder for that lane. In the morning we found a P1 that the export had spelled as P-1. The rule had missed it. We fixed the parse, added the row to the eval file, and ran the file twice. The band was high again. The desk did not get the tool back until that replay matched.

The TMS was unchanged, so the wrong medium never became a field the next shift could act on.

What do you stop using while you are still proud of the rest of the scores?

#ForwardDeployedEngineer #Logistics #SRE #MLOps #InterviewPrep`
  },
  "clinic-incident": {
    topic: "One echoed sentence ends the Northshore morning",
    text: `A log line at Northshore included NT-12's sore throat. The route on screen was still blocked. The leak was the log, and the leak was enough.

I turned the router off before the day shift. She used the file. We cut the body out of the logger, added a test that fails if a blocked note's text appears, and replayed the file. Then she looked at the log herself. It came back the next morning, not the same morning.

A correct route with a dirty log is still an incident. I did not argue that the nurse had not seen it yet.

What side channel would you forget to turn off?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-incident": {
    topic: "A 3000 total stops Brightpath's morning",
    text: `Brightpath's second run showed 3000 cents. evt-2, a new event id for the same payment as evt-1, had been counted. The tests had only covered the identical event id.

The analyst kept her own sheet for the close. I did not let the tool's total near the ledger. We treated same payment id as already matched, added evt-2 to the eval file, and reran until the total held at 1500. She signed the new total against her sheet before the next morning.

The incident was a test gap, not a bad day. The close did not need to absorb it.

What duplicate did your tests use the easy key for?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-incident": {
    topic: "A suggested part for E99 stops the Helios night",
    text: `Helios's lookup filled E99 with BRG-19 after a fallback I had left in from a demo. The bin happened to exist. The fault was not on the signed sheet. A tech had already asked the lead if he should pull it.

The lead said no. I took the screen off the desk, deleted the fallback, and added E99 as an eval row that must have an empty SKU. The next recommendation waited until that row failed the build if a part appeared. The bin quantity never changed, which is the only reason this was a conversation and not an inventory error.

A demo fallback is a production feature until you delete it.

What shortcut from the demo is still on the path?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-incident": {
    topic: "A stale life-safety flag is a Cedar Grid incident",
    text: `Cedar Grid rolled a crew toward OUT-1 because the ranker said life safety. The account had moved. The storm lead caught it on the radio before the truck committed. The screen had been confident.

I took the ranker off the shared display for the rest of the night. The radio list continued. In the morning the duty officer corrected the flag, and the outage id went into the eval file as a row that must not get the 100 points. We did not "lower the weight" to make stale data less embarrassing.

The truck not rolling was luck. The next one does not get to be luck.

What confident label depends on a record somebody moved?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-incident": {
    topic: "A hovered approve button is a Northline incident",
    text: `A Northline build showed an approve control on V-1, grayed out, "for the demo." The analyst asked why she could not press it. Grayed out had already taught the wrong verb.

I pulled the build. The control is gone, not hidden. The eval file fails if the rendered decision for any vendor contains approved. V-1 says ready for a human. V-2 says manual review. V-5 says blocked. She saw the three screens again before the next packet day.

A disabled button is still a promise. I do not ship promises legal has refused.

What control have you only hidden?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  },
  "harborline-leftover": {
    topic: "Harborline keeps the score table, not the slides",
    text: `A month after Harborline, the night lead still has the score table and the eval file. SHP-1042 is the row he uses to teach a new dispatcher: 76, cold-chain, citations. He does not have my architecture diagram open.

He also has the rollback, which is still "stop the container," because nobody wrote the band into the TMS. IT owns the file drop. I am not on the night roster.

The interview version is one breath. Night desk, no external model, a score he can recompute, and no claim about missed deliveries.

What will they still open when your slides are stale?

#ForwardDeployedEngineer #Logistics #SRE #MLOps #InterviewPrep`
  },
  "clinic-leftover": {
    topic: "Northshore keeps the blocked-note example",
    text: `Northshore's nurse lead still uses NT-12 to train the morning. No consent, no body, no debate. The eval file has the later fights beside it. The chart was never written by the tool, so there is nothing to unwind.

Privacy has the egress note from the day they watched a lookup. I do not have a standing slot on their calendar. That is the point.

If someone asks what the engagement was, the answer is a route and a refusal. Not a model, and not a change in adverse events.

What example will train the next person on their team?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep`
  },
  "ledger-leftover": {
    topic: "Brightpath keeps the 1500-cent replay",
    text: `Brightpath's analyst still reruns last month's file when a new matcher change shows up. The total has to stay 1500 cents, and pay-4 has to stay an exception. That file outlived my involvement, which is what I wanted.

The ledger does not contain my matches. Her close notes do. The controller can still point at the readout and say we did not claim recovered cash.

I am not in the morning channel. The output format is. That is the handoff I can defend.

What fixture will they rerun after you are gone?

#ForwardDeployedEngineer #FinOps #DataEngineering #SRE #InterviewPrep`
  },
  "parts-leftover": {
    topic: "Helios keeps the signed sheet and the empty fault",
    text: `Helios's depot lead still has two artifacts. The signed fault sheet, which he can edit, and the eval row for E99, which must stay empty of a SKU. AST-7 to bin B-14 is how he checks that a real fault still resolves.

No purchase order was ever created by the lookup, so there is no order history to reconcile. The bin file is still his. I am not the person techs call when a code is new. He is.

The leftover is a sheet and a prohibition. Both should be there after the project channel goes quiet.

What prohibition has to survive you?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep`
  },
  "outage-leftover": {
    topic: "Cedar Grid keeps the sort and the missing button",
    text: `Cedar Grid's storm lead still explains OUT-1 versus OUT-2 with the cap: 400 customers cannot outrank a life-safety flag. New dispatchers hear that before they hear about the software.

The screen still has no send and no assign. Communications and dispatch kept their own tools. Closing the ranker is still the rollback, and they have done it. I am not on the storm roster.

What remains is a sort they can defend and a button they do not have. I would rather leave that than a platform diagram.

What button should still be missing a year later?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep`
  },
  "vendor-leftover": {
    topic: "Northline keeps a decision that cannot say approved",
    text: `Northline's analyst still walks new reviewers through V-2 and V-5. Bank change, second person. Sanctions, no override. V-1 is the trick question: complete, and still not accepted.

The vendor master does not contain rows this tool inserted. The account number never landed in the review log. Counsel still has the line that the word approved fails the build.

I am not in the packet meeting. The order of the checks is. That is the piece worth leaving.

What sentence should a new hire learn before they learn the tool?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep`
  }
};
