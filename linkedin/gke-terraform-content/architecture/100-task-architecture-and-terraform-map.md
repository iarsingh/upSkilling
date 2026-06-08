# 100-Task Architecture and Terraform Map

This guide maps each 100-day task to an architecture decision and an implementation pointer. Use it to write posts, explain the platform in interviews, and continue extending the Terraform deployment.

## Foundation and Terraform Operating Model

| Day | Architecture Design | Terraform or Kubernetes Implementation |
| --- | --- | --- |
| 001 | Treat GKE as a platform product managed from Git, not as a manually configured cluster. | `deployment/terraform/versions.tf`, `main.tf`, `variables.tf` |
| 002 | Pin Terraform and provider versions so plans are repeatable across engineers and CI. | `deployment/terraform/versions.tf`, `.terraform.lock.hcl` |
| 003 | Use remote state for team workflows and separate state per environment. | Add backend config per environment; keep examples under `deployment/terraform/environments/` |
| 004 | Enable required APIs before resource creation so platform bootstrap is deterministic. | `google_project_service.required` in `main.tf` |
| 005 | Create explicit Google service accounts for nodes and workloads. | `google_service_account.cluster`, `nodes`, `ml_workloads` |
| 006 | Use a custom VPC so cluster networking is intentional and auditable. | `google_compute_network.main` |
| 007 | Allocate secondary ranges for pods and services to support VPC-native GKE. | `google_compute_subnetwork.gke` secondary ranges |
| 008 | Prefer private nodes for production clusters. | `private_cluster_config.enable_private_nodes` |
| 009 | Control Kubernetes API access with authorized networks. | `master_authorized_networks_config` |
| 010 | Provide controlled outbound access for private nodes through Cloud NAT. | `google_compute_router`, `google_compute_router_nat` |

## Core GKE Platform

| Day | Architecture Design | Terraform or Kubernetes Implementation |
| --- | --- | --- |
| 011 | Store application and model-serving images in regional Artifact Registry. | `google_artifact_registry_repository.containers` |
| 012 | Separate node pools by workload purpose instead of using one default pool. | `google_container_node_pool.system`, `apps` |
| 013 | Configure node autoscaling per pool based on workload behavior. | `autoscaling` blocks in node pools |
| 014 | Use spot nodes only for interruption-tolerant batch and training jobs. | `google_container_node_pool.spot`, `k8s/07-training-job.yaml` |
| 015 | Isolate GPU workloads in an optional GPU node pool with taints. | `google_container_node_pool.gpu` |
| 016 | Apply labels for environment, ownership, cost, and workload grouping. | `var.labels`, `resource_labels`, node labels |
| 017 | Use taints for special pools such as batch and GPU. | `taint` blocks in spot and GPU pools |
| 018 | Enable Workload Identity to avoid static service account keys. | `workload_identity_config` |
| 019 | Bind Kubernetes service accounts to least-privilege Google service accounts. | `google_service_account_iam_member.workload_identity_mlops`, `k8s/01-service-account.yaml` |
| 020 | Use namespaces for ownership and lifecycle separation. | `k8s/00-namespace.yaml` |

## Security, Access, and Guardrails

| Day | Architecture Design | Terraform or Kubernetes Implementation |
| --- | --- | --- |
| 021 | Use RBAC to separate data scientist, platform, and CI/CD permissions. | Add Role and RoleBinding manifests under `deployment/k8s/` |
| 022 | Deny ingress by default and allow only intentional traffic flows. | `k8s/06-network-policy.yaml` |
| 023 | Keep secret references in Kubernetes and secret values in Secret Manager. | `google_secret_manager_secret.mlflow_db_password` |
| 024 | Use ConfigMaps for non-secret runtime configuration. | Add ConfigMap manifest beside workload YAML |
| 025 | Decide internal versus external ingress based on consumers and risk. | Add GKE Ingress or Gateway API manifests |
| 026 | Prefer ClusterIP for internal platform components. | `k8s/03-mlflow.yaml`, `k8s/04-model-serving.yaml` |
| 027 | Use Gateway API as the future-facing standard for shared ingress. | Add GatewayClass, Gateway, HTTPRoute manifests |
| 028 | Centralize TLS ownership with managed certificates or cert-manager. | Add ManagedCertificate or cert-manager issuer manifests |
| 029 | Use private DNS for internal service discovery across teams. | `google_dns_managed_zone.private_mlops` |
| 030 | Use HPA for inference workloads only after resource requests are defined. | `k8s/05-hpa-pdb.yaml` |

## Scaling, Scheduling, and Reliability

| Day | Architecture Design | Terraform or Kubernetes Implementation |
| --- | --- | --- |
| 031 | Use VPA carefully, often in recommendation mode first. | Add VPA manifest after installing VPA components |
| 032 | Tune cluster autoscaler through node pool min and max boundaries. | Node pool `autoscaling` blocks |
| 033 | Set resource requests as scheduling and cost contracts. | `resources.requests` in workload manifests |
| 034 | Avoid unnecessary CPU limits for latency-sensitive model serving. | `k8s/04-model-serving.yaml` uses memory limit without CPU limit |
| 035 | Use PDBs to preserve minimum availability during disruptions. | `PodDisruptionBudget` in `k8s/05-hpa-pdb.yaml` |
| 036 | Design probes around model load and warm-up behavior. | readiness and liveness probes in workload manifests |
| 037 | Use rolling updates with zero unavailable replicas for inference. | `strategy.rollingUpdate` in `k8s/04-model-serving.yaml` |
| 038 | Use blue-green when rollback simplicity matters more than cost. | Add blue and green Deployments plus Service selector switch |
| 039 | Use canary when risk should be controlled gradually. | Add weighted Gateway or service mesh routing |
| 040 | Use GitOps so cluster changes are reviewed and reconciled from Git. | Add Argo CD Application under `deployment/gitops/` |

## CI/CD, Modules, and Policy

| Day | Architecture Design | Terraform or Kubernetes Implementation |
| --- | --- | --- |
| 041 | Validate Terraform, Kubernetes YAML, image build, and policy in CI. | Add GitHub Actions workflow for `terraform fmt`, `validate`, `kubectl --dry-run` |
| 042 | Treat Terraform plan review as architecture review. | Use `terraform plan -var-file=environments/dev/terraform.tfvars` |
| 043 | Extract modules only after repeated patterns become stable. | Future modules: `network`, `gke`, `iam`, `mlops-storage` |
| 044 | Keep separate environment variable files and state. | `environments/dev/terraform.tfvars`, `environments/prod/terraform.tfvars` |
| 045 | Use policy as code to block unsafe defaults. | Add OPA/Conftest policies for public nodes, missing labels, privileged pods |
| 046 | Enforce secure baseline: private nodes, Shielded Nodes, logging, monitoring. | `private_cluster_config`, `shielded_instance_config`, `logging_config`, `monitoring_config` |
| 047 | Use Binary Authorization for signed image enforcement. | Add `google_binary_authorization_policy` and attestor resources |
| 048 | Use Artifact Registry vulnerability scanning in release gates. | Artifact Registry plus CI policy gates |
| 049 | Generate SBOMs during image build and keep them with release metadata. | CI artifact output; store in GCS or Artifact Registry attachments |
| 050 | Enforce admission policies for pod security and platform standards. | Add Gatekeeper or Kyverno manifests |

## Observability and Operations

| Day | Architecture Design | Terraform or Kubernetes Implementation |
| --- | --- | --- |
| 051 | Collect workload logs with model, version, request, and tenant fields. | GKE workload logging enabled in `logging_config` |
| 052 | Track infrastructure and application metrics in Cloud Monitoring. | `monitoring_config.managed_prometheus` |
| 053 | Add OpenTelemetry for request tracing across gateway, API, and model server. | Add OpenTelemetry Collector manifests |
| 054 | Define SLOs for serving latency, error rate, availability, and batch freshness. | Add monitoring SLO resources or dashboard docs |
| 055 | Alert on symptoms, not every noisy cause. | `google_monitoring_alert_policy.gke_high_cpu_allocatable` |
| 056 | Build dashboards for incident commander, app owner, and platform owner views. | Add Cloud Monitoring dashboard JSON |
| 057 | Use labels and metrics to explain cost by team, environment, and workload. | `var.labels`, node labels, namespace labels |
| 058 | Treat quotas as launch dependencies. | Add preflight checklist and quota documentation |
| 059 | Plan capacity from traffic, model size, and scaling targets. | Node pool machine types and max counts |
| 060 | Choose multi-region only when product availability needs justify the complexity. | Duplicate Terraform environment per region |

## Data, Storage, and MLOps Foundation

| Day | Architecture Design | Terraform or Kubernetes Implementation |
| --- | --- | --- |
| 061 | Back up infrastructure state, manifests, model artifacts, and metadata. | GCS versioning, Cloud SQL backups |
| 062 | Make disaster recovery a rebuild workflow from Terraform plus restore data. | Terraform environment files and artifact bucket |
| 063 | Avoid unnecessary in-cluster state for MLOps metadata. | Optional Cloud SQL in `mlops_optional.tf` |
| 064 | Use Cloud SQL private IP for MLflow metadata in production. | `google_sql_database_instance.mlflow` |
| 065 | Store model artifacts in versioned GCS buckets. | `google_storage_bucket.model_artifacts` |
| 066 | Design feature serving separately from offline training storage. | Add online store and offline warehouse integration |
| 067 | Run training as Kubernetes Jobs with retry and scheduling controls. | `k8s/07-training-job.yaml` |
| 068 | Add Kubeflow when reproducible pipelines justify platform complexity. | Add Kubeflow installation and profile manifests |
| 069 | Use Vertex AI for managed training, registry, or serving where it reduces ops. | GCP API enablement includes `aiplatform.googleapis.com` |
| 070 | Promote models through registry metadata, evaluation gates, and approvals. | MLflow placeholder and artifact bucket pattern |

## Serving, Monitoring, and Governance

| Day | Architecture Design | Terraform or Kubernetes Implementation |
| --- | --- | --- |
| 071 | Serve models through versioned Deployments and stable Services. | `k8s/04-model-serving.yaml` |
| 072 | Use CronJobs or batch Jobs for scheduled batch inference. | Add CronJob manifest under `deployment/k8s/` |
| 073 | Reserve GPU pools for workloads with proven utilization need. | Optional `gpu-pool` and taints |
| 074 | Adopt KServe when the platform needs standardized model-serving CRDs. | Add KServe installation and InferenceService manifests |
| 075 | Monitor model behavior separately from pod health. | Add drift and quality metrics pipeline |
| 076 | Compare live feature distributions against training baselines. | Add drift detector job and metric export |
| 077 | Use retraining triggers as review signals before full automation. | Add pipeline trigger design and approval gate |
| 078 | Record model approvals, owners, datasets, metrics, and rollback path. | MLflow registry or Vertex AI Model Registry integration |
| 079 | Collect evidence for compliance from Git, Terraform plan, CI logs, and registry metadata. | Store release evidence in GCS with object versioning |
| 080 | Use namespace, quota, RBAC, and network policy for multi-tenant teams. | `k8s/00-namespace.yaml`, `02-resource-guardrails.yaml`, `06-network-policy.yaml` |

## Advanced Platform Controls

| Day | Architecture Design | Terraform or Kubernetes Implementation |
| --- | --- | --- |
| 081 | Prevent one team from exhausting shared resources. | `ResourceQuota` in `k8s/02-resource-guardrails.yaml` |
| 082 | Provide default requests and limits for safer deployments. | `LimitRange` in `k8s/02-resource-guardrails.yaml` |
| 083 | Use PriorityClass for critical serving paths and lower-priority batch jobs. | Add PriorityClass manifests |
| 084 | Make scheduling debug part of the platform runbook. | Node labels, taints, requests, quotas, and events |
| 085 | Use maintenance windows and PDBs to make upgrades predictable. | `maintenance_policy`, `PodDisruptionBudget` |
| 086 | Control client, control-plane, and node version skew. | GKE release channel and upgrade runbook |
| 087 | Review release notes before GKE minor upgrades. | Add upgrade checklist doc |
| 088 | Define incident roles for model serving, cluster, network, and data dependencies. | Add incident runbook under `interview/` or `ops/` |
| 089 | Debug CrashLoopBackOff with logs, events, probes, env, image, and config. | Workload manifests and runbook |
| 090 | Use postmortems to convert incidents into platform improvements. | Add postmortem template |

## Terraform Lifecycle and Portfolio Finish

| Day | Architecture Design | Terraform or Kubernetes Implementation |
| --- | --- | --- |
| 091 | Detect and reconcile drift rather than accepting console changes silently. | Add scheduled `terraform plan` workflow |
| 092 | Import existing resources before managing them in Terraform. | Use `terraform import` and state review |
| 093 | Refactor state carefully using `terraform state mv` before code movement. | Future module extraction plan |
| 094 | Rotate secrets through Secret Manager and workload restart strategy. | `google_secret_manager_secret`, Workload Identity access |
| 095 | Hide platform complexity behind templates or internal APIs. | Turn manifests into Helm/Kustomize templates |
| 096 | Measure developer experience by lead time, failed deploys, and support load. | Add platform adoption metrics |
| 097 | Capture decisions in architecture decision records. | Add ADR files under `architecture/decisions/` |
| 098 | Convert the build into senior interview stories with tradeoffs and incidents. | `interview/senior-gke-mlops-scenarios.md` |
| 099 | Present the portfolio with architecture, code, ops, and learning evidence. | README, calendar, Terraform, K8s, interview docs |
| 100 | Deliver the capstone: deployable GKE MLOps platform with clear operating model. | Entire `deployment/` folder |

## Reference Architecture

```text
Developers / CI
  -> Git pull request
  -> Terraform plan and policy checks
  -> GCP platform resources
      -> VPC, subnet, secondary ranges
      -> private GKE cluster
      -> Artifact Registry
      -> model artifact bucket
      -> Secret Manager, KMS, optional Cloud SQL
  -> GitOps or kubectl deploy
      -> namespaces
      -> Workload Identity service account
      -> MLflow / registry placeholder
      -> model-serving Deployment, Service, HPA, PDB
      -> training Jobs on spot node pool
  -> Cloud Logging, Cloud Monitoring, Managed Prometheus
```

