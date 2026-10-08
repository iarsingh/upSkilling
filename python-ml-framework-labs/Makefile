PYTHON ?= python3
VENV ?= .venv
BIN := $(VENV)/bin

.PHONY: setup test lint numpy quality train serve docker

setup:
	$(PYTHON) -m venv $(VENV)
	$(BIN)/pip install -U pip
	$(BIN)/pip install -e ".[dev]" || $(BIN)/pip install -e . pytest ruff

test:
	$(BIN)/pytest -q

lint:
	$(BIN)/ruff check src tests

numpy:
	$(BIN)/python -m ml_labs numpy

quality:
	$(BIN)/python -m ml_labs quality

train:
	$(BIN)/python -m ml_labs train

serve:
	$(BIN)/python -m ml_labs serve

docker:
	docker compose build
