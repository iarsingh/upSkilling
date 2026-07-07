# RAG Project: PDF Reader

Upload a PDF, ask questions grounded in its actual content, with page-cited answers and multi-turn chat
memory. The first project in the [`rag-deployment-projects`](../../) collection — a document-ingestion RAG
app, as opposed to the pre-baked markdown corpora used elsewhere in this workspace's other RAG projects.

## How It Works

```text
Upload a PDF
  -> extract text per page (pypdf)
  -> chunk into ~900-char windows with overlap, tagged with page number + doc_id
  -> embed each chunk (Ollama nomic-embed-text if available, else a local
     deterministic fallback - see "Embedding Backend")
  -> store in a persisted Chroma collection, scoped by doc_id in metadata

Ask a question (+ session_id, optional doc_id)
  -> embed the question, ANN search against Chroma (filtered to doc_id if given)
  -> take the top_k chunks as context
  -> generate with local Ollama, including the session's recent turns
  -> return the answer (page-cited), retrieved sources + scores, and turn count
```

## Embedding Backend

Same approach as [`genai-hands-on-projects/python/rag-chat-assistant`](../../../genai-hands-on-projects/python/rag-chat-assistant/)
and [`rag-llm-platform`](../../../rag-llm-platform/): tries real semantic embeddings via Ollama's
`nomic-embed-text` first (no network dependency once pulled - `ollama pull nomic-embed-text`), and falls
back automatically to a dependency-free `HashingVectorizer` if that model isn't available. Check which one
is active via `/healthz` (`embedding_backend: "ollama" | "hashing"`) - each backend persists to its own
directory (`chroma_db/ollama/` vs `chroma_db/hashing/`) so switching backends across runs can never mix
mismatched-dimension vectors into one collection.

## Tech Stack

- FastAPI + Pydantic
- `pypdf` for text extraction (text-based PDFs only - a scanned/image-only PDF will return no extractable
  text; OCR would be a real addition, not yet built here)
- `chromadb` (`PersistentClient`) as the vector store, scoped per-document via `doc_id` metadata
- scikit-learn `HashingVectorizer` for the embedding fallback
- Local Ollama (`llama3.1:8b` by default) for generation - no cloud dependency

## Quick Start

```bash
# One-time: Ollama running with a model pulled
ollama serve &
ollama pull llama3.1:8b
ollama pull nomic-embed-text   # optional - enables real embeddings instead of the fallback

cd rag-deployment-projects
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

cd python/pdf-rag-reader
uvicorn app.main:app --reload --port 8091
```

Upload a PDF:

```bash
curl -X POST http://localhost:8091/upload -F "file=@/path/to/your.pdf"
```

Response includes the `doc_id` you'll use to scope questions to this document:

```json
{"doc_id": "5942d51ceb67", "filename": "your.pdf", "pages": 7, "chunks_indexed": 7}
```

Ask a question (omit `doc_id` to search across every uploaded PDF instead of just one):

```bash
curl -X POST http://localhost:8091/chat -H "Content-Type: application/json" \
  -d '{"session_id":"demo","message":"What topics does this document cover?","doc_id":"5942d51ceb67"}'
```

Follow-up in the same session (memory carries over):

```bash
curl -X POST http://localhost:8091/chat -H "Content-Type: application/json" \
  -d '{"session_id":"demo","message":"Tell me more about the second point you made."}'
```

List or remove uploaded documents:

```bash
curl http://localhost:8091/documents
curl -X DELETE http://localhost:8091/documents/5942d51ceb67
```

Clear a chat session:

```bash
curl -X DELETE http://localhost:8091/chat/demo
```

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `OLLAMA_URL` | `http://127.0.0.1:11434` | Ollama API base URL |
| `OLLAMA_MODEL` | `llama3.1:8b` | Model used for generation |
| `OLLAMA_EMBED_MODEL` | `nomic-embed-text` | Model used for embeddings, when the Ollama backend is active |

`HISTORY_WINDOW` in `app/main.py` controls how many past turns are kept per session (default: 6).

## Interview Talking Points

- Per-document scoping via metadata filtering (`where={"doc_id": ...}`) lets one Chroma collection serve
  many uploaded documents without needing a separate index per file - the tradeoff is every query without
  a `doc_id` searches across all of them, which is the right default for "ask across my whole library" but
  wrong if a user expects isolation between documents by default.
- Character-window chunking with overlap (used here) versus paragraph-based chunking (used for the
  markdown corpora in this workspace's other RAG projects) is a real, deliberate choice: PDF text
  extraction rarely preserves clean paragraph boundaries, so a fixed-size sliding window is the more robust
  default for this input type specifically.
- Page-level citation (not just source-file citation) is what makes an answer actually verifiable against
  the original document - a user can jump straight to the cited page rather than re-reading the whole PDF.
- Scanned/image-only PDFs silently produce zero chunks with this pipeline (`pypdf` extracts embedded text,
  not pixels) - a production version would need to detect that case and either OCR it or tell the user
  clearly rather than returning an empty, unexplained result.

## Limitations & Next Steps

- No OCR - image-only/scanned PDFs return "no extractable text" rather than being processed.
- Session memory is in-process (a Python dict) - doesn't survive a restart or scale across multiple server
  instances.
- Fixed chunk size/overlap regardless of document structure (no heading-aware or table-aware chunking).
- Next step: this folder is meant to hold multiple RAG deployment projects - candidates that would reuse
  most of this same `rag.py`/`llm.py` scaffolding include a CSV/spreadsheet reader, a website-crawl RAG
  app, or a multi-document comparison tool that answers questions by explicitly citing which document(s)
  disagree.
