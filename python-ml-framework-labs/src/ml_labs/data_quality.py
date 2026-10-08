"""Lab 02 — data-science quality gates on a messy synthetic customer table.

Planted issues: duplicate IDs, missing charges, a future-looking leakage column,
and a row-wise split that contaminates train and test with the same customer.
"""

from __future__ import annotations

import json
from dataclasses import asdict, dataclass, field
from pathlib import Path

import numpy as np
import pandas as pd

LEAKAGE_COLUMNS = ("future_spend", "next_month_churn", "label_tomorrow")
MAX_NULL_RATE = 0.05
MAX_DUPLICATE_RATE = 0.0
MAX_ID_OVERLAP = 0
LEAKAGE_CORR_THRESHOLD = 0.25


@dataclass
class GateResult:
    name: str
    passed: bool
    detail: str


@dataclass
class QualityReport:
    row_count: int
    gates: list[GateResult] = field(default_factory=list)

    @property
    def passed(self) -> bool:
        return all(g.passed for g in self.gates)

    def to_dict(self) -> dict:
        return {"row_count": self.row_count, "passed": self.passed, "gates": [asdict(g) for g in self.gates]}


def make_messy_customers(n: int = 400, seed: int = 7) -> pd.DataFrame:
    rng = np.random.default_rng(seed)
    customer_id = np.arange(1, n + 1)
    tenure = rng.integers(1, 72, size=n)
    monthly_charges = rng.normal(70, 18, size=n).clip(12, 160)
    support_tickets = rng.poisson(1.4, size=n)
    late_payments = rng.poisson(0.6, size=n)
    contract = rng.choice(["month-to-month", "one-year", "two-year"], size=n, p=[0.55, 0.3, 0.15])
    logit = -1.4 + 0.55 * support_tickets + 0.35 * late_payments - 0.025 * tenure
    churn = (rng.uniform(size=n) < 1 / (1 + np.exp(-logit))).astype(int)
    # Future value that is easier to predict than the real features — leakage.
    future_spend = monthly_charges * (1.0 - 0.55 * churn) + rng.normal(0, 2, n)

    frame = pd.DataFrame(
        {
            "customer_id": customer_id,
            "tenure": tenure,
            "monthly_charges": monthly_charges,
            "support_tickets": support_tickets,
            "late_payments": late_payments,
            "contract": contract,
            "churn": churn,
            "future_spend": future_spend,
        }
    )
    dupes = frame.iloc[:12].copy()
    frame = pd.concat([frame, dupes], ignore_index=True)
    null_idx = frame.sample(n=24, random_state=seed).index
    frame.loc[null_idx, "monthly_charges"] = np.nan
    return frame


def _null_gate(frame: pd.DataFrame) -> GateResult:
    rate = float(frame.isna().mean().max())
    return GateResult(
        "null_rate",
        rate <= MAX_NULL_RATE,
        f"max column null rate={rate:.3f} threshold={MAX_NULL_RATE}",
    )


def _duplicate_gate(frame: pd.DataFrame) -> GateResult:
    rate = float(frame["customer_id"].duplicated().mean())
    return GateResult(
        "duplicate_ids",
        rate <= MAX_DUPLICATE_RATE,
        f"duplicate id rate={rate:.3f} threshold={MAX_DUPLICATE_RATE}",
    )


def _leakage_gate(frame: pd.DataFrame, target: str = "churn") -> GateResult:
    suspects = [c for c in frame.columns if c in LEAKAGE_COLUMNS or c.startswith("future_") or c.startswith("next_")]
    flagged: list[str] = []
    numeric = frame.select_dtypes(include=[np.number])
    if target in numeric:
        corr = numeric.corr(numeric_only=True)[target].drop(labels=[target], errors="ignore")
        flagged.extend(corr[corr.abs() >= LEAKAGE_CORR_THRESHOLD].index.tolist())
    names = sorted(set(suspects) | {c for c in flagged if c in LEAKAGE_COLUMNS or c.startswith("future_")})
    return GateResult(
        "target_leakage",
        len(names) == 0,
        "no leakage columns" if not names else f"leakage suspects={names}",
    )


def _split_overlap_gate(frame: pd.DataFrame, train_ids: np.ndarray, test_ids: np.ndarray) -> GateResult:
    overlap = set(train_ids) & set(test_ids)
    return GateResult(
        "train_test_id_overlap",
        len(overlap) <= MAX_ID_OVERLAP,
        f"overlapping customer ids={len(overlap)} threshold={MAX_ID_OVERLAP}",
    )


def leaky_row_split(frame: pd.DataFrame, test_size: float = 0.25, seed: int = 0) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Wrong split: shuffles rows, so duplicated customers can land in both sides."""
    shuffled = frame.sample(frac=1.0, random_state=seed)
    cut = int(len(shuffled) * (1 - test_size))
    return shuffled.iloc[:cut], shuffled.iloc[cut:]


def split_by_id(frame: pd.DataFrame, test_size: float = 0.25, seed: int = 0) -> tuple[pd.DataFrame, pd.DataFrame]:
    ids = frame["customer_id"].drop_duplicates().to_numpy().copy()
    rng = np.random.default_rng(seed)
    rng.shuffle(ids)
    cut = int(len(ids) * (1 - test_size))
    train_ids, test_ids = set(ids[:cut]), set(ids[cut:])
    return (
        frame[frame["customer_id"].isin(train_ids)].copy(),
        frame[frame["customer_id"].isin(test_ids)].copy(),
    )


def run_gates(frame: pd.DataFrame, train: pd.DataFrame | None = None, test: pd.DataFrame | None = None) -> QualityReport:
    if train is None or test is None:
        train, test = leaky_row_split(frame)
    gates = [
        _null_gate(frame),
        _duplicate_gate(frame),
        _leakage_gate(frame),
        _split_overlap_gate(frame, train["customer_id"].to_numpy(), test["customer_id"].to_numpy()),
    ]
    return QualityReport(row_count=len(frame), gates=gates)


def write_report(before: QualityReport, after: QualityReport, path: Path, train_rows: int, test_rows: int) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(
            {
                "before": before.to_dict(),
                "after": after.to_dict(),
                "train_rows": train_rows,
                "test_rows": test_rows,
            },
            indent=2,
        )
    )
    return path


def clean_for_training(frame: pd.DataFrame) -> pd.DataFrame:
    cleaned = frame.drop(columns=[c for c in frame.columns if c in LEAKAGE_COLUMNS or c.startswith("future_")], errors="ignore")
    cleaned = cleaned.drop_duplicates(subset=["customer_id"], keep="first")
    cleaned = cleaned.dropna(subset=["monthly_charges", "tenure", "churn"])
    return cleaned.reset_index(drop=True)
