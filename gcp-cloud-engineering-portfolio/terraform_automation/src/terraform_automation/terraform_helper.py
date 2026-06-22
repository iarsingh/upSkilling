import json
import shlex
import subprocess
from pathlib import Path
from typing import Any, Dict, List, Optional

from rich.console import Console
from .config import TerraformConfig

console = Console()


class TerraformCommandError(RuntimeError):
    pass


class TerraformHelper:
    def __init__(self, working_dir: str, config: Optional[TerraformConfig] = None):
        self.working_dir = Path(working_dir).resolve()
        self.config = config or TerraformConfig(project_id="")

    def run(self, args: List[str], env: Optional[Dict[str, str]] = None) -> str:
        command = ["terraform", *args]
        console.print(f"[bold blue]Running Terraform:[/bold blue] {' '.join(shlex.quote(part) for part in command)}")
        try:
            process = subprocess.run(
                command,
                cwd=self.working_dir,
                env={**subprocess.os.environ, **(env or {})},
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                check=True,
            )
        except FileNotFoundError as exc:
            raise TerraformCommandError("Terraform binary not found. Install Terraform and ensure it is on PATH.") from exc
        except subprocess.CalledProcessError as exc:
            raise TerraformCommandError(
                f"Terraform failed with return code {exc.returncode}: {exc.stderr.strip()}"
            ) from exc
        console.print(process.stdout)
        return process.stdout

    def init(self, backend_config: Optional[Dict[str, str]] = None) -> str:
        args = ["init", "-input=false"]
        if backend_config:
            for key, value in backend_config.items():
                args.append(f"-backend-config={key}={value}")
        return self.run(args)

    def workspace_select(self, workspace_name: str) -> str:
        return self.run(["workspace", "new", workspace_name])

    def workspace_show(self) -> str:
        return self.run(["workspace", "show"]).strip()

    def plan(self, var_file: Optional[str] = None, extra_args: Optional[List[str]] = None) -> str:
        args = ["plan", "-input=false", "-refresh=true"]
        if var_file:
            args.extend(["-var-file", var_file])
        if extra_args:
            args.extend(extra_args)
        return self.run(args)

    def apply(
        self,
        auto_approve: bool = True,
        var_file: Optional[str] = None,
        extra_args: Optional[List[str]] = None,
    ) -> str:
        args = ["apply"]
        if auto_approve:
            args.append("-auto-approve")
        if var_file:
            args.extend(["-var-file", var_file])
        if extra_args:
            args.extend(extra_args)
        return self.run(args)

    def destroy(self, auto_approve: bool = True, var_file: Optional[str] = None) -> str:
        args = ["destroy"]
        if auto_approve:
            args.append("-auto-approve")
        if var_file:
            args.extend(["-var-file", var_file])
        return self.run(args)

    def show_json(self) -> Dict[str, Any]:
        output = self.run(["show", "-json"])
        return json.loads(output)

    def validate_state(self, expected_project_id: Optional[str] = None) -> Dict[str, Any]:
        payload = self.show_json()
        state_resources = [r for r in payload.get("values", {}).get("root_module", {}).get("resources", [])]
        result = {
            "resource_count": len(state_resources),
            "workspace": self.workspace_show(),
        }
        if expected_project_id:
            project_ids = {
                attr.get("project")
                for r in state_resources
                for attr in [r.get("values", {})]
                if attr.get("project")
            }
            result["project_ids"] = list(project_ids)
            result["project_match"] = expected_project_id in project_ids
        return result
