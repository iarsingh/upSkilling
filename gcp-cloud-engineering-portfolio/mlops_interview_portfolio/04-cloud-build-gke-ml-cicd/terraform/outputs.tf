output "artifact_registry_repository" {
  value       = google_artifact_registry_repository.ml_services.name
  description = "Artifact Registry repository for ML service images."
}

output "cloud_build_deployer" {
  value       = google_service_account.cloud_build_deployer.email
  description = "Service account intended for Cloud Build deployments."
}
