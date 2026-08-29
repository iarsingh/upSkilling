import os
import re
from pathlib import Path

import chromadb
import httpx
from sklearn.feature_extraction.text import HashingVectorizer

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://127.0.0.1:11434")
OLLAMA_EMBED_MODEL = os.getenv("OLLAMA_EMBED_MODEL", "nomic-embed-text")
DATA_DIR = Path(__file__).resolve().parents[1] / "data"
BASE_CHROMA_DIR = Path(__file__).resolve().parents[1] / "chroma_db"
COLLECTION_NAME = "rag_llm_platform"

_hashing_vectorizer = HashingVectorizer(n_features=512, alternate_sign=False, norm="l2")
_embedding_backend: str | None = None  # "ollama" or "hashing", set on first real use


def chunk_document(text: str, source: str) -> list[dict[str, str]]:
    paragraphs = [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]
    chunks = []
    buffer = ""
    for paragraph in paragraphs:
        candidate = f"{buffer}\n\n{paragraph}" if buffer else paragraph
        if len(candidate) > 800 and buffer:
            chunks.append(buffer)
            buffer = paragraph
        else:
            buffer = candidate
    if buffer:
        chunks.append(buffer)
    return [{"source": source, "text": chunk} for chunk in chunks]


def _try_ollama_embed(texts: list[str]) -> list[list[float]] | None:
    try:
        response = httpx.post(
            f"{OLLAMA_URL}/api/embed",
            json={"model": OLLAMA_EMBED_MODEL, "input": texts},
            timeout=30.0,
        )
        response.raise_for_status()
        embeddings = response.json().get("embeddings")
        return embeddings or None
    except Exception:
        return None


def embed(texts: list[str]) -> list[list[float]]:
    """Real embeddings via Ollama's nomic-embed-text when available, otherwise a
    deterministic local fallback with zero network dependency. The backend is
    decided once (on first call) and then reused for the life of the process, so
    a collection's vectors are never a dimension-mismatched mix of both."""
    global _embedding_backend
    if _embedding_backend in (None, "ollama"):
        result = _try_ollama_embed(texts)
        if result is not None:
            _embedding_backend = "ollama"
            return result
        _embedding_backend = "hashing"
    return _hashing_vectorizer.transform(texts).toarray().tolist()


def embedding_backend_name() -> str:
    return _embedding_backend or "unresolved"


def build_collection() -> chromadb.Collection:
    # Warm up the backend decision before naming the persistence directory, so a
    # prior run's index (built with the other backend) is never reused with
    # mismatched vector dimensions.
    embed(["warmup"])
    chroma_dir = BASE_CHROMA_DIR / _embedding_backend

    client = chromadb.PersistentClient(path=str(chroma_dir))
    collection = client.get_or_create_collection(COLLECTION_NAME, embedding_function=None)

    if collection.count() > 0:
        return collection

    ids, documents, metadatas = [], [], []
    for path in sorted(DATA_DIR.glob("*.md")):
        for i, chunk in enumerate(chunk_document(path.read_text(encoding="utf-8"), path.name)):
            ids.append(f"{path.stem}-{i}")
            documents.append(chunk["text"])
            metadatas.append({"source": chunk["source"]})

    if documents:
        collection.add(ids=ids, documents=documents, metadatas=metadatas, embeddings=embed(documents))
    return collection


def retrieve(collection: chromadb.Collection, question: str, top_k: int) -> list[dict[str, object]]:
    if collection.count() == 0:
        return []
    result = collection.query(
        query_embeddings=embed([question]),
        n_results=max(1, min(top_k, collection.count())),
    )
    documents = result["documents"][0]
    metadatas = result["metadatas"][0]
    distances = result["distances"][0]
    return [
        {
            "source": metadata["source"],
            "text": document[:1200],
            # vectors are L2-normalized in both backends, so squared-L2 distance
            # -> cosine similarity is cos_sim = 1 - distance / 2.
            "score": round(1 - distance / 2, 4),
        }
        for document, metadata, distance in zip(documents, metadatas, distances)
    ]
