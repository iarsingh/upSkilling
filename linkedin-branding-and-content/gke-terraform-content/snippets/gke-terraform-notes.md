# Reusable GKE Terraform Notes

## Minimal GKE Module Shape

```hcl
module "gke" {
  source = "./modules/gke"

  project_id = var.project_id
  region     = var.region
  name       = "platform-gke"

  network    = module.vpc.network_name
  subnetwork = module.vpc.subnet_name

  enable_private_nodes    = true
  enable_workload_identity = true
}
```

## Production Defaults Worth Calling Out

- Use VPC-native clusters.
- Prefer private nodes.
- Use separate node pools for system, application, batch, and GPU workloads.
- Use Workload Identity instead of static service account keys.
- Store Terraform state in a remote backend.
- Pin provider and module versions.
- Add labels for ownership, environment, and cost tracking.

## Useful Hashtags

`#GCP` `#GKE` `#Kubernetes` `#Terraform` `#DevOps` `#PlatformEngineering` `#CloudEngineering` `#InfrastructureAsCode`

