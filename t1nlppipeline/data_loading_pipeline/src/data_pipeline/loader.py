from __future__ import annotations

import gzip
import logging
from dataclasses import dataclass
from pathlib import Path
from typing import Iterator

from .parsers import (
    NormalizedRecord,
    RecordValidationError,
    parse_record_line,
)


LOGGER = logging.getLogger(__name__)


@dataclass(frozen=True)
class FileInspection:
    path: Path
    sampled_lines: int
    valid_records: int
    invalid_records: int


def discover_gzip_files(
    input_directory: str | Path,
) -> list[Path]:
    """Discover gzip files recursively in deterministic order."""
    root = Path(input_directory)

    if not root.exists():
        raise FileNotFoundError(
            f"input path does not exist: {root}"
        )

    if not root.is_dir():
        raise NotADirectoryError(
            f"input path is not a directory: {root}"
        )

    return sorted(
        path
        for path in root.rglob("*")
        if path.is_file()
        and path.suffix.lower() in {".gz", ".gzip"}
    )


def inspect_file(
    file_path: str | Path,
    *,
    sample_size: int = 5,
) -> FileInspection:
    """
    Inspect representative non-empty lines without reading the full file.
    """
    path = Path(file_path)

    if sample_size <= 0:
        raise ValueError(
            "sample_size must be greater than zero"
        )

    sampled = 0
    valid = 0
    invalid = 0

    with gzip.open(
        path,
        mode="rt",
        encoding="utf-8",
        errors="replace",
    ) as stream:
        for line in stream:
            if not line.strip():
                continue

            sampled += 1

            try:
                parse_record_line(line)

            except RecordValidationError:
                invalid += 1

            else:
                valid += 1

            if sampled >= sample_size:
                break

    return FileInspection(
        path=path,
        sampled_lines=sampled,
        valid_records=valid,
        invalid_records=invalid,
    )


def inspect_input_files(
    input_directory: str | Path,
    *,
    sample_size: int = 5,
) -> list[FileInspection]:
    """Inspect representative samples from all input files."""
    return [
        inspect_file(
            path,
            sample_size=sample_size,
        )
        for path in discover_gzip_files(input_directory)
    ]


def iter_records(
    input_directory: str | Path,
    *,
    strict: bool = False,
) -> Iterator[NormalizedRecord]:
    """Stream normalized records from all gzip files."""
    files = discover_gzip_files(input_directory)

    if not files:
        raise FileNotFoundError(
            f"no .gz or .gzip files found under: "
            f"{input_directory}"
        )

    for file_path in files:
        with gzip.open(
            file_path,
            mode="rt",
            encoding="utf-8",
            errors="replace",
        ) as stream:
            for line_number, line in enumerate(
                stream,
                start=1,
            ):
                try:
                    record = parse_record_line(line)

                except RecordValidationError as exc:
                    message = (
                        f"{file_path}:{line_number}: {exc}"
                    )

                    if strict:
                        raise RecordValidationError(
                            message
                        ) from exc

                    LOGGER.warning(message)
                    continue

                if record is not None:
                    yield record