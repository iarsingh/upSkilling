"""Embeddings from a local Ollama model. No vectors leave this machine."""

from __future__ import annotations

import json
import os
import urllib.error
import urllib.request

DEFAULT_HOST = "http://127.0.0.1:11434"
DEFAULT_EMBED_MODEL = "nomic-embed-text"


def ollama_host() -> str:
    return os.environ.get("OLLAMA_HOST", DEFAULT_HOST).rstrip("/")


def embed_model() -> str:
    return os.environ.get("RAG_EMBED_MODEL", DEFAULT_EMBED_MODEL)


def embed_texts(texts: list[str], batch_size: int = 16) -> list[list[float]]:
    vectors: list[list[float]] = []
    for start in range(0, len(texts), batch_size):
        batch = texts[start : start + batch_size]
        payload = _post("/api/embed", {"model": embed_model(), "input": batch})
        got = payload.get("embeddings")
        if not isinstance(got, list) or len(got) != len(batch):
            raise RuntimeError("Ollama returned an unexpected embedding payload.")
        vectors.extend(got)
    return vectors


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
            f"Could not reach Ollama at {ollama_host()}. Start it and pull {embed_model()}."
        ) from exc
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Ollama embed request failed ({exc.code}): {detail}") from exc
