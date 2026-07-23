import nodemailer from 'nodemailer';
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: `"Mortgage Calculator" <${process.env.EMAIL}>`,
    to: email,
    subject: 'Verify Your Email Address',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              background: linear-gradient(135deg, #0a0a0f 0%, #151520 100%);
              margin: 0;
              padding: 40px 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: rgba(30, 30, 45, 0.6);
              backdrop-filter: blur(12px);
              border-radius: 16px;
              padding: 40px;
              border: 1px solid #1e293b;
            }
            h1 {
              color: #f1f5f9;
              font-size: 28px;
              margin-bottom: 20px;
              font-family: 'Geist Sans', sans-serif;
            }
            p {
              color: #94a3b8;
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 30px;
            }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #06b6d4, #3b82f6);
              color: white;
              text-decoration: none;
              padding: 14px 32px;
              border-radius: 12px;
              font-weight: 500;
              font-size: 16px;
              box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);
            }
            .footer {
              margin-top: 30px;
              padding-top: 30px;
              border-top: 1px solid #1e293b;
              color: #64748b;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to Mortgage Calculator!</h1>
            <p>Thank you for signing up. Please verify your email address to get started with our powerful financial calculators.</p>
            <p>Click the button below to verify your email:</p>
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
            <p class="footer">
              This link will expire in 24 hours.<br>
              If you didn't create an account, you can safely ignore this email.
            </p>
          </div>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function getTokenExpiry(): Date {
  return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
}
