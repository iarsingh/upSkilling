resource "google_storage_bucket" "forecast_artifacts" {
  name                        = "${var.project_id}-${var.artifact_bucket_suffix}"
  location                    = var.region
  uniform_bucket_level_access = true
}

resource "google_bigquery_dataset" "forecasting" {
  dataset_id  = var.bigquery_dataset
  location    = var.region
  description = "ChronosSupply training, forecast, and segment evaluation tables"
}

resource "google_redis_instance" "inventory_cache" {
  name           = var.redis_instance_name
  tier           = "BASIC"
  memory_size_gb = 1
  region         = var.region
}
