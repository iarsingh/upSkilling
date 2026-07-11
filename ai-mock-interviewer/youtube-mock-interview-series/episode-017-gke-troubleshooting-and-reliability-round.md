# Episode 17: GKE Troubleshooting and Reliability Round

YouTube title: DevOps Mock Interview Practice | Episode 17: GKE Troubleshooting and Reliability Round

Estimated duration: 28-33 min

Source round: Mock Interview 17 - GKE Troubleshooting and Reliability Round (source set 17)

Focus: CrashLoopBackOff, Pending pods, node failure, autoscaling, upgrades, availability, security, GKE backup/restore, etcd backup nuance, and DR

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing GKE Troubleshooting and Reliability Round.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- API: Application Programming Interface
- CPU: Central Processing Unit
- DR: Disaster Recovery
- GKE: Google Kubernetes Engine
- IaC: Infrastructure as Code
- RBAC: Role-Based Access Control
- RPO: Recovery Point Objective
- RTO: Recovery Time Objective
- SLA: Service Level Agreement
- SRE: Site Reliability Engineering

---

## Question 1

Interviewer:
CrashLoopBackOff: A pod is continuously restarting. How would you troubleshoot it?

Pause the video and answer this question aloud.

Senior Associate answer:
Run `kubectl describe pod` to see recent events and the last exit code, and `kubectl logs <pod> --previous` to see what the crashed container actually printed before dying. An exit code of 137 usually means OOMKilled (raise memory limits or fix a leak), other application-specific exit codes point to a code-level crash, and a probe-induced restart shows up as a failed liveness probe in the events rather than an application crash.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: CrashLoopBackOff: A pod is continuously restarting. How would you troubleshoot it?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 2

Interviewer:
Pending pods: How do you troubleshoot Pending pods?

Pause the video and answer this question aloud.

Senior Associate answer:
Run `kubectl describe pod` and read the scheduling event message, which almost always states the exact reason - insufficient CPU/memory across all nodes, no node matching a required affinity/taint, or an exhausted ResourceQuota in the namespace. Check node capacity and current allocation with `kubectl describe nodes`, and verify cluster autoscaler is enabled and has room to add capacity if the issue is genuinely insufficient cluster-wide resources.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Pending pods: How do you troubleshoot Pending pods?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 3

Interviewer:
Kubernetes node failure: What happens when a node fails, and how do workloads recover?

Pause the video and answer this question aloud.

Senior Associate answer:
Kubernetes detects a node has stopped reporting heartbeats after a timeout and marks it NotReady, then after a further grace period, evicts the pods that were running on it. The controllers managing those pods (ReplicaSet, StatefulSet, etc.) notice the pods are gone and create replacements, which the scheduler places on healthy nodes - recovery is automatic as long as sufficient cluster capacity exists elsewhere, though workloads without a PodDisruptionBudget or multiple replicas can experience a brief availability gap.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Kubernetes node failure: What happens when a node fails, and how do workloads recover?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 4

Interviewer:
GKE Cluster Autoscaler: How does Cluster Autoscaler work in GKE?

Pause the video and answer this question aloud.

Senior Associate answer:
Cluster Autoscaler adds nodes when pods cannot be scheduled because of insufficient resources and removes underutilized nodes when workloads can be safely rescheduled. It respects node pool limits, pod disruption budgets, taints, affinity, and scheduling constraints. It is useful for cost optimization, but workloads must have accurate requests.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: GKE Cluster Autoscaler: How does Cluster Autoscaler work in GKE?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 5

Interviewer:
GKE cluster upgrade: How do you upgrade a GKE cluster safely?

Pause the video and answer this question aloud.

Senior Associate answer:
Upgrade the control plane first (GKE manages this with minimal disruption, especially for regional clusters with multiple control plane replicas), then upgrade node pools using surge upgrades so new nodes are created and workloads migrated before old nodes are removed. Ensure every workload has a PodDisruptionBudget to protect availability during the node drain, test the upgrade in a non-production cluster first, and schedule production upgrades during a low-traffic window.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: GKE cluster upgrade: How do you upgrade a GKE cluster safely?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 6

Interviewer:
Highly available GKE: How would you design a highly available GKE architecture?

Pause the video and answer this question aloud.

Senior Associate answer:
Use a regional cluster (control plane replicated across multiple zones) rather than zonal, spread node pools across multiple zones within the region, and ensure workloads run multiple replicas with anti-affinity or topology spread constraints so a single zone failure doesn't take down all instances of a service. Add PodDisruptionBudgets, readiness probes that accurately reflect health, and, for the highest availability tier, consider a multi-region architecture with global load balancing and failover.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Highly available GKE: How would you design a highly available GKE architecture?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 7

Interviewer:
Production Kubernetes security: How would you secure a production Kubernetes cluster?

Pause the video and answer this question aloud.

Senior Associate answer:
Enforce RBAC scoped to least privilege per team/service account, use Workload Identity instead of mounted keys, enable NetworkPolicies with default-deny, run admission controls (Gatekeeper/Kyverno) to enforce non-root containers and resource limits, enable Binary Authorization for verified image deployment, and keep audit logging enabled with alerting on suspicious API activity. Layer this with regular vulnerability scanning of images and nodes, and restrict who has direct cluster-admin access.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: Production Kubernetes security: How would you secure a production Kubernetes cluster?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 8

Interviewer:
Disaster recovery: How would you implement disaster recovery for a production platform?

Pause the video and answer this question aloud.

Senior Associate answer:
Define RTO/RPO targets based on actual business impact, implement automated, tested backups (and for critical data, continuous replication if RPO requires near-zero data loss), and design the architecture to support failover to a secondary region if the SLA requires it. Most importantly, actually test the recovery procedure regularly with real restore/failover drills, since an untested DR plan is not a proven capability - it's a hope.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Disaster recovery: How would you implement disaster recovery for a production platform?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 9

Interviewer:
In GKE, can you take a direct etcd backup like a self-managed Kubernetes cluster?

Pause the video and answer this question aloud.

Senior Associate answer:
In standard managed GKE, Google manages the control plane, including etcd, so you do not SSH into control-plane nodes or run direct etcdctl snapshots yourself. For backup and recovery, focus on backing up Kubernetes resources, persistent volumes, cluster configuration, GitOps/IaC state, and application data. Use Backup for GKE or tools like Velero/Kasten where appropriate, and keep Terraform/Git as the source of truth for cluster and workload configuration.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: In GKE, can you take a direct etcd backup like a self-managed Kubernetes cluster?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 10

Interviewer:
How would you design backup and restore for a production GKE cluster?

Pause the video and answer this question aloud.

Senior Associate answer:
Start by separating what must be recovered: cluster configuration, Kubernetes manifests, secrets, persistent volumes, databases, object storage, and external dependencies. Keep infrastructure in Terraform, workloads in GitOps, secrets in Secret Manager or a controlled secret workflow, and use Backup for GKE or Velero/Kasten for Kubernetes resources and persistent volumes. Define RTO/RPO, backup frequency, retention, encryption, cross-region storage, restore ownership, and run regular restore drills into an isolated cluster or namespace.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How would you design backup and restore for a production GKE cluster?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 11

Interviewer:
What is Backup for GKE, and what problem does it solve?

Pause the video and answer this question aloud.

Senior Associate answer:
Backup for GKE is Google Cloud's managed backup service for GKE workloads. It helps protect Kubernetes resources and persistent volume data, supports backup plans and restore plans, and reduces the need to build a custom backup controller stack. It is useful for restoring deleted namespaces, workloads, configuration, and stateful workload volumes, but it should still be tested with real restore drills and paired with application-aware database backups where needed.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What is Backup for GKE, and what problem does it solve?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 12

Interviewer:
Scenario: A namespace with production workloads is accidentally deleted in GKE. How would you recover it?

Pause the video and answer this question aloud.

Senior Associate answer:
First stop any automation that might keep deleting or overwriting resources, then assess whether the namespace was managed by GitOps, Terraform, Helm, or a backup tool. Restore manifests from GitOps or Helm history where possible, restore Kubernetes resources and persistent volume data from Backup for GKE or your backup platform, and validate secrets/config maps, service accounts, ingress, network policies, and PVC bindings. After recovery, add guardrails such as RBAC restrictions, deletion protection, policy checks, and a break-glass approval flow for high-risk deletes.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Scenario: A namespace with production workloads is accidentally deleted in GKE. How would you recover it?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 13

Interviewer:
How do you test whether a GKE backup is actually restorable?

Pause the video and answer this question aloud.

Senior Associate answer:
Run scheduled restore drills, not only backup-success checks. Restore into a non-production namespace or temporary cluster, verify Kubernetes objects are recreated, PVC data is mounted, Pods become Ready, services route correctly, secrets and service accounts work, and application-level validation passes. Measure actual recovery time and data loss against RTO/RPO, document gaps, and automate the restore test where possible so backup quality is continuously proven.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How do you test whether a GKE backup is actually restorable?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 14

Interviewer:
How do you take and restore an etcd snapshot in self-managed Kubernetes?

Pause the video and answer this question aloud.

Senior Associate answer:
For self-managed clusters where you operate etcd, use etcdctl snapshot save with the correct endpoints, CA, cert, and key, then verify it with etcdctl snapshot status. Store snapshots encrypted and off-cluster. To restore, stop the API server/control-plane components, restore the snapshot with etcdctl snapshot restore into a new data directory, update etcd configuration if member names or peer URLs changed, restart etcd and the API server, then validate cluster state and controller health. Always rehearse this in a test cluster before relying on it in production.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How do you take and restore an etcd snapshot in self-managed Kubernetes?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Closing

That completes Episode 17: GKE Troubleshooting and Reliability Round.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
