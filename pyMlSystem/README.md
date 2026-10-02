# IncidentOps

A local incident triage platform for learning production ML delivery and Forward Deployed Engineering. Submit an incident, inspect a suggested routing category, retrieve supporting runbooks, and record engineer feedback. FastAPI serves the API and the built React interface from one origin.

**Status:** working local demo, with a tested API and UI, MLflow integration, Docker Compose monitoring, and future GKE/Terraform templates. The included classifier uses **60 synthetic training examples and 20 synthetic evaluation examples**. This is not a production-trained model or a completed production deployment.

## Start locally

Requirements: Python 3.13, Node.js 24 LTS recommended, and [uv](https://docs.astral.sh/uv/). This workspace also has a project-local `uv` at `.tools/bin/uv`, which Make detects automatically.

```sh
cd /Users/akhileshsingh/Documents/upSkilling/pyMlSystem
make setup
make dev
```

Open **http://127.0.0.1:8000** and click **Use demo incident**, then **Triage incident**. API documentation is at **http://127.0.0.1:8000/docs**.

`make setup` installs locked dependencies, migrates SQLite, seeds runbooks, trains the demo classifier, and builds the frontend. It is repeatable and does not erase incidents. `make dev` binds only to loopback. Stop with Ctrl+C. No paid model key, Docker, or cloud account is needed.

For frontend development, run `npm run dev` in `frontend/` alongside the API and open http://127.0.0.1:5173. Vite proxies API requests to port 8000. Rebuild with `make ui-build` when using the UI served by FastAPI. Restart FastAPI after the first UI build or after replacing model artifacts.

## What is implemented

- FastAPI request validation, SQLite/PostgreSQL persistence, Alembic migrations, API key support, liveness/readiness probes.
- TF-IDF + logistic regression classifier for database, Kubernetes, network, application, and security incidents. Uncertain predictions are marked for human triage; scores are not calibrated probabilities of correctness.
- Reproducible training with dataset, source, and artifact hashes; a held-out macro-F1 demo gate; optional MLflow tracking and model registration. Training never runs at API startup.
- Runbook retrieval using **384-dimensional hashed lexical vectors**. SQLite computes cosine similarity locally; PostgreSQL uses pgvector. This first version does **not** claim semantic embedding quality.
- Extractive runbook recommendations without external calls. Optional structured LLM recommendations validate citation IDs and fall back to runbooks on provider errors or invalid output. Citation membership does not prove factual grounding; human review remains required.
- React/TypeScript review interface, history, runbook library, persisted feedback and category corrections.
- Prometheus HTTP and triage metrics, provisioned Grafana dashboards, alert rules, optional OpenTelemetry export.
- Non-root Docker image, Compose services, repository-level GitHub Actions validation, and undeployed Terraform/GKE configuration.

## Stack and versions

Versions were resolved against the official package registries/upstream releases during setup. Python dependencies are pinned in `pyproject.toml` and `uv.lock`; frontend versions are pinned in `frontend/package.json` and `package-lock.json`.

| Component | Version |
| --- | --- |
| Python runtime | 3.13 (compatibility baseline for this local environment) |
| FastAPI | 0.141.1 |
| Pydantic / SQLAlchemy | 2.13.5 / 2.0.54 |
| scikit-learn / MLflow | 1.9.1 / 3.16.1 |
| React / TypeScript / Vite | 19.3.0 / 7.0.2 / 8.3.0 |
| Prometheus / Grafana | 3.14.0 / 13.2.2 |
| Terraform Google provider | 8.4.0 |

OpenTelemetry's Python instrumentation uses upstream beta numbering (`0.65b0`), paired with stable SDK/exporter `1.44.0`. Docker base runtime tags track their supported release line; promote digest-pinned images for real deployments.

## MLflow locally

In another terminal:

```sh
.venv/bin/mlflow server --host 127.0.0.1 --port 5000 \
  --backend-store-uri sqlite:///./mlflow.db \
  --artifacts-destination ./mlruns --serve-artifacts
```

Then:

```sh
.venv/bin/incident-train --track
```

Open http://127.0.0.1:5000. The `incident-routing` experiment records metrics and dataset/code metadata and registers model versions. The API serves its **local checksum-verified artifact**, not a mutable registry alias. Restart it after retraining. This demo registers evaluated candidates; a real release needs a separate approval/promotion step and immutable artifact delivery.

## Full local stack with Docker

Start Docker Desktop, then:

```sh
# Stop any directly running API/MLflow processes first to free ports 8000/5000.
docker compose up --build -d
docker compose logs -f api
```

| Service | Local address |
| --- | --- |
| App / API docs | http://127.0.0.1:8000 / http://127.0.0.1:8000/docs |
| MLflow | http://127.0.0.1:5000 |
| Prometheus | http://127.0.0.1:9090 |
| Grafana | http://127.0.0.1:3000 |

Grafana credentials: `admin` / `local-development-only`. PostgreSQL credentials are also explicitly development-only. All published ports bind to loopback. Compose uses PostgreSQL + pgvector, a separate MLflow database, persistent artifact storage, and a one-shot migration/seed service before API startup.

`docker compose down` preserves volumes. `docker compose down -v` deletes the local database and monitoring volumes; use it only when intentionally resetting the demo.

OpenTelemetry exports traces to the local collector's basic debug output. A durable trace backend is not included. Prometheus evaluates alerts; external notification delivery needs Alertmanager configuration later.

## Optional LLM mode

Copy `.env.example` to `.env`, set `LLM_PROVIDER=openai`, `OPENAI_API_KEY`, and `OPENAI_MODEL` to a structured-output-capable model available to your account. Restart the API. This explicitly sends the submitted incident and retrieved runbook text to the provider and can incur API charges. Do not submit secrets or customer data without the appropriate controls.

The default mode stays fully local. No paid API call is needed for tests. The provider integration follows the [official structured outputs guide](https://developers.openai.com/api/docs/guides/structured-outputs/); it is mocked in tests and has not been validated with a paid live request.

## Verification

```sh
make lint
make test
make ui-build
.venv/bin/python scripts/smoke_test.py  # requires running API; adds one demo incident
cd frontend
npx playwright install chromium
npx playwright test                    # requires running API and built frontend
```

The browser tests also add demo incidents and feedback. The workflow in [`../.github/workflows/pymlsystem-ci.yml`](../.github/workflows/pymlsystem-ci.yml) is placed at the actual `upSkilling` repository root so GitHub can discover it. It runs Python/UI checks, validates Terraform, and exercises the Compose/PostgreSQL path on CI. It does not publish images or deploy to GCP. If extracting this folder into its own repository, move that workflow into `.github/workflows/` and remove `pyMlSystem/` working-directory/path prefixes.

## Architecture and next steps

See [architecture and learning roadmap](docs/architecture.md), [future cloud deployment](docs/cloud-deployment.md), and [validation results](docs/validation.md). Cloud templates are deliberately separate from local setup. No GCP resources have been created.
