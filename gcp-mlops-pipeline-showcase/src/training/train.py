import argparse
import json
import os
from pathlib import Path

import joblib
import mlflow
import mlflow.sklearn
import numpy as np
from sklearn.datasets import load_diabetes
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split

from src.common.model_io import upload_file


def train_model(
    output_dir: Path,
    *,
    n_estimators: int = 120,
    max_depth: int = 8,
    random_state: int = 42,
) -> dict:
    dataset = load_diabetes(as_frame=True)
    x_train, x_test, y_train, y_test = train_test_split(
        dataset.data,
        dataset.target,
        test_size=0.2,
        random_state=random_state,
    )

    model = RandomForestRegressor(
        n_estimators=n_estimators,
        max_depth=max_depth,
        random_state=random_state,
        n_jobs=-1,
    )
    model.fit(x_train, y_train)
    predictions = model.predict(x_test)

    metrics = {
        "mae": float(mean_absolute_error(y_test, predictions)),
        "rmse": float(mean_squared_error(y_test, predictions) ** 0.5),
        "r2": float(r2_score(y_test, predictions)),
    }
    baseline = {
        "feature_names": list(dataset.feature_names),
        "mean": {name: float(value) for name, value in x_train.mean().items()},
        "std": {name: float(value) for name, value in x_train.std().items()},
        "quantiles": {
            name: [float(value) for value in np.quantile(x_train[name], np.linspace(0, 1, 11))]
            for name in dataset.feature_names
        },
    }

    output_dir.mkdir(parents=True, exist_ok=True)
    model_path = output_dir / "model.joblib"
    metrics_path = output_dir / "metrics.json"
    baseline_path = output_dir / "baseline.json"
    joblib.dump(model, model_path)
    metrics_path.write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    baseline_path.write_text(json.dumps(baseline, indent=2), encoding="utf-8")

    tracking_uri = os.getenv("MLFLOW_TRACKING_URI", "sqlite:///mlflow.db")
    mlflow.set_tracking_uri(tracking_uri)
    mlflow.set_experiment(os.getenv("MLFLOW_EXPERIMENT_NAME", "diabetes-regression"))

    with mlflow.start_run(run_name=os.getenv("MLFLOW_RUN_NAME", "random-forest-training")):
        mlflow.log_params(
            {
                "n_estimators": n_estimators,
                "max_depth": max_depth,
                "random_state": random_state,
                "dataset": "sklearn-diabetes",
            }
        )
        mlflow.log_metrics(metrics)
        mlflow.log_artifact(metrics_path)
        mlflow.log_artifact(baseline_path)
        mlflow.sklearn.log_model(model, name="model")

    artifact_uri = os.getenv("MODEL_ARTIFACT_URI")
    baseline_uri = os.getenv("BASELINE_ARTIFACT_URI")
    if artifact_uri:
        upload_file(model_path, artifact_uri)
    if baseline_uri:
        upload_file(baseline_path, baseline_uri)

    return {"metrics": metrics, "model_path": str(model_path), "baseline_path": str(baseline_path)}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output-dir", default="artifacts")
    parser.add_argument("--n-estimators", type=int, default=120)
    parser.add_argument("--max-depth", type=int, default=8)
    args = parser.parse_args()
    result = train_model(
        Path(args.output_dir),
        n_estimators=args.n_estimators,
        max_depth=args.max_depth,
    )
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
