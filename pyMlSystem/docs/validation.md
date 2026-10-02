# Local validation — 2026-09-25

Verified in `/Users/akhileshsingh/Documents/upSkilling/pyMlSystem`.

| Check | Result |
| --- | --- |
| Ruff lint and formatting | Passed |
| Python tests | 11 passed; 88% measured statement coverage |
| React / TypeScript / Vite production build | Passed |
| Browser workflow | Passed: submit demo incident, inspect routing/evidence, save feedback, reload and retrieve feedback, open runbook library |
| Mobile browser layout | Passed at 390 × 844 with no horizontal page overflow |
| Desktop visual inspection | Passed at 1440 × 1100 |
| Native API smoke test | Passed: readiness, database classification, citations, persisted feedback, metrics |
| MLflow | Local tracking, model registration, and model v2 pyfunc load/prediction passed; corrected tensor input signature verified |
| Terraform | Provider 8.4.0 initialized with backend disabled; format and schema validation passed; no plan/apply |
| Docker Compose | Configuration parsed successfully; services and image build not executed locally |

The Docker CLI is installed, but the daemon is unavailable and Docker Desktop is not installed under its application name. No alternate local container runtime was found on PATH. PostgreSQL/pgvector execution, container builds, Prometheus scraping, Grafana provisioning, and OTLP collection therefore remain unverified on this machine. CI includes the Compose/PostgreSQL path but has not been pushed or run remotely.

The local app uses SQLite and the demo classifier. MLflow uses a separate local SQLite database and local artifact directory. The Python unit tests use isolated temporary databases; browser and smoke tests add labeled demo incidents to the development database.

Both accuracy and macro-F1 were 1.0 on the 20 synthetic held-out examples. These numbers only validate the narrow demo pipeline; they do not establish production accuracy or business value. Sixty synthetic examples were used for training.

The optional OpenAI path was tested with mocked structured responses, including invalid citations. No paid model requests were made. Terraform/GKE manifests have not been deployed; the remaining cloud prerequisites are listed in `cloud-deployment.md`.
