from rich.console import Console
from rich.table import Table

from gcp_ops_toolkit.models import Report


console = Console()


def print_report(report: Report) -> None:
    console.print(f"[bold]{report.tool}[/bold] findings: {len(report.findings)}")
    if not report.findings:
        console.print("[green]No findings.[/green]")
        return
    table = Table(show_lines=True)
    table.add_column("Severity")
    table.add_column("Category")
    table.add_column("Resource")
    table.add_column("Finding")
    for finding in report.findings:
        table.add_row(
            finding.severity.value,
            finding.category,
            finding.resource,
            finding.message,
        )
    console.print(table)
