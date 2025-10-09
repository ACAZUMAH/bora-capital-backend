import { Request, Response } from "express";
import http from "http";
import { google } from "googleapis";

require("dotenv").config({ path: ".env" });

const PORT = 5555;
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`;
const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

async function main() {
  const oauth2 = new google.auth.OAuth2(
    `${process.env.GOOGLE_CLIENT_ID}`,
    `${process.env.GOOGLE_CLIENT_SECRET}`,
    REDIRECT_URI
  );

  const authUrl = oauth2.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  });

  const server = http.createServer(
    async (req: http.IncomingMessage, res: http.ServerResponse) => {
      if (!req.url) {
        res.writeHead(400);
        res.end("Bad Request");
        return;
      }
      if (req.url.startsWith("/oauth2callback")) {
        const url = new URL(req.url, REDIRECT_URI);
        const code = url.searchParams.get("code");
        try {
          const { tokens } = await oauth2.getToken(code || "");
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Success! You can close this tab.");
          console.log("\nGMAIL_REFRESH_TOKEN:", tokens.refresh_token);
        } catch (e) {
          console.error("Token exchange failed:", e);
          res.writeHead(500);
          res.end("Token exchange failed. Check console.");
        } finally {
          server.close(() => process.exit(0));
        }
      } else {
        res.writeHead(404);
        res.end("Not found");
      }
    }
  );

  server.listen(PORT, () => {
    console.log("Open this URL in your browser:\n", authUrl, "\n");
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
