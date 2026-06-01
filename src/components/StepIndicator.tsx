'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Upload Selfie' },
  { id: 2, label: 'Choose Style' },
  { id: 3, label: 'Your Info' },
  { id: 4, label: 'Preview' },
];

interface StepIndicatorProps {
  currentStep: number; // 1-4
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        padding: '0 16px',
        fontFamily: 'var(--font-poppins), Poppins, sans-serif'
      }}
    >
      {STEPS.map((step, index) => {
        const isDone = step.id < currentStep;
        const isActive = step.id === currentStep;

        return (
          <div 
            key={step.id} 
            style={{ 
              display: 'flex', 
              alignItems: 'center',
              flex: index < STEPS.length - 1 ? 1 : 'none'
            }}
          >
            {/* Step circle & label container */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.12 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isDone
                    ? '#EFF6FF'
                    : isActive
                    ? 'linear-gradient(135deg, #2563EB, #1D4ED8)'
                    : '#FFFFFF',
                  border: isDone
                    ? '1.5px solid #BFDBFE'
                    : isActive
                    ? 'none'
                    : '1.5px solid #E2E8F0',
                  boxShadow: isActive ? '0 4px 12px rgba(37, 99, 235, 0.25)' : 'none',
                  cursor: 'default',
                  zIndex: 2,
                }}
              >
                {isDone ? (
                  <Check size={14} style={{ color: '#2563EB' }} strokeWidth={3} />
                ) : (
                  <span
                    style={{ 
                      fontSize: '12px', 
                      fontWeight: 600,
                      color: isActive ? '#FFFFFF' : '#94A3B8'
                    }}
                  >
                    {step.id}
                  </span>
                )}
              </motion.div>

              <span
                style={{
                  fontSize: '10px',
                  fontWeight: isActive || isDone ? 700 : 500,
                  marginTop: '8px',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                  color: isActive ? '#2563EB' : isDone ? '#475569' : '#94A3B8',
                }}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < STEPS.length - 1 && (
              <div style={{ flex: 1, margin: '0 8px', marginBottom: '22px' }}>
                <div
                  style={{
                    height: '2px',
                    borderRadius: '1px',
                    transition: 'all 0.4s ease',
                    background: isDone
                      ? 'linear-gradient(90deg, #2563EB, #60A5FA)'
                      : '#E2E8F0',
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
