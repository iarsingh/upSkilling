# Local Jenkins quality and observability stack

Start the stack:

```sh
docker compose up -d
```

Local services:

- Jenkins: http://localhost:8080
- Docker Jenkins: http://localhost:8082
- SonarQube: http://localhost:9000
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000
- Elasticsearch: http://localhost:9200
- Kibana: http://localhost:5601
- Logstash HTTP input: http://localhost:5001

Grafana is provisioned with Prometheus and Elasticsearch data sources.
The initial Grafana login is `admin` / `admin`; change it after first login.
The initial SonarQube login is `admin` / `admin`; SonarQube requires changing
that password at first login.

Docker Jenkins is built from `Dockerfile`, installs the Pipeline, Git,
Prometheus, SonarQube, and Kubernetes plugins, and automatically creates the
`docker-multibranch` job connected to
`https://github.com/iarsingh/upSkilling.git`. It reads
`cicd-pipeline-jenkins-terraform-ansible-k8s/Jenkinsfile` from each branch.
Its local development login defaults to
`admin` / `admin`; set `JENKINS_ADMIN_PASSWORD` before starting the stack to
override it.

Docker Jenkins connects to the local Minikube API through
`kubernetes/minikube-config`. Minikube certificates are mounted at runtime as
Docker secrets and are not copied into the repository or Jenkins image.
The `kubernetes-integration` Jenkins job impersonates the namespace-scoped
`jenkins-deployer` service account and verifies access by deploying
`jenkins-kubernetes-demo` in the `jenkins` namespace.
Its post-build actions verify successful rollouts, collect pod and event
diagnostics after failures, publish the final result to Logstash, and clean
the Jenkins workspace.

The demo Jenkins pipeline sends structured build events to Logstash. To run
actual SonarQube analysis, generate a SonarQube token and store it in Jenkins
Credentials rather than committing it to this repository.
