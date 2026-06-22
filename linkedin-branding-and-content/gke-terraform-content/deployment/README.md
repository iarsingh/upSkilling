# GKE MLOps Deployment with Terraform

This deployment scaffold is for the 100-day GKE MLOps learning and LinkedIn content series. It is designed to be realistic enough for senior interview discussion while still readable as a portfolio project.

## What It Deploys

- Required GCP APIs
- Custom VPC and subnet
- Secondary ranges for GKE pods and services
- Cloud Router and Cloud NAT for private node egress
- Private regional GKE cluster
- System, application, spot, and optional GPU node pools
- Workload Identity
- Artifact Registry Docker repository
- GCS bucket for model artifacts
- Service accounts and IAM bindings
- Kubernetes manifests for a simple MLOps namespace, MLflow placeholder, inference deployment, HPA, PDB, and NetworkPolicy

## Terraform Commands

```bash
cd linkedin-branding-and-content/gke-terraform-content/deployment/terraform
terraform init
terraform fmt
terraform validate
terraform plan -var-file=terraform.tfvars
terraform apply -var-file=terraform.tfvars
```

## After Terraform Apply

Authenticate to the cluster:

```bash
gcloud container clusters get-credentials gke-mlops-platform \
  --region us-central1 \
  --project YOUR_PROJECT_ID
```

Deploy the Kubernetes resources:

```bash
kubectl apply -f ../k8s/
```

## Important

Running `terraform apply` creates billable GCP resources. Review the plan carefully before applying.

