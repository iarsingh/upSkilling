from fastapi.testclient import TestClient

from ml_labs.serving import app

client = TestClient(app)


def test_ops_plane_refuses_production_apply():
    workspace = client.post("/v1/workspaces", json={"name": "lab-tenant", "environment": "lab"}).json()
    assert workspace["id"]
    listed = client.get("/v1/workspaces").json()
    assert listed["count"] >= 1

    job = client.post(
        f"/v1/workspaces/{workspace['id']}/jobs",
        json={"kind": "deploy", "target": "prod", "payload": {"chart": "churn"}},
    ).json()
    assert job["status"] == "pending_approval"

    refused = client.post(f"/v1/jobs/{job['id']}/approve")
    assert refused.status_code == 403
    assert "production apply is disabled" in refused.json()["detail"]

    metrics = client.get("/v1/metrics").json()
    assert metrics["approvals_refused"] >= 1
    assert client.get("/v1/readyz").json() == {"status": "ready"}
    assert client.get("/v1/jobs/missing").status_code == 404
