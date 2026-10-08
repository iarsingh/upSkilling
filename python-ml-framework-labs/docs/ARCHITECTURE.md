# Architecture

Four labs share one Python package. They are local case studies with synthetic data.

```mermaid
flowchart LR
    numpy[numpy_features] --> artifacts[artifacts JSON]
    quality[data_quality] --> artifacts
    train[mlops_pipeline] --> joblib[churn_model.joblib]
    joblib --> serving[FastAPI serving]
    serving --> ops[/v1 ops plane]
    ops -->|prod target| refuse[403 production apply disabled]
```

- Workspaces are tenant-scoped via `X-Tenant-Id`.
- Jobs targeting `prod` stay `pending_approval` and approve is refused.
- Audit events are in-memory; a restart wipes history.
- Kubernetes manifests are for local kind/minikube only.

## Endpoints

- `GET /healthz`
- `GET /readyz`
- `GET /model`
- `POST /predict`
- `POST /predict/batch`
- `GET /v1/readyz`
- `POST /v1/workspaces`
- `GET /v1/workspaces`
- `POST /v1/workspaces/{id}/jobs`
- `GET /v1/jobs/{id}`
- `POST /v1/jobs/{id}/approve`
- `GET /v1/audit`
- `GET /v1/metrics`
