import { Pool } from 'pg';
import { LeadData } from '@/types';

// Initialize connection pool lazily to avoid connection errors if DATABASE_URL is not set
let pool: Pool | null = null;

function getPool(): Pool | null {
  if (pool) return pool;
  
  if (process.env.DATABASE_URL) {
    console.log('🔌 Initializing PostgreSQL Pool...');
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // Useful for hosted services like Railway, Supabase, Neon
      },
    });
  }
  return pool;
}

async function ensureTableExists(client: any): Promise<void> {
  const queryText = `
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255),
      preferred_service VARCHAR(255) NOT NULL,
      style_goal VARCHAR(255),
      submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await client.query(queryText);
}

/**
 * Save lead data to your CRM or notification service.
 * 
 * Connect one or more of the following by filling in .env.local:
 * - PostgreSQL (DATABASE_URL)
 * - GoHighLevel (GHL_WEBHOOK_URL)
 * - Google Sheets (GOOGLE_SHEETS_API_KEY + GOOGLE_SHEET_ID)
 * - Airtable (coming soon)
 * - Email notification (SMTP credentials)
 */
export async function saveLead(leadData: LeadData): Promise<void> {
  // Always log to console for debugging
  console.log('📋 New Lead Captured:', leadData);

  const promises: Promise<unknown>[] = [];

  // ─── PostgreSQL Database Integration ─────────────────────────────────────────
  const dbPool = getPool();
  if (dbPool) {
    promises.push(
      (async () => {
        const client = await dbPool.connect();
        try {
          await ensureTableExists(client);
          
          const insertQuery = `
            INSERT INTO leads (name, phone, email, preferred_service, style_goal, submitted_at)
            VALUES ($1, $2, $3, $4, $5, $6)
          `;
          
          const values = [
            leadData.name,
            leadData.phone,
            leadData.email || null,
            leadData.preferredService,
            leadData.styleGoal || null,
            leadData.submittedAt ? new Date(leadData.submittedAt) : new Date(),
          ];
          
          await client.query(insertQuery, values);
          console.log('✅ Lead saved to PostgreSQL database successfully');
        } catch (dbErr) {
          console.error('❌ Failed to save lead to PostgreSQL database:', dbErr);
          throw dbErr;
        } finally {
          client.release();
        }
      })()
    );
  }

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
