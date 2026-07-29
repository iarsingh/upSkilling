/*
 * Small, read-only companion to app.js for the topbar summary card on
 * session.html (Rounds / Questions answered / Score or Progress).
 * It never writes to the shared "aiMockInterviewerState" localStorage key -
 * it only reads it - so it can't step on app.js's own state management.
 */
(function () {
  const STORAGE_KEY = "aiMockInterviewerState";

  let totalBankCount = null;
  let totalRoundsCount = null;

  function readState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function allTimeAnswered(state) {
    const interviews = Array.isArray(state.interviews) ? state.interviews : [];
    return interviews.reduce((sum, item) => sum + (Array.isArray(item.answers) ? item.answers.length : 0), 0);
  }

  // Rounds completed = distinct fixed mock-interview-set titles that show up
  // in progressHistory (each record.practice is set from the set's title at
  // the time an interview was ended - see archiveCurrentInterview in app.js).
  function roundsCompleted(state) {
    const history = Array.isArray(state.progressHistory) ? state.progressHistory : [];
    const rounds = new Set();
    history.forEach((record) => {
      if (/^Mock Interview \d+/.test(String(record.practice || ""))) rounds.add(record.practice);
    });
    return rounds.size;
  }

  // The final-feedback "results card" renders a score ring whose visible
  // text starts with "NN%" before anything else. Parsing that back out of
  // the saved plain-text report lets us show a genuine average score
  // without duplicating app.js's feedback-rendering logic.
  function averageScore(state) {
    const history = Array.isArray(state.progressHistory) ? state.progressHistory : [];
    const scores = [];
    history.forEach((record) => {
      const match = String(record.feedbackText || "").trim().match(/^(\d{1,3})%/);
      if (match) {
        const value = Number(match[1]);
        if (Number.isFinite(value)) scores.push(Math.max(0, Math.min(100, value)));
      }
    });
    if (!scores.length) return null;
    return Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length);
  }

  function render() {
    const state = readState();
    const roundsEl = document.querySelector("#topbarRounds");
    const answeredEl = document.querySelector("#topbarAnswered");
    const scoreEl = document.querySelector("#topbarScore");
    const scoreLabelEl = document.querySelector("#topbarScoreLabel");

    if (roundsEl) {
      const completed = roundsCompleted(state);
      roundsEl.textContent = totalRoundsCount ? `${completed}/${totalRoundsCount}` : String(completed);
    }

    if (answeredEl) {
      const answered = allTimeAnswered(state);
      answeredEl.textContent = totalBankCount ? `${answered}/${totalBankCount}` : String(answered);
    }

    if (scoreEl) {
      const avg = averageScore(state);
      if (avg !== null) {
        scoreEl.textContent = `${avg}%`;
        if (scoreLabelEl) scoreLabelEl.textContent = "Avg. score";
      } else {
        const progressBar = document.querySelector("#sessionProgress");
        const width = progressBar ? parseInt(progressBar.style.width || "0", 10) || 0 : 0;
        scoreEl.textContent = `${width}%`;
        if (scoreLabelEl) scoreLabelEl.textContent = "Progress";
      }
    }
  }

  async function loadTotals() {
    try {
      const response = await fetch("/mock-interview-sets.json");
      const sets = await response.json();
      totalRoundsCount = Array.isArray(sets) ? sets.length : null;
    } catch {
      totalRoundsCount = null;
    }
    try {
      const response = await fetch("/qa-dataset.json");
      const data = await response.json();
      totalBankCount = Array.isArray(data) ? data.length : null;
    } catch {
      totalBankCount = null;
    }
    render();
  }

  render();
  loadTotals();
  setInterval(render, 2000);
  window.addEventListener("storage", render);
  window.addEventListener("focus", render);
})();
