'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HairstyleResult, BookingData } from '@/types';
import { X, Calendar, Clock, Scissors, MessageSquare, ChevronRight } from 'lucide-react';

const BOOKING_SERVICES = [
  'Haircut',
  'Hair Color',
  'Highlights',
  'Blowout',
  'Hair Treatment',
  'Stylist Consultation',
  'Not sure yet',
];

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedResult?: HairstyleResult | null;
  leadName?: string;
  leadPhone?: string;
  leadEmail?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  selectedResult,
  leadName = '',
  leadPhone = '',
  leadEmail = '',
}: BookingModalProps) {
  const [formData, setFormData] = useState<BookingData>({
    name: leadName,
    phone: leadPhone,
    email: leadEmail,
    preferredDate: '',
    preferredTime: '',
    service: selectedResult?.recommendedService || '',
    notes: '',
    selectedStyleId: selectedResult?.id,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const externalBookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;
  const salonName = process.env.NEXT_PUBLIC_SALON_NAME || 'hair2000';
  const salonPhone = process.env.NEXT_PUBLIC_SALON_PHONE || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.preferredDate || !formData.preferredTime || !formData.service) {
      return;
    }

    setIsLoading(true);

    // If external booking URL exists, redirect there
    if (externalBookingUrl) {
      window.open(externalBookingUrl, '_blank');
      setIsLoading(false);
      return;
    }

    // TODO: Connect to booking system here
    console.log('📅 Booking Request:', formData);

    await new Promise((resolve) => setTimeout(resolve, 1200)); // Simulate API call

    setIsLoading(false);
    setIsSubmitted(true);
  };

  // Get min date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ 
              position: 'fixed', 
              inset: 0, 
              zIndex: 40, 
              background: 'rgba(15, 23, 42, 0.4)', 
              backdropFilter: 'blur(4px)' 
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              fontFamily: 'var(--font-poppins), Poppins, sans-serif'
            }}
            className="md:inset-0 md:p-6"
          >
            <div
              style={{
                width: '100%',
                maxWidth: '480px',
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                boxShadow: '0 20px 50px rgba(15, 23, 42, 0.15)',
                maxHeight: '92vh',
                overflowY: 'auto',
                boxSizing: 'border-box'
              }}
              className="rounded-t-3xl md:rounded-3xl"
            >
              {/* Blue top bar */}
              <div
                style={{ 
                  height: '4px', 
                  width: '100%', 
                  background: 'linear-gradient(90deg, #2563EB, #60A5FA, #2563EB)' 
                }}
              />

              <div style={{ padding: '24px' }} className="md:p-8">
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div>
                    <h3
                      style={{ 
                        fontSize: 'clamp(1.25rem, 5vw, 1.75rem)', 
                        fontWeight: 800, 
                        color: '#0F172A',
                        lineHeight: 1.2
                      }}
                    >
                      {isSubmitted ? '🎉 Booking Confirmed!' : 'Book Your Style'}
                    </h3>
                    {!isSubmitted && (
                      <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                        Reserve your spot at {salonName}
                      </p>
                    )}
                  </div>
                  <button
                    id="booking-modal-close"
                    onClick={onClose}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#F1F5F9',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <X size={15} style={{ color: '#64748B' }} />
                  </button>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', padding: '24px 0' }}
                  >
                    <div
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        background: 'linear-gradient(135deg, #2563EB, #1D4ED8)'
                      }}
                    >
                      <Scissors size={28} style={{ color: '#FFFFFF' }} />
                    </div>
                    
                    <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                      We Can&apos;t Wait to See You!
                    </h4>
                    
                    <p style={{ fontSize: '14px', lineHeight: 1.5, color: '#475569', marginBottom: '24px' }}>
                      Your booking request has been received. A member of our team will contact you to
                      confirm your appointment time within 24 hours.
                    </p>
                    
                    {salonPhone && (
                      <p style={{ fontSize: '13px', color: '#64748B' }}>
                        Need immediate help? Call us at{' '}
                        <a
                          href={`tel:${salonPhone}`}
                          style={{ color: '#2563EB', fontWeight: 600, textDecoration: 'none' }}
                        >
                          {salonPhone}
                        </a>
                      </p>
                    )}
                    
                    <button
                      id="booking-done-btn"
                      onClick={onClose}
                      className="btn-blue"
                      style={{ marginTop: '28px', padding: '12px 36px' }}
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <>
                    {/* Selected look preview */}
                    {selectedResult && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px',
                          borderRadius: '16px',
                          marginBottom: '20px',
                          background: '#EFF6FF',
                          border: '1.5px solid #BFDBFE'
                        }}
                      >
                        <img
                          src={selectedResult.imageUrl}
                          alt={selectedResult.title}
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '10px',
                            objectFit: 'cover'
                          }}
                        />
                        <div>
                          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748B', marginBottom: '2px' }}>
                            SELECTED LOOK
                          </p>
                          <p style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
                            {selectedResult.title}
                          </p>
                          <p style={{ fontSize: '12px', color: '#2563EB', fontWeight: 500 }}>
                            {selectedResult.recommendedService}
                          </p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {/* Name */}
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
                          Name <span style={{ color: '#2563EB' }}>*</span>
                        </label>
                        <input
                          id="booking-name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                          placeholder="Your name"
                          required
                          className="input-clean"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
                          Phone <span style={{ color: '#2563EB' }}>*</span>
                        </label>
                        <input
                          id="booking-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                          placeholder="(555) 000-0000"
                          required
                          className="input-clean"
                        />
                      </div>

                      {/* Date & Time */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
                            <Calendar size={11} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} />
                            Date <span style={{ color: '#2563EB' }}>*</span>
                          </label>
                          <input
                            id="booking-date"
                            type="date"
                            min={today}
                            value={formData.preferredDate}
                            onChange={(e) => setFormData((p) => ({ ...p, preferredDate: e.target.value }))}
                            required
                            className="input-clean"
                          />
                        </div>
                        
                        <div>
                          <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
                            <Clock size={11} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} />
                            Time <span style={{ color: '#2563EB' }}>*</span>
                          </label>
                          <div style={{ position: 'relative' }}>
                            <select
                              id="booking-time"
                              value={formData.preferredTime}
                              onChange={(e) => setFormData((p) => ({ ...p, preferredTime: e.target.value }))}
                              required
                              className="input-clean"
                              style={{ appearance: 'none', WebkitAppearance: 'none' }}
                            >
                              <option value="">Select...</option>
                              {TIME_SLOTS.map((t) => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                            <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748B', fontSize: '9px' }}>
                              ▼
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Service */}
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
                          <Scissors size={11} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} />
                          Service <span style={{ color: '#2563EB' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                          <select
                            id="booking-service"
                            value={formData.service}
                            onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))}
                            required
                            className="input-clean"
                            style={{ appearance: 'none', WebkitAppearance: 'none' }}
                          >
                            <option value="">Select service...</option>
                            {BOOKING_SERVICES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748B', fontSize: '9px' }}>
                            ▼
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
                          <MessageSquare size={11} style={{ display: 'inline-block', marginRight: '4px', verticalAlign: 'middle' }} />
                          Notes{' '}
                          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>
                            (optional)
                          </span>
                        </label>
                        <textarea
                          id="booking-notes"
                          value={formData.notes}
                          onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                          placeholder="Any details about your hair goals..."
                          rows={3}
                          className="input-clean"
                          style={{ resize: 'none' }}
                        />
                      </div>

                      <motion.button
                        id="booking-submit-btn"
                        type="submit"
                        disabled={isLoading}
                        whileTap={{ scale: 0.98 }}
                        className="btn-blue"
                        style={{ 
                          width: '100%', 
                          padding: '16px', 
                          justifyContent: 'center',
                          marginTop: '8px',
                          opacity: isLoading ? 0.6 : 1
                        }}
                      >
                        {isLoading ? (
                          <>
                            <div
                              style={{ 
                                width: '16px', 
                                height: '16px', 
                                borderRadius: '50%',
                                border: '2px solid rgba(255,255,255,0.3)', 
                                borderTopColor: '#FFFFFF',
                                animation: 'rotate-ring 0.8s linear infinite'
                              }}
                            />
                            Booking...
                          </>
                        ) : (
                          <>
                            Reserve My Consultation
                            <ChevronRight size={16} />
                          </>
                        )}
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
