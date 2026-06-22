from terraform_automation.state_validator import StateValidator


class DummyTerraformHelper:
    def __init__(self, state):
        self._state = state

    def show_json(self):
        return self._state

    def workspace_show(self):
        return "default"


def test_validate_project_success(monkeypatch):
    state = {
        "values": {
            "root_module": {
                "resources": [
                    {"type": "google_storage_bucket", "values": {"project": "test-project"}},
                ]
            }
        }
    }
    validator = StateValidator("terraform", expected_project_id="test-project")
    monkeypatch.setattr(validator, "terraform", DummyTerraformHelper(state))
    assert validator.validate_project() is True


def test_validate_required_resources_missing(monkeypatch):
    state = {
        "values": {
            "root_module": {
                "resources": [
                    {"type": "google_compute_instance", "values": {"project": "test-project"}},
                ]
            }
        }
    }
    validator = StateValidator("terraform", expected_project_id="test-project")
    monkeypatch.setattr(validator, "terraform", DummyTerraformHelper(state))
    try:
        validator.validate_required_resources(["google_storage_bucket"])
    except Exception as exc:
        assert "Missing required resource types" in str(exc)
