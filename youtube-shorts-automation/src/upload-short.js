const fs = require("fs");
const path = require("path");
const {
  root,
  youtubeClientId,
  youtubeClientSecret,
  youtubeRefreshToken,
  youtubePrivacyStatus
} = require("./config");

const contentDirectory = path.join(root, "content");
const statePath = path.join(root, "upload-state.json");
const dryRun = process.argv.includes("--dry-run") || process.env.DRY_RUN === "true";
const requestedFilename = process.env.REQUESTED_FILENAME || "";

function readState() {
  if (!fs.existsSync(statePath)) return { uploaded: {} };
  const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  if (!state.uploaded || typeof state.uploaded !== "object") state.uploaded = {};
  return state;
}

function chooseVideo(state) {
  const videos = fs.readdirSync(contentDirectory)
    .filter((name) => /\.(mp4|mov|m4v)$/i.test(name))
    .sort();
  if (requestedFilename) {
    if (!videos.includes(requestedFilename)) throw new Error(`Video not found: ${requestedFilename}`);
    if (state.uploaded[requestedFilename]) throw new Error(`Video was already uploaded: ${requestedFilename}`);
    return requestedFilename;
  }
  return videos.find((name) => !state.uploaded[name]);
}

function titleFromFilename(filename) {
  return path.basename(filename, path.extname(filename))
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase())
    .slice(0, 100);
}

async function getAccessToken() {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: youtubeClientId,
      client_secret: youtubeClientSecret,
      refresh_token: youtubeRefreshToken,
      grant_type: "refresh_token"
    })
  });
  const result = await response.json();
  if (!response.ok || !result.access_token) {
    throw new Error(result.error_description || result.error || `Token refresh failed (${response.status})`);
  }
  return result.access_token;
}

async function upload(videoPath, filename, accessToken) {
  const metadata = {
    snippet: {
      title: titleFromFilename(filename),
      description: "#Shorts",
      categoryId: "27"
    },
    status: {
      privacyStatus: youtubePrivacyStatus,
      selfDeclaredMadeForKids: false
    }
  };
  const initiate = await fetch(
    "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
        "X-Upload-Content-Type": "video/mp4",
        "X-Upload-Content-Length": String(fs.statSync(videoPath).size)
      },
      body: JSON.stringify(metadata)
    }
  );
  if (!initiate.ok) throw new Error(`Upload initialization failed: ${await initiate.text()}`);
  const uploadUrl = initiate.headers.get("location");
  if (!uploadUrl) throw new Error("YouTube did not return a resumable upload URL");

  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": "video/mp4" },
    body: fs.readFileSync(videoPath)
  });
  const result = await response.json();
  if (!response.ok || !result.id) throw new Error(`Video upload failed: ${JSON.stringify(result)}`);
  return result;
}

async function main() {
  const state = readState();
  const filename = chooseVideo(state);
  if (!filename) {
    console.log("No unpublished videos found.");
    return;
  }
  const videoPath = path.join(contentDirectory, filename);
  console.log(`Next video: ${filename}`);
  console.log(`Title: ${titleFromFilename(filename)}`);
  console.log(`Privacy: ${youtubePrivacyStatus}`);
  if (dryRun) {
    console.log("Dry run complete; nothing was uploaded.");
    return;
  }
  if (!youtubeClientId || !youtubeClientSecret || !youtubeRefreshToken) {
    throw new Error("Missing YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, or YOUTUBE_REFRESH_TOKEN");
  }
  const accessToken = await getAccessToken();
  const result = await upload(videoPath, filename, accessToken);
  state.uploaded[filename] = {
    videoId: result.id,
    uploadedAt: new Date().toISOString(),
    privacyStatus: youtubePrivacyStatus
  };
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`);
  fs.unlinkSync(videoPath);
  console.log(`Uploaded successfully: https://youtu.be/${result.id}`);
  console.log(`Removed uploaded Short from queue: ${filename}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
