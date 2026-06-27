from gcp_ops_toolkit.gke_health import analyze_cluster


def test_gke_health_detects_crashloop_oom_and_pressure() -> None:
    report = analyze_cluster(
        nodes=[
            {
                "name": "node-1",
                "conditions": [
                    {"type": "Ready", "status": "True"},
                    {"type": "MemoryPressure", "status": "True"},
                ],
            }
        ],
        pods=[
            {
                "name": "api-1",
                "namespace": "prod",
                "phase": "Running",
                "containers": [
                    {
                        "name": "api",
                        "waiting_reason": "CrashLoopBackOff",
                        "last_terminated_reason": "OOMKilled",
                        "restart_count": 8,
                    }
                ],
            }
        ],
    )
    categories = {finding.category for finding in report.findings}
    assert {"resource-pressure", "crashloop", "oom-kill"} <= categories


def test_gke_health_clean_cluster() -> None:
    report = analyze_cluster(
        nodes=[{"name": "node-1", "conditions": [{"type": "Ready", "status": "True"}]}],
        pods=[{"name": "api", "namespace": "default", "phase": "Running", "containers": []}],
    )
    assert report.findings == []
