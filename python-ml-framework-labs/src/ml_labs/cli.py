"""Run any of the four labs from one command."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from ml_labs.data_quality import (
    clean_for_training,
    make_messy_customers,
    run_gates,
    split_by_id,
    write_report,
)
from ml_labs.mlops_pipeline import (
    DEFAULT_ARTIFACT_DIR,
    decide_retrain,
    evaluate_frame,
    generate_churn,
    load_model,
    train_and_evaluate,
)
from ml_labs.numpy_features import build_features, cosine_topk
from ml_labs.numpy_features import write_report as write_numpy_report


def cmd_numpy() -> None:
    bundle = build_features()
    query = bundle.matrix[0]
    idx, scores = cosine_topk(query, bundle.matrix, k=3)
    report = write_numpy_report(bundle, Path(DEFAULT_ARTIFACT_DIR) / "numpy_report.json")
    print(
        json.dumps(
            {
                "lab": "01-numpy-feature-engine",
                "rows": int(bundle.raw.shape[0]),
                "feature_dim": int(bundle.matrix.shape[1]),
                "feature_names": list(bundle.names),
                "nearest_neighbor_idx": idx.tolist(),
                "cosine_scores": [round(float(s), 4) for s in scores],
                "report": str(report),
            },
            indent=2,
        )
    )


def cmd_quality() -> None:
    messy = make_messy_customers()
    before = run_gates(messy)
    cleaned = clean_for_training(messy)
    train, test = split_by_id(cleaned)
    after = run_gates(cleaned, train, test)
    report = write_report(before, after, Path(DEFAULT_ARTIFACT_DIR) / "quality_report.json", len(train), len(test))
    print(
        json.dumps(
            {
                "lab": "02-data-science-quality-gates",
                "before": before.to_dict(),
                "after": after.to_dict(),
                "train_rows": int(len(train)),
                "test_rows": int(len(test)),
                "report": str(report),
            },
            indent=2,
        )
    )


def cmd_train() -> None:
    reference = generate_churn(seed=21)
    live = generate_churn(seed=99, drift=True)
    result = train_and_evaluate(reference)
    model = load_model(result.model_path)
    live_f1 = evaluate_frame(model, live)
    decision = decide_retrain(reference, live, trained_f1=result.metrics["f1"], live_f1=live_f1)
    print(
        json.dumps(
            {
                "lab": "03-mlops-training-monitor",
                "metrics": result.metrics,
                "dataset_sha256": result.dataset_sha256,
                "model_path": result.model_path,
                "retrain": decision.retrain,
                "reasons": list(decision.reasons),
                "psi": {k: round(v, 4) for k, v in decision.psi.items()},
                "live_f1": decision.live_f1,
                "note": "retrain is a recommendation only; this lab never auto-promotes a model",
            },
            indent=2,
        )
    )


def cmd_serve() -> None:
    import uvicorn

    from ml_labs.serving import app

    uvicorn.run(app, host="127.0.0.1", port=8080)


def main() -> None:
    parser = argparse.ArgumentParser(description="NumPy / data-science / MLOps / FastAPI labs")
    parser.add_argument("lab", choices=["numpy", "quality", "train", "serve"])
    args = parser.parse_args()
    {"numpy": cmd_numpy, "quality": cmd_quality, "train": cmd_train, "serve": cmd_serve}[args.lab]()


if __name__ == "__main__":
    main()
