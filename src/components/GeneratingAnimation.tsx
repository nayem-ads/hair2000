'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles, Brain, Wand2, Palette, Scissors } from 'lucide-react';

const GENERATION_STEPS = [
  { icon: Brain, label: 'Analyzing face shape & proportions' },
  { icon: Sparkles, label: 'Reading hair texture & color tone' },
  { icon: Palette, label: 'Crafting 3 tailored style options' },
  { icon: Wand2, label: 'Generating previews with AI Engine' },
  { icon: Scissors, label: 'Finalizing your personalized report' },
];

interface GeneratingAnimationProps {
  styleGoalLabel?: string;
}

export function GeneratingAnimation({ styleGoalLabel }: GeneratingAnimationProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 45000; // 45 seconds expected duration

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const ratio = elapsed / duration;
      
      let easeProgress = 0;
      if (ratio < 0.15) {
        // Fast start: first 15% of time goes to 45% progress
        easeProgress = ratio * 300;
      } else if (ratio < 0.6) {
        // Steady middle: next 45% of time goes from 45% to 80% progress
        easeProgress = 45 + ((ratio - 0.15) / 0.45) * 35;
      } else {
        // Slow end: last 40% of time creeps from 80% to 99%
        easeProgress = 80 + ((ratio - 0.6) / 0.4) * 19;
      }
      
      setProgress(Math.min(99, Math.floor(easeProgress)));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Sticky top progress bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #E2E8F0',
        padding: '12px 16px',
        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-poppins), Poppins, sans-serif'
      }}>
        <div style={{ width: '100%', maxWidth: '600px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap' }}>
            Generating Previews
          </span>
          <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: '#E2E8F0', overflow: 'hidden' }}>
            <div 
              style={{ 
                width: `${progress}%`, 
                height: '100%', 
                background: 'linear-gradient(90deg, #2563EB, #60A5FA)', 
                borderRadius: '4px', 
                transition: 'width 0.3s ease-out' 
              }} 
            />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#2563EB', minWidth: '42px', textAlign: 'right' }}>
            {progress}%
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '64px 16px',
          fontFamily: 'var(--font-poppins), Poppins, sans-serif'
        }}
      >
        {/* Progress percentage bar - Highly visible at the top of the card */}
        <div 
          style={{ 
            marginBottom: '32px', 
            width: '100%', 
            maxWidth: '320px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px', 
            alignItems: 'center' 
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 4px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>
              Analyzing & generating styles...
            </span>
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#2563EB' }}>
              {progress}%
            </span>
          </div>
          <div 
            style={{ 
              width: '100%', 
              height: '8px', 
              borderRadius: '4px', 
              overflow: 'hidden', 
              background: '#E2E8F0', 
              border: '1.5px solid #BFDBFE' 
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, #2563EB, #60A5FA)',
                transition: 'width 0.3s ease-out'
              }}
            />
          </div>
        </div>

        {/* Spinning rings */}
        <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Outer ring */}
          <div
            className="rotate-ring"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid transparent',
              borderTopColor: '#2563EB',
              borderRightColor: 'rgba(37, 99, 235, 0.2)',
            }}
          />
          {/* Middle ring */}
          <div
            className="counter-rotate"
            style={{
              position: 'absolute',
              inset: '10px',
              borderRadius: '50%',
              border: '2px solid transparent',
              borderTopColor: '#60A5FA',
              borderLeftColor: 'rgba(96, 165, 250, 0.2)',
            }}
          />
          {/* Inner ring */}
          <div
            className="rotate-ring"
            style={{
              position: 'absolute',
              inset: '20px',
              borderRadius: '50%',
              border: '1.5px solid transparent',
              borderTopColor: '#1D4ED8',
              borderBottomColor: 'rgba(29, 78, 216, 0.2)',
              animationDuration: '1.5s',
            }}
          />
          {/* Center icon */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Sparkles size={28} style={{ color: '#2563EB' }} />
          </motion.div>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 800,
            color: '#0F172A',
            textAlign: 'center',
            marginBottom: '8px',
            letterSpacing: '-0.01em'
          }}
        >
          Creating Your{' '}
          <span style={{ color: '#2563EB', fontStyle: 'italic' }}>
            {styleGoalLabel ? `${styleGoalLabel} ` : ''}Previews
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: '14px',
            color: '#334155',
            textAlign: 'center',
            marginBottom: '24px',
            fontWeight: 500
          }}
        >
          AI is scanning features · matching 3 custom looks...
        </motion.p>

        {/* Step list */}
        <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {GENERATION_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: [0, 1, 1, 0.4] }}
                transition={{
                  duration: 3,
                  delay: index * 0.6,
                  repeat: Infinity,
                  repeatDelay: GENERATION_STEPS.length * 0.6,
                  times: [0, 0.1, 0.7, 1],
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  background: '#FFFFFF',
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.02)'
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    background: '#EFF6FF'
                  }}
                >
                  <Icon size={15} style={{ color: '#2563EB' }} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#475569' }}>
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
