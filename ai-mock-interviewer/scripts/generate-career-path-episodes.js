const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const seriesDir = path.join(root, "youtube-mock-interview-series");
const roadmap = fs.readFileSync(
  path.join(seriesDir, "career-path-python-full-stack-genai-ml-data-scientist.md"),
  "utf8",
);

const tracks = [
  {
    heading: "Python Full-Stack Interview Questions",
    episode: 120,
    slug: "python-full-stack-beginner-to-architect-round",
    title: "Python Full-Stack: Beginner to Architect Round",
    focus: "Python, FastAPI, React, PostgreSQL, testing, debugging, system design, platform architecture, and technical leadership",
    answerGuide: "Cover Python and API correctness, data modelling, frontend integration, testing, security, observability, performance, deployment, and maintainability at the depth expected for the level.",
  },
  {
    heading: "Generative AI Interview Questions",
    episode: 121,
    slug: "genai-beginner-to-architect-round",
    title: "Generative AI: Beginner to Architect Round",
    focus: "LLM fundamentals, RAG, structured output, evaluation, security, cost, GenAI platforms, governance, and enterprise AI architecture",
    answerGuide: "Cover model behaviour, retrieval or workflow design, evaluation, safety, privacy, latency, cost, observability, fallback, and governance at the depth expected for the level.",
  },
  {
    heading: "Machine Learning Engineering Interview Questions",
    episode: 122,
    slug: "machine-learning-engineering-beginner-to-architect-round",
    title: "Machine Learning Engineering: Beginner to Architect Round",
    focus: "ML fundamentals, evaluation, reproducibility, training pipelines, serving, monitoring, ML platforms, governance, and enterprise architecture",
    answerGuide: "Cover data and feature quality, reproducibility, model evaluation, deployment, training-serving consistency, monitoring, rollback, reliability, cost, and governance at the depth expected for the level.",
  },
  {
    heading: "Data Scientist Interview Questions",
    episode: 123,
    slug: "data-science-beginner-to-principal-round",
    title: "Data Science: Beginner to Principal Round",
    focus: "statistics, SQL, EDA, experimentation, product analytics, modelling, causal reasoning, communication, strategy, and leadership",
    answerGuide: "Cover business framing, data quality, statistical validity, SQL or analytical method, uncertainty, experiment or model validation, limitations, communication, and measurable impact at the depth expected for the level.",
  },
];

const levelMeta = {
  "Foundation — 0 to 1 Year": {
    label: "0-1 year | Foundation",
    structure: "definition -> simple example -> implementation -> basic validation",
    checks: "fundamental correctness, clear terminology, and the ability to apply the concept in a small example",
  },
  "Junior — 1 to 3 Years": {
    label: "1-3 years | Junior",
    structure: "requirements -> implementation -> edge cases -> tests and debugging",
    checks: "independent feature delivery, integration details, error handling, testing, and safe team practices",
  },
  "Mid-Level — 3 to 5 Years": {
    label: "3-5 years | Mid-Level",
    structure: "requirements -> component design -> production risks -> metrics -> rollback",
    checks: "production ownership, systematic debugging, design tradeoffs, observability, and measurable validation",
  },
  "Senior — 5 to 7 Years": {
    label: "5-7 years | Senior",
    structure: "business requirements -> architecture -> failure modes -> security and scale -> migration and validation",
    checks: "ambiguous system design, scale, security, reliability, migration planning, mentoring, and cross-team execution",
  },
  "Staff / Lead — 7 to 10 Years": {
    label: "7-10 years | Staff / Lead",
    structure: "organizational problem -> platform boundaries -> operating model -> adoption -> governance and outcomes",
    checks: "cross-team influence, platform thinking, standardization, adoption strategy, governance, and organization-level tradeoffs",
  },
  "Principal / Architect — 10+ Years": {
    label: "10+ years | Principal / Architect",
    structure: "business strategy -> decision framework -> evolutionary architecture -> quantified risk -> durable ownership",
    checks: "enterprise technical direction, decision quality under uncertainty, executive communication, long-term risk, and durable business impact",
  },
};

function extractTrack(track, nextTrack) {
  const startMarker = `### ${track.heading}`;
  const start = roadmap.indexOf(startMarker);
  const end = nextTrack
    ? roadmap.indexOf(`### ${nextTrack.heading}`, start + startMarker.length)
    : roadmap.indexOf("## Experience Progression", start + startMarker.length);
  const block = roadmap.slice(start, end);
  const lines = block.split("\n");
  const questions = [];
  let level;
  for (const line of lines) {
    const headingMatch = line.match(/^#### (.+)$/);
    if (headingMatch && levelMeta[headingMatch[1]]) level = headingMatch[1];
    const questionMatch = line.match(/^\d+\. (.+)$/);
    if (questionMatch && level) questions.push({ level, text: questionMatch[1] });
  }
  return questions;
}

function abbreviations(track) {
  const common = [
    "- API: Application Programming Interface",
    "- CI/CD: Continuous Integration and Continuous Delivery/Deployment",
    "- SLO: Service Level Objective",
  ];
  if (track.episode === 120) common.push("- ORM: Object-Relational Mapping", "- SQL: Structured Query Language");
  if (track.episode === 121) common.push("- GenAI: Generative Artificial Intelligence", "- LLM: Large Language Model", "- RAG: Retrieval-Augmented Generation");
  if (track.episode === 122) common.push("- ML: Machine Learning", "- MLOps: Machine Learning Operations", "- PR-AUC: Precision-Recall Area Under the Curve");
  if (track.episode === 123) common.push("- A/B: A controlled experiment comparing variant A with variant B", "- EDA: Exploratory Data Analysis", "- SQL: Structured Query Language");
  return common.join("\n");
}

function render(track, questions) {
  const parts = [
    `# Episode ${track.episode}: ${track.title}`,
    "",
    `YouTube title: AI Engineering Mock Interview Practice | Episode ${track.episode}: ${track.title}`,
    "",
    "Estimated duration: 24-30 min",
    "",
    "Source round: Python Full Stack to GenAI, ML, and Data Scientist Career Path",
    "",
    `Focus: ${track.focus}`,
    "",
    "## Opening",
    "",
    "Hi everyone, welcome back to the AI Engineering Mock Interview Practice series.",
    "",
    `In today's episode, we are practicing ${track.title}. The questions rise from foundation level to principal or architect level.`,
    "",
    "Pause after each question and answer aloud. State your assumptions, give a direct solution, discuss risks and tradeoffs, and finish with how you would validate success.",
    "",
    "## Abbreviations / Full Forms",
    "",
    abbreviations(track),
    "",
    "---",
  ];

  questions.forEach((question, index) => {
    const meta = levelMeta[question.level];
    parts.push(
      "",
      `## Question ${index + 1}`,
      "",
      `Experience level: ${meta.label}`,
      "",
      "Interviewer:",
      question.text,
      "",
      "Pause the video and answer this question aloud.",
      "",
      "Senior Associate answer guide:",
      `${track.answerGuide} Start by clarifying the goal and assumptions. Give a concrete approach, name meaningful alternatives, explain the main failure or misuse risk, and state how tests, metrics, experiments, or stakeholder review would prove the result. For this ${meta.label} question, demonstrate ${meta.checks}.`,
      "",
      "Senior answer structure:",
      `Use this structure: ${meta.structure}.`,
      "",
      "Scenario-based practice:",
      `Turn this into a real project or incident. Explain the context, constraints, decision, implementation, hardest tradeoff, failure handling, validation evidence, and your ownership for: ${question.text}`,
      "",
      "What interviewer checks:",
      `They are checking ${meta.checks}.`,
      "",
      "---",
    );
  });

  parts.push(
    "",
    "## Closing",
    "",
    `That completes Episode ${track.episode}: ${track.title}.`,
    "",
    "Repeat the round without reading the answer guides. A strong candidate should adjust answer depth to the stated experience level and should never pretend to have experience they do not have.",
    "",
    "For every answer: clarify the goal, state assumptions, propose the approach, discuss tradeoffs and risks, validate with evidence, and explain ownership and next steps.",
    "",
  );
  return parts.join("\n");
}

tracks.forEach((track, index) => {
  const questions = extractTrack(track, tracks[index + 1]);
  if (questions.length !== 12) {
    throw new Error(`${track.heading}: expected 12 questions, found ${questions.length}`);
  }
  const filename = `episode-${track.episode}-${track.slug}.md`;
  fs.writeFileSync(path.join(seriesDir, filename), render(track, questions));
});

