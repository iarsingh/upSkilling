# Episode 16: Kubernetes and GKE Fundamentals Round

YouTube title: DevOps Mock Interview Practice | Episode 16: Kubernetes and GKE Fundamentals Round

Estimated duration: 16-21 min

Source round: Mock Interview 16 - Kubernetes and GKE Fundamentals Round (source set 16)

Focus: Kubernetes architecture, workload objects, services, ingress, rollouts, probes, and GKE operations

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Kubernetes and GKE Fundamentals Round.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- API: Application Programming Interface
- DNS: Domain Name System
- GCP: Google Cloud Platform
- GKE: Google Kubernetes Engine
- HTTP: Hypertext Transfer Protocol
- HTTPS: Hypertext Transfer Protocol Secure
- IP: Internet Protocol
- LB: Load Balancer

---

## Question 1

Interviewer:
Kubernetes architecture: Explain the architecture of Kubernetes, including control plane and worker-node components.

Pause the video and answer this question aloud.

Senior Associate answer:
The control plane consists of the API server (the front door for all cluster interactions), etcd (stores cluster state), the scheduler (assigns pods to nodes), and controller managers (reconcile actual state toward desired state). Worker nodes run the kubelet (talks to the API server and manages containers on that node), a container runtime, and kube-proxy (handles Service networking) - together the control plane decides what should run and workers actually run it.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Kubernetes architecture: Explain the architecture of Kubernetes, including control plane and worker-node components.

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 2

Interviewer:
Kubernetes workload objects: What are Pods, Deployments, ReplicaSets, StatefulSets, and DaemonSets?

Pause the video and answer this question aloud.

Senior Associate answer:
A Pod is the smallest deployable unit, one or more containers sharing network/storage; a ReplicaSet ensures a specified number of identical pod replicas are running; a Deployment manages ReplicaSets and adds rolling update/rollback capability on top; a StatefulSet is like a Deployment but gives pods stable identity and storage for stateful applications; a DaemonSet ensures exactly one pod runs on every (or a selected subset of) node, typically for node-level agents like log collectors.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Kubernetes workload objects: What are Pods, Deployments, ReplicaSets, StatefulSets, and DaemonSets?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 3

Interviewer:
StatefulSet vs Deployment: What is the difference between StatefulSet and Deployment?

Pause the video and answer this question aloud.

Senior Associate answer:
A Deployment treats its pod replicas as interchangeable and stateless - any replica can be replaced without consequence. A StatefulSet gives each pod a stable, unique network identity and a persistent volume tied to that specific pod ordinal, so replacing pod-1 gets the same identity and storage back, which is required for workloads like databases where identity and data continuity matter.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: StatefulSet vs Deployment: What is the difference between StatefulSet and Deployment?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 4

Interviewer:
Kubernetes Service types: What is a Service, and how do ClusterIP, NodePort, and LoadBalancer differ?

Pause the video and answer this question aloud.

Senior Associate answer:
A Service provides a stable network endpoint and DNS name that load-balances traffic across a set of pods matching a label selector, decoupling clients from individual pod IPs that change as pods are rescheduled. ClusterIP (the default) is only reachable inside the cluster; NodePort additionally exposes the service on a static port on every node's IP; LoadBalancer provisions an external cloud load balancer (e.g. a GCP Network/HTTPS LB) that routes external traffic to the service.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Kubernetes Service types: What is a Service, and how do ClusterIP, NodePort, and LoadBalancer differ?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 5

Interviewer:
Kubernetes ConfigMaps and Secrets: What are ConfigMaps and Secrets, and when would you use each?

Pause the video and answer this question aloud.

Senior Associate answer:
ConfigMaps store non-sensitive configuration data (environment variables, config files) that pods can consume as env vars or mounted files; Secrets are structurally similar but intended for sensitive data (though only base64-encoded, not encrypted, by default) like credentials or tokens. Use ConfigMaps for anything safe to view in plaintext, and Secrets (ideally backed by an external secret manager via CSI driver) for anything sensitive.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Kubernetes ConfigMaps and Secrets: What are ConfigMaps and Secrets, and when would you use each?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 6

Interviewer:
Kubernetes Ingress: How does Ingress work, and what components are involved?

Pause the video and answer this question aloud.

Senior Associate answer:
An Ingress resource declares HTTP/HTTPS routing rules (host/path to backend Service mappings), but it's inert on its own - an Ingress controller (nginx-ingress, GKE's native controller, etc.) watches Ingress resources and configures the actual load balancer or proxy to implement those rules, so traffic flows from the external load balancer through the ingress controller to the matching backend Service and finally to pod endpoints.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Kubernetes Ingress: How does Ingress work, and what components are involved?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 7

Interviewer:
Kubernetes rolling updates: How do you perform rolling updates and rollbacks?

Pause the video and answer this question aloud.

Senior Associate answer:
A Deployment's rolling update strategy replaces old pods with new ones incrementally (controlled by maxSurge/maxUnavailable settings) so the service stays available throughout, triggered automatically when you update the Deployment's pod template (e.g. a new image tag). Rollback is `kubectl rollout undo deployment/<name>`, which reverts to the previous ReplicaSet's pod template using the same rolling mechanism, and `kubectl rollout history` shows available revisions to roll back to.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Kubernetes rolling updates: How do you perform rolling updates and rollbacks?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 8

Interviewer:
Kubernetes probes: How do liveness and readiness probes work?

Pause the video and answer this question aloud.

Senior Associate answer:
A liveness probe checks whether a container is still functioning; if it fails repeatedly, Kubernetes restarts the container, since something has likely deadlocked or crashed internally. A readiness probe checks whether a container is ready to receive traffic; if it fails, Kubernetes removes the pod from Service endpoints (without restarting it) until it passes again, which is useful for temporary states like warming a cache or waiting on a dependency.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Kubernetes probes: How do liveness and readiness probes work?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Closing

That completes Episode 16: Kubernetes and GKE Fundamentals Round.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
