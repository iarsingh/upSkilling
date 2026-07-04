import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.profile.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      fullName: "Akhilesh Ranjan Singh",
      headline: "Senior MLOps & Platform Engineer | GCP | Kubernetes | Terraform | AI Infrastructure",
      summary:
        "Senior MLOps & Platform Engineer with nearly 7 years of experience designing, automating, and operating cloud-native infrastructure across GCP, AWS, and Azure. Strong DevOps foundation in GKE, Terraform Enterprise, CI/CD, landing zones, and cloud security, plus hands-on experience building production AI platforms with Vertex AI, MLflow, KServe, and Kubernetes-based LLMOps (RAG, vLLM, Ollama).",
      email: "akhileshranjan.ks@gmail.com",
      phone: "+91-8002392976",
      location: "Noida, India",
      linkedin: "https://www.linkedin.com/in/iamarsingh/",
      github: "https://github.com/iarsingh",
      kaggle: "https://www.kaggle.com/iamarsingh",
      hackerrank: "https://www.hackerrank.com/profile/akhileshranjan_1",
      credly: null,
    },
    update: {},
  });

  const experience = [
    {
      title: "DevOps Engineer",
      company: "Capgemini",
      location: "Noida",
      startDate: "09/2024",
      endDate: "Present",
      order: 0,
      highlights: [
        "Designed secure GCP cloud platform foundations and enterprise landing zones using Terraform Enterprise, Shared VPC, and IAM governance.",
        "Built reusable Terraform modules for networking, IAM, Kubernetes, monitoring, logging, load balancing, and security controls, reducing provisioning effort by 70%.",
        "Managed production GKE clusters including node pools, upgrades, autoscaling, RBAC, and GPU-enabled node pools (NVIDIA L4/A100) for ML workloads.",
        "Designed and implemented end-to-end MLOps platforms using Vertex AI Pipelines, MLflow, KServe, and TensorFlow Serving for scalable model deployment.",
        "Implemented LLMOps and RAG workflows deploying Llama 3, Mistral, Ollama, and vLLM on Kubernetes for enterprise GenAI applications.",
        "Reduced cloud and AI infrastructure cost by over 20% through governance, GPU scheduling, autoscaling, and resource right-sizing.",
        "Improved observability through Prometheus, Grafana, ELK Stack, OpenTelemetry, and Google Cloud Operations Suite.",
      ],
    },
    {
      title: "Senior Software Engineer - DevOps",
      company: "Tech Mahindra",
      location: "Mumbai",
      startDate: "07/2022",
      endDate: "09/2024",
      order: 1,
      highlights: [
        "Designed enterprise CI/CD platforms using Jenkins, GitHub Actions, Terraform, Docker, Kubernetes, Helm, and Ansible.",
        "Built Infrastructure as Code across GCP, AWS, and Azure.",
        "Implemented DevSecOps controls including Prisma Cloud, vulnerability scanning, SAST/DAST, RBAC, IAM governance, and secrets management.",
        "Engineered backup and disaster recovery using Veeam and Kasten K10.",
        "Maintained highly available Kubernetes platforms across GCP, AWS, and Azure with 99.9% service availability.",
      ],
    },
    {
      title: "System Engineer - Cloud & DevOps",
      company: "TCS",
      location: "Bengaluru",
      startDate: "09/2019",
      endDate: "07/2022",
      order: 2,
      highlights: [
        "Managed production Kubernetes and GKE environments for business-critical applications.",
        "Automated CI/CD workflows using Jenkins, Cloud Build, and Infrastructure as Code, reducing deployment effort by 40%.",
        "Provisioned and maintained GCP infrastructure using Terraform and automation scripts.",
        "Supported migration from on-premises environments to GCP.",
        "Performed Linux administration, patching, troubleshooting, and production support.",
      ],
    },
  ];

  for (const e of experience) {
    await prisma.experience.upsert({
      where: { id: `seed-${e.company.toLowerCase().replace(/\s+/g, "-")}` },
      create: { id: `seed-${e.company.toLowerCase().replace(/\s+/g, "-")}`, ...e },
      update: e,
    });
  }

  const skillGroups: Record<string, string[]> = {
    Cloud: ["GCP", "AWS", "Azure", "Cloud Run", "VPC", "Cloud SQL", "Pub/Sub"],
    "Containers & Orchestration": ["Kubernetes", "GKE", "Docker", "Helm"],
    "IaC & Automation": ["Terraform", "Terraform Enterprise", "Ansible"],
    "CI/CD & GitOps": ["Jenkins", "GitHub Actions", "GitLab CI/CD", "Cloud Build", "ArgoCD", "GitOps"],
    Observability: ["Prometheus", "Grafana", "OpenTelemetry", "ELK Stack", "Google Cloud Monitoring"],
    Security: ["IAM", "RBAC", "Cloud Armor", "WAF", "DevSecOps", "Prisma Cloud", "Secret Management"],
    "MLOps / LLMOps": ["MLflow", "Vertex AI", "Kubeflow", "KServe", "vLLM", "Ollama", "RAG", "LangChain"],
    "Languages & Frameworks": ["Python", "Bash", "Go", "FastAPI"],
  };

  let skillOrder = 0;
  for (const [category, names] of Object.entries(skillGroups)) {
    for (const name of names) {
      await prisma.skill.upsert({
        where: { name },
        create: { name, category, order: skillOrder++ },
        update: { category },
      });
    }
  }

  const projects = [
    {
      slug: "ai-mock-interviewer",
      title: "AI Mock Interviewer",
      summary: "Local, Ollama-powered mock interview coach with a 2,000+ question DevOps/GCP/MLOps question bank.",
      description:
        "A fully local mock-interview coach for DevOps/GCP/MLOps interview prep. Runs entirely against a local Ollama model (with optional Claude API support), covers Kubernetes, Terraform, Docker, Ansible, CI/CD, Linux, Python, and LLMOps with a 2,000+ question bank across 46 fixed mock-interview rounds, tracks answers, and generates feedback and a Word/PDF export of the full Q&A bank.",
      tags: ["Ollama", "Node.js", "DevOps", "MLOps", "Interview Prep"],
      featured: true,
      order: 0,
    },
    {
      slug: "gcp-platform-engineering-portfolio",
      title: "GCP Platform Engineering Showcase",
      summary: "Production-style platform engineering path from source code to a protected GKE workload.",
      description:
        "A reusable, production-style platform engineering project demonstrating senior GCP, SRE, DevOps, Kubernetes, Terraform Enterprise, GitOps, CI/CD, security, and observability skills - implementing the full path from source code to a protected, observable GKE workload.",
      tags: ["GCP", "GKE", "Terraform Enterprise", "GitOps", "SRE"],
      featured: true,
      order: 1,
    },
    {
      slug: "gcp-mlops-pipeline-showcase",
      title: "GCP MLOps Pipeline on GKE",
      summary: "End-to-end MLOps pipeline demonstrating a live model lifecycle, not just a prediction API.",
      description:
        "An end-to-end MLOps showcase using Vertex AI, MLflow, FastAPI, GKE, Cloud Storage, KServe, Prometheus, Pub/Sub, and Cloud Run - built to demonstrate a live, operable model lifecycle (training, registry, serving, monitoring) rather than just a single prediction endpoint.",
      tags: ["Vertex AI", "MLflow", "KServe", "GKE", "FastAPI"],
      featured: true,
      order: 2,
    },
    {
      slug: "mlops-ollama-incident-copilot",
      title: "MLOps & ML Infrastructure Incident Copilot",
      summary: "Trains an incident-risk model and uses local Ollama to generate SRE-style remediation guidance.",
      description:
        "A portfolio-grade MLOps project: trains an incident-risk model on telemetry, deploys it as a FastAPI service, exposes model and infrastructure observability, and uses a local Ollama model to generate SRE-style remediation guidance for predicted incidents.",
      tags: ["MLOps", "Ollama", "FastAPI", "SRE", "Observability"],
      featured: true,
      order: 3,
    },
    {
      slug: "job-application-bot",
      title: "Job Application Automation Bot",
      summary: "Playwright-driven automation across LinkedIn, Naukri, Indeed, and major ATS platforms.",
      description:
        "Browser automation built with Playwright that searches and applies to roles across LinkedIn Easy Apply, Naukri, Indeed, and Greenhouse/Lever/Workday career pages, using a local Ollama model to answer free-text screening questions grounded in a real candidate profile.",
      tags: ["Playwright", "Automation", "Ollama", "Node.js"],
      featured: false,
      order: 4,
    },
    {
      slug: "python-gcp-automation-toolkit",
      title: "Python GCP Automation Toolkit",
      summary: "Five production-oriented Python automation tools packaged as one Click CLI and FastAPI service.",
      description:
        "Five production-oriented Python automation tools - covering common senior GCP DevOps/SRE/Platform Engineering tasks - packaged together as a single Click-based CLI and FastAPI service.",
      tags: ["Python", "GCP", "FastAPI", "Automation"],
      featured: false,
      order: 5,
    },
    {
      slug: "ansible-hands-on-projects",
      title: "Ansible Hands-On Projects",
      summary: "Ansible playbooks for Linux baselining, Docker hosts, Kubernetes tooling, and monitoring setup.",
      description:
        "A collection of Ansible playbooks covering Linux baseline hardening, Docker host provisioning, Kubernetes tooling installation, and monitoring stack setup - built for DevOps and GCP automation interview preparation.",
      tags: ["Ansible", "Linux", "Automation"],
      featured: false,
      order: 6,
    },
    {
      slug: "aiops-hands-on-projects",
      title: "AIOps Hands-On Projects",
      summary: "Log anomaly detection and alert correlation tooling for SRE/AIOps incident response.",
      description:
        "AIOps projects for DevOps, SRE, GCP operations, and Kubernetes operations - including a log anomaly detector that flags unusual service logs and error spikes, and an alert correlation engine that groups related alerts into incident candidates.",
      tags: ["AIOps", "Python", "SRE", "Observability"],
      featured: false,
      order: 7,
    },
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      create: p,
      update: p,
    });
  }

  const certifications = [
    { name: "Google Professional Cloud DevOps Engineer", issuer: "Google Cloud", year: "2025", order: 0 },
    { name: "Google Professional Cloud Network Engineer", issuer: "Google Cloud", year: "2025", order: 1 },
    { name: "Google Associate Cloud Engineer", issuer: "Google Cloud", year: "2024", order: 2 },
    { name: "SQL (Advanced)", issuer: "HackerRank", year: null, order: 3 },
    { name: "SQL (Intermediate)", issuer: "HackerRank", year: null, order: 4 },
    { name: "Python (Basic)", issuer: "HackerRank", year: null, order: 5 },
    { name: "Java (Basic)", issuer: "HackerRank", year: null, order: 6 },
    { name: "Go (Basic)", issuer: "HackerRank", year: null, order: 7 },
    { name: "Problem Solving (Basic)", issuer: "HackerRank", year: null, order: 8 },
  ];

  for (const c of certifications) {
    const existing = await prisma.certification.findFirst({ where: { name: c.name, issuer: c.issuer } });
    if (existing) {
      await prisma.certification.update({ where: { id: existing.id }, data: c });
    } else {
      await prisma.certification.create({ data: c });
    }
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminUsername && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.adminUser.upsert({
      where: { username: adminUsername },
      create: { username: adminUsername, passwordHash },
      update: { passwordHash },
    });
    console.log(`Admin user ready: ${adminUsername}`);
  } else {
    console.warn("ADMIN_USERNAME / ADMIN_PASSWORD not set - skipping admin user creation.");
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
