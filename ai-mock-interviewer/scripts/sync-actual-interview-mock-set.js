const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const sourcePath = path.join(__dirname, "answer-bank", "actual-interview-new-questions.json");
const mockSetsPath = path.join(root, "public", "mock-interview-sets.json");
const generatedAnswersPath = path.join(__dirname, "answer-bank", "actual-interview-generated-answers.json");
const finalDatasetPath = path.join(__dirname, "answer-bank", "final-qa-dataset.json");
const gcpCloudRunRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-gcp-cloud-run-round-2026-08-26.json"
);
const gkeAiOperationsRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-gke-ai-operations-round-2026-08-26.json"
);
const gcpSreOperationsRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-gcp-sre-operations-round-2026-08-26.json"
);
const gcpCicdTroubleshootingRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-gcp-cicd-troubleshooting-round-2026-08-26.json"
);
const sreControllerRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-sre-kubernetes-controller-round-2026-08-26.json"
);
const gcpNetworkingActionsRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-gcp-networking-github-actions-round-2026-08-26.json"
);
const cicdObservabilityLinuxRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-cicd-observability-linux-round-2026-08-26.json"
);
const gcpLandingMigrationDrRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-gcp-landing-migration-dr-round-2026-08-26.json"
);
const gcpPlatformGovernanceRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-gcp-platform-governance-round-2026-09-05.json"
);
const jitendraAiPlatformMlopsRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-jitendra-ai-platform-mlops-round-2026-09-05.json"
);
const gkeJenkinsProductionTroubleshootingRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-gke-jenkins-production-troubleshooting-round-2026-09-05.json"
);
const awsEksBankingGolangRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-aws-eks-banking-golang-round-2026-09-05.json"
);
const codingMulticloudSolutionDesignRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-coding-multicloud-solution-design-round-2026-09-05.json"
);
const gkeAnthosWorkloadManagementRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-gke-anthos-workload-management-round-2026-09-05.json"
);
const gcpGkeGitopsSreRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-gcp-gke-gitops-sre-round-2026-09-05.json"
);
const gcpMonitoringDriftRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-gcp-monitoring-drift-round-2026-09-05.json"
);
const gcpGkePlatformAlignmentRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-gcp-gke-platform-alignment-round-2026-09-05.json"
);
const terraformGcpProjectExperiencePath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-terraform-gcp-project-experience-2026-09-05.json"
);
const gkeGatewayGitopsMicroservicesRoundPath = path.join(
  __dirname,
  "answer-bank",
  "actual-interview-gke-gateway-gitops-microservices-round-2026-09-05.json"
);
const reservedId = "actual-interview-latest";

function normalize(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function parseNumberedRound(fileName) {
  let category = "Actual Interview";
  const entries = [];
  const text = fs.readFileSync(path.join(root, "data", fileName), "utf8");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    const match = line.match(/^\d+\.\s+(.+)$/);
    if (!match) {
      category = line;
      continue;
    }
    entries.push({ category, section: category, question: match[1] });
  }
  return entries;
}

const source = [
  ...JSON.parse(fs.readFileSync(sourcePath, "utf8")),
  ...JSON.parse(fs.readFileSync(gcpCloudRunRoundPath, "utf8")),
  ...JSON.parse(fs.readFileSync(gkeAiOperationsRoundPath, "utf8")),
  ...JSON.parse(fs.readFileSync(gcpSreOperationsRoundPath, "utf8")),
  ...JSON.parse(fs.readFileSync(gcpCicdTroubleshootingRoundPath, "utf8")),
  ...JSON.parse(fs.readFileSync(sreControllerRoundPath, "utf8")),
  ...JSON.parse(fs.readFileSync(gcpNetworkingActionsRoundPath, "utf8")),
  ...JSON.parse(fs.readFileSync(cicdObservabilityLinuxRoundPath, "utf8")),
  ...JSON.parse(fs.readFileSync(gcpLandingMigrationDrRoundPath, "utf8")),
  ...JSON.parse(fs.readFileSync(gcpPlatformGovernanceRoundPath, "utf8")),
  ...JSON.parse(fs.readFileSync(jitendraAiPlatformMlopsRoundPath, "utf8")),
  ...JSON.parse(fs.readFileSync(gkeJenkinsProductionTroubleshootingRoundPath, "utf8")),
  ...JSON.parse(fs.readFileSync(awsEksBankingGolangRoundPath, "utf8")),
  ...JSON.parse(fs.readFileSync(codingMulticloudSolutionDesignRoundPath, "utf8")),
  ...JSON.parse(fs.readFileSync(gkeAnthosWorkloadManagementRoundPath, "utf8")),
  ...JSON.parse(fs.readFileSync(gcpGkeGitopsSreRoundPath, "utf8")),
  ...JSON.parse(fs.readFileSync(gcpMonitoringDriftRoundPath, "utf8")),
  ...JSON.parse(fs.readFileSync(gcpGkePlatformAlignmentRoundPath, "utf8")),
  ...JSON.parse(fs.readFileSync(terraformGcpProjectExperiencePath, "utf8")),
  ...JSON.parse(fs.readFileSync(gkeGatewayGitopsMicroservicesRoundPath, "utf8")),
  ...parseNumberedRound("actual-interview-landing-zone-gke-coding-round-2026-08-20.txt"),
  ...parseNumberedRound("actual-interview-kubernetes-elk-dynatrace-round-2026-08-20.txt"),
];
const generatedAnswers = fs.existsSync(generatedAnswersPath)
  ? JSON.parse(fs.readFileSync(generatedAnswersPath, "utf8"))
  : {};
const reviewedAnswers = fs.existsSync(finalDatasetPath)
  ? new Map(JSON.parse(fs.readFileSync(finalDatasetPath, "utf8")).map((entry) => [normalize(entry.question), entry.answer]))
  : new Map();
const unique = new Map();
for (const entry of source) {
  const key = normalize(entry.question);
  if (!key) continue;
  const existing = unique.get(key);
  if (!existing || (entry.answer && entry.answer !== existing.answer)) {
    unique.set(key, entry);
  }
}

const sets = JSON.parse(fs.readFileSync(mockSetsPath, "utf8")).filter((set) => set.id !== reservedId);
if (unique.size) {
  sets.unshift({
    id: reservedId,
    title: "Actually Asked Interview Questions - Latest Additions",
    focus: "New interview questions captured from real interview messages",
    questions: [...unique.values()].map((entry) => ({
      category: entry.category || entry.section || "Actual Interview",
      question: entry.question,
      answer: entry.answer || generatedAnswers[normalize(entry.question)] || reviewedAnswers.get(normalize(entry.question)),
    })),
  });
}
fs.writeFileSync(mockSetsPath, `${JSON.stringify(sets, null, 2)}\n`);
console.log(`Synced ${unique.size} latest actual-interview questions into mock-interview-sets.json`);
