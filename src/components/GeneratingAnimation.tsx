'use client';

import { motion } from 'framer-motion';
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
  return (
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
      {/* Spinning rings */}
      <div style={{ position: 'relative', width: '144px', height: '144px', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            inset: '12px',
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
            inset: '24px',
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
          <Sparkles size={32} style={{ color: '#2563EB' }} />
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
          marginBottom: '40px',
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

      {/* Shimmer progress bar */}
      <div style={{ marginTop: '40px', width: '100%', maxWidth: '320px', height: '4px', borderRadius: '2px', overflow: 'hidden', background: '#E2E8F0' }}>
        <motion.div
          style={{
            height: '100%',
            borderRadius: '2px',
            background: 'linear-gradient(90deg, #2563EB, #60A5FA, #2563EB)'
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}
