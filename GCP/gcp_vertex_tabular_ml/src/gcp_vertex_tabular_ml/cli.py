import argparse
import json
from pathlib import Path

from gcp_vertex_tabular_ml.config import PipelineConfig
from gcp_vertex_tabular_ml.gcs import upload_directory
from gcp_vertex_tabular_ml.pipeline import run_training


def main() -> None:
    parser = argparse.ArgumentParser(description="GCP Vertex tabular ML CLI")
    subparsers = parser.add_subparsers(dest="command", required=True)

    train = subparsers.add_parser("train", help="Generate data and train the model")
    train.add_argument("--project-id", required=True)
    train.add_argument("--region", default="us-central1")
    train.add_argument("--rows", type=int, default=1000)
    train.add_argument("--data-path", type=Path, default=Path("data/housing.csv"))
    train.add_argument("--artifact-dir", type=Path, default=Path("artifacts"))
    train.add_argument("--random-seed", type=int, default=42)

    upload = subparsers.add_parser("upload-artifacts", help="Upload artifacts to GCS")
    upload.add_argument("--bucket", required=True)
    upload.add_argument("--artifact-dir", type=Path, default=Path("artifacts"))
    upload.add_argument("--prefix", default="")

    args = parser.parse_args()

    if args.command == "train":
        config = PipelineConfig(
            project_id=args.project_id,
            region=args.region,
            rows=args.rows,
            data_path=args.data_path,
            artifact_dir=args.artifact_dir,
            random_seed=args.random_seed,
        )
        result = run_training(config)
        print(json.dumps(result, indent=2))
        return

    uploaded = upload_directory(args.bucket, args.artifact_dir, args.prefix)
    print(json.dumps({"uploaded": uploaded}, indent=2))


if __name__ == "__main__":
    main()

