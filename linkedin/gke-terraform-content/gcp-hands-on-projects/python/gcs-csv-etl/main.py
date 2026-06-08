import csv
import io
import os
from dataclasses import dataclass

from google.cloud import storage


@dataclass
class Config:
    input_bucket: str
    input_blob: str
    output_bucket: str
    output_blob: str


def load_config() -> Config:
    return Config(
        input_bucket=required_env("INPUT_BUCKET"),
        input_blob=required_env("INPUT_BLOB"),
        output_bucket=required_env("OUTPUT_BUCKET"),
        output_blob=required_env("OUTPUT_BLOB"),
    )


def required_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"missing required env var: {name}")
    return value


def clean_rows(csv_text: str) -> list[dict[str, str]]:
    reader = csv.DictReader(io.StringIO(csv_text))
    rows: list[dict[str, str]] = []

    for row in reader:
        cleaned = {key: (value or "").strip() for key, value in row.items()}
        if not cleaned.get("user_id"):
            continue
        cleaned["score_band"] = score_band(cleaned.get("score", "0"))
        rows.append(cleaned)

    return rows


def score_band(score: str) -> str:
    try:
        value = int(score)
    except ValueError:
        return "unknown"

    if value >= 85:
        return "high"
    if value >= 60:
        return "medium"
    return "low"


def rows_to_csv(rows: list[dict[str, str]]) -> str:
    if not rows:
        return ""

    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=list(rows[0].keys()))
    writer.writeheader()
    writer.writerows(rows)
    return output.getvalue()


def main() -> None:
    config = load_config()
    client = storage.Client()

    source_blob = client.bucket(config.input_bucket).blob(config.input_blob)
    raw_csv = source_blob.download_as_text()

    cleaned_rows = clean_rows(raw_csv)
    output_csv = rows_to_csv(cleaned_rows)

    target_blob = client.bucket(config.output_bucket).blob(config.output_blob)
    target_blob.upload_from_string(output_csv, content_type="text/csv")

    print(
        "etl_complete "
        f"input=gs://{config.input_bucket}/{config.input_blob} "
        f"output=gs://{config.output_bucket}/{config.output_blob} "
        f"rows={len(cleaned_rows)}"
    )


if __name__ == "__main__":
    main()

