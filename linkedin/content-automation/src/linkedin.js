const fs = require("fs");
const path = require("path");
const { linkedinAccessToken, linkedinAuthorUrn } = require("./config");

const API_VERSION = "202605";

function assertLinkedInConfig() {
  if (!linkedinAccessToken || !linkedinAuthorUrn) {
    throw new Error("Missing LINKEDIN_ACCESS_TOKEN or LINKEDIN_AUTHOR_URN in .env");
  }
}

function headers(extra = {}) {
  return {
    Authorization: `Bearer ${linkedinAccessToken}`,
    "LinkedIn-Version": API_VERSION,
    "X-Restli-Protocol-Version": "2.0.0",
    ...extra
  };
}

async function uploadImage(imagePath) {
  assertLinkedInConfig();

  const initResponse = await fetch("https://api.linkedin.com/rest/images?action=initializeUpload", {
    method: "POST",
    headers: headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      initializeUploadRequest: {
        owner: linkedinAuthorUrn
      }
    })
  });

  if (!initResponse.ok) {
    throw new Error(`LinkedIn image initialize failed: ${initResponse.status} ${await initResponse.text()}`);
  }

  const initData = await initResponse.json();
  const uploadUrl = initData.value.uploadUrl;
  const imageUrn = initData.value.image;
  const imageBytes = fs.readFileSync(imagePath);
  const ext = path.extname(imagePath).toLowerCase();
  const contentType = ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";

  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${linkedinAccessToken}`,
      "Content-Type": contentType
    },
    body: imageBytes
  });

  if (!uploadResponse.ok) {
    throw new Error(`LinkedIn image upload failed: ${uploadResponse.status} ${await uploadResponse.text()}`);
  }

  return imageUrn;
}

async function publishPost(text, imagePath) {
  assertLinkedInConfig();
  const imageUrn = imagePath ? await uploadImage(imagePath) : "";
  const content = imageUrn
    ? { media: { title: "Daily engineering note", id: imageUrn } }
    : {};

  const response = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      author: linkedinAuthorUrn,
      commentary: text,
      visibility: "PUBLIC",
      distribution: {
        feedDistribution: "MAIN_FEED",
        targetEntities: [],
        thirdPartyDistributionChannels: []
      },
      lifecycleState: "PUBLISHED",
      isReshareDisabledByAuthor: false,
      content
    })
  });

  if (!response.ok) {
    throw new Error(`LinkedIn publish failed: ${response.status} ${await response.text()}`);
  }

  return response.headers.get("x-restli-id") || "published";
}

module.exports = { publishPost };
