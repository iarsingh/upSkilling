# Private GKE Clusters With Terraform

🔐 Private GKE is not just a security checkbox.

It is an architecture decision about how workloads, engineers, CI/CD systems, registries, APIs, and incident responders reach the cluster.

For production, I usually prefer private nodes.
But I do not treat `enable_private_nodes = true` as the full design.

Architect view:

A private GKE cluster should make the secure path the default path without making the platform impossible to operate.

The architecture flow:

```text
Custom VPC
        ↓
Subnet with secondary ranges for pods and services
        ↓
Private GKE nodes
        ↓
Cloud NAT for controlled outbound access
        ↓
Artifact Registry / Google APIs / external dependencies
        ↓
Workload Identity for pod-to-GCP access
        ↓
Controlled engineer and CI/CD access to the cluster API
        ↓
Centralized logs, metrics, audit trails, and runbooks
```

Terraform makes this design explicit:

```hcl
private_cluster_config {
  enable_private_nodes    = true
  enable_private_endpoint = false
  master_ipv4_cidr_block  = "172.16.0.0/28"
}
```

But the senior-level checklist is bigger:

1. Do nodes have controlled egress through Cloud NAT?
2. Can pods pull images from Artifact Registry?
3. Are pod and service ranges sized for future growth?
4. Who can access the control plane, and from where?
5. How will CI/CD deploy without broad network access?
6. Are GCP permissions handled through Workload Identity?
7. Can incidents be debugged without SSH or public node access?
8. Are logs, metrics, and audit trails available during failure?

Tradeoff:

A private cluster reduces exposure, but it also forces you to design access properly.
That is a good thing.

The mistake:

Creating a private cluster and then adding shortcuts everywhere because the operating model was never planned.

My production question before enabling private GKE:

"Can the platform still deploy, observe, debug, and recover safely when there are no public nodes?"

If the answer is yes, the design is moving in the right direction.

#GCP #GKE #Terraform #Kubernetes #CloudSecurity #PlatformEngineering
