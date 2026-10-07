// Merges the 25 FDE interview themes into 10 carousels. Clients named here are fictional interview scenarios.

module.exports = [
  {
    slug: "start-from-the-workflow",
    title: "Start from the workflow, not the model.",
    sub: "Shadow the 7am queue before you open a notebook.",
    hook: "Most failed AI pilots I have read about started with a model and went looking for a process. Forward deployed work runs the other way: sit with the person who does the job today, map what they actually do, and only then decide whether software should touch it.",
    slides: [
      {
        type: "list", title: "Four questions I ask on day one",
        items: [
          { h: "Who does this today?", p: "A name and a role, not a department." },
          { h: "What starts it?", p: "The trigger: an email, a queue, a shift change." },
          { h: "What does done look like?", p: "The output someone else depends on." },
          { h: "What happens when it is wrong?", p: "Who notices, how fast, and what it costs." },
        ],
      },
      { type: "flow", title: "Map the workflow first", steps: ["Trigger", "Intake", "Decision", "Handoff", "Record"], note: "Mark the one step where a person spends judgment. That is the only candidate for automation \u2014 everything else is plumbing." },
      {
        type: "compare", title: "Two ways to start",
        left: { label: "Model-first", items: ["Pick a model, find a use", "Demo on clean sample data", "Success = accuracy number", "Operator meets it at launch"] },
        right: { label: "Workflow-first", items: ["Shadow the operator", "Replay last month's real items", "Success = queue time, errors", "Operator shapes the rules"] },
      },
      { type: "quote", label: "Scenario: night shift", text: "\u201cI need to explain it at 2am.\u201d", sub: "One sentence from a night lead removed a ranked-search design and replaced it with a written priority order the next shift can recompute." },
      {
        type: "checklist", title: "Before any build",
        items: ["Shadowed the real operator", "Workflow drawn on one page", "Judgment step identified", "Baseline time and error rate", "Owner who can say no", "Old path stays available"],
      },
    ],
    takeaway: "The workflow is the spec. The model is an implementation detail.",
    points: ["Shadow before you design", "Automate one judgment step, not the whole job", "Keep the old path running"],
    question: "What is the first question you ask a customer before proposing any AI?",
  },
  {
    slug: "constraints-delete-designs",
    title: "A constraint should delete a design.",
    sub: "If your architecture survived every customer sentence, you have not found the constraint yet.",
    hook: "A discovery brief that deletes nothing is a status meeting. The point of the first week is to find the sentences that kill designs you liked \u2014 and write down what replaces them.",
    slides: [
      {
        type: "list", title: "Constraints that delete designs",
        items: [
          { h: "Explainable at 2am", p: "Deletes opaque ranking. Replaces it with written rules." },
          { h: "Data cannot leave the site", p: "Deletes hosted APIs. Replaces them with local models or no model." },
          { h: "No write-back", p: "Deletes automation. Replaces it with suggestions a human applies." },
          { h: "Offline for hours", p: "Deletes live calls. Replaces them with batch and queues." },
        ],
      },
      {
        type: "table", title: "Write the trade down", headers: ["Constraint", "Deleted", "Replacement"],
        rows: [
          ["Audit retention", "Storing note bodies", "Store IDs + hashes"],
          ["Legacy export", "Real-time sync", "Nightly file + diff"],
          ["Union rules", "Auto-assign shifts", "Ranked suggestions"],
          ["Security review", "External LLM", "On-prem or rules"],
        ],
      },
      { type: "quote", label: "The rule", text: "Boring and recomputable beats clever and opaque.", sub: "Something the next shift can recompute, and an eval file can lock." },
      {
        type: "list", title: "Keep the old path",
        items: [
          { h: "Run side by side", p: "The manual process stays live until the new one earns trust." },
          { h: "One switch back", p: "Operators can return to the old path without a ticket." },
          { h: "Retire on evidence", p: "Remove it only after an agreed agreement rate." },
        ],
      },
      {
        type: "checklist", title: "Discovery brief must contain",
        items: ["Constraints, each with a source", "Designs each constraint deleted", "The replacement and why", "Open unknowns with owners", "What we will not build"],
      },
    ],
    takeaway: "Deleted designs are the evidence that you listened.",
    points: ["Hunt for the sentence that kills the design", "Write constraint \u2192 deleted \u2192 replacement", "Prefer rules people can recompute"],
    question: "Which customer sentence has actually killed a design you liked?",
  },
  {
    slug: "security-says-no-to-the-model",
    title: "When security says no to the model.",
    sub: "Treat it as a requirements document, not a blocker.",
    hook: "Security rejecting a hosted model is not the end of the project. It usually means nobody showed them where the data goes. Bring the data flow, the egress list and the kill switch, and the conversation changes.",
    slides: [
      {
        type: "list", title: "What security actually asks",
        items: [
          { h: "Where does data go?", p: "Every hop, every region, every vendor." },
          { h: "Who can see prompts?", p: "Operators, vendors, logs, support staff." },
          { h: "How long is it kept?", p: "Retention for prompts, outputs and traces." },
          { h: "How do we turn it off?", p: "A kill switch that does not need a deploy." },
        ],
      },
      { type: "flow", title: "Egress-safe design", steps: ["Local redaction", "Allow-listed endpoint", "No retention", "Audit log", "Kill switch"], note: "If even this is not acceptable, a rules engine or a local model is the answer. Sometimes the right model is no model." },
      {
        type: "table", title: "Access by role", headers: ["Role", "Sees", "Never sees"],
        rows: [
          ["Operator", "Own queue + suggestion", "Other sites"],
          ["Engineer", "Metrics, hashes", "Raw records"],
          ["Vendor", "Nothing by default", "Prompts, outputs"],
          ["Auditor", "Decision log", "Free-text bodies"],
        ],
      },
      {
        type: "checklist", title: "What I bring to the review",
        items: ["One-page data-flow diagram", "Egress allow-list", "Threat model with mitigations", "Retention and deletion plan", "Rollback and kill switch", "Who owns the risk"],
      },
      { type: "quote", label: "Reframe", text: "\u201cNo\u201d is the first draft of the requirements.", sub: "Ask which condition would make it a yes, then design to that condition." },
    ],
    takeaway: "Show where the data goes before you ask for approval.",
    points: ["Lead with the data flow", "Redact locally, allow-list egress", "A kill switch that needs no deploy"],
    question: "What finally got your security team to say yes \u2014 or did it never happen?",
  },
  {
    slug: "do-not-invent-the-roi",
    title: "Do not invent the ROI.",
    sub: "Measure the baseline before you build anything.",
    hook: "\u201cSaves 40% of analyst time\u201d is a slide, not a number. If you did not measure the current process, the ROI is invented \u2014 and the first skeptical manager will find out.",
    slides: [
      {
        type: "list", title: "Baseline before build",
        items: [
          { h: "Time per item", p: "Measured on real work, not estimated in a meeting." },
          { h: "Error or rework rate", p: "How often a human has to redo it." },
          { h: "Queue length", p: "What is waiting at the start of each shift." },
          { h: "Cost of a miss", p: "What a wrong or late item actually costs." },
        ],
      },
      {
        type: "compare", title: "Invented vs measured",
        left: { label: "Invented", items: ["Vendor benchmark", "Best-case demo data", "Percent saved, no baseline", "Nobody can recompute it"] },
        right: { label: "Measured", items: ["Two weeks of real items", "Same items, before and after", "Minutes saved per shift", "Formula lives in the repo"] },
      },
      {
        type: "table", title: "Metrics that hold up", headers: ["Metric", "Type", "Why"],
        rows: [
          ["Agreement with operator", "Leading", "Trust before scale"],
          ["Queue time at 9am", "Leading", "Operator feels it"],
          ["Rework rate", "Lagging", "Quality signal"],
          ["Cost per item", "Lagging", "The finance view"],
        ],
      },
      {
        type: "list", title: "Make it recomputable",
        items: [
          { h: "Log the inputs", p: "Every number traces back to raw events." },
          { h: "Formula in code", p: "Versioned, reviewed, not in a spreadsheet tab." },
          { h: "Next shift can rerun it", p: "If only you can produce it, it is not a metric." },
        ],
      },
      { type: "quote", label: "The test", text: "Could a skeptic recompute it?", sub: "If not, call it a hypothesis and say what you will measure next." },
    ],
    takeaway: "An honest small number beats an impressive invented one.",
    points: ["Measure the baseline first", "Use the operator's units: minutes, queue, rework", "Keep the formula in the repo"],
    question: "What is the most invented ROI number you have seen in a deck?",
  },
  {
    slug: "when-the-operator-overturns-the-score",
    title: "When the operator overturns the score.",
    sub: "Disagreement is the most valuable data you will get.",
    hook: "The model says route it here. The operator routes it somewhere else. Most teams log that as noise. I treat it as a free label from the person who knows the job best.",
    slides: [
      { type: "flow", title: "Disagreement loop", steps: ["Tool suggests", "Operator decides", "Disagreement logged", "Rule review next morning", "Eval case added"], note: "A disagreement becomes a rule change or a new test case. Never a silent miss." },
      {
        type: "table", title: "What to do with each case", headers: ["Case", "Action"],
        rows: [
          ["Operator right, rule missing", "Add the rule + eval case"],
          ["Operator right, data wrong", "Fix the export or feature"],
          ["Tool right", "Show evidence, never overrule"],
          ["Both reasonable", "Write a tie-break rule"],
        ],
      },
      {
        type: "list", title: "Write the tie-break down",
        items: [
          { h: "Ordered rules", p: "E.g. safety first, then deadline, then customer tier." },
          { h: "Owned by operations", p: "They change the order, not the engineer." },
          { h: "Versioned", p: "Every change has a date and a reason." },
        ],
      },
      { type: "stats", title: "Shadow-week targets (scenario)", items: [{ value: "9/10", label: "agreement on consented items" }, { value: "0", label: "blocked records shown" }, { value: "24h", label: "disagreement to rule review" }], note: "Illustrative targets from an interview scenario, not a customer result." },
      { type: "quote", label: "Principle", text: "The operator keeps the final say.", sub: "Until a week of agreement says otherwise \u2014 and even then they can take it back." },
    ],
    takeaway: "Every overturned score is a free label. Collect it.",
    points: ["Log every disagreement", "Review next morning, change a rule or an eval", "Operations owns the tie-break order"],
    question: "How do you capture operator disagreement today \u2014 or does it disappear?",
  },
  {
    slug: "two-stakeholders-one-week",
    title: "Two stakeholders, one week.",
    sub: "The operator and the sponsor want different things. Both are right.",
    hook: "The sponsor wants a number by Friday. The operator wants nothing to break on Monday. A good first week gives each of them what they need without promising either something you cannot measure.",
    slides: [
      {
        type: "table", title: "Who needs what", headers: ["Stakeholder", "Needs to hear"],
        rows: [
          ["Operator", "What changes in my shift"],
          ["Their manager", "Risk to the queue"],
          ["Sponsor", "Evidence it is worth it"],
          ["Security", "Where data goes"],
          ["IT owner", "Who runs it after you leave"],
        ],
      },
      { type: "flow", title: "A first week that works", steps: ["Mon: shadow", "Tue: map + baseline", "Wed: constraints", "Thu: thin slice on replay data", "Fri: one-page readout"], note: "No production access needed until the readout is accepted." },
      {
        type: "list", title: "The one-page readout",
        items: [
          { h: "What we saw", p: "The workflow, with the judgment step marked." },
          { h: "What we measured", p: "Baseline numbers and how we got them." },
          { h: "What we will not build", p: "Deleted designs and why." },
          { h: "What we need", p: "Access, owner, decision by a date." },
        ],
      },
      {
        type: "dodont", title: "Demo day",
        do: ["Demo the boring path end to end", "Use replayed real items", "Show a failure and the fallback", "Let the operator drive"],
        dont: ["Hand-picked perfect examples", "Live calls you have not rehearsed", "Accuracy without a baseline", "Promising dates for unknowns"],
      },
      { type: "quote", label: "Rule of thumb", text: "Under-promise in the readout.", sub: "The sponsor remembers the number. The operator remembers the Monday." },
    ],
    takeaway: "Give the sponsor evidence and the operator safety \u2014 in the same week.",
    points: ["Map each stakeholder to what they need", "One-page readout by Friday", "Demo the boring path, not the highlight reel"],
    question: "Which stakeholder do you find hardest to satisfy in week one?",
  },
  {
    slug: "the-export-is-missing-a-column",
    title: "The export is missing a column.",
    sub: "Day-one data reality beats week-three surprises.",
    hook: "Every customer dataset has a missing column, a timezone nobody mentioned, or an ID that is reused. Finding it on day one is cheap. Finding it in the demo is expensive.",
    slides: [
      {
        type: "checklist", title: "Day-one data checks",
        items: ["Schema matches what we were told", "Null rate per column", "Timezones and daylight saving", "IDs unique and stable", "Duplicates and late updates", "Free text that hides PII"],
      },
      { type: "flow", title: "Agree a data contract", steps: ["Sample export", "Profile it", "Write expectations", "Validate every load", "Alert the owner"], note: "The contract names a human owner on the customer side. A broken load pages them, not you." },
      {
        type: "table", title: "Unknowns log", headers: ["Unknown", "Owner", "Due"],
        rows: [
          ["Is status column back-filled?", "Data lead", "Wed"],
          ["Which TZ are timestamps?", "IT", "Tue"],
          ["Can records be deleted?", "Legal", "Fri"],
          ["Who fixes the export?", "Ops manager", "Thu"],
        ],
      },
      {
        type: "list", title: "Leftovers after the pilot",
        items: [
          { h: "Known gaps", p: "Columns we worked around, written down." },
          { h: "Manual steps", p: "Anything a human still has to do." },
          { h: "Debt with a date", p: "Each leftover has an owner and a deadline." },
        ],
      },
      { type: "quote", label: "Principle", text: "Unknowns are fine. Hidden unknowns are not.", sub: "Write them down, give each an owner, and show the list in every readout." },
    ],
    takeaway: "Profile the real export before you design anything.",
    points: ["Run day-one data checks", "Agree a contract with a named owner", "Keep an unknowns log in every readout"],
    question: "What is the worst data surprise you found too late?",
  },
  {
    slug: "audit-and-no-write-back",
    title: "Audit logs and the no-write-back rule.",
    sub: "Suggest first. Write later, if ever.",
    hook: "Two rules saved more pilots than any model choice: the tool does not write back to the system of record, and the audit log stores decisions without storing sensitive content.",
    slides: [
      {
        type: "compare", title: "Write-back vs suggest",
        left: { label: "Write-back", items: ["Tool updates the record", "Errors spread downstream", "Needs change approval", "Hard to undo"] },
        right: { label: "Suggest", items: ["Tool shows a suggestion", "Human applies it", "System of record unchanged", "Turn off any time"] },
      },
      {
        type: "list", title: "An audit log that refuses to store",
        items: [
          { h: "IDs, not bodies", p: "Record which item, not what it said." },
          { h: "Hashes for proof", p: "Show the input did not change without keeping it." },
          { h: "Decision + actor", p: "Suggestion, final choice, who chose." },
          { h: "Retention by policy", p: "Deleted on schedule, provably." },
        ],
      },
      {
        type: "code", title: "One audit record", lang: "json",
        code: `{
  "item_id": "NT-12",
  "input_sha256": "9f2c...e1",
  "suggestion": "route:triage",
  "final": "route:pharmacy",
  "actor": "operator:42",
  "rule_version": "2026-10-14",
  "blocked": false
}`,
        note: "No note body, no patient name. Enough to replay the decision.",
      },
      { type: "flow", title: "If write-back ever comes", steps: ["Months of suggest", "Agreement evidence", "Narrow field only", "Change approval", "Reversible write"], note: "Earn it field by field, never the whole record." },
      { type: "quote", label: "Rule", text: "The system of record is not your scratchpad.", sub: "If you would not let an intern write to it on day one, neither does the tool." },
    ],
    takeaway: "Suggest first, audit decisions, store nothing you do not need.",
    points: ["No write-back until evidence earns it", "Audit IDs, hashes and decisions", "Retention is part of the design"],
    question: "Would your audit log survive a privacy review today?",
  },
  {
    slug: "shadow-stop-and-replay",
    title: "Shadow, stop, and replay.",
    sub: "How a tool earns the right to go first.",
    hook: "In a shadow week the operator still does everything. The tool sits beside the work. That week, plus a replay of last month and a clear stop rule, is what turns a demo into something people trust.",
    slides: [
      {
        type: "list", title: "Shadow week rules",
        items: [
          { h: "Operator still decides", p: "They read every item, as before." },
          { h: "Tool runs beside", p: "Suggestions are logged, not shown as orders." },
          { h: "Measure agreement", p: "Daily, on consented items only." },
          { h: "Fix overnight", p: "Each disagreement reviewed the next morning." },
        ],
      },
      { type: "flow", title: "Replay before live", steps: ["Pull last month", "Run the tool offline", "Compare to real outcomes", "Review misses with ops", "Lock as eval set"], note: "Replay uses decisions people already made, so you test on real difficulty, not demo data." },
      {
        type: "table", title: "Stop rules, agreed upfront", headers: ["Trigger", "Action"],
        rows: [
          ["Blocked record shown", "Stop immediately"],
          ["Agreement drops below target", "Back to shadow"],
          ["Export breaks", "Pause, alert owner"],
          ["Operator asks", "Stop, no questions"],
        ],
      },
      {
        type: "list", title: "When something goes wrong",
        items: [
          { h: "Stop first", p: "Kill switch, then investigate." },
          { h: "Timeline from logs", p: "What the tool saw, suggested, and who acted." },
          { h: "Fix + eval case", p: "The incident becomes a permanent test." },
        ],
      },
      { type: "quote", label: "Principle", text: "The tool has not earned the right to be first.", sub: "Until a week of shadow agreement and a clean replay say it has." },
    ],
    takeaway: "Shadow it, replay it, and agree the stop rule before go-live.",
    points: ["Operator keeps doing the job in shadow week", "Replay last month as the eval set", "Anyone can pull the stop"],
    question: "What would you force the operator to keep doing until you have a week of agreement?",
  },
  {
    slug: "rollout-rollback-and-handoff",
    title: "Rollout, rollback, and handoff.",
    sub: "Your pilot is only done when someone else can run it.",
    hook: "A forward deployed engineer leaves. The system stays. If rollback depends on you and the runbook lives in your head, you shipped a liability, not a pilot.",
    slides: [
      { type: "flow", title: "Staged rollout", steps: ["One site, one shift", "Full site", "Second site", "All sites"], note: "Each stage has an exit criterion and a named person who signs it off." },
      {
        type: "list", title: "Rollback that actually works",
        items: [
          { h: "Old path still live", p: "Operators can switch back in one step." },
          { h: "Rehearsed", p: "Run the rollback once before you need it." },
          { h: "No data migration", p: "Suggest-only designs roll back cleanly." },
        ],
      },
      {
        type: "checklist", title: "Handoff pack",
        items: ["Runbook with stop rules", "Owner and on-call named", "Dashboards and alerts", "Eval set and how to run it", "Rule change process", "Known gaps and leftovers", "Access list to revoke"],
      },
      {
        type: "dodont", title: "Scope at handoff",
        do: ["Write what is in and out", "Route new asks to the owner", "Leave a backlog, not promises"],
        dont: ["Quick extra features in week 6", "Undocumented manual fixes", "Access that outlives you"],
      },
      { type: "quote", label: "Test", text: "Could they roll it back without calling you?", sub: "If not, the handoff is not finished." },
    ],
    takeaway: "Ship the rollback and the runbook, not just the feature.",
    points: ["Stage the rollout with sign-offs", "Rehearse the rollback", "Hand off owner, evals and access"],
    question: "What is always missing from handoff packs you receive?",
  },
];
