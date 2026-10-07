# upSkilling Portfolio

<!-- project-guide:start -->
## Project guide

[Project architecture](PROJECT_ARCHITECTURE.md) · [Interview questions and answers](INTERVIEW_QA.md)

This portfolio contains independent projects. Choose a project from the catalog below, follow its own setup instructions, and use its architecture and interview guide for the implementation walkthrough.

### Main portfolio components

| Component | Responsibility |
| --- | --- |
| [`github-pages/index.html`](github-pages/index.html) | Portfolio landing page |
| [`README.md`](README.md) | Recruiter navigation and project catalog |
| [`docs/README.md`](docs/README.md) | Portfolio reference notes |
| [`kaggle-mlops-datasets/README.md`](kaggle-mlops-datasets/README.md) | Synthetic data generation and evaluation inputs |
| [`pyMlSystem/README.md`](pyMlSystem/README.md) | Incident operations application |
| [`ai-mock-interviewer/README.md`](ai-mock-interviewer/README.md) | Mock interview application |
| [`linkedin-branding-and-content/README.md`](linkedin-branding-and-content/README.md) | Content and learning workflows |
| [`.gitignore`](.gitignore) | Independent repositories and generated files excluded from this portfolio |

<!-- project-guide:end -->

<!-- repository-summary -->
A curated learning and engineering portfolio spanning DevOps, GCP, Kubernetes, platform engineering, SRE, MLOps, AIOps, generative AI, automation, and interview preparation.
<!-- /repository-summary -->

Senior SRE, GCP DevOps, Platform Engineering, and MLOps portfolio.

This repository is organized as a hands-on showcase for a 7-year cloud engineering profile. It demonstrates practical work across GCP, Kubernetes, Terraform, CI/CD, SRE, observability, security, FinOps, MLOps, Vertex AI, AIOps, GenAI, automation, and technical interview preparation.

## Profile Positioning

Target roles:

- Senior DevOps Engineer
- GCP Cloud Engineer
- Site Reliability Engineer
- Platform Engineer
- MLOps Engineer
- AI Infrastructure Engineer
- Forward Deployed Engineer

Core strengths shown in this repository:

- GCP platform engineering with IAM, VPC, GKE, Cloud Run, Cloud Build, Cloud Monitoring, and Vertex AI
- Kubernetes/GKE production operations, autoscaling, troubleshooting, GitOps, Helm, and policy guardrails
- Terraform, Ansible, GitHub Actions, CI/CD, automation, and infrastructure-as-code practices
- SRE practices: SLIs, SLOs, error budgets, incident response, runbooks, observability, DR, and FinOps
- MLOps and AI infrastructure: model serving, monitoring, drift, feature pipelines, Vertex AI, MLflow, and GenAI operations

## Naming Convention

Top-level folders use lowercase kebab-case names:

```text
domain-purpose-project
```

Examples:

- `gcp-cloud-engineering-portfolio`
- `gcp-platform-engineering-portfolio`
- `mlops-ollama-incident-copilot`
- `github-actions-hands-on-projects`
- `coding-practice-leetcode`

This keeps the GitHub view clean and recruiter-readable.

## Portfolio Map

| Area | Folder | Recruiter Signal |
| --- | --- | --- |
| GCP Cloud Engineering | [`gcp-cloud-engineering-portfolio`](gcp-cloud-engineering-portfolio/) | Deep GCP labs, Terraform, GKE, Cloud Run, security, networking, Vertex AI |
| Platform Engineering | [`gcp-platform-engineering-portfolio`](gcp-platform-engineering-portfolio/) | Terraform Enterprise, private GKE, ArgoCD GitOps, Cloud Armor, CI/CD, Prometheus/Grafana, HPA |
| GKE MLOps Pipeline | [`gcp-mlops-pipeline-showcase`](gcp-mlops-pipeline-showcase/) | Vertex AI retraining, MLflow, FastAPI, KServe, GCS drift monitoring, Pub/Sub and Cloud Run |
| GCP Notebooks | [`gcp-jupyter-projects`](gcp-jupyter-projects/) | BigQuery, Pub/Sub, Vertex AI, GKE rightsizing, FinOps notebooks |
| GCP AIOps | [`gcp-aiops-projects`](gcp-aiops-projects/) | Incident prediction and Cloud Run-ready AIOps workflows |
| MLOps Incident Copilot | [`mlops-ollama-incident-copilot`](mlops-ollama-incident-copilot/) | FastAPI, MLflow, Ollama, incident risk, observability |
| AutoMLOps Platform | [`automlops-platform`](automlops-platform/) | Model serving, FastAPI, Docker, logging, ML lifecycle |
| MLOps Learning | [`mlops-zoomcamp`](mlops-zoomcamp/) | MLOps course implementation and best practices |
| GenAI Projects | [`genai-hands-on-projects`](genai-hands-on-projects/) | RAG, safety gateway, prompt evaluation, Gemini/Vertex AI |
| FDE Playbook | [`fde-engagement-playbook`](fde-engagement-playbook/) | How a forward deployed engagement is scoped, secured, rolled out, and measured |
| FDE Harborline | [`fde-harborline-engagement`](fde-harborline-engagement/) | Customer deployment of a dispatch copilot that never calls an external model |
| FDE Clinic Intake | [`fde-clinic-intake`](fde-clinic-intake/) | After-hours intake that blocks on missing consent and does not store the raw note |
| FDE Ledger Reconcile | [`fde-ledger-reconcile`](fde-ledger-reconcile/) | Idempotent payment matching that refuses to auto-resolve a mismatch |
| FDE Field Parts | [`fde-field-parts`](fde-field-parts/) | Offline spare-part lookup that will not invent a purchase order |
| FDE Outage Desk | [`fde-outage-desk`](fde-outage-desk/) | Life-safety feeders ranked ahead of larger commercial outages |
| FDE Vendor Review | [`fde-vendor-review`](fde-vendor-review/) | Vendor packets that never auto-approve a bank-detail change |
| FDE Deployment Platform | [`customer-deployment-platform`](https://github.com/iarsingh/customer-deployment-platform) | Self-service service requests that render files and refuse to apply production |
| System Health Dashboard | [`system-health-dashboard`](https://github.com/iarsingh/system-health-dashboard) | Host CPU, memory, and disk over a small FastAPI |
| Cloud Cost Analyzer | [`cloud-cost-analyzer`](https://github.com/iarsingh/cloud-cost-analyzer) | Group a GCP or AWS cost export and name the top service |
| Log Analyzer | [`log-analyzer-alerting`](https://github.com/iarsingh/log-analyzer-alerting) | Regex rules that turn log lines into alerts |
| Task API | [`task-management-api`](https://github.com/iarsingh/task-management-api) | JWT-protected task CRUD with tests |
| Deployment Manager | [`fullstack-deployment-manager`](https://github.com/iarsingh/fullstack-deployment-manager) | React and FastAPI list of recorded deployments |
| Provisioning API | [`infra-provisioning-api`](https://github.com/iarsingh/infra-provisioning-api) | Render Terraform locally and refuse production |
| Kubernetes Portal | [`kubernetes-deployment-portal`](https://github.com/iarsingh/kubernetes-deployment-portal) | Helm render that rejects an image tag of latest |
| Multi-Tenant SaaS | [`multi-tenant-saas-platform`](https://github.com/iarsingh/multi-tenant-saas-platform) | Tenant isolation, roles, and a local OAuth token |
| Internal Developer Platform | [`self-service-developer-platform`](https://github.com/iarsingh/self-service-developer-platform) | A catalog request that returns checks, not a cluster apply |
| Docs Assistant | [`ai-docs-assistant`](https://github.com/iarsingh/ai-docs-assistant) | Local embeddings and answers that quote the corpus |
| Incident Investigation | [`ai-incident-investigation`](https://github.com/iarsingh/ai-incident-investigation) | Evidence-backed hypotheses that do not invent a root cause |
| Customer Onboarding | [`customer-onboarding-platform`](https://github.com/iarsingh/customer-onboarding-platform) | A tenant stays blocked until the security gates pass |
| Multi-Cloud Control Plane | [`multi-cloud-control-plane`](https://github.com/iarsingh/multi-cloud-control-plane) | One plan shape for GCP, AWS, and Azure, with no cloud login |
| CloudOps Agent | [`ai-cloudops-agent`](https://github.com/iarsingh/ai-cloudops-agent) | A tool-calling loop over alerts, logs, and manifests |
| FDE Solution Platform | [`fde-customer-solution-platform`](https://github.com/iarsingh/fde-customer-solution-platform) | An engagement stays a readout until the constraint and metric exist |
| RAG + Kubeflow + MLflow Platform | [`rag-kubeflow-mlflow-platform`](rag-kubeflow-mlflow-platform/) | Kubeflow Pipelines SDK build/eval pipeline, MLflow registry promotion gate, Ollama-served RAG API |
| AIOps Projects | [`aiops-hands-on-projects`](aiops-hands-on-projects/) | Log anomaly detection, alert correlation, SLO burn rate |
| CI/CD Projects | [`github-actions-hands-on-projects`](github-actions-hands-on-projects/) | GitHub Actions, Docker, Cloud Run, Terraform, Kubernetes validation |
| Configuration Automation | [`ansible-hands-on-projects`](ansible-hands-on-projects/) | Linux, Docker, GCP VM bootstrap, Kubernetes admin tools |
| MLOps Datasets | [`kaggle-mlops-datasets`](kaggle-mlops-datasets/) | Synthetic MLOps, AIOps, FinOps, GenAI, and security datasets |
| Mock Interview Tool | [`ai-mock-interviewer`](ai-mock-interviewer/) | Local Ollama interview coach and 1120-question bank |
| Job Search System | [`job-applications`](job-applications/) | Recruiter messages, tracker, application profile |
| 60-Day Plan | [`job-switch-60-day-plan`](job-switch-60-day-plan/) | Structured DevOps/GCP/MLOps job switch plan |
| Web Resume | [`web-resume`](web-resume/) | Static recruiter-facing resume site |
| Resume Builder | [`resume-web-builder`](resume-web-builder/) | Resume parser and web resume generator |
| LinkedIn Branding | [`linkedin-branding-and-content`](linkedin-branding-and-content/) | LinkedIn content calendars, post hooks, automation |
| X Content Automation | [`x-content-automation`](x-content-automation/) | Social content automation |
| YouTube Automation | [`youtube-content-automation`](youtube-content-automation/) | YouTube content workflow automation |
| Startup Scaffold | [`startup-scaffold`](startup-scaffold/) | Product thinking for cloud reliability copilot startup |
| Android Practice | [`daily-quest`](daily-quest/) | Android app and Play Store release practice |
| Full Stack Labs | [`full-stack-dev-labs`](full-stack-dev-labs/) | Development fundamentals and practice |
| CampusX ML Learning | [`campusx-ml-learning`](campusx-ml-learning/) | ML/data learning notes |
| Cloud DevOps Training Notes | [`cloud-devops-training-notes`](cloud-devops-training-notes/) | Python/cloud training exercises |
| Udemy Practice | [`udemy-cloud-devops-courses`](udemy-cloud-devops-courses/) | Python automation practice project |
| LeetCode Practice | [`coding-practice-leetcode`](coding-practice-leetcode/) | Coding interview practice |
| GFG Practice | [`coding-practice-gfg`](coding-practice-gfg/) | Python DSA practice |
| Hackathon Projects | [`hackathon-projects`](hackathon-projects/) | Rapid prototyping and experiment workspace |
| Documentation | [`docs`](docs/) | Portfolio notes and GitHub achievement docs |

## Featured Recruiter Projects

### 1. GCP Cloud Engineering Portfolio

Folder: [`gcp-cloud-engineering-portfolio`](gcp-cloud-engineering-portfolio/)

Large GCP portfolio covering cloud foundations, Terraform, GKE, Cloud Run, GitOps, observability, security, FinOps, DR, Ansible, Vertex AI, and MLOps.

Best for:

- GCP Cloud Engineer
- Senior DevOps Engineer
- Platform Engineer
- SRE

### 2. GCP Platform Engineering Portfolio

Folder: [`gcp-platform-engineering-portfolio`](gcp-platform-engineering-portfolio/)

Production-style platform engineering showcase with Terraform Enterprise, GCP project/VPC foundations, private regional GKE, Workload Identity, ArgoCD GitOps, GitHub Actions image promotion, Artifact Registry, Cloud Armor, Prometheus/Grafana, alerting, and HPA load testing.

Best for:

- Platform Engineer
- GCP DevOps Engineer
- SRE

### 3. MLOps Ollama Incident Copilot

Folder: [`mlops-ollama-incident-copilot`](mlops-ollama-incident-copilot/)

Incident-risk model and local LLM copilot for SRE-style remediation guidance.

Best for:

- MLOps Engineer
- AI Infrastructure Engineer
- AIOps Engineer
- SRE

### 4. GCP MLOps Pipeline on GKE

Folder: [`gcp-mlops-pipeline-showcase`](gcp-mlops-pipeline-showcase/)

End-to-end model lifecycle with scikit-learn training, MLflow on GKE, Cloud SQL and Cloud Storage, FastAPI and KServe inference, Prometheus/Grafana metrics, PSI drift detection, Pub/Sub, Cloud Run, and Vertex AI retraining.

Best for:

- MLOps Engineer
- ML Platform Engineer
- AI Infrastructure Engineer
- GCP Platform Engineer

### 5. AI Mock Interviewer

Folder: [`ai-mock-interviewer`](ai-mock-interviewer/)

Local mock interview coach powered by Ollama with random mock questions, microphone input, answer tracking, CV/JD context, and a 1120-question DevOps/MLOps/GCP/Kubernetes interview bank.

Best for:

- Demonstrating AI-assisted tooling
- Interview preparation
- Recruiter-facing learning discipline

### 6. GenAI Hands-On Projects

Folder: [`genai-hands-on-projects`](genai-hands-on-projects/)

RAG API, GenAI safety gateway, prompt evaluation notebook, meeting notes summarizer, and optional Gemini/Vertex AI integration.

Best for:

- GenAI Engineer
- MLOps Engineer
- AI Platform Engineer

## Suggested Recruiter Navigation

For GCP/SRE/DevOps roles:

1. [`gcp-cloud-engineering-portfolio`](gcp-cloud-engineering-portfolio/)
2. [`gcp-platform-engineering-portfolio`](gcp-platform-engineering-portfolio/)
3. [`github-actions-hands-on-projects`](github-actions-hands-on-projects/)
4. [`ansible-hands-on-projects`](ansible-hands-on-projects/)

For MLOps/AI Infrastructure roles:

1. [`mlops-ollama-incident-copilot`](mlops-ollama-incident-copilot/)
2. [`genai-hands-on-projects`](genai-hands-on-projects/)
3. [`gcp-cloud-engineering-portfolio`](gcp-cloud-engineering-portfolio/)
4. [`kaggle-mlops-datasets`](kaggle-mlops-datasets/)

For SRE/AIOps roles:

1. [`aiops-hands-on-projects`](aiops-hands-on-projects/)
2. [`gcp-aiops-projects`](gcp-aiops-projects/)
3. [`mlops-ollama-incident-copilot`](mlops-ollama-incident-copilot/)
4. [`gcp-jupyter-projects`](gcp-jupyter-projects/)

For recruiter profile review:

1. [`web-resume`](web-resume/)
2. [`job-applications`](job-applications/)
3. [`ai-mock-interviewer`](ai-mock-interviewer/)
4. [`linkedin-branding-and-content`](linkedin-branding-and-content/)

## LinkedIn Featured Section Copy

```text
Hands-on Senior SRE/GCP DevOps/MLOps portfolio covering GCP, GKE, Terraform, Kubernetes, CI/CD, GitOps, observability, incident response, FinOps, Vertex AI, MLOps, AIOps, GenAI, and platform engineering.

The repository includes production-style projects, automation labs, interview preparation tools, synthetic datasets, cloud notebooks, and AI-assisted incident/copilot projects.
```

## Short LinkedIn Post

```text
I have reorganized my GitHub upSkilling portfolio for Senior SRE, GCP DevOps, Platform Engineering, and MLOps roles.

It now includes structured hands-on projects across GCP, GKE, Terraform, Kubernetes, CI/CD, GitOps, observability, security, FinOps, Vertex AI, MLOps, AIOps, GenAI, and incident response.

My goal is to show practical engineering depth through real project folders, not just resume keywords.
```

## Documentation checks

Project architecture, interview guides, and local source links are checked automatically on pushes and pull requests. Run the same check locally:

```bash
python3 .github/scripts/validate_project_docs.py
```
