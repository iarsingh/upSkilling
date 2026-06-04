export const state = {
  template: "executive",
  accent: "#0f766e",
  background: "mesh",
  density: "comfortable",
  raw: "",
  ollama: {
    enabled: false,
    endpoint: "http://localhost:11434",
    model: "llama3.1:8b"
  },
  resume: {
    name: "Akhilesh Ranjan Singh",
    title: "ML Platform & DevOps Engineer",
    email: "akhileshranjan.ks@gmail.com",
    phone: "+91-8002392976",
    location: "Noida, India",
    linkedin: "https://www.linkedin.com/in/iamarsingh/",
    github: "https://github.com/iarsingh",
    summary:
      "ML Platform and DevOps Engineer with experience building Kubernetes-based cloud platforms and production-grade ML infrastructure across GCP, AWS, and Azure.",
    skills:
      "GCP, Vertex AI, GKE, Kubernetes, Terraform, Docker, Kubeflow, MLflow, GitOps, Jenkins, GitHub Actions, Prometheus, Grafana, ELK Stack, OpenTelemetry",
    experience:
      "Reduced ML model promotion lead time from 4 days to under 4 hours by building automated MLOps pipelines.\nReduced inference p99 latency by 30% through Kubernetes autoscaling and resource optimization.\nBuilt observability solutions with ELK Stack and OpenTelemetry, improving incident detection and MTTR.",
    projects:
      "Enterprise MLOps Platform on Google Cloud: Vertex AI, MLflow, Cloud Build, BigQuery, model lineage, canary deployments, monitoring, and retraining.\nAegisSphere: GenAI and agentic platform using GKE Enterprise, GitOps, LLMOps, RAG, and automated remediation.",
    education: "Bachelor of Engineering, Computer Science, RGPV Bhopal, 2019",
    customSections: [
      {
        id: crypto.randomUUID(),
        title: "Open Source",
        content: "GCP MLOps interview portfolio with 28 production-style platform engineering blueprints."
      }
    ]
  }
};

export const sampleText = `AKHILESH RANJAN SINGH
ML Platform & DevOps Engineer | GCP | Kubernetes | MLOps
akhileshranjan.ks@gmail.com +91-8002392976 Noida, India
LinkedIn: https://www.linkedin.com/in/iamarsingh/
GitHub: https://github.com/iarsingh

PROFESSIONAL SUMMARY
ML Platform & DevOps Engineer with 6.7+ years of experience building Kubernetes-based cloud platforms and production-grade ML infrastructure across GCP, AWS, and Azure.

TECHNICAL SKILLS
GCP, Vertex AI, GKE, Kubernetes, Terraform, Docker, Helm, Kubeflow, MLflow, Cloud Build, Argo CD, GitOps, Jenkins, GitHub Actions, Prometheus, Grafana, ELK Stack, OpenTelemetry

PROFESSIONAL EXPERIENCE
ML Platform & DevOps Engineer, Capgemini, Noida
Reduced ML model promotion lead time from 4 days to under 4 hours by building automated MLOps pipelines.
Reduced inference p99 latency by 30% through Kubernetes autoscaling policies and GPU-enabled node pools.
Built centralized observability using ELK Stack and OpenTelemetry, reducing incident detection time by 60%.

PROJECTS
Enterprise MLOps Platform on Google Cloud: Vertex AI, MLflow, Cloud Build, BigQuery, model lineage, canary deployments, and automated retraining.
AegisSphere: GenAI and agentic platform using GKE Enterprise, GitOps, LLMOps, RAG, secure deployment workflows, and automated remediation.

EDUCATION
Bachelor of Engineering - Computer Science, RGPV Bhopal, 2019

OPEN SOURCE
GCP MLOps interview portfolio with 28 production-style platform engineering blueprints.
Reusable Terraform, Kubernetes, CI/CD, observability, and release-governance examples.

AWARDS
Recognized for reducing deployment cycle time and improving production incident response.

LANGUAGES
English
Hindi`;
