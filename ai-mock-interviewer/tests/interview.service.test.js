const assert = require("node:assert/strict");
const test = require("node:test");
const { createDatabase } = require("../src/database/sqlite");
const { InterviewRepository } = require("../src/repositories/interview.repository");
const { InterviewService } = require("../src/services/interview.service");

function createService() {
  const repository = new InterviewRepository(createDatabase({ filename: ":memory:" }));
  const gateway = {
    async generateQuestion(input) {
      return { question: `Explain a production scenario for ${input.topic}.`, topic: input.topic, source: "test" };
    }
  };
  return new InterviewService(repository, gateway);
}

test("persists an interview and restores its configuration", () => {
  const service = createService();
  const created = service.create({ role: "Platform Engineer", topics: ["Kubernetes", "Terraform"] }, "user-1");
  const restored = service.get(created.id, "user-1");
  assert.equal(restored.status, "READY");
  assert.deepEqual(restored.topics.map((topic) => topic.name), ["Kubernetes", "Terraform"]);
});

test("rotates equally weighted topics", async () => {
  const service = createService();
  const interview = service.create({ role: "Platform Engineer", topics: ["Kubernetes", "Terraform"] });
  const first = await service.nextQuestion(interview.id);
  const second = await service.nextQuestion(interview.id);
  assert.notEqual(first.topic, second.topic);
  assert.deepEqual(new Set([first.topic, second.topic]), new Set(["Kubernetes", "Terraform"]));
  assert.match(first.question, new RegExp(first.topic, "i"));
  assert.match(second.question, new RegExp(second.topic, "i"));
});

test("saves answers and completion state", async () => {
  const service = createService();
  const interview = service.create({ role: "SRE", topics: ["SRE"] });
  const question = await service.nextQuestion(interview.id);
  service.submitAnswer(interview.id, { questionId: question.id, answer: "I would begin with SLO impact and recent changes." });
  service.complete(interview.id);
  const restored = service.get(interview.id);
  assert.equal(restored.status, "COMPLETED");
  assert.equal(restored.answers.length, 1);
  assert.equal(service.report(interview.id).completionPercent, 100);
});

test("rejects answers for questions outside the interview", () => {
  const service = createService();
  const interview = service.create({ role: "SRE", topics: ["SRE"] });
  assert.throws(() => service.submitAnswer(interview.id, { questionId: "missing", answer: "answer" }), /does not belong/);
});

test("prevents one user from reading or changing another user's interview", async () => {
  const service = createService();
  const interview = service.create({ role: "SRE", topics: ["SRE"] }, "user-1");
  assert.throws(() => service.get(interview.id, "user-2"), /does not exist/);
  assert.throws(() => service.start(interview.id, "user-2"), /does not exist/);
  await assert.rejects(() => service.nextQuestion(interview.id, "user-2"), /does not exist/);
  assert.throws(() => service.complete(interview.id, "user-2"), /does not exist/);
});
