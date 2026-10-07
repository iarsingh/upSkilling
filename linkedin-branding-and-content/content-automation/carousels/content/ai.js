// Post text for this series is hand-written in ai-transformation-playbook/posts/.
const POSTS = "../../ai-transformation-playbook/posts";

module.exports = [
  {
    slug: "agent-is-a-production-system",
    postFile: `${POSTS}/01-agent-is-a-production-system.md`,
    title: "An agent is a production system.",
    sub: "If it can call an API, it sits on the same path as CI, IAM and on-call.",
    slides: [
      { type: "quote", label: "The wrong first question", text: "\u201cWhere can we add AI?\u201d", sub: "That question produces demos. The better one: which workflow already has an owner, a rollback, and a blast radius we can name?" },
      {
        type: "compare", title: "Chat window vs production system",
        left: { label: "Chat window", items: ["Answers a person", "Failure is a bad answer", "Borrows the user's session", "Ends when the tab closes"] },
        right: { label: "Agent", items: ["Acts for a process", "Failure is a bad write", "Holds its own credentials", "Runs while you sleep"] },
      },
      {
        type: "list", title: "Three gates before any model choice",
        items: [
          { h: "Owner", p: "A named team that gets paged when the agent misbehaves." },
          { h: "Rollback", p: "A tested way to undo what the agent changed." },
          { h: "Blast radius", p: "Which systems, data, spend and users it can touch, written down." },
        ],
      },
      {
        type: "list", title: "What it inherits from platform engineering",
        items: [
          { h: "Versioning", p: "Model, prompt and tool set pinned together, like an image tag." },
          { h: "Pipeline", p: "Changes ship through review and CI, not a settings page." },
          { h: "SLOs", p: "Task success rate, latency, cost per run." },
          { h: "On-call", p: "A runbook and a kill switch before the first real user." },
        ],
      },
      { type: "flow", title: "Lifecycle I would use", steps: ["Lab", "Read-only pilot", "Propose mode", "Owned service", "Review or retire"], note: "Each step needs evidence to move forward. Most agents should stay in Propose for a long time." },
    ],
    takeaway: "Treat it like software you would page on.",
    points: ["Owner, rollback, blast radius first", "Version model + prompt + tools together", "SLOs and a kill switch before users"],
    question: "What would you refuse to let an agent touch in your environment?",
  },
  {
    slug: "genai-vs-agentic-control-plane",
    postFile: `${POSTS}/02-genai-vs-agentic-control-plane.md`,
    title: "GenAI vs Agentic: what actually changes.",
    sub: "The extra boxes in the diagram are software you now have to run.",
    slides: [
      { type: "flow", title: "Generative AI", steps: ["Prompt", "LLM", "Response"], note: "A human reads the output and decides. Failure mode: a wrong answer. Controls: content filters and answer-quality evals." },
      { type: "flow", title: "Agentic AI", steps: ["Goal", "Reason", "Plan", "Tools", "Action", "Validate"], note: "Software decides and acts, then loops. Failure mode: a wrong write that other systems treat as fact." },
      {
        type: "table", title: "Side by side", headers: ["", "GenAI", "Agentic"],
        rows: [
          ["Output", "Text", "State change"],
          ["Who acts", "A human", "Software"],
          ["Identity", "User session", "Own workload identity"],
          ["Testing", "Answer evals", "Task evals + tool contracts"],
          ["Operations", "Prompt tweaks", "SLOs, traces, on-call"],
        ],
      },
      {
        type: "grid", title: "The control plane you inherit",
        items: ["Identity & authorization", "Tool & API contracts", "Data & retrieval quality", "Memory & state", "Retries & compensation", "Traces, logs, audit", "Human approval", "Policy & guardrails"],
      },
      { type: "quote", label: "The useful question", text: "Which process are we willing to redesign?", sub: "Because software can now understand, decide and act \u2014 with a named owner and a rollback." },
    ],
    takeaway: "Maximum autonomy is not the goal. Appropriate autonomy is.",
    points: ["An agent is a service in a business process", "Budget for the control plane, not just the model", "Read-only with a gate beats write-capable and unexplainable"],
    question: "Harder for your team: building a clever agent, or writing the boundaries it must not cross?",
  },
  {
    slug: "identity-is-the-first-tool",
    postFile: `${POSTS}/03-identity-is-the-first-tool.md`,
    title: "Identity is the first tool.",
    sub: "An agent on a shared human login is an unaccountable coworker.",
    slides: [
      {
        type: "dodont", title: "Agent identity: do and avoid",
        do: ["One identity per agent, owned by a team", "Workload identity with short-lived tokens", "Least privilege per tool", "Revocable in five minutes"],
        dont: ["Shared human login", "Copied PAT in an env var", "One account for every agent", "Admin \u201cjust for the pilot\u201d"],
      },
      { type: "flow", title: "Request path", steps: ["Agent", "Token broker", "Policy check", "Tool API", "Audit log"], note: "Same shape as a Kubernetes service account calling a cloud API. The LLM does not get a pass." },
      {
        type: "table", title: "Scope per tool", headers: ["Tool", "Allowed", "Never"],
        rows: [
          ["Ticketing", "Comment, draft", "Close, delete"],
          ["Git", "Branch, open PR", "Push to main"],
          ["Kubernetes", "get / list in one ns", "exec, secrets, delete"],
          ["Cloud", "Read metrics", "IAM, billing"],
        ],
      },
      {
        type: "list", title: "The audit line every action needs",
        items: [
          { h: "Who", p: "Agent identity, plus the human or ticket it acted for." },
          { h: "What", p: "Tool, arguments, target resource." },
          { h: "Result", p: "Success, failure, what changed." },
          { h: "Approval", p: "Reference to the human sign-off, if required." },
        ],
      },
      { type: "quote", label: "The readiness test", text: "Can you revoke it in five minutes?", sub: "If the answer involves finding whose laptop has the token, it is not ready." },
    ],
    takeaway: "Give agents their own identity, not yours.",
    points: ["Workload identity, short-lived tokens", "Least privilege per tool", "Audit who, what, result, approval"],
    question: "Do agents in your shop have their own identity, or do they borrow yours?",
  },
  {
    slug: "appropriate-autonomy",
    postFile: `${POSTS}/04-appropriate-autonomy.md`,
    title: "Appropriate autonomy.",
    sub: "Bucket agent actions the way you already bucket production changes.",
    slides: [
      {
        type: "table", title: "Four action classes", headers: ["Class", "Default", "Examples"],
        rows: [
          ["Read", "Allow + trace", "Search, summarize, explain a log"],
          ["Propose", "Allow, human merges", "PR, ticket, values change"],
          ["Sandbox act", "Allow + evals + kill switch", "Lab restart, staging hook"],
          ["Production act", "Deny until written down", "Scale, spend, IAM, data"],
        ],
      },
      {
        type: "list", title: "What moves an action up a class",
        items: [
          { h: "Eval evidence", p: "Pass rate over a fixed task set, across many runs." },
          { h: "Tested rollback", p: "Undo proven, not assumed." },
          { h: "Written blast radius", p: "Signed by the owning team." },
          { h: "Watched period", p: "Time in the lower class with no incidents." },
        ],
      },
      {
        type: "list", title: "What pushes it back down",
        items: [
          { h: "Model or prompt change", p: "A new version starts in the lower class again." },
          { h: "Eval regression", p: "Automatic demotion, not a meeting." },
          { h: "Incident", p: "Back to Propose until the review closes." },
          { h: "New tool or data source", p: "Scope changed, so evidence resets." },
        ],
      },
      {
        type: "compare", title: "Same incident, two classes",
        left: { label: "Propose", items: ["Reads pod logs and events", "Drafts a root-cause note", "Opens a fix PR", "Human reviews and merges"] },
        right: { label: "Sandbox act", items: ["Lab namespace only", "Restarts the pod", "Kill switch armed", "Posts result to the ticket"] },
      },
      { type: "quote", label: "The principle", text: "Autonomy is granted per action class.", sub: "It is not a personality trait of the model." },
    ],
    takeaway: "If you cannot name the rollback, it stays in Propose.",
    points: ["Classes: Read, Propose, Sandbox, Production", "Promote on evidence, demote automatically", "Every version change resets trust"],
    question: "Where is the line in your shop between Propose and Act?",
  },
  {
    slug: "gitops-evals-human-gates",
    postFile: `${POSTS}/05-gitops-evals-human-gates.md`,
    title: "GitOps, evals and human gates.",
    sub: "An agent should change systems the same way an engineer does.",
    slides: [
      {
        type: "list", title: "The anti-pattern: chat-to-cluster",
        items: [
          { h: "kubectl from a prompt", p: "No diff, no reviewer, no record." },
          { h: "Drift by design", p: "Cluster state no longer matches Git." },
          { h: "No replay", p: "Nobody can explain the change at 2am." },
        ],
      },
      { type: "flow", title: "The path I want", steps: ["Plan as PR", "Policy checks", "Eval gate", "Human approve", "GitOps sync", "Trace"], note: "Nothing here is new. It is the path we already use for Terraform and Helm, with an eval step added." },
      {
        type: "list", title: "Evals are unit tests for intent",
        items: [
          { h: "Golden tasks", p: "Fixed scenarios with known good outcomes." },
          { h: "Tool-call correctness", p: "Right tool, right arguments, right target." },
          { h: "Grounding", p: "Claims cite the source they came from." },
          { h: "Refusals and budgets", p: "Says no when it should; stays inside cost and latency." },
        ],
      },
      {
        type: "grid", title: "Policy gates worth reusing",
        items: ["OPA / Gatekeeper", "SAST on generated code", "SCA on new dependencies", "DAST on changed endpoints", "Terraform plan checks", "Secret scanning", "CODEOWNERS reviewers", "Signed commits"],
      },
      {
        type: "list", title: "When a human must approve",
        items: [
          { h: "Irreversible changes", p: "Deletes, migrations, data writes." },
          { h: "IAM or network", p: "Anything that widens access." },
          { h: "Spend above a threshold", p: "Scaling, new resources." },
          { h: "First runs of a new tool", p: "Trust is earned per tool." },
        ],
      },
    ],
    takeaway: "If the path to production is a chat message, you skipped the control plane.",
    points: ["Agents open PRs, GitOps applies", "Evals gate merges like tests do", "Humans approve the irreversible"],
    question: "What is your eval for an agent run today \u2014 none, a rubric, or a human reading output?",
  },
  {
    slug: "what-i-would-not-put-in-production",
    postFile: `${POSTS}/06-what-i-would-not-put-in-production.md`,
    title: "What I would not put in production.",
    sub: "And what I would ship first instead.",
    slides: [
      {
        type: "list", title: "Would not ship \u2014 access",
        items: [
          { h: "Personal cloud credentials", p: "Agent actions must not look like mine." },
          { h: "Apply without GitOps", p: "No Terraform or kubectl outside the pipeline." },
          { h: "No tool trace", p: "If I can't see what it called, it didn't happen safely." },
        ],
      },
      {
        type: "list", title: "Would not ship \u2014 behaviour",
        items: [
          { h: "No written blast radius", p: "Unknown scope is unlimited scope." },
          { h: "Retrieval treated as fact", p: "Snippets without citations become confident errors." },
          { h: "Auto-paging on first incidents", p: "A human confirms before waking someone up." },
          { h: "Data leaving its region", p: "Residency rules apply to prompts too." },
        ],
      },
      {
        type: "list", title: "Would ship first",
        items: [
          { h: "Read-only doc assistant", p: "On content we already publish internally." },
          { h: "PR drafter", p: "On repos with required reviews and CI." },
          { h: "Runbook copilot", p: "Explains the runbook; never executes it." },
        ],
      },
      { type: "flow", title: "The path from lab to service", steps: ["Lab", "Read-only", "Propose", "Owned service"], note: "My public GitHub work sits at the Lab step and is labelled that way. That honesty is part of the playbook." },
      {
        type: "checklist", title: "Agent production-readiness check",
        items: ["Own workload identity", "Least-privilege tool scopes", "Named owner and on-call", "Written blast radius", "Tested rollback", "Eval suite in CI", "Changes ship via GitOps", "Full tool traces and audit", "Human gate for irreversible actions", "Kill switch"],
      },
    ],
    takeaway: "Treat agents like production software.",
    points: ["Grant only the autonomy you could defend on a bridge call", "Start read-only, earn Propose, rarely Act", "Label labs as labs"],
    question: "What is the first production action you would still refuse to automate?",
  },
];
