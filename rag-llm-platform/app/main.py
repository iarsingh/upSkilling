import time

from fastapi import FastAPI
from pydantic import BaseModel

from . import rag
from .providers import available_providers

app = FastAPI(title="RAG + Multi-LLM Platform", version="1.0.0")

COLLECTION = rag.build_collection()


def rag_prompt(question: str, context: str) -> str:
    return f"""Answer the question using only the retrieved context below. If the
answer is not in the context, say the context is insufficient rather than guessing.

Context:
{context}

Question:
{question}
"""


class QueryRequest(BaseModel):
    question: str
    provider: str = "ollama"
    top_k: int = 3


class CompareRequest(BaseModel):
    question: str
    providers: list[str] = ["ollama"]
    top_k: int = 3


@app.get("/healthz")
def healthz() -> dict[str, object]:
    return {
        "status": "healthy",
        "service": "rag-llm-platform",
        "indexed_chunks": COLLECTION.count(),
        "embedding_backend": rag.embedding_backend_name(),
        "llm_providers": list(available_providers().keys()),
    }


@app.get("/models")
def models() -> dict[str, object]:
    return {"available_providers": list(available_providers().keys())}


@app.post("/rag/query")
def query(request: QueryRequest) -> dict[str, object]:
    providers = available_providers()
    provider = providers.get(request.provider)
    if provider is None:
        return {"error": f"Unknown or unconfigured provider '{request.provider}'. Available: {list(providers.keys())}"}

    retrieved = rag.retrieve(COLLECTION, request.question, request.top_k)
    context = "\n\n".join(f"[{item['source']}]\n{item['text']}" for item in retrieved)

    start = time.time()
    answer = provider.generate(rag_prompt(request.question, context))
    latency_ms = int((time.time() - start) * 1000)

    return {
        "question": request.question,
        "provider": request.provider,
        "answer": answer,
        "retrieved_sources": [{"source": item["source"], "score": item["score"]} for item in retrieved],
        "latency_ms": latency_ms,
    }


@app.post("/rag/compare")
def compare(request: CompareRequest) -> dict[str, object]:
    providers = available_providers()
    retrieved = rag.retrieve(COLLECTION, request.question, request.top_k)
    context = "\n\n".join(f"[{item['source']}]\n{item['text']}" for item in retrieved)
    prompt = rag_prompt(request.question, context)

    results = {}
    for name in request.providers:
        provider = providers.get(name)
        if provider is None:
            results[name] = {"error": f"unknown or unconfigured provider (available: {list(providers.keys())})"}
            continue
        start = time.time()
        answer = provider.generate(prompt)
        results[name] = {"answer": answer, "latency_ms": int((time.time() - start) * 1000)}

    return {
        "question": request.question,
        "retrieved_sources": [{"source": item["source"], "score": item["score"]} for item in retrieved],
        "results": results,
    }
