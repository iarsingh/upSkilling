"""Grounded answers. Citations come from retrieved rows, never from model prose."""

from __future__ import annotations

import json
import os
import urllib.error
import urllib.request
from dataclasses import dataclass

from rag.embed import embed_texts, ollama_host
from rag.models import Chunk, Hit
from rag.retrieve import hybrid_search, passes_support, select_context

DEFAULT_LLM = "llama3.1:8b"
ABSTAIN = "The runbooks do not state an answer to that question."


@dataclass(frozen=True)
class Answer:
    question: str
    text: str
    abstained: bool
    sources: list[Hit]
    nearest: list[Hit]


def llm_model() -> str:
    return os.environ.get("RAG_LLM_MODEL", DEFAULT_LLM)


def answer_question(question: str, chunks: list[Chunk], *, top_n: int = 4) -> Answer:
    question = question.strip()
    if not question:
        raise ValueError("Question is empty.")
    if not chunks:
        return Answer(question, ABSTAIN, True, [], [])

    query_embedding = embed_texts([question])[0]
    ranked = hybrid_search(question, chunks, query_embedding, top_n=top_n)
    if not passes_support(question, ranked, chunks, query_embedding):
        return Answer(question, ABSTAIN, True, [], ranked[:top_n])

    sources = select_context(ranked, top_n=top_n)
    text = generate(question, sources)
    if _refused(text):
        return Answer(question, ABSTAIN, True, sources, [])
    return Answer(question, text.strip(), False, sources, [])


def generate(question: str, sources: list[Hit]) -> str:
    passages = []
    for index, hit in enumerate(sources, start=1):
        chunk = hit.chunk
        passages.append(
            f"[{index}] {chunk.title} / {chunk.heading} ({chunk.source})\n{chunk.text}"
        )
    prompt = (
        "Write two to five sentences answering the question from the passages only. "
        "Include the times, codes, hosts, and conditions the passages actually state. "
        "If different cases have different rules, state each case. "
        "A passage can answer the question even when it uses different words. "
        "If none of the passages are on the question's topic, reply with only UNSUPPORTED. "
        "Do not reply with only a passage number.\n\n"
        "Passages:\n"
        + "\n\n".join(passages)
        + f"\n\nQuestion: {question}\nAnswer:"
    )
    payload = _post(
        "/api/generate",
        {
            "model": llm_model(),
            "prompt": prompt,
            "stream": False,
            "options": {"temperature": 0.2, "num_predict": 400},
        },
    )
    return str(payload.get("response", "")).strip()


def _refused(text: str) -> bool:
    if not text.strip():
        return True
    first = text.strip().splitlines()[0].strip().strip(".").upper()
    return first == "UNSUPPORTED" or first.startswith("UNSUPPORTED ")


def _post(path: str, body: dict) -> dict:
    data = json.dumps(body).encode("utf-8")
    request = urllib.request.Request(
        f"{ollama_host()}{path}",
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=180) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.URLError as exc:
        raise RuntimeError(
            f"Could not reach Ollama at {ollama_host()}. Start it and pull {llm_model()}."
        ) from exc
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Ollama generate request failed ({exc.code}): {detail}") from exc
