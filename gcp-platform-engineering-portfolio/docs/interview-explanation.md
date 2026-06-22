# Interview Explanation Guide

## 60-Second Explanation

This is a GCP platform engineering reference project. It shows how I would build a reusable cloud platform for application teams using Terraform, GKE, Kubernetes guardrails, CI/CD, security controls, and observability.

The idea is to reduce manual infrastructure work and give teams a safe golden path for deploying services.

## 3-Minute Explanation

The project starts with Terraform modules for network, IAM, Artifact Registry, and GKE. Each environment has its own Terraform configuration, which makes dev and prod separation clear.

On top of GKE, the Kubernetes layer defines standard deployment patterns: namespace, service account, deployment, service, HPA, probes, and resource limits.

The CI/CD pipeline validates Terraform and Kubernetes files before deployment. This helps catch infrastructure and deployment issues before they reach production.

For security, the design includes IAM least privilege, Kubernetes RBAC, Cloud Armor, container scanning notes, and secret-management practices.

For observability, the project defines metrics, alert rules, dashboards, and a troubleshooting runbook so incidents can be diagnosed faster.

## Deep-Dive Talking Points

## Terraform

- Why modules are used
- How environment separation works
- How state should be managed
- How drift is handled
- How reviews happen before apply

## Kubernetes

- Why requests and limits matter
- How readiness and liveness probes reduce bad releases
- How HPA scales workloads
- How service accounts and RBAC improve security
- How to debug CrashLoopBackOff and service routing issues

## GCP

- Why GKE is selected for platform workloads
- When Cloud Run could be better
- How Shared VPC helps centralize networking
- How Cloud Armor protects public workloads
- How Artifact Registry supports image promotion

## Observability

- What metrics matter
- How alerts should be designed
- How runbooks reduce MTTR
- How logs, metrics, and traces work together

## MLOps Angle

The sample app includes a `/predict` endpoint. This is intentional because many platform teams now support ML and GenAI workloads. The same platform patterns apply to inference APIs: health checks, autoscaling, metrics, logs, deployment promotion, rollback, and monitoring.

## Common Interview Questions

- Why did you choose GKE?
- How would you secure this platform?
- How would you deploy to production?
- How would you handle rollback?
- How would you onboard a new team?
- How would you reduce cloud cost?
- How would you troubleshoot high latency?
- How would you make this platform self-service?

