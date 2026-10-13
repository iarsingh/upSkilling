// FDE interview prep: questions by skill area, with the short answer and what a strong answer includes.

module.exports = [
  {
    slug: "llm-apps-rag-evals-guardrails",
    title: "LLM apps: RAG, evals, guardrails.",
    sub: "The questions that separate a demo builder from an FDE.",
    hook: "Almost every forward deployed interview has a block on LLM application engineering. Here are the questions I would expect, the short answers, and what makes an answer sound like production experience.",
    slides: [
      {
        type: "list", title: "Questions and short answers",
        items: [
          { h: "Why does RAG return wrong answers?", p: "Usually retrieval: chunking, metadata or missing keywords." },
          { h: "How do you evaluate it?", p: "Real questions, expert answers, retrieval and answer scored apart." },
          { h: "Hybrid search?", p: "Keyword plus vector, then re-rank. Catches exact terms." },
          { h: "How do you stop made-up answers?", p: "Require citations, allow \u201cI don't know\u201d, test it." },
        ],
      },
      {
        type: "list", title: "Evals, the follow-ups",
        items: [
          { h: "Where do eval cases come from?", p: "Real tickets and the expert who would answer them." },
          { h: "LLM as judge?", p: "Useful at scale, calibrated against human labels." },
          { h: "When do evals run?", p: "On every prompt, model or retrieval change, in CI." },
        ],
      },
      {
        type: "compare", title: "Guardrails",
        left: { label: "Weak answer", items: ["\u201cWe tell the model to be safe\u201d", "One moderation API", "No tests", "Blocks everything risky"] },
        right: { label: "Strong answer", items: ["Input, output and tool checks", "Permissions enforced in code", "Red-team set in CI", "Measured false-block rate"] },
      },
      {
        type: "dodont", title: "How to answer",
        do: ["Start from the failure mode", "Name the metric you track", "Mention cost and latency", "Say what you would not build"],
        dont: ["List frameworks", "Claim 100% accuracy", "Skip evaluation", "Ignore the user's workflow"],
      },
      {
        type: "checklist", title: "Practise these",
        items: ["Debug a bad RAG answer aloud", "Design a 50-case eval set", "Explain hybrid search + re-ranking", "Guardrails for a write action", "Cost per answer, estimated"],
      },
    ],
    takeaway: "Talk about failure modes and evals, not frameworks.",
    points: ["Retrieval causes most bad answers", "Evals from real questions, run in CI", "Guardrails live in code, not the prompt"],
    question: "Which LLM interview question do you find hardest to answer well?",
  },
  {
    slug: "agentic-ai-langgraph-mcp",
    title: "Agentic AI interview questions.",
    sub: "LangGraph, MCP, tool calling and human approval.",
    hook: "Agent questions have moved from \u201cwhat is an agent\u201d to \u201chow do you stop it doing damage\u201d. Here are the questions I would prepare for, with the answers that show you have shipped one.",
    slides: [
      {
        type: "list", title: "Questions and short answers",
        items: [
          { h: "Workflow or agent?", p: "Fixed steps: workflow. Open-ended steps: agent, with limits." },
          { h: "Why LangGraph?", p: "Explicit state, branches, retries and human interrupts." },
          { h: "What is MCP?", p: "A standard way to expose tools and data to models." },
          { h: "How do you stop loops?", p: "Step and cost budgets, and a clear stop condition." },
        ],
      },
      { type: "flow", title: "A safe tool call", steps: ["Model proposes a call", "Validate arguments in code", "Check user permission", "Approval if it writes", "Execute + audit log"] },
      {
        type: "list", title: "The follow-ups",
        items: [
          { h: "How do you evaluate an agent?", p: "Task success, tool-call correctness and cost per task." },
          { h: "Agent memory?", p: "Short-term state in the graph, long-term in a store with rules." },
          { h: "MCP security?", p: "Trusted servers only, scoped auth, every tool reviewed." },
        ],
      },
      {
        type: "dodont", title: "How to answer",
        do: ["Start with the smallest autonomy", "Name the approval points", "Show the audit trail", "Measure cost per task"],
        dont: ["Multi-agent by default", "Unlimited tool access", "Skip failure handling", "Treat MCP as a security boundary"],
      },
      {
        type: "checklist", title: "Practise these",
        items: ["Draw a LangGraph state machine", "Design an approval step", "Explain MCP in two sentences", "Evaluate a tool-using agent", "Handle a tool timeout"],
      },
    ],
    takeaway: "The best agent answer starts with the least autonomy that works.",
    points: ["Workflow first, agent when needed", "Validate and authorise every tool call", "Approval for anything that writes"],
    question: "Where do you put the human approval step in your agents?",
  },
  {
    slug: "production-python-and-apis",
    title: "Production Python and APIs.",
    sub: "FastAPI, Pydantic, async, SQLAlchemy, Alembic and tests.",
    hook: "FDE coding rounds are rarely algorithm puzzles. They are \u201cbuild a small, correct service against messy data\u201d. These are the backend questions I would prepare, with the answers that show production habits.",
    slides: [
      {
        type: "list", title: "Questions and short answers",
        items: [
          { h: "Why Pydantic?", p: "Validation at trust boundaries, with clear errors." },
          { h: "async or sync?", p: "async for I/O-bound work. Never block the event loop." },
          { h: "N+1 queries?", p: "Eager load with selectinload, assert query counts in tests." },
          { h: "Zero-downtime migration?", p: "Expand, backfill, switch reads, contract later." },
        ],
      },
      {
        type: "code", title: "A boundary done right", lang: "python",
        code: "class Ticket(BaseModel):\n    model_config = ConfigDict(extra=\"forbid\")\n    id: int\n    priority: Literal[\"low\", \"high\"]\n\n@app.post(\"/tickets\", status_code=201)\nasync def create(t: Ticket, db=Depends(session)):\n    return await service.create(db, t)",
      },
      {
        type: "list", title: "REST and testing follow-ups",
        items: [
          { h: "Idempotency?", p: "Idempotency key on POST, safe retries." },
          { h: "Pagination?", p: "Cursor-based for large or changing data." },
          { h: "What do you test?", p: "Business rules, bad input, and one real DB path." },
        ],
      },
      {
        type: "dodont", title: "In the live round",
        do: ["Clarify inputs and edge cases", "Validate at the boundary", "Write one test early", "Say what you would add with time"],
        dont: ["Start typing immediately", "Swallow exceptions", "Ignore bad data", "Over-engineer the first version"],
      },
      {
        type: "checklist", title: "Practise these",
        items: ["CRUD API with validation", "Async call with timeout + retry", "Fix an N+1 query", "Write an Alembic migration", "Test a failure path"],
      },
    ],
    takeaway: "Correct, validated and tested beats clever.",
    points: ["Validate at every boundary", "Know async and the event loop", "Ship migrations in safe steps"],
    question: "What do you always add to a FastAPI service before it ships?",
  },
  {
    slug: "frontend-for-fdes",
    title: "Frontend questions for FDEs.",
    sub: "React, Next.js, forms, tables and streaming AI responses.",
    hook: "FDEs build the screen the operator actually uses. You do not need to be a design engineer, but you will be asked how you build forms, data tables and a chat UI that streams. Here is what I would prepare.",
    slides: [
      {
        type: "list", title: "Questions and short answers",
        items: [
          { h: "Form validation?", p: "Schema on the client for UX, validate again on the server." },
          { h: "Large tables?", p: "Server-side paging, sorting and filters, state in the URL." },
          { h: "Server or client component?", p: "Server for data fetching, client for interaction." },
          { h: "State management?", p: "Server state in a query cache, little global state." },
        ],
      },
      { type: "flow", title: "Streaming an LLM answer", steps: ["Route returns a stream", "Client reads chunks", "Append tokens to state", "Stop button aborts", "Save when complete"], note: "Server-sent events or a ReadableStream both work. Handle the broken stream case." },
      {
        type: "compare", title: "Operator UI",
        left: { label: "Demo UI", items: ["Chat box only", "Spinner for 20 seconds", "No sources", "Errors in the console"] },
        right: { label: "Operator UI", items: ["Fits their workflow screen", "Streams, can be stopped", "Shows sources to check", "Clear errors and retry"] },
      },
      {
        type: "dodont", title: "How to answer",
        do: ["Start from the operator's task", "Mention loading and error states", "Keyboard and accessibility", "Validate on the server too"],
        dont: ["Trust client validation", "Load 50,000 rows", "Hide AI sources", "Block the UI while waiting"],
      },
      {
        type: "checklist", title: "Practise these",
        items: ["Form with schema validation", "Paginated, filterable table", "Streaming chat with stop", "Error and empty states", "Next.js route handler"],
      },
    ],
    takeaway: "Build for the operator's workflow, not for the demo.",
    points: ["Validate twice: client and server", "Page large tables on the server", "Stream, allow stop, show sources"],
    question: "What makes an internal AI tool feel trustworthy to operators?",
  },
  {
    slug: "data-engineering-questions",
    title: "Data engineering questions for FDEs.",
    sub: "ETL/ELT, schema contracts, data quality, CDC, Parquet.",
    hook: "Most FDE projects are data projects in disguise. The model is easy; getting the customer's data in, checked and kept fresh is the work. These are the questions I would expect.",
    slides: [
      {
        type: "list", title: "Questions and short answers",
        items: [
          { h: "ETL or ELT?", p: "ELT when the warehouse can transform. ETL when data must be cleaned first." },
          { h: "Schema contract?", p: "Agreed fields and types, checked in CI and at ingest." },
          { h: "CDC or polling?", p: "CDC for deletes and low latency. Polling for small daily syncs." },
          { h: "Why Parquet?", p: "Columnar, typed, compressed, cheap to scan." },
        ],
      },
      { type: "flow", title: "A pipeline you can defend", steps: ["Ingest raw, unchanged", "Validate against contract", "Quarantine bad rows", "Transform + test", "Publish with freshness check"] },
      {
        type: "table", title: "Quality checks that matter", headers: ["Check", "Catches"],
        rows: [
          ["Row count vs yesterday", "Missing or duplicate loads"],
          ["Null rate per column", "Upstream schema changes"],
          ["Freshness", "Stalled pipelines"],
          ["Uniqueness of keys", "Double processing"],
        ],
      },
      {
        type: "dodont", title: "How to answer",
        do: ["Make loads idempotent", "Keep raw data replayable", "Alert on freshness", "Name who owns each source"],
        dont: ["Fail the whole batch on one row", "Silently drop bad rows", "Append on every retry", "Ignore deletes"],
      },
      {
        type: "checklist", title: "Practise these",
        items: ["Design an incremental load", "Write a schema contract", "Explain CDC and WAL", "Partition Parquet by date", "Backfill without duplicates"],
      },
    ],
    takeaway: "Idempotent, validated and replayable is the bar.",
    points: ["Contracts catch upstream changes early", "Quarantine, do not drop, bad rows", "Every load safe to re-run"],
    question: "What breaks most often in your customer data pipelines?",
  },
  {
    slug: "cloud-and-devops-questions",
    title: "Cloud and DevOps questions for FDEs.",
    sub: "AWS, GCP, Azure, Docker, Kubernetes, Terraform, GitHub Actions.",
    hook: "You will be asked to deploy into a cloud you did not choose. Interviewers test whether you can map services across clouds and ship safely. These are the questions I would prepare.",
    slides: [
      {
        type: "list", title: "Questions and short answers",
        items: [
          { h: "EKS vs GKE vs AKS?", p: "Same Kubernetes. Identity, ingress and node scaling differ." },
          { h: "Keys in CI?", p: "None. OIDC federation from GitHub Actions to each cloud." },
          { h: "Terraform state?", p: "Remote, locked, and only applied from the pipeline." },
          { h: "Smaller images?", p: "Multi-stage builds, slim base, non-root user." },
        ],
      },
      {
        type: "table", title: "Map it on the whiteboard", headers: ["Need", "AWS", "GCP", "Azure"],
        rows: [
          ["Serverless containers", "ECS Fargate", "Cloud Run", "Container Apps"],
          ["Private DB access", "PrivateLink", "PSC", "Private endpoint"],
          ["Secrets", "Secrets Manager", "Secret Manager", "Key Vault"],
          ["Queue", "SQS", "Pub/Sub", "Service Bus"],
        ],
      },
      {
        type: "list", title: "Kubernetes follow-ups",
        items: [
          { h: "CrashLoopBackOff?", p: "Logs of the previous container, events, probes, config." },
          { h: "Safe rollout?", p: "Readiness probes, PDBs, canary, one-command rollback." },
          { h: "Requests and limits?", p: "Requests from measured usage, memory limit always." },
        ],
      },
      {
        type: "dodont", title: "How to answer",
        do: ["Draw the request path", "Name the identity per hop", "Explain rollback", "Mention cost"],
        dont: ["Recite service names only", "Apply from a laptop", "Ignore networking", "Assume one cloud"],
      },
      {
        type: "checklist", title: "Practise these",
        items: ["Map a stack across 3 clouds", "OIDC from Actions to a cloud", "Debug a CrashLoopBackOff", "Terraform module with remote state", "Canary and rollback plan"],
      },
    ],
    takeaway: "Know the patterns. Look up the service names.",
    points: ["Map services across clouds by behaviour", "No static keys in pipelines", "Always have a rollback"],
    question: "Which cloud would you pick for an AI workload, and why?",
  },
  {
    slug: "security-governance-questions",
    title: "Security and governance questions.",
    sub: "OAuth2, OIDC, JWT, RBAC, secrets, AI threats and PII.",
    hook: "Security review is where many AI deployments stall. FDE interviews test whether you can pass that review instead of fighting it. Here are the questions and the answers that build trust.",
    slides: [
      {
        type: "list", title: "Questions and short answers",
        items: [
          { h: "OAuth2 vs OIDC?", p: "OAuth2 grants access. OIDC adds identity on top." },
          { h: "Validating a JWT?", p: "Signature, issuer, audience, expiry, every request." },
          { h: "RBAC or ABAC?", p: "RBAC for roles. ABAC when access depends on the record." },
          { h: "Secrets?", p: "Vault plus workload identity. Nothing static." },
        ],
      },
      {
        type: "table", title: "AI threat model, short form", headers: ["Threat", "Control"],
        rows: [
          ["Prompt injection", "Least-privilege tools, approvals"],
          ["Data leakage", "Permission filter at retrieval"],
          ["PII exposure", "Redaction, minimisation, retention"],
          ["Over-permissive agent", "Scoped identity per tool"],
        ],
      },
      {
        type: "list", title: "Privacy follow-ups",
        items: [
          { h: "PII sent to an LLM?", p: "Minimise, mask, or use a model in their boundary." },
          { h: "Data residency?", p: "Region-pinned services, documented data flows." },
          { h: "Audit?", p: "Who asked what, which data, which tool, when." },
        ],
      },
      {
        type: "dodont", title: "How to answer",
        do: ["Draw trust boundaries", "Name the control per threat", "Bring security in early", "Offer evidence, not promises"],
        dont: ["\u201cThe model is safe\u201d", "Prompt-only defences", "Treat security as a blocker", "Store data you do not need"],
      },
      {
        type: "checklist", title: "Practise these",
        items: ["Explain an OIDC login flow", "Threat model a RAG assistant", "Defend against prompt injection", "Design a PII redaction step", "Write a data flow diagram"],
      },
    ],
    takeaway: "Make the security review easy to say yes to.",
    points: ["Know OAuth2, OIDC and JWT cold", "One control per named threat", "Minimise the data you touch"],
    question: "What question from a security team caught you off guard?",
  },
  {
    slug: "customer-and-product-thinking",
    title: "The customer questions in an FDE loop.",
    sub: "Stakeholder interviews, workflow mapping, scoping, demos and handoff.",
    hook: "The round that decides most FDE offers is not the coding round. It is the one where you show you can find the real problem, scope it, demo it and hand it over. Here is how I would prepare.",
    slides: [
      {
        type: "list", title: "Questions and short answers",
        items: [
          { h: "First week on site?", p: "Interview operators, map the workflow, find the baseline." },
          { h: "Stakeholder interview?", p: "Ask for the last real case, not the ideal process." },
          { h: "Scope creep?", p: "Written scope, change requests with trade-offs." },
          { h: "A good demo?", p: "Their data, their workflow, and an honest failure case." },
        ],
      },
      { type: "flow", title: "Engagement arc", steps: ["Interview + shadow", "Map workflow + baseline", "Scope one slice", "Build + demo weekly", "Handoff + adoption metrics"] },
      {
        type: "table", title: "Adoption metrics", headers: ["Metric", "Why it matters"],
        rows: [
          ["Weekly active operators", "Are they choosing it?"],
          ["Override rate", "Do they trust the output?"],
          ["Time per case", "Is the work faster?"],
          ["Tickets after handoff", "Can they run it alone?"],
        ],
      },
      {
        type: "dodont", title: "How to answer",
        do: ["Use a real story, with numbers", "Say what you said no to", "Name the decision owner", "Plan the handoff from day one"],
        dont: ["Only talk about tech", "Promise everything", "Demo on sample data", "Leave without a runbook"],
      },
      {
        type: "checklist", title: "Practise these",
        items: ["A stakeholder interview, role-played", "Map a workflow in 10 minutes", "Turn notes into a one-page scope", "Five-minute demo with a failure case", "Define three adoption metrics"],
      },
    ],
    takeaway: "Find the real problem, scope it small, and hand it over well.",
    points: ["Interview operators, not just sponsors", "Scope one slice with a baseline", "Measure adoption after handoff"],
    question: "Which customer skill was hardest for you to learn as an engineer?",
  },
];
