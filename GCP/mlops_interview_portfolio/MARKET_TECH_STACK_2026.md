# 2026 Market Tech Stack Upgrade Map

Use this file to explain how each project maps to current senior MLOps,
platform engineering, LLMOps, DevSecOps, AIOps, FinOps, and DSA-heavy market
expectations on GCP.

## Portfolio-Wide Upgrade Themes

- **Agentic AI:** Vertex AI Agent Engine, Agent2Agent-style patterns, agent
  observability, session memory, tool execution, and managed agent runtime.
- **LLMOps governance:** Vertex AI Gen AI evaluation service, adaptive rubrics,
  prompt/model regression tests, Model Armor, prompt injection filtering, PII
  redaction, and response safety gates.
- **RAG and retrieval:** Vertex AI Vector Search, BigQuery vector search,
  hybrid retrieval, graph search, metadata-backed lineage, and retrieval quality
  evaluation.
- **GKE AI platform:** GKE Enterprise, Kueue, Dynamic Workload Scheduler,
  GPU/TPU scheduling, Ray on Vertex AI, vLLM, Triton, and workload identity.
- **DevSecOps:** Cloud Build, Artifact Analysis, Binary Authorization-style
  promotion, Cosign signing, Secret Manager, External Secrets, VPC Service
  Controls, Cloud Armor, Prisma Cloud, SentinelOne, and policy-as-code.
- **AIOps and SRE:** Cloud Monitoring, Cloud Logging, Cloud Trace with
  OpenTelemetry, Eventarc, Pub/Sub remediation, error-budget-aware rollbacks,
  and self-healing workflows.
- **FinOps:** GPU bin packing, token budgets, quota-aware serving, Spot GPUs,
  BigQuery cost ledgers, and fallback model routing.
- **DSA for production ML:** graph traversal, tries, heaps, dynamic programming,
  Aho-Corasick, MinHash/LSH, ring buffers, bitsets, and bounded-latency
  algorithms.

## Python, Data, and GenAI Library Layer

Use `requirements-modern.txt` as the optional dependency profile when converting
any blueprint into runnable implementation code. Keep the small policy CLIs
lightweight for interview demos, then explain that production modules use this
stack:

- **NumPy:** vector math, thresholds, anomaly scores, latency windows, token
  budget arrays, drift statistics, embedding similarity checks, and bounded
  online calculations.
- **pandas:** offline feature validation, batch inference QA, model evaluation
  reports, BigQuery export checks, governance evidence tables, and
  LinkedIn/GitHub demo notebooks.
- **scikit-learn and XGBoost:** tabular baselines for fraud, churn, forecasting,
  predictive maintenance, and model promotion gates before moving to Vertex AI
  custom training.
- **google-genai and google-cloud-aiplatform:** Gemini calls, Vertex AI Agent
  Engine integration, Vertex AI Pipelines, Experiments, Metadata, Model
  Registry, Vector Search, and managed endpoint deployment.
- **LangChain or LlamaIndex:** RAG ingestion, tool wrappers, agent memory,
  document loaders, retrieval orchestration, and multi-agent workflow glue.
- **Ragas and DeepEval:** retrieval quality, hallucination checks, prompt
  regression tests, agent trajectory evaluation, and LLM release evidence.
- **FastAPI, OpenTelemetry, and Prometheus:** model gateways, LLM gateways,
  latency/error telemetry, custom SLO metrics, trace correlation, and
  production-ready APIs.
- **Great Expectations and Evidently:** data contracts, data drift, feature
  skew, validation suites, and retraining triggers.

## Project Upgrade Matrix

| Project | Market Tech Stack Upgrade | Interview Positioning |
|---|---|---|
| `01-gke-ml-platform-blueprint` | Add GKE Enterprise, Workload Identity, Kueue, GPU node pools, Config Sync/Argo CD, OpenTelemetry, and Artifact Registry image promotion. | Foundation platform for AI/ML teams with Kubernetes-native governance and scalable accelerator scheduling. |
| `02-model-promotion-gates` | Add Vertex AI Model Registry concepts, Gen AI evaluation for LLM releases, approval evidence, rollback metadata, and policy-as-code release gates. | Shows release governance for both predictive ML and GenAI assets. |
| `03-ml-observability-sre` | Add OpenTelemetry traces, Cloud Trace, Cloud Monitoring SLOs, burn-rate alerts, drift signals, and token/cost telemetry. | Converts ML monitoring into SRE-grade operational signals. |
| `04-cloud-build-gke-ml-cicd` | Add Cloud Deploy, Binary Authorization-style checks, Artifact Analysis, SBOM/signature verification, Kustomize overlays, and progressive rollout. | Demonstrates secure delivery of ML services through a modern CI/CD chain. |
| `05-vertex-ai-monitoring-blueprint` | Add Vertex AI Model Monitoring, BigQuery prediction logs, Gen AI evaluation for LLM workloads, Model Armor findings, and Pub/Sub alert routing. | Bridges managed Vertex AI monitoring with incident workflows. |
| `06-pubsub-ml-incident-automation` | Add Eventarc, Cloud Run responders, Cloud Logging context, PagerDuty/Jira payloads, and policy-bound remediation. | Turns monitoring into automated operational response. |
| `07-feature-store-consistency` | Add Vertex AI Feature Store, Feast-compatible contracts, BigQuery vector metadata, online/offline parity checks, and Dataplex-style ownership metadata. | Positions feature reliability as a platform release gate. |
| `08-batch-inference-quality-gates` | Add Vertex AI Batch Prediction, BigQuery DataFrames-style validation, Cloud Composer orchestration, and quarantine tables. | Shows production discipline for scheduled ML outputs. |
| `09-vertex-ai-huggingface-llmops` | Add Model Garden/MaaS, Model Armor, Gen AI evaluation, Vertex AI Endpoint logging, and prompt/model release gates. | Demonstrates governed open-source model deployment on managed GCP serving. |
| `10-vertex-ai-mlops-control-plane` | Add Vertex AI Pipelines, Experiments, Metadata, Model Registry, Feature Store, Gen AI evaluation, and Ray on Vertex AI for distributed workloads. | Senior control-plane story for the full ML lifecycle. |
| `11-gcp-llm-aiops-gitops` | Add Vertex AI Agent Engine, Eventarc, Cloud Run remediation, Argo CD pull request workflows, and Model Armor-triggered incident routing. | AIOps that accelerates operations while GitOps remains the safety boundary. |
| `12-chronos-supply` | Add BigQuery ML, BigQuery DataFrames, Cloud Composer 3, Dataflow Prime-style streaming/batch paths, Vertex AI Forecasting, and Memorystore. | High-scale batch forecasting with cost-aware orchestration. |
| `13-shield-llm` | Add Model Armor, Gen AI evaluation adaptive rubrics, Vertex AI Agent Engine compatibility, BigQuery prompt telemetry, and Cloud DLP/Sensitive Data Protection. | Enterprise LLM gateway with measurable governance controls. |
| `14-vision-edge` | Add Vertex AI custom training, Artifact Registry edge images, GKE Enterprise edge fleet management, TensorRT/Edge TPU optimization, and Cloud Deploy canaries. | Hybrid edge-cloud MLOps for latency-sensitive vision workloads. |
| `15-nexus-fraud` | Add Dataflow streaming, Vertex AI Feature Store, BigQuery ML drift checks, Model Registry approvals, shadow deployment, and regulatory audit logs. | Regulated real-time fraud platform with streaming features and governed releases. |
| `16-clear-route` | Add GKE Enterprise, Config Connector, Policy Controller, Argo CD, Kubeflow, Artifact Analysis, VPC Service Controls, and healthcare audit evidence. | MLOps-as-a-Service with tenant isolation and compliance controls. |
| `17-ad-stream` | Add Cloud Deploy blue/green Dataflow, Vertex AI Feature Store, Bigtable online serving, BigQuery offline store, custom SLOs, and automatic rollback. | Real-time feature infrastructure for ad ranking at high throughput. |
| `18-aegis-sphere` | Add Vertex AI Agent Engine, Model Armor, Vertex AI Vector Search, Gen AI evaluation, Triton/vLLM, Cloud Trace, and self-healing remediation loops. | Autonomous GenAI platform where DevOps, DevSecOps, LLMOps, and AIOps converge. |
| `19-aero-predict` | Add multi-region Pub/Sub, Dataflow, Cloud Workflows, Vertex AI Feature Store, Bigtable, BigQuery, VPC Service Controls, and Cloud Deploy blue/green endpoints. | IoT predictive maintenance with streaming feature correctness and zero-downtime rollout. |
| `20-omni-agent` | Add Vertex AI Agent Engine, Agent2Agent-style orchestration, Vertex AI Vector Search, Model Armor, PSC, Eventarc, BigQuery telemetry, and vLLM on GKE. | Secure multi-agent enterprise platform with private grounding and self-healing. |
| `21-graph-shield` | Add GKE memory-optimized node pools, Bigtable adjacency cache, Pub/Sub/Dataflow graph updates, PyTorch Geometric, Vertex AI Metadata, and graph algorithms. | DSA-driven fraud MLOps with bounded graph traversal and GNN lineage. |
| `22-lexi-stream` | Add Rust/Go gateway, eBPF-aware routing, Model Armor, WAF, Secret Manager, Prometheus, Cloud Monitoring, and fallback Gemini provisioning. | Low-latency GenAI routing using memory-efficient data structures. |
| `23-fin-pulse` | Add Kueue, Dynamic Workload Scheduler, Spot GPUs, BigQuery cost ledger, vLLM, Gemini, quota algorithms, and Cloud Monitoring FinOps automation. | GPU FinOps platform with algorithmic scheduling and token-budget enforcement. |
| `24-bio-graph-rag` | Add Vertex AI Vector Search, BigQuery vector search option, MinHash/LSH, biomedical NER, Graph-RAG, Gen AI evaluation, and Model Armor/PII masking. | Biomedical RAG with graph-grounded evidence and compliance controls. |
| `25-cyber-stream` | Add Aho-Corasick, ring buffers, Dataflow, Pub/Sub, BigQuery drift, Eventarc, Cloud Run retraining, Vertex AI custom training, and Cloud Deploy shadow rollout. | Cybersecurity streaming MLOps with deterministic fast paths plus governed ML updates. |
| `26-kubeflow-gke-ml-factory` | Add Kubeflow Profiles, Notebooks, Kubeflow Pipelines v2, Katib, KServe, Kueue, Workload Identity, Managed Prometheus, Argo CD/Config Sync, and Vertex AI Metadata export. | Kubernetes-native ML factory for teams that need self-managed tenancy, GPU scheduling, and open-source extensibility on GKE. |
| `27-kubeflow-vertex-hybrid-pipelines` | Add KFP v2 SDK, Google Cloud Pipeline Components, Kubeflow-on-GKE execution, Vertex AI Pipelines execution, Metadata, Model Registry, Cloud Build, Cloud Deploy, canary, and shadow release gates. | Shows how to bridge open-source Kubeflow portability with managed Vertex AI production governance. |
| `28-atlas-ai-mlops-operating-system` | Combine GKE Enterprise, Terraform, GitOps, Kubeflow, Vertex AI Pipelines, Agent Engine, Vector Search, Model Armor, Dataflow, Feature Store, BigQuery, Bigtable, Cloud Deploy, Prisma Cloud, SentinelOne, Binary Authorization, AIOps, GPU FinOps, and DSA fast paths. | Capstone board-level architecture that shows ownership of the full enterprise AI/MLOps operating model, testing stages, and security posture. |

## How To Use In Interviews

1. Start with the business pressure: cost, latency, compliance, governance,
   scale, or safety.
2. Name the cloud-native control plane: GKE, Vertex AI, Dataflow, Cloud Build,
   Cloud Deploy, or Agent Engine.
3. Name the algorithmic or MLOps mechanism: feature parity, graph traversal,
   Gen AI evaluation, Model Armor, Kueue, or drift-triggered retraining.
4. End with the operational guarantee: rollback, auditability, sub-latency
   target, zero critical vulnerabilities, lower GPU waste, or safer agents.
