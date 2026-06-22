output "forecast_artifacts_bucket" {
  value = google_storage_bucket.forecast_artifacts.name
}

output "forecasting_dataset" {
  value = google_bigquery_dataset.forecasting.dataset_id
}

output "inventory_cache" {
  value = google_redis_instance.inventory_cache.name
}
