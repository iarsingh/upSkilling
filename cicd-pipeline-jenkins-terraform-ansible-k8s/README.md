# quiz-app CI/CD pipeline

A complete, actually-runnable CI/CD pipeline for the [interview-quiz-app](../interview-quiz-app):
Jenkins builds two containerized microservices, Ansible deploys them to
Kubernetes through a Kustomize overlay, and Istio meshes the two services
together with enforced mTLS. Terraform provisions the GKE cluster this is
meant to run on in real GCP (written, validated, intentionally not applied --
see [Terraform](#terraform-gcp) below).

Everything under `services/`, `k8s/`, `ansible/`, and `jenkins/` in this repo
has been run for real against a local minikube cluster -- this isn't just
code that *should* work, it's been exercised end to end (see
[What's actually been verified](#whats-actually-been-verified)).

## Architecture

```
                    ┌─────────────────────────────────────────────┐
                    │              Istio service mesh              │
                    │                                               │
  Jenkins  ── build ──▶  quiz-web (Flet UI)  ──mTLS──▶  quiz-api (FastAPI)
  (docker-      │        - flashcard UI                - /topics
   compose)     │        - fetches questions            - /questions
                │          from quiz-api                - /reviews (SQLite)
                │        - Deployment + Service          - /stats
                │                                        - Deployment + Service
                │                                               │
                └──── Ansible: kustomize render + apply ────────┘
                          (dev / staging / prod overlays)

  Istio Gateway + VirtualService: "/" -> quiz-web, "/api/" -> quiz-api
  PeerAuthentication: STRICT mTLS for all pod-to-pod traffic in `quiz` ns
```

`quiz-web` is the existing Flet app, unchanged in spirit -- it just now
fetches its question bank over HTTP from `quiz-api` instead of reading the
bundled JSON file directly, when `QUIZ_API_URL` is set (see
`interview-quiz-app/src/data_loader.py`). That's the real traffic Istio
routes and encrypts.

## Directory layout

```
services/
  quiz-api/            FastAPI microservice: topics/questions/reviews/stats,
                        SQLite-backed review state. Own Dockerfile + pytest suite.
  quiz-web/Dockerfile   Builds ../../interview-quiz-app as a container
                        (build context is that repo, not this one).
terraform/gcp/          GKE cluster, VPC, Artifact Registry, IAM. validated, not applied.
ansible/
  playbooks/bootstrap_ci_agent.yml   Installs docker/kubectl/helm/istioctl on a build agent.
  playbooks/deploy.yml               Renders + applies a Kustomize overlay via kubernetes.core.k8s.
k8s/
  base/                 quiz-api + quiz-web Deployments/Services, Istio Gateway/
                        VirtualService/PeerAuthentication/DestinationRules.
  overlays/{dev,staging,prod}/   Replica counts, resource limits, image tags, PDBs.
jenkins/
  Dockerfile             Jenkins controller with docker/kubectl/helm/istioctl/
                          terraform/minikube/ansible all preinstalled.
  casc.yaml               Configuration-as-Code: seeds the `quiz-pipeline` job on boot.
  docker-compose.yml        Local Jenkins, wired to minikube (see below).
Jenkinsfile              The pipeline itself: test -> build -> load into cluster ->
                          [push to registry / terraform plan, both opt-in] ->
                          ansible bootstrap -> ansible deploy -> smoke test.
scripts/generate-jenkins-kubeconfig.sh   Regenerate jenkins/kubeconfig.minikube-internal.
```

## Running it locally, end to end

Prerequisites: Docker Desktop, `minikube`, `istioctl`, `kubectl`, `ansible`,
`terraform` (`brew install minikube istioctl kubernetes-cli ansible
terraform`).

```bash
# 1. Local cluster + mesh
minikube start --cpus=4 --memory=7000 --driver=docker
istioctl install --set profile=demo -y
kubectl create namespace quiz
kubectl label namespace quiz istio-injection=enabled

# 2. Build images straight into minikube's image store
eval $(minikube docker-env)
docker build -t quiz-api:local services/quiz-api
docker build -f services/quiz-web/Dockerfile -t quiz-web:local ../interview-quiz-app

# 3. Deploy via Ansible (or `kubectl apply -k k8s/overlays/dev` directly)
cd ansible && ansible-playbook playbooks/deploy.yml -e k8s_environment=dev && cd ..

# 4. Hit it through the Istio ingress gateway
kubectl -n istio-system port-forward svc/istio-ingressgateway 18080:80 &
curl http://127.0.0.1:18080/api/health   # quiz-api, direct
open http://127.0.0.1:18080/             # quiz-web, in a browser
```

### Running the actual Jenkins pipeline

```bash
./scripts/generate-jenkins-kubeconfig.sh   # regenerate if you've restarted minikube
cd jenkins
TARGETARCH=arm64 docker compose up -d --build   # TARGETARCH=amd64 on Intel
docker exec -u root quiz-jenkins chmod 666 /var/run/docker.sock   # see note below
```

Open http://localhost:8081 (admin/admin, or set `JENKINS_ADMIN_PASSWORD`).
The `quiz-pipeline` job is already there -- JCasC (`jenkins/casc.yaml`) seeds
it from `Jenkinsfile` on every controller boot. Run it with parameters:

- `ENVIRONMENT`: `dev` / `staging` / `prod` (which Kustomize overlay)
- `PUSH_TO_REGISTRY`: off by default -- needs real GCP credentials
- `APPLY_TERRAFORM`: off by default -- needs real GCP credentials

A default run builds both images, loads them into minikube, deploys via the
Ansible playbook, and smoke-tests `quiz-api` from inside the cluster.

**Why the `chmod 666` on docker.sock**: Jenkins runs as a non-root user
inside its container, and the bind-mounted host docker.sock's group doesn't
match. This is a local-demo simplification (documented, not hidden) --
a real Jenkins agent VM would instead add the `jenkins` user to a `docker`
group that actually matches the socket's GID, or use a rootless Docker
setup. Don't do the chmod on a shared host.

## What's actually been verified

Not just written -- run, and the failures along the way fixed forward:

- `quiz-api` unit tests (pytest, 4 tests) pass.
- Both images build and run in minikube.
- Deployed via Ansible's `kubernetes.core.k8s` module against the live
  cluster; both Deployments reached `Available`.
- Confirmed via a real browser (Playwright) through the Istio ingress
  gateway that `quiz-web` fetches all 17 topics' questions from `quiz-api`
  live, and that `PeerAuthentication: STRICT` mTLS didn't break that path.
- `terraform validate` and `terraform fmt -check` pass on the GCP module
  (not applied -- see below).
- The Jenkins pipeline ran for real (build #6, after fixing five real
  issues: bind-mount permission errors, docker.sock permissions, a removed
  Ansible callback plugin, `minikube image load`'s state-dir resolution,
  and an interpreter-discovery mismatch) -- green from test through
  in-cluster smoke test.

## Terraform (GCP)

`terraform/gcp/` is real, `terraform validate`-clean Terraform for a GKE
cluster, VPC, Artifact Registry, and IAM service accounts -- but it targets
a real GCP project and was deliberately **not** applied, to avoid incurring
cloud cost without your say-so. To actually use it:

```bash
cd terraform/gcp
cp terraform.tfvars.example terraform.tfvars   # fill in your project_id
terraform init
terraform plan
terraform apply
```

See `versions.tf` for the (commented-out) GCS backend block -- uncomment
once you've created the state bucket. `iam.tf` creates a CI service account
with `artifactregistry.writer` + `container.developer`; for a Jenkins
instance running outside GCP (like this local one), prefer [Workload
Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation)
over a downloaded JSON key.

## Known simplifications (local-demo scope, called out on purpose)

- `quiz-api`'s SQLite file lives in an `emptyDir` volume -- fine for a demo,
  gone on pod restart. Production would use a PVC or, better, Cloud SQL.
- The Jenkins `docker.sock` permission fix (`chmod 666`) is a local-only
  shortcut -- see above.
- `jenkins/kubeconfig.minikube-internal` has cluster client cert/key data
  inlined and is gitignored; regenerate it locally, never commit it.
- Ansible bootstraps a Debian/Ubuntu CI agent for real (apt-based Docker/
  kubectl/Helm/istioctl install) -- but skips everything already present,
  which is why it's a no-op against this repo's own Jenkins image.
