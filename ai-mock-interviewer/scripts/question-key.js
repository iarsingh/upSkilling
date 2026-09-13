function normalizeQuestion(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/^[a-z0-9/ &+-]+:\s+/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

// Collapse harmless interview-prompt variations without merging detailed
// scenarios. For short definition/comparison prompts, token order is not
// meaningful ("GKE Standard and Autopilot" vs "Autopilot and Standard").
function canonicalQuestionKey(value) {
  const normalized = normalizeQuestion(value)
    .replace(/\bworked on\b/g, "worked with")
    .replace(/\brequest user\b/g, "user request")
    .replace(/\s+/g, " ")
    .trim();
  const isShort = normalized.split(" ").length <= 14;
  const isDefinitionOrComparison = /^(what (is|are)|explain|describe|define|difference between|what is the difference between)\b/.test(normalized);
  if (!isShort || !isDefinitionOrComparison) {
    return normalized
      .replace(/^(can you|could you|please)\s+/, "")
      .replace(/\b(a|an|the)\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  return normalized
    .replace(/^(what (is|are)|explain|describe|define|what is the difference between|difference between)\s+/, "")
    .split(" ")
    .filter((token) => !["a", "an", "the", "in", "on"].includes(token))
    .sort()
    .join(" ");
}

module.exports = { normalizeQuestion, canonicalQuestionKey };
