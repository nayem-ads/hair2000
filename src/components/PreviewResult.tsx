'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HairstyleResult, StyleGoal, FaceAnalysis } from '@/types';
import { Sparkles, Star, ChevronRight, Share2, Info } from 'lucide-react';

interface PreviewResultProps {
  results: HairstyleResult[];
  originalImage: string;
  styleGoal: StyleGoal;
  leadName: string;
  onBook: (result: HairstyleResult) => void;
  faceAnalysis: FaceAnalysis | null;
}

export function PreviewResult({
  results,
  originalImage,
  styleGoal,
  leadName,
  onBook,
  faceAnalysis,
}: PreviewResultProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = results[selectedIndex];

  const handleSendToPhone = () => {
    alert('📱 Feature coming soon! We\'ll send your preview to your phone after booking.');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        width: '100%',
        maxWidth: '540px',
        margin: '0 auto',
        padding: '0 16px',
        fontFamily: 'var(--font-poppins), Poppins, sans-serif'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '100px',
            background: '#EFF6FF',
            border: '1.5px solid #BFDBFE',
            marginBottom: '20px'
          }}
        >
          <Sparkles size={13} style={{ color: '#2563EB' }} />
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563EB' }}>
            3 LOOKS GENERATED
          </span>
        </motion.div>
        
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            fontWeight: 800,
            color: '#0F172A',
            marginBottom: '12px',
            lineHeight: 1.2,
            letterSpacing: '-0.02em'
          }}
        >
          Your AI Hair Preview{' '}
          <span style={{ color: '#2563EB', fontStyle: 'italic' }}>Is Ready</span>
        </h2>
        <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.5 }}>
          Hey {leadName}! Here are 3 styles designed for your face shape and &quot;{styleGoal.label}&quot; goal.
        </p>
      </div>

      {/* ── AI Portrait Scan Report Card ─────────────────────────────────────── */}
      {faceAnalysis && (
        <div 
          style={{ 
            background: '#EFF6FF', 
            border: '1.5px solid #BFDBFE', 
            borderRadius: '20px', 
            padding: '20px', 
            marginBottom: '24px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px',
            boxShadow: '0 4px 12px rgba(37,99,235,0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563EB', fontWeight: 800, fontSize: '12px', letterSpacing: '0.05em' }}>
            <Sparkles size={13} fill="#2563EB" /> AI PORTRAIT SCAN REPORT
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px' }}>
            <div style={{ fontSize: '13px', color: '#334155' }}>
              <strong>Face Shape:</strong> <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{faceAnalysis.faceShape}</span>
            </div>
            <div style={{ fontSize: '13px', color: '#334155' }}>
              <strong>Scanned Length:</strong> <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{faceAnalysis.detectedLength}</span>
            </div>
            <div style={{ fontSize: '13px', color: '#334155' }}>
              <strong>Hair Texture:</strong> <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{faceAnalysis.hairTexture}</span>
            </div>
            <div style={{ fontSize: '13px', color: '#334155' }}>
              <strong>Natural Color:</strong> <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{faceAnalysis.hairColor}</span>
            </div>
          </div>
          
          {faceAnalysis.advice && (
            <div style={{ borderTop: '1px solid #BFDBFE', paddingTop: '12px', marginTop: '4px' }}>
              <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#1E40AF', fontWeight: 500 }}>
                <strong style={{ color: '#2563EB', fontWeight: 700 }}>Stylist Advice:</strong> {faceAnalysis.advice}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Main comparison view */}
      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35 }}
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              marginBottom: '20px',
              border: '1.5px solid #E2E8F0',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
              background: '#FFFFFF'
            }}
          >
            {/* Before / After comparison */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={originalImage}
                  alt="Your original photo"
                  style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', filter: 'brightness(0.92)' }}
                />
                <div 
                  style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    padding: '12px', 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)' 
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E2E8F0' }}>
                    Before
                  </span>
                </div>
              </div>
              
              <div style={{ position: 'relative' }}>
                <img
                  src={selected.imageUrl}
                  alt={selected.title}
                  style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #2563EB, #60A5FA)'
                  }}
                />
                <div 
                  style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    padding: '12px', 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)' 
                  }}
                >
                  <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#60A5FA' }}>
                    AI Preview
                  </span>
                </div>
              </div>
            </div>

            {/* Selected result info */}
            <div style={{ padding: '24px', background: '#FFFFFF', borderTop: '1.5px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 850, color: '#0F172A', flex: 1 }}>
                  {selected.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '100px', background: '#EFF6FF', flexShrink: 0 }}>
                  <Star size={10} fill="#2563EB" stroke="none" />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563EB' }}>
                    {selected.confidence}% match
                  </span>
                </div>
              </div>
              
              <p style={{ fontSize: '14px', color: '#334155', lineHeight: 1.5, marginBottom: '16px', fontWeight: 500 }}>
                {selected.description}
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '100px',
                      background: '#F1F5F9',
                      color: '#475569'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: '#EFF6FF',
                  border: '1.5px solid #BFDBFE'
                }}
              >
                <Sparkles size={14} style={{ color: '#2563EB', flexShrink: 0 }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#1E40AF' }}>
                  Recommended: <strong style={{ color: '#2563EB' }}>{selected.recommendedService}</strong>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3 thumbnail selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
        {results.map((result, index) => (
          <motion.button
            key={result.id}
            id={`preview-option-${index + 1}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            onClick={() => setSelectedIndex(index)}
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              padding: 0,
              cursor: 'pointer',
              background: 'none',
              transition: 'all 0.2s ease',
              border: index === selectedIndex ? '2.5px solid #2563EB' : '2.5px solid transparent',
              boxShadow: index === selectedIndex ? '0 4px 14px rgba(37, 99, 235, 0.2)' : 'none',
            }}
          >
            <img
              src={result.imageUrl}
              alt={result.title}
              style={{
                width: '100%',
                aspectRatio: '3/4',
                objectFit: 'cover',
                display: 'block',
                filter: index === selectedIndex ? 'none' : 'brightness(0.7)'
              }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)', padding: '6px' }}>
              <p
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  textAlign: 'center',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: index === selectedIndex ? '#60A5FA' : '#CBD5E1'
                }}
              >
                Look {index + 1}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Stylist note */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          display: 'flex',
          gap: '12px',
          padding: '16px',
          borderRadius: '16px',
          marginBottom: '24px',
          background: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.02)',
          alignItems: 'flex-start'
        }}
      >
        <Info size={16} style={{ color: '#2563EB', flexShrink: 0, marginTop: '2px' }} />
        <p style={{ fontSize: '13px', lineHeight: 1.5, color: '#475569', fontWeight: 500 }}>
          Our stylists will adapt this look to your specific hair type, texture, and goals. Bring your previews to your booking!
        </p>
      </motion.div>

      {/* CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <motion.button
          id="book-look-btn"
          onClick={() => onBook(selected)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-blue"
          style={{ width: '100%', padding: '16px', justifyContent: 'center' }}
        >
          Book This Look With a Stylist
          <ChevronRight size={16} />
        </motion.button>

        <motion.button
          id="send-preview-btn"
          onClick={handleSendToPhone}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="btn-outline-blue"
          style={{ width: '100%', padding: '16px', justifyContent: 'center' }}
        >
          <Share2 size={15} />
          Send Preview to My Phone
        </motion.button>
      </div>
    </motion.div>
  );
}
