const http = require("http");
const { URLSearchParams } = require("url");
const fs = require("fs");
const path = require("path");
const { root } = require("./config");

const envPath = path.join(root, ".env");
const clientId = process.env.LINKEDIN_CLIENT_ID || "";
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET || "";
const redirectUri = process.env.LINKEDIN_REDIRECT_URI || "http://localhost:3000/callback";
const existingAuthorUrn = process.env.LINKEDIN_AUTHOR_URN || "";
const scopes = (process.env.LINKEDIN_SCOPES || "openid profile email w_member_social")
  .split(/\s+/)
  .filter(Boolean);
const state = Math.random().toString(36).slice(2);

function updateEnv(values) {
  const existing = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
  let next = existing;
  for (const [key, value] of Object.entries(values)) {
    const line = `${key}=${value}`;
    const pattern = new RegExp(`^${key}=.*$`, "m");
    next = pattern.test(next) ? next.replace(pattern, line) : `${next.trimEnd()}\n${line}\n`;
  }
  fs.writeFileSync(envPath, next, "utf8");
}

async function exchangeCode(code) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret
  });

  const tokenResponse = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });

  if (!tokenResponse.ok) {
    throw new Error(`Token exchange failed: ${tokenResponse.status} ${await tokenResponse.text()}`);
  }

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  const updates = { LINKEDIN_ACCESS_TOKEN: accessToken };
  let authorUrn = existingAuthorUrn;

  if (scopes.includes("openid")) {
    const userResponse = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!userResponse.ok) {
      throw new Error(`Userinfo request failed: ${userResponse.status} ${await userResponse.text()}`);
    }

    const user = await userResponse.json();
    authorUrn = `urn:li:person:${user.sub}`;
    updates.LINKEDIN_AUTHOR_URN = authorUrn;
  }

  updateEnv(updates);

  return {
    expiresIn: tokenData.expires_in,
    authorUrn
  };
}

function authUrl() {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes.join(" "),
    state
  });
  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
}

function main() {
  if (!clientId || !clientSecret) {
    console.error("Missing LINKEDIN_CLIENT_ID or LINKEDIN_CLIENT_SECRET in .env");
    process.exitCode = 1;
    return;
  }

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, redirectUri);
    if (url.pathname !== "/callback") {
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
      const result = await exchangeCode(code);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>LinkedIn connected</h1><p>You can close this tab and return to the terminal.</p>");
      console.log("LinkedIn token saved to .env");
      if (result.authorUrn) {
        console.log(`Author URN saved: ${result.authorUrn}`);
      } else {
        console.log("Author URN not available because OpenID scope is not enabled for this app.");
        console.log("Enable 'Sign In with LinkedIn using OpenID Connect' in LinkedIn Products, then rerun with openid profile email w_member_social.");
      }
      console.log(`Token expires in ${result.expiresIn} seconds.`);
      server.close();
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(error.message);
      console.error(error.message);
      server.close();
      process.exitCode = 1;
    }
  });

  const port = new URL(redirectUri).port || 80;
  server.listen(Number(port), "127.0.0.1", () => {
    console.log("Open this URL in your browser:");
    console.log(authUrl());
    console.log("");
    console.log(`Requested scopes: ${scopes.join(" ")}`);
    console.log(`Waiting for LinkedIn callback at ${redirectUri}`);
  });
}

main();
