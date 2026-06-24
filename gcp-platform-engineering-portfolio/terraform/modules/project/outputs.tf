output "project_id" {
  value       = var.project_id
  description = "Managed GCP project ID"
}

output "enabled_services" {
  value       = keys(google_project_service.services)
  description = "Enabled APIs"
}
