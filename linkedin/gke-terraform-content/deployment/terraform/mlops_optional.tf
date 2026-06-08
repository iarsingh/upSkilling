resource "google_kms_key_ring" "mlops" {
  count = var.enable_kms ? 1 : 0

  name     = "${var.cluster_name}-keys"
  location = var.region

  depends_on = [google_project_service.required]
}

resource "google_kms_crypto_key" "mlops" {
  count = var.enable_kms ? 1 : 0

  name            = "mlops-platform"
  key_ring        = google_kms_key_ring.mlops[0].id
  rotation_period = "7776000s"

  lifecycle {
    prevent_destroy = true
  }
}

resource "google_secret_manager_secret" "mlflow_db_password" {
  count = var.enable_secret_manager ? 1 : 0

  secret_id = "${var.cluster_name}-mlflow-db-password"
  labels    = var.labels

  replication {
    auto {}
  }

  depends_on = [google_project_service.required]
}

resource "google_secret_manager_secret_iam_member" "ml_workloads_secret_access" {
  count = var.enable_secret_manager ? 1 : 0

  secret_id = google_secret_manager_secret.mlflow_db_password[0].id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.ml_workloads.email}"
}

resource "google_compute_global_address" "private_services" {
  count = var.enable_mlflow_cloudsql ? 1 : 0

  name          = "${var.cluster_name}-private-services"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.main.id
}

resource "google_service_networking_connection" "private_services" {
  count = var.enable_mlflow_cloudsql ? 1 : 0

  network                 = google_compute_network.main.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_services[0].name]
}

resource "google_sql_database_instance" "mlflow" {
  count = var.enable_mlflow_cloudsql ? 1 : 0

  name                = "${var.cluster_name}-mlflow"
  database_version    = "POSTGRES_15"
  region              = var.region
  deletion_protection = true

  settings {
    tier              = var.mlflow_db_tier
    availability_type = "ZONAL"
    disk_type         = "PD_SSD"
    disk_size         = 20
    disk_autoresize   = true

    ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.main.id
    }

    backup_configuration {
      enabled                        = true
      point_in_time_recovery_enabled = true
    }

    database_flags {
      name  = "log_min_duration_statement"
      value = "1000"
    }

    user_labels = var.labels
  }

  depends_on = [google_service_networking_connection.private_services]
}

resource "google_sql_database" "mlflow" {
  count = var.enable_mlflow_cloudsql ? 1 : 0

  name     = "mlflow"
  instance = google_sql_database_instance.mlflow[0].name
}

resource "google_dns_managed_zone" "private_mlops" {
  count = var.enable_cloud_dns ? 1 : 0

  name        = "${var.cluster_name}-private-zone"
  dns_name    = var.private_dns_domain
  description = "Private DNS zone for internal GKE MLOps endpoints"
  visibility  = "private"
  labels      = var.labels

  private_visibility_config {
    networks {
      network_url = google_compute_network.main.id
    }
  }
}

resource "google_monitoring_alert_policy" "gke_high_cpu_allocatable" {
  display_name          = "${var.cluster_name} high node CPU allocation"
  combiner              = "OR"
  notification_channels = var.notification_channels
  enabled               = length(var.notification_channels) > 0

  conditions {
    display_name = "High node CPU allocation"

    condition_threshold {
      filter          = "resource.type = \"k8s_node\" AND metric.type = \"kubernetes.io/node/cpu/allocatable_utilization\""
      duration        = "300s"
      comparison      = "COMPARISON_GT"
      threshold_value = 0.85

      aggregations {
        alignment_period   = "60s"
        per_series_aligner = "ALIGN_MEAN"
      }
    }
  }

  documentation {
    content   = "Node CPU allocation is high. Check pending pods, HPA activity, cluster autoscaler events, and recent model-serving releases."
    mime_type = "text/markdown"
  }

  user_labels = var.labels
}

