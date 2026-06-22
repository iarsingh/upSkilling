import json
import math
from pathlib import Path

from gcp_vertex_tabular_ml.data import FEATURES, TARGET


def train_linear_regression(rows: list[dict[str, float]]) -> dict[str, object]:
    if len(rows) < 2:
        raise ValueError("At least two rows are required for training")

    x_matrix = [[1.0, *(row[name] for name in FEATURES)] for row in rows]
    y_vector = [row[TARGET] for row in rows]
    coefficients = _solve_normal_equation(x_matrix, y_vector)

    predictions = [_dot(coefficients, row) for row in x_matrix]
    rmse = math.sqrt(
        sum((actual - predicted) ** 2 for actual, predicted in zip(y_vector, predictions))
        / len(y_vector)
    )
    mean_y = sum(y_vector) / len(y_vector)
    total_variance = sum((actual - mean_y) ** 2 for actual in y_vector)
    residual_variance = sum(
        (actual - predicted) ** 2 for actual, predicted in zip(y_vector, predictions)
    )
    r2 = 1 - residual_variance / total_variance if total_variance else 0.0

    return {
        "features": FEATURES,
        "intercept": coefficients[0],
        "coefficients": dict(zip(FEATURES, coefficients[1:])),
        "metrics": {
            "rmse": rmse,
            "r2": r2,
            "training_rows": len(rows),
        },
    }


def predict(model: dict[str, object], row: dict[str, float]) -> float:
    coefficients = model["coefficients"]
    value = float(model["intercept"])
    for feature in model["features"]:
        value += float(coefficients[feature]) * row[feature]
    return value


def write_artifacts(model: dict[str, object], artifact_dir: Path) -> tuple[Path, Path]:
    artifact_dir.mkdir(parents=True, exist_ok=True)
    model_path = artifact_dir / "model.json"
    metrics_path = artifact_dir / "metrics.json"

    with model_path.open("w", encoding="utf-8") as file:
        json.dump(
            {key: value for key, value in model.items() if key != "metrics"},
            file,
            indent=2,
        )
    with metrics_path.open("w", encoding="utf-8") as file:
        json.dump(model["metrics"], file, indent=2)

    return model_path, metrics_path


def _dot(coefficients: list[float], values: list[float]) -> float:
    return sum(coefficient * value for coefficient, value in zip(coefficients, values))


def _solve_normal_equation(x_matrix: list[list[float]], y_vector: list[float]) -> list[float]:
    width = len(x_matrix[0])
    xtx = [[0.0 for _ in range(width)] for _ in range(width)]
    xty = [0.0 for _ in range(width)]

    for row, target in zip(x_matrix, y_vector):
        for i in range(width):
            xty[i] += row[i] * target
            for j in range(width):
                xtx[i][j] += row[i] * row[j]

    return _gaussian_elimination(xtx, xty)


def _gaussian_elimination(matrix: list[list[float]], vector: list[float]) -> list[float]:
    size = len(vector)
    augmented = [row[:] + [value] for row, value in zip(matrix, vector)]

    for column in range(size):
        pivot = max(range(column, size), key=lambda row: abs(augmented[row][column]))
        if abs(augmented[pivot][column]) < 1e-12:
            raise ValueError("Training data produced a singular matrix")
        augmented[column], augmented[pivot] = augmented[pivot], augmented[column]

        pivot_value = augmented[column][column]
        augmented[column] = [value / pivot_value for value in augmented[column]]

        for row in range(size):
            if row == column:
                continue
            factor = augmented[row][column]
            augmented[row] = [
                current - factor * pivot_current
                for current, pivot_current in zip(augmented[row], augmented[column])
            ]

    return [row[-1] for row in augmented]

