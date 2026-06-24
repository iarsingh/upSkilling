import os
from time import perf_counter

from fastapi import FastAPI, Request
from prometheus_client import Counter, Histogram, generate_latest
from starlette.responses import Response

APP_VERSION = os.getenv("APP_VERSION", "dev")
app = FastAPI(title="Platform Sample API", version=APP_VERSION)

REQUESTS = Counter(
    "platform_sample_http_requests_total",
    "Total HTTP requests",
    ["method", "endpoint", "status"],
)
LATENCY = Histogram(
    "platform_sample_http_request_duration_seconds",
    "HTTP request latency",
    ["method", "endpoint"],
)


@app.middleware("http")
async def observe_requests(request: Request, call_next):
    endpoint = request.url.path
    start = perf_counter()
    response = await call_next(request)
    REQUESTS.labels(
        method=request.method,
        endpoint=endpoint,
        status=str(response.status_code),
    ).inc()
    LATENCY.labels(method=request.method, endpoint=endpoint).observe(perf_counter() - start)
    return response


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "version": APP_VERSION}


@app.get("/ready")
def ready() -> dict[str, str]:
    return {"status": "ready"}


@app.post("/predict")
def predict(payload: dict) -> dict:
    return {
        "prediction": "low-risk",
        "confidence": 0.82,
        "input_keys": sorted(payload.keys()),
    }


@app.get("/metrics")
def metrics() -> Response:
    return Response(generate_latest(), media_type="text/plain")
