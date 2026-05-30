from pathlib import Path
from typing import Any, Dict, List, Optional

from .terraform_helper import TerraformHelper


class StateValidationError(RuntimeError):
    pass


class StateValidator:
    def __init__(self, terraform_dir: str, expected_project_id: str):
        self.terraform = TerraformHelper(terraform_dir)
        self.expected_project_id = expected_project_id

    def load_state(self) -> Dict[str, Any]:
        payload = self.terraform.show_json()
        if not payload:
            raise StateValidationError("Terraform state is empty or not initialized.")
        return payload

    def validate_workspace(self, expected_workspace: str) -> bool:
        current = self.terraform.workspace_show()
        if current != expected_workspace:
            raise StateValidationError(
                f"Workspace mismatch: expected {expected_workspace}, got {current}"
            )
        return True

    def validate_project(self) -> bool:
        payload = self.load_state()
        root = payload.get("values", {}).get("root_module", {})
        resources = root.get("resources", [])
        project_ids = {
            r.get("values", {}).get("project") for r in resources if r.get("values")
        }
        if self.expected_project_id not in project_ids:
            raise StateValidationError(
                f"Expected project {self.expected_project_id} not found in state resources."
            )
        return True

    def validate_required_resources(self, required_types: Optional[List[str]] = None) -> bool:
        payload = self.load_state()
        resources = payload.get("values", {}).get("root_module", {}).get("resources", [])
        actual_types = {resource.get("type") for resource in resources}
        missing = [rtype for rtype in (required_types or []) if rtype not in actual_types]
        if missing:
            raise StateValidationError(f"Missing required resource types in state: {missing}")
        return True
