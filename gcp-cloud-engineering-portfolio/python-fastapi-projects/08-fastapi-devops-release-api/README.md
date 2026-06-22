# Project 08: FastAPI DevOps Release API

## Skill
Release readiness, deployment gates, semantic metadata, change approvals, and platform API design.

## Run

```sh
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Try:

```sh
curl -X POST http://127.0.0.1:8000/releases/evaluate -H 'Content-Type: application/json' -d '{"service":"payments","version":"1.2.3","tests_passed":true,"critical_vulnerabilities":0,"error_budget_remaining":82}'
```

