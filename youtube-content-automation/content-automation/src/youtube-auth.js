const http = require("http");
const { URL, URLSearchParams } = require("url");
const {
  youtubeClientId,
  youtubeClientSecret,
  youtubeRedirectUri
} = require("./config");
const { updateEnv } = require("./env-file");

const scope = "https://www.googleapis.com/auth/youtube.upload";
const state = Math.random().toString(36).slice(2);

function authUrl() {
  const params = new URLSearchParams({
    client_id: youtubeClientId,
    redirect_uri: youtubeRedirectUri,
    response_type: "code",
    scope,
    access_type: "offline",
    prompt: "consent",
    state
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

async function exchangeCode(code) {
  const body = new URLSearchParams({
    code,
    client_id: youtubeClientId,
    client_secret: youtubeClientSecret,
    redirect_uri: youtubeRedirectUri,
    grant_type: "authorization_code"
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });

  if (!response.ok) {
    throw new Error(`YouTube token exchange failed: ${response.status} ${await response.text()}`);
  }

  const token = await response.json();
  updateEnv({
    YOUTUBE_ACCESS_TOKEN: token.access_token,
    YOUTUBE_REFRESH_TOKEN: token.refresh_token
  });

  return token;
}

function main() {
  if (!youtubeClientId || !youtubeClientSecret) {
    console.error("Missing YOUTUBE_CLIENT_ID or YOUTUBE_CLIENT_SECRET in .env");
    process.exitCode = 1;
    return;
  }

  const redirect = new URL(youtubeRedirectUri);
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, youtubeRedirectUri);
    if (url.pathname !== redirect.pathname) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    if (url.searchParams.get("state") !== state) {
      res.writeHead(400);
      res.end("Invalid OAuth state.");
      return;
    }

    const code = url.searchParams.get("code");
    if (!code) {
      res.writeHead(400);
      res.end(`Missing code: ${url.searchParams.get("error_description") || "Unknown error"}`);
      return;
    }

    try {
      const token = await exchangeCode(code);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>YouTube connected</h1><p>You can close this tab and return to the terminal.</p>");
      console.log("YouTube token saved to .env");
      console.log(`Access token expires in ${token.expires_in} seconds.`);
      if (!token.refresh_token) {
        console.log("Google did not return a refresh token. Revoke app access and rerun if uploads fail after the access token expires.");
      }
      server.close();
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(error.message);
      console.error(error.message);
      server.close();
      process.exitCode = 1;
    }
  });

  const port = Number(redirect.port || 80);
  server.listen(port, "127.0.0.1", () => {
    console.log("Open this URL in your browser:");
    console.log(authUrl());
    console.log("");
    console.log(`Requested scope: ${scope}`);
    console.log(`Waiting for YouTube callback at ${youtubeRedirectUri}`);
  });
}

main();
