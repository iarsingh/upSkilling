const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "oracle-ohai-product-interview-prep");

function read(name) {
  return fs.readFileSync(path.join(root, name), "utf8");
}

function numberedEntries(markdown) {
  const entries = new Map();
  let section = "";
  for (const line of markdown.split("\n")) {
    if (/^## /.test(line)) section = line;
    const match = line.match(/^(\d+)\.\s+(.*)$/);
    if (match) entries.set(Number(match[1]), { section, text: match[2] });
  }
  return entries;
}

function combineNumbered(questionFile, answerFile, title, outputFile) {
  const questions = numberedEntries(read(questionFile));
  const answers = numberedEntries(read(answerFile));
  const lines = [
    `# ${title}`,
    "",
    "Each question is immediately followed by its model answer. Adapt experience-based answers to your truthful personal examples.",
    ""
  ];
  let lastSection = "";
  for (const [number, question] of questions) {
    const answer = answers.get(number);
    if (!answer) throw new Error(`Missing answer ${number} for ${questionFile}`);
    if (question.section && question.section !== lastSection) {
      lines.push(question.section, "");
      lastSection = question.section;
    }
    lines.push(`### Question ${number}`, "", question.text, "", "**Answer:**", "", answer.text, "");
  }
  if (questions.size !== answers.size) {
    throw new Error(`${questionFile} has ${questions.size} questions but ${answerFile} has ${answers.size} answers`);
  }
  fs.writeFileSync(path.join(root, outputFile), `${lines.join("\n").trim()}\n`);
}

function sections(markdown) {
  const result = new Map();
  let heading = "";
  let content = [];
  const flush = () => {
    if (heading) {
      const number = Number(heading.match(/^(\d+)\./)[1]);
      result.set(number, { heading, content: content.join("\n").trim() });
    }
  };
  for (const line of markdown.split("\n")) {
    const match = line.match(/^## (\d+\. .*)$/);
    if (match) {
      flush();
      heading = match[1];
      content = [];
    } else if (heading) {
      content.push(line);
    }
  }
  flush();
  return result;
}

function combineSystemDesign() {
  const questions = sections(read("03-product-system-design.md"));
  const answers = sections(read("08-system-design-answer-blueprints.md"));
  const lines = [
    "# Product System Design Questions with Answers",
    "",
    "Use each answer as an interview blueprint: clarify requirements, estimate scale, present the architecture, and defend trade-offs.",
    ""
  ];
  for (const [number, question] of questions) {
    const answer = answers.get(number);
    if (!answer) throw new Error(`Missing system-design answer: ${question.heading}`);
    lines.push(`## ${question.heading}`, "", "**Question:**", "", question.content, "", "**Model answer:**", "", answer.content, "");
  }
  fs.writeFileSync(path.join(root, "12-system-design-questions-with-answers.md"), `${lines.join("\n").trim()}\n`);
}

function combineBehavioral() {
  const lines = [
    "# Behavioral Questions with Answer Guidance",
    "",
    "Behavioral answers must come from your real experience. The questions are followed by the STAR framework, CV story mapping, and safe answer templates.",
    "",
    read("04-behavioral-and-ohai-values.md").replace(/^# .*\n/, "").trim(),
    "",
    "---",
    "",
    read("09-behavioral-answer-workbook.md").replace(/^# .*\n/, "").trim(),
    ""
  ];
  fs.writeFileSync(path.join(root, "13-behavioral-questions-with-answer-guidance.md"), lines.join("\n"));
}

combineNumbered(
  "01-complete-question-bank.md",
  "06-complete-answer-guide.md",
  "Complete Technical Questions with Answers",
  "10-complete-technical-questions-with-answers.md"
);
combineNumbered(
  "02-coding-and-scripting.md",
  "07-coding-and-scripting-answer-key.md",
  "Coding and Scripting Questions with Answers",
  "11-coding-and-scripting-questions-with-answers.md"
);
combineSystemDesign();
combineBehavioral();

console.log("Generated combined Oracle OHAI Q&A documents.");
