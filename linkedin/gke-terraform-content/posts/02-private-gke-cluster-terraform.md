# Private GKE Clusters with Terraform

One of the first production decisions for GKE is whether your nodes should have public IP addresses.

In most production setups, I prefer private nodes.

Why?

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

You also need to think about:

- Cloud NAT for outbound internet access
- authorized networks for the control plane
- subnet secondary ranges for pods and services
- access path for engineers and CI/CD systems
- logging and monitoring access

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

#GCP #GKE #Terraform #Kubernetes #CloudSecurity #DevOps

