import csv
import json
from pathlib import Path

from gcp_ops_toolkit.models import Finding, Report, Severity
from gcp_ops_toolkit.reporting import write_report


def sample_report() -> Report:
    return Report(
        tool="test",
        findings=[
            Finding(
                tool="test",
                category="example",
                severity=Severity.HIGH,
                resource="resource/1",
                message="Example",
                recommendation="Fix it",
            )
        ],
    )


def test_json_report(tmp_path: Path) -> None:
    path = write_report(sample_report(), tmp_path / "report.json")
    assert json.loads(path.read_text())["findings"][0]["category"] == "example"


def test_csv_report(tmp_path: Path) -> None:
    path = write_report(sample_report(), tmp_path / "report.csv", "csv")
    with path.open() as handle:
        assert next(csv.DictReader(handle))["severity"] == "high"
