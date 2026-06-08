import os
from functools import lru_cache

from fastapi import FastAPI
from google.cloud import secretmanager


app = FastAPI(title="Secret Manager FastAPI", version="1.0.0")


@lru_cache
def settings() -> dict[str, str]:
    return {
        "project_id": required_env("PROJECT_ID"),
        "secret_id": required_env("SECRET_ID"),
    }


def required_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"missing required env var: {name}")
    return value


def secret_resource_name() -> str:
    config = settings()
    return f"projects/{config['project_id']}/secrets/{config['secret_id']}/versions/latest"


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "healthy", "service": "secret-manager-fastapi"}


@app.get("/secret-metadata")
def secret_metadata() -> dict[str, str | int]:
    client = secretmanager.SecretManagerServiceClient()
    response = client.access_secret_version(request={"name": secret_resource_name()})
    secret_value = response.payload.data.decode("utf-8")

    return {
        "secret_id": settings()["secret_id"],
        "version": "latest",
        "length": len(secret_value),
        "status": "loaded",
    }

