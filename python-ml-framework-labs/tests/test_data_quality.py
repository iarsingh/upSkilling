from ml_labs.data_quality import (
    clean_for_training,
    leaky_row_split,
    make_messy_customers,
    run_gates,
    split_by_id,
)


def test_messy_table_fails_quality_gates():
    messy = make_messy_customers()
    report = run_gates(messy)
    names = {g.name: g.passed for g in report.gates}
    assert names["null_rate"] is False
    assert names["duplicate_ids"] is False
    assert names["target_leakage"] is False
    assert names["train_test_id_overlap"] is False
    assert report.passed is False


def test_clean_and_id_split_passes_gates():
    cleaned = clean_for_training(make_messy_customers())
    assert "future_spend" not in cleaned.columns
    assert cleaned["customer_id"].duplicated().sum() == 0
    assert cleaned["monthly_charges"].isna().sum() == 0
    train, test = split_by_id(cleaned, seed=3)
    report = run_gates(cleaned, train, test)
    assert report.passed
    assert set(train["customer_id"]) & set(test["customer_id"]) == set()


def test_leaky_split_overlaps_duplicated_ids():
    messy = make_messy_customers()
    train, test = leaky_row_split(messy, seed=0)
    assert len(set(train["customer_id"]) & set(test["customer_id"])) > 0
