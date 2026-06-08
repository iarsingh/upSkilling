# GenAI Project: Safety Gateway

## Goal

Build a FastAPI gateway that checks prompts before sending them to a GenAI model and checks responses before returning them.

## Features

- PII redaction for emails and phone numbers
- Basic prompt-injection keyword detection
- Response policy checks
- Audit logging
- Local fallback response
- Optional Gemini generation

## Run Locally

```bash
cd genai-hands-on-projects
pip install -r requirements.txt
cd python/genai-safety-gateway
uvicorn app.main:app --reload --port 8082
```

```bash
curl -X POST http://localhost:8082/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Summarize this deployment incident. Contact me at test@example.com"}'
```

## Interview Talking Points

- Guardrails are layered controls, not a single magic filter.
- Logs should avoid storing raw sensitive prompts.
- Safety checks should run before and after model calls.
- Audit logs help incident response and compliance.

