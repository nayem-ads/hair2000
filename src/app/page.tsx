'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';

import { HeroSection } from '@/components/HeroSection';
import { StepIndicator } from '@/components/StepIndicator';
import { PhotoUpload } from '@/components/PhotoUpload';
import { StyleGoalSelector } from '@/components/StyleGoalSelector';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { GeneratingAnimation } from '@/components/GeneratingAnimation';
import { PreviewResult } from '@/components/PreviewResult';
import { BookingModal } from '@/components/BookingModal';
import { TrustSection } from '@/components/TrustSection';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';

import type { FunnelStep, StyleGoal, LeadData, HairstyleResult, FaceAnalysis } from '@/types';

export default function Home() {
  // ─── Funnel state ──────────────────────────────────────────────────────────
  const [step, setStep] = useState<FunnelStep>('hero');
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<StyleGoal | null>(null);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [results, setResults] = useState<HairstyleResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<HairstyleResult | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // AI Scanning states
  const [faceAnalysis, setFaceAnalysis] = useState<FaceAnalysis | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [maskImage, setMaskImage] = useState<string>('');

  const funnelRef = useRef<HTMLDivElement>(null);

  // ─── Step nav ──────────────────────────────────────────────────────────────
  const startFunnel = () => {
    setStep('upload');
    setTimeout(() => {
      funnelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const goToStyle = () => setStep('style');
  const goToLead = () => setStep('lead');

  // ─── AI Image Scan Handler ─────────────────────────────────────────────────
  const handleImageSelected = async (squareImage: string, maskImageBase64: string) => {
    setUploadedImage(squareImage);
    setMaskImage(maskImageBase64);
    setIsScanning(true);
    
    try {
      const response = await fetch('/api/scan-face', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: squareImage }),
      });
      const json = await response.json();
      
      if (json.success && json.faceAnalysis) {
        setFaceAnalysis(json.faceAnalysis);
      } else {
        console.error('Scan failed, using default face analysis:', json.error);
        setFaceAnalysis({
          faceShape: 'oval',
          hairColor: 'medium brown',
          hairTexture: 'straight',
          skinTone: 'medium',
          gender: 'feminine',
          detectedLength: 'medium'
        });
      }
    } catch (err) {
      console.error('Scan API connection error, using fallback:', err);
      setFaceAnalysis({
        faceShape: 'oval',
        hairColor: 'medium brown',
        hairTexture: 'straight',
        skinTone: 'medium',
        gender: 'feminine',
        detectedLength: 'medium'
      });
    } finally {
      setIsScanning(false);
      setStep('style');
    }
  };

  // ─── Generate previews ─────────────────────────────────────────────────────
  const handleLeadSubmit = async (data: LeadData) => {
    if (!selectedStyle) return;

    const enrichedLead = { ...data, styleGoal: selectedStyle.label };
    setLeadData(enrichedLead);
    setIsGenerating(true);
    setStep('generating');

    try {
      const response = await fetch('/api/generate-hairstyle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: uploadedImage,
          maskBase64: maskImage, // Pass generated mask
          styleGoal: selectedStyle,
          leadData: enrichedLead,
          faceAnalysis: faceAnalysis // Pass detected metadata
        }),
      });

      const json = await response.json();

      if (json.success && json.results.length > 0) {
        setResults(json.results);
        if (json.faceAnalysis) {
          if (json.debugError) {
            console.warn('⚠️ OpenAI Generation Error:', json.debugError);
            json.faceAnalysis.advice = `${json.faceAnalysis.advice || ''} (API Error: ${json.debugError})`;
          }
          setFaceAnalysis(json.faceAnalysis); // Updates with advice text
        }
        setStep('result');
      } else {
        console.error('Generation failed:', json.error);
        alert('Something went wrong generating your preview. Please try again.');
        setStep('lead');
      }
    } catch (err) {
      console.error('API error:', err);
      alert('Connection error. Please try again.');
      setStep('lead');
    } finally {
      setIsGenerating(false);
    }
  };

  // ─── Booking ───────────────────────────────────────────────────────────────
  const handleBook = (result: HairstyleResult) => {
    setSelectedResult(result);
    setIsBookingOpen(true);
  };

  // ─── Step number mapping ───────────────────────────────────────────────────
  const stepNumber: Record<FunnelStep, number> = {
    hero: 0,
    upload: 1,
    style: 2,
    lead: 3,
    generating: 3,
    result: 4,
  };

  return (
    <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <HeroSection onStart={startFunnel} />

      {/* ── Funnel section ────────────────────────────────────────────────── */}
      {step !== 'hero' && (
        <div
          ref={funnelRef}
          className="min-h-screen py-16 px-4 relative"
          style={{
            background: '#F8FAFF',
          }}
        >
          {/* Step indicator */}
          <AnimatePresence>
            {step !== 'generating' && step !== 'result' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-12"
              >
                <StepIndicator currentStep={stepNumber[step]} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step content */}
          <AnimatePresence mode="wait">
            {/* Step 1: Upload */}
            {step === 'upload' && (
              <motion.div key="upload">
                <PhotoUpload
                  onImageSelected={handleImageSelected}
                  isScanning={isScanning}
                />
              </motion.div>
            )}

            {/* Step 2: Style goal */}
            {step === 'style' && (
              <motion.div key="style">
                <StyleGoalSelector
                  selected={selectedStyle}
                  onSelect={setSelectedStyle}
                  onNext={goToLead}
                  faceAnalysis={faceAnalysis}
                  onFaceAnalysisChange={setFaceAnalysis}
                />
              </motion.div>
            )}

            {/* Step 3: Lead capture */}
            {step === 'lead' && (
              <motion.div key="lead">
                <LeadCaptureForm
                  onSubmit={handleLeadSubmit}
                  isLoading={isGenerating}
                />
              </motion.div>
            )}

            {/* Generating animation */}
            {step === 'generating' && (
              <motion.div key="generating">
                <GeneratingAnimation styleGoalLabel={selectedStyle?.label} />
              </motion.div>
            )}

            {/* Step 4: Results */}
            {step === 'result' && results.length > 0 && leadData && selectedStyle && (
              <motion.div key="result">
                <PreviewResult
                  results={results}
                  originalImage={uploadedImage}
                  styleGoal={selectedStyle}
                  leadName={leadData.name}
                  onBook={handleBook}
                  faceAnalysis={faceAnalysis}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back nav */}
          {(step === 'style' || step === 'lead') && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              id="funnel-back-btn"
              onClick={() => {
                if (step === 'style') {
                  setStep('upload');
                  setFaceAnalysis(null);
                }
                if (step === 'lead') setStep('style');
              }}
              className="block mx-auto mt-8 font-body text-sm"
              style={{ color: '#64748B', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ← Go back
            </motion.button>
          )}

          {/* Restart after results */}
          {step === 'result' && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              id="try-again-btn"
              onClick={() => {
                setStep('upload');
                setUploadedImage('');
                setSelectedStyle(null);
                setLeadData(null);
                setResults([]);
                setFaceAnalysis(null);
                setMaskImage('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="block mx-auto mt-8 font-body text-sm"
              style={{ color: '#64748B', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ↺ Try a different look
            </motion.button>
          )}
        </div>
      )}

      {/* ── Trust section ─────────────────────────────────────────────────── */}
      <TrustSection />

      {/* ── Divider ───────────────────────────────────────────────────────── */}
      <div style={{ height: '1.5px', background: '#E2E8F0', margin: '0 1.5rem' }} />

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <FAQSection />

      {/* ── Mid-page CTA ──────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', textAlign: 'center', background: '#EFF6FF', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} style={{ maxWidth: '480px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em', marginBottom: '16px', lineHeight: 1.2 }}>
            Ready to See Your{' '}
            <span style={{ color: '#2563EB' }}>New Look?</span>
          </h2>
          <p style={{ fontSize: '16px', fontWeight: 500, color: '#334155', marginBottom: '32px', lineHeight: 1.6 }}>
            Free, takes 2 minutes, and could change how you feel about your next salon visit.
          </p>
          <motion.button id="mid-page-cta-btn" onClick={startFunnel}
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
            className="btn-blue" style={{ padding: '16px 36px', fontSize: '14px', cursor: 'pointer' }}>
            Try My Hair Preview Free →
          </motion.button>
        </motion.div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <Footer />

      {/* ── Booking Modal ─────────────────────────────────────────────────── */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedResult={selectedResult}
        leadName={leadData?.name}
        leadPhone={leadData?.phone}
        leadEmail={leadData?.email}
      />
    </main>
  );
}
