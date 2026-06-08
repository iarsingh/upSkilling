import os
from pathlib import Path

from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


DATA_DIR = Path(__file__).resolve().parents[1] / "data"
MODEL_NAME = os.getenv("GENAI_MODEL", "gemini-2.5-flash")

app = FastAPI(title="RAG Knowledge API", version="1.0.0")


class AskRequest(BaseModel):
    question: str
    top_k: int = 3


def load_documents() -> list[dict[str, str]]:
    docs = []
    for path in sorted(DATA_DIR.glob("*.md")):
        docs.append({"source": path.name, "text": path.read_text(encoding="utf-8")})
    return docs


DOCUMENTS = load_documents()
VECTORIZER = TfidfVectorizer(stop_words="english")
DOC_MATRIX = VECTORIZER.fit_transform([doc["text"] for doc in DOCUMENTS])


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "healthy", "service": "rag-knowledge-api"}


@app.post("/ask")
def ask(request: AskRequest) -> dict[str, object]:
    retrieved = retrieve(request.question, request.top_k)
    context = "\n\n".join(f"[{item['source']}]\n{item['text']}" for item in retrieved)

    if os.getenv("USE_GEMINI", "false").lower() == "true":
        answer = generate_with_gemini(request.question, context)
    else:
        answer = local_answer(request.question, retrieved)

    return {
        "question": request.question,
        "answer": answer,
        "retrieved_sources": [{"source": item["source"], "score": item["score"]} for item in retrieved],
    }


def retrieve(question: str, top_k: int) -> list[dict[str, object]]:
    query_matrix = VECTORIZER.transform([question])
    scores = cosine_similarity(query_matrix, DOC_MATRIX).flatten()
    ranked = scores.argsort()[::-1][: max(1, min(top_k, len(DOCUMENTS)))]

    results = []
    for index in ranked:
        doc = DOCUMENTS[int(index)]
        results.append(
            {
                "source": doc["source"],
                "text": doc["text"][:1200],
                "score": round(float(scores[index]), 4),
            }
        )
    return results


def local_answer(question: str, retrieved: list[dict[str, object]]) -> str:
    best = retrieved[0]
    return (
        "Local fallback answer based on retrieved context. "
        f"For question '{question}', start with source {best['source']} because it has the highest retrieval score. "
        "Review the retrieved snippets and convert them into a grounded response."
    )


def generate_with_gemini(question: str, context: str) -> str:
    from google import genai

    client = genai.Client()
    prompt = f"""
Answer the question using only the context below.
If the answer is not in the context, say that the context is insufficient.

Question:
{question}

Context:
{context}
"""
    response = client.models.generate_content(model=MODEL_NAME, contents=prompt)
    return response.text or ""

