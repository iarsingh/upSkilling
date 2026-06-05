resource "google_compute_network" "this" {
  name                    = var.name
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "primary" {
  name                     = "${var.name}-${var.region}"
  region                   = var.region
  ip_cidr_range            = var.cidr
  network                  = google_compute_network.this.id
  private_ip_google_access = true
}

