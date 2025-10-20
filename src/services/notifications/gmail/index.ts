import nodemailer from 'nodemailer';

interface emailParams {
  from: string;
  to: string;
  htmlContent: string;
  subject: string;
  //params?: object
}

export const sendEmailViaGmailApi = async (data: emailParams) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'acazumah9@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.verify();
    console.log('SMTP connection verified');
  } catch (error) {
    console.error('SMTP verification failed:', error);
    return false;
  }

  try {
    const info = await transporter.sendMail({
      from: '"Bora Capital Investors" <acazumah9@gmail.com>',
      to: data.to,
      subject: data.subject,
      html: data.htmlContent,
    });

    console.log('Message sent:', info);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};
