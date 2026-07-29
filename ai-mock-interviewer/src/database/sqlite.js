const fs = require("fs");
const path = require("path");
const BetterSqlite3 = require("better-sqlite3");

function createDatabase(options = {}) {
  const filename = options.filename || path.join(process.cwd(), "data", "interviews.sqlite");
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  const database = new BetterSqlite3(filename);
  database.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000;");
  database.exec(`
    CREATE TABLE IF NOT EXISTS interviews (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      mode TEXT NOT NULL,
      role TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      status TEXT NOT NULL,
      duration_minutes INTEGER NOT NULL,
      question_limit INTEGER NOT NULL,
      configuration_json TEXT NOT NULL,
      started_at TEXT,
      completed_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS interview_topics (
      interview_id TEXT NOT NULL,
      topic TEXT NOT NULL,
      weight INTEGER NOT NULL DEFAULT 1,
      questions_asked INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (interview_id, topic),
      FOREIGN KEY (interview_id) REFERENCES interviews(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS interview_questions (
      id TEXT PRIMARY KEY,
      interview_id TEXT NOT NULL,
      question_text TEXT NOT NULL,
      topic TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      sequence INTEGER NOT NULL,
      source TEXT NOT NULL,
      created_at TEXT NOT NULL,
      UNIQUE (interview_id, sequence),
      FOREIGN KEY (interview_id) REFERENCES interviews(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS interview_answers (
      id TEXT PRIMARY KEY,
      interview_id TEXT NOT NULL,
      interview_question_id TEXT NOT NULL,
      answer_type TEXT NOT NULL,
      answer_text TEXT NOT NULL,
      submitted_at TEXT NOT NULL,
      UNIQUE (interview_id, interview_question_id),
      FOREIGN KEY (interview_id) REFERENCES interviews(id) ON DELETE CASCADE,
      FOREIGN KEY (interview_question_id) REFERENCES interview_questions(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_interviews_user_created ON interviews(user_id, created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_questions_interview_sequence ON interview_questions(interview_id, sequence);
    CREATE INDEX IF NOT EXISTS idx_answers_interview ON interview_answers(interview_id);
  `);
  return database;
}

module.exports = { createDatabase };
