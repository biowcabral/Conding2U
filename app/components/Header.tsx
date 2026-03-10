'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useVariant } from './VariantProvider';

export default function Header() {
  const { variant } = useVariant();
  const [scrolled, setScrolled] = useState(false);
  const [glitch, setGlitch]     = useState(false);
  const glitchRef   = useRef(false);
  const glitchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerGlitch = () => {
    if (glitchRef.current) return;
    glitchRef.current = true;
    setGlitch(true);
    glitchTimer.current = setTimeout(() => {
      setGlitch(false);
      glitchRef.current = false;
    }, 380);
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const schedule = () => {
      autoTimer.current = setTimeout(() => {
        triggerGlitch();
        schedule();
      }, 4000 + Math.random() * 5000);
    };
    schedule();
    return () => {
      if (autoTimer.current)   clearTimeout(autoTimer.current);
      if (glitchTimer.current) clearTimeout(glitchTimer.current);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${variant.headerBg} ${
      scrolled ? `${variant.headerBorder} shadow-lg` : 'border-b border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <>
          <style>{`
            @keyframes c2uGlitchR {
              0%,100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
              10%     { clip-path: inset(10% 0 60% 0); transform: translate(-3px, 1px); }
              25%     { clip-path: inset(55% 0 20% 0); transform: translate(3px, -1px); }
              40%     { clip-path: inset(30% 0 45% 0); transform: translate(-2px, 2px); }
              60%     { clip-path: inset(70% 0 5%  0); transform: translate(2px, -2px); }
              80%     { clip-path: inset(5%  0 80% 0); transform: translate(-1px, 1px); }
            }
            @keyframes c2uGlitchB {
              0%,100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
              10%     { clip-path: inset(60% 0 10% 0); transform: translate(3px, -2px); }
              30%     { clip-path: inset(20% 0 55% 0); transform: translate(-3px, 1px); }
              50%     { clip-path: inset(45% 0 30% 0); transform: translate(2px, 2px); }
              70%     { clip-path: inset(5%  0 70% 0); transform: translate(-2px, -1px); }
              90%     { clip-path: inset(80% 0 5%  0); transform: translate(1px, -1px); }
            }
            .c2u-glitch-r { animation: c2uGlitchR 0.38s steps(1) both; mix-blend-mode: screen; filter: saturate(4) hue-rotate(-20deg); }
            .c2u-glitch-b { animation: c2uGlitchB 0.38s steps(1) both; mix-blend-mode: screen; filter: saturate(4) hue-rotate(160deg); }
          `}</style>
          <div style={{ position: 'relative', display: 'inline-flex' }} onMouseEnter={triggerGlitch}>
            <Image
              src="/logo.png"
              alt="Coding2U"
              width={140}
              height={40}
              priority
              className="h-9 w-auto object-contain"
            />
            {glitch && <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="" aria-hidden className="c2u-glitch-r"
                style={{ position: 'absolute', top: 0, left: 0, height: 36, width: 'auto', pointerEvents: 'none' }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="" aria-hidden className="c2u-glitch-b"
                style={{ position: 'absolute', top: 0, left: 0, height: 36, width: 'auto', pointerEvents: 'none' }} />
            </>}
          </div>
          </>
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
          href="#contact-form"
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 shadow-md hover:scale-105 ${variant.btnPrimary} ${variant.btnPrimaryText}`}
        >
          <span>Get in Touch</span>
        </a>
      </div>
    </header>
  );
}
