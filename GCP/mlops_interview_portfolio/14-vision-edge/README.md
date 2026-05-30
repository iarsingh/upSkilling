# VisionEdge

Hybrid cloud-edge vision pipeline for industrial quality control.

VisionEdge trains GPU-accelerated computer vision anomaly models in GCP,
optimizes them for constrained edge hardware, deploys them through GKE
Enterprise/Anthos patterns, and streams uncertainty and drift telemetry back to
the cloud for selective retraining.

## What It Demonstrates

- Vertex AI Custom Training for YOLO/ResNet-style defect models
- Cloud Storage raw image lake and defect dataset lineage
- TensorRT and Edge TPU optimization gates
- Artifact Registry container promotion
- Anthos/GKE Enterprise edge deployment strategy
- MQTT/Pub/Sub telemetry from edge devices
- Sub-10ms local inference gate
- Selective data collection and retraining triggers

## Run

```bash
python3 src/vision_edge_gate.py evaluate \
  --release examples/edge_release.json
```

## Interview Talking Points

- Edge MLOps is a different operating model: latency, bandwidth, offline
  tolerance, and zero-downtime factory requirements matter.
- Centralized cloud training must be paired with local inference validation.
- Uncertainty and drift telemetry should decide what data is collected, not raw
  image uploads from every device.
- Model optimization is a release gate, not a post-processing step.
