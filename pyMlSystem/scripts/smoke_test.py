"""Exercise a running API without cloud or paid model access."""

import os

import httpx

with httpx.Client(
    base_url=os.getenv("API_URL", "http://127.0.0.1:8000"),
    timeout=30,
    headers={"X-API-Key": os.getenv("API_KEY", "")},
) as client:
    ready = client.get("/health/ready")
    ready.raise_for_status()
    response = client.post(
        "/api/v1/incidents",
        json={
            "title": "Database connections exhausted",
            "description": "PostgreSQL connection pool exhausted and SQL queries time out during checkout.",
            "service": "checkout-api",
            "severity": "SEV2",
        },
    )
    response.raise_for_status()
    incident = response.json()
    assert incident["prediction"]["category"] == "database", incident
    assert "rb-database" in incident["recommendation"]["citation_ids"], incident
    feedback = client.put(
        f"/api/v1/incidents/{incident['id']}/feedback", json={"helpful": True, "notes": "Local smoke test"}
    )
    feedback.raise_for_status()
    persisted = client.get(f"/api/v1/incidents/{incident['id']}")
    persisted.raise_for_status()
    assert persisted.json()["feedback"]["helpful"] is True
    metrics = client.get("/metrics")
    metrics.raise_for_status()
    assert "incident_triages_total" in metrics.text
    print("PASS: readiness, classification, runbook citation, persistent feedback, metrics")
