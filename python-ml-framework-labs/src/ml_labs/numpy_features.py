"""Lab 01 — vectorized NumPy feature engine for synthetic service telemetry.

No pandas. Rolling statistics use a sliding window so past rows never see future values.
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path

import numpy as np
from numpy.lib.stride_tricks import sliding_window_view

FEATURE_NAMES = ("latency_ms", "error_rate", "cpu_pct", "mem_pct")
WINDOW = 5


@dataclass(frozen=True)
class FeatureBundle:
    raw: np.ndarray
    zscored: np.ndarray
    rolling_mean: np.ndarray
    rolling_std: np.ndarray
    interactions: np.ndarray
    matrix: np.ndarray
    names: tuple[str, ...]


def make_telemetry(n: int = 240, seed: int = 11) -> np.ndarray:
    """Synthetic (n, 4) telemetry: latency, error rate, CPU, memory."""
    rng = np.random.default_rng(seed)
    t = np.linspace(0, 8 * np.pi, n)
    latency = 120 + 35 * np.sin(t) + rng.normal(0, 8, n)
    errors = np.clip(0.02 + 0.015 * np.sin(t / 2) + rng.normal(0, 0.004, n), 0, 0.25)
    cpu = np.clip(45 + 20 * np.sin(t / 3) + rng.normal(0, 4, n), 1, 99)
    mem = np.clip(50 + 12 * np.cos(t / 4) + rng.normal(0, 3, n), 1, 99)
    return np.column_stack([latency, errors, cpu, mem]).astype(np.float64)


def zscore(x: np.ndarray, axis: int = 0) -> np.ndarray:
    x = np.asarray(x, dtype=np.float64)
    mean = np.nanmean(x, axis=axis, keepdims=True)
    std = np.nanstd(x, axis=axis, keepdims=True)
    std = np.where(std == 0.0, 1.0, std)
    return (x - mean) / std


def rolling_mean(x: np.ndarray, window: int = WINDOW) -> np.ndarray:
    return _rolling_stat(x, window, np.mean)


def rolling_std(x: np.ndarray, window: int = WINDOW) -> np.ndarray:
    return _rolling_stat(x, window, np.std)


def _rolling_stat(x: np.ndarray, window: int, reducer) -> np.ndarray:
    if window < 2:
        raise ValueError("window must be >= 2")
    x = np.asarray(x, dtype=np.float64)
    one_d = x.ndim == 1
    if one_d:
        x = x[:, None]
    n, cols = x.shape
    out = np.full((n, cols), np.nan, dtype=np.float64)
    if n >= window:
        windows = sliding_window_view(x, window, axis=0)
        out[window - 1 :] = reducer(windows, axis=-1)
    return out[:, 0] if one_d else out


def pairwise_products(x: np.ndarray) -> np.ndarray:
    x = np.asarray(x, dtype=np.float64)
    i, j = np.triu_indices(x.shape[1], k=1)
    return x[:, i] * x[:, j]


def cosine_topk(query: np.ndarray, matrix: np.ndarray, k: int = 5) -> tuple[np.ndarray, np.ndarray]:
    query = np.asarray(query, dtype=np.float64)
    matrix = np.asarray(matrix, dtype=np.float64)
    q = query / (np.linalg.norm(query) + 1e-12)
    norms = np.linalg.norm(matrix, axis=1, keepdims=True) + 1e-12
    scores = (matrix / norms) @ q
    k = min(k, scores.size)
    idx = np.argpartition(-scores, kth=k - 1)[:k]
    order = np.argsort(-scores[idx])
    idx = idx[order]
    return idx, scores[idx]


def build_features(raw: np.ndarray | None = None, window: int = WINDOW) -> FeatureBundle:
    raw = make_telemetry() if raw is None else np.asarray(raw, dtype=np.float64)
    zscored = zscore(raw)
    rmean = rolling_mean(raw, window)
    rstd = rolling_std(raw, window)
    interactions = pairwise_products(zscored)
    valid = ~np.isnan(rmean).any(axis=1)
    matrix = np.hstack([zscored[valid], rmean[valid], rstd[valid], interactions[valid]])
    names = (
        tuple(f"z_{n}" for n in FEATURE_NAMES)
        + tuple(f"rmean_{n}" for n in FEATURE_NAMES)
        + tuple(f"rstd_{n}" for n in FEATURE_NAMES)
        + tuple(f"z_{FEATURE_NAMES[i]}*{FEATURE_NAMES[j]}" for i, j in zip(*np.triu_indices(4, k=1), strict=True))
    )
    return FeatureBundle(
        raw=raw,
        zscored=zscored,
        rolling_mean=rmean,
        rolling_std=rstd,
        interactions=interactions,
        matrix=matrix,
        names=names,
    )


def write_report(bundle: FeatureBundle, path: Path) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    query = bundle.matrix[0]
    idx, scores = cosine_topk(query, bundle.matrix, k=3)
    path.write_text(
        json.dumps(
            {
                "rows": int(bundle.raw.shape[0]),
                "feature_dim": int(bundle.matrix.shape[1]),
                "feature_names": list(bundle.names),
                "warmup_rows_dropped": int(bundle.raw.shape[0] - bundle.matrix.shape[0]),
                "nearest_neighbor_idx": idx.tolist(),
                "cosine_scores": [round(float(s), 4) for s in scores],
            },
            indent=2,
        )
    )
    return path
