locals {
  services = toset([
    "aiplatform.googleapis.com",
    "artifactregistry.googleapis.com",
    "compute.googleapis.com",
    "container.googleapis.com",
    "iam.googleapis.com",
    "iamcredentials.googleapis.com",
    "pubsub.googleapis.com",
    "run.googleapis.com",
    "servicenetworking.googleapis.com",
    "sqladmin.googleapis.com",
    "storage.googleapis.com",
    "sts.googleapis.com",
  ])
  labels = {
    environment = var.environment
    managed_by  = "terraform"
    project     = "gke-mlops-pipeline"
  }
}

resource "google_project_service" "services" {
  for_each = local.services

  project            = var.project_id
  service            = each.value
  disable_on_destroy = false
}

resource "google_artifact_registry_repository" "mlops" {
  project       = var.project_id
  location      = var.region
  repository_id = "mlops"
  format        = "DOCKER"
  description   = "Training, serving, and retraining containers"

  depends_on = [google_project_service.services]
}

resource "google_storage_bucket" "model_artifacts" {
  project                     = var.project_id
  name                        = "${var.project_id}-model-artifacts"
  location                    = var.region
  uniform_bucket_level_access = true
  force_destroy               = false
  labels                      = local.labels

  versioning {
    enabled = true
  }

  lifecycle_rule {
    condition {
      num_newer_versions = 10
    }
    action {
      type = "Delete"
    }
  }
}

resource "google_storage_bucket" "mlflow" {
  project                     = var.project_id
  name                        = "${var.project_id}-mlflow"
  location                    = var.region
  uniform_bucket_level_access = true
  force_destroy               = false
  labels                      = local.labels
}

resource "google_storage_bucket" "prediction_logs" {
  project                     = var.project_id
  name                        = "${var.project_id}-prediction-logs"
  location                    = var.region
  uniform_bucket_level_access = true
  force_destroy               = false
  labels                      = local.labels

  lifecycle_rule {
    condition {
      age = 30
    }
    action {
      type = "Delete"
    }
  }
}

resource "google_storage_bucket" "vertex_staging" {
  project                     = var.project_id
  name                        = "${var.project_id}-vertex-staging"
  location                    = var.region
  uniform_bucket_level_access = true
  force_destroy               = false
  labels                      = local.labels
}

resource "google_compute_network" "mlops" {
  project                 = var.project_id
  name                    = "mlops-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "gke" {
  project                  = var.project_id
  name                     = "mlops-gke-subnet"
  region                   = var.region
  network                  = google_compute_network.mlops.id
  ip_cidr_range            = "10.40.0.0/20"
  private_ip_google_access = true

  secondary_ip_range {
    range_name    = "pods"
    ip_cidr_range = "10.50.0.0/16"
  }

  secondary_ip_range {
    range_name    = "services"
    ip_cidr_range = "10.60.0.0/20"
  }
}

resource "google_compute_router" "mlops" {
  project = var.project_id
  name    = "mlops-router"
  region  = var.region
  network = google_compute_network.mlops.id
}

resource "google_compute_router_nat" "mlops" {
  project                            = var.project_id
  name                               = "mlops-nat"
  region                             = var.region
  router                             = google_compute_router.mlops.name
  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"
}

resource "google_service_account" "gke_nodes" {
  project      = var.project_id
  account_id   = "mlops-gke-nodes"
  display_name = "MLOps GKE nodes"
}

resource "google_project_iam_member" "gke_node_roles" {
  for_each = toset([
    "roles/artifactregistry.reader",
    "roles/logging.logWriter",
    "roles/monitoring.metricWriter",
    "roles/stackdriver.resourceMetadata.writer",
  ])

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.gke_nodes.email}"
}

resource "google_container_cluster" "mlops" {
  project  = var.project_id
  name     = "mlops-gke"
  location = var.region

  network    = google_compute_network.mlops.name
  subnetwork = google_compute_subnetwork.gke.name

  remove_default_node_pool = true
  initial_node_count       = 1
  deletion_protection      = true
  networking_mode          = "VPC_NATIVE"
  enable_shielded_nodes    = true

  release_channel {
    channel = "REGULAR"
  }

  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }

  ip_allocation_policy {
    cluster_secondary_range_name  = "pods"
    services_secondary_range_name = "services"
  }

  private_cluster_config {
    enable_private_nodes    = true
    enable_private_endpoint = false
    master_ipv4_cidr_block  = "172.16.1.0/28"
  }

  monitoring_config {
    managed_prometheus {
      enabled = true
    }
  }

  depends_on = [google_project_service.services]
}

resource "google_container_node_pool" "primary" {
  project    = var.project_id
  name       = "mlops-primary"
  cluster    = google_container_cluster.mlops.name
  location   = var.region
  node_count = 1

  autoscaling {
    min_node_count = 1
    max_node_count = 5
  }

  management {
    auto_repair  = true
    auto_upgrade = true
  }

  node_config {
    machine_type    = "e2-standard-4"
    service_account = google_service_account.gke_nodes.email
    oauth_scopes    = ["https://www.googleapis.com/auth/cloud-platform"]

    workload_metadata_config {
      mode = "GKE_METADATA"
    }

    shielded_instance_config {
      enable_secure_boot          = true
      enable_integrity_monitoring = true
    }

    labels = local.labels
  }

  depends_on = [google_project_iam_member.gke_node_roles]
}

resource "google_sql_database_instance" "mlflow" {
  project             = var.project_id
  name                = "mlflow-postgres"
  region              = var.region
  database_version    = "POSTGRES_15"
  deletion_protection = true

  settings {
    tier              = "db-custom-1-3840"
    availability_type = "ZONAL"
    disk_autoresize   = true
    disk_size         = 20
    disk_type         = "PD_SSD"

    backup_configuration {
      enabled                        = true
      point_in_time_recovery_enabled = true
    }

    ip_configuration {
      ipv4_enabled = true
    }
  }

  depends_on = [google_project_service.services]
}

resource "google_sql_database" "mlflow" {
  project  = var.project_id
  name     = "mlflow"
  instance = google_sql_database_instance.mlflow.name
}

resource "google_sql_user" "mlflow" {
  project  = var.project_id
  name     = "mlflow"
  instance = google_sql_database_instance.mlflow.name
  password = var.mlflow_database_password
}

resource "google_service_account" "ml_serving" {
  project      = var.project_id
  account_id   = "ml-serving"
  display_name = "GKE model serving and MLflow"
}

resource "google_service_account" "ml_monitor" {
  project      = var.project_id
  account_id   = "ml-monitor"
  display_name = "GKE model drift monitor"
}

resource "google_service_account" "vertex_training" {
  project      = var.project_id
  account_id   = "vertex-training"
  display_name = "Vertex AI model training"
}

resource "google_service_account" "retrainer" {
  project      = var.project_id
  account_id   = "ml-retrainer"
  display_name = "Cloud Run retraining trigger"
}

resource "google_service_account" "pubsub_push" {
  project      = var.project_id
  account_id   = "pubsub-cloud-run-push"
  display_name = "Pub/Sub authenticated Cloud Run push"
}

resource "google_project_iam_member" "service_roles" {
  for_each = {
    "serving-artifacts"   = ["roles/storage.objectViewer", google_service_account.ml_serving.email]
    "serving-predictions" = ["roles/storage.objectCreator", google_service_account.ml_serving.email]
    "serving-sql"         = ["roles/cloudsql.client", google_service_account.ml_serving.email]
    "monitor-read"        = ["roles/storage.objectViewer", google_service_account.ml_monitor.email]
    "monitor-publish"     = ["roles/pubsub.publisher", google_service_account.ml_monitor.email]
    "vertex-storage"      = ["roles/storage.objectAdmin", google_service_account.vertex_training.email]
    "vertex-aiplatform"   = ["roles/aiplatform.user", google_service_account.vertex_training.email]
    "vertex-images"       = ["roles/artifactregistry.reader", google_service_account.vertex_training.email]
    "retrainer-vertex"    = ["roles/aiplatform.user", google_service_account.retrainer.email]
  }

  project = var.project_id
  role    = each.value[0]
  member  = "serviceAccount:${each.value[1]}"
}

resource "google_service_account_iam_member" "retrainer_uses_vertex_identity" {
  service_account_id = google_service_account.vertex_training.name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${google_service_account.retrainer.email}"
}

resource "google_service_account_iam_member" "serving_workload_identity" {
  service_account_id = google_service_account.ml_serving.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "serviceAccount:${var.project_id}.svc.id.goog[mlops-demo/model-serving]"
}

resource "google_service_account_iam_member" "monitor_workload_identity" {
  service_account_id = google_service_account.ml_monitor.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "serviceAccount:${var.project_id}.svc.id.goog[mlops-demo/drift-monitor]"
}

resource "google_pubsub_topic" "retraining" {
  project = var.project_id
  name    = "model-retraining"
  labels  = local.labels
}

resource "google_cloud_run_v2_service" "retrainer" {
  project  = var.project_id
  name     = "model-retraining-trigger"
  location = var.region

  template {
    service_account = google_service_account.retrainer.email
    timeout         = "300s"

    scaling {
      min_instance_count = 0
      max_instance_count = 3
    }

    containers {
      image = var.retrainer_image_uri

      env {
        name  = "GCP_PROJECT_ID"
        value = var.project_id
      }
      env {
        name  = "GCP_REGION"
        value = var.region
      }
      env {
        name  = "TRAINING_IMAGE_URI"
        value = var.training_image_uri
      }
      env {
        name  = "VERTEX_TRAINING_SERVICE_ACCOUNT"
        value = google_service_account.vertex_training.email
      }
      env {
        name  = "VERTEX_STAGING_BUCKET"
        value = "gs://${google_storage_bucket.vertex_staging.name}"
      }
      env {
        name  = "MODEL_ARTIFACT_PREFIX"
        value = "gs://${google_storage_bucket.model_artifacts.name}/models/diabetes/candidates"
      }
    }
  }

  depends_on = [google_project_service.services]
}

resource "google_cloud_run_v2_service_iam_member" "pubsub_invoker" {
  project  = var.project_id
  location = google_cloud_run_v2_service.retrainer.location
  name     = google_cloud_run_v2_service.retrainer.name
  role     = "roles/run.invoker"
  member   = "serviceAccount:${google_service_account.pubsub_push.email}"
}

resource "google_pubsub_subscription" "retraining_push" {
  project = var.project_id
  name    = "model-retraining-cloud-run"
  topic   = google_pubsub_topic.retraining.name

  ack_deadline_seconds       = 600
  message_retention_duration = "604800s"

  retry_policy {
    minimum_backoff = "10s"
    maximum_backoff = "600s"
  }

  push_config {
    push_endpoint = google_cloud_run_v2_service.retrainer.uri

    oidc_token {
      service_account_email = google_service_account.pubsub_push.email
      audience              = google_cloud_run_v2_service.retrainer.uri
    }
  }

  depends_on = [google_cloud_run_v2_service_iam_member.pubsub_invoker]
}
