UV ?= $(if $(wildcard .tools/bin/uv),.tools/bin/uv,uv)
export UV_CACHE_DIR := $(CURDIR)/.uv-cache

.PHONY: setup dev train test lint ui-build stack down
setup:
	$(UV) sync --frozen
	$(UV) run alembic upgrade head
	$(UV) run incident-seed
	$(UV) run incident-train
	cd frontend && npm ci && npm run build
dev:
	$(UV) run uvicorn incident_ops.main:app --host 127.0.0.1 --port 8000 --no-access-log
train:
	$(UV) run incident-train
test:
	$(UV) run pytest -q
lint:
	$(UV) run ruff check src tests migrations scripts
	$(UV) run ruff format --check src tests migrations scripts
ui-build:
	cd frontend && npm run build
stack:
	docker compose up --build -d
down:
	docker compose down
