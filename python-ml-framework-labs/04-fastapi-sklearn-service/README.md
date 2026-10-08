# Lab 04 — FastAPI sklearn service

[Project architecture](../PROJECT_ARCHITECTURE.md) · [Interview Q&A](../INTERVIEW_QA.md)

Serve the lab-03 churn artifact behind a validated HTTP API.

## Goal

A loopback FastAPI app with Pydantic request bounds, liveness/readiness, single and batch predict, logistic contributions, a model catalog, and an ops plane that refuses production apply.

## What it does

- `GET /healthz` — process is up.
- `GET /readyz` — model file loaded.
- `GET /model` — feature list and holdout metrics.
- `POST /predict` — probability, label, `needs_human_review` in `[0.4, 0.6]`, contribution factors.
- `POST /predict/batch` — up to 100 rows; empty or oversized batches are rejected.
- `/v1` workspaces and jobs. Approving a `prod` job returns 403.

## Run

```sh
cd python-ml-framework-labs
python -m ml_labs train
python -m ml_labs serve
```

Open http://127.0.0.1:8080/docs

```sh
curl -s http://127.0.0.1:8080/predict \
  -H 'content-type: application/json' \
  -d '{"tenure":4,"monthly_charges":89.5,"support_tickets":6,"late_payments":3,"contract":"month-to-month"}'
```

Docker (loopback only):

```sh
docker compose up --build
```

## Interview talking points

- Readiness is different from liveness: a live empty process should not take traffic.
- Schema validation is cheaper than letting the model fail on a string in a numeric field.
- Uncertain scores go to a person; the API does not auto-cancel an account.
- Production apply stays refused until a separate promotion path exists.
