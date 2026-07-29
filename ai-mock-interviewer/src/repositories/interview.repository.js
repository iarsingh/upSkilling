class InterviewRepository {
  constructor(database) {
    this.database = database;
  }

  create(interview) {
    const insert = this.database.prepare(`INSERT INTO interviews
      (id, user_id, mode, role, difficulty, status, duration_minutes, question_limit, configuration_json, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const insertTopic = this.database.prepare(`INSERT INTO interview_topics
      (interview_id, topic, weight, questions_asked) VALUES (?, ?, ?, 0)`);
    this.database.exec("BEGIN IMMEDIATE");
    try {
      insert.run(interview.id, interview.userId, interview.mode, interview.role, interview.difficulty,
        interview.status, interview.durationMinutes, interview.questionLimit,
        JSON.stringify(interview.configuration), interview.createdAt, interview.updatedAt);
      interview.topics.forEach((topic) => insertTopic.run(interview.id, topic.name, topic.weight));
      this.database.exec("COMMIT");
    } catch (error) {
      this.database.exec("ROLLBACK");
      throw error;
    }
    return this.getById(interview.id);
  }

  getById(id) {
    const row = this.database.prepare("SELECT * FROM interviews WHERE id = ?").get(id);
    if (!row) return null;
    const topics = this.database.prepare(
      "SELECT topic AS name, weight, questions_asked AS questionsAsked FROM interview_topics WHERE interview_id = ? ORDER BY rowid"
    ).all(id);
    const questions = this.database.prepare(
      "SELECT id, question_text AS question, topic, difficulty, sequence, source, created_at AS createdAt FROM interview_questions WHERE interview_id = ? ORDER BY sequence"
    ).all(id);
    const answers = this.database.prepare(
      "SELECT id, interview_question_id AS questionId, answer_type AS answerType, answer_text AS answer, submitted_at AS submittedAt FROM interview_answers WHERE interview_id = ? ORDER BY submitted_at"
    ).all(id);
    return {
      id: row.id, userId: row.user_id, mode: row.mode, role: row.role,
      difficulty: row.difficulty, status: row.status, durationMinutes: row.duration_minutes,
      questionLimit: row.question_limit, configuration: JSON.parse(row.configuration_json),
      topics, questions, answers, startedAt: row.started_at, completedAt: row.completed_at,
      createdAt: row.created_at, updatedAt: row.updated_at
    };
  }

  updateStatus(id, status, timestampField) {
    const now = new Date().toISOString();
    const field = timestampField === "completed_at" ? "completed_at" : "started_at";
    this.database.prepare(`UPDATE interviews SET status = ?, ${field} = COALESCE(${field}, ?), updated_at = ? WHERE id = ?`)
      .run(status, now, now, id);
    return this.getById(id);
  }

  addQuestion(interviewId, question) {
    this.database.exec("BEGIN IMMEDIATE");
    try {
      this.database.prepare(`INSERT INTO interview_questions
        (id, interview_id, question_text, topic, difficulty, sequence, source, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
        .run(question.id, interviewId, question.question, question.topic, question.difficulty,
          question.sequence, question.source, question.createdAt);
      this.database.prepare(`UPDATE interview_topics SET questions_asked = questions_asked + 1
        WHERE interview_id = ? AND topic = ?`).run(interviewId, question.topic);
      this.database.prepare("UPDATE interviews SET updated_at = ? WHERE id = ?")
        .run(question.createdAt, interviewId);
      this.database.exec("COMMIT");
    } catch (error) {
      this.database.exec("ROLLBACK");
      throw error;
    }
    return question;
  }

  saveAnswer(answer) {
    this.database.prepare(`INSERT INTO interview_answers
      (id, interview_id, interview_question_id, answer_type, answer_text, submitted_at)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(interview_id, interview_question_id) DO UPDATE SET
        answer_type = excluded.answer_type, answer_text = excluded.answer_text, submitted_at = excluded.submitted_at`)
      .run(answer.id, answer.interviewId, answer.questionId, answer.answerType, answer.answer, answer.submittedAt);
    return answer;
  }
}

module.exports = { InterviewRepository };
