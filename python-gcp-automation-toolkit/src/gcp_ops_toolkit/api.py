from pathlib import Path

from fastapi import FastAPI, Query
from pydantic import BaseModel, Field

from gcp_ops_toolkit.cloud_run import deployment_plan
from gcp_ops_toolkit.cost_optimizer import analyze_cost_resources
from gcp_ops_toolkit.gcp_collectors import collect_compute_resources, query_billing_summary
from gcp_ops_toolkit.gke_health import analyze_cluster, collect_cluster_state
from gcp_ops_toolkit.iam_audit import audit_policy, get_project_policy
from gcp_ops_toolkit.vertex_ai import list_models
from gcp_ops_toolkit.vertex_ai import training_job_plan


app = FastAPI(title="GCP Operations Automation Toolkit", version="1.0.0")


class CloudRunPlanRequest(BaseModel):
    project_id: str
    region: str = "us-central1"
    service: str
    source_dir: str
    repository: str = "cloud-run"
    staging_bucket: str
    tag: str = "latest"
    service_account: str | None = None
    allow_unauthenticated: bool = False


class VertexTrainingPlanRequest(BaseModel):
    project_id: str
    region: str = "us-central1"
    display_name: str
    container_uri: str
    machine_type: str = "n1-standard-4"
    service_account: str | None = None
    args: list[str] = Field(default_factory=list)


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/gke/health")
def gke_health(context: str | None = None) -> dict:
    nodes, pods = collect_cluster_state(context)
    return analyze_cluster(nodes, pods, context=context or "current").model_dump(mode="json")


@app.get("/iam/audit/{project_id}")
def iam_audit(project_id: str) -> dict:
    return audit_policy(project_id, get_project_policy(project_id)).model_dump(mode="json")


@app.get("/cost/optimize/{project_id}")
def cost_optimize(
    project_id: str,
    billing_days: int = Query(30, ge=1, le=365),
    snapshot_age_days: int = Query(90, ge=1),
) -> dict:
    instances, disks, snapshots = collect_compute_resources(project_id)
    return analyze_cost_resources(
        project_id,
        instances=instances,
        disks=disks,
        snapshots=snapshots,
        billing_summary=query_billing_summary(project_id, billing_days),
        snapshot_age_days=snapshot_age_days,
    ).model_dump(mode="json")


@app.get("/vertex/models/{project_id}")
def vertex_models(project_id: str, region: str = "us-central1") -> list[dict]:
    return list_models(project_id, region)


@app.post("/cloud-run/plan")
def cloud_run_plan(request: CloudRunPlanRequest) -> dict:
    return deployment_plan(
        project_id=request.project_id,
        region=request.region,
        service=request.service,
        source_dir=Path(request.source_dir),
        repository=request.repository,
        staging_bucket=request.staging_bucket,
        tag=request.tag,
        service_account=request.service_account,
        allow_unauthenticated=request.allow_unauthenticated,
    )


@app.post("/vertex/training-plan")
def vertex_training_plan(request: VertexTrainingPlanRequest) -> dict:
    return training_job_plan(**request.model_dump())
