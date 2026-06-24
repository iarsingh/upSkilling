# Architecture

## System Context

The platform provides a controlled path for an application team to ship a containerized service to GKE. The platform team owns cloud foundations, delivery guardrails, cluster services, and reliability standards. The application team owns service code and application-level SLOs.

```text
GitHub
├── application source
├── Terraform modules
├── Kubernetes desired state
└── observability configuration
        |
        v
GitHub Actions
├── Ruff + Pytest
├── Terraform validate
├── Kustomize render
├── Docker build
└── Trivy scan
        |
        v
Artifact Registry <--- GitHub OIDC / Workload Identity Federation
        |
        v
Git commit updates production image SHA
        |
        v
ArgoCD watches main
├── platform application
├── kube-prometheus-stack
└── dashboards + alert rules
        |
        v
Private regional GKE
        |
GCE Ingress + global IP + Cloud Armor
        |
      Users
```

## Infrastructure Layer

Terraform modules provision:

- Optional GCP project creation and required API activation
- Custom-mode VPC and subnet
- Pod and service secondary ranges
- Private Google access, VPC flow logs, Cloud Router, and Cloud NAT
- Regional private GKE cluster
- Autoscaled and auto-repaired node pool
- Artifact Registry repository
- Workload Identity service account binding
- Global external IP and Cloud Armor security policy

Production cluster deletion protection is enabled. The development environment keeps it disabled to support short-lived practice deployments.

## Terraform Enterprise

The production workspace uses remote execution with `terraform/environments/prod` as its working directory. Terraform Enterprise supplies state locking, plan history, RBAC, policy checks, and apply approval.

The repository includes a TFE bootstrap configuration in `terraform/terraform-enterprise/`.

## Identity Boundaries

- GitHub Actions uses OIDC federation instead of a stored GCP key.
- GKE nodes use a dedicated service account with only image-pull, logging, and monitoring roles.
- The application Kubernetes service account maps to a dedicated GCP service account through Workload Identity.
- The workload runs as a non-root UID with no Linux capabilities and a read-only root filesystem.

## GitOps Model

`main` represents production desired state. CI never runs `kubectl apply` against production.

The image pipeline:

1. Builds and scans the image.
2. Pushes a commit-SHA tag.
3. Updates the Kustomize production image.
4. Commits the desired-state change.
5. Lets ArgoCD sync, prune, and self-heal.

Rollback is a Git revert. ArgoCD then returns the cluster to the earlier immutable image.

## Traffic and Security

GCE Ingress uses the reserved global IP. Its BackendConfig attaches:

- Cloud Armor SQL injection and XSS rules
- Source-IP rate limiting
- `/health` backend checks

Kubernetes NetworkPolicy allows traffic from Google load-balancer/health-check ranges and monitoring scrapes, while egress is limited to DNS and HTTPS.

## Reliability

- Startup, readiness, and liveness probes separate initialization, traffic eligibility, and recovery.
- PDB preserves one available replica during voluntary disruption.
- HPA targets 70% CPU, scales up quickly, and uses a five-minute scale-down window.
- GKE node-pool autoscaling provides capacity when pods no longer fit.
- Regional GKE reduces control-plane zonal dependency.

## Observability

The application exports request count and duration histograms. kube-prometheus-stack adds cluster and Kubernetes state metrics.

The version-controlled dashboard shows:

- Request rate
- Error ratio
- p95 latency
- CPU and memory
- HPA current/desired replicas
- Pod restarts
- Deployment availability

Prometheus alerts link to exact runbook sections.

## Key Tradeoffs

### GKE versus Cloud Run

GKE is used to demonstrate multi-team platform controls, GitOps, cluster observability, and Kubernetes scheduling. A simple stateless service with no cluster-level requirements would usually be cheaper and easier on Cloud Run.

### Main as production

This creates a simple recruiter-friendly GitOps model. Larger organizations may use environment repositories, release branches, or promotion pull requests for stronger separation of duties.

### Public GCE Ingress

It clearly demonstrates Cloud Armor and global load balancing. Internal services should instead use internal load balancing, private DNS, and identity-aware access.
