from __future__ import annotations

from collections.abc import Iterable, Iterator
from typing import TypeVar

T = TypeVar("T")


def iter_batches(items: Iterable[T], batch_size: int) -> Iterator[list[T]]:
    """Yield fixed-size batches plus one final partial batch."""
    if batch_size <= 0:
        raise ValueError("batch_size must be greater than zero")

    batch: list[T] = []

    for item in items:
        batch.append(item)

        if len(batch) == batch_size:
            yield batch
            batch = []

    if batch:
        yield batch