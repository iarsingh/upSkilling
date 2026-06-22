# Interview Questions

Use these questions for daily practice. Answer out loud first, then write a short final answer.

## Linux

1. How do you check which process is using a port?
2. How do you check disk usage on a Linux server?
3. What will you do if disk space is full in production?
4. What is the difference between `chmod` and `chown`?
5. How do you check running processes?
6. How do you check memory usage?
7. How do you read live logs from a file?
8. What is the difference between soft link and hard link?
9. How do you find large files in a directory?
10. How do you debug high CPU usage?

## Git and CI/CD

1. What is the difference between merge and rebase?
2. What is a pull request?
3. What is CI/CD?
4. What is a GitHub Actions workflow?
5. What is the difference between job and step in GitHub Actions?
6. How do you store secrets in GitHub Actions?
7. How do you build and push a Docker image from GitHub Actions?
8. What is rollback in CI/CD?
9. How do you stop a bad deployment?
10. What checks should run before production deployment?

## Docker

1. What is Docker?
2. What is the difference between image and container?
3. What is a Dockerfile?
4. What is the difference between CMD and ENTRYPOINT?
5. How do you reduce Docker image size?
6. What is a multi-stage build?
7. How do containers communicate with each other?
8. What is Docker volume?
9. What is port mapping?
10. How do you debug a container that exits immediately?

## GCP

1. What is IAM in GCP?
2. What is a service account?
3. What is the difference between primitive and predefined roles?
4. What is VPC?
5. What is the difference between subnet and firewall rule?
6. What is Cloud NAT?
7. What is Artifact Registry?
8. What is Cloud Storage used for in DevOps?
9. What is GKE?
10. How do you secure access to GKE?

## Terraform

1. What is Terraform?
2. What is Terraform state?
3. Why do we use remote state?
4. What is the difference between provider and resource?
5. What is a data source?
6. What is the difference between variable and local?
7. What is a Terraform module?
8. What happens during `terraform plan`?
9. What happens during `terraform apply`?
10. How do you manage dev and prod environments?
11. What is state locking?
12. How do you import existing infrastructure into Terraform?
13. How do you avoid committing secrets in Terraform?
14. What is drift in Terraform?
15. How do you handle Terraform code review?

## Kubernetes

1. What is Kubernetes?
2. What is a pod?
3. What is a deployment?
4. What is the difference between Deployment and StatefulSet?
5. What is a service?
6. What is the difference between ClusterIP, NodePort, and LoadBalancer?
7. What is Ingress?
8. What is ConfigMap?
9. What is Secret?
10. What is the difference between requests and limits?
11. What is readiness probe?
12. What is liveness probe?
13. What is HPA?
14. What is PDB?
15. What is RBAC?
16. How do you debug CrashLoopBackOff?
17. How do you debug ImagePullBackOff?
18. How do you debug a pod stuck in Pending?
19. How do you check pod logs?
20. How do you safely deploy a new version?

## GKE

1. What is GKE?
2. What is the difference between GKE Standard and Autopilot?
3. What is a private GKE cluster?
4. What is Workload Identity?
5. How do node pools work?
6. How do you autoscale workloads in GKE?
7. How do you autoscale nodes in GKE?
8. How do you expose an application on GKE?
9. How do you monitor GKE workloads?
10. How do you reduce GKE cost?

## MLOps

1. What is MLOps?
2. What is the difference between DevOps and MLOps?
3. What is MLflow?
4. What is experiment tracking?
5. What is a model registry?
6. What is model versioning?
7. What is model serving?
8. What is batch inference?
9. What is real-time inference?
10. What is data drift?
11. What is concept drift?
12. How do you monitor a model in production?
13. How do you rollback a bad model?
14. How do you deploy a model on Kubernetes?
15. What is canary deployment for ML models?

## Scenario Questions

1. A production pod is in CrashLoopBackOff. Explain your debugging steps.
2. A deployment is successful, but users cannot access the app. What will you check?
3. Terraform plan wants to delete a production resource. What will you do?
4. A GitHub Actions deployment failed after image build. How will you debug it?
5. GKE cost suddenly increased. What will you check?
6. A model API latency increased after a new release. What will you check?
7. A model accuracy dropped in production. What could be the reason?
8. A private GKE cluster cannot pull images. What will you check?
9. HPA is not scaling pods. What will you check?
10. A secret was committed to GitHub. What is the incident response?

