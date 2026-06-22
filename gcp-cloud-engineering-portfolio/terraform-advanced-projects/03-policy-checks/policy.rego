package terraform.gcp

deny[msg] {
  resource := input.resource_changes[_]
  resource.type == "google_compute_firewall"
  resource.change.after.source_ranges[_] == "0.0.0.0/0"
  resource.change.after.allow[_].ports[_] == "22"
  msg := "SSH must not be open to the internet"
}

