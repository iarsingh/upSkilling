import argparse
import os
from pathlib import Path


MODEL_NAME = os.getenv("GENAI_MODEL", "gemini-2.5-flash")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True, help="Transcript file path")
    parser.add_argument("--output", default="outputs/summary.md", help="Output markdown path")
    args = parser.parse_args()

    transcript = Path(args.input).read_text(encoding="utf-8")
    if os.getenv("USE_GEMINI", "false").lower() == "true":
        summary = summarize_with_gemini(transcript)
    else:
        summary = summarize_locally(transcript)

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(summary, encoding="utf-8")
    print(f"wrote summary to {output_path}")


def summarize_locally(transcript: str) -> str:
    lines = [line.strip() for line in transcript.splitlines() if line.strip()]
    action_lines = [line for line in lines if any(word in line.lower() for word in ["action", "owner", "todo", "next"])]
    risk_lines = [line for line in lines if any(word in line.lower() for word in ["risk", "blocked", "issue", "concern"])]
    decision_lines = [line for line in lines if "decision" in line.lower()]

    return "\n".join(
        [
            "# Meeting Summary",
            "",
            "## Decisions",
            *format_lines(decision_lines),
            "",
            "## Risks",
            *format_lines(risk_lines),
            "",
            "## Action Items",
            *format_lines(action_lines),
            "",
            "## Short Summary",
            " ".join(lines[:4]),
        ]
    )


def format_lines(lines: list[str]) -> list[str]:
    if not lines:
        return ["- None captured"]
    return [f"- {line}" for line in lines]


def summarize_with_gemini(transcript: str) -> str:
    from google import genai

    client = genai.Client()
    prompt = f"""
Summarize this meeting transcript as markdown with sections:
Decisions, Risks, Action Items, Owners, Follow-up Questions.

Transcript:
{transcript}
"""
    response = client.models.generate_content(model=MODEL_NAME, contents=prompt)
    return response.text or ""


if __name__ == "__main__":
    main()

