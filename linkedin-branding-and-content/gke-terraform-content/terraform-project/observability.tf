resource "google_monitoring_alert_policy" "gke_high_cpu_allocatable" {
  display_name          = "${var.cluster_name} high node CPU allocation"
  combiner              = "OR"
  enabled               = length(var.notification_channels) > 0
  notification_channels = var.notification_channels
  user_labels           = local.labels

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
    content   = "Node CPU allocation is high. Check pending pods, HPA activity, cluster autoscaler events, quotas, and recent model-serving releases."
    mime_type = "text/markdown"
  }
}

