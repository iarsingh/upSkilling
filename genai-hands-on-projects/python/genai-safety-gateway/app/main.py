import json
import os
import re
import time
from pathlib import Path
from uuid import uuid4

from fastapi import FastAPI
from pydantic import BaseModel


MODEL_NAME = os.getenv("GENAI_MODEL", "gemini-2.5-flash")
LOG_PATH = Path("audit_log.jsonl")

app = FastAPI(title="GenAI Safety Gateway", version="1.0.0")


class GenerateRequest(BaseModel):
    prompt: str


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "healthy", "service": "genai-safety-gateway"}


@app.post("/generate")
def generate(request: GenerateRequest) -> dict[str, object]:
    request_id = str(uuid4())
    start = time.time()

    redacted_prompt = redact_pii(request.prompt)
    input_decision = evaluate_prompt(redacted_prompt)

    if input_decision["blocked"]:
        response_text = "Request blocked by input safety policy."
    elif os.getenv("USE_GEMINI", "false").lower() == "true":
        response_text = generate_with_gemini(redacted_prompt)
    else:
        response_text = local_response(redacted_prompt)

    output_decision = evaluate_response(response_text)
    if output_decision["blocked"]:
        response_text = "Response blocked by output safety policy."

    latency_ms = int((time.time() - start) * 1000)
    write_audit_log(
        {
            "request_id": request_id,
            "model": MODEL_NAME if os.getenv("USE_GEMINI", "false").lower() == "true" else "local-fallback",
            "latency_ms": latency_ms,
            "input_blocked": input_decision["blocked"],
            "input_reasons": input_decision["reasons"],
            "output_blocked": output_decision["blocked"],
            "output_reasons": output_decision["reasons"],
        }
    )

    return {
        "request_id": request_id,
        "response": response_text,
        "input_policy": input_decision,
        "output_policy": output_decision,
        "latency_ms": latency_ms,
    }


def redact_pii(text: str) -> str:
    text = re.sub(r"[\w\.-]+@[\w\.-]+\.\w+", "[REDACTED_EMAIL]", text)
    text = re.sub(r"\b(?:\+?\d[\d -]{8,}\d)\b", "[REDACTED_PHONE]", text)
    return text


def evaluate_prompt(prompt: str) -> dict[str, object]:
    risky_terms = ["ignore previous instructions", "reveal secrets", "print api key", "disable safety"]
    reasons = [term for term in risky_terms if term in prompt.lower()]
    return {"blocked": bool(reasons), "reasons": reasons}


def evaluate_response(response: str) -> dict[str, object]:
    risky_terms = ["api_key=", "password=", "private key"]
    reasons = [term for term in risky_terms if term in response.lower()]
    return {"blocked": bool(reasons), "reasons": reasons}


def local_response(prompt: str) -> str:
    return f"Local fallback response. Safe prompt after redaction: {prompt[:300]}"


def generate_with_gemini(prompt: str) -> str:
    from google import genai

    client = genai.Client()
    response = client.models.generate_content(model=MODEL_NAME, contents=prompt)
    return response.text or ""


def write_audit_log(event: dict[str, object]) -> None:
    with LOG_PATH.open("a", encoding="utf-8") as file:
        file.write(json.dumps(event) + "\n")

