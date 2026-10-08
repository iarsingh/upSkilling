"""In-memory ops plane. Production apply is refused. This is a laptop lab."""

from __future__ import annotations

from collections import deque
from datetime import UTC, datetime
from functools import wraps
from threading import RLock
from typing import Any
from uuid import uuid4

from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel, Field, field_validator

router = APIRouter(tags=["ops-plane"])

_WORKSPACES: dict[str, dict[str, Any]] = {}
_JOBS: dict[str, dict[str, Any]] = {}
_AUDIT: deque[dict[str, Any]] = deque(maxlen=5000)
_METRICS = {"jobs_created": 0, "approvals_refused": 0, "approvals_granted": 0}
_LOCK = RLock()


def _synchronized(fn):
    @wraps(fn)
    def wrapped(*args, **kwargs):
        with _LOCK:
            return fn(*args, **kwargs)

    return wrapped


def _now() -> str:
    return datetime.now(UTC).isoformat()


def _audit(action: str, **fields: Any) -> None:
    _AUDIT.append({"ts": _now(), "action": action, **fields})


def _tenant(x_tenant_id: str | None) -> str:
    return (x_tenant_id or "default").strip() or "default"


class WorkspaceIn(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    environment: str = "lab"
    owners: list[str] = Field(default_factory=list)

    @field_validator("name", "environment")
    @classmethod
    def non_blank(cls, value: str) -> str:
        value = value.strip()
        if not value or len(value) > 80:
            raise ValueError("value must contain 1 to 80 non-whitespace characters")
        return value


class JobIn(BaseModel):
    kind: str = Field(min_length=1, max_length=40)
    payload: dict[str, Any] = Field(default_factory=dict)
    target: str = "lab"

    @field_validator("kind", "target")
    @classmethod
    def normalize(cls, value: str) -> str:
        value = value.strip()
        if not value or len(value) > 40:
            raise ValueError("value must contain 1 to 40 non-whitespace characters")
        return value.lower()


@router.get("/readyz")
def readyz() -> dict[str, str]:
    return {"status": "ready"}


@router.post("/workspaces", status_code=201)
@_synchronized
def create_workspace(body: WorkspaceIn, x_tenant_id: str | None = Header(default=None)) -> dict[str, Any]:
    tenant = _tenant(x_tenant_id)
    wid = str(uuid4())
    record = {
        "id": wid,
        "tenant": tenant,
        "name": body.name,
        "environment": body.environment,
        "owners": body.owners,
        "created_at": _now(),
    }
    _WORKSPACES[wid] = record
    _audit("workspace.create", workspace_id=wid, tenant=tenant)
    return record


@router.get("/workspaces")
@_synchronized
def list_workspaces(x_tenant_id: str | None = Header(default=None)) -> dict[str, Any]:
    tenant = _tenant(x_tenant_id)
    items = [w for w in _WORKSPACES.values() if w["tenant"] == tenant]
    return {"items": items, "count": len(items)}


@router.post("/workspaces/{workspace_id}/jobs", status_code=201)
@_synchronized
def create_job(workspace_id: str, body: JobIn, x_tenant_id: str | None = Header(default=None)) -> dict[str, Any]:
    tenant = _tenant(x_tenant_id)
    ws = _WORKSPACES.get(workspace_id)
    if not ws or ws["tenant"] != tenant:
        raise HTTPException(status_code=404, detail="workspace not found")
    jid = str(uuid4())
    record = {
        "id": jid,
        "workspace_id": workspace_id,
        "tenant": tenant,
        "kind": body.kind,
        "payload": body.payload,
        "target": body.target,
        "status": "pending_approval" if body.target in {"prod", "production"} else "queued",
        "created_at": _now(),
    }
    _JOBS[jid] = record
    _METRICS["jobs_created"] += 1
    _audit("job.create", job_id=jid, workspace_id=workspace_id, target=body.target, tenant=tenant)
    return record


@router.get("/jobs/{job_id}")
@_synchronized
def get_job(job_id: str, x_tenant_id: str | None = Header(default=None)) -> dict[str, Any]:
    tenant = _tenant(x_tenant_id)
    job = _JOBS.get(job_id)
    if not job or job["tenant"] != tenant:
        raise HTTPException(status_code=404, detail="job not found")
    return job


@router.post("/jobs/{job_id}/approve")
@_synchronized
def approve_job(job_id: str, x_tenant_id: str | None = Header(default=None)) -> dict[str, Any]:
    tenant = _tenant(x_tenant_id)
    job = _JOBS.get(job_id)
    if not job or job["tenant"] != tenant:
        raise HTTPException(status_code=404, detail="job not found")
    if job["target"] in {"prod", "production"}:
        _METRICS["approvals_refused"] += 1
        _audit("job.approve.refused", job_id=job_id, reason="prod_apply_disabled", tenant=tenant)
        raise HTTPException(status_code=403, detail="production apply is disabled in this lab")
    if job["status"] == "approved":
        return job
    job["status"] = "approved"
    job["approved_at"] = _now()
    _METRICS["approvals_granted"] += 1
    _audit("job.approve", job_id=job_id, tenant=tenant)
    return job


@router.get("/audit")
@_synchronized
def audit(x_tenant_id: str | None = Header(default=None), limit: int = 50) -> dict[str, Any]:
    tenant = _tenant(x_tenant_id)
    filtered = [e for e in _AUDIT if e.get("tenant") == tenant]
    return {"items": filtered[-max(1, min(limit, 200)) :], "count": len(filtered)}


@router.get("/metrics")
@_synchronized
def metrics() -> dict[str, int]:
    return dict(_METRICS)
