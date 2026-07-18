import os
import re
from pathlib import Path

import chromadb
from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.feature_extraction.text import HashingVectorizer

DATA_DIR = Path(__file__).resolve().parents[1] / "data"
CHROMA_DIR = Path(__file__).resolve().parents[1] / "chroma_db"
COLLECTION_NAME = "rag_chat_assistant"
MODEL_NAME = os.getenv("GENAI_MODEL", "gemini-2.5-flash")
HISTORY_WINDOW = 6  # number of past turns kept per session

# Feature-hashed vectors instead of chromadb's default embedding model: no runtime
# download, no external dependency, fully deterministic. Swap this for a real
# sentence-transformer/ONNX embedding if you want stronger semantic matching and
# don't mind the one-time model download.
VECTORIZER = HashingVectorizer(n_features=512, alternate_sign=False, norm="l2")

app = FastAPI(title="RAG Chat Assistant", version="1.0.0")


def embed(texts: list[str]) -> list[list[float]]:
    return VECTORIZER.transform(texts).toarray().tolist()


# session_id -> list of {"role": "user"|"assistant", "content": str}
CHAT_SESSIONS: dict[str, list[dict[str, str]]] = {}


class ChatRequest(BaseModel):
    session_id: str
    message: str
    top_k: int = 3


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


def build_collection() -> chromadb.Collection:
    client = chromadb.PersistentClient(path=str(CHROMA_DIR))
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


COLLECTION = build_collection()


@app.get("/healthz")
def healthz() -> dict[str, object]:
    return {"status": "healthy", "service": "rag-chat-assistant", "indexed_chunks": COLLECTION.count()}


@app.post("/chat")
def chat(request: ChatRequest) -> dict[str, object]:
    history = CHAT_SESSIONS.setdefault(request.session_id, [])
    retrieved = retrieve(request.message, request.top_k)
    context = "\n\n".join(f"[{item['source']}]\n{item['text']}" for item in retrieved)

    if os.getenv("USE_GEMINI", "false").lower() == "true":
        answer = generate_with_gemini(request.message, context, history)
    else:
        answer = local_answer(request.message, retrieved, history)

    history.append({"role": "user", "content": request.message})
    history.append({"role": "assistant", "content": answer})
    del history[: max(0, len(history) - HISTORY_WINDOW * 2)]

    return {
        "session_id": request.session_id,
        "answer": answer,
        "retrieved_sources": [{"source": item["source"], "score": item["score"]} for item in retrieved],
        "turns_in_memory": len(history) // 2,
    }


@app.delete("/chat/{session_id}")
def clear_session(session_id: str) -> dict[str, str]:
    CHAT_SESSIONS.pop(session_id, None)
    return {"session_id": session_id, "status": "cleared"}


def retrieve(question: str, top_k: int) -> list[dict[str, object]]:
    if COLLECTION.count() == 0:
        return []
    result = COLLECTION.query(query_embeddings=embed([question]), n_results=max(1, min(top_k, COLLECTION.count())))
    documents = result["documents"][0]
    metadatas = result["metadatas"][0]
    distances = result["distances"][0]
    return [
        {
            "source": metadata["source"],
            "text": document[:1200],
            # vectors are L2-normalized, so squared-L2 distance -> cosine similarity
            # is cos_sim = 1 - distance / 2 (0 distance = identical, 2 = orthogonal).
            "score": round(1 - distance / 2, 4),
        }
        for document, metadata, distance in zip(documents, metadatas, distances)
    ]


def local_answer(question: str, retrieved: list[dict[str, object]], history: list[dict[str, str]]) -> str:
    if not retrieved:
        return "No documents are indexed yet, so there is no context to answer from."
    best = retrieved[0]
    context_note = f" This is turn {len(history) // 2 + 1} of the conversation." if history else ""
    return (
        "Local fallback answer based on vector retrieval (set USE_GEMINI=true for a generated answer). "
        f"For question '{question}', start with source '{best['source']}' (similarity {best['score']}).{context_note} "
        "Review the retrieved snippets below and turn them into a grounded response."
    )


def generate_with_gemini(question: str, context: str, history: list[dict[str, str]]) -> str:
    from google import genai

    client = genai.Client()
    transcript = "\n".join(f"{turn['role']}: {turn['content']}" for turn in history[-HISTORY_WINDOW * 2 :])
    prompt = f"""
Answer the question using only the retrieved context below. If the answer is not in the
context, say that the context is insufficient rather than guessing.

Conversation so far:
{transcript or "(no prior turns)"}

Retrieved context:
{context}

Current question:
{question}
"""
    response = client.models.generate_content(model=MODEL_NAME, contents=prompt)
    return response.text or ""
