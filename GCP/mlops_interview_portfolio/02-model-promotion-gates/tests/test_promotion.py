import copy
import json
from pathlib import Path
import sys

PROJECT_SRC = Path(__file__).resolve().parents[1] / "src"
sys.path.insert(0, str(PROJECT_SRC))

from promotion import PromotionPolicy, evaluate_gates, find_model, load_registry, promote_model


def registry_path() -> Path:
    return Path(__file__).resolve().parents[1] / "examples" / "registry.json"


def test_candidate_passes_staging_gates():
    registry = load_registry(registry_path())
    model = find_model(registry, "churn-model-v3")

    result = evaluate_gates(model, "staging", PromotionPolicy())

    assert result["passed"] is True
    assert result["checks"]["accuracy"] is True
    assert result["checks"]["p99_latency_ms"] is True


def test_production_requires_approval():
    registry = load_registry(registry_path())
    model = find_model(registry, "churn-model-v3")

    result = evaluate_gates(model, "production", PromotionPolicy())

    assert result["passed"] is False
    assert result["checks"]["approval"] is False


def test_production_promotion_archives_previous_model():
    registry = copy.deepcopy(json.loads(registry_path().read_text(encoding="utf-8")))

    result = promote_model(registry, "churn-model-v3", "production", approved_by="lead")

    assert result["promoted"] is True
    assert find_model(registry, "churn-model-v3")["stage"] == "production"
    assert find_model(registry, "churn-model-v2")["stage"] == "archived"
