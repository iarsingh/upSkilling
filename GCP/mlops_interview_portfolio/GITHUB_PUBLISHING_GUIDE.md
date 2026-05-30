# GitHub Publishing Guide

Use this checklist before sharing the portfolio with recruiters, hiring
managers, or LinkedIn.

## Repository Positioning

Suggested repo name:

```text
gcp-mlops-platform-portfolio
```

Suggested repo description:

```text
Production-style GCP MLOps portfolio: GKE, Terraform, Cloud Build, Vertex AI Pipelines, model promotion gates, observability, Hugging Face LLMOps, LLM-assisted AIOps, GitOps remediation, multi-tenant healthcare MLOps, streaming feature infrastructure, batch forecasting, edge vision MLOps, real-time fraud detection, and ML lifecycle governance.
```

Suggested GitHub topics:

```text
mlops, gcp, gke, anthos, terraform, kubernetes, cloud-build, cloud-deploy, vertex-ai, vertex-ai-pipelines, kubeflow, argocd, config-connector, huggingface, llmops, aiops, gitops, dataflow, bigquery-ml, feature-store, bigtable, edge-ai, fraud-detection, ml-platform, sre, observability, model-monitoring, model-registry
```

## README Checklist

- Start with the value proposition, not a course name.
- Include the project index table.
- Add one architecture diagram near the top.
- Add a "How to validate" section with test commands.
- Add an "Interview talking points" section.
- Keep screenshots under an `assets/` or `images/` folder.
- Avoid saying "toy project" or "learning project".
- Say "blueprint", "validator", "control plane", "guardrail", or "reference
  implementation" when the project is intentionally lightweight.

## Screenshots To Add

- `pytest` passing output for the whole portfolio
- One CLI output from model promotion
- One CLI output from ML SRE report
- One CLI output from feature consistency validation
- One CLI output from batch quality gate evaluation
- One CLI output from Vertex AI Hugging Face LLMOps release validation
- One CLI output from Vertex AI MLOps control-plane release validation
- One CLI output from LLM AIOps GitOps remediation proposal validation
- One CLI output from ChronosSupply forecast release validation
- One CLI output from ShieldLLM governance validation
- One CLI output from VisionEdge edge release validation
- One CLI output from NexusFraud regulated release validation
- One CLI output from ClearRoute healthcare platform release validation
- One CLI output from AdStream streaming feature release validation
- Cloud Build YAML snippet
- Kubernetes deployment snippet
- Terraform plan snippet with sensitive values hidden

## Recruiter-Friendly Summary

```text
Built a production-style GCP MLOps portfolio covering GKE platform design,
Terraform infrastructure, Cloud Build CI/CD, model promotion gates, observability
and SLO reporting, Vertex AI Pipelines, Model Registry governance, Hugging Face
LLMOps release gates, LLM-assisted AIOps, GitOps remediation, multi-tenant
healthcare MLOps, Dataflow streaming, BigQuery ML forecasting, edge vision
deployment, regulated fraud detection, feature store consistency checks, batch
inference quality gates, and retraining controls.
```

## Resume Bullet Options

- Built a GCP MLOps platform portfolio using GKE, Terraform, Cloud Build,
  Artifact Registry, Kubernetes manifests, and GitOps-style deployment patterns.
- Designed model promotion gates with quality, latency, error-rate, approval,
  lineage, and audit controls for safer production releases.
- Implemented ML observability tooling for p95/p99 latency, error rate, drift
  signals, SLO breach reporting, and incident-ready summaries.
- Created feature store consistency and batch inference quality gates to prevent
  training/serving skew, stale features, incomplete predictions, and bad
  downstream publishing.
- Designed Vertex AI and Hugging Face LLMOps release gates covering model card
  metadata, evaluation quality, safety, latency, cost, logging, monitoring, and
  rollback readiness.
- Built a Vertex AI MLOps control-plane blueprint covering dataset contracts,
  training pipeline reproducibility, experiment lineage, registry approval,
  canary rollout, monitoring, retraining triggers, and audit governance.
- Designed an LLM-assisted AIOps GitOps workflow that converts production alert
  context into policy-checked pull request proposals with human approval,
  rollback, and blast-radius controls.
- Built ChronosSupply, a high-throughput demand forecasting MLOps blueprint with
  Cloud Composer, Dataflow, Great Expectations, BigQuery ML, Vertex AI, and
  Redis-backed forecast serving.
- Built ShieldLLM, an enterprise LLM gateway blueprint with GKE, Vertex AI
  Gemini, 9-layer guardrails, Pub/Sub telemetry, BigQuery logs, and Vertex AI
  Metadata governance.
- Built VisionEdge, a hybrid edge-cloud vision MLOps blueprint with Vertex AI
  GPU training, TensorRT/Edge TPU optimization, GKE Enterprise rollout, and edge
  drift telemetry.
- Built NexusFraud, a regulated real-time fraud MLOps blueprint with Dataflow,
  Vertex AI Feature Store, Vertex AI Pipelines, Metadata lineage, canary, and
  shadow deployments.
- Built ClearRoute, a multi-tenant healthcare MLOps platform blueprint with GKE
  Enterprise, Terraform, Config Connector, Argo CD, Kubeflow, Vertex AI, and
  HIPAA-aligned security controls.
- Built AdStream, a high-throughput streaming feature platform with Terraform,
  Cloud Deploy, Pub/Sub, Dataflow, Vertex AI Feature Store, Bigtable, BigQuery,
  Cloud Build, and SLO-based rollback.

## Publishing Order

1. Publish the main portfolio README.
2. Add screenshots after local validation.
3. Post the portfolio launch on LinkedIn.
4. Publish one project post every 2-3 days.
5. Pin the strongest post and the GitHub repo on your profile.
6. Use the same keywords in resume, GitHub, and LinkedIn headline.
