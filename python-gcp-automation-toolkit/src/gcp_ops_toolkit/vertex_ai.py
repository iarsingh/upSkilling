from typing import Any


def training_job_plan(
    *,
    project_id: str,
    region: str,
    display_name: str,
    container_uri: str,
    machine_type: str,
    service_account: str | None,
    args: list[str],
) -> dict[str, Any]:
    return {
        "project_id": project_id,
        "region": region,
        "display_name": display_name,
        "container_uri": container_uri,
        "machine_type": machine_type,
        "service_account": service_account,
        "args": args,
    }


def submit_training_job(plan: dict[str, Any]) -> dict[str, Any]:
    from google.cloud import aiplatform

    aiplatform.init(project=plan["project_id"], location=plan["region"])
    job = aiplatform.CustomContainerTrainingJob(
        display_name=plan["display_name"],
        container_uri=plan["container_uri"],
    )
    job.run(
        args=plan["args"],
        machine_type=plan["machine_type"],
        replica_count=1,
        service_account=plan.get("service_account"),
        sync=False,
    )
    return {"display_name": plan["display_name"], "resource_name": job.resource_name}


def list_models(project_id: str, region: str) -> list[dict[str, Any]]:
    from google.cloud import aiplatform

    aiplatform.init(project=project_id, location=region)
    return [
        {
            "resource_name": model.resource_name,
            "display_name": model.display_name,
            "version_id": getattr(model, "version_id", None),
            "create_time": str(model.create_time),
        }
        for model in aiplatform.Model.list(order_by="create_time desc")
    ]


def deploy_model(
    *,
    project_id: str,
    region: str,
    model_name: str,
    endpoint_name: str,
    machine_type: str,
    min_replicas: int,
    max_replicas: int,
) -> dict[str, Any]:
    from google.cloud import aiplatform

    aiplatform.init(project=project_id, location=region)
    model = aiplatform.Model(model_name=model_name)
    endpoints = aiplatform.Endpoint.list(filter=f'display_name="{endpoint_name}"')
    endpoint = endpoints[0] if endpoints else aiplatform.Endpoint.create(display_name=endpoint_name)
    deployed = model.deploy(
        endpoint=endpoint,
        machine_type=machine_type,
        min_replica_count=min_replicas,
        max_replica_count=max_replicas,
        traffic_percentage=100,
        sync=True,
    )
    return {
        "model": model.resource_name,
        "endpoint": endpoint.resource_name,
        "deployed_model_id": deployed.id,
    }
