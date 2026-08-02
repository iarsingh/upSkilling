const sections = {
  "Python and software engineering": [
    "Python memory management generators iterators and profiling for ML workloads",
    "Concurrency vs parallelism with asyncio threads processes and the GIL",
    "Designing typed testable Python services and reproducible packages",
    "Retries timeouts circuit breakers idempotency REST and gRPC for AI APIs"
  ],
  "SQL and data systems": [
    "SQL joins window functions CTEs and query plans for feature pipelines",
    "Preventing point in time leakage in training datasets",
    "Indexes partitioning transactions and consistency for AI applications",
    "Batch vs streaming pipelines data contracts and schema evolution"
  ],
  "Mathematics and statistics": [
    "Bias variance regularization learning curves and model debugging",
    "Probability distributions Bayes theorem and uncertainty in practice",
    "Hypothesis tests confidence intervals power and multiple comparisons",
    "Loss functions gradients optimization calibration and thresholds"
  ],
  "Classical machine learning": [
    "Linear and logistic regression assumptions diagnostics and regularization",
    "Trees random forests XGBoost LightGBM and CatBoost tradeoffs",
    "SVM KNN Naive Bayes PCA K Means and DBSCAN selection",
    "Time series validation forecasting leakage and backtesting"
  ],
  "Features and evaluation": [
    "Missing values outliers encoding scaling and feature selection",
    "Imbalanced classification metrics and decision threshold tuning",
    "Ranking recommendation and retrieval metrics offline and online",
    "Dataset shift drift delayed labels and train serve skew"
  ],
  "Deep learning": [
    "Backpropagation activations initialization and gradient flow",
    "Normalization dropout regularization and training stability",
    "CNN RNN LSTM GRU transfer learning and failure analysis",
    "Transformers attention positional encoding and KV cache internals"
  ],
  "LLM foundations": [
    "Tokenization embeddings context windows and next token prediction",
    "Pretraining instruction tuning preference optimization and alignment",
    "Temperature top p decoding and context management tradeoffs",
    "Tool calling structured outputs validation and recovery"
  ],
  "RAG and search": [
    "Production RAG architecture from ingestion to grounded answers",
    "Chunking metadata parsing dense sparse hybrid retrieval and reranking",
    "Embedding selection distance metrics normalization and migration",
    "RAG evaluation debugging citations and hallucination reduction"
  ],
  "Vector databases": [
    "HNSW IVF and product quantization internals and tradeoffs",
    "Choosing FAISS pgvector Pinecone Weaviate Milvus or Chroma",
    "Filtering multitenancy sharding consistency and security",
    "Capacity planning latency recall cost reindexing and migration"
  ],
  "Fine tuning": [
    "Prompting vs RAG vs fine tuning decision framework",
    "Supervised fine tuning dataset formatting and quality controls",
    "LoRA QLoRA PEFT adapters ranks and quantization tradeoffs",
    "Evaluation catastrophic forgetting regression tests and adapter serving"
  ],
  "Agents and MCP": [
    "Workflows vs agents vs deterministic application logic",
    "Agent planning tools memory state permissions and idempotency",
    "Single agent vs multi agent coordination cost and failure modes",
    "MCP clients servers tools resources security and evaluation"
  ],
  "MLOps lifecycle": [
    "Experiment tracking reproducibility lineage and MLflow",
    "Model registry approvals aliases promotion and rollback",
    "Feature stores offline online consistency and correctness",
    "Orchestration continuous training versioning and governance"
  ],
  "Serving and deployment": [
    "Synchronous asynchronous batch and streaming inference design",
    "FastAPI BentoML KServe Ray Serve and Triton selection",
    "Batching caching concurrency backpressure and load testing",
    "Canary shadow blue green A B rollout and rollback"
  ],
  "Docker and Kubernetes": [
    "Secure reproducible ML containers and dependency management",
    "Requests limits probes graceful shutdown and autoscaling",
    "GPU scheduling node pools taints device plugins and KServe",
    "Debugging CrashLoopBackOff OOMKilled latency and networking"
  ],
  "Cloud and infrastructure": [
    "Vertex AI vs SageMaker vs Azure ML vs self managed Kubernetes",
    "Private networking IAM secrets encryption and tenant isolation",
    "Terraform modules state environments and MLOps promotion",
    "Multi region availability disaster recovery RTO and RPO"
  ],
  "GPU and inference": [
    "GPU CUDA memory bandwidth compute and utilization fundamentals",
    "Quantization pruning distillation and compilation tradeoffs",
    "vLLM paged attention continuous batching and throughput tuning",
    "Triton TensorRT LLM and multi GPU inference architecture"
  ],
  "Observability": [
    "Model quality data quality drift latency traffic errors and saturation",
    "Metrics logs traces correlation IDs Prometheus and OpenTelemetry",
    "LLM token cost retrieval tool safety and quality observability",
    "SLOs alerts error budgets feedback loops and human review"
  ],
  "Security and governance": [
    "Threat modeling prompt injection exfiltration and retrieval poisoning",
    "PII redaction retention authorization and tenant boundaries",
    "Model supply chain SBOM signing provenance and artifact controls",
    "Bias explainability audit trails approvals and human oversight"
  ],
  "System design interviews": [
    "Design an enterprise document question answering platform",
    "Design a real time recommendation and ranking platform",
    "Design a multi tenant LLM gateway with quotas and fallbacks",
    "Design a production computer vision or fraud detection platform",
    "Estimate capacity throughput storage bandwidth and latency budgets",
    "Choose consistency availability partitioning and replication strategies",
    "Design caching rate limiting load balancing and backpressure",
    "Design queues event streams idempotent consumers and dead letter handling",
    "Design database partitioning sharding indexing and migration workflows",
    "Design high availability disaster recovery and multi region failover",
    "Explain observability SLOs security cost and operational ownership"
  ],
  "Data structures and algorithms": [
    "Big O time space complexity and practical performance analysis",
    "Arrays strings two pointers sliding windows and prefix sums",
    "Hash maps hash sets collision behavior and frequency problems",
    "Linked lists fast slow pointers reversal and cycle detection",
    "Stacks queues monotonic structures and streaming problems",
    "Binary search boundaries rotated arrays and search on answers",
    "Trees traversals recursion depth and binary search tree invariants",
    "Heaps priority queues top K selection and streaming aggregation",
    "Graphs BFS DFS topological sorting and connected components",
    "Shortest paths Dijkstra Bellman Ford and weighted graph tradeoffs",
    "Union find connectivity path compression and minimum spanning trees",
    "Recursion backtracking subsets permutations and constraint search",
    "Dynamic programming states transitions memoization and tabulation",
    "Greedy algorithms interval scheduling and proof of correctness",
    "Tries suffix structures and text retrieval applications",
    "Sorting selection partitioning stability and external sorting",
    "Bit manipulation masks sets counters and low level optimization",
    "Reservoir sampling randomized algorithms and approximate counting",
    "Concurrency safe data structures queues locks and contention",
    "Applying DSA to feature pipelines vector search and model serving"
  ],
  "Debugging interviews": [
    "Debug a model that succeeds offline but fails in production",
    "Investigate rising LLM latency and cost without losing quality",
    "Recover a RAG service producing unsupported answers",
    "Diagnose low GPU utilization and unsafe deployment controls"
  ]
};

const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

const aiEngineerInterviewTopics = Object.entries(sections).flatMap(([section, topics]) =>
  topics.flatMap((topic) =>
    levels.map((level) => `[${level}] ${section}: ${topic}`)
  )
);

module.exports = { sections, levels, aiEngineerInterviewTopics };
