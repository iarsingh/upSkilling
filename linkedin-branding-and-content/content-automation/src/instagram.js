const {
  instagramAccessToken,
  instagramAccountId,
  instagramApiVersion
} = require("./config");

const POLL_INTERVAL_MS = Number(process.env.INSTAGRAM_POLL_INTERVAL_MS || 10000);
const POLL_TIMEOUT_MS = Number(process.env.INSTAGRAM_POLL_TIMEOUT_MS || 300000);

function apiUrl(resource) {
  const version = instagramApiVersion.replace(/^\/+|\/+$/g, "");
  const prefix = version ? `/${version}` : "";
  return new URL(`https://graph.instagram.com${prefix}/${resource.replace(/^\/+/, "")}`);
}

function assertInstagramConfig() {
  if (!instagramAccessToken || !instagramAccountId) {
    throw new Error("Missing INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_ACCOUNT_ID in .env");
  }
}

async function graphRequest(resource, { method = "GET", params = {} } = {}) {
  assertInstagramConfig();
  const url = apiUrl(resource);
  const values = new URLSearchParams({
    ...Object.fromEntries(Object.entries(params).map(([key, value]) => [key, String(value)])),
    access_token: instagramAccessToken
  });
  const options = { method };

  if (method === "GET") {
    url.search = values.toString();
  } else {
    options.headers = { "Content-Type": "application/x-www-form-urlencoded" };
    options.body = values;
  }

  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.error) {
    const detail = data.error?.error_user_msg || data.error?.message || JSON.stringify(data);
    throw new Error(`Instagram API ${method} ${url.pathname} failed (${response.status}): ${detail}`);
  }
  return data;
}

async function verifyAccount() {
  const data = await graphRequest("me", { params: { fields: "user_id,username" } });
  const returnedId = String(data.user_id || data.id || "");
  if (returnedId && returnedId !== String(instagramAccountId)) {
    throw new Error(`INSTAGRAM_ACCOUNT_ID does not match the token account (${data.username || "unknown"})`);
  }
  return data;
}

async function createReelContainer(videoUrl, caption, shareToFeed = true) {
  const data = await graphRequest(`${instagramAccountId}/media`, {
    method: "POST",
    params: {
      media_type: "REELS",
      video_url: videoUrl,
      caption,
      share_to_feed: shareToFeed
    }
  });
  if (!data.id) throw new Error("Instagram did not return a Reel container ID");
  return data.id;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitUntilReady(containerId) {
  const deadline = Date.now() + POLL_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const status = await graphRequest(containerId, {
      params: { fields: "status_code,status" }
    });
    const code = String(status.status_code || "").toUpperCase();
    if (code === "FINISHED" || code === "PUBLISHED") return status;
    if (code === "ERROR" || code === "EXPIRED") {
      throw new Error(`Instagram Reel processing failed: ${status.status || code}`);
    }
    await wait(POLL_INTERVAL_MS);
  }
  throw new Error(`Instagram Reel processing timed out after ${POLL_TIMEOUT_MS / 1000} seconds`);
}

async function publishContainer(containerId) {
  const data = await graphRequest(`${instagramAccountId}/media_publish`, {
    method: "POST",
    params: { creation_id: containerId }
  });
  if (!data.id) throw new Error("Instagram did not return a published media ID");
  return data.id;
}

async function publishReel({ videoUrl, caption, shareToFeed = true }) {
  await verifyAccount();
  const containerId = await createReelContainer(videoUrl, caption, shareToFeed);
  await waitUntilReady(containerId);
  const mediaId = await publishContainer(containerId);
  return { containerId, mediaId };
}

module.exports = {
  createReelContainer,
  publishContainer,
  publishReel,
  verifyAccount,
  waitUntilReady
};
