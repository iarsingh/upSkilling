import argparse
import json
from dataclasses import asdict, dataclass


@dataclass
class FirewallFinding:
    name: str
    network: str
    source_ranges: list[str]
    allowed: list[str]
    severity: str


def detect_public_firewalls(rules: list[dict]) -> list[FirewallFinding]:
    findings = []
    for rule in rules:
        source_ranges = rule.get("sourceRanges", [])
        allowed = rule.get("allowed", [])
        exposes_internet = "0.0.0.0/0" in source_ranges
        risky_ports = {
            port
            for item in allowed
            for port in item.get("ports", [])
            if port in {"22", "3389", "5432", "3306"}
        }
        if exposes_internet and risky_ports:
            findings.append(
                FirewallFinding(
                    name=rule.get("name", "unknown"),
                    network=rule.get("network", "unknown"),
                    source_ranges=source_ranges,
                    allowed=sorted(risky_ports),
                    severity="high",
                )
            )
    return findings


def main() -> None:
    parser = argparse.ArgumentParser(description="GCP operations toolkit")
    parser.add_argument("command", choices=["scan-firewalls"])
    parser.add_argument("--input", required=True, help="JSON file exported from gcloud")
    args = parser.parse_args()

    with open(args.input, "r", encoding="utf-8") as handle:
        data = json.load(handle)

    if args.command == "scan-firewalls":
        print(json.dumps([asdict(f) for f in detect_public_firewalls(data)], indent=2))


if __name__ == "__main__":
    main()

