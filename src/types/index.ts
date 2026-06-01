export interface LeadData {
  name: string;
  phone: string;
  email?: string;
  preferredService: string;
  styleGoal?: string;
  submittedAt: string;
}

export interface StyleGoal {
  id: string;
  label: string;
  icon: string;
  benefit: string;
  emoji: string;
}

export interface FaceAnalysis {
  faceShape: string;
  hairColor: string;
  hairTexture: string;
  skinTone: string;
  gender: string;
  detectedLength: 'short' | 'medium' | 'long';
  advice?: string;
}

export interface HairstyleResult {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  recommendedService: string;
  confidence: number;
  tags: string[];
}

export interface BookingData {
  name: string;
  phone: string;
  email?: string;
  preferredDate: string;
  preferredTime: string;
  service: string;
  notes?: string;
  selectedStyleId?: string;
}

export type FunnelStep = 'hero' | 'upload' | 'style' | 'lead' | 'generating' | 'result';

export interface GenerateRequest {
  imageBase64: string;
  maskBase64: string;
  styleGoal: StyleGoal;
  leadData: LeadData;
  faceAnalysis?: FaceAnalysis;
}

export interface GenerateResponse {
  success: boolean;
  results: HairstyleResult[];
  faceAnalysis?: FaceAnalysis;
  error?: string;
}
