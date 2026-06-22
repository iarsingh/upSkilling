import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "batch_quality_gate.py"
SPEC = importlib.util.spec_from_file_location("batch_quality_gate", MODULE_PATH)
batch_quality_gate = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(batch_quality_gate)
evaluate_manifest = batch_quality_gate.evaluate_manifest


def test_evaluate_manifest_allows_publishable_batch():
    manifest = {
        "batch_id": "daily_churn",
        "owner": "growth-ml",
        "input_profile": {
            "rows": 100000,
            "duplicate_entity_rate": 0.001,
            "missing_required_feature_rate": 0.001,
        },
        "prediction_profile": {
            "rows": 99950,
            "failed_prediction_rate": 0.0001,
            "null_prediction_rate": 0.0,
        },
        "policy": {
            "minimum_rows": 50000,
            "max_duplicate_entity_rate": 0.005,
            "max_missing_required_feature_rate": 0.01,
            "min_output_completeness_rate": 0.999,
            "max_failed_prediction_rate": 0.001,
            "max_null_prediction_rate": 0.0,
        },
    }

    result = evaluate_manifest(manifest)

    assert result["status"] == "publish"
    assert result["failures"] == []


def test_evaluate_manifest_quarantines_bad_batch():
    manifest = {
        "batch_id": "daily_churn",
        "owner": "growth-ml",
        "input_profile": {
            "rows": 10000,
            "duplicate_entity_rate": 0.02,
            "missing_required_feature_rate": 0.2,
        },
        "prediction_profile": {
            "rows": 9000,
            "failed_prediction_rate": 0.01,
            "null_prediction_rate": 0.1,
        },
        "policy": {
            "minimum_rows": 50000,
            "max_duplicate_entity_rate": 0.005,
            "max_missing_required_feature_rate": 0.01,
            "min_output_completeness_rate": 0.999,
            "max_failed_prediction_rate": 0.001,
            "max_null_prediction_rate": 0.0,
        },
    }

    result = evaluate_manifest(manifest)

    assert result["status"] == "quarantine"
    assert len(result["failures"]) == 6
