# Model Promotion Gates

This project simulates an MLflow-style model registry promotion workflow. It is
small enough to explain in an interview and practical enough to show real MLOps
thinking: quality gates, approval gates, lineage, and audit-friendly state.

## What It Demonstrates

- Candidate-to-staging and staging-to-production model promotion
- Metrics-based promotion gates
- Approval requirement for production
- JSON model registry with audit trail
- CI-friendly Python tests

## Promotion Rules

Default gates:

- Accuracy must be at least `0.82`
- p99 latency must be at most `250 ms`
- Error rate must be at most `0.02`
- Production promotion requires approval

## Run

Evaluate a model for staging:

```bash
python3 src/promotion_cli.py evaluate \
  --registry examples/registry.json \
  --model-id churn-model-v3 \
  --target staging
```

Promote to staging:

```bash
python3 src/promotion_cli.py promote \
  --registry examples/registry.json \
  --model-id churn-model-v3 \
  --target staging
```

Promote to production with approval:

```bash
python3 src/promotion_cli.py promote \
  --registry examples/registry.json \
  --model-id churn-model-v3 \
  --target production \
  --approved-by platform-lead
```

## Interview Talking Points

- This mirrors MLflow model registry promotion patterns.
- Promotion is automated, but production still requires human approval.
- Metrics gates prevent models with high latency or weak quality from shipping.
- The audit trail supports governance and rollback discussions.
