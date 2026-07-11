# Episode 55: Kubernetes Services, Service Mesh, AKS/GKE, and Terraform Loops Round - Part 2

YouTube title: DevOps Mock Interview Practice | Episode 55: Kubernetes Services, Service Mesh, AKS/GKE, and Terraform Loops Round - Part 2

Estimated duration: 16-21 min

Source round: Mock Interview 51 - Kubernetes Services, Service Mesh, AKS/GKE, and Terraform Loops Round (source set 51)

Focus: Kubernetes Service networking, kube-proxy, cross-namespace DNS, startup ordering, blue-green traffic switching, service mesh, Istio/Anthos Service Mesh, AKS versus GKE operations, Terraform dynamic blocks, for_each, each.value, toset, and repeated S3 resources

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Kubernetes Services, Service Mesh, AKS/GKE, and Terraform Loops Round - Part 2.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CNI: Container Network Interface
- DNS: Domain Name System
- GKE: Google Kubernetes Engine
- IaC: Infrastructure as Code
- IAM: Identity and Access Management
- VPC: Virtual Private Cloud

---

## Question 1

Interviewer:
What is AKS, and how is it different from GKE from an operations point of view?

Pause the video and answer this question aloud.

Senior Associate answer:
AKS is Azure Kubernetes Service, the managed Kubernetes offering on Azure. Operationally, both AKS and GKE manage the control plane and integrate with their cloud networking, identity, storage, monitoring, and load-balancing ecosystems. The differences are mainly in platform integration: AKS uses Azure Resource Manager, Azure CNI, managed identities, Azure Monitor, and Azure Load Balancer/Application Gateway patterns, while GKE integrates with Google IAM, VPC-native networking, Cloud Operations, Cloud Load Balancing, and Workload Identity.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What is AKS, and how is it different from GKE from an operations point of view?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 2

Interviewer:
Scenario: An AKS or GKE node upgrade is blocked or causing disruption. What would you investigate?

Pause the video and answer this question aloud.

Senior Associate answer:
Check PodDisruptionBudgets, max unavailable settings, node surge settings, unavailable replicas, DaemonSets, local storage usage, long terminationGracePeriodSeconds, pods without safe eviction, cluster autoscaler limits, quota, and node pool health. For disruption, check whether readiness probes, rollout strategy, replica count, topology spread, and PDBs allow enough capacity during upgrade. The safe design is separate node pools, surge upgrades, tested maintenance windows, and workload disruption budgets aligned with real availability needs.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Scenario: An AKS or GKE node upgrade is blocked or causing disruption. What would you investigate?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 3

Interviewer:
What is a dynamic block in Terraform?

Pause the video and answer this question aloud.

Senior Associate answer:
A dynamic block in Terraform generates repeatable nested blocks inside a resource, data source, provider, or provisioner from a collection. It is useful when the nested block count or contents are driven by input variables, for example generating multiple ingress rules, egress rules, disks, or lifecycle rules without copying the same nested block many times.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: What is a dynamic block in Terraform?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 4

Interviewer:
What is the use case of a dynamic block?

Pause the video and answer this question aloud.

Senior Associate answer:
Use a dynamic block when a resource has repeatable nested configuration and the number of blocks should be controlled by input data. For example, a security group may need a variable list of ingress rules, or an S3 bucket may need a variable list of lifecycle rules. It keeps modules reusable while avoiding duplicated HCL.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: What is the use case of a dynamic block?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 5

Interviewer:
How would you create multiple S3 buckets in Terraform?

Pause the video and answer this question aloud.

Senior Associate answer:
Define the desired bucket names as a set or map and use for_each on aws_s3_bucket. For example, variable bucket_names can be a set(string), then resource aws_s3_bucket buckets { for_each = var.bucket_names bucket = each.value }. If each bucket needs different settings, use a map of objects and read fields from each.value.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: How would you create multiple S3 buckets in Terraform?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 6

Interviewer:
What is the meaning of each.value in Terraform?

Pause the video and answer this question aloud.

Senior Associate answer:
each.value is the value of the current item when a resource, module, or dynamic block uses for_each. If for_each is a set of strings, each.value is the current string. If for_each is a map, each.key is the map key and each.value is the map value, which may be an object containing multiple attributes.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: What is the meaning of each.value in Terraform?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 7

Interviewer:
Why do we use each.value?

Pause the video and answer this question aloud.

Senior Associate answer:
We use each.value to parameterize each repeated resource or nested block with the data for the current item in a for_each loop. It lets one resource block create many correctly configured resources without hardcoding names, ports, tags, lifecycle rules, or other per-item settings.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Why do we use each.value?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Question 8

Interviewer:
Why do we use toset() in Terraform?

Pause the video and answer this question aloud.

Senior Associate answer:
toset() converts a list or tuple into a set, which is often needed because for_each accepts a map or set of strings. It also removes duplicates and makes the collection identity based on values rather than list indexes, which is safer than count for resources where you do not want index shifts to recreate infrastructure.

Senior answer structure:
Use this structure: desired state -> module/state design -> plan review -> policy guardrails -> rollback or drift handling.

Scenario-based practice:
Scenario practice: Imagine a Terraform change is about to affect production. Explain how you would review the plan, reduce blast radius, apply safely, and recover if it fails for: Why do we use toset() in Terraform?

What interviewer checks:
They are checking whether you can manage infrastructure safely with state, modules, review, and rollback discipline.

---

## Closing

That completes Episode 55: Kubernetes Services, Service Mesh, AKS/GKE, and Terraform Loops Round - Part 2.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
