'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { Upload, X, ImageIcon, ShieldCheck } from 'lucide-react';

interface PhotoUploadProps {
  onImageSelected: (squareImage: string, maskImage: string) => void;
  isScanning: boolean;
}

const MAX_SIZE_MB = 10;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function PhotoUpload({ onImageSelected, isScanning }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      setError(null);

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError('Please upload a JPG, PNG, or WebP photo.');
        return;
      }

      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`Photo must be under ${MAX_SIZE_MB}MB. Please try a smaller image.`);
        return;
      }

      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawBase64 = e.target?.result as string;

        // Process image to crop to square & generate mask in browser canvas
        const img = new Image();
        img.onload = () => {
          // 1. Cropped Square Image
          const canvas = document.createElement('canvas');
          const size = Math.min(img.width, img.height);
          canvas.width = 512;
          canvas.height = 512;
          const ctx = canvas.getContext('2d');
          
          if (ctx) {
            ctx.drawImage(
              img,
              (img.width - size) / 2,
              (img.height - size) / 2,
              size,
              size,
              0,
              0,
              512,
              512
            );
            const squareBase64 = canvas.toDataURL('image/png');
            setPreview(squareBase64); // Show the clean square preview

            // 2. Hair Mask Image (Top 60% transparent for editing, bottom 40% solid black to preserve face)
            const maskCanvas = document.createElement('canvas');
            maskCanvas.width = 512;
            maskCanvas.height = 512;
            const mctx = maskCanvas.getContext('2d');
            
            if (mctx) {
              mctx.fillStyle = '#000000'; // Fill solid black first
              mctx.fillRect(0, 0, 512, 512);

              mctx.clearRect(0, 0, 512, 307); // Clear top 60% (transparent area)

              const maskBase64 = maskCanvas.toDataURL('image/png');

              // Pass both cropped square and mask to the parent state
              onImageSelected(squareBase64, maskBase64);
            }
          }
        };
        img.src = rawBase64;
      };
      reader.readAsDataURL(file);
    },
    [onImageSelected],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (isScanning) return;
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile, isScanning],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (isScanning) return;
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isScanning) return;
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const clearImage = () => {
    if (isScanning) return;
    setPreview(null);
    setFileName('');
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

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
          Upload Your Selfie
        </h2>
        <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.5 }}>
          Use a clear, front-facing photo with good lighting for the most accurate AI scan.
        </p>
      </div>

      {/* Drop zone / Scanner view */}
      <AnimatePresence mode="wait">
        {isScanning ? (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1.5px solid #2563EB',
              boxShadow: '0 10px 30px rgba(37, 99, 235, 0.1)',
              background: '#FFFFFF'
            }}
          >
            <img
              src={preview || 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=600&fit=crop&q=80'}
              alt="Scanning..."
              style={{
                width: '100%',
                maxHeight: '320px',
                objectFit: 'cover',
                display: 'block',
                filter: 'brightness(0.6) saturate(0.8)'
              }}
            />
            {/* Scanning Line overlay */}
            <motion.div
              animate={{ top: ['0%', '98%', '0%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #2563EB, transparent)',
                boxShadow: '0 0 15px #2563EB, 0 0 5px #2563EB',
                zIndex: 10
              }}
            />
            
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                background: 'rgba(15, 23, 42, 0.45)', 
                padding: '24px', 
                zIndex: 5 
              }}
            >
              <div 
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  border: '3px solid rgba(255, 255, 255, 0.25)', 
                  borderTopColor: '#FFFFFF', 
                  animation: 'rotate-ring 0.8s linear infinite', 
                  marginBottom: '16px' 
                }}
              />
              <p style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                AI Face Scanner Active
              </p>
              <p style={{ fontSize: '13px', color: '#E2E8F0' }}>
                Analyzing features & hair length...
              </p>
            </div>
          </motion.div>
        ) : !preview ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="photo-dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => inputRef.current?.click()}
            style={{
              cursor: 'pointer',
              borderRadius: '24px',
              border: '2px dashed',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '48px 24px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              borderColor: isDragging ? '#2563EB' : '#CBD5E1',
              background: isDragging ? '#EFF6FF' : '#FFFFFF',
              boxShadow: isDragging 
                ? '0 10px 25px rgba(37, 99, 235, 0.08)' 
                : '0 4px 20px rgba(15, 23, 42, 0.02)',
            }}
          >
            <motion.div
              animate={{ scale: isDragging ? 1.08 : 1 }}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                background: '#EFF6FF',
              }}
            >
              <Upload size={24} style={{ color: '#2563EB' }} />
            </motion.div>
            
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A', marginBottom: '6px' }}>
              {isDragging ? 'Drop your photo here' : 'Drag & drop your selfie'}
            </p>
            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px' }}>
              or tap to browse your device
            </p>
            
            <span
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#2563EB',
                borderColor: '#BFDBFE',
                borderWidth: '1.5px',
                borderStyle: 'solid',
                padding: '8px 20px',
                borderRadius: '10px',
                background: '#EFF6FF',
                display: 'inline-block'
              }}
            >
              Choose Photo
            </span>
            
            <p style={{ fontSize: '11px', color: '#94A3B8', marginTop: '16px' }}>
              JPG, PNG, WebP · Max {MAX_SIZE_MB}MB
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1.5px solid #E2E8F0',
              boxShadow: '0 8px 30px rgba(15, 23, 42, 0.06)',
              background: '#FFFFFF'
            }}
          >
            <img
              src={preview}
              alt="Your uploaded selfie"
              style={{
                width: '100%',
                maxHeight: '320px',
                objectFit: 'cover',
                display: 'block'
              }}
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
            
            <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
              <button
                id="remove-photo-btn"
                onClick={clearImage}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <X size={14} style={{ color: '#FFFFFF' }} />
              </button>
            </div>
            
            <div 
              style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                padding: '16px', 
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <ImageIcon size={14} style={{ color: '#60A5FA' }} />
              <span style={{ fontSize: '12px', color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {fileName}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        style={{ display: 'none' }}
        id="photo-file-input"
        disabled={isScanning}
      />

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              fontSize: '13px',
              marginTop: '12px',
              textAlign: 'center',
              padding: '12px 16px',
              borderRadius: '12px',
              color: '#DC2626',
              background: '#FEF2F2',
              border: '1.5px solid #FEE2E2',
            }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Privacy note */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px', justifyContent: 'center' }}>
        <ShieldCheck size={14} style={{ color: '#64748B' }} />
        <p style={{ fontSize: '12px', color: '#64748B' }}>
          Your photo is kept private and only used to generate previews.
        </p>
      </div>
    </motion.div>
  );
}
