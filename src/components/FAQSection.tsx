'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  { id: 'accuracy',    q: 'Is the AI preview 100% accurate?',
    a: 'No — and that\'s okay. It\'s a visual guide to explore ideas. Your stylist will fine-tune the final look based on your real hair texture, density, face shape, and color goals.' },
  { id: 'booking',     q: 'Do I have to book after the preview?',
    a: 'Not at all. The preview is completely free with no obligation. But if you love a look, booking a consultation is the best way to make it a reality.' },
  { id: 'photo',       q: 'Is my photo stored?',
    a: 'Your photo is only used to generate your preview. In this version, it is not permanently stored on our servers.' },
  { id: 'stylist',     q: 'Can a stylist help me pick the right look?',
    a: 'Yes — bring your AI preview to your appointment and your stylist will use it as a starting point for a personalized consultation.' },
  { id: 'how',         q: 'How does the AI preview work?',
    a: 'You upload a selfie, pick a style goal, and our AI analyzes your face shape, hair texture, and tone to generate 3 personalized hairstyle previews.' },
  { id: 'cost',        q: 'How much does it cost?',
    a: 'The AI hair preview is 100% free. No credit card, no signup — just your photo and style goal.' },
];

function FAQItem({ q, a, id }: { q: string; a: string; id: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div 
      layout 
      style={{ 
        border: '1.5px solid #E2E8F0',
        borderRadius: '16px',
        background: '#FFFFFF',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <button 
        id={`faq-${id}`} 
        onClick={() => setOpen(p => !p)}
        style={{
          width: '100%',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          padding: '20px 24px',
          textAlign: 'left',
          outline: 'none'
        }}
      >
        <span 
          style={{ 
            fontSize: '15px', 
            fontWeight: 700, 
            color: '#0F172A',
            lineHeight: 1.4
          }}
        >
          {q}
        </span>
        <motion.span 
          animate={{ rotate: open ? 180 : 0 }} 
          transition={{ duration: 0.22 }} 
          style={{ display: 'flex', flexShrink: 0, marginTop: '2px' }}
        >
          <ChevronDown size={18} style={{ color: '#2563EB' }} />
        </motion.span>
      </button>
      
      <AnimatePresence initial={false}>
        {open && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p 
              style={{ 
                padding: '0 24px 20px 24px', 
                fontSize: '14px', 
                lineHeight: 1.6, 
                fontWeight: 500,
                color: '#334155', // darker text color for contrast
                borderTop: '1px solid #F1F5F9', 
                paddingTop: '16px' 
              }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <section 
      id="faq"
      style={{ 
        padding: '80px 24px', 
        background: '#FFFFFF',
        fontFamily: 'var(--font-poppins), Poppins, sans-serif'
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 18 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} 
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '6px 16px', 
              borderRadius: '100px', 
              marginBottom: '20px',
              background: 'rgba(37,99,235,0.06)', 
              border: '1.5px solid rgba(37,99,235,0.15)' 
            }}
          >
            <HelpCircle size={12} style={{ color: '#2563EB' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563EB' }}>
              FAQ
            </span>
          </div>
          
          <h2 
            style={{ 
              fontSize: 'clamp(2rem, 5vw, 2.5rem)', 
              fontWeight: 800,
              color: '#0F172A', 
              letterSpacing: '-0.025em',
              lineHeight: 1.2
            }}
          >
            Common Questions
          </h2>
        </motion.div>
        
        {/* FAQ list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', boxSizing: 'border-box' }}>
          {FAQS.map((f, i) => (
            <motion.div 
              key={f.id} 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} 
              transition={{ delay: i * 0.05 }}
              style={{ width: '100%' }}
            >
              <FAQItem {...f} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
