from gcp_vertex_tabular_ml.data import generate_housing_rows
from gcp_vertex_tabular_ml.model import predict, train_linear_regression


def test_model_trains_with_useful_fit() -> None:
    rows = generate_housing_rows(200, seed=7)
    model = train_linear_regression(rows)

    assert model["metrics"]["training_rows"] == 200
    assert model["metrics"]["r2"] > 0.90
    assert model["metrics"]["rmse"] > 0


def test_prediction_returns_number() -> None:
    rows = generate_housing_rows(50, seed=3)
    model = train_linear_regression(rows)

    prediction = predict(model, rows[0])

    assert isinstance(prediction, float)
    assert prediction > 0

