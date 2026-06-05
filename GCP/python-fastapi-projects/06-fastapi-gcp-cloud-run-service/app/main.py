import os
from datetime import datetime, timezone

from fastapi import FastAPI

app = FastAPI(title="FastAPI Cloud Run Service", version="0.1.0")


@app.get("/")
def root() -> dict:
    return {
        "service": "fastapi-cloud-run-service",
        "revision": os.getenv("K_REVISION", "local"),
        "environment": os.getenv("APP_ENV", "dev"),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/healthz")
def healthz() -> dict:
    return {"status": "healthy"}

