// Public GitHub labs. Always described as labs, never as customer deployments.

module.exports = [
  {
    slug: "terraform-gcp-landing-zone-lab",
    title: "Lab: a Terraform GCP landing zone.",
    sub: "A multi-environment foundation, built as a lab \u2014 not a customer deployment.",
    hook: "I built a reusable GCP foundation in Terraform to practise the parts of platform work that usually live behind an NDA: shared networking, private GKE, IAM and a reviewable plan pipeline. Here is how it is laid out.",
    slides: [
      {
        type: "grid", title: "What it provisions",
        items: ["Shared VPC", "Private GKE", "IAM and service accounts", "Cloud NAT for egress", "Artifact Registry", "Observability and security controls"],
      },
      { type: "flow", title: "How a change flows", steps: ["Bootstrap state bucket", "validate", "plan per environment", "Review in CI", "apply"], note: "Remote state is bootstrapped once by a script, then every environment has its own backend." },
      {
        type: "list", title: "Design decisions",
        items: [
          { h: "Environments as folders", p: "Each with its own backend and variables." },
          { h: "Modules for shared pieces", p: "Artifact Registry and networking are reused." },
          { h: "Private nodes + NAT", p: "No public node IPs; egress is controlled." },
          { h: "CI on every PR", p: "fmt, validate and plan before review." },
        ],
      },
      {
        type: "code", title: "Run it locally", lang: "bash",
        code: `git clone https://github.com/iarsingh/terraform-gcp-platform
cd terraform-gcp-platform

./scripts/bootstrap-state-bucket.sh
./scripts/validate.sh
./scripts/plan-all.sh`,
        note: "Plan-only by default. Apply belongs in a pipeline with approval.",
      },
      {
        type: "checklist", title: "What I would add for production",
        items: ["Policy checks on the plan JSON", "Nightly drift detection", "Org policy constraints", "Budget alerts per project", "Workload identity everywhere"],
      },
    ],
    takeaway: "A lab is where you practise the guardrails, not just the resources.",
    points: ["Shared VPC, private GKE, NAT, IAM", "Per-environment state", "Plan in CI, apply with approval"],
    question: "What is the first module you would add to a landing zone like this?",
  },
  {
    slug: "customer-deployment-platform-lab",
    title: "Lab: a self-service deployment platform.",
    sub: "Request a service, get a validated, templated, GitOps-deployed app.",
    hook: "This lab explores the golden-path idea end to end: a small platform API that validates a request, refuses unsafe ones with a reason, renders a service from a template and hands it to GitOps. It runs locally on kind.",
    slides: [
      { type: "flow", title: "Request to running service", steps: ["Service request", "Validate or refuse", "Render from template", "Policy check", "Terraform module + Argo CD", "Service with /healthz and /readyz"], note: "Refusals come back with a reason. The platform never silently fixes a request." },
      {
        type: "list", title: "Components",
        items: [
          { h: "platform-api", p: "FastAPI: service requests, status, metrics." },
          { h: "templates/python-service", p: "The golden-path service skeleton." },
          { h: "policies/check_policy.py", p: "Checks rendered manifests before deploy." },
          { h: "terraform/modules/service", p: "Per-service infrastructure as a module." },
        ],
      },
      {
        type: "code", title: "Run it locally", lang: "bash",
        code: `./scripts/kind-up.sh
./scripts/install-argocd.sh
./demo/run.sh

# then break something on purpose
./scripts/simulate-failure.sh`,
      },
      {
        type: "list", title: "What it demonstrates",
        items: [
          { h: "Golden path", p: "Every new service starts compliant." },
          { h: "Refusal over silent fixes", p: "Developers learn the rules from the error." },
          { h: "Failure drills", p: "A script to simulate breakage and practise recovery." },
        ],
      },
      { type: "quote", label: "Honest label", text: "A lab, not a customer platform.", sub: "It exists to practise the design. Scale, multi-tenancy and SSO are out of scope." },
    ],
    takeaway: "Self-service works when validation and refusal are first-class.",
    points: ["Validate, refuse, render, deploy", "Templates carry the guardrails", "Practise failure on purpose"],
    question: "What would you refuse in a self-service platform request?",
  },
  {
    slug: "mlops-and-gitops-labs",
    title: "Lab: MLOps on Kubernetes with GitOps.",
    sub: "Train, gate, promote and serve \u2014 then deploy it the GitOps way.",
    hook: "Two labs that fit together: one trains and promotes a model behind an evaluation gate, the other deploys services with Argo CD, drift checks and a scripted rollback.",
    slides: [
      { type: "flow", title: "Training lab", steps: ["train.py", "Register version", "evaluate.py", "Gate and promote", "Inference service reloads"], note: "Promotion happens only if the evaluation gate passes." },
      {
        type: "list", title: "Inference service",
        items: [
          { h: "/health and /ready", p: "Readiness reflects whether a model is loaded." },
          { h: "/metrics", p: "Prometheus metrics for latency and requests." },
          { h: "/reload", p: "Pick up a newly promoted version." },
          { h: "Registry with local fallback", p: "The loader can serve from a local copy." },
        ],
      },
      { type: "flow", title: "GitOps lab", steps: ["CI builds image", "promote-image.sh", "Argo CD syncs", "drift-check.sh", "rollback.sh"], note: "Promotion and rollback are scripted Git changes, not kubectl commands." },
      {
        type: "checklist", title: "What both labs share",
        items: ["Health and readiness endpoints", "Prometheus metrics", "CI workflow with tests", "Terraform for registry and storage", "A rehearsed rollback path"],
      },
      { type: "quote", label: "Why two labs", text: "Model lifecycle and deploy lifecycle are different loops.", sub: "Keeping them separate made each one easier to reason about and test." },
    ],
    takeaway: "Gate the model, then let GitOps handle the deploy.",
    points: ["Evaluation gate before promotion", "Readiness reflects model state", "Scripted promote, drift check, rollback"],
    question: "Do you keep model promotion and service deployment in one pipeline or two?",
  },
  {
    slug: "synthetic-datasets-for-mlops-practice",
    title: "Lab: synthetic datasets for MLOps and GenAI practice.",
    sub: "Synthetic data, real questions. No customer data anywhere.",
    hook: "Real monitoring data is hard to share. So I generated two seeded, synthetic datasets on Kaggle for practising model monitoring and RAG evaluation \u2014 the kind of analysis interviews ask about.",
    slides: [
      {
        type: "list", title: "Model monitoring dataset",
        items: [
          { h: "What it simulates", p: "A churn model's predictions across regions and channels." },
          { h: "Columns", p: "Model version, score, actual label, latency, errors." },
          { h: "Drift periods", p: "Before and after windows to detect degradation." },
        ],
      },
      {
        type: "list", title: "RAG evaluation dataset",
        items: [
          { h: "What it simulates", p: "RAG answers across prompts and domains." },
          { h: "Columns", p: "Prompt template, retrieval top-k, groundedness, latency." },
          { h: "Labels", p: "Pass / fail and hallucination risk." },
        ],
      },
      {
        type: "list", title: "Questions to practise",
        items: [
          { h: "Monitoring", p: "Did accuracy degrade after the drift period?" },
          { h: "Versions", p: "Which model version performs best, and where?" },
          { h: "RAG", p: "Which prompt template has the best pass rate?" },
          { h: "Trade-off", p: "How does top-k affect latency and groundedness?" },
        ],
      },
      { type: "flow", title: "How I use them", steps: ["Generate with a fixed seed", "Publish on Kaggle", "Analyse with pandas or BigQuery", "Build a dashboard", "Walk through it in interviews"], note: "The generator script ships with the data, so anyone can reproduce it." },
      { type: "quote", label: "Honest label", text: "Synthetic by design.", sub: "CC0, seeded, no real customer, system or billing data." },
    ],
    takeaway: "Practise monitoring and evaluation on data you can share.",
    points: ["Seeded and reproducible", "Monitoring drift and RAG quality", "Real interview questions"],
    question: "What dataset do you wish existed for MLOps practice?",
  },
];
