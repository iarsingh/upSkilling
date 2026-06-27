import csv
import json
from pathlib import Path

from gcp_ops_toolkit.models import Report


def write_report(report: Report, path: Path, output_format: str = "json") -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    if output_format == "json":
        path.write_text(report.model_dump_json(indent=2), encoding="utf-8")
    elif output_format == "csv":
        with path.open("w", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(
                handle,
                fieldnames=[
                    "tool",
                    "category",
                    "severity",
                    "resource",
                    "message",
                    "recommendation",
                    "metadata",
                ],
            )
            writer.writeheader()
            for finding in report.findings:
                row = finding.model_dump()
                row["metadata"] = json.dumps(row["metadata"], sort_keys=True)
                writer.writerow(row)
    else:
        raise ValueError(f"Unsupported report format: {output_format}")
    return path
