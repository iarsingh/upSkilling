import csv
import json
import random
import struct
import zlib
from datetime import date, datetime, timedelta, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_ROOT = ROOT / "kaggle-100-portfolio-datasets"
AUTHOR = "iamarsingh"
RANDOM_SEED = 20260609
ROWS_PER_DATASET = 1000

TOPICS = [
    ("gcp-cost", "GCP cost optimization", "cost_anomaly"),
    ("gke-sre", "GKE SRE incident analysis", "incident_escalated"),
    ("mlops-drift", "MLOps drift monitoring", "retraining_needed"),
    ("aiops-alerts", "AIOps alert correlation", "critical_alert"),
    ("genai-rag", "GenAI RAG evaluation", "evaluation_passed"),
    ("devops-ci", "DevOps CI/CD reliability", "pipeline_failed"),
    ("cloud-security", "Cloud security posture", "risk_detected"),
    ("data-quality", "Data quality monitoring", "quality_issue"),
    ("finops-budget", "FinOps budget forecasting", "budget_breach"),
    ("vertex-ai", "Vertex AI experiment tracking", "model_promoted"),
]

KEYWORDS = ["beginner", "tabular", "classification", "data visualization", "computer science"]


def write_json(path: Path, payload: dict) -> None:
    path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def write_csv(path: Path, rows: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def png_chunk(name: bytes, data: bytes) -> bytes:
    return struct.pack(">I", len(data)) + name + data + struct.pack(">I", zlib.crc32(name + data) & 0xFFFFFFFF)


def write_cover_image(path: Path, palette: tuple[tuple[int, int, int], tuple[int, int, int], tuple[int, int, int]]) -> None:
    width, height = 560, 280
    rows = []
    for y in range(height):
        row = bytearray()
        for x in range(width):
            color = palette[(x * 3) // width]
            shade = int(20 * y / height)
            row.extend(max(0, channel - shade) for channel in color)
        rows.append(b"\x00" + bytes(row))
    image = (
        b"\x89PNG\r\n\x1a\n"
        + png_chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0))
        + png_chunk(b"IDAT", zlib.compress(b"".join(rows), 9))
        + png_chunk(b"IEND", b"")
    )
    path.write_bytes(image)


def infer_type(column: str, value: object) -> str:
    if column.endswith("_id") or column == "record_id":
        return "id"
    if column.endswith("_date"):
        return "datetime"
    if isinstance(value, int):
        return "integer"
    if isinstance(value, float):
        return "decimal"
    return "string"


def make_rows(dataset_number: int, topic_slug: str, target_column: str) -> list[dict]:
    rng = random.Random(RANDOM_SEED + dataset_number)
    start = date(2026, 1, 1)
    services = ["compute", "gke", "bigquery", "cloud-run", "vertex-ai", "cloud-sql", "pubsub"]
    regions = ["us-central1", "us-east1", "europe-west1", "asia-south1", "global"]
    teams = ["platform", "mlops", "data", "security", "backend", "finops"]
    envs = ["dev", "staging", "prod", "sandbox"]
    rows = []
    for row_number in range(ROWS_PER_DATASET):
        service = rng.choice(services)
        environment = rng.choices(envs, weights=[24, 16, 45, 15])[0]
        metric_a = round(max(0.0, rng.gauss(65 if environment == "prod" else 45, 18)), 3)
        metric_b = round(max(0.0, rng.lognormvariate(2.2, 0.45)), 3)
        metric_c = round(max(0.0, rng.gauss(0.55, 0.18)), 3)
        metric_d = round(max(0.0, rng.gauss(120, 55)), 3)
        score = (metric_a / 100) + (metric_b / 15) + metric_c + (metric_d / 240)
        label = int(score > rng.uniform(1.55, 2.25))
        rows.append(
            {
                "record_id": f"{topic_slug}-{dataset_number:03d}-{row_number + 1:05d}",
                "event_date": (start + timedelta(days=row_number % 180)).isoformat(),
                "project_name": f"project-{rng.randint(1, 24):02d}",
                "service_name": service,
                "gcp_region": rng.choice(regions),
                "environment": environment,
                "owning_team": rng.choice(teams),
                "signal_category": rng.choice(["latency", "cost", "quality", "security", "reliability"]),
                "metric_a": metric_a,
                "metric_b": metric_b,
                "metric_c": metric_c,
                "metric_d": metric_d,
                "risk_score": round(min(100, score * 35), 3),
                target_column: label,
            }
        )
    return rows


def build_dataset(dataset_number: int) -> dict:
    topic_slug, topic_name, target_column = TOPICS[(dataset_number - 1) % len(TOPICS)]
    folder_name = f"{dataset_number:03d}-{topic_slug}-dataset"
    folder = OUTPUT_ROOT / folder_name
    csv_name = f"{folder_name}.csv"
    title = f"Cloud Dataset {dataset_number:03d}"
    subtitle = f"Synthetic {topic_name} dataset for portfolio practice."
    description = (
        f"Synthetic tabular dataset for {topic_name}, cloud engineering, analytics, dashboards, "
        "and interview practice. It is generated with a fixed random seed, contains no real "
        "users or production systems, and is packaged with metadata, schema, data dictionary, "
        "summary, cover image, and reproducible generator notes."
    )
    rows = make_rows(dataset_number, topic_slug, target_column)
    folder.mkdir(parents=True, exist_ok=True)
    write_csv(folder / csv_name, rows)
    write_csv(folder / "data" / csv_name, rows)

    dictionary = {
        "record_id": "unique synthetic record identifier",
        "event_date": "synthetic event date",
        "project_name": "simulated cloud project name",
        "service_name": "simulated cloud service name",
        "gcp_region": "simulated Google Cloud region",
        "environment": "resource environment label",
        "owning_team": "team responsible for the record",
        "signal_category": "primary signal category for analysis",
        "metric_a": "synthetic normalized operations metric",
        "metric_b": "synthetic volume or cost metric",
        "metric_c": "synthetic quality or confidence metric",
        "metric_d": "synthetic latency, duration, or workload metric",
        "risk_score": "derived synthetic risk score from 0 to 100",
        target_column: "target label for classification or dashboard segmentation",
    }
    fields = [
        {"name": column, "title": dictionary[column], "type": infer_type(column, rows[0][column])}
        for column in rows[0]
    ]
    target_counts = {0: 0, 1: 0}
    for row in rows:
        target_counts[row[target_column]] += 1

    summary = {
        "dataset_number": dataset_number,
        "topic": topic_name,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "row_count": len(rows),
        "column_count": len(rows[0]),
        "target_column": target_column,
        "target_distribution": {str(key): value for key, value in target_counts.items()},
        "missing_values": {column: 0 for column in rows[0]},
        "synthetic": True,
        "license": "CC0-1.0",
    }
    write_json(folder / "summary.json", summary)

    slug = f"cloud-portfolio-dataset-{dataset_number:03d}"
    metadata = {
        "title": title,
        "subtitle": subtitle[:80],
        "description": description,
        "id": f"{AUTHOR}/{slug}",
        "licenses": [{"name": "CC0-1.0"}],
        "resources": [
            {
                "path": csv_name,
                "description": f"Root-level preview CSV for {title}.",
                "schema": {"fields": fields},
            },
            {"path": "data_dictionary.md", "description": "Column definitions and suggested analysis tasks."},
            {"path": "summary.json", "description": "Dataset quality summary and target distribution."},
        ],
        "keywords": KEYWORDS,
        "expectedUpdateFrequency": "never",
        "userSpecifiedSources": "Synthetic dataset generated by a fixed-seed Python script in the repository. No real users, cloud bills, credentials, incidents, prompts, or production systems are represented.",
        "image": "dataset-cover-image.png",
    }
    write_json(folder / "dataset-metadata.json", metadata)

    palette = (
        ((dataset_number * 37) % 160 + 40, 96, 172),
        (36, (dataset_number * 29) % 150 + 70, 132),
        (220, (dataset_number * 17) % 120 + 80, 70),
    )
    write_cover_image(folder / "dataset-cover-image.png", palette)

    data_dictionary = ["# Data Dictionary", "", f"Dataset file: `data/{csv_name}`", "", "## Columns", ""]
    data_dictionary.extend(f"- `{column}` - {definition}" for column, definition in dictionary.items())
    data_dictionary.extend(
        [
            "",
            "## Suggested Tasks",
            "",
            "- Build a dashboard with service, region, team, and environment filters",
            "- Train a baseline classification model using the target label",
            "- Analyze risk score distribution across services and teams",
            "- Practice BigQuery SQL and pandas EDA",
        ]
    )
    (folder / "data_dictionary.md").write_text("\n".join(data_dictionary) + "\n", encoding="utf-8")

    readme = [
        f"# {title}",
        "",
        subtitle,
        "",
        description,
        "",
        "## Files",
        "",
        f"- `{csv_name}` - root-level Kaggle preview CSV",
        f"- `data/{csv_name}` - main dataset CSV",
        "- `dataset-metadata.json` - Kaggle metadata with resource schema",
        "- `dataset-cover-image.png` - Kaggle cover image",
        "- `data_dictionary.md` - column definitions",
        "- `summary.json` - dataset quality summary",
        "",
        "## Quality Notes",
        "",
        "- Synthetic data only",
        "- Fixed random seed",
        "- No missing values",
        "- CSV format for Kaggle compatibility",
        "- CC0 license",
        "",
        "## Example Questions",
        "",
        f"1. Which service has the highest average `{target_column}` rate?",
        "2. Which teams own the highest risk records?",
        "3. How does risk score vary by environment?",
        "4. Can the target label be predicted from the synthetic metrics?",
    ]
    (folder / "README.md").write_text("\n".join(readme) + "\n", encoding="utf-8")
    return {"folder": folder_name, "title": title, "rows": len(rows), "target_column": target_column, "kaggle_id": metadata["id"]}


def write_index(entries: list[dict]) -> None:
    lines = [
        "# 100 Kaggle Portfolio Datasets",
        "",
        "This folder contains 100 synthetic Kaggle-ready datasets for cloud, DevOps, MLOps, AIOps, FinOps, security, and GenAI practice.",
        "",
        "Every dataset includes a CSV, Kaggle metadata, resource schema, cover image, data dictionary, summary, and README.",
        "",
        "## Datasets",
        "",
    ]
    for entry in entries:
        lines.append(f"- `{entry['folder']}/` - {entry['title']} ({entry['rows']} rows, target `{entry['target_column']}`)")
    (OUTPUT_ROOT / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

    upload_lines = [
        "#!/usr/bin/env bash",
        "set -euo pipefail",
        "",
        'ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"',
        "",
        "if ! command -v kaggle >/dev/null 2>&1; then",
        '  echo "Kaggle CLI is not installed. Run: pip install kaggle" >&2',
        "  exit 1",
        "fi",
        "",
        'if [[ -z "${KAGGLE_USERNAME:-}" || -z "${KAGGLE_KEY:-}" ]] && [[ ! -f "${HOME}/.kaggle/kaggle.json" ]]; then',
        '  echo "Kaggle credentials not found. Add ~/.kaggle/kaggle.json or export KAGGLE_USERNAME and KAGGLE_KEY." >&2',
        "  exit 1",
        "fi",
        "",
        "create_or_version() {",
        '  local dataset_path="$1"',
        '  local message="$2"',
        '  if kaggle datasets create -p "${dataset_path}"; then',
        '    echo "Created dataset: ${dataset_path}"',
        "  else",
        '    echo "Create failed or dataset exists. Publishing a new version: ${dataset_path}"',
        '    kaggle datasets version -p "${dataset_path}" -m "${message}"',
        "  fi",
        "}",
        "",
    ]
    for entry in entries:
        upload_lines.append(f'create_or_version "${{ROOT_DIR}}/{entry["folder"]}" "Upload {entry["title"]}"')
    (OUTPUT_ROOT / "upload_100_datasets.sh").write_text("\n".join(upload_lines) + "\n", encoding="utf-8")


def main() -> None:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    entries = [build_dataset(dataset_number) for dataset_number in range(1, 101)]
    write_index(entries)


if __name__ == "__main__":
    main()
