import os

from fastapi import FastAPI

app = FastAPI(title="FastAPI Kubernetes Ready API", version="0.1.0")


@app.get("/")
def root() -> dict:
    return {
        "service": "fastapi-kubernetes-ready-api",
        "config_profile": os.getenv("CONFIG_PROFILE", "dev"),
    }


@app.get("/healthz")
def healthz() -> dict:
    return {"status": "healthy"}


@app.get("/readyz")
def readyz() -> dict:
    return {"status": "ready"}

