# Episode 20: Networking Fundamentals Round

YouTube title: DevOps Mock Interview Practice | Episode 20: Networking Fundamentals Round

Estimated duration: 14-19 min

Source round: Mock Interview 20 - Networking Fundamentals Round (source set 20)

Focus: VPCs, subnets, routing, VPN, firewall rules, DNS, and hybrid connectivity

## Opening

Hi everyone, welcome back to the DevOps Mock Interview Practice series.

In today's episode, we are practicing Networking Fundamentals Round.
I will ask each question like an interviewer. First, pause the video and answer in your own words. Then continue and compare your answer with the Senior Associate answer.

Speak out loud while practicing. The goal is not only to know the answer, but to sound clear, structured, and confident at a senior associate level.

For every answer, follow this speaking pattern: direct answer, real production example, risk or tradeoff, validation step, and ownership point.

## Abbreviations / Full Forms

- BGP: Border Gateway Protocol
- DNS: Domain Name System
- GCP: Google Cloud Platform
- IP: Internet Protocol
- NAT: Network Address Translation
- TTL: Time To Live
- VPC: Virtual Private Cloud
- VPN: Virtual Private Network

---

## Question 1

Interviewer:
VPC fundamentals: Explain VPC in cloud networking.

Pause the video and answer this question aloud.

Senior Associate answer:
A VPC (Virtual Private Cloud) is a logically isolated, private network within a cloud provider where you define IP address ranges, subnets, routing, and firewall rules for your resources, giving you the same conceptual control as a traditional on-premises network but implemented as software-defined infrastructure that scales globally and integrates with the provider's other managed services.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: VPC fundamentals: Explain VPC in cloud networking.

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 2

Interviewer:
Public vs private subnet: What is the difference between public and private subnets?

Pause the video and answer this question aloud.

Senior Associate answer:
A public subnet's resources can have public IP addresses and are directly reachable from (and can reach) the internet; a private subnet's resources have no public IP and can only reach the internet outbound through a NAT gateway, with no direct inbound path from the internet - private subnets are the default choice for anything that doesn't need to be internet-facing, minimizing exposed attack surface.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: Public vs private subnet: What is the difference between public and private subnets?

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 3

Interviewer:
Routing fundamentals: Explain routing in a cloud network.

Pause the video and answer this question aloud.

Senior Associate answer:
Routing determines the path network traffic takes between subnets, VPCs, and external networks - cloud VPCs come with implicit routes for local subnet traffic, and you add custom static routes (or use dynamic routing via BGP with Cloud Router) for traffic destined to external networks, other VPCs, or on-premises systems, with the routing table ultimately deciding which gateway or next hop handles each packet based on destination IP.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: Routing fundamentals: Explain routing in a cloud network.

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 4

Interviewer:
VPN connectivity: How does VPN connectivity work between on-premises and cloud?

Pause the video and answer this question aloud.

Senior Associate answer:
A VPN gateway on the cloud side and a compatible device on-premises establish an IPsec tunnel over the public internet, encrypting traffic between the two networks so private IP ranges on both sides can communicate as if directly connected. Routes (static or dynamic via BGP) determine which traffic is sent through the tunnel, and redundant tunnels/gateways are typically used for high availability since a single VPN tunnel is a potential single point of failure.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: VPN connectivity: How does VPN connectivity work between on-premises and cloud?

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 5

Interviewer:
Firewall rules: Explain firewall rules and how you design them safely.

Pause the video and answer this question aloud.

Senior Associate answer:
Firewall rules control what traffic is allowed to and from resources based on source/destination, port, protocol, and often network tags or service accounts rather than just IP ranges. Design them safely with a default-deny posture, narrowly scoped allow rules (specific ports and sources, not 0.0.0.0/0 unless genuinely required), tag or service-account-based rules for easier management at scale, and regular review/cleanup of unused rules since firewall configuration tends to accumulate cruft over time.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: Firewall rules: Explain firewall rules and how you design them safely.

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 6

Interviewer:
DNS resolution: How does DNS resolution work in hybrid or cloud environments?

Pause the video and answer this question aloud.

Senior Associate answer:
In hybrid environments, DNS resolution needs a strategy for which resolver handles which domains - typically split-horizon DNS where internal/private zones resolve via Cloud DNS private zones or forwarding to on-premises DNS servers for on-prem domains, while public domains resolve normally. Getting this wrong (or having TTL/caching mismatches) is a common source of intermittent connectivity issues that look like network problems but are actually resolution problems.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: DNS resolution: How does DNS resolution work in hybrid or cloud environments?

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Question 7

Interviewer:
Hybrid connectivity: How do on-premises systems connect to GCP?

Pause the video and answer this question aloud.

Senior Associate answer:
On-premises systems connect via Cloud VPN (IPsec tunnels over the internet, simpler and lower cost), Dedicated Interconnect (a direct physical connection for high bandwidth and low latency), or Partner Interconnect (through a supported service provider when direct connection isn't feasible) - the choice depends on required bandwidth, latency sensitivity, and budget, with Cloud Router providing dynamic BGP routing on top of any of these options.

Senior answer structure:
Use this structure: traffic path -> routing/security boundary -> failure point -> verification command or metric -> mitigation.

Scenario-based practice:
Scenario practice: Imagine users report intermittent connectivity or latency. Walk through DNS, routing, firewall, load balancer, and backend checks for: Hybrid connectivity: How do on-premises systems connect to GCP?

What interviewer checks:
They are checking whether you can reason through traffic flow, boundaries, routing, and failure points.

---

## Closing

That completes Episode 20: Networking Fundamentals Round.

Your practice task is to answer the same questions again without reading the sample answers. Record yourself once, listen to your answer, and improve it using this structure:

1. Give the direct answer.
2. Add a real production or client scenario.
3. Explain tools, services, commands, or architecture decisions.
4. Mention risk, tradeoff, security, monitoring, rollback, reliability, or cost.
5. End with how you validated success or communicated ownership.

In the next episode, continue with another mock interview round and keep practicing aloud.
