import json
from pathlib import Path

import click

from gcp_ops_toolkit.cloud_run import deploy_cloud_run, deployment_plan
from gcp_ops_toolkit.console import console, print_report
from gcp_ops_toolkit.cost_optimizer import analyze_cost_resources
from gcp_ops_toolkit.gcp_collectors import collect_compute_resources, query_billing_summary
from gcp_ops_toolkit.gke_health import analyze_cluster, collect_cluster_state
from gcp_ops_toolkit.iam_audit import audit_policy, get_project_policy
from gcp_ops_toolkit.reporting import write_report
from gcp_ops_toolkit.vertex_ai import (
    deploy_model,
    list_models,
    submit_training_job,
    training_job_plan,
)


def report_options(function):
    function = click.option(
        "--output-format",
        type=click.Choice(["json", "csv"]),
        default="json",
        show_default=True,
    )(function)
    function = click.option("--output", type=click.Path(path_type=Path))(function)
    return function


def emit_report(report, output: Path | None, output_format: str) -> None:
    print_report(report)
    if output:
        write_report(report, output, output_format)
        console.print(f"Report written to [bold]{output}[/bold]")


@click.group()
@click.version_option()
def cli() -> None:
    """Automate GKE, IAM, cost, Cloud Run, and Vertex AI operations."""


@cli.command("gke-health")
@click.option("--context", help="Kubernetes context. Defaults to the current context.")
@report_options
def gke_health(context: str | None, output: Path | None, output_format: str) -> None:
    """Scan nodes and pods for readiness, pressure, CrashLoopBackOff, and OOM kills."""
    nodes, pods = collect_cluster_state(context)
    emit_report(analyze_cluster(nodes, pods, context=context or "current"), output, output_format)


@cli.command("iam-audit")
@click.option("--project-id", required=True)
@report_options
def iam_audit(project_id: str, output: Path | None, output_format: str) -> None:
    """Audit project IAM bindings and flag privileged identities."""
    emit_report(audit_policy(project_id, get_project_policy(project_id)), output, output_format)


@cli.command("cost-optimize")
@click.option("--project-id", required=True)
@click.option("--billing-days", default=30, show_default=True, type=int)
@click.option("--snapshot-age-days", default=90, show_default=True, type=int)
@report_options
def cost_optimize(
    project_id: str,
    billing_days: int,
    snapshot_age_days: int,
    output: Path | None,
    output_format: str,
) -> None:
    """Find stopped VMs, unattached disks, old snapshots, and billing hotspots."""
    instances, disks, snapshots = collect_compute_resources(project_id)
    report = analyze_cost_resources(
        project_id,
        instances=instances,
        disks=disks,
        snapshots=snapshots,
        billing_summary=query_billing_summary(project_id, billing_days),
        snapshot_age_days=snapshot_age_days,
    )
    emit_report(report, output, output_format)


@cli.command("cloud-run-deploy")
@click.option("--project-id", required=True)
@click.option("--region", default="us-central1", show_default=True)
@click.option("--service", required=True)
@click.option("--source-dir", type=click.Path(exists=True, file_okay=False, path_type=Path), required=True)
@click.option("--repository", default="cloud-run", show_default=True)
@click.option("--staging-bucket", required=True)
@click.option("--tag", default="latest", show_default=True)
@click.option("--service-account")
@click.option("--allow-unauthenticated", is_flag=True)
@click.option("--env", "environment", multiple=True, help="Environment variable in KEY=VALUE form.")
@click.option("--execute", is_flag=True, help="Execute the deployment. Default is dry-run.")
def cloud_run_deploy(
    project_id: str,
    region: str,
    service: str,
    source_dir: Path,
    repository: str,
    staging_bucket: str,
    tag: str,
    service_account: str | None,
    allow_unauthenticated: bool,
    environment: tuple[str, ...],
    execute: bool,
) -> None:
    """Build, push, and deploy a source directory to Cloud Run."""
    plan = deployment_plan(
        project_id=project_id,
        region=region,
        service=service,
        source_dir=source_dir,
        repository=repository,
        staging_bucket=staging_bucket,
        tag=tag,
        service_account=service_account,
        allow_unauthenticated=allow_unauthenticated,
    )
    env = dict(item.split("=", 1) for item in environment)
    result = deploy_cloud_run(plan, env) if execute else {"dry_run": True, **plan, "env": env}
    console.print_json(json.dumps(result, default=str))


@cli.group("vertex")
def vertex() -> None:
    """Manage Vertex AI training jobs, models, and endpoints."""


@vertex.command("train")
@click.option("--project-id", required=True)
@click.option("--region", default="us-central1", show_default=True)
@click.option("--display-name", required=True)
@click.option("--container-uri", required=True)
@click.option("--machine-type", default="n1-standard-4", show_default=True)
@click.option("--service-account")
@click.option("--arg", "args", multiple=True)
@click.option("--execute", is_flag=True)
def vertex_train(
    project_id: str,
    region: str,
    display_name: str,
    container_uri: str,
    machine_type: str,
    service_account: str | None,
    args: tuple[str, ...],
    execute: bool,
) -> None:
    """Plan or submit a Vertex AI custom container training job."""
    plan = training_job_plan(
        project_id=project_id,
        region=region,
        display_name=display_name,
        container_uri=container_uri,
        machine_type=machine_type,
        service_account=service_account,
        args=list(args),
    )
    result = submit_training_job(plan) if execute else {"dry_run": True, **plan}
    console.print_json(json.dumps(result, default=str))


@vertex.command("models")
@click.option("--project-id", required=True)
@click.option("--region", default="us-central1", show_default=True)
def vertex_models(project_id: str, region: str) -> None:
    """List Vertex AI model versions."""
    console.print_json(json.dumps(list_models(project_id, region), default=str))


@vertex.command("deploy")
@click.option("--project-id", required=True)
@click.option("--region", default="us-central1", show_default=True)
@click.option("--model-name", required=True)
@click.option("--endpoint-name", required=True)
@click.option("--machine-type", default="n1-standard-4", show_default=True)
@click.option("--min-replicas", default=1, show_default=True)
@click.option("--max-replicas", default=3, show_default=True)
@click.option("--execute", is_flag=True)
def vertex_deploy(
    project_id: str,
    region: str,
    model_name: str,
    endpoint_name: str,
    machine_type: str,
    min_replicas: int,
    max_replicas: int,
    execute: bool,
) -> None:
    """Deploy a Vertex AI model version to an endpoint."""
    plan = {
        "project_id": project_id,
        "region": region,
        "model_name": model_name,
        "endpoint_name": endpoint_name,
        "machine_type": machine_type,
        "min_replicas": min_replicas,
        "max_replicas": max_replicas,
    }
    result = deploy_model(**plan) if execute else {"dry_run": True, **plan}
    console.print_json(json.dumps(result, default=str))
