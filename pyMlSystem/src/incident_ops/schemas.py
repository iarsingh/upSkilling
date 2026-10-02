from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

Category = Literal["database", "kubernetes", "network", "application", "security"]


class IncidentInput(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")
    title: str = Field(min_length=5, max_length=200)
    description: str = Field(min_length=15, max_length=10000)
    service: str = Field(min_length=1, max_length=100)
    severity: Literal["SEV1", "SEV2", "SEV3", "SEV4"] = "SEV3"


class FeedbackInput(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")
    helpful: bool
    correct_category: Category | None = None
    notes: str = Field(default="", max_length=2000)


class Recommendation(BaseModel):
    summary: str = Field(min_length=1, max_length=3000)
    steps: list[str] = Field(min_length=1, max_length=8)
    citation_ids: list[str] = Field(max_length=3)
