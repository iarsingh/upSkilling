# Episode 54: Kubernetes Services, Service Mesh, AKS/GKE, and Terraform Loops Round - Part 1

YouTube title: DevOps Mock Interview Practice | Episode 54: Kubernetes Services, Service Mesh, AKS/GKE, and Terraform Loops Round - Part 1

Estimated duration: 18-23 min

Source round: Mock Interview 51 - Kubernetes Services, Service Mesh, AKS/GKE, and Terraform Loops Round (source set 51)

Focus: Kubernetes Service networking, kube-proxy, cross-namespace DNS, startup ordering, blue-green traffic switching, service mesh, Istio/Anthos Service Mesh, AKS versus GKE operations, Terraform dynamic blocks, for_each, each.value, toset, and repeated S3 resources

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Kubernetes Services, Service Mesh, AKS/GKE, and Terraform Loops Round - Part 1.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- CI: Continuous Integration
- CI/CD: Continuous Integration and Continuous Delivery/Deployment
- DNS: Domain Name System
- GKE: Google Kubernetes Engine
- IP: Internet Protocol
- mTLS: Mutual Transport Layer Security
- TLS: Transport Layer Security

---

## Question 1

Interviewer:
What is kube-proxy?

Pause the video and answer this question aloud.

Senior Associate answer:
kube-proxy is the Kubernetes node-level networking component that watches Services and Endpoints/EndpointSlices, then programs forwarding rules so traffic sent to a Service virtual IP or NodePort is routed to one of the matching backend Pods. Depending on the mode, it uses iptables, IPVS, or platform-specific mechanisms to implement service load balancing.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: What is kube-proxy?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 2

Interviewer:
Suppose there are two Pods running in different namespaces. What DNS name would you use so that one Pod can communicate with the other?

Pause the video and answer this question aloud.

Senior Associate answer:
Use the Service DNS name, not the raw Pod IP. For a Service named backend in namespace app2, a Pod in another namespace can call backend.app2.svc.cluster.local, or usually backend.app2. The full Kubernetes DNS pattern is <service-name>.<namespace>.svc.cluster.local.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Suppose there are two Pods running in different namespaces. What DNS name would you use so that one Pod can communicate with the other?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 3

Interviewer:
There are two applications, a frontend application and a backend application, running in two different Pods. What configuration would you write so that the frontend application starts only after the backend application is up and running?

Pause the video and answer this question aloud.

Senior Associate answer:
In Kubernetes you should not rely on strict Pod startup order for application correctness. Expose the backend through a Service, configure readiness/startup probes on the backend, and make the frontend either retry until the backend Service is ready or use an initContainer that waits for the backend endpoint before starting the main frontend container. For production, readiness probes plus application-level retry/backoff are safer than only an initContainer.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: There are two applications, a frontend application and a backend application, running in two different Pods. What configuration would you write so that the frontend application starts only after the backend application is up and running?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 4

Interviewer:
We mostly follow blue-green deployment. How do you divert traffic from the Blue environment to the Green environment?

Pause the video and answer this question aloud.

Senior Associate answer:
Run both blue and green versions in parallel, validate the green version, then switch the traffic routing layer from blue to green. In Kubernetes this is commonly done by updating the Service selector from labels like version: blue to version: green, or by changing an Ingress/service mesh/load balancer route. Keep blue running briefly so rollback is just switching the selector or route back.

Senior answer structure:
Use this structure: commit trigger -> quality gates -> artifact build -> deployment strategy -> validation and rollback.

Scenario-based practice:
Scenario practice: Imagine a release failed after deployment. Explain how the pipeline should detect it, stop promotion, notify owners, and roll back for: We mostly follow blue-green deployment. How do you divert traffic from the Blue environment to the Green environment?

What interviewer checks:
They are checking whether you can explain the full release path from commit to production with quality gates.

---

## Question 5

Interviewer:
How do Kubernetes Services work, and when would you use ClusterIP, NodePort, LoadBalancer, or headless Service?

Pause the video and answer this question aloud.

Senior Associate answer:
A Kubernetes Service gives stable networking in front of dynamic Pods by selecting ready endpoints through labels and exposing them through a stable DNS name and virtual IP. Use ClusterIP for internal service-to-service traffic, NodePort mainly for simple external exposure or as a building block behind a load balancer, LoadBalancer when the cloud provider should provision an external or internal load balancer, and a headless Service when clients need direct Pod DNS records, often for StatefulSets or service discovery systems.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How do Kubernetes Services work, and when would you use ClusterIP, NodePort, LoadBalancer, or headless Service?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 6

Interviewer:
Scenario: A frontend Pod cannot reach a backend Service in another namespace. How would you troubleshoot it?

Pause the video and answer this question aloud.

Senior Associate answer:
Start with the DNS name and namespace: the frontend should call something like backend.backend-namespace.svc.cluster.local. Then verify the Service exists, its selector matches the backend Pod labels, endpoints or EndpointSlices are populated, backend Pods are Ready, and NetworkPolicies are not blocking traffic. Use kubectl get svc,endpoints,endpointslice,pods -n <namespace>, test DNS with nslookup from a debug Pod, and test connectivity with curl or nc before checking app logs.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: Scenario: A frontend Pod cannot reach a backend Service in another namespace. How would you troubleshoot it?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Question 7

Interviewer:
What is service mesh, and when would you introduce Istio or Anthos Service Mesh into a Kubernetes platform?

Pause the video and answer this question aloud.

Senior Associate answer:
A service mesh adds a dedicated traffic, security, and observability layer for service-to-service communication, usually through sidecars or ambient data-plane components. Introduce Istio or Anthos Service Mesh when teams need mTLS, traffic splitting, retries, timeouts, circuit breaking, request-level telemetry, or consistent policy across many services. Avoid adding it only because it is fashionable; it increases operational complexity, so the use case should justify the extra control plane, debugging model, and upgrade process.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: What is service mesh, and when would you introduce Istio or Anthos Service Mesh into a Kubernetes platform?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 8

Interviewer:
Scenario: After enabling service mesh mTLS, some services start failing. What would you check?

Pause the video and answer this question aloud.

Senior Associate answer:
Check whether both client and server workloads are injected into the mesh, whether PeerAuthentication is set to STRICT or PERMISSIVE, whether DestinationRules use the correct TLS mode, and whether any non-mesh workload is still calling a STRICT mTLS service. Then inspect sidecar logs, Envoy config, service identity, certificates, and policies. A practical mitigation is to roll out mTLS namespace by namespace in PERMISSIVE mode first, observe traffic, then move to STRICT once all callers are mesh-aware.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: Scenario: After enabling service mesh mTLS, some services start failing. What would you check?

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 9

Interviewer:
How would you implement canary or blue-green deployment using Kubernetes Services and service mesh traffic splitting?

Pause the video and answer this question aloud.

Senior Associate answer:
With plain Kubernetes Services, blue-green can be done by running two versions with different labels and switching the Service selector from blue to green after validation. With a service mesh, keep both versions behind the same Service and use routing rules such as Istio VirtualService and DestinationRule to split traffic by percentage, header, user segment, or version. For production, combine this with metrics-based rollback, readiness probes, dashboards, and a fast route or selector rollback path.

Senior answer structure:
Use this structure: Kubernetes object/behavior -> production configuration -> troubleshooting signal -> rollback or scaling consideration.

Scenario-based practice:
Scenario practice: Imagine this issue appears during a production deployment. Explain the exact checks, Kubernetes commands or signals, mitigation, and rollback path for: How would you implement canary or blue-green deployment using Kubernetes Services and service mesh traffic splitting?

What interviewer checks:
They are checking whether you understand Kubernetes objects, runtime behavior, and hands-on troubleshooting.

---

## Closing

That completes Episode 54: Kubernetes Services, Service Mesh, AKS/GKE, and Terraform Loops Round - Part 1.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
