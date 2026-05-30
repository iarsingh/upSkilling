from dataclasses import dataclass

@dataclass
class TerraformConfig:
    project_id: str
    region: str = "us-central1"
    workspace: str = "default"
    backend_bucket: str = ""
    backend_prefix: str = "terraform/state"
    credentials_path: str = ""
