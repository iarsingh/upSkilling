from datetime import datetime, timezone
from pathlib import Path

import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

from incident_copilot.model import FEATURE_COLUMNS

DATA_PATH = Path("data/raw/incidents.csv")
MODEL_PATH = Path("models/incident_risk_model.joblib")
REPORT_PATH = Path("data/processed/training_report.txt")


def train() -> None:
    data = pd.read_csv(DATA_PATH)
    x = data[FEATURE_COLUMNS]
    y = data["incident"]
    x_train, x_test, y_train, y_test = train_test_split(
        x, y, test_size=0.25, random_state=42, stratify=y
    )

    pipeline = Pipeline(
        steps=[
            ("scaler", StandardScaler()),
            (
                "classifier",
                RandomForestClassifier(
                    n_estimators=180,
                    max_depth=8,
                    min_samples_leaf=4,
                    random_state=42,
                    class_weight="balanced",
                ),
            ),
        ]
    )
    pipeline.fit(x_train, y_train)
    probabilities = pipeline.predict_proba(x_test)[:, 1]
    predictions = (probabilities >= 0.5).astype(int)
    auc = roc_auc_score(y_test, probabilities)

    MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    version = datetime.now(timezone.utc).strftime("incident-rf-%Y%m%d%H%M%S")
    joblib.dump({"pipeline": pipeline, "version": version}, MODEL_PATH)
    REPORT_PATH.write_text(
        f"version={version}\nroc_auc={auc:.4f}\n\n"
        + classification_report(y_test, predictions),
        encoding="utf-8",
    )
    print(f"Saved model to {MODEL_PATH}")
    print(f"ROC AUC: {auc:.4f}")


if __name__ == "__main__":
    train()
