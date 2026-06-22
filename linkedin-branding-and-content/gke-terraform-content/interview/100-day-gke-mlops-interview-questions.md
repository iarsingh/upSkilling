# 100-Day GKE MLOps Interview Questions

Use this file with the 100-day content calendar. Each question is written for a senior engineer with around 10 years of experience moving toward GKE, Terraform, platform engineering, and MLOps.

| Day | Interview Question | Strong Answer Should Cover |
| --- | --- | --- |
| 001 | Why should a production GKE cluster be managed with Terraform instead of the console? | Repeatability, reviewability, drift control, promotion, audit history |
| 002 | A provider upgrade changes your Terraform plan unexpectedly. How do you investigate? | Lock file, provider changelog, schema changes, plan diff, staged upgrade |
| 003 | How would you design Terraform remote state for dev, stage, and prod? | GCS backend, state separation, locking, IAM, state access boundaries |
| 004 | Terraform apply fails because a GCP API is disabled. How do you prevent this class of issue? | API resources, bootstrap ordering, CI validation, least-privilege service account |
| 005 | How do you design service accounts for GKE nodes, workloads, and CI/CD? | Separate identities, minimal roles, Workload Identity, auditability |
| 006 | What are the key VPC design choices before creating a GKE cluster? | Custom VPC, subnets, routing, firewall, NAT, private access, IP capacity |
| 007 | How do you size pod and service secondary IP ranges for a multi-team cluster? | Max pods per node, node count, growth, fragmentation, environment separation |
| 008 | When would you use private GKE nodes, and what tradeoffs come with them? | Reduced exposure, NAT needs, control-plane access, debugging, CI access |
| 009 | How do you secure access to the Kubernetes control plane? | Authorized networks, private endpoint option, IAM, VPN/IAP, CI identity |
| 010 | A private GKE workload cannot pull an image. How do you debug? | DNS, NAT, Artifact Registry IAM, routes, firewall, node service account |
| 011 | How do you separate container registries across environments? | Artifact Registry repos/projects, IAM, promotion, scanning, immutability |
| 012 | Why is one default node pool risky in production? | Workload isolation, upgrades, cost, taints, autoscaling, noisy neighbors |
| 013 | HPA scales pods but nodes do not scale. What do you check? | Requests, pending pods, cluster autoscaler, node pool limits, quotas, events |
| 014 | Which ML workloads are safe for spot node pools? | Retryable batch, checkpointed training, stateless jobs, not critical serving |
| 015 | A GPU workload is pending. Walk through your senior debug flow. | Quota, node pool, taints/tolerations, node selector, drivers, region availability |
| 016 | How do labels help during cost reviews and incidents? | Ownership, environment, workload, cost allocation, filtering, dashboards |
| 017 | A workload is scheduled on the wrong node pool. What do you inspect? | Labels, selectors, affinity, taints, tolerations, scheduler events |
| 018 | Explain Workload Identity to a team still using JSON keys in pods. | KSA-GSA mapping, no static keys, IAM audit, least privilege, migration steps |
| 019 | A pod using Workload Identity gets 403 from GCS. How do you debug? | KSA annotation, IAM binding, GSA role, token audience, namespace, bucket IAM |
| 020 | How do you prevent namespace sprawl in a shared GKE platform? | Ownership model, lifecycle, quotas, naming, RBAC, platform intake process |
| 021 | How would you give data scientists deploy access without cluster-admin? | Namespaced RBAC, GitOps, CI service account, approvals, audit logs |
| 022 | How do you design NetworkPolicy for a model-serving namespace? | Default deny, allow ingress from gateway, egress controls, DNS exceptions |
| 023 | Why are Kubernetes Secrets not enough for enterprise secret management? | Base64 only, etcd risk, rotation, Secret Manager, external secrets, IAM |
| 024 | How do you separate model runtime config from container images? | ConfigMaps, env vars, mounted config, release separation, validation |
| 025 | Internal-only inference API or public endpoint: how do you decide? | Consumers, threat model, latency, auth, network path, compliance |
| 026 | A LoadBalancer service stays pending. What do you check? | Quotas, subnet, annotations, controller events, IAM, regional availability |
| 027 | When would you standardize on Gateway API instead of Ingress? | Expressive routing, shared gateway, team delegation, future Kubernetes direction |
| 028 | Who should own TLS certificate rotation in a platform team model? | Platform ownership, automation, cert-manager/managed certs, alerting |
| 029 | A model endpoint resolves internally but not externally. How do you debug? | DNS zone, record, split-horizon, ingress IP, firewall, resolver path |
| 030 | CPU HPA does not scale a deployment. What did the team likely miss? | Resource requests, metrics server, targetRef, load pattern, HPA events |
| 031 | When should VPA run in recommendation mode only? | Stateful or latency-sensitive apps, HPA interaction, unknown workload behavior |
| 032 | Pods are pending even with cluster autoscaler enabled. What are your top checks? | Unschedulable reason, max nodes, quota, taints, affinity, resource requests |
| 033 | How do bad resource requests create both reliability and cost problems? | Over/under scheduling, bin packing, throttling, autoscaling, noisy neighbors |
| 034 | When would you avoid CPU limits for model-serving containers? | Latency sensitivity, throttling risk, tested behavior, request-based scheduling |
| 035 | Why can a PodDisruptionBudget block node upgrades? | minAvailable, replica count, drain behavior, maintenance windows, surge capacity |
| 036 | A model takes 90 seconds to load. How do you design probes? | Startup/readiness/liveness separation, thresholds, warm-up, failure modes |
| 037 | How do you avoid downtime during model server releases? | Rolling strategy, PDB, readiness, surge, capacity, rollback |
| 038 | When is blue-green deployment better than canary? | Fast rollback, simple validation, high-risk release, cost tradeoff |
| 039 | How do you canary a model using business metrics, not only pod metrics? | Traffic split, model metrics, guardrails, observation window, rollback |
| 040 | What should remain manual in a GitOps flow, if anything? | Emergency controls, approvals, secrets, break-glass, production gates |
| 041 | How do you gate Terraform apply in production CI/CD? | Plan review, approvals, policy checks, environment protection, audit logs |
| 042 | What Terraform plan changes require extra senior review? | Recreate cluster, IAM expansion, network changes, deletion, state changes |
| 043 | When does a Terraform module become too abstract? | Hidden risk, too many flags, unclear ownership, poor defaults, weak docs |
| 044 | How do you avoid drift between dev, stage, and prod? | Promotion flow, shared modules, env vars, plan checks, no console edits |
| 045 | Which GKE settings should policy as code block? | Public nodes, missing labels, privileged pods, broad IAM, no requests |
| 046 | What is your minimum GKE security baseline? | Private nodes, Workload Identity, Shielded Nodes, logging, network policy |
| 047 | How do you block unsigned model images from running? | Binary Authorization, attestations, CI signing, policy enforcement |
| 048 | A critical CVE appears in your base image. What is your response? | Triage, affected services, rebuild, deploy, exception process, evidence |
| 049 | How do you prove what went into a production image? | SBOM, image digest, build logs, source commit, attestation |
| 050 | A team deploys privileged pods. How should the platform respond? | Admission policy, exception workflow, audit, least privilege alternatives |
| 051 | What fields should every inference service log? | Request ID, model version, latency, status, tenant, feature/model metadata |
| 052 | Which metrics matter most for model serving? | Latency, error rate, saturation, throughput, model version, business quality |
| 053 | How do you trace from API gateway to model container? | OpenTelemetry, trace propagation, collector, sampling, dashboards |
| 054 | How do you define SLOs for online inference and batch training? | Availability, latency, freshness, completion, error budget, user impact |
| 055 | Which alerts would you page on for model serving? | 5xx, latency SLO burn, saturation, no replicas, bad rollout, dependency failure |
| 056 | What dashboard does an incident commander need? | Service health, deploys, traffic, saturation, dependencies, rollback status |
| 057 | GKE cost doubled in one week. How do you investigate? | Node pools, GPUs, autoscaling, requests, labels, idle resources, recent deploys |
| 058 | A rollout fails in one region due to quota. What is your process? | Preflight checks, quota requests, fallback, capacity planning, release gates |
| 059 | How do you plan capacity for a traffic launch? | Load test, model latency, replicas, node pool max, quotas, rollback |
| 060 | Active-active or active-passive for inference: how do you decide? | RTO/RPO, cost, data locality, complexity, traffic management |
| 061 | What do you back up for an MLOps platform? | Terraform state, manifests, model artifacts, metadata DB, registry evidence |
| 062 | How do you rebuild GKE from Terraform after a region issue? | New env/region, state strategy, GitOps sync, data restore, DNS cutover |
| 063 | Should MLflow run statefully on GKE? | Tradeoffs, Cloud SQL backend, artifact store, HA, upgrades, backups |
| 064 | How do you secure Cloud SQL access from GKE? | Private IP, Workload Identity, Secret Manager, least privilege, network controls |
| 065 | How do you prevent accidental model artifact overwrite? | GCS versioning, immutable paths, registry metadata, promotion policy |
| 066 | How do you keep training-serving skew under control? | Feature contracts, validation, offline/online parity, monitoring |
| 067 | How do you run repeatable training jobs on GKE? | Job specs, image digests, data versions, resources, retries, artifacts |
| 068 | When is Kubeflow worth the operational complexity? | Reproducibility, team scale, pipeline needs, platform maturity |
| 069 | Which workloads stay on GKE and which move to Vertex AI? | Control vs managed ops, GPUs, pipelines, serving, governance, cost |
| 070 | How do you promote models across environments? | Registry, evaluation gates, approvals, artifact immutability, rollback |
| 071 | How do you support multiple model versions in production? | Versioned deployments, routing, registry, metrics, rollback, traffic split |
| 072 | How do you recover a failed batch inference run? | Idempotency, checkpoints, partitioning, retries, output validation |
| 073 | How do you avoid wasting GPU nodes overnight? | Autoscaling, scheduling, quotas, time windows, utilization alerts |
| 074 | When would you adopt KServe over custom deployments? | Standard inference APIs, model protocol, autoscaling, multi-framework needs |
| 075 | What do you alert on when model accuracy drops silently? | Quality metrics, drift, feedback delay, confidence, data pipeline health |
| 076 | How do you distinguish data drift from a logging bug? | Raw samples, schema checks, pipeline validation, baseline windows |
| 077 | When should drift trigger investigation instead of automatic retraining? | Business risk, label delay, false positives, approval, governance |
| 078 | How do you audit who approved a model release? | Registry metadata, Git approvals, CI logs, change tickets, evidence bucket |
| 079 | What evidence proves your ML platform is controlled? | IaC, approvals, logs, scans, model cards, metrics, release history |
| 080 | How do you host multiple ML teams on one cluster safely? | Namespace, quota, RBAC, NetworkPolicy, node pools, ownership labels |
| 081 | A team consumes all GPUs. What guardrails prevent this? | ResourceQuota, separate pools, admission policy, quotas, chargeback |
| 082 | How do you stop junior teams from over-requesting resources? | LimitRange, templates, review, recommendations, dashboards |
| 083 | During scarcity, which workloads should be evicted first? | PriorityClass, batch vs serving, PDB, business criticality |
| 084 | A pod is pending. Give your senior scheduling debug flow. | Events, requests, quota, taints, affinity, node capacity, autoscaler |
| 085 | How do you upgrade GKE without breaking ML workloads? | Maintenance window, PDB, surge, compatibility, staging, rollback |
| 086 | kubectl, nodes, and control plane differ. What version skew is acceptable? | Kubernetes skew policy, client compatibility, managed upgrade constraints |
| 087 | What do you read before upgrading GKE? | Release notes, deprecations, API removals, add-on changes, workload impact |
| 088 | Model serving latency doubles. Who joins the incident call? | Incident commander, app owner, platform, data/ML, network, comms |
| 089 | How do you debug a failing model pod under pressure? | Logs, events, image, env, probes, resources, artifacts, recent changes |
| 090 | What makes a GKE incident action item useful? | Owner, deadline, measurable outcome, prevention, detection, runbook update |
| 091 | Someone changed the cluster in console. What happens next? | Drift detection, plan review, import/revert decision, access controls |
| 092 | How do you migrate a manually created cluster into Terraform? | Inventory, import, state review, plan no-op, staged ownership |
| 093 | How do you split a Terraform module without recreating resources? | `state mv`, plan review, small changes, backups, module boundaries |
| 094 | How do you rotate DB credentials used by workloads? | Secret Manager versioning, rollout, validation, rollback, audit |
| 095 | What should developers self-serve in a GKE MLOps platform? | Namespaces, templates, deployments, dashboards, model release workflows |
| 096 | How do you measure platform adoption? | Lead time, deployment frequency, failed deploys, support tickets, satisfaction |
| 097 | What must be documented before production launch? | Architecture, runbooks, SLOs, ownership, security, rollback, DR |
| 098 | Tell me about a GKE production failure you solved. | STAR format, tradeoffs, debugging, leadership, long-term fix |
| 099 | How do you present this project to a staff engineer interviewer? | Problem, architecture, constraints, tradeoffs, operations, impact |
| 100 | Design a production GKE MLOps platform end to end. | Networking, IAM, GKE, CI/CD, GitOps, MLOps, observability, cost, DR |

## Senior Answer Formula

Use this pattern when practicing:

1. Clarify the business and reliability requirement.
2. State the architecture or debug path.
3. Explain tradeoffs and failure modes.
4. Name the Terraform/Kubernetes controls.
5. Close with operations: monitoring, rollout, rollback, and ownership.

