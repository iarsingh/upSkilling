from click.testing import CliRunner

from gcp_ops_toolkit.cli import cli


def test_cli_help_lists_tools() -> None:
    result = CliRunner().invoke(cli, ["--help"])
    assert result.exit_code == 0
    assert "gke-health" in result.output
    assert "iam-audit" in result.output
    assert "cost-optimize" in result.output
    assert "cloud-run-deploy" in result.output
    assert "vertex" in result.output


def test_cloud_run_defaults_to_dry_run(tmp_path) -> None:
    (tmp_path / "Dockerfile").write_text("FROM scratch\n")
    result = CliRunner().invoke(
        cli,
        [
            "cloud-run-deploy",
            "--project-id",
            "demo",
            "--service",
            "api",
            "--source-dir",
            str(tmp_path),
            "--staging-bucket",
            "demo-build-source",
        ],
    )
    assert result.exit_code == 0
    assert '"dry_run": true' in result.output
