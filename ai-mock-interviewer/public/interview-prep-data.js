const INTERVIEW_PREP_DOMAINS = [
  {
    name: "Programming & Software Foundations",
    description: "Languages, source control, API development, engineering practices, and problem solving.",
    topics: ["Python", "SQL", "Bash", "Git", "GitHub", "Object-Oriented Programming (OOP)", "Data Structures and Algorithms (DSA)", "REST APIs", "FastAPI", "Flask", "gRPC", "REST API Development", "Software Engineering", "Design Patterns", "Problem Solving"]
  },
  {
    name: "Mathematics, Statistics & Experimentation",
    description: "The mathematical and experimental reasoning expected in data and ML interviews.",
    topics: ["Statistics", "Probability", "Linear Algebra", "Calculus", "Optimization", "Bayesian Statistics", "Hypothesis Testing", "Experimental Design", "A/B Testing"]
  },
  {
    name: "Data Analysis & Processing",
    description: "Cleaning, exploration, feature work, and scalable dataframe processing.",
    topics: ["Feature Engineering", "Data Cleaning", "Exploratory Data Analysis (EDA)", "Pandas", "NumPy", "Polars", "PySpark", "Dask", "Apache Spark", "Databricks"]
  },
  {
    name: "Visualization & Data Applications",
    description: "Communicating findings through plots, dashboards, and interactive analytical apps.",
    topics: ["Matplotlib", "Seaborn", "Plotly", "Tableau", "Power BI", "Streamlit", "Dash", "Storytelling"]
  },
  {
    name: "Classical Machine Learning",
    description: "Core supervised, unsupervised, dimensionality-reduction, and forecasting methods.",
    topics: ["Scikit-learn", "Linear Regression", "Logistic Regression", "Decision Trees", "Random Forest", "XGBoost", "LightGBM", "CatBoost", "Support Vector Machines (SVM)", "K-Nearest Neighbors (KNN)", "Naive Bayes", "Principal Component Analysis (PCA)", "K-Means Clustering", "DBSCAN", "Hierarchical Clustering", "Time Series Forecasting", "ARIMA", "Prophet"]
  },
  {
    name: "Deep Learning",
    description: "Neural-network foundations, architectures, training frameworks, and generative models.",
    topics: ["Deep Learning", "Neural Networks", "Artificial Neuron", "Perceptron", "Multilayer Perceptron (MLP)", "Network Architecture", "Forward Propagation", "Backpropagation", "Computational Graphs", "Activation Functions", "Loss Functions", "Gradient Descent", "Neural Network Optimizers", "Weight Initialization", "Learning Rate Scheduling", "Batch Normalization", "Layer Normalization", "Dropout", "Neural Network Regularization", "Gradient Checking", "Vanishing and Exploding Gradients", "Neural Network Training Loops", "TensorFlow", "Keras", "PyTorch", "CNN", "RNN", "LSTM", "GRU", "Transformers", "Attention Mechanism", "Autoencoders", "GANs", "Diffusion Models"]
  },
  {
    name: "NLP & Language Applications",
    description: "Libraries and techniques for building production language-processing systems.",
    topics: ["Hugging Face Transformers", "Hugging Face Hub", "spaCy", "NLTK", "Sentence Transformers", "Tokenization", "Named Entity Recognition (NER)", "Text Classification", "Sentiment Analysis", "Summarization", "Question Answering"]
  },
  {
    name: "Computer Vision",
    description: "Image understanding, recognition, detection, OCR, and segmentation.",
    topics: ["OpenCV", "YOLO", "Detectron2", "OCR", "Object Detection", "Image Segmentation"]
  },
  {
    name: "LLMs & Generative AI",
    description: "Model APIs, open models, adaptation techniques, retrieval, and production evaluation.",
    topics: ["OpenAI API", "GPT-4.1", "GPT-5", "Responses API", "Function Calling", "Structured Outputs", "Claude API", "Gemini API", "Llama", "Mistral", "Qwen", "DeepSeek", "Gemma", "Prompt Engineering", "Retrieval-Augmented Generation (RAG)", "Embeddings", "Fine-tuning", "LoRA", "PEFT", "RLHF", "LLM Evaluation"]
  },
  {
    name: "Agents, Orchestration & MCP",
    description: "Agent architectures, coordination patterns, tool use, and modern AI frameworks.",
    topics: ["AI Agents", "Agentic AI", "Multi-Agent Systems", "Model Context Protocol (MCP)", "LangChain", "LangGraph", "LlamaIndex", "DSPy", "Semantic Kernel", "CrewAI", "AutoGen"]
  },
  {
    name: "Vector Search & Retrieval Stores",
    description: "Vector indexing, semantic retrieval, metadata filtering, and database selection.",
    topics: ["Pinecone", "FAISS", "ChromaDB", "Weaviate", "Milvus", "pgvector", "Chunking Strategies", "Retrieval Optimization", "Reranking"]
  },
  {
    name: "MLOps & ML Platforms",
    description: "Experimentation, orchestration, governance, registries, stores, monitoring, and explainability.",
    topics: ["MLOps", "MLflow", "Kubeflow", "Vertex AI", "Vertex AI Pipelines", "Amazon SageMaker", "Azure Machine Learning", "Weights & Biases (W&B)", "Feature Store", "Model Registry", "Experiment Tracking", "Model Versioning", "Model Monitoring", "MLflow Monitoring", "Drift Detection", "Shadow Deployment", "Explainable AI (XAI)"]
  },
  {
    name: "Model Serving & AI Infrastructure",
    description: "Serving frameworks, GPU execution, distributed training, and inference optimization.",
    topics: ["AI Infrastructure", "BentoML", "KServe", "TorchServe", "NVIDIA Triton Inference Server", "Ray Serve", "NVIDIA GPUs", "NVIDIA CUDA", "Multi-GPU Training", "Multi-GPU Inference", "Distributed Training", "vLLM", "TensorRT-LLM", "Ray", "GPU Optimization", "Load Balancing"]
  },
  {
    name: "Containers, Kubernetes & Service Networking",
    description: "Packaging, orchestration, deployment configuration, ingress, and service-mesh concepts.",
    topics: ["Docker", "Kubernetes", "Helm", "Kustomize", "Istio", "NGINX", "Microservices"]
  },
  {
    name: "Cloud Platforms",
    description: "Core AWS, GCP, and Azure services used by production data and AI systems.",
    topics: ["Cloud Computing", "AWS", "Amazon S3", "EC2", "Lambda", "ECS", "EKS", "RDS", "GCP", "Google Kubernetes Engine (GKE)", "Cloud Run", "BigQuery", "Cloud Storage", "Pub/Sub", "Azure", "Azure Kubernetes Service (AKS)", "Azure Functions"]
  },
  {
    name: "Infrastructure, CI/CD & GitOps",
    description: "Infrastructure automation, delivery pipelines, configuration management, and deployment control.",
    topics: ["DevOps", "Terraform", "Ansible", "GitHub Actions", "GitLab CI/CD", "Jenkins", "Argo CD", "CI/CD", "GitOps", "Linux", "Shell Scripting"]
  },
  {
    name: "Data Engineering & Databases",
    description: "Workflow orchestration, messaging, lakehouse formats, databases, caching, and search.",
    topics: ["Data Engineering", "Apache Airflow", "Apache Kafka", "RabbitMQ", "Snowflake", "Delta Lake", "Apache Iceberg", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "OpenSearch"]
  },
  {
    name: "Observability & Model Reliability",
    description: "Metrics, dashboards, logs, traces, and specialized ML monitoring platforms.",
    topics: ["Prometheus", "Grafana", "ELK Stack", "OpenTelemetry", "Evidently AI", "WhyLabs", "Arize AI"]
  },
  {
    name: "Enterprise Agent Engineering",
    description: "Client-facing workflow automation, enterprise connectors, agent safety, document intelligence, and AWS agent operations.",
    topics: ["Strands Agents", "AWS AgentCore", "Agent Skills", "Tool Integration", "Context Management", "Agent Guardrails", "Hallucination Mitigation", "Human-in-the-Loop (HITL)", "Agent Observability", "Agent Evaluation", "Task Delegation", "Result Aggregation", "Workflow Decomposition", "SharePoint Integration", "Email Integration", "Jira Integration", "SAP Integration", "PDF Processing", "Excel Processing", "Unstructured Data Extraction", "Document Classification", "JWT", "OAuth2", "API Security", "Next.js", "TypeScript", "Tailwind CSS", "UiPath", "Power Automate", "Commercial Real Estate (CRE)"]
  },
  {
    name: "Architecture, Product & Leadership",
    description: "Senior-level system thinking, business alignment, communication, and stakeholder impact.",
    topics: ["System Design", "Business Understanding", "Product Thinking", "Communication", "Stakeholder Management"]
  }
];

const INTERVIEW_PREP_ROLE_MATRIX = [
  { skill: "Python", dataScientist: 5, mlEngineer: 5 },
  { skill: "Statistics & probability", dataScientist: 5, mlEngineer: 3 },
  { skill: "Machine learning algorithms", dataScientist: 5, mlEngineer: 4 },
  { skill: "Deep learning", dataScientist: 4, mlEngineer: 5 },
  { skill: "SQL", dataScientist: 5, mlEngineer: 3 },
  { skill: "Data visualization", dataScientist: 4, mlEngineer: 2 },
  { skill: "Feature engineering", dataScientist: 5, mlEngineer: 4 },
  { skill: "Model deployment", dataScientist: 2, mlEngineer: 5 },
  { skill: "Docker & Kubernetes", dataScientist: 1, mlEngineer: 4 },
  { skill: "Cloud platforms", dataScientist: 2, mlEngineer: 5 },
  { skill: "CI/CD", dataScientist: 1, mlEngineer: 4 },
  { skill: "MLOps", dataScientist: 2, mlEngineer: 5 },
  { skill: "LLMs & Generative AI", dataScientist: 4, mlEngineer: 5 }
];

const INTERVIEW_PREP_AI_ENGINEER = {
  title: "The AI Engineer profile combines both sides.",
  summary: "Statistics and ML · production software engineering · LLM/GenAI systems · cloud and Kubernetes · evaluation, monitoring, and product thinking"
};

const DATA_SCIENCE_PATH = {
  title: "Data Science Interview Path",
  description: "A role-focused progression from analytical foundations to production-aware data science and applied generative AI.",
  stages: [
    { name: "Stage 1 · Foundations", description: "Build the programming, mathematical, data, and communication base used throughout interviews.", domains: ["Programming & Software Foundations", "Mathematics, Statistics & Experimentation", "Data Analysis & Processing", "Visualization & Data Applications"] },
    { name: "Stage 2 · Core Modeling", description: "Develop practical depth in supervised learning, unsupervised learning, forecasting, neural networks, language, and vision.", domains: ["Classical Machine Learning", "Deep Learning", "NLP & Language Applications", "Computer Vision"] },
    { name: "Stage 3 · GenAI Applications", description: "Connect modern model APIs and open models with retrieval, evaluation, agents, and vector search.", domains: ["LLMs & Generative AI", "Agents, Orchestration & MCP", "Vector Search & Retrieval Stores"] },
    { name: "Stage 4 · Production Literacy", description: "Learn enough MLOps, cloud, data engineering, and observability to ship and defend real systems.", domains: ["MLOps & ML Platforms", "Cloud Platforms", "Data Engineering & Databases", "Observability & Model Reliability"] },
    { name: "Stage 5 · Senior Interview Readiness", description: "Turn technical knowledge into system decisions, product judgment, and stakeholder impact.", domains: ["Architecture, Product & Leadership"] }
  ]
};

const AI_AGENT_ENGINEER_PATH = {
  title: "AI Agent Engineer Interview Path",
  description: "A job-aligned path for building, deploying, evaluating, and explaining production agentic AI systems.",
  stages: [
    { name: "Stage 1 · Production Python & APIs", description: "Build reliable asynchronous services and secure APIs that agents can invoke.", topics: ["Python", "Object-Oriented Programming (OOP)", "Data Structures and Algorithms (DSA)", "FastAPI", "REST API Development", "SQL", "PostgreSQL", "JWT", "OAuth2", "API Security", "Git", "GitHub"] },
    { name: "Stage 2 · LLM & Agent Foundations", description: "Master model APIs, prompts, tools, context, reusable skills, and orchestration patterns.", topics: ["OpenAI API", "GPT-5", "Claude API", "Gemini API", "Responses API", "Function Calling", "Structured Outputs", "Prompt Engineering", "AI Agents", "Agentic AI", "Agent Skills", "Tool Integration", "Context Management", "Task Delegation", "Result Aggregation", "Multi-Agent Systems", "Model Context Protocol (MCP)", "Strands Agents", "LangGraph", "CrewAI", "AutoGen"] },
    { name: "Stage 3 · RAG & Document Intelligence", description: "Create grounded agents over enterprise documents and structured business data.", topics: ["Retrieval-Augmented Generation (RAG)", "Embeddings", "Pinecone", "pgvector", "OpenSearch", "FAISS", "ChromaDB", "Chunking Strategies", "Retrieval Optimization", "Reranking", "PDF Processing", "Excel Processing", "Unstructured Data Extraction", "Document Classification"] },
    { name: "Stage 4 · Enterprise Workflow Automation", description: "Translate manual processes into governed agent workflows connected to business systems.", topics: ["Workflow Decomposition", "SharePoint Integration", "Email Integration", "Jira Integration", "SAP Integration", "Human-in-the-Loop (HITL)", "UiPath", "Power Automate", "Business Understanding", "Product Thinking", "Stakeholder Management", "Communication", "Commercial Real Estate (CRE)"] },
    { name: "Stage 5 · Safety, Evaluation & Reliability", description: "Prove agent quality and constrain unsafe or unreliable behavior before production rollout.", topics: ["Agent Guardrails", "Hallucination Mitigation", "Agent Evaluation", "LLM Evaluation", "Agent Observability", "Model Monitoring", "Prometheus", "Grafana", "OpenTelemetry", "Experiment Tracking", "A/B Testing", "Explainable AI (XAI)"] },
    { name: "Stage 6 · AWS Deployment & Delivery", description: "Package, deploy, scale, observe, and continuously deliver agent workloads on AWS.", topics: ["AWS AgentCore", "AWS", "Amazon S3", "EC2", "Lambda", "ECS", "RDS", "Docker", "GitHub Actions", "CI/CD", "Terraform", "Kubernetes", "System Design", "Microservices", "Load Balancing"] },
    { name: "Stage 7 · Preferred Full-Stack Skills", description: "Cover the frontend and supporting technologies frequently requested for end-to-end ownership.", topics: ["Next.js", "TypeScript", "Tailwind CSS", "Fine-tuning", "LoRA", "PEFT"] }
  ]
};

if (typeof window !== "undefined") {
  window.INTERVIEW_PREP_DOMAINS = INTERVIEW_PREP_DOMAINS;
  window.INTERVIEW_PREP_ROLE_MATRIX = INTERVIEW_PREP_ROLE_MATRIX;
  window.INTERVIEW_PREP_AI_ENGINEER = INTERVIEW_PREP_AI_ENGINEER;
  window.DATA_SCIENCE_PATH = DATA_SCIENCE_PATH;
  window.AI_AGENT_ENGINEER_PATH = AI_AGENT_ENGINEER_PATH;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    domains: INTERVIEW_PREP_DOMAINS,
    roleMatrix: INTERVIEW_PREP_ROLE_MATRIX,
    aiEngineer: INTERVIEW_PREP_AI_ENGINEER,
    dataSciencePath: DATA_SCIENCE_PATH,
    aiAgentEngineerPath: AI_AGENT_ENGINEER_PATH
  };
}
