# Private GKE Clusters with Terraform

One of the first production decisions for GKE is whether your nodes should have public IP addresses.

In most production setups, I prefer private nodes.

Answer:

A private GKE cluster reduces public exposure by keeping worker nodes off the public internet. Terraform makes that design explicit, repeatable, and reviewable instead of relying on someone remembering the right console options.

Architecture flow:

```text
Private VPC subnet
        ↓
Secondary ranges for pods and services
        ↓
Private GKE nodes
        ↓
Cloud NAT for controlled outbound access
        ↓
Workload Identity for pod-to-GCP permissions
        ↓
Authorized access path for CI/CD and platform engineers
        ↓
Centralized logs, metrics, and audit trails
```

Why it helps:

- smaller public attack surface
- better control over outbound traffic
- cleaner network boundaries
- easier alignment with enterprise security rules

With Terraform, that decision becomes explicit:

```hcl
private_cluster_config {
  enable_private_nodes    = true
  enable_private_endpoint = false
  master_ipv4_cidr_block  = "172.16.0.0/28"
}
```

But private GKE is not just one Terraform block.

Production checklist:

- Cloud NAT for outbound internet access
- authorized networks for the control plane
- subnet secondary ranges for pods and services
- access path for engineers and CI/CD systems
- logging and monitoring access
- Workload Identity instead of long-lived service account keys
- firewall rules that match real access patterns

The pattern I like:

```text
Private GKE nodes
VPC-native networking
Cloud NAT for egress
Workload Identity for pod permissions
CI/CD access through controlled identity
```

Private clusters are not about making infrastructure harder to use.

They are about making the secure path the default path.

Before creating a private GKE cluster, I always ask:

- Who needs cluster API access?
- How will CI/CD deploy?
- How will nodes reach registries and APIs?
- How will incidents be debugged without public node access?

#GCP #GKE #Terraform #Kubernetes #CloudSecurity #DevOps
