'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { LeadData } from '@/types';
import { Sparkles, Lock } from 'lucide-react';

const SERVICES = [
  'Haircut',
  'Hair Color',
  'Highlights',
  'Blowout',
  'Hair Treatment',
  'Not sure yet',
];

interface LeadCaptureFormProps {
  onSubmit: (leadData: LeadData) => void;
  isLoading: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  preferredService?: string;
}

function validatePhone(phone: string): boolean {
  return /^[\+]?[\d\s\-\(\)]{7,15}$/.test(phone.trim());
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function LeadCaptureForm({ onSubmit, isLoading }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredService: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (formData.email && !validateEmail(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.preferredService) errs.preferredService = 'Please select a service';
    return errs;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      // Re-validate on change after first touch
      const newErrors = validate();
      setErrors((prev) => ({ ...prev, [field]: newErrors[field as keyof FormErrors] }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate();
    setErrors((prev) => ({ ...prev, [field]: newErrors[field as keyof FormErrors] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, phone: true, email: true, preferredService: true };
    setTouched(allTouched);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const leadData: LeadData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      preferredService: formData.preferredService,
      submittedAt: new Date().toISOString(),
    };
    onSubmit(leadData);
  };

  const salonName = process.env.NEXT_PUBLIC_SALON_NAME || 'hair2000';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        padding: '0 16px',
        fontFamily: 'var(--font-poppins), Poppins, sans-serif'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
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
          Almost There!
        </h2>
        <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.5 }}>
          Enter your info and we&apos;ll generate your personalized 5-look AI preview.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Name */}
        <div>
          <label style={{ fontSize: '14px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '8px' }}>
            Your Name <span style={{ color: '#2563EB' }}>*</span>
          </label>
          <input
            id="lead-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            placeholder="First name"
            className="input-clean"
            autoComplete="given-name"
          />
          {errors.name && touched.name && (
            <p style={{ fontSize: '12px', marginTop: '6px', color: '#DC2626' }}>{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label style={{ fontSize: '14px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '8px' }}>
            Phone Number <span style={{ color: '#2563EB' }}>*</span>
          </label>
          <input
            id="lead-phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            placeholder="(555) 000-0000"
            className="input-clean"
            autoComplete="tel"
          />
          {errors.phone && touched.phone && (
            <p style={{ fontSize: '12px', marginTop: '6px', color: '#DC2626' }}>{errors.phone}</p>
          )}
        </div>

        {/* Email (optional) */}
        <div>
          <label style={{ fontSize: '14px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '8px' }}>
            Email{' '}
            <span style={{ fontSize: '12px', fontWeight: 500, color: '#64748B' }}>
              (optional — sends preview to inbox)
            </span>
          </label>
          <input
            id="lead-email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="your@email.com"
            className="input-clean"
            autoComplete="email"
          />
          {errors.email && touched.email && (
            <p style={{ fontSize: '12px', marginTop: '6px', color: '#DC2626' }}>{errors.email}</p>
          )}
        </div>

        {/* Service */}
        <div>
          <label style={{ fontSize: '14px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '8px' }}>
            Interested In <span style={{ color: '#2563EB' }}>*</span>
          </label>
          <div style={{ position: 'relative' }}>
            <select
              id="lead-service"
              value={formData.preferredService}
              onChange={(e) => handleChange('preferredService', e.target.value)}
              onBlur={() => handleBlur('preferredService')}
              className="input-clean"
              style={{ appearance: 'none', WebkitAppearance: 'none' }}
            >
              <option value="" disabled>Select a service...</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748B' }}>
              ▼
            </div>
          </div>
          {errors.preferredService && touched.preferredService && (
            <p style={{ fontSize: '12px', marginTop: '6px', color: '#DC2626' }}>
              {errors.preferredService}
            </p>
          )}
        </div>

        {/* Privacy note */}
        <div style={{ display: 'flex', gap: '8px', paddingTop: '4px', alignItems: 'flex-start' }}>
          <Lock size={14} style={{ color: '#64748B', marginTop: '2px', flexShrink: 0 }} />
          <p style={{ fontSize: '12px', lineHeight: 1.5, color: '#64748B' }}>
            Your info is only used to send previews and coordinate your {salonName} consultation. We value your privacy.
          </p>
        </div>

        {/* Submit */}
        <motion.button
          id="generate-preview-btn"
          type="submit"
          disabled={isLoading}
          whileTap={{ scale: 0.98 }}
          className="btn-blue"
          style={{ 
            width: '100%', 
            padding: '16px', 
            justifyContent: 'center', 
            marginTop: '8px',
            opacity: isLoading ? 0.6 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          <Sparkles size={16} />
          {isLoading ? 'Generating Your Previews...' : 'Generate My Preview'}
        </motion.button>
      </form>
    </motion.div>
  );
}
