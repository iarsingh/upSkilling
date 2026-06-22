const els = {
  status: document.querySelector("#status"),
  statusText: document.querySelector("#statusText"),
  interviewList: document.querySelector("#interviewList"),
  progressHistory: document.querySelector("#progressHistory"),
  addInterview: document.querySelector("#addInterview"),
  interviewLabel: document.querySelector("#interviewLabel"),
  previousInterview: document.querySelector("#previousInterview"),
  nextInterview: document.querySelector("#nextInterview"),
  resetInterview: document.querySelector("#resetInterview"),
  modeInputs: document.querySelectorAll("input[name='interviewMode']"),
  questionOrder: document.querySelector("#questionOrder"),
  practiceDay: document.querySelector("#practiceDay"),
  mockSet: document.querySelector("#mockSet"),
  role: document.querySelector("#role"),
  level: document.querySelector("#level"),
  topic: document.querySelector("#topic"),
  cvText: document.querySelector("#cvText"),
  jdText: document.querySelector("#jdText"),
  jdUrl: document.querySelector("#jdUrl"),
  autoNext: document.querySelector("#autoNext"),
  question: document.querySelector("#question"),
  answer: document.querySelector("#answer"),
  newQuestion: document.querySelector("#newQuestion"),
  micButton: document.querySelector("#micButton"),
  clearButton: document.querySelector("#clearButton"),
  feedbackButton: document.querySelector("#feedbackButton"),
  endInterview: document.querySelector("#endInterview"),
  feedbackOutput: document.querySelector("#feedbackOutput"),
  micState: document.querySelector("#micState"),
  copyButton: document.querySelector("#copyButton"),
  importJd: document.querySelector("#importJd"),
  saveContext: document.querySelector("#saveContext")
};

const STORAGE_KEY = "aiMockInterviewerState";
const defaultFocusAreas = "GKE expert, Terraform advanced, Python automation, SRE SLI/SLO/error budgets, Prometheus/Grafana/OpenTelemetry, ArgoCD GitOps, GCP security, platform engineering, Vertex AI and MLOps basics";
const defaultTargetSkills = `Target role family: Senior GCP DevOps / SRE / Cloud Engineer / Platform Engineer / Cloud Reliability Engineer / ML Platform Engineer
Experience level: 6-8 years
Target companies: Google-style interviews and product companies

Core skills to test:

Cloud Platform (GCP)
- Google Kubernetes Engine (GKE)
- Cloud Run
- Compute Engine
- VPC, Load Balancing, Cloud DNS
- IAM and Security
- Cloud Storage
- Pub/Sub
- Cloud SQL / AlloyDB
- Vertex AI basic awareness

Kubernetes and Containers
- Kubernetes Administration
- Docker
- Helm
- HPA/VPA
- RBAC
- Network Policies
- Service Mesh: Istio / Anthos Service Mesh
- Troubleshooting and performance tuning

Infrastructure as Code
- Terraform advanced
- Terraform modules
- Remote state management
- Terraform Enterprise / Cloud
- Policy as Code: OPA / Sentinel

CI/CD and GitOps
- GitHub Actions
- GitLab CI/CD
- Jenkins
- Cloud Build
- ArgoCD
- GitOps workflows

SRE and Reliability Engineering
- SLI / SLO / SLA
- Error budgets
- Incident management
- RCA
- Capacity planning
- Availability and reliability design
- Chaos engineering basics

Observability
- Prometheus
- Grafana
- OpenTelemetry
- Google Cloud Monitoring
- Google Cloud Logging
- ELK / OpenSearch

Security and DevSecOps
- IAM
- Workload Identity
- Secret management
- Vulnerability management
- Container security
- Binary Authorization
- Security Command Center
- Supply chain security

Networking
- TCP/IP
- DNS
- HTTP/HTTPS
- VPN
- Interconnect
- Firewall rules
- Load balancers
- Service networking

Programming and Automation
- Python must-have
- Bash
- Go nice-to-have
- REST APIs
- SDK automation

Platform Engineering
- Internal Developer Platforms
- Self-service infrastructure
- Golden paths
- Developer Experience
- Backstage awareness

AI Infrastructure
- MLflow
- Kubeflow
- Vertex AI
- Model serving on Kubernetes
- GPU workloads
- MLOps fundamentals

Additional market-relevant senior skills
- GCP landing zones, folders, projects, org policies, Shared VPC, and governance
- FinOps: cost allocation, rightsizing, committed use discounts, budget alerts, and cost-aware architecture
- Disaster recovery, backup/restore, RTO/RPO, game days, and business continuity
- Production readiness reviews, release readiness, operational readiness, and rollback design
- Incident communication, stakeholder updates, postmortems, runbooks, and on-call maturity
- Linux fundamentals, process/network debugging, TLS/certificates, and performance troubleshooting
- Cloud Deploy, progressive delivery, canary releases, blue/green deployments, and feature flags
- Policy/controller ecosystem: Gatekeeper, Kyverno, admission controls, and Kubernetes security standards
- Data platform adjacency: BigQuery basics, Cloud Composer awareness, data pipeline reliability
- API gateway/ingress evolution: Gateway API, Envoy, Apigee awareness

Priority order for interview preparation:
1. GKE expert
2. Terraform expert
3. Python automation strong
4. SRE concepts: SLI, SLO, error budget
5. Observability: Prometheus, Grafana, OpenTelemetry
6. GitOps: ArgoCD
7. Cloud security
8. Platform engineering
9. Vertex AI and MLOps
10. GCP landing zones and networking
11. FinOps and cost optimization
12. DR, backup, and production readiness
13. Go language optional but valuable`;
const defaultCvText = `AKHILESH RANJAN SINGH
DevOps Engineer | GCP | Kubernetes | Terraform | Cloud Security
Email: akhileshranjan.ks@gmail.com
Phone: +91-8002392976
Location: Noida, India
LinkedIn: https://linkedin.com/in/iamarsingh
GitHub: https://github.com/iarsingh

PROFESSIONAL SUMMARY
Senior DevOps & Platform Engineer with 6.9+ years of experience designing, automating, and operating cloud-native platforms across GCP, AWS, and Azure. Skilled in Kubernetes, Terraform, CI/CD, Infrastructure as Code, cloud security, observability, and platform engineering, with expertise in building scalable cloud infrastructure and improving operational reliability. Experienced in GKE, Cloud Run, Terraform Enterprise, DevSecOps, and cloud governance. Additionally experienced in AI Infrastructure and MLOps, including MLflow, FastAPI, Vertex AI, model serving, and Kubernetes-based ML deployment workflows.

TECHNICAL SKILLS
Cloud Platforms: Google Cloud Platform (GCP), AWS, Azure
Infrastructure as Code: Terraform, Ansible
Security & Governance: IAM, RBAC, Cloud Armor, WAF, DevSecOps, Prisma Cloud, IONIX, Stream Security, SAST/DAST, Vulnerability Management
Programming & Scripting: Python, Bash, Go
Databases: PostgreSQL, MySQL, MongoDB
Containers & Orchestration: Kubernetes, Docker, Helm, GKE, HPA, RBAC, Network Policies
CI/CD & GitOps: Jenkins, GitHub Actions, GitLab CI/CD, Google Cloud Build, ArgoCD, GitOps, BitBucket
Monitoring & Observability: ELK Stack, Prometheus, Grafana, OpenTelemetry
MLOps & AI Infrastructure: MLflow, Vertex AI, Model Serving, Model Monitoring, FastAPI, LLM Integrations

PROFESSIONAL EXPERIENCE
DevOps Engineer, Capgemini, Noida | 09/2024 - Present
- Designed and implemented secure cloud platform foundations on GCP using Terraform Enterprise.
- Built reusable Terraform modules for networking, IAM, Kubernetes, monitoring, logging, load balancing, and security controls, reducing infrastructure provisioning effort by 70%.
- Implemented Terraform Enterprise workspaces, remote state management, policy controls, reusable modules, and automated infrastructure delivery pipelines.
- Established GCP landing zone standards including project hierarchy, Shared VPC architecture, network segmentation, and IAM governance models.
- Developed self-service infrastructure provisioning workflows integrated with Git-based CI/CD platforms and Harness.
- Automated lifecycle management of GKE, Cloud Run, IAM, VPCs, Load Balancers, Cloud Armor, Monitoring, and Logging.
- Designed Google Cloud Armor security policies including WAF protections, Adaptive Protection, rate limiting, threat intelligence integrations, custom security rules, and exception handling.
- Led cloud security initiatives using IONIX and Stream Security.
- Improved observability through Prometheus, Grafana, ELK Stack, and Google Cloud Operations Suite.
- Managed production GKE clusters including node pools, upgrades, autoscaling, RBAC, troubleshooting, and performance optimization.
- Applied Kubernetes, Docker, and Helm deployment patterns to AI/ML workloads.
- Developed MLOps and AI Infrastructure solutions involving FastAPI model serving, MLflow lifecycle management, monitoring, and AI-assisted operational workflows.

Senior Software Engineer - DevOps, Tech Mahindra, Mumbai | 07/2022 - 09/2024
- Designed enterprise CI/CD platforms using Jenkins, GitHub Actions, Terraform, Docker, Kubernetes, Helm, and Ansible.
- Built Infrastructure as Code using Terraform and Ansible across GCP, AWS, and Azure.
- Deployed and managed containerized applications on Kubernetes using Docker and Helm.
- Implemented DevSecOps controls including Prisma Cloud, vulnerability scanning, SAST/DAST, RBAC, IAM governance, and secrets management.
- Engineered backup and disaster recovery using Veeam and Kasten K10.
- Developed monitoring, logging, and alerting using ELK Stack and cloud-native observability.
- Automated OS patching, configuration management, and deployment workflows.
- Managed JFrog Artifactory and secure artifact processes.
- Collaborated with Google, Microsoft, and AWS engineering teams on complex infrastructure troubleshooting.
- Maintained highly available Kubernetes platforms across GCP, AWS, and Azure with 99.9% service availability.

System Engineer - Cloud & DevOps, TCS, Bengaluru | 09/2019 - 07/2022
- Managed production Kubernetes and GKE environments for business-critical applications.
- Automated CI/CD workflows using Jenkins, Cloud Build, and Infrastructure as Code, reducing deployment effort by 40%.
- Provisioned and maintained GCP infrastructure using Terraform and automation scripts.
- Implemented monitoring, alerting, and incident response using cloud-native observability.
- Supported migration from on-premises environments to GCP.
- Collaborated with development, infrastructure, and security teams on cloud governance, IAM controls, and platform standards.
- Performed Linux administration, patching, troubleshooting, and production support.
- Contributed to reliability through capacity planning, performance optimization, RCA, and operational readiness reviews.

CERTIFICATIONS
- Google Professional Cloud DevOps Engineer — 2025
- Google Professional Cloud Network Engineer — 2025
- Google Associate Cloud Engineer — 2024

EDUCATION
Bachelor of Engineering - Computer Science, RGPV, Bhopal | 2019`;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let listening = false;
let finalTranscript = "";
const questionBank = [
  "GKE expert: You are asked to design a production GKE platform for multiple product teams. How would you structure clusters, node pools, namespaces, IAM, networking, and deployment ownership?",
  "Terraform expert: How would you design reusable Terraform modules for GCP networking, IAM, GKE, Cloud Run, observability, and security so teams can consume them safely?",
  "Python automation: How would you build a Python tool that audits GCP projects for IAM risk, public buckets, unused firewall rules, missing labels, and cost anomalies?",
  "SRE fundamentals: Design an SLO for a customer-facing API running on GKE. What SLIs would you choose, how would you calculate error budget, and how would it affect releases?",
  "Observability: An alert says p95 latency increased from 200ms to 2s after a deployment. How would you investigate using Prometheus, Grafana, Cloud Logging, logs, and traces?",
  "GitOps: How would you implement GitOps with ArgoCD for Kubernetes workloads across dev, staging, and production while keeping rollbacks and approvals safe?",
  "Cloud security: How would you secure workload access to GCP services from GKE using Workload Identity, IAM, Secret Manager, and least privilege?",
  "Platform engineering: What self-service golden paths would you build for product teams, and what guardrails would you enforce without slowing delivery?",
  "Vertex AI and MLOps: A team wants model serving on Kubernetes with FastAPI and GPU workloads. How would you design deployment, autoscaling, monitoring, and rollback?",
  "Go optional: Where would Go be useful in a platform engineering environment, and how would you decide between Go, Python, and Bash for automation?",
  "GKE troubleshooting: A critical service on GKE has intermittent 5xx errors during traffic spikes. Walk me through your debugging approach from load balancer to pod-level metrics.",
  "Terraform state: A Terraform apply failed halfway and now remote state does not match real GCP resources. How would you recover safely in an enterprise environment?",
  "Cloud Run vs GKE: A company wants to standardize Cloud Run and GKE usage. How would you decide which workloads go to Cloud Run versus GKE?",
  "Cloud SQL/AlloyDB: How would you troubleshoot a private GKE workload that cannot connect to Cloud SQL or AlloyDB?",
  "Pub/Sub reliability: A Pub/Sub consumer service is falling behind and message age is increasing. How would you debug backlog, scaling, ordering, retries, and dead-letter handling?",
  "Cloud Storage security: How would you design Cloud Storage bucket security for logs, artifacts, and data exports, including IAM, retention, lifecycle, CMEK, and public access prevention?",
  "Compute Engine operations: A Linux VM behind a load balancer has high CPU, many TIME_WAIT connections, and intermittent TLS errors. How would you debug it?",
  "GCP networking: How would you design GCP Shared VPC, service projects, firewall rules, private service access, DNS, and service networking for a multi-team platform?",
  "Load balancing: Design a global external HTTPS load balancing strategy for multiple services. How would you handle SSL, backend health checks, Cloud Armor, CDN, and observability?",
  "Cloud DNS: A production service intermittently resolves to an old endpoint. How would you debug DNS TTLs, Cloud DNS records, caches, split-horizon DNS, and client behavior?",
  "GKE scheduling: A deployment is pending because pods cannot be scheduled. How would you debug requests, limits, node capacity, taints, affinities, quotas, and cluster autoscaler?",
  "CrashLoopBackOff: A pod is stuck in CrashLoopBackOff in production. Give me your exact Kubernetes troubleshooting workflow and the commands or signals you would check.",
  "Autoscaling tradeoffs: Explain HPA, VPA, and cluster autoscaler. When can they conflict, and how would you tune them for a production workload?",
  "GKE upgrades: A GKE cluster upgrade caused service disruption. How would you design a safer upgrade strategy for control plane, node pools, PDBs, and workloads?",
  "Helm: How would you structure Helm charts and values for repeatable deployments across environments without creating configuration drift?",
  "RBAC: How would you design Kubernetes RBAC for platform, application, security, and CI/CD teams in a shared GKE environment?",
  "Network policies: A service should only receive traffic from one namespace and one ingress gateway. How would you implement and validate Kubernetes NetworkPolicies?",
  "Service mesh: When would you introduce Istio or Anthos Service Mesh, and what are the operational risks around mTLS, traffic splitting, retries, and observability?",
  "Terraform Enterprise: Explain how you would implement Terraform Enterprise workspaces, remote state, policy as code, approvals, and module versioning for a large GCP platform.",
  "Policy as code: How would you use Sentinel, OPA, or policy validation to stop risky GCP changes before apply while keeping developer experience smooth?",
  "Drift detection: How would you detect and reconcile drift between Terraform state, real GCP resources, and manual console changes?",
  "CI/CD design: Design a safe promotion workflow from commit to production using GitHub Actions, Cloud Build, Jenkins, artifact promotion, approvals, and rollback.",
  "Progressive delivery: How would you implement canary or blue-green releases using Cloud Deploy, Argo Rollouts, metrics, and automatic rollback?",
  "ArgoCD drift: A team says ArgoCD shows drift between Git and the cluster. How would you investigate and safely reconcile it?",
  "Release readiness: A production release passed CI but caused customer impact. How would you design production readiness checks and release gates to prevent this?",
  "Incident leadership: You are the incident commander for a GKE outage. How would you manage technical debugging, stakeholder communication, timeline, mitigation, and postmortem?",
  "RCA: Walk me through how you would write a strong RCA for a repeated Kubernetes outage and turn it into preventive engineering work.",
  "Error budgets: How would you explain error budgets to product managers and use them to make release decisions?",
  "Capacity planning: How would you design capacity planning for GKE node pools supporting both web services and batch or ML workloads?",
  "Runbooks: How would you build a runbook library for common GKE, Terraform, IAM, and networking incidents, and how would you keep it updated?",
  "Observability platform: How would you design observability for a platform team so developers get useful golden signals without creating noisy alerts?",
  "OpenTelemetry: How would you roll out OpenTelemetry across services and connect traces, metrics, logs, dashboards, and alerts?",
  "Cloud Monitoring: How would you design alerting policies in Google Cloud Monitoring to reduce alert fatigue and focus on user impact?",
  "ELK/OpenSearch: When would you use ELK or OpenSearch in addition to Cloud Logging, and how would you manage index cost and retention?",
  "Cloud Armor: Design a Cloud Armor and load balancing strategy for an internet-facing service. How would you handle WAF rules, rate limits, exceptions, and observability?",
  "Supply chain security: How would you implement image scanning, provenance, Binary Authorization, SBOMs, and deployment policies for containers?",
  "Admission controls: How would you enforce Kubernetes security standards using Gatekeeper, Kyverno, or admission controls without blocking developer velocity?",
  "Security Command Center: How would you operationalize Security Command Center findings into triage, ownership, SLAs, and remediation workflows?",
  "Secrets migration: How would you migrate applications from mounted JSON service account keys to Workload Identity and Secret Manager?",
  "Landing zone: How would you design a GCP landing zone for a product company, including org hierarchy, folders, projects, Shared VPC, IAM, org policies, logging, and billing?",
  "FinOps: A monthly GCP bill increased by 40 percent after a platform migration. How would you investigate and reduce cost without harming reliability?",
  "DR/backup: How would you define RTO and RPO for a critical service on GCP, and how would you test backup, restore, and regional failover?",
  "Multi-region design: You have a multi-region reliability requirement on GCP. How would you design traffic routing, data stores, failover, monitoring, and incident response?",
  "Migration: How would you migrate an on-prem application to GCP with minimal downtime? Cover networking, data, CI/CD, observability, security, and rollback.",
  "Backstage and IDP: How would you design a Backstage-style golden path for creating a new service on GCP with CI/CD, Terraform, monitoring, and security?",
  "Platform maturity: How would you evaluate whether a platform is mature enough for product-company scale across reliability, security, cost, developer experience, and automation?",
  "BigQuery/data reliability: How would you approach BigQuery or data pipeline reliability when platform teams own infrastructure but data teams own pipelines?",
  "Gateway/API strategy: How would you choose between Ingress, Gateway API, service mesh, load balancers, and Apigee for different traffic management requirements?",
  "MLOps lifecycle: How would you design MLflow or Vertex AI model lifecycle management with approval, deployment, monitoring, drift detection, and rollback?",
  "GPU workloads: How would you schedule GPU workloads on GKE with taints, tolerations, node pools, quotas, cost controls, and observability?",
  "Cloud Composer/Dataflow: A scheduled data pipeline misses its SLA and downstream dashboards are stale. How would you debug Composer, Dataflow, BigQuery, retries, backfills, and alerting?",
  "BigQuery cost and performance: A BigQuery workload became slow and expensive. How would you investigate query patterns, partitioning, clustering, slots, storage, and ownership?",
  "Cloud SQL backup restore: A Cloud SQL instance has accidental data deletion. How would you validate backups, point-in-time recovery, restore testing, application cutover, and communication?",
  "Regional failover drill: How would you plan and run a failover game day for a GKE service with Cloud SQL, Pub/Sub, load balancing, DNS, and observability?",
  "Stateful Kubernetes workloads: When would you avoid running stateful workloads on GKE, and if you must run them, how would you design storage, backup, upgrades, and recovery?",
  "GKE multi-tenancy: How would you design namespace isolation, quotas, RBAC, network policies, admission controls, and observability for many teams in one cluster?",
  "GKE private cluster: A private GKE cluster cannot pull images or reach Google APIs. How would you debug private nodes, NAT, Private Google Access, DNS, routes, and firewall rules?",
  "GKE image pull failures: Pods are failing with ImagePullBackOff after a registry migration. How would you debug Artifact Registry permissions, Workload Identity, image tags, network, and pull secrets?",
  "GKE node pressure: Nodes show memory pressure and pods are being evicted. How would you investigate requests, limits, QoS classes, daemonsets, autoscaling, and app behavior?",
  "GKE multi-cluster: When would you use multiple GKE clusters versus one shared cluster, and how would you handle traffic, identity, policy, and operations?",
  "Cloud Run incident: A Cloud Run service has cold-start latency and failed requests after a traffic spike. How would you debug concurrency, min instances, CPU allocation, revisions, and downstream limits?",
  "Cloud Run security: How would you expose an internal Cloud Run service securely using IAM, ingress settings, VPC connector, load balancer, and service-to-service auth?",
  "Compute Engine migration: How would you migrate legacy Compute Engine workloads to GKE or Cloud Run, and what factors would make you keep them on VMs?",
  "Pub/Sub exactly-once: A team expects exactly-once processing from Pub/Sub. How would you explain reality and design idempotency, ordering keys, retries, and DLQs?",
  "Pub/Sub incident: A downstream service outage caused Pub/Sub backlog. How would you recover safely without overloading dependencies or losing messages?",
  "Cloud SQL performance: A Cloud SQL database has high CPU and lock contention. How would you debug queries, connections, pooling, indexes, replicas, and app rollout impact?",
  "AlloyDB design: When would you choose AlloyDB over Cloud SQL, and what operational considerations would you discuss for HA, backups, scaling, and cost?",
  "Cloud Storage lifecycle: How would you design lifecycle, retention, versioning, object holds, CMEK, and audit logging for compliance-sensitive storage?",
  "VPC Service Controls: When would you use VPC Service Controls, what problems does it solve, and what operational pain can it introduce?",
  "Private Service Connect: How would you use Private Service Connect for private service access, and how would you debug connectivity failures?",
  "Hybrid connectivity: A service is slow over VPN or Interconnect. How would you troubleshoot latency, MTU, routes, BGP, firewall rules, and DNS?",
  "Firewall governance: How would you design firewall rule ownership, logging, review, and cleanup across many GCP projects?",
  "DNS migration: How would you migrate DNS zones with minimal risk, and how would you plan TTLs, validation, rollback, and monitoring?",
  "Terraform monorepo vs multi-repo: How would you decide repository structure for Terraform modules, environments, and app teams?",
  "Terraform provider upgrades: How would you safely upgrade Terraform and Google provider versions across many workspaces?",
  "Terraform secrets: How would you prevent secrets from leaking into Terraform state, plans, logs, and CI/CD output?",
  "Terraform import: A team created resources manually and wants them managed by Terraform. How would you plan imports and reduce risk?",
  "OpenTofu: If a company asks about Terraform versus OpenTofu, how would you explain the tradeoffs for enterprise platform teams?",
  "Cloud Build: How would you design Cloud Build pipelines for Docker builds, vulnerability scanning, provenance, tests, and deployment promotion?",
  "GitHub Actions security: How would you secure GitHub Actions for cloud deployments using OIDC, environments, approvals, least privilege, and secret handling?",
  "Jenkins modernization: A company has old Jenkins pipelines. How would you modernize without disrupting releases?",
  "Artifact Registry: How would you design Artifact Registry repositories, IAM, cleanup policies, scanning, and promotion between environments?",
  "Release rollback: A canary deployment passes technical metrics but business metrics drop. How would you decide rollback versus continue?",
  "SLO burn rate: Explain multi-window multi-burn-rate alerting and how you would tune alerts for fast and slow burns.",
  "Toil reduction: How would you identify operational toil in a platform team and turn it into automation backlog?",
  "On-call maturity: How would you improve an on-call rotation that has too many alerts, poor runbooks, and slow escalation?",
  "Reliability review: What would you check before certifying a service as production-ready on GCP/GKE?",
  "Chaos testing: How would you introduce chaos engineering safely for GKE workloads and what failure modes would you test first?",
  "Capacity incident: A regional capacity shortage affects node pool scaling. How would you mitigate and redesign for resilience?",
  "Prometheus scale: Prometheus is overloaded with high cardinality metrics. How would you debug and fix it?",
  "Logging cost: Cloud Logging cost is growing quickly. How would you reduce cost while preserving incident debugging value?",
  "Trace sampling: How would you choose tracing sampling rates and make traces useful for debugging high-volume services?",
  "Dashboard design: What dashboards would you build for executives, SREs, platform engineers, and application teams?",
  "Alert ownership: How would you ensure every alert has an owner, runbook, SLO relationship, and actionable threshold?",
  "IAM recommender: How would you use IAM Recommender and audit logs to reduce over-permissioned service accounts safely?",
  "Organization policy: Which GCP org policies would you enforce for a secure baseline, and how would you handle exceptions?",
  "SCC operations: How would you operationalize Security Command Center findings into ticketing, prioritization, remediation, and reporting?",
  "Container runtime security: What runtime security controls would you consider for Kubernetes workloads beyond image scanning?",
  "Secrets rotation: How would you rotate secrets or keys for production services without downtime?",
  "SLSA/provenance: How would you explain SLSA, provenance, and signed artifacts to a team building a secure delivery platform?",
  "Developer experience: How would you measure whether your platform improves developer experience and delivery speed?",
  "Golden path adoption: Teams avoid your golden path and create their own pipelines. How would you understand why and improve adoption?",
  "Platform API: If you expose self-service infrastructure through an API, what validations, approvals, and audit trails would you build?",
  "Backstage plugin: What Backstage plugins or templates would you prioritize for a GCP platform team?",
  "Service catalog: How would you design service ownership metadata, dependency mapping, and production readiness status in a service catalog?",
  "ML feature store: What reliability and governance concerns would you consider for an ML feature store?",
  "Model monitoring: How would you monitor model serving for latency, error rate, drift, data quality, and business impact?",
  "Batch inference: How would you design batch inference on GCP using GKE, Cloud Run jobs, Vertex AI, or Composer, and what tradeoffs matter?",
  "GPU cost control: GPU workloads are underutilized and expensive. How would you improve scheduling, quotas, sharing, and monitoring?",
  "LLM app operations: How would you operate an LLM-backed service in production, including latency, cost, prompt changes, safety, and observability?",
  "FinOps showback: How would you implement cost allocation, labels, budgets, showback, and team accountability across GCP projects?",
  "Commitment planning: How would you decide whether to buy committed use discounts or reservations for GKE/Compute workloads?",
  "Incident behavioral: Tell me about a time you disagreed with developers during a production incident. How did you handle it?",
  "Leadership behavioral: How would you mentor junior engineers on Kubernetes troubleshooting and Terraform safety?",
  "Design tradeoff: When would you intentionally choose a simpler architecture over a highly available multi-region design?",
  "Communication: Explain a complex GKE outage to a non-technical product leader in two minutes.",
  "Prioritization: You have security backlog, cost pressure, and reliability incidents. How would you prioritize work for the next quarter?",
  "MLOps fundamentals: Explain the end-to-end ML lifecycle and where DevOps responsibilities become different from traditional application delivery.",
  "Drift monitoring: In production, how would you detect data drift, concept drift, and schema drift, and how would each one trigger different actions?",
  "ML monitoring tools: How would you combine Vertex AI Model Monitoring, Prometheus, Grafana, MLflow, and Evidently-style checks in one production monitoring design?",
  "Model registry: How would you design model versioning, approval workflow, rollback, lineage, and auditability using MLflow Registry or Vertex AI Model Registry?",
  "Feature store: What production risks does a feature store solve, and how would you design feature freshness, parity, governance, and rollback?",
  "Batch vs real-time inference: How would you choose between batch inference, real-time inference, asynchronous inference, and streaming inference for different business use cases?",
  "A/B and canary for ML: How would you run A/B testing or canary deployment for an ML model while protecting users and measuring business impact?",
  "Model rollback: A newly deployed model has lower latency but worse business outcomes. How would you detect this and roll back safely?",
  "Inference optimization: How would you improve model latency and throughput using batching, autoscaling, model format optimization, GPU use, or caching?",
  "Responsible AI: What checks would you add for bias, explainability, lineage, and responsible AI before approving a model for production?",
  "Reproducible training: How would you make an ML training pipeline reproducible across code version, data version, features, environment, and model artifact?",
  "Pipeline orchestration: Compare Airflow, Dagster, Kubeflow, and Vertex AI Pipelines for ML/platform use cases. How would you choose?",
  "Pipeline caching: When can ML pipeline caching help, and when can it hide stale data or bad assumptions?",
  "Metadata management: What metadata would you capture for every ML run to support audit, rollback, debugging, and compliance?",
  "Champion-challenger: How would you implement a champion-challenger model deployment pattern in production?",
  "Kubernetes control plane: Explain what happens from kubectl apply to a running pod, including API server, scheduler, kubelet, CNI, and controllers.",
  "StatefulSet vs Deployment: When would you use StatefulSet, Deployment, Job, CronJob, or DaemonSet in real Kubernetes platforms?",
  "CoreDNS incident: Services in a cluster intermittently fail DNS resolution. How would you debug CoreDNS, kube-dns metrics, network policies, and upstream DNS?",
  "CNI troubleshooting: Pods on different nodes cannot communicate. How would you debug CNI, routes, firewall rules, network policies, and node health?",
  "Ingress controller: How would you debug an ingress path returning 404 or 502, from DNS to load balancer to ingress controller to service endpoints?",
  "Kubernetes Secrets: How would you compare Kubernetes Secrets, Secret Manager, External Secrets Operator, Sealed Secrets, and CSI drivers?",
  "Pod affinity: When would you use node selectors, affinity, anti-affinity, topology spread constraints, taints, and tolerations?",
  "Resource quotas: How would you design ResourceQuotas and LimitRanges for a shared cluster without blocking legitimate scaling?",
  "Kubernetes probes: How would you design readiness, liveness, and startup probes for a slow-starting service to avoid cascading failures?",
  "PDB design: How would you use PodDisruptionBudgets during node upgrades, cluster autoscaling, and planned maintenance?",
  "Kubernetes certificate issue: A cluster has certificate or webhook TLS failures. How would you debug certificate chain, rotation, admission webhooks, and API server errors?",
  "Docker image design: How would you build secure, small, reproducible Docker images for production services?",
  "Container startup: A container works locally but fails in Kubernetes. How would you debug entrypoint, env vars, filesystem, permissions, and security context?",
  "Helm rollback: A Helm upgrade failed and left resources in a partial state. How would you recover and prevent it next time?",
  "DevOps lifecycle: Explain how you would design the full SDLC for a cloud-native service from code commit to production operations.",
  "Branching strategy: What Git branching and release strategy would you recommend for platform modules and application services?",
  "Artifact promotion: How would you promote artifacts across environments without rebuilding and while preserving provenance?",
  "Secrets in CI/CD: How would you prevent secrets leakage in Jenkins, GitHub Actions, GitLab CI, and Cloud Build?",
  "Blue-green deployment: When would you choose blue-green over canary, and what GCP/GKE components would you use?",
  "Deployment rollback criteria: What metrics and business signals should automatically stop or roll back a deployment?",
  "Infrastructure testing: How would you test Terraform modules, Kubernetes manifests, Helm charts, and policy-as-code before production?",
  "Configuration drift: How would you detect and prevent configuration drift across applications, clusters, and cloud infrastructure?",
  "Immutable infrastructure: What does immutable infrastructure mean in cloud platforms, and when is mutable infrastructure still acceptable?",
  "Disaster recovery testing: How would you design a DR test that proves backup, restore, DNS failover, application recovery, and stakeholder communication?",
  "SRE toil: Give examples of toil in DevOps/SRE work and explain how you would measure and reduce it with automation.",
  "Error budget policy: How would you create an error budget policy that balances feature velocity and reliability?",
  "Capacity planning math: What inputs would you use to forecast GKE capacity for CPU, memory, network, storage, and regional failover?",
  "Incident postmortem quality: What makes a postmortem high quality, and how do you ensure action items actually get completed?",
  "Observability maturity: How would you assess whether an organization has mature observability or just many dashboards?",
  "Distributed tracing: A request crosses API gateway, Cloud Run, GKE, Pub/Sub, and Cloud SQL. How would you make tracing useful end to end?",
  "Log correlation: How would you design correlation IDs and structured logging across microservices and async Pub/Sub workflows?",
  "Alert fatigue: You inherit 500 alerts and noisy on-call. How would you rationalize alerts using SLOs and ownership?",
  "Security baseline: What minimum security baseline would you enforce for every new GCP project?",
  "IAM troubleshooting: A workload gets permission denied only in production. How would you debug IAM policy, service accounts, Workload Identity, org policy, and audit logs?",
  "WAF exceptions: A Cloud Armor WAF rule blocks legitimate traffic. How would you investigate, create exceptions, and avoid weakening security?",
  "Vulnerability management: How would you run vulnerability management for containers, VMs, dependencies, and base images?",
  "Network segmentation: How would you segment environments and teams using VPCs, Shared VPC, firewall rules, folders, and projects?",
  "MTU issue: An application has intermittent failures over VPN or interconnect due to packet size. How would you identify and fix MTU problems?",
  "TLS rotation: How would you rotate TLS certificates for production ingress without downtime?",
  "REST API automation: How would you design a REST API that allows teams to request infrastructure safely?",
  "SDK automation: Compare using Terraform, gcloud, REST APIs, and Python SDKs for platform automation. When would you choose each?",
  "Bash vs Python: When is Bash acceptable for automation, and when should you rewrite it in Python or Go?",
  "Go services: If asked to build a Kubernetes controller or CLI in Go, how would you approach the design even if Go is not your primary language?",
  "Platform roadmap: What would your first 90 days look like as a senior platform engineer joining a product company?",
  "Stakeholder tradeoff: Product wants faster releases, security wants stricter gates, and SRE wants fewer incidents. How would you align them?"
];
let questionNumber = 1;
let interviewNumber = 1;
let submittingFromMic = false;
let interviews = [];
let questionBankIndex = 0;
let usedQuestionKeys = [];
let practicePlan = [];
let mockInterviewSets = [];
let largeQuestionBank = [];
let progressHistory = [];

function createInterview(number) {
  return {
    number,
    questionNumber: 1,
    question: "This is a mock interview. Click New question to generate a random DevOps, MLOps, Kubernetes, GCP, Terraform, Python, or scenario-based question.",
    answerDraft: "",
    finalFeedback: "",
    history: [],
    answers: []
  };
}

function currentInterview() {
  if (!interviews[interviewNumber - 1]) {
    interviews[interviewNumber - 1] = createInterview(interviewNumber);
  }
  return interviews[interviewNumber - 1];
}

function setBusy(button, busy, text) {
  button.disabled = busy;
  if (text) button.textContent = text;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    role: els.role.value,
    level: els.level.value,
    topic: els.topic.value,
    cvText: els.cvText.value,
    jdText: els.jdText.value,
    interviewNumber,
    interviews,
    progressHistory,
    questionBankIndex,
    usedQuestionKeys,
    practiceDay: els.practiceDay.value,
    mockSet: els.mockSet.value,
    questionOrder: els.questionOrder.value,
    autoNext: els.autoNext.checked,
    interviewMode: currentMode()
  }));
}

function loadState() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  els.role.value = saved.role || els.role.value;
  els.level.value = saved.level || els.level.value;
  els.topic.value = !saved.topic || saved.topic === els.topic.defaultValue
    ? defaultFocusAreas
    : saved.topic;
  els.cvText.value = !saved.cvText || saved.cvText.includes("Paste the full CV text here")
    ? defaultCvText
    : saved.cvText;
  els.jdText.value = saved.jdText || defaultTargetSkills;
  els.autoNext.checked = saved.autoNext !== false;
  els.questionOrder.value = saved.questionOrder || "random";
  setMode(saved.interviewMode || "live");
  interviewNumber = Number(saved.interviewNumber || 1);
  interviews = Array.isArray(saved.interviews) && saved.interviews.length
    ? saved.interviews
    : [createInterview(1)];
  progressHistory = Array.isArray(saved.progressHistory) ? saved.progressHistory : [];
  questionBankIndex = Number(saved.questionBankIndex || 0);
  usedQuestionKeys = Array.isArray(saved.usedQuestionKeys) ? saved.usedQuestionKeys : [];
  els.practiceDay.value = saved.practiceDay || "all";
  els.mockSet.value = saved.mockSet || "all";
  questionNumber = currentInterview().questionNumber || 1;
  renderInterview();
  updateModeUi();
}

function captureInterviewState() {
  const session = currentInterview();
  session.questionNumber = questionNumber;
  session.question = els.question.textContent;
  session.answerDraft = els.answer.value;
  session.finalFeedback = els.feedbackOutput.innerHTML;
}

function renderInterview() {
  const session = currentInterview();
  questionNumber = session.questionNumber || 1;
  els.interviewLabel.textContent = `Interview ${interviewNumber}`;
  els.question.textContent = session.question || "This is a mock interview. Click New question to generate a random DevOps, MLOps, Kubernetes, GCP, Terraform, Python, or scenario-based question.";
  els.answer.value = session.answerDraft || "";
  finalTranscript = els.answer.value;
  els.feedbackOutput.innerHTML = session.finalFeedback || "Your final interview feedback will appear here after you end the interview.";
  els.previousInterview.disabled = interviewNumber <= 1;
  renderInterviewList();
  renderProgressHistory();
}

function renderInterviewList() {
  els.interviewList.innerHTML = interviews.map((session, index) => {
    const number = index + 1;
    const answered = session.answers?.length || 0;
    const hasFeedback = Boolean(session.finalFeedback && !session.finalFeedback.includes("Answer Saved"));
    const active = number === interviewNumber ? " active" : "";
    const status = hasFeedback ? "Feedback ready" : `${answered} answer${answered === 1 ? "" : "s"}`;
    return `<button class="interview-jump${active}" type="button" data-interview="${number}">
      <span>Interview ${number}</span>
      <small>${status}</small>
    </button>`;
  }).join("");
}

function currentPracticeLabel() {
  if (els.mockSet.value === "random-bank") return "Random full bank mock interview";
  if (els.mockSet.value === "custom-jd") return "Custom JD mock interview";
  if (els.mockSet.value.startsWith("day-")) {
    return `Day ${els.mockSet.value.replace("day-", "")} mock interview`;
  }
  if (els.mockSet.value !== "all") {
    const set = mockInterviewSets.find((item) => item.id === els.mockSet.value);
    return set?.title || "Mock interview set";
  }
  if (els.practiceDay.value !== "all") return `Day ${els.practiceDay.value} practice`;
  return "All questions";
}

function plainTextFromHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html || "";
  return div.innerText.trim();
}

function archiveCurrentInterview() {
  const session = currentInterview();
  const feedbackHtml = session.finalFeedback || els.feedbackOutput.innerHTML;
  const record = {
    id: session.archiveId || `interview-${Date.now()}`,
    completedAt: new Date().toISOString(),
    interviewNumber,
    role: els.role.value,
    level: els.level.value,
    practice: currentPracticeLabel(),
    questionCount: session.answers?.length || 0,
    answers: session.answers || [],
    feedbackHtml,
    feedbackText: plainTextFromHtml(feedbackHtml),
    jdSnapshot: els.jdText.value.slice(0, 2000),
    focusSnapshot: els.topic.value
  };
  session.archiveId = record.id;
  progressHistory = [
    record,
    ...progressHistory.filter((item) => item.id !== record.id)
  ].slice(0, 50);
  renderProgressHistory();
}

function renderProgressHistory() {
  if (!progressHistory.length) {
    els.progressHistory.innerHTML = `<p class="history-empty">End an interview to save progress.</p>`;
    return;
  }

  els.progressHistory.innerHTML = progressHistory.map((record) => {
    const date = new Date(record.completedAt).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    return `<button class="history-item" type="button" data-history="${record.id}">
      <span>${escapeHtml(record.practice || `Interview ${record.interviewNumber}`)}</span>
      <small>${escapeHtml(date)} · ${record.questionCount || 0} answers</small>
    </button>`;
  }).join("");
}

function currentMode() {
  return document.querySelector("input[name='interviewMode']:checked")?.value || "live";
}

function setMode(mode) {
  els.modeInputs.forEach((input) => {
    input.checked = input.value === mode;
  });
}

function updateModeUi() {
  const liveMode = currentMode() === "live";
  els.autoNext.checked = liveMode;
  els.autoNext.disabled = true;
  els.feedbackButton.textContent = liveMode ? "Submit answer" : "Save answer";
  els.micState.textContent = liveMode
    ? "Live mode: stop mic to submit"
    : "Manual mode: stop mic, then click Save answer";
}

function contextPayload() {
  return {
    role: els.role.value,
    level: els.level.value,
    topic: els.topic.value,
    cvText: els.cvText.value,
    jdText: els.jdText.value,
    interviewNumber
  };
}

function formatTranscript() {
  return currentInterview().answers.map((item, index) => [
    `Question ${index + 1}: ${item.question}`,
    `Answer ${index + 1}: ${item.answer}`
  ].join("\n")).join("\n\n");
}

function buildJdQuestions() {
  const jd = `${els.jdText.value} ${els.topic.value}`.toLowerCase();
  const questions = [
    "Based on this JD, which three requirements are the highest hiring signal for you, and how would you prove each one from your past experience?"
  ];

  if (/gke|google kubernetes|kubernetes/.test(jd)) {
    questions.push("This JD emphasizes GKE/Kubernetes. Describe a production GKE incident you handled, the exact signals you checked, and how you prevented recurrence.");
  }
  if (/terraform|iac|infrastructure as code|sentinel|opa|policy as code/.test(jd)) {
    questions.push("This JD emphasizes Terraform. How would you design reusable Terraform modules, remote state, approvals, and policy checks for enterprise GCP teams?");
  }
  if (/sre|slo|sli|sla|error budget|reliability/.test(jd)) {
    questions.push("This JD emphasizes SRE. Pick one user-facing service and define SLIs, SLOs, error budget policy, alerting, and incident response.");
  }
  if (/prometheus|grafana|opentelemetry|observability|monitoring|logging|trace/.test(jd)) {
    questions.push("This JD emphasizes observability. How would you connect metrics, logs, traces, dashboards, and alerts to reduce MTTR?");
  }
  if (/argocd|gitops|cloud build|jenkins|github actions|gitlab/.test(jd)) {
    questions.push("This JD emphasizes CI/CD or GitOps. Design a safe promotion workflow from commit to production with rollback and auditability.");
  }
  if (/iam|security|workload identity|secret|cloud armor|waf|binary authorization|supply chain/.test(jd)) {
    questions.push("This JD emphasizes cloud security. How would you secure GKE workloads, IAM permissions, secrets, image supply chain, and ingress traffic?");
  }
  if (/python|automation|script|sdk|api/.test(jd)) {
    questions.push("This JD emphasizes Python automation. What platform operations would you automate first, and how would you design the script or service?");
  }
  if (/platform engineering|developer platform|self-service|golden path|backstage|devex/.test(jd)) {
    questions.push("This JD emphasizes platform engineering. What self-service golden paths would you build, and what guardrails would you enforce?");
  }
  if (/vertex|mlops|mlflow|kubeflow|model serving|gpu|ai infrastructure/.test(jd)) {
    questions.push("This JD mentions AI infrastructure or MLOps. How would you run model serving on Kubernetes or Vertex AI with monitoring, rollback, and cost control?");
  }
  if (/vpc|network|dns|load balancer|interconnect|vpn|firewall|tcp|http/.test(jd)) {
    questions.push("This JD emphasizes networking. Walk me through debugging a production connectivity issue across DNS, load balancer, firewall, VPC, and pod networking.");
  }
  if (/landing zone|shared vpc|org polic|organization|folder|governance|guardrail/.test(jd)) {
    questions.push("This JD emphasizes GCP governance. How would you design landing zones, folder/project structure, Shared VPC, org policies, logging, and IAM guardrails?");
  }
  if (/finops|cost|billing|budget|rightsizing|committed use|cud|optimization/.test(jd)) {
    questions.push("This JD emphasizes FinOps. How would you investigate a sudden GCP cost spike and build cost controls without reducing reliability?");
  }
  if (/disaster recovery|backup|restore|rto|rpo|business continuity|dr /.test(jd)) {
    questions.push("This JD emphasizes DR. How would you design and test backup, restore, RTO/RPO, failover, and game-day practices for a critical GCP service?");
  }
  if (/incident commander|stakeholder|postmortem|runbook|on-call|oncall|communication/.test(jd)) {
    questions.push("This JD emphasizes incident leadership. How would you run a major incident from detection to mitigation, communication, RCA, and follow-up actions?");
  }
  if (/linux|tls|certificate|kernel|process|tcpdump|systemd|performance tuning/.test(jd)) {
    questions.push("This JD emphasizes systems fundamentals. How would you debug a Linux or TLS/network performance issue behind a cloud load balancer?");
  }
  if (/cloud deploy|progressive|canary|blue.?green|feature flag|argo rollouts/.test(jd)) {
    questions.push("This JD emphasizes progressive delivery. How would you implement canary or blue-green releases with metric-based rollback on GCP/GKE?");
  }
  if (/gatekeeper|kyverno|admission|policy controller|pod security/.test(jd)) {
    questions.push("This JD emphasizes Kubernetes policy. How would you enforce security and reliability policies with admission controls while keeping developer velocity?");
  }
  if (/bigquery|composer|dataflow|data pipeline|analytics/.test(jd)) {
    questions.push("This JD touches data platform reliability. How would you support reliable BigQuery or data pipeline infrastructure as a platform engineer?");
  }

  return questions;
}

function uniqueQuestions(questions) {
  const seen = new Set();
  return questions.filter((question) => {
    const key = questionKey(question);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildCustomJdMockQuestions() {
  const role = els.role.value || "this role";
  const jd = els.jdText.value.trim() || defaultTargetSkills;
  const jdQuestions = buildJdQuestions();
  const jdPreview = jd
    .split(/\s+/)
    .slice(0, 34)
    .join(" ");
  const baseQuestions = [
    `Custom JD fit: Based on this JD, what are the top five requirements for ${role}, and which projects from your CV prove each one?`,
    `Custom JD system design: Design a production platform for this JD's environment. Cover GCP architecture, Kubernetes/GKE, Terraform, CI/CD, observability, security, rollback, and cost controls.`,
    `Custom JD incident: Pick the most critical service implied by this JD. It has a production outage. Walk me through detection, triage, mitigation, stakeholder communication, RCA, and prevention.`,
    `Custom JD Terraform: How would you structure Terraform modules, remote state, workspaces/environments, approvals, drift detection, and policy checks for this company's platform?`,
    `Custom JD Kubernetes: For the workloads described in this JD, how would you design namespaces, RBAC, network policies, autoscaling, ingress, deployment strategy, and troubleshooting runbooks?`,
    `Custom JD security: What are the biggest IAM, secrets, container, supply-chain, network, and audit risks in this role, and how would you reduce them in the first 90 days?`,
    `Custom JD observability: What SLIs, SLOs, dashboards, alerts, logs, traces, and runbooks would you create for the systems described in this JD?`,
    `Custom JD closing round: Why are you a strong match for this JD? Give a concise senior-level answer using your GCP, Kubernetes, Terraform, SRE, automation, and platform experience. JD signal: ${jdPreview}...`
  ];

  return uniqueQuestions([
    jdQuestions[0],
    ...baseQuestions.slice(0, 7),
    ...jdQuestions.slice(1),
    baseQuestions[7]
  ]).slice(0, 8);
}

function questionPool() {
  if (els.mockSet.value !== "all") {
    if (els.mockSet.value === "random-bank") {
      return uniqueQuestions([
        ...largeQuestionBank.map((item) => item.question),
        ...questionBank
      ]);
    }
    if (els.mockSet.value === "custom-jd") return buildCustomJdMockQuestions();
    if (els.mockSet.value.startsWith("day-")) {
      const dayNumber = els.mockSet.value.replace("day-", "");
      const day = practicePlan.find((item) => String(item.day) === dayNumber);
      if (day) return day.questions.map((item) => item.question);
    }
    const set = mockInterviewSets.find((item) => item.id === els.mockSet.value);
    if (set) return set.questions.map((item) => item.question);
  }
  if (els.practiceDay.value !== "all") {
    const day = practicePlan.find((item) => String(item.day) === els.practiceDay.value);
    if (day) return day.questions.map((item) => item.question);
  }
  return uniqueQuestions([
    ...buildJdQuestions(),
    ...largeQuestionBank.map((item) => item.question),
    ...questionBank
  ]);
}

function activeQuestionPoolLabel(poolLength) {
  if (els.mockSet.value === "random-bank") return `random full bank question ${usedQuestionKeys.length}/${poolLength}`;
  if (els.mockSet.value === "custom-jd") return `custom JD question ${questionBankIndex}/${poolLength}`;
  if (els.mockSet.value.startsWith("day-")) return `day mock interview question ${questionBankIndex}/${poolLength}`;
  if (els.mockSet.value !== "all") return `mock set question ${questionBankIndex}/${poolLength}`;
  if (els.practiceDay.value !== "all") return `day plan question ${questionBankIndex}/${poolLength}`;
  return `bank question ${questionBankIndex}/${poolLength}`;
}

async function loadPracticeSources() {
  try {
    const response = await fetch("/api/question-bank");
    const data = await response.json();
    largeQuestionBank = Array.isArray(data.questions) ? data.questions : [];
  } catch {
    largeQuestionBank = [];
  }

  try {
    const response = await fetch("/30-day-plan.json");
    practicePlan = await response.json();
    for (const day of practicePlan) {
      const option = document.createElement("option");
      option.value = String(day.day);
      option.textContent = `Day ${day.day}`;
      els.practiceDay.appendChild(option);

      const mockOption = document.createElement("option");
      mockOption.value = `day-${day.day}`;
      mockOption.textContent = `Day ${day.day} mock interview`;
      els.mockSet.appendChild(mockOption);
    }
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    els.practiceDay.value = saved.practiceDay || "all";
  } catch {
    practicePlan = [];
  }

  try {
    const response = await fetch("/mock-interview-sets.json");
    mockInterviewSets = await response.json();
    for (const set of mockInterviewSets) {
      const option = document.createElement("option");
      option.value = set.id;
      option.textContent = set.title.replace(/^Mock Interview /, "Interview ");
      els.mockSet.appendChild(option);
    }
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    els.mockSet.value = saved.mockSet || "all";
  } catch {
    mockInterviewSets = [];
  }
}

function questionKey(question) {
  return String(question || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function markdownToHtml(markdown) {
  const lines = String(markdown || "").split("\n");
  const html = [];
  let inList = false;

  for (const line of lines) {
    if (line.startsWith("## ") || /^\*\*[^*]+\*\*$/.test(line.trim())) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      const heading = line.startsWith("## ")
        ? line.slice(3)
        : line.trim().replace(/^\*\*|\*\*$/g, "");
      html.push(`<h2>${escapeHtml(heading)}</h2>`);
    } else if (/^\s*[-*]\s+/.test(line)) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${escapeHtml(line.replace(/^\s*[-*]\s+/, ""))}</li>`);
    } else if (line.trim()) {
      if (inList) {
        html.push("</ul>");
        inList = false;
      }
      html.push(`<p>${escapeHtml(line)}</p>`);
    }
  }

  if (inList) html.push("</ul>");
  return html.join("");
}

function setQuestionFromText(question) {
  questionNumber += 1;
  els.question.textContent = question.replace(/^["']|["']$/g, "");
  els.answer.value = "";
  finalTranscript = "";
  els.micState.textContent = `Interview question ${questionNumber} ready. ${activeQuestionPoolLabel(questionPool().length)}`;
  const session = currentInterview();
  session.questionNumber = questionNumber;
  session.question = els.question.textContent;
  session.answerDraft = "";
  session.history.push(`Question ${questionNumber}: ${els.question.textContent}`);
  saveState();
}

function loadFastQuestion() {
  const pool = questionPool();
  if (!pool.length) {
    els.feedbackOutput.innerHTML = markdownToHtml("## No Questions\nNo questions are available for the selected mock interview.");
    return;
  }

  const used = new Set(usedQuestionKeys);

  if (used.size >= pool.length) {
    used.clear();
    usedQuestionKeys = [];
  }

  let selected = "";
  const randomMode = els.questionOrder.value === "random" || els.mockSet.value === "random-bank";

  if (randomMode) {
    const available = pool.filter((candidate) => !used.has(questionKey(candidate)));
    selected = available[Math.floor(Math.random() * available.length)];
    questionBankIndex = pool.findIndex((candidate) => questionKey(candidate) === questionKey(selected)) + 1;
  } else {
    for (let offset = 0; offset < pool.length; offset += 1) {
      const index = (questionBankIndex + offset) % pool.length;
      const candidate = pool[index];
      if (!used.has(questionKey(candidate))) {
        selected = candidate;
        questionBankIndex = index + 1;
        break;
      }
    }
  }

  if (!selected) {
    selected = pool[questionBankIndex % pool.length];
    questionBankIndex += 1;
  }

  usedQuestionKeys.push(questionKey(selected));
  setQuestionFromText(selected);
}

async function api(path, payload) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Request failed.");
  return data;
}

async function checkHealth() {
  try {
    const response = await fetch("/api/health");
    const data = await response.json();
    els.status.classList.toggle("ok", Boolean(data.ok));
    els.status.classList.toggle("bad", !data.ok);
    els.statusText.textContent = data.ok ? `Ollama ready: ${data.model}` : "Ollama not reachable";
  } catch {
    els.status.classList.add("bad");
    els.statusText.textContent = "Ollama not reachable";
  }
}

async function loadNextQuestion(button = els.newQuestion) {
  setBusy(button, true, "Thinking");
  try {
    const data = await api("/api/question", {
      ...contextPayload(),
      history: currentInterview().history
    });
    setQuestionFromText(data.question);
  } catch (error) {
    els.feedbackOutput.innerHTML = markdownToHtml(`## Error\n${error.message}`);
  } finally {
    setBusy(button, false, button === els.feedbackButton ? "Save answer" : "New question");
  }
}

async function submitAnswer() {
  if (els.feedbackButton.disabled) return;
  const liveMode = currentMode() === "live";
  const answer = els.answer.value.trim();
  if (!answer) {
    els.feedbackOutput.innerHTML = markdownToHtml("## Missing Answer\nPlease record or type an answer first.");
    return;
  }

  const session = currentInterview();
  session.answers.push({
    question: els.question.textContent,
    answer
  });
  session.history.push(`Question ${questionNumber}: ${els.question.textContent}\nAnswer: ${answer}`);
  session.answerDraft = "";
  els.feedbackOutput.innerHTML = markdownToHtml(`## Answer Saved\nSaved answer ${session.answers.length}. Final feedback will come when you end the interview.`);
  session.finalFeedback = els.feedbackOutput.innerHTML;
  saveState();

  try {
    if (liveMode || els.autoNext.checked) {
      loadFastQuestion();
    }
  } catch (error) {
    els.feedbackOutput.innerHTML = markdownToHtml(`## Error\n${error.message}`);
  } finally {
    setBusy(els.feedbackButton, false, liveMode ? "Submit answer" : "Save answer");
    submittingFromMic = false;
  }
}

function setupSpeech() {
  if (!SpeechRecognition) {
    els.micButton.disabled = true;
    els.micState.textContent = "Speech input unavailable in this browser";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onstart = () => {
    listening = true;
    finalTranscript = els.answer.value.trim();
    els.micButton.textContent = "Stop mic";
    els.micButton.classList.add("active");
    els.micState.textContent = "Listening";
  };

  recognition.onresult = (event) => {
    let interim = "";
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const text = event.results[i][0].transcript;
      if (event.results[i].isFinal) finalTranscript += `${finalTranscript ? " " : ""}${text.trim()}`;
      else interim += text;
    }
    els.answer.value = `${finalTranscript}${interim ? ` ${interim}` : ""}`.trim();
  };

  recognition.onerror = (event) => {
    els.micState.textContent = event.error === "not-allowed" ? "Microphone blocked" : "Speech input stopped";
  };

  recognition.onend = () => {
    listening = false;
    els.micButton.textContent = "Start mic";
    els.micButton.classList.remove("active");
    if (els.micState.textContent === "Listening") els.micState.textContent = "Microphone idle";
    if (currentMode() === "live" && !submittingFromMic && els.answer.value.trim()) {
      submittingFromMic = true;
      submitAnswer();
    }
  };
}

els.micButton.addEventListener("click", () => {
  if (!recognition) return;
  if (listening) recognition.stop();
  else recognition.start();
});

els.clearButton.addEventListener("click", () => {
  els.answer.value = "";
  finalTranscript = "";
  els.feedbackOutput.textContent = "Your final interview feedback will appear here after you end the interview.";
  captureInterviewState();
  saveState();
});

els.saveContext.addEventListener("click", () => {
  questionBankIndex = 0;
  usedQuestionKeys = [];
  saveState();
  els.saveContext.textContent = "Saved";
  setTimeout(() => {
    els.saveContext.textContent = "Save CV and JD";
  }, 1200);
});

els.importJd.addEventListener("click", async () => {
  const url = els.jdUrl.value.trim();
  if (!url) {
    els.feedbackOutput.innerHTML = markdownToHtml("## Missing URL\nPaste a public job URL first.");
    return;
  }

  setBusy(els.importJd, true, "Importing");
  els.feedbackOutput.textContent = "Importing job description...";
  try {
    const data = await api("/api/import-jd-url", { url });
    els.jdText.value = data.text;
    questionBankIndex = 0;
    usedQuestionKeys = [];
    interviews = [createInterview(1)];
    interviewNumber = 1;
    renderInterview();
    saveState();
    els.feedbackOutput.innerHTML = markdownToHtml("## JD Imported\nQuestion bank updated from this job description. Click New question to start.");
  } catch (error) {
    els.feedbackOutput.innerHTML = markdownToHtml(`## Import Failed\n${error.message}\n\nFor blocked sites, paste the JD text manually into the Job description box.`);
  } finally {
    setBusy(els.importJd, false, "Import JD from URL");
  }
});

els.modeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    updateModeUi();
    saveState();
  });
});

els.nextInterview.addEventListener("click", () => {
  captureInterviewState();
  interviewNumber += 1;
  if (!interviews[interviewNumber - 1]) {
    interviews[interviewNumber - 1] = createInterview(interviewNumber);
  }
  renderInterview();
  saveState();
});

els.addInterview.addEventListener("click", () => {
  captureInterviewState();
  interviewNumber = interviews.length + 1;
  interviews.push(createInterview(interviewNumber));
  renderInterview();
  saveState();
});

els.previousInterview.addEventListener("click", () => {
  if (interviewNumber <= 1) return;
  captureInterviewState();
  interviewNumber -= 1;
  renderInterview();
  saveState();
});

els.resetInterview.addEventListener("click", () => {
  interviews[interviewNumber - 1] = createInterview(interviewNumber);
  questionNumber = 1;
  finalTranscript = "";
  submittingFromMic = false;
  renderInterview();
  els.feedbackOutput.innerHTML = markdownToHtml("## Interview Reset\nCurrent interview reset. Click New question to start again.");
  currentInterview().finalFeedback = els.feedbackOutput.innerHTML;
  saveState();
});

els.interviewList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-interview]");
  if (!button) return;
  captureInterviewState();
  interviewNumber = Number(button.dataset.interview);
  renderInterview();
  saveState();
});

els.progressHistory.addEventListener("click", (event) => {
  const button = event.target.closest("[data-history]");
  if (!button) return;
  const record = progressHistory.find((item) => item.id === button.dataset.history);
  if (!record) return;
  els.feedbackOutput.innerHTML = record.feedbackHtml || markdownToHtml("## Saved Feedback\nNo feedback text saved.");
  els.question.textContent = `${record.practice || "Saved interview"} · ${record.questionCount || 0} answered questions`;
  els.answer.value = (record.answers || []).map((item, index) => [
    `Question ${index + 1}: ${item.question}`,
    `Answer ${index + 1}: ${item.answer}`
  ].join("\n")).join("\n\n");
  finalTranscript = els.answer.value;
  els.micState.textContent = `Viewing saved progress from ${new Date(record.completedAt).toLocaleString()}`;
});

els.newQuestion.addEventListener("click", async () => {
  loadFastQuestion();
});

els.feedbackButton.addEventListener("click", async () => {
  await submitAnswer();
});

els.endInterview.addEventListener("click", async () => {
  captureInterviewState();
  setBusy(els.endInterview, true, "Building report");
  els.feedbackOutput.textContent = "Building final feedback from the full interview...";
  try {
    const data = await api("/api/final-feedback", {
      ...contextPayload(),
      transcript: formatTranscript()
    });
    els.feedbackOutput.innerHTML = markdownToHtml(data.feedback);
    currentInterview().finalFeedback = els.feedbackOutput.innerHTML;
    archiveCurrentInterview();
    saveState();
  } catch (error) {
    els.feedbackOutput.innerHTML = markdownToHtml(`## Error\n${error.message}`);
  } finally {
    setBusy(els.endInterview, false, "End interview & feedback");
  }
});

els.copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(els.feedbackOutput.innerText);
  els.copyButton.textContent = "Copied";
  setTimeout(() => {
    els.copyButton.textContent = "Copy";
  }, 1200);
});

setupSpeech();
loadPracticeSources().then(() => {
  loadState();
  checkHealth();
});

[els.role, els.level, els.topic, els.cvText, els.jdText, els.questionOrder, els.autoNext].forEach((input) => {
  input.addEventListener("change", saveState);
});

els.practiceDay.addEventListener("change", () => {
  if (els.practiceDay.value !== "all") els.mockSet.value = "all";
  questionBankIndex = 0;
  usedQuestionKeys = [];
  interviews = [createInterview(1)];
  interviewNumber = 1;
  renderInterview();
  saveState();
});

els.mockSet.addEventListener("change", () => {
  if (els.mockSet.value !== "all") els.practiceDay.value = "all";
  questionBankIndex = 0;
  usedQuestionKeys = [];
  interviews = [createInterview(1)];
  interviewNumber = 1;
  renderInterview();
  saveState();
});

els.answer.addEventListener("input", () => {
  currentInterview().answerDraft = els.answer.value;
  saveState();
});
