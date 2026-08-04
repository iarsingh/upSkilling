from __future__ import annotations

import gzip
import json
from collections import Counter
from pathlib import Path

import pytest

from data_pipeline.batching import iter_batches
from data_pipeline.loader import (
    inspect_input_files,
    iter_records,
)
from data_pipeline.parsers import RecordValidationError
from data_pipeline.pipeline import (
    iter_fragment_batches,
    iter_text_fragments,
)


def write_gzip_lines(
    path: Path,
    lines: list[str],
) -> None:
    with gzip.open(
        path,
        mode="wt",
        encoding="utf-8",
    ) as stream:
        for line in lines:
            stream.write(line + "\n")


def test_pipeline_returns_all_text_fragments(
    tmp_path: Path,
) -> None:
    source_records = [
        {
            "question": "What is Kubernetes?",
            "answer": (
                "A container orchestration platform."
            ),
            "unixTime": 1700000001,
        },
        {
            "question": "What is Terraform?",
            "answer": (
                "An infrastructure-as-code tool."
            ),
            "unixTime": 1700000002,
        },
        {
            "question": "What is Kubernetes?",
            "answer": (
                "A container orchestration platform."
            ),
            "unixTime": 1700000003,
        },
    ]

    write_gzip_lines(
        tmp_path / "part-1.json.gz",
        [
            json.dumps(source_records[0]),
            json.dumps(source_records[1]),
        ],
    )

    write_gzip_lines(
        tmp_path / "part-2.json.gzip",
        [
            repr(source_records[2]),
        ],
    )

    actual_fragments = list(
        iter_text_fragments(
            iter_records(
                tmp_path,
                strict=True,
            )
        )
    )

    expected = Counter(
        (
            fragment_type,
            text,
            record["unixTime"],
        )
        for record in source_records
        for fragment_type, text in (
            (
                "question",
                record["question"],
            ),
            (
                "answer",
                record["answer"],
            ),
        )
    )

    actual = Counter(
        (
            fragment["fragmentType"],
            fragment["text"],
            fragment["unixTime"],
        )
        for fragment in actual_fragments
    )

    assert actual == expected

    assert len(actual_fragments) == (
        2 * len(source_records)
    )


def test_batch_processing_returns_final_partial_batch(
    tmp_path: Path,
) -> None:
    records = [
        {
            "question": f"Question {index}",
            "answer": f"Answer {index}",
            "unixTime": 1700000000 + index,
        }
        for index in range(3)
    ]

    write_gzip_lines(
        tmp_path / "records.gz",
        [
            json.dumps(record)
            for record in records
        ],
    )

    batches = list(
        iter_fragment_batches(
            str(tmp_path),
            batch_size=4,
            strict=True,
        )
    )

    assert [
        len(batch)
        for batch in batches
    ] == [4, 2]

    assert sum(
        map(len, batches)
    ) == 6


def test_generic_batcher_preserves_order() -> None:
    actual = list(
        iter_batches(
            range(7),
            batch_size=3,
        )
    )

    expected = [
        [0, 1, 2],
        [3, 4, 5],
        [6],
    ]

    assert actual == expected


def test_non_strict_mode_skips_malformed_record(
    tmp_path: Path,
) -> None:
    valid = {
        "question": "Valid question",
        "answer": "Valid answer",
        "unixTime": 1700000001,
    }

    write_gzip_lines(
        tmp_path / "mixed.gz",
        [
            json.dumps(valid),
            "this is not JSON",
        ],
    )

    records = list(
        iter_records(
            tmp_path,
            strict=False,
        )
    )

    assert records == [valid]


def test_strict_mode_raises_for_malformed_record(
    tmp_path: Path,
) -> None:
    write_gzip_lines(
        tmp_path / "invalid.gz",
        [
            "{'question': 'Missing required fields'}",
        ],
    )

    with pytest.raises(RecordValidationError):
        list(
            iter_records(
                tmp_path,
                strict=True,
            )
        )


def test_inspection_reports_valid_and_invalid_samples(
    tmp_path: Path,
) -> None:
    valid_record = {
        "question": "Q",
        "answer": "A",
        "unixTime": 1,
    }

    write_gzip_lines(
        tmp_path / "sample.json.gz",
        [
            json.dumps(valid_record),
            "invalid-data",
        ],
    )

    reports = inspect_input_files(
        tmp_path,
        sample_size=5,
    )

    assert len(reports) == 1
    assert reports[0].sampled_lines == 2
    assert reports[0].valid_records == 1
    assert reports[0].invalid_records == 1