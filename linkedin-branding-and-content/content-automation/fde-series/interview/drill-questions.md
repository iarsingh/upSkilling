# Drill questions

Answer out loud before you open the scenario answers. Time each one. Ninety seconds for the main question, forty seconds for a follow-up.

## Q1. The workflow

A logistics company says they want an AI copilot for operations. You have a one-hour discovery call with the night dispatch lead and someone from IT.

What do you try to leave the room with?

Follow-ups:

- They keep saying "we need ChatGPT for our TMS." How do you redirect?
- What would make you walk out of that meeting still unclear?

## Q2. The deleted design

Tell me about a design you wanted to ship and then dropped because of something the customer said.

Follow-ups:

- Who had the authority to force that drop?
- What did you write down so the next engineer would not revive it?

## Q3. No external model

IT says shipment and ticket data cannot leave their environment, and they will not approve a third-party model API. The VP still wants the night desk helped in two weeks.

What do you build, and what do you explicitly not build?

Follow-ups:

- Why not a small local model on day one?
- How do you prove the service is not calling out?

## Q4. The ROI question

The VP asks, "How many missed deliveries will this prevent next month?"

You only have a timed observation from the night lead: 25 to 40 minutes to answer why a reefer or medical load is late.

What do you say in the room?

Follow-ups:

- They call that answer evasive. What do you add?
- Which number would you be willing to own after a shadow week?

## Q5. The operator disagrees

Your eval file is green. The night lead reviews 10 shipments and overturns the band on 4 of them.

What do you change, and what do you refuse to change?

Follow-ups:

- Do you lower the threshold until they agree?
- When do you stop the rollout?

## Q6. Two stakeholders

IT wants SSO and a rule that medical shipments stay on the medical desk before anyone logs in. The night lead wants the scorer on the desk tonight because a grocery load is already late.

How do you sequence the week?

Follow-ups:

- Who is the sponsor if they keep conflicting?
- What can the night lead use tonight that does not violate IT?

## Q7. The export is wrong

The demo is tomorrow. The real nightly file has event timestamps, not `hours_since_checkpoint`. Three lanes also use a status value you have never seen: `held`.

What do you do before the meeting, and what do you say in it?

Follow-ups:

- Do you compute the hours yourself and hide the gap?
- Which new status is safe to treat as low risk?

## Q8. The audit log

A dispatcher pastes a customer name and a medical detail into the question box. Your service currently returns a useful answer.

What is stored, what is refused, and why?

Follow-ups:

- Who is allowed to read the audit log?
- A security reviewer asks for the full prompt for debugging. What do you offer instead?

## Q9. Writeback

The dispatch lead asks you to write the score and the recommended SOP back into the TMS so the next shift sees it.

Why is that a week-2 decision at the earliest?

Follow-ups:

- What failure appears the moment you write back?
- What would you need to see before you agree?

## Q10. Scope cut

You have ten working days. The customer lists a copilot, a driver mobile app, and a rewrite of the ticket workflow.

What do you ship, what do you postpone, and how do you say it?

Follow-ups:

- The VP says the mobile app is the thing their board saw. Now what?
- How do you keep postponed work from becoming a vague promise?

## Q11. They still use the binder

Shadow week hits the time target. Cited answers come back in under two minutes. Dispatchers still open the printed SOP afterward.

What does that tell you, and what do you change in the product?

Follow-ups:

- Is the pilot a success?
- What would you measure in week 2 instead of speed?

## Q12. Rollout and rollback

Design the rollout for a service their IT team has never run. Include the stop conditions and the rollback.

Follow-ups:

- The container is healthy and the bands are wrong. Is that a rollback?
- What has to be true on the last day so you can leave?
