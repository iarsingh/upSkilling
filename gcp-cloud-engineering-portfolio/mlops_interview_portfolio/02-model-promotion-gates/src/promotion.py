import json
from dataclasses import dataclass
from pathlib import Path
from time import strftime


@dataclass(frozen=True)
class PromotionPolicy:
    min_accuracy: float = 0.82
    max_p99_latency_ms: int = 250
    max_error_rate: float = 0.02
    production_requires_approval: bool = True


def load_registry(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def save_registry(registry: dict, path: Path) -> None:
    path.write_text(json.dumps(registry, indent=2, sort_keys=True), encoding="utf-8")


def find_model(registry: dict, model_id: str) -> dict:
    for model in registry["models"]:
        if model["id"] == model_id:
            return model
    raise ValueError(f"Model not found: {model_id}")


def evaluate_gates(model: dict, target: str, policy: PromotionPolicy, approved_by: str | None = None) -> dict:
    metrics = model["metrics"]
    checks = {
        "accuracy": metrics["accuracy"] >= policy.min_accuracy,
        "p99_latency_ms": metrics["p99_latency_ms"] <= policy.max_p99_latency_ms,
        "error_rate": metrics["error_rate"] <= policy.max_error_rate,
        "approval": True,
    }

    if target == "production" and policy.production_requires_approval:
        checks["approval"] = bool(approved_by)

    return {
        "model_id": model["id"],
        "target": target,
        "passed": all(checks.values()),
        "checks": checks,
        "metrics": metrics,
    }


def promote_model(registry: dict, model_id: str, target: str, approved_by: str | None = None) -> dict:
    policy = PromotionPolicy()
    model = find_model(registry, model_id)
    evaluation = evaluate_gates(model, target, policy, approved_by=approved_by)
    if not evaluation["passed"]:
        return evaluation | {"promoted": False}

    if target == "production":
        for sibling in registry["models"]:
            if sibling["name"] == model["name"] and sibling["stage"] == "production":
                sibling["stage"] = "archived"
                sibling.setdefault("audit", []).append(
                    {"event": "archived", "reason": f"superseded by {model_id}"}
                )

    model["stage"] = target
    model.setdefault("audit", []).append(
        {
            "event": "promoted",
            "target": target,
            "approved_by": approved_by or "automation",
            "timestamp": strftime("%Y-%m-%dT%H:%M:%SZ"),
        }
    )
    return evaluation | {"promoted": True}
