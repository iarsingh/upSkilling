const fs = require("fs");

const ollamaHost = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";
const ollamaModel = process.env.OLLAMA_MODEL || "llama3.1:8b";
const targetKeywords = [
  "gcp",
  "kubernetes",
  "docker",
  "terraform",
  "ansible",
  "ci/cd",
  "gitops",
  "argocd",
  "jenkins",
  "github actions",
  "mlflow",
  "kubeflow",
  "vertex ai",
  "prometheus",
  "grafana",
  "opentelemetry",
  "python",
  "linux",
  "sre",
  "mlops"
];

function readInput() {
  const args = process.argv.slice(2).join(" ").trim();
  if (args) return args;
  return fs.readFileSync(0, "utf8").trim();
}

function fallbackScore(text) {
  const lower = text.toLowerCase();
  const matches = targetKeywords.filter((keyword) => lower.includes(keyword));
  const mlopsSignals = ["mlops", "ml platform", "machine learning", "mlflow", "kubeflow", "vertex ai", "model"].filter((keyword) => lower.includes(keyword));
  const platformSignals = ["devops", "platform", "kubernetes", "terraform", "gcp", "sre", "ci/cd"].filter((keyword) => lower.includes(keyword));
  const score = Math.min(100, matches.length * 8 + mlopsSignals.length * 6 + platformSignals.length * 5);
  const resume = mlopsSignals.length >= platformSignals.length ? "AKHILESH_RANJAN_SINGH_MLOPS.pdf" : "AKHILESH_RANJAN_SINGH_Platform_Engineer.pdf";

  return {
    decision: score >= 45 ? "apply" : "skip_or_review",
    score,
    resume,
    matched_keywords: matches,
    reason: score >= 45
      ? "The role has enough direct DevOps, MLOps, cloud, platform, or Kubernetes signals."
      : "The role does not show enough target keywords yet. Review manually before applying.",
    answers: {
      experience: "7 years",
      current_ctc: "13 LPA",
      expected_ctc: "19 LPA",
      notice_period: "90 days",
      location: "Any",
      work_mode: "Any"
    }
  };
}

async function ollamaScore(text) {
  const prompt = [
    "You are helping screen LinkedIn jobs for Akhilesh Ranjan Singh.",
    "Return valid JSON only.",
    "Candidate: 7 years experience. Current CTC 13 LPA. Expected CTC 19 LPA. Notice period 90 days. Location/work mode any.",
    "Target roles: MLOps Engineer, ML Platform Engineer, AI Infrastructure Engineer, DevOps Engineer, Platform Engineer, Cloud Engineer, GCP Engineer, Kubernetes Engineer, SRE.",
    "Strong keywords: GCP, Kubernetes, Docker, Terraform, Ansible, CI/CD, GitOps, MLflow, Kubeflow, Vertex AI, Prometheus, Grafana, OpenTelemetry, Python, Linux, SRE, MLOps.",
    "Choose resume: MLOPS for MLOps, ML Platform, AI Infrastructure, Vertex AI, Kubeflow, MLflow, model deployment, LLMOps. Platform Engineer for DevOps, Platform, Cloud, GCP, Kubernetes, SRE, Terraform, Ansible, CI/CD.",
    "Fields: decision(apply/skip/review), score(0-100), resume, matched_keywords, reason, risk_flags, suggested_answers.",
    "",
    `Job text:\n${text}`
  ].join("\n");

  const response = await fetch(`${ollamaHost}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: ollamaModel,
      prompt,
      stream: false,
      format: "json",
      options: {
        temperature: 0.2,
        num_predict: 700
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return JSON.parse(data.response);
}

async function main() {
  const text = readInput();
  if (!text) {
    throw new Error("Paste a job description or pass job text as arguments.");
  }

  try {
    console.log(JSON.stringify(await ollamaScore(text), null, 2));
  } catch {
    console.log(JSON.stringify(fallbackScore(text), null, 2));
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
