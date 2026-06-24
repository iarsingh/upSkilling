from src.monitoring.drift import calculate_drift, population_stability_index


def test_population_stability_index_is_zero_for_equal_distributions() -> None:
    assert population_stability_index([0.5, 0.5], [0.5, 0.5]) == 0


def test_calculate_drift_detects_shift() -> None:
    baseline = {
        "feature_names": ["x"],
        "quantiles": {"x": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]},
    }
    result = calculate_drift(baseline, [[100.0] for _ in range(20)])
    assert result["max_psi"] > 0.2
    assert result["sample_count"] == 20
