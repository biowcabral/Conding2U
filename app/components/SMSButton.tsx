'use client';

import { useState, useEffect } from 'react';
import { SMS_URL } from './types';

export default function SMSButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!visible) return null;

  return (
    <a
      href={SMS_URL}
      className="fixed bottom-22 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-full shadow-2xl font-bold text-sm transition-all duration-300 hover:scale-105 animate-fade-in text-white"
      style={{
        background: 'linear-gradient(135deg, #0B1628 0%, #1E3A5F 100%)',
        border: '1px solid rgba(249,115,22,0.5)',
        boxShadow: '0 8px 32px rgba(249,115,22,0.3)',
      }}
      aria-label="Send us a text message"
    >
      {/* SMS / message bubble icon */}
      <svg className="w-5 h-5 shrink-0 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4C2.897 2 2 2.897 2 4v18l4-4h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 12H5.586L4 15.586V4h16v10z"/>
        <path d="M7 7h10v2H7zm0 4h7v2H7z"/>
      </svg>
      <span className="hidden sm:inline text-orange-100">Text us (SMS)</span>
    </a>
  );
}
