output "cluster_name" {
  value       = google_container_cluster.ml_platform.name
  description = "GKE cluster name."
}

output "model_artifacts_bucket" {
  value       = google_storage_bucket.model_artifacts.name
  description = "Versioned GCS bucket for model artifacts."
}

output "workload_service_account" {
  value       = google_service_account.ml_workload.email
  description = "GCP service account for ML workloads."
}
