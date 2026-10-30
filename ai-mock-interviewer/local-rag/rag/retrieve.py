"""Hybrid retrieval: vector neighbors and BM25, fused with reciprocal rank, then reranked."""

from __future__ import annotations

import math
import re
import statistics

from rag.bm25 import BM25Index, tokenize
from rag.models import Chunk, Hit

IDENTIFIER = re.compile(r"\b(?=[A-Za-z0-9-]*\d)[A-Za-z]{2,}[A-Za-z0-9-]*\d[A-Za-z0-9-]*\b")
RRF_K = 60
VECTOR_K = 8
BM25_K = 8
# On this corpus, real matches sit around cosine 0.60–0.87 and clear the median
# by at least ~0.13. An off-topic question such as "favorite coffee" tops out
# near 0.50 and only barely clears the median, so it must not be treated as evidence.
SUPPORT_MARGIN = 0.12
SUPPORT_FLOOR = 0.55


def cosine(left: list[float], right: list[float]) -> float:
    dot = 0.0
    left_norm = 0.0
    right_norm = 0.0
    for a, b in zip(left, right):
        dot += a * b
        left_norm += a * a
        right_norm += b * b
    if left_norm == 0 or right_norm == 0:
        return 0.0
    return dot / math.sqrt(left_norm * right_norm)


def identifiers(text: str) -> list[str]:
    return [match.group(0).lower() for match in IDENTIFIER.finditer(text)]


def hybrid_search(
    question: str,
    chunks: list[Chunk],
    query_embedding: list[float],
    *,
    top_n: int = 4,
) -> list[Hit]:
    """Return the full fused candidate list, best first. Callers slice top_n."""
    if not chunks:
        return []

    vector_order = sorted(
        chunks,
        key=lambda chunk: cosine(query_embedding, chunk.embedding),
        reverse=True,
    )
    bm25 = BM25Index((chunk.id, f"{chunk.title}\n{chunk.heading}\n{chunk.text}") for chunk in chunks)
    keyword_scores = dict(bm25.search(question)[:BM25_K])
    by_id = {chunk.id: chunk for chunk in chunks}

    rrf: dict[str, float] = {}
    vector_score: dict[str, float] = {}
    for rank, chunk in enumerate(vector_order[:VECTOR_K], start=1):
        rrf[chunk.id] = rrf.get(chunk.id, 0.0) + 1.0 / (RRF_K + rank)
        vector_score[chunk.id] = cosine(query_embedding, chunk.embedding)
    for rank, doc_id in enumerate(keyword_scores, start=1):
        rrf[doc_id] = rrf.get(doc_id, 0.0) + 1.0 / (RRF_K + rank)
        vector_score.setdefault(doc_id, cosine(query_embedding, by_id[doc_id].embedding))

    max_rrf = max(rrf.values()) if rrf else 1.0
    query_tokens = set(tokenize(question))
    query_ids = identifiers(question)
    hits: list[Hit] = []
    for doc_id, fused in rrf.items():
        chunk = by_id[doc_id]
        blob = f"{chunk.title}\n{chunk.heading}\n{chunk.text}".lower()
        passage_tokens = set(tokenize(blob))
        overlap = (len(query_tokens & passage_tokens) / len(query_tokens)) if query_tokens else 0.0
        exact = 1.0 if any(token in blob for token in query_ids) else 0.0
        rerank = 0.65 * (fused / max_rrf) + 0.25 * overlap + 0.35 * exact
        hits.append(
            Hit(
                chunk=chunk,
                vector_score=vector_score[doc_id],
                bm25_score=keyword_scores.get(doc_id, 0.0),
                rrf_score=fused,
                rerank_score=rerank,
            )
        )
    hits.sort(key=lambda hit: (hit.rerank_score, hit.vector_score), reverse=True)
    return hits[: max(top_n, VECTOR_K)]


def select_context(ranked: list[Hit], top_n: int = 4) -> list[Hit]:
    """Keep the best passage and its siblings. Drop other files that are only near misses."""
    if not ranked:
        return []
    best = ranked[0]
    chosen = [best]
    for hit in ranked[1:top_n]:
        same_file = hit.chunk.source == best.chunk.source and hit.vector_score >= SUPPORT_FLOOR
        close_other = hit.vector_score >= max(SUPPORT_FLOOR, best.vector_score - 0.04)
        if same_file or close_other:
            chosen.append(hit)
    return chosen


def passes_support(question: str, ranked: list[Hit], chunks: list[Chunk], query_embedding: list[float]) -> bool:
    """Decide whether the top hit is evidence, or only a near miss."""
    if not ranked:
        return False
    top = ranked[0]
    blob = f"{top.chunk.title}\n{top.chunk.heading}\n{top.chunk.text}".lower()
    if any(token in blob for token in identifiers(question)):
        return True
    scores = [cosine(query_embedding, chunk.embedding) for chunk in chunks]
    baseline = statistics.median(scores) if scores else 0.0
    return top.vector_score >= SUPPORT_FLOOR and top.vector_score >= baseline + SUPPORT_MARGIN
