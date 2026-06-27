import base64
import json
import os
from datetime import UTC, datetime

from fastapi import FastAPI, HTTPException, Request
from google.cloud import aiplatform


app = FastAPI(title="Vertex AI Retraining Trigger", version="1.0.0")


def decode_pubsub_envelope(envelope: dict) -> dict:
    message = envelope.get("message", {})
    data = message.get("data")
    if not data:
        raise ValueError("Missing Pub/Sub message data.")
    return json.loads(base64.b64decode(data).decode("utf-8"))


def submit_vertex_training(event: dict) -> str:
    project_id = os.environ["GCP_PROJECT_ID"]
    region = os.getenv("GCP_REGION", "us-central1")
    training_image = os.environ["TRAINING_IMAGE_URI"]
    service_account = os.environ["VERTEX_TRAINING_SERVICE_ACCOUNT"]
    staging_bucket = os.environ["VERTEX_STAGING_BUCKET"]

    aiplatform.init(project=project_id, location=region, staging_bucket=staging_bucket)
    display_name = f"drift-retrain-{datetime.now(UTC):%Y%m%d-%H%M%S}"
    artifact_prefix = os.environ["MODEL_ARTIFACT_PREFIX"].rstrip("/")
    job = aiplatform.CustomJob(
        display_name=display_name,
        worker_pool_specs=[
            {
                "machine_spec": {
                    "machine_type": os.getenv("VERTEX_MACHINE_TYPE", "n1-standard-4")
                },
                "replica_count": 1,
                "container_spec": {
                    "image_uri": training_image,
                    "command": ["python", "-m", "src.training.train"],
                    "args": ["--output-dir", "/tmp/artifacts"],
                    "env": [
                        {
                            "name": "MODEL_ARTIFACT_URI",
                            "value": f"{artifact_prefix}/{display_name}/model.joblib",
                        },
                        {
                            "name": "BASELINE_ARTIFACT_URI",
                            "value": f"{artifact_prefix}/{display_name}/baseline.json",
                        },
                        {
                            "name": "MLFLOW_RUN_NAME",
                            "value": event.get("reason", "pubsub-retraining"),
                        },
                    ],
                },
            }
        ],
    )
    job.run(
        service_account=service_account,
        sync=False,
    )
    return display_name


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/")
async def retrain(request: Request) -> dict:
    try:
        event = decode_pubsub_envelope(await request.json())
        job_name = submit_vertex_training(event)
    except (ValueError, KeyError, json.JSONDecodeError) as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    return {"status": "submitted", "vertex_job": job_name, "event": event}
