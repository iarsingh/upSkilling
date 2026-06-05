# Project 01: FastAPI CRUD Service

## Skill
Pydantic models, request validation, response models, CRUD patterns, and HTTP status codes.

## Run

```sh
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Try:

```sh
curl -X POST http://127.0.0.1:8000/items -H 'Content-Type: application/json' -d '{"name":"gke","owner":"platform","priority":2}'
curl http://127.0.0.1:8000/items
```

