output "network_name" {
  value = module.network.network_name
}

output "gke_cluster_name" {
  value = module.gke.cluster_name
}

output "artifact_registry_repository" {
  value = module.artifact_registry.repository_name
}

