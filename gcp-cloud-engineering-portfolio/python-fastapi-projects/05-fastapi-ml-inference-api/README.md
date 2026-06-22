# Project 05: FastAPI ML Inference API

## Skill
Prediction APIs, Pydantic validation, model metadata, explainable response shape, and MLOps service contracts.

## Run

```sh
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Try:

```sh
curl -X POST http://127.0.0.1:8000/predict -H 'Content-Type: application/json' -d '{"features":[0.2,0.4,0.8]}'
```

