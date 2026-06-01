'use client';

import { Sparkles, Globe, Share2, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  const salonName = process.env.NEXT_PUBLIC_SALON_NAME || 'hair2000';
  const phone     = process.env.NEXT_PUBLIC_SALON_PHONE || '';
  const address   = process.env.NEXT_PUBLIC_SALON_ADDRESS || '';
  const year = new Date().getFullYear();

  return (
    <footer 
      style={{ 
        padding: '64px 24px 40px', 
        background: '#F8FAFF', 
        borderTop: '1.5px solid #E2E8F0',
        fontFamily: 'var(--font-poppins), Poppins, sans-serif'
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '40px', 
            justifyContent: 'space-between',
            marginBottom: '40px' 
          }}
        >
          {/* Brand Column */}
          <div style={{ flex: '1 1 280px', maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div 
                style={{ 
                  width: '36px', 
                  height: '36px', 
                  borderRadius: '10px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#FFFFFF', 
                  fontWeight: 800, 
                  fontSize: '15px',
                  background: 'linear-gradient(135deg,#2563EB,#1D4ED8)' 
                }}
              >
                h
              </div>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                hair<span style={{ color: '#2563EB' }}>2000</span>
              </span>
            </div>
            
            <p style={{ fontSize: '14px', fontWeight: 500, lineHeight: 1.6, color: '#334155', marginBottom: '20px' }}>
              Premium hair transformations powered by AI preview. Look great, book with confidence.
            </p>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              {[Globe, Share2].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#"
                  style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '10px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    transition: 'colors 0.2s',
                    background: '#EFF6FF', 
                    color: '#2563EB', 
                    border: '1.5px solid #BFDBFE' 
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div style={{ flex: '1 1 160px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563EB', marginBottom: '20px' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Try AI Preview', href: '#' },
                { label: 'Our Services', href: '#experience' },
                { label: 'FAQ', href: '#faq' },
                { label: 'Book a Stylist', href: '#' }
              ].map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    style={{ 
                      fontSize: '14px', 
                      fontWeight: 500, 
                      textDecoration: 'none', 
                      transition: 'color 0.2s',
                      color: '#334155' 
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#2563EB')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#334155')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div style={{ flex: '1 1 220px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563EB', marginBottom: '20px' }}>
              Contact
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {phone && (
                <li>
                  <a 
                    href={`tel:${phone}`} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      fontSize: '14px', 
                      fontWeight: 500, 
                      textDecoration: 'none', 
                      color: '#334155' 
                    }}
                  >
                    <Phone size={13} style={{ color: '#2563EB' }} />
                    {phone}
                  </a>
                </li>
              )}
              <li>
                <a 
                  href="mailto:hello@hair2000.com" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    fontSize: '14px', 
                    fontWeight: 500, 
                    textDecoration: 'none', 
                    color: '#334155' 
                  }}
                >
                  <Mail size={13} style={{ color: '#2563EB' }} />
                  hello@hair2000.com
                </a>
              </li>
              {address && (
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', fontWeight: 500, color: '#334155' }}>
                  <MapPin size={13} style={{ color: '#2563EB', marginTop: '3px', flexShrink: 0 }} />
                  {address}
                </li>
              )}
            </ul>
            <p style={{ fontSize: '12px', fontWeight: 500, marginTop: '20px', color: '#64748B' }}>
              Mon–Sat: 9AM–7PM · Sun: 10AM–5PM
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            gap: '12px', 
            paddingTop: '28px',
            borderTop: '1.5px solid #E2E8F0' 
          }}
        >
          <p style={{ fontSize: '12px', fontWeight: 500, color: '#64748B' }}>
            © {year} {salonName}. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a 
                key={l} 
                href="#" 
                style={{ 
                  fontSize: '12px', 
                  fontWeight: 500, 
                  textDecoration: 'none', 
                  color: '#64748B' 
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
