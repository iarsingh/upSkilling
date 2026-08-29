import os

import httpx

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://127.0.0.1:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.1:8b")
GEMINI_MODEL = os.getenv("GENAI_MODEL", "gemini-2.5-flash")


class OllamaProvider:
    name = "ollama"

    def __init__(self, model: str = OLLAMA_MODEL, base_url: str = OLLAMA_URL):
        self.model = model
        self.base_url = base_url

    def generate(self, prompt: str, timeout: float = 120.0) -> str:
        response = httpx.post(
            f"{self.base_url}/api/generate",
            json={"model": self.model, "prompt": prompt, "stream": False},
            timeout=timeout,
        )
        response.raise_for_status()
        return response.json().get("response", "")


class GeminiProvider:
    name = "gemini"

    def __init__(self, model: str = GEMINI_MODEL):
        self.model = model

    def generate(self, prompt: str, timeout: float = 60.0) -> str:
        from google import genai

        client = genai.Client()
        response = client.models.generate_content(model=self.model, contents=prompt)
        return response.text or ""


def available_providers() -> dict[str, object]:
    """Ollama is always available (local, no credentials needed). Gemini is added
    only when Vertex AI / API-key configuration is present, so /models accurately
    reflects what will actually work rather than listing an unusable option."""
    providers: dict[str, object] = {"ollama": OllamaProvider()}
    if os.getenv("GOOGLE_CLOUD_PROJECT") or os.getenv("GOOGLE_API_KEY"):
        providers["gemini"] = GeminiProvider()
    return providers
