from pathlib import Path
from tempfile import TemporaryDirectory
from typing import Any
from zipfile import ZIP_DEFLATED, ZipFile


def deployment_plan(
    *,
    project_id: str,
    region: str,
    service: str,
    source_dir: Path,
    repository: str,
    staging_bucket: str,
    tag: str,
    service_account: str | None,
    allow_unauthenticated: bool,
) -> dict[str, Any]:
    image_uri = f"{region}-docker.pkg.dev/{project_id}/{repository}/{service}:{tag}"
    return {
        "project_id": project_id,
        "region": region,
        "service": service,
        "source_dir": str(source_dir.resolve()),
        "image_uri": image_uri,
        "staging_bucket": staging_bucket,
        "service_account": service_account,
        "allow_unauthenticated": allow_unauthenticated,
        "steps": [
            "Upload source to Cloud Build",
            "Build container image",
            "Push image to Artifact Registry",
            "Create or update Cloud Run service",
            "Apply invoker IAM policy when requested",
        ],
    }


def deploy_cloud_run(plan: dict[str, Any], env: dict[str, str] | None = None) -> dict[str, Any]:
    from google.cloud.devtools import cloudbuild_v1
    from google.cloud.run_v2 import ServicesClient
    from google.cloud.run_v2.types import RevisionTemplate, Service
    from google.cloud.run_v2.types.k8s_min import EnvVar
    from google.cloud import storage
    from google.protobuf import duration_pb2

    project_id = plan["project_id"]
    region = plan["region"]
    parent = f"projects/{project_id}/locations/{region}"
    service_name = f"{parent}/services/{plan['service']}"

    with TemporaryDirectory() as temporary_directory:
        archive_path = Path(temporary_directory) / "source.zip"
        with ZipFile(archive_path, "w", ZIP_DEFLATED) as archive:
            for path in Path(plan["source_dir"]).rglob("*"):
                if path.is_file() and ".git" not in path.parts and ".venv" not in path.parts:
                    archive.write(path, path.relative_to(plan["source_dir"]))
        object_name = f"cloud-run-source/{plan['service']}/{plan['image_uri'].rsplit(':', 1)[-1]}.zip"
        storage.Client(project=project_id).bucket(plan["staging_bucket"]).blob(
            object_name
        ).upload_from_filename(archive_path)

    build_client = cloudbuild_v1.services.cloud_build.CloudBuildClient()
    build = cloudbuild_v1.Build(
        source=cloudbuild_v1.Source(
            storage_source=cloudbuild_v1.StorageSource(
                bucket=plan["staging_bucket"],
                object_=object_name,
            )
        ),
        steps=[
            cloudbuild_v1.BuildStep(
                name="gcr.io/cloud-builders/docker",
                args=["build", "-t", plan["image_uri"], "."],
            ),
            cloudbuild_v1.BuildStep(
                name="gcr.io/cloud-builders/docker",
                args=["push", plan["image_uri"]],
            ),
        ],
        images=[plan["image_uri"]],
        timeout=duration_pb2.Duration(seconds=1800),
    )
    operation = build_client.create_build(
        project_id=project_id,
        build=build,
    )
    build_result = operation.result(timeout=1900)

    template = RevisionTemplate(
        containers=[
            {
                "image": plan["image_uri"],
                "env": [EnvVar(name=key, value=value) for key, value in (env or {}).items()],
                "ports": [{"container_port": 8080}],
            }
        ],
        service_account=plan.get("service_account") or "",
        max_instance_request_concurrency=80,
    )
    service = Service(name=service_name, template=template)
    client = ServicesClient()
    try:
        deploy_operation = client.update_service(service=service)
    except Exception as error:
        if "404" not in str(error) and "not found" not in str(error).lower():
            raise
        deploy_operation = client.create_service(
            parent=parent,
            service=service,
            service_id=plan["service"],
        )
    deployed = deploy_operation.result(timeout=1200)
    if plan.get("allow_unauthenticated"):
        from google.iam.v1 import iam_policy_pb2, policy_pb2

        policy = client.get_iam_policy(request={"resource": deployed.name})
        binding = next(
            (item for item in policy.bindings if item.role == "roles/run.invoker"),
            None,
        )
        if binding is None:
            binding = policy_pb2.Binding(role="roles/run.invoker", members=["allUsers"])
            policy.bindings.append(binding)
        elif "allUsers" not in binding.members:
            binding.members.append("allUsers")
        client.set_iam_policy(
            request=iam_policy_pb2.SetIamPolicyRequest(resource=deployed.name, policy=policy)
        )
    return {
        "service": deployed.name,
        "uri": deployed.uri,
        "image_uri": plan["image_uri"],
        "build_id": build_result.id,
    }
