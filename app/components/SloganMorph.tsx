'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useVariant } from './VariantProvider';

export default function SloganMorph() {
  const { variant } = useVariant();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const scrollable = section.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const scrolled = -rect.top;
    setProgress(Math.max(0, Math.min(1, scrolled / scrollable)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Cubic ease-out
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);

  // Maps progress into a [0,1] value between start and end thresholds
  const p = (start: number, end: number) =>
    ease(Math.max(0, Math.min(1, (progress - start) / (end - start))));

  const accent = variant.accentHex;

  // Morph: "Code" → "Coding2u"
  // Shared:  C(0) o(1) d(2)
  // Out:     e   → fades out + slides up
  // In pos3: i   → fades  in + slides from below (replaces "e")
  // New:     n g 2 u → stagger in
  const eP   = 1 - p(0, 0.30);       // "e" fades out 0→30%
  const iP   = p(0.10, 0.38);        // "i" fades in
  const nP   = p(0.28, 0.52);
  const gP   = p(0.42, 0.64);
  const twoP = p(0.55, 0.74);
  const uP   = p(0.67, 0.84);

  // Glow grows with progress
  const glowA = (0.35 + progress * 0.65).toFixed(2);
  const glowPx = Math.round(8 + progress * 56);
  const glow = `0 0 ${glowPx}px rgba(${hexToRgb(accent)},${glowA})`;
  const glowDouble = `${glow}, ${glow}`;

  // Word scale: very subtle grow
  const wordScale = 1 + progress * 0.06;

  // Background orb
  const orbSize = 300 + progress * 500;
  const orbAlpha = Math.round((0.06 + progress * 0.18) * 255).toString(16).padStart(2, '0');

  const letterIn = (prog: number): React.CSSProperties => ({
    display: 'inline-block',
    opacity: prog,
    transform: `translateY(${(1 - prog) * 28}px) scale(${0.65 + prog * 0.35})`,
    filter: prog < 0.99 ? `blur(${(1 - prog) * 5}px)` : 'none',
  });

  return (
    <div ref={sectionRef} className="relative" style={{ height: '280vh' }}>
      <div
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #080514 0%, #0d0820 50%, #06040f 100%)' }}
      >
        {/* Animated background orb */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orbSize,
            height: orbSize,
            background: `radial-gradient(circle, ${accent}${orbAlpha} 0%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.025 + progress * 0.02,
            backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Scan-line overlay drawn by progress */}
        <div
          className="absolute inset-x-0 pointer-events-none"
          style={{
            top: 0,
            height: `${progress * 100}%`,
            background: `linear-gradient(to bottom, transparent 90%, ${accent}08)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4 select-none">

          {/* Eyebrow */}
          <p
            className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase mb-8"
            style={{
              color: `${accent}`,
              opacity: 0.55 + progress * 0.45,
              letterSpacing: '0.35em',
            }}
          >
            Your Partner in Tech
          </p>

          {/* Main headline row */}
          <div
            className="flex items-baseline justify-center gap-3 sm:gap-5 flex-wrap"
            style={{ lineHeight: 1, marginBottom: '0.15em' }}
          >
            {/* "We" */}
            <span
              className="font-black text-white"
              style={{
                fontSize: 'clamp(3rem, 9vw, 7.5rem)',
                letterSpacing: '-0.03em',
              }}
            >
              We
            </span>

            {/* ── MORPHING WORD ── */}
            <span
              className="font-black"
              style={{
                fontSize: 'clamp(3rem, 9vw, 7.5rem)',
                letterSpacing: '-0.02em',
                color: accent,
                filter: `drop-shadow(${glowDouble})`,
                transform: `scale(${wordScale})`,
                display: 'inline-block',
                transformOrigin: 'center bottom',
              }}
            >
              {/* Fixed: C o d */}
              <span style={{ display: 'inline-block' }}>C</span>
              <span style={{ display: 'inline-block' }}>o</span>
              <span style={{ display: 'inline-block' }}>d</span>

              {/* Position 3 — "e" fades out, "i" fades in (same slot) */}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                {/* e — exits upward */}
                <span
                  style={{
                    display: 'inline-block',
                    opacity: eP,
                    transform: `translateY(${(1 - eP) * -26}px)`,
                    filter: eP < 0.99 ? `blur(${(1 - eP) * 6}px)` : 'none',
                  }}
                >
                  e
                </span>
                {/* i — enters from below, overlaps with "e" slot */}
                <span
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    transform: `translateX(-50%) translateY(${(1 - iP) * 26}px) scale(${0.65 + iP * 0.35})`,
                    opacity: iP,
                    filter: iP < 0.99 ? `blur(${(1 - iP) * 5}px)` : 'none',
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                  }}
                >
                  i
                </span>
              </span>

              {/* n g 2 u — stagger in from below */}
              <span style={letterIn(nP)}>n</span>
              <span style={letterIn(gP)}>g</span>
              <span style={letterIn(twoP)}>2</span>
              <span style={letterIn(uP)}>u</span>
            </span>

            {/* "Your" */}
            <span
              className="font-black text-white"
              style={{
                fontSize: 'clamp(3rem, 9vw, 7.5rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Your
            </span>
          </div>

          {/* "Success." on its own line */}
          <p
            className="font-black text-white"
            style={{
              fontSize: 'clamp(3rem, 9vw, 7.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            Success.
          </p>

          {/* Scroll hint — fades out as you scroll */}
          <div
            className="flex items-center justify-center gap-3 mt-14"
            style={{ opacity: Math.max(0, 1 - progress * 5) }}
          >
            <span
              className="block w-px h-6"
              style={{ background: `linear-gradient(to bottom, transparent, ${accent}60)` }}
            />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: `${accent}60` }}
            >
              scroll to reveal
            </span>
            <span
              className="block w-px h-6"
              style={{ background: `linear-gradient(to bottom, transparent, ${accent}60)` }}
            />
          </div>

          {/* Completion badge — appears when morph is done */}
          <div
            className="flex items-center justify-center gap-2 mt-6"
            style={{
              opacity: Math.max(0, (progress - 0.85) * 6.7),
              transform: `translateY(${Math.max(0, (1 - (progress - 0.85) * 6.7) * 12)}px)`,
            }}
          >
            <span
              className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{
                background: `${accent}18`,
                border: `1px solid ${accent}40`,
                color: accent,
              }}
            >
              ✦ That&apos;s us
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper: converts hex color to "r,g,b" string
function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r},${g},${b}`;
}
