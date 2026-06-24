# Terraform Enterprise Setup

## Workspace Model

Use a VCS-driven production workspace:

| Setting | Value |
| --- | --- |
| Workspace | `gcp-platform-production` |
| Working directory | `terraform/environments/prod` |
| Branch | `main` |
| Execution mode | Remote |
| Auto apply | Disabled |
| State | Terraform Enterprise managed |

The bootstrap configuration in `terraform/terraform-enterprise/` creates this workspace and its non-sensitive Terraform variables.

## Authentication

Prefer dynamic GCP credentials through Terraform Enterprise workload identity or a short-lived service-account impersonation workflow. Do not store a JSON service-account key as a workspace variable.

Minimum platform-provisioning permissions depend on whether the workspace creates the project:

- Existing project: service usage admin, compute/network admin, Kubernetes Engine admin, Artifact Registry admin, security policy admin, and service-account/IAM permissions.
- New project: organization project creator plus billing project manager in addition to the above.

Scope the permissions to a dedicated folder or project whenever possible.

## Variable Strategy

Use Terraform variable sets for shared values:

- `region`
- organization/folder IDs
- required labels
- policy configuration

Use workspace variables for environment-specific values:

- `project_id`
- `project_name`
- `create_project`
- `gke_machine_type`

Mark billing identifiers and any credentials as sensitive.

## Run Controls

Recommended production controls:

1. Require pull-request review before merging `main`.
2. Enable speculative plans for pull requests.
3. Require manual confirmation before apply.
4. Add Sentinel or OPA policies for approved regions, required labels, public exposure, and machine-size limits.
5. Send run notifications to the platform operations channel.
6. Review drift with scheduled health assessments.

## Bootstrap

```bash
cd terraform/terraform-enterprise
cp terraform.tfvars.example terraform.tfvars
export TFE_TOKEN="..."
terraform init
terraform plan
terraform apply
```

After the workspace exists, configure dynamic GCP credentials and queue the first production plan.
