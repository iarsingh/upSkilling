# rag-kubeflow-mlflow-platform

A small, real, end-to-end RAG (Retrieval-Augmented Generation) system where the index-building
step is a **Kubeflow Pipeline** and every run is tracked and versioned in **MLflow**.

```
corpus.json ──▶ [embed_and_index] ──▶ MLflow run (params, metrics, zipped Chroma index)
                                              │
                                              ▼
qa_eval.json ──▶ [evaluate_and_register] ──▶ recall@k logged, new Model Registry version,
                                              promoted to the "production" alias if it's
                                              at least as good as the current one
                                              │
                                              ▼
                                    FastAPI app loads the "production" version
                                    and answers /query using Chroma + Ollama
```

- **Embeddings & generation**: [Ollama](https://ollama.com), local (`nomic-embed-text` + `llama3.1:8b`)
- **Vector store**: [Chroma](https://www.trychroma.com), persisted and shipped as an MLflow artifact
- **Orchestration**: [Kubeflow Pipelines](https://www.kubeflow.org/docs/components/pipelines/) SDK (`kfp`) — real component/pipeline code, compiles to a real `pipeline.yaml`
- **Tracking + registry**: [MLflow](https://mlflow.org) — experiment tracking, Model Registry, alias-based promotion

## Why two ways to run the same logic

Standalone Kubeflow Pipelines is a genuinely heavy stack (~14 microservices: MySQL, object
storage, API server, workflow controller, UI, metadata services...). On a resource-constrained
laptop it can crawl or stall under memory pressure. So this project has:

- **`pipelines/local_run.py`** — the same build → evaluate → register/promote logic, run
  in-process. No cluster needed. Use this day to day.
- **`pipelines/pipeline.py`** — the actual Kubeflow Pipelines SDK definition
  (`pipelines/components/*.py`). Compiles to a real `pipeline.yaml` and submits to any real
  KFP cluster (a properly-resourced local cluster, or a managed one like Vertex AI Pipelines /
  a cloud Kubeflow install).

Both run the exact same steps; `local_run.py` just skips containerizing each step.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# models used by this project
ollama pull nomic-embed-text
ollama pull llama3.1:8b
```

Ollama must be reachable, not just running on `127.0.0.1` — if you ever point this at a real
Kubernetes cluster, pods can't reach a loopback-only bind. Either is fine for local-only use;
for cluster use, restart Ollama with:

```bash
launchctl setenv OLLAMA_HOST "0.0.0.0:11434"   # macOS; restart the Ollama app after
```

## Run locally (recommended day to day)

```bash
# 1. Start MLflow (backend store + artifact store are both local files)
mlflow server --backend-store-uri sqlite:///mlflow.db \
  --default-artifact-root ./mlartifacts --host 127.0.0.1 --port 5500 &

# 2. Build the index, evaluate it, register + promote it
python pipelines/local_run.py

# 3. Serve queries against whatever is currently promoted to "production"
uvicorn app.main:app --host 127.0.0.1 --port 8090 &

curl -X POST http://127.0.0.1:8090/query \
  -H "Content-Type: application/json" \
  -d '{"question": "What does the MLflow Model Registry let a team do?"}'
```

MLflow UI: http://127.0.0.1:5500

Re-running `python pipelines/local_run.py` after editing `eval/corpus.json` (or tuning
`CHUNK_SIZE`/`CHUNK_OVERLAP` env vars) builds a new version, evaluates it, and only promotes it
to `production` if its recall@k is at least as good as the current one — the same gate a real
MLOps pipeline would enforce. Hit `POST /reload` on the app to pick up a newly promoted version
without restarting it.

## Run for real on Kubeflow Pipelines

```bash
# Any real KFP cluster - a well-resourced local one, or a managed one.
# For a local cluster: minikube with enough headroom for the full KFP standalone stack
# (realistically 8-10GB+ dedicated to the node) plus:
export PIPELINE_VERSION=2.17.0
kubectl apply -k "github.com/kubeflow/pipelines/manifests/kustomize/cluster-scoped-resources?ref=$PIPELINE_VERSION"
kubectl wait --for condition=established --timeout=60s crd/applications.app.k8s.io
kubectl apply -k "github.com/kubeflow/pipelines/manifests/kustomize/env/platform-agnostic?ref=$PIPELINE_VERSION"

# Once ml-pipeline-ui is Running, port-forward it:
kubectl port-forward -n kubeflow svc/ml-pipeline-ui 8888:80

# Then compile + submit:
python pipelines/pipeline.py compile   # writes pipelines/pipeline.yaml
python pipelines/pipeline.py run       # submits a run against KFP_ENDPOINT (default http://localhost:8888)
```

The pipeline parameters default `ollama_host`/`mlflow_tracking_uri` to
`http://host.minikube.internal:...` so pipeline pods can reach services running on your host
machine — override via env vars `OLLAMA_HOST_IN_CLUSTER` / `MLFLOW_TRACKING_URI_IN_CLUSTER` if
your setup differs (e.g. a cloud cluster, where you'd point at a real hosted MLflow instead).

## Project layout

```
pipelines/
  components/
    embed_and_index.py       # KFP component: chunk + embed + build Chroma index + log to MLflow
    evaluate_and_register.py # KFP component: recall@k + register + promote
  pipeline.py                 # KFP pipeline definition, compile/submit CLI
  local_run.py                 # same logic, run in-process (no cluster)
app/
  main.py                     # FastAPI RAG query service, serves the "production" MLflow version
eval/
  corpus.json                 # sample document corpus to index
  qa_eval.json                # labeled eval set (question -> which doc should be retrieved)
```

## Extending it

- Swap `eval/corpus.json` for your own documents (any list of `{id, title, text}`).
- Add real eval questions to `eval/qa_eval.json` as you learn what your RAG system gets wrong.
- The promotion gate in `evaluate_and_register` is intentionally simple (recall@k, `>=`) —
  a natural next step is a multi-metric gate (recall + a faithfulness/groundedness score from
  an LLM-as-judge pass) before promoting.
