'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles, Scissors, Palette, Sparkle } from 'lucide-react';
import { StyleGoal, FaceAnalysis } from '@/types';

interface StyleGoalSelectorProps {
  selected: StyleGoal | null;
  onSelect: (goal: StyleGoal | null) => void;
  onNext: () => void;
  faceAnalysis: FaceAnalysis | null;
  onFaceAnalysisChange: (analysis: FaceAnalysis) => void;
}

export function StyleGoalSelector({
  selected,
  onSelect,
  onNext,
  faceAnalysis,
  onFaceAnalysisChange,
}: StyleGoalSelectorProps) {
  // Service selections: Cut, Color, Style
  const [service, setService] = useState<'Cut' | 'Color' | 'Style'>('Cut');

  const length = faceAnalysis?.detectedLength || 'medium';

  // Dynamic style goals based on service + length
  const getStyleGoals = (serviceType: 'Cut' | 'Color' | 'Style', hairLen: 'short' | 'medium' | 'long') => {
    if (serviceType === 'Color') {
      return [
        { id: 'color-refresh', label: 'Sun-Kissed Balayage', emoji: '🎨', icon: '🎨', benefit: 'Rich, dimensional hand-painted caramel & warm tones.' },
        { id: 'color-refresh', label: 'Luminous Highlights', emoji: '✨', icon: '✨', benefit: 'Champagne blonde face-framing dimensional highlights.' },
        { id: 'color-refresh', label: 'Gloss Color Refresh', emoji: '💇‍♀️', icon: '💇‍♀️', benefit: 'High-shine deep tone refresh for rich healthy color.' },
        { id: 'color-refresh', label: 'Surprise Me', emoji: '🎁', icon: '🎁', benefit: 'Let the AI select a trend-setting tone that complements your skin.' }
      ];
    }
    
    if (hairLen === 'short') {
      return [
        { id: 'fresh-cut', label: 'Modern Taper Fade', emoji: '💈', icon: '💈', benefit: 'Sharp fade with natural textured volume on top.' },
        { id: 'fresh-cut', label: 'Textured Crop Undercut', emoji: '✂️', icon: '✂️', benefit: 'Clean crop cut with modern disconnected sides.' },
        { id: 'fresh-cut', label: 'Classic Crew Trim', emoji: '⚡', icon: '⚡', benefit: 'Classic short trim with clean natural taper.' },
        { id: 'fresh-cut', label: 'Surprise Me', emoji: '🎁', icon: '🎁', benefit: 'Let the AI select a modern crop or fade matching your features.' }
      ];
    }
    
    if (hairLen === 'medium') {
      return [
        { id: 'soft-layers', label: 'Sleek Long Bob (Lob)', emoji: '💇‍♀️', icon: '💇‍♀️', benefit: 'Sleek shoulder-length lob with rich volume blowout.' },
        { id: 'soft-layers', label: 'Textured Shag Cut', emoji: '🌊', icon: '🌊', benefit: 'Layered retro shag with wispy face-framing bangs.' },
        { id: 'soft-layers', label: 'Shoulder Layers', emoji: '✂️', icon: '✂️', benefit: 'Face-framing layers with natural flow and body.' },
        { id: 'soft-layers', label: 'Surprise Me', emoji: '🎁', icon: '🎁', benefit: 'Let the AI style a custom textured bob mapping your jawline.' }
      ];
    }
    
    // Long hair / Styling
    return [
      { id: 'date-night', label: 'Hollywood Glamour Waves', emoji: '✨', icon: '✨', benefit: 'Classic voluminous waves for glamorous evening styling.' },
      { id: 'soft-layers', label: 'Long Cascading Layers', emoji: '🌊', icon: '🌊', benefit: 'Soft feathered layers that enhance length and flow.' },
      { id: 'soft-layers', label: 'Curtain Bangs & Layers', emoji: '✂️', icon: '✂️', benefit: 'Wispy curtain bangs blended into long layered cuts.' },
      { id: 'soft-layers', label: 'Surprise Me', emoji: '🎁', icon: '🎁', benefit: 'Let the AI style a voluminous long cut tailored to your features.' }
    ];
  };

  const dynamicGoals = getStyleGoals(service, length);

  // Auto-deselect if the selected goal is no longer in the dynamic list
  useEffect(() => {
    if (selected) {
      const exists = dynamicGoals.some(g => g.label === selected.label);
      if (!exists) onSelect(null);
    }
  }, [service, length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
        maxWidth: '540px',
        margin: '0 auto',
        padding: '0 16px',
        fontFamily: 'var(--font-poppins), Poppins, sans-serif'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
            fontWeight: 800,
            color: '#0F172A',
            marginBottom: '12px',
            lineHeight: 1.2,
            letterSpacing: '-0.02em'
          }}
        >
          Confirm Your Style Vibe
        </h2>
        <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.5 }}>
          Verify the AI scanner details below and select your target hairstyle goal.
        </p>
      </div>

      {/* ── AI Portrait Scan Confirmation ────────────────────────────────────── */}
      <div 
        style={{ 
          background: '#EFF6FF', 
          border: '1.5px solid #BFDBFE', 
          borderRadius: '20px', 
          padding: '16px 20px', 
          marginBottom: '28px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px',
          boxShadow: '0 4px 12px rgba(37,99,235,0.02)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563EB', fontWeight: 800, fontSize: '12px', letterSpacing: '0.05em' }}>
          <Sparkle size={13} fill="#2563EB" /> AI PORTRAIT SCAN RESULT
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '14px', color: '#0F172A', fontWeight: 600 }}>
            Face Shape: <span style={{ color: '#2563EB', textTransform: 'capitalize', fontWeight: 800 }}>{faceAnalysis?.faceShape || 'oval'}</span>
          </div>
          
          <div style={{ fontSize: '14px', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
            <span>Hair Length:</span>
            <div style={{ display: 'flex', gap: '4px', background: '#FFFFFF', padding: '3px', borderRadius: '8px', border: '1px solid #BFDBFE' }}>
              {(['short', 'medium', 'long'] as const).map((len) => {
                const isSelectedLength = length === len;
                return (
                  <button
                    key={len}
                    type="button"
                    onClick={() => faceAnalysis && onFaceAnalysisChange({ ...faceAnalysis, detectedLength: len })}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      background: isSelectedLength ? '#2563EB' : 'transparent',
                      color: isSelectedLength ? '#FFFFFF' : '#64748B',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {len}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Service Select Tabs ────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '8px' }}>
          Select Service Category
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', background: '#F1F5F9', padding: '4px', borderRadius: '12px' }}>
          {[
            { id: 'Cut', label: 'Haircut', icon: Scissors },
            { id: 'Color', label: 'Color', icon: Palette },
            { id: 'Style', label: 'Styling', icon: Sparkles }
          ].map((tab) => {
            const isTabActive = service === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setService(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  background: isTabActive ? '#FFFFFF' : 'transparent',
                  color: isTabActive ? '#2563EB' : '#64748B',
                  boxShadow: isTabActive ? '0 2px 8px rgba(15,23,42,0.05)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Style Goals List (3 Options) ────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label style={{ fontSize: '13px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
          Choose Hairstyle Vibe
        </label>
        {dynamicGoals.map((goal, index) => {
          const isSelectedGoal = selected?.label === goal.label;
          return (
            <motion.button
              key={goal.label}
              id={`style-goal-${goal.id}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => onSelect({
                id: goal.id,
                label: goal.label,
                emoji: goal.emoji,
                icon: goal.icon,
                benefit: goal.benefit
              })}
              className={`card-clean text-left p-4 rounded-2xl relative ${isSelectedGoal ? 'card-clean-selected' : ''}`}
              style={{
                outline: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ fontSize: '24px', flexShrink: 0 }}>{goal.emoji}</div>
              
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: isSelectedGoal ? '#2563EB' : '#0F172A',
                    marginBottom: '4px',
                  }}
                >
                  {goal.label}
                </div>
                
                <div style={{ fontSize: '12px', lineHeight: 1.4, color: '#64748B' }}>
                  {goal.benefit}
                </div>
              </div>
              
              {isSelectedGoal && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#2563EB',
                    flexShrink: 0
                  }}
                >
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: '28px' }}
        >
          <button
            id="style-next-btn"
            onClick={onNext}
            className="btn-blue"
            style={{ width: '100%', padding: '16px', justifyContent: 'center' }}
          >
            Continue — Enter Your Info →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
