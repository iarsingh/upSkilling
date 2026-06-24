# Operations Runbook

## Model API Is Not Ready

```bash
kubectl describe pod -n mlops-demo -l app=model-api
kubectl logs -n mlops-demo deployment/model-api
```

Check the GCS model URI, Workload Identity binding, object permissions, model compatibility, and startup probe events.

## KServe InferenceService Is Not Ready

```bash
kubectl get inferenceservice diabetes-regressor -n mlops-demo -o yaml
kubectl get revisions,configurations,routes -n mlops-demo
kubectl get events -n mlops-demo --sort-by=.lastTimestamp
```

Check KServe/Knative controllers, image access, storage permissions, revision readiness, and ingress configuration.

## MLflow Cannot Reach Cloud SQL

```bash
kubectl logs deployment/mlflow -n mlops-demo -c cloud-sql-proxy
kubectl logs deployment/mlflow -n mlops-demo -c mlflow
kubectl get secret mlflow-db -n mlops-demo
```

Verify the instance connection name, `roles/cloudsql.client`, database/user creation, and password secret.

## Drift Job Has No Samples

Confirm `PREDICTION_LOG_BUCKET` is set on serving pods and check:

```bash
gcloud storage ls --recursive gs://YOUR_PREDICTION_BUCKET/predictions/
kubectl logs -n mlops-demo job/<drift-job>
```

## Pub/Sub Does Not Invoke Cloud Run

```bash
gcloud pubsub subscriptions describe model-retraining-cloud-run
gcloud run services get-iam-policy model-retraining-trigger --region us-central1
gcloud logging read 'resource.type="cloud_run_revision"' --limit=20
```

Verify the push service account has `roles/run.invoker` and the audience matches the Cloud Run URL.

## Vertex AI Job Fails

Check:

- Training image exists and is readable.
- Vertex service account has Artifact Registry read and GCS access.
- Cloud Run retrainer can act as the Vertex training service account.
- Artifact destination variables are valid.
- Machine type is available in the selected region.
