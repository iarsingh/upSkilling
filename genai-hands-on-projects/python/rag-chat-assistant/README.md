# GenAI Project: RAG Chat Assistant

A conversational Retrieval-Augmented Generation API: a persisted Chroma vector store with per-session chat
memory, instead of the single-turn, in-memory TF-IDF retrieval used in
[`rag-knowledge-api`](../rag-knowledge-api/).

## How It Works

```text
Message (+ session_id)
  -> vectorize the message (feature-hashed vector, see "Embedding Choice" below)
  -> ANN similarity search against the persisted Chroma collection
  -> take the top_k chunks as context
  -> generate (Gemini if USE_GEMINI=true, else a local extractive fallback),
     including the session's recent turns so follow-ups resolve correctly
  -> append the turn to session memory (bounded sliding window), return the answer
```

Documents in `data/*.md` are chunked on paragraph boundaries and embedded once; the index is persisted to
`chroma_db/` (gitignored) so restarts don't re-embed from scratch.

## Embedding Choice

This project deliberately does **not** use Chroma's default embedding model. That model downloads a ~79MB
ONNX artifact on first use, and in an unstable network environment that download failed repeatedly on
read-timeouts. Instead, it embeds locally with scikit-learn's `HashingVectorizer` (512-dim, L2-normalized,
non-negative) — a deterministic bag-of-words-style vector with **zero runtime network dependency**.

The honest tradeoff: this is closer to structured keyword hashing than true semantic embedding — it won't
match a paraphrase the way a transformer embedding would, but it's a real ANN vector store with persistence,
which is the architectural difference this project demonstrates over `rag-knowledge-api`'s in-memory TF-IDF.
To upgrade to real semantic embeddings (recommended if your network can reliably pull the model), swap the
`HashingVectorizer` in `app/main.py` for `chromadb`'s default `ONNXMiniLM_L6_V2` embedding function or
`sentence-transformers`.

## How This Differs From rag-knowledge-api

| | rag-knowledge-api | rag-chat-assistant |
|---|---|---|
| Vectorization | TF-IDF (keyword overlap) | Feature-hashed vectors (see above) |
| Index | In-memory, rebuilt every start | Chroma, persisted to `chroma_db/` |
| Interface | Single-turn `/ask` | Multi-turn `/chat` with per-session memory |
| Similarity | Cosine via scikit-learn | Chroma ANN search (squared-L2 on normalized vectors = cosine) |

## Tech Stack

- FastAPI + Pydantic
- `chromadb` (`PersistentClient`) as the vector store
- scikit-learn `HashingVectorizer` for embeddings
- `google-genai` SDK for optional Gemini generation

## Quick Start

```bash
cd genai-hands-on-projects
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

cd python/rag-chat-assistant
uvicorn app.main:app --reload --port 8082
```

First request builds the index from `data/*.md` and persists it; subsequent restarts reuse it.

```bash
curl -X POST http://localhost:8082/chat \
  -H "Content-Type: application/json" \
  -d '{"session_id":"demo","message":"How should I chunk documents for retrieval?"}'
```

Follow-up in the same session (memory carries over):

```bash
curl -X POST http://localhost:8082/chat \
  -H "Content-Type: application/json" \
  -d '{"session_id":"demo","message":"What about overlap between chunks?"}'
```

Clear a session:

```bash
curl -X DELETE http://localhost:8082/chat/demo
```

Expected response shape:

```json
{
  "session_id": "demo",
  "answer": "Local fallback answer based on vector retrieval ...",
  "retrieved_sources": [
    {"source": "vector-search-fundamentals.md", "score": 0.29}
  ],
  "turns_in_memory": 1
}
```

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `USE_GEMINI` | `false` | Generate with Gemini instead of the local retrieval-grounded fallback |
| `GENAI_MODEL` | `gemini-2.5-flash` | Model name used when Gemini mode is enabled |
| `GOOGLE_GENAI_USE_VERTEXAI`, `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION` | — | Vertex AI auth for Gemini mode |

`HISTORY_WINDOW` in `app/main.py` controls how many past turns are kept per session (default: 6).

## Interview Talking Points

- Embeddings retrieve by meaning, not literal keyword overlap — the tradeoff is needing an embedding step
  and losing exact-match precision, which is why production systems often use hybrid (keyword + vector)
  search rather than either alone.
- Chat memory is not free: every past turn resent to the model costs tokens and latency, so this project
  uses a bounded sliding window rather than replaying the full history forever.
- Splitting "did retrieval find the right chunks" from "did the model generate a good answer from them" is
  the first debugging step when a RAG answer is wrong.
- Being able to say *why* an embedding choice was made under a real constraint (a flaky download, here)
  reads better in an interview than pretending every dependency install always goes smoothly.

## Limitations & Next Steps

- `HashingVectorizer` embeddings are not semantically rich — they won't match a paraphrase with no shared
  tokens. See "Embedding Choice" above for the documented upgrade path.
- Session memory is in-process (a Python dict) — it does not survive a server restart and won't work across
  multiple server instances. A production version would back it with Redis or a database.
- Next step: add a retrieval-quality eval (a small labeled question set + expected source) to quantify the
  gap between the hashed-vector baseline and a real sentence-transformer embedding.
