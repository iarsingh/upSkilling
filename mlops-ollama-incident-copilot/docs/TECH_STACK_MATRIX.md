# Tech Stack Matrix

This project intentionally uses a broad MLOps and ML infrastructure stack. Each technology has a clear responsibility so the project reads like real platform engineering rather than a keyword dump.

| Technology | Responsibility |
| --- | --- |
| Kubeflow | Batch training pipeline definition. |
| MLflow | Experiment tracking and model registry target. |
| Vertex AI | Managed cloud training and serving path. |
| Model Registry | Versioned model metadata through MLflow/Vertex-ready scripts. |
| Model Monitoring | Drift report script and Prometheus metrics. |
| Feature Store | Redis online store and PostgreSQL offline store contract. |
| Model Deployment | FastAPI service, Docker, Helm, Kubernetes. |
| GPU Scheduling | Kubernetes GPU RuntimeClass, tolerations, node selectors. |
| Docker | Local image build and full platform Compose environment. |
| Kubernetes | Runtime orchestration and health probes. |
| Helm | Parameterized release packaging. |
| Terraform | GCP/GKE/Artifact Registry/Pub/Sub infrastructure. |
| Ansible | Local workstation/platform bootstrap checks. |
| Python | Training, serving, monitoring, integrations. |
| Bash | Topic/bootstrap automation. |
| Go | REST event-router integration client. |
| REST API | FastAPI `/predict`, `/health`, `/ready`, `/metrics`. |
| GitHub Actions | Main CI quality and image build workflow. |
| GitLab CI/CD | Alternate CI/CD path. |
| Jenkins | Enterprise CI/CD pipeline. |
| Google Cloud Build | GCP-native container build pipeline. |
| ArgoCD | GitOps deployment controller manifest. |
| ELK | Log ingestion and search path. |
| Prometheus | Metrics scraping. |
| Grafana | Dashboarding. |
| OpenTelemetry | Vendor-neutral metrics/traces collector. |
| PostgreSQL | Offline feature store/audit/MLflow backend. |
| MySQL | Relational workload dependency example. |
| MongoDB | Document store dependency example. |
| Redis | Online feature store/cache. |
| Kafka | Streaming telemetry bus. |
| Google Pub/Sub | Cloud messaging equivalent. |
