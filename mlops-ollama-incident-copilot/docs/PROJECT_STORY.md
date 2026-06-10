# Project Story

## Problem

Platform teams need faster triage when service telemetry starts to look risky. Dashboards show symptoms, but responders still need a quick risk signal and a concise action plan.

## Solution

This project predicts incident probability from service telemetry and asks a local Ollama model to turn the prediction into SRE-style remediation guidance.

## Senior engineering choices

- The LLM is not part of the core prediction path. The ML model produces the risk score, while Ollama explains operational actions.
- The API remains available if Ollama is down because the fallback recommendation path is deterministic.
- The model feature list is centralized to prevent training-serving skew.
- Metrics are exported in Prometheus format for local observability.
- Docker Compose mirrors a deployable platform setup without needing cloud infrastructure.

## Demo flow

1. Generate synthetic telemetry data.
2. Train the incident-risk classifier.
3. Start the API locally or through Docker Compose.
4. Send a high-risk payload.
5. Show probability, risk level, Ollama recommendation, health endpoint, and Prometheus metrics.
