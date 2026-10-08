from pathlib import Path

from ml_labs.mlops_pipeline import (
    decide_retrain,
    evaluate_frame,
    generate_churn,
    load_model,
    population_stability_index,
    train_and_evaluate,
)


def test_train_writes_hashed_artifacts(tmp_path: Path):
    frame = generate_churn(n=500, seed=4)
    result = train_and_evaluate(frame, artifact_dir=tmp_path, seed=4)
    assert (tmp_path / "churn_model.joblib").exists()
    assert len(result.dataset_sha256) == 64
    assert 0.0 <= result.metrics["f1"] <= 1.0
    assert result.metrics["roc_auc"] > 0.55
    assert result.metrics["tp"] + result.metrics["fp"] + result.metrics["tn"] + result.metrics["fn"] == result.n_test
    model = load_model(result.model_path)
    assert evaluate_frame(model, frame.iloc[:80]) >= 0.0


def test_drifted_traffic_triggers_retrain_recommendation(tmp_path: Path):
    reference = generate_churn(n=600, seed=8, drift=False)
    live = generate_churn(n=600, seed=9, drift=True)
    result = train_and_evaluate(reference, artifact_dir=tmp_path, seed=8)
    model = load_model(result.model_path)
    live_f1 = evaluate_frame(model, live)
    decision = decide_retrain(reference, live, trained_f1=result.metrics["f1"], live_f1=live_f1)
    assert decision.retrain is True
    assert any("psi_above_threshold" in reason for reason in decision.reasons)
    assert decision.psi["monthly_charges"] > 0.2


def test_identical_distributions_have_low_psi():
    frame = generate_churn(n=400, seed=1)
    psi = population_stability_index(frame["tenure"].to_numpy(), frame["tenure"].to_numpy())
    assert psi < 0.05
