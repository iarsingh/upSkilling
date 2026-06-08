# GKE MLOps Terraform Project

This is the standalone Terraform project for the 100-day GKE, Terraform, and MLOps content track.

It turns the LinkedIn roadmap into deployable infrastructure:

- GCP API enablement
- Custom VPC and subnet
- Pod and service secondary ranges
- Private regional GKE cluster
- Cloud Router and Cloud NAT
- Workload Identity
- Service accounts and IAM
- Artifact Registry
- Versioned GCS model artifact bucket
- KMS and Secret Manager
- Optional Cloud SQL PostgreSQL for MLflow metadata
- Optional private Cloud DNS zone
- System, application, spot batch, and optional GPU node pools
- Cloud Monitoring alert policy

## Project Layout

```text
terraform-project/
  versions.tf
  variables.tf
  locals.tf
  apis.tf
  network.tf
  iam.tf
  artifact-storage.tf
  gke.tf
  mlops-services.tf
  observability.tf
  outputs.tf
  terraform.tfvars.example
  environments/
    dev/terraform.tfvars
    prod/terraform.tfvars
  docs/
    100-day-terraform-coverage.md
```

## Deploy Dev

```bash
cd linkedin/gke-terraform-content/terraform-project
terraform init
terraform fmt -recursive
terraform validate
terraform plan -var-file=environments/dev/terraform.tfvars
terraform apply -var-file=environments/dev/terraform.tfvars
```

## Deploy Prod

```bash
cd linkedin/gke-terraform-content/terraform-project
terraform plan -var-file=environments/prod/terraform.tfvars
terraform apply -var-file=environments/prod/terraform.tfvars
```

## Important

`terraform apply` creates billable GCP resources. Review the plan before applying.

