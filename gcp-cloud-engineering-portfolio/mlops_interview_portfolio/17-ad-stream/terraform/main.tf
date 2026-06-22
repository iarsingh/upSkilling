resource "google_pubsub_topic" "clickstream" {
  name = var.clickstream_topic
}

resource "google_bigquery_dataset" "offline_features" {
  dataset_id  = var.offline_feature_dataset
  location    = var.region
  description = "Offline behavioral features for ad recommendation training"
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

resource "google_artifact_registry_repository" "beam_images" {
  location      = var.region
  repository_id = var.beam_repository
  description   = "AdStream Beam and model containers"
  format        = "DOCKER"
}
