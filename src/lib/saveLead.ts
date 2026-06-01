import { LeadData } from '@/types';

/**
 * Save lead data to your CRM or notification service.
 * 
 * Connect one or more of the following by filling in .env.local:
 * - GoHighLevel (GHL_WEBHOOK_URL)
 * - Google Sheets (GOOGLE_SHEETS_API_KEY + GOOGLE_SHEET_ID)
 * - Airtable (coming soon)
 * - Email notification (SMTP credentials)
 */
export async function saveLead(leadData: LeadData): Promise<void> {
  // Always log to console for debugging
  console.log('📋 New Lead Captured:', leadData);

  const promises: Promise<unknown>[] = [];

  // ─── GoHighLevel / Webhook ──────────────────────────────────────────────────
  // TODO: Uncomment and fill GHL_WEBHOOK_URL in .env.local to activate
  /*
  if (process.env.GHL_WEBHOOK_URL) {
    promises.push(
      fetch(process.env.GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadData.name,
          phone: leadData.phone,
          email: leadData.email,
          tags: ['hair2000', 'ai-preview', leadData.preferredService],
          customField: {
            styleGoal: leadData.styleGoal,
            source: 'hair2000-funnel',
          },
        }),
      })
    );
  }
  */

  // ─── Google Sheets ──────────────────────────────────────────────────────────
  // TODO: Uncomment and fill credentials in .env.local to activate
  /*
  if (process.env.GOOGLE_SHEETS_API_KEY && process.env.GOOGLE_SHEET_ID) {
    promises.push(
      fetch(`/api/save-to-sheets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      })
    );
  }
  */

  // ─── Airtable ───────────────────────────────────────────────────────────────
  // TODO: Connect Airtable base here
  /*
  if (process.env.AIRTABLE_API_KEY) {
    promises.push(
      fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Leads`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Name: leadData.name,
            Phone: leadData.phone,
            Email: leadData.email,
            Service: leadData.preferredService,
            StyleGoal: leadData.styleGoal,
            SubmittedAt: leadData.submittedAt,
          },
        }),
      })
    );
  }
  */

  // Run all integrations in parallel
  if (promises.length > 0) {
    try {
      await Promise.allSettled(promises);
    } catch (error) {
      console.error('Lead save error:', error);
    }
  }
}
