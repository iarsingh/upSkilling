# 100-Day Terraform and Kubernetes Code Plan

This file keeps only the implementation plan for each task. Use it while writing Terraform, Kubernetes manifests, CI/CD, and GitOps assets.

| Day | Terraform or Kubernetes Code |
| --- | --- |
| 001 | Create `deployment/terraform/versions.tf`, `main.tf`, `variables.tf`, and `outputs.tf`. |
| 002 | Define `required_version`, `google`, and `google-beta` providers in `versions.tf`. |
| 003 | Add GCS backend configuration per environment when the remote state bucket exists. |
| 004 | Manage APIs with `google_project_service.required` in `main.tf`. |
| 005 | Create `google_service_account.cluster`, `google_service_account.nodes`, and `google_service_account.ml_workloads`. |
| 006 | Create the custom VPC with `google_compute_network.main`. |
| 007 | Create subnet secondary ranges with `google_compute_subnetwork.gke`. |
| 008 | Enable private nodes in `google_container_cluster.main.private_cluster_config`. |
| 009 | Configure `master_authorized_networks_config` from `authorized_cidr_blocks`. |
| 010 | Create `google_compute_router.nat_router` and `google_compute_router_nat.nat`. |
| 011 | Create `google_artifact_registry_repository.containers`. |
| 012 | Create `google_container_node_pool.system` and `google_container_node_pool.apps`. |
| 013 | Configure node pool `autoscaling` blocks. |
| 014 | Create `google_container_node_pool.spot` and schedule `k8s/07-training-job.yaml` with tolerations. |
| 015 | Create optional `google_container_node_pool.gpu` with `enable_gpu_pool`. |
| 016 | Apply `var.labels` to GCP resources and node config labels. |
| 017 | Add taints to spot and GPU node pools. |
| 018 | Configure `workload_identity_config` on the cluster. |
| 019 | Bind Workload Identity with `google_service_account_iam_member.workload_identity_mlops` and `k8s/01-service-account.yaml`. |
| 020 | Create namespaces in `k8s/00-namespace.yaml`. |
| 021 | Add Role and RoleBinding manifests for platform, data science, and CI/CD personas. |
| 022 | Create NetworkPolicy manifests in `k8s/06-network-policy.yaml`. |
| 023 | Create `google_secret_manager_secret.mlflow_db_password` and IAM access in `mlops_optional.tf`. |
| 024 | Add a ConfigMap manifest for model runtime config. |
| 025 | Add internal Ingress or Gateway API manifests for model-serving access. |
| 026 | Use ClusterIP Services in `k8s/03-mlflow.yaml` and `k8s/04-model-serving.yaml`. |
| 027 | Add GatewayClass, Gateway, and HTTPRoute manifests. |
| 028 | Add ManagedCertificate or cert-manager issuer/certificate manifests. |
| 029 | Create optional private DNS with `google_dns_managed_zone.private_mlops`. |
| 030 | Create HPA in `k8s/05-hpa-pdb.yaml`. |
| 031 | Add VPA manifest after VPA components are installed. |
| 032 | Tune node pool min and max values in `main.tf`. |
| 033 | Add `resources.requests` to all workload manifests. |
| 034 | Avoid CPU limits in latency-sensitive model-serving containers unless tested. |
| 035 | Create PDB in `k8s/05-hpa-pdb.yaml`. |
| 036 | Add readiness and liveness probes to workload manifests. |
| 037 | Configure rolling update strategy in `k8s/04-model-serving.yaml`. |
| 038 | Add blue and green Deployments plus a Service selector switch. |
| 039 | Add weighted Gateway routing or service mesh rollout manifests. |
| 040 | Add Argo CD Application manifests under `deployment/gitops/`. |
| 041 | Add GitHub Actions workflow for Terraform and Kubernetes validation. |
| 042 | Run `terraform plan -var-file=environments/dev/terraform.tfvars` and review output. |
| 043 | Extract future modules: `network`, `gke`, `iam`, `mlops-storage`, and `observability`. |
| 044 | Use `environments/dev/terraform.tfvars` and `environments/prod/terraform.tfvars`. |
| 045 | Add OPA/Conftest policies for public nodes, missing labels, and privileged pods. |
| 046 | Keep private nodes, Shielded Nodes, logging, and monitoring enabled in Terraform. |
| 047 | Add Binary Authorization policy and attestor Terraform resources. |
| 048 | Add Artifact Registry scan checks to CI release gates. |
| 049 | Add SBOM generation to image build workflow and store artifacts. |
| 050 | Add Gatekeeper or Kyverno installation and policy manifests. |
| 051 | Keep workload logging enabled in `logging_config`. |
| 052 | Keep Cloud Monitoring and managed Prometheus enabled in `monitoring_config`. |
| 053 | Add OpenTelemetry Collector manifests. |
| 054 | Add Cloud Monitoring SLO resources or SLO dashboard docs. |
| 055 | Create alert policies such as `google_monitoring_alert_policy.gke_high_cpu_allocatable`. |
| 056 | Add Cloud Monitoring dashboard JSON files. |
| 057 | Standardize labels in Terraform variables, namespaces, and workload metadata. |
| 058 | Add quota preflight checklist and regional quota documentation. |
| 059 | Tune machine types and max node counts based on capacity plan. |
| 060 | Create a second regional environment folder if multi-region is required. |
| 061 | Enable GCS versioning and Cloud SQL backups. |
| 062 | Document restore flow using Terraform, GitOps, GCS, and Cloud SQL backups. |
| 063 | Keep MLflow metadata outside the cluster when production reliability matters. |
| 064 | Enable `google_sql_database_instance.mlflow` with private IP. |
| 065 | Create `google_storage_bucket.model_artifacts` with versioning. |
| 066 | Add resources for online/offline feature store integration when selected. |
| 067 | Create Kubernetes Jobs for training workloads in `k8s/07-training-job.yaml`. |
| 068 | Add Kubeflow installation and profile manifests. |
| 069 | Enable Vertex AI API and add integration docs/resources as needed. |
| 070 | Add MLflow registry or Vertex AI Model Registry promotion workflow. |
| 071 | Use versioned Deployments and stable Services for model-serving. |
| 072 | Add CronJob manifest for scheduled batch inference. |
| 073 | Use the optional GPU pool and GPU tolerations only for proven GPU workloads. |
| 074 | Add KServe installation and InferenceService manifests. |
| 075 | Add drift and model-quality metrics exporter job. |
| 076 | Add drift detector job comparing live windows with baseline distributions. |
| 077 | Add retraining trigger workflow with manual approval gate. |
| 078 | Store model approval metadata in MLflow, Vertex AI, or release evidence bucket. |
| 079 | Store compliance evidence in versioned GCS paths. |
| 080 | Combine namespace, quota, RBAC, and network policy manifests. |
| 081 | Use ResourceQuota in `k8s/02-resource-guardrails.yaml`. |
| 082 | Use LimitRange in `k8s/02-resource-guardrails.yaml`. |
| 083 | Add PriorityClass manifests for serving and batch workloads. |
| 084 | Add scheduling debug runbook covering labels, taints, requests, quotas, and events. |
| 085 | Use `maintenance_policy` and PDBs for safer upgrades. |
| 086 | Document version skew rules for kubectl, nodes, and control plane. |
| 087 | Add GKE upgrade checklist document. |
| 088 | Add incident runbook for model-serving, cluster, network, and data dependencies. |
| 089 | Add CrashLoopBackOff runbook. |
| 090 | Add postmortem template. |
| 091 | Add scheduled `terraform plan` workflow for drift detection. |
| 092 | Use `terraform import` docs for existing resources. |
| 093 | Use `terraform state mv` docs before module refactors. |
| 094 | Use Secret Manager IAM and workload restart strategy for rotation. |
| 095 | Convert repeated manifests into Helm or Kustomize templates. |
| 096 | Add platform adoption metrics and developer experience checklist. |
| 097 | Add ADR files under `architecture/decisions/`. |
| 098 | Use `interview/senior-gke-mlops-scenarios.md` for interview narratives. |
| 099 | Keep README, architecture, Terraform, K8s, and interview docs aligned. |
| 100 | Deploy the full `deployment/` folder as the capstone platform. |

