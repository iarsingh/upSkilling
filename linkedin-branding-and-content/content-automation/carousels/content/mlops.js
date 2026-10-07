module.exports = [
  {
    slug: "model-registry-approvals",
    title: "Model registry approvals and controlled releases.",
    sub: "Promotion should be an auditable alias change, not a file copy.",
    hook: "If a model reaches production because someone copied a pickle to a bucket, you cannot answer the first audit question: who approved this, based on what evidence? A registry with gates fixes that.",
    slides: [
      { type: "flow", title: "Release path", steps: ["Train", "Log the run", "Register version", "Eval gate", "Human approval", "Move prod alias"], note: "Rollback is moving the alias back. No retrain, no redeploy of code." },
      {
        type: "list", title: "Every version must carry",
        items: [
          { h: "Data snapshot ID", p: "Exactly which data trained it." },
          { h: "Code commit + image digest", p: "Exactly which code and environment." },
          { h: "Eval report vs champion", p: "Same holdout, same metrics, side by side." },
          { h: "Model card", p: "Intended use, limits, known failure slices." },
        ],
      },
      {
        type: "table", title: "Gates", headers: ["Gate", "Checks"],
        rows: [
          ["Automated", "Beats champion on holdout"],
          ["Automated", "Slice and fairness checks pass"],
          ["Automated", "Latency within budget"],
          ["Human", "Business owner sign-off"],
          ["Human", "Risk review for regulated use"],
        ],
      },
      {
        type: "code", title: "Promotion by alias (MLflow)", lang: "python",
        code: `import mlflow
from mlflow import MlflowClient

mv = mlflow.register_model(f"runs:/{run_id}/model", "churn")

client = MlflowClient()
client.set_registered_model_alias(
    "churn", "champion", version=mv.version
)
# serving loads models:/churn@champion`,
      },
      {
        type: "dodont", title: "Release habits",
        do: ["Promote from the pipeline", "Keep the previous version warm", "Record who approved and why"],
        dont: ["Promote from a notebook", "Overwrite an existing version", "Approve without a champion comparison"],
      },
    ],
    takeaway: "Register everything, gate promotion, roll back by alias.",
    points: ["Versions carry data, code and eval evidence", "Automated gates, then human sign-off", "Rollback = move the alias back"],
    question: "How does a model reach production in your team today?",
  },
  {
    slug: "canary-and-rollback-for-models",
    title: "Canary releases and rollback for models.",
    sub: "If rollback needs a retrain, you do not have a rollback.",
    hook: "Models fail differently from code: they keep returning 200 OK while quietly making worse decisions. A canary for a model needs guardrails beyond error rate.",
    slides: [
      {
        type: "table", title: "Shadow, canary or A/B?", headers: ["Strategy", "User impact", "Answers"],
        rows: [
          ["Shadow", "None", "Does it behave sanely?"],
          ["Canary", "Small %", "Is it safe at scale?"],
          ["A/B test", "Split", "Is it better for the business?"],
        ],
      },
      { type: "flow", title: "Progressive rollout", steps: ["Shadow", "5% canary", "25%", "50%", "100%"], note: "Hold each step long enough to see delayed labels, not just latency." },
      {
        type: "grid", title: "Guardrail metrics",
        items: ["Error rate", "p95 latency", "Prediction distribution shift", "Fallback rate", "Business KPI proxy", "Cost per 1k predictions"],
      },
      {
        type: "list", title: "Rollback that works",
        items: [
          { h: "Automatic on breach", p: "Guardrail crossed, traffic shifts back." },
          { h: "Previous version warm", p: "Loaded and ready, not cold-started." },
          { h: "Schema compatible", p: "Both versions accept the same features." },
          { h: "One action", p: "An alias flip or traffic weight change." },
        ],
      },
      {
        type: "dodont", title: "Canary mistakes",
        do: ["Compare canary vs control, same time window", "Watch prediction distribution", "Rehearse rollback"],
        dont: ["Judge on latency alone", "Roll out on Friday evening", "Change features and model together"],
      },
    ],
    takeaway: "Models fail silently. Canary on behaviour, not just errors.",
    points: ["Shadow, then progressive canary", "Guardrails include prediction shift", "Rollback is one action"],
    question: "What metric would make you roll back a model that is still returning 200 OK?",
  },
  {
    slug: "data-drift-vs-concept-drift",
    title: "Data drift vs concept drift.",
    sub: "Drift is a question, not an action.",
    hook: "A drift alert fires. Do you retrain? Not yet. First decide which drift it is \u2014 and whether it is drift at all, or a broken pipeline.",
    slides: [
      {
        type: "compare", title: "Two different problems",
        left: { label: "Data drift", items: ["Inputs change: P(X)", "Detectable without labels", "New users, new channel", "Model may still be fine"] },
        right: { label: "Concept drift", items: ["Relationship changes: P(y|X)", "Needs labels or proxies", "Fraudsters adapt", "Model is now wrong"] },
      },
      {
        type: "table", title: "How to detect it", headers: ["Method", "Use for", "Watch out"],
        rows: [
          ["PSI", "Binned features", "Bin choice matters"],
          ["KS test", "Continuous features", "Too sensitive at large n"],
          ["Prediction distribution", "Early proxy", "Not proof of harm"],
          ["Labeled sample accuracy", "Concept drift", "Label delay"],
        ],
      },
      { type: "flow", title: "When an alert fires", steps: ["Detect", "Check for a data bug", "Real or seasonal?", "Ignore, retrain or roll back", "Eval gate", "Promote"], note: "Most \u201cdrift\u201d I have seen was a broken join or a changed default value upstream." },
      {
        type: "dodont", title: "Alerting on drift",
        do: ["Weight features by importance", "Compare to a seasonal baseline", "Alert on sustained shift"],
        dont: ["Alert on every p-value", "Auto-retrain on any shift", "Ignore known seasonality"],
      },
      {
        type: "list", title: "Examples",
        items: [
          { h: "Data drift", p: "A new campaign brings a younger audience." },
          { h: "Concept drift", p: "A policy change alters what \u201cchurn\u201d means." },
          { h: "Not drift", p: "An upstream null became a zero." },
        ],
      },
    ],
    takeaway: "Before you retrain, rule out a data bug.",
    points: ["Data drift: inputs move", "Concept drift: the relationship moves", "Triage first, act second"],
    question: "Was your last drift alert real drift or a pipeline bug?",
  },
  {
    slug: "monitoring-signals-and-retraining-triggers",
    title: "Monitoring signals and retraining triggers.",
    sub: "Automate retraining. Gate promotion.",
    hook: "An ML service needs the usual SRE signals plus a few nobody else on the platform tracks. And the retraining trigger should never be allowed to ship a model on its own.",
    slides: [
      {
        type: "grid", title: "Signals to track",
        items: ["Service: latency, errors", "Data: schema, nulls, freshness", "Model: prediction distribution", "Model: confidence", "Outcome: labeled accuracy", "Business: conversion, cost", "Pipeline: job success, lag", "Features: train/serve skew"],
      },
      {
        type: "table", title: "Retraining triggers", headers: ["Trigger", "Fits", "Risk"],
        rows: [
          ["Schedule", "Stable domains", "Wasted compute"],
          ["Drift threshold", "Fast-moving inputs", "Noisy if untuned"],
          ["Performance drop", "When labels arrive", "Delayed"],
          ["New data volume", "Growing datasets", "Arbitrary cut-off"],
        ],
      },
      { type: "flow", title: "Automated retraining, gated", steps: ["Trigger", "Validate new data", "Train", "Evaluate vs champion", "Approve", "Canary"], note: "Validate the data before training. Retraining on corrupted data automates the outage." },
      {
        type: "code", title: "Prediction shift alert", lang: "yaml",
        code: `- alert: ModelPositiveRateShift
  expr: |
    abs(
      avg_over_time(model_positive_rate[1h])
      - avg_over_time(model_positive_rate[7d])
    ) > 0.10
  for: 30m
  labels: { severity: ticket }`,
        note: "A ticket, not a page. Drift needs a human look, not a 3am wake-up.",
      },
      {
        type: "dodont", title: "Retraining rules",
        do: ["Auto-retrain on a trigger", "Compare against the champion", "Keep every candidate in the registry"],
        dont: ["Auto-promote without a gate", "Train on unvalidated data", "Page humans for drift"],
      },
    ],
    takeaway: "Monitor the model like a service and the data like a dependency.",
    points: ["Add data, model and outcome signals", "Pick triggers to match the domain", "Never auto-promote"],
    question: "Which retraining trigger does your team actually use?",
  },
  {
    slug: "reproducible-pipelines-mlflow-kubeflow",
    title: "Reproducible pipelines with MLflow and Kubeflow.",
    sub: "If you cannot rerun last month's model, you cannot debug it.",
    hook: "\u201cWhich data trained the model in production?\u201d should take a minute to answer. Here is what I version and how MLflow and Kubeflow divide the work.",
    slides: [
      {
        type: "checklist", title: "What to version",
        items: ["Code commit", "Data snapshot or version", "Feature definitions", "Parameters and random seed", "Container image digest", "Dependency lockfile", "Evaluation dataset version"],
      },
      { type: "flow", title: "Pipeline steps", steps: ["Ingest", "Validate", "Build features", "Train", "Evaluate", "Register"], note: "Each step is a container with declared inputs and outputs." },
      {
        type: "compare", title: "Who does what",
        left: { label: "MLflow", items: ["Experiment tracking", "Model registry and aliases", "Artifact storage", "Library + server"] },
        right: { label: "Kubeflow Pipelines", items: ["Orchestration on Kubernetes", "DAG of containers", "Retries and caching", "Runs on your cluster"] },
      },
      {
        type: "code", title: "Log what you need to rerun", lang: "python",
        code: `with mlflow.start_run() as run:
    mlflow.set_tag("git_commit", GIT_SHA)
    mlflow.set_tag("image", IMAGE_DIGEST)
    mlflow.log_params({"seed": 42, **params})
    mlflow.log_input(
        mlflow.data.from_pandas(df, name="train-2026-10-01")
    )
    model = train(df, params)
    mlflow.log_metric("auc", evaluate(model))`,
      },
      {
        type: "dodont", title: "Reproducibility habits",
        do: ["Pin dependencies with a lockfile", "Snapshot data, never read \u201clatest\u201d", "Run training in the same image as CI"],
        dont: ["pip install in a notebook", "Unseeded randomness", "Data paths without versions"],
      },
    ],
    takeaway: "Version code, data, environment and evaluation together.",
    points: ["Seven things to version", "MLflow tracks, Kubeflow orchestrates", "Same image in CI and training"],
    question: "Could you rerun the model that is in production right now?",
  },
  {
    slug: "feature-quality-and-lineage",
    title: "Feature quality and lineage.",
    sub: "Lineage answers the auditor's question in minutes, not weeks.",
    hook: "Bad features break models more often than bad algorithms. Quality checks before training and lineage after deployment are the two cheapest insurance policies in ML.",
    slides: [
      {
        type: "checklist", title: "Checks before training",
        items: ["Schema and types", "Null rate vs baseline", "Ranges and categories", "Freshness", "No future information (leakage)", "Train/serve skew"],
      },
      {
        type: "dodont", title: "Leakage traps",
        do: ["Use point-in-time joins", "Split by time for time-series", "Review features that look too good"],
        dont: ["Features computed after the label", "Random split on time data", "Target-encoded features from all data"],
      },
      { type: "flow", title: "Lineage graph", steps: ["Source table", "Feature pipeline", "Feature store", "Training run", "Model version", "Endpoint", "Prediction log"], note: "Every arrow is a recorded link, not a wiki page." },
      {
        type: "list", title: "Questions lineage must answer",
        items: [
          { h: "Which data?", p: "That trained the model behind this prediction." },
          { h: "Which features?", p: "And which version of their definitions." },
          { h: "Who approved?", p: "And what evidence they saw." },
          { h: "Can we reproduce it?", p: "From the recorded inputs alone." },
        ],
      },
      {
        type: "table", title: "Feature store governance", headers: ["Control", "Why"],
        rows: [
          ["Owner per feature", "Someone fixes it when it breaks"],
          ["Definition in code", "Reviewed and versioned"],
          ["Freshness SLA", "Stale features fail silently"],
          ["Access control", "PII stays restricted"],
          ["Deprecation policy", "Dead features get removed"],
        ],
      },
    ],
    takeaway: "Check features before training, trace them after deployment.",
    points: ["Six quality checks", "Point-in-time joins prevent leakage", "Lineage from source to prediction"],
    question: "How long would it take you to trace a prediction back to its training data?",
  },
  {
    slug: "batch-vs-realtime-serving",
    title: "Batch vs real-time serving.",
    sub: "Choose batch unless the decision happens inside the request.",
    hook: "Real-time serving is more expensive, harder to operate and often unnecessary. Here is how I choose, and what I check when a FastAPI model service on Kubernetes gets slow.",
    slides: [
      {
        type: "table", title: "Batch or real-time?", headers: ["", "Batch", "Real-time"],
        rows: [
          ["Latency", "Minutes to hours", "Milliseconds"],
          ["Cost", "Bursty compute", "Always on"],
          ["Features", "Precomputed", "Online store"],
          ["Failure", "Rerun the job", "Needs a fallback"],
          ["Fits", "Scoring lists", "In-request decisions"],
        ],
      },
      { type: "flow", title: "Real-time path", steps: ["Client", "Ingress", "FastAPI service", "Model in memory", "Feature lookup", "Response + log"], note: "Log every prediction with its model version for monitoring and audit." },
      {
        type: "code", title: "Load once, report readiness", lang: "python",
        code: `from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException

state = {}

@asynccontextmanager
async def lifespan(app):
    state["model"] = load_model("models:/churn@champion")
    yield

app = FastAPI(lifespan=lifespan)

@app.get("/readyz")
def ready():
    if "model" not in state:
        raise HTTPException(503)
    return {"ok": True}`,
      },
      {
        type: "list", title: "When latency climbs",
        items: [
          { h: "Model loaded per request", p: "Load at startup, keep it in memory." },
          { h: "CPU throttling", p: "Check CFS throttling against limits." },
          { h: "Synchronous feature calls", p: "Batch or cache lookups." },
          { h: "Cold starts on scale-up", p: "Warm replicas and startup probes." },
        ],
      },
      {
        type: "checklist", title: "Serving baseline",
        items: ["Readiness waits for model load", "Model version in every log line", "Timeout and fallback defined", "Requests sized from load tests", "p95 latency SLO with alert"],
      },
    ],
    takeaway: "Batch by default. Real-time when the request needs the answer.",
    points: ["Compare latency, cost and failure modes", "Load the model once, gate readiness", "Throttling and cold starts cause most latency"],
    question: "Which of your real-time models could have been a batch job?",
  },
  {
    slug: "vertex-ai-vs-gke-and-ml-checklist",
    title: "Vertex AI vs self-managed GKE.",
    sub: "Pick the platform your team can operate at 2am.",
    hook: "Managed ML platforms and self-managed Kubernetes both work. The right choice depends less on features and more on who will be on call.",
    slides: [
      {
        type: "table", title: "The trade-off", headers: ["", "Vertex AI", "GKE"],
        rows: [
          ["Ops effort", "Low", "High"],
          ["Control", "Managed defaults", "Full"],
          ["Cost model", "Pay per use", "You pack the nodes"],
          ["Custom serving", "Within supported runtimes", "Anything"],
          ["Portability", "GCP", "Any Kubernetes"],
        ],
      },
      {
        type: "compare", title: "When I would choose",
        left: { label: "Vertex AI", items: ["Small team, no platform squad", "Standard frameworks", "Managed pipelines and endpoints", "Speed over control"] },
        right: { label: "GKE", items: ["Existing platform team", "Custom serving or GPU sharing", "Multi-cloud requirements", "Cost at steady high volume"] },
      },
      { type: "flow", title: "A common hybrid", steps: ["Vertex Pipelines train", "Model registry", "Image build", "GKE serving", "Shared monitoring"], note: "Managed training, self-managed serving where latency and cost need control." },
      { type: "quote", label: "Decision rule", text: "Choose by on-call, not by feature list.", sub: "A managed service your team understands beats a flexible one nobody can debug." },
      {
        type: "checklist", title: "ML deployment checklist",
        items: ["Model versioned and approved", "Eval report vs champion", "Canary plan", "Rollback by alias", "Monitoring signals live", "Drift baseline captured", "Input data validated", "Resource limits set", "Owner and on-call named", "Model card published"],
      },
    ],
    takeaway: "Managed when you can, self-managed when you must.",
    points: ["Compare ops effort, control and cost", "Hybrids are common and fine", "Use the checklist either way"],
    question: "Which did your team choose \u2014 and would you choose it again?",
  },
];
