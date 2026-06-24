# Days 46-60 Build Plan

## Days 46-48: Training and MLflow

- Implement deterministic scikit-learn regression.
- Record parameters, MAE, RMSE, and R2.
- Generate a feature-distribution baseline.
- Run MLflow on GKE with Cloud SQL and GCS.
- Confirm the training Job appears in the MLflow UI.

Evidence:

- MLflow experiment screenshot
- Metrics and parameters
- GCS model and baseline objects
- Reproducible local test run

## Days 49-51: FastAPI Serving

- Build the shared model-serving image.
- Add health and readiness probes.
- Add standard `/predict` endpoint.
- Add KServe V2 inference endpoint.
- Write GCS prediction telemetry.
- Add Prometheus request, latency, and throughput metrics.

Evidence:

- API request/response
- Container image in Artifact Registry
- Prometheus target and metrics
- Grafana latency/throughput dashboard

## Days 52-54: KServe

- Install cert-manager, Knative Serving, Kourier, and KServe.
- Deploy the custom InferenceService.
- Verify readiness and URL routing.
- Exercise scale-to-one and concurrency autoscaling.
- Compare KServe autoscaling with the FastAPI HPA.

Evidence:

- `InferenceService READY=True`
- KServe V2 request
- Revision and pod scaling
- Architecture comparison notes

## Days 55-57: Drift Monitoring

- Store prediction feature records in GCS.
- Run the PSI drift CronJob.
- Write drift reports to GCS.
- Configure minimum sample and threshold policies.
- Add latency/error alerts and runbooks.

Evidence:

- Normal drift report
- Synthetic shifted-data report
- Pub/Sub event with feature-level PSI
- Grafana and alert screenshots

## Days 58-60: Automated Retraining and Showcase

- Deploy the authenticated Cloud Run retraining webhook.
- Configure Pub/Sub push delivery with OIDC.
- Submit a Vertex AI CustomJob from a drift event.
- Verify candidate model and baseline artifacts.
- Complete README, demo script, and interview explanation.

Evidence:

- Cloud Run request log
- Vertex AI CustomJob
- Candidate GCS artifacts
- End-to-end sequence screenshot
- Final GitHub repository walkthrough

## Definition of Done

- [ ] Training is reproducible and tested.
- [ ] MLflow stores run metadata and GCS artifacts.
- [ ] FastAPI and KServe both serve the same model.
- [ ] Latency and throughput are visible in Prometheus/Grafana.
- [ ] Drift is calculated from real prediction records.
- [ ] Drift creates a Pub/Sub event.
- [ ] Cloud Run submits a Vertex AI retraining job.
- [ ] Retrained candidates require promotion gates before production.
