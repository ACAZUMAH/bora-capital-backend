import nodemailer from "nodemailer";

interface emailParams {
  from: string;
  to: string;
  htmlContent: string;
  subject: string;
  //params?: object
}

export const sendVerificationEmail = async (data: emailParams) => {
  const transporter = nodemailer.createTransport({
    host: `${process.env.MAIL_TRAP_HOST}`,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "api",
      pass: `${process.env.MAIL_TRAP_AUTH_TOKEN}`,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Bora Capital Investors" <no-reply@imperiumvaultguard.com>',
      to: data.to,
      subject: data.subject,
      html: data.htmlContent,
    });
    console.log("Message sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
