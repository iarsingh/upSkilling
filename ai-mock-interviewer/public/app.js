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
  customSkillName: document.querySelector("#customSkillName"),
  customSkillQuestions: document.querySelector("#customSkillQuestions"),
  addCustomSkill: document.querySelector("#addCustomSkill"),
  deleteCustomSkill: document.querySelector("#deleteCustomSkill"),
  customSkillList: document.querySelector("#customSkillList"),
  practiceDay: document.querySelector("#practiceDay"),
  mockSet: document.querySelector("#mockSet"),
  role: document.querySelector("#role"),
  level: document.querySelector("#level"),
  topic: document.querySelector("#topic"),
  cvText: document.querySelector("#cvText"),
  cvPdf: document.querySelector("#cvPdf"),
  importCvFile: document.querySelector("#importCvFile"),
  jdText: document.querySelector("#jdText"),
  jdUrl: document.querySelector("#jdUrl"),
  jdPdf: document.querySelector("#jdPdf"),
  autoNext: document.querySelector("#autoNext"),
  realTimeSimulation: document.querySelector("#realTimeSimulation"),
  question: document.querySelector("#question"),
  speakQuestion: document.querySelector("#speakQuestion"),
  stopQuestionAudio: document.querySelector("#stopQuestionAudio"),
  questionVoiceTone: document.querySelector("#questionVoiceTone"),
  autoReadQuestion: document.querySelector("#autoReadQuestion"),
  questionAudioState: document.querySelector("#questionAudioState"),
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
  micLanguage: document.querySelector("#micLanguage"),
  answerPause: document.querySelector("#answerPause"),
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
const ANSWER_RESET_VERSION = "2026-07-03-mock-from-scratch";
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
  llmops: "LLMOps / GenAI production",
  ansible: "Ansible / config management",
  cicd: "CI/CD / GitOps",
  observability: "Observability",
  security: "Cloud / DevSecOps security",
  networking: "Cloud networking",
  linux: "Linux / systems",
  platform: "Platform engineering",
  "tech-risk-technical": "Technology risk - technical",
  "tech-risk-behavioral": "Technology risk - behavioural",
  "hr-behavioral": "HR / behavioral basics",
  "basic-concepts": "Basic / one-liner concepts",
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
  llmops: /\b(llm|genai|generative ai|rag|retrieval.augmented|vector database|vector db|embedding|prompt|token|agent|langchain|llamaindex|vllm|tgi|model garden|agent builder|guardrail|hallucinat|chatbot|copilot)\b/i,
  ansible: /\b(ansible|playbook|ansible vault|jinja2|ansible-lint|molecule|ansible tower|awx|ad-hoc command|ansible role)\b/i,
  cicd: /\b(ci\/cd|cicd|continuous integration|continuous delivery|continuous deployment|gitops|argocd|argo cd|jenkins|github actions|gitlab|cloud build|cloud deploy|pipeline|artifact|canary|blue.?green|rollback)\b/i,
  observability: /\b(observability|prometheus|grafana|opentelemetry|open telemetry|monitoring|logging|metrics|tracing|trace|dashboard|alert|elk|opensearch|cloud operations|cloud monitoring)\b/i,
  security: /\b(security|devsecops|iam|rbac|workload identity|secret|vault|cloud armor|waf|binary authorization|vulnerability|sast|dast|supply chain|sbom|gatekeeper|kyverno|admission|least privilege|encryption|kms)\b/i,
  networking: /\b(network|networking|vpc|subnet|dns|load balancer|load balancing|firewall|vpn|interconnect|tcp|udp|http|https|tls|nat|routing|route|ingress|egress|gateway|proxy|envoy|apigee)\b/i,
  linux: /\b(linux|kernel|systemd|journald|cron|process|filesystem|memory|cpu|disk|inode|shell|bash|tcpdump|strace|lsof|top|vmstat|iostat|permission|chmod|chown|sudo|ssh|scp|rsync|certificate|tls)\b/i,
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
Senior MLOps & Platform Engineer | GCP | Kubernetes | Terraform | AI Infrastructure
Email: akhileshranjan.ks@gmail.com
Phone: +91-8002392976
Location: Noida, India
LinkedIn: https://linkedin.com/in/iamarsingh
GitHub: https://github.com/iarsingh

PROFESSIONAL SUMMARY
Senior MLOps & Platform Engineer with nearly 7 years of experience designing, automating, and operating cloud-native infrastructure across GCP, AWS, and Azure. Experienced in building production-ready AI platforms using Kubernetes, Terraform, Vertex AI, MLflow, FastAPI, Docker, and GitOps, enabling scalable model deployment, infrastructure automation, and platform reliability. Skilled in Platform Engineering, Infrastructure as Code, and DevSecOps, delivering self-service cloud platforms, standardized landing zones, and automated deployment frameworks. Hands-on experience in LLMOps, RAG pipelines, GPU-accelerated inference, and model lifecycle management, bridging software engineering and intelligent automation.

CORE COMPETENCIES
DevOps & Platform Engineering, Cloud Platform Engineering, Kubernetes & Container Orchestration, Infrastructure as Code (Terraform Enterprise), CI/CD Automation & GitOps, Multi-Cloud Architecture (GCP, AWS, Azure), DevSecOps & Cloud Security Governance, Site Reliability Engineering (SRE), Observability & Performance Monitoring, MLOps & AI Infrastructure Engineering

TECHNICAL SKILLS
Cloud Platforms: Google Cloud Platform (GCP), AWS, Azure
Infrastructure as Code: Terraform Enterprise, Ansible
Security & Governance: IAM, RBAC, Cloud Armor, WAF, DevSecOps, Prisma Cloud, IONIX, Stream Security, SAST/DAST, Vulnerability Management, Binary Authorization
Programming & Scripting: Python, Bash, Go
Databases: PostgreSQL, MySQL, MongoDB, Vector Databases
Containers & Orchestration: Kubernetes, Docker, Helm, GKE, HPA, RBAC, Network Policies
CI/CD & GitOps: Jenkins, GitHub Actions, GitLab CI/CD, Google Cloud Build, ArgoCD, GitOps, Bitbucket, Harness
Monitoring & Observability: ELK Stack (Elasticsearch, Logstash, Kibana), Prometheus, Grafana, OpenTelemetry
MLOps & AI Infrastructure: Vertex AI, Vertex AI Pipelines, MLflow, Kubeflow, Model Registry, Model Serving, Model Monitoring, Experiment Tracking, Feature Store, FastAPI, KServe, Seldon Core, TensorFlow Serving, LLMOps, RAG, Vector Databases
LLM & Generative AI: LangChain, LangGraph, OpenAI API, Gemini API, Hugging Face, Ollama, vLLM, Llama 3, Mistral

PROFESSIONAL EXPERIENCE
DevOps Engineer, Capgemini, Noida | 09/2024 - Present
- Designed and implemented end-to-end MLOps platforms on GCP, enabling automated model training, deployment, monitoring, and lifecycle management for AI/ML applications.
- Built and managed Vertex AI Pipelines, Vertex AI Model Registry, and model deployment workflows for scalable production ML environments.
- Implemented MLflow for experiment tracking, model versioning, artifact management, and model registry, enabling reproducible ML workflows.
- Developed CI/CD pipelines for ML workloads using GitHub Actions/Jenkins, Terraform, Docker, Kubernetes, and Helm, automating model build, validation, deployment, and rollback.
- Deployed and managed scalable inference services using FastAPI, KServe, TensorFlow Serving, and Kubernetes with autoscaling and high availability.
- Implemented LLMOps workflows by deploying and operating Llama 3, Mistral, Ollama, and vLLM on Kubernetes-based infrastructure for enterprise AI applications.
- Built RAG (Retrieval-Augmented Generation) pipelines integrating vector databases, embedding models, and LLMs for production GenAI use cases.
- Implemented model monitoring, data drift, concept drift, and prediction quality monitoring using Vertex AI Model Monitoring, Evidently AI, and custom dashboards.
- Automated model retraining pipelines triggered by drift detection, performance degradation, and scheduled workflows to maintain model accuracy in production.
- Provisioned and optimized GPU-enabled Kubernetes clusters (NVIDIA L4/A100) for distributed training and low-latency inference, improving GPU utilization and cost efficiency.
- Implemented centralized observability for ML platforms using Prometheus, Grafana, ELK, OpenTelemetry, and Cloud Monitoring across infrastructure, application, and model performance metrics.
- Designed reusable Terraform modules for AI infrastructure, including GKE, Vertex AI, Cloud Storage, IAM, networking, monitoring, and security services.
- Integrated Feature Store capabilities for consistent feature management across training and inference workflows.
- Implemented secure MLOps practices including IAM, RBAC, Secrets Manager, Binary Authorization, image scanning, and policy-as-code for AI workloads.
- Optimized AI infrastructure costs through GPU scheduling, cluster autoscaling, spot/preemptible instances, and storage lifecycle policies, reducing cloud expenditure by over 20%.
- Led production incident response and root cause analysis for AI/ML services, ensuring high availability and SLA compliance.
- Built GitOps-based deployment workflows using ArgoCD and Helm for version-controlled, automated AI application deployments across multiple Kubernetes environments.
- Designed and governed enterprise-scale GCP landing zones using Shared VPC, project hierarchies, remote state management, IAM governance, and policy-as-code.
- Enabled self-service infrastructure delivery by integrating Terraform Enterprise with Git-based CI/CD, Harness, Jira, and ServiceNow.
- Enhanced cloud security and observability with Cloud Armor WAF policies, rate limiting, Adaptive Protection, and continuous attack-surface monitoring using IONIX and Stream Security.
- Led a GitHub-to-Bitbucket migration, improving engineering productivity and operational efficiency by 30%.

Senior Software Engineer - DevOps, Tech Mahindra, Mumbai | 07/2022 - 09/2024
- Drove enterprise-scale CI/CD platform engineering using Jenkins, GitHub Actions, Terraform, Docker, Kubernetes, Helm, and Ansible.
- Delivered Infrastructure as Code across GCP, AWS, and Azure using Terraform and Ansible for provisioning, configuration management, backup automation, and disaster recovery.
- Administered highly available Kubernetes platforms using Docker and Helm, maintaining 99.9% service availability through proactive monitoring.
- Implemented DevSecOps controls including Prisma Cloud, SAST/DAST, RBAC, IAM governance, and secrets management.
- Managed enterprise backup and disaster recovery using Veeam and Kasten K10.
- Integrated cloud object storage (S3, GCS, Azure Blob) with CI/CD pipelines and Kubernetes workloads for artifact storage, state file management, and application data persistence.
- Administered artifact lifecycle management through JFrog Artifactory.
- Partnered with Google Cloud, Microsoft, and AWS engineering teams to optimize platform performance and accelerate cloud transformation.

System Engineer - Cloud & DevOps, TCS, Bengaluru | 09/2019 - 07/2022
- Managed production Kubernetes and GKE environments for business-critical applications.
- Automated CI/CD pipelines using Jenkins, Cloud Build, and Terraform, reducing deployment effort by 40%.
- Provisioned GCP infrastructure via Terraform, supported on-premises to GCP migration, and performed Linux administration and performance optimization.
- Managed end-to-end monitoring and alerting, led incident response and RCA, and maintained SLA compliance.

CERTIFICATIONS
- Google Professional Cloud DevOps Engineer — 2025
- Google Professional Cloud Network Engineer — 2025
- Google Associate Cloud Engineer — 2024

EDUCATION
Bachelor of Engineering - Computer Science, RGPV, Bhopal | 2019`;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const speechSynthesisApi = window.speechSynthesis;
let recognition = null;
let listening = false;
let finalTranscript = "";
let questionVoices = [];
let answerSilenceTimer = null;
let micStartedBySimulation = false;
let questionAudioCanceled = false;
let questionAudioRunId = 0;
const questionVoiceTonePresets = {
  natural: {
    rate: 0.92,
    pitch: 0.96,
    voicePattern: /India|Google|Microsoft|Samantha|Daniel|Alex|Ava/i
  },
  deep: {
    rate: 0.86,
    pitch: 0.78,
    voicePattern: /Daniel|Alex|Microsoft David|Google UK English Male|Male/i
  },
  clear: {
    rate: 0.88,
    pitch: 1,
    voicePattern: /Google|Microsoft|Samantha|Ava|Zira/i
  },
  energetic: {
    rate: 1,
    pitch: 1.08,
    voicePattern: /Google|Microsoft|Samantha|Ava|Zira/i
  }
};
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
  "Kubernetes API server overload: The API server has high latency and controllers are falling behind. How would you use API Priority and Fairness, audit logs, request metrics, and client throttling to find and contain the source?",
  "Kubernetes etcd performance: A self-managed cluster has slow writes and intermittent leader changes in etcd. How would you investigate disk latency, database size, fragmentation, quorum health, snapshots, and safe recovery?",
  "Kubernetes scheduler internals: Walk through the scheduling cycle from an unscheduled Pod to node binding. How do filtering, scoring, preemption, topology spread constraints, and scheduler profiles affect the decision?",
  "Kubernetes scheduling deadlock: Several critical Pods remain Pending even though aggregate cluster capacity appears sufficient. How would you analyze bin-packing, affinity rules, topology constraints, taints, PVC topology, and preemption?",
  "Kubernetes graceful termination: A service drops requests during every rollout despite passing readiness checks. How would you coordinate endpoint removal, preStop, SIGTERM handling, terminationGracePeriodSeconds, load-balancer draining, and application shutdown?",
  "Kubernetes PDB failure scenario: A node upgrade is blocked by PodDisruptionBudgets, but relaxing them could violate availability targets. How would you diagnose the constraints and complete the maintenance safely?",
  "Kubernetes HPA instability: An HPA rapidly scales up and down while latency remains unstable. How would you inspect metric freshness, utilization math, missing requests, stabilization windows, scaling policies, and downstream bottlenecks?",
  "Kubernetes KEDA event scaling: How would you autoscale queue consumers with KEDA while preventing duplicate work, downstream overload, scale-to-zero delays, and retry storms?",
  "Kubernetes CNI debugging: Pod-to-pod traffic fails only across nodes. How would you isolate CNI, routing, encapsulation, MTU, network policy, conntrack, and cloud firewall problems?",
  "Kubernetes DNS at scale: CoreDNS latency and SERVFAIL errors increase during traffic spikes. How would you investigate query amplification, ndots behavior, caching, upstream resolvers, autoscaling, and NodeLocal DNSCache?",
  "Kubernetes conntrack exhaustion: Services intermittently time out while Pods and nodes look healthy. How would you confirm conntrack exhaustion, identify the traffic pattern, mitigate impact, and prevent recurrence?",
  "Kubernetes Gateway API migration: How would you migrate production traffic from Ingress to Gateway API while preserving TLS, routing behavior, policy ownership, observability, rollback, and zero downtime?",
  "Kubernetes zero-trust networking: Design default-deny ingress and egress controls for a multi-tenant cluster. How would you handle DNS, external APIs, service mesh mTLS, policy testing, and emergency access?",
  "Kubernetes admission webhook outage: A validating webhook is timing out and blocking all deployments. How would you restore service safely and redesign failurePolicy, timeouts, replicas, certificates, and break-glass controls?",
  "Kubernetes RBAC privilege escalation: How would you detect and prevent indirect privilege escalation through permissions such as creating Pods, binding roles, impersonating users, reading Secrets, or modifying admission webhooks?",
  "Kubernetes service account token security: How would you replace long-lived tokens with projected bound tokens and external workload identity while controlling audience, expiration, automounting, and token rotation?",
  "Kubernetes StatefulSet recovery: A zonal failure leaves a quorum-based StatefulSet unavailable and volumes cannot attach in another zone. How would you recover while protecting consistency, ordering, identity, and RPO?",
  "Kubernetes CSI failure: PVC provisioning and volume attachment are intermittently failing. How would you debug StorageClass parameters, CSI controller and node plugins, topology, quotas, finalizers, and cloud-provider events?",
  "Kubernetes CRD evolution: You own an operator whose CustomResourceDefinition schema must change without breaking stored objects. How would you handle versioning, conversion webhooks, storage versions, defaulting, and rollback?",
  "Kubernetes operator reconciliation: How would you design an idempotent controller reconciliation loop with finalizers, status conditions, retries, leader election, and protection against hot loops?",
  "Kubernetes GitOps disaster recovery: Git is available but a production cluster and its GitOps controller are lost. How would you rebuild cluster dependencies, secrets, CRDs, operators, and workloads in the correct order and prove recovery objectives?",
  "Kubernetes multi-cluster failover: Design active-active or active-passive application delivery across clusters. How would you solve traffic steering, session state, data consistency, configuration drift, identity, and failback?",
  "Kubernetes noisy neighbor: One tenant causes CPU throttling, memory pressure, and control-plane churn for others. How would you combine quotas, LimitRanges, priority classes, node isolation, fair queuing, and chargeback?",
  "Kubernetes forensic debugging: A container was killed and recreated before engineers captured evidence. What logs, events, audit records, runtime data, core dumps, and ephemeral-container workflows would you establish for post-incident analysis?",
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
  "Stakeholder tradeoff: Product wants faster releases, security wants stricter gates, and SRE wants fewer incidents. How would you align them?",
  "Resume deep-dive - GCP landing zone: Walk me through the GCP landing zone you designed, including project hierarchy, Shared VPC, IAM governance, and policy-as-code. What tradeoffs did you make?",
  "Resume deep-dive - Terraform Enterprise modules: You built reusable Terraform Enterprise modules for networking, IAM, GKE, monitoring, logging, load balancing, and security that cut provisioning effort by 70 percent. Walk me through how you designed and versioned those modules.",
  "Resume deep-dive - GKE administration: You manage production GKE clusters including node pools, upgrades, autoscaling, and RBAC. Walk me through your process for a zero-downtime cluster upgrade.",
  "Resume deep-dive - self-service infrastructure: You integrated Terraform Enterprise with Git-based CI/CD, Harness, Jira, and ServiceNow for self-service delivery. How did approvals and change management work end to end?",
  "Resume deep-dive - Cloud Armor: You designed Cloud Armor WAF policies with Adaptive Protection, rate limiting, and threat intelligence, plus IONIX and Stream Security for attack surface monitoring. Walk me through how these tools work together to stop an attack.",
  "Resume deep-dive - GitHub to Bitbucket migration: You led a GitHub-to-Bitbucket migration that improved engineering productivity by 30 percent. How did you plan the migration, handle CI/CD and webhook changes, and minimize disruption?",
  "Resume deep-dive - cost optimization: You reduced GCP cost by 20 percent through governance, resource right-sizing, and capacity planning. Walk me through the specific levers you pulled and how you measured the savings.",
  "Resume deep-dive - enterprise CI/CD: You built CI/CD platforms with Jenkins, GitHub Actions, Terraform, Docker, Kubernetes, Helm, and Ansible. How did you standardize pipelines across many application teams with different tech stacks?",
  "Resume deep-dive - multi-cloud IaC: You delivered Terraform and Ansible IaC across GCP, AWS, and Azure. What did you do differently for state management, provider versioning, and secrets across three clouds?",
  "Resume deep-dive - DR with Kasten K10: You engineered backup and disaster recovery using Veeam and Kasten K10 for Kubernetes. How would you test that a Kubernetes-native backup actually restores a stateful workload correctly?",
  "Resume deep-dive - GCP migration: You reduced deployment effort by 40 percent automating CI/CD with Jenkins, Cloud Build, and Terraform, and supported an on-prem to GCP migration. What was the riskiest part of that migration and how did you de-risk it?",
  "Current market 2026 - GKE Autopilot vs Standard: For a platform serving 40+ product teams, how would you decide between GKE Autopilot and Standard mode today, and what operational control do you give up with Autopilot?",
  "Current market 2026 - Workload Identity Federation: How would you design keyless authentication from GitHub Actions or another CI system to GCP using Workload Identity Federation instead of long-lived service account keys?",
  "Current market 2026 - Terraform vs OpenTofu: With Terraform's licensing changes and OpenTofu's rise, how would you evaluate whether to stay on Terraform Enterprise or migrate to OpenTofu for a large enterprise estate?",
  "Current market 2026 - Gateway API migration: GKE is moving from Ingress to Gateway API. How would you plan a migration from existing Ingress controllers to Gateway API with zero downtime?",
  "Current market 2026 - image signing and provenance: How would you enforce Binary Authorization with Sigstore/cosign-signed images and SLSA provenance before anything deploys to GKE?",
  "Current market 2026 - GKE Dataplane V2: What operational differences would you expect after enabling GKE Dataplane V2 (Cilium-based), especially for network policies and observability?",
  "Current market 2026 - Config Sync at scale: How would you use Config Sync or Argo CD to enforce consistent policy and configuration across dozens of GKE clusters and thousands of namespaces?",
  "Current market 2026 - Docker BuildKit: How would you use BuildKit/buildx for multi-arch, cache-efficient, reproducible container builds in a modern CI pipeline?",
  "Current market 2026 - node auto-provisioning: GKE node auto-provisioning versus Standard cluster autoscaler - how would you decide which to use for spiky, mixed CPU/GPU workloads?",
  "Current market 2026 - FinOps chargeback: Leadership wants a chargeback/showback model for GKE and Terraform-provisioned infra across 15 teams. How would you design cost attribution without slowing teams down?",
  "Current market 2026 - Terraform state at scale: With hundreds of Terraform workspaces, how do you prevent state drift, blast radius, and slow applies as the platform scales past 50 GCP projects?",
  "Senior scope at 7 years: At 7 years of experience, how would you demonstrate technical leadership across multiple teams during a platform migration, not just individual execution?",
  "Platform engineering scope: How would you draw the line between what a platform team owns and what application teams own, and how would you avoid the platform becoming a bottleneck?",
  "Multi-tenant platform: How would you design multi-tenancy for an internal developer platform so one team's misconfiguration or spike can't affect another team's workloads?",
  "Platform SLAs: What SLAs or SLOs would you define for your own platform team, and how would you measure whether the platform itself is reliable?",
  "Environment as a service: How would you design self-service ephemeral preview environments for pull requests on top of GKE, Terraform, and CI/CD?",
  "Platform team structure: How would you structure a platform engineering team, and what ratio of platform engineers to product teams would you target as the org scales?",
  "You-build-it-you-run-it: How would a platform team enable \"you build it, you run it\" ownership without every team reinventing observability, security, and deployment tooling?",
  "Preventing ClickOps: How would you prevent manual console changes from undermining your Terraform-based golden paths, without blocking legitimate emergency fixes?",
  "Service catalog ownership: How would you design a service catalog that tracks ownership, dependencies, production-readiness status, and on-call rotation for every service on the platform?",
  "Platform cost visibility: How would you give product teams self-service visibility into their own infrastructure cost inside the developer platform, without building a full FinOps tool from scratch?",
  "Golden path versioning: A golden path template changes and existing services are now out of date. How would you roll out the update and measure adoption without breaking running services?",
  "Platform onboarding: What would the first-day experience look like for a new engineer using your internal developer platform to ship their first service to production?",
  "Platform team KPIs: What metrics would convince leadership to keep funding a platform engineering team versus letting application teams manage their own infrastructure?",
  "Self-service guardrails: How would you enforce security and compliance guardrails inside a self-service platform without turning every request into a manual approval bottleneck?",
  "IDP tooling choice: How would you decide between building a custom internal developer platform versus adopting Backstage, Port, or another off-the-shelf IDP?",
  "Platform API design: How would you version a platform self-service API so existing automation doesn't break when you add new capabilities?",
  "Linux CPU utilization: How would you check CPU utilization on a Linux server, and which commands would you use?",
  "Linux memory usage: What commands would you use to check memory usage on a Linux server?",
  "High CPU troubleshooting: How would you troubleshoot a Linux server with high CPU usage, step by step?",
  "top vs htop: What is the difference between top and htop, and when would you use each?",
  "Linux disk usage: How would you check disk usage on a Linux server, and how would you find what is consuming the space?",
  "Linux processes: What is a process in Linux, and how would you find and kill a specific process safely?",
  "Load average: What is load average in Linux, and how do you interpret it relative to CPU core count?",
  "System monitoring approach: How do you approach monitoring systems in production, and what tools have you used?",
  "Sudden CPU spike: A server's CPU usage suddenly spikes to 100 percent. Walk me through exactly what you would do.",
  "Slow system troubleshooting: A system is running slowly. What steps would you take to troubleshoot it?",
  "First logs to check: When an incident starts, which logs do you check first, and why?",
  "DevOps definition: What is DevOps, and what problem does it solve for software teams?",
  "Automation definition: What is automation in a DevOps context, and why does it matter?",
  "Deployment vs DaemonSet: What is the difference between a Deployment and a DaemonSet in Kubernetes?",
  "ServiceAccount basics: What is a Kubernetes ServiceAccount, and how is it different from a regular user account?",
  "Cluster slowness metrics: If a Kubernetes cluster feels slow, what metrics would you check first?",
  "Explain your automation: You mention you have written automation scripts. Walk me through one you are proud of, end to end.",
  "Scenario - Terraform locked state: Terraform apply is stuck because the state lock in GCS was not released after a crashed CI job. How would you safely unlock and verify state integrity?",
  "Scenario - GKE OOMKilled pods: Pods in a GKE cluster keep restarting with OOMKilled after a traffic increase. How would you diagnose and fix it without just raising memory limits blindly?",
  "Scenario - Docker image bloat in CI: A CI pipeline's Docker build time doubled and the image grew from 300MB to 1.2GB after a dependency change. How would you find the cause and fix it?",
  "Scenario - GKE node pool stuck in NotReady: A GKE node pool shows several nodes stuck in NotReady after a Cluster Autoscaler scale-up. How would you triage and recover?",
  "Scenario - Terraform drift after manual fix: An on-call engineer manually edited a firewall rule in the GCP console during an incident, and now Terraform plan wants to revert it. How do you reconcile safely?",
  "Scenario - Ingress cert expiry: Users report TLS warnings on a production GKE service after a cert-manager renewal failed silently. How would you find the root cause and prevent recurrence?",
  "Scenario - GCP quota outage: A batch job fails at 2am because a GCP compute quota was hit in one region. What immediate and long-term steps would you take?",
  "Scenario - noisy neighbor on shared GKE cluster: One team's workload is starving CPU/network from other namespaces on a shared GKE cluster. How would you diagnose and fix it?",
  "PVC with Deployments: Can a Kubernetes Deployment use a PersistentVolumeClaim, and what are the tradeoffs versus using one with a StatefulSet?",
  "Deployment vs StatefulSet for databases: If Deployments can also use PVCs, why do teams still prefer StatefulSets for running databases?",
  "StatefulSet scale-down order: What is the pod termination order when you scale down a StatefulSet, and why does that ordering matter for stateful workloads?",
  "Container root access: How would you prevent processes inside a container from running as root?",
  "Cross-namespace pod communication: Can Pods in different Kubernetes namespaces communicate by default, and how would you restrict or allow it deliberately?",
  "Multi-stage CI/CD pipeline: Walk me through a multi-stage CI/CD pipeline you have built, stage by stage.",
  "Jenkins agent restriction: You have 5 Jenkins agents but only want a specific job to run on 2 of them. How would you configure that?",
  "Skip a Jenkins stage: A pipeline has Stage 0 through Stage 3. How would you configure it so Stage 1 can be skipped on demand?",
  "GCP services experience: Which GCP services have you worked with hands-on, and in what capacity on each?",
  "GKE networking overview: Explain how networking works in GKE at a high level, from Pod IP allocation to external traffic.",
  "Pod-to-pod communication: How do Pods communicate with each other inside the same GKE cluster?",
  "Cross-namespace GKE networking: In GKE specifically, how does cross-namespace Pod communication work at the network layer, and how would a NetworkPolicy change that?",
  "Exposing GKE externally: How would you expose a GKE application to the internet, and what options would you choose between?",
  "Securing external URL: Once an application is exposed externally, how do you secure that public endpoint end to end?",
  "Cloud Armor purpose: What is the purpose of Cloud Armor, and what kinds of threats does it protect against?",
  "Pod internet access: How does a Pod in a private GKE cluster reach the internet if it has no public IP?",
  "Network flow Pod to Internet: Walk through the full network path from a Pod to the internet: Pod, Node, VPC, Cloud NAT, Internet.",
  "Shared VPC definition: What is a Shared VPC in GCP, and why would an organization use one instead of per-project VPCs?",
  "Host Project role: What is a Host Project in a Shared VPC setup?",
  "Service Projects role: What are Service Projects in a Shared VPC, and how do they relate to the Host Project?",
  "Subnet sharing across projects: How are subnets shared across projects in a Shared VPC architecture, and how is access to them controlled?",
  "Bucket design considerations: What should you consider before creating a Cloud Storage bucket for a production workload?",
  "Storage classes: What are the different Cloud Storage storage classes, and how would you choose between them?",
  "Uniform bucket-level access: What is Uniform Bucket-Level Access in Cloud Storage?",
  "Fine-grained access: What is Fine-Grained Access in Cloud Storage, and when would you still need it over uniform access?",
  "GCS authentication: How do applications authenticate to a Cloud Storage bucket?",
  "Read-only IAM role: Which IAM role would you assign to a service account that only needs read-only access to objects in a bucket?",
  "Avoiding service account keys: Why should you avoid using service account keys, and what would you use instead?",
  "Workload Identity: What is Workload Identity, and what problem does it solve?",
  "Cloud Composer experience: Have you worked with Cloud Composer, and in what context?",
  "How Composer works: Explain how Cloud Composer works under the hood.",
  "Composer environment components: What components get created in your project when you provision a Cloud Composer environment?",
  "Self-hosting Airflow: How would you host Apache Airflow yourself outside of Cloud Composer?",
  "Composer project role: What was your specific role in a Cloud Composer project you worked on?",
  "Terraform VM creation: Write Terraform code to create three virtual machines.",
  "Reusable VM module: How would you design a reusable Terraform module for creating virtual machines?",
  "count vs for_each: Would you use count or for_each for creating multiple similar resources in Terraform, and why?",
  "Landing Zone overview: Explain what a Landing Zone is and how an organization's Landing Zone is typically structured.",
  "Landing Zone components: What components typically exist inside a cloud Landing Zone?",
  "Centralized networking/logging/monitoring: How are networking, logging, and monitoring centralized across projects in a Landing Zone?",
  "Project-to-Shared-VPC connection: How are individual projects connected to the Shared VPC in a Landing Zone design?",
  "Scenario - GKE Autopilot vs Standard: A team wants to move a workload to GKE Autopilot for cost and ops simplicity. What tradeoffs would you flag before they commit?",
  "Scenario - private cluster master access: A private GKE cluster's control plane becomes unreachable from a new office network. How would you diagnose and fix authorized network access?",
  "Scenario - Cloud NAT port exhaustion: Outbound calls from GKE Pods start failing intermittently and Cloud NAT logs show port exhaustion. How would you diagnose and remediate it?",
  "Scenario - VPC Service Controls block: A data pipeline suddenly gets permission-denied errors reading from BigQuery after a security team change. How would you determine if VPC Service Controls are the cause and fix it safely?",
  "Scenario - Terraform workspaces vs directories: How would you decide between Terraform workspaces and separate state directories for managing dev, staging, and prod environments?",
  "Scenario - Composer DAG stuck: An Airflow DAG in Cloud Composer has tasks stuck in a queued state for 30 minutes with no errors. How would you triage it?",
  "Scenario - Jenkins shared library: Ten pipelines duplicate the same deployment logic with slight drift between them. How would you refactor this using a Jenkins shared library?",
  "Scenario - IAM conditional binding: Security wants a service account to have Storage Object Viewer only during business hours and only on a specific bucket. How would you implement that in IAM?",
  "Scenario - default-deny NetworkPolicy rollout: You need to introduce a default-deny NetworkPolicy in a shared GKE cluster with many existing teams. How would you roll it out without breaking production traffic?",
  "Today interview 2026-07-06 - AI engineering libraries: What Python libraries are most useful for AI Engineering nowadays?",
  "Today interview 2026-07-06 - Python multiprocessing: Explain multiprocessing in Python. When should you use multiprocessing instead of multithreading?",
  "Today interview 2026-07-06 - Python equality: What does the == operator do in Python?",
  "Today interview 2026-07-06 - Python identity: Explain the difference between == and is in Python, using list examples.",
  "Today interview 2026-07-06 - AWS to GCP migration: Suppose a client has an application running on AWS. How would you migrate it to GCP across discovery, network, IAM, database, storage, CI/CD, validation, cutover, and rollback?",
  "Today interview 2026-07-06 - Terraform IAM recovery: A Terraform change accidentally removed production Service Account permissions. How would you debug and recover?",
  "Today interview 2026-07-06 - Multi-environment architecture: Design a multi-environment architecture for Dev, QA, and Prod.",
  "Today interview 2026-07-06 - Environment availability: How would you manage availability across Dev, QA, and Prod environments?",
  "Today interview 2026-07-06 - Terraform state isolation: How would you isolate infrastructure and Terraform state across environments?",
  "Today interview 2026-07-06 - Safe promotion: How would you promote infrastructure and application changes safely between environments?",
  "Today interview 2026-07-06 - NetworkPolicy and admission control: How do you pair Kubernetes Network Policies with Admission Controllers?",
  "Today interview 2026-07-06 - Partial Terraform apply logs: During a production incident caused by a partially successful Terraform apply, what logs would you check first?",
  "Today interview 2026-07-06 - Early incident detection: How would you design monitoring to detect customer-impacting incidents early?",
  "Today interview 2026-07-06 - Symptom vs cause alerts: Explain symptom-based versus cause-based alerts.",
  "Today interview 2026-07-06 - Burn-rate alerts: What are burn-rate alerts and why are they useful?",
  "Today interview 2026-07-06 - Noisy alerts: How do you reduce noisy alerts?",
  "Today interview 2026-07-06 - Telemetry collection: What telemetry do you collect for a production Kubernetes platform?",
  "Today interview 2026-07-06 - Log correlation: How do you correlate logs across Kubernetes microservices?",
  "Today interview 2026-07-06 - Trace ID: Why should every request carry a Trace ID?",
  "Today interview 2026-07-06 - Structured JSON logging: Explain structured JSON logging.",
  "Today interview 2026-07-06 - OpenTelemetry basics: Explain OpenTelemetry.",
  "Today interview 2026-07-06 - Outage decision-making: During an outage with incomplete information, how do you decide whether to roll back, roll forward, use a feature flag, or shift traffic?",
  "Today interview 2026-07-06 - Terraform module separation: Design Terraform module separation for networking, IAM, GKE, databases, and observability.",
  "Today interview 2026-07-06 - Distributed tracing design: Design distributed tracing for a request flowing through multiple Kubernetes services.",
  "Today interview 2026-07-06 - Rollback strategy: Design a rollback strategy for application and infrastructure changes.",
  "Today interview 2026-07-06 - Feature-flag deployment: Design a feature-flag deployment strategy for production releases.",
  "Today interview 2026-07-06 - Customer issue scenario: Customers report production issues but dashboards are inconclusive. What do you do first?",
  "Today interview 2026-07-06 - Failing request across services: A request is failing across multiple Kubernetes services. How would you trace and debug it?",
  "Today interview 2026-07-06 - Alert fatigue scenario: Alerts are noisy and engineers ignore them. How would you fix the alerting system?",
  "Today interview 2026-07-06 - Similar scenario AWS IAM mapping: During AWS to GCP migration, how would you map IAM roles, service accounts, and secrets safely?",
  "Today interview 2026-07-06 - Similar scenario database cutover: How would you plan database migration and cutover from AWS RDS to Cloud SQL or AlloyDB with minimal downtime?",
  "Today interview 2026-07-06 - Similar scenario Terraform plan review: What checks would you add before Terraform apply to prevent accidental IAM or networking breakage?",
  "Today interview 2026-07-06 - Similar scenario NetworkPolicy rollout: How would you roll out default-deny Network Policies safely in an existing production cluster?",
  "Today interview 2026-07-06 - Similar scenario observability maturity: How would you know whether your observability setup is actually helping incidents instead of just collecting data?",
  "Today interview 2026-07-06 - Similar scenario SLO alert tuning: How would you tune SLO burn-rate alerts for both fast outages and slow reliability degradation?",
  "Today interview 2026-07-06 - Similar scenario trace sampling: How would you choose trace sampling and retention for high-traffic microservices?",
  "Today interview 2026-07-06 - Similar scenario progressive mitigation: A bad release affects only 10 percent of users. How would you decide between rollback, canary pause, feature disablement, and traffic shifting?"
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
  "Docker production readiness: What checks should pass before a Docker image is approved for production?",
  "Scenario - registry outage during deploy: Your container registry becomes unreachable mid-deployment and half the pods are on the new image, half on the old. How do you stabilize the rollout?",
  "Scenario - poisoned base image: A base image your Dockerfiles depend on was found to contain a vulnerable package after being in production for weeks. How do you respond?"
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
  "Python interview coding: Write the approach for a function that calculates SLO compliance and remaining error budget from request totals and failures.",
  "Python type hints: How would you use type hints, dataclasses, and mypy to make a platform automation codebase safer and easier to review?",
  "Python decorators: How would you write a decorator that adds retries, timing, and structured logging to any cloud automation function?",
  "Python context managers: How would you implement a context manager that acquires a distributed lock before running a destructive infrastructure operation?",
  "Python CLI design: How would you design a Python CLI with argparse or Click that supports dry-run, environment selection, and confirmation prompts for risky actions?",
  "Python GCP client patterns: How would you handle pagination, quota errors, and exponential backoff when listing thousands of resources with GCP client libraries?",
  "Python dependency management: How would you manage dependencies, lockfiles, and reproducible builds for an internal Python tool using pip-tools or Poetry?",
  "Python performance: A Python automation script that inventories thousands of GCP resources is too slow. How would you profile it and decide between async, threads, or multiprocessing?",
  "Python mocking: How would you mock GCP and Kubernetes API responses in pytest to test error handling paths like throttling, timeouts, and permission denials?",
  "Scripting experience: Do you have hands-on scripting experience? Which languages do you use most, and why?",
  "Python vs Bash: What is the difference between Python and Bash scripting, and when would you choose one over the other?",
  "Task automation approach: How do you decide what to automate, and how do you approach automating a repetitive manual task?",
  "Python CPU monitor: Write a Python script that monitors and prints current CPU utilization at a regular interval."
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
  "FastAPI production readiness: What checklist would you use before approving a FastAPI service for production?",
  "FastAPI rate limiting: How would you implement rate limiting and request throttling per client for a FastAPI service shared by multiple internal teams?",
  "FastAPI error handling: How would you design exception handlers and error response schemas so clients get consistent, actionable error payloads?",
  "FastAPI versioning: How would you version a FastAPI API without breaking existing consumers, and when would you deprecate an old version?",
  "FastAPI caching: How would you add caching with Redis or Memorystore to a FastAPI endpoint, and how would you handle cache invalidation correctly?",
  "FastAPI WebSockets: When would you use WebSockets instead of polling or Server-Sent Events in a FastAPI service, and what operational risks come with it?",
  "FastAPI multi-tenant design: How would you design request-scoped tenant isolation, quotas, and data access boundaries in a shared FastAPI service?",
  "FastAPI API gateway: How would you deploy FastAPI behind an API gateway or load balancer on GCP, including auth, TLS termination, and request tracing?",
  "FastAPI contract-first design: How would you design an OpenAPI-first FastAPI service so the schema, docs, and client SDKs stay in sync?"
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
  "Today interview 2026-07-06 - Python coding equality: Write a function to compare two values using == and return the result.",
  "Today interview 2026-07-06 - Python coding identity output: Given a = [1, 2], b = [1, 2], and c = a, what do print(a == b), print(a is b), and print(a is c) output and why?",
  "Today interview 2026-07-06 - Python coding multiprocessing example: Write a small Python multiprocessing example using Process, start, and join.",
  "Bash coding: Write a script that exits non-zero when disk usage exceeds a threshold and prints the five largest directories safely.",
  "Bash coding: Write a script that checks an HTTP endpoint with timeout and retries, then emits a machine-readable health result.",
  "Kubernetes coding: Write a Python program using the Kubernetes client that lists unschedulable pods and summarizes their scheduling reasons.",
  "GCP coding: Write a Python program using Google Cloud client libraries that lists public Cloud Storage buckets and handles permission errors.",
  "Terraform coding: Write a validation strategy or test that rejects resources missing required labels and prevents public ingress on port 22.",
  "Anagram check: Write a program to check whether two strings are anagrams of each other.",
  "Find the single unique element: Given an array where every element appears twice except one, write an optimized program to find the unique element.",
  "Time complexity: What is the time and space complexity of your solution to find the single unique element, and why?",
  "XOR trick limitation: Why does the XOR trick fail to find the unique element when there are multiple non-duplicated elements instead of just one?",
  "HackerRank arrays - minimum swaps: Given a permutation of integers from 1 to n, implement minimum_swaps(arr) to return the minimum swaps required to sort it. Target O(n) time and explain cycle decomposition. Test cases: [4, 3, 1, 2] -> 3; [1, 2, 3] -> 0; [2, 1] -> 1.",
  "HackerRank arrays - array manipulation: You are given n zero-initialized elements and queries [left, right, value] that add value to every element in the inclusive range. Return the maximum value without updating every element of every range. Test cases: n=5, queries=[[1,2,100],[2,5,100],[3,4,100]] -> 200; n=1, queries=[] -> 0.",
  "HackerRank strings - Sherlock anagrams: Given a lowercase string, count unordered pairs of substrings that are anagrams. Define how you canonicalize substrings and analyze complexity. Test cases: 'abba' -> 4; 'abcd' -> 0; 'kkkk' -> 10.",
  "HackerRank strings - special palindrome: Count substrings whose characters are all identical, or identical except for one different middle character. Design a solution faster than checking every substring. Test cases: 'asasd' -> 7; 'aaaa' -> 10; 'abcbaba' -> 10.",
  "HackerRank frequency queries: Process insert x, delete one occurrence of x, and check whether any value occurs exactly f times. Each operation should run in average O(1) time. Test case: [[1,5],[1,6],[3,2],[1,5],[1,5],[1,6],[2,5],[3,2]] -> [0,1]. Deleting a missing value must not fail.",
  "HackerRank greedy - luck balance: Each contest has a luck value and importance flag. You may lose at most k important contests. Return maximum achievable luck and justify the greedy choice. Test cases: k=3, contests=[[5,1],[2,1],[1,1],[8,1],[10,0],[5,0]] -> 29; k=0, [[5,1],[10,0]] -> 5.",
  "HackerRank sorting - fraudulent activity notifications: Given expenditures and trailing window d, count days where today's value is at least twice the median of the previous d days. Avoid sorting the full window each day. Test cases: [2,3,4,2,3,6,8,4,5], d=5 -> 2; [1,2,3,4,4], d=4 -> 0.",
  "HackerRank stack - largest rectangle: Given histogram heights, return the largest rectangular area from consecutive bars using an O(n) monotonic stack. Test cases: [1,2,3,4,5] -> 9; [2,1,5,6,2,3] -> 10; [] -> 0; [5] -> 5.",
  "HackerRank stack - balanced brackets with errors: Validate nested (), [], and {} and return the zero-based index of the first invalid character, or -1 when valid. If opening brackets remain, return the index of the earliest unmatched opener. Test cases: '{[()]}' -> -1; '{[(])}' -> 3; '(()' -> 0; ']' -> 0.",
  "HackerRank queue - castle on the grid: Given a square grid with open and blocked cells, find minimum rook-like moves from start to goal. Test case: grid=['.X.','.X.','...'], start=(0,0), goal=(0,2) -> 3. Also test start=goal -> 0 and an unreachable goal -> -1.",
  "HackerRank heap - running median: For a stream of integers, output the median after every insertion using two heaps and state their invariants. Test cases: [12,4,5,3,8,7] -> [12.0,8.0,5.0,4.5,5.0,6.0]; [-1,-2] -> [-1.0,-1.5].",
  "HackerRank intervals - minimum meeting rooms: Given [start,end) intervals, return minimum rooms required in O(n log n); an ending meeting frees its room before another starts at that time. Test cases: [[0,30],[5,10],[15,20]] -> 2; [[7,10],[10,12]] -> 1; [] -> 0.",
  "HackerRank linked lists - cycle entry: Return the node where a singly linked-list cycle begins or None, using O(1) space, and prove Floyd's method. Test cases: 3->2->0->-4 with tail pointing to node 2 -> node 2; 1->2 with tail pointing to head -> node 1; 1->2->None -> None.",
  "HackerRank trees - lowest common ancestor: Given a binary tree and two nodes, return their LCA; explain the change when either node may be absent. Test tree [3,5,1,6,2,0,8,null,null,7,4]: LCA(5,1) -> 3; LCA(5,4) -> 5; missing node -> None in the presence-check version.",
  "HackerRank binary search - machine production: Machines take different days per item. Given a goal, return minimum production days by binary-searching the answer. Test cases: machines=[2,3,2], goal=10 -> 8; [1,3,4], goal=10 -> 7; [5], goal=0 -> 0.",
  "HackerRank graphs - shortest reach: Given an unweighted graph and start node, return distances to all other nodes using edge weight 6 and -1 when unreachable. Test case: n=4, edges=[(1,2),(1,3)], start=1 -> [6,6,-1] for nodes [2,3,4]. Also test a graph with no edges.",
  "HackerRank graphs - roads and libraries: Find minimum cost to give n cities library access using libraries and undirected roads; handle disconnected components. Test cases: n=3, library=2, road=1, edges=[(1,2),(3,1),(2,3)] -> 4; n=6, library=2, road=5, any edges -> 12.",
  "HackerRank dynamic programming - max subset sum: Return maximum sum of non-adjacent elements. Define empty input as 0 and require choosing an element for non-empty all-negative input. Test cases: [3,7,4,6,5] -> 13; [2,1,5,8,4] -> 11; [-2,-3,-1] -> -1; [] -> 0.",
  "HackerRank dynamic programming - abbreviation: Can string a become b by deleting lowercase letters and optionally capitalizing lowercase letters, while uppercase letters cannot be deleted? Test cases: ('daBcd','ABC') -> True; ('AbcDE','ABDE') -> True; ('AbcDE','AFDE') -> False.",
  "HackerRank practical coding - log sessionization: Group unsorted (user_id,timestamp,action) records into sessions where consecutive events are at most 30 minutes apart. Test: u1 events at 10:00, 10:30, 11:01 produce two sessions; events exactly 30 minutes apart stay together; empty input -> [].",
  "HackerRank practical coding - API dependency order: Given services and dependencies where A depends on B, return a valid deployment order or report a cycle, including isolated services. Test cases: services=[api,db,cache], dependencies=[(api,db)] -> db before api with cache anywhere; [(a,b),(b,a)] -> cycle error.",
  "HackerRank practical coding - sliding-window rate limiter: Given chronological timestamped requests by user, return rejected indices when each user may make at most k requests in any rolling 60-second window. Test: k=2, requests=[(u1,0),(u1,10),(u1,20),(u2,20),(u1,60),(u1,71)] -> [2]; requests exactly 60 seconds apart are outside the same window."
];
const debugQuestionBank = [
  `Debug this Jenkinsfile: Find every bug before this pipeline runs.

pipeline { agent any
  environment {
    Docker_image = "my-app-image"
    Docker_tag = "latest"
  }
  Stages {
    stage('Checkout Code') {
      steps {
        git ''
      }
    }
    stage('Build') {
      Steps {
        sh 'echo "build application"'
        sh 'mvn clean package'
      }
    }
    stage('deploy') {
      steps {
        Sh 'kubectl apply -f deployment.yaml'
      }
    }
  }
}`,
  `Debug this Python script: A teammate wrote this CPU monitor and it won't even run. Find every bug.

import plutil
import time

def monitor_cpu(interval = 2)
print("monitoring cpu utilization")

try :
	while True :
		cpu_usage = plutil.cpu_percent(interval=1)
		print(f"Current cpu usage : {cpu_usage}%")`,
  `Debug this Bash script: This health check script is supposed to fail loudly on errors but doesn't. Find every bug.

#!/bin/bash
URL=$1
THRESHOLD=$2
response=$(curl -s -o /dev/null -w %{http_code} $URL)
if [ $response == 200 ]
  echo "Healthy"
else
  echo "Unhealthy, got $response"
fi
disk=$(df / | grep / | awk '{ print $5} ' | sed 's/%//g')
if [ $disk -gt $THRESHOLD ]
  echo "Disk usage critical: $disk%"`,
  `Debug this Terraform snippet: This module fails to plan. Find every bug.

resource "google_compute_instance" "web" {
  name         = "web-server"
  machine_type = e2-medium
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = google_compute_network.vpc.name
  }

  tags = "web-server"
}

resource "google_compute_firewall" "allow_ssh" {
  name    = "allow-ssh"
  network = google_compute_network.vpc.name

  allow {
    protocol = "tcp"
    ports    = 22
  }

  source_ranges = "0.0.0.0/0"
}`,
  `Debug this Dockerfile: This image builds but fails security review and best-practice checks. Find every issue.

FROM ubuntu:latest
ADD . /app
WORKDIR /app
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip3 install -r requirements.txt
ENV DB_PASSWORD=supersecret123
EXPOSE 8080
CMD python3 app.py`,
  `Debug this Kubernetes manifest: This Deployment and Service are supposed to work together but traffic never reaches the pods. Find every bug.

apiVersion: apps/v1
kind: Deployment
metadata:
  name: payments-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: payments
  template:
    metadata:
      labels:
        app: payments-api
    spec:
      containers:
        - name: payments
          image: gcr.io/my-project/payments:v1
          ports:
            - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: payments-svc
spec:
  selector:
    app: payments
  ports:
    - port: 80
      targetPort: 9090`,
  `Debug this GitHub Actions workflow: This deploy workflow has multiple security and correctness problems. Find every issue.

name: deploy
on: pull_request_target

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@main
      - name: Configure GCP
        run: echo "GOOGLE_CREDENTIALS=\${{ secrets.GCP_KEY }}" >> $GITHUB_ENV
      - name: Deploy
        run: |
          echo $GOOGLE_CREDENTIALS
          gcloud deploy releases create --region=us-central1`,
  `Debug this Ansible playbook: This playbook is meant to be safely re-run on every host but breaks idempotency and has a risky default. Find every bug.

- hosts: all
  become: yes
  tasks:
    - name: Install nginx
      command: apt-get install -y nginx

    - name: Copy config
      copy:
        src: nginx.conf
        dest: /etc/nginx/nginx.conf

    - name: Restart nginx
      service:
        name: nginx
        state: restarted

    - name: Open firewall
      command: ufw allow 0.0.0.0/0`,
  `Debug this Python retry helper: This is supposed to retry a flaky API call with backoff, but it can loop forever or swallow real errors. Find every bug.

import requests

def call_api(url, max_retries=3):
    attempt = 0
    while True:
        try:
            response = requests.get(url)
            return response.json()
        except:
            attempt += 1
            print("retrying")`,
  `Debug this Prometheus alert rule: This alert is supposed to page only on sustained high error rate, but it pages on every brief blip. Find every bug.

groups:
  - name: api-alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status="500"}[1m]) > 0
        labels:
          severity: page
        annotations:
          summary: "Error rate is high"`,
  `Debug this Python Kubernetes automation script: This is supposed to find and log CrashLoopBackOff pods across all namespaces, but has a bug that makes it miss most of them. Find every issue.

from kubernetes import client, config

config.load_kube_config()
v1 = client.CoreV1Api()

def find_crashloop_pods():
    pods = v1.list_pod_for_all_namespaces()
    for pod in pods:
        for status in pod.status.container_statuses:
            if status.state.waiting.reason == "CrashLoopBackOff":
                print(pod.name)`,
  `Debug this docker-compose file: This is supposed to run the app with a Postgres database, but the app can never connect. Find every bug.

version: '3'
services:
  app:
    build: .
    ports:
      - 8080:8080
    environment:
      - DB_HOST=localhost
      - DB_PASSWORD=secret
    depends_on:
      - db
  db:
    image: postgres
    environment:
      - POSTGRES_PASSWORD=different_secret`,
  `Debug this Terraform variable and output block: This module fails validation and leaks a secret in plan output. Find every bug.

variable "api_key" {
  type = string
}

variable "environment" {
  type    = string
  default = "prod"
  validation {
    condition     = var.environment in ["dev", "staging", "prod"]
    error_message = "environment must be dev, staging, or prod"
  }
}

output "api_key" {
  value = var.api_key
}`,
  `Debug this shell deployment script: This script is supposed to build, tag, push, and deploy safely, but a single failure anywhere lets it continue to the next step. Find every bug.

#!/bin/bash
IMAGE=my-app
TAG=$(git rev-parse HEAD)

docker build -t $IMAGE:$TAG .
docker push $IMAGE:$TAG
kubectl set image deployment/my-app app=$IMAGE:$TAG
kubectl rollout status deployment/my-app
echo "Deployment complete"`
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
  "Go production readiness: What code review checklist would you use before deploying a Go automation service or controller to production?",
  "Go generics: How would generics help when writing reusable Kubernetes resource helpers, and where would you avoid using them?",
  "Go context propagation: How would you propagate deadlines, cancellation, and request-scoped values across a Go service calling multiple downstream APIs?",
  "Go gRPC: When would you choose gRPC over REST for a platform service, and what would you consider for versioning, streaming, and error handling?",
  "Go worker pools: How would you design a bounded worker pool in Go to process a large batch of cloud resources while preserving per-item errors?",
  "Go profiling: A Go service has unexpected memory growth. How would you use pprof to find the leak and confirm the fix?",
  "Go configuration: How would you manage configuration and secrets for a Go service across local, staging, and production without hardcoding values?",
  "Go container builds: How would you build small, reproducible, multi-arch Docker images for a Go binary in CI?",
  "Go CRDs: How would you design a Custom Resource Definition and reconciliation loop for a Kubernetes operator that manages namespace onboarding?"
];
const llmOpsQuestionBank = [
  "LLM production architecture: How would you design a production LLM-backed service on GCP, covering the API gateway, model routing, caching, observability, and cost controls?",
  "RAG reliability: A retrieval-augmented generation pipeline returns stale or irrelevant context. How would you debug the vector database, embedding pipeline, chunking strategy, and retrieval ranking?",
  "Vector database operations: How would you operate a production vector database, including indexing strategy, reindexing without downtime, backup/restore, and scaling for query latency?",
  "Prompt lifecycle management: How would you version, test, review, and roll back prompt changes the same way you would application code?",
  "LLM gateway design: How would you build an internal LLM gateway that handles authentication, per-team rate limiting, token budget enforcement, and multi-provider fallback?",
  "Token cost control: A GenAI feature's inference cost grew 5x in a month. How would you investigate token usage, caching opportunities, model selection, and prompt length before cutting features?",
  "LLM latency debugging: A chat feature has high p95 latency. How would you separate model inference time, retrieval time, network hops, and streaming/rendering delays?",
  "Prompt injection defense: How would you defend an LLM application against prompt injection and data exfiltration from untrusted user input or retrieved documents?",
  "Agent tool-calling safety: An AI agent can call internal tools and APIs. How would you sandbox tool execution, enforce least privilege, and prevent unintended destructive actions?",
  "LLM evaluation pipeline: How would you build an automated evaluation and regression suite for LLM output quality before shipping a prompt or model change?",
  "LLM observability: What would you trace and log for an LLM request end to end, including prompts, retrieved context, token counts, latency, and model version, without leaking sensitive data?",
  "Model routing and fallback: How would you design fallback between a primary and secondary LLM provider or model when the primary times out, rate-limits, or returns low-confidence output?",
  "Streaming inference infra: How would you design backend infrastructure for streaming LLM responses over GKE/Cloud Run, including timeouts, load balancing, and client reconnects?",
  "GPU serving cost: How would you decide between managed model endpoints, self-hosted GPU serving with vLLM/TGI, and batch inference for different GenAI workloads on cost and latency?",
  "RAG vs fine-tuning vs prompting: How would you decide between prompt engineering, RAG, and fine-tuning for a domain-specific GenAI use case, and how would that decision change operational ownership?",
  "PII and data handling: How would you prevent PII and secrets from leaking into LLM prompts, logs, third-party model providers, and evaluation datasets?",
  "Vertex AI Agent Builder: How would you operate a production Vertex AI Agent Builder or Model Garden deployment, including versioning, monitoring, and rollback?",
  "Vertex AI platform design: How would you design a production ML platform on Vertex AI for training, registry, deployment, monitoring, IAM, and cost control?",
  "Vertex AI custom training: A training job works locally but fails on Vertex AI. How would you debug packaging, container image, service account, data access, and logs?",
  "Vertex AI endpoint latency: A deployed model endpoint has high p95 latency after traffic increases. How would you troubleshoot autoscaling, machine type, model load time, request payloads, and downstream dependencies?",
  "Vertex AI model registry: How would you use Vertex AI Model Registry to manage versions, aliases, lineage, approvals, rollback, and auditability?",
  "Vertex AI batch prediction: When would you choose Vertex AI batch prediction over online endpoints, Dataflow, Cloud Run jobs, or GKE jobs?",
  "Vertex AI Feature Store: How would you design feature freshness, offline/online consistency, access control, lineage, and monitoring for a feature store on GCP?",
  "Vertex AI model monitoring: What would you monitor for skew, drift, attribution drift, data quality, prediction quality, and alert fatigue?",
  "Vertex AI CI/CD: How would you build a CI/CD pipeline that packages training code, compiles pipelines, runs evaluation gates, registers models, and promotes deployments?",
  "Vertex AI security: How would you secure Vertex AI workloads using least-privilege IAM, service accounts, VPC-SC, private networking, CMEK, and audit logs?",
  "Vertex AI cost optimization: A Vertex AI project has rising training and prediction costs. How would you analyze spend and reduce waste without hurting model quality?",
  "MLflow tracking design: How would you structure MLflow experiments, runs, parameters, metrics, tags, artifacts, and naming conventions for a team?",
  "MLflow model registry: How would you use MLflow Model Registry for versioning, approvals, stage transitions, aliases, rollback, and auditability?",
  "MLflow reproducibility: What exactly would you log in MLflow so another engineer can reproduce a model months later?",
  "MLflow artifact storage: How would you design MLflow tracking server, backend store, artifact store, access control, backup, and retention in production?",
  "MLflow CI/CD integration: How would you integrate MLflow with GitHub Actions, Jenkins, or Cloud Build for automated training, evaluation, registration, and deployment?",
  "MLflow on Kubernetes: How would you deploy and operate an MLflow tracking server on GKE, including database, object storage, ingress, auth, and monitoring?",
  "MLflow vs Vertex AI: When would you choose MLflow, Vertex AI Experiments/Model Registry, or use both together in a GCP MLOps platform?",
  "MLflow model serving: How would you deploy an MLflow model for real-time inference using Docker, FastAPI, Kubernetes, KServe, or a managed endpoint?",
  "MLflow governance: How would you enforce model ownership, approval gates, lineage, security scanning, and compliance evidence using MLflow metadata?",
  "MLflow troubleshooting: An MLflow run logged metrics but the model artifact is missing or cannot be loaded. How would you debug it?",
  "Kubeflow platform design: How would you design a production Kubeflow platform on GKE for notebooks, pipelines, training, serving, security, and observability?",
  "Kubeflow Pipelines: How would you design a reusable Kubeflow Pipeline for data validation, training, evaluation, registration, and conditional deployment?",
  "Kubeflow components: How would you package pipeline components as containers, pass artifacts/parameters between steps, and keep them reusable across teams?",
  "Kubeflow multi-user isolation: How would you isolate teams in Kubeflow using namespaces, profiles, RBAC, service accounts, quotas, and network policies?",
  "Kubeflow distributed training: How would you run distributed TensorFlow or PyTorch training on Kubeflow with GPUs, node pools, retries, and checkpointing?",
  "Kubeflow Katib: When would you use Katib for hyperparameter tuning, and how would you control search cost, parallel trials, metrics, and early stopping?",
  "Kubeflow model serving: How would you serve models from Kubeflow using KServe, canary releases, autoscaling, GPU support, and rollback?",
  "Kubeflow CI/CD: How would you integrate Kubeflow Pipelines with GitHub Actions, Jenkins, Cloud Build, ArgoCD, or GitOps?",
  "Kubeflow troubleshooting: A Kubeflow pipeline step is stuck Pending or failing. How would you debug pods, volumes, service accounts, images, logs, and events?",
  "Kubeflow vs MLflow vs Vertex AI: How would you choose between Kubeflow, MLflow, and Vertex AI for a GCP MLOps platform?",
  "MLOps architecture: How would you design an end-to-end production MLOps platform from data ingestion to monitoring and retraining?",
  "MLOps lifecycle ownership: Where do data scientists, ML engineers, platform engineers, SREs, and security teams own different parts of the model lifecycle?",
  "MLOps CI/CD/CT: How would you design continuous integration, continuous delivery, and continuous training for ML systems?",
  "MLOps data validation: What data quality, schema, freshness, and anomaly checks would you add before training or inference?",
  "MLOps model evaluation gates: What offline, online, business, fairness, latency, and reliability gates should a model pass before production?",
  "MLOps monitoring strategy: How would you monitor model quality, data drift, concept drift, latency, errors, feature freshness, and business impact?",
  "MLOps retraining strategy: How would you decide between scheduled retraining, trigger-based retraining, manual retraining, and champion-challenger updates?",
  "MLOps incident response: A production model starts giving bad predictions but infrastructure metrics look healthy. How would you investigate and mitigate?",
  "MLOps governance: How would you make models reproducible, auditable, explainable, secure, and compliant across teams?",
  "MLOps cost and reliability: How would you balance GPU cost, batch vs online serving, autoscaling, SLOs, and rollback for production ML workloads?",
  "MLOps situation - bad model release: A new model version passed offline tests but hurts business KPIs after deployment. What do you do in the first hour?",
  "MLOps situation - data pipeline delay: Training data is delayed by six hours and a retraining job is about to run. How do you decide whether to proceed, skip, or use older data?",
  "MLOps situation - silent schema change: An upstream team changed a column meaning without changing its name. How would you detect, mitigate, and prevent this?",
  "MLOps situation - feature drift alert: Drift monitoring fires during a holiday sale, but revenue is up. How do you avoid a false incident while still protecting the model?",
  "MLOps situation - model serving outage: A model endpoint returns 5xx errors after scaling from 5 to 50 replicas. How would you debug it?",
  "MLOps situation - GPU quota shortage: A critical training job cannot start because GPU quota is exhausted. What immediate and long-term actions would you take?",
  "MLOps situation - model artifact corruption: The registry points to a model artifact that cannot be loaded in production. How do you recover and prevent recurrence?",
  "MLOps situation - rollback conflict: Product wants to keep a faster model, but risk wants rollback because accuracy dropped. How do you lead the decision?",
  "MLOps situation - missing ground truth: The business asks for model accuracy monitoring, but labels arrive after 30 days. What proxy signals and workflow would you design?",
  "MLOps situation - training-serving skew: Offline validation is strong, but online predictions are poor. How would you prove or rule out training-serving skew?",
  "MLOps situation - PII leak risk: You discover raw customer data may be logged in model training or inference logs. What is your response plan?",
  "MLOps situation - expensive experiment culture: Data scientists are launching many large training jobs without cost ownership. How would you introduce guardrails without blocking innovation?",
  "MLOps situation - notebook to production: A data scientist has a high-performing notebook model. How do you turn it into a reliable production pipeline?",
  "MLOps situation - flaky retraining pipeline: A retraining pipeline fails intermittently and teams rerun it manually. How would you stabilize it?",
  "MLOps situation - canary disagreement: Technical metrics look good in canary, but support tickets increase. How do you investigate and decide rollout?",
  "MLOps situation - compliance audit: An auditor asks how a prediction made three months ago was produced. What evidence should your platform provide?",
  "MLOps situation - multi-team platform conflict: One team needs fast experimentation while another needs strict approval gates. How would you design the platform for both?",
  "MLOps situation - stale features: Online feature values are stale but the model endpoint is healthy. How do you detect, mitigate, and redesign?",
  "MLOps situation - disaster recovery: The region hosting your model registry and artifacts is unavailable. How would you continue serving and recover safely?",
  "MLOps situation - interview unknown: You are asked about an MLOps tool you have not used directly. How do you answer honestly while still showing strong engineering judgment?",
  "Multi-tenant AI platform: How would you design tenant isolation, quota enforcement, and cost attribution for an internal platform that serves LLM access to multiple product teams?",
  "Resume deep-dive - Vertex AI Pipelines: Walk me through a Vertex AI Pipeline you built end to end, from training through Vertex AI Model Registry to production deployment.",
  "Resume deep-dive - LLMOps stack: You deployed Llama 3, Mistral, Ollama, and vLLM on Kubernetes. How did you choose between them and scale inference for concurrent users?",
  "Resume deep-dive - GPU cluster ops: You provisioned GPU-enabled GKE clusters with NVIDIA L4/A100 nodes. How did you handle node pool sizing, taints/tolerations, and spot/preemptible GPUs for cost control?",
  "Resume deep-dive - RAG pipeline: Walk me through the RAG pipeline you built, including embedding model choice, vector database, chunking, and how you measured answer quality.",
  "Resume deep-dive - model monitoring: You used Vertex AI Model Monitoring and Evidently AI for drift detection with automated retraining. How did you avoid false-positive retrains?",
  "Resume deep-dive - secure MLOps: You implemented IAM, RBAC, Secrets Manager, and Binary Authorization for AI workloads. Walk me through one specific control and the risk it closed.",
  "Resume deep-dive - GitOps for AI: You used ArgoCD and Helm for AI application deployments. How is a GitOps rollout for model-serving different from a normal microservice rollout?",
  "Scenario - hallucinated compliance answer: An LLM-powered support bot gave a customer incorrect regulatory advice that was later escalated. How would you investigate and prevent recurrence?",
  "Scenario - runaway agent loop: An autonomous agent got stuck in a tool-calling loop overnight and ran up a large API bill. How would you detect this faster and add guardrails?"
];
const ansibleQuestionBank = [
  "Ansible fundamentals: What is Ansible, and how does its agentless, push-based model differ from Terraform or Puppet/Chef?",
  "Ansible idempotency: How do you ensure Ansible playbooks are idempotent, and what happens when a task isn't naturally idempotent?",
  "Ansible inventory: How would you structure dynamic inventory for GCP, AWS, and Azure instances instead of maintaining a static inventory file?",
  "Ansible roles: How would you structure reusable Ansible roles for OS patching, configuration management, and application deployment across many teams?",
  "Ansible Vault: How would you manage secrets in Ansible using Vault, and how would you rotate a vaulted secret without redistributing it manually?",
  "Ansible vs Terraform: When would you use Ansible instead of Terraform, and how would you combine them in the same pipeline, for example Terraform provisions and Ansible configures?",
  "Ansible at scale: How would you run Ansible playbooks against thousands of hosts efficiently, and what would you do about serial execution, forks, and failure handling?",
  "Ansible testing: How would you test Ansible roles and playbooks before running them in production, for example with Molecule or a CI pipeline?",
  "Ansible error handling: How do you handle partial failures in a multi-host Ansible run so one bad host doesn't block the rest of the fleet?",
  "Ansible Jinja2 templating: How would you use Jinja2 templates in Ansible to generate environment-specific configuration files safely?",
  "Ansible Tower/AWX: What does Ansible Tower or AWX add on top of plain ansible-playbook for enterprise teams, such as RBAC, scheduling, and audit logging?",
  "Ansible for DR: You used Ansible for backup automation and disaster recovery. Walk me through how a playbook-driven DR runbook would work end to end.",
  "Ansible OS patching: How would you design a safe, automated OS patching workflow with Ansible that includes health checks, rolling batches, and rollback?",
  "Ansible linting: How would you enforce Ansible code quality using ansible-lint, pre-commit hooks, and code review before merging playbook changes?",
  "Ansible secrets in CI/CD: How would you securely supply an Ansible Vault password or SSH key to a CI/CD pipeline without hardcoding it?",
  "Ansible multi-cloud: You delivered Ansible IaC across GCP, AWS, and Azure. What did you handle differently for authentication and modules across the three clouds?",
  "Ansible with Kubernetes: When would you still use Ansible in a Kubernetes-centric platform, for example bootstrapping nodes or managing non-containerized infrastructure?",
  "Ansible change management: How would you gate risky Ansible changes, like a fleet-wide restart, behind approvals while keeping routine changes fast?",
  "Ansible architecture: Explain the components of Ansible architecture, including the control node, managed nodes, and how they communicate.",
  "Ansible push vs pull: What is the difference between a push-based and a pull-based configuration management model, and where does Ansible fit?",
  "Ansible inventory basics: What is an Ansible inventory file, and what does it typically contain?",
  "Ansible playbooks basics: What are Ansible playbooks, and what does their basic structure look like?",
  "Ansible roles basics: What are roles in Ansible, and why would you use them instead of one large playbook?",
  "Ansible modules basics: What are Ansible modules, and how do they differ from running a raw shell command?",
  "Ansible connectivity: How does Ansible connect to and execute commands on remote machines?",
  "YAML basics: What is YAML, and why is it used as the configuration language for Ansible?",
  "Scenario - partial playbook failure: An Ansible playbook fails on host 40 of 200 mid-rollout, leaving the fleet in mixed state. How do you recover safely?",
  "Scenario - vaulted secret rotation: You need to rotate a secret stored in Ansible Vault across all environments without causing a mid-day outage. How do you plan it?"
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
  "Control validation: How would you test whether a control is actually working, for example privileged access, deployment approval, backup restore, or vulnerability SLA closure?",
  "Scenario - vendor breach notification: A third-party SaaS vendor discloses a data breach affecting a system your team integrates with. Walk through your first 24 hours.",
  "Scenario - audit finds unencrypted backups: An internal audit finds that database backups have been stored unencrypted for 8 months. How would you handle disclosure, remediation, and prevention?"
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
  "Leadership reflection: What does success look like for you in a Technology Risk Lead role after six months?",
  "Scenario - failed access review: An access recertification review reveals 12 terminated employees still have active production access. How do you respond and remediate?",
  "Scenario - conflicting risk appetite: Business wants to launch a feature that Security rates as high risk. How do you drive the decision to resolution?"
];
const hrBehavioralQuestionBank = [
  "Tell me about yourself.",
  "Explain your current role and day-to-day responsibilities.",
  "Why do you want to switch your current job?",
  "Why do you want to work at a product-based company specifically?",
  "What is the most challenging problem you have faced in your career, and how did you handle it?",
  "What are your strengths and weaknesses?",
  "Where do you see yourself in 3 years?",
  "What are the areas you do not know well or have not worked on yet?",
  "What is the difference between theoretical knowledge and real-time, hands-on production experience, and how do you bridge that gap?",
  "Have you worked independently on a project, or always as part of a team? Describe an example.",
  "What would you do if an automation script you wrote failed or caused an unintended change in production?"
];
const basicConceptQuestionBank = [
  "What is DevOps?",
  "What is a DevOps Engineer?",
  "What is the difference between DevOps and Agile?",
  "What is Configuration Management?",
  "What is CI/CD?",
  "What is the difference between Continuous Delivery and Continuous Deployment?",
  "What is Infrastructure as Code (IaC)?",
  "What is a virtual machine (VM), and how does it differ from a container?",
  "What is a container?",
  "What is the difference between a Docker image and a Docker container?",
  "What is a Dockerfile?",
  "How does a multi-stage Docker build work, and what problem does it fix?",
  "What is Kubernetes?",
  "What is a Pod in Kubernetes?",
  "What is a Node in Kubernetes?",
  "What is a Kubernetes namespace?",
  "What is a Kubernetes Deployment?",
  "What is a Kubernetes Service?",
  "How do you upgrade/update a Kubernetes cluster?",
  "How does the GKE API server (control plane) expose traffic, and how do clients reach it?",
  "What is etcd, and what happens to the cluster if etcd goes down?",
  "What does OOMKilled mean, and how do you fix it?",
  "What happens when a Kubernetes node fails and goes NotReady?",
  "What happens to the Horizontal Pod Autoscaler (HPA) if the metrics server goes down during a traffic spike?",
  "What are taints and tolerations in Kubernetes, in one line?",
  "How is a Kubernetes cluster monitored - what tools and approach would you use?",
  "Kubernetes shows a Deployment as healthy and all Pods Running, but Grafana is alerting that the application isn't working properly - how do you investigate and fix this mismatch?",
  "What is a Helm chart?",
  "What is Terraform?",
  "What is a Terraform state file?",
  "What is a Terraform module?",
  "What is Ansible?",
  "How does Ansible help in DevOps and infrastructure automation, in practical terms?",
  "What is an Ansible playbook?",
  "What is a role in Ansible?",
  "What is a task in Ansible?",
  "What is an ad-hoc command in Ansible?",
  "What is the Ansible template module?",
  "What is idempotency?",
  "How would you optimize a Google Cloud Run service that is taking a long time to start (cold starts)?",
  "What is a load balancer?",
  "What is DNS?",
  "What is a firewall?",
  "What is a VPC?",
  "What is a subnet?",
  "In simple terms, how does network traffic flow from a client to a Pod in GKE (client to Load Balancer to Service to Pod)?",
  "What is VPC Peering, and how does it differ from Cloud Interconnect and Partner Interconnect?",
  "What is IAM?",
  "What is RBAC?",
  "What is the difference between a Role and a ClusterRole in Kubernetes RBAC?",
  "What is the difference between a RoleBinding and a ClusterRoleBinding in Kubernetes?",
  "What is GKE Workload Identity?",
  "What is the difference between a stateful and a stateless application?",
  "What is a secret (in the context of Kubernetes or cloud platforms)?",
  "What is autoscaling?",
  "What is the difference between horizontal and vertical scaling?",
  "What is a reverse proxy?",
  "What is TLS/SSL?",
  "What is a container registry?",
  "What is Artifact Registry?",
  "What is Cloud Build, and what does a typical Cloud Build workflow look like?",
  "What is Cloud Deploy?",
  "How does Cloud Armor work to protect a service?",
  "What is a rollback?",
  "What is a blue-green deployment?",
  "What is a canary deployment?",
  "What is a service mesh?",
  "How does Istio work as a service mesh - what is the basic request/traffic flow?",
  "What is observability?",
  "What is the difference between SLA, SLI, and SLO?",
  "What is an error budget?",
  "What is a runbook?",
  "What is a postmortem?",
  "What is version control?",
  "What is a Git branch?",
  "What is a Git merge conflict?",
  "What is git stash?",
  "What is the difference between git fetch and git pull?",
  "What is git cherry-pick used for?",
  "What is git squash?",
  "What is Jenkins?",
  "What is Puppet, and how does it compare to Ansible?",
  "What is the difference between HTTP and HTTPS?",
  "What is a REST API?",
  "What is YAML used for?",
  "What is a cron job?",
  "What is SSH?",
  "What is the difference between a process and a thread?",
  "What is a zombie process, and how do you fix a system that has many of them?",
  "What is a file descriptor limit (ulimit), and how do you fix a \"too many open files\" error?",
  "What is CPU throttling?",
  "What is a message queue?",
  "What is caching?",
  "What is a monolith versus a microservice?",
  "What is a typical CI/CD pipeline flow, stage by stage?",
  "What is a Jenkins pipeline?",
  "What is the difference between a Jenkins declarative pipeline and a scripted pipeline?",
  "What is a Jenkinsfile?",
  "What is a Jenkins agent (node)?",
  "What are Jenkins plugins, and can you name a few commonly used ones?",
  "What is GitLab CI/CD?",
  "What is a .gitlab-ci.yml file?",
  "What is a GitLab CI/CD runner?",
  "What is GitHub Actions?",
  "What is a GitHub Actions workflow file?",
  "What is a GitHub Actions runner?",
  "What is the difference between Jenkins, GitLab CI, and GitHub Actions?"
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
let customSkills = [];

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
    customSkills,
    questionBankIndex,
    usedQuestionKeys,
    technology: els.technology.value,
    practiceDay: els.practiceDay.value,
    mockSet: els.mockSet.value,
    questionOrder: els.questionOrder.value,
    autoNext: els.autoNext.checked,
    autoReadQuestion: els.autoReadQuestion.checked,
    questionVoiceTone: els.questionVoiceTone.value,
    realTimeSimulation: els.realTimeSimulation.checked,
    micLanguage: els.micLanguage.value,
    answerPause: els.answerPause.value,
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
  els.autoReadQuestion.checked = saved.autoReadQuestion !== false;
  els.questionVoiceTone.value = saved.questionVoiceTone || "natural";
  els.realTimeSimulation.checked = saved.realTimeSimulation !== false;
  els.micLanguage.value = saved.micLanguage || "en-IN";
  els.answerPause.value = saved.answerPause || "9500";
  els.technology.value = saved.technology || "all";
  els.questionOrder.value = saved.questionOrder || "random";
  setMode(saved.interviewMode || "live");
  interviewNumber = shouldResetAnswers ? 1 : Number(saved.interviewNumber || 1);
  interviews = !shouldResetAnswers && Array.isArray(saved.interviews) && saved.interviews.length
    ? saved.interviews
    : [createInterview(1)];
  progressHistory = shouldResetAnswers || !Array.isArray(saved.progressHistory) ? [] : saved.progressHistory;
  customSkills = Array.isArray(saved.customSkills) ? saved.customSkills : [];
  renderCustomSkills();
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
  stopQuestionAudio();
  updateQuestionAudioControls();
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

function customSkillId(name) {
  return `custom-${String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

function customSkillById(id) {
  return customSkills.find((skill) => skill.id === id);
}

function customSkillQuestionsFor(name, inputQuestions = "") {
  const manualQuestions = String(inputQuestions || "")
    .split(/\r?\n/)
    .map((line) => line.replace(/^[-*\d.)\s]+/, "").trim())
    .filter(Boolean);
  if (manualQuestions.length) return manualQuestions;

  const skill = String(name || "this technology").trim();
  return [
    `${skill} fundamentals: Explain the core concepts, runtime model, and where you have used it in production.`,
    `${skill} system design: How would you design, deploy, observe, and scale a production service using ${skill}?`,
    `${skill} troubleshooting: A production issue appears after a release involving ${skill}. How would you debug metrics, logs, traces, configuration, and rollback?`,
    `${skill} security: What are the main security risks, dependency risks, secret handling concerns, and access controls for ${skill}?`,
    `${skill} performance: How would you identify bottlenecks, tune performance, and validate improvements for ${skill}?`,
    `${skill} testing and CI/CD: How would you test, package, scan, deploy, and roll back ${skill} changes safely?`,
    `${skill} senior ownership: Describe a project where you used ${skill}, the tradeoffs you made, and the measurable impact.`,
    `${skill} interview deep dive: What mistakes do teams commonly make with ${skill}, and how would you prevent them?`
  ];
}

function addCustomSkillOption(skill) {
  if (!skill?.id || els.technology.querySelector(`option[value="${skill.id}"]`)) return;
  const option = document.createElement("option");
  option.value = skill.id;
  option.textContent = `Custom - ${skill.name}`;
  els.technology.appendChild(option);
}

function renderCustomSkills() {
  customSkills.forEach(addCustomSkillOption);
  if (!customSkills.length) {
    els.customSkillList.innerHTML = `<p class="history-empty">No custom skills yet.</p>`;
    return;
  }
  els.customSkillList.innerHTML = customSkills.map((skill) => `
    <button class="custom-skill-item" type="button" data-skill="${escapeHtml(skill.id)}">
      <span>${escapeHtml(skill.name)}</span>
      <small>${skill.questions.length} question${skill.questions.length === 1 ? "" : "s"}</small>
    </button>
  `).join("");
}

function saveCustomSkill() {
  const name = els.customSkillName.value.trim();
  if (!name) {
    els.feedbackOutput.innerHTML = markdownToHtml("## Missing Skill\nAdd a skill name such as Java, React, AWS, or Spring Boot.");
    return;
  }
  const id = customSkillId(name);
  if (!id) return;
  const questions = customSkillQuestionsFor(name, els.customSkillQuestions.value);
  const existing = customSkills.find((skill) => skill.id === id);
  if (existing) {
    existing.name = name;
    existing.questions = questions;
  } else {
    customSkills.push({ id, name, questions });
  }
  addCustomSkillOption({ id, name });
  els.technology.value = id;
  questionBankIndex = 0;
  usedQuestionKeys = [];
  interviews = [createInterview(1)];
  interviewNumber = 1;
  renderCustomSkills();
  renderInterview();
  saveState();
  els.feedbackOutput.innerHTML = markdownToHtml(`## Custom Skill Added\n${name} is ready with ${questions.length} questions. Click New question to practice it.`);
}

function deleteSelectedCustomSkill() {
  const id = els.technology.value;
  const skill = customSkillById(id);
  if (!skill) {
    els.feedbackOutput.innerHTML = markdownToHtml("## No Custom Skill Selected\nSelect a custom skill from Technology practice before deleting.");
    return;
  }
  customSkills = customSkills.filter((item) => item.id !== id);
  els.technology.querySelector(`option[value="${id}"]`)?.remove();
  els.technology.value = "all";
  questionBankIndex = 0;
  usedQuestionKeys = [];
  interviews = [createInterview(1)];
  interviewNumber = 1;
  renderCustomSkills();
  renderInterview();
  saveState();
  els.feedbackOutput.innerHTML = markdownToHtml(`## Custom Skill Deleted\n${skill.name} was removed from this browser.`);
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
  els.realTimeSimulation.disabled = !liveMode || !SpeechRecognition;
  els.feedbackButton.textContent = liveMode ? "Submit answer" : "Save answer";
  if (!SpeechRecognition) {
    els.micState.textContent = "Speech input unavailable in this browser";
  } else if (liveMode && els.realTimeSimulation.checked) {
    els.micState.textContent = "Simulation: question audio will open the mic";
  } else {
    els.micState.textContent = liveMode
      ? "Live mode: stop mic to submit"
      : "Manual mode: stop mic, then click Save answer";
  }
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

function applyImportedCv(text, message) {
  els.cvText.value = text;
  questionBankIndex = 0;
  usedQuestionKeys = [];
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

// Broad catch-all filters (scenario/scripting/coding/tech-risk-*) match almost any
// section title on generic words like "design" or "engineering". Only the specific,
// single-technology filters are used to decide whether a section title genuinely
// mixes topics (like "Advanced Kubernetes, GCP, Terraform, Python...").
const coreTechnologyKeys = [
  "kubernetes", "docker", "gcp", "terraform", "python", "fastapi", "go",
  "sre", "mlops", "llmops", "cicd", "observability", "security", "networking",
  "linux", "platform", "ansible"
];
const ambiguousSectionCache = new Map();
function isAmbiguousSection(section) {
  if (!section) return true;
  if (ambiguousSectionCache.has(section)) return ambiguousSectionCache.get(section);
  const matchedFilters = coreTechnologyKeys.filter((key) => technologyMatchers[key]?.test(section)).length;
  const ambiguous = matchedFilters > 1;
  ambiguousSectionCache.set(section, ambiguous);
  return ambiguous;
}

function matchesTechnology(question, section = "") {
  if (els.technology.value.startsWith("custom-")) return true;
  if (els.technology.value === "all") return true;
  const matcher = technologyMatchers[els.technology.value];
  if (!matcher) return true;
  // A section title that itself matches more than one technology (e.g. a mixed
  // "Advanced Kubernetes, GCP, Terraform, Python..." section) would otherwise
  // leak every question in it into every one of those filters. Fall back to
  // matching on the question text alone for those sections.
  const effectiveSection = isAmbiguousSection(section) ? "" : section;
  return matcher.test(`${effectiveSection} ${question}`);
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
  if (els.technology.value === "coding") return [...codingQuestionBank, ...debugQuestionBank];
  if (els.technology.value === "llmops") return llmOpsQuestionBank;
  if (els.technology.value === "ansible") return ansibleQuestionBank;
  if (els.technology.value === "tech-risk-technical") return techRiskTechnicalQuestionBank;
  if (els.technology.value === "tech-risk-behavioral") return techRiskBehavioralQuestionBank;
  if (els.technology.value === "hr-behavioral") return hrBehavioralQuestionBank;
  if (els.technology.value === "basic-concepts") return basicConceptQuestionBank;
  if (els.technology.value === "all") {
    return [
      ...scriptingQuestionBank,
      ...dockerQuestionBank,
      ...pythonQuestionBank,
      ...fastApiQuestionBank,
      ...goQuestionBank,
      ...codingQuestionBank,
      ...debugQuestionBank,
      ...llmOpsQuestionBank,
      ...ansibleQuestionBank,
      ...techRiskTechnicalQuestionBank,
      ...techRiskBehavioralQuestionBank,
      ...hrBehavioralQuestionBank,
      ...basicConceptQuestionBank
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
  if (els.technology.value.startsWith("custom-")) {
    return uniqueQuestions(customSkillById(els.technology.value)?.questions || []);
  }

  if (["scripting", "coding", "tech-risk-technical", "tech-risk-behavioral", "hr-behavioral", "basic-concepts"].includes(els.technology.value)) {
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
  const customSkill = customSkillById(els.technology.value);
  const technology = customSkill?.name || technologyLabels[els.technology.value] || technologyLabels.all;
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
  stopAnswerSilenceTimer();
  stopQuestionAudio();
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
  speakQuestionIfEnabled();
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
  stopAnswerSilenceTimer();
  stopQuestionAudio();
  updateQuestionAudioControls();
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
    const providerLabel = data.provider === "claude"
      ? "Claude"
      : data.provider === "offline"
        ? "Offline bank"
        : "Ollama";
    els.status.classList.toggle("ok", Boolean(data.ok));
    els.status.classList.toggle("bad", !data.ok);
    els.statusText.textContent = data.ok ? `${providerLabel} ready: ${data.model}` : `${providerLabel} not reachable`;
  } catch {
    els.status.classList.add("bad");
    els.statusText.textContent = "LLM provider not reachable";
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

function realTimeSimulationEnabled() {
  return currentMode() === "live" && els.realTimeSimulation.checked && Boolean(recognition);
}

function stopAnswerSilenceTimer() {
  if (answerSilenceTimer) {
    clearTimeout(answerSilenceTimer);
    answerSilenceTimer = null;
  }
}

function answerPauseMs() {
  return Number(els.answerPause.value || 9500);
}

function scheduleAnswerSilenceStop() {
  if (!realTimeSimulationEnabled() || !listening) return;
  stopAnswerSilenceTimer();
  answerSilenceTimer = setTimeout(() => {
    if (listening && els.answer.value.trim()) {
      els.micState.textContent = "Silence detected. Submitting answer.";
      recognition.stop();
    }
  }, answerPauseMs());
}

function startSimulationMic() {
  if (!realTimeSimulationEnabled() || listening) return;
  try {
    micStartedBySimulation = true;
    applyRecognitionSettings();
    recognition.start();
  } catch (error) {
    micStartedBySimulation = false;
    els.micState.textContent = "Click Start mic to continue the simulation";
  }
}

function applyRecognitionSettings() {
  if (!recognition) return;
  recognition.lang = els.micLanguage.value || "en-IN";
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 3;
}

function setupSpeech() {
  if (!SpeechRecognition) {
    els.micButton.disabled = true;
    els.micState.textContent = "Speech input unavailable in this browser";
    return;
  }

  recognition = new SpeechRecognition();
  applyRecognitionSettings();

  recognition.onstart = () => {
    listening = true;
    stopAnswerSilenceTimer();
    finalTranscript = els.answer.value.trim();
    els.micButton.textContent = "Stop mic";
    els.micButton.classList.add("active");
    els.micButton.setAttribute("aria-pressed", "true");
    els.micState.textContent = micStartedBySimulation ? "Simulation listening" : "Listening";
  };

  recognition.onresult = (event) => {
    let interim = "";
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const text = bestRecognitionText(event.results[i]);
      if (event.results[i].isFinal) {
        finalTranscript = cleanTranscript(`${finalTranscript ? `${finalTranscript} ` : ""}${text}`);
      } else {
        interim += text;
      }
    }
    els.answer.value = cleanTranscript(`${finalTranscript}${interim ? ` ${interim}` : ""}`);
    renderSessionStats();
    scheduleAnswerSilenceStop();
  };

  recognition.onerror = (event) => {
    if (event.error === "not-allowed") {
      els.micState.textContent = "Microphone blocked";
    } else if (event.error === "no-speech") {
      els.micState.textContent = "No speech detected. Try speaking closer to the mic.";
    } else {
      els.micState.textContent = "Speech input stopped";
    }
  };

  recognition.onend = () => {
    listening = false;
    stopAnswerSilenceTimer();
    els.micButton.textContent = "Start mic";
    els.micButton.classList.remove("active");
    els.micButton.setAttribute("aria-pressed", "false");
    if (els.micState.textContent === "Listening" || els.micState.textContent === "Simulation listening") {
      els.micState.textContent = "Microphone idle";
    }
    micStartedBySimulation = false;
    if (currentMode() === "live" && !submittingFromMic && els.answer.value.trim()) {
      submittingFromMic = true;
      submitAnswer();
    }
  };
}

function bestRecognitionText(result) {
  let best = result[0];
  for (let i = 1; i < result.length; i += 1) {
    if ((result[i].confidence || 0) > (best.confidence || 0)) best = result[i];
  }
  return String(best?.transcript || "").trim();
}

function cleanTranscript(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .replace(/\bgee\s*kay\s*ee\b/gi, "GKE")
    .replace(/\bg\s*k\s*e\b/gi, "GKE")
    .replace(/\bk\s*eight\s*s\b/gi, "K8s")
    .replace(/\bkubernetes\b/gi, "Kubernetes")
    .replace(/\bterraform\b/gi, "Terraform")
    .replace(/\bollama\b/gi, "Ollama")
    .replace(/\bgrafana\b/gi, "Grafana")
    .replace(/\bprometheus\b/gi, "Prometheus")
    .replace(/\bopen telemetry\b/gi, "OpenTelemetry")
    .replace(/\bargo\s*cd\b/gi, "ArgoCD")
    .replace(/\bcloud armor\b/gi, "Cloud Armor")
    .replace(/\bworkload identity\b/gi, "Workload Identity")
    .replace(/\biam\b/gi, "IAM")
    .replace(/\bsli\b/gi, "SLI")
    .replace(/\bslo\b/gi, "SLO")
    .replace(/\bsla\b/gi, "SLA")
    .trim();
}

function updateQuestionAudioControls() {
  const supported = Boolean(speechSynthesisApi && window.SpeechSynthesisUtterance);
  els.speakQuestion.disabled = !supported;
  els.stopQuestionAudio.disabled = !supported || !speechSynthesisApi.speaking;
  els.autoReadQuestion.disabled = !supported;
  if (!supported) {
    els.questionAudioState.textContent = "Question audio unavailable in this browser";
  } else if (!speechSynthesisApi.speaking && !speechSynthesisApi.pending) {
    els.questionAudioState.textContent = "Question audio ready";
  }
}

function preferredQuestionVoice(tonePreset = questionVoiceTonePresets.natural) {
  questionVoices = speechSynthesisApi?.getVoices?.() || [];
  return questionVoices.find((voice) => /^en[-_]/i.test(voice.lang) && tonePreset.voicePattern.test(voice.name)) ||
    questionVoices.find((voice) => /^en[-_]/i.test(voice.lang) && /India|Google|Microsoft|Samantha|Daniel|Alex|Ava/i.test(voice.name)) ||
    questionVoices.find((voice) => /^en[-_]/i.test(voice.lang)) ||
    questionVoices[0] ||
    null;
}

function stopQuestionAudio() {
  if (!speechSynthesisApi) return;
  questionAudioCanceled = true;
  questionAudioRunId += 1;
  speechSynthesisApi.cancel();
  updateQuestionAudioControls();
}

function speakQuestion() {
  if (!speechSynthesisApi || !window.SpeechSynthesisUtterance) {
    updateQuestionAudioControls();
    return;
  }
  const text = els.question.textContent.trim();
  if (!text) return;
  speechSynthesisApi.cancel();
  questionAudioCanceled = false;
  questionAudioRunId += 1;
  const runId = questionAudioRunId;
  const utterance = new SpeechSynthesisUtterance(text);
  const tonePreset = questionVoiceTonePresets[els.questionVoiceTone.value] || questionVoiceTonePresets.natural;
  const voice = preferredQuestionVoice(tonePreset);
  if (voice) utterance.voice = voice;
  utterance.lang = voice?.lang || "en-US";
  utterance.rate = tonePreset.rate;
  utterance.pitch = tonePreset.pitch;
  utterance.onstart = () => {
    els.questionAudioState.textContent = "Reading question";
    updateQuestionAudioControls();
  };
  utterance.onend = () => {
    els.questionAudioState.textContent = "Question audio ready";
    updateQuestionAudioControls();
    if (!questionAudioCanceled && runId === questionAudioRunId) startSimulationMic();
  };
  utterance.onerror = () => {
    if (runId === questionAudioRunId) questionAudioCanceled = false;
    els.questionAudioState.textContent = "Question audio stopped";
    updateQuestionAudioControls();
  };
  speechSynthesisApi.speak(utterance);
}

function speakQuestionIfEnabled() {
  updateQuestionAudioControls();
  if (els.autoReadQuestion.checked) speakQuestion();
}

if (speechSynthesisApi) {
  speechSynthesisApi.onvoiceschanged = () => {
    questionVoices = speechSynthesisApi.getVoices();
    updateQuestionAudioControls();
  };
}

els.micButton.addEventListener("click", () => {
  if (!recognition) return;
  if (listening) {
    stopAnswerSilenceTimer();
    recognition.stop();
  } else {
    micStartedBySimulation = false;
    applyRecognitionSettings();
    recognition.start();
  }
});

els.speakQuestion.addEventListener("click", speakQuestion);
els.stopQuestionAudio.addEventListener("click", stopQuestionAudio);
els.autoReadQuestion.addEventListener("change", () => {
  if (!els.autoReadQuestion.checked) stopQuestionAudio();
  saveState();
});

els.questionVoiceTone.addEventListener("change", () => {
  saveState();
  if (speechSynthesisApi?.speaking) speakQuestion();
});

[els.micLanguage, els.answerPause].forEach((input) => {
  input.addEventListener("change", () => {
    if (!listening) applyRecognitionSettings();
    saveState();
  });
});

els.realTimeSimulation.addEventListener("change", () => {
  if (!els.realTimeSimulation.checked) stopAnswerSilenceTimer();
  updateModeUi();
  saveState();
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

els.addCustomSkill.addEventListener("click", saveCustomSkill);
els.deleteCustomSkill.addEventListener("click", deleteSelectedCustomSkill);
els.customSkillList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-skill]");
  if (!button) return;
  const skill = customSkillById(button.dataset.skill);
  if (!skill) return;
  els.customSkillName.value = skill.name;
  els.customSkillQuestions.value = skill.questions.join("\n");
  els.technology.value = skill.id;
  saveState();
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

els.importCvFile.addEventListener("click", async () => {
  const file = els.cvPdf.files?.[0];
  if (!file) {
    els.feedbackOutput.innerHTML = markdownToHtml("## Missing File\nChoose a CV file first.");
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

  setBusy(els.importCvFile, true, "Importing");
  els.feedbackOutput.textContent = "Extracting CV text from file...";
  try {
    const data = await api("/api/import-cv-file", {
      filename: file.name,
      mimeType: file.type,
      data: await fileToBase64(file)
    });
    applyImportedCv(data.text, `## CV Imported\nExtracted text from \`${file.name}\`. Click Save CV and JD, then New question to start.`);
  } catch (error) {
    els.feedbackOutput.innerHTML = markdownToHtml(`## CV Import Failed\n${error.message}\n\nYou can still paste your CV text manually into the CV / profile context box.`);
  } finally {
    setBusy(els.importCvFile, false, "Import CV file");
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
  stopAnswerSilenceTimer();
  stopQuestionAudio();
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
  stopAnswerSilenceTimer();
  stopQuestionAudio();
  updateQuestionAudioControls();
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

function flashOnUpdate(el) {
  if (!el) return;
  const observer = new MutationObserver(() => {
    el.classList.remove("content-flash");
    void el.offsetWidth;
    el.classList.add("content-flash");
  });
  observer.observe(el, { childList: true, characterData: true, subtree: true });
}
flashOnUpdate(els.question);
flashOnUpdate(els.feedbackOutput);

setupSpeech();
updateQuestionAudioControls();
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
  const selectedCustomSkill = customSkillById(els.technology.value);
  if (selectedCustomSkill) {
    els.customSkillName.value = selectedCustomSkill.name;
    els.customSkillQuestions.value = selectedCustomSkill.questions.join("\n");
  }
  els.feedbackOutput.innerHTML = markdownToHtml(
    `## Technology Practice Selected\n${selectedCustomSkill?.name || technologyLabels[els.technology.value]} has ${poolLength} matching questions. Click New question to start.`
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
