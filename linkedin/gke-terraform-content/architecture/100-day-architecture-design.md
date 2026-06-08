# 100-Day GKE MLOps Architecture Design

This file keeps only the architecture design for each task. Use it for LinkedIn explanations, diagrams, and senior interview storytelling.

| Day | Architecture Design |
| --- | --- |
| 001 | Treat GKE as a platform product managed from Git, not as a manually configured cluster. |
| 002 | Pin Terraform and provider versions so plans are repeatable across engineers and CI. |
| 003 | Use remote state for team workflows and separate state per environment. |
| 004 | Enable required APIs before resource creation so platform bootstrap is deterministic. |
| 005 | Create explicit Google service accounts for nodes, workloads, and automation. |
| 006 | Use a custom VPC so cluster networking is intentional and auditable. |
| 007 | Allocate secondary ranges for pods and services to support VPC-native GKE. |
| 008 | Prefer private nodes for production clusters. |
| 009 | Control Kubernetes API access with authorized networks and controlled CI identity. |
| 010 | Provide controlled outbound access for private nodes through Cloud NAT. |
| 011 | Store application and model-serving images in regional Artifact Registry. |
| 012 | Separate node pools by workload purpose instead of using one default pool. |
| 013 | Configure node autoscaling per pool based on workload behavior. |
| 014 | Use spot nodes only for interruption-tolerant batch and training jobs. |
| 015 | Isolate GPU workloads in an optional GPU node pool with taints. |
| 016 | Apply labels for environment, ownership, cost, and workload grouping. |
| 017 | Use taints for special pools such as batch and GPU. |
| 018 | Enable Workload Identity to avoid static service account keys. |
| 019 | Bind Kubernetes service accounts to least-privilege Google service accounts. |
| 020 | Use namespaces for ownership and lifecycle separation. |
| 021 | Use RBAC to separate data scientist, platform, and CI/CD permissions. |
| 022 | Deny ingress by default and allow only intentional traffic flows. |
| 023 | Keep secret references in Kubernetes and secret values in Secret Manager. |
| 024 | Use ConfigMaps for non-secret runtime configuration. |
| 025 | Decide internal versus external ingress based on consumers and risk. |
| 026 | Prefer ClusterIP for internal platform components. |
| 027 | Use Gateway API as the future-facing standard for shared ingress. |
| 028 | Centralize TLS ownership with managed certificates or cert-manager. |
| 029 | Use private DNS for internal service discovery across teams. |
| 030 | Use HPA for inference workloads only after resource requests are defined. |
| 031 | Use VPA carefully, often in recommendation mode first. |
| 032 | Tune cluster autoscaler through node pool min and max boundaries. |
| 033 | Set resource requests as scheduling and cost contracts. |
| 034 | Avoid unnecessary CPU limits for latency-sensitive model serving. |
| 035 | Use PDBs to preserve minimum availability during disruptions. |
| 036 | Design probes around model load and warm-up behavior. |
| 037 | Use rolling updates with zero unavailable replicas for inference. |
| 038 | Use blue-green when rollback simplicity matters more than cost. |
| 039 | Use canary when risk should be controlled gradually. |
| 040 | Use GitOps so cluster changes are reviewed and reconciled from Git. |
| 041 | Validate Terraform, Kubernetes YAML, image build, and policy in CI. |
| 042 | Treat Terraform plan review as architecture review. |
| 043 | Extract modules only after repeated patterns become stable. |
| 044 | Keep separate environment variable files and state. |
| 045 | Use policy as code to block unsafe defaults. |
| 046 | Enforce secure baseline: private nodes, Shielded Nodes, logging, and monitoring. |
| 047 | Use Binary Authorization for signed image enforcement. |
| 048 | Use Artifact Registry vulnerability scanning in release gates. |
| 049 | Generate SBOMs during image build and keep them with release metadata. |
| 050 | Enforce admission policies for pod security and platform standards. |
| 051 | Collect workload logs with model, version, request, and tenant fields. |
| 052 | Track infrastructure and application metrics in Cloud Monitoring. |
| 053 | Add OpenTelemetry for request tracing across gateway, API, and model server. |
| 054 | Define SLOs for serving latency, error rate, availability, and batch freshness. |
| 055 | Alert on symptoms, not every noisy cause. |
| 056 | Build dashboards for incident commander, app owner, and platform owner views. |
| 057 | Use labels and metrics to explain cost by team, environment, and workload. |
| 058 | Treat quotas as launch dependencies. |
| 059 | Plan capacity from traffic, model size, and scaling targets. |
| 060 | Choose multi-region only when product availability needs justify the complexity. |
| 061 | Back up infrastructure state, manifests, model artifacts, and metadata. |
| 062 | Make disaster recovery a rebuild workflow from Terraform plus restore data. |
| 063 | Avoid unnecessary in-cluster state for MLOps metadata. |
| 064 | Use Cloud SQL private IP for MLflow metadata in production. |
| 065 | Store model artifacts in versioned GCS buckets. |
| 066 | Design feature serving separately from offline training storage. |
| 067 | Run training as Kubernetes Jobs with retry and scheduling controls. |
| 068 | Add Kubeflow when reproducible pipelines justify platform complexity. |
| 069 | Use Vertex AI for managed training, registry, or serving where it reduces ops. |
| 070 | Promote models through registry metadata, evaluation gates, and approvals. |
| 071 | Serve models through versioned Deployments and stable Services. |
| 072 | Use CronJobs or batch Jobs for scheduled batch inference. |
| 073 | Reserve GPU pools for workloads with proven utilization need. |
| 074 | Adopt KServe when the platform needs standardized model-serving CRDs. |
| 075 | Monitor model behavior separately from pod health. |
| 076 | Compare live feature distributions against training baselines. |
| 077 | Use retraining triggers as review signals before full automation. |
| 078 | Record model approvals, owners, datasets, metrics, and rollback path. |
| 079 | Collect evidence for compliance from Git, Terraform plan, CI logs, and registry metadata. |
| 080 | Use namespace, quota, RBAC, and network policy for multi-tenant teams. |
| 081 | Prevent one team from exhausting shared resources. |
| 082 | Provide default requests and limits for safer deployments. |
| 083 | Use PriorityClass for critical serving paths and lower-priority batch jobs. |
| 084 | Make scheduling debug part of the platform runbook. |
| 085 | Use maintenance windows and PDBs to make upgrades predictable. |
| 086 | Control client, control-plane, and node version skew. |
| 087 | Review release notes before GKE minor upgrades. |
| 088 | Define incident roles for model serving, cluster, network, and data dependencies. |
| 089 | Debug CrashLoopBackOff with logs, events, probes, env, image, and config. |
| 090 | Use postmortems to convert incidents into platform improvements. |
| 091 | Detect and reconcile drift rather than accepting console changes silently. |
| 092 | Import existing resources before managing them in Terraform. |
| 093 | Refactor state carefully using `terraform state mv` before code movement. |
| 094 | Rotate secrets through Secret Manager and workload restart strategy. |
| 095 | Hide platform complexity behind templates or internal APIs. |
| 096 | Measure developer experience by lead time, failed deploys, and support load. |
| 097 | Capture decisions in architecture decision records. |
| 098 | Convert the build into senior interview stories with tradeoffs and incidents. |
| 099 | Present the portfolio with architecture, code, ops, and learning evidence. |
| 100 | Deliver the capstone: deployable GKE MLOps platform with a clear operating model. |

