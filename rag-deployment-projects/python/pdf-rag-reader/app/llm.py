import os

import httpx

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://127.0.0.1:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.1:8b")


def rag_prompt(question: str, context: str, history: list[dict]) -> str:
    transcript = "\n".join(f"{turn['role']}: {turn['content']}" for turn in history[-6:])
    return f"""Answer the question using only the retrieved PDF context below. If the
answer is not in the context, say the context is insufficient rather than guessing.
Cite the page number(s) you used, e.g. "(p. 4)".

Conversation so far:
{transcript or "(no prior turns)"}

Retrieved context:
{context}

Question:
{question}
"""


def generate_answer(question: str, context: str, history: list[dict]) -> str:
    if not context:
        return "No relevant content was found in the uploaded PDF(s) for this question. Upload a document first, or try rephrasing the question."

    prompt = rag_prompt(question, context, history)
    try:
        response = httpx.post(
            f"{OLLAMA_URL}/api/generate",
            json={"model": OLLAMA_MODEL, "prompt": prompt, "stream": False},
            timeout=120.0,
        )
        response.raise_for_status()
        return response.json().get("response", "")
    except Exception as error:
        return f"Local Ollama generation failed ({error}). Retrieved context is still available in retrieved_sources below."
