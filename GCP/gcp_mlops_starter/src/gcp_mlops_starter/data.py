import csv
import random
from pathlib import Path


FIELD_NAMES = [
    "monthly_spend",
    "support_tickets",
    "tenure_months",
    "product_usage_score",
    "churned",
]


def generate_churn_dataset(path: Path, rows: int = 500, seed: int = 7) -> Path:
    random.seed(seed)
    path.parent.mkdir(parents=True, exist_ok=True)

    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=FIELD_NAMES)
        writer.writeheader()

        for _ in range(rows):
            monthly_spend = round(random.uniform(20, 240), 2)
            support_tickets = random.randint(0, 8)
            tenure_months = random.randint(1, 60)
            product_usage_score = round(random.uniform(0.05, 1.0), 3)

            churn_risk = (
                support_tickets * 0.24
                - tenure_months * 0.018
                - product_usage_score * 1.35
                + (monthly_spend > 180) * 0.35
                + random.uniform(-0.35, 0.35)
            )
            churned = int(churn_risk > 0.15)

            writer.writerow(
                {
                    "monthly_spend": monthly_spend,
                    "support_tickets": support_tickets,
                    "tenure_months": tenure_months,
                    "product_usage_score": product_usage_score,
                    "churned": churned,
                }
            )

    return path


def load_dataset(path: Path) -> list[dict[str, float]]:
    with path.open("r", newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        return [
            {
                "monthly_spend": float(row["monthly_spend"]),
                "support_tickets": float(row["support_tickets"]),
                "tenure_months": float(row["tenure_months"]),
                "product_usage_score": float(row["product_usage_score"]),
                "churned": float(row["churned"]),
            }
            for row in reader
        ]
