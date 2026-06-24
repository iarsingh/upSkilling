import json
import math
import os
from datetime import UTC, datetime, timedelta

import numpy as np
from google.cloud import pubsub_v1, storage

from src.common.model_io import load_json


def population_stability_index(expected: list[float], actual: list[float]) -> float:
    epsilon = 1e-6
    expected_array = np.asarray(expected, dtype=float) + epsilon
    actual_array = np.asarray(actual, dtype=float) + epsilon
    return float(np.sum((actual_array - expected_array) * np.log(actual_array / expected_array)))


def feature_psi(values: list[float], quantiles: list[float]) -> float:
    bins = np.asarray(quantiles, dtype=float)
    bins = np.unique(bins)
    if len(bins) < 3:
        return 0.0
    bins[0] = -math.inf
    bins[-1] = math.inf
    actual_counts, _ = np.histogram(values, bins=bins)
    actual_distribution = actual_counts / max(actual_counts.sum(), 1)
    expected_distribution = np.full(len(actual_distribution), 1 / len(actual_distribution))
    return population_stability_index(expected_distribution.tolist(), actual_distribution.tolist())


def calculate_drift(baseline: dict, rows: list[list[float]]) -> dict:
    feature_names = baseline["feature_names"]
    matrix = np.asarray(rows, dtype=float)
    scores = {
        name: feature_psi(matrix[:, index].tolist(), baseline["quantiles"][name])
        for index, name in enumerate(feature_names)
    }
    return {
        "feature_psi": scores,
        "max_psi": max(scores.values(), default=0.0),
        "mean_psi": float(np.mean(list(scores.values()))) if scores else 0.0,
        "sample_count": len(rows),
    }


def read_recent_rows(bucket_name: str, prefix: str, hours: int) -> list[list[float]]:
    cutoff = datetime.now(UTC) - timedelta(hours=hours)
    rows: list[list[float]] = []
    client = storage.Client()
    for blob in client.list_blobs(bucket_name, prefix=prefix):
        if blob.updated and blob.updated < cutoff:
            continue
        event = json.loads(blob.download_as_text())
        rows.extend(event.get("instances", []))
    return rows


def publish_retraining_event(result: dict) -> str | None:
    project_id = os.getenv("GCP_PROJECT_ID")
    topic_id = os.getenv("RETRAIN_TOPIC_ID")
    if not project_id or not topic_id:
        return None
    publisher = pubsub_v1.PublisherClient()
    topic_path = publisher.topic_path(project_id, topic_id)
    payload = {
        "reason": "feature_drift",
        "detected_at": datetime.now(UTC).isoformat(),
        **result,
    }
    return publisher.publish(topic_path, json.dumps(payload).encode("utf-8")).result()


def write_drift_report(bucket_name: str, result: dict) -> str:
    blob_name = f"drift-reports/{datetime.now(UTC):%Y/%m/%d/%H%M%S}.json"
    storage.Client().bucket(bucket_name).blob(blob_name).upload_from_string(
        json.dumps(result, indent=2),
        content_type="application/json",
    )
    return f"gs://{bucket_name}/{blob_name}"


def main() -> None:
    baseline = load_json(os.environ["BASELINE_URI"])
    rows = read_recent_rows(
        os.environ["PREDICTION_LOG_BUCKET"],
        os.getenv("PREDICTION_LOG_PREFIX", "predictions"),
        int(os.getenv("LOOKBACK_HOURS", "24")),
    )
    minimum_samples = int(os.getenv("MINIMUM_SAMPLES", "100"))
    if len(rows) < minimum_samples:
        print(json.dumps({"status": "insufficient_samples", "sample_count": len(rows)}))
        return

    result = calculate_drift(baseline, rows)
    threshold = float(os.getenv("DRIFT_THRESHOLD", "0.2"))
    result["drift_detected"] = result["max_psi"] >= threshold
    result["report_uri"] = write_drift_report(
        os.getenv("DRIFT_REPORT_BUCKET", os.environ["PREDICTION_LOG_BUCKET"]),
        result,
    )
    if result["drift_detected"]:
        result["pubsub_message_id"] = publish_retraining_event(result)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
