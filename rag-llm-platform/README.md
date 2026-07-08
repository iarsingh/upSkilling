# RAG + Multi-LLM Platform

A Retrieval-Augmented Generation API built around a pluggable LLM provider layer — the same retrieved
context can be answered by a local Ollama model or a cloud model (Gemini), including a side-by-side
`/rag/compare` endpoint. Everything runs fully offline by default: local LLM generation (Ollama), and a
graceful embedding fallback with no hard network dependency.

## How It Works

```text
Question
  -> embed the question (Ollama nomic-embed-text if available, else a local
     deterministic fallback — decided once per process, see "Embedding Backend")
  -> ANN similarity search against the persisted Chroma collection
  -> take the top_k chunks as context
  -> generate with the requested provider(s): local Ollama, and optionally Gemini
  -> return the answer(s), retrieved sources + scores, and per-provider latency
```

Documents in `data/*.md` are chunked on paragraph boundaries and embedded once at startup; the index
persists to `chroma_db/<backend>/` (gitignored) so restarts don't re-embed from scratch.

## Embedding Backend

This project tries **real semantic embeddings first**: Ollama's `nomic-embed-text` model, called over the
local Ollama API with no external network dependency once pulled (`ollama pull nomic-embed-text`). If that
model isn't available or the call fails for any reason, it falls back automatically to a deterministic,
dependency-free `HashingVectorizer` — the same approach used in
[`genai-hands-on-projects/python/rag-chat-assistant`](../genai-hands-on-projects/python/rag-chat-assistant/),
built there after Chroma's *own* default embedding download proved unreliable on a flaky connection.

The backend actually in use is reported by `/healthz` (`embedding_backend: "ollama" | "hashing"`) — check
that before assuming which one your index was built with. Each backend gets its own persistence directory
(`chroma_db/ollama/` vs `chroma_db/hashing/`) so switching backends across runs can never mix
mismatched-dimension vectors into one collection.

## LLM Providers

| Provider | Requires | Notes |
|---|---|---|
| `ollama` | Ollama running locally (`ollama serve`), a pulled model (default `llama3.1:8b`) | Always listed in `/models`; no credentials, no network call per request |
| `gemini` | `GOOGLE_CLOUD_PROJECT` or `GOOGLE_API_KEY` set | Only listed in `/models` once configured, so the API never advertises a provider that would just fail |

## Quick Start

```bash
# One-time: make sure Ollama is running with a model pulled
ollama serve &
ollama pull llama3.1:8b
ollama pull nomic-embed-text   # optional — enables real embeddings instead of the fallback

cd rag-llm-platform
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

uvicorn app.main:app --reload --port 8090
```

```bash
curl -s http://localhost:8090/healthz
```

Ask a question (defaults to the `ollama` provider):

```bash
curl -X POST http://localhost:8090/rag/query \
  -H "Content-Type: application/json" \
  -d '{"question":"What is continuous batching and why does it matter for LLM serving?"}'
```

Compare providers on the same question and retrieved context:

```bash
curl -X POST http://localhost:8090/rag/compare \
  -H "Content-Type: application/json" \
  -d '{"question":"How should I evaluate a RAG system?", "providers":["ollama","gemini"]}'
```

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `OLLAMA_URL` | `http://127.0.0.1:11434` | Ollama API base URL |
| `OLLAMA_MODEL` | `llama3.1:8b` | Model used for generation |
| `OLLAMA_EMBED_MODEL` | `nomic-embed-text` | Model used for embeddings, when the Ollama backend is active |
| `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION`, `GOOGLE_GENAI_USE_VERTEXAI` | — | Enables the `gemini` provider via Vertex AI |
| `GENAI_MODEL` | `gemini-2.5-flash` | Gemini model name |

## Interview Talking Points

- A provider abstraction (one `generate(prompt) -> str` interface, multiple backends) is what makes a
  system genuinely multi-model instead of hardcoded to one vendor — the RAG/retrieval layer doesn't change
  at all when the generation backend does.
- Comparing two models on the *same* retrieved context isolates the generation-quality question from the
  retrieval-quality question — if both providers get the same context but disagree, that's a genuine signal
  about model capability, not a retrieval bug.
- Trying a better dependency first and falling back automatically (rather than hardcoding to whichever
  approach happens to work in one environment) is what keeps a system portable across machines with
  different network reliability — same lesson learned building `rag-chat-assistant` in this workspace.
- Quantized local models (Ollama/GGUF) make genuinely useful LLM inference possible on a laptop with no
  GPU cost — worth being able to explain when quantization is an acceptable tradeoff for a given use case.

## Limitations & Next Steps

- Ollama generation latency scales with prompt/context length and available compute — expect noticeably
  slower responses than a hosted API on constrained hardware.
- `/rag/compare` calls providers sequentially, not in parallel — fine for a demo, but a real comparison
  tool should parallelize provider calls to keep total latency down.
- Next step: add a small golden-question eval set (see `llm-evaluation-and-observability.md` in `data/`)
  and score both providers' answers with an LLM-as-judge to make the model comparison quantitative instead
  of eyeballed.
