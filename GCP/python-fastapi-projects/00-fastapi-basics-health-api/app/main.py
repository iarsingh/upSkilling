import os
from datetime import datetime, timezone

from fastapi import FastAPI

app = FastAPI(title="FastAPI Basics Health API", version="0.1.0")


@app.get("/")
def root() -> dict:
    return {
        "service": "fastapi-basics-health-api",
        "environment": os.getenv("APP_ENV", "dev"),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/healthz")
def healthz() -> dict:
    return {"status": "healthy"}


@app.get("/readyz")
def readyz() -> dict:
    return {"status": "ready"}

