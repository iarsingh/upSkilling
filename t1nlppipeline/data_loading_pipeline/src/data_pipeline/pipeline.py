from __future__ import annotations

from collections.abc import Iterable, Iterator
from typing import TypedDict

from .batching import iter_batches
from .loader import iter_records
from .parsers import NormalizedRecord


class TextFragment(TypedDict):
    text: str
    fragmentType: str
    unixTime: int


def iter_text_fragments(
    records: Iterable[NormalizedRecord],
) -> Iterator[TextFragment]:
    """Yield the question and answer from every source record."""
    for record in records:
        yield {
            "text": record["question"],
            "fragmentType": "question",
            "unixTime": record["unixTime"],
        }

        yield {
            "text": record["answer"],
            "fragmentType": "answer",
            "unixTime": record["unixTime"],
        }


def iter_fragment_batches(
    input_directory: str,
    *,
    batch_size: int = 1000,
    strict: bool = False,
) -> Iterator[list[TextFragment]]:
    """Run the complete pipeline and yield bounded batches."""
    records = iter_records(
        input_directory,
        strict=strict,
    )

    fragments = iter_text_fragments(records)

    yield from iter_batches(
        fragments,
        batch_size=batch_size,
    )