const { ollamaHost, ollamaModel, ollamaTimeoutMs } = require("./config");

async function generateWithOllama(topic) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ollamaTimeoutMs);
  const prompt = [
    "You are writing a professional LinkedIn post for an ML Platform and DevOps engineer.",
    "Write practical, in-depth content with a helpful tone: real production scenarios, concrete numbers or configs, and current industry context (tools, cloud services, or practices engineers are actually using in 2026).",
    "Avoid emojis. Avoid hype. Use short paragraphs and bullet points.",
    "The body must be substantial (roughly 120-200 words) and go beyond generic advice - name specific tools, failure modes, or metrics where relevant.",
    "Include a 'scenario' field: a short, realistic on-the-job situation (2-3 sentences) ending in a question, the kind an interviewer or a teammate might actually pose (e.g. an incident, a design trade-off, a debugging situation). It should invite readers to answer in the comments.",
    "Return valid JSON only with these fields: hook, body, scenario, bullets, cta, hashtags, imageTitle, imageSubtitle.",
    "For hashtags: include all required hashtags plus 2-3 additional hashtags that are currently relevant to this industry topic (specific tools, cloud platforms, or trends), for 5-7 total.",
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
