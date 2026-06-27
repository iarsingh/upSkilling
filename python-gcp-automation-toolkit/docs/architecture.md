# Architecture

## Design

```text
Click CLI / FastAPI
        |
        v
Command orchestration
        |
        +--> Kubernetes collector --> GKE health rules
        +--> IAM collector --------> IAM audit rules
        +--> Compute/Billing ------> Cost optimization rules
        +--> GCS + Cloud Build ----> Cloud Run deployer
        +--> Vertex AI SDK --------> Training/model/endpoint automation
        |
        v
Structured Report models
        |
        +--> Rich terminal table
        +--> JSON
        +--> CSV
```

## Engineering Decisions

### Separate Collection and Analysis

Cloud clients return large generated protobuf objects. The toolkit converts these into small dictionaries before applying policy rules. This makes the logic:

- Unit testable without credentials
- Portable between CLI and API
- Easier to serialize
- Less coupled to SDK releases

### Dry Run by Default

Cloud Run deployment and Vertex AI mutations require `--execute`. Product-company automation should make the safe behavior the easiest behavior.

### Structured Findings

Every scanner emits a common `Finding` model with severity, category, resource, explanation, recommendation, and metadata. This supports future Jira, Pub/Sub, or Security Command Center integrations.

### Billing Sources

The Cloud Billing API confirms whether billing is enabled and identifies the billing account. Detailed cost by service comes from BigQuery billing export because the Billing Catalog API does not return project usage totals.

### Cloud Run Build Flow

The deployer zips source, stages it in GCS, submits a Cloud Build using the staged object, pushes an immutable image tag, and applies a Cloud Run service revision through the SDK.

## Extension Points

- Add organization/folder IAM scanning
- Add Recommender API rightsizing findings
- Add Cloud Asset Inventory search
- Publish findings to Pub/Sub
- Add policy configuration through YAML
- Add Slack/Jira report destinations
- Add async background jobs to FastAPI
