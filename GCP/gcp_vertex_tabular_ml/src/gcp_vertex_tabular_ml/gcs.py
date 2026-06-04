from pathlib import Path


def upload_directory(bucket_name: str, source_dir: Path, prefix: str = "") -> list[str]:
    from google.cloud import storage

    client = storage.Client()
    bucket = client.bucket(bucket_name)
    uploaded: list[str] = []

    for path in sorted(source_dir.glob("*")):
        if not path.is_file():
            continue
        blob_name = f"{prefix.rstrip('/')}/{path.name}" if prefix else path.name
        bucket.blob(blob_name).upload_from_filename(path)
        uploaded.append(f"gs://{bucket_name}/{blob_name}")

    return uploaded

