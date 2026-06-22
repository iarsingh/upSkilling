# 30-Day Senior GCP DevOps / SRE Mock Interview Plan

Use one day at a time. Each day mixes design, troubleshooting, SRE, security, automation, platform, MLOps, and leadership questions. Answer out loud, then use the app final feedback at the end of the round.

## Day 1

1. **Terraform/IaC:** Stateful Kubernetes workloads: When would you avoid running stateful workloads on GKE, and if you must run them, how would you design storage, backup, upgrades, and recovery?
2. **GCP Services:** Cloud SQL backup restore: A Cloud SQL instance has accidental data deletion. How would you validate backups, point-in-time recovery, restore testing, application cutover, and communication?
3. **SRE/Reliability:** BigQuery cost and performance: A BigQuery workload became slow and expensive. How would you investigate query patterns, partitioning, clustering, slots, storage, and ownership?
4. **Observability:** Prometheus scale: Prometheus is overloaded with high cardinality metrics. How would you debug and fix it?
5. **Security/DevSecOps:** Terraform secrets: How would you prevent secrets from leaking into Terraform state, plans, logs, and CI/CD output?
6. **Networking:** CoreDNS incident: Services in a cluster intermittently fail DNS resolution. How would you debug CoreDNS, kube-dns metrics, network policies, and upstream DNS?

## Day 2

1. **GCP Services:** Cloud Run security: How would you expose an internal Cloud Run service securely using IAM, ingress settings, VPC connector, load balancer, and service-to-service auth?
2. **SRE/Reliability:** SLO burn rate: Explain multi-window multi-burn-rate alerting and how you would tune alerts for fast and slow burns.
3. **Observability:** Alert ownership: How would you ensure every alert has an owner, runbook, SLO relationship, and actionable threshold?
4. **Security/DevSecOps:** IAM recommender: How would you use IAM Recommender and audit logs to reduce over-permissioned service accounts safely?
5. **Networking:** Disaster recovery testing: How would you design a DR test that proves backup, restore, DNS failover, application recovery, and stakeholder communication?
6. **CI/CD/GitOps:** Helm rollback: A Helm upgrade failed and left resources in a partial state. How would you recover and prevent it next time?

## Day 3

1. **SRE/Reliability:** Capacity incident: A regional capacity shortage affects node pool scaling. How would you mitigate and redesign for resilience?
2. **Observability:** ML monitoring tools: How would you combine Vertex AI Model Monitoring, Prometheus, Grafana, MLflow, and Evidently-style checks in one production monitoring design?
3. **Security/DevSecOps:** SLSA/provenance: How would you explain SLSA, provenance, and signed artifacts to a team building a secure delivery platform?
4. **Networking:** MTU issue: An application has intermittent failures over VPN or interconnect due to packet size. How would you identify and fix MTU problems?
5. **CI/CD/GitOps:** Deployment rollback criteria: What metrics and business signals should automatically stop or roll back a deployment?
6. **Automation/Platform:** Pipeline orchestration: Compare Airflow, Dagster, Kubeflow, and Vertex AI Pipelines for ML/platform use cases. How would you choose?

## Day 4

1. **Observability:** Observability: An alert says p95 latency increased from 200ms to 2s after a deployment. How would you investigate using Prometheus, Grafana, Cloud Logging, logs, and traces?
2. **Security/DevSecOps:** Secrets in CI/CD: How would you prevent secrets leakage in Jenkins, GitHub Actions, GitLab CI, and Cloud Build?
3. **Networking:** Python automation: How would you build a Python tool that audits GCP projects for IAM risk, public buckets, unused firewall rules, missing labels, and cost anomalies?
4. **CI/CD/GitOps:** Vertex AI and MLOps: A team wants model serving on Kubernetes with FastAPI and GPU workloads. How would you design deployment, autoscaling, monitoring, and rollback?
5. **Automation/Platform:** Branching strategy: What Git branching and release strategy would you recommend for platform modules and application services?
6. **MLOps/AI Infra:** A/B and canary for ML: How would you run A/B testing or canary deployment for an ML model while protecting users and measuring business impact?

## Day 5

1. **Security/DevSecOps:** Vulnerability management: How would you run vulnerability management for containers, VMs, dependencies, and base images?
2. **Networking:** Cloud DNS: A production service intermittently resolves to an old endpoint. How would you debug DNS TTLs, Cloud DNS records, caches, split-horizon DNS, and client behavior?
3. **CI/CD/GitOps:** ArgoCD drift: A team says ArgoCD shows drift between Git and the cluster. How would you investigate and safely reconcile it?
4. **Automation/Platform:** REST API automation: How would you design a REST API that allows teams to request infrastructure safely?
5. **MLOps/AI Infra:** Reproducible training: How would you make an ML training pipeline reproducible across code version, data version, features, environment, and model artifact?
6. **FinOps/DR/Data:** DR/backup: How would you define RTO and RPO for a critical service on GCP, and how would you test backup, restore, and regional failover?

## Day 6

1. **Networking:** Landing zone: How would you design a GCP landing zone for a product company, including org hierarchy, folders, projects, Shared VPC, IAM, org policies, logging, and billing?
2. **CI/CD/GitOps:** Backstage and IDP: How would you design a Backstage-style golden path for creating a new service on GCP with CI/CD, Terraform, monitoring, and security?
3. **Automation/Platform:** Platform roadmap: What would your first 90 days look like as a senior platform engineer joining a product company?
4. **MLOps/AI Infra:** Error budget policy: How would you create an error budget policy that balances feature velocity and reliability?
5. **FinOps/DR/Data:** GPU workloads: How would you schedule GPU workloads on GKE with taints, tolerations, node pools, quotas, cost controls, and observability?
6. **Leadership/Behavioral:** Prioritization: You have security backlog, cost pressure, and reliability incidents. How would you prioritize work for the next quarter?

## Day 7

1. **CI/CD/GitOps:** DNS migration: How would you migrate DNS zones with minimal risk, and how would you plan TTLs, validation, rollback, and monitoring?
2. **Automation/Platform:** GitOps: How would you implement GitOps with ArgoCD for Kubernetes workloads across dev, staging, and production while keeping rollbacks and approvals safe?
3. **MLOps/AI Infra:** MLOps lifecycle: How would you design MLflow or Vertex AI model lifecycle management with approval, deployment, monitoring, drift detection, and rollback?
4. **FinOps/DR/Data:** Regional failover drill: How would you plan and run a failover game day for a GKE service with Cloud SQL, Pub/Sub, load balancing, DNS, and observability?
5. **Leadership/Behavioral:** DevOps lifecycle: Explain how you would design the full SDLC for a cloud-native service from code commit to production operations.
6. **GKE/Kubernetes:** Cloud Run vs GKE: A company wants to standardize Cloud Run and GKE usage. How would you decide which workloads go to Cloud Run versus GKE?

## Day 8

1. **Automation/Platform:** GCP networking: How would you design GCP Shared VPC, service projects, firewall rules, private service access, DNS, and service networking for a multi-team platform?
2. **MLOps/AI Infra:** Model monitoring: How would you monitor model serving for latency, error rate, drift, data quality, and business impact?
3. **FinOps/DR/Data:** Batch inference: How would you design batch inference on GCP using GKE, Cloud Run jobs, Vertex AI, or Composer, and what tradeoffs matter?
4. **Leadership/Behavioral:** Stakeholder tradeoff: Product wants faster releases, security wants stricter gates, and SRE wants fewer incidents. How would you align them?
5. **GKE/Kubernetes:** Autoscaling tradeoffs: Explain HPA, VPA, and cluster autoscaler. When can they conflict, and how would you tune them for a production workload?
6. **Terraform/IaC:** Terraform Enterprise: Explain how you would implement Terraform Enterprise workspaces, remote state, policy as code, approvals, and module versioning for a large GCP platform.

## Day 9

1. **MLOps/AI Infra:** MLOps fundamentals: Explain the end-to-end ML lifecycle and where DevOps responsibilities become different from traditional application delivery.
2. **FinOps/DR/Data:** Capacity planning math: What inputs would you use to forecast GKE capacity for CPU, memory, network, storage, and regional failover?
3. **Leadership/Behavioral:** Error budgets: How would you explain error budgets to product managers and use them to make release decisions?
4. **GKE/Kubernetes:** Network policies: A service should only receive traffic from one namespace and one ingress gateway. How would you implement and validate Kubernetes NetworkPolicies?
5. **Terraform/IaC:** GKE multi-cluster: When would you use multiple GKE clusters versus one shared cluster, and how would you handle traffic, identity, policy, and operations?
6. **GCP Services:** Pub/Sub reliability: A Pub/Sub consumer service is falling behind and message age is increasing. How would you debug backlog, scaling, ordering, retries, and dead-letter handling?

## Day 10

1. **FinOps/DR/Data:** ELK/OpenSearch: When would you use ELK or OpenSearch in addition to Cloud Logging, and how would you manage index cost and retention?
2. **Leadership/Behavioral:** Backstage plugin: What Backstage plugins or templates would you prioritize for a GCP platform team?
3. **GKE/Kubernetes:** Capacity planning: How would you design capacity planning for GKE node pools supporting both web services and batch or ML workloads?
4. **Terraform/IaC:** Terraform provider upgrades: How would you safely upgrade Terraform and Google provider versions across many workspaces?
5. **GCP Services:** BigQuery/data reliability: How would you approach BigQuery or data pipeline reliability when platform teams own infrastructure but data teams own pipelines?
6. **SRE/Reliability:** Pub/Sub incident: A downstream service outage caused Pub/Sub backlog. How would you recover safely without overloading dependencies or losing messages?

## Day 11

1. **Leadership/Behavioral:** Leadership behavioral: How would you mentor junior engineers on Kubernetes troubleshooting and Terraform safety?
2. **GKE/Kubernetes:** GKE multi-tenancy: How would you design namespace isolation, quotas, RBAC, network policies, admission controls, and observability for many teams in one cluster?
3. **Terraform/IaC:** Organization policy: Which GCP org policies would you enforce for a secure baseline, and how would you handle exceptions?
4. **GCP Services:** GKE image pull failures: Pods are failing with ImagePullBackOff after a registry migration. How would you debug Artifact Registry permissions, Workload Identity, image tags, network, and pull secrets?
5. **SRE/Reliability:** On-call maturity: How would you improve an on-call rotation that has too many alerts, poor runbooks, and slow escalation?
6. **Observability:** Cloud Composer/Dataflow: A scheduled data pipeline misses its SLA and downstream dashboards are stale. How would you debug Composer, Dataflow, BigQuery, retries, backfills, and alerting?

## Day 12

1. **GKE/Kubernetes:** GKE private cluster: A private GKE cluster cannot pull images or reach Google APIs. How would you debug private nodes, NAT, Private Google Access, DNS, routes, and firewall rules?
2. **Terraform/IaC:** Infrastructure testing: How would you test Terraform modules, Kubernetes manifests, Helm charts, and policy-as-code before production?
3. **GCP Services:** Compute Engine migration: How would you migrate legacy Compute Engine workloads to GKE or Cloud Run, and what factors would make you keep them on VMs?
4. **SRE/Reliability:** ML feature store: What reliability and governance concerns would you consider for an ML feature store?
5. **Observability:** Firewall governance: How would you design firewall rule ownership, logging, review, and cleanup across many GCP projects?
6. **Security/DevSecOps:** Container runtime security: What runtime security controls would you consider for Kubernetes workloads beyond image scanning?

## Day 13

1. **Terraform/IaC:** SDK automation: Compare using Terraform, gcloud, REST APIs, and Python SDKs for platform automation. When would you choose each?
2. **GCP Services:** AlloyDB design: When would you choose AlloyDB over Cloud SQL, and what operational considerations would you discuss for HA, backups, scaling, and cost?
3. **SRE/Reliability:** Kubernetes probes: How would you design readiness, liveness, and startup probes for a slow-starting service to avoid cascading failures?
4. **Observability:** Logging cost: Cloud Logging cost is growing quickly. How would you reduce cost while preserving incident debugging value?
5. **Security/DevSecOps:** Kubernetes Secrets: How would you compare Kubernetes Secrets, Secret Manager, External Secrets Operator, Sealed Secrets, and CSI drivers?
6. **Networking:** Migration: How would you migrate an on-prem application to GCP with minimal downtime? Cover networking, data, CI/CD, observability, security, and rollback.

## Day 14

1. **GCP Services:** Distributed tracing: A request crosses API gateway, Cloud Run, GKE, Pub/Sub, and Cloud SQL. How would you make tracing useful end to end?
2. **SRE/Reliability:** Incident postmortem quality: What makes a postmortem high quality, and how do you ensure action items actually get completed?
3. **Observability:** GPU cost control: GPU workloads are underutilized and expensive. How would you improve scheduling, quotas, sharing, and monitoring?
4. **Security/DevSecOps:** IAM troubleshooting: A workload gets permission denied only in production. How would you debug IAM policy, service accounts, Workload Identity, org policy, and audit logs?
5. **Networking:** VPC Service Controls: When would you use VPC Service Controls, what problems does it solve, and what operational pain can it introduce?
6. **CI/CD/GitOps:** Cloud Build: How would you design Cloud Build pipelines for Docker builds, vulnerability scanning, provenance, tests, and deployment promotion?

## Day 15

1. **SRE/Reliability:** SRE fundamentals: Design an SLO for a customer-facing API running on GKE. What SLIs would you choose, how would you calculate error budget, and how would it affect releases?
2. **Observability:** Observability maturity: How would you assess whether an organization has mature observability or just many dashboards?
3. **Security/DevSecOps:** GKE expert: You are asked to design a production GKE platform for multiple product teams. How would you structure clusters, node pools, namespaces, IAM, networking, and deployment ownership?
4. **Networking:** Hybrid connectivity: A service is slow over VPN or Interconnect. How would you troubleshoot latency, MTU, routes, BGP, firewall rules, and DNS?
5. **CI/CD/GitOps:** GitHub Actions security: How would you secure GitHub Actions for cloud deployments using OIDC, environments, approvals, least privilege, and secret handling?
6. **Automation/Platform:** OpenTofu: If a company asks about Terraform versus OpenTofu, how would you explain the tradeoffs for enterprise platform teams?

## Day 16

1. **Observability:** Observability platform: How would you design observability for a platform team so developers get useful golden signals without creating noisy alerts?
2. **Security/DevSecOps:** Cloud Storage security: How would you design Cloud Storage bucket security for logs, artifacts, and data exports, including IAM, retention, lifecycle, CMEK, and public access prevention?
3. **Networking:** CNI troubleshooting: Pods on different nodes cannot communicate. How would you debug CNI, routes, firewall rules, network policies, and node health?
4. **CI/CD/GitOps:** Jenkins modernization: A company has old Jenkins pipelines. How would you modernize without disrupting releases?
5. **Automation/Platform:** Toil reduction: How would you identify operational toil in a platform team and turn it into automation backlog?
6. **MLOps/AI Infra:** Champion-challenger: How would you implement a champion-challenger model deployment pattern in production?

## Day 17

1. **Security/DevSecOps:** Cloud Armor: Design a Cloud Armor and load balancing strategy for an internet-facing service. How would you handle WAF rules, rate limits, exceptions, and observability?
2. **Networking:** Network segmentation: How would you segment environments and teams using VPCs, Shared VPC, firewall rules, folders, and projects?
3. **CI/CD/GitOps:** Golden path adoption: Teams avoid your golden path and create their own pipelines. How would you understand why and improve adoption?
4. **Automation/Platform:** Platform API: If you expose self-service infrastructure through an API, what validations, approvals, and audit trails would you build?
5. **MLOps/AI Infra:** Helm: How would you structure Helm charts and values for repeatable deployments across environments without creating configuration drift?
6. **FinOps/DR/Data:** FinOps showback: How would you implement cost allocation, labels, budgets, showback, and team accountability across GCP projects?

## Day 18

1. **Networking:** TLS rotation: How would you rotate TLS certificates for production ingress without downtime?
2. **CI/CD/GitOps:** Model rollback: A newly deployed model has lower latency but worse business outcomes. How would you detect this and roll back safely?
3. **Automation/Platform:** Incident behavioral: Tell me about a time you disagreed with developers during a production incident. How did you handle it?
4. **MLOps/AI Infra:** LLM app operations: How would you operate an LLM-backed service in production, including latency, cost, prompt changes, safety, and observability?
5. **FinOps/DR/Data:** FinOps: A monthly GCP bill increased by 40 percent after a platform migration. How would you investigate and reduce cost without harming reliability?
6. **Leadership/Behavioral:** Communication: Explain a complex GKE outage to a non-technical product leader in two minutes.

## Day 19

1. **CI/CD/GitOps:** Metadata management: What metadata would you capture for every ML run to support audit, rollback, debugging, and compliance?
2. **Automation/Platform:** StatefulSet vs Deployment: When would you use StatefulSet, Deployment, Job, CronJob, or DaemonSet in real Kubernetes platforms?
3. **MLOps/AI Infra:** Drift monitoring: In production, how would you detect data drift, concept drift, and schema drift, and how would each one trigger different actions?
4. **FinOps/DR/Data:** Multi-region design: You have a multi-region reliability requirement on GCP. How would you design traffic routing, data stores, failover, monitoring, and incident response?
5. **Leadership/Behavioral:** Responsible AI: What checks would you add for bias, explainability, lineage, and responsible AI before approving a model for production?
6. **GKE/Kubernetes:** Commitment planning: How would you decide whether to buy committed use discounts or reservations for GKE/Compute workloads?

## Day 20

1. **Automation/Platform:** SRE toil: Give examples of toil in DevOps/SRE work and explain how you would measure and reduce it with automation.
2. **MLOps/AI Infra:** Model registry: How would you design model versioning, approval workflow, rollback, lineage, and auditability using MLflow Registry or Vertex AI Model Registry?
3. **FinOps/DR/Data:** Platform maturity: How would you evaluate whether a platform is mature enough for product-company scale across reliability, security, cost, developer experience, and automation?
4. **Leadership/Behavioral:** Incident leadership: You are the incident commander for a GKE outage. How would you manage technical debugging, stakeholder communication, timeline, mitigation, and postmortem?
5. **GKE/Kubernetes:** Kubernetes control plane: Explain what happens from kubectl apply to a running pod, including API server, scheduler, kubelet, CNI, and controllers.
6. **Terraform/IaC:** Terraform expert: How would you design reusable Terraform modules for GCP networking, IAM, GKE, Cloud Run, observability, and security so teams can consume them safely?

## Day 21

1. **MLOps/AI Infra:** Inference optimization: How would you improve model latency and throughput using batching, autoscaling, model format optimization, GPU use, or caching?
2. **Leadership/Behavioral:** Pub/Sub exactly-once: A team expects exactly-once processing from Pub/Sub. How would you explain reality and design idempotency, ordering keys, retries, and DLQs?
3. **GKE/Kubernetes:** Pod affinity: When would you use node selectors, affinity, anti-affinity, topology spread constraints, taints, and tolerations?
4. **GKE/Kubernetes:** Resource quotas: How would you design ResourceQuotas and LimitRanges for a shared cluster without blocking legitimate scaling?
5. **Terraform/IaC:** Terraform state: A Terraform apply failed halfway and now remote state does not match real GCP resources. How would you recover safely in an enterprise environment?
6. **GCP Services:** Cloud Run incident: A Cloud Run service has cold-start latency and failed requests after a traffic spike. How would you debug concurrency, min instances, CPU allocation, revisions, and downstream limits?

## Day 22

1. **GKE/Kubernetes:** PDB design: How would you use PodDisruptionBudgets during node upgrades, cluster autoscaling, and planned maintenance?
2. **GKE/Kubernetes:** Kubernetes certificate issue: A cluster has certificate or webhook TLS failures. How would you debug certificate chain, rotation, admission webhooks, and API server errors?
3. **GKE/Kubernetes:** Container startup: A container works locally but fails in Kubernetes. How would you debug entrypoint, env vars, filesystem, permissions, and security context?
4. **Terraform/IaC:** Policy as code: How would you use Sentinel, OPA, or policy validation to stop risky GCP changes before apply while keeping developer experience smooth?
5. **GCP Services:** Cloud SQL performance: A Cloud SQL database has high CPU and lock contention. How would you debug queries, connections, pooling, indexes, replicas, and app rollout impact?
6. **SRE/Reliability:** Alert fatigue: You inherit 500 alerts and noisy on-call. How would you rationalize alerts using SLOs and ownership?

## Day 23

1. **GKE/Kubernetes:** Blue-green deployment: When would you choose blue-green over canary, and what GCP/GKE components would you use?
2. **GKE/Kubernetes:** Configuration drift: How would you detect and prevent configuration drift across applications, clusters, and cloud infrastructure?
3. **Terraform/IaC:** Terraform monorepo vs multi-repo: How would you decide repository structure for Terraform modules, environments, and app teams?
4. **GCP Services:** Cloud Storage lifecycle: How would you design lifecycle, retention, versioning, object holds, CMEK, and audit logging for compliance-sensitive storage?
5. **SRE/Reliability:** Platform engineering: What self-service golden paths would you build for product teams, and what guardrails would you enforce without slowing delivery?
6. **Observability:** Trace sampling: How would you choose tracing sampling rates and make traces useful for debugging high-volume services?

## Day 24

1. **GKE/Kubernetes:** Go services: If asked to build a Kubernetes controller or CLI in Go, how would you approach the design even if Go is not your primary language?
2. **Terraform/IaC:** Terraform import: A team created resources manually and wants them managed by Terraform. How would you plan imports and reduce risk?
3. **GCP Services:** Log correlation: How would you design correlation IDs and structured logging across microservices and async Pub/Sub workflows?
4. **SRE/Reliability:** GKE scheduling: A deployment is pending because pods cannot be scheduled. How would you debug requests, limits, node capacity, taints, affinities, quotas, and cluster autoscaler?
5. **Observability:** Dashboard design: What dashboards would you build for executives, SREs, platform engineers, and application teams?
6. **Security/DevSecOps:** Cloud security: How would you secure workload access to GCP services from GKE using Workload Identity, IAM, Secret Manager, and least privilege?

## Day 25

1. **Terraform/IaC:** Drift detection: How would you detect and reconcile drift between Terraform state, real GCP resources, and manual console changes?
2. **GCP Services:** Compute Engine operations: A Linux VM behind a load balancer has high CPU, many TIME_WAIT connections, and intermittent TLS errors. How would you debug it?
3. **SRE/Reliability:** Runbooks: How would you build a runbook library for common GKE, Terraform, IAM, and networking incidents, and how would you keep it updated?
4. **Observability:** OpenTelemetry: How would you roll out OpenTelemetry across services and connect traces, metrics, logs, dashboards, and alerts?
5. **Security/DevSecOps:** Load balancing: Design a global external HTTPS load balancing strategy for multiple services. How would you handle SSL, backend health checks, Cloud Armor, CDN, and observability?
6. **Networking:** GKE troubleshooting: A critical service on GKE has intermittent 5xx errors during traffic spikes. Walk me through your debugging approach from load balancer to pod-level metrics.

## Day 26

1. **GCP Services:** Artifact Registry: How would you design Artifact Registry repositories, IAM, cleanup policies, scanning, and promotion between environments?
2. **SRE/Reliability:** Reliability review: What would you check before certifying a service as production-ready on GCP/GKE?
3. **Observability:** Cloud Monitoring: How would you design alerting policies in Google Cloud Monitoring to reduce alert fatigue and focus on user impact?
4. **Security/DevSecOps:** RBAC: How would you design Kubernetes RBAC for platform, application, security, and CI/CD teams in a shared GKE environment?
5. **Networking:** Service mesh: When would you introduce Istio or Anthos Service Mesh, and what are the operational risks around mTLS, traffic splitting, retries, and observability?
6. **CI/CD/GitOps:** Feature store: What production risks does a feature store solve, and how would you design feature freshness, parity, governance, and rollback?

## Day 27

1. **Security/DevSecOps:** Supply chain security: How would you implement image scanning, provenance, Binary Authorization, SBOMs, and deployment policies for containers?
2. **Security/DevSecOps:** Admission controls: How would you enforce Kubernetes security standards using Gatekeeper, Kyverno, or admission controls without blocking developer velocity?
3. **Security/DevSecOps:** Security Command Center: How would you operationalize Security Command Center findings into triage, ownership, SLAs, and remediation workflows?
4. **Networking:** Gateway/API strategy: How would you choose between Ingress, Gateway API, service mesh, load balancers, and Apigee for different traffic management requirements?
5. **CI/CD/GitOps:** Pipeline caching: When can ML pipeline caching help, and when can it hide stale data or bad assumptions?
6. **Automation/Platform:** Progressive delivery: How would you implement canary or blue-green releases using Cloud Deploy, Argo Rollouts, metrics, and automatic rollback?

## Day 28

1. **Security/DevSecOps:** Secrets migration: How would you migrate applications from mounted JSON service account keys to Workload Identity and Secret Manager?
2. **Security/DevSecOps:** SCC operations: How would you operationalize Security Command Center findings into ticketing, prioritization, remediation, and reporting?
3. **Networking:** Ingress controller: How would you debug an ingress path returning 404 or 502, from DNS to load balancer to ingress controller to service endpoints?
4. **CI/CD/GitOps:** CI/CD design: Design a safe promotion workflow from commit to production using GitHub Actions, Cloud Build, Jenkins, artifact promotion, approvals, and rollback.
5. **Automation/Platform:** Developer experience: How would you measure whether your platform improves developer experience and delivery speed?
6. **MLOps/AI Infra:** Batch vs real-time inference: How would you choose between batch inference, real-time inference, asynchronous inference, and streaming inference for different business use cases?

## Day 29

1. **Security/DevSecOps:** Secrets rotation: How would you rotate secrets or keys for production services without downtime?
2. **CI/CD/GitOps:** Release readiness: A production release passed CI but caused customer impact. How would you design production readiness checks and release gates to prevent this?
3. **CI/CD/GitOps:** Release rollback: A canary deployment passes technical metrics but business metrics drop. How would you decide rollback versus continue?
4. **Automation/Platform:** Immutable infrastructure: What does immutable infrastructure mean in cloud platforms, and when is mutable infrastructure still acceptable?
5. **GKE/Kubernetes:** Cloud SQL/AlloyDB: How would you troubleshoot a private GKE workload that cannot connect to Cloud SQL or AlloyDB?
6. **GKE/Kubernetes:** CrashLoopBackOff: A pod is stuck in CrashLoopBackOff in production. Give me your exact Kubernetes troubleshooting workflow and the commands or signals you would check.

## Day 30

1. **Automation/Platform:** Bash vs Python: When is Bash acceptable for automation, and when should you rewrite it in Python or Go?
2. **Automation/Platform:** Go optional: Where would Go be useful in a platform engineering environment, and how would you decide between Go, Python, and Bash for automation?
3. **GKE/Kubernetes:** GKE upgrades: A GKE cluster upgrade caused service disruption. How would you design a safer upgrade strategy for control plane, node pools, PDBs, and workloads?
4. **GKE/Kubernetes:** RCA: Walk me through how you would write a strong RCA for a repeated Kubernetes outage and turn it into preventive engineering work.
5. **GKE/Kubernetes:** GKE node pressure: Nodes show memory pressure and pods are being evicted. How would you investigate requests, limits, QoS classes, daemonsets, autoscaling, and app behavior?
6. **GKE/Kubernetes:** Chaos testing: How would you introduce chaos engineering safely for GKE workloads and what failure modes would you test first?

