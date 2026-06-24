output "project_id" {
  value = module.project.project_id
}

output "network_name" {
  value = module.network.network_name
}

output "gke_cluster_name" {
  value = module.gke.cluster_name
}

output "gke_node_service_account" {
  value = module.gke.node_service_account
}

output "application_service_account" {
  value = module.workload_identity.email
}

output "artifact_registry_repository" {
  value = module.artifact_registry.repository_name
}

output "cloud_armor_policy" {
  value = module.cloud_armor.policy_name
}

output "application_global_ip" {
  value = module.cloud_armor.global_ip_address
}
