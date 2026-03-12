'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// Words with individual character tracking
// "2u" gets a special accent color, the rest transitions from dim to white
const WORDS: { text: string; isAccent?: boolean }[] = [
  { text: 'We' },
  { text: 'Coding' },
  { text: '2u', isAccent: true },
  { text: 'Success.' },
];

const ACCENT = '#F97316'; // orange-500
const ACCENT_GLOW = '#ea580c'; // orange-600

export default function SloganMorph() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollable = el.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;
    setProgress(Math.max(0, Math.min(1, -rect.top / scrollable)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Build flat array of characters with their word info
  const chars: { char: string; isAccent: boolean; isSpace: boolean }[] = [];
  WORDS.forEach((word, wi) => {
    for (const ch of word.text) {
      chars.push({ char: ch, isAccent: !!word.isAccent, isSpace: false });
    }
    if (wi < WORDS.length - 1) {
      chars.push({ char: ' ', isAccent: false, isSpace: true });
    }
  });

  const totalChars = chars.filter(c => !c.isSpace).length;

  // Each char lights up across the 0→0.85 range of progress
  const getCharProgress = (charIndex: number) => {
    const start = (charIndex / totalChars) * 0.7;
    const end = start + 0.2;
    return Math.max(0, Math.min(1, (progress - start) / (end - start)));
  };

  // Glow intensity grows with overall progress
  const glowIntensity = Math.min(1, progress * 1.5);
  const orbSize = 200 + progress * 600;

  return (
    <div ref={sectionRef} style={{ height: '250vh' }}>
      <div
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(155deg, #05030e 0%, #0a061a 45%, #040210 100%)' }}
      >
        {/* Glow orb behind text */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orbSize,
            height: orbSize,
            background: `radial-gradient(circle, ${ACCENT}${Math.round(glowIntensity * 0.12 * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.02 + progress * 0.04,
            backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
            backgroundSize: '72px 72px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4 select-none">
          {/* Tag line */}
          <p
            className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase mb-8"
            style={{
              color: ACCENT,
              opacity: 0.4 + progress * 0.6,
              fontFamily: 'monospace',
            }}
          >
            {'// your_partner_in_tech'}
          </p>

          {/* Main text - character by character color reveal */}
          <div
            style={{
              fontSize: 'clamp(2.8rem, 8.5vw, 7rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'baseline',
              gap: 'clamp(8px, 1.2vw, 20px)',
            }}
          >
            {(() => {
              let charIdx = 0;
              return WORDS.map((word, wi) => (
                <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                  {Array.from(word.text).map((ch, ci) => {
                    const p = getCharProgress(charIdx++);
                    const dimColor = 'rgba(255,255,255,0.12)';
                    const litColor = word.isAccent ? ACCENT : '#ffffff';
                    const glowPx = word.isAccent ? Math.round(p * 30) : Math.round(p * 8);
                    const glowColor = word.isAccent ? ACCENT_GLOW : 'rgba(249,115,22,0.3)';

                    return (
                      <span
                        key={ci}
                        style={{
                          display: 'inline-block',
                          color: p > 0 ? litColor : dimColor,
                          opacity: 0.12 + p * 0.88,
                          filter: glowPx > 0
                            ? `drop-shadow(0 0 ${glowPx}px ${glowColor})`
                            : 'none',
                          transition: 'color 0.15s ease, opacity 0.15s ease, filter 0.15s ease',
                        }}
                      >
                        {ch}
                      </span>
                    );
                  })}
                </span>
              ));
            })()}
          </div>

          {/* Scroll hint */}
          <div
            className="flex items-center justify-center gap-3 mt-12"
            style={{ opacity: Math.max(0, 1 - progress * 5) }}
          >
            <span className="block w-px h-6" style={{ background: `linear-gradient(to bottom, transparent, ${ACCENT}50)` }} />
            <span
              style={{
                color: `${ACCENT}55`,
                fontSize: '0.7rem',
                fontFamily: 'monospace',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
              }}
            >
              scroll
            </span>
            <span className="block w-px h-6" style={{ background: `linear-gradient(to bottom, transparent, ${ACCENT}50)` }} />
          </div>

          {/* Completion badge */}
          <div
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              justifyContent: 'center',
              opacity: Math.max(0, (progress - 0.85) * 6.5),
              transform: `translateY(${Math.max(0, (1 - (progress - 0.85) * 6.5) * 14)}px)`,
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '0.35rem 1rem',
                borderRadius: '9999px',
                background: `${ACCENT}15`,
                border: `1px solid ${ACCENT}35`,
                color: ACCENT,
              }}
            >
              your_partner_in_tech
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}