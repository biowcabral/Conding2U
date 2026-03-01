'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useVariant } from './VariantProvider';
import { WHATSAPP_URL } from './types';

export default function Header() {
  const { variant } = useVariant();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${variant.headerBg} ${
      scrolled ? `${variant.headerBorder} shadow-lg` : 'border-b border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Coding2U"
            width={140}
            height={40}
            priority
            className="h-9 w-auto object-contain"
          />
          <span className={`hidden sm:inline text-xs font-medium px-2 py-0.5 rounded-full ${variant.badgeBg} ${variant.badgeText}`}>
            Landing Pages
          </span>
        </div>

        {/* Nav links – desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {[
            { label: 'How it works', href: '#how-it-works', external: false },
            { label: 'Portfolio', href: '/portfolio-site/', external: true },
            { label: 'Testimonials', href: '#testimonials', external: false },
            { label: 'Pricing', href: '#pricing', external: false },
          ].map(({ label, href, external }) => (
            <a
              key={href}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className={`${variant.textSecondary} hover:${variant.accentText} transition-colors duration-200`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 shadow-md hover:scale-105 ${variant.btnPrimary} ${variant.btnPrimaryText}`}
        >
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.486a.5.5 0 0 0 .614.612l5.52-1.445A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.5-5.192-1.374l-.372-.215-3.874 1.015 1.036-3.767-.234-.382A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          <span>Talk on WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
