import os
from pathlib import Path
from typing import Optional

import click
from rich.console import Console

from .config import TerraformConfig
from .gcp_project import GCPProjectHelper
from .state_validator import StateValidator
from .terraform_helper import TerraformHelper

console = Console()


@click.group()
def main():
    """GCP Terraform automation CLI."""


@main.command()
@click.option("--project-id", required=True, help="GCP project ID to bootstrap and deploy.")
@click.option("--terraform-dir", default="terraform", help="Path to the Terraform configuration directory.")
@click.option("--backend-bucket", required=True, help="GCS bucket name for Terraform remote state.")
@click.option("--region", default="us-central1", help="GCP region for resources.")
@click.option("--credentials", default="", help="Path to Google application credentials JSON.")
def bootstrap(project_id: str, terraform_dir: str, backend_bucket: str, region: str, credentials: str):
    """Initialize GCP project and Terraform backend."""
    if credentials:
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credentials
    helper = GCPProjectHelper(project_id, credentials_path=credentials if credentials else None)
    result = helper.ensure_project()
    console.print(f"[green]Project bootstrap result:[/green] {result}")

    config = TerraformConfig(
        project_id=project_id,
        region=region,
        backend_bucket=backend_bucket,
        backend_prefix="terraform/state",
    )
    terraform_helper = TerraformHelper(terraform_dir, config=config)
    backend_config = {
        "bucket": backend_bucket,
        "prefix": config.backend_prefix,
    }
    terraform_helper.init(backend_config=backend_config)
    console.print("[green]Terraform backend initialized successfully.[/green]")


@main.command()
@click.option("--project-id", required=True, help="GCP project ID to deploy.")
@click.option("--terraform-dir", default="terraform", help="Path to the Terraform configuration directory.")
@click.option("--backend-bucket", required=True, help="GCS bucket name for Terraform remote state.")
@click.option("--region", default="us-central1", help="GCP region for deployment.")
@click.option("--credentials", default="", help="Path to Google application credentials JSON.")
def deploy(project_id: str, terraform_dir: str, backend_bucket: str, region: str, credentials: str):
    """Run Terraform plan and apply for the GCP project."""
    if credentials:
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = credentials
    config = TerraformConfig(project_id=project_id, region=region, backend_bucket=backend_bucket)
    terraform_helper = TerraformHelper(terraform_dir, config=config)
    var_args = [
        f"-var=project_id={project_id}",
        f"-var=region={region}",
        f"-var=backend_bucket={backend_bucket}",
        f"-var=backend_prefix={config.backend_prefix}",
    ]
    terraform_helper.plan(extra_args=var_args)
    terraform_helper.apply(var_file=None, extra_args=var_args)
    console.print("[green]Terraform apply complete.[/green]")


@main.command()
@click.option("--project-id", required=True, help="Expected GCP project ID in Terraform state.")
@click.option("--terraform-dir", default="terraform", help="Path to the Terraform configuration directory.")
@click.option("--workspace", default="default", help="Terraform workspace expected in state.")
def validate_state(project_id: str, terraform_dir: str, workspace: str):
    """Validate Terraform state consistency and project alignment."""
    validator = StateValidator(terraform_dir, expected_project_id=project_id)
    validator.validate_workspace(workspace)
    validator.validate_project()
    validator.validate_required_resources([
        "google_storage_bucket",
    ])
    console.print("[green]Terraform state validation passed.[/green]")


@main.command()
@click.option("--terraform-dir", default="terraform", help="Path to the Terraform configuration directory.")
def status(terraform_dir: str):
    """Show current Terraform workspace and state metadata."""
    terraform_helper = TerraformHelper(terraform_dir)
    workspace = terraform_helper.workspace_show()
    console.print(f"[blue]Terraform workspace:[/blue] {workspace}")
    result = terraform_helper.validate_state()
    console.print(result)


if __name__ == "__main__":
    main()
