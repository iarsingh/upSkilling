from __future__ import annotations

import argparse
import json
import logging
from collections.abc import Sequence

from .loader import inspect_input_files
from .pipeline import iter_fragment_batches


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description=(
            "Stream, validate, batch, and print "
            "gzip dataset fragments."
        )
    )

    parser.add_argument(
        "input_directory",
        help="Directory containing gzip input files",
    )

    parser.add_argument(
        "--batch-size",
        type=int,
        default=1000,
        help="Number of fragments per batch",
    )

    parser.add_argument(
        "--strict",
        action="store_true",
        help="Stop processing when an invalid record is found",
    )

    parser.add_argument(
        "--inspect-only",
        action="store_true",
        help="Inspect representative records and exit",
    )

    parser.add_argument(
        "--sample-size",
        type=int,
        default=5,
        help="Number of non-empty lines to inspect per file",
    )

    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Maximum number of fragments to print",
    )

    return parser


def print_inspection(
    input_directory: str,
    sample_size: int,
) -> None:
    reports = inspect_input_files(
        input_directory,
        sample_size=sample_size,
    )

    if not reports:
        print("No gzip files were found.")
        return

    for report in reports:
        result = {
            "file": str(report.path),
            "sampledLines": report.sampled_lines,
            "validRecords": report.valid_records,
            "invalidRecords": report.invalid_records,
        }

        print(json.dumps(result))


def main(
    argv: Sequence[str] | None = None,
) -> int:
    args = build_parser().parse_args(argv)

    if args.batch_size <= 0:
        raise SystemExit(
            "--batch-size must be greater than zero"
        )

    if args.sample_size <= 0:
        raise SystemExit(
            "--sample-size must be greater than zero"
        )

    if args.limit is not None and args.limit < 0:
        raise SystemExit(
            "--limit cannot be negative"
        )

    logging.basicConfig(
        level=logging.INFO,
        format="%(levelname)s %(name)s: %(message)s",
    )

    print_inspection(
        args.input_directory,
        args.sample_size,
    )

    if args.inspect_only:
        return 0

    printed = 0

    batches = iter_fragment_batches(
        args.input_directory,
        batch_size=args.batch_size,
        strict=args.strict,
    )

    for batch_number, batch in enumerate(
        batches,
        start=1,
    ):
        print(
            f"--- batch {batch_number}, "
            f"size={len(batch)} ---"
        )

        for fragment in batch:
            if (
                args.limit is not None
                and printed >= args.limit
            ):
                return 0

            print(
                json.dumps(
                    fragment,
                    ensure_ascii=False,
                )
            )

            printed += 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())