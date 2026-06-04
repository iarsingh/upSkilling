import csv
import random
from pathlib import Path


FEATURES = ["size_sqft", "bedrooms", "age_years", "distance_to_city_km"]
TARGET = "price_usd"


def generate_housing_rows(count: int, seed: int = 42) -> list[dict[str, float]]:
    rng = random.Random(seed)
    rows: list[dict[str, float]] = []

    for _ in range(count):
        size_sqft = rng.randint(650, 4200)
        bedrooms = rng.randint(1, 6)
        age_years = rng.randint(0, 45)
        distance_to_city_km = round(rng.uniform(1.0, 55.0), 2)
        noise = rng.gauss(0, 18000)
        price_usd = (
            65000
            + size_sqft * 175
            + bedrooms * 18000
            - age_years * 1450
            - distance_to_city_km * 3200
            + noise
        )

        rows.append(
            {
                "size_sqft": float(size_sqft),
                "bedrooms": float(bedrooms),
                "age_years": float(age_years),
                "distance_to_city_km": distance_to_city_km,
                "price_usd": round(price_usd, 2),
            }
        )

    return rows


def write_csv(rows: list[dict[str, float]], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=[*FEATURES, TARGET])
        writer.writeheader()
        writer.writerows(rows)


def read_csv(path: Path) -> list[dict[str, float]]:
    with path.open("r", newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        return [{key: float(value) for key, value in row.items()} for row in reader]

