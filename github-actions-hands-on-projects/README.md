# GitHub Actions Hands-On Projects

This folder contains GitHub Actions CI/CD projects for DevOps, GCP, Docker, Terraform, Kubernetes, and security interview preparation.

## Projects

- `projects/python-ci/` - Python test and lint pipeline
- `projects/go-ci/` - Go build and test pipeline
- `projects/docker-cloud-run/` - Docker image build and Cloud Run deployment workflow
- `projects/terraform-validation/` - Terraform fmt, validate, and plan workflow
- `projects/k8s-manifest-validation/` - Kubernetes manifest validation workflow
- `projects/security-scan/` - secret scan and dependency scan workflow
- `workflows/` - copy-ready workflow YAML examples

## How to Use

Copy any workflow from `workflows/` into:

```text
.github/workflows/
```

Then adjust paths, secrets, project IDs, and deployment targets.

## Interview Story

```text
I built GitHub Actions workflows for Python, Go, Docker, Terraform, Kubernetes,
security scanning, and Cloud Run deployment. Each workflow has clear triggers,
permissions, path filters, and validation steps to support safe CI/CD.
```

## Skills Practiced

- CI vs CD
- workflow triggers
- jobs and steps
- path filters
- secrets
- artifacts
- Docker build pipelines
- Terraform validation
- Kubernetes manifest validation
- GCP Workload Identity Federation

