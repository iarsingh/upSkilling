const crypto = require("crypto");
const http = require("http");
const { URL } = require("url");
const {
  oauthStatePath,
  xClientId,
  xClientSecret,
  xRedirectUri,
  xRefreshToken,
  xScopes,
  updateEnv
} = require("./config");
const fs = require("fs");

function base64Url(buffer) {
  return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function makePkce() {
  const verifier = base64Url(crypto.randomBytes(48));
  const challenge = base64Url(crypto.createHash("sha256").update(verifier).digest());
  const state = base64Url(crypto.randomBytes(24));
  return { verifier, challenge, state };
}

function tokenHeaders() {
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  if (xClientSecret) {
    headers.Authorization = `Basic ${Buffer.from(`${xClientId}:${xClientSecret}`).toString("base64")}`;
  }
  return headers;
}

async function exchangeToken(params) {
  const response = await fetch("https://api.x.com/2/oauth2/token", {
    method: "POST",
    headers: tokenHeaders(),
    body: new URLSearchParams(params)
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Token request failed (${response.status}): ${payload.error_description || payload.error || JSON.stringify(payload)}`);
  }
  updateEnv({
    X_ACCESS_TOKEN: payload.access_token,
    X_REFRESH_TOKEN: payload.refresh_token || xRefreshToken
  });
  return payload;
}

async function refreshToken() {
  if (!xClientId || !xRefreshToken) {
    throw new Error("Missing X_CLIENT_ID or X_REFRESH_TOKEN in .env.");
  }
  const params = {
    grant_type: "refresh_token",
    refresh_token: xRefreshToken,
    client_id: xClientId
  };
  const payload = await exchangeToken(params);
  console.log("Refreshed X access token and updated .env.");
  console.log(`Expires in: ${payload.expires_in || "unknown"} seconds`);
}

function listenForCallback(pkce) {
  const redirect = new URL(xRedirectUri);
  const port = Number(redirect.port || (redirect.protocol === "https:" ? 443 : 80));
  const pathName = redirect.pathname;

  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        const callbackUrl = new URL(req.url, xRedirectUri);
        if (callbackUrl.pathname !== pathName) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        const code = callbackUrl.searchParams.get("code");
        const state = callbackUrl.searchParams.get("state");
        const error = callbackUrl.searchParams.get("error");

        if (error) throw new Error(`OAuth error: ${error}`);
        if (!code) throw new Error("Missing code in OAuth callback.");
        if (state !== pkce.state) throw new Error("Invalid OAuth state.");

        const payload = await exchangeToken({
          grant_type: "authorization_code",
          code,
          redirect_uri: xRedirectUri,
          client_id: xClientId,
          code_verifier: pkce.verifier
        });

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("X authorization complete. You can close this tab.");
        server.close();
        resolve(payload);
      } catch (error) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end(error.message);
        server.close();
        reject(error);
      }
    });

    server.listen(port, redirect.hostname, () => {
      console.log(`Listening for X OAuth callback on ${xRedirectUri}`);
    });
  });
}

async function authorize() {
  if (!xClientId) {
    throw new Error("Missing X_CLIENT_ID in .env. Create an X Developer app first.");
  }

  const pkce = makePkce();
  fs.writeFileSync(oauthStatePath, `${JSON.stringify(pkce, null, 2)}\n`, "utf8");

  const authUrl = new URL("https://twitter.com/i/oauth2/authorize");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", xClientId);
  authUrl.searchParams.set("redirect_uri", xRedirectUri);
  authUrl.searchParams.set("scope", xScopes);
  authUrl.searchParams.set("state", pkce.state);
  authUrl.searchParams.set("code_challenge", pkce.challenge);
  authUrl.searchParams.set("code_challenge_method", "S256");

  console.log("Open this URL in your browser and approve the app:");
  console.log(authUrl.toString());

  const payload = await listenForCallback(pkce);
  console.log("Saved X access token to .env.");
  console.log(`Expires in: ${payload.expires_in || "unknown"} seconds`);
}

if (require.main === module) {
  const args = new Set(process.argv.slice(2));
  const action = args.has("--refresh") ? refreshToken : authorize;
  action().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = { authorize, refreshToken };
