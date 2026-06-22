from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_release_gate_approves_healthy_candidate():
    response = client.post(
        "/releases/evaluate",
        json={
            "service": "payments",
            "version": "1.2.3",
            "tests_passed": True,
            "critical_vulnerabilities": 0,
            "error_budget_remaining": 82,
        },
    )

    assert response.status_code == 200
    assert response.json()["approved"] is True

