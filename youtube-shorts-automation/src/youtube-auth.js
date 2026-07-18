const crypto = require("crypto");
const http = require("http");
const { URL, URLSearchParams } = require("url");
const {
  youtubeClientId,
  youtubeClientSecret,
  youtubeRedirectUri
} = require("./config");
const { updateEnv } = require("./env-file");

const scope = "https://www.googleapis.com/auth/youtube.upload";
const state = crypto.randomBytes(24).toString("hex");

function authorizationUrl() {
  const parameters = new URLSearchParams({
    client_id: youtubeClientId,
    redirect_uri: youtubeRedirectUri,
    response_type: "code",
    scope,
    access_type: "offline",
    include_granted_scopes: "true",
    prompt: "consent",
    state
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${parameters}`;
}

async function exchangeCode(code) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: youtubeClientId,
      client_secret: youtubeClientSecret,
      redirect_uri: youtubeRedirectUri,
      grant_type: "authorization_code"
    })
  });
  const token = await response.json();
  if (!response.ok || token.error) {
    throw new Error(token.error_description || token.error || `Token exchange failed (${response.status})`);
  }
  updateEnv({
    YOUTUBE_ACCESS_TOKEN: token.access_token,
    YOUTUBE_REFRESH_TOKEN: token.refresh_token
  });
  return token;
}

function main() {
  if (!youtubeClientId || !youtubeClientSecret) {
    throw new Error("Missing YOUTUBE_CLIENT_ID or YOUTUBE_CLIENT_SECRET in .env");
  }

  const redirect = new URL(youtubeRedirectUri);
  const server = http.createServer(async (request, response) => {
    const requestUrl = new URL(request.url, youtubeRedirectUri);
    if (requestUrl.pathname !== redirect.pathname) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    if (requestUrl.searchParams.get("state") !== state) {
      response.writeHead(400);
      response.end("Invalid OAuth state");
      return;
    }
    if (!requestUrl.searchParams.get("code")) {
      response.writeHead(400);
      response.end(requestUrl.searchParams.get("error_description") || "Authorization was not completed");
      return;
    }

    try {
      const token = await exchangeCode(requestUrl.searchParams.get("code"));
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("<h1>YouTube connected</h1><p>You can close this tab and return to Codex.</p>");
      console.log("YouTube OAuth connected. Tokens were saved securely to .env.");
      console.log(`Access token lifetime: ${token.expires_in || "unknown"} seconds.`);
      if (!token.refresh_token) {
        console.log("Warning: Google did not return a refresh token. Revoke app access and authorize again.");
      }
    } catch (error) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end(error.message);
      console.error(error.message);
      process.exitCode = 1;
    } finally {
      server.close();
    }
  });

  const port = Number(redirect.port || 80);
  server.listen(port, "127.0.0.1", () => {
    console.log("Open this URL in your browser and authorize the YouTube channel:");
    console.log(authorizationUrl());
    console.log(`Waiting for callback at ${youtubeRedirectUri}`);
  });
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
