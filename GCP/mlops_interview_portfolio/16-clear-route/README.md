# ClearRoute

Multi-tenant GitOps MLOps platform for healthcare analytics.

ClearRoute is an enterprise platform-engineering blueprint for providing
MLOps-as-a-Service to multiple healthcare data science teams. It focuses on
tenant isolation, HIPAA-aligned security controls, GitOps infrastructure
delivery, Kubeflow on GKE, Vertex AI training, secure image promotion, and
network-isolated model deployment.

## What It Demonstrates

- GKE Enterprise hub-and-spoke cluster architecture
- Terraform plus Config Connector infrastructure management
- Argo CD GitOps delivery for GCP and Kubernetes resources
- Kubeflow on GKE for team-scoped ML workflows
- Cloud Build CI/CD with lint, tests, immutable image build, and Artifact
  Analysis scanning
- Vertex AI custom training with VPC peering and BigQuery access
- Tenant-scoped IAM, network policies, and secure GKE deployment
- HIPAA-aligned audit, encryption, and access controls

## Run

```bash
python3 src/clear_route_gate.py evaluate \
  --release examples/platform_release.json
```

## Interview Talking Points

- Multi-tenant MLOps is mostly platform engineering: isolation, policy, and
  repeatable paved roads.
- GitOps should own both infrastructure and ML workload delivery.
- Healthcare analytics requires auditability, least privilege, encryption, and
  network isolation before model lifecycle automation matters.
- Kubeflow and Vertex AI can coexist when Kubernetes is the team workflow layer
  and Vertex AI is the managed training/control-plane layer.
