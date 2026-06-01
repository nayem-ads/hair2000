import { NextRequest, NextResponse } from 'next/server';
import { generateHairstyle } from '@/lib/generateHairstyle';
import { saveLead } from '@/lib/saveLead';
import { sendFollowUpNotification } from '@/lib/followUpMessage';
import { GenerateRequest, GenerateResponse } from '@/types';

/**
 * POST /api/generate-hairstyle
 * 
 * Receives: { imageBase64, styleGoal, leadData }
 * Returns:  { success: boolean, results: HairstyleResult[] }
 * 
 * To connect LightX API:
 * 1. Add LIGHTX_API_KEY to .env.local
 * 2. Update src/lib/generateHairstyle.ts with the real API call
 */
export async function POST(request: NextRequest): Promise<NextResponse<GenerateResponse>> {
  try {
    const body: GenerateRequest = await request.json();
    const { imageBase64, maskBase64, styleGoal, leadData } = body;

    // Validate required fields
    if (!imageBase64 || !styleGoal || !leadData) {
      return NextResponse.json(
        { success: false, results: [], error: 'Missing required fields' },
        { status: 400 },
      );
    }

    if (!leadData.name || !leadData.phone) {
      return NextResponse.json(
        { success: false, results: [], error: 'Lead name and phone are required' },
        { status: 400 },
      );
    }

    // 1. Save lead to CRM (runs in background, non-blocking)
    saveLead(leadData).catch((err) => console.error('Lead save failed:', err));

    // 2. Generate hairstyle previews
    const { results, faceAnalysis: finalAnalysis } = await generateHairstyle(
      imageBase64,
      maskBase64,
      styleGoal,
      leadData,
      body.faceAnalysis
    );

    // 3. Send follow-up notification (runs in background)
    sendFollowUpNotification(leadData.name, leadData.phone, leadData.email).catch(
      (err) => console.error('Follow-up notification failed:', err),
    );

    return NextResponse.json({ success: true, results, faceAnalysis: finalAnalysis });
  } catch (error) {
    console.error('Generate hairstyle error:', error);
    return NextResponse.json(
      {
        success: false,
        results: [],
        error: error instanceof Error ? error.message : 'Generation failed',
      },
      { status: 500 },
    );
  }
}
