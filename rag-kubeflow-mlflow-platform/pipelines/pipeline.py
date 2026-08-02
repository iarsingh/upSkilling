"""Kubeflow Pipeline: build a RAG retrieval index, evaluate it, and register/promote
it in the MLflow Model Registry.

Stages:
  1. embed_and_index        - chunk the corpus, embed each chunk via Ollama, build a
                               Chroma index, log params + the zipped index to an MLflow run.
  2. evaluate_and_register  - compute recall@k against the labeled eval set, log it back
                               to the same run, register a new model version, and promote
                               it to the "production" alias if it beats the current one.

Usage:
    python pipeline.py compile                 # writes pipeline.yaml
    python pipeline.py run                     # compiles and submits a run against KFP
"""
import json
import os
import sys

from kfp import compiler, dsl, Client

sys.path.insert(0, os.path.dirname(__file__))
from components.embed_and_index import embed_and_index
from components.evaluate_and_register import evaluate_and_register

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KFP_ENDPOINT = os.environ.get("KFP_ENDPOINT", "http://localhost:8888")
OLLAMA_HOST_IN_CLUSTER = os.environ.get("OLLAMA_HOST_IN_CLUSTER", "http://host.minikube.internal:11434")
MLFLOW_TRACKING_URI_IN_CLUSTER = os.environ.get("MLFLOW_TRACKING_URI_IN_CLUSTER", "http://host.minikube.internal:5500")


@dsl.pipeline(name="rag-index-build-and-promote", description="Build, evaluate, and promote a RAG retrieval index")
def rag_pipeline(
    corpus_json: str,
    qa_eval_json: str,
    embedding_model: str = "nomic-embed-text",
    ollama_host: str = OLLAMA_HOST_IN_CLUSTER,
    chunk_size: int = 400,
    chunk_overlap: int = 60,
    mlflow_tracking_uri: str = MLFLOW_TRACKING_URI_IN_CLUSTER,
    mlflow_experiment: str = "rag-index-build",
    registered_model_name: str = "rag-retrieval-index",
    promotion_alias: str = "production",
    top_k: int = 3,
):
    index_task = embed_and_index(
        corpus_json=corpus_json,
        embedding_model=embedding_model,
        ollama_host=ollama_host,
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        mlflow_tracking_uri=mlflow_tracking_uri,
        mlflow_experiment=mlflow_experiment,
    )
    index_task.set_caching_options(False)

    eval_task = evaluate_and_register(
        run_id=index_task.output,
        qa_eval_json=qa_eval_json,
        embedding_model=embedding_model,
        ollama_host=ollama_host,
        mlflow_tracking_uri=mlflow_tracking_uri,
        registered_model_name=registered_model_name,
        promotion_alias=promotion_alias,
        top_k=top_k,
    )
    eval_task.set_caching_options(False)


def compile_pipeline(out_path=None):
    out_path = out_path or os.path.join(os.path.dirname(__file__), "pipeline.yaml")
    compiler.Compiler().compile(rag_pipeline, out_path)
    print(f"Wrote {out_path}")
    return out_path


def submit_run():
    pipeline_path = compile_pipeline()
    with open(os.path.join(ROOT, "eval", "corpus.json")) as f:
        corpus_json = f.read()
    with open(os.path.join(ROOT, "eval", "qa_eval.json")) as f:
        qa_eval_json = f.read()

    client = Client(host=KFP_ENDPOINT)
    run = client.create_run_from_pipeline_package(
        pipeline_path,
        arguments={"corpus_json": corpus_json, "qa_eval_json": qa_eval_json},
        experiment_name="rag-kubeflow-mlflow",
    )
    print(f"Submitted run: {run.run_id}")
    print(f"View it at: {KFP_ENDPOINT}/#/runs/details/{run.run_id}")
    return run


if __name__ == "__main__":
    action = sys.argv[1] if len(sys.argv) > 1 else "compile"
    if action == "compile":
        compile_pipeline()
    elif action == "run":
        submit_run()
    else:
        print(f"Unknown action '{action}'. Use 'compile' or 'run'.")
        sys.exit(1)
