#!/usr/bin/env node
if (!process.argv.includes("--force")) {
  console.error("This rebuilds the FDE posts from templates and would overwrite the edited copy. Pass --force only if you mean that.");
  process.exit(1);
}
const fs = require("fs");
const path = require("path");
const { createImage } = require("../src/image");
const { root } = require("../src/config");

const accent = "#0f766e";
const pale = "#ccfbf1";
const footer = "Akhilesh Ranjan Singh  ·  Forward Deployed";
const caption = "Say it in this order ↓";
const profile = "https://www.linkedin.com/in/iamarsingh/";

const customers = [
  {
    id: "harborline",
    short: "Harborline",
    name: "Harborline Freight",
    user: "the night dispatch lead",
    hour: "2am",
    sample: "SHP-1042",
    fact: "score 76 from an 8-hour SLA miss, an open P1, and a temperature event",
    baseline: "25 to 40 minutes to explain a late reefer",
    files: "the TMS export, the ticket queue, and a printed SOP",
    constraint: "shipment data stays in their environment, and IT banned an external model",
    wanted: "a ranked SOP search, then a hosted model",
    shipped: "a written score, the SOP they already use, and citations",
    refuse: "fewer missed deliveries",
    metric: "under 2 minutes to a cited answer, and agreement on at least 9 of 10",
    record: "the TMS",
    hidden: "the question text and the ticket summary",
    audit: "shipment id, band, score, and citation count",
    stop: "more than one overturned band in ten, or any call leaving the VPC",
    rollback: "stop the container. Nothing has been written to the TMS",
    handoff: "their IT owner can add a shipment to the eval file",
    tags: ["#ForwardDeployedEngineer", "#Logistics", "#SRE", "#MLOps", "#InterviewPrep"]
  },
  {
    id: "clinic",
    short: "Northshore",
    name: "Northshore Clinic",
    user: "the morning nurse lead",
    hour: "7am",
    sample: "NT-12",
    fact: "NT-12 stays blocked because consent is not yes, and the note body is not copied",
    baseline: "overnight notes read in arrival order, including notes with no consent",
    files: "the overnight portal CSV",
    constraint: "note text does not leave the clinic, and missing consent means the body is not copied",
    wanted: "a summary model over every overnight note",
    shipped: "a route: blocked, urgent callback, or the morning queue",
    refuse: "fewer adverse events",
    metric: "every note without consent stays blocked, and the lead agrees on at least 9 of 10 routes",
    record: "the chart",
    hidden: "the note body and the patient token",
    audit: "note id, route, and citation count",
    stop: "a blocked note's body shows up in the decision",
    rollback: "stop the process. Nothing has been written to the chart",
    handoff: "the nurse lead can add a note id to the eval file",
    tags: ["#ForwardDeployedEngineer", "#Privacy", "#Healthcare", "#SRE", "#InterviewPrep"]
  },
  {
    id: "ledger",
    short: "Brightpath",
    name: "Brightpath",
    user: "the payments ops analyst",
    hour: "the morning close",
    sample: "evt-1",
    fact: "evt-1 matches 1500 cents once, the replay is ignored, and pay-4's 100-cent gap stays an exception",
    baseline: "a manual paste of webhooks next to the settlement CSV",
    files: "the webhook export and the settlement file",
    constraint: "the tool must not post to the ledger, and a mismatch is never marked settled",
    wanted: "a script that wrote the webhook amount over the settlement",
    shipped: "one classification per event: matched, duplicate, pending, or amount exception",
    refuse: "recovered revenue for the month",
    metric: "a replayed file produces the same matched total, and every mismatch is still in the exception queue",
    record: "the ledger",
    hidden: "the raw provider payload",
    audit: "event id, payment id, status, and the matched total",
    stop: "the matched total changes when the same file is run twice",
    rollback: "delete the output file. The ledger was never written",
    handoff: "the analyst can add a payment id to the eval file",
    tags: ["#ForwardDeployedEngineer", "#FinOps", "#DataEngineering", "#SRE", "#InterviewPrep"]
  },
  {
    id: "parts",
    short: "Helios",
    name: "Helios Equipment",
    user: "the depot lead",
    hour: "the night shift",
    sample: "AST-7",
    fact: "E42 on AST-7 points at bin B-14 because the quantity is 2, and E99 returns no SKU",
    baseline: "three spreadsheets and a phone call for every fault code",
    files: "the asset list, the signed fault-to-part sheet, and the bin count",
    constraint: "the depot cannot call a vendor API, and the tool cannot create a purchase order",
    wanted: "an automatic order when the bin was empty",
    shipped: "a bin with quantity, a stockout, or an escalate with no guessed part",
    refuse: "less downtime",
    metric: "the recommended bin matches what the lead would have pulled, and zero purchase orders are created",
    record: "the purchasing system",
    hidden: "a guessed SKU for an unknown fault",
    audit: "asset id, fault code, status, and bin id",
    stop: "any SKU appears for a fault that is not on the signed list",
    rollback: "stop the process. Bin quantities are unchanged",
    handoff: "the depot lead can add a fault code to the eval file",
    tags: ["#ForwardDeployedEngineer", "#FieldService", "#SupplyChain", "#SRE", "#InterviewPrep"]
  },
  {
    id: "outage",
    short: "Cedar Grid",
    name: "Cedar Grid",
    user: "the storm-desk lead",
    hour: "a storm night",
    sample: "OUT-1",
    fact: "OUT-1 scores 112 and ranks above OUT-2, even though OUT-2 affects 400 customers and OUT-1 affects 40",
    baseline: "sorting open outages by customer count",
    files: "the life-safety account flag and the outage list",
    constraint: "the screen does not text customers and does not assign a crew",
    wanted: "automatic customer messages and a crew dispatch",
    shipped: "a ranked list and a crew suggestion the dispatcher still has to accept",
    refuse: "fewer outage minutes",
    metric: "the lead agrees with the order on at least 9 of 10 open outages, and the tool sends no customer message",
    record: "the outage management system",
    hidden: "a street address or a customer phone number",
    audit: "outage id, feeder, score, and suggested crew count",
    stop: "any path that can message a customer",
    rollback: "close the screen. Crews are still assigned by the dispatcher",
    handoff: "the storm lead can add an outage id to the eval file",
    tags: ["#ForwardDeployedEngineer", "#Utilities", "#SRE", "#IncidentResponse", "#InterviewPrep"]
  },
  {
    id: "vendor",
    short: "Northline",
    name: "Northline Procurement",
    user: "the vendor-setup analyst",
    hour: "packet review",
    sample: "V-2",
    fact: "V-2 is otherwise complete and still manual_review, because the bank details changed",
    baseline: "packets in a shared inbox, with one person able to accept a bank change",
    files: "the vendor packet fields: W-9, insurance date, bank-change flag, sanctions flag",
    constraint: "the software must not contain an approve action, and a sanctions flag has no override",
    wanted: "a one-click approve for clean packets and for small bank edits",
    shipped: "blocked_sanctions, blocked_incomplete, manual_review, or ready_for_human",
    refuse: "a fraud number",
    metric: "every bank-change row is manual_review or blocked, and none are accepted by the tool",
    record: "the ERP vendor master",
    hidden: "the bank account number. The tool only sees that it changed",
    audit: "vendor id and decision",
    stop: "the word approved appears, or a sanctions row can be waved through",
    rollback: "stop the process. The vendor master is unchanged",
    handoff: "the analyst can add a vendor id to the eval file",
    tags: ["#ForwardDeployedEngineer", "#Procurement", "#Security", "#SRE", "#InterviewPrep"]
  }
];

const themes = [
  {
    id: "workflow",
    title: (c) => `${c.short}: start from the workflow`,
    label: "FDE DISCOVERY",
    nodes: ["Name user", "One walk", "Name files", "One ask", "A metric", "No model"],
    detail: (c) => `Leave with ${c.user}, the file, and one question.`,
    icon: "bulb",
    body: (c) => `"We need AI" is not a requirement. At ${c.hour} the person in pain is ${c.user}.

I ask them to walk one case. At ${c.name} that walk is ${c.files}. ${c.sample} is the example I keep: ${c.fact}.

I do not leave the room with a model name. I leave with the user, the file they actually have, and the one question they ask.`
  },
  {
    id: "constraint",
    title: (c) => `${c.short}: the sentence that kills a design`,
    label: "DROP THE DESIGN",
    nodes: ["Wanted more", "They said no", "Write rule", "Lock eval", "Name owner", "Do not revive"],
    detail: (c) => c.constraint,
    icon: "gear",
    body: (c) => `I wanted ${c.wanted}. ${c.name} deleted that design with one constraint: ${c.constraint}.

What shipped instead is smaller: ${c.shipped}.

If the architecture survived every sentence in the room, the discovery was not finished.`
  },
  {
    id: "roi",
    title: (c) => `${c.short}: do not invent the ROI`,
    label: "OWN A SMALL NUMBER",
    nodes: ["They ask", "Do not invent", "Use baseline", "Name target", "Refuse claim", "Write it"],
    detail: (c) => `Refuse to claim ${c.refuse}.`,
    icon: "rocket",
    body: (c) => `The sponsor will ask for ${c.refuse}. The only honest baseline at ${c.name} is ${c.baseline}.

The number I will own is ${c.metric}.

${c.refuse} is why they care. It is not what this shadow week can prove.`
  },
  {
    id: "overturn",
    title: (c) => `${c.short}: when the expert disagrees`,
    label: "EVAL IS NOT TRUST",
    nodes: ["Eval green", "They disagree", "Stop expand", "Change rule", "Add a row", "Do not lower"],
    detail: () => "Green means the code matches the policy, not that the expert agrees.",
    icon: "brain",
    body: (c) => `The eval file can be green while ${c.user} overturns the result. At ${c.name} that is a stop, not a prompt tweak.

I change the rule only when they can say why, and I add ${c.sample} to the eval file. I do not lower a threshold until the chart looks calm.

The second gate is the person who does the job. ${c.metric}.`
  },
  {
    id: "stakeholders",
    title: (c) => `${c.short}: two owners, one week`,
    label: "SEQUENCE THE WEEK",
    nodes: ["Risk owner", "Desk wants now", "One lookup", "No new login", "Sponsor tie", "Write it"],
    detail: (c) => `Tonight is one lookup beside ${c.user}.`,
    icon: "cloud",
    body: (c) => `${c.user} wants the answer tonight. The constraint owner wants ${c.constraint}.

Tonight can be one read-only lookup beside them on ${c.sample}. A second person does not get a login until the constraint is in place.

The sponsor breaks the tie in writing the same day. Helpful access at ${c.hour} is how the pilot ends.`
  },
  {
    id: "export",
    title: (c) => `${c.short}: their file is not the sample`,
    label: "THEIR FILE WINS",
    nodes: ["Open file", "Map columns", "Show formula", "Unknown row", "Leave gap", "Do not guess"],
    detail: () => "A named gap is the work. A confident wrong answer is the failure.",
    icon: "log",
    body: (c) => `The demo file for ${c.name} is not their file. ${c.files} will not match the sample column for column.

I show the mapping, including anything I had to derive. A value I have not agreed with ${c.user} stays unscored and visible. ${c.sample} is only an example after they recognize it.

Guessing a result so the demo looks finished is worse than showing the gap.`
  },
  {
    id: "audit",
    title: (c) => `${c.short}: what the log refuses`,
    label: "LOG THE DECISION",
    nodes: ["Raw text", "Do not store", "Keep the id", "Keep result", "Replay here", "No new column"],
    detail: (c) => `Store ${c.audit}.`,
    icon: "log",
    body: (c) => `Someone will paste more than an id into the box. The answer can still be useful. The log should not become a second copy.

At ${c.name} the audit event stores ${c.audit}. It does not store ${c.hidden}.

If security wants the raw input for debugging, I replay ${c.sample} inside their environment. I do not add the column for a week.`
  },
  {
    id: "writeback",
    title: (c) => `${c.short}: do not write back yet`,
    label: "READ ONLY FIRST",
    nodes: ["They ask", "Rollback dies", "Stay shadow", "Agree first", "Named owner", "Then accept"],
    detail: (c) => `Do not write ${c.record} in week one.`,
    icon: "rocket",
    body: (c) => `${c.user} will ask to write the result into ${c.record} so the next shift sees it.

That is the moment rollback stops being easy. ${c.rollback} is only true while the tool is read-only.

Writeback waits until ${c.metric}, and a named person is allowed to overwrite that field.`
  },
  {
    id: "shadow",
    title: (c) => `${c.short}: shadow before the desk`,
    label: "SHADOW FIRST",
    nodes: ["Old path", "Run beside", "Time it", "Review daily", "Then one desk", "Not the floor"],
    detail: (c) => c.metric,
    icon: "bulb",
    body: (c) => `Week one at ${c.name} stays beside the old path. ${c.user} still uses ${c.files}.

We time real lookups against ${c.baseline}. The target is ${c.metric}.

The whole floor does not switch because a demo looked fast at ${c.hour}.`
  },
  {
    id: "stop",
    title: (c) => `${c.short}: write the stop before the demo`,
    label: "STOP CONDITIONS",
    nodes: ["Write stops", "Before demo", "Count misses", "Check egress", "Halt desk", "Fix rule"],
    detail: (c) => c.stop,
    icon: "gear",
    body: (c) => `I write the stop condition before ${c.name} sees a demo. Otherwise every miss becomes a debate.

We stop expanding if ${c.stop}.

A green health check does not override that. ${c.sample} is the row I use when I explain it.`
  },
  {
    id: "rollback",
    title: (c) => `${c.short}: rollback that needs no migration`,
    label: "ROLLBACK",
    nodes: ["Read only", "Stop process", "Old path", "No migration", "Say it", "Test it"],
    detail: (c) => c.rollback,
    icon: "rocket",
    body: (c) => `Rollback at ${c.name} is ${c.rollback}.

That sentence is a design constraint, not an afterthought. If undoing the pilot needs a migration, the pilot started too wide.

${c.user} should be able to hear the rollback in one breath at ${c.hour}.`
  },
  {
    id: "handoff",
    title: (c) => `${c.short}: they can extend the eval file`,
    label: "HANDOFF",
    nodes: ["Name owner", "Show eval", "Add a row", "Run it", "You leave", "They keep it"],
    detail: (c) => c.handoff,
    icon: "bulb",
    body: (c) => `The engagement at ${c.name} is finished when ${c.handoff}.

The artifact they keep is the eval file, not a slide. ${c.sample} is already in it: ${c.fact}.

If the next change requires me on a call, the handoff is not done.`
  },
  {
    id: "scope",
    title: (c) => `${c.short}: cut scope in the room`,
    label: "CUT SCOPE",
    nodes: ["Three asks", "One user", "One question", "Postpone rest", "Name condition", "Write it"],
    detail: (c) => `Ship ${c.shipped}.`,
    icon: "gear",
    body: (c) => `${c.name} will ask for the lookup, a second product, and a rewrite of ${c.record} in the same two weeks.

I ship one thing for ${c.user}: ${c.shipped}. The rest goes in the readout as out of scope, with the condition that would reopen it.

"Later" with no condition is how the promise rots.`
  },
  {
    id: "oldpath",
    title: (c) => `${c.short}: they still use the old path`,
    label: "BEHAVIOR",
    nodes: ["Hit the time", "Watch one", "See the check", "Fix trust", "New metric", "Not speed"],
    detail: () => "Speed without a behavior change is not a win.",
    icon: "brain",
    body: (c) => `The timer at ${c.name} can hit the target while ${c.user} still goes back to ${c.files}.

I watch one lookup. If they are checking the same step, the screen is a second copy and they have not accepted it. If a step is missing, I add it and extend the eval.

Week two measures whether the old path stays closed. ${c.baseline} is no longer the goal.`
  },
  {
    id: "unknown",
    title: (c) => `${c.short}: unknown means unscored`,
    label: "DO NOT GUESS",
    nodes: ["New value", "Ask owner", "Leave unscored", "Show the row", "Add later", "No band"],
    detail: () => "A confident wrong band is worse than a named gap.",
    icon: "log",
    body: (c) => `A value that was not in the sample will show up at ${c.name}. I do not invent a result for it so the demo stays smooth.

The row stays visible and unscored until ${c.user} says what it means. Then it becomes an eval row next to ${c.sample}.

Unknown is an answer. Guessed is an incident.`
  },
  {
    id: "replay",
    title: (c) => `${c.short}: the same file run twice`,
    label: "REPLAY",
    nodes: ["Run once", "Run again", "Same total", "Same rows", "No doubles", "Stop if not"],
    detail: (c) => c.fact,
    icon: "gear",
    body: (c) => `Before ${c.name} trusts the output, I run the same drop twice. ${c.fact}.

The second run must not create a second decision, a second count, or a second write. The stop condition is ${c.stop}.

A tool that only looks right on a fresh file is not ready for their operator.`
  },
  {
    id: "access",
    title: (c) => `${c.short}: the second login waits`,
    label: "ACCESS",
    nodes: ["One person", "Read only", "No shared login", "Rule first", "Then SSO", "Then desk"],
    detail: (c) => `The second login waits on: ${c.constraint}.`,
    icon: "cloud",
    body: (c) => `The first session at ${c.name} is me beside ${c.user}, read-only, on rows they are already allowed to see.

A shared login for the rest of the desk waits until ${c.constraint}. ${c.sample} is the row I use to explain what must not leak to the wrong person.

One extra login at ${c.hour} is the incident that ends the pilot.`
  },
  {
    id: "egress",
    title: (c) => `${c.short}: prove nothing leaves`,
    label: "NO EGRESS",
    nodes: ["Ban the API", "Read disk", "No client", "They watch", "One lookup", "Then trust"],
    detail: (c) => c.constraint,
    icon: "cloud",
    body: (c) => `${c.constraint}. A local model is not the clever workaround if ${c.user} still cannot recompute it.

The service reads ${c.files} from disk. There is no model client in the process. Their owner watches one lookup of ${c.sample} and confirms nothing leaves.

A quiet log is not that proof. A quiet log can hide a request.`
  },
  {
    id: "readout",
    title: (c) => `${c.short}: the note a sponsor can forward`,
    label: "READOUT",
    nodes: ["Their words", "One example", "The metric", "The refusal", "The ask", "One page"],
    detail: (c) => `Example ${c.sample}: ${c.fact}.`,
    icon: "bulb",
    body: (c) => `The readout for ${c.name} is written to the sponsor, not to other engineers.

It includes their baseline, ${c.baseline}. It includes one row, ${c.sample}: ${c.fact}. It includes the refusal: we are not claiming ${c.refuse}.

It ends with what we need from them, not with a feature list.`
  },
  {
    id: "demo",
    title: (c) => `${c.short}: do not hide the gap in the demo`,
    label: "DEMO",
    nodes: ["Use their row", "Show the miss", "Say derived", "Say unscored", "Ask live", "No theater"],
    detail: () => "A demo that hides a gap trains them not to trust the next one.",
    icon: "brain",
    body: (c) => `I would rather show ${c.user} one ugly row from their file than a perfect walkthrough of my sample.

At ${c.name} the honest demo is ${c.sample}: ${c.fact}. If a column was derived, I say the formula. If a value is unknown, I leave it unscored on screen.

Theater at ${c.hour} costs the second meeting.`
  },
  {
    id: "tiebreak",
    title: (c) => `${c.short}: who breaks the tie`,
    label: "ONE SPONSOR",
    nodes: ["Two rights", "Name both", "Name sponsor", "Write today", "Do not poll", "Hold scope"],
    detail: () => "Both constraints can be real. One person still decides.",
    icon: "rocket",
    body: (c) => `${c.user} and the owner of the constraint can both be right. ${c.constraint}.

I do not negotiate that on the floor at ${c.hour}. The sponsor who owns the outcome decides, and the sentence goes in writing the same day.

Until that sentence exists, I do not expand past ${c.sample}.`
  },
  {
    id: "metric",
    title: (c) => `${c.short}: agree the metric before the build`,
    label: "METRIC FIRST",
    nodes: ["Baseline", "Target", "How counted", "Who judges", "What refused", "Then build"],
    detail: (c) => c.metric,
    icon: "bulb",
    body: (c) => `I do not start the scorer at ${c.name} until the metric is written.

Baseline: ${c.baseline}. Target: ${c.metric}. Judge: ${c.user}. Refusal: ${c.refuse}.

A demo that "answers questions" is not the engagement.`
  },
  {
    id: "recompute",
    title: (c) => `${c.short}: they can recompute the answer`,
    label: "SHOW THE POINTS",
    nodes: ["Show points", "Show source", "Show step", "No hidden rank", "They check", "Then trust"],
    detail: (c) => c.fact,
    icon: "brain",
    body: (c) => `${c.user} has to defend the answer at ${c.hour}. A hidden rank fails that test even when it is often right.

At ${c.name}, ${c.sample} is explainable: ${c.fact}. The source is ${c.files}.

If they cannot recompute it, it is not ready for the desk.`
  },
  {
    id: "incident",
    title: (c) => `${c.short}: a wrong answer during the pilot`,
    label: "PILOT INCIDENT",
    nodes: ["Stop desk", "Keep old path", "Pull the row", "Fix rule", "Add eval", "Then resume"],
    detail: (c) => c.stop,
    icon: "gear",
    body: (c) => `A wrong answer on ${c.sample} during the ${c.name} pilot is not a hotfix in production theater.

The desk goes back to ${c.files}. We pull the row, change the rule with ${c.user}, and add it to the eval file. We do not resume while ${c.stop}.

The old path still works because we did not write ${c.record}.`
  },
  {
    id: "leftover",
    title: (c) => `${c.short}: what they still open after you leave`,
    label: "WHAT REMAINS",
    nodes: ["Eval file", "Rule table", "Run command", "Named owner", "Rollback", "No you"],
    detail: (c) => c.handoff,
    icon: "bulb",
    body: (c) => `After ${c.name}, the thing they still open is not the architecture diagram. It is the eval file and the rule that explains ${c.sample}.

They also keep the rollback: ${c.rollback}. And a named owner for ${c.files}.

The interview sentence is the customer, the constraint, what shipped, and the claim we refused: ${c.refuse}.`
  }
];

const skip = new Set([
  "harborline:workflow",
  "harborline:constraint",
  "harborline:egress",
  "harborline:roi",
  "harborline:overturn",
  "harborline:stakeholders",
  "harborline:export",
  "harborline:audit",
  "harborline:writeback",
  "harborline:stop"
]);

const reservedByDate = {
  "2026-10-05": "2026-10-05-fde-start-from-the-workflow.md",
  "2026-10-06": "2026-10-06-fde-constraint-deletes-the-design.md",
  "2026-10-07": "2026-10-07-fde-security-bans-the-model.md",
  "2026-10-08": "2026-10-08-fde-do-not-invent-the-roi.md",
  "2026-10-09": "2026-10-09-fde-operator-overturns-the-score.md",
  "2026-10-12": "2026-10-12-fde-two-stakeholders-one-week.md",
  "2026-10-13": "2026-10-13-fde-export-missing-a-column.md",
  "2026-10-14": "2026-10-14-fde-audit-log-refuses-to-store.md",
  "2026-10-15": "2026-10-15-fde-do-not-write-back.md",
  "2026-10-16": "2026-10-16-fde-rollout-and-rollback.md"
};

function addDays(iso, days) {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function bodyOf(markdown) {
  const match = markdown.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  return (match ? match[1] : markdown).trim();
}

function topicOf(markdown, fallback) {
  const match = markdown.match(/^topic:\s*(.+)$/m);
  return match ? match[1].trim() : fallback;
}

const questions = {
  workflow: (c) => `Who is the person at ${c.hour}, and what is the one question they actually ask?`,
  constraint: (c) => `Which sentence from ${c.name} would force you to drop ${c.wanted}?`,
  roi: (c) => `What number would you refuse to put on the ${c.name} slide?`,
  overturn: (c) => `What do you change when ${c.user} disagrees, and what do you refuse to change?`,
  stakeholders: (c) => `Who breaks the tie at ${c.name} when both sides are right?`,
  export: (c) => `What do you put on screen when ${c.files} does not match the sample?`,
  audit: (c) => `Which field stays out of the ${c.name} log, and why?`,
  writeback: (c) => `What has to be true before you write into ${c.record}?`,
  shadow: (c) => `What still uses the old path during the first week at ${c.name}?`,
  stop: (c) => `What is the stop condition you would write before the ${c.name} demo?`,
  rollback: (c) => `How does ${c.user} undo this without you?`,
  handoff: (c) => `What can ${c.name} change after you leave, without calling you?`,
  scope: (c) => `What do you postpone at ${c.name}, and what condition reopens it?`,
  oldpath: (c) => `If ${c.user} still opens the old path, is the pilot a success?`,
  unknown: (c) => `What do you show for a value ${c.user} has not defined?`,
  replay: (c) => `What must stay identical when the ${c.name} file is run twice?`,
  access: (c) => `What is the second person at ${c.name} not allowed to see yet?`,
  egress: (c) => `How do you prove the ${c.name} lookup did not leave their network?`,
  readout: (c) => `What sentence in the ${c.name} readout should the sponsor be able to forward?`,
  demo: (c) => `Which gap would you rather show ${c.user} than hide?`,
  tiebreak: (c) => `Who is allowed to decide when ${c.user} and the constraint owner disagree?`,
  metric: (c) => `What did you agree to measure at ${c.name} before writing the rule?`,
  recompute: (c) => `Can ${c.user} recompute ${c.sample} without you? What do they need?`,
  incident: (c) => `A wrong answer lands on ${c.sample}. What do you stop first?`,
  leftover: (c) => `What artifact does ${c.name} still open the week after you leave?`
};

const combos = [];
for (const theme of themes) {
  for (const customer of customers) {
    if (skip.has(`${customer.id}:${theme.id}`)) continue;
    combos.push({ theme, customer });
  }
}

const dates = Array.from({ length: 150 }, (_, index) => addDays("2026-10-05", index));
const openDates = dates.filter((date) => !reservedByDate[date]);
if (combos.length !== openDates.length) {
  throw new Error(`Expected ${openDates.length} new posts, got ${combos.length} combinations`);
}

const postsDir = path.join(root, "fde-series", "posts");
fs.mkdirSync(postsDir, { recursive: true });
const queue = combos.slice();
const scheduled = [];

for (const [index, date] of dates.entries()) {
  let topic;
  let text;
  let draftName;
  let diagram;
  const reservedName = reservedByDate[date];
  if (reservedName) {
    const markdown = fs.readFileSync(path.join(postsDir, reservedName), "utf8");
    topic = topicOf(markdown, reservedName);
    text = bodyOf(markdown);
    draftName = reservedName;
    diagram = {
      label: "FDE ENGAGEMENT",
      nodes: ["Discover", "Constraint", "Policy", "Eval gate", "Shadow", "Handoff"],
      detail: "Name the user, obey the constraint, and measure a number you can defend.",
      accent,
      pale,
      icon: "bulb"
    };
  } else {
    const { theme, customer } = queue.shift();
    topic = theme.title(customer);
    if (topic.length > 72) throw new Error(`Title too long: ${topic}`);
    const paragraphs = theme.body(customer).trim();
    const question = questions[theme.id](customer);
    text = `${paragraphs}\n\n${question}\n\n${customer.tags.join(" ")}`;
    draftName = `${date}-fde-${customer.id}-${theme.id}.md`;
    diagram = {
      label: theme.label,
      nodes: theme.nodes,
      detail: theme.detail(customer),
      accent,
      pale,
      icon: theme.icon
    };
    const markdown = `---
date: ${date}
slot: 08:00
series: FDE Interview Series
topic: ${topic}
status: scheduled
publish: true
image: ../../assets/${draftName.replace(/\.md$/, "")}-doodle.png
---

${text}
`;
    fs.writeFileSync(path.join(postsDir, draftName), markdown);
    createImage({
      pillar: "FDE Interview Series",
      topic,
      footer,
      caption,
      diagram
    }, `${draftName.replace(/\.md$/, "")}-doodle`);
  }

  scheduled.push({
    id: `${date}-fde`,
    day: index + 1,
    date,
    slot: "08:00",
    pillar: "FDE Interview Series",
    audience: "Forward deployed engineers, solutions engineers, and hiring managers",
    topic,
    baseTopic: topic,
    angle: "scenario interview",
    contentFormat: "interview-lens",
    hashtags: text.split("\n").filter(Boolean).at(-1).split(/\s+/).filter((tag) => tag.startsWith("#")),
    linkedinProfile: profile,
    status: "scheduled",
    text,
    draftPath: `fde-series/posts/${draftName}`,
    imagePath: `assets/${draftName.replace(/\.md$/, "")}-doodle.png`,
    footer,
    caption,
    diagram
  });
  if ((index + 1) % 25 === 0) console.log(`Prepared ${index + 1}/150`);
}

const calendarPath = path.join(root, "content-calendar.json");
const calendar = JSON.parse(fs.readFileSync(calendarPath, "utf8"));
const byDate = new Map(scheduled.map((item) => [item.date, item]));
let replaced = 0;
calendar.items = calendar.items.map((item) => {
  const next = byDate.get(item.date);
  if (!next) return item;
  replaced += 1;
  byDate.delete(item.date);
  return next;
});
if (byDate.size) {
  throw new Error(`Calendar is missing dates: ${[...byDate.keys()].join(", ")}`);
}
if (replaced !== 150) throw new Error(`Replaced ${replaced}, expected 150`);
fs.writeFileSync(calendarPath, `${JSON.stringify(calendar, null, 2)}\n`);

const fdeCalendar = {
  series: "FDE Interview Series",
  status: "scheduled",
  wiredToDailyPublisher: true,
  count: scheduled.length,
  startDate: scheduled[0].date,
  endDate: scheduled[scheduled.length - 1].date,
  note: "All 150 posts are in content-calendar.json. The daily publisher sends one per day at 08:00 Asia/Kolkata.",
  items: scheduled.map((item) => ({
    date: item.date,
    day: item.day,
    topic: item.topic,
    draftPath: item.draftPath,
    imagePath: item.imagePath
  }))
};
fs.writeFileSync(path.join(root, "fde-series", "fde-content-calendar.json"), `${JSON.stringify(fdeCalendar, null, 2)}\n`);
console.log(`Scheduled ${scheduled.length} FDE posts from ${scheduled[0].date} to ${scheduled.at(-1).date}`);
