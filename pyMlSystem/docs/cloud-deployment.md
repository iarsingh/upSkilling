# Future GKE deployment — not applied

The user selected local execution. Terraform and Kubernetes files are a starting point for the later cloud phase, not a deployable production environment already configured.

## Included

`infra/terraform` defines project API enablement, a VPC/subnet with pod/service ranges, Cloud NAT, an Autopilot cluster with private nodes and a restricted control-plane CIDR, a node service account, Artifact Registry, a private versioned GCS model bucket, HA PostgreSQL with backups/PITR, app/MLflow databases, and an API IAM service account with Cloud SQL roles and a GKE workload identity binding.

Cloud SQL uses PostgreSQL 17 as a conservative managed-service baseline; confirm regional engine support before selecting a newer version. The local Compose database uses PostgreSQL 18. GKE uses its regular release channel rather than hard-coding a rapidly changing Kubernetes patch version.

The Kubernetes template defines the namespace, service account, two API replicas, health probes, resource requests/limits, a ClusterIP service, HPA, disruption budget, and managed Prometheus scraping. It has deliberate image/service-account placeholders and references an external secret that does not yet exist.

## Required before deployment

1. Choose the billing-enabled project/region, budget, and trusted operator/runner CIDR. Review quotas and organization policies.
2. Bootstrap a private versioned GCS bucket for Terraform state, restrict its IAM, and initialize the backend with its bucket/prefix. State bucket creation is intentionally separate to avoid a circular backend dependency.
3. Review a real Terraform plan with credentials. Local `validate` checks provider schema; it cannot verify cloud permissions, quotas, costs, or organization policy.
4. Build, scan, and push a container; replace the manifest placeholder with its immutable digest. Replace the GKE service-account annotation with Terraform's output.
5. Configure Cloud SQL Auth Proxy as a sidecar with private IP and automatic IAM authentication, or an equivalent reviewed connector. The template does not contain this sidecar yet. Grant the database IAM user the required SQL schema privileges separately; IAM instance login alone does not grant table access. Enable `vector` with an authorized migration identity.
6. Deliver `DATABASE_URL` and a strong `API_KEY` using managed secrets. Establish separate migration and application database privileges. Run Alembic/seed in a one-shot release job before deploying API replicas; do not race migrations in every pod.
7. Deploy MLflow privately with its own workload identity, SQL connection, artifact-bucket IAM, required GCS Python dependencies, authentication, backups, and restricted network access. Terraform provisions backing infrastructure, not the MLflow service.
8. Add ingress/TLS and OIDC, tenant isolation, network policies, rate limits, secret filtering, and SLO alert delivery. Keep `/metrics` private. Review retention and recovery procedures.
9. Configure GitHub OIDC federation with repository/branch restrictions and least-privilege deployment roles. Add an image-publish workflow and gated deployment workflow. The included CI only validates locally; it does not deploy.
10. Replace the synthetic model with an evaluated real candidate, verify provenance, test load and failure behavior, and rehearse rollback and database restore.

## Read-only validation

```sh
terraform -chdir=infra/terraform init -backend=false
terraform -chdir=infra/terraform fmt -check
terraform -chdir=infra/terraform validate
```

No `terraform apply` is part of this project's local commands or CI. Database and cluster deletion protection are enabled; disabling them for teardown requires an intentional configuration change.

## References

- [GKE Workload Identity Federation](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity)
- [Terraform Google provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
- [MLflow network protection](https://mlflow.org/docs/latest/self-hosting/security/network/)
