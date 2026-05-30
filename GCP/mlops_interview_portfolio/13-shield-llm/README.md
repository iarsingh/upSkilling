# ShieldLLM

Enterprise generative AI gateway and guardrails evaluation platform on GCP.

ShieldLLM protects organizational LLM usage with a low-latency FastAPI gateway
on GKE, Vertex AI Gemini and open-weight model routing, a 9-layer asynchronous
evaluation pipeline, prompt/response telemetry, and governance logs in BigQuery
and Vertex AI Metadata.

## What It Demonstrates

- GKE-hosted LLM gateway architecture
- Prompt injection, PII, toxicity, policy, and context checks
- Ragas/DeepEval-style response evaluation readiness
- Pub/Sub streaming telemetry into BigQuery
- Vertex AI Metadata lineage for prompt, response, and safety scores
- Latency and safety gates before enterprise rollout

## Run

```bash
python3 src/shield_llm_gate.py evaluate \
  --policy examples/gateway_policy.json
```

## Interview Talking Points

- LLMOps governance needs gateway controls, not only model evaluation notebooks.
- Safety telemetry should be queryable, auditable, and linked to metadata.
- Async evaluation keeps gateway latency low while still creating compliance
  evidence.
- Gemini and open-weight models can share the same policy control plane.
