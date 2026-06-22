from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="FastAPI MLOps Model Registry API", version="0.1.0")


class ModelVersion(BaseModel):
    name: str = Field(min_length=2)
    version: str = Field(pattern=r"^\d+\.\d+\.\d+$")
    accuracy: float = Field(ge=0, le=1)
    artifact_uri: str = Field(min_length=5)
    stage: str = "candidate"


registry: dict[str, ModelVersion] = {}


def model_key(name: str, version: str) -> str:
    return f"{name}:{version}"


@app.post("/models", response_model=ModelVersion)
def register_model(model: ModelVersion) -> ModelVersion:
    registry[model_key(model.name, model.version)] = model
    return model


@app.get("/models", response_model=list[ModelVersion])
def list_models() -> list[ModelVersion]:
    return list(registry.values())


@app.post("/models/{name}/{version}/promote", response_model=ModelVersion)
def promote_model(name: str, version: str) -> ModelVersion:
    key = model_key(name, version)
    if key not in registry:
        raise HTTPException(status_code=404, detail="model version not found")
    model = registry[key]
    if model.accuracy < 0.9:
        raise HTTPException(status_code=400, detail="accuracy below promotion threshold")
    promoted = model.model_copy(update={"stage": "production"})
    registry[key] = promoted
    return promoted

