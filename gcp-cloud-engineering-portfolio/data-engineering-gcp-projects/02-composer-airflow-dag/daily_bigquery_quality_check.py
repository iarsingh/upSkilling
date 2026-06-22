from datetime import datetime

from airflow import DAG
from airflow.providers.google.cloud.operators.bigquery import BigQueryInsertJobOperator

with DAG(
    dag_id="daily_bigquery_quality_check",
    start_date=datetime(2026, 1, 1),
    schedule="@daily",
    catchup=False,
) as dag:
    BigQueryInsertJobOperator(
        task_id="check_recent_events",
        configuration={
            "query": {
                "query": """
                SELECT COUNT(*) AS event_count
                FROM `PROJECT_ID.analytics.events`
                WHERE event_timestamp >= TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY)
                """,
                "useLegacySql": False,
            }
        },
    )

