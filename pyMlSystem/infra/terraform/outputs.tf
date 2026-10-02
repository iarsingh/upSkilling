output "cluster_name" { value = google_container_cluster.main.name }
output "region" { value = var.region }
output "image_repository" { value = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.images.repository_id}" }
output "model_bucket" { value = google_storage_bucket.models.name }
output "sql_connection_name" { value = google_sql_database_instance.main.connection_name }
output "api_service_account" { value = google_service_account.api.email }
