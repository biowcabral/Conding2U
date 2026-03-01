'use client';

import { useEffect, useState } from 'react';
import { useVariant } from './VariantProvider';
import { WHATSAPP_URL } from './types';

// Countdown timer — urgency trigger (resets to 30 min on each load)
function useCountdown(seconds: number) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  return { mins, secs, expired: timeLeft <= 0 };
}

export default function FinalCTA() {
  const { variant } = useVariant();
  const { mins, secs } = useCountdown(29 * 60 + 47); // 29:47 countdown
  const SPOTS_LEFT = 3;

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${variant.accentHex}15 0%, transparent 50%, ${variant.accentHex}10 100%)`,
      }}
    >
      {/* heavy BG */}
      <div className={`absolute inset-0 ${variant.heroBg} opacity-95 -z-10`} />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 rounded-full opacity-15 blur-3xl -z-10"
        style={{ background: variant.accentHex }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Scarcity badge */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-black mb-8 animate-fade-in"
          style={{ background: '#ef444420', border: '1px solid #ef444460', color: '#fca5a5' }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          Only {SPOTS_LEFT} spots available this month
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 animate-fade-in-up">
          This is your chance to have a{' '}
          <span className={variant.shimmerClass}>
            sales machine
          </span>{' '}
          working in your business
        </h2>

        <p className="text-base sm:text-lg text-white/80 mb-10 max-w-xl mx-auto">
          Every day without a professional landing page is another day losing clients to your competitors.
          <br />
          <strong className="text-white">Book now. No commitment.</strong>
        </p>

        {/* Countdown */}
        <div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl mb-10"
          style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <span className="text-white/70 text-sm">Promotional price expires in:</span>
          <div className="flex items-center gap-2">
            <div className="text-center">
              <p className="text-2xl font-black text-white">{mins}</p>
              <p className="text-xs text-white/50">min</p>
            </div>
            <span className="text-xl font-black text-white/50">:</span>
            <div className="text-center">
              <p className="text-2xl font-black text-white">{secs}</p>
              <p className="text-xs text-white/50">sec</p>
            </div>
          </div>
        </div>

        {/* Main CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-3 px-10 py-5 rounded-full text-lg font-black transition-all duration-300 hover:scale-105 shadow-2xl ${variant.btnPrimary} ${variant.btnPrimaryText} ${variant.glowClass}`}
          >
            <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.486a.5.5 0 0 0 .614.612l5.52-1.445A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.66-.5-5.192-1.374l-.372-.215-3.874 1.015 1.036-3.767-.234-.382A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Secure my spot now
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Last micro-commitments */}
        <div className="flex flex-wrap justify-center gap-4 text-white/60 text-xs">
          {[
            '🛡️ 30-day guarantee',
            '🔒 Secure payment',
            '⚡ Delivered in 7 days',
            '💬 WhatsApp support',
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
