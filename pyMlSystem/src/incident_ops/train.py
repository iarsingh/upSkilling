import argparse
import hashlib
import io
import json
import os
import subprocess
from pathlib import Path

import joblib
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score
from sklearn.pipeline import Pipeline


def train(data_path: Path, evaluation_path: Path, output: Path, track: bool = False) -> dict:
    training = json.loads(data_path.read_text())
    evaluation = json.loads(evaluation_path.read_text())
    if {r["text"] for r in training} & {r["text"] for r in evaluation}:
        raise ValueError("Training and evaluation examples overlap")
    pipeline = Pipeline(
        [
            ("tfidf", TfidfVectorizer(ngram_range=(1, 2), sublinear_tf=True)),
            ("classifier", LogisticRegression(C=8, max_iter=1000, random_state=42)),
        ]
    )
    pipeline.fit([r["text"] for r in training], [r["category"] for r in training])
    predictions = pipeline.predict([r["text"] for r in evaluation])
    actual = [r["category"] for r in evaluation]
    metrics = {
        "accuracy": accuracy_score(actual, predictions),
        "macro_f1": f1_score(actual, predictions, average="macro"),
    }
    if metrics["macro_f1"] < 0.75:
        raise ValueError(f"Model failed demo quality gate: {metrics}")
    output.parent.mkdir(parents=True, exist_ok=True)
    buffer = io.BytesIO()
    joblib.dump(pipeline, buffer)
    model_bytes = buffer.getvalue()
    model_hash = hashlib.sha256(model_bytes).hexdigest()
    dataset_hash = hashlib.sha256(data_path.read_bytes()).hexdigest()
    try:
        git_sha = subprocess.check_output(
            ["git", "rev-parse", "HEAD"], stderr=subprocess.DEVNULL, text=True
        ).strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        git_sha = "uncommitted"
    metadata = {
        "version": f"demo-{model_hash[:12]}",
        "dataset_sha256": dataset_hash,
        "evaluation_sha256": hashlib.sha256(evaluation_path.read_bytes()).hexdigest(),
        "sha256": model_hash,
        "training_source_sha256": hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
        "git_sha": git_sha,
        "metrics": metrics,
        "training_rows": len(training),
        "evaluation_rows": len(evaluation),
        "data_notice": "Synthetic educational data. Metrics are not evidence of production accuracy.",
    }
    if track:
        import mlflow
        import mlflow.sklearn
        from mlflow.models import infer_signature

        mlflow.set_tracking_uri(os.getenv("MLFLOW_TRACKING_URI", "http://127.0.0.1:5000"))
        mlflow.set_experiment("incident-routing")
        with mlflow.start_run() as run:
            mlflow.log_params({"C": 8, "seed": 42, "dataset_sha256": dataset_hash, "git_sha": git_sha})
            mlflow.log_metrics(metrics)
            mlflow.set_tag("dataset_type", "synthetic-demo")
            # A tensor signature preserves a one-dimensional string input for
            # TF-IDF; a DataFrame signature would pass column names to sklearn.
            example = np.array([training[0]["text"]])
            mlflow.sklearn.log_model(
                sk_model=pipeline,
                name="classifier",
                input_example=example,
                signature=infer_signature(example, pipeline.predict(example)),
                registered_model_name="incident-routing",
            )
            metadata["mlflow_run_id"] = run.info.run_id
            mlflow.log_dict(metadata, "evaluation.json")
    # A failed tracking request must leave the previously serving artifact intact.
    # Restart the API after publishing: models are deliberately not hot-reloaded.
    output.write_bytes(model_bytes)
    output.with_suffix(".json").write_text(json.dumps(metadata, indent=2) + "\n")
    return metadata


def main():
    parser = argparse.ArgumentParser(description="Train and evaluate the synthetic incident routing baseline")
    parser.add_argument("--data", type=Path, default=Path("data/training.json"))
    parser.add_argument("--evaluation", type=Path, default=Path("data/evaluation.json"))
    parser.add_argument("--output", type=Path, default=Path("artifacts/classifier.joblib"))
    parser.add_argument("--track", action="store_true", help="Log and register model with MLflow")
    args = parser.parse_args()
    print(json.dumps(train(args.data, args.evaluation, args.output, args.track), indent=2))


if __name__ == "__main__":
    main()
