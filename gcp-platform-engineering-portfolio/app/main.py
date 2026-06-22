from time import perf_counter

from fastapi import FastAPI
from prometheus_client import Counter, Histogram, generate_latest
from starlette.responses import Response

app = FastAPI(title="Platform Sample API", version="1.0.0")

REQUESTS = Counter("platform_sample_requests_total", "Total API requests", ["endpoint"])
LATENCY = Histogram("platform_sample_request_seconds", "API request latency", ["endpoint"])


@app.get("/health")
def health() -> dict[str, str]:
    REQUESTS.labels(endpoint="/health").inc()
    return {"status": "ok"}


@app.get("/ready")
def ready() -> dict[str, str]:
    REQUESTS.labels(endpoint="/ready").inc()
    return {"status": "ready"}


@app.post("/predict")
def predict(payload: dict) -> dict:
    start = perf_counter()
    REQUESTS.labels(endpoint="/predict").inc()
    result = {
        "prediction": "low-risk",
        "confidence": 0.82,
        "input_keys": sorted(payload.keys()),
    }
    LATENCY.labels(endpoint="/predict").observe(perf_counter() - start)
    return result


@app.get("/metrics")
def metrics() -> Response:
    return Response(generate_latest(), media_type="text/plain")

