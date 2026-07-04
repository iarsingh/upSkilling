# RAG Evaluation Observability

Evaluates a small retrieval augmented generation dataset for retrieval hit rate, citation coverage, answer groundedness, and simple answer quality signals.

## Why This Is Useful

RAG systems often fail quietly: the answer looks fluent, but the retrieval missed the right document or the answer includes unsupported claims. This project turns those risks into measurable checks.

## Run

```bash
python3 app.py
```

The script writes `rag_eval_report.md`.

## What This Proves

- RAG evaluation design
- Groundedness and citation checks
- Observability-style reporting
- Practical LLM quality metrics without needing paid APIs

## Interview Talking Points

- What metrics would you add for production RAG?
- How would you use an LLM judge responsibly?
- What should block a release: retrieval misses, hallucination risk, or both?
