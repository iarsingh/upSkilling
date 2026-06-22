import pytest
from terraform_automation.terraform_helper import TerraformCommandError, TerraformHelper


def test_run_raises_when_terraform_missing():
    helper = TerraformHelper(".")
    with pytest.raises(TerraformCommandError):
        helper.run(["version"], env={"PATH": "/nonexistent"})
