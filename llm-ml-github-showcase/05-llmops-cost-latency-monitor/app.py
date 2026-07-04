import csv
from collections import defaultdict
from pathlib import Path


DATA_FILE = Path("data/llm_requests.csv")
REPORT_FILE = Path("llmops_report.md")
LATENCY_SLO_MS = 1500
COST_PER_1K = {
    "gpt-4.1-mini": {"input": 0.0004, "output": 0.0016},
    "gpt-4.1": {"input": 0.0020, "output": 0.0080},
    "claude-haiku": {"input": 0.00025, "output": 0.00125},
    "llama-3.1": {"input": 0.0, "output": 0.0},
}


def request_cost(row):
    prices = COST_PER_1K[row["model"]]
    input_cost = int(row["input_tokens"]) / 1000 * prices["input"]
    output_cost = int(row["output_tokens"]) / 1000 * prices["output"]
    return input_cost + output_cost


def percentile(values, fraction):
    ordered = sorted(values)
    index = min(len(ordered) - 1, round((len(ordered) - 1) * fraction))
    return ordered[index]


def main():
    groups = defaultdict(list)
    with DATA_FILE.open(newline="") as file:
        for row in csv.DictReader(file):
            row["latency_ms"] = int(row["latency_ms"])
            row["cost"] = request_cost(row)
            groups[row["model"]].append(row)

    lines = [
        "# LLMOps Cost and Latency Report",
        "",
        f"- Latency SLO: {LATENCY_SLO_MS} ms",
        "",
        "| Model | Requests | Error Rate | p95 Latency | SLO Pass Rate | Estimated Cost |",
        "|---|---:|---:|---:|---:|---:|",
    ]

    for model, rows in sorted(groups.items()):
        total = len(rows)
        errors = sum(1 for row in rows if row["status"] != "success")
        latencies = [row["latency_ms"] for row in rows]
        slo_passes = sum(1 for value in latencies if value <= LATENCY_SLO_MS)
        total_cost = sum(row["cost"] for row in rows)
        lines.append(
            f"| {model} | {total} | {errors / total:.0%} | {percentile(latencies, 0.95)} ms | "
            f"{slo_passes / total:.0%} | ${total_cost:.4f} |"
        )

    REPORT_FILE.write_text("\n".join(lines) + "\n")
    print("\n".join(lines))
    print(f"\nWrote {REPORT_FILE}")


if __name__ == "__main__":
    main()
