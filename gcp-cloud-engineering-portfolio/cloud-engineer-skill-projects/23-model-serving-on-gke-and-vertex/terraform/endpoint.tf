resource "google_vertex_ai_endpoint" "model" {
  name         = "model-serving-endpoint"
  display_name = "model-serving-endpoint"
  location     = var.region
}

