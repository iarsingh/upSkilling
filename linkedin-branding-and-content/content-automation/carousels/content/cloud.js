// Multi-cloud FDE stack: the same customer architecture mapped across AWS, GCP and Azure.

module.exports = [
  {
    slug: "one-architecture-three-clouds",
    title: "One architecture, three clouds.",
    sub: "The app is portable. Identity, networking and secrets are not.",
    hook: "Forward deployed engineers rarely get to pick the cloud. The customer already has one. Here is the service map I keep for AWS, GCP and Azure, and the rows where a straight rename will break your deployment.",
    slides: [
      {
        type: "table", title: "The service map", headers: ["Need", "AWS", "GCP", "Azure"],
        rows: [
          ["Kubernetes", "EKS", "GKE", "AKS"],
          ["Objects", "S3", "Cloud Storage", "Blob Storage"],
          ["PostgreSQL", "RDS", "Cloud SQL", "Azure DB for PG"],
          ["Secrets", "Secrets Manager", "Secret Manager", "Key Vault"],
          ["Queues", "SQS", "Pub/Sub", "Service Bus"],
          ["Identity", "IAM", "Cloud IAM", "Entra ID"],
        ],
      },
      {
        type: "compare", title: "What ports and what does not",
        left: { label: "Portable", items: ["Containers and Helm charts", "PostgreSQL schema + pgvector", "OpenTelemetry instrumentation", "Application code"] },
        right: { label: "Per cloud", items: ["Workload identity", "Private networking", "Secrets wiring", "Queue delivery semantics"] },
      },
      {
        type: "list", title: "Where renames break",
        items: [
          { h: "Networks", p: "A GCP VPC is global. AWS VPCs and Azure VNets are regional." },
          { h: "Queues", p: "Ordering, dedup and retry rules differ per service." },
          { h: "Identity", p: "IAM roles, service accounts and managed identities behave differently." },
          { h: "Postgres extensions", p: "Azure needs vector allowlisted before CREATE EXTENSION." },
        ],
      },
      { type: "quote", label: "The honest answer", text: "\u201cIt runs anywhere\u201d needs a tested Terraform module per cloud.", sub: "Say which clouds you have actually deployed, and what a port costs in weeks." },
      {
        type: "checklist", title: "Before you promise a cloud",
        items: ["Mapping table with differences per row", "Terraform module per cloud", "Workload identity tested", "Private endpoints tested", "Deploy rehearsed in their account"],
      },
    ],
    takeaway: "Keep the app neutral. Make the cloud edges explicit.",
    points: ["Map every managed service, row by row", "Call out behaviour, not just names", "Only promise clouds you have tested"],
    question: "Which cloud service surprised you most when you ported a deployment?",
  },
  {
    slug: "identity-across-clouds",
    title: "Identity is the first integration.",
    sub: "IAM, Cloud IAM and Entra ID, without a single static key.",
    hook: "The first week of most deployments is spent waiting for access. Knowing how identity works on each cloud, for people, pods and pipelines, is how you shorten that week and pass the security review.",
    slides: [
      {
        type: "table", title: "Pods without keys", headers: ["Cloud", "Mechanism"],
        rows: [
          ["AWS EKS", "EKS Pod Identity or IRSA"],
          ["GCP GKE", "Workload Identity Federation"],
          ["Azure AKS", "Entra Workload ID"],
          ["CI/CD", "GitHub OIDC federation"],
        ],
      },
      {
        type: "list", title: "Users: OAuth2, OIDC and JWT",
        items: [
          { h: "OIDC for sign-in", p: "Use the customer identity provider. Never build your own login." },
          { h: "Validate every JWT", p: "Signature, issuer, audience and expiry, on every request." },
          { h: "Short-lived tokens", p: "Minutes for access tokens, refresh through the provider." },
          { h: "Authorisation in your code", p: "Map groups to roles, then check the resource itself." },
        ],
      },
      {
        type: "compare", title: "RBAC done right",
        left: { label: "Common", items: ["One admin role for the service", "Role checks only in the UI", "Shared service account", "Keys in a .env file"] },
        right: { label: "Better", items: ["Roles per job to be done", "Checks in the API layer", "One identity per workload", "Federated, short-lived credentials"] },
      },
      { type: "quote", label: "Interview scenario", text: "\u201cWe cannot give you a service account key.\u201d", sub: "Good. Ask for workload identity instead: no key to leak, rotate or explain at audit." },
      {
        type: "checklist", title: "Identity checklist",
        items: ["SSO through their identity provider", "JWT validation tested with bad tokens", "One cloud identity per workload", "Least-privilege roles, reviewed", "No long-lived keys anywhere"],
      },
    ],
    takeaway: "If a credential can be copied, assume it will be.",
    points: ["Federate pods and pipelines", "Validate JWTs fully, every time", "Authorise on the resource, not the screen"],
    question: "How long did your last project wait for cloud access?",
  },
  {
    slug: "networking-vpc-vnet",
    title: "VPC, firewall rules, VNet.",
    sub: "Most first deployments fail on the network, not the code.",
    hook: "The service starts, the health check passes, and then every call to the database or the LLM API times out. Here is how networking differs across the three clouds and how I debug it.",
    slides: [
      {
        type: "table", title: "Same idea, different rules", headers: ["", "Scope", "Filtering"],
        rows: [
          ["AWS VPC", "Regional", "Security groups + NACLs"],
          ["GCP VPC", "Global", "Firewall rules by tag or SA"],
          ["Azure VNet", "Regional", "NSGs on subnet or NIC"],
        ],
      },
      {
        type: "list", title: "Keep managed services private",
        items: [
          { h: "AWS", p: "VPC endpoints: gateway for S3, interface via PrivateLink." },
          { h: "GCP", p: "Private Google Access or Private Service Connect." },
          { h: "Azure", p: "Private endpoints with private DNS zones." },
          { h: "Egress", p: "NAT gateway or Cloud NAT, with an allowlist." },
        ],
      },
      { type: "flow", title: "Debugging a timeout", steps: ["DNS resolves?", "Route to target?", "Egress rule allows 443?", "Proxy or firewall?", "curl -v from the pod"], note: "Test from inside the workload. A laptop on the VPN proves nothing about the pod." },
      {
        type: "dodont", title: "Network habits",
        do: ["Deny inbound by default", "Private endpoints for data", "Flow logs on during go-live", "Write down every allowlisted domain"],
        dont: ["Public database endpoints", "0.0.0.0/0 to fix it fast", "Assume the LLM API is reachable", "Debug from your laptop"],
      },
      {
        type: "checklist", title: "Ask on day one",
        items: ["Is egress forced through a proxy?", "Which domains are allowlisted?", "Private endpoints required?", "Who changes firewall rules?", "How long does a change take?"],
      },
    ],
    takeaway: "Ask about egress before you write the first line of code.",
    points: ["Know regional vs global scope", "Private endpoints for managed data", "Debug from inside the pod"],
    question: "What is the longest you have waited for a firewall change?",
  },
  {
    slug: "secrets-across-clouds",
    title: "Secrets: one pattern, three vaults.",
    sub: "Secrets Manager, Secret Manager and Key Vault.",
    hook: "Every customer has a vault. The mistakes are the same everywhere: keys in env files, secrets read once at startup, and rotation nobody has tested. Here is the pattern I use on all three clouds.",
    slides: [
      {
        type: "table", title: "The three vaults", headers: ["Service", "Worth knowing"],
        rows: [
          ["AWS Secrets Manager", "Built-in rotation, managed for RDS"],
          ["GCP Secret Manager", "Versions + rotation reminders via Pub/Sub"],
          ["Azure Key Vault", "Secrets, keys and certs; use RBAC mode"],
        ],
      },
      { type: "flow", title: "Into the pod, no keys", steps: ["Workload identity", "CSI driver or External Secrets", "Mounted file", "App re-reads on failure"], note: "Files can update on rotation. Environment variables cannot, and they leak into crash dumps." },
      {
        type: "list", title: "Rotation without downtime",
        items: [
          { h: "Two valid credentials", p: "Create the new one while the old still works." },
          { h: "Re-read on auth failure", p: "Not only at startup." },
          { h: "Confirm in logs", p: "Nothing still uses the old credential." },
          { h: "Then revoke", p: "And record when and who." },
        ],
      },
      {
        type: "dodont", title: "Secret hygiene",
        do: ["One secret per purpose", "Audit log reviewed", "Soft delete and purge protection", "Rotation rehearsed in staging"],
        dont: ["Secrets in Git or images", "Secrets in logs or traces", "One shared admin password", "Rotation as a launch-day surprise"],
      },
      {
        type: "checklist", title: "Secrets review",
        items: ["No static cloud keys", "Secrets mounted as files", "Rotation tested end to end", "Access scoped per workload", "Break-glass path documented"],
      },
    ],
    takeaway: "A secret you have never rotated is a secret you cannot rotate.",
    points: ["Use workload identity to reach the vault", "Re-read secrets, do not cache forever", "Rehearse rotation before go-live"],
    question: "When did you last rotate a production database password?",
  },
  {
    slug: "queues-sqs-pubsub-service-bus",
    title: "SQS, Pub/Sub, Service Bus.",
    sub: "Same job, different delivery guarantees.",
    hook: "Document pipelines, agent jobs and CDC all end up on a queue. The service names map cleanly across clouds; the delivery semantics do not. Build for at-least-once and you will be fine on all three.",
    slides: [
      {
        type: "table", title: "What each one gives you", headers: ["Service", "Ordering", "Notes"],
        rows: [
          ["SQS standard", "Best effort", "Visibility timeout, DLQ"],
          ["SQS FIFO", "Per group", "Dedup window"],
          ["Pub/Sub", "Ordering keys", "Fan-out, exactly-once option"],
          ["Service Bus", "Sessions", "Peek-lock, dup detection"],
        ],
      },
      {
        type: "list", title: "Rules that hold everywhere",
        items: [
          { h: "Idempotent consumers", p: "A processed-message key makes replays harmless." },
          { h: "Timeout above p99", p: "Visibility, ack deadline or lock beyond real processing time." },
          { h: "Dead-letter queue", p: "With an alert on depth and oldest message age." },
          { h: "Small messages", p: "Put the document in object storage and send a pointer." },
        ],
      },
      { type: "flow", title: "A safe document pipeline", steps: ["Upload to object storage", "Event to queue", "Worker claims message", "Process + write result", "Ack or dead-letter"] },
      { type: "quote", label: "Interview scenario", text: "\u201cSome invoices were processed twice.\u201d", sub: "Processing took longer than the visibility timeout, so the message came back. Raise it, and make the write idempotent." },
      {
        type: "checklist", title: "Queue review",
        items: ["Delivery semantics written down", "Idempotency key on every write", "Timeout set from measured p99", "DLQ with alerting and redrive", "Payloads in storage, not the queue"],
      },
    ],
    takeaway: "Design for at-least-once and every cloud's queue works.",
    points: ["Make consumers idempotent", "Set timeouts from real processing time", "Alert on the dead-letter queue"],
    question: "Have you ever been bitten by a message processed twice?",
  },
  {
    slug: "managed-postgres-pgvector",
    title: "Managed Postgres for RAG.",
    sub: "RDS, Cloud SQL, Azure Database for PostgreSQL, plus pgvector.",
    hook: "For most enterprise RAG pilots, the customer's managed PostgreSQL with pgvector is enough. No new vendor, no new security review. Here is what differs across the three clouds.",
    slides: [
      {
        type: "table", title: "Managed PostgreSQL", headers: ["", "HA", "Passwordless auth"],
        rows: [
          ["AWS RDS", "Multi-AZ", "RDS IAM auth"],
          ["GCP Cloud SQL", "Regional HA", "IAM DB auth + Auth Proxy"],
          ["Azure DB for PG", "Zone-redundant HA", "Entra ID auth"],
        ],
      },
      {
        type: "list", title: "pgvector in practice",
        items: [
          { h: "Check the version", p: "HNSW indexes need pgvector 0.5.0 or later." },
          { h: "Azure first step", p: "Allowlist vector in azure.extensions." },
          { h: "Hybrid search", p: "Combine full-text and vector scores, then re-rank." },
          { h: "Filter by tenant", p: "Permissions in the WHERE clause, not after." },
        ],
      },
      {
        type: "compare", title: "When pgvector is enough",
        left: { label: "Stay on Postgres", items: ["Up to millions of chunks", "Need joins and filters", "Customer runs Postgres", "One fewer security review"] },
        right: { label: "Look further", items: ["Hundreds of millions of vectors", "Strict latency at high QPS", "Heavy multi-tenant search", "Search team already exists"] },
      },
      { type: "quote", label: "Interview scenario", text: "Scaled to 40 pods. Database refused connections.", sub: "Every pod brought its own pool. Add a pooler, shrink pools and cap autoscaling." },
      {
        type: "checklist", title: "Database go-live",
        items: ["Private networking only", "Passwordless auth per service", "Pooler in front of the database", "Backups and restore tested", "Index and recall measured"],
      },
    ],
    takeaway: "Use the database they already trust before adding a new one.",
    points: ["pgvector covers most pilots", "Filter by permission in the query", "Pool connections before you scale"],
    question: "Postgres with pgvector or a dedicated vector database for your last project?",
  },
  {
    slug: "observability-otel-prometheus-grafana",
    title: "See it before the customer does.",
    sub: "OpenTelemetry, Prometheus, Grafana and structured logs.",
    hook: "In a customer deployment you often cannot SSH in, and you may not own the dashboards. Instrumentation is how you answer the 2am call. This is the stack I use, and it is the same on every cloud.",
    slides: [
      { type: "flow", title: "One telemetry path", steps: ["App + OpenTelemetry SDK", "OTLP to Collector", "Redact + sample", "Prometheus / traces / logs", "Grafana + alerts"], note: "The collector keeps backends swappable, and redacts personal data before it leaves the network." },
      {
        type: "list", title: "Signals for an AI service",
        items: [
          { h: "RED for the API", p: "Request rate, error rate, p95 latency per route." },
          { h: "LLM calls", p: "Latency, errors, tokens and cost by provider and model." },
          { h: "Quality", p: "Retrieval hit rate, guardrail blocks, human overrides." },
          { h: "Dependencies", p: "Database pool, queue depth, oldest message age." },
        ],
      },
      {
        type: "code", title: "Two queries worth knowing", lang: "promql",
        code: "# error ratio\nsum(rate(http_requests_total{status=~\"5..\"}[5m]))\n  / sum(rate(http_requests_total[5m]))\n\n# p95 latency\nhistogram_quantile(0.95,\n  sum by (le) (\n    rate(http_request_duration_seconds_bucket[5m])))",
      },
      {
        type: "dodont", title: "Telemetry habits",
        do: ["JSON logs with trace_id", "Labels with few values", "Alert on SLO burn rate", "Runbook link on every alert"],
        dont: ["user_id as a metric label", "Raw prompts in spans", "Alert on every error", "Dashboards nobody owns"],
      },
      {
        type: "checklist", title: "Before go-live",
        items: ["Traces across every hop", "SLOs agreed with the customer", "Burn-rate alerts routed", "PII redacted in the collector", "Runbooks tested in a game day"],
      },
    ],
    takeaway: "If you cannot see it, you cannot support it.",
    points: ["One OpenTelemetry pipeline, any backend", "Watch AI quality, not just uptime", "Redact before data leaves the network"],
    question: "What is the one metric you add to every AI service?",
  },
  {
    slug: "delivery-github-actions-terraform",
    title: "Ship to any cloud from one pipeline.",
    sub: "Docker, GitHub Actions, Terraform and Kubernetes, without stored keys.",
    hook: "The delivery path is where multi-cloud gets real. One image, one pipeline, and a Terraform module per cloud. Here is the setup I use to deploy into AWS, GCP or Azure with short-lived credentials only.",
    slides: [
      { type: "flow", title: "Build once, promote", steps: ["PR: lint, tests, build", "Merge: build + scan image", "Tag with commit SHA", "Deploy dev, run evals", "Approve staging, then prod"] },
      {
        type: "table", title: "Keyless auth from Actions", headers: ["Cloud", "Action", "Trust"],
        rows: [
          ["AWS", "configure-aws-credentials", "IAM role, OIDC"],
          ["GCP", "google-github-actions/auth", "Workload Identity Fed."],
          ["Azure", "azure/login", "Federated credential"],
        ],
      },
      {
        type: "list", title: "Terraform per cloud",
        items: [
          { h: "Shared interface", p: "Same inputs and outputs for every cloud module." },
          { h: "Remote state", p: "S3, GCS or Azure Storage, with locking." },
          { h: "Plan in CI", p: "Apply only from the pipeline, never a laptop." },
          { h: "Drift check", p: "A scheduled plan that alerts on changes." },
        ],
      },
      {
        type: "dodont", title: "Pipeline hardening",
        do: ["permissions: read by default", "Pin actions to a commit SHA", "Environments with reviewers", "Concurrency per environment"],
        dont: ["Cloud keys in repo secrets", "Untrusted input in run scripts", "Rebuild the image per stage", "terraform apply from a laptop"],
      },
      {
        type: "checklist", title: "Delivery review",
        items: ["OIDC to every cloud", "Same image in every stage", "Evals gate the promotion", "Rollback is one command", "Plan output reviewed on PRs"],
      },
    ],
    takeaway: "Promote the same image. Change only the cloud edge.",
    points: ["Federate GitHub Actions to each cloud", "One Terraform interface, many modules", "Never apply from a laptop"],
    question: "Does your pipeline still use a long-lived cloud key?",
  },
];
