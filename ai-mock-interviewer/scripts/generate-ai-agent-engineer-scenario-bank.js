const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const curriculum = require(path.join(ROOT, "public", "interview-prep-data.js"));
const outputPath = path.join(__dirname, "answer-bank", "91-ai-agent-engineer-scenario-beginner-to-expert.json");
const topics = [...new Set(curriculum.aiAgentEngineerPath.stages.flatMap((stage) => stage.topics))];

const levels = [
  {
    level: "Beginner",
    question: (topic) => `Beginner AI Agent Engineer scenario - ${topic}: A client asks where ${topic} fits in a simple agent workflow. How would you explain it, build a minimal demonstration, and verify the expected behavior?`,
    answer: (topic) => `Explain ${topic} in terms of the business task it enables, then identify its input, output, dependency, and trust boundary. Build the smallest deterministic demonstration before introducing autonomous behavior. Use fixed test data, log each important step, and verify the result against a known expected outcome. State one limitation, one security consideration, and the condition under which a simpler non-agent workflow would be preferable.`
  },
  {
    level: "Intermediate",
    question: (topic) => `Intermediate AI Agent Engineer scenario - ${topic}: A pilot using ${topic} works in demos but becomes unreliable with real client requests and enterprise data. How would you reproduce the failures, improve the design, and evaluate the revised workflow?`,
    answer: (topic) => `Create a representative evaluation set for ${topic} using normal requests, ambiguous inputs, malformed data, authorization failures, and known edge cases. Capture prompts, tool arguments, retrieved context, model outputs, latency, cost, and final task outcome. Separate failures caused by the model, retrieval, tool integration, data quality, permissions, and orchestration. Fix the narrowest responsible layer, add schema validation and bounded retries, and compare the revised workflow with the baseline using task success, groundedness, error rate, latency, and human-review rate.`
  },
  {
    level: "Advanced",
    question: (topic) => `Advanced AI Agent Engineer scenario - ${topic}: Design a production solution using ${topic} for a multi-step business process with sensitive data, external tools, partial failures, and human approval requirements.`,
    answer: (topic) => `Treat ${topic} as one governed component in a stateful workflow, not an unrestricted autonomous loop. Define typed contracts for every tool and transition, least-privilege identities, tenant and data boundaries, idempotency keys, timeouts, retry budgets, and compensating actions. Persist resumable state and an audit trail while minimizing sensitive context. Place human approval before irreversible or high-impact actions. Test tool failures, stale data, prompt injection, authorization denial, duplicate invocation, and model degradation. Monitor task success, safety violations, cost, latency, and escalation rate, with a deterministic fallback and rollback plan.`
  },
  {
    level: "Expert",
    question: (topic) => `Expert AI Agent Engineer scenario - ${topic}: You own a client deployment involving ${topic}, but stakeholders disagree about autonomy, delivery speed, cost, and acceptable risk. How would you lead discovery, architecture, rollout, and measurable adoption?`,
    answer: (topic) => `Map the current workflow before proposing ${topic}: actors, decisions, systems, data classifications, exception paths, baseline effort, and business impact. Convert stakeholder concerns into explicit acceptance criteria and a risk-tiered autonomy policy. Compare deterministic automation, assisted AI, and autonomous execution, choosing the least autonomous design that meets the outcome. Deliver a narrow pilot with offline evaluation, shadow execution, human review, security testing, and named ownership. Expand only when task success, time saved, quality, cost, safety, and user adoption meet agreed thresholds. Preserve auditability, rollback, incident response, and a process for reevaluating the design as models and business rules change.`
  }
];

const entries = topics.flatMap((topic) => levels.map((template) => ({
  source: "AI Agent Engineer Path Scenario Bank",
  section: `AI Agent Engineer Path - ${template.level} Scenarios`,
  category: `AI Agent Engineer · ${template.level}`,
  topic,
  difficulty: template.level,
  questionType: "Scenario",
  question: template.question(topic),
  answer: template.answer(topic)
})));

fs.writeFileSync(outputPath, `${JSON.stringify(entries, null, 2)}\n`);
console.log(`Created ${entries.length} AI Agent Engineer scenarios (${levels.length} levels × ${topics.length} topics)`);
console.log(path.relative(ROOT, outputPath));
