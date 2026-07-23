import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Invalid Link</title>
          <style>
            body {
              font-family: 'Inter', sans-serif;
              background: linear-gradient(135deg, #0a0a0f 0%, #151520 100%);
              color: #f1f5f9;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
            }
            .container {
              text-align: center;
              max-width: 500px;
              padding: 40px;
              background: rgba(30, 30, 45, 0.6);
              backdrop-filter: blur(12px);
              border-radius: 16px;
              border: 1px solid #1e293b;
            }
            h1 { font-size: 32px; margin-bottom: 20px; color: #f87171; }
            p { font-size: 16px; color: #94a3b8; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Invalid Verification Link</h1>
            <p>The verification link is invalid or has expired.</p>
          </div>
        </body>
      </html>
      `,
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }

  try {
    await dbConnect();

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: new Date() },
    }).select('+verificationToken +verificationTokenExpiry');

    if (!user) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Link Expired</title>
            <style>
              body {
                font-family: 'Inter', sans-serif;
                background: linear-gradient(135deg, #0a0a0f 0%, #151520 100%);
                color: #f1f5f9;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                margin: 0;
              }
              .container {
                text-align: center;
                max-width: 500px;
                padding: 40px;
                background: rgba(30, 30, 45, 0.6);
                backdrop-filter: blur(12px);
                border-radius: 16px;
                border: 1px solid #1e293b;
              }
              h1 { font-size: 32px; margin-bottom: 20px; color: #fbbf24; }
              p { font-size: 16px; color: #94a3b8; margin-bottom: 20px; }
              a {
                display: inline-block;
                background: linear-gradient(135deg, #06b6d4, #3b82f6);
                color: white;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 12px;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Link Expired</h1>
              <p>This verification link has expired or is invalid.</p>
              <a href="/auth">Return to Sign In</a>
            </div>
          </body>
        </html>
        `,
        { status: 400, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // Mark email as verified
    user.emailVerified = new Date();
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Email Verified</title>
          <style>
            body {
              font-family: 'Inter', sans-serif;
              background: linear-gradient(135deg, #0a0a0f 0%, #151520 100%);
              color: #f1f5f9;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
            }
            .container {
              text-align: center;
              max-width: 500px;
              padding: 40px;
              background: rgba(30, 30, 45, 0.6);
              backdrop-filter: blur(12px);
              border-radius: 16px;
              border: 1px solid #1e293b;
            }
            h1 { font-size: 32px; margin-bottom: 20px; color: #34d399; }
            p { font-size: 16px; color: #94a3b8; margin-bottom: 20px; }
            a {
              display: inline-block;
              background: linear-gradient(135deg, #06b6d4, #3b82f6);
              color: white;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 12px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Email Verified!</h1>
            <p>Your email has been successfully verified. You can now sign in to your account.</p>
            <a href="/auth">Sign In Now</a>
          </div>
        </body>
      </html>
      `,
      { status: 200, headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error) {
    console.error('Email verification error:', error);
    return new NextResponse('Verification failed', { status: 500 });
  }
}
