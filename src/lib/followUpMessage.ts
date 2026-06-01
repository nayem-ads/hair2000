/**
 * SMS / Email follow-up message templates.
 * 
 * Connect to Twilio, SendGrid, or GoHighLevel to send these automatically
 * after a lead submits their info.
 */

export function buildFollowUpSMS(name: string, salonName?: string): string {
  const salon = salonName || process.env.NEXT_PUBLIC_SALON_NAME || 'our salon';
  return `Hey ${name}! 👋 Your AI hair preview is ready from ${salon}. A stylist can help adjust the look based on your real hair texture, face shape, and color goal. Want to book a quick consultation? Reply YES and we'll find a time that works for you!`;
}

export function buildFollowUpEmail(name: string, previewUrl?: string, bookingUrl?: string): string {
  const salon = process.env.NEXT_PUBLIC_SALON_NAME || 'hair2000';
  const booking = bookingUrl || process.env.NEXT_PUBLIC_BOOKING_URL || '#';

  return `
Subject: Your AI Hair Preview is Ready ✨ — ${salon}

Hi ${name},

Your personalized AI hairstyle preview is ready!

We've created 5 custom looks based on your face shape and style preferences. A professional stylist can help bring any of these looks to life — adjusted perfectly for your real hair texture, thickness, and color goals.

${previewUrl ? `View your preview: ${previewUrl}` : ''}

Ready to book?
→ ${booking}

We can't wait to see you in the chair.

Warm regards,
The Team at ${salon}

---
This message was sent because you used the AI Hair Preview tool at ${salon}.
  `.trim();
}

/**
 * TODO: Connect this function to your notification service
 * 
 * Options:
 * - Twilio SMS: https://www.twilio.com/docs/sms
 * - SendGrid Email: https://sendgrid.com/docs
 * - GoHighLevel: via GHL_WEBHOOK_URL in .env.local
 */
export async function sendFollowUpNotification(
  name: string,
  phone?: string,
  email?: string,
): Promise<void> {
  const smsMessage = buildFollowUpSMS(name);
  const emailBody = buildFollowUpEmail(name);

  console.log('📱 Follow-up SMS (not sent - connect Twilio):', smsMessage);
  console.log('📧 Follow-up Email (not sent - connect SendGrid):', emailBody);

  // TODO: Uncomment and configure your preferred service:
  //
  // ─── Twilio SMS ──────────────────────────────────────────────────────────────
  // const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
  // if (phone) {
  //   await twilio.messages.create({
  //     body: smsMessage,
  //     from: process.env.TWILIO_PHONE,
  //     to: phone,
  //   });
  // }
  //
  // ─── SendGrid Email ──────────────────────────────────────────────────────────
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // if (email) {
  //   await sgMail.send({
  //     to: email,
  //     from: process.env.FROM_EMAIL,
  //     subject: `Your AI Hair Preview is Ready ✨`,
  //     text: emailBody,
  //   });
  // }
}
