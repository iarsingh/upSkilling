# Episode 19: GCP Architecture and IAM Round

YouTube title: DevOps Mock Interview Practice | Episode 19: GCP Architecture and IAM Round

Estimated duration: 24-29 min

Source round: Mock Interview 19 - GCP Architecture and IAM Round (source set 19)

Focus: GCP project architecture, Shared VPC, hub-and-spoke, DNS, NAT, VPN, routing, IAM, Cloud Identity, access, monitoring, and security

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing GCP Architecture and IAM Round.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- API: Application Programming Interface
- BGP: Border Gateway Protocol
- DNS: Domain Name System
- GCP: Google Cloud Platform
- GKE: Google Kubernetes Engine
- IAM: Identity and Access Management
- IP: Internet Protocol
- NAT: Network Address Translation
- VPC: Virtual Private Cloud
- VPN: Virtual Private Network

---

## Question 1

Interviewer:
GCP project architecture: Describe a GCP project architecture you have implemented.

Pause the video and answer this question aloud.

Senior Associate answer:
A typical architecture uses a folder hierarchy separating environments (prod/non-prod) and business units, with one project per workload/environment combination rather than shared projects mixing concerns, networking centralized through a Shared VPC host project, and org policies enforced at the folder level so every new project inherits consistent security guardrails automatically rather than requiring manual configuration each time.

Senior answer structure:
Use this structure: direct answer -> real project example -> risk/tradeoff -> validation -> senior ownership point.

Scenario-based practice:
Scenario practice: Convert your answer into a real client situation. Explain the context, your action, the risk you managed, and how you proved success for: GCP project architecture: Describe a GCP project architecture you have implemented.

What interviewer checks:
They are checking whether your answer is structured, practical, and connected to real production work.

---

## Question 2

Interviewer:
Shared VPC: Explain Shared VPC and when you would use host and service projects.

Pause the video and answer this question aloud.

Senior Associate answer:
Shared VPC lets a host project own and manage the VPC network (subnets, firewall rules, routes) while attached service projects deploy their resources (VMs, GKE clusters) into that shared network without owning networking configuration themselves. Use it when you want centralized network governance and consistent IP addressing/firewall policy across many teams' projects, while still giving each team project-level autonomy over their own resources and IAM.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: Shared VPC: Explain Shared VPC and when you would use host and service projects.

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 3

Interviewer:
Hub-and-spoke architecture: Explain hub-and-spoke architecture in GCP.

Pause the video and answer this question aloud.

Senior Associate answer:
Hub-and-spoke centralizes shared services and connectivity in a hub VPC/project, with spoke VPCs (per team or environment) connected to the hub via VPC peering or Shared VPC, so spokes can reach shared resources (like a central NAT gateway, DNS, or security appliances) in the hub without needing direct peering to every other spoke, simplifying network topology and centralizing control over cross-cutting network concerns.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: Hub-and-spoke architecture: Explain hub-and-spoke architecture in GCP.

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 4

Interviewer:
Hub project resources: How do you deploy shared resources in a hub project?

Pause the video and answer this question aloud.

Senior Associate answer:
Deploy resources that need to be centrally managed and consumed by multiple spokes - Cloud NAT, Cloud VPN/Interconnect gateways, centralized DNS, or shared security appliances - in the hub project's VPC, then configure peering or Shared VPC attachment from spoke projects so they can route to and use those shared resources without duplicating them per spoke, which both reduces cost and centralizes operational ownership.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: Hub project resources: How do you deploy shared resources in a hub project?

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 5

Interviewer:
Cloud DNS: Explain Cloud DNS.

Pause the video and answer this question aloud.

Senior Associate answer:
Cloud DNS is GCP's managed, highly available DNS service supporting both public zones (resolvable from the internet) and private zones (resolvable only within specified VPCs), letting you manage DNS records via the same IAM and Terraform tooling as the rest of your GCP infrastructure instead of a separate external DNS provider, with low-latency global anycast resolution.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: Cloud DNS: Explain Cloud DNS.

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 6

Interviewer:
Cloud NAT: Explain Cloud NAT and the problem it solves.

Pause the video and answer this question aloud.

Senior Associate answer:
Cloud NAT provides outbound-only internet connectivity for VMs and GKE nodes that don't have public IP addresses, solving the problem of needing internet egress (for package downloads, external API calls) without exposing those instances directly to inbound internet traffic, which is a core part of running a private-by-default network architecture.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: Cloud NAT: Explain Cloud NAT and the problem it solves.

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 7

Interviewer:
VPN Gateway: Explain VPN Gateway and how it connects networks.

Pause the video and answer this question aloud.

Senior Associate answer:
A Cloud VPN Gateway establishes an encrypted IPsec tunnel between your GCP VPC and an on-premises or another cloud's network device, routing traffic over the public internet but encrypted end-to-end, which lets private resources on both sides communicate securely without provisioning a dedicated physical connection.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: VPN Gateway: Explain VPN Gateway and how it connects networks.

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 8

Interviewer:
Cloud Router: Explain Cloud Router and its role with dynamic routing and BGP.

Pause the video and answer this question aloud.

Senior Associate answer:
Cloud Router enables dynamic routing using BGP, automatically exchanging route information between your GCP VPC and a connected on-premises or partner network over VPN or Interconnect, so route changes on either side propagate automatically rather than requiring manual static route updates - it's what makes hybrid connectivity resilient to topology changes without ongoing manual maintenance.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: Cloud Router: Explain Cloud Router and its role with dynamic routing and BGP.

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 9

Interviewer:
GCP IAM: Explain IAM in GCP and how roles are assigned.

Pause the video and answer this question aloud.

Senior Associate answer:
IAM controls who (a user, group, or service account) can do what (a role, which is a bundle of permissions) on which resource, with bindings assignable at the organization, folder, project, or individual resource level, and permissions inheriting downward through that hierarchy. Roles come in three types - basic (broad, legacy Owner/Editor/Viewer), predefined (curated, service-specific like roles/storage.objectViewer), and custom (organization-defined for precise least-privilege needs).

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: GCP IAM: Explain IAM in GCP and how roles are assigned.

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 10

Interviewer:
Cloud Identity: What is Cloud Identity, and how does it relate to users and groups?

Pause the video and answer this question aloud.

Senior Associate answer:
Cloud Identity is Google's identity management service providing the user and group directory that GCP IAM bindings reference - it's what lets you manage employee accounts, organizational units, and groups centrally (often synced from an existing directory like Active Directory) and then grant IAM roles to those Cloud Identity groups rather than managing permissions per individual user account.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: Cloud Identity: What is Cloud Identity, and how does it relate to users and groups?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 11

Interviewer:
GCP user access: How do you provide read-only or admin access to users safely?

Pause the video and answer this question aloud.

Senior Associate answer:
Grant predefined roles like roles/viewer for read-only access and more specific admin roles (scoped to only the services a user actually needs, not broad Owner/Editor) for elevated access, assigned to groups rather than individual users so access changes with group membership automatically. Use time-bound or just-in-time elevated access for genuinely temporary admin needs rather than standing broad permissions, and review access periodically with IAM Recommender.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: GCP user access: How do you provide read-only or admin access to users safely?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Question 12

Interviewer:
GCP infrastructure security: How do you secure GCP infrastructure?

Pause the video and answer this question aloud.

Senior Associate answer:
Layer defenses: least-privilege IAM enforced via groups and periodic review, org policies restricting risky configurations (public IPs, unrestricted service account keys), network segmentation via Shared VPC and firewall rules, Workload Identity instead of static keys, Binary Authorization for verified deployments, and continuous posture monitoring via Security Command Center with audit logging enabled everywhere. No single control is sufficient - defense in depth across identity, network, and workload layers is the goal.

Senior answer structure:
Use this structure: risk -> control -> implementation -> audit/monitoring -> rollback or exception handling.

Scenario-based practice:
Scenario practice: Imagine this control failed in production and an auditor or client asks for evidence. Explain how you would investigate, fix, document, and prevent recurrence for: GCP infrastructure security: How do you secure GCP infrastructure?

What interviewer checks:
They are checking whether you think in layers: least privilege, secure defaults, auditability, and production risk.

---

## Closing

That completes Episode 19: GCP Architecture and IAM Round.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
