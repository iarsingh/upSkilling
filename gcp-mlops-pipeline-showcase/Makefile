PYTHON ?= .venv/bin/python
RUFF ?= .venv/bin/ruff

.PHONY: setup lint test train terraform-validate manifests validate

setup:
	python3 -m venv .venv
	.venv/bin/pip install -e ".[dev]"

lint:
	$(RUFF) check src tests

test:
	$(PYTHON) -m pytest -q

train:
	MLFLOW_TRACKING_URI="sqlite:///$(PWD)/mlflow.db" $(PYTHON) -m src.training.train

terraform-validate:
	terraform -chdir=terraform init -backend=false
	terraform -chdir=terraform validate

manifests:
	kubectl kustomize k8s/overlays/prod > /tmp/mlops-prod.yaml

validate: lint test terraform-validate manifests
