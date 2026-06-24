# GCP MLOps Pipeline on GKE

End-to-end MLOps showcase using Vertex AI, MLflow, FastAPI, GKE, Cloud Storage, KServe, Prometheus, Pub/Sub, and Cloud Run.

## Outcome

This project demonstrates a live model lifecycle rather than only a prediction API:

```text
scikit-learn training
  -> MLflow experiment and model lineage
  -> model + feature baseline in Cloud Storage
  -> FastAPI and KServe deployment on GKE
  -> Prometheus latency and throughput metrics
  -> prediction features written to Cloud Storage
  -> scheduled PSI drift detection
  -> Pub/Sub retraining event
  -> Cloud Run retraining trigger
  -> Vertex AI CustomJob
  -> new model artifacts for controlled promotion
```

## Stack

- **Training:** scikit-learn Random Forest regression, Vertex AI Custom Training
- **Experiment tracking:** MLflow on GKE, Cloud SQL metadata, Cloud Storage artifacts
- **Serving:** FastAPI and KServe V2 inference protocol
- **Runtime:** private regional GKE with Workload Identity
- **Autoscaling:** Kubernetes HPA and KServe/Knative concurrency autoscaling
- **Monitoring:** Prometheus, Grafana, PSI feature drift, GCS drift reports
- **Automation:** Pub/Sub push subscription, authenticated Cloud Run, Vertex AI
- **Delivery:** GitHub Actions, Artifact Registry, Terraform, Kustomize

## Model

The sample uses the scikit-learn diabetes regression dataset and predicts a continuous disease-progression score from ten normalized features:

```text
age, sex, bmi, bp, s1, s2, s3, s4, s5, s6
```

Training produces:

- `model.joblib`
- `metrics.json`
- `baseline.json` with feature means, standard deviations, and decile boundaries
- MLflow run parameters, metrics, and model artifact

## Architecture

See [Architecture](docs/architecture.md) for trust boundaries and design decisions.

```text
GitHub Actions
├── Ruff + Pytest
├── Terraform and Kustomize validation
└── container build/publish
        |
        v
Artifact Registry
├── training
├── model-serving
├── retrainer
└── mlflow
        |
        v
GKE
├── MLflow + Cloud SQL Proxy
├── initial training Job
├── FastAPI Deployment + HPA
├── KServe InferenceService
├── drift-monitor CronJob
└── Prometheus/Grafana configuration
        |
        +--> GCS model artifacts, MLflow artifacts, prediction logs, drift reports
        |
        +--> Pub/Sub drift event
                 |
                 v
        Authenticated Cloud Run retrainer
                 |
                 v
        Vertex AI Custom Training Job
```

## Repository Structure

```text
.
├── .github/workflows/mlops-ci.yml
├── docker/
├── docs/
├── k8s/
│   ├── base/
│   └── overlays/prod/
├── scripts/
├── src/
│   ├── common/
│   ├── monitoring/
│   ├── retrainer/
│   ├── serving/
│   └── training/
├── terraform/
└── tests/
```

## Local Demo

```bash
make setup
make train
```

Local experiment metadata is written to `mlflow.db`; GKE uses Cloud SQL PostgreSQL.

Run serving:

```bash
MODEL_URI=artifacts/model.joblib \
  .venv/bin/uvicorn src.serving.app:app --reload --port 8080
```

Predict:

```bash
curl -X POST http://127.0.0.1:8080/predict \
  -H 'Content-Type: application/json' \
  -d '{
    "instances": [[0.038, 0.051, 0.062, 0.022, -0.044, -0.035, -0.043, -0.003, 0.019, -0.018]]
  }'
```

KServe V2-compatible request:

```bash
curl -X POST http://127.0.0.1:8080/v2/models/diabetes-regressor/infer \
  -H 'Content-Type: application/json' \
  -d '{
    "id": "demo-001",
    "inputs": [{
      "name": "features",
      "shape": [1, 10],
      "datatype": "FP64",
      "data": [0.038, 0.051, 0.062, 0.022, -0.044, -0.035, -0.043, -0.003, 0.019, -0.018]
    }]
  }'
```

## Provision GCP

Build and push bootstrap images before the first Terraform apply because Cloud Run requires an existing retrainer image.

```bash
export PROJECT_ID="your-mlops-project"
export REGION="us-central1"
gcloud auth configure-docker "${REGION}-docker.pkg.dev"
```

Create the Artifact Registry repository first, or run a targeted Terraform apply:

```bash
terraform -chdir=terraform init
terraform -chdir=terraform apply \
  -target=google_project_service.services \
  -target=google_artifact_registry_repository.mlops \
  -var="project_id=${PROJECT_ID}" \
  -var="mlflow_database_password=temporary-not-used" \
  -var="retrainer_image_uri=${REGION}-docker.pkg.dev/${PROJECT_ID}/mlops/retrainer:bootstrap" \
  -var="training_image_uri=${REGION}-docker.pkg.dev/${PROJECT_ID}/mlops/training:bootstrap"
```

Build and push the four images:

```bash
for component in training serving retrainer mlflow
do
  image_name="${component}"
  [ "${component}" = "serving" ] && image_name="model-serving"
  docker build -f "docker/${component}.Dockerfile" \
    -t "${REGION}-docker.pkg.dev/${PROJECT_ID}/mlops/${image_name}:bootstrap" .
  docker push "${REGION}-docker.pkg.dev/${PROJECT_ID}/mlops/${image_name}:bootstrap"
done
```

Then apply the full infrastructure:

```bash
cp terraform/terraform.tfvars.example terraform/terraform.tfvars
terraform -chdir=terraform plan
terraform -chdir=terraform apply
```

## Deploy GKE Components

Install KServe and Knative:

```bash
chmod +x scripts/install-kserve.sh
./scripts/install-kserve.sh
```

Create the MLflow database secret:

```bash
kubectl create namespace mlops-demo --dry-run=client -o yaml | kubectl apply -f -
kubectl create secret generic mlflow-db \
  -n mlops-demo \
  --from-literal='database-url=postgresql://mlflow:YOUR_PASSWORD@127.0.0.1:5432/mlflow'
```

Replace these manifest placeholders before deployment:

- `PROJECT_ID`
- `MODEL_BUCKET`
- `PREDICTION_BUCKET`
- `MLFLOW_BUCKET`

Deploy:

```bash
kubectl kustomize k8s/overlays/prod \
  | sed "s/PROJECT_ID/${PROJECT_ID}/g" \
  | sed "s/MODEL_BUCKET/${PROJECT_ID}-model-artifacts/g" \
  | sed "s/PREDICTION_BUCKET/${PROJECT_ID}-prediction-logs/g" \
  | sed "s/MLFLOW_BUCKET/${PROJECT_ID}-mlflow/g" \
  | kubectl apply -f -
```

## Verify

```bash
kubectl get pods,jobs,cronjobs,hpa -n mlops-demo
kubectl get inferenceservice diabetes-regressor -n mlops-demo
kubectl logs job/initial-model-training -n mlops-demo
kubectl port-forward service/mlflow 5000:5000 -n mlops-demo
kubectl port-forward service/model-api 8080:80 -n mlops-demo
```

MLflow UI:

```text
http://127.0.0.1:5000
```

## Monitoring and Retraining

The inference service exports:

- `mlops_prediction_requests_total`
- `mlops_prediction_latency_seconds`
- `mlops_predictions_last_request`

Every prediction batch is stored as JSON in GCS. The drift CronJob:

1. Reads recent prediction records.
2. Compares each feature to training deciles using PSI.
3. Writes a versioned drift report to GCS.
4. Publishes to `model-retraining` when maximum PSI exceeds `0.2`.
5. Pub/Sub securely invokes Cloud Run with OIDC.
6. Cloud Run submits a Vertex AI CustomJob using the training image.

See [Drift and Retraining](docs/drift-and-retraining.md).

## CI/CD Configuration

Required repository configuration:

| Type | Name |
| --- | --- |
| Variable | `GCP_PROJECT_ID` |
| Variable | `MODEL_BUCKET` |
| Variable | `PREDICTION_BUCKET` |
| Variable | `MLFLOW_BUCKET` |
| Secret | `GCP_WORKLOAD_IDENTITY_PROVIDER` |
| Secret | `GCP_DEPLOY_SERVICE_ACCOUNT` |
| Secret | `MLFLOW_DATABASE_PASSWORD` |

## Interview Talking Point

> I built an event-driven MLOps pipeline on GKE. Training runs log model parameters, metrics, and artifacts to MLflow backed by Cloud SQL and GCS. The same image supports FastAPI and KServe V2 inference, while Prometheus tracks latency and throughput. Prediction features are written to GCS, a scheduled PSI monitor detects drift, and Pub/Sub invokes an authenticated Cloud Run service that starts a Vertex AI CustomJob. This gives me reproducible training, Kubernetes-native serving, managed retraining, and an auditable model lifecycle.

## Days 46-60

The build sequence and evidence checklist are in [Days 46-60 Plan](docs/days-46-60-plan.md).

## Cost and Safety

- GKE, Cloud SQL, Cloud Run, Vertex AI, Artifact Registry, and GCS are billable.
- KServe serverless mode also installs Knative components.
- Production GKE and Cloud SQL deletion protection are enabled.
- Never commit `terraform.tfvars`, database passwords, service-account keys, or kubeconfig files.
