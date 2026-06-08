# 100 Days of GKE, Terraform, and MLOps Content

Use this as a LinkedIn posting roadmap and hands-on learning sequence. Each day has a post angle, a practical build task, and a senior scenario prompt.

| Day | Theme | LinkedIn Post Angle | Hands-on Build | Senior Scenario Prompt |
| --- | --- | --- | --- | --- |
| 001 | GKE foundations | Why GKE should be managed as code | Create Terraform project structure | How would you convince a team to stop creating clusters manually? |
| 002 | Terraform setup | Provider pinning saves future upgrades | Add `google` and `google-beta` providers | A provider upgrade breaks plan output. What do you check first? |
| 003 | Remote state | GCS backend for team-safe Terraform | Add remote state backend sample | How do you prevent two engineers from applying conflicting infra changes? |
| 004 | APIs | GKE needs more than Container API | Enable required GCP APIs | A cluster apply fails because an API is disabled. How do you operationalize this? |
| 005 | IAM | Platform service accounts should be explicit | Create cluster and node service accounts | How do you design IAM for platform, app, and CI identities? |
| 006 | VPC | GKE starts with network design | Create custom VPC | What subnet mistake becomes painful after workloads grow? |
| 007 | Subnets | Pod and service ranges are capacity decisions | Add secondary IP ranges | How do you size pod ranges for a multi-team cluster? |
| 008 | Private cluster | Private nodes reduce public exposure | Enable private GKE nodes | How would CI/CD reach a private cluster safely? |
| 009 | Control plane | Public endpoint does not mean public access | Configure authorized networks | When would you use private endpoint only? |
| 010 | Cloud NAT | Private nodes still need controlled egress | Add Cloud Router and NAT | A pod cannot pull an image. How do you debug egress? |
| 011 | Artifact Registry | Keep images close to the cluster | Create Docker repository | How do you separate dev and prod container registries? |
| 012 | Node pools | One default pool is rarely enough | Add system and app node pools | How do you isolate platform add-ons from application workloads? |
| 013 | Autoscaling | Autoscaling has multiple layers | Configure node pool autoscaling | HPA scales pods but nodes do not appear. What do you inspect? |
| 014 | Spot nodes | Batch workloads can tolerate interruption | Add optional spot node pool | Which ML workloads are safe on spot nodes? |
| 015 | GPU nodes | GPU pools need taints and quotas | Add optional GPU node pool design | A GPU workload is pending. What are your top checks? |
| 016 | Labels | Labels are operational metadata | Add cluster and node labels | How do labels help cost allocation and incident response? |
| 017 | Taints | Taints protect special-purpose nodes | Add taints for system and GPU pools | A workload lands on the wrong pool. How do you fix scheduling? |
| 018 | Workload Identity | Stop mounting static service account keys | Enable Workload Identity | How do you give one namespace access to one GCS bucket? |
| 019 | Kubernetes SA | KSA to GSA mapping is the core pattern | Add ML service account manifest | A pod gets 403 from GCS. How do you debug identity? |
| 020 | Namespaces | Namespaces are ownership boundaries | Create `mlops`, `training`, and `serving` namespaces | How do you prevent namespace sprawl? |
| 021 | RBAC | RBAC should reflect operating model | Add namespace role examples | How would you give data scientists deploy access without cluster-admin? |
| 022 | Network policy | Default-open networking is risky | Add namespace network policy | A model API should only receive ingress from gateway pods. How? |
| 023 | Secrets | Secret handling is a platform decision | Add External Secrets design notes | Why are Kubernetes Secrets not enough by themselves? |
| 024 | ConfigMaps | Config is not a deployment artifact | Add runtime config pattern | How do you separate model config from image build? |
| 025 | Ingress | Ingress choice affects security and cost | Add internal ingress notes | Internal-only inference API or public endpoint: how do you decide? |
| 026 | Load balancing | Service type changes blast radius | Add service manifest | A LoadBalancer service stays pending. What do you check? |
| 027 | Gateway API | Gateway API is replacing old ingress patterns | Add Gateway API topic note | When would you standardize on Gateway API? |
| 028 | TLS | TLS ownership must be clear | Add managed cert checklist | Who owns certificate rotation in your platform? |
| 029 | DNS | DNS is part of reliability | Add Cloud DNS plan | A model endpoint resolves internally but not externally. How do you debug? |
| 030 | HPA | HPA needs metrics and sane requests | Add HPA for inference service | CPU HPA fails to scale. What did the team forget? |
| 031 | VPA | VPA is useful but not always safe | Add VPA discussion notes | When should VPA run in recommendation mode only? |
| 032 | Cluster autoscaler | Node scaling follows scheduling pressure | Tune min and max nodes | Why are pods pending even when autoscaling is enabled? |
| 033 | Requests | Requests are scheduling contracts | Add resource requests to manifests | How do bad requests cause cost and reliability problems? |
| 034 | Limits | Limits can throttle ML inference | Add limit guidance | When would you avoid CPU limits for latency-sensitive services? |
| 035 | PDB | Disruption budgets protect availability | Add PodDisruptionBudget | Why can a PDB block node upgrades? |
| 036 | Probes | Probes should reflect real readiness | Add liveness/readiness probes | A model takes 90 seconds to load. How do you design probes? |
| 037 | Rolling updates | Rollouts need capacity headroom | Tune deployment strategy | How do you avoid downtime during model server releases? |
| 038 | Blue-green | Blue-green is simple but expensive | Add deployment strategy post | When is blue-green better than canary? |
| 039 | Canary | Canary protects users and models | Add canary rollout topic | How do you canary a model based on business metrics? |
| 040 | GitOps | Git is the deployment interface | Add Argo CD application example | What should be manual in a GitOps flow, if anything? |
| 041 | CI/CD | CI should validate infra and app together | Add pipeline checklist | How do you gate Terraform apply in production? |
| 042 | Terraform plan | Plan review is engineering review | Add plan review checklist | What changes in a plan should trigger extra review? |
| 043 | Modules | Modules encode platform standards | Refactor into module idea | When does a Terraform module become too abstract? |
| 044 | Environments | Dev/stage/prod should differ intentionally | Add env folder layout | How do you avoid environment drift? |
| 045 | Policy as code | Guardrails reduce review fatigue | Add OPA/Conftest topic | Which GKE settings should policy block? |
| 046 | Security posture | GKE hardening is layered | Add Shielded Nodes and Binary Authorization notes | What baseline do you enforce on every cluster? |
| 047 | Binary Authorization | Only trusted images should run | Add BinAuthz content idea | How do you block unsigned model images? |
| 048 | Image scanning | Vulnerability scans belong in release flow | Add Artifact Registry scan notes | A critical CVE appears in a base image. What is the response? |
| 049 | SBOM | SBOMs improve supply-chain traceability | Add SBOM post outline | How do you prove what went into a production image? |
| 050 | Admission control | Admission policies protect clusters | Add Gatekeeper/Kyverno topic | A team deploys privileged pods. How should the platform respond? |
| 051 | Logging | Logs need structure and ownership | Add Cloud Logging pattern | What fields should every inference service log? |
| 052 | Metrics | Metrics should answer operational questions | Add Cloud Monitoring metrics | Which metrics matter for model serving? |
| 053 | Tracing | Tracing connects request path to latency | Add OpenTelemetry topic | How do you trace from API gateway to model container? |
| 054 | SLOs | SLOs align platform and product | Add inference SLO example | How do you define SLOs for batch training jobs? |
| 055 | Alerting | Alerts should be actionable | Add alert policy ideas | What alerts would you page on for model serving? |
| 056 | Dashboards | Dashboards should support decisions | Add dashboard checklist | What dashboard would an incident commander need? |
| 057 | Cost | GKE cost is design feedback | Add cost label strategy | Why did GKE cost spike after enabling autoscaling? |
| 058 | Quotas | Quotas are production dependencies | Add quota checklist | A rollout fails in one region due to quota. What is your process? |
| 059 | Capacity | Capacity planning beats reactive scaling | Add node pool capacity worksheet | How do you plan for a traffic launch? |
| 060 | Multi-region | Multi-region is a product decision | Add regional cluster discussion | Active-active or active-passive for inference? |
| 061 | Backup | Backups must include stateful dependencies | Add Backup for GKE notes | What do you back up for an MLOps platform? |
| 062 | Disaster recovery | DR needs tested runbooks | Add DR runbook outline | How do you rebuild GKE from Terraform after a region issue? |
| 063 | Stateful workloads | State on Kubernetes needs caution | Add MLflow backend discussion | Should MLflow run statefully on GKE? |
| 064 | Cloud SQL | Managed databases reduce ops load | Add Cloud SQL integration topic | How do you secure DB access from GKE? |
| 065 | GCS | Buckets are model artifact systems | Add model artifact bucket | How do you prevent accidental model overwrite? |
| 066 | Feature stores | Online and offline stores have different needs | Add feature store architecture | How do you keep training-serving skew under control? |
| 067 | Training jobs | Training is batch scheduling plus data access | Add Kubernetes Job example | How do you run repeatable training jobs on GKE? |
| 068 | Kubeflow | Pipelines bring reproducibility | Add Kubeflow Pipelines topic | When is Kubeflow worth the operational complexity? |
| 069 | Vertex AI | Hybrid GKE and Vertex is common | Add hybrid MLOps architecture | Which workloads stay on GKE and which move to Vertex AI? |
| 070 | Model registry | Promotion needs metadata and approval | Add registry workflow | How do you promote models across environments? |
| 071 | Model serving | Serving design depends on latency and scale | Add inference deployment | How do you support multiple model versions? |
| 072 | Batch inference | Batch inference is reliability-first | Add CronJob topic | How do you recover a failed batch inference run? |
| 073 | GPUs for inference | GPU serving needs utilization discipline | Add GPU serving post | How do you avoid wasting GPU nodes overnight? |
| 074 | KServe | Model serving platforms standardize inference | Add KServe topic | When would you adopt KServe over custom deployments? |
| 075 | Model monitoring | Model health is not only pod health | Add drift monitoring angle | What do you alert on when accuracy drops silently? |
| 076 | Data drift | Drift needs baselines and windows | Add drift detection post | How do you distinguish data drift from a logging bug? |
| 077 | Retraining | Retraining should be triggered carefully | Add retraining trigger workflow | When should drift trigger investigation instead of automatic retraining? |
| 078 | Governance | Governance is release discipline | Add approval workflow | How do you audit who approved a model? |
| 079 | Compliance | Compliance needs evidence, not promises | Add evidence collection topic | What artifacts prove your platform is controlled? |
| 080 | Multi-tenancy | Multi-tenancy is isolation plus usability | Add namespace and quota model | How do you host multiple ML teams on one cluster? |
| 081 | ResourceQuota | Quotas stop noisy-neighbor problems | Add ResourceQuota manifest | A team consumes all GPUs. What guardrails prevent this? |
| 082 | LimitRange | Defaults prevent accidental oversized pods | Add LimitRange topic | How do you keep junior teams from over-requesting resources? |
| 083 | PriorityClass | Priority protects critical workloads | Add priority class notes | During scarcity, which workloads should be evicted first? |
| 084 | Scheduler | Scheduling explains many incidents | Add scheduling debug checklist | A pod is pending. Give your senior-level debug flow. |
| 085 | Upgrades | GKE upgrades are change management | Add maintenance window config | How do you upgrade without breaking ML workloads? |
| 086 | Version skew | Kubernetes version skew matters | Add client/server skew topic | kubectl, nodes, and control plane differ. What is acceptable? |
| 087 | Release notes | Release notes are operational input | Add upgrade review checklist | What do you read before upgrading GKE? |
| 088 | Incident response | Platform incidents need clear roles | Add GKE incident template | Model serving latency doubles. Who joins the call? |
| 089 | Runbooks | Runbooks reduce panic | Add CrashLoopBackOff runbook | How do you debug a failing model pod under pressure? |
| 090 | Postmortems | Postmortems improve systems | Add sample postmortem prompt | What makes a GKE incident action item useful? |
| 091 | Terraform drift | Drift is a process smell | Add drift detection plan | Someone changed the cluster in console. What happens next? |
| 092 | Import | Import helps bring existing infra under code | Add terraform import topic | How do you migrate a manually created cluster to Terraform? |
| 093 | Refactoring | Refactor Terraform with minimal blast radius | Add state mv discussion | How do you split a module without recreating resources? |
| 094 | Secrets rotation | Rotation should be routine | Add rotation workflow | How do you rotate DB credentials used by workloads? |
| 095 | Platform API | Internal platforms hide complexity | Add platform product thinking post | What should developers self-serve? |
| 096 | Developer experience | Good platforms make the right thing easy | Add golden path checklist | How do you measure platform adoption? |
| 097 | Documentation | Docs are part of reliability | Add architecture decision record | What must be documented before production launch? |
| 098 | Interview story | Turn projects into senior narratives | Add STAR story for GKE MLOps | Tell me about a GKE production failure you solved. |
| 099 | Portfolio | Show architecture, code, and decisions | Add portfolio README checklist | How do you present this to a staff engineer interviewer? |
| 100 | Capstone | Build a GKE MLOps platform with Terraform | Final architecture and lessons post | Design a production GKE MLOps platform end to end. |

