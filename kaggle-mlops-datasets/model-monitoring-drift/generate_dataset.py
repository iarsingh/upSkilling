import csv
import json
import math
import random
from datetime import datetime, timedelta, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
RANDOM_SEED = 42
ROW_COUNT = 25000


def sigmoid(value: float) -> float:
    return 1 / (1 + math.exp(-value))


def choose_region(index: int) -> str:
    regions = ["us-central1", "us-east1", "europe-west1", "asia-south1"]
    weights = [0.42, 0.25, 0.18, 0.15]
    return random.choices(regions, weights=weights, k=1)[0]


def choose_channel() -> str:
    return random.choices(
        ["web", "mobile", "partner_api", "batch"],
        weights=[0.44, 0.35, 0.14, 0.07],
        k=1,
    )[0]


def score_band(probability: float) -> str:
    if probability >= 0.75:
        return "high"
    if probability >= 0.45:
        return "medium"
    return "low"


def drift_period(day_index: int) -> str:
    if day_index < 45:
        return "baseline"
    if day_index < 70:
        return "gradual_drift"
    return "post_drift"


def model_version(day_index: int) -> str:
    if day_index < 35:
        return "churn-v1"
    if day_index < 72:
        return "churn-v2"
    return "churn-v3"


def generate_rows() -> list[dict[str, object]]:
    random.seed(RANDOM_SEED)
    start = datetime(2026, 1, 1, tzinfo=timezone.utc)
    rows: list[dict[str, object]] = []

    for row_id in range(1, ROW_COUNT + 1):
        minutes_offset = int((90 * 24 * 60) * row_id / ROW_COUNT)
        event_time = start + timedelta(minutes=minutes_offset)
        day_index = (event_time.date() - start.date()).days
        period = drift_period(day_index)

        region = choose_region(row_id)
        channel = choose_channel()
        model = model_version(day_index)

        base_age = random.gauss(38, 11)
        if period == "post_drift":
            base_age += 4

        account_age_days = max(1, int(random.expovariate(1 / 420)))
        monthly_spend = max(5, random.lognormvariate(3.65, 0.55))
        support_tickets_30d = max(0, int(random.gauss(1.2, 1.4)))
        failed_payments_30d = max(0, int(random.gauss(0.35, 0.75)))
        usage_hours_7d = max(0.1, random.lognormvariate(2.2, 0.5))

        if period == "gradual_drift":
            support_tickets_30d += random.choice([0, 1])
            failed_payments_30d += random.choice([0, 0, 1])
            usage_hours_7d *= random.uniform(0.82, 1.03)
        elif period == "post_drift":
            support_tickets_30d += random.choice([1, 1, 2])
            failed_payments_30d += random.choice([0, 1, 1])
            usage_hours_7d *= random.uniform(0.65, 0.95)
            monthly_spend *= random.uniform(0.85, 1.18)

        region_risk = {
            "us-central1": 0.0,
            "us-east1": 0.08,
            "europe-west1": -0.04,
            "asia-south1": 0.12,
        }[region]
        channel_risk = {
            "web": 0.0,
            "mobile": -0.08,
            "partner_api": 0.16,
            "batch": 0.05,
        }[channel]
        drift_risk = {"baseline": 0.0, "gradual_drift": 0.22, "post_drift": 0.46}[period]

        true_logit = (
            -2.1
            + 0.12 * support_tickets_30d
            + 0.35 * failed_payments_30d
            - 0.018 * usage_hours_7d
            - 0.0015 * account_age_days
            + 0.006 * (base_age - 35)
            + region_risk
            + channel_risk
            + drift_risk
            + random.gauss(0, 0.35)
        )
        actual_churn = 1 if random.random() < sigmoid(true_logit) else 0

        model_bias = {"churn-v1": -0.04, "churn-v2": 0.02, "churn-v3": 0.08}[model]
        prediction_logit = true_logit - drift_risk * 0.55 + model_bias + random.gauss(0, 0.25)
        predicted_probability = sigmoid(prediction_logit)
        predicted_churn = 1 if predicted_probability >= 0.5 else 0

        latency_ms = max(18, random.gauss(95, 23))
        if channel == "partner_api":
            latency_ms += random.gauss(24, 8)
        if model == "churn-v3":
            latency_ms += random.gauss(10, 4)

        request_error = 1 if random.random() < (0.006 + 0.002 * failed_payments_30d) else 0
        drift_score = max(
            0,
            min(
                1,
                {"baseline": 0.08, "gradual_drift": 0.34, "post_drift": 0.63}[period]
                + random.gauss(0, 0.08),
            ),
        )

        rows.append(
            {
                "event_id": f"evt-{row_id:06d}",
                "event_timestamp": event_time.isoformat(),
                "customer_id": f"cust-{random.randint(10000, 99999)}",
                "region": region,
                "traffic_channel": channel,
                "model_name": "customer_churn_classifier",
                "model_version": model,
                "drift_period": period,
                "customer_age": round(base_age, 1),
                "account_age_days": account_age_days,
                "monthly_spend_usd": round(monthly_spend, 2),
                "support_tickets_30d": support_tickets_30d,
                "failed_payments_30d": failed_payments_30d,
                "usage_hours_7d": round(usage_hours_7d, 2),
                "predicted_churn": predicted_churn,
                "predicted_probability": round(predicted_probability, 4),
                "prediction_score_band": score_band(predicted_probability),
                "actual_churn": actual_churn,
                "prediction_correct": int(predicted_churn == actual_churn),
                "latency_ms": round(latency_ms, 2),
                "request_error": request_error,
                "drift_score": round(drift_score, 4),
            }
        )

    return rows


def write_csv(rows: list[dict[str, object]]) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    output_path = DATA_DIR / "mlops_model_monitoring_dataset.csv"
    with output_path.open("w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def write_summary(rows: list[dict[str, object]]) -> None:
    total = len(rows)
    accuracy = sum(int(row["prediction_correct"]) for row in rows) / total
    churn_rate = sum(int(row["actual_churn"]) for row in rows) / total
    avg_latency = sum(float(row["latency_ms"]) for row in rows) / total
    summary = {
        "row_count": total,
        "random_seed": RANDOM_SEED,
        "date_range": {
            "start": rows[0]["event_timestamp"],
            "end": rows[-1]["event_timestamp"],
        },
        "overall_accuracy": round(accuracy, 4),
        "actual_churn_rate": round(churn_rate, 4),
        "average_latency_ms": round(avg_latency, 2),
        "model_versions": sorted({str(row["model_version"]) for row in rows}),
        "drift_periods": sorted({str(row["drift_period"]) for row in rows}),
    }
    (ROOT / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")


def main() -> None:
    rows = generate_rows()
    write_csv(rows)
    write_summary(rows)
    print(f"Generated {len(rows)} rows in {DATA_DIR}")


if __name__ == "__main__":
    main()

