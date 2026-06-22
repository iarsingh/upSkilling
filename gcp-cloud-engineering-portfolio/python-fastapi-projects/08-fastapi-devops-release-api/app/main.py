from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="FastAPI DevOps Release API", version="0.1.0")


class ReleaseCandidate(BaseModel):
    service: str = Field(min_length=2)
    version: str = Field(pattern=r"^\d+\.\d+\.\d+$")
    tests_passed: bool
    critical_vulnerabilities: int = Field(ge=0)
    error_budget_remaining: float = Field(ge=0, le=100)


@app.post("/releases/evaluate")
def evaluate_release(candidate: ReleaseCandidate) -> dict:
    checks = {
        "tests": candidate.tests_passed,
        "security": candidate.critical_vulnerabilities == 0,
        "sre": candidate.error_budget_remaining >= 25,
    }
    approved = all(checks.values())
    return {
        "service": candidate.service,
        "version": candidate.version,
        "approved": approved,
        "checks": checks,
        "reason": "release approved" if approved else "one or more release gates failed",
    }

