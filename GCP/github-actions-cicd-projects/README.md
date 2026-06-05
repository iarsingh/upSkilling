# GitHub Actions CI/CD Projects

CI/CD projects for DevOps, cloud, and DevSecOps practice.

## Projects

- `00-fastapi-ci`: Python FastAPI lint/test workflow.
- `01-docker-build-push`: Docker image build workflow.
- `02-terraform-plan`: Terraform plan workflow.
- `03-gke-deploy`: GKE deployment workflow.

## Interview Questions and Answers

### 1. What is a CI pipeline?
CI automatically validates code changes with builds, tests, linting, and security checks before merge.

### 2. What is CD?
CD automates release and deployment. It can mean continuous delivery with manual approval or continuous deployment with automatic production release.

### 3. Why use environment approvals?
Approvals protect sensitive environments like production and create an audit trail.

### 4. What are GitHub Actions secrets?
Secrets are encrypted values injected into workflows. They should be used for credentials, tokens, and deployment keys.

### 5. What is workload identity federation?
It lets GitHub Actions authenticate to GCP without long-lived service account keys.

