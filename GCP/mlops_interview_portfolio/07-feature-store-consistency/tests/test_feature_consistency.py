import importlib.util
from datetime import datetime, timezone
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "feature_consistency.py"
SPEC = importlib.util.spec_from_file_location("feature_consistency", MODULE_PATH)
feature_consistency = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(feature_consistency)
validate_contract = feature_consistency.validate_contract


def test_validate_contract_passes_for_matching_features():
    contract = {
        "entity": "customer_id",
        "owner": "ml-platform",
        "freshness_sla_minutes": 60,
        "features": [{"name": "score_7d", "dtype": "float", "nullable": False}],
    }
    offline = {
        "schema": {"customer_id": "string", "score_7d": "float"},
        "null_rates": {"score_7d": 0.0},
    }
    online = {
        "last_updated": "2026-05-31T08:30:00Z",
        "schema": {"customer_id": "string", "score_7d": "float"},
    }

    result = validate_contract(
        contract,
        offline,
        online,
        now=datetime(2026, 5, 31, 9, 0, tzinfo=timezone.utc),
    )

    assert result["status"] == "pass"
    assert result["failures"] == []


def test_validate_contract_blocks_schema_and_freshness_failures():
    contract = {
        "entity": "customer_id",
        "owner": "ml-platform",
        "freshness_sla_minutes": 30,
        "features": [{"name": "score_7d", "dtype": "float", "nullable": False}],
    }
    offline = {
        "schema": {"customer_id": "string", "score_7d": "int"},
        "null_rates": {"score_7d": 0.1},
    }
    online = {
        "last_updated": "2026-05-31T08:00:00Z",
        "schema": {"customer_id": "string", "score_7d": "float"},
    }

    result = validate_contract(
        contract,
        offline,
        online,
        now=datetime(2026, 5, 31, 9, 0, tzinfo=timezone.utc),
    )

    assert result["status"] == "fail"
    assert len(result["failures"]) == 3
