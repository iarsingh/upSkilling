resource "google_compute_network" "quiz_vpc" {
  name                    = "quiz-vpc-${var.environment}"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "quiz_subnet" {
  name          = "quiz-subnet-${var.environment}"
  network       = google_compute_network.quiz_vpc.id
  region        = var.region
  ip_cidr_range = "10.10.0.0/20"

  # Secondary ranges GKE needs for VPC-native (alias IP) pods/services.
  secondary_ip_range {
    range_name    = "pods"
    ip_cidr_range = "10.20.0.0/16"
  }
  secondary_ip_range {
    range_name    = "services"
    ip_cidr_range = "10.30.0.0/20"
  }

  private_ip_google_access = true
}

resource "google_compute_router" "quiz_router" {
  name    = "quiz-router-${var.environment}"
  region  = var.region
  network = google_compute_network.quiz_vpc.id
}

# Lets nodes without external IPs reach the internet (image pulls, apt, etc.)
resource "google_compute_router_nat" "quiz_nat" {
  name                               = "quiz-nat-${var.environment}"
  router                             = google_compute_router.quiz_router.name
  region                             = var.region
  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"
}
