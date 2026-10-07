const fs = require("fs");
const path = require("path");
const { linkedinAccessToken, linkedinAuthorUrn, linkedinAttachImages } = require("./config");

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

async function uploadDocument(documentPath) {
  assertLinkedInConfig();

  const initResponse = await fetch("https://api.linkedin.com/rest/documents?action=initializeUpload", {
    method: "POST",
    headers: headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      initializeUploadRequest: {
        owner: linkedinAuthorUrn
      }
    })
  });

  if (!initResponse.ok) {
    throw new Error(`LinkedIn document initialize failed: ${initResponse.status} ${await initResponse.text()}`);
  }

  const initData = await initResponse.json();
  const uploadResponse = await fetch(initData.value.uploadUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${linkedinAccessToken}`,
      "Content-Type": "application/pdf"
    },
    body: fs.readFileSync(documentPath)
  });

  if (!uploadResponse.ok) {
    throw new Error(`LinkedIn document upload failed: ${uploadResponse.status} ${await uploadResponse.text()}`);
  }

  return initData.value.document;
}

async function publishPost(text, imagePath, { documentPath = "", documentTitle = "" } = {}) {
  assertLinkedInConfig();
  if (documentPath) {
    const documentUrn = await uploadDocument(documentPath);
    return createPost(text, { title: documentTitle || "Carousel", id: documentUrn });
  }
  const imageUrn = linkedinAttachImages && imagePath ? await uploadImage(imagePath) : "";
  return createPost(text, imageUrn ? { title: "Daily engineering note", id: imageUrn } : null);
}

async function createPost(text, media) {
  const body = {
    author: linkedinAuthorUrn,
    commentary: text,
    visibility: "PUBLIC",
    distribution: {
      feedDistribution: "MAIN_FEED",
      targetEntities: [],
      thirdPartyDistributionChannels: []
    },
    lifecycleState: "PUBLISHED",
    isReshareDisabledByAuthor: false
  };

  if (media) {
    body.content = { media };
  }

  const response = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`LinkedIn publish failed: ${response.status} ${await response.text()}`);
  }

  return response.headers.get("x-restli-id") || "published";
}

module.exports = { publishPost };
