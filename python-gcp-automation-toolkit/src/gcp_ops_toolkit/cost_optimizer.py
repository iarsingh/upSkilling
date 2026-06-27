from datetime import UTC, datetime
from typing import Any

from gcp_ops_toolkit.models import Finding, Report, Severity


def analyze_cost_resources(
    project_id: str,
    *,
    instances: list[dict[str, Any]],
    disks: list[dict[str, Any]],
    snapshots: list[dict[str, Any]],
    billing_summary: dict[str, Any] | None = None,
    snapshot_age_days: int = 90,
) -> Report:
    findings: list[Finding] = []
    now = datetime.now(UTC)

    for instance in instances:
        if instance.get("status") == "TERMINATED":
            findings.append(
                Finding(
                    tool="cost-optimize",
                    category="stopped-vm",
                    severity=Severity.MEDIUM,
                    resource=f"instance/{instance['zone']}/{instance['name']}",
                    message="VM is terminated but may still retain disks and reserved IPs.",
                    recommendation="Delete the VM if no longer needed and review attached persistent resources.",
                    metadata={"machine_type": instance.get("machine_type")},
                )
            )

    for disk in disks:
        if not disk.get("users"):
            size_gb = int(disk.get("size_gb", 0))
            findings.append(
                Finding(
                    tool="cost-optimize",
                    category="unattached-disk",
                    severity=Severity.HIGH if size_gb >= 500 else Severity.MEDIUM,
                    resource=f"disk/{disk['zone']}/{disk['name']}",
                    message=f"Unattached persistent disk consumes {size_gb} GB.",
                    recommendation="Snapshot if required, then delete or attach the disk.",
                    metadata={"size_gb": size_gb, "disk_type": disk.get("type")},
                )
            )

    for snapshot in snapshots:
        created = datetime.fromisoformat(snapshot["creation_timestamp"].replace("Z", "+00:00"))
        age_days = (now - created).days
        if age_days >= snapshot_age_days:
            findings.append(
                Finding(
                    tool="cost-optimize",
                    category="old-snapshot",
                    severity=Severity.LOW,
                    resource=f"snapshot/{snapshot['name']}",
                    message=f"Snapshot is {age_days} days old.",
                    recommendation="Confirm retention requirements and delete superseded snapshots.",
                    metadata={"age_days": age_days, "storage_bytes": snapshot.get("storage_bytes", 0)},
                )
            )

    return Report(
        tool="cost-optimize",
        project_id=project_id,
        summary={
            "instances": len(instances),
            "disks": len(disks),
            "snapshots": len(snapshots),
            "finding_count": len(findings),
            "billing": billing_summary or {},
        },
        findings=findings,
    )
