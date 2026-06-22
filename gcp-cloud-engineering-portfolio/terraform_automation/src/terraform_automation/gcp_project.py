import os
from typing import Optional

try:
    from google.cloud import resource_manager
    from google.api_core.exceptions import NotFound
except ImportError:  # pragma: no cover
    resource_manager = None
    NotFound = Exception


class GCPProjectHelper:
    def __init__(self, project_id: str, credentials_path: Optional[str] = None):
        self.project_id = project_id
        self.credentials_path = credentials_path
        if credentials_path:
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(credentials_path)
        if resource_manager is None:
            raise ImportError(
                "google-cloud-resource-manager is required for GCP project helper."
            )
        self.client = resource_manager.Client()

    def project_exists(self) -> bool:
        try:
            self.client.fetch_project(self.project_id)
            return True
        except NotFound:
            return False

    def create_project(self, name: Optional[str] = None) -> dict:
        if self.project_exists():
            return {"project_id": self.project_id, "status": "already_exists"}
        project = self.client.new_project(
            project_id=self.project_id,
            name=name or self.project_id,
        )
        project.create()
        return {"project_id": self.project_id, "status": "created"}

    def ensure_project(self, name: Optional[str] = None) -> dict:
        if self.project_exists():
            return {"project_id": self.project_id, "status": "exists"}
        return self.create_project(name=name)
