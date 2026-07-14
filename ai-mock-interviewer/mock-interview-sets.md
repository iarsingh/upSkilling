# Mock Interview Sets for Senior GCP DevOps / SRE

Use one set as one complete mock interview round. Each set mixes technical depth, troubleshooting, design, reliability, security, and senior ownership.

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

Focus: CrashLoopBackOff, Pending pods, node failure, autoscaling, upgrades, availability, security, GKE backup/restore, etcd backup nuance, and DR

1. **GKE/Kubernetes:** CrashLoopBackOff: A pod is continuously restarting. How would you troubleshoot it?
2. **GKE/Kubernetes:** Pending pods: How do you troubleshoot Pending pods?
3. **GKE/Kubernetes:** Kubernetes node failure: What happens when a node fails, and how do workloads recover?
4. **GKE/Kubernetes:** GKE Cluster Autoscaler: How does Cluster Autoscaler work in GKE?
5. **GKE/Kubernetes:** GKE cluster upgrade: How do you upgrade a GKE cluster safely?
6. **GKE/Kubernetes:** Highly available GKE: How would you design a highly available GKE architecture?
7. **Security/DevSecOps:** Production Kubernetes security: How would you secure a production Kubernetes cluster?
8. **SRE/Reliability:** Disaster recovery: How would you implement disaster recovery for a production platform?
9. **GKE/Backup:** In GKE, can you take a direct etcd backup like a self-managed Kubernetes cluster?
10. **GKE/Backup:** How would you design backup and restore for a production GKE cluster?
11. **GKE/Backup:** What is Backup for GKE, and what problem does it solve?
12. **GKE/Backup:** Scenario: A namespace with production workloads is accidentally deleted in GKE. How would you recover it?
13. **GKE/Backup:** How do you test whether a GKE backup is actually restorable?
14. **Kubernetes/etcd:** How do you take and restore an etcd snapshot in self-managed Kubernetes?

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

## Mock Interview 23 - Technology Risk Lead Technical Round

Focus: technology risk framework, risk assessment, controls, governance, audit, cloud risk, SDLC, and reporting

1. **Technology Risk:** Technology risk framework: How would you design an enterprise technology risk management framework for cloud, applications, infrastructure, SDLC, and third-party integrations?
2. **Technology Risk:** Risk assessment: A product team is launching a new customer-facing platform on GCP/GKE. How would you assess technology risk from BRD/PRD through architecture review, build, release, and operations?
3. **Controls:** Control design: For a regulated cloud platform, define preventive, detective, and corrective controls for IAM, network exposure, CI/CD, secrets, vulnerability management, and production changes.
4. **Governance/Compliance:** Framework mapping: How would you map ISO 27001, NIST, COBIT, and FAIR requirements to practical cloud and DevOps controls without creating checkbox compliance?
5. **Audit/Remediation:** Audit remediation: An external audit finds weak access reviews, missing evidence, and delayed patching. How would you create a remediation plan, owners, due dates, risk acceptance, and reporting?
6. **Incident Risk:** Incident risk analysis: A production incident was fixed quickly, but the same failure could repeat. How would you analyze root cause, systemic risk, control failure, and long-term mitigation?
7. **Risk Reporting:** Cloud risk dashboard: Design a technology risk dashboard for senior leadership. What KRIs, control metrics, exceptions, trends, and escalation signals would you include?
8. **Risk Automation:** Risk automation: What parts of technology risk assessment and reporting would you automate using cloud logs, CI/CD metadata, vulnerability scanners, policy-as-code, and ticketing workflows?

## Mock Interview 24 - Technology Risk Lead Behavioural Round

Focus: stakeholder management, leadership, executive communication, prioritization, audit partnership, and risk culture

1. **Leadership/Behavioural:** Behavioural risk leadership: Tell me about a time you had to influence engineering or product teams to fix a technology risk they did not initially prioritize.
2. **Stakeholder Management:** Stakeholder communication: How would you explain a critical cloud security risk to senior leadership in business-impact language without overwhelming them with technical detail?
3. **Decision-Making:** Conflict handling: Product wants to release quickly, Security wants stricter controls, and Engineering says the control adds toil. How would you drive a decision?
4. **Stakeholder Management:** Trusted advisor: Describe how you would build trust with IT, Engineering, Product, Security, Audit, and Business stakeholders as a Technology Risk Lead.
5. **Leadership/Behavioural:** Prioritization: You have critical audit findings, recurring incidents, and a weak risk dashboard. How would you prioritize the next 30, 60, and 90 days?
6. **Risk Culture:** Risk culture: Give an example of how you would promote a risk-aware culture without making teams feel blocked or blamed.
7. **Audit/Remediation:** Remediation ownership: A risk issue is overdue because multiple teams disagree on ownership. How would you move it to closure?
8. **Leadership/Behavioural:** Incident communication: During a major incident with regulatory implications, how would you coordinate technical updates, business impact, risk reporting, and follow-up actions?

## Mock Interview 25 - Python and Go Platform Programming Round

Focus: Python automation, Go programming, cloud APIs, Kubernetes clients, CLIs, controllers, testing, and production readiness

1. **Python:** Python automation: How would you design a Python script that audits GCP IAM bindings, flags risky roles, and exports a remediation report?
2. **Python:** Python testing: How would you unit test a GCP or Kubernetes automation script without touching real production resources?
3. **Python:** Python concurrency: When would you use threads, asyncio, multiprocessing, or a worker pool for cloud resource inventory?
4. **Python:** Python FastAPI: How would you design a small FastAPI service that exposes self-service infrastructure requests with validation, approval, and audit logs?
5. **Go:** Go fundamentals: What are the main differences between Go and Python for cloud/platform automation, and when would you choose each?
6. **Go:** Go concurrency: Explain goroutines, channels, context cancellation, and wait groups using a platform automation example.
7. **Go:** Go Kubernetes: When would you use client-go or controller-runtime, and how would you design a simple Kubernetes controller?
8. **Go:** Go production readiness: What code review checklist would you use before deploying a Go automation service or controller to production?

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

## Mock Interview 39 - FastAPI Backend Round

Focus: FastAPI service design, Pydantic, async endpoints, security, databases, observability, testing, deployment, and production readiness

1. **FastAPI:** FastAPI fundamentals: How would you structure a production FastAPI service with routers, dependencies, schemas, settings, and clear module boundaries?
2. **FastAPI:** FastAPI request validation: How do Pydantic models, response models, and validation errors help keep APIs safe and predictable?
3. **FastAPI:** FastAPI async: When should a FastAPI endpoint be async, and what mistakes can block the event loop in production?
4. **FastAPI:** FastAPI security: How would you implement JWT/OAuth2 authentication, role-based access, secret handling, and least privilege for internal APIs?
5. **FastAPI:** FastAPI observability: What logs, metrics, traces, request IDs, and health endpoints would you add before deploying a FastAPI service?
6. **FastAPI:** FastAPI deployment: How would you deploy FastAPI with Uvicorn/Gunicorn, containers, Kubernetes/GKE, autoscaling, probes, and graceful shutdown?
7. **FastAPI:** FastAPI performance: A FastAPI endpoint has high p95 latency. How would you debug code, database calls, external APIs, concurrency, and infrastructure?
8. **FastAPI:** FastAPI production readiness: What checklist would you use before approving a FastAPI service for production?

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

## Mock Interview 47 - Today's Audio Interview Recap

Focus: Terraform reusable modules, production change safety, observability triage, SLI/SLO alerting, burn-rate alerts, and senior behavioral introduction

1. **Terraform/IaC:** How do you design reusable infrastructure modules? How do you handle reusable modules with strict state and credential isolation? How do approval workflows reduce the blast radius of infrastructure changes?
2. **Terraform/IaC:** Terraform change safety: When a Terraform plan shows a destroy and replace for a critical resource, what signals and guardrails do you rely on to decide whether to proceed, redesign, or block the change?
3. **Observability:** Incident response and observability: Customers report intermittent 5xx errors and P95 latency spikes. Walk me through your observability-driven triage sequence across metrics, logs, and traces. How do you isolate the failing dependency?
4. **SRE/Reliability:** SLIs, SLOs, and alerting: How do you define customer-centric SLIs, SLOs, and actionable alerts? How do you filter noisy infrastructure signals? How do you catch both fast outages and slow degradation without paging on transient spikes?
5. **SRE/Reliability:** Multi-window burn-rate alerting: Walk me through how you would implement multi-window burn-rate alerts for a 99.9% availability SLO. Which alert windows would you choose? Which alerts should page an on-call engineer immediately, and which should create a ticket for later investigation?
6. **Behavioral:** Tell me about yourself.
7. **Behavioral:** Describe your experience with cloud platforms, Kubernetes, Terraform, and DevOps.
8. **Production Readiness:** How do you approach infrastructure changes in production to minimize customer impact?

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

## Mock Interview 51 - Kubernetes Services, Service Mesh, AKS/GKE, and Terraform Loops Round

Focus: Kubernetes Service networking, kube-proxy, cross-namespace DNS, startup ordering, blue-green traffic switching, service mesh, Istio/Anthos Service Mesh, AKS versus GKE operations, Terraform dynamic blocks, for_each, each.value, toset, and repeated S3 resources

1. **GKE/Kubernetes:** What is kube-proxy?
2. **GKE/Kubernetes:** Suppose there are two Pods running in different namespaces. What DNS name would you use so that one Pod can communicate with the other?
3. **GKE/Kubernetes:** There are two applications, a frontend application and a backend application, running in two different Pods. What configuration would you write so that the frontend application starts only after the backend application is up and running?
4. **CI/CD/GitOps:** We mostly follow blue-green deployment. How do you divert traffic from the Blue environment to the Green environment?
5. **Kubernetes Services:** How do Kubernetes Services work, and when would you use ClusterIP, NodePort, LoadBalancer, or headless Service?
6. **Kubernetes Services:** Scenario: A frontend Pod cannot reach a backend Service in another namespace. How would you troubleshoot it?
7. **Service Mesh:** What is service mesh, and when would you introduce Istio or Anthos Service Mesh into a Kubernetes platform?
8. **Service Mesh:** Scenario: After enabling service mesh mTLS, some services start failing. What would you check?
9. **GKE/Kubernetes:** How would you implement canary or blue-green deployment using Kubernetes Services and service mesh traffic splitting?
10. **GKE/AKS:** What is AKS, and how is it different from GKE from an operations point of view?
11. **GKE/AKS:** Scenario: An AKS or GKE node upgrade is blocked or causing disruption. What would you investigate?
12. **Terraform/IaC:** What is a dynamic block in Terraform?
13. **Terraform/IaC:** What is the use case of a dynamic block?
14. **Terraform/IaC:** How would you create multiple S3 buckets in Terraform?
15. **Terraform/IaC:** What is the meaning of each.value in Terraform?
16. **Terraform/IaC:** Why do we use each.value?
17. **Terraform/IaC:** Why do we use toset() in Terraform?

## Mock Interview 52 - Datadog Observability Round

Focus: Datadog Agent, Kubernetes monitoring, APM, logs, traces, dashboards, monitors, SLOs, alert routing, cost control, synthetic monitoring, RUM, and incident investigation

1. **Datadog/Observability:** How would you install and configure the Datadog Agent on a Kubernetes or GKE cluster?
2. **Datadog/Observability:** How does Datadog collect metrics, logs, and traces from Kubernetes workloads?
3. **Datadog/APM:** How would you enable Datadog APM for a microservice running on Kubernetes?
4. **Datadog/Logs:** How would you correlate Datadog logs with traces for faster debugging?
5. **Datadog/Monitoring:** What Datadog monitors would you create for a production API?
6. **Datadog/SRE:** How would you define SLOs and error-budget alerts in Datadog?
7. **Datadog/Dashboards:** What dashboards would you build in Datadog for application teams, SREs, and leadership?
8. **Datadog/Incident Response:** A Datadog alert shows p95 latency increased after a deployment. How would you investigate?
9. **Datadog/Cost:** How would you control Datadog cost for logs, custom metrics, and high-cardinality tags?
10. **Datadog/Synthetics:** When would you use Datadog Synthetic Monitoring and Real User Monitoring?
11. **Datadog/Integrations:** How would you integrate Datadog with GCP, Slack, PagerDuty, and CI/CD pipelines?
12. **Datadog/Security:** What security and access controls would you apply in Datadog for a large engineering organization?

## Mock Interview 53 - Python Developer System Design Round

Focus: Python backend system design, FastAPI/Django APIs, database design, caching, queues, async processing, scalability, reliability, testing, observability, security, and production debugging

1. **Python/System Design:** How would you design a scalable Python backend API for a high-traffic web application?
2. **Python/API Design:** How would you design REST API endpoints, request validation, pagination, filtering, and versioning in a Python service?
3. **Python/Database Design:** How would you design the database layer for a Python application, including schema design, indexes, migrations, transactions, and connection pooling?
4. **Python/Caching:** How would you add Redis caching to a Python backend, and how would you handle cache invalidation?
5. **Python/Async Processing:** When would you use Celery, RQ, Cloud Tasks, Pub/Sub, or Kafka for background processing in a Python application?
6. **Python/Concurrency:** How would you choose between asyncio, threads, multiprocessing, and worker queues in Python system design?
7. **Python/Reliability:** How would you design retries, timeouts, idempotency, and circuit breakers for a Python service calling external APIs?
8. **Python/Security:** How would you secure a Python backend service, including authentication, authorization, secrets, input validation, and dependency security?
9. **Python/Observability:** What logs, metrics, traces, health checks, and dashboards would you add to a production Python service?
10. **Python/Testing:** How would you test a Python backend system across unit tests, integration tests, contract tests, load tests, and end-to-end tests?
11. **Python/Deployment:** How would you containerize and deploy a Python web service on Kubernetes or Cloud Run?
12. **Python/Performance:** A Python API has high latency and high CPU usage in production. How would you debug and optimize it?
13. **System Design:** Design a URL shortener using Python. What components, data model, caching, scaling, and failure handling would you include?
14. **System Design:** Design a notification system in Python that supports email, SMS, retries, templates, rate limits, and audit logs.
15. **System Design:** Design a file upload and processing service in Python for large files, asynchronous processing, status tracking, and secure storage.
16. **System Design:** Design a real-time chat or WebSocket service in Python. How would you handle scaling, message delivery, presence, and persistence?

## Mock Interview 54 - DSA for Python Developers Round

Focus: Data structures and algorithms in Python, time and space complexity, arrays, strings, hash maps, stacks, queues, linked lists, trees, graphs, heaps, recursion, dynamic programming, and coding interview problem solving

1. **DSA/Complexity:** How do you analyze time and space complexity for a Python solution?
2. **DSA/Arrays:** How would you solve Two Sum in Python, and what is the time complexity?
3. **DSA/Strings:** How would you check whether two strings are anagrams in Python?
4. **DSA/Sliding Window:** How would you find the longest substring without repeating characters?
5. **DSA/Two Pointers:** When would you use the two-pointer technique, and how would you apply it to a sorted array?
6. **DSA/Hashing:** Why are hash maps useful in coding interviews, and what are common pitfalls in Python dictionaries?
7. **DSA/Stack:** How would you validate balanced parentheses using a stack?
8. **DSA/Queue:** When would you use a queue or deque in Python, and why is list.pop(0) usually avoided?
9. **DSA/Linked List:** How would you detect a cycle in a linked list?
10. **DSA/Trees:** How would you perform BFS and DFS traversal of a binary tree?
11. **DSA/Binary Search:** How would you use binary search to find the first occurrence of a target in a sorted array?
12. **DSA/Heap:** How would you find the top K frequent elements using a heap or Counter in Python?
13. **DSA/Graphs:** How would you detect whether an undirected graph has a cycle?
14. **DSA/Recursion:** How do recursion and backtracking work, and what should you watch out for in Python?
15. **DSA/Dynamic Programming:** How would you explain dynamic programming using the climbing stairs problem?
16. **DSA/Interview Strategy:** How do you approach a new DSA problem in an interview from clarification to optimized solution?

## Mock Interview 55 - Full Stack Python Engineer with DSA, DevOps, and GenAI Round

Focus: Full-stack Python engineering, frontend/backend integration, APIs, databases, DSA, DevOps, CI/CD, Docker, Kubernetes, cloud deployment, observability, GenAI, RAG, LLM safety, and production ownership

1. **Full Stack/Python:** How would you design and build a full-stack application using Python for the backend and a modern JavaScript frontend?
2. **Backend/API:** How would you design authentication, authorization, and session management for a full-stack Python application?
3. **Backend/Database:** How would you design models, migrations, indexes, and API contracts for a Python backend connected to PostgreSQL?
4. **Frontend/Integration:** How would the frontend handle API errors, loading states, pagination, authentication tokens, and form validation?
5. **DSA/Python:** Which DSA patterns are most important for a Python full-stack engineer, and how would you practice them?
6. **DSA/Coding:** How would you solve a coding problem during a Python interview while explaining complexity and tradeoffs?
7. **DevOps/Docker:** How would you Dockerize a full-stack Python application with separate frontend, backend, database, and worker services?
8. **DevOps/CI-CD:** How would you design a CI/CD pipeline for a full-stack Python application from pull request to production?
9. **DevOps/Kubernetes:** How would you deploy a Python backend, frontend, background worker, and database dependencies on Kubernetes?
10. **Observability/SRE:** What monitoring, logging, tracing, alerts, and runbooks would you add for a production full-stack app?
11. **GenAI/RAG:** How would you add a GenAI chat feature to a full-stack Python application using RAG?
12. **GenAI/Backend:** How would you design prompt templates, embeddings, vector search, citations, and response streaming in Python?
13. **GenAI/Safety:** How would you protect a GenAI feature from prompt injection, data leakage, hallucinations, and unsafe tool calls?
14. **GenAI/Operations:** How would you monitor GenAI quality, latency, token cost, retrieval quality, and user feedback in production?
15. **System Design:** Design a full-stack AI resume analyzer using Python, React, PostgreSQL, object storage, queues, and an LLM API.
16. **Career/Interview Strategy:** What 90-day learning plan would make someone interview-ready for full-stack Python, DSA, DevOps, and GenAI roles?

## Mock Interview 56 - Scenario-Based System Design for Full Stack Python and GenAI Round

Focus: Scenario-based system design for Python backend, frontend integration, databases, queues, caching, DevOps, scaling, reliability, incidents, GenAI, RAG, security, cost, and production tradeoffs

1. **Scenario/System Design:** Scenario: Your Python API suddenly receives 10x traffic after a product launch. How would you redesign the system for scale and reliability?
2. **Scenario/Database:** Scenario: A PostgreSQL-backed Python application has slow searches and frequent lock waits. How would you investigate and redesign it?
3. **Scenario/Caching:** Scenario: A dashboard endpoint is slow because it recalculates expensive reports on every request. How would you design caching and background refresh?
4. **Scenario/Queues:** Scenario: Users upload large files and the API times out while processing them. How would you redesign the upload and processing flow?
5. **Scenario/DevOps:** Scenario: A full-stack Python app has manual deployments and frequent production regressions. How would you design the CI/CD and release process?
6. **Scenario/Kubernetes:** Scenario: Your Kubernetes deployment has intermittent 502 errors during rolling updates. How would you debug and fix the rollout design?
7. **Scenario/Observability:** Scenario: Customers report errors, but logs are hard to correlate across frontend, backend, workers, and database calls. How would you redesign observability?
8. **Scenario/Security:** Scenario: A multi-tenant SaaS app accidentally exposes one customer's data to another customer. How would you respond and redesign tenant isolation?
9. **Scenario/Frontend:** Scenario: The frontend feels slow even though backend latency looks healthy. How would you investigate and improve end-user performance?
10. **Scenario/GenAI RAG:** Scenario: A GenAI chat feature gives outdated or irrelevant answers from your knowledge base. How would you debug and redesign the RAG pipeline?
11. **Scenario/GenAI Safety:** Scenario: A user tries prompt injection to make your AI assistant reveal internal documents. How would you prevent and monitor this?
12. **Scenario/GenAI Cost:** Scenario: Your LLM API cost increases 5x after adding a new AI feature. How would you investigate and optimize cost without hurting quality?
13. **Scenario/Resilience:** Scenario: A third-party payment or email API is unreliable. How would you design retries, fallbacks, idempotency, and user experience?
14. **Scenario/Data Pipeline:** Scenario: A background worker pipeline falls behind and queue depth keeps growing. How would you debug and redesign it?
15. **Scenario/Migration:** Scenario: You need to migrate a monolithic Django app to services without stopping product delivery. What migration plan would you propose?
16. **Scenario/Architecture Review:** Scenario: You are asked to review a proposed full-stack AI application before launch. What risks, tradeoffs, and readiness checks would you cover?

## Mock Interview 57 - Diagram-Based System Design Round

Focus: Architecture diagrams, data-flow diagrams, sequence diagrams, deployment diagrams, RAG diagrams, CI/CD diagrams, observability diagrams, failure paths, scalability, and tradeoff explanation

1. **Diagram/System Design:** Draw and explain a high-level architecture diagram for a full-stack Python application with React, FastAPI, PostgreSQL, Redis, workers, and object storage.
2. **Diagram/Data Flow:** Draw the request flow for user login from browser to backend, database, token/session creation, and frontend state update.
3. **Diagram/Upload Flow:** Draw a file upload and async processing architecture using signed URLs, object storage, a queue, workers, and status tracking.
4. **Diagram/RAG:** Draw a RAG architecture diagram showing document ingestion, chunking, embeddings, vector database, retrieval, prompt construction, LLM call, and citations.
5. **Diagram/CI-CD:** Draw a CI/CD pipeline diagram for a Python full-stack app from pull request to production deployment and rollback.
6. **Diagram/Kubernetes:** Draw a Kubernetes deployment diagram for frontend, backend API, worker, Redis, managed PostgreSQL, ingress, secrets, and autoscaling.
7. **Diagram/Observability:** Draw an observability diagram showing metrics, logs, traces, dashboards, alerts, and incident response flow.
8. **Diagram/Sequence:** Draw a sequence diagram for a user asking an AI assistant a question and receiving a streamed answer with citations.
9. **Diagram/Resilience:** Draw a failure-handling diagram for an unreliable third-party API using retries, queues, idempotency keys, dead-letter queues, and reconciliation.
10. **Diagram/Security:** Draw a multi-tenant SaaS security diagram showing auth, tenant isolation, database scoping, cache scoping, audit logs, and admin access.
11. **Diagram/Scaling:** Draw how the architecture changes when traffic grows from 1,000 users to 1 million users.
12. **Diagram/Interview:** In a system design interview, how do you present a diagram clearly while explaining tradeoffs, bottlenecks, and failure modes?

## Mock Interview 58 - LeetCode and HackerRank Style Python Practice Round

Focus: Python coding practice for LeetCode/HackerRank-style interviews, arrays, strings, hashing, sliding window, two pointers, stacks, queues, linked lists, trees, graphs, heaps, sorting, binary search, dynamic programming, and clean explanation

1. **Coding/Arrays:** Practice problem: Given an array of integers and a target, return indices of two numbers that add up to the target.
2. **Coding/Strings:** Practice problem: Given a string, find the first non-repeating character.
3. **Coding/Hashing:** Practice problem: Group a list of words into anagram groups.
4. **Coding/Sliding Window:** Practice problem: Find the maximum sum of any subarray of size k.
5. **Coding/Two Pointers:** Practice problem: Given a sorted array, remove duplicates in place and return the new length.
6. **Coding/Stack:** Practice problem: Validate whether a string containing brackets is balanced.
7. **Coding/Queue:** Practice problem: Implement a moving average over the last k values in a stream.
8. **Coding/Linked List:** Practice problem: Reverse a singly linked list.
9. **Coding/Binary Search:** Practice problem: Search for a target in a sorted rotated array.
10. **Coding/Trees:** Practice problem: Return the level-order traversal of a binary tree.
11. **Coding/Graphs:** Practice problem: Count the number of islands in a 2D grid.
12. **Coding/Heap:** Practice problem: Find the kth largest element in an unsorted array.
13. **Coding/Sorting:** Practice problem: Merge overlapping intervals.
14. **Coding/DP:** Practice problem: Find the minimum cost to climb stairs.
15. **Coding/Python:** Practice problem: Parse a log file and return the top N most frequent IP addresses.
16. **Coding/Interview:** How should you explain your approach, complexity, and test cases for a LeetCode or HackerRank-style Python problem?

## Mock Interview 59 - Python Automation and Scripting Round

Focus: Python automation for DevOps and cloud engineering, file processing, APIs, CLIs, subprocess, concurrency, retries, logging, reporting, cloud SDKs, Kubernetes automation, Terraform automation, testing, packaging, and production-grade scripts

1. **Python Automation:** How would you design a Python automation script so it is safe, testable, reusable, and production-ready?
2. **Python/File Automation:** How would you write a Python script to scan a directory, find large or old files, and generate a cleanup report?
3. **Python/API Automation:** How would you call a paginated REST API in Python, handle retries, and export the results to CSV?
4. **Python/Cloud Automation:** How would you automate a GCP resource inventory report using Python SDKs?
5. **Python/Kubernetes Automation:** How would you use Python to list Kubernetes pods across namespaces and report CrashLoopBackOff or Pending pods?
6. **Python/Terraform Automation:** How would you automate Terraform plan validation and summarize risky changes using Python?
7. **Python/Subprocess:** When would you use subprocess in Python, and how do you run shell commands safely?
8. **Python/Concurrency:** How would you speed up a Python automation job that checks hundreds of endpoints or servers?
9. **Python/Logging:** What logging, error handling, exit codes, and dry-run behavior should a production automation script include?
10. **Python/Security:** How would you handle secrets, credentials, and sensitive output in Python automation?
11. **Python/CLI:** How would you build a Python CLI tool with arguments, subcommands, config files, and helpful output?
12. **Python/Data Processing:** How would you process a large CSV or JSONL file in Python without loading everything into memory?
13. **Python/Monitoring Automation:** How would you write a Python script that checks service health and sends Slack or email alerts?
14. **Python/Testing:** How would you test Python automation code that calls cloud APIs, shell commands, and external services?
15. **Python/Packaging:** How would you package and distribute an internal Python automation tool for a team?
16. **Python/Scenario:** Scenario: A manual weekly operations report takes four hours. How would you automate it end to end with Python?

## Mock Interview 60 - GT Bharat DevSecOps Specialist Engineering Round

Focus: GT Bharat DevSecOps Engineer JD, GCP and GKE operations, Linux/Windows administration, incident and change management, CI/CD with GitHub/JIRA/Jenkins/Ansible, Terraform, Vault, Docker/Kubernetes, SQL, Splunk/AppDynamics/xMatters, regulated enterprise operations, automation mindset, and on-call readiness

1. **Introduction/JD Fit:** Walk me through your DevOps or DevSecOps experience and explain how it matches this GT Bharat Specialist Engineering role.
2. **GCP/GKE:** What hands-on experience do you have with GCP and GKE, and how have you operated production workloads on Kubernetes?
3. **GKE/Troubleshooting:** A production pod in GKE is stuck in CrashLoopBackOff after a deployment. What exact steps and commands would you use to troubleshoot it?
4. **Platform Resilience:** How would you design and maintain a highly scalable and resilient application platform on GKE?
5. **Linux/System Administration:** A RHEL/Linux server has high CPU, low disk space, and failing systemd services. How would you investigate and restore service health?
6. **Incident Management:** You are on-call during a major outage affecting a CSAT service. How would you lead detection, mitigation, communication, escalation, and RCA?
7. **Change Management:** How do you plan and execute production changes in a regulated enterprise environment while minimizing risk?
8. **CI/CD:** Design a CI/CD pipeline using GitHub, JIRA, Jenkins, and Ansible for build, test, deployment, approvals, rollback, and auditability.
9. **Infrastructure as Code:** How have you used Terraform and Ansible together, and where would you draw the boundary between provisioning and configuration management?
10. **Secrets Management:** How would you implement secrets management with HashiCorp Vault or cloud secret managers for applications running in Kubernetes?
11. **Containers/Kubernetes:** Compare Deployment, StatefulSet, and DaemonSet. When would you use each in an enterprise platform?
12. **Observability:** How would you use Splunk, AppDynamics, and xMatters to monitor services, reduce alert noise, and proactively prevent outages?
13. **SQL/Database Operations:** What SQL or database troubleshooting experience do you have with PostgreSQL or MSSQL, especially for connectivity, slow queries, or locks?
14. **Networking:** A service in GKE cannot connect to a database or third-party endpoint. How would you troubleshoot DNS, routes, firewalls, security groups, and application configuration?
15. **DevSecOps/Security:** What security controls would you add across CI/CD, containers, Kubernetes, cloud IAM, secrets, logging, and audit trails?
16. **Behavioral/Automation:** Tell me about a time you automated a manual operations task or improved a workflow. What was the impact, and how did you share the learning with the team?

## Mock Interview 61 - Resilinc GCP Production Incident Round

Focus: Resilinc-style DevOps/GCP production support, GCP incidents, observability, GKE troubleshooting, Terraform, IAM, VPC security, RCA, and follow-up areas like Kafka, PostgreSQL, CI/CD, Grafana, Linux, and scalable cloud infrastructure

1. **GCP Support:** Starting point, staying on GCP support when a production issue hits networking, storage, or security. What is your usual step-by-step approach to isolate whether it is a platform problem, an application problem, or something in IAM or VPC configuration?
2. **Observability:** What alerts or dashboards have you personally built or tuned?
3. **Observability/Incident:** Can you walk me through one case where the alert fired but the real issue was something different from what the metric suggested?
4. **GKE/Kubernetes:** Walk me through a production Kubernetes issue you handled where a pod or deployment was failing. Tell me exactly how you diagnosed it from the first symptom to the fix.
5. **Terraform/GCP:** What have you actually built with Terraform in GCP? Can you walk me through a real module or stack you owned end-to-end?
6. **IAM/Security:** In a GCP environment, how have you designed IAM or VPC security so that teams could move fast without opening things up too much? What trade-off did you have to make?
7. **Production Outage:** Tell me about a production outage you worked on. What was the root cause? What did you change afterward to prevent it from happening again?
8. **GCP Incident/RCA:** Pick one actual incident you handled in GCP. Walk me through the exact failure, how you found the root cause, and what the post-incident change was.
9. **Kubernetes Networking:** How would you troubleshoot Kubernetes networking issues involving CNI, Services, and Ingress?
10. **Docker Internals:** Explain Docker internals that matter during production troubleshooting.
11. **Kafka Troubleshooting:** How would you troubleshoot Kafka producer, broker, consumer lag, and consumer group issues?
12. **PostgreSQL HA/Backup:** How would you design and troubleshoot PostgreSQL high availability and backup/restore?
13. **CI/CD:** How would you troubleshoot GitHub Actions or CI/CD pipeline failures in production delivery?
14. **Observability:** What Grafana and Prometheus dashboards would you build for production support?
15. **Terraform:** How do you manage Terraform state, modules, locking, drift, and safe production changes?
16. **GCP Services:** Explain how you have used GKE, IAM, VPC, Cloud SQL, and Load Balancer in production.
17. **Linux Troubleshooting:** How do you troubleshoot Linux CPU, memory, disk, network, and process issues during an incident?
18. **Incident Handling:** How do you handle production incidents and write an RCA?
19. **System Design:** Design scalable cloud infrastructure for a production application on GCP.

## Mock Interview 62 - Complete DevOps GCP Kubernetes Screening Bank

Focus: Full consolidated screening list from shared interviews: background, GCP, Kubernetes, Docker, CI/CD, Terraform, monitoring, Git, Linux, databases, Kafka, production scenarios, behavioral, and MLOps/AI

1. **Experience & Background:** Walk me through your current role at Capgemini.
2. **Experience & Background:** What does your day-to-day work look like?
3. **Experience & Background:** What are your major responsibilities?
4. **Experience & Background:** Which project are you currently working on?
5. **Experience & Background:** Why are you looking for a change?
6. **Experience & Background:** Why do you want to join our company?
7. **Cloud & GCP:** Roughly how much of your week would you say was actually spent working in GCP rather than adjacent tools or other clouds?
8. **Cloud & GCP:** Go through the core GCP areas one by one.
9. **Cloud & GCP:** On Compute Engine, what kinds of production issues have you personally handled?
10. **Cloud & GCP:** What was the hardest Compute Engine issue you troubleshot end-to-end?
11. **Cloud & GCP:** Which GCP services have you used in production?
12. **Cloud & GCP:** Explain VPC in GCP.
13. **Cloud & GCP:** Explain IAM roles and service accounts.
14. **Cloud & GCP:** How do you secure workloads in GCP?
15. **Cloud & GCP:** Explain Cloud Storage classes.
16. **Cloud & GCP:** What is Cloud SQL?
17. **Cloud & GCP:** Have you worked with GKE?
18. **Cloud & GCP:** Explain GKE architecture.
19. **Cloud & GCP:** What is the difference between GKE Autopilot and Standard?
20. **Cloud & GCP:** How do you troubleshoot a GKE cluster?
21. **Kubernetes:** Explain Kubernetes architecture.
22. **Kubernetes:** What are Pods?
23. **Kubernetes:** What is the difference between Deployment, StatefulSet, and DaemonSet?
24. **Kubernetes:** What is a ReplicaSet?
25. **Kubernetes:** Explain Services in Kubernetes.
26. **Kubernetes:** Explain FQDN in Kubernetes.
27. **Kubernetes:** How does pod-to-pod communication work?
28. **Kubernetes:** What are liveness and readiness probes?
29. **Kubernetes:** What happens if a liveness probe fails?
30. **Kubernetes:** What happens if a readiness probe fails?
31. **Kubernetes:** Explain ConfigMaps and Secrets.
32. **Kubernetes:** What are Persistent Volumes and PVCs?
33. **Kubernetes:** Explain Ingress.
34. **Kubernetes:** Explain Network Policies.
35. **Kubernetes:** How do you troubleshoot CrashLoopBackOff?
36. **Kubernetes:** How do you debug a pending pod?
37. **Kubernetes:** What commands do you use for troubleshooting?
38. **Helm:** Explain Helm.
39. **Helm:** How have you organized Helm charts?
40. **Helm:** How do you deploy applications using Helm?
41. **Docker:** Explain Docker architecture.
42. **Docker:** What is the difference between Docker and Kubernetes?
43. **Docker:** Explain Dockerfile.
44. **Docker:** What are Docker volumes?
45. **Docker:** What are Docker networks?
46. **Docker:** What is the difference between CMD and ENTRYPOINT?
47. **Docker:** Explain multi-stage Docker builds.
48. **CI/CD:** Explain your CI/CD pipeline.
49. **CI/CD:** Which CI/CD tools have you used?
50. **CI/CD:** Explain Jenkins pipeline.
51. **CI/CD:** Explain GitLab CI.
52. **CI/CD:** Explain Azure DevOps pipelines.
53. **CI/CD:** How do you handle deployment failures?
54. **CI/CD:** How do you implement rollback?
55. **CI/CD:** How do you deploy to Kubernetes?
56. **Terraform:** Explain Terraform state.
57. **Terraform:** What is a remote backend?
58. **Terraform:** How do you manage Terraform state?
59. **Terraform:** What are Terraform modules?
60. **Terraform:** Explain lifecycle in Terraform.
61. **Terraform:** How do you manage secrets?
62. **Terraform:** How do you resolve state conflicts?
63. **Monitoring & Logging:** Which monitoring tools have you used?
64. **Monitoring & Logging:** Explain ELK Stack.
65. **Monitoring & Logging:** Explain Grafana.
66. **Monitoring & Logging:** How do you troubleshoot production issues?
67. **Monitoring & Logging:** How do you investigate logs?
68. **Git & DevOps:** Explain Git branching strategy.
69. **Git & DevOps:** What is the difference between merge and rebase?
70. **Git & DevOps:** Explain GitHub workflow.
71. **Git & DevOps:** How do you resolve merge conflicts?
72. **Linux:** Which Linux commands do you use daily?
73. **Linux:** How do you check CPU, memory, and disk usage?
74. **Linux:** How do you troubleshoot a Linux server?
75. **Databases:** Which databases have you worked on?
76. **Databases:** Explain PostgreSQL basics.
77. **Databases:** How do you troubleshoot database connectivity?
78. **Kafka:** Have you worked with Kafka?
79. **Kafka:** Explain Kafka architecture.
80. **Kafka:** What are topics, partitions, and consumer groups?
81. **Production & Scenarios:** Tell me about a critical production issue you resolved.
82. **Production & Scenarios:** What was the toughest issue you have handled?
83. **Production & Scenarios:** Describe a time you had to make a trade-off under pressure.
84. **Production & Scenarios:** What production issue did you troubleshoot from start to finish?
85. **Production & Scenarios:** How do you perform root cause analysis (RCA)?
86. **Production & Scenarios:** How do you prioritize incidents?
87. **Behavioral:** Tell me about a challenging project.
88. **Behavioral:** Tell me about a conflict with a team member.
89. **Behavioral:** How do you handle pressure?
90. **Behavioral:** What is your biggest achievement?
91. **Behavioral:** What are your strengths?
92. **Behavioral:** What are your weaknesses?
93. **Behavioral:** Where do you see yourself in five years?
94. **MLOps / AI:** What is MLOps?
95. **MLOps / AI:** Have you worked with MLflow?
96. **MLOps / AI:** How would you deploy an ML model?
97. **MLOps / AI:** How would you monitor ML models?
98. **MLOps / AI:** What is Kubeflow?
99. **MLOps / AI:** How would you build an end-to-end MLOps pipeline?

## Mock Interview 63 - Kubernetes Fundamentals Transcript Round

Focus: Kubernetes DNS/FQDN, CoreDNS, API server, etcd, RBAC, kubelet, probes, pod health, restart flow, service discovery, and control plane versus worker-node responsibilities

1. **Kubernetes DNS:** How does Kubernetes FQDN resolve to an IP address? Explain service.namespace.svc.cluster.local and how DNS resolves the service name.
2. **CoreDNS:** What is the role of CoreDNS in Kubernetes? How does CoreDNS resolve service names, and does it communicate with the API server?
3. **CoreDNS/API Server:** Is CoreDNS a bridge between etcd and the Kubernetes API server? If not, what is its actual role?
4. **Kubernetes RBAC:** What is RBAC in Kubernetes? Why do we use RBAC? Explain Role, ClusterRole, RoleBinding, and ClusterRoleBinding.
5. **Kubernetes Health:** Suppose an application goes down in a Kubernetes cluster. How does the master or control plane know that the application is down? How does the signal reach the control plane?
6. **Kubelet:** Which component detects that a pod or application has become unhealthy, and what is the role of kubelet?
7. **Kubelet:** Is kubelet a worker node component or a master/control plane component?
8. **Kubelet/API Server:** How does kubelet communicate with the control plane, and what is the role of the API server?
9. **Liveness Probe:** Explain the Liveness Probe. When is it used, and what happens if it fails?
10. **Readiness Probe:** Explain the Readiness Probe. How is it different from the Liveness Probe?
11. **Container Restart:** If an application gets stuck or becomes unhealthy, does Kubernetes execute a kubectl command to restart it? If not, how is the restart triggered?
12. **Container Runtime:** How does kubelet restart a failed container? Does kubelet communicate directly with the container runtime?
13. **Kubernetes Failure Flow:** What is the complete flow when an application crashes: Application to Kubelet to API Server to etcd to Controller Manager to new Pod or restart?
14. **Content Correlation:** What do you mean by content correlation in the context of Kubernetes or observability?

## Mock Interview 64 - Security Database Ansible CI/CD Round

Focus: Application stack, Sentinel antivirus, Prisma Cloud Security, databases, PostgreSQL backup/restore, migrations, slow query analysis, Ansible, CI/CD flow, SonarQube, image scanning, and deployment stages

1. **Application Stack:** Your application is written in which language? Is it Java, Python, Node.js, or a mix of technologies?
2. **Security/Sentinel:** Have you deployed Sentinel antivirus? Is it scanning the Kubernetes cluster, worker nodes, or container applications?
3. **Security/Sentinel:** How do you integrate Sentinel with your applications? How does it work with GKE/Kubernetes, and when is the image scanned?
4. **Cloud Security:** After deployment, how do you monitor the infrastructure? How is Prisma or Cloud Security used, and what kind of misconfigurations does it detect, such as excessive IAM permissions like Owner role?
5. **Databases:** You mentioned PostgreSQL, MySQL, and MongoDB. Are you working as a DBA?
6. **Databases:** What database-related activities have you performed, such as database migration, role management, cluster creation, backup, and restore?
7. **PostgreSQL:** How do you take a backup of a PostgreSQL database?
8. **PostgreSQL:** How do you restore a PostgreSQL backup?
9. **PostgreSQL:** Have you performed backup and restore activities yourself?
10. **Database Migration:** What database migration have you done, for example AWS to GCP migration?
11. **Database Performance:** How do you identify long-running SQL queries?
12. **Database Performance:** How do you optimize slow-running SQL queries using indexing, EXPLAIN ANALYZE, and query tuning?
13. **Ansible:** You mentioned Terraform and Ansible. Have you worked on Ansible?
14. **Ansible:** What was the purpose of using Ansible, such as VM patching, configuration management, or report generation?
15. **Ansible:** Which Ansible modules have you used, such as yum, apt, service, systemd, shell, command, copy, template, file, setup, and lineinfile?
16. **Ansible:** Can you explain your Ansible playbook, including tasks, inventory, handlers, variables, and execution flow?
17. **CI/CD:** Can you explain the CI/CD process and how it works between Development, QA, DevOps, Security, and Production?
18. **CI/CD:** When developers commit code, what happens next?
19. **Security Scanning:** Do you perform any scanning after every code commit?
20. **Security Scanning:** Which tool do you use for code scanning, such as SonarQube or SonarCloud?
21. **SonarQube:** What does SonarQube check, including bugs, vulnerabilities, code smells, code duplication, and Quality Gates?
22. **SonarQube:** What happens if SonarQube Quality Gate fails?
23. **CI/CD:** After SonarQube, what are the next stages in the CI/CD pipeline, such as build, container image creation, image scanning, push to registry, and deployment to Dev/QA/Prod?

## Mock Interview 65 - EKS Kubernetes DevOps Operations Round

Focus: General experience, AWS/Azure/GCP/on-prem, EKS, root cause troubleshooting, Docker, Kubernetes Services and networking, Ingress, NGINX, Gateway API, namespaces, etcd, HPA, storage, backups, Jenkins, Argo CD, ELK/OpenTelemetry, Linux, GCP, Prometheus/Grafana, Helm, and Sentinel deployment

1. **General:** Tell me something about yourself.
2. **General:** You have around 7 years of experience, right?
3. **Cloud:** Have you worked on GCP, AWS, and Azure?
4. **Infrastructure:** Have you worked on on-prem servers or only on cloud?
5. **AWS/EKS:** Have you worked on EKS?
6. **AWS/EKS:** Have you launched an EKS cluster?
7. **AWS/EKS:** Did you create the EKS cluster using Terraform, CloudFormation, or manually?
8. **Troubleshooting:** Suppose an application is down. How will you identify the root cause?
9. **Docker:** What is the difference between ADD and COPY in a Dockerfile?
10. **Docker:** What is the difference between docker build and docker commit?
11. **Docker:** How can you minimize the Docker image size?
12. **Kubernetes Services:** What is a Headless Service?
13. **Kubernetes Services:** What is the default NodePort range?
14. **Kubernetes Services:** If NodePort gives only a port, how do you access the application? What IP do you use?
15. **Kubernetes Services:** If there are 10-20 worker nodes, which node IP will you choose?
16. **Kubernetes Services:** If the Load Balancer is down, how will you troubleshoot the application using NodePort?
17. **Kubernetes Networking:** How do you expose a service outside the Kubernetes cluster?
18. **Kubernetes Ingress:** Which Ingress Controller are you using?
19. **Kubernetes Ingress:** How do you install or setup the NGINX Ingress Controller in GKE?
20. **Kubernetes Ingress:** You already have a GKE cluster. How will you configure an Ingress Controller?
21. **Kubernetes Ingress:** Why do we use an Ingress Controller?
22. **Kubernetes Ingress:** If NGINX Ingress is deprecated, what will you use in the future?
23. **Kubernetes Ingress:** How will you expose applications after moving away from NGINX Ingress?
24. **Kubernetes Services:** How do you expose an application using a Kubernetes Service?
25. **Kubernetes Namespaces:** Why do we use Namespaces?
26. **Kubernetes Control Plane:** What is the role of etcd?
27. **Kubernetes Control Plane:** Can you take a backup of etcd?
28. **Kubernetes Control Plane:** How does the kube-apiserver communicate with etcd?
29. **Kubernetes Workloads:** What is a DaemonSet?
30. **Kubernetes Autoscaling:** How does the Horizontal Pod Autoscaler (HPA) work?
31. **Kubernetes Autoscaling:** Does HPA scale based on resource requests or resource limits?
32. **Kubernetes Storage:** Explain StorageClass, Persistent Volume (PV), and Persistent Volume Claim (PVC).
33. **Kubernetes Storage:** What is the difference between static provisioning and dynamic provisioning?
34. **Kubernetes Backup:** How do you take a backup of your Kubernetes cluster?
35. **Kubernetes Storage:** What is the difference between volume and volumeMount?
36. **CI/CD:** What kind of Jenkins pipelines have you created?
37. **Jenkins:** How do you take a backup of Jenkins?
38. **GitOps/Argo CD:** Have you used Argo CD or Harness?
39. **GitOps/Argo CD:** How does Argo CD work?
40. **GitOps/Argo CD:** If someone changes a Kubernetes resource using kubectl but does not update Git, what happens?
41. **Monitoring/ELK/OpenTelemetry:** Explain the ELK Stack along with OpenTelemetry.
42. **Monitoring/ELK/OpenTelemetry:** What is the complete log flow from the application to Kibana?
43. **OpenTelemetry:** What is the role of the OpenTelemetry Collector?
44. **Elastic/APM:** What is the role of the APM Server?
45. **Elasticsearch:** How do you delete old logs from Elasticsearch?
46. **Elasticsearch:** If ILM is not working and Elasticsearch storage is full, how will you clean up the logs?
47. **Kibana:** If Kibana is not working, how will you troubleshoot it?
48. **Linux:** If a Linux server has very high load, how will you reduce it?
49. **Linux:** How do you check whether an application is running?
50. **Linux:** If you cannot log in to the server, how will you check the server load?
51. **GCP:** Have you worked on GKE or GCE?
52. **GCP:** Which GCP services have you worked on?
53. **Monitoring:** Which monitoring tools have you worked on?
54. **Monitoring:** Have you worked on Prometheus and Grafana?
55. **Monitoring:** Did you integrate Prometheus and Grafana?
56. **Helm:** Have you worked with Helm?
57. **Helm/Sentinel:** How did you deploy Sentinel Antivirus using Helm?
58. **Sentinel:** Was Sentinel deployed as a container?
59. **Sentinel:** Was Sentinel deployed on all worker nodes?

## Mock Interview 66 - Terraform Secret Creation Hands-On Round

Focus: Terraform hands-on coding task for local provider initialization, input variables, environment-backed secrets, local_file resource creation, file permissions, and clean grading through sudo solve

1. **Terraform/Hands-On:** Terraform: Secret Creation. You want to deploy a web application using Terraform. Complete /home/ubuntu/1063862-terraform-secret-creation/main.tf using HCL so that it initializes the hashicorp/local provider at version 2.1.0, declares a variable named secret whose value is passed through an environment variable during terraform apply, and creates a local_file resource at /run/secret with permissions 0600 and content from var.secret. The solution must live inside /home/ubuntu/1063862-terraform-secret-creation and be correct when evaluated by running sudo solve from that directory in a clean environment.

## Mock Interview 67 - Kubernetes StatefulSet Basic Implementation Hands-On Round

Focus: Kubernetes hands-on coding task for StatefulSet creation, namespace placement, headless Service binding, labels and selectors, replicas, container image, and container port configuration

1. **Kubernetes/Hands-On:** StatefulSet: Basic Implementation. In the hacker-company namespace, an existing headless Service named nginx has selector role: frontend and exposes port 80. Complete /home/ubuntu/171641-kubernetes-statefulset-basic-implementation/definition.yaml by implementing a StatefulSet named frontend in namespace hacker-company. It must use serviceName nginx, deploy 2 replicas, set labels so they match the Service selector role: frontend, run a container named nginx using image nginx:latest, and expose container port 80. Verify with kubectl get statefulset -n hacker-company, kubectl get pods -n hacker-company, kubectl describe statefulset frontend -n hacker-company, then finish with sudo solve.

## Mock Interview 68 - Docker HackerAPI Environment Variable Hands-On Round

Focus: Docker hands-on scripting task for container creation, image selection, container naming, host environment variable forwarding, detached interactive mode, and avoiding pseudo-TTY allocation

1. **Docker/Hands-On:** Docker: HackerAPI Deployment, Environment Variables. Complete the script.sh file stub under /home/ubuntu/... so it runs a Docker container named hackerapi using image public.ecr.aws/docker/library/nginx:latest. The container must receive an environment variable named HACKERAPI_SECURITY_TOKEN with its value taken from the existing host environment variable of the same name, run in interactive background mode, and run without pseudo-TTY allocation. The expected command is: docker run -d -i --name hackerapi -e HACKERAPI_SECURITY_TOKEN=$HACKERAPI_SECURITY_TOKEN public.ecr.aws/docker/library/nginx:latest.

## Mock Interview 69 - Terraform Validate Docker Project Round

Focus: Coderbyte-style Terraform Docker validation assessment covering required_providers, Docker provider configuration, terraform init/validate/fmt/plan/apply/destroy, Docker image and container resources, port mapping, resource references, provider version constraints, and core IaC interview concepts

1. **Terraform/Docker Provider:** Configure the Docker provider with the correct source and version.
2. **Terraform/Providers:** Define the required_providers block for a Terraform Docker project.
3. **Terraform/Commands:** How do you initialize a Terraform project, and why is terraform init required before validation?
4. **Terraform/Commands:** How do you validate a Terraform configuration, and what kinds of errors does terraform validate catch?
5. **Terraform/Syntax:** How would you identify and fix syntax errors in a Terraform configuration?
6. **Terraform/Docker Provider:** How do you configure a Docker provider in Terraform?
7. **Terraform/Docker Image:** How do you create a Docker image resource in Terraform?
8. **Terraform/Docker Container:** How do you create a Docker container resource in Terraform?
9. **Terraform/Ports:** How do you expose a container port using the ports block?
10. **Terraform/Ports:** How do you map internal port 80 to external port 8000 in a Terraform Docker container resource?
11. **Terraform/Dependencies:** How do you reference one Terraform resource from another?
12. **Terraform/Docker Image:** How do you use the image_id attribute of a docker_image resource in a docker_container resource?
13. **Terraform/Commands:** Differentiate between terraform init, terraform validate, and terraform apply.
14. **Terraform/Versioning:** How do provider version constraints work in Terraform, for example ~> 3.0.1?
15. **Terraform/Troubleshooting:** How would you identify missing Terraform configuration required for successful validation?
16. **Docker/Terraform:** What is the purpose of the Docker provider in Terraform?
17. **Docker/Basics:** What is the difference between a Docker image and a Docker container?
18. **Docker/Networking:** Why do we expose ports for a Docker container?
19. **Docker/Networking:** What is the difference between internal and external ports?
20. **Terraform/Docker Hands-On:** How do you run an Nginx container using Terraform?
21. **Terraform/Versioning:** What happens if the required provider version is incorrect?
22. **Terraform/Commands:** Explain when you would use terraform init, terraform validate, terraform fmt, terraform plan, terraform apply, and terraform destroy.
23. **IaC:** What is Infrastructure as Code (IaC)?
24. **Terraform/Basics:** Why do we use Terraform?
25. **Terraform/Basics:** What are providers in Terraform?
26. **Terraform/Basics:** What are resources in Terraform?
27. **Terraform/State:** What is the Terraform state file?
28. **Terraform/Providers:** What is the purpose of required_providers?
29. **Terraform/Dependencies:** Explain resource dependencies in Terraform.
30. **Terraform/Commands:** What is the difference between terraform validate and terraform plan?
31. **Terraform/Versioning:** How do you pin a provider version?
32. **Terraform/Docker Hands-On:** How would you deploy a Docker container using Terraform?

## Mock Interview 70 - GCP DevOps and GKE Screening

Focus: DevOps responsibilities, GCP services, GKE, Jenkins, CI/CD, Docker/Kubernetes operations, monitoring and security

1. **DevOps:** Your profile looks more DevOps-focused. What have you done specifically in DevOps?
2. **DevOps:** In the DevOps area, what exactly are you trying to do? What are your day-to-day responsibilities?
3. **Cloud:** Which cloud platform are you strongest in: GCP, AWS, or Azure?
4. **GCP:** What are the last three major DevOps tasks or projects you have done in GCP?
5. **GCP:** What are the key GCP services you have used?
6. **GKE/Kubernetes:** What is the difference between GKE Standard Mode and Autopilot Mode?
7. **GKE/Kubernetes:** Can you explain the GKE architecture?
8. **GKE/Security:** How do you secure a GKE cluster?
9. **CI/CD/Jenkins:** Have you used Jenkins CI/CD pipelines with Bitbucket?
10. **CI/CD/Jenkins:** What is the CI workflow in Jenkins?
11. **CI/CD/GCP:** How would you design a CI/CD pipeline in GCP? Explain the complete flow.
12. **CI/CD/Git:** Would you use Cloud Source Repositories or an external Git repository such as GitHub, Bitbucket, or GitLab in your pipeline?
13. **Data Platform:** Do you have experience implementing GCP with EDM, Salesforce, or any data platform?
14. **Database Migration:** Do you have experience with Liquibase or database migration?
15. **Containers/Kubernetes:** Do you have real-time experience with containerization technologies like Docker and Kubernetes?
16. **Containers/Kubernetes:** Can you explain a real project where you containerized and deployed an application?
17. **Observability:** How do you monitor containerized applications?
18. **Logging/Troubleshooting:** How do you perform logging and troubleshoot errors in Docker/Kubernetes environments?
19. **Observability:** Which monitoring tools have you used for Kubernetes, such as Prometheus, ELK, Datadog, or Cloud Monitoring?

## Mock Interview 71 - Docker Kubernetes CI/CD DevSecOps Deep Dive

Focus: Dockerfile fundamentals, Kubernetes services and manifests, EKS deployment pipeline, ConfigMaps, Secrets, networking, service auth, Azure App Service, APIs, observability, scalability, and MLOps

1. **Docker:** What is the purpose of EXPOSE in a Dockerfile?
2. **Docker:** What is RUN used for in a Dockerfile?
3. **Docker/FastAPI:** How do you expose a FastAPI application on port 8000 inside a Docker container?
4. **Docker:** How does the application code become available inside the Docker container?
5. **Docker:** What command starts the application inside the container?
6. **Docker/Networking:** How do you publish a Docker container port to the host?
7. **Docker/Networking:** What is the purpose of docker run -p?
8. **Kubernetes/Services:** What are the different types of Kubernetes Services?
9. **Kubernetes/Services:** How do you expose an application externally?
10. **Kubernetes/Networking:** What is the equivalent of Docker port mapping in Kubernetes?
11. **Kubernetes/Services:** How do containerPort, port, and targetPort work?
12. **Kubernetes/Manifests:** How do you deploy an application using Kubernetes manifest files?
13. **Kubernetes/Commands:** What is the kubectl apply command?
14. **EKS/Deployment:** After pushing an image to ECR, what is the next step?
15. **Kubernetes/Deployment:** How do you update the Deployment manifest with the new image?
16. **Kubernetes/Deployment:** If the latest image is pushed but the pod is still using the old image, how do you refresh it?
17. **Helm:** Have you worked on Helm charts?
18. **CI/CD/EKS:** Explain an automated deployment pipeline for a FastAPI application to EKS.
19. **DevSecOps:** What checks would you perform before deployment?
20. **DevSecOps:** How would you perform code formatting, linting, unit testing, vulnerability scanning, secret scanning, and image scanning?
21. **Container Registry:** Where would you push the Docker image?
22. **CI/CD/EKS:** How would you deploy the image after pushing it to ECR?
23. **CI/CD/Automation:** How would you automate the deployment?
24. **Kubernetes/Config:** What is a ConfigMap?
25. **Kubernetes/Config:** What is stored inside a ConfigMap?
26. **Kubernetes/Secrets:** What are Kubernetes Secrets?
27. **Kubernetes/Secrets:** How do you use Secrets inside a pod?
28. **Kubernetes/Config:** What is the difference between ConfigMap and Secret?
29. **Networking:** How can you expose a service only to users inside your organization?
30. **Networking/Security:** Without using SSO or RBAC, how would you restrict access?
31. **Kubernetes/NetworkPolicy:** Can NetworkPolicy solve this problem?
32. **Networking/Security:** How would you whitelist an organization's CIDR/IP range?
33. **Networking/Load Balancer:** What is the role of an Internal Load Balancer?
34. **Security/Service Auth:** What is service-to-service authentication?
35. **Security/Service Auth:** How do two services communicate securely?
36. **Azure/PostgreSQL:** How would an App Service communicate with PostgreSQL?
37. **Azure/IAM:** How would you authorize App Service to access PostgreSQL?
38. **Azure/IAM:** How do Managed Identities work?
39. **Azure/IAM:** How do you provide Contributor access to an App Service?
40. **Azure/App Service:** What is Azure App Service?
41. **Azure/App Service:** What is App Service used for?
42. **Azure/App Service:** How do applications hosted on App Service connect to a database?
43. **APIs/Development:** How comfortable are you with API development?
44. **APIs/Development:** Have you built APIs yourself?
45. **APIs/Database:** How does an API read and write data to a database?
46. **APIs/Development:** What is your understanding of API development?
47. **Observability:** How would you build an observability namespace?
48. **Observability:** Which services would you use for metrics, logs, and traces?
49. **Observability/Grafana:** How would you integrate Grafana?
50. **Observability/OpenTelemetry:** What exactly is OpenTelemetry?
51. **Observability/OpenTelemetry:** OpenTelemetry is only a collector; what backend services would you use?
52. **Observability/Grafana:** How would Grafana connect to those services?
53. **Scalability/Kubernetes:** Suppose millions of users access your API. How would you design a scalable Kubernetes solution?
54. **Scalability:** How would you determine your scaling strategy?
55. **Scalability/Kubernetes:** How would you estimate the number of pods?
56. **Load Testing:** How would you perform load testing?
57. **Load Testing:** Can you generate 5,000 requests per second?
58. **Load Testing:** Which load-testing tools would you use?
59. **MLOps/AI:** How is your understanding of the latest GenAI/MLOps journey?
60. **HR/Behavioral:** Do you have any questions for me?
61. **HR/Behavioral:** Where are you currently based?
62. **HR/Behavioral:** What is your native place?

## Mock Interview 72 - Kubernetes Terraform Observability and MLOps

Focus: Kubernetes CNI, service mesh, workloads, probes, ingress, autoscaling, cloud networking, observability, Terraform, Ansible, compliance, MLOps and AI infrastructure

1. **Kubernetes/Networking:** Explain CNI in Kubernetes.
2. **Kubernetes/Networking:** Which CNI have you worked on?
3. **Kubernetes/Service Mesh:** Do you have experience with a Service Mesh?
4. **Kubernetes/Service Mesh:** Can you explain what a Service Mesh is?
5. **Kubernetes/Workloads:** What is the difference between a Deployment and a StatefulSet?
6. **Kubernetes/Probes:** How do Liveness and Readiness probes differ?
7. **Kubernetes/Containers:** What is a Sidecar container?
8. **Kubernetes/Ingress:** What is an Ingress Controller?
9. **Kubernetes/Autoscaling:** How do you handle Pod Autoscaling?
10. **Kubernetes/Secrets:** What is a Kubernetes Secret?
11. **Linux/Kubernetes:** What is BusyBox?
12. **Kubernetes/etcd:** What does etcd store?
13. **Kubernetes/etcd:** Does etcd store namespaces and storage configurations?
14. **Deployment Strategies:** What is Blue-Green Deployment?
15. **Helm:** What is the use of Helm?
16. **Cloud Networking:** What is the difference between AWS VPC, Azure VNet, and GCP VPC?
17. **Hybrid Networking:** How do you connect on-premises resources with cloud resources?
18. **Cloud Networking:** What is a VPC?
19. **Kubernetes/Architecture:** How many Kubernetes clusters do you require in production?
20. **Load Balancing:** How does a Load Balancer distribute traffic between services, for example 50-50?
21. **Security/mTLS:** What is mTLS?
22. **Observability/Prometheus:** How much experience do you have with Prometheus?
23. **Observability/Grafana:** How much experience do you have with Grafana?
24. **Observability/OpenTelemetry:** How much experience do you have with OpenTelemetry?
25. **Observability/Tracing:** Have you worked with Jaeger?
26. **Observability/Logging:** Have you integrated ELK?
27. **Terraform/State:** What is Terraform State?
28. **Terraform/Security:** Why is Terraform State a security risk?
29. **Terraform/State:** How do you manage state locking in a team environment?
30. **Terraform/Modules:** What is a Terraform Module?
31. **Terraform/Modules:** When should you use a Terraform Module?
32. **Terraform/Secrets:** How do you handle secret injection in Terraform?
33. **Ansible:** What is idempotency in Ansible?
34. **Security/Compliance:** Have you worked in environments with compliance requirements like PCI DSS, GDPR, or SOC 2?
35. **Security/Compliance:** What was your role in meeting those compliance requirements?
36. **Certifications:** Are all three of your cloud certifications still valid?
37. **MLOps/AI:** How is your experience with MLOps and AI infrastructure?
38. **MLOps/AI:** What kind of MLOps or AI infrastructure work have you done?

## Mock Interview 73 - Senior GKE Architecture Resource Security and Cost

Focus: Current role storytelling, end-to-end infrastructure architecture, Kubernetes resource sizing, quotas, CPU/memory behavior, monitoring, Prisma Cloud, application security, autoscaling, and cost governance

1. **Role/Responsibilities:** Talk in detail about your core roles and responsibilities in your current role.
2. **Project Architecture:** Can you explain your current project using a specific client or application as an example?
3. **Project Architecture:** Explain the infrastructure architecture of one application from end to end.
4. **Runtime Platform:** Where does this application run?
5. **Infrastructure Architecture:** What are all the infrastructure components required for this application to run?
6. **Kubernetes/Resources:** Who decides the CPU and memory limits for the application?
7. **Kubernetes/Resources:** How do you determine the CPU and memory requests and limits?
8. **Cloud Cost:** Does the application team also approve the resource sizing because of the cloud cost?
9. **Kubernetes/Quotas:** What resource quotas or limits do you configure in a Kubernetes cluster?
10. **Kubernetes/Resources:** How do CPU requests and limits work in Kubernetes?
11. **Kubernetes/Resources:** What happens if a container exceeds its memory limit?
12. **Kubernetes/Resources:** What happens if a container exceeds its CPU limit?
13. **Systems/Resources:** What is the difference between CPU utilization and memory utilization?
14. **Systems/Storage:** How is memory different from disk storage?
15. **Observability:** What monitoring tools do you use for the application and infrastructure?
16. **Observability:** Apart from native GCP monitoring, what third-party monitoring tools do you use?
17. **Security/Prisma Cloud:** What does Prisma Cloud monitor?
18. **Security/Prisma Cloud:** Does Prisma monitor IAM security and network security only, or does it also cover application security?
19. **Application Security:** Have you worked on application security?
20. **Application Security:** Have you worked on penetration testing or vulnerability assessment?
21. **Application Security:** Can you give an example of an application security vulnerability that you worked on?
22. **Web Security:** What are some important HTTP security headers that should be present?
23. **Web Security:** What does Content Security Policy (CSP) do?
24. **GKE/Autoscaling:** How does Cluster Autoscaler work in Kubernetes/GKE?
25. **Observability/GKE:** Do you have real-time monitoring for the Kubernetes cluster?
26. **GKE/Autoscaling:** If there is a sudden spike in traffic, how does autoscaling work in real time?
27. **GKE/Autoscaling:** I am referring to node autoscaling, not pod autoscaling. How does node autoscaling work?
28. **GKE/Autoscaling:** What happens if, due to some unknown issue, the Cluster Autoscaler keeps creating new nodes?
29. **Cloud Cost/Governance:** How do you control the cloud cost when Cluster Autoscaler keeps scaling nodes?

## Mock Interview 74 - Python Automation and FastAPI DevOps Round

Focus: Python scripting, automation design, API development, FastAPI, authentication, databases, testing, Docker, Kubernetes, observability, and production readiness

1. **Python/Automation:** How have you used Python for DevOps automation in real projects?
2. **Python/Automation:** How would you design a Python script to automate repeated cloud or Kubernetes operational tasks?
3. **Python/Automation:** How do you handle errors, retries, logging, and exit codes in production Python automation?
4. **Python/Automation:** When would you choose Python over Bash for automation?
5. **Python/Automation:** How would you securely handle credentials and secrets in a Python automation script?
6. **Python/Automation:** How do you make Python automation idempotent?
7. **Python/Automation:** How would you schedule and run Python automation in production?
8. **Python/Automation:** How would you package and deploy a Python automation tool for a team?
9. **FastAPI:** What is FastAPI and why would you choose it for backend APIs?
10. **FastAPI:** How do you create a basic GET and POST API in FastAPI?
11. **FastAPI/Validation:** How does request validation work in FastAPI?
12. **FastAPI/Auth:** How would you implement authentication and authorization in a FastAPI application?
13. **FastAPI/Database:** How does a FastAPI application read and write data to a database?
14. **FastAPI/Async:** What is the difference between sync and async endpoints in FastAPI?
15. **FastAPI/Testing:** How would you test a FastAPI application?
16. **FastAPI/Docker:** How would you containerize and run a FastAPI application using Docker?
17. **FastAPI/Kubernetes:** How would you deploy a FastAPI application on Kubernetes?
18. **FastAPI/Observability:** How would you add logging, metrics, and tracing to a FastAPI application?
19. **FastAPI/Security:** What security best practices would you follow for FastAPI APIs?
20. **FastAPI/Performance:** How would you improve performance and scalability for a FastAPI service?
21. **FastAPI/CI/CD:** How would you design a CI/CD pipeline for a Python FastAPI service?
22. **FastAPI/Troubleshooting:** A FastAPI service is returning intermittent 500 errors in Kubernetes. How would you troubleshoot it?
23. **Python/FastAPI/System Design:** Design a production-ready FastAPI service for an internal DevOps automation platform.

## Mock Interview 75 - API Development Production Round

Focus: API fundamentals, REST design, authentication, authorization, database access, error handling, versioning, testing, observability, security, performance, and production troubleshooting

1. **API/Fundamentals:** What is an API and why do we use APIs in modern applications?
2. **API/Fundamentals:** What is the difference between REST API, GraphQL, and gRPC?
3. **API/REST:** How would you design REST endpoints for a user or order management service?
4. **API/HTTP:** What are common HTTP methods and when would you use GET, POST, PUT, PATCH, and DELETE?
5. **API/HTTP:** What are important HTTP status codes every API developer should know?
6. **API/Validation:** How do you validate API request payloads and query parameters?
7. **API/Auth:** How do you implement authentication in an API?
8. **API/Auth:** What is the difference between authentication and authorization?
9. **API/Auth:** How do JWT tokens work in API authentication?
10. **API/Auth:** How would you implement role-based access control for APIs?
11. **API/Database:** How do you handle database transactions in API development?
12. **API/Error Handling:** How should an API handle errors and return error responses?
13. **API/Versioning:** How do you handle API versioning without breaking existing clients?
14. **API/Pagination:** How would you implement pagination, filtering, and sorting in an API?
15. **API/Idempotency:** What is idempotency in APIs and why is it important?
16. **API/Rate Limiting:** How would you implement rate limiting and throttling for APIs?
17. **API/Security:** What API security best practices would you follow in production?
18. **API/Testing:** How would you test APIs before releasing them to production?
19. **API/Documentation:** How do you document APIs for frontend teams and external consumers?
20. **API/Observability:** What logs, metrics, and traces would you add to a production API?
21. **API/Performance:** How would you improve API performance and reduce latency?
22. **API/Scalability:** How would you design an API to handle high traffic?
23. **API/Deployment:** How would you deploy an API using Docker and Kubernetes?
24. **API/CI/CD:** How would you design a CI/CD pipeline for API development?
25. **API/Troubleshooting:** An API is returning intermittent 500 errors after deployment. How would you debug it?
26. **API/Troubleshooting:** An API latency increased suddenly in production. What would you check first?
27. **API/System Design:** Design a production-ready API platform for internal automation tools.

## Mock Interview 76 - GenAI and LLMOps Production Round

Focus: GenAI fundamentals, RAG, embeddings, vector databases, prompt engineering, model selection, agents, evaluation, safety, observability, cost, deployment, and LLMOps production readiness

1. **GenAI/Fundamentals:** What is Generative AI and how is it different from traditional machine learning?
2. **GenAI/Fundamentals:** What is an LLM and how does it generate responses?
3. **GenAI/Use Cases:** What practical GenAI use cases have you seen for DevOps, SRE, or platform engineering?
4. **GenAI/RAG:** What is RAG and why do we use it with LLM applications?
5. **GenAI/RAG:** Explain the end-to-end flow of a RAG application.
6. **GenAI/Embeddings:** What are embeddings and why are they useful in GenAI systems?
7. **GenAI/Vector DB:** What is a vector database and when would you use one?
8. **GenAI/RAG:** How would you improve retrieval quality in a RAG system?
9. **GenAI/Prompt Engineering:** What is prompt engineering and what makes a prompt production-ready?
10. **GenAI/Model Selection:** How would you choose between OpenAI, Gemini, Claude, open-source LLMs, or self-hosted models?
11. **GenAI/Fine Tuning:** What is the difference between RAG and fine-tuning?
12. **GenAI/Agents:** What are AI agents and what risks do they introduce in production?
13. **GenAI/Tools:** How does tool calling or function calling work in GenAI applications?
14. **GenAI/Evaluation:** How would you evaluate the quality of an LLM application?
15. **GenAI/Hallucination:** What is hallucination in LLMs and how would you reduce it?
16. **GenAI/Safety:** What safety and guardrail controls would you add to a GenAI application?
17. **GenAI/Security:** What are prompt injection and data leakage risks in GenAI applications?
18. **GenAI/Privacy:** How would you protect sensitive data when using LLM APIs?
19. **LLMOps/Architecture:** How would you design a production architecture for a GenAI chatbot using RAG?
20. **LLMOps/CI-CD:** How would you design CI/CD for prompts, chains, and GenAI application code?
21. **LLMOps/Observability:** What should you monitor in a production LLM application?
22. **LLMOps/Cost:** How would you control cost for a high-traffic GenAI application?
23. **LLMOps/Performance:** How would you reduce latency in an LLM-powered API?
24. **LLMOps/Reliability:** How would you design fallback and resilience for LLM provider failures?
25. **LLMOps/Kubernetes:** How would you deploy a GenAI application on Kubernetes?
26. **LLMOps/MLOps:** How is LLMOps different from traditional MLOps?
27. **GenAI/Troubleshooting:** A RAG chatbot is giving wrong answers from old documents. How would you troubleshoot it?
28. **GenAI/System Design:** Design a secure internal GenAI assistant for DevOps teams to query runbooks, incidents, and Kubernetes troubleshooting steps.

## Mock Interview 77 - Senior DevOps, GCP, Kubernetes and Terraform Production Round

Focus: Production troubleshooting, Jenkins and CI/CD design, GCP architecture, Kubernetes operations, Docker, Terraform, observability, Linux, Python, Git, Argo CD, incident response, and security

1. **CI/CD/Jenkins:** Explain your Jenkins pipeline architecture.
2. **CI/CD/Jenkins:** What stages do you include in your CI/CD pipeline?
3. **CI/CD/Jenkins:** How do you integrate third-party tools like Prisma Cloud, Stream Security, or Datadog into Jenkins?
4. **CI/CD/Jenkins:** What is a multi-stage Jenkins pipeline?
5. **CI/CD/Troubleshooting:** Your Jenkins pipeline suddenly starts failing after hundreds of successful builds. How do you troubleshoot it?
6. **CI/CD/Troubleshooting:** Where do you start troubleshooting—a cloud service, the application, or Jenkins?
7. **CI/CD/System Design:** Design a complete CI/CD pipeline for a Java microservices application from code merge to production.
8. **CI/CD/Jenkins:** Would you use a Scripted Pipeline or Declarative Pipeline? Why?
9. **CI/CD/Jenkins:** What is a Jenkinsfile?
10. **CI/CD/Jenkins:** Which type of pipeline is called a Jenkinsfile?
11. **GCP/Experience:** How would you rate yourself in GCP out of 10?
12. **GCP/Compute Engine:** What are the advantages of Compute Engine over traditional virtual machines?
13. **GCP/Compute Engine:** What machine families are available in Compute Engine?
14. **GCP/Troubleshooting:** A production VM becomes unreachable. How do you troubleshoot it?
15. **GCP/Disaster Recovery:** If an entire GCP region goes down, what is your disaster recovery strategy?
16. **GCP/Security:** How would you improve security in GCP?
17. **GCP/Networking:** A VM in VPC-A cannot communicate with a VM in VPC-B. How do you troubleshoot it?
18. **GCP/Performance:** CPU utilization is only 20%, but application latency has doubled. How do you investigate it?
19. **GCP/Architecture:** Compare Cloud Run, GKE, Compute Engine, and App Engine.
20. **Kubernetes/Networking:** What are the Kubernetes Service types?
21. **Kubernetes/Troubleshooting:** A Service is not routing traffic to the correct Pod. How do you troubleshoot it?
22. **Kubernetes/Architecture:** Explain the Kubernetes architecture.
23. **Kubernetes/Architecture:** Which components communicate with each other in Kubernetes?
24. **Kubernetes/Configuration:** Where do ConfigMaps and Secrets fit into the Kubernetes architecture?
25. **Kubernetes/Deployment:** What deployment strategies are available in Kubernetes?
26. **Kubernetes/Deployment:** Which deployment strategy do you prefer in production and why?
27. **Kubernetes/Autoscaling:** Explain Horizontal Pod Autoscaler (HPA).
28. **Kubernetes/Autoscaling:** Explain Vertical Pod Autoscaler (VPA).
29. **Kubernetes/Troubleshooting:** Pods are getting killed automatically. How do you determine whether it’s OOMKilled, node resource pressure, or another issue?
30. **Kubernetes/Incident Response:** Multiple pods are in CrashLoopBackOff. How do you restore production quickly?
31. **Docker/Dockerfile:** Name the common Dockerfile instructions.
32. **Docker/Security:** How do you scan Docker images for vulnerabilities?
33. **Docker/Build:** What is a multi-stage Docker build?
34. **Docker/Runtime:** Do Docker containers have separate kernels or do they share the host kernel?
35. **Docker/Runtime:** How does a container communicate with the Linux kernel?
36. **Terraform/Architecture:** Design a multi-cloud deployment using Terraform.
37. **Terraform/Fundamentals:** What are the basic Terraform commands?
38. **Terraform/State:** What happens if the S3 bucket storing the Terraform state is accidentally deleted?
39. **Terraform/State:** If the Terraform state becomes very large, how do you manage it?
40. **Terraform/Modules:** Did you create Terraform modules from scratch?
41. **Terraform/Experience:** How many Terraform services/resources have you worked on?
42. **Terraform/State:** Where do you prefer to store Terraform state?
43. **Observability/Architecture:** How would you design a monitoring solution for microservices?
44. **Observability/Fundamentals:** What is the difference between monitoring and observability?
45. **Observability/Experience:** Have you used Prometheus and Grafana?
46. **Observability/Deployment:** How do you deploy Prometheus and Grafana?
47. **Observability/Metrics:** How do you expose application metrics to Prometheus?
48. **Observability/Alerting:** How do you configure alerts?
49. **Linux/Security:** Why do we use sudo instead of logging in as the root user?
50. **Linux/Permissions:** Explain Linux file permissions.
51. **Linux/Permissions:** Why should we avoid 777 permissions?
52. **Linux/Security:** Why do we have both /etc/passwd and /etc/shadow?
53. **Linux/Scripting:** Write a shell script to find files with 777 permissions.
54. **Python/DevOps:** How have you used Python in DevOps?
55. **Python/Automation:** Write a Python script to upload a file to an S3 bucket.
56. **Git/Fundamentals:** Name the common Git commands you use.
57. **Git/Branches:** How do you clone only a single branch from a repository?
58. **Git/Workflow:** What is git cherry-pick?
59. **Git/Fundamentals:** What is the difference between git clone, git fetch, and git pull?
60. **Argo CD/Experience:** Have you worked with Argo CD?
61. **Argo CD/GitOps:** What is GitOps?
62. **Argo CD/Experience:** What is your hands-on experience with Argo CD?
63. **Production Support/Incident Response:** How do you handle a production incident?
64. **Production Support/Process:** Do you log in directly to production servers, or do you follow an incident management process?
65. **Production Support/Communication:** How do you communicate during a Sev-1 incident?
66. **Security/Application:** How do you improve application security in production?
67. **Security/Secrets:** How do you manage secrets securely?
68. **Security/Containers:** How do you secure Docker images?
69. **HR/Closing:** Do you have any questions for us?
70. **HR/Closing:** What kind of role are you looking for?
71. **HR/Closing:** Do you have any feedback for us?
72. **HR/Closing:** Is there anything else you’d like to ask?
73. **Python/Debugging:** Debug and complete the following Python script intended to upload a local file to an S3 bucket. Identify the syntax, naming, path, object-key, exception-handling, and AWS credential issues; then provide a production-safe version.

    ```python
    Import boto3
    From botocore.exceptions import clientError

    s3_client = boto3.client(“s3”)
    local_file_path = “/c/data/”
    bcuket_name = “swapnilAkhi”
    s3_object_name = ““
    ```

74. **Linux/Shell Debugging:** Debug and improve the following shell script intended to find regular files with permissions exactly 777. Explain the quoting, variable naming, permission-mode, error-handling, and filesystem-scope considerations.

    ```bash
    #!/bin/bash

    Search_path=“/”
    find “$Search_path” -type f -perm 777 2>/dev/null
    ```
