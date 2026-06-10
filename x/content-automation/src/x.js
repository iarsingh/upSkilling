const { xAccessToken } = require("./config");

const tweetUrl = "https://api.x.com/2/tweets";

async function createTweet(text, replyToId) {
  if (!xAccessToken) {
    throw new Error("Missing X_ACCESS_TOKEN. Run npm run x:auth after configuring .env.");
  }

  const body = { text };
  if (replyToId) body.reply = { in_reply_to_tweet_id: replyToId };

  const response = await fetch(tweetUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${xAccessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = payload.detail || payload.title || JSON.stringify(payload);
    throw new Error(`X API failed (${response.status}): ${detail}`);
  }

  if (!payload.data || !payload.data.id) {
    throw new Error(`X API response did not include a tweet id: ${JSON.stringify(payload)}`);
  }

  return payload.data.id;
}

async function publishThread(parts) {
  const ids = [];
  let replyToId;
  for (const part of parts) {
    const id = await createTweet(part, replyToId);
    ids.push(id);
    replyToId = id;
  }
  return ids;
}

module.exports = { createTweet, publishThread };
