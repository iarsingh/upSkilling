import json
from pathlib import Path
from urllib.parse import urlparse

import joblib
from google.cloud import storage


def parse_gcs_uri(uri: str) -> tuple[str, str]:
    parsed = urlparse(uri)
    if parsed.scheme != "gs" or not parsed.netloc or not parsed.path.strip("/"):
        raise ValueError(f"Invalid GCS URI: {uri}")
    return parsed.netloc, parsed.path.lstrip("/")


def download_gcs_file(uri: str, destination: Path) -> Path:
    bucket_name, blob_name = parse_gcs_uri(uri)
    destination.parent.mkdir(parents=True, exist_ok=True)
    storage.Client().bucket(bucket_name).blob(blob_name).download_to_filename(destination)
    return destination


def upload_file(path: Path, uri: str) -> None:
    bucket_name, blob_name = parse_gcs_uri(uri)
    storage.Client().bucket(bucket_name).blob(blob_name).upload_from_filename(path)


def load_model(uri: str):
    if uri.startswith("gs://"):
        local_path = download_gcs_file(uri, Path("/tmp/model.joblib"))
    else:
        local_path = Path(uri)
    return joblib.load(local_path)


def load_json(uri: str) -> dict:
    if uri.startswith("gs://"):
        local_path = download_gcs_file(uri, Path("/tmp/baseline.json"))
    else:
        local_path = Path(uri)
    return json.loads(local_path.read_text(encoding="utf-8"))
