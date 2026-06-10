from pathlib import Path

import mlflow

MODEL_PATH = Path("models/incident_risk_model.joblib")


def main() -> None:
    mlflow.set_tracking_uri("http://localhost:5000")
    mlflow.set_experiment("incident-copilot")
    with mlflow.start_run(run_name="register-local-model") as run:
        mlflow.log_artifact(str(MODEL_PATH), artifact_path="model")
        mlflow.log_param("model_type", "random_forest")
        mlflow.log_param("llm_copilot", "ollama")
        print(f"Logged model artifact in run {run.info.run_id}")


if __name__ == "__main__":
    main()
