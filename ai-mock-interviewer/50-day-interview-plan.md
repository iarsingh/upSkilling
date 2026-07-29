# 50-Day Senior Interview Preparation Plan

Actual experience: **7 years**. Interview calibration: **10–15-year scope and depth** without misrepresenting tenure. Compensation target: **₹25 LPA**.

## Document Index

### Topic Index

1. [Cloud Platforms & GCP Services](#cloud-platforms-gcp-services)
2. [GCP Networking](#gcp-networking)
3. [Kubernetes & Containerization](#kubernetes-containerization)
4. [Infrastructure as Code (IaC)](#infrastructure-as-code-iac)
5. [CI/CD & GitOps](#cicd-gitops)
6. [MLOps & AI Platforms](#mlops-ai-platforms)
7. [DevSecOps & Cloud Security](#devsecops-cloud-security)
8. [Monitoring, Logging & Observability](#monitoring-logging-observability)
9. [Programming & Scripting](#programming-scripting)
10. [Databases & Data Services](#databases-data-services)
11. [Messaging & Streaming](#messaging-streaming)
12. [Source Control & Artifact Management](#source-control-artifact-management)
13. [Backup & Disaster Recovery](#backup-disaster-recovery)
14. [ITSM & Enterprise Tools](#itsm-enterprise-tools)
15. [Platform Engineering & SRE](#platform-engineering-sre)
16. [Hybrid & Multi-Cloud](#hybrid-multi-cloud)
17. [Application & API Technologies](#application-api-technologies)

### Day Index

1. [Day 1 Mock Interview Practice](#day-1-mock-interview-practice)
2. [Day 2 Mock Interview Practice](#day-2-mock-interview-practice)
3. [Day 3 Mock Interview Practice](#day-3-mock-interview-practice)
4. [Day 4 Mock Interview Practice](#day-4-mock-interview-practice)
5. [Day 5 Mock Interview Practice](#day-5-mock-interview-practice)
6. [Day 6 Mock Interview Practice](#day-6-mock-interview-practice)
7. [Day 7 Mock Interview Practice](#day-7-mock-interview-practice)
8. [Day 8 Mock Interview Practice](#day-8-mock-interview-practice)
9. [Day 9 Mock Interview Practice](#day-9-mock-interview-practice)
10. [Day 10 Mock Interview Practice](#day-10-mock-interview-practice)
11. [Day 11 Mock Interview Practice](#day-11-mock-interview-practice)
12. [Day 12 Mock Interview Practice](#day-12-mock-interview-practice)
13. [Day 13 Mock Interview Practice](#day-13-mock-interview-practice)
14. [Day 14 Mock Interview Practice](#day-14-mock-interview-practice)
15. [Day 15 Mock Interview Practice](#day-15-mock-interview-practice)
16. [Day 16 Mock Interview Practice](#day-16-mock-interview-practice)
17. [Day 17 Mock Interview Practice](#day-17-mock-interview-practice)
18. [Day 18 Mock Interview Practice](#day-18-mock-interview-practice)
19. [Day 19 Mock Interview Practice](#day-19-mock-interview-practice)
20. [Day 20 Mock Interview Practice](#day-20-mock-interview-practice)
21. [Day 21 Mock Interview Practice](#day-21-mock-interview-practice)
22. [Day 22 Mock Interview Practice](#day-22-mock-interview-practice)
23. [Day 23 Mock Interview Practice](#day-23-mock-interview-practice)
24. [Day 24 Mock Interview Practice](#day-24-mock-interview-practice)
25. [Day 25 Mock Interview Practice](#day-25-mock-interview-practice)
26. [Day 26 Mock Interview Practice](#day-26-mock-interview-practice)
27. [Day 27 Mock Interview Practice](#day-27-mock-interview-practice)
28. [Day 28 Mock Interview Practice](#day-28-mock-interview-practice)
29. [Day 29 Mock Interview Practice](#day-29-mock-interview-practice)
30. [Day 30 Mock Interview Practice](#day-30-mock-interview-practice)
31. [Day 31: Senior GCP architecture and ownership](#day-31-senior-gcp-architecture-and-ownership)
32. [Day 32: GCP networking and hybrid connectivity](#day-32-gcp-networking-and-hybrid-connectivity)
33. [Day 33: GKE reliability and platform operations](#day-33-gke-reliability-and-platform-operations)
34. [Day 34: Terraform governance and recovery](#day-34-terraform-governance-and-recovery)
35. [Day 35: CI/CD, GitOps and DevSecOps](#day-35-cicd-gitops-and-devsecops)
36. [Day 36: SRE incidents, SLOs and observability](#day-36-sre-incidents-slos-and-observability)
37. [Day 37: Platform engineering and developer experience](#day-37-platform-engineering-and-developer-experience)
38. [Day 38: MLOps and AI platform production](#day-38-mlops-and-ai-platform-production)
39. [Day 39: Security, IAM and zero trust](#day-39-security-iam-and-zero-trust)
40. [Day 40: Databases, messaging and APIs](#day-40-databases-messaging-and-apis)
41. [Day 41: Multi-region resilience and disaster recovery](#day-41-multi-region-resilience-and-disaster-recovery)
42. [Day 42: Cost, capacity and performance](#day-42-cost-capacity-and-performance)
43. [Day 43: Staff-level system design trade-offs](#day-43-staff-level-system-design-trade-offs)
44. [Day 44: Cross-team technical leadership](#day-44-cross-team-technical-leadership)
45. [Day 45: Production troubleshooting under pressure](#day-45-production-troubleshooting-under-pressure)
46. [Day 46: Architecture review and risk decisions](#day-46-architecture-review-and-risk-decisions)
47. [Day 47: Behavioral ownership and stakeholder influence](#day-47-behavioral-ownership-and-stakeholder-influence)
48. [Day 48: Full senior mock interview I](#day-48-full-senior-mock-interview-i)
49. [Day 49: Full senior mock interview II](#day-49-full-senior-mock-interview-ii)
50. [Day 50: Final 25 LPA readiness assessment](#day-50-final-25-lpa-readiness-assessment)

## Topic-Wise Question Bank
<a id="cloud-platforms-gcp-services"></a>
### 1. Cloud Platforms & GCP Services (23)

1. Platform roadmap: What would your first 90 days look like as a senior platform engineer joining a product company? _(Day 6)_
2. DevOps lifecycle: Explain how you would design the full SDLC for a cloud-native service from code commit to production operations. _(Day 7)_
3. Error budgets: How would you explain error budgets to product managers and use them to make release decisions? _(Day 9)_
4. Backstage plugin: What Backstage plugins or templates would you prioritize for a GCP platform team? _(Day 10)_
5. Toil reduction: How would you identify operational toil in a platform team and turn it into automation backlog? _(Day 16)_
6. Platform API: If you expose self-service infrastructure through an API, what validations, approvals, and audit trails would you build? _(Day 17)_
7. Responsible AI: What checks would you add for bias, explainability, lineage, and responsible AI before approving a model for production? _(Day 19)_
8. Immutable infrastructure: What does immutable infrastructure mean in cloud platforms, and when is mutable infrastructure still acceptable? _(Day 29)_
9. Can you explain your current/last GCP project and your day-to-day activities? _(Day 31)_
10. How do you ensure that only legitimate users can access your environment? _(Day 35)_
11. Data structures and algorithms: How do you choose the right data structure for a production problem? _(Day 35)_
12. How do you identify whether a user/request is legitimate? _(Day 36)_
13. Data structures and algorithms scenario: How would you detect a cycle in a directed dependency graph? _(Day 36)_
14. If all networking components need to be centrally controlled from one Host Project, how would you design it? _(Day 37)_
15. Traffic works from on-premises to GCP but not from GCP to on-premises. What would you investigate? _(Day 38)_
16. How would on-premises users and applications privately access services running in GCP? _(Day 39)_
17. Which GCP networking components have you worked with? _(Day 43)_
18. When and where did you implement those networking components? _(Day 43)_
19. Explain the main GCP load-balancing components: forwarding rule, target proxy, URL map, backend service, health check, and NEG. _(Day 45)_
20. A backend is healthy directly but marked unhealthy by the load balancer. How would you troubleshoot it? _(Day 45)_
21. REST APIs and microservices: How would you define service boundaries and API contracts? _(Day 47)_
22. Dataproc troubleshooting: A Spark job is slow and repeatedly spills to disk. What would you examine? _(Day 48)_
23. Organization Policy scenario: A team needs a temporary exception to a constraint. How would you govern it? _(Day 49)_

<a id="gcp-networking"></a>
### 2. GCP Networking (60)

1. CoreDNS incident: Services in a cluster intermittently fail DNS resolution. How would you debug CoreDNS, kube-dns metrics, network policies, and upstream DNS? _(Day 1)_
2. Cloud Run security: How would you expose an internal Cloud Run service securely using IAM, ingress settings, VPC connector, load balancer, and service-to-service auth? _(Day 2)_
3. Disaster recovery testing: How would you design a DR test that proves backup, restore, DNS failover, application recovery, and stakeholder communication? _(Day 2)_
4. MTU issue: An application has intermittent failures over VPN or interconnect due to packet size. How would you identify and fix MTU problems? _(Day 3)_
5. Python automation: How would you build a Python tool that audits GCP projects for IAM risk, public buckets, unused firewall rules, missing labels, and cost anomalies? _(Day 4)_
6. Cloud DNS: A production service intermittently resolves to an old endpoint. How would you debug DNS TTLs, Cloud DNS records, caches, split-horizon DNS, and client behavior? _(Day 5)_
7. Landing zone: How would you design a GCP landing zone for a product company, including org hierarchy, folders, projects, Shared VPC, IAM, org policies, logging, and billing? _(Day 6)_
8. DNS migration: How would you migrate DNS zones with minimal risk, and how would you plan TTLs, validation, rollback, and monitoring? _(Day 7)_
9. Regional failover drill: How would you plan and run a failover game day for a GKE service with Cloud SQL, Pub/Sub, load balancing, DNS, and observability? _(Day 7)_
10. GCP networking: How would you design GCP Shared VPC, service projects, firewall rules, private service access, DNS, and service networking for a multi-team platform? _(Day 8)_
11. Capacity planning math: What inputs would you use to forecast GKE capacity for CPU, memory, network, storage, and regional failover? _(Day 9)_
12. Network policies: A service should only receive traffic from one namespace and one ingress gateway. How would you implement and validate Kubernetes NetworkPolicies? _(Day 9)_
13. GKE multi-tenancy: How would you design namespace isolation, quotas, RBAC, network policies, admission controls, and observability for many teams in one cluster? _(Day 11)_
14. GKE image pull failures: Pods are failing with ImagePullBackOff after a registry migration. How would you debug Artifact Registry permissions, Workload Identity, image tags, network, and pull secrets? _(Day 11)_
15. GKE private cluster: A private GKE cluster cannot pull images or reach Google APIs. How would you debug private nodes, NAT, Private Google Access, DNS, routes, and firewall rules? _(Day 12)_
16. Firewall governance: How would you design firewall rule ownership, logging, review, and cleanup across many GCP projects? _(Day 12)_
17. VPC Service Controls: When would you use VPC Service Controls, what problems does it solve, and what operational pain can it introduce? _(Day 14)_
18. Hybrid connectivity: A service is slow over VPN or Interconnect. How would you troubleshoot latency, MTU, routes, BGP, firewall rules, and DNS? _(Day 15)_
19. CNI troubleshooting: Pods on different nodes cannot communicate. How would you debug CNI, routes, firewall rules, network policies, and node health? _(Day 16)_
20. Network segmentation: How would you segment environments and teams using VPCs, Shared VPC, firewall rules, folders, and projects? _(Day 17)_
21. Ingress controller: How would you debug an ingress path returning 404 or 502, from DNS to load balancer to ingress controller to service endpoints? _(Day 28)_
22. GCP Network Engineer introduction: Walk me through your experience designing and supporting enterprise-scale GCP networks. _(Day 31)_
23. Design a secure, highly available GCP network architecture for a large enterprise with development, test, and production environments. _(Day 31)_
24. How would you design a Shared VPC operating model across many application teams and projects? _(Day 32)_
25. CIDR planning: How would you allocate address space for Shared VPC, GKE Pods, Services, hybrid connectivity, and future growth? _(Day 32)_
26. How would you plan IP addressing and CIDR allocation for a multi-region, multi-environment GCP estate? _(Day 33)_
27. CIDR Planning overlap scenario: A newly acquired company's network overlaps your GCP VPC. How would you integrate it safely? _(Day 33)_
28. What is the difference between custom-mode and auto-mode VPC networks, and which would you use for an enterprise? _(Day 33)_
29. Network Endpoint Groups: Compare zonal, internet, serverless, and hybrid NEGs and give a use case for each. _(Day 34)_
30. Explain how routes are selected in a GCP VPC when static, subnet, peering, and dynamic routes exist. _(Day 34)_
31. Network Endpoint Groups troubleshooting: A GKE Pod is ready but absent or unhealthy in the load balancer NEG. What would you inspect? _(Day 34)_
32. How do regional and global dynamic routing modes affect Cloud Router route propagation? _(Day 35)_
33. When would you choose HA VPN, Dedicated Interconnect, or Partner Interconnect? _(Day 36)_
34. How would you design a GCP network architecture where you have full control over networking? _(Day 37)_
35. How do Cloud Router and BGP work with HA VPN or Cloud Interconnect? _(Day 37)_
36. A BGP session between an on-premises router and Cloud Router is down. How would you troubleshoot it? _(Day 37)_
37. Which GCP components would you use in a Shared VPC Host Project architecture? _(Day 38)_
38. How would you establish connectivity between an on-premises network and GCP? _(Day 39)_
39. How would you design Cloud NAT for private workloads across multiple regions? _(Day 39)_
40. A Cloud NAT gateway is dropping connections under load. How would you diagnose and fix it? _(Day 39)_
41. Would you use Partner Interconnect, Dedicated Interconnect, or VPN for on-prem-to-GCP connectivity? _(Day 40)_
42. What is Private Google Access, and how does it differ from Private Service Connect? _(Day 40)_
43. How would you establish on-prem-to-GCP connectivity using VPN? _(Day 41)_
44. How would you use Private Service Connect to expose a service privately to consumers in other projects or VPCs? _(Day 41)_
45. How would you use HA VPN, Cloud Router, and BGP for hybrid connectivity? _(Day 41)_
46. Compare Shared VPC, VPC Network Peering, Private Service Connect, and Network Connectivity Center. _(Day 41)_
47. How are routes exchanged between the on-premises network and GCP? _(Day 42)_
48. What problem does Network Connectivity Center solve, and how would you design its hub-and-spoke topology? _(Day 42)_
49. How would you design Cloud DNS for public, private, and hybrid name resolution? _(Day 43)_
50. An on-premises client cannot resolve a private GCP DNS name. How would you troubleshoot it? _(Day 43)_
51. Have you worked with VPCs, subnets, firewall rules, network tags, routes, and related networking components? _(Day 44)_
52. Where would you use TCP Proxy, SSL Proxy, passthrough Network Load Balancing, and HTTP(S) Load Balancing? _(Day 47)_
53. How does Cloud DNS map your application domain to the load balancer? _(Day 47)_
54. How would you implement layered network security for an internet-facing GCP application? _(Day 47)_
55. What is the difference between hierarchical firewall policies and VPC firewall rules? _(Day 48)_
56. Organization Policies: How do organization policies differ from IAM and firewall rules? _(Day 48)_
57. How would you migrate from network tags to service-account-based firewall targeting? _(Day 49)_
58. Hierarchical Firewall Policies: How are rules evaluated across organization, folder, and VPC levels? _(Day 50)_
59. What problem does VPC Service Controls solve, and what operational risks does it introduce? _(Day 50)_
60. Hierarchical firewall scenario: How would you prevent every project from exposing SSH or RDP to the internet? _(Day 50)_

<a id="kubernetes-containerization"></a>
### 3. Kubernetes & Containerization (69)

1. Stateful Kubernetes workloads: When would you avoid running stateful workloads on GKE, and if you must run them, how would you design storage, backup, upgrades, and recovery? _(Day 1)_
2. Helm rollback: A Helm upgrade failed and left resources in a partial state. How would you recover and prevent it next time? _(Day 2)_
3. Capacity incident: A regional capacity shortage affects node pool scaling. How would you mitigate and redesign for resilience? _(Day 3)_
4. Deployment rollback criteria: What metrics and business signals should automatically stop or roll back a deployment? _(Day 3)_
5. Observability: An alert says p95 latency increased from 200ms to 2s after a deployment. How would you investigate using Prometheus, Grafana, Cloud Logging, logs, and traces? _(Day 4)_
6. Vertex AI and MLOps: A team wants model serving on Kubernetes with FastAPI and GPU workloads. How would you design deployment, autoscaling, monitoring, and rollback? _(Day 4)_
7. A/B and canary for ML: How would you run A/B testing or canary deployment for an ML model while protecting users and measuring business impact? _(Day 4)_
8. GPU workloads: How would you schedule GPU workloads on GKE with taints, tolerations, node pools, quotas, cost controls, and observability? _(Day 6)_
9. GitOps: How would you implement GitOps with ArgoCD for Kubernetes workloads across dev, staging, and production while keeping rollbacks and approvals safe? _(Day 7)_
10. MLOps lifecycle: How would you design MLflow or Vertex AI model lifecycle management with approval, deployment, monitoring, drift detection, and rollback? _(Day 7)_
11. Cloud Run vs GKE: A company wants to standardize Cloud Run and GKE usage. How would you decide which workloads go to Cloud Run versus GKE? _(Day 7)_
12. Batch inference: How would you design batch inference on GCP using GKE, Cloud Run jobs, Vertex AI, or Composer, and what tradeoffs matter? _(Day 8)_
13. Autoscaling tradeoffs: Explain HPA, VPA, and cluster autoscaler. When can they conflict, and how would you tune them for a production workload? _(Day 8)_
14. GKE multi-cluster: When would you use multiple GKE clusters versus one shared cluster, and how would you handle traffic, identity, policy, and operations? _(Day 9)_
15. Capacity planning: How would you design capacity planning for GKE node pools supporting both web services and batch or ML workloads? _(Day 10)_
16. Leadership behavioral: How would you mentor junior engineers on Kubernetes troubleshooting and Terraform safety? _(Day 11)_
17. Infrastructure testing: How would you test Terraform modules, Kubernetes manifests, Helm charts, and policy-as-code before production? _(Day 12)_
18. Compute Engine migration: How would you migrate legacy Compute Engine workloads to GKE or Cloud Run, and what factors would make you keep them on VMs? _(Day 12)_
19. Container runtime security: What runtime security controls would you consider for Kubernetes workloads beyond image scanning? _(Day 12)_
20. Kubernetes probes: How would you design readiness, liveness, and startup probes for a slow-starting service to avoid cascading failures? _(Day 13)_
21. Kubernetes Secrets: How would you compare Kubernetes Secrets, Secret Manager, External Secrets Operator, Sealed Secrets, and CSI drivers? _(Day 13)_
22. Distributed tracing: A request crosses API gateway, Cloud Run, GKE, Pub/Sub, and Cloud SQL. How would you make tracing useful end to end? _(Day 14)_
23. Cloud Build: How would you design Cloud Build pipelines for Docker builds, vulnerability scanning, provenance, tests, and deployment promotion? _(Day 14)_
24. SRE fundamentals: Design an SLO for a customer-facing API running on GKE. What SLIs would you choose, how would you calculate error budget, and how would it affect releases? _(Day 15)_
25. GKE expert: You are asked to design a production GKE platform for multiple product teams. How would you structure clusters, node pools, namespaces, IAM, networking, and deployment ownership? _(Day 15)_
26. Champion-challenger: How would you implement a champion-challenger model deployment pattern in production? _(Day 16)_
27. Helm: How would you structure Helm charts and values for repeatable deployments across environments without creating configuration drift? _(Day 17)_
28. TLS rotation: How would you rotate TLS certificates for production ingress without downtime? _(Day 18)_
29. Communication: Explain a complex GKE outage to a non-technical product leader in two minutes. _(Day 18)_
30. StatefulSet vs Deployment: When would you use StatefulSet, Deployment, Job, CronJob, or DaemonSet in real Kubernetes platforms? _(Day 19)_
31. Commitment planning: How would you decide whether to buy committed use discounts or reservations for GKE/Compute workloads? _(Day 19)_
32. Incident leadership: You are the incident commander for a GKE outage. How would you manage technical debugging, stakeholder communication, timeline, mitigation, and postmortem? _(Day 20)_
33. Kubernetes control plane: Explain what happens from kubectl apply to a running pod, including API server, scheduler, kubelet, CNI, and controllers. _(Day 20)_
34. Terraform expert: How would you design reusable Terraform modules for GCP networking, IAM, GKE, Cloud Run, observability, and security so teams can consume them safely? _(Day 20)_
35. Pod affinity: When would you use node selectors, affinity, anti-affinity, topology spread constraints, taints, and tolerations? _(Day 21)_
36. Resource quotas: How would you design ResourceQuotas and LimitRanges for a shared cluster without blocking legitimate scaling? _(Day 21)_
37. PDB design: How would you use PodDisruptionBudgets during node upgrades, cluster autoscaling, and planned maintenance? _(Day 22)_
38. Kubernetes certificate issue: A cluster has certificate or webhook TLS failures. How would you debug certificate chain, rotation, admission webhooks, and API server errors? _(Day 22)_
39. Container startup: A container works locally but fails in Kubernetes. How would you debug entrypoint, env vars, filesystem, permissions, and security context? _(Day 22)_
40. Blue-green deployment: When would you choose blue-green over canary, and what GCP/GKE components would you use? _(Day 23)_
41. Configuration drift: How would you detect and prevent configuration drift across applications, clusters, and cloud infrastructure? _(Day 23)_
42. Go services: If asked to build a Kubernetes controller or CLI in Go, how would you approach the design even if Go is not your primary language? _(Day 24)_
43. GKE scheduling: A deployment is pending because pods cannot be scheduled. How would you debug requests, limits, node capacity, taints, affinities, quotas, and cluster autoscaler? _(Day 24)_
44. Cloud security: How would you secure workload access to GCP services from GKE using Workload Identity, IAM, Secret Manager, and least privilege? _(Day 24)_
45. Runbooks: How would you build a runbook library for common GKE, Terraform, IAM, and networking incidents, and how would you keep it updated? _(Day 25)_
46. GKE troubleshooting: A critical service on GKE has intermittent 5xx errors during traffic spikes. Walk me through your debugging approach from load balancer to pod-level metrics. _(Day 25)_
47. Reliability review: What would you check before certifying a service as production-ready on GCP/GKE? _(Day 26)_
48. RBAC: How would you design Kubernetes RBAC for platform, application, security, and CI/CD teams in a shared GKE environment? _(Day 26)_
49. Supply chain security: How would you implement image scanning, provenance, Binary Authorization, SBOMs, and deployment policies for containers? _(Day 27)_
50. Admission controls: How would you enforce Kubernetes security standards using Gatekeeper, Kyverno, or admission controls without blocking developer velocity? _(Day 27)_
51. Gateway/API strategy: How would you choose between Ingress, Gateway API, service mesh, load balancers, and Apigee for different traffic management requirements? _(Day 27)_
52. Release rollback: A canary deployment passes technical metrics but business metrics drop. How would you decide rollback versus continue? _(Day 29)_
53. Cloud SQL/AlloyDB: How would you troubleshoot a private GKE workload that cannot connect to Cloud SQL or AlloyDB? _(Day 29)_
54. CrashLoopBackOff: A pod is stuck in CrashLoopBackOff in production. Give me your exact Kubernetes troubleshooting workflow and the commands or signals you would check. _(Day 29)_
55. GKE upgrades: A GKE cluster upgrade caused service disruption. How would you design a safer upgrade strategy for control plane, node pools, PDBs, and workloads? _(Day 30)_
56. RCA: Walk me through how you would write a strong RCA for a repeated Kubernetes outage and turn it into preventive engineering work. _(Day 30)_
57. GKE node pressure: Nodes show memory pressure and pods are being evicted. How would you investigate requests, limits, QoS classes, daemonsets, autoscaling, and app behavior? _(Day 30)_
58. Chaos testing: How would you introduce chaos engineering safely for GKE workloads and what failure modes would you test first? _(Day 30)_
59. Wiz scenario: Wiz reports a publicly reachable GKE workload with a vulnerable image and broad IAM. How would you respond? _(Day 37)_
60. Dynatrace: How would you monitor a GKE-hosted application end to end with Dynatrace? _(Day 38)_
61. Spring Boot production design: How would you prepare a Spring Boot API for deployment on Kubernetes? _(Day 42)_
62. Resource rightsizing: How would you right-size GCE and GKE workloads without risking availability? _(Day 43)_
63. Resource rightsizing scenario: A cost initiative proposes reducing every Kubernetes request by 50 percent. How would you respond? _(Day 44)_
64. Google Kubernetes Engine architecture: Explain the GKE control plane, nodes, Pods, networking, and responsibility boundaries. _(Day 46)_
65. Google Kubernetes Engine upgrade scenario: How would you upgrade a production regional cluster safely? _(Day 46)_
66. How does traffic flow from the Global Load Balancer to GKE? _(Day 48)_
67. How does traffic reach the application pods running inside GKE? _(Day 49)_
68. How do pods/microservices communicate with each other inside GKE? _(Day 50)_
69. FastAPI, Spring Boot and Node.js deployment: What common Kubernetes controls should every service implement? _(Day 50)_

<a id="infrastructure-as-code-iac"></a>
### 4. Infrastructure as Code (IaC) (20)

1. Terraform secrets: How would you prevent secrets from leaking into Terraform state, plans, logs, and CI/CD output? _(Day 1)_
2. ArgoCD drift: A team says ArgoCD shows drift between Git and the cluster. How would you investigate and safely reconcile it? _(Day 5)_
3. Backstage and IDP: How would you design a Backstage-style golden path for creating a new service on GCP with CI/CD, Terraform, monitoring, and security? _(Day 6)_
4. Model monitoring: How would you monitor model serving for latency, error rate, drift, data quality, and business impact? _(Day 8)_
5. Terraform Enterprise: Explain how you would implement Terraform Enterprise workspaces, remote state, policy as code, approvals, and module versioning for a large GCP platform. _(Day 8)_
6. Terraform provider upgrades: How would you safely upgrade Terraform and Google provider versions across many workspaces? _(Day 10)_
7. Organization policy: Which GCP org policies would you enforce for a secure baseline, and how would you handle exceptions? _(Day 11)_
8. SDK automation: Compare using Terraform, gcloud, REST APIs, and Python SDKs for platform automation. When would you choose each? _(Day 13)_
9. OpenTofu: If a company asks about Terraform versus OpenTofu, how would you explain the tradeoffs for enterprise platform teams? _(Day 15)_
10. Drift monitoring: In production, how would you detect data drift, concept drift, and schema drift, and how would each one trigger different actions? _(Day 19)_
11. Terraform state: A Terraform apply failed halfway and now remote state does not match real GCP resources. How would you recover safely in an enterprise environment? _(Day 21)_
12. Policy as code: How would you use Sentinel, OPA, or policy validation to stop risky GCP changes before apply while keeping developer experience smooth? _(Day 22)_
13. Terraform monorepo vs multi-repo: How would you decide repository structure for Terraform modules, environments, and app teams? _(Day 23)_
14. Terraform import: A team created resources manually and wants them managed by Terraform. How would you plan imports and reduce risk? _(Day 24)_
15. Drift detection: How would you detect and reconcile drift between Terraform state, real GCP resources, and manual console changes? _(Day 25)_
16. Terraform drift management: How would you detect and remediate drift across many GCP workspaces? _(Day 35)_
17. Terraform Drift Management incident: A console change fixed production but now Terraform wants to reverse it. What should happen next? _(Day 36)_
18. Data drift monitoring: What is data drift, and how would you monitor it for a production model? _(Day 40)_
19. Data Drift Monitoring scenario: A drift alert fires but business KPIs and model accuracy remain stable. What would you do? _(Day 41)_
20. Multi-cloud architecture operations: How would you prevent configuration and security drift across providers? _(Day 46)_

<a id="cicd-gitops"></a>
### 5. CI/CD & GitOps (18)

1. Pipeline orchestration: Compare Airflow, Dagster, Kubeflow, and Vertex AI Pipelines for ML/platform use cases. How would you choose? _(Day 3)_
2. Secrets in CI/CD: How would you prevent secrets leakage in Jenkins, GitHub Actions, GitLab CI, and Cloud Build? _(Day 4)_
3. Reproducible training: How would you make an ML training pipeline reproducible across code version, data version, features, environment, and model artifact? _(Day 5)_
4. BigQuery/data reliability: How would you approach BigQuery or data pipeline reliability when platform teams own infrastructure but data teams own pipelines? _(Day 10)_
5. Cloud Composer/Dataflow: A scheduled data pipeline misses its SLA and downstream dashboards are stale. How would you debug Composer, Dataflow, BigQuery, retries, backfills, and alerting? _(Day 11)_
6. Migration: How would you migrate an on-prem application to GCP with minimal downtime? Cover networking, data, CI/CD, observability, security, and rollback. _(Day 13)_
7. GitHub Actions security: How would you secure GitHub Actions for cloud deployments using OIDC, environments, approvals, least privilege, and secret handling? _(Day 15)_
8. Jenkins modernization: A company has old Jenkins pipelines. How would you modernize without disrupting releases? _(Day 16)_
9. Golden path adoption: Teams avoid your golden path and create their own pipelines. How would you understand why and improve adoption? _(Day 17)_
10. Model rollback: A newly deployed model has lower latency but worse business outcomes. How would you detect this and roll back safely? _(Day 18)_
11. Metadata management: What metadata would you capture for every ML run to support audit, rollback, debugging, and compliance? _(Day 19)_
12. Feature store: What production risks does a feature store solve, and how would you design feature freshness, parity, governance, and rollback? _(Day 26)_
13. Pipeline caching: When can ML pipeline caching help, and when can it hide stale data or bad assumptions? _(Day 27)_
14. Progressive delivery: How would you implement canary or blue-green releases using Cloud Deploy, Argo Rollouts, metrics, and automatic rollback? _(Day 27)_
15. CI/CD design: Design a safe promotion workflow from commit to production using GitHub Actions, Cloud Build, Jenkins, artifact promotion, approvals, and rollback. _(Day 28)_
16. Release readiness: A production release passed CI but caused customer impact. How would you design production readiness checks and release gates to prevent this? _(Day 29)_
17. SAST and DAST pipeline design: Where should each test run, and what should block a release? _(Day 32)_
18. Jira automation: How would you integrate CI/CD deployments and production incidents with Jira? _(Day 44)_

<a id="mlops-ai-platforms"></a>
### 6. MLOps & AI Platforms (9)

1. ML monitoring tools: How would you combine Vertex AI Model Monitoring, Prometheus, Grafana, MLflow, and Evidently-style checks in one production monitoring design? _(Day 3)_
2. Error budget policy: How would you create an error budget policy that balances feature velocity and reliability? _(Day 6)_
3. MLOps fundamentals: Explain the end-to-end ML lifecycle and where DevOps responsibilities become different from traditional application delivery. _(Day 9)_
4. LLM app operations: How would you operate an LLM-backed service in production, including latency, cost, prompt changes, safety, and observability? _(Day 18)_
5. Model registry: How would you design model versioning, approval workflow, rollback, lineage, and auditability using MLflow Registry or Vertex AI Model Registry? _(Day 20)_
6. Inference optimization: How would you improve model latency and throughput using batching, autoscaling, model format optimization, GPU use, or caching? _(Day 21)_
7. Batch vs real-time inference: How would you choose between batch inference, real-time inference, asynchronous inference, and streaming inference for different business use cases? _(Day 28)_
8. Vertex AI Workbench: How would you design a secure managed notebook environment for a data-science team? _(Day 31)_
9. Vertex AI Workbench troubleshooting: A notebook cannot access BigQuery or Cloud Storage. What would you check? _(Day 32)_

<a id="devsecops-cloud-security"></a>
### 7. DevSecOps & Cloud Security (25)

1. IAM recommender: How would you use IAM Recommender and audit logs to reduce over-permissioned service accounts safely? _(Day 2)_
2. SLSA/provenance: How would you explain SLSA, provenance, and signed artifacts to a team building a secure delivery platform? _(Day 3)_
3. Vulnerability management: How would you run vulnerability management for containers, VMs, dependencies, and base images? _(Day 5)_
4. Prioritization: You have security backlog, cost pressure, and reliability incidents. How would you prioritize work for the next quarter? _(Day 6)_
5. Stakeholder tradeoff: Product wants faster releases, security wants stricter gates, and SRE wants fewer incidents. How would you align them? _(Day 8)_
6. IAM troubleshooting: A workload gets permission denied only in production. How would you debug IAM policy, service accounts, Workload Identity, org policy, and audit logs? _(Day 14)_
7. Cloud Storage security: How would you design Cloud Storage bucket security for logs, artifacts, and data exports, including IAM, retention, lifecycle, CMEK, and public access prevention? _(Day 16)_
8. Cloud Armor: Design a Cloud Armor and load balancing strategy for an internet-facing service. How would you handle WAF rules, rate limits, exceptions, and observability? _(Day 17)_
9. Platform maturity: How would you evaluate whether a platform is mature enough for product-company scale across reliability, security, cost, developer experience, and automation? _(Day 20)_
10. Compute Engine operations: A Linux VM behind a load balancer has high CPU, many TIME_WAIT connections, and intermittent TLS errors. How would you debug it? _(Day 25)_
11. Load balancing: Design a global external HTTPS load balancing strategy for multiple services. How would you handle SSL, backend health checks, Cloud Armor, CDN, and observability? _(Day 25)_
12. Artifact Registry: How would you design Artifact Registry repositories, IAM, cleanup policies, scanning, and promotion between environments? _(Day 26)_
13. Security Command Center: How would you operationalize Security Command Center findings into triage, ownership, SLAs, and remediation workflows? _(Day 27)_
14. Secrets migration: How would you migrate applications from mounted JSON service account keys to Workload Identity and Secret Manager? _(Day 28)_
15. SCC operations: How would you operationalize Security Command Center findings into ticketing, prioritization, remediation, and reporting? _(Day 28)_
16. Secrets rotation: How would you rotate secrets or keys for production services without downtime? _(Day 29)_
17. WAF, OWASP, SAST and DAST: How do these controls work together in a DevSecOps program? _(Day 31)_
18. WAF and OWASP scenario: A new managed WAF rule blocks legitimate checkout requests. How would you respond? _(Day 32)_
19. Where do you implement those security restrictions? _(Day 35)_
20. Wiz: How would you integrate Wiz into a GCP security operating model without creating noisy, ownerless findings? _(Day 36)_
21. Okta: How would you integrate Okta with a cloud application using OIDC? _(Day 39)_
22. Google Cloud Platform fundamentals: How do projects, folders, organizations, billing accounts, and IAM policies relate? _(Day 44)_
23. REST APIs and microservices security: How would you implement authentication and authorization? _(Day 48)_
24. Where does Cloud Armor fit into your application traffic flow? _(Day 49)_
25. How does Cloud Armor protect an application, and how would you roll out a new WAF rule safely? _(Day 49)_

<a id="monitoring-logging-observability"></a>
### 8. Monitoring, Logging & Observability (22)

1. Prometheus scale: Prometheus is overloaded with high cardinality metrics. How would you debug and fix it? _(Day 1)_
2. SLO burn rate: Explain multi-window multi-burn-rate alerting and how you would tune alerts for fast and slow burns. _(Day 2)_
3. Alert ownership: How would you ensure every alert has an owner, runbook, SLO relationship, and actionable threshold? _(Day 2)_
4. ELK/OpenSearch: When would you use ELK or OpenSearch in addition to Cloud Logging, and how would you manage index cost and retention? _(Day 10)_
5. Logging cost: Cloud Logging cost is growing quickly. How would you reduce cost while preserving incident debugging value? _(Day 13)_
6. GPU cost control: GPU workloads are underutilized and expensive. How would you improve scheduling, quotas, sharing, and monitoring? _(Day 14)_
7. Observability maturity: How would you assess whether an organization has mature observability or just many dashboards? _(Day 15)_
8. Observability platform: How would you design observability for a platform team so developers get useful golden signals without creating noisy alerts? _(Day 16)_
9. Multi-region design: You have a multi-region reliability requirement on GCP. How would you design traffic routing, data stores, failover, monitoring, and incident response? _(Day 19)_
10. Alert fatigue: You inherit 500 alerts and noisy on-call. How would you rationalize alerts using SLOs and ownership? _(Day 22)_
11. Cloud Storage lifecycle: How would you design lifecycle, retention, versioning, object holds, CMEK, and audit logging for compliance-sensitive storage? _(Day 23)_
12. Trace sampling: How would you choose tracing sampling rates and make traces useful for debugging high-volume services? _(Day 23)_
13. Log correlation: How would you design correlation IDs and structured logging across microservices and async Pub/Sub workflows? _(Day 24)_
14. Dashboard design: What dashboards would you build for executives, SREs, platform engineers, and application teams? _(Day 24)_
15. OpenTelemetry: How would you roll out OpenTelemetry across services and connect traces, metrics, logs, dashboards, and alerts? _(Day 25)_
16. Cloud Monitoring: How would you design alerting policies in Google Cloud Monitoring to reduce alert fatigue and focus on user impact? _(Day 26)_
17. Service mesh: When would you introduce Istio or Anthos Service Mesh, and what are the operational risks around mTLS, traffic splitting, retries, and observability? _(Day 26)_
18. ELK, OpenTelemetry and Jaeger: How would you combine them for production observability? _(Day 37)_
19. ELK and OpenTelemetry incident: Logs are present but cannot be correlated with Jaeger traces. What would you fix? _(Day 38)_
20. Dynatrace troubleshooting: Latency increased after a release. How would you isolate the bottleneck? _(Day 38)_
21. OpenTelemetry and Jaeger scaling: How would you control telemetry volume and cost without losing critical traces? _(Day 38)_
22. FastAPI, Spring Boot and Node.js observability: How would you standardize telemetry across all three? _(Day 50)_

<a id="programming-scripting"></a>
### 9. Programming & Scripting (3)

1. Bash vs Python: When is Bash acceptable for automation, and when should you rewrite it in Python or Go? _(Day 30)_
2. Go optional: Where would Go be useful in a platform engineering environment, and how would you decide between Go, Python, and Bash for automation? _(Day 30)_
3. Data structures and algorithms coding question: Given a stream of events, how would you return the top K most frequent keys? _(Day 36)_

<a id="databases-data-services"></a>
### 10. Databases & Data Services (12)

1. Cloud SQL backup restore: A Cloud SQL instance has accidental data deletion. How would you validate backups, point-in-time recovery, restore testing, application cutover, and communication? _(Day 1)_
2. BigQuery cost and performance: A BigQuery workload became slow and expensive. How would you investigate query patterns, partitioning, clustering, slots, storage, and ownership? _(Day 1)_
3. AlloyDB design: When would you choose AlloyDB over Cloud SQL, and what operational considerations would you discuss for HA, backups, scaling, and cost? _(Day 13)_
4. Cloud SQL performance: A Cloud SQL database has high CPU and lock contention. How would you debug queries, connections, pooling, indexes, replicas, and app rollout impact? _(Day 22)_
5. MongoDB and Redis: When would you use each technology in the same application architecture? _(Day 33)_
6. MongoDB and Redis failure scenario: Redis is unavailable but MongoDB remains healthy. How should the application behave? _(Day 34)_
7. MongoDB and Redis performance: How would you diagnose rising API latency involving both data stores? _(Day 34)_
8. PostgreSQL and MySQL: What factors would drive your choice for a new transactional service? _(Day 39)_
9. PostgreSQL and MySQL migration: How would you migrate with minimal downtime? _(Day 40)_
10. PostgreSQL and MySQL troubleshooting: A database-backed API slows down under peak load. What would you inspect? _(Day 40)_
11. Spring Boot troubleshooting: A service has high latency and exhausted database connections. How would you investigate it? _(Day 42)_
12. Dataproc: When would you use Dataproc instead of BigQuery or Dataflow? _(Day 47)_

<a id="messaging-streaming"></a>
### 11. Messaging & Streaming (6)

1. Pub/Sub reliability: A Pub/Sub consumer service is falling behind and message age is increasing. How would you debug backlog, scaling, ordering, retries, and dead-letter handling? _(Day 9)_
2. Pub/Sub incident: A downstream service outage caused Pub/Sub backlog. How would you recover safely without overloading dependencies or losing messages? _(Day 10)_
3. Pub/Sub exactly-once: A team expects exactly-once processing from Pub/Sub. How would you explain reality and design idempotency, ordering keys, retries, and DLQs? _(Day 21)_
4. Event-driven architecture: What are the benefits and trade-offs compared with synchronous request/response? _(Day 41)_
5. Event-driven architecture design: How would you guarantee reliable processing without claiming exactly-once delivery? _(Day 42)_
6. Event-driven architecture incident: A poison event causes a retry storm. How would you contain and prevent it? _(Day 42)_

<a id="source-control-artifact-management"></a>
### 12. Source Control & Artifact Management (1)

1. Branching strategy: What Git branching and release strategy would you recommend for platform modules and application services? _(Day 4)_

<a id="backup-disaster-recovery"></a>
### 13. Backup & Disaster Recovery (3)

1. DR/backup: How would you define RTO and RPO for a critical service on GCP, and how would you test backup, restore, and regional failover? _(Day 5)_
2. FinOps showback: How would you implement cost allocation, labels, budgets, showback, and team accountability across GCP projects? _(Day 17)_
3. FinOps: A monthly GCP bill increased by 40 percent after a platform migration. How would you investigate and reduce cost without harming reliability? _(Day 18)_

<a id="itsm-enterprise-tools"></a>
### 14. ITSM & Enterprise Tools (2)

1. Jira workflow design: How would you model incident, problem, change, and engineering work without turning Jira into bureaucracy? _(Day 43)_
2. Jira reporting: Which metrics are useful for platform and SRE teams, and which can be misleading? _(Day 44)_

<a id="platform-engineering-sre"></a>
### 15. Platform Engineering & SRE (10)

1. On-call maturity: How would you improve an on-call rotation that has too many alerts, poor runbooks, and slow escalation? _(Day 11)_
2. ML feature store: What reliability and governance concerns would you consider for an ML feature store? _(Day 12)_
3. Incident postmortem quality: What makes a postmortem high quality, and how do you ensure action items actually get completed? _(Day 14)_
4. Incident behavioral: Tell me about a time you disagreed with developers during a production incident. How did you handle it? _(Day 18)_
5. SRE toil: Give examples of toil in DevOps/SRE work and explain how you would measure and reduce it with automation. _(Day 20)_
6. Cloud Run incident: A Cloud Run service has cold-start latency and failed requests after a traffic spike. How would you debug concurrency, min instances, CPU allocation, revisions, and downstream limits? _(Day 21)_
7. Platform engineering: What self-service golden paths would you build for product teams, and what guardrails would you enforce without slowing delivery? _(Day 23)_
8. Developer experience: How would you measure whether your platform improves developer experience and delivery speed? _(Day 28)_
9. Okta incident: Users can authenticate but receive authorization errors after a group change. How would you troubleshoot it? _(Day 40)_
10. REST APIs and microservices reliability: Which resilience patterns would you implement? _(Day 48)_

<a id="hybrid-multi-cloud"></a>
### 16. Hybrid & Multi-Cloud (3)

1. Design highly available hybrid connectivity between two on-premises data centers and GCP. _(Day 35)_
2. Multi-cloud architecture: When is using multiple cloud providers justified? _(Day 45)_
3. Multi-cloud architecture design: How would you connect GCP and AWS or Azure securely? _(Day 46)_

<a id="application-api-technologies"></a>
### 17. Application & API Technologies (14)

1. REST API automation: How would you design a REST API that allows teams to request infrastructure safely? _(Day 5)_
2. Can you explain the complete architecture and flow of your application? _(Day 31)_
3. What kind of application are you supporting, and where is it hosted? _(Day 32)_
4. Is your application internet-facing or internal-facing? _(Day 33)_
5. Is it a web application or an API-based application? _(Day 33)_
6. How do consumers/users access your application? _(Day 34)_
7. How do you choose between a global external Application Load Balancer, regional external load balancer, and internal load balancer? _(Day 44)_
8. Have you designed or architected a complete end-to-end application hosting solution? _(Day 45)_
9. Google Cloud Platform scenario: How would you structure projects for a regulated multi-environment application? _(Day 45)_
10. What type of application did you host? _(Day 45)_
11. Which GCP services did you use to host the application end to end? _(Day 46)_
12. How would you design active-active application delivery across two GCP regions? _(Day 46)_
13. How is your application exposed to the internet? _(Day 47)_
14. FastAPI, Spring Boot and Node.js: How would you choose a framework for a new API service? _(Day 49)_

## 50-Day Schedule

<a id="day-1-mock-interview-practice"></a>
### Day 1 Mock Interview Practice

1. **Terraform/IaC** — Stateful Kubernetes workloads: When would you avoid running stateful workloads on GKE, and if you must run them, how would you design storage, backup, upgrades, and recovery?
2. **GCP Services** — Cloud SQL backup restore: A Cloud SQL instance has accidental data deletion. How would you validate backups, point-in-time recovery, restore testing, application cutover, and communication?
3. **SRE/Reliability** — BigQuery cost and performance: A BigQuery workload became slow and expensive. How would you investigate query patterns, partitioning, clustering, slots, storage, and ownership?
4. **Observability** — Prometheus scale: Prometheus is overloaded with high cardinality metrics. How would you debug and fix it?
5. **Security/DevSecOps** — Terraform secrets: How would you prevent secrets from leaking into Terraform state, plans, logs, and CI/CD output?
6. **Networking** — CoreDNS incident: Services in a cluster intermittently fail DNS resolution. How would you debug CoreDNS, kube-dns metrics, network policies, and upstream DNS?

<a id="day-2-mock-interview-practice"></a>
### Day 2 Mock Interview Practice

1. **GCP Services** — Cloud Run security: How would you expose an internal Cloud Run service securely using IAM, ingress settings, VPC connector, load balancer, and service-to-service auth?
2. **SRE/Reliability** — SLO burn rate: Explain multi-window multi-burn-rate alerting and how you would tune alerts for fast and slow burns.
3. **Observability** — Alert ownership: How would you ensure every alert has an owner, runbook, SLO relationship, and actionable threshold?
4. **Security/DevSecOps** — IAM recommender: How would you use IAM Recommender and audit logs to reduce over-permissioned service accounts safely?
5. **Networking** — Disaster recovery testing: How would you design a DR test that proves backup, restore, DNS failover, application recovery, and stakeholder communication?
6. **CI/CD/GitOps** — Helm rollback: A Helm upgrade failed and left resources in a partial state. How would you recover and prevent it next time?

<a id="day-3-mock-interview-practice"></a>
### Day 3 Mock Interview Practice

1. **SRE/Reliability** — Capacity incident: A regional capacity shortage affects node pool scaling. How would you mitigate and redesign for resilience?
2. **Observability** — ML monitoring tools: How would you combine Vertex AI Model Monitoring, Prometheus, Grafana, MLflow, and Evidently-style checks in one production monitoring design?
3. **Security/DevSecOps** — SLSA/provenance: How would you explain SLSA, provenance, and signed artifacts to a team building a secure delivery platform?
4. **Networking** — MTU issue: An application has intermittent failures over VPN or interconnect due to packet size. How would you identify and fix MTU problems?
5. **CI/CD/GitOps** — Deployment rollback criteria: What metrics and business signals should automatically stop or roll back a deployment?
6. **Automation/Platform** — Pipeline orchestration: Compare Airflow, Dagster, Kubeflow, and Vertex AI Pipelines for ML/platform use cases. How would you choose?

<a id="day-4-mock-interview-practice"></a>
### Day 4 Mock Interview Practice

1. **Observability** — Observability: An alert says p95 latency increased from 200ms to 2s after a deployment. How would you investigate using Prometheus, Grafana, Cloud Logging, logs, and traces?
2. **Security/DevSecOps** — Secrets in CI/CD: How would you prevent secrets leakage in Jenkins, GitHub Actions, GitLab CI, and Cloud Build?
3. **Networking** — Python automation: How would you build a Python tool that audits GCP projects for IAM risk, public buckets, unused firewall rules, missing labels, and cost anomalies?
4. **CI/CD/GitOps** — Vertex AI and MLOps: A team wants model serving on Kubernetes with FastAPI and GPU workloads. How would you design deployment, autoscaling, monitoring, and rollback?
5. **Automation/Platform** — Branching strategy: What Git branching and release strategy would you recommend for platform modules and application services?
6. **MLOps/AI Infra** — A/B and canary for ML: How would you run A/B testing or canary deployment for an ML model while protecting users and measuring business impact?

<a id="day-5-mock-interview-practice"></a>
### Day 5 Mock Interview Practice

1. **Security/DevSecOps** — Vulnerability management: How would you run vulnerability management for containers, VMs, dependencies, and base images?
2. **Networking** — Cloud DNS: A production service intermittently resolves to an old endpoint. How would you debug DNS TTLs, Cloud DNS records, caches, split-horizon DNS, and client behavior?
3. **CI/CD/GitOps** — ArgoCD drift: A team says ArgoCD shows drift between Git and the cluster. How would you investigate and safely reconcile it?
4. **Automation/Platform** — REST API automation: How would you design a REST API that allows teams to request infrastructure safely?
5. **MLOps/AI Infra** — Reproducible training: How would you make an ML training pipeline reproducible across code version, data version, features, environment, and model artifact?
6. **FinOps/DR/Data** — DR/backup: How would you define RTO and RPO for a critical service on GCP, and how would you test backup, restore, and regional failover?

<a id="day-6-mock-interview-practice"></a>
### Day 6 Mock Interview Practice

1. **Networking** — Landing zone: How would you design a GCP landing zone for a product company, including org hierarchy, folders, projects, Shared VPC, IAM, org policies, logging, and billing?
2. **CI/CD/GitOps** — Backstage and IDP: How would you design a Backstage-style golden path for creating a new service on GCP with CI/CD, Terraform, monitoring, and security?
3. **Automation/Platform** — Platform roadmap: What would your first 90 days look like as a senior platform engineer joining a product company?
4. **MLOps/AI Infra** — Error budget policy: How would you create an error budget policy that balances feature velocity and reliability?
5. **FinOps/DR/Data** — GPU workloads: How would you schedule GPU workloads on GKE with taints, tolerations, node pools, quotas, cost controls, and observability?
6. **Leadership/Behavioral** — Prioritization: You have security backlog, cost pressure, and reliability incidents. How would you prioritize work for the next quarter?

<a id="day-7-mock-interview-practice"></a>
### Day 7 Mock Interview Practice

1. **CI/CD/GitOps** — DNS migration: How would you migrate DNS zones with minimal risk, and how would you plan TTLs, validation, rollback, and monitoring?
2. **Automation/Platform** — GitOps: How would you implement GitOps with ArgoCD for Kubernetes workloads across dev, staging, and production while keeping rollbacks and approvals safe?
3. **MLOps/AI Infra** — MLOps lifecycle: How would you design MLflow or Vertex AI model lifecycle management with approval, deployment, monitoring, drift detection, and rollback?
4. **FinOps/DR/Data** — Regional failover drill: How would you plan and run a failover game day for a GKE service with Cloud SQL, Pub/Sub, load balancing, DNS, and observability?
5. **Leadership/Behavioral** — DevOps lifecycle: Explain how you would design the full SDLC for a cloud-native service from code commit to production operations.
6. **GKE/Kubernetes** — Cloud Run vs GKE: A company wants to standardize Cloud Run and GKE usage. How would you decide which workloads go to Cloud Run versus GKE?

<a id="day-8-mock-interview-practice"></a>
### Day 8 Mock Interview Practice

1. **Automation/Platform** — GCP networking: How would you design GCP Shared VPC, service projects, firewall rules, private service access, DNS, and service networking for a multi-team platform?
2. **MLOps/AI Infra** — Model monitoring: How would you monitor model serving for latency, error rate, drift, data quality, and business impact?
3. **FinOps/DR/Data** — Batch inference: How would you design batch inference on GCP using GKE, Cloud Run jobs, Vertex AI, or Composer, and what tradeoffs matter?
4. **Leadership/Behavioral** — Stakeholder tradeoff: Product wants faster releases, security wants stricter gates, and SRE wants fewer incidents. How would you align them?
5. **GKE/Kubernetes** — Autoscaling tradeoffs: Explain HPA, VPA, and cluster autoscaler. When can they conflict, and how would you tune them for a production workload?
6. **Terraform/IaC** — Terraform Enterprise: Explain how you would implement Terraform Enterprise workspaces, remote state, policy as code, approvals, and module versioning for a large GCP platform.

<a id="day-9-mock-interview-practice"></a>
### Day 9 Mock Interview Practice

1. **MLOps/AI Infra** — MLOps fundamentals: Explain the end-to-end ML lifecycle and where DevOps responsibilities become different from traditional application delivery.
2. **FinOps/DR/Data** — Capacity planning math: What inputs would you use to forecast GKE capacity for CPU, memory, network, storage, and regional failover?
3. **Leadership/Behavioral** — Error budgets: How would you explain error budgets to product managers and use them to make release decisions?
4. **GKE/Kubernetes** — Network policies: A service should only receive traffic from one namespace and one ingress gateway. How would you implement and validate Kubernetes NetworkPolicies?
5. **Terraform/IaC** — GKE multi-cluster: When would you use multiple GKE clusters versus one shared cluster, and how would you handle traffic, identity, policy, and operations?
6. **GCP Services** — Pub/Sub reliability: A Pub/Sub consumer service is falling behind and message age is increasing. How would you debug backlog, scaling, ordering, retries, and dead-letter handling?

<a id="day-10-mock-interview-practice"></a>
### Day 10 Mock Interview Practice

1. **FinOps/DR/Data** — ELK/OpenSearch: When would you use ELK or OpenSearch in addition to Cloud Logging, and how would you manage index cost and retention?
2. **Leadership/Behavioral** — Backstage plugin: What Backstage plugins or templates would you prioritize for a GCP platform team?
3. **GKE/Kubernetes** — Capacity planning: How would you design capacity planning for GKE node pools supporting both web services and batch or ML workloads?
4. **Terraform/IaC** — Terraform provider upgrades: How would you safely upgrade Terraform and Google provider versions across many workspaces?
5. **GCP Services** — BigQuery/data reliability: How would you approach BigQuery or data pipeline reliability when platform teams own infrastructure but data teams own pipelines?
6. **SRE/Reliability** — Pub/Sub incident: A downstream service outage caused Pub/Sub backlog. How would you recover safely without overloading dependencies or losing messages?

<a id="day-11-mock-interview-practice"></a>
### Day 11 Mock Interview Practice

1. **Leadership/Behavioral** — Leadership behavioral: How would you mentor junior engineers on Kubernetes troubleshooting and Terraform safety?
2. **GKE/Kubernetes** — GKE multi-tenancy: How would you design namespace isolation, quotas, RBAC, network policies, admission controls, and observability for many teams in one cluster?
3. **Terraform/IaC** — Organization policy: Which GCP org policies would you enforce for a secure baseline, and how would you handle exceptions?
4. **GCP Services** — GKE image pull failures: Pods are failing with ImagePullBackOff after a registry migration. How would you debug Artifact Registry permissions, Workload Identity, image tags, network, and pull secrets?
5. **SRE/Reliability** — On-call maturity: How would you improve an on-call rotation that has too many alerts, poor runbooks, and slow escalation?
6. **Observability** — Cloud Composer/Dataflow: A scheduled data pipeline misses its SLA and downstream dashboards are stale. How would you debug Composer, Dataflow, BigQuery, retries, backfills, and alerting?

<a id="day-12-mock-interview-practice"></a>
### Day 12 Mock Interview Practice

1. **GKE/Kubernetes** — GKE private cluster: A private GKE cluster cannot pull images or reach Google APIs. How would you debug private nodes, NAT, Private Google Access, DNS, routes, and firewall rules?
2. **Terraform/IaC** — Infrastructure testing: How would you test Terraform modules, Kubernetes manifests, Helm charts, and policy-as-code before production?
3. **GCP Services** — Compute Engine migration: How would you migrate legacy Compute Engine workloads to GKE or Cloud Run, and what factors would make you keep them on VMs?
4. **SRE/Reliability** — ML feature store: What reliability and governance concerns would you consider for an ML feature store?
5. **Observability** — Firewall governance: How would you design firewall rule ownership, logging, review, and cleanup across many GCP projects?
6. **Security/DevSecOps** — Container runtime security: What runtime security controls would you consider for Kubernetes workloads beyond image scanning?

<a id="day-13-mock-interview-practice"></a>
### Day 13 Mock Interview Practice

1. **Terraform/IaC** — SDK automation: Compare using Terraform, gcloud, REST APIs, and Python SDKs for platform automation. When would you choose each?
2. **GCP Services** — AlloyDB design: When would you choose AlloyDB over Cloud SQL, and what operational considerations would you discuss for HA, backups, scaling, and cost?
3. **SRE/Reliability** — Kubernetes probes: How would you design readiness, liveness, and startup probes for a slow-starting service to avoid cascading failures?
4. **Observability** — Logging cost: Cloud Logging cost is growing quickly. How would you reduce cost while preserving incident debugging value?
5. **Security/DevSecOps** — Kubernetes Secrets: How would you compare Kubernetes Secrets, Secret Manager, External Secrets Operator, Sealed Secrets, and CSI drivers?
6. **Networking** — Migration: How would you migrate an on-prem application to GCP with minimal downtime? Cover networking, data, CI/CD, observability, security, and rollback.

<a id="day-14-mock-interview-practice"></a>
### Day 14 Mock Interview Practice

1. **GCP Services** — Distributed tracing: A request crosses API gateway, Cloud Run, GKE, Pub/Sub, and Cloud SQL. How would you make tracing useful end to end?
2. **SRE/Reliability** — Incident postmortem quality: What makes a postmortem high quality, and how do you ensure action items actually get completed?
3. **Observability** — GPU cost control: GPU workloads are underutilized and expensive. How would you improve scheduling, quotas, sharing, and monitoring?
4. **Security/DevSecOps** — IAM troubleshooting: A workload gets permission denied only in production. How would you debug IAM policy, service accounts, Workload Identity, org policy, and audit logs?
5. **Networking** — VPC Service Controls: When would you use VPC Service Controls, what problems does it solve, and what operational pain can it introduce?
6. **CI/CD/GitOps** — Cloud Build: How would you design Cloud Build pipelines for Docker builds, vulnerability scanning, provenance, tests, and deployment promotion?

<a id="day-15-mock-interview-practice"></a>
### Day 15 Mock Interview Practice

1. **SRE/Reliability** — SRE fundamentals: Design an SLO for a customer-facing API running on GKE. What SLIs would you choose, how would you calculate error budget, and how would it affect releases?
2. **Observability** — Observability maturity: How would you assess whether an organization has mature observability or just many dashboards?
3. **Security/DevSecOps** — GKE expert: You are asked to design a production GKE platform for multiple product teams. How would you structure clusters, node pools, namespaces, IAM, networking, and deployment ownership?
4. **Networking** — Hybrid connectivity: A service is slow over VPN or Interconnect. How would you troubleshoot latency, MTU, routes, BGP, firewall rules, and DNS?
5. **CI/CD/GitOps** — GitHub Actions security: How would you secure GitHub Actions for cloud deployments using OIDC, environments, approvals, least privilege, and secret handling?
6. **Automation/Platform** — OpenTofu: If a company asks about Terraform versus OpenTofu, how would you explain the tradeoffs for enterprise platform teams?

<a id="day-16-mock-interview-practice"></a>
### Day 16 Mock Interview Practice

1. **Observability** — Observability platform: How would you design observability for a platform team so developers get useful golden signals without creating noisy alerts?
2. **Security/DevSecOps** — Cloud Storage security: How would you design Cloud Storage bucket security for logs, artifacts, and data exports, including IAM, retention, lifecycle, CMEK, and public access prevention?
3. **Networking** — CNI troubleshooting: Pods on different nodes cannot communicate. How would you debug CNI, routes, firewall rules, network policies, and node health?
4. **CI/CD/GitOps** — Jenkins modernization: A company has old Jenkins pipelines. How would you modernize without disrupting releases?
5. **Automation/Platform** — Toil reduction: How would you identify operational toil in a platform team and turn it into automation backlog?
6. **MLOps/AI Infra** — Champion-challenger: How would you implement a champion-challenger model deployment pattern in production?

<a id="day-17-mock-interview-practice"></a>
### Day 17 Mock Interview Practice

1. **Security/DevSecOps** — Cloud Armor: Design a Cloud Armor and load balancing strategy for an internet-facing service. How would you handle WAF rules, rate limits, exceptions, and observability?
2. **Networking** — Network segmentation: How would you segment environments and teams using VPCs, Shared VPC, firewall rules, folders, and projects?
3. **CI/CD/GitOps** — Golden path adoption: Teams avoid your golden path and create their own pipelines. How would you understand why and improve adoption?
4. **Automation/Platform** — Platform API: If you expose self-service infrastructure through an API, what validations, approvals, and audit trails would you build?
5. **MLOps/AI Infra** — Helm: How would you structure Helm charts and values for repeatable deployments across environments without creating configuration drift?
6. **FinOps/DR/Data** — FinOps showback: How would you implement cost allocation, labels, budgets, showback, and team accountability across GCP projects?

<a id="day-18-mock-interview-practice"></a>
### Day 18 Mock Interview Practice

1. **Networking** — TLS rotation: How would you rotate TLS certificates for production ingress without downtime?
2. **CI/CD/GitOps** — Model rollback: A newly deployed model has lower latency but worse business outcomes. How would you detect this and roll back safely?
3. **Automation/Platform** — Incident behavioral: Tell me about a time you disagreed with developers during a production incident. How did you handle it?
4. **MLOps/AI Infra** — LLM app operations: How would you operate an LLM-backed service in production, including latency, cost, prompt changes, safety, and observability?
5. **FinOps/DR/Data** — FinOps: A monthly GCP bill increased by 40 percent after a platform migration. How would you investigate and reduce cost without harming reliability?
6. **Leadership/Behavioral** — Communication: Explain a complex GKE outage to a non-technical product leader in two minutes.

<a id="day-19-mock-interview-practice"></a>
### Day 19 Mock Interview Practice

1. **CI/CD/GitOps** — Metadata management: What metadata would you capture for every ML run to support audit, rollback, debugging, and compliance?
2. **Automation/Platform** — StatefulSet vs Deployment: When would you use StatefulSet, Deployment, Job, CronJob, or DaemonSet in real Kubernetes platforms?
3. **MLOps/AI Infra** — Drift monitoring: In production, how would you detect data drift, concept drift, and schema drift, and how would each one trigger different actions?
4. **FinOps/DR/Data** — Multi-region design: You have a multi-region reliability requirement on GCP. How would you design traffic routing, data stores, failover, monitoring, and incident response?
5. **Leadership/Behavioral** — Responsible AI: What checks would you add for bias, explainability, lineage, and responsible AI before approving a model for production?
6. **GKE/Kubernetes** — Commitment planning: How would you decide whether to buy committed use discounts or reservations for GKE/Compute workloads?

<a id="day-20-mock-interview-practice"></a>
### Day 20 Mock Interview Practice

1. **Automation/Platform** — SRE toil: Give examples of toil in DevOps/SRE work and explain how you would measure and reduce it with automation.
2. **MLOps/AI Infra** — Model registry: How would you design model versioning, approval workflow, rollback, lineage, and auditability using MLflow Registry or Vertex AI Model Registry?
3. **FinOps/DR/Data** — Platform maturity: How would you evaluate whether a platform is mature enough for product-company scale across reliability, security, cost, developer experience, and automation?
4. **Leadership/Behavioral** — Incident leadership: You are the incident commander for a GKE outage. How would you manage technical debugging, stakeholder communication, timeline, mitigation, and postmortem?
5. **GKE/Kubernetes** — Kubernetes control plane: Explain what happens from kubectl apply to a running pod, including API server, scheduler, kubelet, CNI, and controllers.
6. **Terraform/IaC** — Terraform expert: How would you design reusable Terraform modules for GCP networking, IAM, GKE, Cloud Run, observability, and security so teams can consume them safely?

<a id="day-21-mock-interview-practice"></a>
### Day 21 Mock Interview Practice

1. **MLOps/AI Infra** — Inference optimization: How would you improve model latency and throughput using batching, autoscaling, model format optimization, GPU use, or caching?
2. **Leadership/Behavioral** — Pub/Sub exactly-once: A team expects exactly-once processing from Pub/Sub. How would you explain reality and design idempotency, ordering keys, retries, and DLQs?
3. **GKE/Kubernetes** — Pod affinity: When would you use node selectors, affinity, anti-affinity, topology spread constraints, taints, and tolerations?
4. **GKE/Kubernetes** — Resource quotas: How would you design ResourceQuotas and LimitRanges for a shared cluster without blocking legitimate scaling?
5. **Terraform/IaC** — Terraform state: A Terraform apply failed halfway and now remote state does not match real GCP resources. How would you recover safely in an enterprise environment?
6. **GCP Services** — Cloud Run incident: A Cloud Run service has cold-start latency and failed requests after a traffic spike. How would you debug concurrency, min instances, CPU allocation, revisions, and downstream limits?

<a id="day-22-mock-interview-practice"></a>
### Day 22 Mock Interview Practice

1. **GKE/Kubernetes** — PDB design: How would you use PodDisruptionBudgets during node upgrades, cluster autoscaling, and planned maintenance?
2. **GKE/Kubernetes** — Kubernetes certificate issue: A cluster has certificate or webhook TLS failures. How would you debug certificate chain, rotation, admission webhooks, and API server errors?
3. **GKE/Kubernetes** — Container startup: A container works locally but fails in Kubernetes. How would you debug entrypoint, env vars, filesystem, permissions, and security context?
4. **Terraform/IaC** — Policy as code: How would you use Sentinel, OPA, or policy validation to stop risky GCP changes before apply while keeping developer experience smooth?
5. **GCP Services** — Cloud SQL performance: A Cloud SQL database has high CPU and lock contention. How would you debug queries, connections, pooling, indexes, replicas, and app rollout impact?
6. **SRE/Reliability** — Alert fatigue: You inherit 500 alerts and noisy on-call. How would you rationalize alerts using SLOs and ownership?

<a id="day-23-mock-interview-practice"></a>
### Day 23 Mock Interview Practice

1. **GKE/Kubernetes** — Blue-green deployment: When would you choose blue-green over canary, and what GCP/GKE components would you use?
2. **GKE/Kubernetes** — Configuration drift: How would you detect and prevent configuration drift across applications, clusters, and cloud infrastructure?
3. **Terraform/IaC** — Terraform monorepo vs multi-repo: How would you decide repository structure for Terraform modules, environments, and app teams?
4. **GCP Services** — Cloud Storage lifecycle: How would you design lifecycle, retention, versioning, object holds, CMEK, and audit logging for compliance-sensitive storage?
5. **SRE/Reliability** — Platform engineering: What self-service golden paths would you build for product teams, and what guardrails would you enforce without slowing delivery?
6. **Observability** — Trace sampling: How would you choose tracing sampling rates and make traces useful for debugging high-volume services?

<a id="day-24-mock-interview-practice"></a>
### Day 24 Mock Interview Practice

1. **GKE/Kubernetes** — Go services: If asked to build a Kubernetes controller or CLI in Go, how would you approach the design even if Go is not your primary language?
2. **Terraform/IaC** — Terraform import: A team created resources manually and wants them managed by Terraform. How would you plan imports and reduce risk?
3. **GCP Services** — Log correlation: How would you design correlation IDs and structured logging across microservices and async Pub/Sub workflows?
4. **SRE/Reliability** — GKE scheduling: A deployment is pending because pods cannot be scheduled. How would you debug requests, limits, node capacity, taints, affinities, quotas, and cluster autoscaler?
5. **Observability** — Dashboard design: What dashboards would you build for executives, SREs, platform engineers, and application teams?
6. **Security/DevSecOps** — Cloud security: How would you secure workload access to GCP services from GKE using Workload Identity, IAM, Secret Manager, and least privilege?

<a id="day-25-mock-interview-practice"></a>
### Day 25 Mock Interview Practice

1. **Terraform/IaC** — Drift detection: How would you detect and reconcile drift between Terraform state, real GCP resources, and manual console changes?
2. **GCP Services** — Compute Engine operations: A Linux VM behind a load balancer has high CPU, many TIME_WAIT connections, and intermittent TLS errors. How would you debug it?
3. **SRE/Reliability** — Runbooks: How would you build a runbook library for common GKE, Terraform, IAM, and networking incidents, and how would you keep it updated?
4. **Observability** — OpenTelemetry: How would you roll out OpenTelemetry across services and connect traces, metrics, logs, dashboards, and alerts?
5. **Security/DevSecOps** — Load balancing: Design a global external HTTPS load balancing strategy for multiple services. How would you handle SSL, backend health checks, Cloud Armor, CDN, and observability?
6. **Networking** — GKE troubleshooting: A critical service on GKE has intermittent 5xx errors during traffic spikes. Walk me through your debugging approach from load balancer to pod-level metrics.

<a id="day-26-mock-interview-practice"></a>
### Day 26 Mock Interview Practice

1. **GCP Services** — Artifact Registry: How would you design Artifact Registry repositories, IAM, cleanup policies, scanning, and promotion between environments?
2. **SRE/Reliability** — Reliability review: What would you check before certifying a service as production-ready on GCP/GKE?
3. **Observability** — Cloud Monitoring: How would you design alerting policies in Google Cloud Monitoring to reduce alert fatigue and focus on user impact?
4. **Security/DevSecOps** — RBAC: How would you design Kubernetes RBAC for platform, application, security, and CI/CD teams in a shared GKE environment?
5. **Networking** — Service mesh: When would you introduce Istio or Anthos Service Mesh, and what are the operational risks around mTLS, traffic splitting, retries, and observability?
6. **CI/CD/GitOps** — Feature store: What production risks does a feature store solve, and how would you design feature freshness, parity, governance, and rollback?

<a id="day-27-mock-interview-practice"></a>
### Day 27 Mock Interview Practice

1. **Security/DevSecOps** — Supply chain security: How would you implement image scanning, provenance, Binary Authorization, SBOMs, and deployment policies for containers?
2. **Security/DevSecOps** — Admission controls: How would you enforce Kubernetes security standards using Gatekeeper, Kyverno, or admission controls without blocking developer velocity?
3. **Security/DevSecOps** — Security Command Center: How would you operationalize Security Command Center findings into triage, ownership, SLAs, and remediation workflows?
4. **Networking** — Gateway/API strategy: How would you choose between Ingress, Gateway API, service mesh, load balancers, and Apigee for different traffic management requirements?
5. **CI/CD/GitOps** — Pipeline caching: When can ML pipeline caching help, and when can it hide stale data or bad assumptions?
6. **Automation/Platform** — Progressive delivery: How would you implement canary or blue-green releases using Cloud Deploy, Argo Rollouts, metrics, and automatic rollback?

<a id="day-28-mock-interview-practice"></a>
### Day 28 Mock Interview Practice

1. **Security/DevSecOps** — Secrets migration: How would you migrate applications from mounted JSON service account keys to Workload Identity and Secret Manager?
2. **Security/DevSecOps** — SCC operations: How would you operationalize Security Command Center findings into ticketing, prioritization, remediation, and reporting?
3. **Networking** — Ingress controller: How would you debug an ingress path returning 404 or 502, from DNS to load balancer to ingress controller to service endpoints?
4. **CI/CD/GitOps** — CI/CD design: Design a safe promotion workflow from commit to production using GitHub Actions, Cloud Build, Jenkins, artifact promotion, approvals, and rollback.
5. **Automation/Platform** — Developer experience: How would you measure whether your platform improves developer experience and delivery speed?
6. **MLOps/AI Infra** — Batch vs real-time inference: How would you choose between batch inference, real-time inference, asynchronous inference, and streaming inference for different business use cases?

<a id="day-29-mock-interview-practice"></a>
### Day 29 Mock Interview Practice

1. **Security/DevSecOps** — Secrets rotation: How would you rotate secrets or keys for production services without downtime?
2. **CI/CD/GitOps** — Release readiness: A production release passed CI but caused customer impact. How would you design production readiness checks and release gates to prevent this?
3. **CI/CD/GitOps** — Release rollback: A canary deployment passes technical metrics but business metrics drop. How would you decide rollback versus continue?
4. **Automation/Platform** — Immutable infrastructure: What does immutable infrastructure mean in cloud platforms, and when is mutable infrastructure still acceptable?
5. **GKE/Kubernetes** — Cloud SQL/AlloyDB: How would you troubleshoot a private GKE workload that cannot connect to Cloud SQL or AlloyDB?
6. **GKE/Kubernetes** — CrashLoopBackOff: A pod is stuck in CrashLoopBackOff in production. Give me your exact Kubernetes troubleshooting workflow and the commands or signals you would check.

<a id="day-30-mock-interview-practice"></a>
### Day 30 Mock Interview Practice

1. **Automation/Platform** — Bash vs Python: When is Bash acceptable for automation, and when should you rewrite it in Python or Go?
2. **Automation/Platform** — Go optional: Where would Go be useful in a platform engineering environment, and how would you decide between Go, Python, and Bash for automation?
3. **GKE/Kubernetes** — GKE upgrades: A GKE cluster upgrade caused service disruption. How would you design a safer upgrade strategy for control plane, node pools, PDBs, and workloads?
4. **GKE/Kubernetes** — RCA: Walk me through how you would write a strong RCA for a repeated Kubernetes outage and turn it into preventive engineering work.
5. **GKE/Kubernetes** — GKE node pressure: Nodes show memory pressure and pods are being evicted. How would you investigate requests, limits, QoS classes, daemonsets, autoscaling, and app behavior?
6. **GKE/Kubernetes** — Chaos testing: How would you introduce chaos engineering safely for GKE workloads and what failure modes would you test first?

<a id="day-31-senior-gcp-architecture-and-ownership"></a>
### Day 31: Senior GCP architecture and ownership

1. **Cloud Platforms & GCP Services** — Can you explain your current/last GCP project and your day-to-day activities?
2. **GCP Networking** — GCP Network Engineer introduction: Walk me through your experience designing and supporting enterprise-scale GCP networks.
3. **MLOps & AI Platforms** — Vertex AI Workbench: How would you design a secure managed notebook environment for a data-science team?
4. **DevSecOps & Cloud Security** — WAF, OWASP, SAST and DAST: How do these controls work together in a DevSecOps program?
5. **Application & API Technologies** — Can you explain the complete architecture and flow of your application?
6. **GCP Networking** — Design a secure, highly available GCP network architecture for a large enterprise with development, test, and production environments.

<a id="day-32-gcp-networking-and-hybrid-connectivity"></a>
### Day 32: GCP networking and hybrid connectivity

1. **MLOps & AI Platforms** — Vertex AI Workbench troubleshooting: A notebook cannot access BigQuery or Cloud Storage. What would you check?
2. **DevSecOps & Cloud Security** — WAF and OWASP scenario: A new managed WAF rule blocks legitimate checkout requests. How would you respond?
3. **Application & API Technologies** — What kind of application are you supporting, and where is it hosted?
4. **GCP Networking** — How would you design a Shared VPC operating model across many application teams and projects?
5. **GCP Networking** — CIDR planning: How would you allocate address space for Shared VPC, GKE Pods, Services, hybrid connectivity, and future growth?
6. **CI/CD & GitOps** — SAST and DAST pipeline design: Where should each test run, and what should block a release?

<a id="day-33-gke-reliability-and-platform-operations"></a>
### Day 33: GKE reliability and platform operations

1. **Application & API Technologies** — Is your application internet-facing or internal-facing?
2. **GCP Networking** — How would you plan IP addressing and CIDR allocation for a multi-region, multi-environment GCP estate?
3. **GCP Networking** — CIDR Planning overlap scenario: A newly acquired company's network overlaps your GCP VPC. How would you integrate it safely?
4. **Databases & Data Services** — MongoDB and Redis: When would you use each technology in the same application architecture?
5. **Application & API Technologies** — Is it a web application or an API-based application?
6. **GCP Networking** — What is the difference between custom-mode and auto-mode VPC networks, and which would you use for an enterprise?

<a id="day-34-terraform-governance-and-recovery"></a>
### Day 34: Terraform governance and recovery

1. **GCP Networking** — Network Endpoint Groups: Compare zonal, internet, serverless, and hybrid NEGs and give a use case for each.
2. **Databases & Data Services** — MongoDB and Redis failure scenario: Redis is unavailable but MongoDB remains healthy. How should the application behave?
3. **Application & API Technologies** — How do consumers/users access your application?
4. **GCP Networking** — Explain how routes are selected in a GCP VPC when static, subnet, peering, and dynamic routes exist.
5. **GCP Networking** — Network Endpoint Groups troubleshooting: A GKE Pod is ready but absent or unhealthy in the load balancer NEG. What would you inspect?
6. **Databases & Data Services** — MongoDB and Redis performance: How would you diagnose rising API latency involving both data stores?

<a id="day-35-cicd-gitops-and-devsecops"></a>
### Day 35: CI/CD, GitOps and DevSecOps

1. **Cloud Platforms & GCP Services** — How do you ensure that only legitimate users can access your environment?
2. **GCP Networking** — How do regional and global dynamic routing modes affect Cloud Router route propagation?
3. **Infrastructure as Code (IaC)** — Terraform drift management: How would you detect and remediate drift across many GCP workspaces?
4. **Cloud Platforms & GCP Services** — Data structures and algorithms: How do you choose the right data structure for a production problem?
5. **DevSecOps & Cloud Security** — Where do you implement those security restrictions?
6. **Hybrid & Multi-Cloud** — Design highly available hybrid connectivity between two on-premises data centers and GCP.

<a id="day-36-sre-incidents-slos-and-observability"></a>
### Day 36: SRE incidents, SLOs and observability

1. **Infrastructure as Code (IaC)** — Terraform Drift Management incident: A console change fixed production but now Terraform wants to reverse it. What should happen next?
2. **Programming & Scripting** — Data structures and algorithms coding question: Given a stream of events, how would you return the top K most frequent keys?
3. **Cloud Platforms & GCP Services** — How do you identify whether a user/request is legitimate?
4. **GCP Networking** — When would you choose HA VPN, Dedicated Interconnect, or Partner Interconnect?
5. **DevSecOps & Cloud Security** — Wiz: How would you integrate Wiz into a GCP security operating model without creating noisy, ownerless findings?
6. **Cloud Platforms & GCP Services** — Data structures and algorithms scenario: How would you detect a cycle in a directed dependency graph?

<a id="day-37-platform-engineering-and-developer-experience"></a>
### Day 37: Platform engineering and developer experience

1. **GCP Networking** — How would you design a GCP network architecture where you have full control over networking?
2. **GCP Networking** — How do Cloud Router and BGP work with HA VPN or Cloud Interconnect?
3. **Kubernetes & Containerization** — Wiz scenario: Wiz reports a publicly reachable GKE workload with a vulnerable image and broad IAM. How would you respond?
4. **Monitoring, Logging & Observability** — ELK, OpenTelemetry and Jaeger: How would you combine them for production observability?
5. **Cloud Platforms & GCP Services** — If all networking components need to be centrally controlled from one Host Project, how would you design it?
6. **GCP Networking** — A BGP session between an on-premises router and Cloud Router is down. How would you troubleshoot it?

<a id="day-38-mlops-and-ai-platform-production"></a>
### Day 38: MLOps and AI platform production

1. **Kubernetes & Containerization** — Dynatrace: How would you monitor a GKE-hosted application end to end with Dynatrace?
2. **Monitoring, Logging & Observability** — ELK and OpenTelemetry incident: Logs are present but cannot be correlated with Jaeger traces. What would you fix?
3. **GCP Networking** — Which GCP components would you use in a Shared VPC Host Project architecture?
4. **Cloud Platforms & GCP Services** — Traffic works from on-premises to GCP but not from GCP to on-premises. What would you investigate?
5. **Monitoring, Logging & Observability** — Dynatrace troubleshooting: Latency increased after a release. How would you isolate the bottleneck?
6. **Monitoring, Logging & Observability** — OpenTelemetry and Jaeger scaling: How would you control telemetry volume and cost without losing critical traces?

<a id="day-39-security-iam-and-zero-trust"></a>
### Day 39: Security, IAM and zero trust

1. **GCP Networking** — How would you establish connectivity between an on-premises network and GCP?
2. **GCP Networking** — How would you design Cloud NAT for private workloads across multiple regions?
3. **DevSecOps & Cloud Security** — Okta: How would you integrate Okta with a cloud application using OIDC?
4. **Databases & Data Services** — PostgreSQL and MySQL: What factors would drive your choice for a new transactional service?
5. **Cloud Platforms & GCP Services** — How would on-premises users and applications privately access services running in GCP?
6. **GCP Networking** — A Cloud NAT gateway is dropping connections under load. How would you diagnose and fix it?

<a id="day-40-databases-messaging-and-apis"></a>
### Day 40: Databases, messaging and APIs

1. **Platform Engineering & SRE** — Okta incident: Users can authenticate but receive authorization errors after a group change. How would you troubleshoot it?
2. **Databases & Data Services** — PostgreSQL and MySQL migration: How would you migrate with minimal downtime?
3. **GCP Networking** — Would you use Partner Interconnect, Dedicated Interconnect, or VPN for on-prem-to-GCP connectivity?
4. **GCP Networking** — What is Private Google Access, and how does it differ from Private Service Connect?
5. **Infrastructure as Code (IaC)** — Data drift monitoring: What is data drift, and how would you monitor it for a production model?
6. **Databases & Data Services** — PostgreSQL and MySQL troubleshooting: A database-backed API slows down under peak load. What would you inspect?

<a id="day-41-multi-region-resilience-and-disaster-recovery"></a>
### Day 41: Multi-region resilience and disaster recovery

1. **GCP Networking** — How would you establish on-prem-to-GCP connectivity using VPN?
2. **GCP Networking** — How would you use Private Service Connect to expose a service privately to consumers in other projects or VPCs?
3. **Infrastructure as Code (IaC)** — Data Drift Monitoring scenario: A drift alert fires but business KPIs and model accuracy remain stable. What would you do?
4. **Messaging & Streaming** — Event-driven architecture: What are the benefits and trade-offs compared with synchronous request/response?
5. **GCP Networking** — How would you use HA VPN, Cloud Router, and BGP for hybrid connectivity?
6. **GCP Networking** — Compare Shared VPC, VPC Network Peering, Private Service Connect, and Network Connectivity Center.

<a id="day-42-cost-capacity-and-performance"></a>
### Day 42: Cost, capacity and performance

1. **Kubernetes & Containerization** — Spring Boot production design: How would you prepare a Spring Boot API for deployment on Kubernetes?
2. **Messaging & Streaming** — Event-driven architecture design: How would you guarantee reliable processing without claiming exactly-once delivery?
3. **GCP Networking** — How are routes exchanged between the on-premises network and GCP?
4. **GCP Networking** — What problem does Network Connectivity Center solve, and how would you design its hub-and-spoke topology?
5. **Databases & Data Services** — Spring Boot troubleshooting: A service has high latency and exhausted database connections. How would you investigate it?
6. **Messaging & Streaming** — Event-driven architecture incident: A poison event causes a retry storm. How would you contain and prevent it?

<a id="day-43-staff-level-system-design-trade-offs"></a>
### Day 43: Staff-level system design trade-offs

1. **Cloud Platforms & GCP Services** — Which GCP networking components have you worked with?
2. **GCP Networking** — How would you design Cloud DNS for public, private, and hybrid name resolution?
3. **Kubernetes & Containerization** — Resource rightsizing: How would you right-size GCE and GKE workloads without risking availability?
4. **ITSM & Enterprise Tools** — Jira workflow design: How would you model incident, problem, change, and engineering work without turning Jira into bureaucracy?
5. **Cloud Platforms & GCP Services** — When and where did you implement those networking components?
6. **GCP Networking** — An on-premises client cannot resolve a private GCP DNS name. How would you troubleshoot it?

<a id="day-44-cross-team-technical-leadership"></a>
### Day 44: Cross-team technical leadership

1. **Kubernetes & Containerization** — Resource rightsizing scenario: A cost initiative proposes reducing every Kubernetes request by 50 percent. How would you respond?
2. **CI/CD & GitOps** — Jira automation: How would you integrate CI/CD deployments and production incidents with Jira?
3. **GCP Networking** — Have you worked with VPCs, subnets, firewall rules, network tags, routes, and related networking components?
4. **Application & API Technologies** — How do you choose between a global external Application Load Balancer, regional external load balancer, and internal load balancer?
5. **DevSecOps & Cloud Security** — Google Cloud Platform fundamentals: How do projects, folders, organizations, billing accounts, and IAM policies relate?
6. **ITSM & Enterprise Tools** — Jira reporting: Which metrics are useful for platform and SRE teams, and which can be misleading?

<a id="day-45-production-troubleshooting-under-pressure"></a>
### Day 45: Production troubleshooting under pressure

1. **Application & API Technologies** — Have you designed or architected a complete end-to-end application hosting solution?
2. **Cloud Platforms & GCP Services** — Explain the main GCP load-balancing components: forwarding rule, target proxy, URL map, backend service, health check, and NEG.
3. **Application & API Technologies** — Google Cloud Platform scenario: How would you structure projects for a regulated multi-environment application?
4. **Hybrid & Multi-Cloud** — Multi-cloud architecture: When is using multiple cloud providers justified?
5. **Application & API Technologies** — What type of application did you host?
6. **Cloud Platforms & GCP Services** — A backend is healthy directly but marked unhealthy by the load balancer. How would you troubleshoot it?

<a id="day-46-architecture-review-and-risk-decisions"></a>
### Day 46: Architecture review and risk decisions

1. **Kubernetes & Containerization** — Google Kubernetes Engine architecture: Explain the GKE control plane, nodes, Pods, networking, and responsibility boundaries.
2. **Hybrid & Multi-Cloud** — Multi-cloud architecture design: How would you connect GCP and AWS or Azure securely?
3. **Application & API Technologies** — Which GCP services did you use to host the application end to end?
4. **Application & API Technologies** — How would you design active-active application delivery across two GCP regions?
5. **Kubernetes & Containerization** — Google Kubernetes Engine upgrade scenario: How would you upgrade a production regional cluster safely?
6. **Infrastructure as Code (IaC)** — Multi-cloud architecture operations: How would you prevent configuration and security drift across providers?

<a id="day-47-behavioral-ownership-and-stakeholder-influence"></a>
### Day 47: Behavioral ownership and stakeholder influence

1. **Application & API Technologies** — How is your application exposed to the internet?
2. **GCP Networking** — Where would you use TCP Proxy, SSL Proxy, passthrough Network Load Balancing, and HTTP(S) Load Balancing?
3. **Databases & Data Services** — Dataproc: When would you use Dataproc instead of BigQuery or Dataflow?
4. **Cloud Platforms & GCP Services** — REST APIs and microservices: How would you define service boundaries and API contracts?
5. **GCP Networking** — How does Cloud DNS map your application domain to the load balancer?
6. **GCP Networking** — How would you implement layered network security for an internet-facing GCP application?

<a id="day-48-full-senior-mock-interview-i"></a>
### Day 48: Full senior mock interview I

1. **Cloud Platforms & GCP Services** — Dataproc troubleshooting: A Spark job is slow and repeatedly spills to disk. What would you examine?
2. **Platform Engineering & SRE** — REST APIs and microservices reliability: Which resilience patterns would you implement?
3. **Kubernetes & Containerization** — How does traffic flow from the Global Load Balancer to GKE?
4. **GCP Networking** — What is the difference between hierarchical firewall policies and VPC firewall rules?
5. **GCP Networking** — Organization Policies: How do organization policies differ from IAM and firewall rules?
6. **DevSecOps & Cloud Security** — REST APIs and microservices security: How would you implement authentication and authorization?

<a id="day-49-full-senior-mock-interview-ii"></a>
### Day 49: Full senior mock interview II

1. **DevSecOps & Cloud Security** — Where does Cloud Armor fit into your application traffic flow?
2. **GCP Networking** — How would you migrate from network tags to service-account-based firewall targeting?
3. **Cloud Platforms & GCP Services** — Organization Policy scenario: A team needs a temporary exception to a constraint. How would you govern it?
4. **Application & API Technologies** — FastAPI, Spring Boot and Node.js: How would you choose a framework for a new API service?
5. **Kubernetes & Containerization** — How does traffic reach the application pods running inside GKE?
6. **DevSecOps & Cloud Security** — How does Cloud Armor protect an application, and how would you roll out a new WAF rule safely?

<a id="day-50-final-25-lpa-readiness-assessment"></a>
### Day 50: Final 25 LPA readiness assessment

1. **GCP Networking** — Hierarchical Firewall Policies: How are rules evaluated across organization, folder, and VPC levels?
2. **Monitoring, Logging & Observability** — FastAPI, Spring Boot and Node.js observability: How would you standardize telemetry across all three?
3. **Kubernetes & Containerization** — How do pods/microservices communicate with each other inside GKE?
4. **GCP Networking** — What problem does VPC Service Controls solve, and what operational risks does it introduce?
5. **GCP Networking** — Hierarchical firewall scenario: How would you prevent every project from exposing SSH or RDP to the internet?
6. **Kubernetes & Containerization** — FastAPI, Spring Boot and Node.js deployment: What common Kubernetes controls should every service implement?

