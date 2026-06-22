from kfp import compiler, dsl


@dsl.component(
    base_image="python:3.12-slim",
    packages_to_install=["scikit-learn==1.5.0"],
)
def train_model() -> float:
    from sklearn.datasets import load_iris
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.metrics import accuracy_score
    from sklearn.model_selection import train_test_split

    iris = load_iris()
    x_train, x_test, y_train, y_test = train_test_split(
        iris.data, iris.target, test_size=0.2, random_state=42
    )
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(x_train, y_train)
    return float(accuracy_score(y_test, model.predict(x_test)))


@dsl.pipeline(name="iris-training-pipeline")
def pipeline():
    train_model()


if __name__ == "__main__":
    compiler.Compiler().compile(pipeline_func=pipeline, package_path="vertex_pipeline.yaml")

