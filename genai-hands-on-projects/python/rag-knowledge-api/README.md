# GenAI Project: RAG Knowledge API

A single-turn Retrieval-Augmented Generation API over local Markdown documents, using TF-IDF retrieval
with an optional Gemini generation step — the baseline RAG implementation in this collection. See
[`rag-chat-assistant`](../rag-chat-assistant/) for the conversational, vector-store version built on top
of the same idea.

## How It Works

```text
Question
  -> TF-IDF vectorize the question
  -> cosine-similarity rank against every document in data/*.md
  -> take the top_k highest-scoring chunks as context
  -> generate (Gemini if USE_GEMINI=true, else a local extractive fallback)
  -> return the answer + which sources were retrieved and their scores
```

Documents are loaded and vectorized once at startup (`data/*.md`), so retrieval quality is fixed by what's
in that folder — add more `.md` files there to grow the knowledge base.

## Tech Stack

- FastAPI + Pydantic
- scikit-learn `TfidfVectorizer` + cosine similarity (no vector database, no embedding model)
- `google-genai` SDK for optional Gemini generation

## Quick Start

```bash
cd genai-hands-on-projects
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

cd python/rag-knowledge-api
uvicorn app.main:app --reload --port 8081
```

```bash
curl -X POST http://localhost:8081/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"How should we monitor a model API on GKE?"}'
```

Expected response shape:

```json
{
  "question": "How should we monitor a model API on GKE?",
  "answer": "Local fallback answer based on retrieved context. ...",
  "retrieved_sources": [
    {"source": "gke-mlops-monitoring.md", "score": 0.42}
  ]
}
```

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `USE_GEMINI` | `false` | Generate with Gemini instead of the local extractive fallback |
| `GENAI_MODEL` | `gemini-2.5-flash` | Model name used when Gemini mode is enabled |
| `GOOGLE_GENAI_USE_VERTEXAI`, `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION` | — | Vertex AI auth for Gemini mode |

## Interview Talking Points

- RAG reduces hallucination by grounding responses in retrieved context instead of relying on the model's
  training data alone.
- Retrieval quality gates generation quality — a perfect model still answers wrong if it's fed the wrong
  chunks, so retrieval and generation should be evaluated separately.
- TF-IDF only matches literal word overlap; it will miss a question phrased differently from the source
  text even when the meaning is identical. `rag-chat-assistant` in this same collection swaps this for
  vector embeddings to fix exactly that gap.
- Answers should carry citations/context snippets so a human can verify the grounding, not just trust the
  output.

## Limitations & Next Steps

- No chunking within a document — each file is one retrieval unit, so a very long file dilutes relevance.
- No persistence: the TF-IDF index rebuilds from disk on every process start.
- Next step: compare this baseline's retrieval quality against `rag-chat-assistant`'s embedding-based
  retrieval on the same question set, to make the embeddings-vs-keywords tradeoff concrete rather than
  theoretical.
