const { publishPost } = require("./linkedin");

const text = `🚀 Built a full-stack MLOps & ML Infrastructure portfolio project locally

I created an end-to-end Incident Copilot platform that combines MLOps, AIOps, observability, GitOps, and local LLM inference using Ollama.

The project includes:

✅ FastAPI model serving
✅ scikit-learn incident risk model
✅ Ollama-powered SRE recommendation copilot
✅ MLflow-style model registry flow
✅ Model monitoring and drift report
✅ Docker + Docker Compose local platform
✅ Kubernetes + Helm deployment
✅ GPU scheduling manifests
✅ Terraform for GCP/GKE infrastructure
✅ Ansible bootstrap checks
✅ GitHub Actions, GitLab CI, Jenkins, Cloud Build
✅ ArgoCD GitOps deployment
✅ Prometheus, Grafana, OpenTelemetry, ELK
✅ PostgreSQL, MySQL, MongoDB, Redis
✅ Kafka and Google Pub/Sub integration examples
✅ Python, Bash, Go, REST API integration

This project helped me connect the dots between ML engineering, platform engineering, and production-grade DevOps practices.

The goal was not just to train a model, but to think like an ML infrastructure engineer:

- How will the model be deployed?
- How will it be monitored?
- How will infra be provisioned?
- How will releases be automated?
- How will teams debug incidents?
- How can local LLMs support SRE workflows?

This is the kind of hands-on project that makes MLOps real beyond notebooks.

#MLOps #MachineLearning #DevOps #Kubernetes #Docker #Terraform #Ansible #GitOps #ArgoCD #MLflow #Kubeflow #VertexAI #Prometheus #Grafana #OpenTelemetry #Kafka #Ollama #AIOps #PlatformEngineering`;

publishPost(text)
  .then((id) => {
    console.log(`Published to LinkedIn: ${id}`);
  })
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
