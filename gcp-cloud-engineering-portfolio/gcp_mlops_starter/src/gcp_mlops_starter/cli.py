import argparse
import json
from pathlib import Path

from .config import PipelineConfig
from .pipeline import run_training


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="GCP MLOps starter CLI")
    subparsers = parser.add_subparsers(dest="command", required=True)

    train = subparsers.add_parser("train", help="Generate data, train a model, and write artifacts.")
    train.add_argument("--project-id", required=True)
    train.add_argument("--region", default="us-central1")
    train.add_argument("--dataset-path", default="data/churn.csv")
    train.add_argument("--artifact-dir", default="artifacts")
    train.add_argument("--rows", type=int, default=500)

    upload = subparsers.add_parser("upload-artifacts", help="Upload local model artifacts to GCS.")
    upload.add_argument("--bucket", required=True)
    upload.add_argument("--artifact-dir", default="artifacts")
    upload.add_argument("--prefix", default="models/customer-churn")

    return parser


def main() -> None:
    args = build_parser().parse_args()

    if args.command == "train":
        config = PipelineConfig(
            project_id=args.project_id,
            region=args.region,
            dataset_path=Path(args.dataset_path),
            artifact_dir=Path(args.artifact_dir),
        )
        result = run_training(config, rows=args.rows)
        print(json.dumps(result, indent=2))
        return

    if args.command == "upload-artifacts":
        from .gcs import upload_directory

        uploaded = upload_directory(args.bucket, Path(args.artifact_dir), prefix=args.prefix)
        print(json.dumps({"uploaded": uploaded}, indent=2))


if __name__ == "__main__":
    main()
