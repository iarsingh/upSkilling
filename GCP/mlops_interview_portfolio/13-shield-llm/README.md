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

## Testing and Security Gates

- **Code and unit tests:** validate Python CLIs, policy logic, API handlers, and
  reusable ML utilities with `pytest` before merge.
- **Data and ML tests:** run schema checks, feature freshness checks, drift
  checks, model evaluation, and batch/streaming quality gates with pandas,
  Great Expectations, Evidently, and Vertex AI evaluation metadata.
- **Pipeline tests:** validate Kubeflow/Vertex AI pipeline components,
  container inputs/outputs, retry policy, artifact paths, and promotion evidence
  before production execution.
- **LLM and RAG tests:** evaluate prompt injection, PII leakage, groundedness,
  hallucination, toxicity, retrieval quality, token budget, and agent loop
  limits with Model Armor, Vertex AI Gen AI evaluation, Ragas, or DeepEval.
- **CI/CD security:** scan Terraform, Kubernetes manifests, dependencies, and
  container images using Prisma Cloud, Artifact Analysis, and policy-as-code;
  sign approved images with Cosign.
- **Admission and runtime security:** enforce Binary Authorization, Kubernetes
  network policies, Secret Manager/External Secrets, VPC Service Controls, and
  SentinelOne or Prisma Cloud runtime workload protection on GKE.
- **Release safety:** use canary, shadow, performance, chaos, and rollback tests
  with Cloud Deploy, Cloud Monitoring, OpenTelemetry, Eventarc, and Pub/Sub
  remediation workflows.

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

## Interview Architecture

Explain this as an enterprise control plane for LLM traffic. A FastAPI gateway
on GKE intercepts prompts, guardrail layers evaluate inputs and outputs, Gemini
or open-weight models generate responses, Pub/Sub streams telemetry, BigQuery
stores governance logs, and Vertex AI Metadata records lineage.

## Interview Flow

1. A user or application sends a prompt to the gateway.
2. Input guardrails check prompt injection, PII, toxicity, policy, and context.
3. Safe requests route to Gemini or approved open-weight models.
4. Response guardrails evaluate hallucination, output PII, toxicity, and
   groundedness.
5. Telemetry, tokens, safety scores, prompt versions, and response metadata are
   streamed to Pub/Sub, BigQuery, and Vertex AI Metadata.
