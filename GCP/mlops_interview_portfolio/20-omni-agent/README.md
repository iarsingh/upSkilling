# OmniAgent

Multi-agent enterprise orchestration engine and security guardrail platform.

OmniAgent is a platform-engineering and LLMOps blueprint for building,
deploying, scaling, and monitoring network-isolated autonomous AI agents that
interact safely with private enterprise databases. It focuses on agentic
governance, private grounding, token/cost control, agent loop safety, and
runtime security on Google Cloud.

## What It Demonstrates

- Vertex AI Agent Engine and Agent Studio orchestration
- Multi-agent roles: analyst, validator, execution, and policy agents
- Gemini APIs and open-weight models served with vLLM on GKE Enterprise
- Vertex AI Vector Search for private RAG grounding
- Cloud Build doc-sync pipeline for markdown-to-embedding updates
- GKE API gateway for prompt/response interception
- Secret Manager injection and real-time PII sanitization
- Private Service Connect for private agent-to-agent communication
- BigQuery telemetry for tokens, latency, hallucination, and tool-call loops
- Eventarc and Cloud Logging self-healing for runaway agent sessions

## Architecture

```mermaid
flowchart LR
    A[Enterprise User] --> B[GKE API Gateway]
    B --> C[Sanitization + Token Policy]
    C --> D[Vertex AI Agent Engine]
    D --> E[Analyst Agent]
    D --> F[Validator Agent]
    D --> G[Execution Agent]
    E --> H[Vertex AI Gemini]
    F --> I[vLLM on GKE Enterprise]
    G --> J[Private Enterprise DB]
    K[Markdown Docs in Git] --> L[Cloud Build Embedding Sync]
    L --> M[Vertex AI Vector Search]
    M --> D
    D --> N[BigQuery Agent Telemetry]
    N --> O[Cloud Logging + Eventarc]
    O --> P[Self-Healing Rollback or Pod Termination]
```

## Run

```bash
python3 src/omni_agent_gate.py evaluate \
  --release examples/agent_platform_release.json
```

## Interview Architecture

Explain this as a secure agent platform rather than a single chatbot. Vertex AI
Agent Engine coordinates agents, Gemini and vLLM provide model backends, Vector
Search grounds agents with private context, a GKE gateway enforces privacy and
token controls, PSC keeps communication private, and BigQuery/Eventarc power
telemetry and self-healing.

## Interview Flow

1. A user request enters through the GKE API gateway.
2. The gateway sanitizes PII, injects approved secrets, and applies token policy.
3. Vertex AI Agent Engine coordinates analyst, validator, and execution agents.
4. Agents retrieve grounded context from Vertex AI Vector Search and call Gemini
   or vLLM-hosted open-weight models.
5. Tool calls to private databases stay inside PSC-protected private networking.
6. BigQuery receives token, latency, hallucination, and loop telemetry.
7. Eventarc terminates runaway sessions or rolls back unhealthy agent versions.

## Interview Talking Points

- Enterprise agents need platform controls: privacy, routing, grounding,
  telemetry, quota enforcement, and rollback.
- Agent loop detection is a production reliability concern, not a UX feature.
- Private Service Connect and sanitization protect enterprise data boundaries.
- Agentic systems need both LLMOps governance and SRE-style runtime controls.
