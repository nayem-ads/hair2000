'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Clock, Sparkles, Zap, Lock, Phone } from 'lucide-react';

/* ─── Framer variants ────────────────────────────────────────────────────── */
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } } };
const fadeUp  = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } } };

/* ─── Animated counter ───────────────────────────────────────────────────── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let v = 0; const s = to / 38;
    const t = setInterval(() => { v += s; if (v >= to) { setN(to); clearInterval(t); } else setN(Math.floor(v)); }, 28);
    return () => clearInterval(t);
  }, [to]);
  return <>{n}{suffix}</>;
}

/* ─── 3-D tilt card ──────────────────────────────────────────────────────── */
function Tilt({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 22 });
  const sy = useSpring(my, { stiffness: 150, damping: 22 });
  const rX = useTransform(sy, [-1, 1], [8, -8]);
  const rY = useTransform(sx, [-1, 1], [-8, 8]);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d', ...style }}>
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
export function HeroSection({ onStart }: { onStart: () => void }) {
  const [hov, setHov] = useState(false);

  return (
    <section style={{ position: 'relative', minHeight: '100vh', background: '#fff',
      display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>

      {/* Dot grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(#DBEAFE 1.2px, transparent 1.2px)',
        backgroundSize: '28px 28px', opacity: 0.6 }} />
      {/* Orb top-right */}
      <div style={{ position: 'absolute', top: -180, right: -180, width: 560, height: 560,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 68%)',
        pointerEvents: 'none', zIndex: 0 }} />
      {/* Orb bottom-left */}
      <div style={{ position: 'absolute', bottom: -120, left: -120, width: 400, height: 400,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0 }} />

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <motion.nav initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'relative', zIndex: 20, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '20px 24px', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: 'linear-gradient(135deg,#2563EB,#1D4ED8)',
            color: '#fff', fontWeight: 800, fontSize: 15 }}>h</div>
          <span style={{ fontWeight: 800, fontSize: 20, color: '#0F172A', letterSpacing: '-0.02em' }}>
            hair<span style={{ color: '#2563EB' }}>2000</span>
          </span>
        </div>
        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <motion.a 
            href="tel:+14154534945" 
            id="nav-call-btn" 
            whileHover={{ scale: 1.04 }} 
            whileTap={{ scale: 0.97 }}
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px', 
              fontWeight: 700, 
              padding: '8px 16px', 
              borderRadius: '10px', 
              cursor: 'pointer',
              background: '#EFF6FF', 
              color: '#2563EB', 
              border: '1.5px solid #BFDBFE',
              textDecoration: 'none'
            }}
          >
            <Phone size={13} style={{ color: '#2563EB' }} fill="#2563EB" />
            <span className="hidden sm:inline">Call Now: +1 (415) 453-4945</span>
            <span className="inline sm:hidden">Call Now</span>
          </motion.a>
        </div>
      </motion.nav>

      {/* ── Hero body ────────────────────────────────────────────────────── */}
      <motion.div variants={stagger} initial="hidden" animate="show"
        style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          padding: '8px 24px 48px', maxWidth: 960, margin: '0 auto', width: '100%' }}>

        {/* Badge */}
        <motion.div variants={fadeUp}>
          <motion.div whileHover={{ scale: 1.05 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
              borderRadius: 100, marginBottom: 28, cursor: 'default',
              background: 'rgba(37,99,235,0.06)', border: '1.5px solid rgba(37,99,235,0.18)' }}>
            <motion.span animate={{ rotate: [0, 14, -14, 0] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}>
              <Sparkles size={13} style={{ color: '#2563EB' }} />
            </motion.span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2563EB' }}>
              Powered by Hair2000
            </span>
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={fadeUp}
          style={{ fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 20,
            fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', color: '#0F172A' }}>
          See Your New Look{' '}
          <motion.span style={{ color: '#2563EB', display: 'inline-block' }}
            animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 3.5, repeat: Infinity }}>
            Before
          </motion.span>
          <br />
          You Ever <span style={{ color: '#2563EB' }}>Book</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p variants={fadeUp}
          style={{ fontSize: 17, fontWeight: 500, color: '#64748B', marginBottom: 32,
            lineHeight: 1.6, maxWidth: 440 }}>
          Upload a selfie · Get 5 AI hairstyle previews · Book what you love with total confidence
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <motion.button id="hero-cta-btn" onClick={onStart}
            onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
            style={{ position: 'relative', overflow: 'hidden', display: 'inline-flex', alignItems: 'center',
              gap: 10, fontWeight: 700, color: '#fff', fontSize: 16, padding: '15px 36px',
              borderRadius: 14, border: 'none', cursor: 'pointer', letterSpacing: '-0.01em',
              background: 'linear-gradient(135deg,#2563EB,#1D4ED8)',
              boxShadow: '0 8px 28px rgba(37,99,235,0.38)' }}>
            <motion.div style={{ position: 'absolute', inset: 0,
              background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.22) 50%,transparent 70%)' }}
              animate={{ x: hov ? ['100%','-100%'] : '100%' }} transition={{ duration: 0.55 }} />
            <span style={{ position: 'relative', zIndex: 1 }}>Try My Hair Preview Free</span>
            <motion.span style={{ position: 'relative', zIndex: 1 }}
              animate={{ x: hov ? 5 : 0 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
              <ArrowRight size={18} strokeWidth={2.5} />
            </motion.span>
          </motion.button>
          <p style={{ fontSize: 12, fontWeight: 500, color: '#94A3B8' }}>
            Free · No account required · Results in ~60 seconds
          </p>
        </motion.div>

        {/* Trust pills */}
        <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: 10,
          justifyContent: 'center', marginBottom: 48 }}>
          {[
            { Icon: Lock,        t: 'Private & Secure' },
            { Icon: Sparkles,    t: '5 AI Looks'       },
            { Icon: Clock,       t: '~60 Seconds'      },
            { Icon: ShieldCheck, t: 'No Commitment'    },
          ].map(({ Icon, t }, i) => (
            <motion.div key={t} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.07 }} whileHover={{ scale: 1.06, y: -1 }}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px',
                borderRadius: 100, background: '#fff', border: '1.5px solid #E2E8F0',
                color: '#475569', fontSize: 12, fontWeight: 600, cursor: 'default',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <Icon size={11} style={{ color: '#2563EB' }} />
              {t}
            </motion.div>
          ))}
        </motion.div>

        {/* ── Before / After cards ──────────────────────────────────────── */}
        <motion.div variants={fadeUp} id="how-it-works"
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            gap: 20, width: '100%', perspective: 900, marginBottom: 20 }}>

          {/* BEFORE */}
          <Tilt>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 148, borderRadius: 18, overflow: 'hidden', flexShrink: 0,
                border: '2px solid #E2E8F0', background: '#fff',
                boxShadow: '0 8px 28px rgba(0,0,0,0.09)', transform: 'rotate(-4deg)' }}>
              <div style={{ height: 184, overflow: 'hidden', background: '#F1F5F9' }}>
                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=380&fit=crop&crop=face&q=80"
                  alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.85) brightness(0.94)' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', background: '#F8FAFF' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#CBD5E1' }} />
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94A3B8' }}>Before</span>
              </div>
            </motion.div>
          </Tilt>

          {/* AI badge */}
          <motion.div animate={{ scale: [1, 1.1, 1], y: [0, -5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              paddingBottom: 32, flexShrink: 0 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center',
              justifyContent: 'center', background: 'linear-gradient(135deg,#2563EB,#1D4ED8)',
              boxShadow: '0 6px 24px rgba(37,99,235,0.45)' }}>
              <Zap size={22} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.1em', color: '#2563EB' }}>AI</span>
          </motion.div>

          {/* AFTER */}
          <Tilt>
            <motion.div animate={{ y: [0, -11, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{ width: 168, borderRadius: 18, overflow: 'hidden', flexShrink: 0, position: 'relative',
                border: '2.5px solid #2563EB', background: '#fff',
                boxShadow: '0 16px 48px rgba(37,99,235,0.26), 0 4px 12px rgba(0,0,0,0.08)',
                transform: 'rotate(3deg)' }}>
              {/* Blue top line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, zIndex: 10,
                background: 'linear-gradient(90deg,#2563EB,#60A5FA,#2563EB)' }} />
              {/* ✓ Badge */}
              <motion.div animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ position: 'absolute', top: -10, right: -10, width: 28, height: 28,
                  borderRadius: '50%', background: 'linear-gradient(135deg,#2563EB,#1D4ED8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 12, fontWeight: 800, zIndex: 20,
                  boxShadow: '0 4px 12px rgba(37,99,235,0.5)' }}>✓</motion.div>
              <div style={{ height: 210, overflow: 'hidden', background: '#EFF6FF' }}>
                <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=400&fit=crop&crop=face&q=80"
                  alt="AI Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 12px', background: '#EFF6FF' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB' }} />
                  <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2563EB' }}>AI Preview</span>
                </div>
                <Sparkles size={10} style={{ color: '#2563EB' }} />
              </div>
            </motion.div>
          </Tilt>
        </motion.div>

        {/* Caption */}
        <motion.p variants={fadeUp} style={{ fontSize: 11, fontWeight: 500, color: '#CBD5E1', marginBottom: 44 }}>
          Sample preview · Your actual photo will be used
        </motion.p>

        {/* Stats */}
        <motion.div variants={fadeUp} style={{ display: 'flex', width: '100%', maxWidth: 380, margin: '0 auto',
          borderRadius: 16, overflow: 'hidden', border: '1.5px solid #E2E8F0', background: '#fff',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          {[
            { to: 5,   suffix: '',   label: 'AI looks per session' },
            { to: 60,  suffix: 's',  label: 'average generation'   },
            { to: 100, suffix: '%',  label: 'free to preview'      },
          ].map((s, i) => (
            <motion.div key={s.label} whileHover={{ background: '#F8FAFF' }}
              style={{ flex: 1, textAlign: 'center', padding: '16px 8px', cursor: 'default',
                borderRight: i < 2 ? '1.5px solid #E2E8F0' : 'none' }}>
              <div style={{ fontWeight: 900, fontSize: 26, color: '#2563EB', letterSpacing: '-0.03em', lineHeight: 1 }}>
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#94A3B8', marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}
