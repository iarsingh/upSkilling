import shutil
from pathlib import Path

from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel

from . import rag
from .llm import generate_answer
from .pdf_ingest import chunk_pages, extract_pages

UPLOAD_DIR = Path(__file__).resolve().parents[1] / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

app = FastAPI(title="PDF RAG Reader", version="1.0.0")

# session_id -> list of {"role": "user"|"assistant", "content": str}
CHAT_SESSIONS: dict[str, list[dict]] = {}
HISTORY_WINDOW = 6


class ChatRequest(BaseModel):
    session_id: str
    message: str
    doc_id: str | None = None  # restrict retrieval to one uploaded document; omit to search all
    top_k: int = 4


@app.get("/healthz")
def healthz() -> dict[str, object]:
    collection = rag.get_collection()
    return {
        "status": "healthy",
        "service": "pdf-rag-reader",
        "indexed_chunks": collection.count(),
        "embedding_backend": rag.embedding_backend_name(),
    }


@app.post("/upload")
async def upload(file: UploadFile = File(...)) -> dict[str, object]:
    dest = UPLOAD_DIR / file.filename
    with dest.open("wb") as f:
        shutil.copyfileobj(file.file, f)

    pages = extract_pages(str(dest))
    chunks = chunk_pages(pages)
    if not chunks:
        return {"error": "No extractable text found in this PDF - it may be scanned/image-only and would need OCR."}

    doc_id = rag.doc_id_for(file.filename)
    indexed = rag.add_document(doc_id, file.filename, chunks)
    return {"doc_id": doc_id, "filename": file.filename, "pages": len(pages), "chunks_indexed": indexed}


@app.get("/documents")
def documents() -> dict[str, object]:
    return {"documents": rag.list_documents()}


@app.delete("/documents/{doc_id}")
def delete_document(doc_id: str) -> dict[str, object]:
    deleted = rag.delete_document(doc_id)
    return {"doc_id": doc_id, "chunks_deleted": deleted}


@app.post("/chat")
def chat(request: ChatRequest) -> dict[str, object]:
    history = CHAT_SESSIONS.setdefault(request.session_id, [])
    retrieved = rag.retrieve(request.message, request.top_k, request.doc_id)
    context = "\n\n".join(f"[{item['source']} p.{item['page']}]\n{item['text']}" for item in retrieved)

    answer = generate_answer(request.message, context, history)

    history.append({"role": "user", "content": request.message})
    history.append({"role": "assistant", "content": answer})
    del history[: max(0, len(history) - HISTORY_WINDOW * 2)]

    return {
        "session_id": request.session_id,
        "answer": answer,
        "retrieved_sources": [
            {"source": item["source"], "page": item["page"], "score": item["score"]} for item in retrieved
        ],
        "turns_in_memory": len(history) // 2,
    }


@app.delete("/chat/{session_id}")
def clear_session(session_id: str) -> dict[str, str]:
    CHAT_SESSIONS.pop(session_id, None)
    return {"session_id": session_id, "status": "cleared"}
