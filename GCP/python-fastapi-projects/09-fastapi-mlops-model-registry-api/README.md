# Project 09: FastAPI MLOps Model Registry API

## Skill
Model registry APIs, model versioning, promotion workflows, quality gates, and approval metadata.

## Run

```sh
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Try:

```sh
curl -X POST http://127.0.0.1:8000/models -H 'Content-Type: application/json' -d '{"name":"fraud-model","version":"1.0.0","accuracy":0.94,"artifact_uri":"gs://models/fraud/1.0.0"}'
curl -X POST http://127.0.0.1:8000/models/fraud-model/1.0.0/promote
```

