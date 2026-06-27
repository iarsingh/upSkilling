from datetime import UTC, datetime
from enum import StrEnum
from typing import Any

from pydantic import BaseModel, Field


class Severity(StrEnum):
    INFO = "info"
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class Finding(BaseModel):
    tool: str
    category: str
    severity: Severity
    resource: str
    message: str
    recommendation: str
    metadata: dict[str, Any] = Field(default_factory=dict)


class Report(BaseModel):
    tool: str
    project_id: str | None = None
    generated_at: datetime = Field(default_factory=lambda: datetime.now(UTC))
    summary: dict[str, Any] = Field(default_factory=dict)
    findings: list[Finding] = Field(default_factory=list)
    raw: dict[str, Any] = Field(default_factory=dict)
