module.exports = [
  {
    slug: "shift-left-security-in-ci-cd",
    title: "Shift-left security in CI/CD.",
    sub: "Block new risk. Burn down old risk. Never the other way round.",
    hook: "Adding SAST, SCA and DAST to a pipeline is the easy part. Keeping developers from routing around them is the real work. This is the layout I use.",
    slides: [
      { type: "flow", title: "Where each scan runs", steps: ["Commit", "Secret scan", "SAST", "SCA", "IaC scan", "Image scan", "DAST in staging", "Deploy"], note: "Fast checks on every PR. Slow checks nightly or in staging." },
      {
        type: "table", title: "What blocks a merge", headers: ["Scan", "Stage", "Blocks on"],
        rows: [
          ["Secrets", "Pre-commit + PR", "Any verified secret"],
          ["SAST", "PR", "New high / critical"],
          ["SCA", "PR + nightly", "Critical CVE with a fix"],
          ["IaC", "PR", "Public storage, open ports"],
          ["Image", "Build", "Critical OS CVEs"],
          ["DAST", "Staging", "High findings"],
        ],
      },
      {
        type: "dodont", title: "Managing the noise",
        do: ["Baseline existing findings", "Block only new issues", "Fix SLAs by severity", "Route findings to the owning team"],
        dont: ["Block every medium on day one", "Security as the only triager", "Exceptions without expiry", "Separate tools per team"],
      },
      {
        type: "list", title: "Make it stick",
        items: [
          { h: "Pipeline templates", p: "Teams extend a shared template instead of copying scans." },
          { h: "Exceptions with expiry", p: "Every waiver has an owner and an end date." },
          { h: "Per-team dashboards", p: "Open criticals and age, visible to the team." },
          { h: "One metric", p: "Time to fix critical findings." },
        ],
      },
      {
        type: "checklist", title: "Pipeline security baseline",
        items: ["Secret scanning on every push", "SAST and SCA on every PR", "IaC scanning for Terraform", "Signed, scanned images", "DAST against staging", "Findings routed to owners", "Exceptions expire"],
      },
    ],
    takeaway: "Security that blocks only new risk is security developers keep.",
    points: ["Right scan, right stage", "Baseline, then block new findings", "Templates over copy-paste"],
    question: "Which scan generates the most noise in your pipeline?",
  },
  {
    slug: "policy-as-code-with-opa",
    title: "Policy as code with OPA.",
    sub: "A policy without a clear error message is a ticket generator.",
    hook: "Written standards nobody enforces become tribal knowledge. Policy as code turns them into checks that run in CI and at the cluster door \u2014 with the same rules in both places.",
    slides: [
      {
        type: "list", title: "Worth enforcing first",
        items: [
          { h: "No privileged containers", p: "And no host networking or hostPath mounts." },
          { h: "Approved registries only", p: "Images come from your registry." },
          { h: "Required labels", p: "owner and cost-center on every workload." },
          { h: "Requests set, no :latest", p: "Predictable scheduling and rollbacks." },
        ],
      },
      { type: "flow", title: "Two enforcement points", steps: ["PR: conftest on manifests", "Merge", "GitOps apply", "Gatekeeper admission", "Admit or deny + audit"], note: "Same Rego in CI and in the cluster. CI gives fast feedback, admission is the backstop." },
      {
        type: "code", title: "A readable rule", lang: "rego",
        code: `package main

import rego.v1

deny contains msg if {
  some c in input.spec.template.spec.containers
  not startswith(c.image, "acr.example.io/")
  msg := sprintf(
    "%s: use an image from acr.example.io",
    [c.name],
  )
}`,
        note: "The message tells the developer how to fix it, not just that they failed.",
      },
      { type: "flow", title: "Rolling out a new policy", steps: ["Audit only", "Warn", "Deny with exceptions", "Deny"], note: "Measure violations during audit. Never go straight to deny on a live cluster." },
      {
        type: "dodont", title: "Policy habits",
        do: ["Unit-test policies with opa test", "Write fix instructions in messages", "Version policies like code"],
        dont: ["Deny without remediation text", "Different rules in CI and cluster", "Policies nobody on the team can read"],
      },
    ],
    takeaway: "Same policy in CI and at admission, with a message that explains the fix.",
    points: ["Start with four high-value rules", "Audit, warn, then deny", "Test policies like code"],
    question: "Which policy would you enforce first on your clusters?",
  },
  {
    slug: "gitops-with-flux-and-argo-cd",
    title: "GitOps with Flux and Argo CD.",
    sub: "Git is the change record. The cluster is a cache of it.",
    hook: "GitOps is not \u201cput YAML in Git\u201d. It is a controller that continuously makes the cluster match Git \u2014 and reverts anything that does not. That changes how you promote, debug and recover.",
    slides: [
      { type: "flow", title: "The reconcile loop", steps: ["Commit", "Controller detects", "Render Helm / Kustomize", "Diff vs cluster", "Apply", "Health check"], note: "The loop runs continuously, not just on commit. Manual changes are reverted." },
      {
        type: "list", title: "Repo structure",
        items: [
          { h: "apps/base", p: "Shared manifests for each service." },
          { h: "apps/overlays/<env>", p: "Small per-environment differences." },
          { h: "clusters/<name>", p: "Entry point each cluster reconciles." },
          { h: "infrastructure/", p: "Controllers and CRDs, applied first." },
        ],
      },
      {
        type: "table", title: "Sync strategy by environment", headers: ["Env", "Strategy"],
        rows: [
          ["Dev", "Auto-sync + self-heal + prune"],
          ["Staging", "Auto-sync, reviewed prune"],
          ["Prod", "PR approval is the gate"],
          ["All", "Dependencies: CRDs before apps"],
        ],
      },
      {
        type: "compare", title: "Flux vs Argo CD",
        left: { label: "Flux", items: ["CRD-native, CLI first", "Kustomization + HelmRelease", "No UI by default", "Image automation built in"] },
        right: { label: "Argo CD", items: ["Strong UI", "Applications + ApplicationSets", "SSO and RBAC for the UI", "Sync waves and hooks"] },
      },
      {
        type: "dodont", title: "GitOps habits",
        do: ["Promote with PRs between env folders", "Keep secrets encrypted or external", "Alert on sync failures"],
        dont: ["kubectl edit in production", "Plaintext secrets in Git", "One giant repo-wide sync"],
      },
    ],
    takeaway: "Promote with pull requests, recover with git revert.",
    points: ["Continuous reconcile, not one-off apply", "Base + overlays + cluster entry points", "Prod gate is the PR review"],
    question: "Flux or Argo CD \u2014 and what made you choose?",
  },
  {
    slug: "helm-vs-kustomize",
    title: "Helm vs Kustomize.",
    sub: "Pick by who owns the YAML, not by which tool is trendier.",
    hook: "Helm and Kustomize solve different problems. Most platforms end up using both. Here is how I decide which one owns a given set of manifests.",
    slides: [
      {
        type: "compare", title: "Different jobs",
        left: { label: "Helm", items: ["Templating + packaging", "Values files", "Release history + rollback", "Great for third-party apps"] },
        right: { label: "Kustomize", items: ["Patches on plain YAML", "Overlays per environment", "No template language", "Great for your own services"] },
      },
      {
        type: "table", title: "Which one when", headers: ["Situation", "Choice"],
        rows: [
          ["Installing third-party software", "Helm chart"],
          ["Own service, small env differences", "Kustomize"],
          ["Many near-identical services", "Helm library chart"],
          ["Vendor chart needs a tweak", "Helm + Kustomize patch"],
        ],
      },
      {
        type: "code", title: "A small overlay", lang: "yaml",
        code: `apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - ../../base
patches:
  - path: replicas.yaml
images:
  - name: api
    newTag: "1.4.2"`,
      },
      {
        type: "dodont", title: "Keep it reviewable",
        do: ["Render and diff in CI", "Validate output with kubeconform", "Review rendered YAML, not templates only"],
        dont: ["Charts with 40 if-blocks", "Overlays copying whole files", "Logic hidden in helpers nobody reads"],
      },
      {
        type: "code", title: "Render before you merge", lang: "bash",
        code: `helm template api ./chart -f values-prod.yaml \\
  | kubeconform -strict -summary

kustomize build apps/overlays/prod \\
  | kubeconform -strict -summary`,
      },
    ],
    takeaway: "Helm for packages, Kustomize for overlays, CI renders both.",
    points: ["Third-party: Helm", "Own services: Kustomize", "Always review rendered output"],
    question: "Which do you use for your own services?",
  },
  {
    slug: "terraform-at-scale",
    title: "Terraform at scale.",
    sub: "Terraform is safe when apply is boring and only the pipeline does it.",
    hook: "Terraform rarely fails because of HCL. It fails because of shared state, laptop applies and plans nobody read. These are the guardrails I put in first.",
    slides: [
      {
        type: "list", title: "State",
        items: [
          { h: "Remote backend with locking", p: "GCS, Azure Storage or S3 \u2014 never local." },
          { h: "Split by blast radius", p: "Separate state per environment and layer." },
          { h: "Never edit by hand", p: "Use moved, import and removed blocks." },
        ],
      },
      { type: "flow", title: "PR pipeline", steps: ["fmt + validate", "tflint", "Security scan", "plan", "Policy on plan", "Approve", "Apply from pipeline"], note: "The plan in the PR is the plan that gets applied." },
      {
        type: "code", title: "Policy on the plan", lang: "bash",
        code: `terraform plan -out tfplan
terraform show -json tfplan > plan.json
conftest test plan.json --policy policy/

# nightly drift check
terraform plan -detailed-exitcode
# exit 2 = drift`,
      },
      {
        type: "dodont", title: "Habits",
        do: ["Version modules with tags", "for_each over count for named things", "Small module interfaces", "Nightly drift detection"],
        dont: ["Apply from laptops", "One giant state file", "Provider blocks inside modules", "Hand-edited state"],
      },
      {
        type: "checklist", title: "Landing zone basics",
        items: ["Separate projects / subscriptions per env", "Central logging and audit", "Private networking + controlled egress", "Org policies as guardrails", "Least-privilege pipeline identity", "Budget alerts"],
      },
    ],
    takeaway: "Remote state, plan in the PR, apply only from the pipeline.",
    points: ["Split state by blast radius", "Policy-check the plan JSON", "Detect drift nightly"],
    question: "Does anyone still run terraform apply from a laptop in your team?",
  },
  {
    slug: "slis-slos-and-error-budgets",
    title: "SLIs, SLOs and error budgets.",
    sub: "An SLO is a decision tool for when to slow down.",
    hook: "SLOs are not a dashboard. They are an agreement about how much unreliability is acceptable \u2014 and what happens when you spend it.",
    slides: [
      {
        type: "table", title: "Three terms", headers: ["Term", "Meaning", "Example"],
        rows: [
          ["SLI", "What you measure", "% requests under 300ms"],
          ["SLO", "Your internal target", "99.9% over 30 days"],
          ["SLA", "Contract with penalties", "99.5% or credits"],
        ],
      },
      { type: "stats", title: "Error budget over 30 days", items: [{ value: "7.2 h", label: "at 99%" }, { value: "43 min", label: "at 99.9%" }, { value: "4.3 min", label: "at 99.99%" }], note: "Each extra nine cuts the budget by 10x. Price that in before promising it." },
      {
        type: "table", title: "Burn-rate alerts", headers: ["Budget spent", "Window", "Action"],
        rows: [
          ["2%", "1 hour", "Page"],
          ["5%", "6 hours", "Page"],
          ["10%", "3 days", "Ticket"],
        ],
      },
      {
        type: "list", title: "Error budget policy",
        items: [
          { h: "Budget left", p: "Ship features at normal pace." },
          { h: "Budget low", p: "Extra review on risky changes." },
          { h: "Budget gone", p: "Freeze risky releases, prioritise reliability." },
          { h: "Agreed in advance", p: "With product, before the incident." },
        ],
      },
      {
        type: "dodont", title: "SLO habits",
        do: ["SLOs on user journeys", "Alert on burn rate", "Review targets quarterly"],
        dont: ["100% targets", "SLOs on CPU usage", "Alert on every error spike"],
      },
    ],
    takeaway: "Measure what users feel, then let the budget decide the pace.",
    points: ["SLI measures, SLO targets, SLA contracts", "Alert on burn rate", "Agree the budget policy upfront"],
    question: "Does your team have an error budget policy that anyone actually follows?",
  },
  {
    slug: "observability-logs-metrics-traces",
    title: "Logs, metrics and traces in practice.",
    sub: "Alert on symptoms. Debug with traces. Prove with logs.",
    hook: "Three pillars is the slide. In practice the value comes from connecting them: an alert that leads to a trace that leads to the exact log lines.",
    slides: [
      {
        type: "table", title: "Each pillar's job", headers: ["Signal", "Good for", "Cost driver"],
        rows: [
          ["Metrics", "Alerting, trends", "Label cardinality"],
          ["Logs", "Detail, audit", "Volume, retention"],
          ["Traces", "Cross-service latency", "Sampling rate"],
        ],
      },
      {
        type: "compare", title: "Two checklists",
        left: { label: "RED \u2014 services", items: ["Rate", "Errors", "Duration"] },
        right: { label: "USE \u2014 resources", items: ["Utilization", "Saturation", "Errors"] },
      },
      { type: "flow", title: "From alert to root cause", steps: ["SLO alert", "Service dashboard", "Trace exemplar", "Slow span", "Logs with trace_id"], note: "The trace_id in every log line is what makes this work." },
      {
        type: "dodont", title: "Keep it affordable",
        do: ["Structured JSON logs", "trace_id on every log line", "Sample traces, keep errors", "Tiered retention"],
        dont: ["user_id as a metric label", "Debug logs in prod forever", "Alerts on causes, not symptoms", "Dashboards nobody opens"],
      },
      {
        type: "checklist", title: "Instrumentation baseline",
        items: ["RED metrics per service", "OpenTelemetry trace propagation", "Structured logs with trace_id", "SLO dashboard", "Runbook link in every alert"],
      },
    ],
    takeaway: "Connect the signals with trace IDs, and control cardinality.",
    points: ["Metrics alert, traces locate, logs explain", "RED for services, USE for resources", "Cardinality is the cost"],
    question: "How long does it take your team to go from alert to the right log line?",
  },
  {
    slug: "internal-developer-platform",
    title: "An internal developer platform teams actually use.",
    sub: "Make the right way the easy way, then measure whether it is.",
    hook: "Developers route around a platform they do not like. A good platform starts with their top pains and makes the secure, observable path the fastest one.",
    slides: [
      { type: "quote", label: "Product mindset", text: "Developers will route around a platform they don't like.", sub: "Treat it as a product with users, not a mandate with a portal." },
      {
        type: "list", title: "What a golden path includes",
        items: [
          { h: "Service template", p: "Repo, CI, Dockerfile, deploy manifests." },
          { h: "Identity and secrets", p: "Wired in, not a follow-up ticket." },
          { h: "Observability", p: "Metrics, logs and traces by default." },
          { h: "Policy compliant", p: "Passes security checks on day one." },
        ],
      },
      { type: "flow", title: "Self-service flow", steps: ["Request", "Validate or refuse", "Render from template", "PR to GitOps repo", "Deploy", "Catalog entry"], note: "Refuse unsafe requests with a reason instead of silently fixing them." },
      {
        type: "dodont", title: "Platform habits",
        do: ["Start with the top 3 pains", "Ship thin, iterate with users", "Document inside the template"],
        dont: ["Portal first, nothing behind it", "Mandate before it is better", "Build what nobody asked for"],
      },
      {
        type: "table", title: "Measure adoption", headers: ["Metric", "Why"],
        rows: [
          ["Time to first deploy", "Onboarding friction"],
          ["Lead time for change", "Delivery speed"],
          ["% services on golden path", "Adoption"],
          ["Tickets to platform team", "Hidden toil"],
        ],
      },
    ],
    takeaway: "The best platform is the one developers choose.",
    points: ["Golden path with security built in", "Self-service with clear refusals", "Measure adoption, not features"],
    question: "What is the one developer pain your platform should solve first?",
  },
];
