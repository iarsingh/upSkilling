"""Lab 03 — local MLOps loop: train, evaluate, hash artifacts, score drift, decide retrain.

Promotion is never automatic. A PSI spike or F1 drop only recommends investigation.
Synthetic churn data only; not a production-trained model.
"""

from __future__ import annotations

import hashlib
import json
from dataclasses import asdict, dataclass
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, f1_score, precision_score, recall_score, roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

FEATURE_COLUMNS = ("tenure", "monthly_charges", "support_tickets", "late_payments", "contract")
NUMERIC = ("tenure", "monthly_charges", "support_tickets", "late_payments")
CATEGORICAL = ("contract",)
TARGET = "churn"
PSI_THRESHOLD = 0.2
F1_FLOOR = 0.62
DEFAULT_ARTIFACT_DIR = Path(__file__).resolve().parents[2] / "artifacts"


@dataclass(frozen=True)
class TrainResult:
    metrics: dict[str, float | int]
    dataset_sha256: str
    model_path: str
    metrics_path: str
    n_train: int
    n_test: int


@dataclass(frozen=True)
class RetrainDecision:
    retrain: bool
    reasons: tuple[str, ...]
    psi: dict[str, float]
    live_f1: float | None


def generate_churn(n: int = 800, seed: int = 21, drift: bool = False) -> pd.DataFrame:
    rng = np.random.default_rng(seed)
    tenure = rng.integers(1, 72, size=n).astype(np.float64)
    monthly_charges = rng.normal(72, 16, size=n).clip(15, 160)
    support_tickets = rng.poisson(1.2, size=n).astype(np.float64)
    late_payments = rng.poisson(0.5, size=n).astype(np.float64)
    contract = rng.choice(["month-to-month", "one-year", "two-year"], size=n, p=[0.58, 0.27, 0.15])
    if drift:
        monthly_charges = monthly_charges + 28
        support_tickets = support_tickets + rng.poisson(2.0, size=n)
        late_payments = late_payments + 1
    logit = (
        -1.6
        + 0.5 * support_tickets
        + 0.4 * late_payments
        - 0.03 * tenure
        + 0.008 * (monthly_charges - 72)
        + 0.35 * (contract == "month-to-month")
    )
    churn = (rng.uniform(size=n) < 1 / (1 + np.exp(-logit))).astype(int)
    return pd.DataFrame(
        {
            "tenure": tenure,
            "monthly_charges": monthly_charges,
            "support_tickets": support_tickets,
            "late_payments": late_payments,
            "contract": contract,
            "churn": churn,
        }
    )


def _pipeline() -> Pipeline:
    transform = ColumnTransformer(
        [
            ("num", StandardScaler(), list(NUMERIC)),
            ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), list(CATEGORICAL)),
        ]
    )
    return Pipeline(
        [
            ("features", transform),
            ("model", LogisticRegression(max_iter=500, class_weight="balanced")),
        ]
    )


def dataset_sha256(frame: pd.DataFrame) -> str:
    payload = frame.to_csv(index=False).encode("utf-8")
    return hashlib.sha256(payload).hexdigest()


def train_and_evaluate(
    frame: pd.DataFrame | None = None,
    artifact_dir: Path | None = None,
    seed: int = 21,
) -> TrainResult:
    frame = generate_churn(seed=seed) if frame is None else frame
    artifact_dir = Path(artifact_dir or DEFAULT_ARTIFACT_DIR)
    artifact_dir.mkdir(parents=True, exist_ok=True)
    x = frame.loc[:, list(FEATURE_COLUMNS)]
    y = frame[TARGET]
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.25, random_state=seed, stratify=y)
    pipe = _pipeline()
    pipe.fit(x_train, y_train)
    proba = pipe.predict_proba(x_test)[:, 1]
    pred = (proba >= 0.5).astype(int)
    tn, fp, fn, tp = confusion_matrix(y_test, pred, labels=[0, 1]).ravel()
    metrics = {
        "precision": float(precision_score(y_test, pred, zero_division=0)),
        "recall": float(recall_score(y_test, pred, zero_division=0)),
        "f1": float(f1_score(y_test, pred, zero_division=0)),
        "roc_auc": float(roc_auc_score(y_test, proba)),
        "tn": int(tn),
        "fp": int(fp),
        "fn": int(fn),
        "tp": int(tp),
    }
    model_path = artifact_dir / "churn_model.joblib"
    metrics_path = artifact_dir / "metrics.json"
    joblib.dump({"model": pipe, "features": list(FEATURE_COLUMNS), "metrics": metrics}, model_path)
    digest = dataset_sha256(frame)
    metrics_path.write_text(json.dumps({"metrics": metrics, "dataset_sha256": digest, "n_train": int(len(x_train))}, indent=2))
    return TrainResult(
        metrics=metrics,
        dataset_sha256=digest,
        model_path=str(model_path),
        metrics_path=str(metrics_path),
        n_train=int(len(x_train)),
        n_test=int(len(x_test)),
    )


def population_stability_index(expected: np.ndarray, actual: np.ndarray, bins: int = 10) -> float:
    expected = np.asarray(expected, dtype=np.float64)
    actual = np.asarray(actual, dtype=np.float64)
    quantiles = np.linspace(0, 1, bins + 1)
    breaks = np.unique(np.quantile(expected, quantiles))
    if breaks.size < 3:
        return 0.0
    breaks[0] = -np.inf
    breaks[-1] = np.inf
    e_counts, _ = np.histogram(expected, bins=breaks)
    a_counts, _ = np.histogram(actual, bins=breaks)
    e_perc = np.clip(e_counts / max(e_counts.sum(), 1), 1e-4, 1)
    a_perc = np.clip(a_counts / max(a_counts.sum(), 1), 1e-4, 1)
    return float(np.sum((a_perc - e_perc) * np.log(a_perc / e_perc)))


def score_drift(reference: pd.DataFrame, live: pd.DataFrame) -> dict[str, float]:
    return {col: population_stability_index(reference[col].to_numpy(), live[col].to_numpy()) for col in NUMERIC}


def decide_retrain(
    reference: pd.DataFrame,
    live: pd.DataFrame,
    trained_f1: float,
    live_f1: float | None = None,
    psi_threshold: float = PSI_THRESHOLD,
    f1_floor: float = F1_FLOOR,
) -> RetrainDecision:
    psi = score_drift(reference, live)
    reasons: list[str] = []
    drifted = [name for name, value in psi.items() if value >= psi_threshold]
    if drifted:
        reasons.append(f"psi_above_threshold columns={drifted}")
    if live_f1 is not None and live_f1 < f1_floor:
        reasons.append(f"live_f1={live_f1:.3f} below floor={f1_floor}")
    if live_f1 is not None and live_f1 < trained_f1 - 0.08:
        reasons.append(f"live_f1 dropped vs train f1={trained_f1:.3f}")
    return RetrainDecision(retrain=bool(reasons), reasons=tuple(reasons), psi=psi, live_f1=live_f1)


def evaluate_frame(model, frame: pd.DataFrame) -> float:
    pred = model.predict(frame.loc[:, list(FEATURE_COLUMNS)])
    return float(f1_score(frame[TARGET], pred, zero_division=0))


def load_model(path: Path | None = None):
    path = Path(path or DEFAULT_ARTIFACT_DIR / "churn_model.joblib")
    payload = joblib.load(path)
    return payload["model"]


def feature_contributions(model, row: pd.DataFrame) -> list[dict[str, float | str]]:
    names = model.named_steps["features"].get_feature_names_out()
    coef = model.named_steps["model"].coef_[0]
    transformed = model.named_steps["features"].transform(row)
    values = np.asarray(transformed)[0]
    items = [
        {
            "feature": str(name),
            "contribution": round(float(weight * value), 4),
            "direction": "raises" if weight * value > 0 else "lowers",
        }
        for name, weight, value in zip(names, coef, values, strict=True)
    ]
    return sorted(items, key=lambda item: abs(float(item["contribution"])), reverse=True)


def decision_to_dict(decision: RetrainDecision) -> dict:
    return asdict(decision)
