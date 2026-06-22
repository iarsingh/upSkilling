# Project 03: FastAPI Observability API

## Skill
Structured logs, request IDs, latency tracking, metrics endpoint, health checks, and production diagnostics.

## Run

```sh
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Try:

```sh
curl http://127.0.0.1:8000/work
curl http://127.0.0.1:8000/metrics
```

