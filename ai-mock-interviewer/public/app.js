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
  technology: document.querySelector("#technology"),
  questionOrder: document.querySelector("#questionOrder"),
  practiceDay: document.querySelector("#practiceDay"),
  mockSet: document.querySelector("#mockSet"),
  role: document.querySelector("#role"),
  level: document.querySelector("#level"),
  topic: document.querySelector("#topic"),
  cvText: document.querySelector("#cvText"),
  jdText: document.querySelector("#jdText"),
  jdUrl: document.querySelector("#jdUrl"),
  jdPdf: document.querySelector("#jdPdf"),
  autoNext: document.querySelector("#autoNext"),
  question: document.querySelector("#question"),
  questionCounter: document.querySelector("#questionCounter"),
  answerCounter: document.querySelector("#answerCounter"),
  sessionProgress: document.querySelector("#sessionProgress"),
  answerLabel: document.querySelector("#answerLabel"),
  answer: document.querySelector("#answer"),
  answerCount: document.querySelector("#answerCount"),
  previousQuestion: document.querySelector("#previousQuestion"),
  nextQuestion: document.querySelector("#nextQuestion"),
  newQuestion: document.querySelector("#newQuestion"),
  micButton: document.querySelector("#micButton"),
  clearButton: document.querySelector("#clearButton"),
  feedbackButton: document.querySelector("#feedbackButton"),
  endInterview: document.querySelector("#endInterview"),
  feedbackOutput: document.querySelector("#feedbackOutput"),
  micState: document.querySelector("#micState"),
  copyButton: document.querySelector("#copyButton"),
  importJd: document.querySelector("#importJd"),
  importJdPdf: document.querySelector("#importJdPdf"),
  saveContext: document.querySelector("#saveContext")
};

const STORAGE_KEY = "aiMockInterviewerState";
const ANSWER_RESET_VERSION = "2026-06-27-start-fresh";
const technologyLabels = {
  all: "All technologies",
  kubernetes: "Kubernetes / GKE",
  docker: "Docker / Containers",
  gcp: "Google Cloud Platform",
  terraform: "Terraform / IaC",
  python: "Python automation",
  fastapi: "FastAPI backend",
  go: "Go programming",
  scripting: "Scripting & automation",
  coding: "Coding exercises",
  sre: "SRE / reliability",
  mlops: "MLOps / Vertex AI",
  cicd: "CI/CD / GitOps",
  observability: "Observability",
  security: "Cloud / DevSecOps security",
  networking: "Cloud networking",
  linux: "Linux / systems",
  platform: "Platform engineering",
  "tech-risk-technical": "Technology risk - technical",
  "tech-risk-behavioral": "Technology risk - behavioural",
  scenario: "Scenario-based questions"
};
const technologyMatchers = {
  kubernetes: /\b(kubernetes|k8s|gke|pod|deployment|statefulset|daemonset|helm|kubectl|cluster|node pool|namespace|ingress|service mesh|istio|kserve|kubeflow)\b/i,
  docker: /\b(docker|dockerfile|container image|image size|build context|cmd|entrypoint|multi-stage|multistage|base image|distroless|alpine|container security|image scanning|docker build|docker run|docker compose|layer|cache|registry)\b/i,
  gcp: /\b(gcp|google cloud|gke|cloud run|compute engine|cloud storage|pub\/sub|pubsub|cloud sql|alloydb|bigquery|dataflow|composer|cloud build|cloud deploy|vertex ai|shared vpc|cloud armor|cloud dns|organization polic|service account)\b/i,
  terraform: /\b(terraform|infrastructure as code|iac|hcl|remote state|state file|workspace|sentinel|opa|policy as code|drift)\b/i,
  python: /\b(python|pytest|pip|virtualenv|fastapi|flask|django|boto3|google cloud sdk|automation script|rest api|exception handling|decorator|generator|asyncio|pandas|cloud automation|kubernetes client)\b/i,
  fastapi: /\b(fastapi|pydantic|uvicorn|asgi|starlette|dependency injection|background task|middleware|openapi|swagger|async endpoint|request validation|response model|api versioning)\b/i,
  go: /\b(go|golang|goroutine|channel|context|interface|struct|pointer|slice|map|error handling|go module|cobra|client-go|kubernetes controller|operator|controller-runtime|concurrency|http server)\b/i,
  scripting: /\b(script|scripting|automation|automate|python|bash|shell|powershell|cli|sdk|api|cron|scheduled job|json|yaml|csv)\b/i,
  coding: /\b(write|code|coding|implement|function|class|algorithm|script|program|parse|return|input|output|unit test)\b/i,
  sre: /\b(sre|reliability|sli|slo|sla|error budget|incident|postmortem|rca|on-call|oncall|availability|capacity planning|chaos|mttr|toil|runbook|disaster recovery|rto|rpo)\b/i,
  mlops: /\b(mlops|machine learning|vertex ai|mlflow|kubeflow|model|inference|feature store|training pipeline|data drift|concept drift|gpu|kserve|seldon|bentoml|tensorflow serving|torchserve)\b/i,
  cicd: /\b(ci\/cd|cicd|continuous integration|continuous delivery|continuous deployment|gitops|argocd|argo cd|jenkins|github actions|gitlab|cloud build|cloud deploy|pipeline|artifact|canary|blue.?green|rollback)\b/i,
  observability: /\b(observability|prometheus|grafana|opentelemetry|open telemetry|monitoring|logging|metrics|tracing|trace|dashboard|alert|elk|opensearch|cloud operations|cloud monitoring)\b/i,
  security: /\b(security|devsecops|iam|rbac|workload identity|secret|vault|cloud armor|waf|binary authorization|vulnerability|sast|dast|supply chain|sbom|gatekeeper|kyverno|admission|least privilege|encryption|kms)\b/i,
  networking: /\b(network|networking|vpc|subnet|dns|load balancer|load balancing|firewall|vpn|interconnect|tcp|udp|http|https|tls|nat|routing|route|ingress|egress|gateway|proxy|envoy|apigee)\b/i,
  linux: /\b(linux|kernel|systemd|process|filesystem|memory|cpu|disk|inode|shell|bash|tcpdump|strace|lsof|top|vmstat|iostat|permission|certificate|tls)\b/i,
  platform: /\b(platform engineering|developer platform|internal developer platform|idp|self-service|golden path|backstage|developer experience|devex|landing zone|governance|multi-tenant)\b/i,
  "tech-risk-technical": /\b(technology risk|risk assessment|risk register|heatmap|control|preventive|detective|corrective|iso 27001|nist|cobit|fair|audit|compliance|remediation|brd|prd|architecture|sdlc|change risk|cloud risk|incident|near miss|control failure|fmea|scenario analysis)\b/i,
  "tech-risk-behavioral": /\b(behavioral|behavioural|stakeholder|communication|leadership|influenc|senior leadership|trusted advisor|decision|risk culture|conflict|priorit|audit finding|remediation|product|engineering|security|business)\b/i,
  scenario: /\b(scenario|design|troubleshoot|debug|incident|outage|production|failed|failure|latency|unavailable|crash|pending|spike|drift|recover|migration|rollout|rollback|how would you|walk me through|you are|a team|a company)\b/i
};
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
const hiddenTechnologyRiskLeadContext = `Technology Risk Lead hidden JD context:
Drive identification, assessment, and mitigation of technology-related risks across IT, Product, Security, Engineering, and Business teams.
Responsibilities include enterprise technology risk framework design, risk registers, heatmaps, dashboards, application/infrastructure/process risk monitoring, risk assessments for new systems/products/change initiatives, BRD/PRD and architecture risk reviews, preventive/detective/corrective control design and validation, audit/compliance remediation, ISO 27001, NIST, COBIT, FAIR alignment, incident root-cause and systemic risk analysis, risk events/near misses/control failures, stakeholder reporting, automation/tooling, FMEA, scenario analysis, and building a risk-aware culture.
Qualifications include 8-12+ years in technology risk, IT audit, information security, cloud/platform risk, strong SDLC and enterprise architecture understanding, regulated-industry exposure, cloud/DevOps/Agile familiarity, and CISA/CRISC/CISSP-style governance depth.
Key skills: risk assessment, analytical thinking, communication, stakeholder management, problem solving, technical-risk-to-business-impact translation, leadership, influencing, and decision-making.
Success metrics: fewer critical technology risks/incidents, timely closure of audit/risk findings, improved risk visibility/reporting, and adoption of risk frameworks.`;
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
  "Compute Engine SSH troubleshooting: You are not able to SSH into a Compute Engine instance. What could be the reasons, and how would you troubleshoot it?",
  "Compute Engine SSH access: What do we get when we SSH into a Compute Engine instance?",
  "GKE Workload Identity: You have workloads running on GKE. How would you give only one pod access to Cloud Storage?",
  "Service account key security: You know about service account JSON keys. Even if someone has the JSON key, how can you prevent them from creating or accessing resources?",
  "GKE image verification: In GKE, anyone can deploy a Docker image. How would you ensure that only verified and signed images are deployed?",
  "Hybrid connectivity: How do you connect an on-premises network to a GCP network?",
  "GCP security baseline: What additional security measures would you implement for the GCP environment?",
  "Cloud Logging analysis: You have logs in Cloud Logging. How would you analyze them?",
  "Log automation: Can you automate log analysis or processing?",
  "Cloud Functions and Cloud Run: Have you used Cloud Functions or Cloud Run? Explain use cases and operational considerations.",
  "Datadog: Have you used Datadog, and how would you use it for metrics, logs, traces, dashboards, and alerts?",
  "Cloud Functions latency: A newly created Cloud Function had high latency for a few minutes and then automatically recovered. What could be the reason?",
  "GCP cost optimization: How would you reduce the cost of a GCP environment?",
  "Docker experience: Have you worked on Docker? Explain the workflows and production concerns you handled.",
  "Dockerfiles: Have you written Dockerfiles? What best practices do you follow?",
  "Docker build context: What is Docker build context, and why does it matter for build speed, security, and image contents?",
  "Docker fundamentals: What is Docker, and what problem does it solve?",
  "Dockerfile fundamentals: What is a Dockerfile, and how is it used to build an image?",
  "Docker CMD vs ENTRYPOINT: What is the difference between CMD and ENTRYPOINT?",
  "Docker image optimization: How do you optimize Docker image size?",
  "Docker multi-stage builds: What are multi-stage builds, and when would you use them?",
  "Docker image security: How do you secure Docker images before deploying them?",
  "Kubernetes architecture: Explain the architecture of Kubernetes, including control plane and worker-node components.",
  "Kubernetes workload objects: What are Pods, Deployments, ReplicaSets, StatefulSets, and DaemonSets?",
  "Kubernetes Service types: What is a Service, and how do ClusterIP, NodePort, and LoadBalancer differ?",
  "Kubernetes ConfigMaps and Secrets: What are ConfigMaps and Secrets, and when would you use each?",
  "Kubernetes Ingress: How does Ingress work, and what components are involved?",
  "Kubernetes rolling updates: How do you perform rolling updates and rollbacks?",
  "Kubernetes probes: How do liveness and readiness probes work?",
  "Kubernetes node failure: What happens when a node fails, and how do workloads recover?",
  "GKE Cluster Autoscaler: How does Cluster Autoscaler work in GKE?",
  "GKE cluster upgrade: How do you upgrade a GKE cluster safely?",
  "Terraform state basics: Explain Terraform state and why it is important.",
  "Terraform remote state: What is remote state, and why do teams use it?",
  "Terraform state locking: How do you handle state locking?",
  "Terraform count vs for_each: What is the difference between count and for_each?",
  "Terraform modules: What are modules, and how do you use them for reusable infrastructure?",
  "Terraform environments: How do you manage multiple environments such as dev, staging, and production?",
  "Terraform lifecycle block: What is the Terraform lifecycle block, and when would you use it?",
  "GCP project architecture: Describe a GCP project architecture you have implemented.",
  "Shared VPC: Explain Shared VPC and when you would use host and service projects.",
  "Hub-and-spoke architecture: Explain hub-and-spoke architecture in GCP.",
  "Hub project resources: How do you deploy shared resources in a hub project?",
  "Cloud NAT: Explain Cloud NAT and the problem it solves.",
  "VPN Gateway: Explain VPN Gateway and how it connects networks.",
  "Cloud Router: Explain Cloud Router and its role with dynamic routing and BGP.",
  "GCP IAM: Explain IAM in GCP and how roles are assigned.",
  "Cloud Identity: What is Cloud Identity, and how does it relate to users and groups?",
  "GCP user access: How do you provide read-only or admin access to users safely?",
  "VPC fundamentals: Explain VPC in cloud networking.",
  "Public vs private subnet: What is the difference between public and private subnets?",
  "Routing fundamentals: Explain routing in a cloud network.",
  "VPN connectivity: How does VPN connectivity work between on-premises and cloud?",
  "Firewall rules: Explain firewall rules and how you design them safely.",
  "DNS resolution: How does DNS resolution work in hybrid or cloud environments?",
  "CI/CD pipeline: Explain your CI/CD pipeline from code commit to production.",
  "CI/CD tools: Which CI/CD tools have you used, and where did each fit?",
  "Application deployment: How do you deploy applications to Kubernetes, GKE, Cloud Run, or VMs?",
  "Azure IAM equivalent: What is the Azure equivalent of IAM?",
  "Microsoft Entra ID: Explain Microsoft Entra ID and how it is used.",
  "Azure identity management: How do you manage users, groups, roles, and identities in Azure?",
  "Monitoring tools: Which monitoring tools have you used in production?",
  "Alert creation: How do you create useful alerts without creating noise?",
  "Production troubleshooting: How do you troubleshoot production issues end to end?",
  "High CPU or memory: How do you investigate high CPU or memory usage?",
  "Failed production deployment: A production deployment failed. What steps would you take?",
  "Application inaccessible after deployment: Users cannot access the application after deployment. How would you debug it?",
  "On-prem to GCP migration: How would you migrate an application from on-premises to GCP?",
  "Highly available GKE: How would you design a highly available GKE architecture?",
  "Production Kubernetes security: How would you secure a production Kubernetes cluster?",
  "Disaster recovery: How would you implement disaster recovery for a production platform?",
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
const scriptingQuestionBank = [
  "Python automation: Design a production-ready script that inventories all GCP projects, collects labels and owners, and exports non-compliant resources to CSV.",
  "Python automation: How would you automate GKE namespace creation with quotas, RBAC, network policies, labels, and audit logging?",
  "Bash automation: Write the approach for a shell script that checks disk, memory, CPU, failed systemd units, and endpoint health across Linux servers.",
  "GCP SDK automation: How would you build a Python tool that disables stale service-account keys only after approval and records every action?",
  "Kubernetes automation: Design a script that finds CrashLoopBackOff, ImagePullBackOff, pending, and frequently restarted pods across all namespaces.",
  "Terraform automation: How would you automate fmt, validate, lint, security scanning, plan generation, policy checks, and plan summaries in CI?",
  "Log automation: Build an approach to parse application logs, group errors by service and exception, and report the top failures during an incident.",
  "API automation: How would you implement pagination, retries, exponential backoff, rate-limit handling, authentication, and idempotency in a cloud API client?",
  "Configuration automation: How would you safely update YAML configuration across many repositories without destroying formatting or unrelated settings?",
  "Certificate automation: Design a job that discovers expiring TLS certificates, alerts owners, validates renewals, and avoids duplicate notifications.",
  "Cost automation: How would you create a daily GCP cost anomaly report by project, service, label, and team?",
  "Backup automation: Design a script that runs backups, validates checksums, tests restoration, enforces retention, and reports RPO compliance.",
  "CI/CD automation: How would you automatically promote one immutable artifact through development, staging, and production with approvals and rollback?",
  "Security automation: Build a workflow that scans public buckets, open firewall rules, overprivileged IAM roles, and unencrypted resources.",
  "Incident automation: Which incident-response steps should be automated, and which must remain human-controlled?",
  "Python testing: How would you test a cloud automation script without modifying real production resources?",
  "Secrets automation: How would you retrieve and rotate secrets without printing them in logs, command history, process arguments, or CI output?",
  "Scheduled automation: Compare cron, Kubernetes CronJobs, Cloud Scheduler with Cloud Run, and workflow orchestration for operational jobs.",
  "Automation reliability: How would you add dry-run mode, structured logging, metrics, checkpoints, locking, retries, and rollback to a destructive script?",
  "Automation ownership: How would you package, document, release, monitor, and support internal automation used by several engineering teams?"
];
const dockerQuestionBank = [
  "Docker fundamentals: What is Docker, and what problem does it solve?",
  "Dockerfile fundamentals: What is a Dockerfile, and how is it used to build an image?",
  "Docker experience: Have you worked on Docker? Explain the workflows and production concerns you handled.",
  "Dockerfiles: Have you written Dockerfiles? What best practices do you follow?",
  "Docker build context: What is Docker build context, and why does it matter for build speed, security, and image contents?",
  "Docker CMD vs ENTRYPOINT: What is the difference between CMD and ENTRYPOINT?",
  "Docker image optimization: How do you optimize Docker image size?",
  "Docker multi-stage builds: What are multi-stage builds, and when would you use them?",
  "Docker image security: How do you secure Docker images before deploying them?",
  "Docker image design: How would you build secure, small, reproducible Docker images for production services?",
  "Docker layer caching: How do Docker layers and cache affect build speed and image reproducibility?",
  "Docker base images: How do you choose between Ubuntu, Alpine, slim, and distroless base images?",
  "Docker non-root containers: Why should containers avoid running as root, and how do you implement that in a Dockerfile?",
  "Docker secrets: How do you prevent secrets from leaking into Docker images, build logs, and runtime environment variables?",
  "Docker registry: How do you tag, push, scan, and promote Docker images through environments?",
  "Docker troubleshooting: A container works locally but fails in Kubernetes. How would you debug entrypoint, environment variables, filesystem, permissions, and health checks?",
  "Docker networking: How does container networking work locally, and what changes when the container runs in Kubernetes?",
  "Docker volumes: When would you use bind mounts, volumes, or ephemeral container storage?",
  "Docker Compose: When is Docker Compose useful, and why is it different from Kubernetes?",
  "Docker production readiness: What checks should pass before a Docker image is approved for production?"
];
const pythonQuestionBank = [
  "Python automation: How would you design a Python script that audits GCP IAM bindings, flags risky roles, and exports a remediation report?",
  "Python automation: How would you use the Kubernetes Python client to find CrashLoopBackOff, ImagePullBackOff, Pending, and high-restart pods across namespaces?",
  "Python error handling: How would you design retries, exponential backoff, timeouts, and idempotency for a Python cloud API automation tool?",
  "Python testing: How would you unit test a GCP or Kubernetes automation script without touching real production resources?",
  "Python logging: How would you implement structured logging, correlation IDs, and metrics in a Python operational tool?",
  "Python data parsing: How would you parse large JSON, YAML, CSV, or log files safely and produce an incident summary?",
  "Python concurrency: When would you use threads, asyncio, multiprocessing, or a worker pool for cloud resource inventory?",
  "Python packaging: How would you package, version, document, and release an internal Python CLI used by platform teams?",
  "Python FastAPI: How would you design a small FastAPI service that exposes self-service infrastructure requests with validation, approval, and audit logs?",
  "Python security: How would you prevent secrets from leaking through environment variables, logs, stack traces, process arguments, or CI output?",
  "Python code review: What would you check in a Python automation PR before allowing it to run against production infrastructure?",
  "Python interview coding: Write the approach for a function that calculates SLO compliance and remaining error budget from request totals and failures."
];
const fastApiQuestionBank = [
  "FastAPI fundamentals: How would you structure a production FastAPI service with routers, dependencies, schemas, settings, and clear module boundaries?",
  "FastAPI request validation: How do Pydantic models, response models, and validation errors help keep APIs safe and predictable?",
  "FastAPI async: When should a FastAPI endpoint be async, and what mistakes can block the event loop in production?",
  "FastAPI dependency injection: How would you use dependencies for authentication, database sessions, request context, and reusable validation?",
  "FastAPI security: How would you implement JWT/OAuth2 authentication, role-based access, secret handling, and least privilege for internal APIs?",
  "FastAPI database design: How would you manage database connections, migrations, transactions, pooling, and retries in a FastAPI app?",
  "FastAPI observability: What logs, metrics, traces, request IDs, and health endpoints would you add before deploying a FastAPI service?",
  "FastAPI deployment: How would you deploy FastAPI with Uvicorn/Gunicorn, containers, Kubernetes/GKE, autoscaling, probes, and graceful shutdown?",
  "FastAPI performance: A FastAPI endpoint has high p95 latency. How would you debug code, database calls, external APIs, concurrency, and infrastructure?",
  "FastAPI background work: When would you use BackgroundTasks, Pub/Sub, Celery, Cloud Tasks, or a separate worker instead of doing work in the request path?",
  "FastAPI testing: How would you test endpoints, dependencies, authentication, database behavior, and error paths using pytest and TestClient?",
  "FastAPI production readiness: What checklist would you use before approving a FastAPI service for production?"
];
const codingQuestionBank = [
  "Python coding: Write a function that reads Kubernetes pod records and returns pods with restartCount above a threshold, grouped by namespace.",
  "Python coding: Write a log parser that counts HTTP status codes and prints the five endpoints with the highest 5xx count.",
  "Python coding: Implement exponential backoff with jitter for an API call, with a maximum retry count and retryable-status handling.",
  "Python coding: Write a function that flattens nested JSON into dot-separated keys while preserving list values.",
  "Python coding: Write a function that compares desired and actual GCP resource labels and returns missing, changed, and unexpected labels.",
  "Python coding: Implement a thread-safe rate limiter that allows a configurable number of API requests per minute.",
  "Python coding: Write a script that finds duplicate IP addresses and overlapping CIDR ranges from a list of network definitions.",
  "Python coding: Write a function that calculates SLO compliance and remaining error budget from total and failed request counts.",
  "Python coding: Parse Prometheus text-format metrics and return samples whose metric name and labels match given filters.",
  "Python coding: Write a function that selects the latest valid semantic version from a list of container image tags.",
  "Python coding: Implement a context manager that records operation duration and emits structured success or failure logs.",
  "Python coding: Write unit tests for a function that deletes old cloud snapshots, including dry-run, API failure, and retention exceptions.",
  "Python coding: Write a script that reads a CSV of users and roles, validates allowed roles, and produces an IAM change plan without applying it.",
  "Python coding: Implement a bounded worker pool that processes cloud resources concurrently while preserving errors for a final report.",
  "Python coding: Write a function that detects configuration drift between two nested dictionaries while ignoring approved keys.",
  "Bash coding: Write a script that exits non-zero when disk usage exceeds a threshold and prints the five largest directories safely.",
  "Bash coding: Write a script that checks an HTTP endpoint with timeout and retries, then emits a machine-readable health result.",
  "Kubernetes coding: Write a Python program using the Kubernetes client that lists unschedulable pods and summarizes their scheduling reasons.",
  "GCP coding: Write a Python program using Google Cloud client libraries that lists public Cloud Storage buckets and handles permission errors.",
  "Terraform coding: Write a validation strategy or test that rejects resources missing required labels and prevents public ingress on port 22."
];
const goQuestionBank = [
  "Go fundamentals: What are the main differences between Go and Python for cloud/platform automation, and when would you choose each?",
  "Go error handling: How does Go error handling work, and how would you structure errors in a production CLI or service?",
  "Go concurrency: Explain goroutines, channels, context cancellation, and wait groups using a platform automation example.",
  "Go HTTP service: How would you build a small Go HTTP service for health checks, metrics, and safe operational actions?",
  "Go CLI design: How would you design a Go CLI with Cobra to audit Kubernetes or GCP resources across environments?",
  "Go Kubernetes: When would you use client-go or controller-runtime, and how would you design a simple Kubernetes controller?",
  "Go operator: A team wants an operator to manage namespace onboarding with RBAC, quotas, and network policies. How would you approach it in Go?",
  "Go interfaces: How do interfaces help with testing cloud clients, Kubernetes clients, and business logic in Go?",
  "Go testing: How would you write unit tests, table-driven tests, mocks, and integration tests for a Go platform tool?",
  "Go modules: How do Go modules, semantic versioning, dependency updates, and vulnerability scanning fit into enterprise engineering?",
  "Go observability: How would you add structured logs, Prometheus metrics, traces, and graceful shutdown to a Go service?",
  "Go production readiness: What code review checklist would you use before deploying a Go automation service or controller to production?"
];
const techRiskTechnicalQuestionBank = [
  "Technology risk framework: How would you design an enterprise technology risk management framework for cloud, applications, infrastructure, SDLC, and third-party integrations?",
  "Risk assessment: A product team is launching a new customer-facing platform on GCP/GKE. How would you assess technology risk from BRD/PRD through architecture review, build, release, and operations?",
  "Control design: For a regulated cloud platform, define preventive, detective, and corrective controls for IAM, network exposure, CI/CD, secrets, vulnerability management, and production changes.",
  "Risk register and heatmap: What fields would you maintain in a technology risk register, how would you score likelihood/impact, and how would you convert it into a leadership heatmap?",
  "Framework mapping: How would you map ISO 27001, NIST, COBIT, and FAIR requirements to practical cloud and DevOps controls without creating checkbox compliance?",
  "Audit remediation: An external audit finds weak access reviews, missing evidence, and delayed patching. How would you create a remediation plan, owners, due dates, risk acceptance, and reporting?",
  "Incident risk analysis: A production incident was fixed quickly, but the same failure could repeat. How would you analyze root cause, systemic risk, control failure, and long-term mitigation?",
  "Change risk: A major architecture change introduces a new data flow, API gateway, and cloud database. What risk questions would you ask before approval?",
  "Cloud risk dashboard: Design a technology risk dashboard for senior leadership. What KRIs, control metrics, exceptions, trends, and escalation signals would you include?",
  "Risk automation: What parts of technology risk assessment and reporting would you automate using cloud logs, CI/CD metadata, vulnerability scanners, policy-as-code, and ticketing workflows?",
  "FMEA and scenario analysis: How would you use FMEA or scenario analysis to identify high-impact technology failure modes before they become incidents?",
  "Control validation: How would you test whether a control is actually working, for example privileged access, deployment approval, backup restore, or vulnerability SLA closure?"
];
const techRiskBehavioralQuestionBank = [
  "Behavioural risk leadership: Tell me about a time you had to influence engineering or product teams to fix a technology risk they did not initially prioritize.",
  "Stakeholder communication: How would you explain a critical cloud security risk to senior leadership in business-impact language without overwhelming them with technical detail?",
  "Conflict handling: Product wants to release quickly, Security wants stricter controls, and Engineering says the control adds toil. How would you drive a decision?",
  "Trusted advisor: Describe how you would build trust with IT, Engineering, Product, Security, Audit, and Business stakeholders as a Technology Risk Lead.",
  "Prioritization: You have critical audit findings, recurring incidents, and a weak risk dashboard. How would you prioritize the next 30, 60, and 90 days?",
  "Risk culture: Give an example of how you would promote a risk-aware culture without making teams feel blocked or blamed.",
  "Executive reporting: How would you present a deteriorating risk trend to senior leadership and ask for investment or policy support?",
  "Decision-making: Tell me about a time you had incomplete information but still had to make or recommend a risk decision.",
  "Remediation ownership: A risk issue is overdue because multiple teams disagree on ownership. How would you move it to closure?",
  "Audit partnership: How would you handle a disagreement with internal or external auditors about severity, evidence, or remediation feasibility?",
  "Incident communication: During a major incident with regulatory implications, how would you coordinate technical updates, business impact, risk reporting, and follow-up actions?",
  "Leadership reflection: What does success look like for you in a Technology Risk Lead role after six months?"
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
    answers: [],
    questionHistory: [],
    questionHistoryIndex: -1
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
    answerResetVersion: ANSWER_RESET_VERSION,
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
    technology: els.technology.value,
    practiceDay: els.practiceDay.value,
    mockSet: els.mockSet.value,
    questionOrder: els.questionOrder.value,
    autoNext: els.autoNext.checked,
    interviewMode: currentMode()
  }));
}

function loadState() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  const shouldResetAnswers = saved.answerResetVersion !== ANSWER_RESET_VERSION;
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
  els.technology.value = saved.technology || "all";
  els.questionOrder.value = saved.questionOrder || "random";
  setMode(saved.interviewMode || "live");
  interviewNumber = shouldResetAnswers ? 1 : Number(saved.interviewNumber || 1);
  interviews = !shouldResetAnswers && Array.isArray(saved.interviews) && saved.interviews.length
    ? saved.interviews
    : [createInterview(1)];
  progressHistory = shouldResetAnswers || !Array.isArray(saved.progressHistory) ? [] : saved.progressHistory;
  questionBankIndex = shouldResetAnswers ? 0 : Number(saved.questionBankIndex || 0);
  usedQuestionKeys = shouldResetAnswers || !Array.isArray(saved.usedQuestionKeys) ? [] : saved.usedQuestionKeys;
  els.practiceDay.value = saved.practiceDay || "all";
  els.mockSet.value = saved.mockSet || "all";
  questionNumber = currentInterview().questionNumber || 1;
  renderInterview();
  updateModeUi();
  if (shouldResetAnswers) saveState();
}

function captureInterviewState() {
  const session = currentInterview();
  session.questionNumber = questionNumber;
  session.question = els.question.textContent;
  session.answerDraft = els.answer.value;
  session.finalFeedback = els.feedbackOutput.innerHTML;
  saveCurrentQuestionDraft();
}

function saveCurrentQuestionDraft() {
  const session = currentInterview();
  if (!Array.isArray(session.questionHistory)) {
    session.questionHistory = [];
    session.questionHistoryIndex = -1;
  }
  const index = Number(session.questionHistoryIndex);
  if (index >= 0 && session.questionHistory[index]) {
    session.questionHistory[index].answerDraft = els.answer.value;
  }
}

function ensureQuestionHistory() {
  const session = currentInterview();
  if (!Array.isArray(session.questionHistory)) session.questionHistory = [];
  if (!Number.isInteger(session.questionHistoryIndex)) {
    session.questionHistoryIndex = session.questionHistory.length ? session.questionHistory.length - 1 : -1;
  }
}

function renderInterview() {
  const session = currentInterview();
  ensureQuestionHistory();
  questionNumber = session.questionNumber || 1;
  els.interviewLabel.textContent = `Interview ${interviewNumber}`;
  els.question.textContent = session.question || "This is a mock interview. Click New question to generate a random DevOps, MLOps, Kubernetes, GCP, Terraform, Python, or scenario-based question.";
  els.answer.value = session.answerDraft || "";
  finalTranscript = els.answer.value;
  els.feedbackOutput.innerHTML = session.finalFeedback || "Your final interview feedback will appear here after you end the interview.";
  els.previousInterview.disabled = interviewNumber <= 1;
  els.previousQuestion.disabled = session.questionHistoryIndex <= 0;
  els.nextQuestion.disabled = session.questionHistoryIndex >= session.questionHistory.length - 1;
  renderSessionStats();
  renderInterviewList();
  renderProgressHistory();
}

function renderSessionStats() {
  const answered = currentInterview().answers?.length || 0;
  const characters = els.answer.value.length;
  els.questionCounter.textContent = `Question ${Math.max(1, questionNumber)}`;
  els.answerCounter.textContent = `${answered} answered`;
  els.answerCount.textContent = `${characters} character${characters === 1 ? "" : "s"}`;
  els.sessionProgress.style.width = `${Math.min(100, answered * 10)}%`;
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
  const technology = technologyLabels[els.technology.value] || technologyLabels.all;
  let practice = "All questions";
  if (els.mockSet.value === "random-bank") practice = "Random full bank mock interview";
  if (els.mockSet.value === "custom-jd") practice = "Custom JD mock interview";
  if (els.mockSet.value.startsWith("day-")) {
    practice = `Day ${els.mockSet.value.replace("day-", "")} mock interview`;
  }
  if (els.mockSet.value !== "all") {
    const set = mockInterviewSets.find((item) => item.id === els.mockSet.value);
    practice = set?.title || practice;
  }
  if (els.practiceDay.value !== "all") practice = `Day ${els.practiceDay.value} practice`;
  return els.technology.value === "all" ? practice : `${practice} · ${technology}`;
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

function updateAnswerEditor() {
  const codingMode = els.technology.value === "coding";
  els.answerLabel.textContent = codingMode ? "Code solution" : "Answer transcript";
  els.answer.placeholder = codingMode
    ? "Write or dictate your Python, Bash, Terraform, or pseudocode solution here."
    : "Speak your answer or type it here.";
  els.answer.classList.toggle("code-editor", codingMode);
  els.micButton.disabled = !SpeechRecognition;
}

function contextPayload() {
  return {
    role: els.role.value,
    level: els.level.value,
    topic: els.technology.value === "all"
      ? els.topic.value
      : `${technologyLabels[els.technology.value]}. ${els.topic.value}`,
    cvText: els.cvText.value,
    jdText: els.jdText.value,
    interviewNumber
  };
}

function applyImportedJd(text, message) {
  els.jdText.value = text;
  questionBankIndex = 0;
  usedQuestionKeys = [];
  interviews = [createInterview(1)];
  interviewNumber = 1;
  renderInterview();
  saveState();
  els.feedbackOutput.innerHTML = markdownToHtml(message);
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(result.includes(",") ? result.split(",").pop() : result);
    };
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.readAsDataURL(file);
  });
}

function formatTranscript() {
  return currentInterview().answers.map((item, index) => [
    `Question ${index + 1}: ${item.question}`,
    `Answer ${index + 1}: ${item.answer}`
  ].join("\n")).join("\n\n");
}

function buildJdQuestions() {
  const jd = `${hiddenTechnologyRiskLeadContext} ${els.jdText.value} ${els.topic.value}`.toLowerCase();
  const questions = [];

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
  if (/fastapi|pydantic|uvicorn|asgi|backend api|rest api/.test(jd)) {
    questions.push("This JD mentions FastAPI or backend APIs. How would you design, secure, observe, test, and deploy a production FastAPI service?");
  }
  if (/\bgo\b|golang|kubernetes controller|operator|client-go|controller-runtime|platform cli/.test(jd)) {
    questions.push("This JD mentions Go or platform tooling. When would you choose Go over Python for a CLI, API service, or Kubernetes controller, and how would you design it?");
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
  if (/technology risk|risk assessment|risk register|heatmap|control|iso 27001|nist|cobit|fair|audit|compliance|remediation/.test(jd)) {
    questions.push("Technology risk technical: How would you build a technology risk framework that covers cloud platforms, applications, SDLC, controls, audit findings, and leadership reporting?");
    questions.push("Technology risk technical: A new product architecture is being reviewed before launch. How would you assess risk, validate controls, document residual risk, and decide whether to approve?");
  }
  if (/stakeholder|communication|leadership|influenc|risk-aware|trusted advisor|business impact/.test(jd)) {
    questions.push("Technology risk behavioural: Tell me about a time you influenced engineering, product, or security stakeholders to reduce a technology risk without slowing delivery unnecessarily.");
    questions.push("Technology risk behavioural: How would you translate a complex technical control failure into business impact for senior leadership?");
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

function matchesTechnology(question, section = "") {
  if (els.technology.value === "all") return true;
  const matcher = technologyMatchers[els.technology.value];
  return matcher ? matcher.test(`${section} ${question}`) : true;
}

function filterTechnologyQuestions(questions) {
  return questions.filter((question) => matchesTechnology(question));
}

function specializedQuestions() {
  if (els.technology.value === "python") return pythonQuestionBank;
  if (els.technology.value === "fastapi") return fastApiQuestionBank;
  if (els.technology.value === "go") return goQuestionBank;
  if (els.technology.value === "scripting") return scriptingQuestionBank;
  if (els.technology.value === "docker") return dockerQuestionBank;
  if (els.technology.value === "coding") return codingQuestionBank;
  if (els.technology.value === "tech-risk-technical") return techRiskTechnicalQuestionBank;
  if (els.technology.value === "tech-risk-behavioral") return techRiskBehavioralQuestionBank;
  if (els.technology.value === "all") {
    return [
      ...scriptingQuestionBank,
      ...dockerQuestionBank,
      ...pythonQuestionBank,
      ...fastApiQuestionBank,
      ...goQuestionBank,
      ...codingQuestionBank,
      ...techRiskTechnicalQuestionBank,
      ...techRiskBehavioralQuestionBank
    ];
  }
  return [];
}

function largeBankQuestions() {
  return largeQuestionBank
    .filter((item) => matchesTechnology(item.question, item.section))
    .map((item) => item.question);
}

function buildCustomJdMockQuestions() {
  const role = els.role.value || "this role";
  const jd = `${hiddenTechnologyRiskLeadContext}\n\n${els.jdText.value.trim() || defaultTargetSkills}`;
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
    `Technology risk technical: How would you create risk registers, heatmaps, control validation evidence, and remediation dashboards for this role?`,
    `Technology risk behavioural: Product and Engineering disagree with your risk severity rating. How would you influence the decision and communicate residual risk?`,
    `Custom JD closing round: Why are you a strong match for this JD? Give a concise senior-level answer using your GCP, Kubernetes, Terraform, SRE, automation, and platform experience. JD signal: ${jdPreview}...`
  ];

  return uniqueQuestions([
    ...baseQuestions.slice(0, 9),
    ...jdQuestions,
    baseQuestions[9]
  ]).slice(0, 10);
}

function questionPool() {
  if (["scripting", "coding", "tech-risk-technical", "tech-risk-behavioral"].includes(els.technology.value)) {
    return uniqueQuestions(specializedQuestions());
  }

  let questions = [];
  if (els.mockSet.value !== "all") {
    if (els.mockSet.value === "random-bank") {
      questions = [
        ...specializedQuestions(),
        ...largeBankQuestions(),
        ...filterTechnologyQuestions(questionBank)
      ];
      return uniqueQuestions(questions);
    }
    if (els.mockSet.value === "custom-jd") {
      return filterTechnologyQuestions(buildCustomJdMockQuestions());
    }
    if (els.mockSet.value.startsWith("day-")) {
      const dayNumber = els.mockSet.value.replace("day-", "");
      const day = practicePlan.find((item) => String(item.day) === dayNumber);
      if (day) return filterTechnologyQuestions(day.questions.map((item) => item.question));
    }
    const set = mockInterviewSets.find((item) => item.id === els.mockSet.value);
    if (set) return filterTechnologyQuestions(set.questions.map((item) => item.question));
  }
  if (els.practiceDay.value !== "all") {
    const day = practicePlan.find((item) => String(item.day) === els.practiceDay.value);
    if (day) return filterTechnologyQuestions(day.questions.map((item) => item.question));
  }
  questions = [
    ...specializedQuestions(),
    ...filterTechnologyQuestions(buildJdQuestions()),
    ...largeBankQuestions(),
    ...filterTechnologyQuestions(questionBank)
  ];
  return uniqueQuestions(questions);
}

function activeQuestionPoolLabel(poolLength) {
  const technology = technologyLabels[els.technology.value] || technologyLabels.all;
  if (els.technology.value !== "all") {
    return `${technology} question ${usedQuestionKeys.length}/${poolLength}`;
  }
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
  saveCurrentQuestionDraft();
  questionNumber += 1;
  els.question.textContent = question.replace(/^["']|["']$/g, "");
  els.answer.value = "";
  finalTranscript = "";
  els.micState.textContent = `Interview question ${questionNumber} ready. ${activeQuestionPoolLabel(questionPool().length)}`;
  const session = currentInterview();
  ensureQuestionHistory();
  session.questionNumber = questionNumber;
  session.question = els.question.textContent;
  session.answerDraft = "";
  session.questionHistory = session.questionHistory.slice(0, session.questionHistoryIndex + 1);
  session.questionHistory.push({
    number: questionNumber,
    question: els.question.textContent,
    answerDraft: ""
  });
  session.questionHistoryIndex = session.questionHistory.length - 1;
  session.history.push(`Question ${questionNumber}: ${els.question.textContent}`);
  renderSessionStats();
  els.previousQuestion.disabled = session.questionHistoryIndex <= 0;
  els.nextQuestion.disabled = session.questionHistoryIndex >= session.questionHistory.length - 1;
  saveState();
}

function showQuestionHistoryEntry(index) {
  const session = currentInterview();
  ensureQuestionHistory();
  const entry = session.questionHistory[index];
  if (!entry) return;
  session.questionHistoryIndex = index;
  questionNumber = entry.number || index + 1;
  els.question.textContent = entry.question;
  els.answer.value = entry.answerDraft || "";
  finalTranscript = els.answer.value;
  session.questionNumber = questionNumber;
  session.question = entry.question;
  session.answerDraft = els.answer.value;
  els.micState.textContent = `Viewing question ${questionNumber}`;
  renderSessionStats();
  els.previousQuestion.disabled = session.questionHistoryIndex <= 0;
  els.nextQuestion.disabled = session.questionHistoryIndex >= session.questionHistory.length - 1;
  saveState();
}

function showPreviousQuestion() {
  const session = currentInterview();
  ensureQuestionHistory();
  if (session.questionHistoryIndex <= 0) return;
  saveCurrentQuestionDraft();
  showQuestionHistoryEntry(session.questionHistoryIndex - 1);
}

function showNextQuestion() {
  const session = currentInterview();
  ensureQuestionHistory();
  if (session.questionHistoryIndex >= session.questionHistory.length - 1) return;
  saveCurrentQuestionDraft();
  showQuestionHistoryEntry(session.questionHistoryIndex + 1);
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
  ensureQuestionHistory();
  const existingAnswer = session.answers.find((item) => item.question === els.question.textContent);
  if (existingAnswer) {
    existingAnswer.answer = answer;
  } else {
    session.answers.push({
      question: els.question.textContent,
      answer
    });
  }
  if (session.questionHistory[session.questionHistoryIndex]) {
    session.questionHistory[session.questionHistoryIndex].answerDraft = answer;
    session.questionHistory[session.questionHistoryIndex].answered = true;
  }
  session.history.push(`Question ${questionNumber}: ${els.question.textContent}\nAnswer: ${answer}`);
  session.answerDraft = "";
  els.feedbackOutput.innerHTML = markdownToHtml(`## Answer Saved\nSaved answer ${session.answers.length}. Final feedback will come when you end the interview.`);
  session.finalFeedback = els.feedbackOutput.innerHTML;
  renderSessionStats();
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
    els.micButton.setAttribute("aria-pressed", "true");
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
    renderSessionStats();
  };

  recognition.onerror = (event) => {
    els.micState.textContent = event.error === "not-allowed" ? "Microphone blocked" : "Speech input stopped";
  };

  recognition.onend = () => {
    listening = false;
    els.micButton.textContent = "Start mic";
    els.micButton.classList.remove("active");
    els.micButton.setAttribute("aria-pressed", "false");
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
  renderSessionStats();
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
    applyImportedJd(data.text, "## JD Imported\nQuestion bank updated from this job description. Click New question to start.");
  } catch (error) {
    els.feedbackOutput.innerHTML = markdownToHtml(`## Import Failed\n${error.message}\n\nFor blocked sites, paste the JD text manually into the Job description box.`);
  } finally {
    setBusy(els.importJd, false, "Import JD from URL");
  }
});

els.importJdPdf.addEventListener("click", async () => {
  const file = els.jdPdf.files?.[0];
  if (!file) {
    els.feedbackOutput.innerHTML = markdownToHtml("## Missing File\nChoose a job description file first.");
    return;
  }
  const supportedFile = /\.(pdf|docx|txt|md|png|jpe?g|webp|tiff?|bmp)$/i.test(file.name) ||
    /^(application\/pdf|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document|text\/|image\/)/i.test(file.type);
  if (!supportedFile) {
    els.feedbackOutput.innerHTML = markdownToHtml("## Invalid File\nPlease choose a PDF, DOCX, TXT, Markdown, or image file.");
    return;
  }
  if (file.size > 5_000_000) {
    els.feedbackOutput.innerHTML = markdownToHtml("## File Too Large\nPlease upload a file under 5 MB.");
    return;
  }

  setBusy(els.importJdPdf, true, "Importing");
  els.feedbackOutput.textContent = "Extracting job description from file...";
  try {
    const data = await api("/api/import-jd-file", {
      filename: file.name,
      mimeType: file.type,
      data: await fileToBase64(file)
    });
    applyImportedJd(data.text, `## JD File Imported\nExtracted text from \`${file.name}\`. Question bank updated for this JD. Click New question to start.`);
  } catch (error) {
    els.feedbackOutput.innerHTML = markdownToHtml(`## File Import Failed\n${error.message}\n\nYou can still paste the JD text manually into the Job description box.`);
  } finally {
    setBusy(els.importJdPdf, false, "Import JD from file");
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

els.previousQuestion.addEventListener("click", () => {
  showPreviousQuestion();
});

els.nextQuestion.addEventListener("click", () => {
  showNextQuestion();
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
  updateAnswerEditor();
  checkHealth();
});

[els.role, els.level, els.topic, els.cvText, els.jdText, els.questionOrder, els.autoNext].forEach((input) => {
  input.addEventListener("change", saveState);
});

els.technology.addEventListener("change", () => {
  questionBankIndex = 0;
  usedQuestionKeys = [];
  interviews = [createInterview(1)];
  interviewNumber = 1;
  renderInterview();
  updateAnswerEditor();
  saveState();
  const poolLength = questionPool().length;
  els.feedbackOutput.innerHTML = markdownToHtml(
    `## Technology Practice Selected\n${technologyLabels[els.technology.value]} has ${poolLength} matching questions. Click New question to start.`
  );
  currentInterview().finalFeedback = els.feedbackOutput.innerHTML;
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
  saveCurrentQuestionDraft();
  renderSessionStats();
  saveState();
});

els.answer.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    event.preventDefault();
    submitAnswer();
  }
});
