import OpenAI, { toFile } from 'openai';
import { StyleGoal, HairstyleResult, LeadData, FaceAnalysis } from '@/types';

// ─── Models ──────────────────────────────────────────────────────────────────
const VISION_MODEL = 'gpt-4o';
const ADVICE_MODEL = 'gpt-4o-mini';

// ─── Curated Style Fallback Catalog ──────────────────────────────────────────
export interface StyleCatalogItem {
  title: string;
  recommendedService: string;
  tags: string[];
  imageUrl: string;
}

export const CATALOG: Record<string, StyleCatalogItem[]> = {
  'short_masculine': [
    {
      title: 'Modern Taper Fade',
      recommendedService: 'Precision Cut & Fade',
      tags: ['fade', 'taper', 'clean'],
      imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&h=600&fit=crop&q=80',
    },
    {
      title: 'Textured Crop Undercut',
      recommendedService: 'Undercut + Texturizing',
      tags: ['undercut', 'textured', 'modern'],
      imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&h=600&fit=crop&q=80',
    },
    {
      title: 'Classic Crew Trim',
      recommendedService: 'Classic Haircut + Style',
      tags: ['classic', 'clean', 'cropped'],
      imageUrl: 'https://images.unsplash.com/photo-1605497746444-ac9dbd324ce8?w=500&h=600&fit=crop&q=80',
    }
  ],
  'short_feminine': [
    {
      title: 'Textured Pixie Cut',
      recommendedService: 'Precision Pixie Cut',
      tags: ['pixie', 'textured', 'chic'],
      imageUrl: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?w=500&h=600&fit=crop&q=80',
    },
    {
      title: 'Sleek Chin-Length Bob',
      recommendedService: 'Bob Haircut & Blowout',
      tags: ['bob', 'sleek', 'modern'],
      imageUrl: 'https://images.unsplash.com/photo-1580618864195-fae9a6e1f8c5?w=500&h=600&fit=crop&q=80',
    },
    {
      title: 'Soft Asymmetrical Crop',
      recommendedService: 'Creative Cut & Styling',
      tags: ['crop', 'soft', 'asymmetric'],
      imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500&h=600&fit=crop&q=80',
    }
  ],
  'medium_feminine': [
    {
      title: 'Sleek Long Bob (Lob)',
      recommendedService: 'Lob Haircut & Styling',
      tags: ['lob', 'sleek', 'professional'],
      imageUrl: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=500&h=600&fit=crop&q=80',
    },
    {
      title: 'Textured Shag Cut',
      recommendedService: 'Shag Cut + Blowout',
      tags: ['shag', 'textured', 'layers'],
      imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=600&fit=crop&q=80',
    },
    {
      title: 'Face-Framing Shoulder Layers',
      recommendedService: 'Layered Cut & Blowout',
      tags: ['layers', 'face-frame', 'volume'],
      imageUrl: 'https://images.unsplash.com/photo-1580618864195-fae9a6e1f8c5?w=500&h=600&fit=crop&q=80',
    }
  ],
  'long_feminine': [
    {
      title: 'Hollywood Glamour Waves',
      recommendedService: 'Blowout & Wave Styling',
      tags: ['waves', 'glamour', 'volume'],
      imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=600&fit=crop&q=80',
    },
    {
      title: 'Long Cascading Layers',
      recommendedService: 'Layered Cut & Blowout',
      tags: ['layers', 'flowing', 'long'],
      imageUrl: 'https://images.unsplash.com/photo-1580618864195-fae9a6e1f8c5?w=500&h=600&fit=crop&q=80',
    },
    {
      title: 'Wispy Curtain Bangs & Layers',
      recommendedService: 'Layered Cut + Bang Styling',
      tags: ['bangs', 'curtain-bangs', 'wispy'],
      imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500&h=600&fit=crop&q=80',
    }
  ],
  'medium_long_masculine': [
    {
      title: 'Textured Medium Flow',
      recommendedService: 'Flow Cut + Styling',
      tags: ['flow', 'medium', 'natural'],
      imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&h=600&fit=crop&q=80',
    },
    {
      title: 'Modern Layered Shag',
      recommendedService: 'Layered Cut & Styling',
      tags: ['shag', 'textured', 'modern'],
      imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&h=600&fit=crop&q=80',
    },
    {
      title: 'Classic Swept-Back Flow',
      recommendedService: 'Flow Styling & Trim',
      tags: ['classic', 'clean', 'flow'],
      imageUrl: 'https://images.unsplash.com/photo-1605497746444-ac9dbd324ce8?w=500&h=600&fit=crop&q=80',
    }
  ],
  'color_transform': [
    {
      title: 'Sun-Kissed Caramel Balayage',
      recommendedService: 'Full Balayage + Treatment',
      tags: ['balayage', 'caramel', 'warm'],
      imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=600&fit=crop&q=80',
    },
    {
      title: 'Luminous Dimensional Highlights',
      recommendedService: 'Full Highlights + Gloss',
      tags: ['highlights', 'blonde', 'shine'],
      imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500&h=600&fit=crop&q=80',
    },
    {
      title: 'Glossy Tone-on-Tone Color Refresh',
      recommendedService: 'All-Over Gloss + Treatment',
      tags: ['gloss', 'color-refresh', 'shine'],
      imageUrl: 'https://images.unsplash.com/photo-1580618864195-fae9a6e1f8c5?w=500&h=600&fit=crop&q=80',
    }
  ]
};

// ─── Face Analysis via gpt-4o ─────────────────────────────────────────────────
export async function analyzeFace(imageBase64: string): Promise<FaceAnalysis> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.log('🎨 Mock Face Scan — no API key');
    await new Promise((r) => setTimeout(r, 1500));
    return {
      faceShape: 'oval',
      hairColor: 'dark brown',
      hairTexture: 'wavy',
      skinTone: 'medium',
      gender: 'feminine',
      detectedLength: 'medium',
    };
  }

  const client = new OpenAI({ apiKey });

  try {
    const response = await client.chat.completions.create({
      model: VISION_MODEL,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: imageBase64, detail: 'low' },
            },
            {
              type: 'text',
              text: `Analyze this person's portrait features for hairstyle routing. Respond ONLY with valid JSON (no markdown formatting, no code fences):
{
  "faceShape": "oval|round|square|heart|diamond|oblong",
  "hairColor": "black|dark brown|medium brown|light brown|blonde|red|grey|white",
  "hairTexture": "straight|wavy|curly|coily",
  "skinTone": "fair|light|medium|olive|tan|dark",
  "gender": "masculine|feminine|androgynous",
  "detectedLength": "short|medium|long"
}`,
            },
          ],
        },
      ],
      max_tokens: 150,
      temperature: 0,
    });

    const raw = response.choices[0]?.message?.content ?? '{}';
    const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(clean) as FaceAnalysis;
  } catch (err) {
    console.error('Face analysis failed, fallback used:', err);
    return {
      faceShape: 'oval',
      hairColor: 'medium brown',
      hairTexture: 'straight',
      skinTone: 'medium',
      gender: 'feminine',
      detectedLength: 'medium',
    };
  }
}

// ─── Main Hairstyle Generator ─────────────────────────────────────────────────
export async function generateHairstyle(
  imageBase64: string,
  maskBase64: string,
  styleGoal: StyleGoal,
  leadData: LeadData,
  clientFaceAnalysis?: FaceAnalysis
): Promise<{ results: HairstyleResult[]; faceAnalysis: FaceAnalysis }> {
  const apiKey = process.env.OPENAI_API_KEY;

  // 1. Get face analysis
  let faceAnalysis = clientFaceAnalysis;
  if (!faceAnalysis) {
    faceAnalysis = await analyzeFace(imageBase64);
  }

  // Determine gender + length catalog key
  const gender = faceAnalysis.gender === 'masculine' ? 'masculine' : 'feminine';
  const length = faceAnalysis.detectedLength;

  let catalogKey = 'long_feminine';
  if (leadData.preferredService === 'Hair Color') {
    catalogKey = 'color_transform';
  } else if (gender === 'masculine') {
    catalogKey = length === 'short' ? 'short_masculine' : 'medium_long_masculine';
  } else {
    if (length === 'short') catalogKey = 'short_feminine';
    else if (length === 'medium') catalogKey = 'medium_feminine';
    else catalogKey = 'long_feminine';
  }

  const selectedOptions = CATALOG[catalogKey] || CATALOG['long_feminine'];

  // ── Mock Mode / Fallback Generator ──────────────────────────────────────────
  const runFallbackCatalog = () => {
    const mockAdvice = `Since you have a classic ${faceAnalysis?.faceShape} face shape and ${faceAnalysis?.hairTexture} hair, we suggest styling that creates balance and frames your features.`;
    const results = selectedOptions.map((item, i) => ({
      id: `fallback-${catalogKey}-${i}-${Date.now()}`,
      title: styleGoal.label === 'Surprise Me' ? `AI Trend ${i + 1}: ${item.title}` : item.title,
      description: `A beautiful ${item.title.toLowerCase()} that complements your ${faceAnalysis?.faceShape} features and natural ${faceAnalysis?.hairColor} color.`,
      imageUrl: item.imageUrl,
      recommendedService: item.recommendedService,
      confidence: 96 - i * 3,
      tags: item.tags,
    }));

    return {
      results,
      faceAnalysis: { ...faceAnalysis!, advice: mockAdvice }
    };
  };

  if (!apiKey) {
    console.log('🎨 OpenAI Key not set — using curated static library');
    await new Promise((r) => setTimeout(r, 2000));
    return runFallbackCatalog();
  }

  // ── Live Mode (OpenAI) ───────────────────────────────────────────────────────
  try {
    const client = new OpenAI({ apiKey });

    // Step 1: Convert base64 square image & mask → Files
    const base64Clean = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
    const imageBuffer = Buffer.from(base64Clean, 'base64');
    const imageFile = await toFile(imageBuffer, 'selfie.png', { type: 'image/png' });

    const maskBase64Clean = maskBase64.includes(',') ? maskBase64.split(',')[1] : maskBase64;
    const maskBuffer = Buffer.from(maskBase64Clean, 'base64');
    const maskFile = await toFile(maskBuffer, 'mask.png', { type: 'image/png' });

    // Step 2: Build prompt
    let chosenPrompt = `change only the hair to a ${styleGoal.label} hairstyle, professional premium salon cut & blow-dry styling, highly detailed hair strands, matching lighting, natural hair flow`;
    
    if (styleGoal.label === 'Surprise Me') {
      const serviceWord = leadData.preferredService === 'Hair Color' ? 'beautiful color refresh / balayage' : 'trendy stylish haircut';
      chosenPrompt = `change only the hair to a trend-setting, modern ${serviceWord} customized for an ${faceAnalysis.faceShape} face shape with ${faceAnalysis.hairColor} base, high-end professional styling, natural textures`;
    }

    console.log(`🎨 Requesting 3 edits from dall-e-2 in one call... Prompt: "${chosenPrompt}"`);

    // Step 3: Run DALL-E 2 Inpainting (3 variations in a single call)
    const dalleResponse = await client.images.edit({
      model: 'dall-e-2',
      image: imageFile,
      mask: maskFile,
      prompt: chosenPrompt,
      n: 3,
      size: '512x512',
    });

    const imageUrls = (dalleResponse.data || []).map(img => img.url).filter(Boolean) as string[];

    if (imageUrls.length === 0) {
      throw new Error('No image URLs returned from DALL-E');
    }

    // Fill missing images if less than 3 returned
    while (imageUrls.length < 3) {
      imageUrls.push(selectedOptions[imageUrls.length % selectedOptions.length].imageUrl);
    }

    // Step 4: Run GPT-4o-mini dynamic advice & variation naming in parallel
    const advicePrompt = `You are a premium hair stylist. Generate details for a client:
- Face Shape: ${faceAnalysis.faceShape}
- Hair Color: ${faceAnalysis.hairColor}
- Hair Texture: ${faceAnalysis.hairTexture}
- Skin Tone: ${faceAnalysis.skinTone}
- Style Goal: ${styleGoal.label}

We have generated 3 AI variations of this look. 
Choose 3 distinct names and write a personalized description for each variation explaining why it suits their face shape and hair texture.
Respond ONLY with a valid JSON object matching this structure (no code fences, no markup):
{
  "advice": "Stylist face shape analysis and styling tips (max 2 sentences).",
  "titles": ["Specific Variation Name 1", "Specific Variation Name 2", "Specific Variation Name 3"],
  "descriptions": [
    "Personalized explanation for variation 1 (max 2 sentences).",
    "Personalized explanation for variation 2 (max 2 sentences).",
    "Personalized explanation for variation 3 (max 2 sentences)."
  ]
}`;

    const completion = await client.chat.completions.create({
      model: ADVICE_MODEL,
      messages: [{ role: 'user', content: advicePrompt }],
      max_tokens: 450,
      temperature: 0.3,
    });

    const adviceContent = completion.choices[0]?.message?.content ?? '{}';
    const cleanContent = adviceContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleanContent);

    const finalAdvice = parsed.advice || `Perfect custom shape-balanced style for your ${faceAnalysis.faceShape} face.`;
    const titles = parsed.titles || [`Custom Style Var 1`, `Custom Style Var 2`, `Custom Style Var 3`];
    const descriptions = parsed.descriptions || [
      `A custom styled hair variation tailored to your ${faceAnalysis.faceShape} face shape.`,
      `A balanced look that compliments your skin tone and ${faceAnalysis.hairTexture} hair.`,
      `A modern variation that frames your features and adds styled texture.`
    ];

    const results: HairstyleResult[] = imageUrls.map((url, i) => ({
      id: `dalle-${catalogKey}-${i}-${Date.now()}`,
      title: titles[i],
      description: descriptions[i],
      imageUrl: url,
      recommendedService: leadData.preferredService === 'Hair Color' ? 'Full Color + Treatment' : 'Stylist Cut & Blowout',
      confidence: 97 - i * 3,
      tags: selectedOptions[i % selectedOptions.length].tags,
    }));

    return {
      results,
      faceAnalysis: { ...faceAnalysis, advice: finalAdvice }
    };

  } catch (err) {
    console.error('⚠️ Live OpenAI Hairstyle generation crashed, fallback used:', err);
    return runFallbackCatalog();
  }
}
