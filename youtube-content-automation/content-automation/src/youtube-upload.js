const fs = require("fs");
const path = require("path");
const { URLSearchParams } = require("url");
const {
  videosDir,
  youtubeClientId,
  youtubeClientSecret,
  youtubeAccessToken,
  youtubeRefreshToken,
  youtubePrivacyStatus
} = require("./config");
const { updateEnv } = require("./env-file");

function argValue(name, fallback = "") {
  const direct = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (direct) return direct.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index !== -1 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

function latestVideoDir() {
  if (!fs.existsSync(videosDir)) return "";
  const dirs = fs.readdirSync(videosDir)
    .map((entry) => path.join(videosDir, entry))
    .filter((entry) => fs.existsSync(path.join(entry, "video.mp4")))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return dirs[0] || "";
}

async function refreshAccessToken() {
  if (!youtubeClientId || !youtubeClientSecret || !youtubeRefreshToken) {
    throw new Error("Missing YouTube OAuth config. Run npm run youtube:auth first.");
  }

  const body = new URLSearchParams({
    client_id: youtubeClientId,
    client_secret: youtubeClientSecret,
    refresh_token: youtubeRefreshToken,
    grant_type: "refresh_token"
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });

  if (!response.ok) {
    throw new Error(`YouTube token refresh failed: ${response.status} ${await response.text()}`);
  }

  const token = await response.json();
  updateEnv({ YOUTUBE_ACCESS_TOKEN: token.access_token });
  return token.access_token;
}

async function startUpload(accessToken, metadata, videoPath, privacyStatus) {
  const size = fs.statSync(videoPath).size;
  const response = await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
      "X-Upload-Content-Length": String(size),
      "X-Upload-Content-Type": "video/mp4"
    },
    body: JSON.stringify({
      snippet: {
        title: metadata.title,
        description: metadata.description,
        tags: metadata.tags,
        categoryId: "27"
      },
      status: {
        privacyStatus,
        selfDeclaredMadeForKids: false
      }
    })
  });

  if (response.status === 401 && youtubeRefreshToken) {
    return startUpload(await refreshAccessToken(), metadata, videoPath, privacyStatus);
  }

  if (!response.ok) {
    throw new Error(`YouTube upload session failed: ${response.status} ${await response.text()}`);
  }

  const uploadUrl = response.headers.get("location");
  if (!uploadUrl) throw new Error("YouTube did not return an upload URL.");
  return { uploadUrl, accessToken };
}

async function uploadBytes(uploadUrl, accessToken, videoPath) {
  const bytes = fs.readFileSync(videoPath);
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "video/mp4",
      "Content-Length": String(bytes.length)
    },
    body: bytes
  });

  if (!response.ok) {
    throw new Error(`YouTube upload failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

async function main() {
  const videoDir = path.resolve(argValue("--dir", latestVideoDir()));
  const privacyStatus = argValue("--privacy", youtubePrivacyStatus);

  if (!videoDir || !fs.existsSync(videoDir)) {
    throw new Error("No video package found. Run npm run youtube:video first, or pass --dir path/to/video-package.");
  }

  if (!["private", "unlisted", "public"].includes(privacyStatus)) {
    throw new Error("--privacy must be private, unlisted, or public.");
  }

  const videoPath = path.join(videoDir, "video.mp4");
  const metadataPath = path.join(videoDir, "metadata.json");
  if (!fs.existsSync(videoPath)) throw new Error(`Missing ${videoPath}`);
  if (!fs.existsSync(metadataPath)) throw new Error(`Missing ${metadataPath}`);

  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
  const accessToken = youtubeAccessToken || await refreshAccessToken();
  const session = await startUpload(accessToken, metadata, videoPath, privacyStatus);
  const result = await uploadBytes(session.uploadUrl, session.accessToken, videoPath);
  const resultPath = path.join(videoDir, "youtube-upload-result.json");
  fs.writeFileSync(resultPath, JSON.stringify(result, null, 2), "utf8");

  console.log(`Uploaded to YouTube as ${privacyStatus}: https://youtu.be/${result.id}`);
  console.log(`Upload result saved: ${resultPath}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
