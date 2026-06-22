# Project 04: FastAPI Background Jobs

## Skill
Background tasks, job APIs, async status tracking, operational workflows, and task state modeling.

## Run

```sh
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Try:

```sh
curl -X POST http://127.0.0.1:8000/jobs -H 'Content-Type: application/json' -d '{"task":"backup","target":"db-primary"}'
curl http://127.0.0.1:8000/jobs
```

