import argparse
import json
from pathlib import Path

from promotion import PromotionPolicy, evaluate_gates, find_model, load_registry, promote_model, save_registry


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Evaluate and promote ML models.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    for command in ("evaluate", "promote"):
        subparser = subparsers.add_parser(command)
        subparser.add_argument("--registry", required=True)
        subparser.add_argument("--model-id", required=True)
        subparser.add_argument("--target", choices=["staging", "production"], required=True)
        subparser.add_argument("--approved-by", default=None)

    return parser


def main() -> None:
    args = build_parser().parse_args()
    registry_path = Path(args.registry)
    registry = load_registry(registry_path)
    model = find_model(registry, args.model_id)

    if args.command == "evaluate":
        result = evaluate_gates(
            model,
            args.target,
            PromotionPolicy(),
            approved_by=args.approved_by,
        )
    else:
        result = promote_model(registry, args.model_id, args.target, approved_by=args.approved_by)
        if result["promoted"]:
            save_registry(registry, registry_path)

    print(json.dumps(result, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
