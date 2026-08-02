"""FastAPI RAG query service.

On startup, fetches whichever model version holds the MLflow "production" alias
for the registered model, downloads its zipped Chroma index, and serves /query
against it using Ollama for both query embedding and answer generation.
"""
import json
import os
import shutil
import tempfile
import zipfile
from contextlib import asynccontextmanager

import chromadb
import mlflow
import requests
from fastapi import FastAPI, HTTPException
from mlflow.tracking import MlflowClient
from pydantic import BaseModel

MLFLOW_TRACKING_URI = os.environ.get("MLFLOW_TRACKING_URI", "http://127.0.0.1:5500")
REGISTERED_MODEL_NAME = os.environ.get("REGISTERED_MODEL_NAME", "rag-retrieval-index")
PROMOTION_ALIAS = os.environ.get("PROMOTION_ALIAS", "production")
OLLAMA_HOST = os.environ.get("OLLAMA_HOST", "http://127.0.0.1:11434")
EMBEDDING_MODEL = os.environ.get("EMBEDDING_MODEL", "nomic-embed-text")
GENERATION_MODEL = os.environ.get("GENERATION_MODEL", "llama3.1:8b")
TOP_K = int(os.environ.get("TOP_K", "3"))

state = {"collection": None, "extract_dir": None, "version": None}


def load_production_index():
    mlflow.set_tracking_uri(MLFLOW_TRACKING_URI)
    client = MlflowClient()
    mv = client.get_model_version_by_alias(REGISTERED_MODEL_NAME, PROMOTION_ALIAS)

    local_dir = client.download_artifacts(mv.run_id, "rag_index")
    zip_name = [f for f in os.listdir(local_dir) if f.endswith(".zip")][0]

    if state["extract_dir"]:
        shutil.rmtree(state["extract_dir"], ignore_errors=True)

    extract_dir = tempfile.mkdtemp(prefix="rag_serving_index_")
    with zipfile.ZipFile(os.path.join(local_dir, zip_name)) as zf:
        zf.extractall(extract_dir)

    chroma_client = chromadb.PersistentClient(path=extract_dir)
    state["collection"] = chroma_client.get_collection("rag_docs")
    state["extract_dir"] = extract_dir
    state["version"] = mv.version
    return mv.version


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        version = load_production_index()
        print(f"Loaded '{REGISTERED_MODEL_NAME}' version {version} (alias '{PROMOTION_ALIAS}')")
    except Exception as exc:  # noqa: BLE001
        print(f"No production index available yet ({exc}). /query will 503 until the pipeline has run.")
    yield
    if state["extract_dir"]:
        shutil.rmtree(state["extract_dir"], ignore_errors=True)


app = FastAPI(title="RAG Query Service", lifespan=lifespan)


class QueryRequest(BaseModel):
    question: str
    top_k: int | None = None


class QueryResponse(BaseModel):
    answer: str
    sources: list[dict]
    index_version: str


def embed(text: str):
    resp = requests.post(f"{OLLAMA_HOST}/api/embeddings", json={"model": EMBEDDING_MODEL, "prompt": text}, timeout=60)
    resp.raise_for_status()
    return resp.json()["embedding"]


def generate(question: str, context_chunks: list[str]) -> str:
    context = "\n\n".join(f"[{i + 1}] {chunk}" for i, chunk in enumerate(context_chunks))
    prompt = (
        "Answer the question using only the numbered context below. "
        "Cite sources inline like [1]. If the context doesn't contain the answer, say so.\n\n"
        f"Context:\n{context}\n\nQuestion: {question}\nAnswer:"
    )
    resp = requests.post(
        f"{OLLAMA_HOST}/api/generate",
        json={"model": GENERATION_MODEL, "prompt": prompt, "stream": False},
        timeout=120,
    )
    resp.raise_for_status()
    return resp.json()["response"].strip()


@app.get("/health")
def health():
    return {"status": "ok", "index_loaded": state["collection"] is not None, "index_version": state["version"]}


@app.post("/reload")
def reload_index():
    try:
        version = load_production_index()
        return {"reloaded": True, "index_version": version}
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=503, detail=f"No production index available: {exc}") from exc


@app.post("/query", response_model=QueryResponse)
def query(req: QueryRequest):
    if state["collection"] is None:
        raise HTTPException(status_code=503, detail="No production index loaded yet. Run the pipeline, then POST /reload.")

    k = req.top_k or TOP_K
    query_embedding = embed(req.question)
    results = state["collection"].query(query_embeddings=[query_embedding], n_results=k)

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]
    answer = generate(req.question, documents)

    sources = [
        {"doc_id": meta["doc_id"], "title": meta["title"], "chunk_index": meta["chunk_index"], "text": doc}
        for meta, doc in zip(metadatas, documents)
    ]
    return QueryResponse(answer=answer, sources=sources, index_version=str(state["version"]))
