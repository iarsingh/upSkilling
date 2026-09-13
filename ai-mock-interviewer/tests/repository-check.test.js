const test = require("node:test");
const assert = require("node:assert/strict");
const { privatePath, validateDatasets } = require("../scripts/check-repository");

test("release hygiene rejects local data while allowing shareable examples", () => {
  for (const name of [".env", ".env.production", "data/applicant-profile.json", "data/users.json", "data/interviews.sqlite-wal", ".venv/bin/python", "scripts/__pycache__/file.pyc"]) assert.equal(privatePath(name), true, name);
  for (const name of [".env.example", "data/applicant-profile.example.json", "public/qa-dataset.json"]) assert.equal(privatePath(name), false, name);
});

test("release validation detects missing answers, duplicates, stale public data and missing mock coverage", () => {
  const entries = [{ question: "What is a Pod?", answer: "A Kubernetes workload unit." }];
  assert.deepEqual(validateDatasets(entries, entries, [{ id: "one", questions: [{ question: "Define Pod" }] }]), []);
  assert.ok(validateDatasets(entries, [], []).some(x => x.includes("differ")));
  const empty = [{ question: "A question", answer: " " }];
  assert.ok(validateDatasets(empty, empty, []).some(x => x.includes("Missing question or answer")));
  const duplicate = [...entries, { question: "Define Pod", answer: "Another answer" }];
  assert.ok(validateDatasets(duplicate, duplicate, []).some(x => x.includes("Duplicate canonical")));
  assert.ok(validateDatasets(entries, entries, [{ id: "one", questions: [{ question: "What is Terraform?" }] }]).some(x => x.includes("absent")));
});
