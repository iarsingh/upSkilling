# Days 1-75 Plan

Each session is designed for approximately 30 minutes.

## Days 1-10: Python Product Foundation

- Create package layout and `pyproject.toml`.
- Build shared Pydantic report models.
- Add JSON/CSV exporters.
- Build Click command groups.
- Add Rich console output.
- Configure Ruff, Pytest, and GitHub Actions.
- Practice exceptions, typing, iterators, context managers, and dependency injection.

Evidence:

- Installable `gcp-ops` command
- Green tests and lint
- Example reports

## Days 11-25: GKE Health Checker

- Load local and in-cluster Kubernetes configuration.
- List nodes and pod statuses.
- Parse node pressure conditions.
- Detect CrashLoopBackOff and OOMKilled.
- Detect pending/failed pods and restart spikes.
- Add context selection and report export.
- Practice Kubernetes troubleshooting explanations and Python object parsing.

Evidence:

- Healthy-cluster report
- Failure fixture report
- GKE screenshot mapped to findings

## Days 26-38: IAM Audit Scanner

- Read project IAM policy.
- Identify public bindings.
- Flag owner/editor assignments.
- Flag privileged service-account roles.
- Detect role sprawl.
- Export CSV for security review.
- Document least-privilege remediation.
- Practice sets, dictionaries, grouping, and policy algorithms.

Evidence:

- IAM audit CSV
- Before/after IAM policy example
- Security recommendations

## Days 39-51: Cost Optimizer

- Query Compute Engine instances, disks, and snapshots.
- Detect terminated VMs and unattached disks.
- Calculate snapshot age.
- Query Cloud Billing project linkage.
- Query BigQuery billing export.
- Rank high-cost services.
- Add configurable retention thresholds.
- Practice datetime handling, pagination, aggregation, and cost tradeoffs.

Evidence:

- Cost report with recommendations
- Billing export query
- Estimated cleanup list

## Days 52-63: Cloud Run Deployer

- Create deterministic image URI plans.
- Archive and stage source in GCS.
- Submit Cloud Build.
- Push to Artifact Registry.
- Create/update Cloud Run.
- Pass runtime service account and environment variables.
- Add optional public invoker policy.
- Keep dry-run as default.
- Practice API polling, timeouts, idempotency, and rollback design.

Evidence:

- Dry-run plan
- Cloud Build execution
- Cloud Run revision and URL

## Days 64-71: Vertex AI Automation

- Create training-job plans.
- Submit custom container training.
- List models and versions.
- Create/reuse endpoints.
- Deploy model versions with autoscaling.
- Document model promotion and rollback.
- Practice asynchronous jobs, resource names, and ML lifecycle concepts.

Evidence:

- Vertex training job
- Model list output
- Endpoint deployment

## Days 72-75: Product Finish and Interview Prep

- Add FastAPI read-only and planning endpoints.
- Build the toolkit container.
- Finish permissions and architecture docs.
- Record a five-minute demo.
- Prepare STAR stories for automation impact.
- Review Python coding, GCP IAM, Kubernetes debugging, API design, retries, and testing.

## Definition of Done

- [ ] Five tools are available through one CLI.
- [ ] Mutations are dry-run by default.
- [ ] Reports support JSON and CSV.
- [ ] FastAPI exposes read-only scans and plans.
- [ ] Tests run without cloud credentials.
- [ ] CI validates package and container build.
- [ ] README provides reproducible commands.
- [ ] GitHub project can be explained in five minutes.
