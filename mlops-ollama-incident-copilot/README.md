# MLOps & ML Infrastructure Incident Copilot

Portfolio-grade MLOps project for a 7-year-experience profile: train an incident-risk model, deploy it as a FastAPI service, expose model/infra observability, and use local Ollama to generate SRE-style remediation guidance.

## Architecture

```text
Telemetry events -> Kafka / Pub/Sub -> Feature Store -> Training pipeline
                                                    |
                                                    v
MLflow / Model Registry -> FastAPI model service -> Ollama copilot
                                      |              |
                                      v              v
                              Prometheus / OTel / ELK / Grafana
                                      |
                                      v
                       Docker Compose / Helm / Kubernetes / ArgoCD
                                      |
                                      v
                         Terraform / Ansible / Vertex AI / Kubeflow
```

## Why this project is useful

- Shows end-to-end MLOps: data generation, training, artifact persistence, serving, Docker deployment, tests, and monitoring.
- Uses Ollama locally, so no cloud LLM bill or API key is required.
- Provides a realistic DevOps/AIOps use case: incident risk prediction and remediation guidance.
- Keeps service behavior reliable with an LLM fallback path if Ollama is unavailable.
- Includes a full ML infrastructure story: model registry, feature store contract, GPU scheduling, GitOps, IaC, CI/CD, databases, messaging, and observability.

## Technology map

| Area | Tech used | Where |
| --- | --- | --- |
| MLOps | MLflow, model registry, model monitoring | `docker-compose.yml`, `integrations/mlflow_register.py`, `scripts/model_monitoring_report.py` |
| Cloud ML | Vertex AI | `vertex/train_vertex.py`, `vertex/deploy_vertex.py` |
| Pipelines | Kubeflow Pipelines | `kubeflow/incident_pipeline.py` |
| Feature Store | Redis online, PostgreSQL offline contract | `feature_store/feature_contract.yaml` |
| Deployment | FastAPI, Docker, Kubernetes, Helm | `src/incident_copilot/api.py`, `Dockerfile`, `helm/`, `k8s/` |
| GPU scheduling | Kubernetes RuntimeClass, node selectors, tolerations | `k8s/gpu/`, `helm/incident-copilot/values.yaml` |
| IaC | Terraform, Ansible | `infra/terraform/`, `infra/ansible/` |
| CI/CD | GitHub Actions, GitLab CI, Jenkins, Cloud Build | `.github/`, `.gitlab-ci.yml`, `Jenkinsfile`, `cloudbuild.yaml` |
| GitOps | ArgoCD | `argocd/application.yaml` |
| Observability | Prometheus, Grafana, OpenTelemetry, ELK | `monitoring/`, `docker-compose.yml` |
| Databases | PostgreSQL, MySQL, MongoDB, Redis | `docker-compose.yml`, `db/migrations/` |
| Messaging | Kafka, Google Pub/Sub | `messaging/`, `infra/terraform/gcp/main.tf` |
| Programming | Python, Bash, Go, REST APIs | `src/`, `scripts/`, `messaging/*.sh`, `go/event-router/` |

## Prerequisites

- Python 3.10+
- Docker Desktop
- Ollama running locally
- Installed Ollama model: `llama3.1:8b`

Check Ollama:

```bash
ollama list
ollama serve
curl http://localhost:11434/api/tags
```

Pull the model if needed:

```bash
ollama pull llama3.1:8b
```

## Local setup

```bash
cd mlops-ollama-incident-copilot
make setup
source .venv/bin/activate
make train
make test
make api
```

Open the API docs:

```text
http://localhost:8080/docs
```

Confirm the API can see Ollama:

```bash
curl http://localhost:8080/health
```

Look for `"ollama_connected": true`. If it is `false`, start Ollama with `ollama serve`
and make sure `OLLAMA_BASE_URL` points to `http://localhost:11434`.

## Test a prediction

```bash
curl -X POST http://localhost:8080/predict \
  -H "Content-Type: application/json" \
  -d @docs/sample-request.json
```

Expected response:

```json
{
  "incident_probability": 0.91,
  "risk_level": "high",
  "recommendation": "...",
  "model_version": "incident-rf-...",
  "copilot_source": "ollama"
}
```

If Ollama is stopped, `copilot_source` becomes `fallback` and the API still returns a useful recommendation.

## Docker deployment

Train the model first so Docker can mount the artifact:

```bash
make train
docker compose up --build
```

Services:

- API: `http://localhost:8080`
- API docs: `http://localhost:8080/docs`
- MLflow: `http://localhost:5000`
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3000` with `admin/admin`
- Elasticsearch: `http://localhost:9200`
- Kibana: `http://localhost:5601`
- PostgreSQL: `localhost:5432`
- MySQL: `localhost:3306`
- MongoDB: `localhost:27017`
- Redis: `localhost:6379`
- Kafka: `localhost:9092`

## Platform checks

```bash
make test
make helm-template
make terraform-fmt
cd go/event-router && go test ./...
```

Run the model monitoring report:

```bash
source .venv/bin/activate
PYTHONPATH=src python scripts/model_monitoring_report.py
```

Run the Go REST integration client:

```bash
make go-run
```

## Kubernetes and GitOps

Render Helm:

```bash
helm template incident-copilot ./helm/incident-copilot
```

Deploy to a cluster:

```bash
helm upgrade --install incident-copilot ./helm/incident-copilot \
  --namespace mlops \
  --create-namespace
```

ArgoCD application:

```bash
kubectl apply -f argocd/application.yaml
```

GPU Ollama deployment example:

```bash
kubectl apply -f k8s/base/namespace.yaml
kubectl apply -f k8s/gpu/
```

## Terraform and Ansible

GCP/GKE/Artifact Registry/Pub/Sub skeleton:

```bash
cd infra/terraform/gcp
terraform init
terraform plan -var="project_id=<your-gcp-project>"
```

Local bootstrap checks:

```bash
ansible-playbook -i infra/ansible/inventory/local.ini \
  infra/ansible/playbooks/bootstrap-local.yml
```

## Endpoints

- `GET /health`: service status and model load state
- `GET /ready`: readiness probe
- `GET /model/info`: registry/model metadata
- `POST /predict`: incident probability plus Ollama recommendation
- `GET /metrics`: Prometheus metrics

## MLOps points to explain in interviews

- Feature contract is explicit through Pydantic schemas.
- Model artifact is versioned at training time.
- Serving code fails closed when the model is missing.
- LLM integration is isolated behind a client class and has a deterministic fallback.
- Prometheus metrics support request counting and latency tracking.
- Docker Compose gives a local platform path for API, monitoring, and dashboarding.
- Helm values expose runtime config, scaling, probes, and GPU scheduling.
- Terraform owns cloud primitives; ArgoCD owns Kubernetes desired state.
- Kafka/Pub/Sub represent streaming telemetry paths for hybrid cloud designs.

## Suggested production upgrades

- Replace synthetic data with real observability exports from Cloud Logging, Prometheus, or OpenTelemetry.
- Add full MLflow model flavor registration and stage transitions.
- Add richer drift checks on latency, error rate, restarts, and queue depth.
- Add CI with lint, unit tests, Docker build, and vulnerability scanning.
- Add auth, rate limiting, and request audit logs before exposing the API beyond localhost.
