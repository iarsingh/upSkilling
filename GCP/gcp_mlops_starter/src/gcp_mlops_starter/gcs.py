from pathlib import Path

from google.cloud import storage


def upload_directory(bucket_name: str, source_dir: Path, prefix: str = "") -> list[str]:
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    uploaded = []

    for path in source_dir.rglob("*"):
        if not path.is_file():
            continue
        relative_path = path.relative_to(source_dir).as_posix()
        blob_name = f"{prefix.rstrip('/')}/{relative_path}" if prefix else relative_path
        bucket.blob(blob_name).upload_from_filename(path)
        uploaded.append(f"gs://{bucket_name}/{blob_name}")

    return uploaded
