from kfp import dsl


@dsl.component(base_image="python:3.12")
def generate_data():
    import subprocess
    subprocess.run(["python", "scripts/generate_training_data.py"], check=True)


@dsl.component(base_image="python:3.12")
def train_model():
    import subprocess
    subprocess.run(["python", "-m", "incident_copilot.training"], check=True)


@dsl.pipeline(name="incident-copilot-training")
def incident_copilot_pipeline():
    data_task = generate_data()
    train_model().after(data_task)


if __name__ == "__main__":
    from kfp import compiler

    compiler.Compiler().compile(incident_copilot_pipeline, "incident_pipeline.yaml")
