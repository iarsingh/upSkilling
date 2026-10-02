from uuid import uuid4

PAYLOAD = {
    "title": "Kubernetes pods repeatedly restart",
    "description": "Kubernetes deployment pods show CrashLoopBackOff and OOMKilled with memory limits reached.",
    "service": "checkout",
    "severity": "SEV2",
}


def test_complete_triage_and_feedback_persistence(client):
    assert client.get("/health/ready").status_code == 200
    response = client.post("/api/v1/incidents", json=PAYLOAD)
    assert response.status_code == 201
    row = response.json()
    assert row["prediction"]["category"] == "kubernetes"
    assert row["prediction"]["model_version"].startswith("demo-")
    assert row["recommendation"]["mode"] == "runbook"
    assert "rb-kubernetes" in row["recommendation"]["citation_ids"]
    assert row["recommendation"]["requires_human_approval"]
    assert client.get("/api/v1/incidents").json()[0]["id"] == row["id"]
    feedback_url = f"/api/v1/incidents/{row['id']}/feedback"
    assert client.put(feedback_url, json={"helpful": False, "notes": "Needs context"}).status_code == 200
    assert (
        client.put(
            feedback_url, json={"helpful": True, "correct_category": "kubernetes", "notes": "Useful"}
        ).status_code
        == 200
    )
    saved = client.get(f"/api/v1/incidents/{row['id']}").json()
    assert saved["feedback"] == {"helpful": True, "correct_category": "kubernetes", "notes": "Useful"}


def test_auth_and_validation(client):
    assert client.post("/api/v1/incidents", json=PAYLOAD, headers={"X-API-Key": "wrong"}).status_code == 401
    assert client.post("/api/v1/incidents", json={**PAYLOAD, "title": "     "}).status_code == 422
    assert client.post("/api/v1/incidents", json={**PAYLOAD, "severity": "critical"}).status_code == 422
    assert client.get("/api/v1/incidents?limit=1000").status_code == 422
    assert client.get(f"/api/v1/incidents/{uuid4()}").status_code == 404
    assert client.put(f"/api/v1/incidents/{uuid4()}/feedback", json={"helpful": True}).status_code == 404


def test_unknown_input_requires_review_and_has_no_invented_evidence(client):
    row = client.post(
        "/api/v1/incidents",
        json={
            "title": "Zqxv blorf zzzzz",
            "description": "Xyzzpq blorf qqqqq zzzzz qzxqz",
            "service": "unknown",
        },
    ).json()
    assert row["prediction"]["needs_review"]
    assert row["prediction"]["team"] == "Human triage"
    assert row["recommendation"]["citation_ids"] == []
    assert row["recommendation"]["mode"] == "no_evidence"


def test_metrics_do_not_label_incident_ids_or_text(client):
    row = client.post("/api/v1/incidents", json=PAYLOAD).json()
    client.get(f"/api/v1/incidents/{row['id']}")
    metrics = client.get("/metrics").text
    assert "incident_triages_total" in metrics
    assert 'route="/api/v1/incidents/{incident_id}"' in metrics
    assert row["id"] not in metrics
    assert PAYLOAD["title"] not in metrics
