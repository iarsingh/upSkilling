from gcp_ops_toolkit.iam_audit import audit_policy


def test_iam_audit_flags_public_and_privileged_service_accounts() -> None:
    report = audit_policy(
        "demo-project",
        [
            {"role": "roles/owner", "members": ["serviceAccount:ci@demo.iam.gserviceaccount.com"]},
            {"role": "roles/viewer", "members": ["allUsers"]},
        ],
    )
    categories = {finding.category for finding in report.findings}
    assert categories == {"privileged-service-account", "public-access"}


def test_iam_audit_flags_role_sprawl() -> None:
    account = "serviceAccount:app@demo.iam.gserviceaccount.com"
    bindings = [{"role": f"roles/custom.role{index}", "members": [account]} for index in range(8)]
    report = audit_policy("demo-project", bindings)
    assert any(finding.category == "role-sprawl" for finding in report.findings)
