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

## Mock Interview 26 - Technology Risk Fundamentals

Focus: technology risk basics, risk assessment lifecycle, risk appetite, registers, heat maps, and prioritization

1. **Technology Risk:** What is Technology Risk?
2. **Technology Risk:** What are the different types of technology risks?
3. **Technology Risk:** How do you perform a technology risk assessment?
4. **Technology Risk:** What is inherent risk vs residual risk?
5. **Technology Risk:** What is risk appetite and risk tolerance?
6. **Technology Risk:** How do you prioritize risks?
7. **Technology Risk:** Explain the risk management lifecycle.
8. **Technology Risk:** What is a risk register?
9. **Technology Risk:** What information should a risk register contain?
10. **Technology Risk:** How do you create a risk heat map?

## Mock Interview 27 - Technology Risk Assessment

Focus: cloud application risk assessment, identification techniques, scoring, FMEA, scenario analysis, and treatment options

1. **Risk Assessment:** Walk me through a risk assessment for deploying a new cloud application.
2. **Risk Assessment:** How do you identify technology risks?
3. **Risk Assessment:** What techniques do you use for risk identification?
4. **Risk Assessment:** What is qualitative vs quantitative risk analysis?
5. **Risk Assessment:** Explain likelihood and impact scoring.
6. **Risk Assessment:** How do you calculate risk severity?
7. **Risk Assessment:** What is FMEA?
8. **Risk Assessment:** What is scenario analysis?
9. **Risk Assessment:** Explain risk acceptance, avoidance, mitigation, and transfer.
10. **Risk Assessment:** Give an example of a risk you mitigated.

## Mock Interview 28 - IT Controls

Focus: preventive, detective, corrective, compensating controls, least privilege, RBAC, segregation of duties, and control monitoring

1. **IT Controls:** What are preventive controls?
2. **IT Controls:** What are detective controls?
3. **IT Controls:** What are corrective controls?
4. **IT Controls:** Give examples of each control type in cloud infrastructure.
5. **IT Controls:** How do you validate control effectiveness?
6. **IT Controls:** What is segregation of duties?
7. **IT Controls:** What is least privilege?
8. **IT Controls:** Explain RBAC.
9. **IT Controls:** What are compensating controls?
10. **IT Controls:** How do you monitor control failures?

## Mock Interview 29 - SDLC and Secure Development Risk

Focus: risk in SDLC, BRD/PRD review, architecture review, Secure SDLC, threat modeling, STRIDE, and DevSecOps

1. **SDLC/Secure Development:** How do you integrate risk into SDLC?
2. **SDLC/Secure Development:** What risks should be reviewed during BRD/PRD?
3. **SDLC/Secure Development:** How do you review architecture from a risk perspective?
4. **SDLC/Secure Development:** What security controls should exist before production deployment?
5. **SDLC/Secure Development:** Explain Secure SDLC.
6. **SDLC/Secure Development:** What are threat modeling techniques?
7. **SDLC/Secure Development:** What is STRIDE?
8. **SDLC/Secure Development:** What is attack surface?
9. **SDLC/Secure Development:** What is shift-left security?
10. **SDLC/Secure Development:** How do DevSecOps practices reduce risk?

## Mock Interview 30 - Governance and Compliance

Focus: ISO 27001, NIST CSF, COBIT, FAIR, audits, evidence, and audit finding management

1. **Governance/Compliance:** What is ISO 27001?
2. **Governance/Compliance:** Explain the ISO 27001 Annex A controls.
3. **Governance/Compliance:** What is NIST Cybersecurity Framework?
4. **Governance/Compliance:** What are the five NIST functions?
5. **Governance/Compliance:** What is COBIT?
6. **Governance/Compliance:** What is the difference between ISO 27001 and NIST?
7. **Governance/Compliance:** What is FAIR?
8. **Governance/Compliance:** What is an IT audit?
9. **Governance/Compliance:** What evidence is typically collected during audits?
10. **Governance/Compliance:** How do you manage audit findings?

## Mock Interview 31 - Cloud Risk

Focus: cloud shared responsibility, GCP security, IAM, Kubernetes, Terraform, secrets, and misconfiguration risk

1. **Cloud Risk:** What are cloud security risks?
2. **Cloud Risk:** Explain the Shared Responsibility Model.
3. **Cloud Risk:** What are the risks of public cloud?
4. **Cloud Risk:** How do you secure GCP projects?
5. **Cloud Risk:** What are IAM best practices?
6. **Cloud Risk:** What risks exist in Kubernetes clusters?
7. **Cloud Risk:** What are the risks of Terraform automation?
8. **Cloud Risk:** How do you secure Terraform state files?
9. **Cloud Risk:** How do you approach secrets management?
10. **Cloud Risk:** What are common cloud misconfiguration risks?

## Mock Interview 32 - Kubernetes and DevOps Risk

Focus: CI/CD risks, Jenkins, GitHub Actions, supply chain security, SBOM, image signing, runtime security, Helm, RBAC, and privileged containers

1. **Kubernetes/DevOps Risk:** What are the risks of CI/CD pipelines?
2. **Kubernetes/DevOps Risk:** How do you secure Jenkins?
3. **Kubernetes/DevOps Risk:** What are the risks of GitHub Actions?
4. **Kubernetes/DevOps Risk:** What is supply chain security?
5. **Kubernetes/DevOps Risk:** What is an SBOM?
6. **Kubernetes/DevOps Risk:** Explain image signing.
7. **Kubernetes/DevOps Risk:** What is runtime security?
8. **Kubernetes/DevOps Risk:** What are the risks of Helm charts?
9. **Kubernetes/DevOps Risk:** What are Kubernetes RBAC risks?
10. **Kubernetes/DevOps Risk:** What are the risks of privileged containers?

## Mock Interview 33 - Incident Management Risk

Focus: incident process, problem management, RCA, postmortems, 5 Whys, near misses, recurrence prevention, KPIs, MTTD, and MTTR

1. **Incident Management:** Describe your incident management process.
2. **Incident Management:** What is the difference between incident, problem, and risk?
3. **Incident Management:** How do you perform Root Cause Analysis?
4. **Incident Management:** What is a postmortem?
5. **Incident Management:** Explain the 5 Whys technique.
6. **Incident Management:** What is a near miss?
7. **Incident Management:** How do you prevent recurring incidents?
8. **Incident Management:** What KPIs do you track?
9. **Incident Management:** What is Mean Time to Detect (MTTD)?
10. **Incident Management:** What is Mean Time to Recover (MTTR)?

## Mock Interview 34 - Risk Monitoring and Reporting

Focus: risk metrics, dashboards, leadership reporting, KRIs, KPIs, cloud posture, SIEM, vulnerability prioritization, trends, and business impact

1. **Monitoring/Reporting:** What risk metrics do you monitor?
2. **Monitoring/Reporting:** What should a risk dashboard include?
3. **Monitoring/Reporting:** How do you report risks to leadership?
4. **Monitoring/Reporting:** Explain Key Risk Indicators (KRIs).
5. **Monitoring/Reporting:** What is the difference between KRIs and KPIs?
6. **Monitoring/Reporting:** How do you monitor cloud security posture?
7. **Monitoring/Reporting:** What SIEM tools have you used?
8. **Monitoring/Reporting:** How do you prioritize vulnerabilities?
9. **Monitoring/Reporting:** What is risk trending?
10. **Monitoring/Reporting:** How do you communicate business impact?

## Mock Interview 35 - Architecture Review Risk

Focus: architecture approval, third-party risk, SPOFs, HA, DR, RTO/RPO, BCP, Zero Trust, and common architecture risks

1. **Architecture Review:** What do you review before approving an architecture?
2. **Architecture Review:** How do you evaluate third-party risk?
3. **Architecture Review:** What questions do you ask during architecture reviews?
4. **Architecture Review:** How do you identify single points of failure?
5. **Architecture Review:** Explain High Availability from a risk perspective.
6. **Architecture Review:** Explain Disaster Recovery.
7. **Architecture Review:** What is the difference between RTO and RPO?
8. **Architecture Review:** What is Business Continuity Planning?
9. **Architecture Review:** Explain Zero Trust Architecture.
10. **Architecture Review:** What are common architecture risks?

## Mock Interview 36 - Audit and Compliance Scenarios

Focus: shared access, Terraform state secrets, Jenkins credentials, public dashboards, GCP Owner access, patching gaps, logging, vulnerabilities, encryption, and public buckets

1. **Audit/Compliance Scenarios:** An auditor finds that production access is shared among developers. What do you do?
2. **Audit/Compliance Scenarios:** Terraform state contains database passwords. How would you fix this?
3. **Audit/Compliance Scenarios:** Jenkins stores credentials in plain text. What actions would you take?
4. **Audit/Compliance Scenarios:** Kubernetes dashboard is publicly accessible. What risks exist?
5. **Audit/Compliance Scenarios:** A developer requests Owner access in GCP. Would you approve it?
6. **Audit/Compliance Scenarios:** Your audit finds that 50 VMs have no patching process. What is your response?
7. **Audit/Compliance Scenarios:** Cloud logging has been disabled. Why is this a risk?
8. **Audit/Compliance Scenarios:** A critical vulnerability is found in production. What steps would you follow?
9. **Audit/Compliance Scenarios:** An application stores customer data without encryption. What are the risks?
10. **Audit/Compliance Scenarios:** Public storage buckets are discovered. How would you respond?

## Mock Interview 37 - Technology Risk Behavioural Questions

Focus: risk leadership, stakeholder influence, audit lessons, incidents, balancing delivery and security, hidden risks, priorities, and career motivation

1. **Leadership/Behavioural:** Tell me about a difficult technology risk you managed.
2. **Leadership/Behavioural:** Describe a situation where engineering disagreed with your recommendation.
3. **Leadership/Behavioural:** How do you influence stakeholders without authority?
4. **Leadership/Behavioural:** Tell me about an audit that did not go well.
5. **Leadership/Behavioural:** Describe a major production incident.
6. **Leadership/Behavioural:** How do you balance security and delivery speed?
7. **Leadership/Behavioural:** Tell me about a time you identified a hidden risk.
8. **Leadership/Behavioural:** Describe a risk that eventually became an incident.
9. **Leadership/Behavioural:** How do you handle conflicting priorities?
10. **Leadership/Behavioural:** Why do you want to move into Technology Risk?

## Mock Interview 38 - GCP DevOps Risk Tailored Round

Focus: GCP, Kubernetes, Terraform, CI/CD, service accounts, least privilege, compliance, cloud security incidents, and risk assessment

1. **GCP DevOps Risk:** How do you secure Terraform state in GCP?
2. **GCP DevOps Risk:** How do you prevent infrastructure drift?
3. **GCP DevOps Risk:** How do you secure GKE clusters?
4. **GCP DevOps Risk:** Explain IAM best practices in GCP.
5. **GCP DevOps Risk:** How do you review Terraform code from a risk perspective?
6. **GCP DevOps Risk:** How do you integrate security into CI/CD pipelines?
7. **GCP DevOps Risk:** What risks exist when using service accounts?
8. **GCP DevOps Risk:** How would you implement least privilege across GCP projects?
9. **GCP DevOps Risk:** How do you monitor cloud security and compliance?
10. **GCP DevOps Risk:** How would you perform a risk assessment before deploying a new Kubernetes cluster?
11. **GCP DevOps Risk:** How do you ensure Infrastructure as Code changes are compliant before deployment?
12. **GCP DevOps Risk:** Describe a cloud security incident you investigated and the lessons learned.

## Mock Interview 40 - Network Hub Scope and Hub-Spoke Risk Round

Focus: GCP hub-and-spoke networking, Shared VPC, Network Connectivity Center, routing, DNS, firewall governance, NAT, hybrid connectivity, segmentation, and network risk

1. **Network Hub Scope:** What is a network hub-and-spoke architecture, and why do organizations use it in GCP?
2. **Network Hub Scope:** What should be included in the scope of a network hub project?
3. **Network Hub Scope:** How would you design Shared VPC with host and service projects for a hub-and-spoke model?
4. **Network Hub Scope:** How does Network Connectivity Center help in a hub-and-spoke network design?
5. **Network Hub Scope:** What are the routing risks in a hub-and-spoke architecture?
6. **Network Hub Scope:** How would you manage firewall rules centrally while still allowing application team ownership?
7. **Network Hub Scope:** How would you design DNS resolution across hub, spoke, on-premises, and private GCP services?
8. **Network Hub Scope:** What are the security risks of VPC peering, and what limitations should you consider?
9. **Network Hub Scope:** How would you design outbound internet access through Cloud NAT or centralized egress controls?
10. **Network Hub Scope:** How do you segment production, non-production, shared services, and third-party connectivity in a hub network?
11. **Network Hub Scope:** What monitoring, logging, and KRIs would you define for network hub risk?
12. **Network Hub Scope:** How would you perform a risk assessment before onboarding a new spoke project or VPC into the hub?

## Mock Interview 41 - GCP Landing Zone Risk and Governance Round

Focus: GCP landing zone design, organization hierarchy, folders, projects, IAM, org policies, Shared VPC, logging, security baseline, billing, and governance

1. **GCP Landing Zone:** What is a GCP landing zone, and why is it important for enterprise cloud adoption?
2. **GCP Landing Zone:** What core components would you include in a secure GCP landing zone?
3. **GCP Landing Zone:** How would you design the GCP organization, folder, and project hierarchy?
4. **GCP Landing Zone:** Which GCP organization policies would you enforce as part of a secure baseline?
5. **GCP Landing Zone:** How would you design IAM and access management for a landing zone?
6. **GCP Landing Zone:** How would you design networking for a GCP landing zone?
7. **GCP Landing Zone:** How would you implement centralized logging, monitoring, and audit evidence in a landing zone?
8. **GCP Landing Zone:** How would you manage security controls such as SCC, KMS, Secret Manager, vulnerability scanning, and policy-as-code?
9. **GCP Landing Zone:** How would you handle billing, budgets, labels, cost allocation, and FinOps in a landing zone?
10. **GCP Landing Zone:** How would you onboard new application teams or projects into the landing zone safely?
11. **GCP Landing Zone:** What are common risks or anti-patterns in GCP landing zone implementation?
12. **GCP Landing Zone:** How would you assess whether an existing GCP landing zone is mature and compliant?

## Mock Interview 42 - Multi-Cloud Network Connectivity Risk Round

Focus: GCP, AWS, Azure connectivity, VPN, Interconnect, Direct Connect, ExpressRoute, routing, DNS, IP planning, segmentation, observability, security, and resilience

1. **Multi-Cloud Networking:** How would you design secure network connectivity between GCP, AWS, and Azure?
2. **Multi-Cloud Networking:** What are the main connectivity options for multi-cloud networking, and when would you choose VPN versus dedicated connectivity?
3. **Multi-Cloud Networking:** How would you plan IP address ranges to avoid overlap across multiple cloud providers and on-premises networks?
4. **Multi-Cloud Networking:** How would you design routing between GCP Cloud Router, AWS Transit Gateway, Azure Virtual WAN, and on-premises networks?
5. **Multi-Cloud Networking:** What are the security risks of transitive routing in a multi-cloud network?
6. **Multi-Cloud Networking:** How would you design DNS resolution across GCP, AWS, Azure, and on-premises environments?
7. **Multi-Cloud Networking:** How would you segment production, non-production, shared services, and third-party traffic across multiple clouds?
8. **Multi-Cloud Networking:** How would you design centralized ingress and egress security controls for multi-cloud workloads?
9. **Multi-Cloud Networking:** How would you monitor multi-cloud network connectivity, latency, packet loss, route changes, and availability?
10. **Multi-Cloud Networking:** How would you troubleshoot an application latency issue between GCP and AWS?
11. **Multi-Cloud Networking:** What disaster recovery and resilience considerations apply to multi-cloud connectivity?
12. **Multi-Cloud Networking:** How would you perform a technology risk assessment for a new multi-cloud network connection?

## Mock Interview 43 - LLMOps / GenAI Production Round

Focus: RAG reliability, vector databases, prompt lifecycle, LLM gateways, cost/latency control, prompt injection defense, agent tool-calling safety, and LLM observability

1. **LLMOps / GenAI Production:** How would you design a production LLM-backed service on GCP, covering the API gateway, model routing, caching, observability, and cost controls?
2. **LLMOps / GenAI Production:** A retrieval-augmented generation pipeline returns stale or irrelevant context. How would you debug the vector database, embedding pipeline, chunking strategy, and retrieval ranking?
3. **LLMOps / GenAI Production:** How would you build an internal LLM gateway that handles authentication, per-team rate limiting, token budget enforcement, and multi-provider fallback?
4. **LLMOps / GenAI Production:** A GenAI feature's inference cost grew 5x in a month. How would you investigate token usage, caching opportunities, model selection, and prompt length before cutting features?
5. **LLMOps / GenAI Production:** How would you defend an LLM application against prompt injection and data exfiltration from untrusted user input or retrieved documents?
6. **LLMOps / GenAI Production:** An AI agent can call internal tools and APIs. How would you sandbox tool execution, enforce least privilege, and prevent unintended destructive actions?
7. **LLMOps / GenAI Production:** How would you build an automated evaluation and regression suite for LLM output quality before shipping a prompt or model change?
8. **LLMOps / GenAI Production:** What would you trace and log for an LLM request end to end, including prompts, retrieved context, token counts, latency, and model version, without leaking sensitive data?

## Mock Interview 44 - Resume Deep-Dive: GCP, Terraform, Kubernetes Platform Round

Focus: GCP landing zones, Terraform Enterprise modules, GKE administration, self-service infrastructure, Cloud Armor security, cost optimization, and 7-years-experience senior platform ownership, with a touch of MLOps

1. **Resume Deep-Dive:** Walk me through the GCP landing zone you designed, including project hierarchy, Shared VPC, IAM governance, and policy-as-code. What tradeoffs did you make?
2. **Resume Deep-Dive:** You built reusable Terraform Enterprise modules for networking, IAM, GKE, monitoring, logging, load balancing, and security that cut provisioning effort by 70 percent. Walk me through how you designed and versioned those modules.
3. **Resume Deep-Dive:** You manage production GKE clusters including node pools, upgrades, autoscaling, and RBAC. Walk me through your process for a zero-downtime cluster upgrade.
4. **Resume Deep-Dive:** You integrated Terraform Enterprise with Git-based CI/CD, Harness, Jira, and ServiceNow for self-service delivery. How did approvals and change management work end to end?
5. **Resume Deep-Dive:** You designed Cloud Armor WAF policies with Adaptive Protection, rate limiting, and threat intelligence, plus IONIX and Stream Security for attack surface monitoring. Walk me through how these tools work together to stop an attack.
6. **Resume Deep-Dive:** You reduced GCP cost by 20 percent through governance, resource right-sizing, and capacity planning. Walk me through the specific levers you pulled and how you measured the savings.
7. **Resume Deep-Dive:** You provisioned GPU-enabled GKE clusters with NVIDIA L4/A100 nodes. How did you handle node pool sizing, taints/tolerations, and spot/preemptible GPUs for cost control?
8. **Resume Deep-Dive:** At 7 years of experience, how would you demonstrate technical leadership across multiple teams during a platform migration, not just individual execution?

## Mock Interview 45 - Platform Engineering / Internal Developer Platform Round

Focus: Platform team scope, multi-tenancy, golden paths, self-service guardrails, service catalogs, platform SLAs, and IDP tooling decisions

1. **Platform Engineering:** How would you draw the line between what a platform team owns and what application teams own, and how would you avoid the platform becoming a bottleneck?
2. **Platform Engineering:** How would you design multi-tenancy for an internal developer platform so one team's misconfiguration or spike can't affect another team's workloads?
3. **Platform Engineering:** What SLAs or SLOs would you define for your own platform team, and how would you measure whether the platform itself is reliable?
4. **Platform Engineering:** How would you design self-service ephemeral preview environments for pull requests on top of GKE, Terraform, and CI/CD?
5. **Platform Engineering:** How would you prevent manual console changes from undermining your Terraform-based golden paths, without blocking legitimate emergency fixes?
6. **Platform Engineering:** How would you design a service catalog that tracks ownership, dependencies, production-readiness status, and on-call rotation for every service on the platform?
7. **Platform Engineering:** How would you enforce security and compliance guardrails inside a self-service platform without turning every request into a manual approval bottleneck?
8. **Platform Engineering:** How would you decide between building a custom internal developer platform versus adopting Backstage, Port, or another off-the-shelf IDP?

## Mock Interview 46 - Ansible / Configuration Management Round

Focus: Ansible playbooks, roles, idempotency, Vault secrets, testing, scale, and combining Ansible with Terraform across multi-cloud environments

1. **Ansible:** What is Ansible, and how does its agentless, push-based model differ from Terraform or Puppet/Chef?
2. **Ansible:** How do you ensure Ansible playbooks are idempotent, and what happens when a task isn't naturally idempotent?
3. **Ansible:** How would you structure reusable Ansible roles for OS patching, configuration management, and application deployment across many teams?
4. **Ansible:** How would you manage secrets in Ansible using Vault, and how would you rotate a vaulted secret without redistributing it manually?
5. **Ansible:** When would you use Ansible instead of Terraform, and how would you combine them in the same pipeline, for example Terraform provisions and Ansible configures?
6. **Ansible:** How would you run Ansible playbooks against thousands of hosts efficiently, and what would you do about serial execution, forks, and failure handling?
7. **Ansible:** How would you test Ansible roles and playbooks before running them in production, for example with Molecule or a CI pipeline?
8. **Ansible:** You used Ansible for backup automation and disaster recovery. Walk me through how a playbook-driven DR runbook would work end to end.

## Mock Interview 48 - Today AI/Python/Cloud/SRE Recap

Focus: AI engineering libraries, Python equality and multiprocessing, AWS to GCP migration, Terraform IAM recovery, multi-environment architecture, Kubernetes policy guardrails, observability, tracing, burn-rate alerts, and outage mitigation decisions

1. **AI/Python:** Today interview 2026-07-06 - AI engineering libraries: What Python libraries are most useful for AI Engineering nowadays?
2. **Python:** Today interview 2026-07-06 - Python multiprocessing: Explain multiprocessing in Python. When should you use multiprocessing instead of multithreading?
3. **Python/Coding:** Today interview 2026-07-06 - Python identity: Explain the difference between == and is in Python, using list examples.
4. **Cloud Migration:** Today interview 2026-07-06 - AWS to GCP migration: Suppose a client has an application running on AWS. How would you migrate it to GCP across discovery, network, IAM, database, storage, CI/CD, validation, cutover, and rollback?
5. **Terraform/IAM Incident:** Today interview 2026-07-06 - Terraform IAM recovery: A Terraform change accidentally removed production Service Account permissions. How would you debug and recover?
6. **Platform Architecture:** Today interview 2026-07-06 - Multi-environment architecture: Design a multi-environment architecture for Dev, QA, and Prod.
7. **Terraform/IaC:** Today interview 2026-07-06 - Terraform state isolation: How would you isolate infrastructure and Terraform state across environments?
8. **Kubernetes Security:** Today interview 2026-07-06 - NetworkPolicy and admission control: How do you pair Kubernetes Network Policies with Admission Controllers?
9. **Incident Response:** Today interview 2026-07-06 - Partial Terraform apply logs: During a production incident caused by a partially successful Terraform apply, what logs would you check first?
10. **Observability:** Today interview 2026-07-06 - Early incident detection: How would you design monitoring to detect customer-impacting incidents early?
11. **SRE/Alerting:** Today interview 2026-07-06 - Burn-rate alerts: What are burn-rate alerts and why are they useful?
12. **Logging/Tracing:** Today interview 2026-07-06 - Log correlation: How do you correlate logs across Kubernetes microservices?
13. **Observability:** Today interview 2026-07-06 - OpenTelemetry basics: Explain OpenTelemetry.
14. **Incident Management:** Today interview 2026-07-06 - Outage decision-making: During an outage with incomplete information, how do you decide whether to roll back, roll forward, use a feature flag, or shift traffic?
15. **Similar Scenario:** Today interview 2026-07-06 - Similar scenario Terraform plan review: What checks would you add before Terraform apply to prevent accidental IAM or networking breakage?
16. **Similar Scenario:** Today interview 2026-07-06 - Similar scenario progressive mitigation: A bad release affects only 10 percent of users. How would you decide between rollback, canary pause, feature disablement, and traffic shifting?

## Mock Interview 49 - Kubeflow MLflow Multiprocessing RAG Round

Focus: Kubeflow platform design, Kubeflow Pipelines, MLflow tracking and registry, production MLflow on Kubernetes, Python multiprocessing, RAG reliability, vector databases, retrieval evaluation, and GenAI observability

1. **Kubeflow:** Kubeflow platform design: How would you design a production Kubeflow platform on GKE for notebooks, pipelines, training, serving, security, and observability?
2. **Kubeflow:** Kubeflow Pipelines: How would you design a reusable Kubeflow Pipeline for data validation, training, evaluation, registration, and conditional deployment?
3. **Kubeflow:** Kubeflow multi-user isolation: How would you isolate teams in Kubeflow using namespaces, profiles, RBAC, service accounts, quotas, and network policies?
4. **Kubeflow:** Kubeflow troubleshooting: A Kubeflow pipeline step is stuck Pending or failing. How would you debug pods, volumes, service accounts, images, logs, and events?
5. **MLflow:** MLflow tracking design: How would you structure MLflow experiments, runs, parameters, metrics, tags, artifacts, and naming conventions for a team?
6. **MLflow:** MLflow model registry: How would you use MLflow Model Registry for versioning, approvals, stage transitions, aliases, rollback, and auditability?
7. **MLflow:** MLflow on Kubernetes: How would you deploy and operate an MLflow tracking server on GKE, including database, object storage, ingress, auth, and monitoring?
8. **MLflow:** MLflow troubleshooting: An MLflow run logged metrics but the model artifact is missing or cannot be loaded. How would you debug it?
9. **Python:** Mock 49 focus - Python concurrency and multiprocessing choices for cloud and ML workloads: When would you use threads, asyncio, multiprocessing, or a bounded worker pool?
10. **Python:** Mock 49 focus - Python multiprocessing deep dive: Explain multiprocessing in Python and when it is better than multithreading for CPU-heavy ML or data-processing tasks.
11. **RAG:** Mock 49 focus - RAG reliability debugging: A retrieval-augmented generation pipeline returns stale or irrelevant context. How would you debug indexing, embeddings, chunking, retrieval, and reranking?
12. **RAG:** Vector database operations: How would you operate a production vector database, including indexing strategy, reindexing without downtime, backup/restore, and scaling for query latency?
13. **RAG:** RAG vs fine-tuning vs prompting: How would you decide between prompt engineering, RAG, and fine-tuning for a domain-specific GenAI use case, and how would that decision change operational ownership?
14. **RAG:** Resume deep-dive - RAG pipeline: Walk me through the RAG pipeline you built, including embedding model choice, vector database, chunking, and how you measured answer quality.
15. **MLOps Architecture:** Kubeflow vs MLflow vs Vertex AI: How would you choose between Kubeflow, MLflow, and Vertex AI for a GCP MLOps platform?
16. **GenAI Observability:** Mock 49 focus - RAG and LLM observability: What would you trace and log end to end for a RAG request without leaking prompts, PII, secrets, or retrieved sensitive text?

## Mock Interview 50 - LLM and Machine Learning Round

Focus: LLM production architecture, prompt lifecycle, LLM evaluation, fine-tuning vs RAG, model fundamentals, supervised and unsupervised learning, feature engineering, model evaluation, overfitting, drift, deployment, monitoring, and rollback

1. **LLM Architecture:** Mock 50 focus - LLM production architecture: How would you design a production LLM-backed service with model routing, caching, rate limits, observability, safety, and cost controls?
2. **LLM Gateway:** Mock 50 focus - LLM gateway: How would you build an internal gateway that handles auth, per-team token budgets, prompt templates, model fallback, audit logs, and provider abstraction?
3. **Prompt Engineering:** Mock 50 focus - prompt lifecycle: How would you version, test, review, deploy, and roll back prompt changes like application code?
4. **LLM Evaluation:** Mock 50 focus - LLM evaluation: How would you design automated and human evaluation for answer quality, groundedness, toxicity, latency, and regression testing?
5. **LLM Security:** Mock 50 focus - prompt injection and data leakage: How would you protect an LLM application from malicious input, unsafe tool calls, PII leakage, and retrieved-document injection?
6. **LLM Deployment:** Mock 50 focus - self-hosted vs managed LLMs: How would you choose between Vertex AI/Gemini, OpenAI API, and self-hosted vLLM or Ollama on Kubernetes?
7. **LLM Fine-Tuning:** Mock 50 focus - fine-tuning vs RAG: When would you fine-tune an LLM instead of using RAG or prompt engineering, and what operational risks would you manage?
8. **Machine Learning Basics:** Mock 50 focus - machine learning fundamentals: Explain supervised learning, unsupervised learning, and reinforcement learning with practical examples.
9. **Machine Learning Workflow:** Mock 50 focus - ML lifecycle: Walk through the end-to-end machine learning lifecycle from problem framing to data collection, training, deployment, monitoring, and retraining.
10. **Feature Engineering:** Mock 50 focus - feature engineering: What is feature engineering, why does it matter, and how do you avoid training-serving skew?
11. **Model Evaluation:** Mock 50 focus - ML model evaluation: How would you choose metrics such as accuracy, precision, recall, F1, ROC-AUC, RMSE, and business KPIs?
12. **Model Reliability:** Mock 50 focus - overfitting and underfitting: How do you detect overfitting or underfitting, and what actions would you take?
13. **ML Monitoring:** Mock 50 focus - model drift: Explain data drift, concept drift, prediction drift, and how you would monitor and respond to each in production.
14. **ML Deployment:** Mock 50 focus - model deployment strategy: How would you deploy a new ML model safely using canary, shadow, A/B testing, rollback, and champion-challenger patterns?
15. **ML Incident:** Mock 50 focus - bad model incident: A model is technically healthy but business KPIs suddenly drop after release. How would you investigate and mitigate?
16. **ML Platform:** Mock 50 focus - ML platform design: What shared platform capabilities would you build for data scientists and ML engineers to ship models safely and repeatedly?
