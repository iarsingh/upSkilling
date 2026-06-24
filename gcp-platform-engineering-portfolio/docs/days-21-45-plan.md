# Days 21-45 Build Plan

## Days 21-25: GCP Foundation

- Finalize project, API, VPC, subnet, secondary ranges, Cloud NAT, and flow-log modules.
- Provision Artifact Registry and dedicated service accounts.
- Validate naming, labels, IAM scope, and Terraform formatting.
- Configure the Terraform Enterprise VCS workspace and remote state.

Evidence:

- Successful speculative plan
- Terraform module tree
- VPC/subnet screenshot
- Enabled API and Artifact Registry screenshot

## Days 26-30: Production GKE

- Provision regional private GKE with Workload Identity.
- Enable release channel, auto-repair, auto-upgrade, Managed Prometheus, network policy, and secure boot.
- Deploy namespace, service account, probes, resource controls, PDB, and NetworkPolicy.
- Verify cluster and workload health.

Evidence:

- GKE cluster configuration
- Healthy deployment and probes
- Workload Identity binding
- Security context and Pod Security labels

## Days 31-34: GitOps

- Install ArgoCD.
- Create the restricted AppProject.
- Configure the production Application to track `main`.
- Demonstrate self-heal by changing a replica count manually.
- Demonstrate rollback by reverting an image-promotion commit.

Evidence:

- ArgoCD application `Healthy` and `Synced`
- Git commit mapped to deployed image SHA
- Drift/self-heal screenshot
- Rollback timeline

## Days 35-38: CI/CD and Supply Chain

- Run Ruff and Pytest.
- Validate Terraform and render Kustomize.
- Build the non-root container.
- Scan the image with Trivy.
- Authenticate with GitHub OIDC/Workload Identity Federation.
- Push the immutable image and commit the GitOps promotion.

Evidence:

- Green pull-request checks
- Artifact Registry image with commit SHA
- Trivy result
- GitOps promotion commit

## Days 39-42: Observability and Security

- Install kube-prometheus-stack through ArgoCD.
- Import the version-controlled Grafana dashboard.
- Verify ServiceMonitor targets.
- Test error-rate, latency, restart, and availability alerts.
- Validate Cloud Armor WAF and rate-limit policy.

Evidence:

- Grafana request, latency, resource, and HPA panels
- Prometheus target status
- Alert firing and runbook link
- Cloud Armor policy and request logs

## Days 43-45: Autoscaling and Showcase

- Run the k6 staged load profile.
- Capture HPA current/desired replicas.
- Confirm cluster autoscaler behavior when pod capacity is exhausted.
- Record p95 latency and error-rate thresholds.
- Finish README, architecture diagram, production checklist, and interview narrative.

Evidence:

- Completed `docs/hpa-test-results.md`
- Before/during/after Grafana screenshots
- HPA and pod timeline
- Final GitHub repository walkthrough

## Definition of Done

- [ ] Terraform plan is reviewed and reproducible.
- [ ] ArgoCD reports healthy and synced.
- [ ] The production image uses an immutable SHA.
- [ ] CI has lint, test, validation, build, and scan gates.
- [ ] Grafana and alerts use real application metrics.
- [ ] HPA scales under measured load.
- [ ] Runbooks and rollback steps are tested.
- [ ] README can be understood by a recruiter in under five minutes.
