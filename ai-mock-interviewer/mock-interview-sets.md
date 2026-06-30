# Mock Interview Sets for Senior GCP DevOps / SRE

Use one set as one complete mock interview round. Each set has 8 questions and mixes technical depth, troubleshooting, design, reliability, security, and senior ownership.

## Mock Interview 1 - GKE Production Troubleshooting

Focus: GKE, Kubernetes operations, DNS, autoscaling, incident response

1. **GKE/Kubernetes:** Configuration drift: How would you detect and prevent configuration drift across applications, clusters, and cloud infrastructure?
2. **SRE/Reliability:** SRE fundamentals: Design an SLO for a customer-facing API running on GKE. What SLIs would you choose, how would you calculate error budget, and how would it affect releases?
3. **Observability:** Cloud Monitoring: How would you design alerting policies in Google Cloud Monitoring to reduce alert fatigue and focus on user impact?
4. **Networking:** Ingress controller: How would you debug an ingress path returning 404 or 502, from DNS to load balancer to ingress controller to service endpoints?
5. **Security/DevSecOps:** Kubernetes Secrets: How would you compare Kubernetes Secrets, Secret Manager, External Secrets Operator, Sealed Secrets, and CSI drivers?
6. **CI/CD/GitOps:** Pipeline caching: When can ML pipeline caching help, and when can it hide stale data or bad assumptions?
7. **GKE/Kubernetes:** Go services: If asked to build a Kubernetes controller or CLI in Go, how would you approach the design even if Go is not your primary language?
8. **SRE/Reliability:** Reliability review: What would you check before certifying a service as production-ready on GCP/GKE?

## Mock Interview 2 - Terraform and GCP Platform Design

Focus: Terraform modules, state, landing zones, governance, IAM, policy as code

1. **Terraform/IaC:** Terraform expert: How would you design reusable Terraform modules for GCP networking, IAM, GKE, Cloud Run, observability, and security so teams can consume them safely?
2. **GCP Services:** Compute Engine operations: A Linux VM behind a load balancer has high CPU, many TIME_WAIT connections, and intermittent TLS errors. How would you debug it?
3. **Security/DevSecOps:** IAM recommender: How would you use IAM Recommender and audit logs to reduce over-permissioned service accounts safely?
4. **Automation/Platform:** Developer experience: How would you measure whether your platform improves developer experience and delivery speed?
5. **SRE/Reliability:** Capacity incident: A regional capacity shortage affects node pool scaling. How would you mitigate and redesign for resilience?
6. **Networking:** VPC Service Controls: When would you use VPC Service Controls, what problems does it solve, and what operational pain can it introduce?
7. **Terraform/IaC:** GKE multi-cluster: When would you use multiple GKE clusters versus one shared cluster, and how would you handle traffic, identity, policy, and operations?
8. **GCP Services:** BigQuery/data reliability: How would you approach BigQuery or data pipeline reliability when platform teams own infrastructure but data teams own pipelines?

## Mock Interview 3 - SRE Incident and Reliability

Focus: SLI/SLO, error budget, incident command, RCA, capacity, DR

1. **SRE/Reliability:** Alert fatigue: You inherit 500 alerts and noisy on-call. How would you rationalize alerts using SLOs and ownership?
2. **Observability:** Observability maturity: How would you assess whether an organization has mature observability or just many dashboards?
3. **Networking:** TLS rotation: How would you rotate TLS certificates for production ingress without downtime?
4. **GCP Services:** Artifact Registry: How would you design Artifact Registry repositories, IAM, cleanup policies, scanning, and promotion between environments?
5. **Automation/Platform:** Immutable infrastructure: What does immutable infrastructure mean in cloud platforms, and when is mutable infrastructure still acceptable?
6. **CI/CD/GitOps:** CI/CD design: Design a safe promotion workflow from commit to production using GitHub Actions, Cloud Build, Jenkins, artifact promotion, approvals, and rollback.
7. **SRE/Reliability:** SLO burn rate: Explain multi-window multi-burn-rate alerting and how you would tune alerts for fast and slow burns.
8. **Observability:** Cloud Composer/Dataflow: A scheduled data pipeline misses its SLA and downstream dashboards are stale. How would you debug Composer, Dataflow, BigQuery, retries, backfills, and alerting?

## Mock Interview 4 - CI/CD and GitOps

Focus: ArgoCD, Helm, rollback, progressive delivery, secure pipelines

1. **CI/CD/GitOps:** ArgoCD drift: A team says ArgoCD shows drift between Git and the cluster. How would you investigate and safely reconcile it?
2. **Terraform/IaC:** Terraform monorepo vs multi-repo: How would you decide repository structure for Terraform modules, environments, and app teams?
3. **Security/DevSecOps:** Secrets rotation: How would you rotate secrets or keys for production services without downtime?
4. **Observability:** Prometheus scale: Prometheus is overloaded with high cardinality metrics. How would you debug and fix it?
5. **GKE/Kubernetes:** Capacity planning: How would you design capacity planning for GKE node pools supporting both web services and batch or ML workloads?
6. **Automation/Platform:** Pipeline orchestration: Compare Airflow, Dagster, Kubeflow, and Vertex AI Pipelines for ML/platform use cases. How would you choose?
7. **CI/CD/GitOps:** Cloud Build: How would you design Cloud Build pipelines for Docker builds, vulnerability scanning, provenance, tests, and deployment promotion?
8. **Terraform/IaC:** Organization policy: Which GCP org policies would you enforce for a secure baseline, and how would you handle exceptions?

## Mock Interview 5 - Cloud Security and DevSecOps

Focus: IAM, Workload Identity, secrets, supply chain, policy, vulnerability management

1. **Security/DevSecOps:** Supply chain security: How would you implement image scanning, provenance, Binary Authorization, SBOMs, and deployment policies for containers?
2. **GKE/Kubernetes:** Container startup: A container works locally but fails in Kubernetes. How would you debug entrypoint, env vars, filesystem, permissions, and security context?
3. **Terraform/IaC:** Terraform Enterprise: Explain how you would implement Terraform Enterprise workspaces, remote state, policy as code, approvals, and module versioning for a large GCP platform.
4. **Networking:** Hybrid connectivity: A service is slow over VPN or Interconnect. How would you troubleshoot latency, MTU, routes, BGP, firewall rules, and DNS?
5. **CI/CD/GitOps:** Backstage and IDP: How would you design a Backstage-style golden path for creating a new service on GCP with CI/CD, Terraform, monitoring, and security?
6. **Observability:** Observability platform: How would you design observability for a platform team so developers get useful golden signals without creating noisy alerts?
7. **Security/DevSecOps:** Cloud Armor: Design a Cloud Armor and load balancing strategy for an internet-facing service. How would you handle WAF rules, rate limits, exceptions, and observability?
8. **GKE/Kubernetes:** Autoscaling tradeoffs: Explain HPA, VPA, and cluster autoscaler. When can they conflict, and how would you tune them for a production workload?

## Mock Interview 6 - Observability and Performance

Focus: Prometheus, Grafana, OpenTelemetry, logging, latency, high cardinality

1. **Observability:** Firewall governance: How would you design firewall rule ownership, logging, review, and cleanup across many GCP projects?
2. **SRE/Reliability:** ML feature store: What reliability and governance concerns would you consider for an ML feature store?
3. **GKE/Kubernetes:** CrashLoopBackOff: A pod is stuck in CrashLoopBackOff in production. Give me your exact Kubernetes troubleshooting workflow and the commands or signals you would check.
4. **Networking:** Migration: How would you migrate an on-prem application to GCP with minimal downtime? Cover networking, data, CI/CD, observability, security, and rollback.
5. **GCP Services:** Cloud Storage lifecycle: How would you design lifecycle, retention, versioning, object holds, CMEK, and audit logging for compliance-sensitive storage?
6. **Automation/Platform:** OpenTofu: If a company asks about Terraform versus OpenTofu, how would you explain the tradeoffs for enterprise platform teams?
7. **Observability:** Observability: An alert says p95 latency increased from 200ms to 2s after a deployment. How would you investigate using Prometheus, Grafana, Cloud Logging, logs, and traces?
8. **SRE/Reliability:** Kubernetes probes: How would you design readiness, liveness, and startup probes for a slow-starting service to avoid cascading failures?

## Mock Interview 7 - GCP Networking and Load Balancing

Focus: VPC, DNS, load balancers, firewall, interconnect, service networking

1. **Networking:** GKE troubleshooting: A critical service on GKE has intermittent 5xx errors during traffic spikes. Walk me through your debugging approach from load balancer to pod-level metrics.
2. **GCP Services:** Cloud Run security: How would you expose an internal Cloud Run service securely using IAM, ingress settings, VPC connector, load balancer, and service-to-service auth?
3. **SRE/Reliability:** Pub/Sub incident: A downstream service outage caused Pub/Sub backlog. How would you recover safely without overloading dependencies or losing messages?
4. **Security/DevSecOps:** GKE expert: You are asked to design a production GKE platform for multiple product teams. How would you structure clusters, node pools, namespaces, IAM, networking, and deployment ownership?
5. **GKE/Kubernetes:** Commitment planning: How would you decide whether to buy committed use discounts or reservations for GKE/Compute workloads?
6. **Observability:** OpenTelemetry: How would you roll out OpenTelemetry across services and connect traces, metrics, logs, dashboards, and alerts?
7. **Networking:** Cloud DNS: A production service intermittently resolves to an old endpoint. How would you debug DNS TTLs, Cloud DNS records, caches, split-horizon DNS, and client behavior?
8. **GCP Services:** AlloyDB design: When would you choose AlloyDB over Cloud SQL, and what operational considerations would you discuss for HA, backups, scaling, and cost?

## Mock Interview 8 - Platform Engineering and DevEx

Focus: IDP, self-service, golden paths, Backstage, guardrails, developer experience

1. **Automation/Platform:** GitOps: How would you implement GitOps with ArgoCD for Kubernetes workloads across dev, staging, and production while keeping rollbacks and approvals safe?
2. **Terraform/IaC:** Policy as code: How would you use Sentinel, OPA, or policy validation to stop risky GCP changes before apply while keeping developer experience smooth?
3. **CI/CD/GitOps:** DNS migration: How would you migrate DNS zones with minimal risk, and how would you plan TTLs, validation, rollback, and monitoring?
4. **Security/DevSecOps:** Container runtime security: What runtime security controls would you consider for Kubernetes workloads beyond image scanning?
5. **SRE/Reliability:** Incident postmortem quality: What makes a postmortem high quality, and how do you ensure action items actually get completed?
6. **Observability:** ML monitoring tools: How would you combine Vertex AI Model Monitoring, Prometheus, Grafana, MLflow, and Evidently-style checks in one production monitoring design?
7. **Automation/Platform:** Platform roadmap: What would your first 90 days look like as a senior platform engineer joining a product company?
8. **Terraform/IaC:** Drift detection: How would you detect and reconcile drift between Terraform state, real GCP resources, and manual console changes?

## Mock Interview 9 - MLOps and AI Infrastructure

Focus: Vertex AI, model serving, GPUs, MLflow, Kubeflow, model monitoring

1. **MLOps/AI Infra:** MLOps fundamentals: Explain the end-to-end ML lifecycle and where DevOps responsibilities become different from traditional application delivery.
2. **GKE/Kubernetes:** GKE multi-tenancy: How would you design namespace isolation, quotas, RBAC, network policies, admission controls, and observability for many teams in one cluster?
3. **Observability:** Trace sampling: How would you choose tracing sampling rates and make traces useful for debugging high-volume services?
4. **Security/DevSecOps:** IAM troubleshooting: A workload gets permission denied only in production. How would you debug IAM policy, service accounts, Workload Identity, org policy, and audit logs?
5. **Automation/Platform:** Platform API: If you expose self-service infrastructure through an API, what validations, approvals, and audit trails would you build?
6. **GCP Services:** Log correlation: How would you design correlation IDs and structured logging across microservices and async Pub/Sub workflows?
7. **MLOps/AI Infra:** Model monitoring: How would you monitor model serving for latency, error rate, drift, data quality, and business impact?
8. **GKE/Kubernetes:** Kubernetes certificate issue: A cluster has certificate or webhook TLS failures. How would you debug certificate chain, rotation, admission webhooks, and API server errors?

## Mock Interview 10 - Senior Behavioral and Ownership

Focus: leadership, stakeholder communication, tradeoffs, mentoring, postmortems

1. **Leadership/Behavioral:** Backstage plugin: What Backstage plugins or templates would you prioritize for a GCP platform team?
2. **SRE/Reliability:** BigQuery cost and performance: A BigQuery workload became slow and expensive. How would you investigate query patterns, partitioning, clustering, slots, storage, and ownership?
3. **Automation/Platform:** SRE toil: Give examples of toil in DevOps/SRE work and explain how you would measure and reduce it with automation.
4. **Security/DevSecOps:** Load balancing: Design a global external HTTPS load balancing strategy for multiple services. How would you handle SSL, backend health checks, Cloud Armor, CDN, and observability?
5. **CI/CD/GitOps:** Jenkins modernization: A company has old Jenkins pipelines. How would you modernize without disrupting releases?
6. **Observability:** Dashboard design: What dashboards would you build for executives, SREs, platform engineers, and application teams?
7. **Leadership/Behavioral:** Prioritization: You have security backlog, cost pressure, and reliability incidents. How would you prioritize work for the next quarter?
8. **SRE/Reliability:** Runbooks: How would you build a runbook library for common GKE, Terraform, IAM, and networking incidents, and how would you keep it updated?

## Mock Interview 11 - Google-Style Mixed Round

Focus: broad senior GCP DevOps/SRE screening with scenario depth

1. **GKE/Kubernetes:** PDB design: How would you use PodDisruptionBudgets during node upgrades, cluster autoscaling, and planned maintenance?
2. **Terraform/IaC:** Stateful Kubernetes workloads: When would you avoid running stateful workloads on GKE, and if you must run them, how would you design storage, backup, upgrades, and recovery?
3. **SRE/Reliability:** On-call maturity: How would you improve an on-call rotation that has too many alerts, poor runbooks, and slow escalation?
4. **Observability:** GPU cost control: GPU workloads are underutilized and expensive. How would you improve scheduling, quotas, sharing, and monitoring?
5. **Security/DevSecOps:** RBAC: How would you design Kubernetes RBAC for platform, application, security, and CI/CD teams in a shared GKE environment?
6. **MLOps/AI Infra:** Inference optimization: How would you improve model latency and throughput using batching, autoscaling, model format optimization, GPU use, or caching?
7. **GKE/Kubernetes:** Blue-green deployment: When would you choose blue-green over canary, and what GCP/GKE components would you use?
8. **Terraform/IaC:** SDK automation: Compare using Terraform, gcloud, REST APIs, and Python SDKs for platform automation. When would you choose each?

## Mock Interview 12 - Product Company Final Round

Focus: architecture tradeoffs, production readiness, cost, reliability, delivery

1. **GCP Services:** Cloud Run incident: A Cloud Run service has cold-start latency and failed requests after a traffic spike. How would you debug concurrency, min instances, CPU allocation, revisions, and downstream limits?
2. **SRE/Reliability:** GKE scheduling: A deployment is pending because pods cannot be scheduled. How would you debug requests, limits, node capacity, taints, affinities, quotas, and cluster autoscaler?
3. **Terraform/IaC:** Terraform provider upgrades: How would you safely upgrade Terraform and Google provider versions across many workspaces?
4. **Networking:** CoreDNS incident: Services in a cluster intermittently fail DNS resolution. How would you debug CoreDNS, kube-dns metrics, network policies, and upstream DNS?
5. **Automation/Platform:** Bash vs Python: When is Bash acceptable for automation, and when should you rewrite it in Python or Go?
6. **Leadership/Behavioral:** Responsible AI: What checks would you add for bias, explainability, lineage, and responsible AI before approving a model for production?
7. **GCP Services:** Cloud SQL performance: A Cloud SQL database has high CPU and lock contention. How would you debug queries, connections, pooling, indexes, replicas, and app rollout impact?
8. **SRE/Reliability:** Platform engineering: What self-service golden paths would you build for product teams, and what guardrails would you enforce without slowing delivery?

## Mock Interview 13 - Recently Asked GCP Access and Security Round

Focus: Compute Engine SSH, GKE identity, service account keys, signed images, hybrid networking, security, and logging

1. **GCP Services:** Compute Engine SSH troubleshooting: You are not able to SSH into a Compute Engine instance. What could be the reasons, and how would you troubleshoot it?
2. **GCP Services:** Compute Engine SSH access: What do we get when we SSH into a Compute Engine instance?
3. **GKE/Kubernetes:** GKE Workload Identity: You have workloads running on GKE. How would you give only one pod access to Cloud Storage?
4. **Security/DevSecOps:** Service account key security: You know about service account JSON keys. Even if someone has the JSON key, how can you prevent them from creating or accessing resources?
5. **Security/DevSecOps:** GKE image verification: In GKE, anyone can deploy a Docker image. How would you ensure that only verified and signed images are deployed?
6. **Networking:** Hybrid connectivity: How do you connect an on-premises network to a GCP network?
7. **Security/DevSecOps:** GCP security baseline: What additional security measures would you implement for the GCP environment?
8. **Observability:** Cloud Logging analysis: You have logs in Cloud Logging. How would you analyze them?

## Mock Interview 14 - Recently Asked Operations and Docker Round

Focus: log automation, Cloud Functions, Cloud Run, Datadog, latency, cost optimization, Docker, and Dockerfiles

1. **Automation/Platform:** Log automation: Can you automate log analysis or processing?
2. **GCP Services:** Cloud Functions and Cloud Run: Have you used Cloud Functions or Cloud Run? Explain use cases and operational considerations.
3. **Observability:** Datadog: Have you used Datadog, and how would you use it for metrics, logs, traces, dashboards, and alerts?
4. **GCP Services:** Cloud Functions latency: A newly created Cloud Function had high latency for a few minutes and then automatically recovered. What could be the reason?
5. **GCP Services:** GCP cost optimization: How would you reduce the cost of a GCP environment?
6. **Containers:** Docker experience: Have you worked on Docker? Explain the workflows and production concerns you handled.
7. **Containers:** Dockerfiles: Have you written Dockerfiles? What best practices do you follow?
8. **Containers:** Docker build context: What is Docker build context, and why does it matter for build speed, security, and image contents?

## Mock Interview 15 - Docker Fundamentals Round

Focus: Docker basics, Dockerfiles, image size, build behavior, and image security

1. **Containers:** Docker fundamentals: What is Docker, and what problem does it solve?
2. **Containers:** Dockerfile fundamentals: What is a Dockerfile, and how is it used to build an image?
3. **Containers:** Docker CMD vs ENTRYPOINT: What is the difference between CMD and ENTRYPOINT?
4. **Containers:** Docker image optimization: How do you optimize Docker image size?
5. **Containers:** Docker multi-stage builds: What are multi-stage builds, and when would you use them?
6. **Containers:** Docker image security: How do you secure Docker images before deploying them?

## Mock Interview 16 - Kubernetes and GKE Fundamentals Round

Focus: Kubernetes architecture, workload objects, services, ingress, rollouts, probes, and GKE operations

1. **GKE/Kubernetes:** Kubernetes architecture: Explain the architecture of Kubernetes, including control plane and worker-node components.
2. **GKE/Kubernetes:** Kubernetes workload objects: What are Pods, Deployments, ReplicaSets, StatefulSets, and DaemonSets?
3. **GKE/Kubernetes:** StatefulSet vs Deployment: What is the difference between StatefulSet and Deployment?
4. **GKE/Kubernetes:** Kubernetes Service types: What is a Service, and how do ClusterIP, NodePort, and LoadBalancer differ?
5. **GKE/Kubernetes:** Kubernetes ConfigMaps and Secrets: What are ConfigMaps and Secrets, and when would you use each?
6. **GKE/Kubernetes:** Kubernetes Ingress: How does Ingress work, and what components are involved?
7. **GKE/Kubernetes:** Kubernetes rolling updates: How do you perform rolling updates and rollbacks?
8. **GKE/Kubernetes:** Kubernetes probes: How do liveness and readiness probes work?

## Mock Interview 17 - GKE Troubleshooting and Reliability Round

Focus: CrashLoopBackOff, Pending pods, node failure, autoscaling, upgrades, availability, security, and DR

1. **GKE/Kubernetes:** CrashLoopBackOff: A pod is continuously restarting. How would you troubleshoot it?
2. **GKE/Kubernetes:** Pending pods: How do you troubleshoot Pending pods?
3. **GKE/Kubernetes:** Kubernetes node failure: What happens when a node fails, and how do workloads recover?
4. **GKE/Kubernetes:** GKE Cluster Autoscaler: How does Cluster Autoscaler work in GKE?
5. **GKE/Kubernetes:** GKE cluster upgrade: How do you upgrade a GKE cluster safely?
6. **GKE/Kubernetes:** Highly available GKE: How would you design a highly available GKE architecture?
7. **Security/DevSecOps:** Production Kubernetes security: How would you secure a production Kubernetes cluster?
8. **SRE/Reliability:** Disaster recovery: How would you implement disaster recovery for a production platform?

## Mock Interview 18 - Terraform Fundamentals Round

Focus: state, remote backends, locking, loops, modules, environments, imports, lifecycle, secrets, and cost

1. **Terraform/IaC:** Terraform state basics: Explain Terraform state and why it is important.
2. **Terraform/IaC:** Terraform remote state: What is remote state, and why do teams use it?
3. **Terraform/IaC:** Terraform state locking: How do you handle state locking?
4. **Terraform/IaC:** Terraform count vs for_each: What is the difference between count and for_each?
5. **Terraform/IaC:** Terraform modules: What are modules, and how do you use them for reusable infrastructure?
6. **Terraform/IaC:** Terraform environments: How do you manage multiple environments such as dev, staging, and production?
7. **Terraform/IaC:** Terraform import: How do you import existing resources into Terraform safely?
8. **Terraform/IaC:** Terraform lifecycle block: What is the Terraform lifecycle block, and when would you use it?
9. **Terraform/IaC:** Terraform secrets: How do you handle secrets in Terraform?
10. **Terraform/IaC:** Terraform cost optimization: How do you reduce infrastructure cost using Terraform?

## Mock Interview 19 - GCP Architecture and IAM Round

Focus: GCP project architecture, Shared VPC, hub-and-spoke, DNS, NAT, VPN, routing, IAM, Cloud Identity, access, monitoring, and security

1. **GCP Services:** GCP project architecture: Describe a GCP project architecture you have implemented.
2. **Networking:** Shared VPC: Explain Shared VPC and when you would use host and service projects.
3. **Networking:** Hub-and-spoke architecture: Explain hub-and-spoke architecture in GCP.
4. **Networking:** Hub project resources: How do you deploy shared resources in a hub project?
5. **Networking:** Cloud DNS: Explain Cloud DNS.
6. **Networking:** Cloud NAT: Explain Cloud NAT and the problem it solves.
7. **Networking:** VPN Gateway: Explain VPN Gateway and how it connects networks.
8. **Networking:** Cloud Router: Explain Cloud Router and its role with dynamic routing and BGP.
9. **Security/DevSecOps:** GCP IAM: Explain IAM in GCP and how roles are assigned.
10. **Security/DevSecOps:** Cloud Identity: What is Cloud Identity, and how does it relate to users and groups?
11. **Security/DevSecOps:** GCP user access: How do you provide read-only or admin access to users safely?
12. **Security/DevSecOps:** GCP infrastructure security: How do you secure GCP infrastructure?

## Mock Interview 20 - Networking Fundamentals Round

Focus: VPCs, subnets, routing, VPN, firewall rules, DNS, and hybrid connectivity

1. **Networking:** VPC fundamentals: Explain VPC in cloud networking.
2. **Networking:** Public vs private subnet: What is the difference between public and private subnets?
3. **Networking:** Routing fundamentals: Explain routing in a cloud network.
4. **Networking:** VPN connectivity: How does VPN connectivity work between on-premises and cloud?
5. **Networking:** Firewall rules: Explain firewall rules and how you design them safely.
6. **Networking:** DNS resolution: How does DNS resolution work in hybrid or cloud environments?
7. **Networking:** Hybrid connectivity: How do on-premises systems connect to GCP?

## Mock Interview 21 - CI/CD and Azure Identity Round

Focus: CI/CD pipelines, deployment strategies, rollback, Azure IAM, Entra ID, and identity management

1. **CI/CD/GitOps:** CI/CD pipeline: Explain your CI/CD pipeline from code commit to production.
2. **CI/CD/GitOps:** CI/CD tools: Which CI/CD tools have you used, and where did each fit?
3. **CI/CD/GitOps:** Application deployment: How do you deploy applications to Kubernetes, GKE, Cloud Run, or VMs?
4. **CI/CD/GitOps:** Blue-green deployment: Explain blue-green deployment.
5. **CI/CD/GitOps:** Canary deployment: Explain canary deployment.
6. **CI/CD/GitOps:** Deployment rollback: How do you roll back deployments?
7. **Azure:** Azure IAM equivalent: What is the Azure equivalent of IAM?
8. **Azure:** Microsoft Entra ID: Explain Microsoft Entra ID and how it is used.
9. **Azure:** Azure identity management: How do you manage users, groups, roles, and identities in Azure?

## Mock Interview 22 - Monitoring and Scenario Round

Focus: monitoring tools, alerts, production troubleshooting, resource usage, failed deployments, app access, migration, HA, security, and DR

1. **Observability:** Monitoring tools: Which monitoring tools have you used in production?
2. **Observability:** Alert creation: How do you create useful alerts without creating noise?
3. **SRE/Reliability:** Production troubleshooting: How do you troubleshoot production issues end to end?
4. **Observability:** High CPU or memory: How do you investigate high CPU or memory usage?
5. **SRE/Reliability:** Failed production deployment: A production deployment failed. What steps would you take?
6. **SRE/Reliability:** Application inaccessible after deployment: Users cannot access the application after deployment. How would you debug it?
7. **Networking:** On-prem to GCP migration: How would you migrate an application from on-premises to GCP?
8. **SRE/Reliability:** Disaster recovery: How would you implement disaster recovery?
