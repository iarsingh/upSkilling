import json
import sys
from pathlib import Path


def evaluate(metrics: dict, min_accuracy: float = 0.9) -> dict:
    accuracy = float(metrics.get("accuracy", 0))
    approved = accuracy >= min_accuracy
    return {
        "approved": approved,
        "accuracy": accuracy,
        "min_accuracy": min_accuracy,
        "reason": "meets quality gate" if approved else "accuracy below threshold",
    }


if __name__ == "__main__":
    metrics = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    result = evaluate(metrics, float(sys.argv[2]) if len(sys.argv) > 2 else 0.9)
    print(json.dumps(result, indent=2))
    raise SystemExit(0 if result["approved"] else 1)

