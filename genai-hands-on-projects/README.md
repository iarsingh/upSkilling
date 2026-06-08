# GenAI Hands-On Projects

This folder contains GenAI projects for GCP, Vertex AI/Gemini, MLOps, and AI platform interview preparation.

The projects use local fallbacks so they can run without cloud credentials, and optional Gemini/Vertex AI calls when GCP authentication is configured.

## Projects

- `python/rag-knowledge-api/` - FastAPI RAG API over local documents with optional Gemini answer generation
- `python/genai-safety-gateway/` - prompt safety, PII redaction, response checks, and audit logging gateway
- `python/meeting-notes-summarizer/` - CLI summarizer for transcripts with action-item extraction
- `notebooks/01_prompt_evaluation_lab.ipynb` - prompt evaluation notebook for quality, latency, and cost-style comparison

## Common Setup

```bash
cd genai-hands-on-projects
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Optional Vertex AI Gemini Setup

```bash
gcloud auth application-default login
export GOOGLE_GENAI_USE_VERTEXAI=true
export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"
export GOOGLE_CLOUD_LOCATION="us-central1"
export GENAI_MODEL="gemini-2.5-flash"
```

## Portfolio Story

```text
I built GenAI projects covering RAG, prompt evaluation, safety controls,
audit logging, summarization, and optional Gemini/Vertex AI integration.
Each project has a local fallback so it is testable without cloud access,
but can be connected to GCP for production-style demos.
```

## Interview Topics Covered

- RAG architecture
- Embeddings and retrieval
- Prompt evaluation
- Hallucination risk
- PII redaction
- Guardrails
- Audit logging
- Latency and cost tradeoffs
- GenAI deployment on Cloud Run or GKE

