terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.30"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_compute_network" "web" {
  name                    = "mig-web-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "web" {
  name          = "mig-web-subnet"
  region        = var.region
  network       = google_compute_network.web.id
  ip_cidr_range = "10.30.0.0/20"
}

resource "google_compute_instance_template" "web" {
  name_prefix  = "web-template-"
  machine_type = "e2-micro"
  tags         = ["web"]

  disk {
    source_image = "debian-cloud/debian-12"
    auto_delete  = true
    boot         = true
  }

  network_interface {
    subnetwork = google_compute_subnetwork.web.id
  }

  metadata_startup_script = <<-EOT
    #!/usr/bin/env bash
    apt-get update
    apt-get install -y nginx
    echo "healthy from $(hostname)" > /var/www/html/index.html
    systemctl enable --now nginx
  EOT

  lifecycle {
    create_before_destroy = true
  }
}

resource "google_compute_region_instance_group_manager" "web" {
  name               = "web-mig"
  region             = var.region
  base_instance_name = "web"
  target_size        = 2

  version {
    instance_template = google_compute_instance_template.web.id
  }
}

resource "google_compute_region_autoscaler" "web" {
  name   = "web-autoscaler"
  region = var.region
  target = google_compute_region_instance_group_manager.web.id

  autoscaling_policy {
    min_replicas    = 2
    max_replicas    = 5
    cooldown_period = 60
    cpu_utilization {
      target = 0.65
    }
  }
}

resource "google_compute_firewall" "allow_http" {
  name    = "allow-http-web"
  network = google_compute_network.web.name
  allow {
    protocol = "tcp"
    ports    = ["80"]
  }
  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["web"]
}

