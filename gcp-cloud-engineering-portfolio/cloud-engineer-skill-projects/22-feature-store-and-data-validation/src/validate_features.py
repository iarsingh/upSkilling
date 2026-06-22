import json
import sys
from pathlib import Path


REQUIRED_FEATURES = {
    "customer_id": str,
    "event_count_7d": int,
    "avg_value_30d": float,
}


def validate_record(record: dict) -> list[str]:
    errors = []
    for name, expected_type in REQUIRED_FEATURES.items():
        if name not in record:
            errors.append(f"{name} is missing")
            continue
        if not isinstance(record[name], expected_type):
            errors.append(f"{name} must be {expected_type.__name__}")
    if record.get("event_count_7d", 0) < 0:
        errors.append("event_count_7d cannot be negative")
    return errors


if __name__ == "__main__":
    records = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    failures = {
        index: validate_record(record)
        for index, record in enumerate(records)
        if validate_record(record)
    }
    print(json.dumps(failures, indent=2))
    raise SystemExit(1 if failures else 0)

