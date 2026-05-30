import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "llmops_release_gate.py"
SPEC = importlib.util.spec_from_file_location("llmops_release_gate", MODULE_PATH)
llmops_release_gate = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(llmops_release_gate)
evaluate_release = llmops_release_gate.evaluate_release


def valid_model_card():
    return {
        "model_id": "distilbert-base-uncased-finetuned-sst-2-english",
        "source": "huggingface",
        "task": "text-classification",
        "license": "apache-2.0",
        "owner": "ml-platform",
        "intended_use": "customer feedback sentiment routing",
        "approved_for_production": True,
    }


def valid_eval_report():
    return {
        "evaluation_set": "prompt_eval_set_v1",
        "metrics": {
            "accuracy": 0.93,
            "f1": 0.92,
            "toxicity_rate": 0.001,
            "hallucination_rate": 0.0,
            "pii_leak_rate": 0.0,
            "p95_latency_ms": 180,
            "estimated_cost_per_1k_predictions_usd": 0.42,
        },
        "thresholds": {
            "min_accuracy": 0.9,
            "min_f1": 0.9,
            "max_toxicity_rate": 0.005,
            "max_hallucination_rate": 0.01,
            "max_pii_leak_rate": 0.0,
            "max_p95_latency_ms": 300,
            "max_cost_per_1k_predictions_usd": 1.0,
        },
    }


def valid_deployment_config():
    return {
        "target": "vertex-ai-endpoint",
        "traffic_split_percent": 10,
        "prediction_logging": {"enabled": True},
        "monitoring": {"enabled": True},
        "rollback": {"enabled": True},
    }


def test_evaluate_release_approves_valid_vertex_ai_huggingface_release():
    result = evaluate_release(
        valid_model_card(),
        valid_eval_report(),
        valid_deployment_config(),
    )

    assert result["status"] == "approved"
    assert result["failures"] == []


def test_evaluate_release_blocks_unsafe_or_unobservable_release():
    model_card = valid_model_card()
    model_card["approved_for_production"] = False

    eval_report = valid_eval_report()
    eval_report["metrics"]["toxicity_rate"] = 0.2
    eval_report["metrics"]["p95_latency_ms"] = 800

    deployment_config = valid_deployment_config()
    deployment_config["traffic_split_percent"] = 50
    deployment_config["monitoring"]["enabled"] = False

    result = evaluate_release(model_card, eval_report, deployment_config)

    assert result["status"] == "blocked"
    assert len(result["failures"]) == 5
