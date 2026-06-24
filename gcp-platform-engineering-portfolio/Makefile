PYTHON ?= .venv/bin/python
RUFF ?= .venv/bin/ruff

.PHONY: setup format lint test terraform-validate manifests validate

setup:
	python3 -m venv .venv
	.venv/bin/pip install -r app/requirements-dev.txt

format:
	terraform fmt -recursive terraform

lint:
	$(RUFF) check app

test:
	cd app && ../$(PYTHON) -m pytest -q

terraform-validate:
	cd terraform/environments/prod && terraform init -backend=false && terraform validate

manifests:
	kubectl kustomize k8s/overlays/prod > /tmp/platform-prod.yaml
	kubectl kustomize observability > /tmp/platform-observability.yaml

validate: lint test terraform-validate manifests
