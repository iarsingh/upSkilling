# Security Controls

## GCP

- Use least-privilege IAM.
- Use service accounts per workload.
- Use Shared VPC for centralized networking.
- Enable audit logging.
- Use Cloud Armor for public services.
- Use Artifact Registry for controlled images.

## Kubernetes

- Use namespace boundaries.
- Use Kubernetes RBAC.
- Use service accounts per app.
- Avoid privileged containers.
- Set resource limits.
- Use NetworkPolicy for traffic boundaries.
- Mount secrets only where required.

## CI/CD

- Scan Docker images.
- Validate Terraform before apply.
- Validate Kubernetes manifests before deploy.
- Mask secrets in logs.
- Use approval gates for production.
- Store secrets in a secret manager.

