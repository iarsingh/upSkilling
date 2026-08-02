from kfp import dsl


@dsl.component(base_image="python:3.11-slim", packages_to_install=["requests==2.31.0", "chromadb==0.5.23", "mlflow==2.22.5"])
def embed_and_index(
    corpus_json: str,
    embedding_model: str,
    ollama_host: str,
    chunk_size: int,
    chunk_overlap: int,
    mlflow_tracking_uri: str,
    mlflow_experiment: str,
) -> str:
    """Chunk the corpus, embed each chunk via Ollama, build a Chroma index,
    and log params/metrics/the zipped index to an MLflow run. Returns the run_id
    so the next pipeline step can resume logging to the same run.
    """
    import json
    import os
    import shutil
    import tempfile

    import chromadb
    import mlflow
    import requests

    docs = json.loads(corpus_json)

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

    def embed(text):
        resp = requests.post(
            f"{ollama_host}/api/embeddings",
            json={"model": embedding_model, "prompt": text},
            timeout=120,
        )
        resp.raise_for_status()
        return resp.json()["embedding"]

    chunk_ids, chunk_texts, chunk_embeddings, chunk_metadatas = [], [], [], []
    for doc in docs:
        pieces = chunk_text(doc["text"], chunk_size, chunk_overlap)
        for i, piece in enumerate(pieces):
            chunk_ids.append(f"{doc['id']}::chunk-{i}")
            chunk_texts.append(piece)
            chunk_embeddings.append(embed(piece))
            chunk_metadatas.append({"doc_id": doc["id"], "title": doc["title"], "chunk_index": i})

    index_dir = tempfile.mkdtemp(prefix="chroma_index_")
    client = chromadb.PersistentClient(path=index_dir)
    collection = client.create_collection("rag_docs")
    collection.add(ids=chunk_ids, documents=chunk_texts, embeddings=chunk_embeddings, metadatas=chunk_metadatas)

    zip_base = tempfile.mktemp(prefix="rag_index_")
    zip_path = shutil.make_archive(zip_base, "zip", index_dir)

    mlflow.set_tracking_uri(mlflow_tracking_uri)
    mlflow.set_experiment(mlflow_experiment)
    with mlflow.start_run() as run:
        mlflow.log_param("embedding_model", embedding_model)
        mlflow.log_param("chunk_size", chunk_size)
        mlflow.log_param("chunk_overlap", chunk_overlap)
        mlflow.log_param("doc_count", len(docs))
        mlflow.log_metric("chunk_count", len(chunk_ids))
        mlflow.log_artifact(zip_path, artifact_path="rag_index")
        run_id = run.info.run_id

    os.remove(zip_path)
    shutil.rmtree(index_dir, ignore_errors=True)
    return run_id
