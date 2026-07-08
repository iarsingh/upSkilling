# RAG Deployment Projects

A growing collection of deployable RAG (Retrieval-Augmented Generation) applications, each built around
real user input (uploaded files, not pre-baked content) rather than a fixed local corpus. This is a
companion collection to [`genai-hands-on-projects`](../genai-hands-on-projects/) and
[`rag-llm-platform`](../rag-llm-platform/) - those focus on RAG architecture and multi-LLM concepts over a
static document set; this folder focuses on ingestion-driven RAG apps you'd actually hand to a user.

## Projects

| Project | What it does | Run |
|---|---|---|
| [`python/pdf-rag-reader/`](python/pdf-rag-reader/) | Upload a PDF, ask questions grounded in it, page-cited answers, multi-turn chat memory | `uvicorn app.main:app --port 8091` |

More projects will be added here over time (candidates: CSV/spreadsheet Q&A, website-crawl RAG, multi-document
comparison) - see each project's own README for its "Limitations & Next Steps" section.

## Common Setup

```bash
cd rag-deployment-projects
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Local LLM Setup (Ollama)

Every project in this collection defaults to fully local operation via Ollama - no cloud credentials, no
API keys:

```bash
ollama serve &
ollama pull llama3.1:8b        # generation
ollama pull nomic-embed-text   # embeddings (optional - falls back to a local, dependency-free
                                # embedding automatically if this isn't pulled; see each project's README)
```

## Design Principles Across This Collection

- **Local-first, network-optional**: every project must run and produce a real answer with nothing beyond
  a local Ollama install - no hard dependency on any cloud API.
- **Honest embedding fallback**: if a real embedding model isn't available, fall back to a deterministic
  local embedding rather than failing outright - and always report which backend is active via `/healthz`.
- **Verify with a real file, not a synthetic one**: each project should be tested against an actual document
  before being called done, not just a purpose-built sample.

## Interview Topics Covered

- Ingestion-driven RAG (user-uploaded content vs. a fixed corpus)
- Per-document scoping and multi-document collections in a single vector store
- PDF text extraction and chunking strategy tradeoffs
- Embedding backend fallback design and operational honesty about which one is active
- Local LLM deployment (Ollama) as a zero-cost, zero-network-dependency generation backend
