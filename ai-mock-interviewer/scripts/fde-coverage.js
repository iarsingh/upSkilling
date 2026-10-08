#!/usr/bin/env node
const path = require("path");

const bank = require(path.join(__dirname, "answer-bank", "94-forward-deployed-engineer.json"));
const questions = bank.map((item) => item.question.toLowerCase());

const P = 6;
const S = 3;

const taxonomy = {
  "Programming": [
    ["Python", /\bpython\b/, P], ["TypeScript", /typescript/, P], ["JavaScript", /javascript|event loop/, S], ["Go", /\bgo\b|golang|goroutine/, S],
    ["Java", /\bjava\b|jvm|spring/, S], ["SQL", /\bsql\b/, P], ["Bash & shell", /bash|shell|linux|cron/, S], ["OOP & SOLID", /solid|object-oriented|clean code/, S],
    ["DSA", /\bdsa\b|data structure|algorithm|complexity/, S], ["Async & concurrency", /async|concurren|thread|event loop/, S], ["Design patterns", /design pattern|adapter pattern|strategy pattern|factory/, S],
    ["Live coding", /\bfde coding:/, 25],
  ],
  "Frontend": [
    ["React", /react/, P], ["Next.js", /next\.js/, P], ["State management", /redux|zustand|state management/, S], ["HTML/CSS & responsive", /responsive|accessib|html|css|tailwind|material ui/, S],
    ["SSR", /server-side rendering|\bssr\b/, S], ["WebSockets", /websocket|server-sent/, S], ["Frontend architecture", /frontend architecture|frontend.*customi/, S],
  ],
  "Backend": [
    ["FastAPI", /fastapi/, P], ["Django & Flask", /django|flask/, S], ["Node.js & Express", /node\.js|express/, S], ["REST APIs", /\brest\b|rest api|api auth|webhook/, P],
    ["GraphQL", /graphql/, S], ["gRPC", /grpc/, S], ["Microservices & API gateway", /microservice|api gateway/, S], ["AuthN/AuthZ (OAuth, OIDC, JWT)", /oauth|openid|oidc|jwt|authenticat/, S],
    ["RBAC & ABAC", /rbac|abac|authoriz/, S], ["API versioning & rate limiting", /version.*api|api.*version|rate.limit/, S], ["Background jobs", /background job|celery|queue worker/, S],
  ],
  "Databases": [
    ["PostgreSQL", /postgres/, P], ["MySQL", /mysql/, S], ["MongoDB", /mongodb/, S], ["Redis", /redis/, S], ["Elasticsearch/OpenSearch", /elasticsearch|opensearch/, S],
    ["Query optimization & indexing", /query.*(slow|optimi|8 seconds)|index/, S], ["Data modeling", /data model|model data/, S], ["Migrations", /migration/, S],
    ["Vector databases", /vector database|pgvector|pinecone|weaviate|milvus|chroma/, P],
  ],
  "AI & ML": [
    ["ML fundamentals", /\bml:|machine learning|classif/, S], ["Deep learning & transformers", /deep learning|transformer|pytorch|tensorflow/, S], ["NLP", /\bnlp\b|ticket.*classif/, S],
    ["Fine-tuning & transfer learning", /fine-tun|transfer learning|lora/, S], ["Model evaluation", /evaluate a model|model evaluation/, S], ["Embeddings & semantic search", /embedding|semantic search/, S],
    ["Inference optimization", /inference latency|inference optimi|quantiz/, S],
  ],
  "GenAI & LLM": [
    ["LLM provider APIs", /openai|anthropic|claude|gemini|azure openai/, S], ["LangChain & LlamaIndex", /langchain|llamaindex/, S], ["DSPy & prompt optimization", /dspy|prompt optimi/, S],
    ["RAG", /\brag\b|retrieval/, P], ["Advanced RAG", /advanced rag|hybrid search|rerank|query rewrit/, P], ["Chunking", /chunk/, S],
    ["Context engineering", /context engineering/, P], ["Structured outputs & tool calling", /structured output|tool calling|function calling/, S], ["LLM evaluation (RAGAS, DeepEval)", /llm evals|ragas|deepeval|evaluation/, P],
    ["Guardrails & LLM security", /guardrail|prompt injection|owasp.*llm/, S], ["Token & cost optimization", /token|cost/, S], ["LLM observability", /llm observability|langfuse|langsmith/, S],
  ],
  "Agentic AI": [
    ["Agentic workflows", /agent/, P], ["LangGraph", /langgraph/, P], ["Multi-agent orchestration", /multi-agent|multiple agents|orchestrat/, S], ["Agent frameworks (CrewAI, AutoGen, SDKs, ADK)", /crewai|autogen|agents sdk|adk/, S],
    ["MCP", /model context protocol|\bmcp\b/, P], ["A2A", /agent-to-agent|\ba2a\b/, P], ["Agent memory", /memory/, S], ["Human-in-the-loop", /approval|human-in-the-loop|operator review/, S],
    ["Agent evaluation", /evaluate an agent|agent evaluation/, S], ["Agent security", /security for an agent|agent security/, S],
  ],
  "MLOps & LLMOps": [
    ["Experiment tracking & registry", /mlflow|model registry|experiment/, S], ["Model serving (vLLM, Triton, Ray Serve, Ollama)", /vllm|triton|ray serve|ollama|model serving/, S], ["Monitoring & drift", /drift|degrad/, S],
    ["Continuous training", /continuous training|retrain/, S], ["Prompt versioning", /version prompts|prompt version/, S], ["LLMOps pipelines", /llmops/, P],
  ],
  "Cloud": [
    ["Cloud architecture", /cloud architecture|multi-region|two regions|cloud project/, P], ["GCP", /\bgcp\b|google cloud|bigquery|vertex/, S], ["AWS", /\baws\b|bedrock|lambda|sagemaker/, S], ["Azure", /azure/, S],
    ["Multi & hybrid cloud", /multi-cloud|hybrid cloud|air-gapped/, S], ["Serverless", /serverless|cloud run|lambda|functions/, S], ["Cloud IAM", /iam|permission denied/, S], ["FinOps", /finops|cost optimi|costs tripled/, S],
  ],
  "DevOps & Platform": [
    ["Docker", /docker|container image/, S], ["Kubernetes", /kubernetes|crashloop|manifest/, P], ["Helm & Kustomize", /helm|kustomize/, S], ["Terraform", /terraform/, P],
    ["CI/CD", /ci\/cd|pipeline/, P], ["GitOps", /gitops|argo|flux/, S], ["Policy as code", /policy as code|\bopa\b/, S], ["Platform engineering & IDP", /platform engineering|backstage|developer platform/, S], ["Release engineering", /release/, S],
  ],
  "System Design": [
    ["High-level design", /high-level design/, P], ["Low-level design", /low-level design/, P], ["Distributed systems", /distributed|two regions|partition/, P], ["Event-driven & queues", /event|kafka|pub\/sub|rabbitmq/, S],
    ["DDD", /domain-driven/, S], ["CAP & consistency", /cap theorem|consistency|stale data/, S], ["Caching", /cach/, S], ["Sharding & replication", /shard|replicat/, S], ["HA, fault tolerance & DR", /fault toleran|disaster|high availability/, S],
    ["Performance & scalability", /latency|scale|performance/, S],
  ],
  "Data Engineering": [
    ["Pipelines (ETL/ELT)", /etl|elt|pipeline/, S], ["Spark & streaming", /spark|streaming/, S], ["Airflow & dbt", /airflow|dbt/, S], ["Warehouse/lake/lakehouse", /warehouse|lake/, S], ["Data quality & governance", /data quality|governance|data contract/, S],
  ],
  "Security & DevSecOps": [
    ["AppSec & OWASP", /owasp|appsec|application security/, S], ["SAST/DAST/SCA", /sast|dast|\bsca\b|static analysis/, S], ["Container & K8s security", /secure containers|container security|kubernetes security|base image/, S],
    ["Secrets management", /secret/, S], ["Zero trust & encryption", /zero trust|encrypt|tls/, S], ["Threat modeling", /threat model/, S], ["Compliance (SOC 2, GDPR, ISO)", /gdpr|soc 2|iso 27001/, S],
    ["AI security & PII", /ai security|pii|personal data|prompt injection/, P],
  ],
  "Observability & SRE": [
    ["Metrics, logs & tracing", /telemetry|observability|logging|tracing/, S], ["SLI/SLO/SLA", /\bslos?\b|\bslis?\b|\bslas?\b|error budget/, S], ["Incident management & RCA", /incident|escalat|root cause/, S], ["Chaos & capacity", /chaos|capacity/, S],
  ],
  "Testing": [
    ["Test strategy", /testing strategy|test strategy/, S], ["E2E & API testing", /playwright|selenium|postman|end-to-end test|api test/, S], ["Contract testing", /contract test/, S], ["Load & performance testing", /load test|performance test/, S],
    ["TDD/BDD", /tdd|bdd/, S], ["Code review & static analysis", /code review|static analysis/, S],
  ],
  "Forward Deployment": [
    ["Technical discovery", /discovery/, P], ["Requirements & business process", /requirement|workflow|business process/, S], ["Solution architecture", /architecture|design a|design the/, P], ["Legacy modernization", /legacy/, S],
    ["PoC, MVP & rapid prototyping", /proof of concept|prototyp|mvp|poc/, P], ["Production deployment", /production|go-live|deploy/, P], ["Customer environment troubleshooting", /customer('s)? (environment|cluster|production)|jump host/, S], ["Enterprise AI adoption", /adoption|refuse to use/, S],
  ],
  "Leadership": [
    ["Stakeholder & customer communication", /stakeholder|sponsor|champion/, P], ["Executive communication", /executive|vp |coo|board/, S], ["Technical leadership & mentoring", /mentor|lead/, S], ["Architecture trade-offs & decisions", /trade-?off|choose|compare/, S],
    ["Delivery & risk management", /delay|risk|scope/, S], ["ROI & business impact", /\broi\b|business value/, S], ["Pre-sales & demos", /pre-sales|demo/, S], ["Documentation", /documentation|runbook/, S],
  ],
  "M1 Problem Articulation": [
    ["Stated ask vs real problem", /stated ask|real problem|asks for .* but/, S], ["3-Why, 5-Why & decomposition", /five whys|5-why|3-why|decompos/, S], ["Client deep-dives", /deep-dive|deep dive/, S],
    ["Reading stakeholders & the room", /reading the room|read the room|body language|silent stakeholder|hidden agenda|stakeholder map/, S], ["Design thinking & UX for AI", /design thinking|ux for ai|user experience/, S], ["Business to tech translation", /problem articulation:.*translat|business requirement/, S],
  ],
  "M2 Data Foundations": [
    ["Window functions, CTEs & optimization", /window function|\bcte\b|explain analyze|query optimi|top 2 orders|running total/, S], ["ER modeling & normalization", /normaliz|entity-relationship|\ber model/, S],
    ["Dimensional modeling & star schema", /star schema|dimensional model|fact table|slowly changing/, S], ["Warehouse vs lakehouse", /lakehouse/, S],
    ["ETL/ELT DAGs & incremental loading", /incremental load|incremental model|\bdag/, S], ["Data quality, lineage & monitoring", /lineage|data quality/, S],
  ],
  "M3 Prototyping & Prompting": [
    ["Streamlit dashboards", /streamlit/, S], ["Prompt frameworks & few-shot", /few-shot|prompt framework/, S], ["Chain-of-thought & reflection", /chain-of-thought|reflection|self-critique/, S],
    ["Structured outputs & function calling", /structured output|function calling|json/, S], ["Workflow automation", /workflow automation|n8n|zapier|power automate/, S], ["End-to-end GenAI app", /end-to-end genai|genai app/, S],
  ],
  "M4 Applied ML": [
    ["Supervised learning & features", /supervised|feature engineering|applied ml:.*feature/, S], ["Hyperparameter tuning", /hyperparameter|optuna/, S], ["Metrics & cross-validation", /cross-validation|applied ml:.*metrics|threshold/, S],
    ["MLflow tracking & registry", /mlflow|registry/, S], ["FastAPI model serving", /serv(e|ing) .*model|model serving/, S], ["Pipelines, monitoring & drift", /drift|retrain/, S],
  ],
  "M5 Deep Learning & NLP": [
    ["Neural nets, backprop & optimizers", /backprop|optimizer|neural network|gradient/, S], ["CNNs & computer vision", /\bcnn|computer vision|image/, S], ["Transfer learning & fine-tuning", /transfer learning|fine-tun/, S],
    ["Tokenization, embeddings & transformers", /tokeniz|embedding|transformer/, S], ["Semantic search", /semantic search|hybrid search|vector search/, S], ["Advanced NLP & LLM apps", /\bnlp\b|summariz|extract structured/, S],
  ],
  "M6 Deployment & Consulting": [
    ["Production RAG to MVP", /rag.*(mvp|production)|(mvp|production).*rag/, S], ["Solution discovery & scoping", /scop/, S], ["Architecture decisions", /architecture decision|\badr\b|trade-?off/, S],
    ["Governance (EU AI Act, NIST AI RMF)", /eu ai act|nist ai rmf|ai governance/, S], ["Evaluation, observability & LLMOps", /eval|observability|llmops/, S], ["Practitioner case studies", /case study|lessons learned|post-mortem|retrospective/, S],
  ],
  "M7 Enterprise Apps": [
    ["GenAI on the client's stack", /client's stack|existing stack|enterprise app/, S], ["License-free hands-on build", /license-free|free tier|developer edition|open-source alternative|no access to the client's licensed/, S],
    ["Salesforce (CRM)", /salesforce|crm/, S], ["SAP (ERP)", /\bsap\b|\berp\b/, S], ["MuleSoft (Integration)", /mulesoft|anypoint/, S], ["Licensed platform features", /einstein|agentforce|joule|sap ai core|licensed/, S],
  ],
};

let totalTarget = 0;
let totalMet = 0;
const gaps = [];
for (const [area, subtopics] of Object.entries(taxonomy)) {
  const rows = subtopics.map(([name, pattern, target]) => {
    const count = questions.filter((q) => pattern.test(q)).length;
    totalTarget += 1;
    if (count >= target) totalMet += 1;
    else gaps.push(`${area} > ${name}: ${count}/${target}`);
    return `${count >= target ? "ok " : "-- "}${String(count).padStart(3)}/${target} ${name}`;
  });
  console.log(`\n${area}`);
  rows.forEach((row) => console.log(`  ${row}`));
}
console.log(`\nFDE questions: ${bank.length}`);
console.log(`Subtopics at target: ${totalMet}/${totalTarget}`);
if (process.argv.includes("--gaps")) {
  console.log("\nGaps:");
  gaps.forEach((gap) => console.log(`  ${gap}`));
}
