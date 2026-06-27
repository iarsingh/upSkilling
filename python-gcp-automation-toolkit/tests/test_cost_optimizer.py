from datetime import UTC, datetime, timedelta

from gcp_ops_toolkit.cost_optimizer import analyze_cost_resources


def test_cost_optimizer_finds_idle_resources() -> None:
    old_snapshot = (datetime.now(UTC) - timedelta(days=120)).isoformat()
    report = analyze_cost_resources(
        "demo",
        instances=[
            {"name": "old-vm", "zone": "us-central1-a", "status": "TERMINATED"}
        ],
        disks=[
            {
                "name": "orphan",
                "zone": "us-central1-a",
                "size_gb": 1000,
                "type": "pd-ssd",
                "users": [],
            }
        ],
        snapshots=[
            {"name": "old-snapshot", "creation_timestamp": old_snapshot, "storage_bytes": 100}
        ],
    )
    categories = {finding.category for finding in report.findings}
    assert categories == {"stopped-vm", "unattached-disk", "old-snapshot"}
