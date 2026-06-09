import csv
import json
import math
import random
import struct
import zlib
from datetime import datetime, timedelta, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
AUTHOR = "iamarsingh"
LICENSE = [{"name": "CC0-1.0"}]
RANDOM_SEED = 42


def write_json(path: Path, payload: dict) -> None:
    path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def write_csv(path: Path, rows: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def infer_type(values: list[object]) -> str:
    sample = values[0]
    if isinstance(sample, bool):
        return "boolean"
    if isinstance(sample, int):
        return "integer"
    if isinstance(sample, float):
        return "decimal"
    text = str(sample)
    if text.endswith("+00:00") and "T" in text:
        return "datetime"
    if text.endswith("_id") or text.endswith("-000001"):
        return "id"
    return "string"


def write_cover_image(path: Path, colors: tuple[tuple[int, int, int], tuple[int, int, int], tuple[int, int, int]]) -> None:
    width, height = 560, 280
    rows = []
    for y in range(height):
        row = bytearray()
        for x in range(width):
            band = 0 if x < width // 3 else 1 if x < (width * 2) // 3 else 2
            base = colors[band]
            shade = int(18 * (y / height))
            row.extend(max(0, channel - shade) for channel in base)
        rows.append(b"\x00" + bytes(row))

    raw = b"".join(rows)

    def chunk(name: bytes, data: bytes) -> bytes:
        return struct.pack(">I", len(data)) + name + data + struct.pack(">I", zlib.crc32(name + data) & 0xFFFFFFFF)

    png = (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(raw, 9))
        + chunk(b"IEND", b"")
    )
    path.write_bytes(png)


def summarize(rows: list[dict], dataset_name: str, target_column: str) -> dict:
    columns = list(rows[0].keys())
    target_counts: dict[str, int] = {}
    for row in rows:
        value = str(row[target_column])
        target_counts[value] = target_counts.get(value, 0) + 1
    return {
        "dataset_name": dataset_name,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "row_count": len(rows),
        "column_count": len(columns),
        "columns": columns,
        "target_column": target_column,
        "target_distribution": target_counts,
        "missing_values": {column: 0 for column in columns},
        "license": "CC0-1.0",
        "synthetic": True,
        "quality_notes": [
            "Generated with a fixed random seed for reproducibility.",
            "No real users, companies, credentials, logs, or cloud resources are included.",
            "Columns use CSV-friendly scalar values for Kaggle preview compatibility.",
        ],
    }


def write_dataset_metadata(
    folder: Path,
    title: str,
    subtitle: str,
    slug: str,
    csv_name: str,
    description: str,
    dictionary: dict[str, str],
    rows: list[dict],
    keywords: list[str],
) -> None:
    fields = [
        {
            "name": column,
            "title": dictionary[column],
            "type": infer_type([row[column] for row in rows[:5]]),
        }
        for column in dictionary
    ]
    write_json(
        folder / "dataset-metadata.json",
        {
            "title": title,
            "subtitle": subtitle,
            "description": description,
            "id": f"{AUTHOR}/{slug}",
            "licenses": LICENSE,
            "resources": [
                {
                    "path": csv_name,
                    "description": f"Root-level preview copy of {title}.",
                    "schema": {"fields": fields},
                },
                {
                    "path": f"data/{csv_name}",
                    "description": f"Main CSV file for {title}.",
                    "schema": {"fields": fields},
                },
                {
                    "path": "data_dictionary.md",
                    "description": "Column definitions, target label explanation, and suggested tasks.",
                },
                {
                    "path": "summary.json",
                    "description": "Dataset quality summary with row count, schema, missing-value checks, and target distribution.",
                },
            ],
            "keywords": keywords,
            "expectedUpdateFrequency": "never",
            "userSpecifiedSources": "Synthetic dataset generated from a fixed-seed Python script included in this Kaggle package. No real users, cloud bills, incidents, prompts, credentials, or production systems are represented.",
            "image": "dataset-cover-image.png",
        },
    )


def write_common_files(
    folder: Path,
    title: str,
    slug: str,
    csv_name: str,
    subtitle: str,
    rows: list[dict],
    target_column: str,
    description: str,
    use_cases: list[str],
    questions: list[str],
    dictionary: dict[str, str],
    keywords: list[str],
    cover_colors: tuple[tuple[int, int, int], tuple[int, int, int], tuple[int, int, int]],
) -> None:
    folder.mkdir(parents=True, exist_ok=True)
    data_dir = folder / "data"
    write_csv(data_dir / csv_name, rows)
    write_csv(folder / csv_name, rows)
    write_json(folder / "summary.json", summarize(rows, title, target_column))
    write_cover_image(folder / "dataset-cover-image.png", cover_colors)
    write_dataset_metadata(folder, title, subtitle, slug, csv_name, description, dictionary, rows, keywords)

    data_dictionary = ["# Data Dictionary", "", f"Dataset file: `data/{csv_name}`", "", "## Columns", ""]
    data_dictionary.extend(f"- `{column}` - {definition}" for column, definition in dictionary.items())
    data_dictionary.extend(["", "## Suggested Tasks", ""])
    data_dictionary.extend(f"- {item}" for item in use_cases)
    (folder / "data_dictionary.md").write_text("\n".join(data_dictionary) + "\n", encoding="utf-8")

    readme = [
        f"# {title}",
        "",
        description,
        "",
        "This is a synthetic, Kaggle-ready dataset created for cloud, MLOps, AIOps, and GenAI portfolio practice.",
        "",
        "## Files",
        "",
        f"- `data/{csv_name}` - main dataset",
        f"- `{csv_name}` - root-level copy for Kaggle preview",
        "- `dataset-cover-image.png` - cover image for Kaggle dataset metadata",
        "- `data_dictionary.md` - column definitions and suggested tasks",
        "- `summary.json` - machine-readable quality and schema summary",
        "- `scripts/generate_dataset.py` - reproducible dataset generator",
        "- `generate_dataset.py` - root-level generator copy for Kaggle users",
        "- `dataset-metadata.json` - Kaggle dataset metadata",
        "",
        "## Quality Notes",
        "",
        "- Fixed random seed for reproducibility.",
        "- No missing values.",
        "- CSV format with simple scalar columns for Kaggle compatibility.",
        "- CC0 license for public portfolio use.",
        "- Synthetic data only; no real customer, system, billing, or production data.",
        "",
        "## Use Cases",
        "",
    ]
    readme.extend(f"- {item}" for item in use_cases)
    readme.extend(["", "## Example Questions", ""])
    readme.extend(f"{index}. {question}" for index, question in enumerate(questions, start=1))
    readme.extend(
        [
            "",
            "## Recreate Dataset",
            "",
            "```bash",
            "python3 scripts/generate_dataset.py",
            "```",
            "",
            "## Kaggle Upload",
            "",
            "```bash",
            f"kaggle datasets create -p kaggle-mlops-datasets/{folder.name}",
            "```",
            "",
            "To publish a new version:",
            "",
            "```bash",
            f"kaggle datasets version -p kaggle-mlops-datasets/{folder.name} -m \"Update dataset\"",
            "```",
        ]
    )
    (folder / "README.md").write_text("\n".join(readme) + "\n", encoding="utf-8")

    generator = [
        "from pathlib import Path",
        "import runpy",
        "",
        "ROOT = Path(__file__).resolve().parents[2]",
        "runpy.run_path(str(ROOT / 'scripts' / 'create_portfolio_datasets.py'), run_name='__main__')",
        "",
    ]
    scripts_dir = folder / "scripts"
    scripts_dir.mkdir(exist_ok=True)
    (scripts_dir / "generate_dataset.py").write_text("\n".join(generator), encoding="utf-8")
    (folder / "generate_dataset.py").write_text("\n".join(generator), encoding="utf-8")


def build_aiops_incidents() -> None:
    random.seed(RANDOM_SEED + 1)
    services = ["checkout", "payments", "recommendations", "user-profile", "inventory", "search"]
    regions = ["us-central1", "us-east1", "europe-west1", "asia-south1"]
    severities = ["low", "medium", "high", "critical"]
    causes = ["traffic_spike", "database_latency", "dependency_timeout", "bad_deploy", "quota_exhaustion"]
    teams = ["platform", "sre", "payments", "ml-platform", "backend"]
    rows = []
    start = datetime(2026, 1, 1, tzinfo=timezone.utc)
    for index in range(15000):
        service = random.choice(services)
        region = random.choice(regions)
        cause = random.choices(causes, weights=[28, 24, 20, 16, 12])[0]
        severity = random.choices(severities, weights=[38, 34, 20, 8])[0]
        base_noise = {"low": 8, "medium": 18, "high": 45, "critical": 90}[severity]
        alert_count = max(1, int(random.gauss(base_noise, base_noise * 0.35)))
        latency = max(20, int(random.gauss(180, 60)))
        error_rate = round(max(0.0, random.gauss(1.0, 0.8)), 3)
        if cause in {"database_latency", "dependency_timeout"}:
            latency += random.randint(120, 900)
        if cause in {"bad_deploy", "quota_exhaustion"}:
            error_rate += round(random.uniform(2.0, 12.0), 3)
        mttr = int(alert_count * random.uniform(1.2, 3.5) + latency / 50 + error_rate * 4)
        escalated = int(severity in {"high", "critical"} or error_rate > 8 or mttr > 120)
        rows.append(
            {
                "incident_id": f"inc-{index + 1:06d}",
                "event_timestamp": (start + timedelta(minutes=index * 7)).isoformat(),
                "service_name": service,
                "gcp_region": region,
                "owning_team": random.choice(teams),
                "severity": severity,
                "root_cause": cause,
                "alert_count": alert_count,
                "duplicate_alerts": int(alert_count * random.uniform(0.1, 0.65)),
                "p95_latency_ms": latency,
                "error_rate_pct": round(error_rate, 3),
                "cpu_utilization_pct": round(min(100, max(5, random.gauss(62, 18))), 2),
                "memory_utilization_pct": round(min(100, max(10, random.gauss(68, 14))), 2),
                "deployment_within_2h": int(cause == "bad_deploy" or random.random() < 0.18),
                "customer_impact_score": round(min(100, alert_count * 0.45 + error_rate * 3 + latency / 40), 2),
                "mttr_minutes": mttr,
                "escalated": escalated,
            }
        )
    write_common_files(
        folder=ROOT / "aiops-incident-alert-correlation",
        title="AIOps Incident Alert Correlation Dataset",
        slug="aiops-incident-alert-correlation-dataset",
        csv_name="aiops_incident_alert_correlation.csv",
        subtitle="Synthetic SRE incident telemetry for AIOps alert correlation.",
        rows=rows,
        target_column="escalated",
        description="Synthetic incident and alert telemetry for practicing AIOps correlation, escalation prediction, and SRE dashboards.",
        use_cases=[
            "Alert deduplication and incident correlation",
            "Escalation prediction",
            "MTTR analysis",
            "SRE dashboard practice",
            "AIOps interview case studies",
        ],
        questions=[
            "Which service has the highest escalation rate?",
            "Which root causes create the most duplicate alerts?",
            "How does deployment timing affect incident severity?",
            "Can escalation be predicted from latency, errors, and alert volume?",
        ],
        dictionary={
            "incident_id": "unique synthetic incident identifier",
            "event_timestamp": "UTC timestamp for the incident event",
            "service_name": "affected application or platform service",
            "gcp_region": "simulated Google Cloud region",
            "owning_team": "team responsible for the affected service",
            "severity": "incident severity level",
            "root_cause": "synthetic root cause category",
            "alert_count": "number of alerts emitted during the incident",
            "duplicate_alerts": "number of noisy duplicate alerts",
            "p95_latency_ms": "simulated p95 service latency in milliseconds",
            "error_rate_pct": "simulated request error rate percentage",
            "cpu_utilization_pct": "average CPU utilization during the incident",
            "memory_utilization_pct": "average memory utilization during the incident",
            "deployment_within_2h": "whether a deployment happened within two hours",
            "customer_impact_score": "synthetic impact score from 0 to 100",
            "mttr_minutes": "mean time to resolution in minutes",
            "escalated": "target label indicating whether the incident was escalated",
        },
        keywords=["beginner", "tabular", "classification", "computer science", "data visualization"],
        cover_colors=((30, 82, 166), (37, 133, 118), (224, 120, 68)),
    )


def build_gcp_cost() -> None:
    random.seed(RANDOM_SEED + 2)
    projects = ["ml-prod", "data-platform", "payments-prod", "analytics-dev", "sandbox", "shared-services"]
    services = ["Compute Engine", "BigQuery", "Cloud Storage", "GKE", "Vertex AI", "Cloud SQL", "Pub/Sub"]
    environments = ["dev", "staging", "prod", "sandbox"]
    teams = ["platform", "data", "mlops", "backend", "finops"]
    rows = []
    start = datetime(2026, 1, 1, tzinfo=timezone.utc)
    for index in range(18000):
        service = random.choice(services)
        environment = random.choices(environments, weights=[25, 15, 45, 15])[0]
        base = {
            "Compute Engine": 95,
            "BigQuery": 130,
            "Cloud Storage": 45,
            "GKE": 150,
            "Vertex AI": 180,
            "Cloud SQL": 110,
            "Pub/Sub": 22,
        }[service]
        env_multiplier = {"dev": 0.45, "staging": 0.7, "prod": 1.6, "sandbox": 0.3}[environment]
        daily_cost = round(max(1.0, random.lognormvariate(math.log(base * env_multiplier), 0.42)), 2)
        committed_use_covered = round(random.uniform(0.05, 0.95), 2)
        idle_score = round(max(0, min(1, random.gauss(0.35 if environment == "prod" else 0.62, 0.18))), 3)
        rightsizing_savings = round(daily_cost * idle_score * random.uniform(0.15, 0.55), 2)
        anomaly = int(daily_cost > base * env_multiplier * 2.2 or rightsizing_savings > 120)
        rows.append(
            {
                "billing_record_id": f"bill-{index + 1:06d}",
                "usage_date": (start + timedelta(days=index % 180)).date().isoformat(),
                "project_id": random.choice(projects),
                "service_name": service,
                "sku_category": random.choice(["cpu", "memory", "storage", "network", "query", "training", "database"]),
                "environment": environment,
                "owning_team": random.choice(teams),
                "gcp_region": random.choice(["us-central1", "us-east1", "europe-west1", "asia-south1", "global"]),
                "usage_quantity": round(random.uniform(10, 8000), 3),
                "usage_unit": random.choice(["hour", "gibibyte", "request", "slot_hour", "node_hour"]),
                "daily_cost_usd": daily_cost,
                "committed_use_covered_pct": committed_use_covered,
                "idle_resource_score": idle_score,
                "rightsizing_savings_usd": rightsizing_savings,
                "label_compliance": int(random.random() > 0.08),
                "budget_threshold_pct": round(min(180, daily_cost / (base * env_multiplier + 1) * 100), 2),
                "cost_anomaly": anomaly,
            }
        )
    write_common_files(
        folder=ROOT / "gcp-cloud-cost-optimization",
        title="GCP Cloud Cost Optimization Dataset",
        slug="gcp-cloud-cost-optimization-dataset",
        csv_name="gcp_cloud_cost_optimization.csv",
        subtitle="Synthetic GCP billing data for FinOps and cost anomaly practice.",
        rows=rows,
        target_column="cost_anomaly",
        description="Synthetic GCP billing and FinOps dataset for cost anomaly detection, rightsizing analysis, and budget dashboards.",
        use_cases=[
            "Cloud cost anomaly detection",
            "FinOps dashboard creation",
            "Rightsizing opportunity analysis",
            "GCP billing export SQL practice",
            "Cloud engineer interview preparation",
        ],
        questions=[
            "Which service has the largest rightsizing opportunity?",
            "Which team has the highest anomaly rate?",
            "How much cost is covered by committed use discounts?",
            "Which unlabeled resources should be fixed first?",
        ],
        dictionary={
            "billing_record_id": "unique synthetic billing record identifier",
            "usage_date": "billing usage date",
            "project_id": "simulated GCP project id",
            "service_name": "GCP service category",
            "sku_category": "billing SKU category",
            "environment": "resource environment label",
            "owning_team": "team owning the spend",
            "gcp_region": "region or global billing scope",
            "usage_quantity": "synthetic usage quantity",
            "usage_unit": "unit for the usage quantity",
            "daily_cost_usd": "daily cost in USD",
            "committed_use_covered_pct": "fraction of spend covered by commitments",
            "idle_resource_score": "synthetic idle or waste signal from 0 to 1",
            "rightsizing_savings_usd": "estimated savings from rightsizing",
            "label_compliance": "whether the resource has required labels",
            "budget_threshold_pct": "percentage of expected budget consumed",
            "cost_anomaly": "target label indicating anomalous cost behavior",
        },
        keywords=["beginner", "tabular", "business", "data visualization", "classification"],
        cover_colors=((24, 108, 92), (64, 112, 184), (238, 180, 70)),
    )


def build_rag_evaluation() -> None:
    random.seed(RANDOM_SEED + 3)
    domains = ["cloud-run", "gke", "terraform", "vertex-ai", "bigquery", "security", "monitoring"]
    models = ["gemini-1.5-flash", "gemini-1.5-pro", "openai-gpt-4o-mini", "claude-haiku"]
    rows = []
    start = datetime(2026, 1, 1, tzinfo=timezone.utc)
    for index in range(12000):
        domain = random.choice(domains)
        retrieval_k = random.choice([3, 5, 8, 10])
        context_relevance = round(max(0, min(1, random.gauss(0.72, 0.18))), 3)
        groundedness = round(max(0, min(1, context_relevance + random.gauss(0.02, 0.14))), 3)
        latency_ms = int(random.gauss(950 + retrieval_k * 45, 240))
        token_count = int(random.gauss(900 + retrieval_k * 140, 260))
        hallucination = int(groundedness < 0.55 or context_relevance < 0.48 or random.random() < 0.04)
        passed = int(hallucination == 0 and groundedness >= 0.65 and latency_ms < 1800)
        rows.append(
            {
                "evaluation_id": f"rag-eval-{index + 1:06d}",
                "evaluation_timestamp": (start + timedelta(minutes=index * 11)).isoformat(),
                "question_domain": domain,
                "prompt_template_version": random.choice(["v1", "v2", "v3"]),
                "model_name": random.choice(models),
                "retrieval_top_k": retrieval_k,
                "retrieved_context_count": max(1, int(random.gauss(retrieval_k - 1, 1.2))),
                "context_relevance_score": context_relevance,
                "groundedness_score": groundedness,
                "answer_similarity_score": round(max(0, min(1, groundedness + random.gauss(0, 0.12))), 3),
                "citation_coverage_pct": round(max(0, min(100, groundedness * 100 + random.gauss(0, 12))), 2),
                "response_latency_ms": max(150, latency_ms),
                "input_tokens": max(100, int(token_count * random.uniform(0.45, 0.7))),
                "output_tokens": max(50, int(token_count * random.uniform(0.18, 0.35))),
                "estimated_cost_usd": round(token_count / 1_000_000 * random.uniform(0.15, 3.0), 5),
                "hallucination_flag": hallucination,
                "evaluation_passed": passed,
            }
        )
    write_common_files(
        folder=ROOT / "genai-rag-evaluation-observability",
        title="GenAI RAG Evaluation and Observability Dataset",
        slug="genai-rag-evaluation-observability-dataset",
        csv_name="genai_rag_evaluation_observability.csv",
        subtitle="Synthetic RAG evaluation telemetry for GenAI observability.",
        rows=rows,
        target_column="evaluation_passed",
        description="Synthetic RAG evaluation dataset for GenAI observability, hallucination analysis, prompt comparison, and retrieval quality dashboards.",
        use_cases=[
            "RAG evaluation dashboard practice",
            "Hallucination risk analysis",
            "Prompt version comparison",
            "Retrieval quality monitoring",
            "GenAI platform interview preparation",
        ],
        questions=[
            "Which prompt template has the best pass rate?",
            "How does retrieval top-k affect latency and groundedness?",
            "Which domains have the highest hallucination rate?",
            "Can failed evaluations be predicted from retrieval and scoring features?",
        ],
        dictionary={
            "evaluation_id": "unique synthetic evaluation identifier",
            "evaluation_timestamp": "UTC timestamp for the evaluation event",
            "question_domain": "knowledge domain for the user question",
            "prompt_template_version": "prompt template version under evaluation",
            "model_name": "LLM used for the response",
            "retrieval_top_k": "configured number of retrieved chunks",
            "retrieved_context_count": "actual number of contexts returned",
            "context_relevance_score": "synthetic relevance score from 0 to 1",
            "groundedness_score": "synthetic answer groundedness score from 0 to 1",
            "answer_similarity_score": "synthetic reference similarity score from 0 to 1",
            "citation_coverage_pct": "percentage of answer claims covered by citations",
            "response_latency_ms": "response latency in milliseconds",
            "input_tokens": "input token count",
            "output_tokens": "output token count",
            "estimated_cost_usd": "estimated request cost in USD",
            "hallucination_flag": "label indicating potential hallucination",
            "evaluation_passed": "target label indicating whether evaluation passed",
        },
        keywords=["beginner", "tabular", "artificial intelligence", "classification", "data visualization"],
        cover_colors=((77, 72, 181), (34, 150, 145), (232, 154, 74)),
    )


def main() -> None:
    build_aiops_incidents()
    build_gcp_cost()
    build_rag_evaluation()


if __name__ == "__main__":
    main()
