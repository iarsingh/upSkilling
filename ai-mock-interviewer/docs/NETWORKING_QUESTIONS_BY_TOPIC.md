# GCP / Networking Questions by Topic

Auto-generated from `mock-interview-sets.json`. Includes every question whose category name contains "network" (case-insensitive), grouped by its original category tag and deduplicated by exact question text. Regenerate by re-running the extraction script if more networking questions are added to the bank.

Total categories: 13  
Total questions: 106

## Contents

- [Networking](#networking) (51)
- [Multi-Cloud Networking](#multi-cloud-networking) (12)
- [Network Hub Scope](#network-hub-scope) (12)
- [AWS Networking](#aws-networking) (11)
- [Docker/Networking](#dockernetworking) (4)
- [Kubernetes Networking](#kubernetes-networking) (4)
- [Kubernetes/Networking](#kubernetesnetworking) (4)
- [Cloud Networking](#cloud-networking) (2)
- [Networking/Security](#networkingsecurity) (2)
- [GCP/Networking](#gcpnetworking) (1)
- [Hybrid Networking](#hybrid-networking) (1)
- [Kubernetes/NetworkPolicy](#kubernetesnetworkpolicy) (1)
- [Networking/Load Balancer](#networkingload-balancer) (1)

## Networking

1. Ingress controller: How would you debug an ingress path returning 404 or 502, from DNS to load balancer to ingress controller to service endpoints?  
   *(from: Mock Interview 1 - GKE Production Troubleshooting)*
2. VPC Service Controls: When would you use VPC Service Controls, what problems does it solve, and what operational pain can it introduce?  
   *(from: Mock Interview 2 - Terraform and GCP Platform Design)*
3. TLS rotation: How would you rotate TLS certificates for production ingress without downtime?  
   *(from: Mock Interview 3 - SRE Incident and Reliability)*
4. Hybrid connectivity: A service is slow over VPN or Interconnect. How would you troubleshoot latency, MTU, routes, BGP, firewall rules, and DNS?  
   *(from: Mock Interview 5 - Cloud Security and DevSecOps)*
5. Migration: How would you migrate an on-prem application to GCP with minimal downtime? Cover networking, data, CI/CD, observability, security, and rollback.  
   *(from: Mock Interview 6 - Observability and Performance)*
6. GKE troubleshooting: A critical service on GKE has intermittent 5xx errors during traffic spikes. Walk me through your debugging approach from load balancer to pod-level metrics.  
   *(from: Mock Interview 7 - GCP Networking and Load Balancing)*
7. Cloud DNS: A production service intermittently resolves to an old endpoint. How would you debug DNS TTLs, Cloud DNS records, caches, split-horizon DNS, and client behavior?  
   *(from: Mock Interview 7 - GCP Networking and Load Balancing)*
8. CoreDNS incident: Services in a cluster intermittently fail DNS resolution. How would you debug CoreDNS, kube-dns metrics, network policies, and upstream DNS?  
   *(from: Mock Interview 12 - Product Company Final Round)*
9. Hybrid connectivity: How do you connect an on-premises network to a GCP network?  
   *(from: Mock Interview 13 - Recently Asked GCP Access and Security Round)*
10. Shared VPC: Explain Shared VPC and when you would use host and service projects.  
   *(from: Mock Interview 19 - GCP Architecture and IAM Round)*
11. Hub-and-spoke architecture: Explain hub-and-spoke architecture in GCP.  
   *(from: Mock Interview 19 - GCP Architecture and IAM Round)*
12. Hub project resources: How do you deploy shared resources in a hub project?  
   *(from: Mock Interview 19 - GCP Architecture and IAM Round)*
13. Cloud DNS: Explain Cloud DNS.  
   *(from: Mock Interview 19 - GCP Architecture and IAM Round)*
14. Cloud NAT: Explain Cloud NAT and the problem it solves.  
   *(from: Mock Interview 19 - GCP Architecture and IAM Round)*
15. VPN Gateway: Explain VPN Gateway and how it connects networks.  
   *(from: Mock Interview 19 - GCP Architecture and IAM Round)*
16. Cloud Router: Explain Cloud Router and its role with dynamic routing and BGP.  
   *(from: Mock Interview 19 - GCP Architecture and IAM Round)*
17. PSA vs PSC: Explain the difference between Private Service Access (PSA) and Private Service Connect (PSC) in GCP. When would you use each to connect privately to managed services (e.g. Cloud SQL, third-party or your own published services), and what does the network topology look like for both?  
   *(from: Mock Interview 19 - GCP Architecture and IAM Round)*
18. VPC fundamentals: Explain VPC in cloud networking.  
   *(from: Mock Interview 20 - Networking Fundamentals Round)*
19. Public vs private subnet: What is the difference between public and private subnets?  
   *(from: Mock Interview 20 - Networking Fundamentals Round)*
20. Routing fundamentals: Explain routing in a cloud network.  
   *(from: Mock Interview 20 - Networking Fundamentals Round)*
21. VPN connectivity: How does VPN connectivity work between on-premises and cloud?  
   *(from: Mock Interview 20 - Networking Fundamentals Round)*
22. Firewall rules: Explain firewall rules and how you design them safely.  
   *(from: Mock Interview 20 - Networking Fundamentals Round)*
23. DNS resolution: How does DNS resolution work in hybrid or cloud environments?  
   *(from: Mock Interview 20 - Networking Fundamentals Round)*
24. Hybrid connectivity: How do on-premises systems connect to GCP?  
   *(from: Mock Interview 20 - Networking Fundamentals Round)*
25. On-prem to GCP migration: How would you migrate an application from on-premises to GCP?  
   *(from: Mock Interview 22 - Monitoring and Scenario Round)*
26. A service in GKE cannot connect to a database or third-party endpoint. How would you troubleshoot DNS, routes, firewalls, security groups, and application configuration?  
   *(from: Mock Interview 60 - GT Bharat DevSecOps Specialist Engineering Round)*
27. How can you expose a service only to users inside your organization?  
   *(from: Mock Interview 71 - Docker Kubernetes CI/CD DevSecOps Deep Dive)*
28. Private Google Access: What is Private Google Access, why would you enable it on a subnet, and how does it differ from giving an instance a public IP just to reach Google APIs?  
   *(from: Mock Interview 86 - Advanced GCP Networking Round)*
29. VPC Peering vs Shared VPC: How do VPC Peering and Shared VPC differ in GCP, and what would push you to choose one over the other for connecting workloads across projects?  
   *(from: Mock Interview 86 - Advanced GCP Networking Round)*
30. Cloud Interconnect vs Cloud VPN: When would you choose Dedicated Interconnect, Partner Interconnect, or Cloud VPN for connecting on-premises to GCP, and what factors (bandwidth, latency, SLA, cost) drive that choice?  
   *(from: Mock Interview 86 - Advanced GCP Networking Round)*
31. Cloud Load Balancing types: Compare Global external HTTP(S) Load Balancing, regional/internal Load Balancing, TCP/SSL Proxy, and Network Load Balancing in GCP. How would you choose the right one for a given workload?  
   *(from: Mock Interview 86 - Advanced GCP Networking Round)*
32. VPC-native GKE clusters: Why do VPC-native GKE clusters use alias IP ranges instead of routes-based networking, and what problems does that solve at scale?  
   *(from: Mock Interview 86 - Advanced GCP Networking Round)*
33. Serverless VPC Access: How would you let a Cloud Run or Cloud Functions service reach a private resource (e.g. a VM or Cloud SQL instance via private IP) inside a VPC?  
   *(from: Mock Interview 86 - Advanced GCP Networking Round)*
34. Cloud CDN: How does Cloud CDN integrate with GCP load balancing, and how would you design cache keys and invalidation for a mixed static/dynamic site?  
   *(from: Mock Interview 86 - Advanced GCP Networking Round)*
35. Firewall hierarchy: How do Hierarchical Firewall Policies at the organization or folder level interact with VPC-level firewall rules, and how would you design this so teams can't accidentally open a risky port?  
   *(from: Mock Interview 86 - Advanced GCP Networking Round)*
36. VPC Flow Logs: What would you use VPC Flow Logs for in troubleshooting, security investigation, and cost analysis, and what are the trade-offs of enabling them broadly?  
   *(from: Mock Interview 86 - Advanced GCP Networking Round)*
37. Network Intelligence Center: How would you use Network Intelligence Center's connectivity tests and topology view to diagnose a 'service A can't reach service B' problem across projects and VPCs?  
   *(from: Mock Interview 86 - Advanced GCP Networking Round)*
38. Egress control: Compare using Cloud NAT, firewall egress-deny rules, and VPC Service Controls to restrict outbound traffic from a production VPC. When would you combine more than one?  
   *(from: Mock Interview 86 - Advanced GCP Networking Round)*
39. Multi-region network design: How would you design a GCP network (VPC layout, load balancing, DNS, failover) so an application stays available if an entire region becomes unavailable?  
   *(from: Mock Interview 86 - Advanced GCP Networking Round)*
40. Network Connectivity Center: What problem does GCP's Network Connectivity Center (NCC) solve, how does its hub-and-spoke model work for connecting VPCs, on-premises sites, and other clouds, and how does it compare to manually meshing VPC Peering and VPNs together?  
   *(from: Mock Interview 86 - Advanced GCP Networking Round)*
41. Scenario: A newly added subnet's VMs have no public IP and can't reach any Google API, even though an existing GKE workload reaches Google APIs fine over private IP. Walk through your diagnosis.  
   *(from: Mock Interview 87 - GCP Networking Scenario Round)*
42. Scenario: Two VPCs are peered and the peering shows ACTIVE, but a service in VPC A still can't reach a service in VPC B. What would you check (CIDR overlap, custom route export/import, firewall rule scope)?  
   *(from: Mock Interview 87 - GCP Networking Scenario Round)*
43. Scenario: After migrating from Cloud VPN to Dedicated Interconnect, some traffic intermittently still routes over the old VPN tunnel. How would you debug route priority and BGP behavior?  
   *(from: Mock Interview 87 - GCP Networking Scenario Round)*
44. Scenario: Requests to a Global HTTPS Load Balancer intermittently get connection resets, but only from certain regions. How would you debug backend health checks, Cloud CDN cache-fill behavior, and regional backend capacity?  
   *(from: Mock Interview 87 - GCP Networking Scenario Round)*
45. Scenario: A VPC-native GKE cluster runs out of usable Pod IPs and new pods can't schedule even though nodes have CPU/memory headroom. How would you diagnose and fix this?  
   *(from: Mock Interview 87 - GCP Networking Scenario Round)*
46. Scenario: A Cloud Run service using a Serverless VPC Access connector times out under load but works fine at low traffic. What would you check?  
   *(from: Mock Interview 87 - GCP Networking Scenario Round)*
47. Scenario: Firewall rules appear to block SSH from the internet, but an instance is still reachable on port 22 externally. How would you trace hierarchical firewall policy precedence and rule evaluation order to find the gap?  
   *(from: Mock Interview 87 - GCP Networking Scenario Round)*
48. Scenario: VPC Flow Logs show a production service repeatedly connecting to an unexpected external IP outside business hours. How would you investigate and contain it?  
   *(from: Mock Interview 87 - GCP Networking Scenario Round)*
49. Scenario: Network Intelligence Center reports a connectivity test as unreachable between two GKE clusters in different projects on a Shared VPC, but a manual curl from a debug pod worked five minutes earlier. How would you reconcile the two signals and keep debugging?  
   *(from: Mock Interview 87 - GCP Networking Scenario Round)*
50. Scenario: After a region-level outage, DNS failover did not redirect traffic to the healthy region and the app was down for 20 minutes despite a healthy secondary region. How would you redesign for faster or automatic failover?  
   *(from: Mock Interview 87 - GCP Networking Scenario Round)*
51. Scenario: You need to migrate an organization from a legacy single flat VPC to a Shared VPC host/service-project model with zero downtime for existing production workloads. How would you plan and execute this network migration - subnet/CIDR re-planning, firewall rule migration, IAM for host/service projects, and cutover sequencing?  
   *(from: Mock Interview 87 - GCP Networking Scenario Round)*

## Multi-Cloud Networking

1. How would you design secure network connectivity between GCP, AWS, and Azure?  
   *(from: Mock Interview 42 - Multi-Cloud Network Connectivity Risk Round)*
2. What are the main connectivity options for multi-cloud networking, and when would you choose VPN versus dedicated connectivity?  
   *(from: Mock Interview 42 - Multi-Cloud Network Connectivity Risk Round)*
3. How would you plan IP address ranges to avoid overlap across multiple cloud providers and on-premises networks?  
   *(from: Mock Interview 42 - Multi-Cloud Network Connectivity Risk Round)*
4. How would you design routing between GCP Cloud Router, AWS Transit Gateway, Azure Virtual WAN, and on-premises networks?  
   *(from: Mock Interview 42 - Multi-Cloud Network Connectivity Risk Round)*
5. What are the security risks of transitive routing in a multi-cloud network?  
   *(from: Mock Interview 42 - Multi-Cloud Network Connectivity Risk Round)*
6. How would you design DNS resolution across GCP, AWS, Azure, and on-premises environments?  
   *(from: Mock Interview 42 - Multi-Cloud Network Connectivity Risk Round)*
7. How would you segment production, non-production, shared services, and third-party traffic across multiple clouds?  
   *(from: Mock Interview 42 - Multi-Cloud Network Connectivity Risk Round)*
8. How would you design centralized ingress and egress security controls for multi-cloud workloads?  
   *(from: Mock Interview 42 - Multi-Cloud Network Connectivity Risk Round)*
9. How would you monitor multi-cloud network connectivity, latency, packet loss, route changes, and availability?  
   *(from: Mock Interview 42 - Multi-Cloud Network Connectivity Risk Round)*
10. How would you troubleshoot an application latency issue between GCP and AWS?  
   *(from: Mock Interview 42 - Multi-Cloud Network Connectivity Risk Round)*
11. What disaster recovery and resilience considerations apply to multi-cloud connectivity?  
   *(from: Mock Interview 42 - Multi-Cloud Network Connectivity Risk Round)*
12. How would you perform a technology risk assessment for a new multi-cloud network connection?  
   *(from: Mock Interview 42 - Multi-Cloud Network Connectivity Risk Round)*

## Network Hub Scope

1. What is a network hub-and-spoke architecture, and why do organizations use it in GCP?  
   *(from: Mock Interview 40 - Network Hub Scope and Hub-Spoke Risk Round)*
2. What should be included in the scope of a network hub project?  
   *(from: Mock Interview 40 - Network Hub Scope and Hub-Spoke Risk Round)*
3. How would you design Shared VPC with host and service projects for a hub-and-spoke model?  
   *(from: Mock Interview 40 - Network Hub Scope and Hub-Spoke Risk Round)*
4. How does Network Connectivity Center help in a hub-and-spoke network design?  
   *(from: Mock Interview 40 - Network Hub Scope and Hub-Spoke Risk Round)*
5. What are the routing risks in a hub-and-spoke architecture?  
   *(from: Mock Interview 40 - Network Hub Scope and Hub-Spoke Risk Round)*
6. How would you manage firewall rules centrally while still allowing application team ownership?  
   *(from: Mock Interview 40 - Network Hub Scope and Hub-Spoke Risk Round)*
7. How would you design DNS resolution across hub, spoke, on-premises, and private GCP services?  
   *(from: Mock Interview 40 - Network Hub Scope and Hub-Spoke Risk Round)*
8. What are the security risks of VPC peering, and what limitations should you consider?  
   *(from: Mock Interview 40 - Network Hub Scope and Hub-Spoke Risk Round)*
9. How would you design outbound internet access through Cloud NAT or centralized egress controls?  
   *(from: Mock Interview 40 - Network Hub Scope and Hub-Spoke Risk Round)*
10. How do you segment production, non-production, shared services, and third-party connectivity in a hub network?  
   *(from: Mock Interview 40 - Network Hub Scope and Hub-Spoke Risk Round)*
11. What monitoring, logging, and KRIs would you define for network hub risk?  
   *(from: Mock Interview 40 - Network Hub Scope and Hub-Spoke Risk Round)*
12. How would you perform a risk assessment before onboarding a new spoke project or VPC into the hub?  
   *(from: Mock Interview 40 - Network Hub Scope and Hub-Spoke Risk Round)*

## AWS Networking

1. Layer 4 vs Layer 7 Load Balancer.  
   *(from: Mock Interview 78 - Terraform Internals, AWS Networking and Linux Deep Dive)*
2. Which load balancer supports SSL termination?  
   *(from: Mock Interview 78 - Terraform Internals, AWS Networking and Linux Deep Dive)*
3. What backends can be attached to a Layer 7 Load Balancer?  
   *(from: Mock Interview 78 - Terraform Internals, AWS Networking and Linux Deep Dive)*
4. What is an SSL certificate?  
   *(from: Mock Interview 78 - Terraform Internals, AWS Networking and Linux Deep Dive)*
5. How do you obtain an SSL certificate?  
   *(from: Mock Interview 78 - Terraform Internals, AWS Networking and Linux Deep Dive)*
6. What information is required to obtain an SSL certificate?  
   *(from: Mock Interview 78 - Terraform Internals, AWS Networking and Linux Deep Dive)*
7. Design a three-tier application on AWS.  
   *(from: Mock Interview 78 - Terraform Internals, AWS Networking and Linux Deep Dive)*
8. Explain Route53 Resolver Inbound Endpoint.  
   *(from: Mock Interview 78 - Terraform Internals, AWS Networking and Linux Deep Dive)*
9. Explain Route53 Resolver Outbound Endpoint.  
   *(from: Mock Interview 78 - Terraform Internals, AWS Networking and Linux Deep Dive)*
10. Two VPCs need communication. How will you establish connectivity?  
   *(from: Mock Interview 78 - Terraform Internals, AWS Networking and Linux Deep Dive)*
11. What are the limitations of VPC Peering?  
   *(from: Mock Interview 78 - Terraform Internals, AWS Networking and Linux Deep Dive)*

## Docker/Networking

1. Why do we expose ports for a Docker container?  
   *(from: Mock Interview 69 - Terraform Validate Docker Project Round)*
2. What is the difference between internal and external ports?  
   *(from: Mock Interview 69 - Terraform Validate Docker Project Round)*
3. How do you publish a Docker container port to the host?  
   *(from: Mock Interview 71 - Docker Kubernetes CI/CD DevSecOps Deep Dive)*
4. What is the purpose of docker run -p?  
   *(from: Mock Interview 71 - Docker Kubernetes CI/CD DevSecOps Deep Dive)*

## Kubernetes Networking

1. How would you troubleshoot Kubernetes networking issues involving CNI, Services, and Ingress?  
   *(from: Mock Interview 61 - Resilinc GCP Production Incident Round)*
2. How do you expose a service outside the Kubernetes cluster?  
   *(from: Mock Interview 65 - EKS Kubernetes DevOps Operations Round)*
3. How did you manage networking within a Kubernetes cluster?  
   *(from: Mock Interview 79 - GCP Platform, GKE Operations and AI/ML Infrastructure)*
4. How did you manage networking between multiple Kubernetes clusters?  
   *(from: Mock Interview 79 - GCP Platform, GKE Operations and AI/ML Infrastructure)*

## Kubernetes/Networking

1. What is the equivalent of Docker port mapping in Kubernetes?  
   *(from: Mock Interview 71 - Docker Kubernetes CI/CD DevSecOps Deep Dive)*
2. Explain CNI in Kubernetes.  
   *(from: Mock Interview 72 - Kubernetes Terraform Observability and MLOps)*
3. Which CNI have you worked on?  
   *(from: Mock Interview 72 - Kubernetes Terraform Observability and MLOps)*
4. What are the Kubernetes Service types?  
   *(from: Mock Interview 77 - Senior DevOps, GCP, Kubernetes and Terraform Production Round)*

## Cloud Networking

1. What is the difference between AWS VPC, Azure VNet, and GCP VPC?  
   *(from: Mock Interview 72 - Kubernetes Terraform Observability and MLOps)*
2. What is a VPC?  
   *(from: Mock Interview 72 - Kubernetes Terraform Observability and MLOps)*

## Networking/Security

1. Without using SSO or RBAC, how would you restrict access?  
   *(from: Mock Interview 71 - Docker Kubernetes CI/CD DevSecOps Deep Dive)*
2. How would you whitelist an organization's CIDR/IP range?  
   *(from: Mock Interview 71 - Docker Kubernetes CI/CD DevSecOps Deep Dive)*

## GCP/Networking

1. A VM in VPC-A cannot communicate with a VM in VPC-B. How do you troubleshoot it?  
   *(from: Mock Interview 77 - Senior DevOps, GCP, Kubernetes and Terraform Production Round)*

## Hybrid Networking

1. How do you connect on-premises resources with cloud resources?  
   *(from: Mock Interview 72 - Kubernetes Terraform Observability and MLOps)*

## Kubernetes/NetworkPolicy

1. Can NetworkPolicy solve this problem?  
   *(from: Mock Interview 71 - Docker Kubernetes CI/CD DevSecOps Deep Dive)*

## Networking/Load Balancer

1. What is the role of an Internal Load Balancer?  
   *(from: Mock Interview 71 - Docker Kubernetes CI/CD DevSecOps Deep Dive)*

