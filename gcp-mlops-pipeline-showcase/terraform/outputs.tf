output "gke_cluster_name" {
  value = google_container_cluster.mlops.name
}

output "artifact_registry_repository" {
  value = google_artifact_registry_repository.mlops.name
}

output "model_artifacts_bucket" {
  value = google_storage_bucket.model_artifacts.name
}

output "mlflow_bucket" {
  value = google_storage_bucket.mlflow.name
}

output "prediction_logs_bucket" {
  value = google_storage_bucket.prediction_logs.name
}

output "cloud_run_retrainer_url" {
  value = google_cloud_run_v2_service.retrainer.uri
}

output "mlflow_database_connection_name" {
  value = google_sql_database_instance.mlflow.connection_name
}

output "serving_service_account" {
  value = google_service_account.ml_serving.email
}

output "monitor_service_account" {
  value = google_service_account.ml_monitor.email
}
