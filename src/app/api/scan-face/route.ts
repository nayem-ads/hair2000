import { NextRequest, NextResponse } from 'next/server';
import { analyzeFace } from '@/lib/generateHairstyle';

export async function POST(request: NextRequest) {
  try {
    const { imageBase64 } = await request.json();

    if (!imageBase64) {
      return NextResponse.json(
        { success: false, error: 'Missing imageBase64 data' },
        { status: 400 }
      );
    }

    const faceAnalysis = await analyzeFace(imageBase64);

    return NextResponse.json({
      success: true,
      faceAnalysis
    });
  } catch (error) {
    console.error('Scan face API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Scan failed',
      },
      { status: 500 }
    );
  }
}
