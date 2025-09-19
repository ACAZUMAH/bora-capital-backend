import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // redirect URI
);

// tell Google what permissions we want
const scopes = [
  "https://mail.google.com/",
  "http://localhost:3500/auth/google/redirect"
];

const url = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
});

console.log("Visit this URL to authorize:", url);