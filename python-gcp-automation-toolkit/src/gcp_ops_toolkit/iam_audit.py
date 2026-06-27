from collections import defaultdict
from typing import Any

from gcp_ops_toolkit.models import Finding, Report, Severity


HIGH_RISK_ROLES = {
    "roles/owner": Severity.CRITICAL,
    "roles/editor": Severity.HIGH,
    "roles/iam.securityAdmin": Severity.HIGH,
    "roles/iam.serviceAccountAdmin": Severity.HIGH,
    "roles/iam.serviceAccountTokenCreator": Severity.HIGH,
    "roles/resourcemanager.projectIamAdmin": Severity.CRITICAL,
}


def audit_policy(project_id: str, bindings: list[dict[str, Any]]) -> Report:
    findings: list[Finding] = []
    service_account_roles: dict[str, set[str]] = defaultdict(set)

    for binding in bindings:
        role = binding["role"]
        members = binding.get("members", [])
        severity = HIGH_RISK_ROLES.get(role)
        for member in members:
            if member in {"allUsers", "allAuthenticatedUsers"}:
                findings.append(
                    Finding(
                        tool="iam-audit",
                        category="public-access",
                        severity=Severity.CRITICAL,
                        resource=project_id,
                        message=f"{role} is granted to {member}.",
                        recommendation="Remove public project IAM and use resource-level access where required.",
                    )
                )
            if member.startswith("serviceAccount:"):
                service_account_roles[member].add(role)
                if severity:
                    findings.append(
                        Finding(
                            tool="iam-audit",
                            category="privileged-service-account",
                            severity=severity,
                            resource=member,
                            message=f"Service account has high-risk role {role}.",
                            recommendation="Replace primitive/admin roles with task-specific least-privilege roles.",
                        )
                    )
            if member.startswith("user:") and role in {"roles/owner", "roles/editor"}:
                findings.append(
                    Finding(
                        tool="iam-audit",
                        category="primitive-user-role",
                        severity=severity or Severity.HIGH,
                        resource=member,
                        message=f"User has primitive role {role}.",
                        recommendation="Use Google Groups and predefined least-privilege roles.",
                    )
                )

    for service_account, roles in service_account_roles.items():
        if len(roles) >= 8:
            findings.append(
                Finding(
                    tool="iam-audit",
                    category="role-sprawl",
                    severity=Severity.MEDIUM,
                    resource=service_account,
                    message=f"Service account has {len(roles)} project-level roles.",
                    recommendation="Review role usage and move permissions to narrower resource scopes.",
                    metadata={"roles": sorted(roles)},
                )
            )

    return Report(
        tool="iam-audit",
        project_id=project_id,
        summary={
            "bindings": len(bindings),
            "service_accounts": len(service_account_roles),
            "finding_count": len(findings),
        },
        findings=findings,
        raw={"bindings": bindings},
    )


def get_project_policy(project_id: str) -> list[dict[str, Any]]:
    from google.cloud import resourcemanager_v3
    from google.iam.v1 import iam_policy_pb2

    client = resourcemanager_v3.ProjectsClient()
    request = iam_policy_pb2.GetIamPolicyRequest(resource=f"projects/{project_id}")
    policy = client.get_iam_policy(request=request)
    return [
        {"role": binding.role, "members": list(binding.members)}
        for binding in policy.bindings
    ]
