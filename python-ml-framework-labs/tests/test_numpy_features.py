import json
from pathlib import Path

import numpy as np

from ml_labs.numpy_features import (
    build_features,
    cosine_topk,
    pairwise_products,
    rolling_mean,
    write_report,
    zscore,
)


def test_zscore_zero_mean_unit_std():
    x = np.array([[1.0, 10.0], [3.0, 20.0], [5.0, 30.0]])
    z = zscore(x)
    np.testing.assert_allclose(z.mean(axis=0), 0.0, atol=1e-12)
    np.testing.assert_allclose(z.std(axis=0), 1.0, atol=1e-12)


def test_rolling_mean_is_causal_and_matches_window():
    x = np.arange(8, dtype=float)
    got = rolling_mean(x, window=3)
    assert np.isnan(got[:2]).all()
    np.testing.assert_allclose(got[2], np.mean([0, 1, 2]))
    np.testing.assert_allclose(got[-1], np.mean([5, 6, 7]))


def test_pairwise_products_are_vectorized_upper_triangle():
    x = np.array([[2.0, 3.0, 4.0]])
    np.testing.assert_allclose(pairwise_products(x), [[6.0, 8.0, 12.0]])


def test_feature_matrix_drops_warmup_rows_and_neighbors_find_self():
    bundle = build_features()
    assert bundle.matrix.shape[0] == bundle.raw.shape[0] - 4
    assert bundle.matrix.shape[1] == len(bundle.names)
    idx, scores = cosine_topk(bundle.matrix[10], bundle.matrix, k=3)
    assert idx[0] == 10
    assert scores[0] > 0.99


def test_numpy_report_records_warmup_drop(tmp_path: Path):
    bundle = build_features()
    report = json.loads(write_report(bundle, tmp_path / "numpy_report.json").read_text())
    assert report["warmup_rows_dropped"] == 4
    assert report["feature_dim"] == 18
