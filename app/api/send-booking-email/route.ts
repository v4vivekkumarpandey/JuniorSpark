import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ageGroup, date, time, parentName, email, childName, whatsapp } = body;

    // Format the date for better readability
    const formattedDate = new Date(date).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password (NOT your regular password)
      },
    });

    // Admin Email HTML Template
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-row { display: flex; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
            .info-label { font-weight: bold; min-width: 150px; color: #6b7280; }
            .info-value { color: #111827; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">🎉 New Demo Class Booking!</h1>
            </div>
            <div class="content">
              <p style="font-size: 16px; margin-bottom: 20px;">You have received a new demo class booking with the following details:</p>
              
              <div class="info-row">
                <div class="info-label">Child's Name:</div>
                <div class="info-value">${childName}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Age Group:</div>
                <div class="info-value">${ageGroup} years</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Scheduled Date:</div>
                <div class="info-value">${formattedDate}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Scheduled Time:</div>
                <div class="info-value">${time} IST</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Parent's Name:</div>
                <div class="info-value">${parentName}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Email:</div>
                <div class="info-value">${email}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">WhatsApp Number:</div>
                <div class="info-value">+91 ${whatsapp}</div>
              </div>
              
              <div class="footer">
                <p>Please send the class link to the parent via WhatsApp and email.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Parent Email HTML Template
    /**const parentEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; }
            .highlight-box { background: #f0f4ff; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 5px; }
            .info-box { background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px; }
            ul { padding-left: 20px; }
            li { margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 32px;">✨ Booking Confirmed!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Your child's demo class is all set</p>
            </div>
            <div class="content">
              <p>Dear ${parentName},</p>
              
              <p>Thank you for booking a free demo class for <strong>${childName}</strong>! We're excited to welcome your child to our interactive English learning experience.</p>
              
              <div class="highlight-box">
                <h3 style="margin-top: 0; color: #667eea;">📅 Class Details</h3>
                <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
                <p style="margin: 5px 0;"><strong>Time:</strong> ${time} IST</p>
                <p style="margin: 5px 0;"><strong>Age Group:</strong> ${ageGroup} years</p>
                <p style="margin: 5px 0;"><strong>Duration:</strong> 45 minutes</p>
              </div>
              
              <div class="info-box">
                <h4 style="margin-top: 0;">📱 What's Next?</h4>
                <ul style="margin: 10px 0;">
                  <li>You'll receive the class link on WhatsApp (+91 ${whatsapp}) 30 minutes before the session</li>
                  <li>Make sure you have a stable internet connection</li>
                  <li>Join from a laptop/tablet for the best experience</li>
                  <li>Have a pen and paper ready for fun activities!</li>
                </ul>
              </div>
              
              <div class="info-box">
                <h4 style="margin-top: 0;">🎯 What to Expect</h4>
                <ul style="margin: 10px 0;">
                  <li><strong>Interactive Games:</strong> Learning through play and vocabulary puzzles</li>
                  <li><strong>Expert Teacher:</strong> Certified teachers who love working with kids</li>
                  <li><strong>Small Groups:</strong> Maximum of 4-5 kids for personal attention</li>
                  <li><strong>Low Pressure:</strong> Focus on building confidence, not correcting errors</li>
                </ul>
              </div>
              
              <p style="margin-top: 25px;">If you need to reschedule or have any questions, please reply to this email or contact us on WhatsApp.</p>
              
              <p>We look forward to seeing ${childName} in class!</p>
              
              <div class="footer">
                <p><strong>English Classes for Kids</strong></p>
                <p>Building confident English speakers across India 🇮🇳</p>
                <p style="margin-top: 15px; font-size: 12px;">This is an automated confirmation email. Please do not reply directly to this message.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `; */

    // Send Admin Email
    await transporter.sendMail({
      from: `"Demo Bookings" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || 'juniorspark2026@gmail.com',
      subject: `Enquiry: New Demo Class Booking - ${childName}`,
      html: adminEmailHtml,
    });

    // Send WhatsApp notification via CallMeBot
    const adminPhone  = process.env.WHATSAPP_ADMIN_PHONE;
    const callmebotKey = process.env.CALLMEBOT_API_KEY;

    if (adminPhone && callmebotKey) {
      const message = [
        `🎉 *New Demo Booking!*`,
        ``,
        `👦 *Child:* ${childName}`,
        `👨‍👩‍👧 *Parent:* ${parentName}`,
        `📚 *Class:* ${ageGroup}`,
        `📅 *Date:* ${formattedDate}`,
        `⏰ *Time:* ${time} IST`,
        `📞 *WhatsApp:* +91 ${whatsapp}`,
        `📧 *Email:* ${email}`,
        ``,
        `Please send the class link on WhatsApp.`,
      ].join('\n');

      const waUrl = `https://api.callmebot.com/whatsapp.php?phone=${adminPhone}&text=${encodeURIComponent(message)}&apikey=${callmebotKey}`;

      // Fire-and-forget — don't block the response if WA fails
      fetch(waUrl).catch(err => console.error('WhatsApp notification failed:', err));
    }

    return NextResponse.json({
      success: true,
      message: 'Booking confirmed and emails sent successfully'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send confirmation email' },
      { status: 500 }
    );
  }
}
