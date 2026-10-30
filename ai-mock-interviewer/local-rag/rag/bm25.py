"""Okapi BM25 over chunk text. Used beside vector search, not instead of it."""

from __future__ import annotations

import math
import re
from collections import Counter
from typing import Iterable

TOKEN = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*")
STOPWORDS = {
    "a",
    "an",
    "the",
    "and",
    "or",
    "to",
    "of",
    "in",
    "on",
    "for",
    "is",
    "are",
    "was",
    "be",
    "do",
    "how",
    "what",
    "when",
    "why",
    "i",
    "we",
    "you",
    "it",
    "that",
    "this",
    "with",
    "after",
    "before",
    "from",
    "does",
    "did",
    "can",
    "need",
}


def tokenize(text: str) -> list[str]:
    return [token for token in TOKEN.findall(text.lower()) if token not in STOPWORDS]


class BM25Index:
    def __init__(self, docs: Iterable[tuple[str, str]], k1: float = 1.5, b: float = 0.75) -> None:
        self.k1 = k1
        self.b = b
        self.doc_ids: list[str] = []
        self.freqs: list[Counter[str]] = []
        self.doc_len: list[int] = []
        df: Counter[str] = Counter()
        for doc_id, text in docs:
            tokens = tokenize(text)
            counts = Counter(tokens)
            self.doc_ids.append(doc_id)
            self.freqs.append(counts)
            self.doc_len.append(len(tokens))
            df.update(counts.keys())
        self.df = df
        self.n = len(self.doc_ids)
        self.avgdl = (sum(self.doc_len) / self.n) if self.n else 0.0

    def idf(self, term: str) -> float:
        df = self.df.get(term, 0)
        return math.log(1 + (self.n - df + 0.5) / (df + 0.5))

    def search(self, query: str) -> list[tuple[str, float]]:
        terms = tokenize(query)
        if not terms or not self.n:
            return []
        scored: list[tuple[str, float]] = []
        for doc_id, freqs, length in zip(self.doc_ids, self.freqs, self.doc_len):
            score = 0.0
            for term in terms:
                tf = freqs.get(term, 0)
                if not tf:
                    continue
                denom = tf + self.k1 * (1 - self.b + self.b * length / self.avgdl)
                score += self.idf(term) * (tf * (self.k1 + 1)) / denom
            if score > 0:
                scored.append((doc_id, score))
        scored.sort(key=lambda item: item[1], reverse=True)
        return scored
