PYTHON ?= .venv/bin/python
RUFF ?= .venv/bin/ruff

.PHONY: setup lint test package validate api

setup:
	python3 -m venv .venv
	.venv/bin/pip install -e ".[dev]"

lint:
	$(RUFF) check src tests

test:
	$(PYTHON) -m pytest -q

package:
	$(PYTHON) -m pip install build
	$(PYTHON) -m build

api:
	$(PYTHON) -m uvicorn gcp_ops_toolkit.api:app --reload --port 8080

validate: lint test
