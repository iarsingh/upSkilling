from collections import defaultdict
from datetime import UTC, datetime, timedelta
from typing import Any


def collect_compute_resources(project_id: str) -> tuple[list[dict], list[dict], list[dict]]:
    from google.cloud import compute_v1

    instances_client = compute_v1.InstancesClient()
    disks_client = compute_v1.DisksClient()
    snapshots_client = compute_v1.SnapshotsClient()

    instances: list[dict[str, Any]] = []
    for zone, scoped in instances_client.aggregated_list(project=project_id):
        for instance in scoped.instances or []:
            instances.append(
                {
                    "name": instance.name,
                    "zone": zone.rsplit("/", 1)[-1],
                    "status": instance.status,
                    "machine_type": instance.machine_type.rsplit("/", 1)[-1],
                }
            )

    disks: list[dict[str, Any]] = []
    for zone, scoped in disks_client.aggregated_list(project=project_id):
        for disk in scoped.disks or []:
            disks.append(
                {
                    "name": disk.name,
                    "zone": zone.rsplit("/", 1)[-1],
                    "size_gb": disk.size_gb,
                    "type": disk.type_.rsplit("/", 1)[-1],
                    "users": list(disk.users or []),
                }
            )

    snapshots = [
        {
            "name": snapshot.name,
            "creation_timestamp": snapshot.creation_timestamp,
            "storage_bytes": snapshot.storage_bytes,
        }
        for snapshot in snapshots_client.list(project=project_id)
    ]
    return instances, disks, snapshots


def query_billing_summary(project_id: str, days: int = 30) -> dict[str, Any]:
    """Query billing export in BigQuery when BILLING_EXPORT_TABLE is configured."""
    import os

    table = os.getenv("BILLING_EXPORT_TABLE")
    billing_info = get_project_billing_info(project_id)
    if not table:
        return {
            **billing_info,
            "export_status": "not_configured",
            "hint": "Set BILLING_EXPORT_TABLE for cost totals by service.",
        }

    from google.cloud import bigquery

    client = bigquery.Client(project=project_id)
    start = datetime.now(UTC).date() - timedelta(days=days)
    query = f"""
        SELECT
          service.description AS service,
          ROUND(SUM(cost) - SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)), 2)
            AS net_cost
        FROM `{table}`
        WHERE project.id = @project_id
          AND DATE(usage_start_time) >= @start
        GROUP BY service
        ORDER BY net_cost DESC
        LIMIT 20
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("project_id", "STRING", project_id),
            bigquery.ScalarQueryParameter("start", "DATE", start),
        ]
    )
    services = [dict(row.items()) for row in client.query(query, job_config=job_config)]
    return {
        **billing_info,
        "export_status": "ok",
        "days": days,
        "net_cost": round(sum(float(row["net_cost"] or 0) for row in services), 2),
        "services": services,
    }


def get_project_billing_info(project_id: str) -> dict[str, Any]:
    from google.cloud import billing_v1

    client = billing_v1.CloudBillingClient()
    info = client.get_project_billing_info(name=f"projects/{project_id}")
    return {
        "billing_enabled": info.billing_enabled,
        "billing_account": info.billing_account_name,
    }


def group_resources_by_zone(resources: list[dict]) -> dict[str, list[dict]]:
    grouped: dict[str, list[dict]] = defaultdict(list)
    for resource in resources:
        grouped[resource.get("zone", "global")].append(resource)
    return dict(grouped)
