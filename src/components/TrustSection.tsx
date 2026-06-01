'use client';

import { motion } from 'framer-motion';
import { Award, Sparkles, Heart, Leaf, Coffee, Star } from 'lucide-react';

const FEATURES = [
  { icon: Award,    title: 'Expert Stylists',          desc: 'Years of expertise in cut, color, and texture at every appointment.' },
  { icon: Sparkles, title: 'Personalized Consultation', desc: 'Every visit begins with a 1-on-1 to understand your unique hair goals.' },
  { icon: Heart,    title: 'Premium Experience',        desc: 'From the first step in, expect a relaxing, high-end salon experience.' },
  { icon: Leaf,     title: 'Pro-Grade Products',        desc: 'Only professional, nourishing products that protect and enhance your hair.' },
  { icon: Coffee,   title: 'Complimentary Amenities',   desc: 'Enjoy beverages, WiFi, and a calm, welcoming environment every time.' },
  { icon: Star,     title: 'Satisfaction Guaranteed',   desc: 'We make sure you walk out feeling amazing — every single visit.' },
];

export function TrustSection() {
  return (
    <section 
      id="experience"
      style={{ 
        padding: '80px 24px', 
        background: '#F8FAFF', 
        fontFamily: 'var(--font-poppins), Poppins, sans-serif' 
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} 
          style={{ textAlign: 'center', marginBottom: '48px' }}
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
            <Heart size={12} style={{ color: '#2563EB' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563EB' }}>
              The hair2000 Experience
            </span>
          </div>
          
          <h2 
            style={{ 
              fontSize: 'clamp(2rem, 5vw, 2.75rem)', 
              fontWeight: 800,
              color: '#0F172A', 
              letterSpacing: '-0.02em',
              marginBottom: '16px',
              lineHeight: 1.2
            }}
          >
            More Than a Haircut —{' '}
            <span style={{ color: '#2563EB' }}>A Full Experience</span>
          </h2>
          
          <p 
            style={{ 
              fontSize: '16px', 
              fontWeight: 500, 
              color: '#334155', // darker text color for contrast
              maxWidth: '540px', 
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Professional styling, personalized consultation, and a relaxing visit — every time.
          </p>
        </motion.div>

        {/* Grid */}
        <div 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '20px', 
            justifyContent: 'center' 
          }}
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div 
                key={f.title}
                initial={{ opacity: 0, y: 18 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} 
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(37,99,235,0.08)' }}
                style={{ 
                  flex: '1 1 290px',
                  maxWidth: '320px',
                  padding: '24px', 
                  borderRadius: '20px',
                  background: '#FFFFFF',
                  border: '1.5px solid #E2E8F0', 
                  transition: 'box-shadow 0.25s, transform 0.25s',
                  boxSizing: 'border-box'
                }}
              >
                <div 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: '16px',
                    background: '#EFF6FF' 
                  }}
                >
                  <Icon size={18} style={{ color: '#2563EB' }} />
                </div>
                
                <h3 
                  style={{ 
                    fontSize: '16px',
                    fontWeight: 700, 
                    color: '#0F172A',
                    marginBottom: '8px'
                  }}
                >
                  {f.title}
                </h3>
                
                <p 
                  style={{ 
                    fontSize: '13.5px', 
                    lineHeight: 1.6, 
                    fontWeight: 500,
                    color: '#334155' // darker text color for contrast
                  }}
                >
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
