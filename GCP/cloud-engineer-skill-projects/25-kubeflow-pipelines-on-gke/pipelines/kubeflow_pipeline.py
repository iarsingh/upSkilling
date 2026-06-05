from kfp import compiler, dsl


@dsl.component(base_image="python:3.12-slim")
def ingest() -> str:
    return "gs://example-bucket/raw/data.csv"


@dsl.component(base_image="python:3.12-slim")
def train(dataset_uri: str) -> str:
    print(f"training with {dataset_uri}")
    return "gs://example-bucket/models/model.pkl"


@dsl.component(base_image="python:3.12-slim")
def evaluate(model_uri: str) -> float:
    print(f"evaluating {model_uri}")
    return 0.93


@dsl.pipeline(name="kubeflow-training-pipeline")
def pipeline():
    dataset = ingest()
    model = train(dataset_uri=dataset.output)
    evaluate(model_uri=model.output)


if __name__ == "__main__":
    compiler.Compiler().compile(pipeline, "kubeflow_pipeline.yaml")

