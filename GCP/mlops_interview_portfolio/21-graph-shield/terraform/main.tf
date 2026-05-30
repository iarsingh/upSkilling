resource "google_pubsub_topic" "transactions" {
  name = var.transaction_topic
}

resource "google_bigtable_instance" "graph_cache" {
  name          = var.bigtable_instance
  instance_type = "DEVELOPMENT"

  cluster {
    cluster_id   = "${var.bigtable_instance}-c1"
    zone         = var.zone
    num_nodes    = 1
    storage_type = "SSD"
  }
}

resource "google_artifact_registry_repository" "graph_services" {
  location      = var.region
  repository_id = var.artifact_repository
  description   = "GraphShield sampler and fraud model containers"
  format        = "DOCKER"
}
