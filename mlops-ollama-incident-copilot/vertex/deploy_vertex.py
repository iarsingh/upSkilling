from google.cloud import aiplatform


def deploy_model(project_id: str, region: str, model_display_name: str, artifact_uri: str) -> None:
    aiplatform.init(project=project_id, location=region)
    model = aiplatform.Model.upload(
        display_name=model_display_name,
        artifact_uri=artifact_uri,
        serving_container_image_uri="us-docker.pkg.dev/vertex-ai/prediction/sklearn-cpu.1-5:latest",
    )
    endpoint = aiplatform.Endpoint.create(display_name=f"{model_display_name}-endpoint")
    model.deploy(endpoint=endpoint, machine_type="n1-standard-2", min_replica_count=1)


if __name__ == "__main__":
    raise SystemExit("Call deploy_model(project_id, region, model_display_name, artifact_uri).")
