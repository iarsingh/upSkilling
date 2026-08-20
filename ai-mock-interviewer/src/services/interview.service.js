const crypto = require("crypto");
const { normalizeTopics, chooseNextTopic } = require("./topic.service");

class InterviewService {
  constructor(repository, aiGateway) {
    this.repository = repository;
    this.aiGateway = aiGateway;
  }

  create(input, userId = null) {
    const topics = normalizeTopics(input.topics);
    if (!topics.length) throw Object.assign(new Error("Select at least one valid topic."), { statusCode: 400, code: "INVALID_TOPICS" });
    const now = new Date().toISOString();
    return this.repository.create({
      id: crypto.randomUUID(), userId, mode: String(input.mode || (topics.length > 1 ? "MULTI_TOPIC" : "CUSTOM_TOPIC")),
      role: String(input.role || "Technical interview").trim().slice(0, 160),
      difficulty: String(input.difficulty || "SENIOR").toUpperCase(), status: "READY",
      durationMinutes: Math.min(180, Math.max(5, Number(input.durationMinutes || 45))),
      questionLimit: Math.min(100, Math.max(1, Number(input.questionLimit || 15))),
      configuration: { adaptiveDifficulty: input.adaptiveDifficulty !== false, allowHints: input.allowHints !== false, voiceEnabled: input.voiceEnabled !== false },
      topics, createdAt: now, updatedAt: now
    });
  }

  get(id, userId = null) {
    const interview = this.repository.getById(id);
    if (!interview) throw Object.assign(new Error("Interview does not exist."), { statusCode: 404, code: "INTERVIEW_NOT_FOUND" });
    if (interview.userId && interview.userId !== userId) {
      throw Object.assign(new Error("Interview does not exist."), { statusCode: 404, code: "INTERVIEW_NOT_FOUND" });
    }
    return interview;
  }

  start(id, userId = null) {
    const interview = this.get(id, userId);
    if (interview.status === "COMPLETED") throw Object.assign(new Error("Interview is already completed."), { statusCode: 409, code: "INTERVIEW_COMPLETED" });
    return interview.status === "ACTIVE" ? interview : this.repository.updateStatus(id, "ACTIVE", "started_at");
  }

  async nextQuestion(id, userId = null) {
    let interview = this.get(id, userId);
    if (interview.status === "READY") interview = this.start(id, userId);
    if (interview.status !== "ACTIVE") throw Object.assign(new Error("Interview is not active."), { statusCode: 409, code: "INTERVIEW_NOT_ACTIVE" });
    if (interview.questions.length >= interview.questionLimit) throw Object.assign(new Error("Question limit reached."), { statusCode: 409, code: "QUESTION_LIMIT_REACHED" });
    const targetTopic = chooseNextTopic(interview.topics);
    const generated = await this.aiGateway.generateQuestion({
      role: interview.role, difficulty: interview.difficulty, topic: targetTopic,
      allowedTopics: [targetTopic], topicOnly: true,
      history: interview.questions.map((item) => `Question ${item.sequence}: ${item.question}`)
    });
    const question = {
      id: crypto.randomUUID(), question: generated.question, topic: generated.topic || targetTopic,
      difficulty: interview.difficulty, sequence: interview.questions.length + 1,
      source: generated.source, createdAt: new Date().toISOString()
    };
    return this.repository.addQuestion(id, question);
  }

  submitAnswer(id, input, userId = null) {
    const interview = this.get(id, userId);
    const question = interview.questions.find((item) => item.id === input.questionId);
    if (!question) throw Object.assign(new Error("Question does not belong to this interview."), { statusCode: 400, code: "INVALID_QUESTION" });
    const answer = String(input.answer || "").trim();
    if (!answer) throw Object.assign(new Error("Answer is required."), { statusCode: 400, code: "ANSWER_REQUIRED" });
    return this.repository.saveAnswer({ id: crypto.randomUUID(), interviewId: id, questionId: input.questionId,
      answerType: String(input.answerType || "TEXT").toUpperCase(), answer, submittedAt: new Date().toISOString() });
  }

  complete(id, userId = null) {
    this.get(id, userId);
    return this.repository.updateStatus(id, "COMPLETED", "completed_at");
  }

  report(id, userId = null) {
    const interview = this.get(id, userId);
    return { interviewId: id, status: interview.status, role: interview.role, topics: interview.topics,
      questionsAsked: interview.questions.length, answersSubmitted: interview.answers.length,
      completionPercent: interview.questions.length ? Math.round((interview.answers.length / interview.questions.length) * 100) : 0 };
  }
}

module.exports = { InterviewService };
