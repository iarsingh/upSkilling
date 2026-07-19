# rag-llm-platform

Local RAG (Retrieval-Augmented Generation) platform experiment built around Ollama.

## Contents

- `app/` — FastAPI-style service scaffold (`main.py`, `rag.py`, `providers.py` per compiled `__pycache__` artifacts). Source files are currently local-only/untracked in the working tree.
- `chroma_db/ollama/` — a persisted [Chroma](https://www.trychroma.com/) vector store (SQLite + HNSW index files) used as the retrieval backend for an Ollama-served LLM.
- `.venv/` — local Python virtual environment (not tracked).

This is a working experiment folder rather than a finished showcase project — see the [root README](../README.md) for the polished, portfolio-facing projects in this repository.
