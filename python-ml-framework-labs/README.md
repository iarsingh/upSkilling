# Python, NumPy, data science, and MLOps labs

<!-- project-guide:start -->
## Project guide

[Project architecture](PROJECT_ARCHITECTURE.md) · [Interview questions and answers](INTERVIEW_QA.md)

Use the architecture document for the component diagram, implementation boundaries, and verification entry points. The interview guide includes source-backed answers.

### Implementation map

| Component | Responsibility |
| --- | --- |
| [`src/ml_labs/numpy_features.py`](src/ml_labs/numpy_features.py) | Causal rolling stats, z-scores, pairwise interactions, cosine neighbors |
| [`src/ml_labs/data_quality.py`](src/ml_labs/data_quality.py) | Duplicate IDs, nulls, target leakage, train/test customer overlap |
| [`src/ml_labs/mlops_pipeline.py`](src/ml_labs/mlops_pipeline.py) | sklearn pipeline, holdout metrics, artifact hashes, PSI, retrain advice |
| [`src/ml_labs/serving.py`](src/ml_labs/serving.py) | FastAPI predict, model catalog, human-review band, feature contributions |
| [`src/ml_labs/ops.py`](src/ml_labs/ops.py) | `/v1` workspaces and jobs; production apply is refused |
| [`tests/`](tests) | Executable checks |

### Local setup and verification

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -e ".[dev]"
python -m pytest -q
```

```bash
python -m ml_labs serve
```

<!-- project-guide:end -->

Four local case studies with synthetic data. They are not production systems and not customer deployments.

| Lab | Stack | What it demonstrates |
| --- | --- | --- |
| [01 NumPy feature engine](01-numpy-feature-engine/README.md) | NumPy | Causal rolling stats, z-scores, pairwise interactions, cosine neighbors |
| [02 Data-science quality gates](02-data-science-quality-gates/README.md) | pandas, NumPy | Duplicate IDs, nulls, target leakage, train/test contamination |
| [03 MLOps training monitor](03-mlops-training-monitor/README.md) | scikit-learn | Holdout metrics, confusion counts, artifact hashes, PSI, retrain recommendation only |
| [04 FastAPI model service](04-fastapi-sklearn-service/README.md) | FastAPI, Pydantic | Schema validation, `/model`, batch predict, contributions, ops plane |

## Run

```sh
python -m ml_labs numpy
python -m ml_labs quality
python -m ml_labs train
python -m ml_labs serve
```

| Method and path | Returns |
| --- | --- |
| `GET /healthz` | Process is up |
| `GET /readyz` | Model file loaded |
| `GET /model` | Feature list and holdout metrics |
| `POST /predict` | Probability, label, review flag, logistic contributions |
| `POST /predict/batch` | Up to 100 rows |
| `POST /v1/jobs/{id}/approve` | 403 when `target` is `prod` |

```bash
curl -s http://127.0.0.1:8080/predict \
  -H 'content-type: application/json' \
  -d '{"tenure":4,"monthly_charges":89.5,"support_tickets":6,"late_payments":3,"contract":"month-to-month"}'
```

## Ops plane

Workspaces, tenant isolation, job approval, and audit live under `/v1`. Production apply is refused. See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

Kubernetes YAML in [`k8s/`](k8s) is a local sketch. This repository does not apply it.

See [service improvements and local run instructions](docs/UPGRADES.md).
