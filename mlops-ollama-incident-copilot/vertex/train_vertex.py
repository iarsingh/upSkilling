from google.cloud import aiplatform


def submit_training(project_id: str, region: str, staging_bucket: str) -> None:
    aiplatform.init(project=project_id, location=region, staging_bucket=staging_bucket)
    job = aiplatform.CustomPythonPackageTrainingJob(
        display_name="incident-copilot-training",
        python_package_gcs_uri=f"{staging_bucket}/packages/incident_copilot.tar.gz",
        python_module_name="incident_copilot.training",
        container_uri="us-docker.pkg.dev/vertex-ai/training/sklearn-cpu.1-5.py310:latest",
    )
    job.run(replica_count=1, machine_type="n1-standard-4")


if __name__ == "__main__":
    raise SystemExit("Call submit_training(project_id, region, staging_bucket) from a release script.")
