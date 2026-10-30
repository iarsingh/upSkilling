"""Shared records for indexed passages and retrieval hits."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Chunk:
    id: str
    source: str
    title: str
    heading: str
    text: str
    embedding: list[float]


@dataclass(frozen=True)
class Hit:
    chunk: Chunk
    vector_score: float
    bm25_score: float
    rrf_score: float
    rerank_score: float
