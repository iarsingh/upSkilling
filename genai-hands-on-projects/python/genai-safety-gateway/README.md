# GenAI Project: Safety Gateway

A FastAPI gateway that screens prompts and responses around a GenAI call — PII redaction, prompt-injection
detection, output policy checks, and structured audit logging — with a local fallback so it runs with no
API key.

## How It Works

```text
Client request
  -> redact PII (email, phone) from the prompt
  -> evaluate prompt against blocklist (prompt-injection keywords)
  -> if blocked: return policy message, skip the model call
  -> if allowed: generate (Gemini if USE_GEMINI=true, else local fallback)
  -> evaluate response against a separate output blocklist (leaked secrets/keys)
  -> write a structured audit record (audit_log.jsonl)
  -> return response + both policy decisions + latency
```

Guardrails run **before and after** the model call — input safety and output safety are independent checks,
not one filter reused twice.

## Tech Stack

- FastAPI + Pydantic
- Regex-based PII redaction and keyword-based policy checks (dependency-free, deterministic)
- `google-genai` SDK for optional Gemini generation
- JSONL audit log (no database required)

## Quick Start

```bash
cd genai-hands-on-projects
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

cd python/genai-safety-gateway
uvicorn app.main:app --reload --port 8083
```

```bash
curl -X POST http://localhost:8083/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Summarize this deployment incident. Contact me at test@example.com"}'
```

Expected response shape:

```json
{
  "request_id": "…",
  "response": "Local fallback response. Safe prompt after redaction: Summarize this deployment incident. Contact me at [REDACTED_EMAIL]",
  "input_policy": {"blocked": false, "reasons": []},
  "output_policy": {"blocked": false, "reasons": []},
  "latency_ms": 0
}
```

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `USE_GEMINI` | `false` | Generate with Gemini instead of the local fallback |
| `GENAI_MODEL` | `gemini-2.5-flash` | Model name used when Gemini mode is enabled |
| `GOOGLE_GENAI_USE_VERTEXAI`, `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION` | — | Vertex AI auth for Gemini mode |

## What's Actually Checked

- **Input**: blocks on keyword matches like `ignore previous instructions`, `reveal secrets`, `print api key`, `disable safety` — a real system should back this with an actual classifier, not just a keyword list.
- **Output**: blocks on leaked-secret patterns like `api_key=`, `password=`, `private key`.
- **PII redaction**: regex-based email and phone number masking, applied before the prompt reaches the model.
- **Audit log**: every request appends one JSON line to `audit_log.jsonl` with request ID, model used, latency, and both policy decisions — enough to reconstruct what happened without storing the raw prompt content itself.

## Interview Talking Points

- Guardrails are layered controls (redact -> input check -> generate -> output check), not a single magic filter.
- Logs should support incident response and compliance without becoming a second copy of sensitive data.
- Keyword-based detection is a starting point for a demo; production systems pair it with a trained classifier or a dedicated moderation model, since keyword lists are trivially bypassed by rephrasing.

## Limitations & Next Steps

- Keyword lists are illustrative, not a production-grade prompt-injection or DLP solution.
- No rate limiting or auth on the gateway itself — assumed to sit behind an API gateway/ingress that handles that.
- Next step: swap the keyword checks for an actual classifier (e.g. a small fine-tuned model or a hosted moderation API) and compare precision/recall against the current approach.
