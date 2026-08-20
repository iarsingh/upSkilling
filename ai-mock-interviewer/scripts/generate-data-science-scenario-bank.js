const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const curriculum = require(path.join(ROOT, "public", "interview-prep-data.js"));
const outputPath = path.join(__dirname, "answer-bank", "90-data-science-scenario-beginner-to-expert.json");

const domainMap = new Map(curriculum.domains.map((domain) => [domain.name, domain]));
const pathDomains = curriculum.dataSciencePath.stages
  .flatMap((stage) => stage.domains)
  .map((name) => domainMap.get(name))
  .filter(Boolean);
const topics = [...new Set(pathDomains.flatMap((domain) => domain.topics))];

const levels = [
  {
    level: "Beginner",
    question(topic) {
      return `Beginner scenario - ${topic}: You receive a small, clean dataset and are asked to demonstrate where ${topic} fits in a Data Science workflow. How would you explain its purpose, implement a minimal working example, and verify that your result is correct?`;
    },
    answer(topic) {
      return `Start by defining ${topic} in plain language and stating the problem it solves. Identify the required inputs, expected output, and the simplest valid implementation. Work on a small reproducible sample, inspect the result manually, and add one objective validation such as a test, metric, shape check, visualization, or known expected value. Close by naming one assumption and one common misuse of ${topic}; this demonstrates understanding beyond memorized syntax.`;
    }
  },
  {
    level: "Intermediate",
    question(topic) {
      return `Intermediate scenario - ${topic}: A team's first implementation using ${topic} produces inconsistent results across training runs or data samples. How would you diagnose the inconsistency, improve the implementation, and compare the revised result with the baseline?`;
    },
    answer(topic) {
      return `Reproduce the inconsistency before changing anything. For ${topic}, inspect data quality, sampling, leakage, random seeds, preprocessing order, parameter choices, and version differences as applicable. Establish a fixed baseline and an evaluation protocol with representative splits or test cases. Change one factor at a time, track the experiment, and compare quality, stability, latency, and resource use rather than reporting a single favorable number. Document why the revised approach is more reliable and which cases still fail.`;
    }
  },
  {
    level: "Advanced",
    question(topic) {
      return `Advanced scenario - ${topic}: You must use ${topic} in a production Data Science system handling larger, changing, and potentially sensitive data. Design the solution, including scalability, failure handling, evaluation, monitoring, and reproducibility.`;
    },
    answer(topic) {
      return `Design ${topic} as a versioned pipeline component with explicit input and output contracts. Separate offline experimentation from repeatable production execution, pin code and dependencies, version data or features, and define idempotent retry behavior. Evaluate both model or analytical quality and operational behavior under realistic scale. Monitor data validity, drift, failures, latency, cost, and downstream impact with owned thresholds and alerts. Protect sensitive fields through least privilege and appropriate retention. Provide rollback or fallback behavior and retain enough lineage to reproduce any released result.`;
    }
  },
  {
    level: "Expert",
    question(topic) {
      return `Expert scenario - ${topic}: Senior stakeholders disagree about adopting ${topic}: one group wants maximum predictive performance, while another prioritizes interpretability, cost, governance, and delivery speed. How would you lead the decision, prove the trade-offs, and define a safe adoption strategy?`;
    },
    answer(topic) {
      return `Convert the disagreement about ${topic} into measurable decision criteria tied to business risk and user outcomes. Compare a simple baseline with the proposed approach using the same data, evaluation protocol, and operational constraints. Report uncertainty, subgroup behavior, interpretability, latency, cost, maintenance burden, compliance implications, and failure severity—not only aggregate accuracy. Recommend the least complex option that meets the agreed threshold, then use a limited pilot, approval gates, monitoring, rollback criteria, and named ownership. Record the decision and evidence so it can be revisited when assumptions or data change.`;
    }
  }
];

const entries = [];
for (const topic of topics) {
  for (const template of levels) {
    entries.push({
      source: "Data Science Path Scenario Bank",
      section: `Data Science Path - ${template.level} Scenarios`,
      category: `Data Science · ${template.level}`,
      topic,
      difficulty: template.level,
      questionType: "Scenario",
      question: template.question(topic),
      answer: template.answer(topic)
    });
  }
}

fs.writeFileSync(outputPath, `${JSON.stringify(entries, null, 2)}\n`);
console.log(`Created ${entries.length} scenario-based Data Science questions (${levels.length} levels × ${topics.length} topics)`);
console.log(path.relative(ROOT, outputPath));
