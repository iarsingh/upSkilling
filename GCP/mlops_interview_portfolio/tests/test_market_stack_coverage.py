from pathlib import Path


def test_market_stack_upgrade_map_covers_all_projects():
    portfolio_root = Path(__file__).resolve().parents[1]
    guide = (portfolio_root / "MARKET_TECH_STACK_2026.md").read_text(encoding="utf-8")
    project_dirs = sorted(
        path.name
        for path in portfolio_root.iterdir()
        if path.is_dir() and path.name[:2].isdigit()
    )

    assert len(project_dirs) == 25
    for project_dir in project_dirs:
        assert f"`{project_dir}`" in guide


def test_market_stack_upgrade_map_mentions_current_platform_signals():
    portfolio_root = Path(__file__).resolve().parents[1]
    guide = (portfolio_root / "MARKET_TECH_STACK_2026.md").read_text(encoding="utf-8")
    required_terms = [
        "Vertex AI Agent Engine",
        "Gen AI evaluation",
        "Model Armor",
        "Vertex AI Vector Search",
        "Kueue",
        "Ray on Vertex AI",
        "Dynamic Workload Scheduler",
    ]

    for term in required_terms:
        assert term in guide


def test_modern_requirements_include_data_genai_and_observability_stack():
    portfolio_root = Path(__file__).resolve().parents[1]
    requirements = (portfolio_root / "requirements-modern.txt").read_text(
        encoding="utf-8"
    )
    required_packages = [
        "numpy",
        "pandas",
        "google-genai",
        "google-cloud-aiplatform",
        "fastapi",
        "opentelemetry-api",
        "great-expectations",
        "evidently",
        "ragas",
        "deepeval",
    ]

    for package in required_packages:
        assert package in requirements
