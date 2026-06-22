const { ollamaHost, ollamaModel, ollamaTimeoutMs } = require("./config");

async function generateWithOllama(topic) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ollamaTimeoutMs);
  const prompt = [
    "You are writing a professional LinkedIn post for an ML Platform and DevOps engineer.",
    "Write practical, clear content with a helpful tone.",
    "Avoid emojis. Avoid hype. Use short paragraphs and bullet points.",
    "Return valid JSON only with these fields: hook, body, bullets, cta, hashtags, imageTitle, imageSubtitle.",
    "",
    `Series: ${topic.pillar}`,
    `Audience: ${topic.audience}`,
    `Topic: ${topic.topic}`,
    `Required hashtags: ${topic.hashtags.join(" ")}`
  ].join("\n");

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
        format: "json",
        options: {
          temperature: 0.72,
          num_predict: 700
        }
      })
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`Ollama request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return JSON.parse(data.response);
}

module.exports = { generateWithOllama };
