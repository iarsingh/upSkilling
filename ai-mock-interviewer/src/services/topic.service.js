const GENERIC_WORDS = new Set(["about", "advanced", "and", "developer", "engineer", "engineering", "focus", "for", "interview", "mock", "role", "senior", "specialist", "the", "with"]);

function normalizeTopics(input) {
  const values = Array.isArray(input) ? input : [];
  const seen = new Set();
  return values.map((entry) => typeof entry === "string" ? { name: entry, weight: 1 } : entry)
    .map((entry) => ({ name: String(entry?.name || "").trim().replace(/\s+/g, " "), weight: Math.max(1, Number(entry?.weight || 1)) }))
    .filter((entry) => entry.name.length >= 2 && entry.name.length <= 120)
    .filter((entry) => {
      const key = entry.name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function topicTokens(topic) {
  return [...new Set((String(topic).toLowerCase().match(/[a-z0-9+#.-]{3,}/g) || [])
    .filter((word) => !GENERIC_WORDS.has(word)))];
}

function relevanceScore(text, topic) {
  const normalized = String(text).toLowerCase();
  const tokens = topicTokens(topic);
  if (!tokens.length) return 0;
  const matches = tokens.filter((token) => normalized.includes(token)).length;
  const required = tokens.length > 1 ? 2 : 1;
  return matches >= required ? matches / tokens.length : 0;
}

function isQuestionRelevant(question, allowedTopics) {
  return allowedTopics.some((topic) => relevanceScore(question, topic) > 0);
}

function chooseNextTopic(topics) {
  return [...topics].sort((left, right) =>
    (left.questionsAsked / left.weight) - (right.questionsAsked / right.weight)
      || left.name.localeCompare(right.name)
  )[0]?.name;
}

module.exports = { normalizeTopics, relevanceScore, isQuestionRelevant, chooseNextTopic };
