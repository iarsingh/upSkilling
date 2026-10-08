# python-ml-framework-labs — interview questions and answers

[README](README.md) · [Project architecture](PROJECT_ARCHITECTURE.md)

Answers use this repository’s files. They distinguish existing behavior from suggested extensions.

## 1. What problem do these labs address?

They show a path from vectorized features to quality gates, a hashed sklearn artifact, drift-aware retrain *advice*, and a FastAPI service with a human-review band. Data is synthetic. Start at [`README.md`](README.md).

## 2. Why must rolling features drop warmup rows?

[`rolling_mean`](src/ml_labs/numpy_features.py) uses a sliding window. Row `t` only sees `t-window+1 … t`. The first `window-1` rows are NaN and are dropped before the matrix is used, so training does not peek forward.

## 3. What does a quality gate catch that accuracy would hide?

[`run_gates`](src/ml_labs/data_quality.py) fails on duplicate customer IDs, null rates, a `future_spend` leakage column, and a row shuffle that puts the same customer in train and test. A leaky split can look accurate and still be invalid.

## 4. When should a model retrain?

[`decide_retrain`](src/ml_labs/mlops_pipeline.py) flags PSI ≥ 0.2 or a live F1 drop. That is a recommendation. The serving process still loads the checksummed local joblib file. There is no auto-promotion.

## 5. How does the API refuse production apply?

`POST /v1/jobs/{id}/approve` in [`ops.py`](src/ml_labs/ops.py) returns HTTP 403 when `target` is `prod` or `production`. Tests in [`tests/test_ops.py`](tests/test_ops.py) cover that path.

## 6. What happens to an uncertain score?

[`_predict_one`](src/ml_labs/serving.py) sets `needs_human_review` when probability is in `[0.4, 0.6]`. The API does not change an account. Factors are logistic contributions after the sklearn transform, largest absolute value first.
