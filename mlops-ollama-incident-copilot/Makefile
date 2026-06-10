.PHONY: setup train test api docker-build docker-up docker-down smoke helm-template terraform-fmt ansible-check go-run platform-check

setup:
	python3 -m venv .venv
	. .venv/bin/activate && pip install --upgrade pip && pip install -r requirements.txt

train:
	python3 scripts/generate_training_data.py
	PYTHONPATH=src python3 -m incident_copilot.training

test:
	PYTHONPATH=src pytest -q

api:
	PYTHONPATH=src uvicorn incident_copilot.api:app --host 0.0.0.0 --port 8080 --reload

docker-build:
	docker build -t incident-copilot:local .

docker-up:
	docker compose up --build

docker-down:
	docker compose down

smoke:
	curl -s http://localhost:8080/health

helm-template:
	helm template incident-copilot ./helm/incident-copilot

terraform-fmt:
	terraform fmt -recursive infra/terraform

ansible-check:
	ansible-playbook -i infra/ansible/inventory/local.ini infra/ansible/playbooks/bootstrap-local.yml --check

go-run:
	cd go/event-router && go run .

platform-check: test helm-template terraform-fmt
	cd go/event-router && go test ./...
