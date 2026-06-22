resource "google_pubsub_topic" "sensor_telemetry" {
  name = var.telemetry_topic
}

resource "google_bigquery_dataset" "fleet_lakehouse" {
  dataset_id  = var.bigquery_dataset
  location    = var.region
  description = "AeroPredict historical telemetry and offline feature lakehouse"
}

resource "google_bigtable_instance" "online_features" {
  name          = var.bigtable_instance
  instance_type = "DEVELOPMENT"

  cluster {
    cluster_id   = "${var.bigtable_instance}-c1"
    zone         = var.zone
    num_nodes    = 1
    storage_type = "SSD"
  }
}

resource "google_artifact_registry_repository" "fleet_models" {
  location      = var.region
  repository_id = var.model_repository
  description   = "AeroPredict training and serving containers"
  format        = "DOCKER"
}
