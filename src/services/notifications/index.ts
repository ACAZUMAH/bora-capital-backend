import { sendVerificationEmail } from './nodeMailer';

interface emailContent {
  from: string;
  to: string;
  htmlContent: string;
  subject: string;
}

export const sendEmail = async (content: emailContent) => {
  return await sendVerificationEmail({ ...content });
};
