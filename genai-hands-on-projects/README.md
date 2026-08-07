# GenAI Hands-On Projects

Four small, independently runnable GenAI services and one evaluation notebook, built for GCP / Vertex AI /
Gemini and AI-platform interview preparation. Every project runs fully offline with a local fallback, and
optionally calls Gemini through Vertex AI when GCP credentials are configured.

## Projects

| Project | What it demonstrates | Run |
|---|---|---|
| [`python/rag-knowledge-api/`](python/rag-knowledge-api/) | Baseline RAG: TF-IDF retrieval, single-turn Q&A | `uvicorn app.main:app --port 8081` |
| [`python/rag-chat-assistant/`](python/rag-chat-assistant/) | RAG with a persisted vector store (Chroma) and multi-turn chat memory | `uvicorn app.main:app --port 8082` |
| [`python/genai-safety-gateway/`](python/genai-safety-gateway/) | Prompt/response guardrails: PII redaction, injection detection, audit logging | `uvicorn app.main:app --port 8083` |
| [`python/meeting-notes-summarizer/`](python/meeting-notes-summarizer/) | Structured summarization CLI (decisions/risks/action items) | `python3 summarize.py --input <file>` |
| [`notebooks/01_prompt_evaluation_lab.ipynb`](notebooks/01_prompt_evaluation_lab.ipynb) | Prompt evaluation across quality, latency, and cost | `jupyter lab` |

Each sub-project's own README has the full run instructions, an example request/response, and an
"Interview Talking Points" section. `rag-knowledge-api` and `rag-chat-assistant` are meant to be compared
directly — same problem (RAG), two different retrieval architectures.

## Common Setup

```bash
cd genai-hands-on-projects
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Optional Vertex AI Gemini Setup

Every project defaults to a local, dependency-free fallback and needs no credentials to run. To generate
with Gemini instead:

```bash
gcloud auth application-default login
export GOOGLE_GENAI_USE_VERTEXAI=true
export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"
export GOOGLE_CLOUD_LOCATION="us-central1"
export GENAI_MODEL="gemini-2.5-flash"
```

Then set `USE_GEMINI=true` for the specific project you're running (see its README).

## Portfolio Story

```text
I built four GenAI services that each demonstrate a distinct concept: baseline RAG,
vector-store RAG with conversational memory, layered safety guardrails, and structured
summarization. Every one has a local fallback so it's testable without cloud access,
and an optional Gemini/Vertex AI integration to demo the production path.
```

## Interview Topics Covered

- RAG architecture, and TF-IDF vs. vector-embedding retrieval tradeoffs
- Vector search, ANN indexing, and persistence
- Conversational memory strategies (sliding window vs. full replay vs. summarization)
- Prompt evaluation (quality, latency, cost)
- Guardrails: PII redaction, prompt-injection detection, output policy checks
- Audit logging for compliance and incident response
- Structured summarization and downstream automation
- GenAI deployment on Cloud Run or GKE
