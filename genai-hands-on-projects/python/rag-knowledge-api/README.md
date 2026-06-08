# GenAI Project: RAG Knowledge API

## Goal

Build a FastAPI Retrieval-Augmented Generation API over local knowledge documents.

The project uses TF-IDF retrieval locally and can optionally call Gemini through the Google Gen AI SDK.

## Run Locally

```bash
cd genai-hands-on-projects
pip install -r requirements.txt
cd python/rag-knowledge-api
uvicorn app.main:app --reload --port 8081
```

Ask a question:

```bash
curl -X POST http://localhost:8081/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"How should we monitor a model API on GKE?"}'
```

## Optional Gemini Mode

```bash
export USE_GEMINI=true
export GOOGLE_GENAI_USE_VERTEXAI=true
export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"
export GOOGLE_CLOUD_LOCATION="us-central1"
export GENAI_MODEL="gemini-2.5-flash"
```

## Interview Talking Points

- RAG reduces hallucination by grounding responses in retrieved context.
- Retrieval quality is as important as model quality.
- Local TF-IDF is simple; production systems usually use embeddings and vector search.
- Answers should include citations/context snippets.

