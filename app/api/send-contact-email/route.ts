import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2b7cee 0%, #1a5cbf 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-row { padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
            .info-label { font-weight: bold; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
            .info-value { color: #111827; font-size: 15px; }
            .message-box { background: white; border-left: 4px solid #2b7cee; padding: 16px; border-radius: 4px; margin-top: 8px; white-space: pre-wrap; }
            .footer { margin-top: 20px; text-align: center; color: #6b7280; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">📩 New Contact Form Message</h1>
            </div>
            <div class="content">
              <div class="info-row">
                <div class="info-label">Name</div>
                <div class="info-value">${name}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Email</div>
                <div class="info-value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="info-row">
                <div class="info-label">Subject</div>
                <div class="info-value">${subject}</div>
              </div>
              <div class="info-row" style="border-bottom: none;">
                <div class="info-label">Message</div>
                <div class="message-box">${message}</div>
              </div>
              <div class="footer">
                <p>Reply directly to <a href="mailto:${email}">${email}</a> to respond to this enquiry.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"JuniorSpark Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || 'juniorspark2026@gmail.com',
      replyTo: email,
      subject: `Contact: ${subject} — ${name}`,
      html: adminEmailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
