"""Run the same build -> evaluate -> register/promote logic as the Kubeflow
pipeline, but in-process against your local Ollama + MLflow - no cluster needed.

This mirrors pipelines/components/*.py exactly; it exists for fast local
iteration. When you want the real thing on a real Kubeflow cluster, use
`python pipeline.py run` instead (same logic, runs as an actual KFP pipeline).

Usage:
    python local_run.py
"""
import json
import os
import shutil
import tempfile
import zipfile

import chromadb
import mlflow
import requests
from mlflow.exceptions import MlflowException
from mlflow.tracking import MlflowClient

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

OLLAMA_HOST = os.environ.get("OLLAMA_HOST", "http://127.0.0.1:11434")
EMBEDDING_MODEL = os.environ.get("EMBEDDING_MODEL", "nomic-embed-text")
MLFLOW_TRACKING_URI = os.environ.get("MLFLOW_TRACKING_URI", "http://127.0.0.1:5500")
MLFLOW_EXPERIMENT = os.environ.get("MLFLOW_EXPERIMENT", "rag-index-build")
REGISTERED_MODEL_NAME = os.environ.get("REGISTERED_MODEL_NAME", "rag-retrieval-index")
PROMOTION_ALIAS = os.environ.get("PROMOTION_ALIAS", "production")
CHUNK_SIZE = int(os.environ.get("CHUNK_SIZE", "400"))
CHUNK_OVERLAP = int(os.environ.get("CHUNK_OVERLAP", "60"))
TOP_K = int(os.environ.get("TOP_K", "3"))


def embed(text: str):
    resp = requests.post(f"{OLLAMA_HOST}/api/embeddings", json={"model": EMBEDDING_MODEL, "prompt": text}, timeout=120)
    resp.raise_for_status()
    return resp.json()["embedding"]


def chunk_text(text, size, overlap):
    chunks = []
    start = 0
    while start < len(text):
        end = start + size
        chunks.append(text[start:end])
        if end >= len(text):
            break
        start = end - overlap
    return chunks


def build_index(corpus):
    print(f"Chunking + embedding {len(corpus)} documents (chunk_size={CHUNK_SIZE}, overlap={CHUNK_OVERLAP})...")
    ids, texts, embeddings, metadatas = [], [], [], []
    for doc in corpus:
        pieces = chunk_text(doc["text"], CHUNK_SIZE, CHUNK_OVERLAP)
        for i, piece in enumerate(pieces):
            ids.append(f"{doc['id']}::chunk-{i}")
            texts.append(piece)
            embeddings.append(embed(piece))
            metadatas.append({"doc_id": doc["id"], "title": doc["title"], "chunk_index": i})
    print(f"Embedded {len(ids)} chunks.")

    index_dir = tempfile.mkdtemp(prefix="chroma_index_")
    client = chromadb.PersistentClient(path=index_dir)
    collection = client.create_collection("rag_docs")
    collection.add(ids=ids, documents=texts, embeddings=embeddings, metadatas=metadatas)

    zip_path = shutil.make_archive(tempfile.mktemp(prefix="rag_index_"), "zip", index_dir)
    shutil.rmtree(index_dir, ignore_errors=True)
    return zip_path, len(ids)


def log_build_run(zip_path, doc_count, chunk_count):
    mlflow.set_tracking_uri(MLFLOW_TRACKING_URI)
    mlflow.set_experiment(MLFLOW_EXPERIMENT)
    with mlflow.start_run() as run:
        mlflow.log_param("embedding_model", EMBEDDING_MODEL)
        mlflow.log_param("chunk_size", CHUNK_SIZE)
        mlflow.log_param("chunk_overlap", CHUNK_OVERLAP)
        mlflow.log_param("doc_count", doc_count)
        mlflow.log_metric("chunk_count", chunk_count)
        mlflow.log_artifact(zip_path, artifact_path="rag_index")
        run_id = run.info.run_id
    print(f"Logged MLflow run: {run_id}")
    return run_id


def evaluate(run_id, eval_set):
    client = MlflowClient()
    local_dir = client.download_artifacts(run_id, "rag_index")
    zip_name = [f for f in os.listdir(local_dir) if f.endswith(".zip")][0]
    extract_dir = tempfile.mkdtemp(prefix="rag_eval_index_")
    with zipfile.ZipFile(os.path.join(local_dir, zip_name)) as zf:
        zf.extractall(extract_dir)

    collection = chromadb.PersistentClient(path=extract_dir).get_collection("rag_docs")
    hits = 0
    for item in eval_set:
        results = collection.query(query_embeddings=[embed(item["question"])], n_results=TOP_K)
        retrieved = {m["doc_id"] for m in results["metadatas"][0]}
        hit = item["expected_doc"] in retrieved
        hits += hit
        print(f"  [{'HIT ' if hit else 'MISS'}] {item['question']!r} -> expected {item['expected_doc']!r}, got {sorted(retrieved)}")
    recall_at_k = hits / len(eval_set) if eval_set else 0.0
    shutil.rmtree(extract_dir, ignore_errors=True)

    with mlflow.start_run(run_id=run_id):
        mlflow.log_metric("recall_at_k", recall_at_k)
        mlflow.log_metric("eval_question_count", len(eval_set))
    print(f"recall@{TOP_K} = {recall_at_k:.2f} ({hits}/{len(eval_set)})")
    return recall_at_k


def register_and_promote(run_id, recall_at_k):
    client = MlflowClient()
    model_uri = f"runs:/{run_id}/rag_index"

    try:
        client.create_registered_model(REGISTERED_MODEL_NAME)
        print(f"Created registered model '{REGISTERED_MODEL_NAME}'")
    except MlflowException:
        pass

    new_version = client.create_model_version(name=REGISTERED_MODEL_NAME, source=model_uri, run_id=run_id)
    print(f"Registered version {new_version.version}")

    current_recall = -1.0
    try:
        current = client.get_model_version_by_alias(REGISTERED_MODEL_NAME, PROMOTION_ALIAS)
        current_run = client.get_run(current.run_id)
        current_recall = current_run.data.metrics.get("recall_at_k", -1.0)
        print(f"Current '{PROMOTION_ALIAS}' is version {current.version} with recall@k={current_recall:.2f}")
    except MlflowException:
        print(f"No version currently holds the '{PROMOTION_ALIAS}' alias.")

    promoted = recall_at_k >= current_recall
    if promoted:
        client.set_registered_model_alias(REGISTERED_MODEL_NAME, PROMOTION_ALIAS, new_version.version)
        print(f"Promoted version {new_version.version} to '{PROMOTION_ALIAS}' (recall@k {recall_at_k:.2f} >= {current_recall:.2f})")
    else:
        print(f"Did NOT promote version {new_version.version} (recall@k {recall_at_k:.2f} < current {current_recall:.2f})")

    return promoted, new_version.version


def main():
    with open(os.path.join(ROOT, "eval", "corpus.json")) as f:
        corpus = json.load(f)
    with open(os.path.join(ROOT, "eval", "qa_eval.json")) as f:
        eval_set = json.load(f)

    zip_path, chunk_count = build_index(corpus)
    run_id = log_build_run(zip_path, len(corpus), chunk_count)
    os.remove(zip_path)

    print("\nEvaluating retrieval quality...")
    recall_at_k = evaluate(run_id, eval_set)

    print("\nRegistering and checking promotion...")
    promoted, version = register_and_promote(run_id, recall_at_k)

    print(f"\nDone. Run: {run_id} | Registry version: {version} | Promoted: {promoted}")
    print(f"View in MLflow: {MLFLOW_TRACKING_URI}/#/experiments")


if __name__ == "__main__":
    main()
