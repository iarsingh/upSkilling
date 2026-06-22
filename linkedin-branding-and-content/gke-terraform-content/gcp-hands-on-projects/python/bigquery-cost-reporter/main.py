import os
from dataclasses import dataclass

from google.cloud import bigquery


@dataclass
class Config:
    project_id: str
    table_id: str


def load_config() -> Config:
    return Config(
        project_id=required_env("PROJECT_ID"),
        table_id=required_env("TABLE_ID"),
    )


def required_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"missing required env var: {name}")
    return value


def build_query(table_id: str) -> str:
    return f"""
    SELECT
      service,
      environment,
      ROUND(SUM(cost), 2) AS total_cost
    FROM `{table_id}`
    WHERE usage_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
    GROUP BY service, environment
    ORDER BY total_cost DESC
    LIMIT 20
    """


def main() -> None:
    config = load_config()
    client = bigquery.Client(project=config.project_id)
    rows = client.query(build_query(config.table_id)).result()

    print("Top GCP costs in the last 30 days")
    print("---------------------------------")
    for row in rows:
        print(f"{row.service:24} {row.environment:12} ${row.total_cost:10.2f}")


if __name__ == "__main__":
    main()

