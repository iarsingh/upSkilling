output "cluster_name" {
  value = google_container_cluster.quiz.name
}

output "cluster_endpoint" {
  value     = google_container_cluster.quiz.endpoint
  sensitive = true
}

output "get_credentials_command" {
  description = "Run this to point kubectl at the new cluster."
  value       = "gcloud container clusters get-credentials ${google_container_cluster.quiz.name} --zone ${var.zone} --project ${var.project_id}"
}

output "artifact_registry_url" {
  description = "Push images here: docker push <this>/quiz-api:<tag>"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.quiz.repository_id}"
}

output "ci_service_account_email" {
  value = google_service_account.ci.email
}
