from __future__ import annotations

import gzip
import json
from pathlib import Path


def main() -> None:
    output_directory = Path(__file__).parent / "input"
    output_directory.mkdir(parents=True, exist_ok=True)

    json_records = [
        {
            "question": "What is Kubernetes?",
            "answer": "Kubernetes is a container orchestration platform.",
            "unixTime": 1700000001,
        },
        {
            "question": "What is Terraform?",
            "answer": "Terraform is an infrastructure-as-code tool.",
            "unixTime": 1700000002,
        },
    ]

    with gzip.open(
        output_directory / "part-1.json.gz",
        mode="wt",
        encoding="utf-8",
    ) as stream:
        for record in json_records:
            stream.write(json.dumps(record) + "\n")

    python_literal_record = {
        "question": "What is a generator?",
        "answer": "A generator yields values lazily.",
        "unixTime": 1700000003,
    }

    with gzip.open(
        output_directory / "part-2.json.gzip",
        mode="wt",
        encoding="utf-8",
    ) as stream:
        stream.write(repr(python_literal_record) + "\n")

    print(f"Created sample files under: {output_directory}")


if __name__ == "__main__":
    main()