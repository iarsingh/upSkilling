# 90-Day Learning Plan

Goal: become interview-ready for GCP DevOps, Platform Engineer, Kubernetes Engineer, and entry-level MLOps roles.

## Days 1-20: Linux, Git, Docker, and CI/CD

Focus areas:

- Linux commands, file permissions, processes, ports, logs, disk usage
- Shell scripting basics
- Git and GitHub workflow
- Docker images, containers, Dockerfile, Docker Compose basics
- GitHub Actions CI/CD

Hands-on tasks:

- Create a simple Python or Node.js app.
- Add a Dockerfile.
- Run the app locally in Docker.
- Add a GitHub Actions workflow for lint/test/build.
- Push a Docker image to Docker Hub or GitHub Container Registry.

Interview preparation:

- Linux permissions
- Process and port debugging
- Disk full issue debugging
- Git merge vs rebase
- Docker image vs container
- CMD vs ENTRYPOINT
- CI vs CD

Output by Day 20:

- 1 GitHub repo with Dockerfile and GitHub Actions pipeline
- 1 README with architecture, commands, and screenshots

## Days 21-45: GCP and Terraform

Focus areas:

- GCP IAM, service accounts, roles
- VPC, subnets, firewall rules, NAT
- Compute Engine
- Cloud Storage
- Artifact Registry
- GKE basics
- Terraform providers, resources, variables, locals, outputs, modules, state

Hands-on tasks:

- Create a GCP VPC using Terraform.
- Create dev and prod `tfvars` files.
- Add Cloud Storage remote state.
- Create a GKE cluster using Terraform.
- Add outputs for cluster name, region, and network.

Interview preparation:

- Terraform state
- Remote backend
- Terraform plan/apply/destroy
- Provider vs resource
- Variable vs locals
- Module design
- GCP IAM and service accounts
- Private GKE cluster basics

Output by Day 45:

- 1 Terraform repo for GCP network and GKE
- Clean README with setup, variables, commands, and teardown steps

## Days 46-70: Kubernetes and GKE

Focus areas:

- Pods, ReplicaSets, Deployments
- Services: ClusterIP, NodePort, LoadBalancer
- ConfigMap and Secret
- Ingress
- Requests and limits
- Readiness and liveness probes
- HPA
- PDB
- RBAC
- Helm basics

Hands-on tasks:

- Deploy an app to GKE.
- Add ConfigMap and Secret.
- Add requests and limits.
- Add readiness and liveness probes.
- Add HPA.
- Expose the app using Ingress.
- Create a Helm chart for the app.

Interview preparation:

- Pod lifecycle
- Deployment vs StatefulSet
- Service types
- Readiness vs liveness probe
- Requests vs limits
- HPA workflow
- CrashLoopBackOff debugging
- ImagePullBackOff debugging
- RBAC basics

Output by Day 70:

- 1 Kubernetes deployment project
- 1 Helm chart
- 1 debugging notes file

## Days 71-90: MLOps Basics

Focus areas:

- ML lifecycle
- Training vs serving
- MLflow tracking
- Model registry
- Model API with FastAPI
- Dockerized model serving
- Kubernetes model deployment
- Model monitoring basics
- Data drift vs concept drift
- Canary deployment for model APIs

Hands-on tasks:

- Train a simple model.
- Track experiments with MLflow.
- Save and version the model.
- Build a FastAPI model-serving API.
- Dockerize the API.
- Deploy it on Kubernetes.
- Add GitHub Actions for build and deploy.

Interview preparation:

- MLOps vs DevOps
- Model registry
- Model versioning
- Batch vs real-time inference
- Data drift vs concept drift
- Model monitoring
- Canary deployment for ML models
- Rollback strategy for bad model releases

Output by Day 90:

- 1 complete MLOps mini-platform project
- 1 polished README
- 1 architecture diagram
- 10-15 interview stories using STAR format

## Weekly Review

Every Sunday:

- Update README screenshots and commands.
- Write what broke and how it was fixed.
- Pick 10 interview questions and answer them out loud.
- Apply to 20-30 roles.

