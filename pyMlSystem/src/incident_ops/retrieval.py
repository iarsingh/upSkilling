import numpy as np
from sklearn.feature_extraction.text import HashingVectorizer
from sqlalchemy import select

from incident_ops.db import Runbook

# Offline lexical embeddings: deterministic and no model download. Not semantic embeddings.
VECTORIZER = HashingVectorizer(n_features=384, alternate_sign=False, norm="l2", stop_words="english")


def embed(text: str) -> list[float]:
    return VECTORIZER.transform([text]).toarray()[0].tolist()


def retrieve(session, text: str, threshold: float = 0.12) -> list[dict]:
    vector = embed(text)
    if session.bind.dialect.name == "postgresql":
        distance = Runbook.embedding.cosine_distance(vector)
        rows = session.execute(select(Runbook, distance).order_by(distance).limit(3)).all()
        scored = [(book, 1 - float(dist)) for book, dist in rows]
    else:
        books = session.scalars(select(Runbook)).all()
        scored = sorted(((b, float(np.dot(vector, b.embedding))) for b in books), key=lambda x: -x[1])[:3]
    return [
        {"id": b.id, "title": b.title, "content": b.content, "steps": b.steps, "score": round(score, 4)}
        for b, score in scored
        if score >= threshold
    ]
