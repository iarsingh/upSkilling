import argparse
import json
from datetime import datetime, timezone
from pathlib import Path


def load_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def parse_utc(value):
    return datetime.fromisoformat(value.replace("Z", "+00:00")).astimezone(timezone.utc)


def validate_contract(contract, offline_snapshot, online_metadata, now=None):
    now = now or datetime.now(timezone.utc)
    failures = []

    offline_schema = offline_snapshot.get("schema", {})
    online_schema = online_metadata.get("schema", {})
    null_rates = offline_snapshot.get("null_rates", {})

    entity = contract["entity"]
    if entity not in offline_schema:
        failures.append(f"missing entity in offline snapshot: {entity}")
    if entity not in online_schema:
        failures.append(f"missing entity in online store: {entity}")

    for feature in contract["features"]:
        name = feature["name"]
        expected_dtype = feature["dtype"]

        if offline_schema.get(name) != expected_dtype:
            failures.append(
                f"offline dtype mismatch for {name}: expected {expected_dtype}, got {offline_schema.get(name)}"
            )
        if online_schema.get(name) != expected_dtype:
            failures.append(
                f"online dtype mismatch for {name}: expected {expected_dtype}, got {online_schema.get(name)}"
            )
        if not feature.get("nullable", True) and null_rates.get(name, 0) > 0:
            failures.append(f"non-nullable feature has nulls: {name}")

    last_updated = parse_utc(online_metadata["last_updated"])
    age_minutes = (now - last_updated).total_seconds() / 60
    freshness_sla = contract["freshness_sla_minutes"]
    if age_minutes > freshness_sla:
        failures.append(
            f"online features are stale: age {age_minutes:.1f} minutes exceeds {freshness_sla}"
        )

    return {
        "status": "pass" if not failures else "fail",
        "owner": contract["owner"],
        "entity": entity,
        "checked_features": len(contract["features"]),
        "failures": failures,
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("validate")
    parser.add_argument("--contract", required=True)
    parser.add_argument("--offline", required=True)
    parser.add_argument("--online", required=True)
    args = parser.parse_args()

    result = validate_contract(
        load_json(args.contract),
        load_json(args.offline),
        load_json(args.online),
    )
    print(json.dumps(result, indent=2))
    raise SystemExit(0 if result["status"] == "pass" else 1)


if __name__ == "__main__":
    main()
