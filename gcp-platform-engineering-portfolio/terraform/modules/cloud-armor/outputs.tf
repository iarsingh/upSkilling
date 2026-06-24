output "policy_name" {
  value = google_compute_security_policy.this.name
}

output "global_ip_name" {
  value = google_compute_global_address.this.name
}

output "global_ip_address" {
  value = google_compute_global_address.this.address
}
