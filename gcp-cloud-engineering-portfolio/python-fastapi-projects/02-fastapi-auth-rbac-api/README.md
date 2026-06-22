# Project 02: FastAPI Auth and RBAC API

## Skill
API key authentication, dependency injection, role checks, and protected endpoints.

## Run

```sh
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Try:

```sh
curl -H 'X-API-Key: dev-admin-key' http://127.0.0.1:8000/admin/secrets
curl -H 'X-API-Key: dev-readonly-key' http://127.0.0.1:8000/me
```

