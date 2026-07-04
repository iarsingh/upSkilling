const { ollamaHost, ollamaModel } = require("./config");

async function askOllama(prompt, { temperature = 0.3, numPredict = 300, format } = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  let response;
  try {
    response = await fetch(`${ollamaHost}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: ollamaModel,
        prompt,
        stream: false,
        ...(format ? { format } : {}),
        options: { temperature, num_predict: numPredict }
      })
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`Ollama request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.response.trim();
}

// Answers a free-text screening question (e.g. "Why do you want to join us?")
// using the candidate profile as grounding context. Kept short since most
// application forms cap these fields at a few hundred characters.
async function answerScreeningQuestion(question, profile, jobContext = "") {
  const prompt = [
    "You are filling out a job application form as the candidate described below.",
    "Answer the question in the candidate's voice, first person, factual, concise (2-4 sentences, under 500 characters).",
    "Do not invent facts not implied by the profile. Do not add disclaimers or meta-commentary - output only the answer text.",
    "",
    `Candidate profile: ${profile.summary}`,
    `Years of experience: ${profile.yearsExperience}`,
    `Key skills: ${profile.preferredKeywords.join(", ")}`,
    jobContext ? `Job context: ${jobContext}` : "",
    "",
    `Question: ${question}`,
    "Answer:"
  ].filter(Boolean).join("\n");

  return askOllama(prompt, { temperature: 0.4, numPredict: 220 });
}

// Scores a job description against the candidate's target keywords to decide
// apply/skip, and picks which resume variant to use.
async function scoreJob(jobText, profile) {
  const prompt = [
    "You are screening a job posting for a candidate. Return valid JSON only, no prose.",
    `Candidate: ${profile.yearsExperience} years experience. Current CTC ${profile.currentCtcLpa} LPA. Expected CTC ${profile.expectedCtcLpa} LPA. Notice period ${profile.noticePeriodDays} days.`,
    `Target roles: ${profile.targetRoles.join(", ")}.`,
    `Strong keywords: ${profile.preferredKeywords.join(", ")}.`,
    `Resume options: ${Object.keys(profile.resumes).join(", ")}.`,
    "Fields: decision (apply|skip), score (0-100), resume, matched_keywords (array), reason.",
    "",
    `Job text:\n${jobText}`
  ].join("\n");

  try {
    const raw = await askOllama(prompt, { temperature: 0.1, numPredict: 400, format: "json" });
    return JSON.parse(raw);
  } catch {
    return fallbackScoreJob(jobText, profile);
  }
}

function fallbackScoreJob(jobText, profile) {
  const lower = jobText.toLowerCase();
  const matched = profile.preferredKeywords.filter((k) => lower.includes(k.toLowerCase()));
  const matchedRoles = profile.targetRoles.filter((role) => lower.includes(role.toLowerCase()));
  const score = Math.min(100, matched.length * 8 + matchedRoles.length * 20);
  const mlopsSignals = ["mlops", "ml platform", "machine learning", "mlflow", "kubeflow", "vertex ai"].filter((k) => lower.includes(k));
  const resume = mlopsSignals.length > 0 ? "mlops" : "platform_engineer";
  const shouldApply = matched.length >= profile.minKeywordMatchesToApply || matchedRoles.length > 0;
  return {
    decision: shouldApply ? "apply" : "skip",
    score,
    resume,
    matched_keywords: [...new Set([...matched, ...matchedRoles])],
    reason: shouldApply
      ? "Keyword fallback: enough target keywords or target role matched."
      : "Keyword fallback: not enough target keywords or target role matches."
  };
}

module.exports = { askOllama, answerScreeningQuestion, scoreJob, fallbackScoreJob };
