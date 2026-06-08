output "cluster_name" {
  value = google_container_cluster.main.name
}

output "cluster_region" {
  value = var.region
}

output "network_name" {
  value = google_compute_network.main.name
}

output "subnet_name" {
  value = google_compute_subnetwork.gke.name
}

output "artifact_registry_repository" {
  value = google_artifact_registry_repository.containers.name
}

output "model_artifact_bucket" {
  value = google_storage_bucket.model_artifacts.name
}

output "ml_workload_service_account" {
  value = google_service_account.ml_workloads.email
}

output "kms_crypto_key" {
  value = google_kms_crypto_key.mlops.id
}

output "mlflow_cloudsql_instance" {
  value = var.enable_mlflow_cloudsql ? google_sql_database_instance.mlflow[0].connection_name : null
}

output "private_dns_zone" {
  value = var.enable_private_dns ? google_dns_managed_zone.private_mlops[0].name : null
}

output "get_credentials_command" {
  value = "gcloud container clusters get-credentials ${google_container_cluster.main.name} --region ${var.region} --project ${var.project_id}"
}

