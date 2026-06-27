# Required Permissions

Use separate read-only and deployer service accounts.

## Scanner Identity

Recommended roles:

- `roles/container.clusterViewer`
- `roles/browser`
- `roles/iam.securityReviewer`
- `roles/compute.viewer`
- `roles/billing.viewer`
- `roles/bigquery.jobUser`
- Dataset-level BigQuery Data Viewer on the billing export dataset
- `roles/aiplatform.viewer`

Kubernetes RBAC:

- Read nodes
- Read pods
- Read pod status and events

## Cloud Run Deployer

Recommended roles:

- `roles/cloudbuild.builds.editor`
- `roles/artifactregistry.writer`
- `roles/run.admin`
- `roles/iam.serviceAccountUser` on the Cloud Run runtime identity
- Object Creator on the source staging bucket

The Cloud Build service account also needs Artifact Registry write access.

## Vertex Automation

Recommended roles:

- `roles/aiplatform.user`
- `roles/artifactregistry.reader`
- `roles/storage.objectAdmin` on model artifact buckets
- `roles/iam.serviceAccountUser` on the Vertex runtime identity

## Avoid

- Owner
- Editor
- Downloaded service-account JSON keys
- Broad organization-level roles for project-only automation
