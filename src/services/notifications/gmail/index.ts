import { google } from 'googleapis';

const scopes = ['https://www.googleapis.com/auth/gmail.send'];

export const sendEmailViaGmailApi = async () => {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_CLIENT_EMAIL,
    key: String(process.env.GOOGLE_PRIVATE_KEY).replace(/\\n/g, '\n').trim(),
    subject: process.env.GOOGLE_IMPERSONATE,
  });
};
