resource "google_secret_manager_secret" "mlflow_db_password" {
  secret_id = "${var.cluster_name}-mlflow-db-password"
  labels    = local.labels

  replication {
    auto {}
  }

  depends_on = [google_project_service.required]
}

resource "google_secret_manager_secret_iam_member" "ml_workloads_secret_access" {
  secret_id = google_secret_manager_secret.mlflow_db_password.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.ml_workloads.email}"
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
    user_labels       = local.labels

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
  }

  depends_on = [google_service_networking_connection.private_services]
}

resource "google_sql_database" "mlflow" {
  count = var.enable_mlflow_cloudsql ? 1 : 0

  name     = "mlflow"
  instance = google_sql_database_instance.mlflow[0].name
}

resource "google_dns_managed_zone" "private_mlops" {
  count = var.enable_private_dns ? 1 : 0

  name        = "${var.cluster_name}-private-zone"
  dns_name    = var.private_dns_domain
  description = "Private DNS zone for internal MLOps services"
  visibility  = "private"
  labels      = local.labels

  private_visibility_config {
    networks {
      network_url = google_compute_network.main.id
    }
  }
}

