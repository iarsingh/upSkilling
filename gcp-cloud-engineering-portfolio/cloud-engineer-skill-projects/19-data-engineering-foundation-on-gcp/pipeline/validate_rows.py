import csv
import sys


def validate(path: str) -> list[str]:
    errors = []
    with open(path, newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        required = {"id", "event_time", "value"}
        missing = required - set(reader.fieldnames or [])
        if missing:
            return [f"missing columns: {sorted(missing)}"]
        for line_no, row in enumerate(reader, start=2):
            if not row["id"]:
                errors.append(f"line {line_no}: id is required")
            try:
                float(row["value"])
            except ValueError:
                errors.append(f"line {line_no}: value must be numeric")
    return errors


if __name__ == "__main__":
    failures = validate(sys.argv[1])
    if failures:
        print("\n".join(failures))
        raise SystemExit(1)
    print("validation passed")

