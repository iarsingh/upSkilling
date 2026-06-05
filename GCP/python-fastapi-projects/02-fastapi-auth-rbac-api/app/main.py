from fastapi import Depends, FastAPI, Header, HTTPException, status
from pydantic import BaseModel

app = FastAPI(title="FastAPI Auth RBAC API", version="0.1.0")


class Principal(BaseModel):
    name: str
    role: str


API_KEYS = {
    "dev-admin-key": Principal(name="platform-admin", role="admin"),
    "dev-readonly-key": Principal(name="developer", role="reader"),
}


def get_principal(x_api_key: str = Header(alias="X-API-Key")) -> Principal:
    principal = API_KEYS.get(x_api_key)
    if not principal:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="invalid API key")
    return principal


def require_admin(principal: Principal = Depends(get_principal)) -> Principal:
    if principal.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="admin role required")
    return principal


@app.get("/me", response_model=Principal)
def me(principal: Principal = Depends(get_principal)) -> Principal:
    return principal


@app.get("/admin/secrets")
def admin_secrets(_: Principal = Depends(require_admin)) -> dict:
    return {"secret_names": ["db-password", "github-token", "cloud-build-webhook"]}

