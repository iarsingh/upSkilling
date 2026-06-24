resource "google_compute_security_policy" "this" {
  project     = var.project_id
  name        = var.name
  description = "Cloud Armor policy for the platform sample API"

  rule {
    action   = "deny(403)"
    priority = 1000

    match {
      expr {
        expression = "evaluatePreconfiguredWaf('sqli-v33-stable')"
      }
    }

    description = "Block common SQL injection attacks"
  }

  rule {
    action   = "deny(403)"
    priority = 1100

    match {
      expr {
        expression = "evaluatePreconfiguredWaf('xss-v33-stable')"
      }
    }

    description = "Block common cross-site scripting attacks"
  }

  rule {
    action   = "throttle"
    priority = 2000

    match {
      versioned_expr = "SRC_IPS_V1"

      config {
        src_ip_ranges = ["*"]
      }
    }

    rate_limit_options {
      conform_action = "allow"
      exceed_action  = "deny(429)"

      rate_limit_threshold {
        count        = 300
        interval_sec = 60
      }

      enforce_on_key = "IP"
    }

    description = "Rate limit clients by source IP"
  }

  rule {
    action   = "allow"
    priority = 2147483647

    match {
      versioned_expr = "SRC_IPS_V1"

      config {
        src_ip_ranges = ["*"]
      }
    }

    description = "Default allow rule"
  }
}

resource "google_compute_global_address" "this" {
  project = var.project_id
  name    = var.address_name
}
