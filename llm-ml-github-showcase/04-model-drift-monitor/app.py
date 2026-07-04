import csv
import math
from pathlib import Path


BASELINE_FILE = Path("data/baseline.csv")
CURRENT_FILE = Path("data/current.csv")
REPORT_FILE = Path("drift_report.md")
NUMERIC_FEATURES = ["request_latency_ms", "input_tokens", "model_score"]


def read_csv(path):
    with path.open(newline="") as file:
        return list(csv.DictReader(file))


def quantile(values, fraction):
    ordered = sorted(values)
    index = min(len(ordered) - 1, max(0, round((len(ordered) - 1) * fraction)))
    return ordered[index]


def buckets(values):
    return [
        min(values),
        quantile(values, 0.25),
        quantile(values, 0.5),
        quantile(values, 0.75),
        max(values),
    ]


def distribution(values, edges):
    counts = [0, 0, 0, 0]
    for value in values:
        if value <= edges[1]:
            counts[0] += 1
        elif value <= edges[2]:
            counts[1] += 1
        elif value <= edges[3]:
            counts[2] += 1
        else:
            counts[3] += 1
    total = len(values)
    return [max(count / total, 0.001) for count in counts]


def psi(expected, actual):
    return sum((a - e) * math.log(a / e) for e, a in zip(expected, actual))


def severity(score):
    if score >= 0.25:
        return "major"
    if score >= 0.1:
        return "moderate"
    return "low"


def main():
    baseline = read_csv(BASELINE_FILE)
    current = read_csv(CURRENT_FILE)
    schema_ok = set(baseline[0]) == set(current[0])

    lines = [
        "# Model Drift Report",
        "",
        f"- Schema compatible: {'yes' if schema_ok else 'no'}",
        "",
        "| Feature | PSI | Severity |",
        "|---|---:|---|",
    ]

    for feature in NUMERIC_FEATURES:
        baseline_values = [float(row[feature]) for row in baseline]
        current_values = [float(row[feature]) for row in current]
        edges = buckets(baseline_values)
        score = psi(distribution(baseline_values, edges), distribution(current_values, edges))
        lines.append(f"| {feature} | {score:.3f} | {severity(score)} |")

    REPORT_FILE.write_text("\n".join(lines) + "\n")
    print("\n".join(lines))
    print(f"\nWrote {REPORT_FILE}")


if __name__ == "__main__":
    main()
