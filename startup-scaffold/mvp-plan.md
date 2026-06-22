# MVP Plan

## MVP v0

Build a local/demo app:

- FastAPI backend
- simple HTML or Streamlit UI
- Ollama locally for demo
- Claude/OpenAI optional for hosted mode
- prompt templates for:
  - Kubernetes incident
  - GCP incident
  - Terraform issue
  - CI/CD failure
  - MLOps inference issue

## Input

User pastes:

- alert message
- logs
- `kubectl describe pod`
- `terraform plan` error
- CI/CD failed job log
- Grafana alert text

## Output

The app returns:

- short incident summary
- likely causes
- commands to run
- remediation steps
- prevention checklist
- postmortem draft

## MVP Screens

1. Incident input
2. Analysis result
3. Runbook output
4. Postmortem draft
5. Saved examples

## MVP Tech Stack

- Python
- FastAPI
- SQLite
- Docker
- Ollama/Claude provider abstraction
- Kubernetes-ready deployment

## Build Milestones

Milestone 1:

- API accepts incident text and returns structured response.

Milestone 2:

- Add UI and saved examples.

Milestone 3:

- Add Kubernetes-specific template.

Milestone 4:

- Add runbook export to Markdown.

Milestone 5:

- Demo video and landing page.

