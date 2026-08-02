from kfp import dsl


@dsl.component(base_image="python:3.11-slim", packages_to_install=["requests==2.31.0", "chromadb==0.5.23", "mlflow==2.22.5"])
def evaluate_and_register(
    run_id: str,
    qa_eval_json: str,
    embedding_model: str,
    ollama_host: str,
    mlflow_tracking_uri: str,
    registered_model_name: str,
    promotion_alias: str,
    top_k: int,
) -> str:
    """Download the run's zipped Chroma index, compute recall@k against the labeled
    eval set, log the metric back onto the same run, register the run's artifact as
    a new model version, and promote it to `promotion_alias` if it beats the current
    aliased version's recall@k (or if no version currently holds that alias).
    """
    import json
    import shutil
    import tempfile
    import zipfile

    import chromadb
    import mlflow
    import requests
    from mlflow.exceptions import MlflowException
    from mlflow.tracking import MlflowClient

    mlflow.set_tracking_uri(mlflow_tracking_uri)
    client = MlflowClient()

    def embed(text):
        resp = requests.post(
            f"{ollama_host}/api/embeddings",
            json={"model": embedding_model, "prompt": text},
            timeout=120,
        )
        resp.raise_for_status()
        return resp.json()["embedding"]

    # Download this run's zipped index and load it.
    local_zip_dir = client.download_artifacts(run_id, "rag_index")
    zip_path = [f for f in __import__("os").listdir(local_zip_dir) if f.endswith(".zip")][0]
    extract_dir = tempfile.mkdtemp(prefix="rag_eval_index_")
    with zipfile.ZipFile(f"{local_zip_dir}/{zip_path}") as zf:
        zf.extractall(extract_dir)

    chroma_client = chromadb.PersistentClient(path=extract_dir)
    collection = chroma_client.get_collection("rag_docs")

    eval_set = json.loads(qa_eval_json)
    hits = 0
    for item in eval_set:
        query_embedding = embed(item["question"])
        results = collection.query(query_embeddings=[query_embedding], n_results=top_k)
        retrieved_doc_ids = {meta["doc_id"] for meta in results["metadatas"][0]}
        if item["expected_doc"] in retrieved_doc_ids:
            hits += 1
    recall_at_k = hits / len(eval_set) if eval_set else 0.0

    with mlflow.start_run(run_id=run_id):
        mlflow.log_metric("recall_at_k", recall_at_k)
        mlflow.log_metric("eval_question_count", len(eval_set))

    shutil.rmtree(extract_dir, ignore_errors=True)

    # Register this run's index as a new model version.
    model_uri = f"runs:/{run_id}/rag_index"
    try:
        client.create_registered_model(registered_model_name)
    except MlflowException:
        pass  # already exists
    new_version = client.create_model_version(name=registered_model_name, source=model_uri, run_id=run_id)

    # Compare against the currently promoted version, if any.
    current_recall = -1.0
    try:
        current = client.get_model_version_by_alias(registered_model_name, promotion_alias)
        current_run = client.get_run(current.run_id)
        current_recall = current_run.data.metrics.get("recall_at_k", -1.0)
    except MlflowException:
        pass  # no version holds this alias yet

    promoted = recall_at_k >= current_recall
    if promoted:
        client.set_registered_model_alias(registered_model_name, promotion_alias, new_version.version)

    summary = {
        "run_id": run_id,
        "new_version": new_version.version,
        "recall_at_k": recall_at_k,
        "previous_production_recall_at_k": current_recall,
        "promoted": promoted,
    }
    print(json.dumps(summary, indent=2))
    return json.dumps(summary)
