// FDE scenario drills. Every scenario is a fictional interview exercise, not a customer engagement.

module.exports = [
  {
    slug: "the-email-that-gave-orders",
    title: "The email that gave the agent orders.",
    sub: "Scenario: an inbox agent forwards a contract to an outside address.",
    hook: "A classic forward deployed interview scenario. Your agent triages a shared inbox. One inbound email contains a line telling the assistant to forward the latest contract externally, and it does. Walk through what you do in the first hour and what you change for good.",
    slides: [
      {
        type: "list", title: "First hour",
        items: [
          { h: "Contain", p: "Disable the send tool with a flag. Keep reading and drafting." },
          { h: "Scope", p: "Search tool-call logs for every external send this week." },
          { h: "Tell the customer", p: "Security contact first, with facts, not guesses." },
          { h: "Preserve evidence", p: "Prompt, retrieved content, tool calls, timestamps." },
        ],
      },
      { type: "quote", label: "Root cause", text: "The model treated data as instructions.", sub: "No prompt fully prevents that. The fix is what the agent is allowed to do." },
      {
        type: "compare", title: "The design change",
        left: { label: "Before", items: ["Send tool always available", "Any recipient allowed", "Email text mixed into instructions", "No approval step"] },
        right: { label: "After", items: ["Drafts only by default", "Recipient allowlist in code", "Untrusted content clearly marked", "Human approves external sends"] },
      },
      {
        type: "list", title: "Prove it is fixed",
        items: [
          { h: "Red-team set", p: "Hidden instructions in email, PDF and web content." },
          { h: "Eval in CI", p: "Injection cases must never call a write tool." },
          { h: "Alert", p: "On any blocked external send attempt." },
        ],
      },
      {
        type: "checklist", title: "What interviewers listen for",
        items: ["Contain before you debug", "Customer told early", "Fix in architecture, not prompt", "Least-privilege tools", "Evidence the fix holds"],
      },
    ],
    takeaway: "Limit what injected text can do, not just what it can say.",
    points: ["Turn off the risky tool first", "Treat retrieved content as untrusted", "Approval gates for writes and sends"],
    question: "How would you test an agent for indirect prompt injection?",
  },
  {
    slug: "forty-pods-zero-connections",
    title: "Forty pods, zero database connections.",
    sub: "Scenario: autoscaling turned a traffic spike into an outage.",
    hook: "Month-end traffic arrives, the HPA scales the API from 4 to 40 pods, and every request starts failing with connection errors from managed PostgreSQL. The database is healthy. What happened, and how do you stop it happening again?",
    slides: [
      { type: "flow", title: "How it unfolded", steps: ["Traffic spike", "HPA: 4 \u2192 40 pods", "40 pools \u00d7 20 connections", "max_connections exceeded", "Every new request fails"] },
      {
        type: "list", title: "Stabilise",
        items: [
          { h: "Cap replicas", p: "Lower HPA max to what the database can serve." },
          { h: "Shrink pools", p: "Fewer connections per pod, shorter idle timeout." },
          { h: "Shed load", p: "Return 503 with Retry-After instead of queueing forever." },
        ],
      },
      {
        type: "table", title: "Add a pooler", headers: ["Cloud", "Option"],
        rows: [
          ["AWS", "RDS Proxy or PgBouncer"],
          ["GCP", "PgBouncer, or managed pooling where available"],
          ["Azure", "Built-in PgBouncer on flexible server"],
        ],
      },
      { type: "quote", label: "The lesson", text: "Scale the app and the database together.", sub: "Every replica is also a set of database connections. Budget them." },
      {
        type: "checklist", title: "Prevent it",
        items: ["Connection budget per service", "HPA max tied to that budget", "Load test at month-end volume", "Alert at 80% of max connections", "Runbook for connection storms"],
      },
    ],
    takeaway: "Every pod you add is also a set of database connections.",
    points: ["Cap autoscaling to what dependencies can take", "Put a pooler in front of Postgres", "Load test the real peak"],
    question: "What is the dependency your autoscaler forgets about?",
  },
  {
    slug: "the-pod-that-could-not-reach-the-llm",
    title: "The pod that could not reach the LLM.",
    sub: "Scenario: works on your laptop, times out in their cluster.",
    hook: "The demo worked from your laptop. In the customer's private cluster, every call to the model API times out after 30 seconds. Nothing in the app changed. Here is how I would walk an interviewer through it.",
    slides: [
      { type: "flow", title: "Walk the path out", steps: ["DNS resolves the API host?", "Route to NAT or proxy?", "Egress allows 443?", "Corporate proxy intercepting TLS?", "Domain on the allowlist?"], note: "Run each check from inside the pod with nslookup and curl -v, not from your laptop." },
      {
        type: "list", title: "What it usually is",
        items: [
          { h: "No NAT route", p: "Private subnet with no NAT gateway or Cloud NAT." },
          { h: "Forced proxy", p: "Egress must go through a proxy the app does not use." },
          { h: "TLS inspection", p: "Proxy re-signs certificates the client does not trust." },
          { h: "Allowlist", p: "The provider domain was never approved." },
        ],
      },
      {
        type: "compare", title: "Fix options",
        left: { label: "Quick", items: ["Set HTTPS_PROXY for the app", "Add the corporate CA bundle", "Request the domain allowlist"] },
        right: { label: "Better", items: ["Private connectivity to the model", "Model endpoint in their cloud", "Egress via one audited gateway"] },
      },
      { type: "quote", label: "The question to ask on day one", text: "\u201cHow does traffic leave this network?\u201d", sub: "Asking in week one saves the go-live day." },
      {
        type: "checklist", title: "What interviewers listen for",
        items: ["Systematic, layer by layer", "Tests from inside the workload", "Knows proxies and TLS inspection", "Offers a quick fix and a better one", "Prevents it in the next project"],
      },
    ],
    takeaway: "Ask how traffic leaves the network before you build.",
    points: ["Debug from inside the pod", "Check DNS, route, rule, proxy, allowlist", "Prefer private model endpoints"],
    question: "What was the strangest network blocker you have hit on a customer site?",
  },
  {
    slug: "personal-data-in-the-logs",
    title: "Security found personal data in our logs.",
    sub: "Scenario: full prompts with customer emails were logged at INFO.",
    hook: "During a review, the customer's security team finds full prompts, including names and email addresses, in your application logs. They want answers today. How do you respond, and what do you change?",
    slides: [
      {
        type: "list", title: "Today",
        items: [
          { h: "Stop the leak", p: "Redaction in the pipeline, then a hotfix to stop logging prompts." },
          { h: "Scope it", p: "Which services, since when, which log stores, who has access." },
          { h: "Purge", p: "With the customer, under their retention and legal rules." },
          { h: "Report", p: "Written timeline, cause and fixes, same day." },
        ],
      },
      {
        type: "compare", title: "What we log now",
        left: { label: "Before", items: ["Full prompt and response", "Email addresses", "Raw tool arguments", "Debug level in production"] },
        right: { label: "After", items: ["Request id and trace id", "Token counts and latency", "Hashed or masked fields", "Prompt capture opt-in, short retention"] },
      },
      { type: "flow", title: "Defence in depth", steps: ["Log ids, not payloads", "Redact in the collector", "Restrict log access", "Short retention", "Test for leaks in CI"] },
      { type: "quote", label: "The lesson", text: "Logs are a data store. Treat them like one.", sub: "Same classification, access control and retention as the database." },
      {
        type: "checklist", title: "What interviewers listen for",
        items: ["Urgency without panic", "Customer kept informed", "Fix the source, not only the symptom", "Retention and access considered", "A test so it cannot return"],
      },
    ],
    takeaway: "If you would not store it in the database, do not log it.",
    points: ["Log identifiers, not content", "Redact centrally, before export", "Add a test that fails on leaks"],
    question: "Does your team test logs for personal data?",
  },
  {
    slug: "the-cdc-slot-that-filled-the-disk",
    title: "The CDC slot that filled the disk.",
    sub: "Scenario: the source database ran out of storage on a Sunday.",
    hook: "You set up change data capture from the customer's PostgreSQL into the analytics pipeline. Two weeks later their production database runs out of disk. The cause is your replication slot. What happened, and how do you make CDC safe?",
    slides: [
      { type: "flow", title: "How it happened", steps: ["CDC consumer crashes", "Replication slot stops advancing", "PostgreSQL keeps the WAL", "WAL grows for days", "Disk full, writes fail"] },
      {
        type: "list", title: "Recover",
        items: [
          { h: "Free space safely", p: "Restart the consumer, or drop the slot with the DBA's approval." },
          { h: "Resnapshot", p: "If the slot is dropped, take a new consistent snapshot." },
          { h: "Reconcile", p: "Row counts and checksums between source and target." },
        ],
      },
      {
        type: "list", title: "Make CDC safe",
        items: [
          { h: "Alert on slot lag", p: "Retained WAL size, well before the disk limit." },
          { h: "Cap retained WAL", p: "max_slot_wal_keep_size where the service allows it." },
          { h: "Idempotent apply", p: "Upsert by key, skip changes with an older LSN." },
          { h: "Own the runbook", p: "Agree with the DBA who acts, and when." },
        ],
      },
      { type: "quote", label: "The lesson", text: "Your pipeline can take down their database.", sub: "A stalled reader is a production risk on the source system." },
      {
        type: "checklist", title: "What interviewers listen for",
        items: ["Understands WAL and slots", "Involves the customer DBA", "Plans for duplicates and gaps", "Monitors the source, not just the target", "Reconciles after recovery"],
      },
    ],
    takeaway: "Monitor the source database, not just your pipeline.",
    points: ["Alert on replication slot lag", "Make the apply step idempotent", "Agree the recovery runbook upfront"],
    question: "Have you ever had a pipeline harm the system it reads from?",
  },
  {
    slug: "porting-gke-to-eks",
    title: "Built on GKE. Customer runs EKS.",
    sub: "Scenario: two weeks to move a working deployment to another cloud.",
    hook: "Your reference deployment runs on GKE. The new customer is AWS-only and wants it in their EKS cluster in two weeks. What changes, what stays, and in what order do you do it?",
    slides: [
      {
        type: "table", title: "What changes", headers: ["Piece", "GKE", "EKS"],
        rows: [
          ["Pod identity", "Workload Identity Fed.", "Pod Identity / IRSA"],
          ["Registry", "Artifact Registry", "ECR"],
          ["Ingress", "GKE Gateway", "AWS LB Controller"],
          ["Node scaling", "GKE autoscaler", "Karpenter or CA"],
          ["Secrets", "Secret Manager", "Secrets Manager"],
        ],
      },
      {
        type: "list", title: "What stays",
        items: [
          { h: "Images and charts", p: "Same containers, cloud values in an overlay." },
          { h: "Database schema", p: "PostgreSQL and pgvector on RDS instead of Cloud SQL." },
          { h: "Telemetry", p: "OpenTelemetry to whichever backend they run." },
        ],
      },
      { type: "flow", title: "Two-week plan", steps: ["Access + network review", "Terraform module for AWS", "Deploy to their dev", "Replay eval set", "Staging, then production"] },
      { type: "quote", label: "The risk", text: "Identity and networking eat the schedule.", sub: "Start access requests and firewall changes on day one, in parallel." },
      {
        type: "checklist", title: "What interviewers listen for",
        items: ["Separates portable from cloud-specific", "Front-loads access requests", "Re-runs evals after the port", "Honest about timeline risk", "Leaves a reusable module behind"],
      },
    ],
    takeaway: "Port the edges, keep the core, and start access on day one.",
    points: ["Isolate cloud specifics in overlays", "Request access in parallel", "Prove it with the same eval set"],
    question: "What took longest the last time you moved a workload between clouds?",
  },
  {
    slug: "the-bottleneck-nobody-asked-about",
    title: "The bottleneck nobody asked about.",
    sub: "Scenario: they asked you to automate the 3-minute step.",
    hook: "The customer wants AI to draft claim summaries, which takes 3 minutes per case. Your workflow map shows each case waits 40 minutes for a manual data lookup in another team. What do you do with that finding?",
    slides: [
      { type: "flow", title: "The mapped workflow", steps: ["Claim arrives", "Wait for lookup: 40 min", "Agent reviews: 10 min", "Draft summary: 3 min", "Approve and send"], note: "Timed from a week of real cases, not from the process document." },
      {
        type: "compare", title: "Two options",
        left: { label: "As asked", items: ["Automate the summary", "Saves about 3 min a case", "Easy to demo", "Wait time unchanged"] },
        right: { label: "Bottleneck first", items: ["Automate the data lookup", "Saves up to 40 min a case", "Needs another team's API", "Harder, bigger win"] },
      },
      {
        type: "list", title: "How I raise it",
        items: [
          { h: "Show the map", p: "Timings and evidence, no blame on the other team." },
          { h: "Offer both", p: "Do the requested step, and scope the bottleneck." },
          { h: "Let them choose", p: "Write down the decision and the success metric." },
        ],
      },
      { type: "quote", label: "The lesson", text: "Automating the wrong step is fast and useless.", sub: "The customer decides, but they should decide with the timings in front of them." },
      {
        type: "checklist", title: "What interviewers listen for",
        items: ["Maps the real workflow", "Uses measured timings", "Raises it diplomatically", "Respects the customer's call", "Ties success to a metric"],
      },
    ],
    takeaway: "Map the workflow before you accept the ask.",
    points: ["Time the real process", "Show the trade-off with numbers", "Let the customer decide, in writing"],
    question: "Have you ever been asked to automate the wrong step?",
  },
  {
    slug: "the-demo-that-hit-real-data",
    title: "The demo that met real data.",
    sub: "Scenario: perfect on samples, wrong on their documents.",
    hook: "Your RAG assistant answered every sample question in the sales demo. On the customer's real document set, half the answers cite the wrong policy version. The executive review is in five days. How do you recover?",
    slides: [
      {
        type: "list", title: "Diagnose with evidence",
        items: [
          { h: "Build an eval set", p: "50 real questions with answers their experts agree on." },
          { h: "Split the failures", p: "Retrieval missed, wrong version, or bad generation." },
          { h: "Read the documents", p: "Duplicates, old versions, scanned PDFs, tables." },
        ],
      },
      {
        type: "table", title: "What it usually is", headers: ["Failure", "Fix"],
        rows: [
          ["Old versions retrieved", "Effective-date metadata + filter"],
          ["Tables lost in parsing", "Layout-aware parser"],
          ["Exact terms missed", "Hybrid search + re-ranking"],
          ["Confident wrong answers", "Cite or decline"],
        ],
      },
      { type: "flow", title: "Five days", steps: ["Day 1: eval set + baseline", "Day 2: metadata + filters", "Day 3: hybrid + re-rank", "Day 4: re-run evals", "Day 5: honest readout"] },
      { type: "quote", label: "The readout", text: "Show the before and after, and what still fails.", sub: "Executives trust a measured 82% with known gaps more than a perfect demo." },
      {
        type: "checklist", title: "What interviewers listen for",
        items: ["Measures before fixing", "Separates retrieval from generation", "Fixes the data, not only the prompt", "Honest about what remains", "Leaves an eval set behind"],
      },
    ],
    takeaway: "Demos use samples. Production uses their documents.",
    points: ["Build the eval set from real questions", "Fix retrieval and metadata first", "Report what still fails"],
    question: "What broke first when your demo met real customer data?",
  },
];
