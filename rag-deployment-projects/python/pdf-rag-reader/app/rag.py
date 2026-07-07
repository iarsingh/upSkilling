import hashlib
import os
from pathlib import Path

import chromadb
import httpx
from sklearn.feature_extraction.text import HashingVectorizer

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://127.0.0.1:11434")
OLLAMA_EMBED_MODEL = os.getenv("OLLAMA_EMBED_MODEL", "nomic-embed-text")
CHROMA_BASE_DIR = Path(__file__).resolve().parents[1] / "chroma_db"
COLLECTION_NAME = "pdf_rag_reader"

# Same proven pattern as rag-llm-platform: try real Ollama embeddings first,
# fall back to a dependency-free HashingVectorizer with zero network
# dependency if the embed model isn't available. Each backend gets its own
# persistence directory so vector dimensions can never collide across runs.
_hashing_vectorizer = HashingVectorizer(n_features=512, alternate_sign=False, norm="l2")
_embedding_backend: str | None = None
_collection: chromadb.Collection | None = None


def _try_ollama_embed(texts: list[str]) -> list[list[float]] | None:
    try:
        response = httpx.post(
            f"{OLLAMA_URL}/api/embed",
            json={"model": OLLAMA_EMBED_MODEL, "input": texts},
            timeout=30.0,
        )
        response.raise_for_status()
        return response.json().get("embeddings") or None
    except Exception:
        return None


def embed(texts: list[str]) -> list[list[float]]:
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


def get_collection() -> chromadb.Collection:
    global _collection
    if _collection is not None:
        return _collection
    embed(["warmup"])  # decide the backend before naming the persistence dir
    chroma_dir = CHROMA_BASE_DIR / _embedding_backend
    client = chromadb.PersistentClient(path=str(chroma_dir))
    _collection = client.get_or_create_collection(COLLECTION_NAME, embedding_function=None)
    return _collection


def doc_id_for(filename: str) -> str:
    return hashlib.sha1(filename.encode("utf-8")).hexdigest()[:12]


def add_document(doc_id: str, filename: str, chunks: list[dict]) -> int:
    collection = get_collection()
    ids = [f"{doc_id}-{i}" for i in range(len(chunks))]
    documents = [c["text"] for c in chunks]
    metadatas = [{"doc_id": doc_id, "source": filename, "page": c["page"]} for c in chunks]
    collection.add(ids=ids, documents=documents, metadatas=metadatas, embeddings=embed(documents))
    return len(chunks)


def list_documents() -> list[dict]:
    collection = get_collection()
    if collection.count() == 0:
        return []
    data = collection.get(include=["metadatas"])
    seen: dict[str, dict] = {}
    for meta in data["metadatas"]:
        doc_id = meta["doc_id"]
        if doc_id not in seen:
            seen[doc_id] = {"doc_id": doc_id, "source": meta["source"], "chunks": 0}
        seen[doc_id]["chunks"] += 1
    return list(seen.values())


def delete_document(doc_id: str) -> int:
    collection = get_collection()
    existing = collection.get(where={"doc_id": doc_id})
    ids = existing.get("ids", [])
    if ids:
        collection.delete(ids=ids)
    return len(ids)


def retrieve(question: str, top_k: int, doc_id: str | None = None) -> list[dict]:
    collection = get_collection()
    if collection.count() == 0:
        return []
    query_kwargs = {
        "query_embeddings": embed([question]),
        "n_results": max(1, min(top_k, collection.count())),
    }
    if doc_id:
        query_kwargs["where"] = {"doc_id": doc_id}
    result = collection.query(**query_kwargs)
    documents = result["documents"][0]
    metadatas = result["metadatas"][0]
    distances = result["distances"][0]
    return [
        {
            "source": metadata["source"],
            "page": metadata["page"],
            "text": document[:1200],
            # vectors are L2-normalized in both backends, so squared-L2
            # distance -> cosine similarity is cos_sim = 1 - distance / 2.
            "score": round(1 - distance / 2, 4),
        }
        for document, metadata, distance in zip(documents, metadatas, distances)
    ]
