from __future__ import annotations

import ast
import json
from typing import Any, TypedDict


class NormalizedRecord(TypedDict):
    question: str
    answer: str
    unixTime: int


REQUIRED_FIELDS = ("question", "answer", "unixTime")


class RecordValidationError(ValueError):
    """Raised when an input line cannot be parsed or validated."""


def _decode_object(line: str) -> dict[str, Any]:
    """Decode one line as strict JSON or a safe Python literal object."""
    try:
        value = json.loads(line)

    except json.JSONDecodeError:
        try:
            value = ast.literal_eval(line)

        except (SyntaxError, ValueError) as exc:
            raise RecordValidationError(
                "record is neither valid JSON nor a valid Python literal"
            ) from exc

    if not isinstance(value, dict):
        raise RecordValidationError(
            "expected an object/dictionary record"
        )

    return value


def parse_record_line(line: str) -> NormalizedRecord | None:
    """Parse and normalize one record. Blank lines return None."""
    stripped = line.strip()

    if not stripped:
        return None

    value = _decode_object(stripped)

    missing = [
        field
        for field in REQUIRED_FIELDS
        if field not in value
    ]

    if missing:
        raise RecordValidationError(
            f"missing required field(s): {', '.join(missing)}"
        )

    question = value["question"]
    answer = value["answer"]

    if not isinstance(question, str) or not question.strip():
        raise RecordValidationError(
            "'question' must be a non-empty string"
        )

    if not isinstance(answer, str) or not answer.strip():
        raise RecordValidationError(
            "'answer' must be a non-empty string"
        )

    unix_time_raw = value["unixTime"]

    if isinstance(unix_time_raw, bool):
        raise RecordValidationError(
            "'unixTime' must be an integer timestamp"
        )

    try:
        unix_time = int(unix_time_raw)

    except (TypeError, ValueError) as exc:
        raise RecordValidationError(
            "'unixTime' must be an integer timestamp"
        ) from exc

    return {
        "question": question.strip(),
        "answer": answer.strip(),
        "unixTime": unix_time,
    }