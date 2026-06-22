import json
import math
from pathlib import Path


FEATURES = [
    "monthly_spend",
    "support_tickets",
    "tenure_months",
    "product_usage_score",
]


def train_gaussian_nb(rows: list[dict[str, float]]) -> dict:
    grouped = {
        0: [row for row in rows if int(row["churned"]) == 0],
        1: [row for row in rows if int(row["churned"]) == 1],
    }
    total = len(rows)
    if total == 0 or not grouped[0] or not grouped[1]:
        raise ValueError("Training data must contain both churn classes.")

    model = {"features": FEATURES, "classes": {}}
    for klass, class_rows in grouped.items():
        stats = {}
        for feature in FEATURES:
            values = [row[feature] for row in class_rows]
            mean = sum(values) / len(values)
            variance = sum((value - mean) ** 2 for value in values) / len(values)
            stats[feature] = {"mean": mean, "variance": max(variance, 1e-6)}
        model["classes"][str(klass)] = {
            "prior": len(class_rows) / total,
            "stats": stats,
        }
    return model


def predict_proba(model: dict, row: dict[str, float]) -> float:
    scores = {}
    for klass, payload in model["classes"].items():
        score = math.log(payload["prior"])
        for feature in model["features"]:
            mean = payload["stats"][feature]["mean"]
            variance = payload["stats"][feature]["variance"]
            value = row[feature]
            score += -0.5 * math.log(2 * math.pi * variance)
            score += -((value - mean) ** 2) / (2 * variance)
        scores[klass] = score

    max_score = max(scores.values())
    exp_scores = {klass: math.exp(score - max_score) for klass, score in scores.items()}
    total = sum(exp_scores.values())
    return exp_scores["1"] / total


def evaluate(model: dict, rows: list[dict[str, float]], threshold: float = 0.5) -> dict:
    correct = 0
    true_positive = 0
    false_positive = 0
    false_negative = 0

    for row in rows:
        actual = int(row["churned"])
        predicted = int(predict_proba(model, row) >= threshold)
        correct += int(actual == predicted)
        true_positive += int(actual == 1 and predicted == 1)
        false_positive += int(actual == 0 and predicted == 1)
        false_negative += int(actual == 1 and predicted == 0)

    precision = true_positive / max(true_positive + false_positive, 1)
    recall = true_positive / max(true_positive + false_negative, 1)
    f1 = 2 * precision * recall / max(precision + recall, 1e-9)

    return {
        "accuracy": round(correct / len(rows), 4),
        "precision": round(precision, 4),
        "recall": round(recall, 4),
        "f1": round(f1, 4),
        "rows": len(rows),
    }


def save_json(payload: dict, path: Path) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, sort_keys=True), encoding="utf-8")
    return path


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))
