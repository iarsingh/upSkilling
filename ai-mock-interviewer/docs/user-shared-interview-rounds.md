# User-shared interview rounds

These questions were supplied as text summaries in chat. Their order and wording are retained;
the underlying screenshots/conversation were not independently reviewed. Interview dates were not supplied.
These are question-only practice sets; no personal answers, credentials, or employment commitments are inferred.

## Actual Interview - Senior AWS Banking and Platform Architecture

Aurora/PostgreSQL, DR, CI/CD, Terraform, AWS governance, Kafka, IAM, FinOps and leadership.

1. **Database Architecture:** What are the key differences between Aurora and RDS PostgreSQL in terms of storage architecture, replication, and failover behavior? When does Aurora’s cost premium justify itself?
2. **Database Migrations:** How do you handle schema migrations in a PostgreSQL database that is actively serving 24/7 banking traffic without downtime?
3. **Disaster Recovery:** Design a disaster-recovery strategy for an Aurora PostgreSQL cluster serving a core banking application with an RTO of 15 minutes and RPO of 1 minute. Walk through every architectural component involved.
4. **Backup and Restore:** How do you validate that your database backup and restore process actually meets the stated RPO? What are you testing before and during DR exercises?
5. **CI/CD:** Compare Jenkins and GitLab CI for managing pipelines in a large banking organization. What are the operational trade-offs regarding scalability, maintenance, and developer experience?
6. **CI/CD:** What stages do you include in a CI/CD pipeline for a containerized microservice deploying to EKS, and what quality gates exist between the stages?
7. **Configuration and Secrets:** How do you manage environment-specific configurations and secrets across development, staging/UAT, and production pipelines without hardcoding values?
8. **Terraform State:** How do you structure Terraform state for a large banking organization managing dozens of AWS accounts and environments? What backend configuration and state-isolation strategy do you use?
9. **Terraform Drift:** What happens during Terraform state/infrastructure drift? How do you detect it, and what is your remediation workflow without causing production disruption?
10. **AWS Landing Zone:** Describe how you would use Terraform to provision a new AWS account in a banking organization, including VPC baseline, SCPs, CloudTrail, Config Rules, and IAM baseline. What does your module hierarchy look like?
11. **Terraform Governance:** How do you prevent infrastructure drift at scale across 50+ AWS accounts managed by Terraform, and what tooling do you layer on top to enforce compliance continuously?
12. **Kafka Partitioning:** How do you design Kafka topic partitioning for a banking transaction stream that needs to guarantee ordering per account while maximizing throughput?
13. **Kafka Delivery Semantics:** Explain the difference between at-least-once and exactly-once delivery in Kafka. When is exactly-once semantics critical in a financial system, and what are the implementation trade-offs?
14. **Kafka Consumer Lag:** A Kafka consumer group in your payment-event pipeline develops significant consumer lag during peak hours. Walk through your diagnostic process and the architectural options you would evaluate to resolve it.
15. **IAM and Security:** How do you enforce least-privilege IAM in a large AWS organization where hundreds of developers need access? Describe your role design and guardrail mechanisms.
16. **FinOps:** Describe the most impactful cost-optimization change you implemented in a large AWS environment. What was the baseline spend, what was your approach, and what measurable outcome did you achieve?
17. **Architectural Leadership:** Describe how you established and enforced architectural standards across multiple development teams. What governance mechanism did you create, and how did you handle teams that deviated from the standard?

## Actual Interview - Managerial and HR Fitment

Stakeholders, emergency changes, certifications, AI upskilling, BGV and working arrangements.

1. **Stakeholder Alignment:** Tell me about a challenging situation where you had to align multiple teams or stakeholders. How did you overcome it?
2. **Deployment Prioritization:** How do you handle situations where the development team asks for an urgent deployment during an ongoing sprint?
3. **Deployment Prioritization:** How do you decide which requirement has higher priority when the development team and business/client have different priorities?
4. **Stakeholder Alignment:** How do you coordinate with the Business Analyst, development team, and other stakeholders before productionizing a change?
5. **Emergency Changes:** Have you handled emergency production changes, hotfixes, or break-glass scenarios?
6. **Emergency Changes:** How do you handle a critical bug fix that has to be deployed immediately, for example during the night rather than waiting for the normal deployment window?
7. **Emergency Changes:** How do you communicate an emergency production change to impacted stakeholders?
8. **Certifications:** What certifications have you completed?
9. **Certifications:** Have you completed Google Cloud certifications, including DevOps/Associate/Networking-related certifications?
10. **Certifications:** Have you completed the Microsoft AZ-400 DevOps Engineer certification?
11. **Certifications:** Why haven’t you mentioned AZ-400 on your current CV? / What is its current renewal status?
12. **Upskilling:** What is one area where you think you need to upskill yourself? It can be technical or personal.
13. **Upskilling:** How are you currently upskilling yourself in AI, MLOps, SRE, or Agentic AI?
14. **AI Operations:** How are you planning to use AI agents for monitoring and troubleshooting infrastructure/applications?
15. **AI Operations:** How would you use AI-based automation differently in non-production versus production environments?
16. **Background Verification:** Do you have all your educational documents available?
17. **Background Verification:** Do you have all the relevant employment/supporting documents required for background verification?
18. **Background Verification:** Are there any documents that you can provide only after your current company’s final settlement?
19. **Background Verification:** Are the rest of your documents in place?
20. **Working Arrangements:** Are you comfortable working in a hybrid model according to the organization’s current policy?
21. **Working Arrangements:** Are you comfortable with the organization’s working framework/policy?
22. **Working Arrangements:** What is your preferred work location? / Is Noida your preferred location?
23. **Induction:** Are you comfortable attending an in-person induction if required?
24. **Induction:** Are you flexible regarding virtual or in-person induction depending on the joining arrangements?
25. **Working Arrangements:** Are you comfortable with the 3-days-office and 2-days-WFH hybrid policy?

## Actual Interview - Azure, AKS and Argo CD

Azure networking and isolation, Kubernetes troubleshooting, cluster provisioning, Argo CD/Helm and capacity validation.

1. **Azure Experience:** How many years of experience do you have with Azure?
2. **Azure Experience:** What Azure services have you worked on?
3. **Azure Networking:** How do you connect one Azure subscription to another subscription or one landing zone to another landing zone?
4. **Azure Networking:** How do you use VNet peering for cross-subscription connectivity?
5. **Azure Networking:** Have you worked with a hub-and-spoke architecture in Azure?
6. **Azure Networking:** How do you use ExpressRoute in a cross-subscription/landing-zone architecture?
7. **Azure Networking:** How do you control inbound and outbound traffic between VNets/subscriptions?
8. **Network Isolation:** How do you prevent cross-contamination between Azure subscriptions/landing zones?
9. **Network Isolation:** If VNet peering is already enabled between two AKS clusters, how do you prevent cross-contamination between them?
10. **Network Isolation:** If there is no NSG between the two AKS workloads, how would you control the traffic/isolation?
11. **Kubernetes Experience:** What experience do you have with Kubernetes?
12. **Kubernetes Experience:** What Kubernetes activities have you performed in your projects?
13. **Kubernetes Troubleshooting:** If a pod suddenly goes into CrashLoopBackOff, what could be the possible reasons?
14. **Kubernetes Troubleshooting:** How would you troubleshoot a pod in CrashLoopBackOff?
15. **Cluster Provisioning:** Have you created a Kubernetes cluster yourself end-to-end?
16. **Cluster Provisioning:** Have you created Kubernetes clusters manually as well as through Terraform?
17. **Argo CD and GitOps:** What kind of exposure do you have to Argo CD?
18. **Argo CD and GitOps:** Have you worked with any GitOps tools other than Argo CD, such as Flux?
19. **Argo CD and GitOps:** How do you set up Argo CD from scratch?
20. **Argo CD and GitOps:** How do you expose/access the Argo CD API/server?
21. **Argo CD and GitOps:** What do you mean when you say you install Argo CD using Helm?
22. **Argo CD and GitOps:** How do you install Argo CD through a Helm chart?
23. **Argo CD and GitOps:** What Kubernetes resources/objects does the Argo CD Helm installation create?
24. **Argo CD and GitOps:** What Deployments, Services, ConfigMaps, Secrets, ServiceAccounts, and RBAC objects are created by Argo CD?
25. **Argo CD and GitOps:** Are there any other Kubernetes resources created as part of the Argo CD installation?
26. **Argo CD and GitOps:** Have you ever used managed Argo CD for Azure/AKS?
27. **AKS Architecture:** What kind of AKS cluster did you work with in your last Azure experience?
28. **Cluster Scale and Capacity:** How many nodes did your Kubernetes/AKS cluster have?
29. **Cluster Scale and Capacity:** Why did your cluster require around 25 nodes?
30. **Cluster Scale and Capacity:** How many microservices were running on that cluster?
31. **Cluster Scale and Capacity:** Are you saying you were running around 100–125 different microservices?
32. **Cluster Scale and Capacity:** How many Kubernetes Deployments did you have for those 100–125 microservices?
33. **Cluster Scale and Capacity:** How many replicas/pods were typically running for each Deployment?
34. **Cluster Scale and Capacity:** If you had around 100–125 microservices, approximately how many total pods were running?
35. **Cluster Scale and Capacity:** How did you decide the required number of Kubernetes nodes for those workloads?

### Reported focus and scale-validation context

The supplied summary characterizes this as a hands-on Azure, AKS/Kubernetes, and
Argo CD/GitOps round. Its follow-ups connect subscription networking and isolation,
cluster provisioning and troubleshooting, Helm installation resources, and workload sizing.

The figures of approximately **25 nodes** and **100–125 microservices** are premises
in the supplied questions, not verified facts about the candidate’s environment.
Prepare a consistent account of the actual node count, Deployments, replicas, total
pods, and sizing rationale. Keep personal experience and measured project figures
accurate rather than adopting these numbers as a model answer.

## Actual Interview - HR, GCP, Terraform and Artifact Promotion

Background and availability, GCP provisioning, Terraform modules and GCS state locking, Jenkins pipelines and build-once artifact promotion.

1. **HR / Background:** Can you introduce yourself?
2. **HR / Background:** Why are you looking for a change from your current organization?
3. **HR / Background:** Which company are you currently working with?
4. **HR / Background:** Are you currently serving your notice period?
5. **HR / Background:** What is your last working day?
6. **HR / Background:** Do you currently have any other offers?
7. **HR / Background:** Where are you currently staying / what is your current location?
8. **HR / Background:** Where is your existing offer located?
9. **HR / Background:** Are you ready to relocate to Bangalore?
10. **HR / Background:** Are you comfortable working from the office four days a week?
11. **HR / Background:** When is your joining date with the other company?
12. **HR / Background:** If your last working day is 16 September and your other joining date is 21 September, how can we schedule the interview?
13. **GCP:** Which major cloud platform have you used throughout your career?
14. **GCP:** How many years of experience do you have in GCP?
15. **GCP:** What are the major GCP services you have worked with?
16. **GCP:** How are you provisioning infrastructure in GCP?
17. **GCP:** Have you provisioned GCP infrastructure manually as well as through Terraform?
18. **Terraform:** How are you using Terraform in your current environment?
19. **Terraform:** Do you have a local Terraform setup, or are you using Terraform Enterprise / another enterprise platform?
20. **Terraform:** How have you structured your Terraform modules?
21. **Terraform:** Are you maintaining shared Terraform modules and calling them from individual projects?
22. **Terraform:** Where are you storing your Terraform scripts/code?
23. **Terraform:** Where are you storing your Terraform state files?
24. **Terraform:** Are you using a GCS bucket as the Terraform remote backend?
25. **Terraform:** How are you locking the Terraform state file?
26. **Terraform:** How does Terraform state locking work with a GCS backend?
27. **Terraform:** What do you define in the Terraform backend configuration for GCS?
28. **Application Deployment / CI-CD:** Can you explain the latest application deployment approach you have used?
29. **Application Deployment / CI-CD:** What happens after a developer commits code to a feature branch?
30. **Application Deployment / CI-CD:** What is your pull-request and branch-merging approach?
31. **Application Deployment / CI-CD:** Where are you writing your deployment pipelines—Jenkins or GitHub Actions?
32. **Application Deployment / CI-CD:** Are your current application deployment pipelines written in Jenkins?
33. **Application Deployment / CI-CD:** How do you handle deployments for different environments?
34. **Application Deployment / CI-CD:** Do you use Jenkins “Build with Parameters” to select environments such as Dev, Test, and Prod?
35. **Artifact Promotion:** Suppose the code is available in the main branch and you deploy it to Dev. How do you subsequently deploy it to Test and Production?
36. **Artifact Promotion:** For Test, do you pull the code from the main branch again and rebuild it?
37. **Artifact Promotion:** For Production, do you again pull the same source code from main and rebuild it?
38. **Artifact Promotion:** Or do you follow another approach for promoting an application across Dev → Test → Prod?

### Supplied artifact-promotion guidance and revision topics

For questions 35–38, the supplied summary identifies the intended approach as:

**Build once → Create an immutable artifact → Deploy to Dev → Promote the same
artifact to Test/UAT → Approval → Promote the same artifact to Prod.**

The example supplied was:

```text
Git Main → Jenkins → Docker Image app:1.5.23 → Artifact Registry → DEV → TEST/UAT → PROD
```

The summary emphasizes promoting the same tested artifact rather than rebuilding
independently for each environment; environment-specific configuration can vary.
The image name and version above are an illustrative example, not a verified project artifact.

The supplied revision priorities are Terraform GCS state locking, reusable Terraform
modules, Jenkins pipeline stages, GitOps/Argo CD, artifact promotion,
environment-specific Helm values, and build-once-deploy-many.

The notice-period dates (16 and 21 September), offer location, relocation, and
four-day office arrangement remain question context. They are not recorded as
confirmed personal details, commitments, or current employer policies. No year or
interview date was supplied.

## Reported interview feedback

The supplied AWS summary describes repeated positive feedback and one redirection from
mTLS/network security back to the Jenkins-versus-GitLab question. This is reported context,
not an independently verified assessment or hiring outcome.

## HR and offer discussion notes (not practice questions)

According to the supplied summary:

- Vinisha would contact the candidate about next steps.
- A counter offer would be considered for salary approval, followed by revised compensation discussion and consent.
- The reported process was BGV → document upload → compensation approval/discussion → offer release → joining-date confirmation → induction.
- The summary also mentions compensation approval before consent; confirm the actual sequence with the recruiter.
- The discussed working arrangement was 3 office days and 2 WFH days, with approximately 6 hours minimum at the office premises.
- The summary mentioned 22–23 total holidays and induction details being communicated shortly before joining.

These are discussion notes from this round, not verified current employer policies or a confirmed offer.
The managerial/HR classification is the supplied summary’s interpretation; it does not establish a hiring decision.

## Practice in the app

In the practice screen, set Technology practice to All technologies, then select a
named round from Mock interview set. This keeps topic filtering from excluding questions.
Use your actual certification status, document availability, location preferences, and experience
when answering personal questions. Offer-process notes are intentionally excluded from the question pool.


## Additional supplied rounds

The three matching production-experience attachments are captured once. The repeated Wipro segment is captured once; the AWS banking round above was already present. Numbering is preserved within each round. Commentary about personal experience and screenshot feedback is not treated as a verified answer.

## Actual Interview - GCP DevOps and SRE Scenarios

GCP/GKE, CI/CD, Jenkins, ArgoCD, Terraform, networking, production troubleshooting, security and MLOps/LLMOps.

1. **Background and Project:** Tell me about yourself.
2. **Background and Project:** Can you explain your current project in detail?
3. **CI/CD:** Can you explain your CI/CD pipeline in detail?
4. **Kubernetes:** Can you explain the structure of a Kubernetes YAML file?
5. **MLOps / LLMOps:** You mentioned MLOps and LLMOps. How have you used them, and what use cases have you worked on?
6. **Production Troubleshooting:** You have worked with ArgoCD. If a GKE workload cannot pull an image from JFrog, how would you troubleshoot it?
7. **Production Troubleshooting:** How do you manage secrets securely in CI/CD pipelines?
8. **Production Troubleshooting:** A Python application was working successfully today, but tomorrow it suddenly starts generating many errors. How would you troubleshoot and improve it?
9. **Production Troubleshooting:** Your application was deployed successfully on GKE, but due to high traffic CPU utilization crossed 90%. How would you troubleshoot and manage the incoming traffic?
10. **Production Troubleshooting:** What is a ReplicaSet in Kubernetes?
11. **Production Troubleshooting:** If a pod goes into CrashLoopBackOff, how would you troubleshoot it? What role does ReplicaSet play?
12. **CI/CD:** How does a code commit trigger your CI/CD pipeline?
13. **CI/CD:** What is an event-driven CI/CD pipeline? How do webhooks trigger pipelines when changes occur?
14. **CI/CD:** All pods are running successfully, but users are receiving HTTP 500 or 501 errors. How would you troubleshoot?
15. **CI/CD:** What branching strategy have you used? Explain your feature-branch strategy.
16. **CI/CD:** Do you have experience migrating repositories from GitHub to Bitbucket? How did you perform the migration?
17. **CI/CD:** Have you worked with Jenkins pipeline agents?
18. **CI/CD:** If a Jenkins agent goes offline while a job is running, how would you troubleshoot and recover it?
19. **CI/CD:** What is SonarQube, and how do you use it in your CI/CD pipeline?
20. **CI/CD:** What is a code smell in SonarQube?
21. **Terraform:** What is Terraform?
22. **Terraform:** How do you create resources such as VPCs, VMs, GKE, etc. using Terraform modules?
23. **Terraform:** Can you write/show Terraform modular code?
24. **Terraform:** What information is stored in a Terraform state file? How does it map Terraform resources to actual cloud resource IDs?
25. **Terraform:** If someone manually changes a Terraform-managed resource from the GCP Console, how does Terraform identify the change?
26. **Terraform:** If the Terraform state file is accidentally deleted, how would you recover it?
27. **Terraform:** What is terraform plan?
28. **Terraform:** What is terraform apply?
29. **Terraform:** What is configuration drift in Terraform?
30. **Terraform:** How does Terraform know whether it needs to manage GCP, AWS, or Azure resources? Explain Terraform providers.
31. **GCP Serverless:** Suppose you need to deploy a small application using Google Cloud Functions. How would you deploy the code?
32. **GCP Serverless:** What is Cloud Run?
33. **GCP Serverless:** What is the difference between Cloud Run Services and Cloud Run Jobs?
34. **GCP Serverless:** How do you secure a Cloud Run application?
35. **GCP Serverless:** How would you use Global Load Balancer, Cloud Armor, security headers, IAM, and Secret Manager with Cloud Run?
36. **GCP / Kubernetes Networking and Scaling:** Why would you choose Kubernetes/GKE for a microservices application?
37. **GCP / Kubernetes Networking and Scaling:** What autoscaling mechanisms are available in Kubernetes/GKE—HPA, VPA, and Cluster Autoscaler?
38. **GCP / Kubernetes Networking and Scaling:** Suppose your application needs to be deployed across multiple zones. How would you design the GCP VPC/networking?
39. **GCP / Kubernetes Networking and Scaling:** Can resources deployed in different zones communicate internally within the same GCP VPC?
40. **GCP / Kubernetes Networking and Scaling:** If you have VPC-A, VPC-B, and VPC-C, how would those separate VPC networks communicate internally?
41. **GCP / Kubernetes Networking and Scaling:** How do you manage load balancing in GCP?
42. **GCP / Kubernetes Networking and Scaling:** What load-balancing/traffic-distribution strategies have you used?
43. **GCP / Kubernetes Networking and Scaling:** What is outlier detection, and how can it help when backend instances continuously return 5xx/503 errors?
44. **GCP / Kubernetes Networking and Scaling:** Suppose you have VPC-A, VPC-B, and VPC-C and the application backend in VPC-C crashes due to high incoming traffic. How would you maintain availability and troubleshoot it?
45. **GCP / Kubernetes Networking and Scaling:** If internal traffic initially enters through VPC-A, how would you design failover so incoming traffic never goes down?
46. **Terraform Production Governance:** How would you prevent terraform apply from ruining production infrastructure?
47. **Terraform Production Governance:** How do you implement manual approval between terraform plan and terraform apply?
48. **Terraform Production Governance:** How do you restrict who can execute Terraform changes against production?
49. **Terraform Production Governance:** How do you integrate change-management/CAB approval with production Terraform deployments?
50. **GitOps and Kubernetes Upgrades:** Kubernetes manifests change continuously. How do you maintain and manage those manifests?
51. **GitOps and Kubernetes Upgrades:** How do you manage Kubernetes manifests using Git, Helm, and ArgoCD/GitOps?
52. **GitOps and Kubernetes Upgrades:** How would you upgrade a Kubernetes/GKE cluster from version 1.32 toward newer versions such as 1.33, 1.34, 1.35, and 1.36?
53. **GitOps and Kubernetes Upgrades:** What checks would you perform before a Kubernetes/GKE version upgrade?
54. **GitOps and Kubernetes Upgrades:** How would you handle application compatibility during a GKE upgrade?
55. **GitOps and Kubernetes Upgrades:** How would you handle rollback when stateful applications or databases are hosted inside Kubernetes?
56. **Deployment Strategies:** What is the difference between Canary and Blue-Green deployment?
57. **Deployment Strategies:** How does traffic shifting work in a Canary deployment—for example, 5%, 10%, 25%, 50%, and finally 100%?
58. **Deployment Strategies:** How does rollback differ between Canary and Blue-Green deployments?
59. **Pull Request Governance:** What policies should you maintain for Pull Request approval?
60. **Pull Request Governance:** How do you protect production branches and prevent direct pushes?
61. **Pull Request Governance:** What CI/security checks should pass before allowing a PR to merge?
62. **Production Troubleshooting:** What kinds of production troubleshooting scenarios have you faced most frequently?
63. **Production Troubleshooting:** How would you troubleshoot an internet-facing GKE application end-to-end?
64. **Production Troubleshooting:** How would you troubleshoot across DNS → Global Load Balancer → Cloud Armor → Gateway → Service → Pod → Application?
65. **Container Security:** Have you faced security vulnerabilities identified in a particular application/base-image version?
66. **Container Security:** How did you handle upgrades when vulnerabilities or CVEs were identified?
67. **Container Security:** How do you remediate vulnerabilities found in container base images?
68. **Container Security:** How do you use Prisma Cloud/Security Command Center findings to identify and remediate CVEs?
69. **Container Security:** How do you test vulnerability fixes in non-production before rolling them out to production?
70. **Container Security:** What are golden/base images, and how do you maintain them for multiple microservices?

## Actual Interview - Production Experience, Multi-Cloud and SRE

Hands-on experience, MLOps, observability, CI/CD, Ansible, scripting, Terraform, change management and SLA/SLO/SLI.

1. **Introduction and Experience:** Can you introduce yourself and explain your overall experience?
2. **Introduction and Experience:** How much experience do you have with GCP, AWS, and Azure?
3. **Introduction and Experience:** How long have you been working at Capgemini?
4. **Introduction and Experience:** Before Capgemini, did you work at Tech Mahindra and TCS?
5. **Introduction and Experience:** Are you working full-time on GCP at Capgemini, or are you working with other clouds as well?
6. **Introduction and Experience:** Are you deploying workloads on both GCP and Azure?
7. **MLOps / Vertex AI:** Are your AI/ML models currently deployed in production, or are they mainly in sandbox/POC environments?
8. **MLOps / Vertex AI:** How many ML models have actually been deployed to production?
9. **MLOps / Vertex AI:** Are you using MLflow for building and testing AI/ML models?
10. **MLOps / Vertex AI:** How are you using Vertex AI / AutoML for your ML workloads?
11. **MLOps / Vertex AI:** What does your model development/deployment lifecycle look like?
12. **Observability:** Have you worked with the ELK Stack?
13. **Observability:** Have you worked with OpenTelemetry?
14. **Observability:** Have you worked with Grafana?
15. **Observability:** What monitoring tools are you currently using?
16. **Observability:** Have you integrated Dynatrace yourself?
17. **CI/CD:** Have you worked with Jenkins, Bitbucket, and GitHub Actions?
18. **CI/CD:** Have you worked with GitLab Runner as well?
19. **CI/CD:** Have you worked with Harness?
20. **CI/CD:** How much hands-on experience do you have with Harness?
21. **CI/CD:** Since we use Harness and Azure DevOps here, how comfortable are you working with these tools?
22. **Ansible:** Have you worked with Ansible?
23. **Ansible:** What kind of automation have you implemented using Ansible?
24. **Ansible:** How do you use Ansible to maintain infrastructure/configuration in the desired state?
25. **Ansible:** How would you use Ansible to identify and remediate a missing security/Defender agent?
26. **Ansible:** Have you written Ansible modules, roles, tasks, playbooks, or templates?
27. **Programming and Scripting:** Your resume mentions Python, Bash, Go, and Java. Have you actually worked with all four languages?
28. **Programming and Scripting:** What kind of work have you done using Python?
29. **Programming and Scripting:** What is your experience with Bash scripting?
30. **Programming and Scripting:** How much experience do you have with Go?
31. **Programming and Scripting:** How much hands-on experience do you have with Java?
32. **Certifications:** You are Google Cloud certified, correct?
33. **Certifications:** Do you have a DevOps certification as well?
34. **Terraform / Multi-Cloud:** How are you deploying/provisioning resources across GCP and Azure?
35. **Terraform / Multi-Cloud:** Which Infrastructure-as-Code tool are you using?
36. **Terraform / Multi-Cloud:** Have you written Terraform modules for both GCP and Azure?
37. **Terraform / Multi-Cloud:** What types of resources are you deploying on a day-to-day basis?
38. **Change Management:** How frequently do you perform changes in your environment?
39. **Change Management:** Do you perform production changes on a day-to-day basis?
40. **Change Management:** What is your sprint cycle?
41. **Change Management:** How long is your sprint?
42. **Change Management:** How do changes move through Dev/QA/UAT before reaching production?
43. **Change Management:** How frequently do you have CAB calls?
44. **Change Management:** How do you handle production change approvals?
45. **Current Project:** What is your current Capgemini project basically about?
46. **Current Project:** What is the domain of your current project?
47. **Current Project:** Is it telecom, insurance, or banking?
48. **Current Project:** Apart from your primary responsibilities, what miscellaneous/additional activities have you performed?
49. **Production Operations / SRE:** What other operational activities do you perform apart from infrastructure provisioning and deployments?
50. **Production Operations / SRE:** Do you handle production incidents and troubleshooting?
51. **Production Operations / SRE:** What types of Kubernetes/GKE issues do you troubleshoot?
52. **Production Operations / SRE:** Are you involved in vulnerability remediation and security-related changes?
53. **Production Operations / SRE:** Do you perform certificate, IAM, firewall, Cloud Armor, scaling, and upgrade-related activities?
54. **SLA / SLO / SLI:** What is your experience with SLAs and SLOs from an SRE perspective?
55. **SLA / SLO / SLI:** Where are your SLA/SLO dashboards hosted?
56. **SLA / SLO / SLI:** Which monitoring platform do you use for your SLO dashboards?
57. **SLA / SLO / SLI:** What SLIs do you monitor?
58. **SLA / SLO / SLI:** How do you monitor application availability, latency, error rate, and throughput?
59. **SLA / SLO / SLI:** How are SLOs configured/monitored in Dynatrace?
60. **SLA / SLO / SLI:** What is the difference between SLA, SLO, and SLI?
61. **SLA / SLO / SLI:** Who defines the SLA versus the SLO?
62. **SLA / SLO / SLI:** Do you monitor error-budget consumption?

## Actual Interview - Wipro Director of Engineering: SRE, Python and Kubernetes

SRE/monitoring, alert migration, Python scripting, Kubernetes troubleshooting and production incident root-cause analysis.

1. **SRE / Monitoring / Python:** Tell me about your high-level experience, especially in SRE, monitoring, alerting, and Python. Context: the interviewer described a Google project migrating/converting existing alerts into an internal system called Portman, focusing on Python, parsing alert definitions, semantic conversion, testing, validation, and maintaining existing production behavior.
2. **Production Incident / RCA:** In your career, what is the most complex problem you have solved? What was the problem, how did you approach it, how did you identify the root cause, what solution did you implement, and what was the final result?
3. **Experience Clarification:** Did you work for Google? Were you working directly for Google/a Google customer, or were you primarily using Google Cloud extensively?
4. **Python:** Write a simple Python program to check disk-space utilization. Assume a system/drive, calculate disk usage, and generate an alert saying the disk is nearing full if utilization is 80% or higher. Below 80%, nothing needs to happen.
5. **Python:** How would you write the disk-space monitoring program for Windows and Linux? Windows example: C:\; Linux example: /.
6. **Python:** Using Python, open a file called Abhilesh.log and find how many lines are present in the log file.
7. **Kubernetes:** Tell me about your Kubernetes experience.
8. **Kubernetes Logs:** Have you worked with Kubernetes logs? How do you check pod logs?
9. **Kubernetes:** How do you check the number/status of pods running in Kubernetes?
10. **Kubernetes Troubleshooting:** If a Kubernetes pod is hanging or having an issue, how would you troubleshoot it? What things do you typically check when investigating Kubernetes problems?

## Actual Interview - Vendor POC, Terraform Troubleshooting and AI/SRE Agents

Current project, vendor POC/Stream Security integration, Terraform VM provisioning and GCP apply failures, DevOps vs MLOps/LLMOps, auto-healing agents and insurance claims AI.

1. **Current Project and Experience:** Tell me your years of experience, what you are currently working on, and what your key skill set is.
2. **Current Project and Experience:** Give me an overview of your current project and what you are doing.
3. **Vendor POC / GCP Integration:** Can you take an example of one POC you did with a vendor and explain it end-to-end?
4. **Vendor POC / GCP Integration:** I’m looking at it from a technical lens. Where did you coordinate, whom did you talk to, and what exactly did you do?
5. **Vendor POC / GCP Integration:** You mentioned security and monitoring POCs. Which one would you like to explain?
6. **Vendor POC / GCP Integration:** To whom did you coordinate for this POC?
7. **Vendor POC / GCP Integration:** Was this a new product, or was it an existing product that you integrated? What exactly was it?
8. **Vendor POC / GCP Integration:** How did you convert the vendor’s manual/script-based integration into a Terraform-based implementation?
9. **Vendor POC / GCP Integration:** What GCP components/APIs were involved in the integration—Cloud Logging, Audit Logs, Pub/Sub, Cloud Run, log sinks, etc.?
10. **Terraform VM Provisioning:** Suppose I want to provision a virtual machine using Terraform. Can you explain the end-to-end steps and everything you would do?
11. **Terraform VM Provisioning:** What Terraform files would you create—for example, provider, variables, main, data sources, outputs, etc.?
12. **Terraform VM Provisioning:** After writing the Terraform files, what commands and sequence would you follow to provision the VM?
13. **Terraform Failure Recovery:** Suppose terraform plan passes, but terraform apply fails. What will you do?
14. **Terraform Failure Recovery:** What kinds of errors can cause an apply to fail even though the plan passed?
15. **Terraform Failure Recovery:** Your Terraform code has already been merged into the main/master branch, but the apply has failed. What will you do?
16. **Terraform Failure Recovery:** Will you back out/revert the code? If not, how exactly will you resolve the issue?
17. **Terraform Failure Recovery:** Suppose the apply failed because the GCP quota limit was exhausted. How would you resolve it and redeploy safely?
18. **LLMOps / DevOps:** Can you tell me the difference between LLMOps and typical DevOps?
19. **LLMOps / DevOps:** Tell me just one difference between LLMOps and DevOps.
20. **MLOps:** What advantage do I get from MLOps?
21. **MLOps:** What exactly am I getting out of the models?
22. **AI / SRE Agents:** You mentioned an agent that can auto-heal systems. What kind of agent are you building?
23. **AI / SRE Agents:** Can you take one example and explain how an AI/SRE agent could auto-heal an AWS virtual machine?
24. **AI / SRE Agents:** What exactly would the agent heal, and how would it perform the healing?
25. **Insurance Claims AI:** You mentioned that you deployed models for users to check their insurance claims. Can you explain that use case in more detail?

Preparation priorities supplied with this round: #3 (vendor POC end-to-end), #10 (Terraform VM end-to-end), #13–17 (Terraform failure scenarios), #18–24 (MLOps/LLMOps and agents), and #25 (claims model architecture).

## Actual Interview - GKE Architecture, Policy as Code and GitOps

Policy as Code, Helm, blue-green deployment, GCP routing, Kubernetes adoption and architecture, security, GitOps and outage troubleshooting.

1. **Policy as Code / OPA:** What tool do you use for Policy as Code? How are you maintaining the policies? Once Terraform generates a plan, how does OPA check or validate that Terraform plan?
2. **Helm Charts:** Have you worked with Helm charts? How have you used Helm charts for cluster-level deployments, such as deploying Defender/security agents across clusters? How did you handle initial project/cluster setup and Hello World deployment templates?
3. **Blue-Green Deployment:** What is a blue-green deployment? How can you implement blue-green deployment through code? What changes are required in the Kubernetes YAML/Helm code to implement blue-green? Have you actually implemented blue-green deployment in your project? How would you switch traffic from Blue to Green? How would you roll back from Green to Blue?
4. **GCP Routing:** How does longest prefix match influence route selection? How does route priority influence routing? How do policy-based routes (PBR) influence route selection? What is the order/precedence between policy-based routing and normal VPC routes?
5. **Kubernetes Adoption:** Suppose a client comes to you and says they want to adopt Kubernetes for deploying their workloads. How would you guide them? What questions would you ask before recommending Kubernetes? How would you determine whether Kubernetes/GKE is actually the right solution? When would you recommend something simpler, such as Cloud Run?
6. **GKE Workload Architecture:** How would you design the Kubernetes architecture for the client’s workloads/workers? How would you separate different types of workloads? How would you design namespaces, node pools, autoscaling, security, and deployment? How would you handle general-purpose, batch, high-memory, or GPU workloads?
7. **GKE Standard vs Autopilot:** Before designing the solution, wouldn’t you first ask which type of GKE solution the client wants? What is the difference between GKE Standard and GKE Autopilot? What are the use cases for Standard? What are the use cases for Autopilot? What are the pros and cons of each? Who handles upgrades, patching, maintenance, and node scaling? How would cost and operational maintenance influence your recommendation? When would you use Fleet Management for multiple clusters?
8. **Ingress / Gateway Enforcement:** In a GKE cluster, how would you make sure pods cannot bypass the intended Ingress/Gateway path? How would ClusterIP Services help? How would Kubernetes NetworkPolicy help? How would you implement default-deny and explicit allow rules? How would you prevent developers from creating unauthorized NodePort or LoadBalancer Services? How can OPA Gatekeeper/admission policies be used for this? What role does RBAC play?
9. **GitOps vs Traditional Deployment:** Do you use only GitOps, or do you also have traditional deployments? Do you still have legacy applications that haven’t migrated to GitOps? Are you planning to migrate pipelines from Jenkins to Bitbucket? Which approach is better: GitOps or traditional DevOps/CI-CD deployment? What are the advantages of GitOps? When would traditional deployment still make sense? How does Argo CD change the deployment model? Is migrating from Jenkins to Bitbucket Pipelines the same as migrating to GitOps?
10. **GKE Outage Troubleshooting:** Suppose suddenly a GKE cluster goes down. How would you investigate it? What would be your troubleshooting strategy across compute and networking? How would you determine the blast radius? How would you check whether the GKE control plane/API is accessible? How would you troubleshoot NotReady nodes? What compute/node-pool issues would you investigate? What networking components would you check? How would you troubleshoot the path: DNS → Load Balancer → Cloud Armor → Gateway/Ingress → Service → Pod? What would you check if kubectl itself cannot connect to the cluster? How would you use logs, metrics, and events to identify the root cause? How would you restore service and then perform RCA?

## Actual Interview - GCP Troubleshooting, CI/CD, Migration and Docker

GCP/GKE troubleshooting, Cloud Armor, IAM, cost, Terraform, CI/CD, incident investigation, EC2 migration and Docker Compose.

1. **Previous Project Experience:** What have you done in your previous company? What project did you work on, and what was your role?
2. **GCP Security / Cloud Armor:** How do you secure an internet-facing application using Global Load Balancer and Cloud Armor? How do you restrict traffic based on ASN, country/geo, IP ranges, or specific regions?
3. **Kubernetes Pending Pods:** A pod is stuck in Pending. Walk me through how you would troubleshoot it.
4. **Kubernetes Commands:** What commands would you use to identify and troubleshoot a Pending pod?
5. **Pod Logs vs Events:** Does kubectl describe provide error/application logs? When would you use kubectl logs instead?
6. **Kubernetes Deployment Troubleshooting:** What would you check if the pod/application does not start because of an incorrect image/image tag, port configuration, labels, selectors, or matchLabels?
7. **GCP Cross-Project IAM:** How would you provide a service account in one GCP project access to resources in another project?
8. **Cross-Project GCS Access:** Suppose a service account in Project A needs read access to a GCS bucket in Project B. How would you configure it?
9. **GCP Cost Investigation:** What will you do when you see a sudden cost spike in GCP? How would you identify the project, service, SKU, or resource responsible and control the cost?
10. **Organization Policy vs IAM:** What is the difference between GCP Organization Policy and IAM?
11. **CI/CD Tools:** What CI/CD tools are you currently using? Discussion context: Jenkins, Bitbucket Pipelines, GitLab Runner, GitHub Actions, and Cloud Build.
12. **Harness:** Do you have any experience with Harness?
13. **CI/CD Flow:** Give me the overall flow/flowchart of your CI/CD pipeline. Discussion context: source → webhook → Jenkins → tests/SonarQube → Docker build → vulnerability scan → Artifact Registry → deployment/ArgoCD → GKE → validation → production → monitoring/rollback.
14. **Terraform GCS Bucket:** Can you write Terraform code to create a GCS bucket in GCP?
15. **Terraform Lifecycle Rule:** How would you configure a bucket lifecycle condition such as moving objects to another storage class after 30 days?
16. **GKE Workload Identity / GCS:** How do you give a GKE pod access to Cloud Storage? Discussion context: Kubernetes ServiceAccount → Workload Identity → Google Service Account → IAM → GCS.
17. **GKE Standard vs Autopilot:** What is the difference between GKE Standard and Autopilot? Who manages nodes, scaling, upgrades, and underlying infrastructure?
18. **P2 Incident Troubleshooting:** You own a P2 issue end-to-end. Something has changed and caused the problem. How will you debug it?
19. **Recent-Change Investigation:** During an incident, how would you determine whether a recent application, Kubernetes, Terraform, configuration, or infrastructure change caused the issue?
20. **Terraform Concurrent Apply:** What happens if two people execute terraform apply at the same time? What prevents state corruption?
21. **Terraform State Locking:** How does state locking work, and what would you do if Terraform reports that the state is already locked?
22. **EC2 Migration:** Suppose you performed an EC2-to-EC2 migration with zero downtime. How did you perform it?
23. **Migration Cutover:** What was the actual cutover? Discussion context: adding the new EC2 to the target group, validating health checks, shifting traffic, draining the old instance, monitoring, and then decommissioning it.
24. **Migration Rollback:** What would you do if the new EC2 instance started failing after production traffic had been shifted?
25. **Docker:** You have mentioned Docker in your experience. Have you worked with Docker?
26. **Docker Compose:** Have you worked with Docker Compose?
27. **Docker Compose Coding:** Can you write a basic Docker Compose file? The example involved an application container and PostgreSQL with ports, environment variables, depends_on, and a persistent volume.
28. **Docker Compose Startup:** What does depends_on do, and does it guarantee that the dependent application/database is actually ready?

## Actual Interview - SRE Observability, GKE Internals and Python

SRE experience, Dynatrace, monitoring and alerting, HPA, Terraform environments, Kubernetes internals, SLI/SLO/SLA and Python automation.

1. **SRE Experience:** What SRE work have you done in your Capgemini project? List it point by point.
2. **SRE Tools:** What SRE tools have you used in your project, and what work have you done with each tool?
3. **Dynatrace:** Explain your Dynatrace experience. What work have you done and what was your contribution? Cover APM, microservices health monitoring, centralized application monitoring, distributed tracing, alerting, dashboards, and production troubleshooting/RCA.
4. **GKE Monitoring and Recovery:** How would you implement monitoring and alerting for GKE pods? If a pod becomes corrupted/down or the replica count mismatches, how would you restart/recreate it or scale the pods?
5. **HPA Manifest:** Can you write a Kubernetes manifest for HPA autoscaling?
6. **HPA Calculation:** How does HPA calculate the required number of pods?
7. **Terraform Deployment:** Write the core Terraform logic for a multi-stage application deployment.
8. **Terraform Environments:** How would you use Terraform to deploy an application across Dev, QA, UAT, and Prod environments?
9. **Terraform Backend Isolation:** How would you manage separate Terraform backend/state buckets for different environments/projects?
10. **GKE Pod Troubleshooting:** If a pod is stuck or not responding in a GKE cluster, how would you diagnose it?
11. **Kubernetes Commands:** What kubectl commands would you use to troubleshoot a problematic GKE pod? Commands listed in the supplied round: kubectl get pods; kubectl describe pod; kubectl logs; kubectl logs --previous; kubectl exec; kubectl top; kubectl get events.
12. **Centralized Observability:** Suppose I want centralized monitoring for all GCP resources—GKE clusters/pods, Cloud Run, IAM, CI/CD pipelines, etc. How would you create the monitoring system using Prometheus, Grafana, or another observability platform?
13. **GKE Pod Observability:** For GKE cluster pods specifically, what monitoring and alerting setup would you implement?
14. **SLI / SLO / SLA:** What is SLI, SLO, and SLA?
15. **SLI / SLO / SLA Ownership:** Who defines or sets up the SLA, SLO, and SLI?
16. **GKE Architecture:** Can you explain GKE architecture? Cover control plane, API Server, etcd, Controller Manager, Scheduler, worker nodes, Kubelet, pods, and Services/networking.
17. **Kubernetes API Flow:** When you execute a kubectl command, what happens internally in Kubernetes?
18. **Kube-Scheduler:** What is the responsibility of the kube-scheduler?
19. **ReplicaSet Reconciliation:** If a ReplicaSet is configured for three replicas but only two pods are running, which Kubernetes component detects and fixes it?
20. **Kubernetes Desired State:** How does Kubernetes maintain desired state versus actual state?
21. **CronJob Internals:** How does a CronJob execute internally in Kubernetes?
22. **Python Experience:** How much experience do you have in Python?
23. **Python GCP Monitoring:** If you need to write a Python script to monitor application errors on GCP, how would you implement it?

Preparation priorities supplied with these rounds: architecture and production troubleshooting for the policy/GitOps round; Pending pods, Workload Identity, cross-project IAM, Cloud Armor, costs, Org Policy vs IAM, CI/CD, state locking, incident changes, migration cutover and Docker Compose for the GCP round; SRE/observability, Kubernetes internals, Terraform environments and Python automation for the SRE round. Discussion context is retained from the supplied summaries, not independently verified as personal experience or a technical answer.
