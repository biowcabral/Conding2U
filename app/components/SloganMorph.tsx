'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useVariant } from './VariantProvider';

// Stable pseudo-random binary particle positions (generated once, no rerenders)
const BIN_PARTICLES = Array.from({ length: 64 }, (_, i) => {
  const phi = 1.6180339887;
  return {
    id: i,
    x: ((i * phi * 100) % 92) + 4,
    y: ((i * phi * phi * 100) % 86) + 7,
    size: [10, 12, 13, 11, 14, 10][i % 6],
    tickShift: i % 6,
    baseOpacity: 0.12 + (i % 7) * 0.055,
  };
});

// Falling binary column config
const BIN_COLS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 3 + i * 5.5,
  length: 5 + (i * 3) % 8,
  speed: 1 + (i % 4) * 0.4,
}));

export default function SloganMorph() {
  const { variant } = useVariant();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [tick, setTick] = useState(0);
  const rafRef = useRef<number>(0);

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

  useEffect(() => {
    let f = 0;
    const loop = () => {
      f++;
      if (f % 4 === 0) setTick(t => (t + 1) & 255);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const easeOut3 = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeOut5 = (t: number) => 1 - Math.pow(1 - t, 5);
  const pClamp = (s: number, e: number, fn = easeOut3) =>
    fn(Math.max(0, Math.min(1, (progress - s) / (e - s))));

  const accent = variant.accentHex;

  const converge = pClamp(0, 0.55, easeOut5);
  const spread = (offset: number) => (1 - converge) * offset;

  const eOut  = 1 - pClamp(0.28, 0.52);
  const iIn   = pClamp(0.35, 0.59);
  const nIn   = pClamp(0.44, 0.64);
  const gIn   = pClamp(0.53, 0.71);
  const twoIn = pClamp(0.61, 0.78);
  const uIn   = pClamp(0.69, 0.85);

  const binIntensity = Math.max(0, 1 - converge * 1.2);
  const glowPx  = Math.round(8 + converge * 52);
  const glowHex = Math.round((0.4 + converge * 0.6) * 255).toString(16).padStart(2, '0');
  const contextOp = 0.35 + converge * 0.65;

  const fixedLetter = (xOff: number): React.CSSProperties => ({
    display: 'inline-block',
    transform: `translateX(${spread(xOff)}px)`,
    opacity: 0.25 + 0.75 * converge,
  });

  const newLetter = (xOff: number, inProg: number): React.CSSProperties => ({
    display: 'inline-block',
    transform: `translateX(${spread(xOff)}px) translateY(${(1 - inProg) * 22}px) scale(${0.65 + inProg * 0.35})`,
    opacity: inProg * (0.2 + 0.8 * converge),
    filter: inProg < 0.99 ? `blur(${(1 - inProg) * 5}px)` : 'none',
  });

  return (
    <div ref={sectionRef} style={{ height: '310vh' }}>
      <div
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(155deg, #05030e 0%, #0a061a 45%, #040210 100%)' }}
      >

        {/* Binary particle layer */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden font-mono"
          aria-hidden="true"
        >
          {BIN_PARTICLES.map(p => {
            const bit = ((tick >> (p.tickShift % 4)) ^ (p.id & 1)) & 1;
            return (
              <span
                key={p.id}
                style={{
                  position: 'absolute',
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  fontSize: p.size,
                  fontWeight: 700,
                  color: accent,
                  opacity: p.baseOpacity * binIntensity,
                  fontFamily: 'monospace',
                }}
              >
                {bit}
              </span>
            );
          })}

          {BIN_COLS.map(col =>
            Array.from({ length: col.length }, (_, row) => {
              const charTick = (tick * col.speed + row * 3 + col.id * 7) | 0;
              const bit = (charTick ^ row ^ col.id) & 1;
              const yPos = (((charTick / 6 + row * 8) % 110) - 10);
              const fade = yPos < 5 ? yPos / 5 : yPos > 95 ? (110 - yPos) / 15 : 1;
              return (
                <span
                  key={`${col.id}-${row}`}
                  style={{
                    position: 'absolute',
                    left: `${col.x}%`,
                    top: `${yPos}%`,
                    fontSize: 11,
                    fontWeight: 700,
                    color: accent,
                    opacity: Math.max(0, fade * 0.22 * binIntensity),
                    fontFamily: 'monospace',
                  }}
                >
                  {bit}
                </span>
              );
            })
          )}
        </div>

        {/* Glow orb */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  `${180 + converge * 700}px`,
            height: `${180 + converge * 700}px`,
            background: `radial-gradient(circle, ${accent}${Math.round((0.05 + converge * 0.17) * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
            filter: 'blur(75px)',
          }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.02 + converge * 0.05,
            backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
            backgroundSize: '72px 72px',
          }}
        />

        {/* Scan line */}
        <div
          className="absolute inset-x-0 pointer-events-none"
          style={{
            top: 0,
            height: `${converge * 100}%`,
            background: `linear-gradient(to bottom, transparent 85%, ${accent}12 100%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4 select-none">

          <p
            className="text-xs sm:text-sm font-bold tracking-[0.35em] uppercase mb-8"
            style={{ color: accent, opacity: 0.45 + converge * 0.55, fontFamily: 'monospace' }}
          >
            {'// your_partner_in_tech'}
          </p>

          <div
            className="flex items-baseline justify-center flex-wrap"
            style={{ lineHeight: 1, gap: 'clamp(8px, 1.2vw, 20px)' }}
          >
            <span
              className="font-black text-white"
              style={{ fontSize: 'clamp(2.8rem, 8.5vw, 7rem)', letterSpacing: '-0.03em', opacity: contextOp }}
            >
              We
            </span>

            {/* Morphing word */}
            <span
              className="font-black"
              style={{
                fontSize: 'clamp(2.8rem, 8.5vw, 7rem)',
                letterSpacing: '-0.01em',
                color: accent,
                filter: `drop-shadow(0 0 ${glowPx}px ${accent}${glowHex}) drop-shadow(0 0 ${Math.round(glowPx * 0.5)}px ${accent}${glowHex})`,
                display: 'inline-block',
              }}
            >
              <span style={fixedLetter(-185)}>C</span>
              <span style={fixedLetter(-115)}>o</span>
              <span style={fixedLetter(-54)}>d</span>

              {/* e exits up / i enters from below */}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span
                  style={{
                    display: 'inline-block',
                    transform: `translateX(${spread(-18)}px) translateY(${(1 - eOut) * -28}px)`,
                    opacity: Math.max(0, eOut * (0.25 + 0.75 * converge)),
                    filter: eOut < 0.99 ? `blur(${(1 - eOut) * 8}px)` : 'none',
                  }}
                >
                  e
                </span>
                <span
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    transform: `translateX(calc(-50% + ${spread(-18)}px)) translateY(${(1 - iIn) * 28}px) scale(${0.68 + iIn * 0.32})`,
                    opacity: iIn,
                    filter: iIn < 0.99 ? `blur(${(1 - iIn) * 6}px)` : 'none',
                  }}
                >
                  i
                </span>
              </span>

              <span style={newLetter(18, nIn)}>n</span>
              <span style={newLetter(54, gIn)}>g</span>
              <span style={newLetter(115, twoIn)}>2</span>
              <span style={newLetter(185, uIn)}>u</span>
            </span>

            <span
              className="font-black text-white"
              style={{ fontSize: 'clamp(2.8rem, 8.5vw, 7rem)', letterSpacing: '-0.03em', opacity: contextOp }}
            >
              Success.
            </span>
          </div>

          {/* Live binary string  ticker */}
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '0.7rem',
              marginTop: '1.25rem',
              letterSpacing: '0.18em',
              color: accent,
              opacity: 0.2 + binIntensity * 0.45,
            }}
          >
            {Array.from({ length: 28 }, (_, i) => ((tick + i * 3) >> (i % 4)) & 1).join('')}
          </p>

          {/* Scroll hint */}
          <div
            className="flex items-center justify-center gap-3 mt-9"
            style={{ opacity: Math.max(0, 1 - progress * 5) }}
          >
            <span className="block w-px h-6" style={{ background: `linear-gradient(to bottom, transparent, ${accent}50)` }} />
            <span
              style={{ color: `${accent}55`, fontSize: '0.7rem', fontFamily: 'monospace', letterSpacing: '0.22em', textTransform: 'uppercase' }}
            >
              scroll_to_compile
            </span>
            <span className="block w-px h-6" style={{ background: `linear-gradient(to bottom, transparent, ${accent}50)` }} />
          </div>

          {/* Completion badge */}
          <div
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              justifyContent: 'center',
              opacity: Math.max(0, (progress - 0.86) * 7),
              transform: `translateY(${Math.max(0, (1 - (progress - 0.86) * 7) * 14)}px)`,
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
                background: `${accent}15`,
                border: `1px solid ${accent}35`,
                color: accent,
              }}
            >
               compilation_complete
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}