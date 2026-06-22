# Terraform Advanced Projects

Advanced Terraform projects for GCP-focused cloud, DevOps, and platform engineering interviews.

## Projects

- `00-remote-state-gcs`: GCS backend and state locking pattern.
- `01-reusable-gcp-modules`: Reusable module structure for network and service accounts.
- `02-drift-detection`: Drift detection workflow for CI.
- `03-policy-checks`: Terraform plan policy checks using OPA/Conftest.

## Interview Questions and Answers

### 1. Why use remote state?
Remote state lets a team share infrastructure state safely. On GCP, a GCS bucket is commonly used for Terraform state storage.

### 2. What is state locking?
State locking prevents two people or pipelines from modifying the same Terraform state at the same time. GCS supports consistency for state writes, but many teams still design CI so only one apply runs per environment.

### 3. What is drift?
Drift happens when real infrastructure no longer matches Terraform state or code, often because someone changed resources manually.

### 4. What makes a good Terraform module?
A good module has clear inputs, outputs, examples, versioning, minimal hidden behavior, and avoids hardcoding environment-specific values.

### 5. What should run in CI before Terraform apply?
Run `terraform fmt`, `terraform validate`, `terraform plan`, security scans, cost estimation, and policy checks.

