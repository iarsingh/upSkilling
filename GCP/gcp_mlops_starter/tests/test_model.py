from gcp_mlops_starter.model import evaluate, predict_proba, train_gaussian_nb


def test_model_trains_and_scores_probabilities():
    rows = [
        {"monthly_spend": 40, "support_tickets": 0, "tenure_months": 30, "product_usage_score": 0.9, "churned": 0},
        {"monthly_spend": 55, "support_tickets": 1, "tenure_months": 24, "product_usage_score": 0.8, "churned": 0},
        {"monthly_spend": 220, "support_tickets": 6, "tenure_months": 2, "product_usage_score": 0.1, "churned": 1},
        {"monthly_spend": 190, "support_tickets": 5, "tenure_months": 4, "product_usage_score": 0.2, "churned": 1},
    ]

    model = train_gaussian_nb(rows)
    probability = predict_proba(model, rows[0])
    metrics = evaluate(model, rows)

    assert 0 <= probability <= 1
    assert metrics["rows"] == 4
    assert metrics["accuracy"] >= 0.5
