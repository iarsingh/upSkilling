import logging
import time
from uuid import uuid4

from fastapi import FastAPI, Request, Response

logging.basicConfig(level=logging.INFO, format="%(message)s")

app = FastAPI(title="FastAPI Observability API", version="0.1.0")
REQUEST_COUNT = 0
TOTAL_LATENCY_MS = 0.0


@app.middleware("http")
async def request_logger(request: Request, call_next):
    global REQUEST_COUNT, TOTAL_LATENCY_MS
    request_id = request.headers.get("X-Request-ID", str(uuid4()))
    start = time.perf_counter()
    response = await call_next(request)
    latency_ms = round((time.perf_counter() - start) * 1000, 2)
    REQUEST_COUNT += 1
    TOTAL_LATENCY_MS += latency_ms
    response.headers["X-Request-ID"] = request_id
    logging.info(
        {
            "request_id": request_id,
            "method": request.method,
            "path": request.url.path,
            "status_code": response.status_code,
            "latency_ms": latency_ms,
        }
    )
    return response


@app.get("/healthz")
def healthz() -> dict:
    return {"status": "healthy"}


@app.get("/work")
def work() -> dict:
    time.sleep(0.05)
    return {"status": "done"}


@app.get("/metrics")
def metrics() -> Response:
    avg_latency = TOTAL_LATENCY_MS / REQUEST_COUNT if REQUEST_COUNT else 0
    body = (
        f"fastapi_requests_total {REQUEST_COUNT}\n"
        f"fastapi_request_latency_ms_avg {avg_latency:.2f}\n"
    )
    return Response(content=body, media_type="text/plain")

