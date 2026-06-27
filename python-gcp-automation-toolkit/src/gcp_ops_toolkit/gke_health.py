from collections import Counter
from typing import Any

from gcp_ops_toolkit.models import Finding, Report, Severity


def _condition_map(conditions: list[dict[str, Any]] | None) -> dict[str, str]:
    return {condition["type"]: condition["status"] for condition in conditions or []}


def analyze_cluster(
    nodes: list[dict[str, Any]],
    pods: list[dict[str, Any]],
    *,
    context: str = "current",
) -> Report:
    findings: list[Finding] = []

    for node in nodes:
        name = node["name"]
        conditions = _condition_map(node.get("conditions"))
        if conditions.get("Ready") != "True":
            findings.append(
                Finding(
                    tool="gke-health",
                    category="node-readiness",
                    severity=Severity.CRITICAL,
                    resource=f"node/{name}",
                    message="Node is not Ready.",
                    recommendation="Inspect kubelet, node events, networking, and GKE node-pool health.",
                )
            )
        for pressure in ("MemoryPressure", "DiskPressure", "PIDPressure", "NetworkUnavailable"):
            if conditions.get(pressure) == "True":
                findings.append(
                    Finding(
                        tool="gke-health",
                        category="resource-pressure",
                        severity=Severity.HIGH,
                        resource=f"node/{name}",
                        message=f"Node reports {pressure}.",
                        recommendation="Check workloads, eviction signals, disk usage, and node-pool capacity.",
                    )
                )

    phase_counts = Counter()
    for pod in pods:
        namespace = pod.get("namespace", "default")
        name = pod["name"]
        phase = pod.get("phase", "Unknown")
        phase_counts[phase] += 1
        resource = f"pod/{namespace}/{name}"

        if phase in {"Failed", "Unknown"}:
            findings.append(
                Finding(
                    tool="gke-health",
                    category="pod-phase",
                    severity=Severity.HIGH,
                    resource=resource,
                    message=f"Pod phase is {phase}.",
                    recommendation="Inspect events, controller status, logs, and scheduling history.",
                )
            )
        if phase == "Pending":
            findings.append(
                Finding(
                    tool="gke-health",
                    category="scheduling",
                    severity=Severity.MEDIUM,
                    resource=resource,
                    message="Pod is Pending.",
                    recommendation="Check requests, quotas, affinity, taints, volumes, and cluster autoscaler.",
                )
            )

        for container in pod.get("containers", []):
            container_name = container.get("name", "unknown")
            reason = container.get("waiting_reason")
            terminated_reason = container.get("last_terminated_reason")
            restarts = int(container.get("restart_count", 0))
            if reason == "CrashLoopBackOff":
                findings.append(
                    Finding(
                        tool="gke-health",
                        category="crashloop",
                        severity=Severity.CRITICAL,
                        resource=resource,
                        message=f"Container {container_name} is in CrashLoopBackOff.",
                        recommendation="Read current and previous logs; verify config, probes, and dependencies.",
                        metadata={"restart_count": restarts},
                    )
                )
            if terminated_reason == "OOMKilled":
                findings.append(
                    Finding(
                        tool="gke-health",
                        category="oom-kill",
                        severity=Severity.HIGH,
                        resource=resource,
                        message=f"Container {container_name} was OOMKilled.",
                        recommendation="Inspect memory usage, request/limit sizing, leaks, and VPA recommendations.",
                        metadata={"restart_count": restarts},
                    )
                )
            if restarts >= 5 and reason != "CrashLoopBackOff":
                findings.append(
                    Finding(
                        tool="gke-health",
                        category="restarts",
                        severity=Severity.MEDIUM,
                        resource=resource,
                        message=f"Container {container_name} restarted {restarts} times.",
                        recommendation="Correlate restart timestamps with logs, probes, and node pressure.",
                    )
                )

    return Report(
        tool="gke-health",
        summary={
            "context": context,
            "nodes": len(nodes),
            "pods": len(pods),
            "pod_phases": dict(phase_counts),
            "finding_count": len(findings),
        },
        findings=findings,
    )


def collect_cluster_state(context: str | None = None) -> tuple[list[dict], list[dict]]:
    from kubernetes import client, config

    try:
        config.load_incluster_config()
    except config.ConfigException:
        config.load_kube_config(context=context)

    core = client.CoreV1Api()
    node_records = []
    for node in core.list_node().items:
        node_records.append(
            {
                "name": node.metadata.name,
                "conditions": [
                    {"type": condition.type, "status": condition.status}
                    for condition in node.status.conditions or []
                ],
            }
        )

    pod_records = []
    for pod in core.list_pod_for_all_namespaces().items:
        statuses = []
        for status in pod.status.container_statuses or []:
            waiting = status.state.waiting
            terminated = status.last_state.terminated
            statuses.append(
                {
                    "name": status.name,
                    "restart_count": status.restart_count,
                    "waiting_reason": waiting.reason if waiting else None,
                    "last_terminated_reason": terminated.reason if terminated else None,
                }
            )
        pod_records.append(
            {
                "name": pod.metadata.name,
                "namespace": pod.metadata.namespace,
                "phase": pod.status.phase,
                "containers": statuses,
            }
        )
    return node_records, pod_records
